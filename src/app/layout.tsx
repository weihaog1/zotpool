import type { Metadata } from 'next'
import '@/styles/globals.css'
import { AuthProvider } from '@/providers/session-provider'

export const metadata: Metadata = {
  title: 'Zotpool - UCI Carpooling Platform',
  description: 'Sustainable commuting through intelligent ride-sharing for UCI students and staff',
  keywords: ['UCI', 'carpooling', 'rideshare', 'sustainable', 'commuting'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}