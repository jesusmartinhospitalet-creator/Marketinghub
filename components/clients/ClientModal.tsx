'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient, updateClient } from '@/modules/clients/actions'
import type { ClientDetail } from '@/modules/clients/types'

interface ClientModalProps {
  /** If provided → edit mode; if undefined → create mode */
  client?: ClientDetail
  onClose: () => void
}

// ── Field component ───────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-[var(--text4)] uppercase tracking-[0.06em]">
        {label}
        {required && <span className="text-[var(--orange)] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = `
  border border-[var(--border)] rounded-[10px] px-3 py-2 text-[13px] font-[inherit]
  bg-[var(--bg1)] text-[var(--text)] outline-none w-full
  focus:border-[var(--orange)] focus:ring-2 focus:ring-[rgba(255,107,43,0.15)]
  placeholder:text-[var(--text4)] transition-all
`.trim()

const sectionTitle = 'text-[10px] font-bold text-[var(--text4)] uppercase tracking-[0.06em] pb-1 border-b border-[var(--border)] mb-1'

// ── Modal ─────────────────────────────────────────────────────────────────

export function ClientModal({ client, onClose }: ClientModalProps) {
  const router   = useRouter()
  const formRef  = useRef<HTMLFormElement>(null)
  const isEdit   = !!client

  const [error,      setError]      = useState<string | null>(null)
  const [isPending,  startTransition] = useTransition()

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Trap focus & scroll-lock while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = isEdit
        ? await updateClient(client.id, formData)
        : await createClient(formData)

      if (!result.success) {
        setError(result.error)
        return
      }

      onClose()
      router.refresh()
    })
  }

  return (
    /* ── Overlay ── */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(4px)' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* ── Card ── */}
      <div
        className="w-full bg-[var(--bg1)] border border-[var(--border)] flex flex-col overflow-hidden"
        style={{
          maxWidth: 680,
          maxHeight: '92vh',
          borderRadius: 20,
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--bg2)]">
          <h2 className="font-black text-[15px] tracking-tight">
            {isEdit ? `Editar: ${client.name}` : 'Nuevo cliente'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="btn text-[12px] py-1 px-2.5"
            disabled={isPending}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">

            {/* ── INFORMACIÓN BÁSICA ───────────────────────────── */}
            <div className={sectionTitle}>Información básica</div>

            <div className="grid grid-cols-[1fr_120px] gap-3">
              <Field label="Nombre" required>
                <input
                  name="name"
                  type="text"
                  required
                  autoFocus
                  className={inputCls}
                  defaultValue={client?.name ?? ''}
                  placeholder="Nombre del cliente"
                  disabled={isPending}
                />
              </Field>
              <Field label="Código">
                <input
                  name="code"
                  type="text"
                  maxLength={8}
                  className={inputCls}
                  defaultValue={client?.code ?? ''}
                  placeholder="ACM"
                  style={{ textTransform: 'uppercase' }}
                  onChange={e => { e.target.value = e.target.value.toUpperCase() }}
                  disabled={isPending}
                />
              </Field>
            </div>

            <Field label="Descripción">
              <textarea
                name="description"
                rows={3}
                className={inputCls}
                style={{ resize: 'vertical', minHeight: 72 }}
                defaultValue={client?.description ?? ''}
                placeholder="Resumen breve del cliente, servicios contratados…"
                disabled={isPending}
              />
            </Field>

            {/* ── NOTAS INTERNAS ──────────────────────────────── */}
            <div className={sectionTitle}>Notas internas</div>

            <Field label="Notas">
              <textarea
                name="notes"
                rows={4}
                className={inputCls}
                style={{ resize: 'vertical', minHeight: 96 }}
                defaultValue={client?.notes ?? ''}
                placeholder="Información interna del equipo, contexto del proyecto, acuerdos…"
                disabled={isPending}
              />
            </Field>

            {/* ── DATOS DEL PROYECTO ──────────────────────────── */}
            <div className={sectionTitle}>Datos del proyecto</div>

            <div className="max-w-[200px]">
              <Field label="Fecha de inicio">
                <input
                  name="startDate"
                  type="date"
                  className={inputCls}
                  defaultValue={client?.startDate ?? ''}
                  disabled={isPending}
                />
              </Field>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.25)]">
                <span className="text-[var(--red)] text-[13px] shrink-0 mt-px">⚠️</span>
                <p className="text-[12.5px] text-[var(--red)]">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border)] bg-[var(--bg2)]">
            <button
              type="button"
              onClick={onClose}
              className="btn text-[13px]"
              disabled={isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary btn text-[13px]"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {isEdit ? 'Guardando…' : 'Creando…'}
                </span>
              ) : (
                isEdit ? 'Guardar cambios' : 'Crear cliente'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
