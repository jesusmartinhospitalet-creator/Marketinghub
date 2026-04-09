import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

// ── Sub-components ────────────────────────────────────────────────────────

function ClientCard({
  id,
  name,
  code,
  pendingTasks,
  totalTasks,
}: {
  id: string
  name: string
  code: string | null
  pendingTasks: number
  totalTasks: number
}) {
  const pct = totalTasks > 0 ? Math.round(((totalTasks - pendingTasks) / totalTasks) * 100) : 0

  return (
    <Link href={`/dashboard/client/${id}`}>
      <div className="card hover:border-[var(--orange)] transition-colors cursor-pointer group">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-[14px] group-hover:text-[var(--orange)] transition-colors">
              {name}
            </span>
            {code && (
              <span className="text-[10px] font-extrabold text-[var(--text4)] bg-[var(--bg2)] border border-[var(--border2)] px-1.5 py-0.5 rounded-md">
                {code}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-[var(--text4)] whitespace-nowrap">
            {pendingTasks} pendiente{pendingTasks !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-[5px] bg-[var(--bg3)] rounded-full overflow-hidden">
            <div
              className="h-full bg-grad rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-[var(--text4)]">{pct}%</span>
        </div>
      </div>
    </Link>
  )
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string
  value: number
  icon: string
  accent?: string
}) {
  return (
    <div className="card">
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text4)] uppercase tracking-[0.06em] mb-1">
        <span aria-hidden>{icon}</span>
        {label}
      </div>
      <div className={`text-[30px] font-black leading-none mt-1 ${accent ?? 'text-[var(--text)]'}`}>
        {value}
      </div>
      <div className="h-[5px] bg-[var(--bg3)] rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-grad" style={{ width: value > 0 ? '100%' : '0%' }} />
      </div>
    </div>
  )
}

function EmptySection({
  icon,
  title,
  subtitle,
}: {
  icon: string
  title: string
  subtitle: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
      <span className="text-4xl opacity-50">{icon}</span>
      <p className="font-bold text-[15px] text-[var(--text2)]">{title}</p>
      <p className="text-[12.5px] text-[var(--text3)] max-w-xs leading-relaxed">{subtitle}</p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await auth()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'equipo'

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Fetch task stats and client list in parallel
  const [taskStats, clients] = await Promise.all([
    prisma.task.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
    prisma.client.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        tasks: { select: { id: true, status: true } },
      },
      orderBy: { name: 'asc' },
    }),
  ])

  const pending   = taskStats.find(s => s.status === 'PENDING'    || s.status === 'IN_PROGRESS')?._count._all ?? 0
  const pendingTotal = taskStats.filter(s => ['PENDING', 'IN_PROGRESS'].includes(s.status)).reduce((acc, s) => acc + s._count._all, 0)
  const completed = taskStats.find(s => s.status === 'DONE')?._count._all ?? 0
  const now = new Date()
  const overdueCount = await prisma.task.count({
    where: { status: { in: ['PENDING', 'IN_PROGRESS'] }, dueDate: { lt: now } },
  })

  const clientCards = clients.map(c => ({
    id:           c.id,
    name:         c.name,
    code:         c.code,
    totalTasks:   c.tasks.length,
    pendingTasks: c.tasks.filter(t => t.status !== 'DONE' && t.status !== 'CANCELLED').length,
  }))

  return (
    <div>
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-[18px] font-black tracking-tight text-[var(--text)]">
          Resumen General
        </h1>
        <p className="text-[12px] text-[var(--text4)] mt-0.5 capitalize">{today}</p>
      </div>

      {/* ── Stats row ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <StatCard label="Pendientes"  value={pendingTotal}  icon="📋" />
        <StatCard label="Completadas" value={completed}     icon="✅" />
        <StatCard label="Vencidas"    value={overdueCount}  icon="⚠️" accent="text-[var(--red)]" />
      </div>

      {/* ── Clients overview ────────────────────────────────────────── */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-[14px]">Clientes</h2>
          <span className="text-[11px] text-[var(--text4)] font-semibold">
            {clientCards.length} cliente{clientCards.length !== 1 ? 's' : ''}
          </span>
        </div>
        {clientCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {clientCards.map(c => <ClientCard key={c.id} {...c} />)}
          </div>
        ) : (
          <EmptySection
            icon="🏢"
            title="Sin clientes"
            subtitle={`Hola, ${firstName}. Crea tu primer cliente usando el botón "+ Nuevo cliente" en el menú lateral.`}
          />
        )}
      </div>

      {/* ── Team workload ───────────────────────────────────────────── */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-[14px]">Carga del equipo</h2>
        </div>
        <EmptySection
          icon="👥"
          title="Sin datos aún"
          subtitle="Cuando existan tareas asignadas aparecerá la carga por persona aquí."
        />
      </div>

      {/* ── Urgent tasks ────────────────────────────────────────────── */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-[14px]">🔥 Urgentes / Vencidas</h2>
        </div>
        <EmptySection
          icon="📋"
          title="Sin tareas urgentes"
          subtitle="Las tareas vencidas o de alta prioridad aparecerán aquí."
        />
      </div>
    </div>
  )
}
