'use client'

import { createContext, useContext, useEffect } from 'react'
import { initializePerformance, optimizeImages, setupViewportOptimizations } from '@/lib/performance-init'

const PerformanceContext = createContext({})

export function PerformanceProvider({ children }) {
  useEffect(() => {
    // Initialize performance optimizations on mount
    initializePerformance()
    
    // Optimize images after initial render
    const optimizeImagesTimer = setTimeout(() => {
      optimizeImages()
    }, 100)

    // Setup viewport optimizations
    setupViewportOptimizations()

    // Cleanup
    return () => {
      clearTimeout(optimizeImagesTimer)
    }
  }, [])

  // Handle route changes for performance optimization
  useEffect(() => {
    const handleRouteChange = () => {
      // Re-optimize images on route change
      setTimeout(() => {
        optimizeImages()
      }, 100)
    }

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  return (
    <PerformanceContext.Provider value={{}}>
      {children}
    </PerformanceContext.Provider>
  )
}

export const usePerformance = () => {
  const context = useContext(PerformanceContext)
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider')
  }
  return context
}