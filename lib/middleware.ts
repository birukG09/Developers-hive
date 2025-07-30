import { type NextRequest, NextResponse } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/rooms", "/drops", "/sessions", "/community", "/profile", "/settings"]

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register"]

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith("/api/auth"))

  // Get auth token from cookie
  const token = request.cookies.get("auth-token")?.value

  // If accessing a protected route without authentication
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If accessing login/register while authenticated
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Rate limiting utility
const rateLimitMap = new Map()

export function rateLimit(identifier: string, limit = 100, windowMs = 60000) {
  const now = Date.now()
  const windowStart = now - windowMs

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, [])
  }

  const requests = rateLimitMap.get(identifier)

  // Remove old requests outside the window
  const validRequests = requests.filter((timestamp: number) => timestamp > windowStart)

  if (validRequests.length >= limit) {
    return false // Rate limit exceeded
  }

  // Add current request
  validRequests.push(now)
  rateLimitMap.set(identifier, validRequests)

  return true // Request allowed
}

// API middleware for rate limiting and CORS
export function apiMiddleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: response.headers })
  }

  // Rate limiting for API routes
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
  const isAllowed = rateLimit(ip, 100, 60000) // 100 requests per minute

  if (!isAllowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
  }

  return response
}
