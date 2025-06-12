import type { NextRequest } from "next/server"
import { auth0 } from "./lib/auth0"


export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/home') ||
    request.nextUrl.pathname.startsWith('/movies') ||
    request.nextUrl.pathname.startsWith('/watchlist') ||
    request.nextUrl.pathname.startsWith('/profile')) {

    const session = await auth0.getSession(request);

    if (!session) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('returnTo', request.nextUrl.pathname);
      return Response.redirect(loginUrl);
    }
  }

  return await auth0.middleware(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}