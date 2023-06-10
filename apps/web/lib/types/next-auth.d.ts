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
      error?: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
    sub: string;
    error?: "RefreshAccessTokenError";
  }
}
