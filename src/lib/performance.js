/**
 * Performance monitoring and optimization utilities
 */

/**
 * Debounce function to limit function calls
 */
export function debounce(func, wait, immediate = false) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

/**
 * Throttle function to limit function execution rate
 */
export function throttle(func, limit) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages(selector = '[data-lazy]') {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.lazy
          img.classList.remove('lazy')
          img.classList.add('fade-in')
          observer.unobserve(img)
        }
      })
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    })

    document.querySelectorAll(selector).forEach(img => {
      imageObserver.observe(img)
    })
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href, as = 'script', crossorigin = null) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (crossorigin) link.crossOrigin = crossorigin
  document.head.appendChild(link)
}

/**
 * Measure and report Core Web Vitals
 */
export function measureWebVitals() {
  if (typeof window === 'undefined') return

  // Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    console.log('LCP:', lastEntry.startTime)
  })
  observer.observe({ entryTypes: ['largest-contentful-paint'] })

  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      console.log('FID:', entry.processingStart - entry.startTime)
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
        console.log('CLS:', clsValue)
      }
    })
  })
  clsObserver.observe({ entryTypes: ['layout-shift'] })
}

/**
 * Simple in-memory cache with TTL
 */
class SimpleCache {
  constructor() {
    this.cache = new Map()
  }

  set(key, value, ttl = 300000) { // 5 minutes default
    const expiry = Date.now() + ttl
    this.cache.set(key, { value, expiry })
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }

  delete(key) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

export const cache = new SimpleCache()

/**
 * Memoization helper for expensive computations
 */
export function memoize(fn, getKey = (...args) => JSON.stringify(args)) {
  const cache = new Map()
  
  return function memoized(...args) {
    const key = getKey(...args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn.apply(this, args)
    cache.set(key, result)
    
    return result
  }
}

/**
 * Batch DOM updates to avoid layout thrashing
 */
export function batchDOMUpdates(updates) {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      updates.forEach(update => update())
      resolve()
    })
  })
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Optimize images by converting to WebP if supported
 */
export function getOptimizedImageUrl(src, width, quality = 85) {
  if (typeof window === 'undefined') return src
  
  // Check if browser supports WebP
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0
  
  const format = supportsWebP ? 'webp' : 'jpeg'
  
  // If using Next.js Image optimization
  if (src.startsWith('/')) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}&f=${format}`
  }
  
  return src
}

/**
 * Preconnect to external domains
 */
export function preconnectToDomain(domain) {
  if (typeof document === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = domain
  document.head.appendChild(link)
}

/**
 * Resource hints for better loading performance
 */
export function addResourceHints() {
  if (typeof document === 'undefined') return
  
  // Preconnect to external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]
  
  domains.forEach(preconnectToDomain)
}

/**
 * Initialize performance optimizations
 */
export function initPerformanceOptimizations() {
  if (typeof window === 'undefined') return
  
  // Add resource hints
  addResourceHints()
  
  // Lazy load images
  lazyLoadImages()
  
  // Measure web vitals in development
  if (process.env.NODE_ENV === 'development') {
    measureWebVitals()
  }
  
  // Optimize scroll performance
  let ticking = false
  const optimizedScroll = throttle(() => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Handle scroll events here
        ticking = false
      })
      ticking = true
    }
  }, 16) // ~60fps
  
  window.addEventListener('scroll', optimizedScroll, { passive: true })
}