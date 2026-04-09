import { auth } from '@/auth'
import { LogoutButton } from './_components/LogoutButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold select-none">L</span>
            </div>
            <span className="font-semibold text-gray-900">Ligrow Tasks</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Avatar + nombre */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-700 hidden sm:block">
                {session?.user?.name}
              </span>
            </div>

            <div className="w-px h-4 bg-gray-200" />

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido, {session?.user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 mt-1">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Placeholder módulos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Clientes', icon: '🏢', desc: 'Próximamente' },
            { label: 'Tareas', icon: '✅', desc: 'Próximamente' },
            { label: 'Planificación mensual', icon: '📅', desc: 'Próximamente' },
            { label: 'Asistente IA', icon: '🤖', desc: 'Próximamente' },
            { label: 'Recordatorios', icon: '🔔', desc: 'Próximamente' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-3 opacity-60"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}

          {/* Estado del proyecto */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 flex items-start gap-3">
            <span className="text-2xl">🚧</span>
            <div>
              <p className="font-medium text-amber-800">En construcción</p>
              <p className="text-xs text-amber-600 mt-0.5">Autenticación activa</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
