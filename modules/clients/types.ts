/**
 * Serializable client type for passing from Server Components to Client Components.
 * Dates are pre-formatted as strings so they can cross the server/client boundary.
 */
export type ClientPayload = {
  id: string
  name: string
  code: string | null
  description: string | null
  notes: string | null
  startDate: string | null   // YYYY-MM-DD format, ready for <input type="date">
  pendingTasks: number
  totalTasks: number
}

/** Subset used by the client detail page */
export type ClientDetail = Omit<ClientPayload, 'pendingTasks' | 'totalTasks'>

/** Return shape for server actions */
export type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string }
