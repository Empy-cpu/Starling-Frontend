import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboards/customer", "/dashboards/admin"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // or from headers if using Authorization

  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboards/:path*"],
};
