import NextAuth from "next/auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      image: string;
      name: string;
      role: UserRole;
      email: string;
    };
  }
}
