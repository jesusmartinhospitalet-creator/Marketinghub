export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500">
          <span className="text-white text-2xl font-bold">L</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ligrow Tasks</h1>
        <p className="text-gray-500 mb-8">
          Plataforma de gestión de tareas y clientes
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-sm text-amber-700 font-medium">En construcción</span>
        </div>
      </div>
    </main>
  )
}
