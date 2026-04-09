// Authentication utilities
// Full implementation will be added in the auth module phase.
// Planned: email/password + optional Google OAuth (restricted domain).

export type AuthSession = {
  userId: string
  email: string
  role: 'admin' | 'member'
}

/** Returns the current session. Returns null if not authenticated. */
export async function getSession(): Promise<AuthSession | null> {
  // TODO: implement session retrieval (JWT / cookie-based)
  return null
}

/** Checks if the current request is authenticated. */
export async function requireAuth(): Promise<AuthSession> {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}
