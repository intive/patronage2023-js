import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    //returns user object
    const session = await getToken({ req });

    const isAccessing = (routes: string[]) =>
      routes.some((route) => pathname.startsWith(route));

    //append new routes if needed in future
    const authRoutes = ["/sign-up", "/sign-in"];
    const sensitiveRoutes = ["/budgets", "/reports"];
    const adminRoutes = ["/users"];

    //auth safeguards
    if (isAccessing(authRoutes)) {
      if (session) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    //sensitive safeguards
    if (isAccessing(sensitiveRoutes)) {
      if (!session) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
      return NextResponse.next();
    }

    //admin safeguards
    if (isAccessing(adminRoutes)) {
      if (!session) return NextResponse.redirect(new URL("/sign-in", req.url));

      if (session.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }
  },
  //callback below handles redirects on auth pages, by returning true middleware above allways run,
  //and we don't endup in browser's infinite redirect loop
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/users",
    "/budgets/:path*",
    "/reports/:path*",
  ],
};
