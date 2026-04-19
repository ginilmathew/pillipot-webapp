import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("pillipot_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Protected Routes - Redirect to Login if no token
  const protectedRoutes = ["/checkout", "/orders", "/profile"];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Guest Routes - Redirect to Home if already logged in
  const guestRoutes = ["/login", "/register"];
  const isGuestRoute = guestRoutes.some(route => pathname.startsWith(route));

  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Optimization: Only run middleware on relevant paths to save resources
export const config = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/login",
    "/register"
  ],
};
