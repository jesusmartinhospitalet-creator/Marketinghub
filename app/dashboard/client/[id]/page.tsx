import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    select: { name: true },
  })
  return { title: client?.name ?? 'Cliente' }
}

// ── Sub-components ────────────────────────────────────────────────────────

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--bg2)] rounded-[10px] px-3 py-2.5">
      <div className="text-[10px] font-bold text-[var(--text4)] uppercase tracking-widest mb-0.5">
        {label}
      </div>
      <div className="text-[13px] font-bold text-[var(--text)]">{value}</div>
    </div>
  )
}

function TabPlaceholder({ tabs }: { tabs: string[] }) {
  return (
    <div className="flex gap-1 bg-[var(--bg0)] border border-[var(--border)] p-1 rounded-xl">
      {tabs.map((tab, i) => (
        <div
          key={tab}
          className={`px-4 py-1.5 rounded-[9px] text-[12.5px] font-semibold cursor-default select-none transition-all ${
            i === 0
              ? 'bg-grad text-white font-bold'
              : 'text-[var(--text3)]'
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

function EmptyTableState({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
      <span className="text-4xl opacity-50">{icon}</span>
      <p className="font-bold text-[15px] text-[var(--text2)]">{title}</p>
      <p className="text-[12.5px] text-[var(--text3)] max-w-xs leading-relaxed">{subtitle}</p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────

export default async function ClientPage({ params }: Props) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      code: true,
      description: true,
      startDate: true,
      notes: true,
      _count: {
        select: {
          tasks: true,
          templates: true,
          months: true,
        },
      },
    },
  })

  if (!client) notFound()

  return (
    <div>
      {/* ── Client header card ──────────────────────────────────────── */}
      <div className="card mb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-[18px] font-black tracking-tight text-[var(--text)]">
                {client.name}
              </h1>
              {client.code && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--bg2)] border border-[var(--border2)] text-[11px] font-extrabold text-[var(--text2)]">
                  {client.code}
                </span>
              )}
            </div>
            {client.description && (
              <p className="text-[12.5px] text-[var(--text3)] mt-1.5 max-w-lg">
                {client.description}
              </p>
            )}
          </div>

          <button className="btn text-[12px] py-1.5 px-3">
            ✏️ Editar ficha
          </button>
        </div>

        {/* Meta chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <MetaChip label="Tareas" value={String(client._count.tasks)} />
          <MetaChip label="Plantillas" value={String(client._count.templates)} />
          <MetaChip label="Meses" value={String(client._count.months)} />
          <MetaChip
            label="Inicio"
            value={
              client.startDate
                ? client.startDate.toLocaleDateString('es-ES')
                : '—'
            }
          />
        </div>
      </div>

      {/* ── Monthly templates section ───────────────────────────────── */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4 gap-3">
          <div>
            <h2 className="font-black text-[14px]">🧩 Plantillas mensuales</h2>
            <p className="text-[11px] text-[var(--text3)] mt-0.5">
              Tareas recurrentes que se generan automáticamente cada mes.
            </p>
          </div>
          <button className="btn text-[12px] py-1.5 px-3">+ Nueva plantilla</button>
        </div>
        <EmptyTableState
          icon="🧩"
          title="Sin plantillas"
          subtitle="Crea las tareas recurrentes de este cliente para poder generar meses de trabajo."
        />
      </div>

      {/* ── Monthly planning ────────────────────────────────────────── */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div>
            <h2 className="font-black text-[14px]">🗓 Gestión mensual</h2>
            <p className="text-[11px] text-[var(--text3)] mt-0.5">
              Aún no se ha generado ningún mes.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn text-[12px] py-1.5 px-3" style={{ background: 'rgba(34,197,94,0.09)', borderColor: 'rgba(34,197,94,0.2)', color: 'var(--green)' }}>
              Generar siguiente mes
            </button>
            <button className="btn text-[12px] py-1.5 px-3">Mes concreto</button>
          </div>
        </div>
        <EmptyTableState
          icon="📅"
          title="Sin meses generados"
          subtitle="Crea plantillas primero y luego genera el primer mes del cliente."
        />
      </div>

      {/* ── Tasks section ───────────────────────────────────────────── */}
      <div className="bg-[var(--bg1)] border border-[var(--border)] rounded-[18px] overflow-hidden shadow-card">
        {/* Tabs */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg2)] flex-wrap">
          <TabPlaceholder tabs={['Lista', 'Tablero', 'Gantt']} />
          <button className="btn-primary btn text-[12px] py-1.5 px-3 rounded-[8px]">
            + Nueva tarea
          </button>
        </div>

        {/* Empty table */}
        <EmptyTableState
          icon="📋"
          title="Sin tareas"
          subtitle='Pulsa "+ Nueva tarea" o pídele al asistente que las cree.'
        />
      </div>
    </div>
  )
}
