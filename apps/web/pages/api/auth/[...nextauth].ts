import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type CredentialType = {
  email: string;
  password: string;
};
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as CredentialType;
        const res = await fetch(
          "https://inbudget-patronage-api-dev.azurewebsites.net/user/sign-in",
          {
            method: "POST",
            headers: {
              accept: "text/plain",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
        const user = await res.json();
        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in/",
    signOut: "/sign-in",
  },
};
export default NextAuth(authOptions);
