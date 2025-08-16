/**
 * API caching utilities for Next.js API routes
 */

import { cache } from './performance'

/**
 * Cache configuration for different API endpoints
 */
export const cacheConfig = {
  // Static content - cache for 1 hour
  static: {
    ttl: 3600000, // 1 hour
    staleWhileRevalidate: 7200000, // 2 hours
  },
  
  // Dynamic content - cache for 5 minutes
  dynamic: {
    ttl: 300000, // 5 minutes
    staleWhileRevalidate: 600000, // 10 minutes
  },
  
  // User-specific content - cache for 1 minute
  user: {
    ttl: 60000, // 1 minute
    staleWhileRevalidate: 120000, // 2 minutes
  },
  
  // Real-time content - no cache
  realtime: {
    ttl: 0,
    staleWhileRevalidate: 0,
  }
}

/**
 * Cache middleware for API routes
 */
export function withCache(handler, config = cacheConfig.dynamic) {
  return async (req, res) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return handler(req, res)
    }

    // Generate cache key from URL and query parameters
    const cacheKey = `api:${req.url}:${JSON.stringify(req.query)}`
    
    // Check cache first
    const cached = cache.get(cacheKey)
    if (cached && config.ttl > 0) {
      // Set cache headers
      res.setHeader('Cache-Control', `public, max-age=${Math.floor(config.ttl / 1000)}, stale-while-revalidate=${Math.floor(config.staleWhileRevalidate / 1000)}`)
      res.setHeader('X-Cache', 'HIT')
      
      return res.status(200).json(cached)
    }

    // Intercept response to cache it
    const originalJson = res.json
    res.json = function(data) {
      // Cache successful responses
      if (res.statusCode === 200 && config.ttl > 0) {
        cache.set(cacheKey, data, config.ttl)
      }
      
      // Set cache headers
      if (config.ttl > 0) {
        res.setHeader('Cache-Control', `public, max-age=${Math.floor(config.ttl / 1000)}, stale-while-revalidate=${Math.floor(config.staleWhileRevalidate / 1000)}`)
      } else {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      }
      res.setHeader('X-Cache', 'MISS')
      
      return originalJson.call(this, data)
    }

    return handler(req, res)
  }
}

/**
 * Invalidate cache for specific patterns
 */
export function invalidateCache(pattern) {
  const keys = Array.from(cache.cache.keys())
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.delete(key)
    }
  })
}

/**
 * Cache warming utilities
 */
export const cacheWarmer = {
  /**
   * Warm up dashboard metrics cache
   */
  async warmDashboardMetrics(supabase) {
    try {
      const { optimizedQueries } = await import('./database-optimizations')
      await optimizedQueries.getDashboardMetrics(supabase)
      console.log('Dashboard metrics cache warmed')
    } catch (error) {
      console.error('Failed to warm dashboard metrics cache:', error)
    }
  },

  /**
   * Warm up testimonials cache
   */
  async warmTestimonials(supabase) {
    try {
      const { optimizedQueries } = await import('./database-optimizations')
      await optimizedQueries.getActiveTestimonials(supabase)
      console.log('Testimonials cache warmed')
    } catch (error) {
      console.error('Failed to warm testimonials cache:', error)
    }
  },

  /**
   * Warm up company settings cache
   */
  async warmCompanySettings(supabase) {
    try {
      const { optimizedQueries } = await import('./database-optimizations')
      await optimizedQueries.getCompanySettings(supabase)
      console.log('Company settings cache warmed')
    } catch (error) {
      console.error('Failed to warm company settings cache:', error)
    }
  },

  /**
   * Warm all critical caches
   */
  async warmAll(supabase) {
    await Promise.all([
      this.warmDashboardMetrics(supabase),
      this.warmTestimonials(supabase),
      this.warmCompanySettings(supabase),
    ])
  }
}

/**
 * Response compression middleware
 */
export function withCompression(handler) {
  return async (req, res) => {
    // Set compression headers
    const acceptEncoding = req.headers['accept-encoding'] || ''
    
    if (acceptEncoding.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip')
    } else if (acceptEncoding.includes('deflate')) {
      res.setHeader('Content-Encoding', 'deflate')
    }
    
    return handler(req, res)
  }
}

/**
 * Rate limiting middleware
 */
const rateLimitMap = new Map()

export function withRateLimit(handler, options = { windowMs: 60000, max: 100 }) {
  return async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const key = `${ip}:${req.url}`
    const now = Date.now()
    const windowStart = now - options.windowMs
    
    // Clean old entries
    const requests = rateLimitMap.get(key) || []
    const validRequests = requests.filter(time => time > windowStart)
    
    if (validRequests.length >= options.max) {
      res.setHeader('X-RateLimit-Limit', options.max)
      res.setHeader('X-RateLimit-Remaining', 0)
      res.setHeader('X-RateLimit-Reset', Math.ceil((windowStart + options.windowMs) / 1000))
      
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Rate limit exceeded'
      })
    }
    
    // Add current request
    validRequests.push(now)
    rateLimitMap.set(key, validRequests)
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', options.max)
    res.setHeader('X-RateLimit-Remaining', options.max - validRequests.length)
    res.setHeader('X-RateLimit-Reset', Math.ceil((windowStart + options.windowMs) / 1000))
    
    return handler(req, res)
  }
}

/**
 * Combine multiple middleware functions
 */
export function combineMiddleware(...middlewares) {
  return (handler) => {
    return middlewares.reduceRight((acc, middleware) => {
      return middleware(acc)
    }, handler)
  }
}