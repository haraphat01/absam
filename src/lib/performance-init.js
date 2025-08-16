/**
 * Performance initialization script
 * This should be loaded early in the application lifecycle
 */

import { initPerformanceOptimizations } from './performance'
import { initPerformanceTesting } from './performance-testing'

/**
 * Initialize all performance optimizations
 */
export function initializePerformance() {
  if (typeof window === 'undefined') return

  // Initialize core performance optimizations
  initPerformanceOptimizations()

  // Add critical resource hints
  addCriticalResourceHints()

  // Setup intersection observer for lazy loading
  setupIntersectionObserver()

  // Initialize service worker for caching (if available)
  initializeServiceWorker()

  // Setup performance monitoring
  setupPerformanceMonitoring()

  // Initialize performance testing in development
  if (process.env.NODE_ENV === 'development') {
    initPerformanceTesting()
  }
}

/**
 * Add critical resource hints for better loading performance
 */
function addCriticalResourceHints() {
  const head = document.head

  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    link.crossOrigin = 'anonymous'
    head.appendChild(link)
  })

  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    '//vercel.com',
    '//supabase.co',
  ]

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    head.appendChild(link)
  })
}

/**
 * Setup intersection observer for lazy loading elements
 */
function setupIntersectionObserver() {
  if (!('IntersectionObserver' in window)) return

  // Lazy load images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.remove('lazy-load')
          img.classList.add('loaded')
          imageObserver.unobserve(img)
        }
      }
    })
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  })

  // Observe all lazy images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img)
  })

  // Lazy load components
  const componentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target
        element.classList.add('loaded')
        componentObserver.unobserve(element)
      }
    })
  }, {
    rootMargin: '100px 0px',
    threshold: 0.1
  })

  // Observe all lazy components
  document.querySelectorAll('.lazy-load').forEach(element => {
    componentObserver.observe(element)
  })
}

/**
 * Initialize service worker for caching
 */
function initializeServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}

/**
 * Setup performance monitoring
 */
function setupPerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      
      // Report LCP to analytics (replace with your analytics service)
      if (process.env.NODE_ENV === 'development') {
        console.log('LCP:', lastEntry.startTime)
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime
        
        // Report FID to analytics
        if (process.env.NODE_ENV === 'development') {
          console.log('FID:', fid)
        }
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          
          // Report CLS to analytics
          if (process.env.NODE_ENV === 'development') {
            console.log('CLS:', clsValue)
          }
        }
      })
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
  }

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Long task detected:', entry.duration, 'ms')
        }
      })
    })
    longTaskObserver.observe({ entryTypes: ['longtask'] })
  }

  // Monitor navigation timing
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0]
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Navigation timing:', {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart
        })
      }
    }, 0)
  })
}

/**
 * Optimize images on the page
 */
export function optimizeImages() {
  const images = document.querySelectorAll('img')
  
  images.forEach(img => {
    // Add loading="lazy" to images below the fold
    if (!img.hasAttribute('loading')) {
      const rect = img.getBoundingClientRect()
      if (rect.top > window.innerHeight) {
        img.loading = 'lazy'
      }
    }

    // Add error handling
    img.addEventListener('error', () => {
      img.classList.add('image-error')
      img.alt = 'Failed to load image'
    })

    // Add load handling
    img.addEventListener('load', () => {
      img.classList.add('image-loaded')
    })
  })
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  const criticalResources = [
    { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
    // Add other critical resources here
  ]

  criticalResources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource.href
    link.as = resource.as
    if (resource.type) link.type = resource.type
    if (resource.as === 'font') link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * Setup viewport-based optimizations
 */
export function setupViewportOptimizations() {
  // Reduce animations on small screens or slow connections
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
  const isSmallScreen = window.innerWidth < 768

  if (isSlowConnection || isSmallScreen) {
    document.documentElement.classList.add('reduce-animations')
  }

  // Add viewport-based classes
  if (window.innerWidth < 768) {
    document.documentElement.classList.add('mobile-viewport')
  } else if (window.innerWidth < 1024) {
    document.documentElement.classList.add('tablet-viewport')
  } else {
    document.documentElement.classList.add('desktop-viewport')
  }
}