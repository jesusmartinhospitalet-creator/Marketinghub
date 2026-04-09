import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Ligrow Tasks',
    template: '%s | Ligrow Tasks',
  },
  description: 'Plataforma interna de gestión de tareas y clientes de marketing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
