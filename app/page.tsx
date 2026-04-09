import { redirect } from 'next/navigation'
import { auth } from '@/auth'

// Root redirects based on session state
export default async function RootPage() {
  const session = await auth()
  redirect(session ? '/dashboard' : '/login')
}
