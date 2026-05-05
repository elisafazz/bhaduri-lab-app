import { NextResponse, type NextRequest } from "next/server";
import { ROLE_COOKIE, verifyRoleCookie } from "@/lib/auth";

const PUBLIC_PATHS = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/") ||
    PUBLIC_PATHS.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ROLE_COOKIE)?.value;
  const role = await verifyRoleCookie(cookie);

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|bhaduri-lab-logo.jpg).*)",
  ],
};
