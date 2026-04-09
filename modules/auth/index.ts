// Module: auth
// Authentication and session management for Ligrow Tasks.
//
// Architecture:
//   auth.ts (root)         → NextAuth v5 config (providers, JWT, callbacks)
//   middleware.ts (root)   → Route-level protection via NextAuth middleware
//   lib/auth.ts            → Server-side helpers: getSession(), requireAuth()
//   app/api/auth/[...nextauth]/route.ts → NextAuth API handler
//   app/_providers/AuthProvider.tsx     → SessionProvider for client components
//
// Login methods:
//   ✅ Email + password (Credentials provider)
//   🔜 Google OAuth (configured, requires env vars GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)
//
// Adding users:
//   No public registration. Users are added manually via:
//     npx tsx scripts/create-user.ts --email x@y.com --name "Name" --password secret
//   Or directly in Prisma Studio: npm run db:studio

export {}
