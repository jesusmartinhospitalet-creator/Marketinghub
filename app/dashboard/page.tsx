import { auth } from '@/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

// ── Sub-components ────────────────────────────────────────────────────────

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
        <StatCard label="Pendientes"  value={0} icon="📋" />
        <StatCard label="Completadas" value={0} icon="✅" />
        <StatCard label="Vencidas"    value={0} icon="⚠️" accent="text-[var(--red)]" />
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

      {/* ── Clients overview ────────────────────────────────────────── */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-[14px]">Clientes</h2>
        </div>
        <EmptySection
          icon="🏢"
          title="Sin clientes"
          subtitle={`Hola, ${firstName}. Crea tu primer cliente usando el botón "Nuevo cliente" en el menú lateral.`}
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
