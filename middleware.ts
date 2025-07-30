import type { NextRequest } from "next/server"
import { authMiddleware, apiMiddleware } from "./lib/middleware"

export function middleware(request: NextRequest) {
  // Apply API middleware for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    return apiMiddleware(request)
  }

  // Apply auth middleware for all other routes
  return authMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
