import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";

type CredentialType = {
  email: string;
  password: string;
};

type decodedData = {
  name: string;
  avatar: string;
};
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const decodedData = await jwt_decode<decodedData>(
        token.accessToken as string
      );
      session.user = {
        accessToken: token.accessToken as string,
        name: decodedData.name,
        avatar: decodedData.avatar,
      };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as CredentialType;
        const res = await fetch(
          "https://inbudget-patronage-api-dev.azurewebsites.net/user/sign-in",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (res.ok) {
          return await res.json();
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
