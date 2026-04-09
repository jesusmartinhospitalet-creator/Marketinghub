import { Sidebar, type SidebarClient } from './Sidebar'
import { Topbar, type TopbarUser } from './Topbar'

interface DashboardLayoutProps {
  children: React.ReactNode
  user: TopbarUser
  clients: SidebarClient[]
}

/**
 * DashboardLayout – the persistent app shell.
 *
 * Structure:
 *   ┌──────────┬─────────────────────────────┐
 *   │          │ Topbar (52px)               │
 *   │ Sidebar  ├─────────────────────────────┤
 *   │ (242px)  │                             │
 *   │          │  {children}  (scrollable)   │
 *   │          │                             │
 *   └──────────┴─────────────────────────────┘
 *
 * The outer div is `h-screen overflow-hidden` so the page never
 * scrolls at the body level – only the content area scrolls.
 */
export function DashboardLayout({ children, user, clients }: DashboardLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden bg-[var(--bg0)]">
      {/* Sidebar */}
      <Sidebar clients={clients} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar user={user} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-[20px_22px_80px]">
          {children}
        </main>
      </div>
    </div>
  )
}
