// Performance testing utilities
// Run this in browser console to test navigation performance

function measureNavigationPerformance() {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log('Navigation Performance Metrics:')
        console.log(`TTFB: ${entry.responseStart - entry.fetchStart}ms`)
        console.log(`DOM Content Loaded: ${entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart}ms`)
        console.log(`Load Complete: ${entry.loadEventEnd - entry.loadEventStart}ms`)
        console.log(`Total Navigation Time: ${entry.loadEventEnd - entry.fetchStart}ms`)
      }
      
      if (entry.entryType === 'largest-contentful-paint') {
        console.log(`LCP: ${entry.startTime}ms`)
      }
      
      if (entry.entryType === 'first-input') {
        console.log(`FID: ${entry.processingStart - entry.startTime}ms`)
      }
    }
  })
  
  observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input'] })
  
  // Measure Core Web Vitals
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log(`CLS: ${entry.value}`)
    }
  }).observe({ entryTypes: ['layout-shift'] })
}

// Auto-run when script loads
if (typeof window !== 'undefined') {
  measureNavigationPerformance()
}

// Export for manual testing
window.measureNavigationPerformance = measureNavigationPerformance