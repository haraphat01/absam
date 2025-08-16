/**
 * Performance testing utilities for development and monitoring
 */

/**
 * Measure function execution time
 */
export function measureExecutionTime(fn, name = 'Function') {
  return async function(...args) {
    const startTime = performance.now()
    const result = await fn.apply(this, args)
    const endTime = performance.now()
    
    console.log(`${name} execution time: ${(endTime - startTime).toFixed(2)}ms`)
    return result
  }
}

/**
 * Measure component render time
 */
export function measureRenderTime(componentName) {
  const startTime = performance.now()
  
  return () => {
    const endTime = performance.now()
    console.log(`${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`)
  }
}

/**
 * Performance profiler for React components
 */
export function withPerformanceProfiler(WrappedComponent, componentName) {
  return function ProfiledComponent(props) {
    if (typeof window === 'undefined') {
      return WrappedComponent(props)
    }
    
    const startTime = performance.now()
    
    // This would need to be used in a React component context
    // For now, just return the wrapped component
    console.log(`${componentName} render started at: ${startTime.toFixed(2)}ms`)
    
    return WrappedComponent(props)
  }
}

/**
 * Memory usage monitor
 */
export function monitorMemoryUsage() {
  if (!performance.memory) {
    console.warn('Memory monitoring not supported in this browser')
    return
  }
  
  const memory = performance.memory
  console.log('Memory Usage:', {
    used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
    total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
    limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
  })
}

/**
 * Network performance monitor
 */
export function monitorNetworkPerformance() {
  if (!navigator.connection) {
    console.warn('Network monitoring not supported in this browser')
    return
  }
  
  const connection = navigator.connection
  console.log('Network Info:', {
    effectiveType: connection.effectiveType,
    downlink: `${connection.downlink} Mbps`,
    rtt: `${connection.rtt}ms`,
    saveData: connection.saveData
  })
}

/**
 * Bundle size analyzer
 */
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return
  
  const scripts = Array.from(document.querySelectorAll('script[src]'))
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  
  console.log('Bundle Analysis:')
  console.log(`Scripts: ${scripts.length}`)
  console.log(`Stylesheets: ${styles.length}`)
  
  // Estimate total size (this is approximate)
  let totalEstimatedSize = 0
  scripts.forEach(script => {
    // This is a rough estimation
    totalEstimatedSize += script.src.length * 10 // Very rough estimate
  })
  
  console.log(`Estimated total size: ${(totalEstimatedSize / 1024).toFixed(2)} KB`)
}

/**
 * Core Web Vitals reporter
 */
export function reportWebVitals() {
  if (typeof window === 'undefined') return
  
  const vitals = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  }
  
  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    vitals.lcp = lastEntry.startTime
    console.log('LCP:', vitals.lcp.toFixed(2), 'ms')
  })
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
  
  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      vitals.fid = entry.processingStart - entry.startTime
      console.log('FID:', vitals.fid.toFixed(2), 'ms')
    })
  })
  fidObserver.observe({ entryTypes: ['first-input'] })
  
  // Cumulative Layout Shift
  let clsValue = 0
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
        vitals.cls = clsValue
        console.log('CLS:', vitals.cls.toFixed(4))
      }
    })
  })
  clsObserver.observe({ entryTypes: ['layout-shift'] })
  
  // First Contentful Paint
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        vitals.fcp = entry.startTime
        console.log('FCP:', vitals.fcp.toFixed(2), 'ms')
      }
    })
  })
  fcpObserver.observe({ entryTypes: ['paint'] })
  
  // Time to First Byte
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0]
    vitals.ttfb = navigation.responseStart - navigation.requestStart
    console.log('TTFB:', vitals.ttfb.toFixed(2), 'ms')
  })
  
  return vitals
}

/**
 * Performance budget checker
 */
export function checkPerformanceBudget() {
  const budget = {
    lcp: 2500, // 2.5 seconds
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    fcp: 1800, // 1.8 seconds
    ttfb: 600  // 600ms
  }
  
  const vitals = reportWebVitals()
  
  setTimeout(() => {
    const results = {}
    
    Object.keys(budget).forEach(metric => {
      if (vitals[metric] !== null) {
        results[metric] = {
          value: vitals[metric],
          budget: budget[metric],
          passed: vitals[metric] <= budget[metric]
        }
      }
    })
    
    console.log('Performance Budget Results:', results)
    
    const failedMetrics = Object.keys(results).filter(metric => !results[metric].passed)
    if (failedMetrics.length > 0) {
      console.warn('Performance budget exceeded for:', failedMetrics)
    } else {
      console.log('✅ All performance budgets met!')
    }
  }, 5000) // Wait 5 seconds for metrics to be collected
}

/**
 * Initialize performance testing in development
 */
export function initPerformanceTesting() {
  if (process.env.NODE_ENV !== 'development') return
  
  console.log('🚀 Performance testing initialized')
  
  // Monitor memory usage every 30 seconds
  setInterval(monitorMemoryUsage, 30000)
  
  // Monitor network performance
  monitorNetworkPerformance()
  
  // Analyze bundle size
  analyzeBundleSize()
  
  // Report web vitals
  reportWebVitals()
  
  // Check performance budget
  checkPerformanceBudget()
}