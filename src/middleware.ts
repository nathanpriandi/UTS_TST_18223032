import { NextRequest, NextResponse } from "next/server"

const DEFAULT_COUNTRY_CODE = "us"

/**
 * Middleware to handle requests and redirect to a default country code
 * if no country code is present in the URL.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the pathname already has a country code
  // Simple check: assumes a 2-letter country code at the start of the path
  const hasCountryCode = /^\/[a-z]{2}(\/|$)/.test(pathname)

  if (!hasCountryCode) {
    // Prepend the default country code
    const newPath = `/${DEFAULT_COUNTRY_CODE}${pathname}`
    const url = request.nextUrl.clone()
    url.pathname = newPath
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
