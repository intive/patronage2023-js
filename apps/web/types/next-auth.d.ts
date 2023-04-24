import NextAuth from "next/auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      expiresIn: number;
      refreshExpiresIn: number;
      refreshToken: string;
      tokenType: string;
      notBeforePolicy: number;
      sessionState: string;
      scope: string;
    };
  }
}
