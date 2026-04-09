'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ClientModal } from '@/components/clients/ClientModal'
import type { ClientDetail } from '@/modules/clients/types'

export type SidebarClient = {
  id: string
  name: string
  code: string | null
  description: string | null
  notes: string | null
  startDate: string | null
  pendingTasks: number
}

interface SidebarProps {
  clients: SidebarClient[]
}

export function Sidebar({ clients }: SidebarProps) {
  const pathname   = usePathname()
  const isDashboard = pathname === '/dashboard'

  const [modalClient, setModalClient] = useState<ClientDetail | null>(null)
  const [showCreate,  setShowCreate]  = useState(false)

  return (
    <>
      <aside
        className="flex flex-col flex-shrink-0 bg-[var(--bg1)] border-r border-[var(--border)]"
        style={{ width: 'var(--sw)' }}
      >
        {/* ── Header / Logo ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-2.5 px-4 py-[15px] border-b border-[var(--border)]">
          <div className="w-[33px] h-[33px] rounded-[9px] bg-grad flex items-center justify-center font-black text-[12px] text-white select-none flex-shrink-0">
            LG
          </div>
          <div>
            <div className="font-black text-[15px] tracking-tight leading-tight">Ligrow</div>
            <div className="text-[10px] text-[var(--text4)] font-medium">Tasks</div>
          </div>
        </div>

        {/* ── Scrollable nav ────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto py-2.5 px-2">

          {/* Dashboard link */}
          <Link href="/dashboard">
            <div className={`flex items-center gap-2 px-2.5 py-2 rounded-[9px] cursor-pointer text-[13px] font-medium transition-all duration-100 select-none ${
              isDashboard
                ? 'sb-active'
                : 'text-[var(--text3)] hover:bg-[var(--bg3)] hover:text-[var(--text2)]'
            }`}>
              <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 transition-colors ${
                isDashboard ? 'bg-[var(--orange)]' : 'bg-[var(--border2)]'
              }`} />
              <span>Dashboard</span>
            </div>
          </Link>

          {/* Clients section */}
          {clients.length > 0 && (
            <>
              <div className="text-[10px] font-bold text-[var(--text4)] mx-2.5 mt-3.5 mb-1.5 tracking-[0.06em]">
                CLIENTES
              </div>

              {clients.map(client => {
                const isActive = pathname === `/dashboard/client/${client.id}`
                return (
                  <ClientItem
                    key={client.id}
                    client={client}
                    isActive={isActive}
                    onEdit={() => setModalClient({
                      id:          client.id,
                      name:        client.name,
                      code:        client.code,
                      description: client.description,
                      notes:       client.notes,
                      startDate:   client.startDate,
                    })}
                  />
                )
              })}
            </>
          )}

          {/* Empty clients state */}
          {clients.length === 0 && (
            <div className="mx-2 mt-4 p-3 rounded-xl border border-dashed border-[var(--border2)] text-center">
              <p className="text-[11px] text-[var(--text4)] font-medium">Sin clientes</p>
              <p className="text-[10px] text-[var(--text4)] opacity-70 mt-0.5">
                Crea el primer cliente
              </p>
            </div>
          )}
        </div>

        {/* ── Footer / New client ───────────────────────────────────────── */}
        <div className="p-3 border-t border-[var(--border)]">
          <button
            className="w-full py-2 px-3.5 bg-grad text-white font-bold text-[13px] rounded-[10px] transition-all hover:shadow-orange"
            onClick={() => setShowCreate(true)}
          >
            + Nuevo cliente
          </button>
        </div>
      </aside>

      {/* Create modal */}
      {showCreate && (
        <ClientModal onClose={() => setShowCreate(false)} />
      )}

      {/* Edit modal */}
      {modalClient && (
        <ClientModal
          client={modalClient}
          onClose={() => setModalClient(null)}
        />
      )}
    </>
  )
}

/* ── Client row (sub-component) ─────────────────────────────────────────── */
function ClientItem({
  client,
  isActive,
  onEdit,
}: {
  client: SidebarClient
  isActive: boolean
  onEdit: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/dashboard/client/${client.id}`}>
      <div
        className={`relative flex items-center gap-2 px-2.5 py-2 rounded-[9px] cursor-pointer text-[13px] font-medium transition-all duration-100 select-none ${
          isActive
            ? 'sb-active'
            : 'text-[var(--text3)] hover:bg-[var(--bg3)] hover:text-[var(--text2)]'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Status dot */}
        <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 transition-colors ${
          isActive ? 'bg-[var(--orange)]' : 'bg-[var(--border2)]'
        }`} />

        {/* Name */}
        <span className="flex-1 truncate" title={client.name}>
          {client.name}
        </span>

        {/* Code */}
        {client.code && !hovered && (
          <span className="text-[10px] font-extrabold text-[var(--text4)] mr-0.5">
            {client.code}
          </span>
        )}

        {/* Pending badge */}
        {client.pendingTasks > 0 && !hovered && (
          <span className="text-[10px] font-bold bg-[var(--bg3)] text-[var(--text4)] px-1.5 py-0.5 rounded-full">
            {client.pendingTasks}
          </span>
        )}

        {/* Hover actions */}
        {hovered && (
          <div className="flex gap-1" onClick={e => e.preventDefault()}>
            <button
              className="w-[22px] h-[22px] rounded-[5px] flex items-center justify-center text-[11px] bg-[rgba(0,0,0,0.07)] border border-[var(--border)] hover:bg-[rgba(255,107,43,0.11)] hover:border-[rgba(255,107,43,0.28)] transition-all"
              onClick={e => { e.preventDefault(); onEdit() }}
              title="Editar"
            >
              ✏️
            </button>
          </div>
        )}
      </div>
    </Link>
  )
}
