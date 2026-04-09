'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ClientModal } from './ClientModal'
import { deleteClient } from '@/modules/clients/actions'
import type { ClientDetail } from '@/modules/clients/types'

interface ClientActionsProps {
  client: ClientDetail
}

/**
 * Renders the Edit and Delete buttons for a client detail page.
 * This is a client component so it can manage modal / confirmation state.
 */
export function ClientActions({ client }: ClientActionsProps) {
  const router = useRouter()
  const [showEdit,   setShowEdit]   = useState(false)
  const [deleteStep, setDeleteStep] = useState<'idle' | 'confirm'>('idle')
  const [isPending,  startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleDelete() {
    setError(null)
    startTransition(async () => {
      const result = await deleteClient(client.id)
      if (!result.success) {
        setError(result.error)
        setDeleteStep('idle')
        return
      }
      router.push('/dashboard')
      router.refresh()
    })
  }

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Edit button */}
        <button
          className="btn text-[12px] py-1.5 px-3"
          onClick={() => setShowEdit(true)}
        >
          ✏️ Editar ficha
        </button>

        {/* Delete – idle state */}
        {deleteStep === 'idle' && (
          <button
            className="btn text-[12px] py-1.5 px-3"
            style={{
              borderColor: 'rgba(239,68,68,0.3)',
              color: 'var(--red)',
            }}
            onClick={() => setDeleteStep('confirm')}
          >
            🗑 Eliminar
          </button>
        )}

        {/* Delete – confirmation state */}
        {deleteStep === 'confirm' && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.25)]">
            <span className="text-[12px] text-[var(--red)] font-semibold">
              ¿Eliminar «{client.name}»? Es irreversible.
            </span>
            <button
              className="btn text-[11px] py-1 px-2.5"
              onClick={() => setDeleteStep('idle')}
              disabled={isPending}
            >
              Cancelar
            </button>
            <button
              className="btn text-[11px] py-1 px-2.5"
              style={{
                background: 'var(--red)',
                border: 'none',
                color: '#fff',
              }}
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'Eliminando…' : 'Confirmar'}
            </button>
          </div>
        )}
      </div>

      {/* Error from delete */}
      {error && (
        <p className="text-[12px] text-[var(--red)] mt-1">{error}</p>
      )}

      {/* Edit modal */}
      {showEdit && (
        <ClientModal
          client={client}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  )
}
