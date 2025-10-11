"use client"

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Simple performance monitoring without router events
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log(`Page load time: ${entry.loadEventEnd - entry.fetchStart}ms`)
        }
      }
    })
    
    observer.observe({ entryTypes: ['navigation'] })
    
    return () => observer.disconnect()
  }, [])

  return null
}