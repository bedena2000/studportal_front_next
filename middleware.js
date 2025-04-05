import { NextResponse, NextRequest } from "next/server";
import { api } from "./lib/fetching";
import { checkIfTokenCorrect } from "./lib/helpers";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Dashboard checking
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const result = await checkIfTokenCorrect(token);
      if (!result.authenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    const result = await checkIfTokenCorrect(token);
    if (result.authenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
