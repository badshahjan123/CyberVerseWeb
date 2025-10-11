import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Suspense } from 'react'
import { AppProvider } from '@/contexts/app-context'
import { PerformanceMonitor } from '@/components/performance-monitor'
import { PrefetchOptimizer } from '@/components/prefetch-optimizer'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import './globals.css'

export const metadata = {
  title: 'CYBERVERSE',
  description: 'CYBERVERSE - Hands-On Cybersecurity Training',
  generator: 'cyberverse',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'development' && (
          <script src="/performance-test.js" defer />
        )}
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <AppProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <PerformanceMonitor />
            <PrefetchOptimizer />
          </AppProvider>
        </Suspense>
      </body>
    </html>
  )
}


