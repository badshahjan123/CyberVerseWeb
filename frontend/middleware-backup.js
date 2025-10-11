import { NextResponse } from 'next/server'

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/labs',
  '/rooms',
  '/leaderboard',
  '/profile',
  '/settings'
]

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register'
]

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if user has authentication token
  const token = request.cookies.get('cyberverse_user')?.value
  const isAuthenticated = !!token
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    // Store the intended destination for redirect after login
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Redirect authenticated users from login/register to dashboard
  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}