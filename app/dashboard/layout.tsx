import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

/**
 * Dashboard layout – wraps /dashboard and /dashboard/client/[id].
 * Handles auth check and fetches the client list for the sidebar.
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  // Fetch clients with full data for sidebar (edit modal needs description/notes/startDate)
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      description: true,
      notes: true,
      startDate: true,
      tasks: {
        where: { status: { not: 'DONE' } },
        select: { id: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  const sidebarClients = clients.map(c => ({
    id:           c.id,
    name:         c.name,
    code:         c.code,
    description:  c.description,
    notes:        c.notes,
    startDate:    c.startDate ? c.startDate.toISOString().slice(0, 10) : null,
    pendingTasks: c.tasks.length,
  }))

  return (
    <DashboardLayout user={session.user} clients={sidebarClients}>
      {children}
    </DashboardLayout>
  )
}
