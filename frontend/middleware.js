import { NextResponse } from "next/server";
export function middleware(request) {
  // UX-level guard only: the backend authenticate/authorize middleware is the real security boundary.
  if (!request.cookies.get("auth-session")?.value) return NextResponse.redirect(new URL("/login-register", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
