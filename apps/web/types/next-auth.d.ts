import NextAuth from "next/auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      image: string;
      name: string;
    };
  }
}
