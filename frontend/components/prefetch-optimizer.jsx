"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function PrefetchOptimizer() {
  const router = useRouter()

  useEffect(() => {
    // Prefetch critical pages after initial load
    const prefetchPages = [
      '/login',
      '/register', 
      '/dashboard',
      '/labs',
      '/rooms',
      '/leaderboard'
    ]

    const timer = setTimeout(() => {
      prefetchPages.forEach(page => {
        router.prefetch(page)
      })
    }, 1000) // Wait 1 second after page load

    return () => clearTimeout(timer)
  }, [router])

  return null
}