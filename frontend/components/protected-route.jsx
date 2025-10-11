"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/contexts/app-context'
import { Loading } from '@/components/loading'

/**
 * ProtectedRoute component that wraps pages requiring authentication
 * Provides client-side protection as a fallback to middleware
 */
export function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { isAuthenticated, loading } = useApp()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!loading && !isAuthenticated) {
      const currentPath = window.location.pathname
      const loginUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`
      router.push(loginUrl)
    }
  }, [isAuthenticated, loading, router, redirectTo])

  // Show loading while checking authentication
  if (loading) {
    return <Loading />
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return <Loading />
  }

  return children
}