import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

type CredentialType = {
  email: string;
  password: string;
};

type decodedData = {
  name: string;
  avatar: string;
  sub: string;
};

interface DefaultUser extends User {
  accessToken: string;
  refreshToken: string;
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = (user as DefaultUser).accessToken;
      }
      return token;
    },
    session({ session, token, user }) {
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as CredentialType;
        // @ts-ignore
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        const res = await fetch(process.env.API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          const { accessToken, refreshToken } = await res.json();
          const { sub, name, avatar } = jwt.decode(accessToken) as decodedData;
          return {
            id: sub,
            accessToken,
            refreshToken,
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
  jwt: {
    async encode({ token, secret }) {
      // @ts-ignore
      return jwt.sign(token, secret);
    },
    async decode({ token, secret }) {
      // @ts-ignore
      return jwt.verify(token, secret);
    },
  },
};
export default NextAuth(authOptions);
