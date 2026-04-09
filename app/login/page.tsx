import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { LoginForm } from './_components/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Iniciar sesión' }

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo + título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500 mb-4 shadow-sm">
            <span className="text-white text-xl font-bold select-none">L</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ligrow Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">Acceso restringido al equipo</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          ¿No tienes acceso?{' '}
          <span className="text-gray-500">Contacta al administrador.</span>
        </p>
      </div>
    </main>
  )
}
