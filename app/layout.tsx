import type { Metadata } from 'next'
import { AuthProvider } from './_providers/AuthProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Ligrow Tasks',
    template: '%s | Ligrow Tasks',
  },
  description: 'Plataforma interna de gestión de tareas y clientes de marketing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Space Grotesk – loaded at runtime, no build-time fetch required */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
