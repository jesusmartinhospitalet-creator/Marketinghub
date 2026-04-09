/**
 * auth.ts – Full NextAuth configuration (Node.js runtime only).
 *
 * Spreads the edge-safe base config and adds providers that require
 * Node.js APIs (bcrypt, Prisma). Import from this file in:
 *   - Server Components
 *   - Route Handlers (app/api/*)
 *   - Server Actions
 *
 * For middleware, use auth.config.ts instead.
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
// import Google from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { authConfig } from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) return null

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            passwordHash: true,
          },
        })

        if (!user?.passwordHash) return null

        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) return null

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),

    // ── Google OAuth ──────────────────────────────────────────────────────
    // Uncomment when GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set.
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: { params: { hd: 'ligrow.com' } }, // restrict to domain
    // }),
    // ─────────────────────────────────────────────────────────────────────
  ],
})
