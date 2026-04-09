import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export type AuthSession = {
  userId: string
  email: string
  name: string
  role: string
}

/**
 * Returns the current session for use in Server Components and Route Handlers.
 * Returns null if the user is not authenticated.
 */
export async function getSession(): Promise<AuthSession | null> {
  const session = await auth()
  if (!session?.user?.id) return null

  return {
    userId: session.user.id,
    email: session.user.email ?? '',
    name: session.user.name ?? '',
    role: session.user.role,
  }
}

/**
 * Requires a valid session. Redirects to /login if not authenticated.
 * Use this in protected Server Components and Route Handlers.
 */
export async function requireAuth(): Promise<AuthSession> {
  const session = await getSession()
  if (!session) redirect('/login')
  return session
}
