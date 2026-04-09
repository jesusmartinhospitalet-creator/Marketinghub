'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'
import type { ActionResult } from './types'

// ── Helpers ───────────────────────────────────────────────────────────────

function parseForm(formData: FormData) {
  return {
    name:        (formData.get('name')        as string)?.trim() || '',
    code:        (formData.get('code')        as string)?.trim().toUpperCase() || null,
    description: (formData.get('description') as string)?.trim() || null,
    notes:       (formData.get('notes')       as string)?.trim() || null,
    startDate:   (formData.get('startDate')   as string) || null,
  }
}

// ── Actions ───────────────────────────────────────────────────────────────

/** Create a new client. */
export async function createClient(
  formData: FormData
): Promise<ActionResult<{ id: string; name: string }>> {
  await requireAuth()

  const { name, code, description, notes, startDate } = parseForm(formData)

  if (!name) {
    return { success: false, error: 'El nombre del cliente es obligatorio.' }
  }

  // Unique code check
  if (code) {
    const exists = await prisma.client.findUnique({ where: { code } })
    if (exists) {
      return { success: false, error: `El código "${code}" ya está en uso por otro cliente.` }
    }
  }

  try {
    const client = await prisma.client.create({
      data: {
        name,
        code,
        description,
        notes,
        startDate: startDate ? new Date(startDate) : null,
      },
      select: { id: true, name: true },
    })

    revalidatePath('/dashboard')
    return { success: true, data: client }
  } catch {
    return { success: false, error: 'Error interno al crear el cliente.' }
  }
}

/** Update an existing client. */
export async function updateClient(
  id: string,
  formData: FormData
): Promise<ActionResult<{ id: string; name: string }>> {
  await requireAuth()

  const { name, code, description, notes, startDate } = parseForm(formData)

  if (!name) {
    return { success: false, error: 'El nombre del cliente es obligatorio.' }
  }

  // Unique code check – exclude the client being updated
  if (code) {
    const exists = await prisma.client.findFirst({
      where: { code, NOT: { id } },
    })
    if (exists) {
      return { success: false, error: `El código "${code}" ya está en uso por otro cliente.` }
    }
  }

  try {
    const client = await prisma.client.update({
      where: { id },
      data: {
        name,
        code,
        description,
        notes,
        startDate: startDate ? new Date(startDate) : null,
      },
      select: { id: true, name: true },
    })

    revalidatePath('/dashboard')
    revalidatePath(`/dashboard/client/${id}`)
    return { success: true, data: client }
  } catch {
    return { success: false, error: 'Error interno al actualizar el cliente.' }
  }
}

/** Delete a client and all its related data (cascade in DB). */
export async function deleteClient(
  id: string
): Promise<ActionResult> {
  await requireAuth()

  try {
    await prisma.client.delete({ where: { id } })
    revalidatePath('/dashboard')
    return { success: true, data: undefined }
  } catch {
    return { success: false, error: 'Error interno al eliminar el cliente.' }
  }
}
