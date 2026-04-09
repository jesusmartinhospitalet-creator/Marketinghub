/**
 * middleware.ts – Route protection.
 *
 * Uses the Edge-safe authConfig (no bcrypt, no Prisma) so it can run
 * in the Edge Runtime without errors.
 */

import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Pass through NextAuth's own API routes
  if (nextUrl.pathname.startsWith('/api/auth')) return

  const isLoginPage = nextUrl.pathname === '/login'

  // Logged-in user visiting /login → send to dashboard
  if (isLoggedIn && isLoginPage) {
    return Response.redirect(new URL('/dashboard', nextUrl))
  }

  // Unauthenticated user visiting any protected route → send to login
  if (!isLoggedIn && !isLoginPage) {
    const loginUrl = new URL('/login', nextUrl)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    return Response.redirect(loginUrl)
  }
})

export const config = {
  // Match all routes except static assets and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
}
