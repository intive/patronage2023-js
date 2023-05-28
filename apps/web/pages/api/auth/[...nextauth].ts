import NextAuth, { NextAuthOptions, User } from "next-auth";
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
};

interface DefaultUser extends User {
  accessToken: string;
  refreshToken: string;
  role: UserRole;
  id: string;
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = (user as DefaultUser).accessToken;
        token.role = (user as DefaultUser).role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.role = token.role;
      session.user.id = token.sub as string;
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
          const { accessToken, refreshToken } = await res.json();

          const { sub, name, avatar, realm_access } = jwt.decode(
            accessToken
          ) as decodedData;

          return {
            id: sub,
            accessToken,
            refreshToken,
            role: realm_access.roles.includes("admin") ? "ADMIN" : "USER",
            name,
            image: avatar,
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
