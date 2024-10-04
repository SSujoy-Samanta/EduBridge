// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { AuthMiddleware } from "./utils/Middleware/authMid";
import { rateLimit } from "./utils/Middleware/rateLimiter";

// Specify paths to match for this middleware
export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
    "/chats/:path*",
    "/room/:path*",
    "/friends/:path*",
    "/user/:path*",
    "/videocall/:path*",
    "/adduserinfo/:path*",
  ],
};

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const rateLimitResponse = await rateLimit(req);
    if (!rateLimitResponse.success) {
      return NextResponse.json(
        { message: rateLimitResponse.message },
        { status: 429 },
      );
    }
  }
  // Apply authentication middleware for specific paths
  if (
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/chats") ||
    req.nextUrl.pathname.startsWith("/room") ||
    req.nextUrl.pathname.startsWith("/friends") ||
    req.nextUrl.pathname.startsWith("/user") ||
    req.nextUrl.pathname.startsWith("/videocall") ||
    req.nextUrl.pathname.startsWith("/adduserinfo")
  ) {
    const authResponse = await AuthMiddleware(req);
    if (authResponse) {
      return authResponse; // Redirect or allow request based on authentication
    }
  }

  return NextResponse.next();
}
