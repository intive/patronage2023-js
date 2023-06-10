import NextAuth, { NextAuthOptions, TokenSet, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { env } from "env.mjs";
import { UserRole } from "lib/types";

type CredentialType = {
  email: string;
  password: string;
};

type decodedData = {
  name: string;
  avatar: string;
  sub: string;
  realm_access: {
    roles: string[];
  };
  email: string;
};

interface DefaultUser extends User {
  accessToken: string;
  refreshToken: string;
  role: UserRole;
  id: string;
  expiresIn: number;
  image: string;
  error?: string;
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        const { accessToken, role, expiresIn, refreshToken, id, image } =
          user as DefaultUser;
        console.log(
          "expiresAt ",
          Math.floor(Date.now() + Number(expiresIn) * 1000)
        );
        return {
          accessToken,
          expiresAt: Math.floor(Date.now() + Number(expiresIn) * 1000),
          refreshToken,
          role,
          id,
          expiresIn,
          image,
        };
      } else if (Date.now() < Number(token.expiresAt)) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          const res = await fetch(
            `${env.NEXT_PUBLIC_API_URL}user/refresh-token`,
            {
              headers: {
                accept: "*/*",
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refreshToken: token.refreshToken,
              }),
              method: "POST",
            }
          );

          if (!res.ok) throw res;

          const { accessToken, refreshToken, expiresIn }: TokenSet =
            await res.json();

          console.log(
            "expiresAt",
            Math.floor(Date.now() + Number(expiresIn) * 1000)
          );
          return {
            ...token, // Keep the previous token properties, like role
            accessToken,
            refreshToken,
            expiresAt: Math.floor(Date.now() + Number(expiresIn) * 1000),
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.role = token.role;
      session.user.id = token.id as string;
      session.user.image = token.image as string;
      session.user.error = token.error as string;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as CredentialType;
        // @ts-ignore
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        const res = await fetch(env.NEXT_PUBLIC_API_URL + "user/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          const { accessToken, refreshToken, expiresIn } = await res.json();

          const { sub, name, avatar, realm_access, email } = jwt.decode(
            accessToken
          ) as decodedData;

          return {
            id: sub,
            accessToken,
            refreshToken,
            role: realm_access.roles.includes("admin") ? "ADMIN" : "USER",
            name,
            image: avatar,
            email,
            expiresIn,
          };
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in/",
    signOut: "/sign-in/",
    error: "/sign-in/",
  },
};
export default NextAuth(authOptions);
