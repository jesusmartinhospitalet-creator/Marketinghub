/**
 * auth.config.ts – Edge-safe NextAuth configuration.
 *
 * This file MUST NOT import bcrypt, Prisma, or any Node.js-only modules.
 * It runs in the Edge Runtime (middleware). Providers that need Node.js
 * (Credentials with bcrypt, Prisma adapter) are added in auth.ts only.
 */

import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    // jwt and session run in both Edge and Node.js – keep them here
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
      }
      return token
    },

    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  // Providers are added in auth.ts (Node.js runtime only)
  providers: [],
}
