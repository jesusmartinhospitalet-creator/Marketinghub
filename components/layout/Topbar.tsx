'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut } from 'next-auth/react'

export type TopbarUser = {
  name?: string | null
  email?: string | null
}

interface TopbarProps {
  user: TopbarUser
}

export function Topbar({ user }: TopbarProps) {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = user.name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? 'U'

  return (
    <header
      className="flex items-center gap-2.5 px-5 bg-[var(--bg1)] border-b border-[var(--border)] flex-shrink-0"
      style={{ height: 'var(--th)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* ── Search ────────────────────────────────────────────────────── */}
      <div className="relative flex-1 max-w-xs">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text4)] pointer-events-none"
          width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar tareas, clientes..."
          className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-[var(--bg2)] border border-[var(--border)] rounded-[9px]
                     placeholder:text-[var(--text4)] text-[var(--text)]
                     focus:outline-none focus:border-[var(--orange)] focus:ring-2 focus:ring-[rgba(255,107,43,0.15)]
                     transition"
        />
      </div>

      {/* ── Spacer ────────────────────────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── AI Assistant button ───────────────────────────────────────── */}
      <button
        className="flex items-center gap-1.5 px-3.5 py-[7px] bg-grad text-white font-bold text-[13px] rounded-[10px]
                   hover:shadow-orange transition-all focus:outline-none focus:ring-2 focus:ring-[rgba(255,107,43,0.4)]"
        onClick={() => {/* abrir panel IA – fase siguiente */}}
      >
        <span aria-hidden>✨</span>
        <span>Asistente IA</span>
      </button>

      {/* ── Divider ───────────────────────────────────────────────────── */}
      <div className="w-px h-5 bg-[var(--border2)]" />

      {/* ── User menu ─────────────────────────────────────────────────── */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-[10px] hover:bg-[var(--bg2)] transition"
        >
          {/* Avatar */}
          <div className="w-[28px] h-[28px] rounded-full bg-grad flex items-center justify-center text-white text-[11px] font-black select-none flex-shrink-0">
            {initials}
          </div>
          {/* Name */}
          <span className="text-[13px] font-medium text-[var(--text3)] hidden sm:block max-w-[120px] truncate">
            {user.name}
          </span>
          {/* Chevron */}
          <svg
            className={`text-[var(--text4)] transition-transform duration-150 ${menuOpen ? 'rotate-180' : ''}`}
            width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-52 bg-[var(--bg1)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow-lg)] z-50 py-1 overflow-hidden">
            {/* User info */}
            <div className="px-3.5 py-2.5 border-b border-[var(--border)]">
              <p className="text-[12px] font-bold text-[var(--text)]">{user.name}</p>
              <p className="text-[11px] text-[var(--text4)] mt-0.5 truncate">{user.email}</p>
            </div>

            {/* Actions */}
            <div className="py-1">
              <button
                className="w-full text-left px-3.5 py-2 text-[12.5px] text-[var(--text3)] hover:bg-[var(--bg2)] hover:text-[var(--text)] transition"
                onClick={() => {/* perfil */}}
              >
                Mi perfil
              </button>
              <button
                className="w-full text-left px-3.5 py-2 text-[12.5px] text-[rgba(239,68,68,0.85)] hover:bg-[rgba(239,68,68,0.06)] transition"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
