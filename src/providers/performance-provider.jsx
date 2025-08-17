'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { initializePerformance, optimizeImages, setupViewportOptimizations } from '@/lib/performance-init'

const PerformanceContext = createContext({})

export function PerformanceProvider({ children }) {
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait for hydration to complete before running performance optimizations
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    // Delay initialization to ensure React has fully hydrated
    const initTimer = setTimeout(() => {
      initializePerformance()
      
      // Optimize images after initial render
      const optimizeImagesTimer = setTimeout(() => {
        optimizeImages()
      }, 200)

      // Setup viewport optimizations
      setupViewportOptimizations()

      return () => {
        clearTimeout(optimizeImagesTimer)
      }
    }, 100)

    return () => {
      clearTimeout(initTimer)
    }
  }, [isHydrated])

  // Handle route changes for performance optimization
  useEffect(() => {
    if (!isHydrated) return

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
  }, [isHydrated])

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