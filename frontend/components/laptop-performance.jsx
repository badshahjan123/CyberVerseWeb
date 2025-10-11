"use client"

import { useEffect } from 'react'

export function LaptopPerformance() {
  useEffect(() => {
    // Detect if running on laptop/desktop
    const isLaptop = window.innerWidth >= 768 && 'ontouchstart' in window === false

    if (isLaptop) {
      // Disable expensive effects on laptops
      const style = document.createElement('style')
      style.textContent = `
        /* Reduce GPU load on laptops */
        .backdrop-blur-md { backdrop-filter: blur(4px) !important; }
        .backdrop-blur-lg { backdrop-filter: blur(6px) !important; }
        
        /* Optimize transforms */
        * { will-change: auto !important; }
        .hover\\:scale-\\[1\\.02\\]:hover { 
          transform: scale(1.005) !important; 
          transition: transform 0.1s ease !important;
        }
        
        /* Reduce shadow complexity */
        .shadow-glow, .shadow-coral-glow, .shadow-teal-glow {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3) !important;
        }
      `
      document.head.appendChild(style)

      // Force repaint optimization
      document.body.style.transform = 'translateZ(0)'
    }
  }, [])

  return null
}