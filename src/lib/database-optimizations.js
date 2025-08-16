/**
 * Database query optimization utilities
 */

import { cache } from './performance'

/**
 * Query builder with optimization hints
 */
export class OptimizedQuery {
  constructor(supabase) {
    this.supabase = supabase
    this.table = null
    this.selectFields = '*'
    this.filters = []
    this.orderBy = null
    this.limitValue = null
    this.cacheKey = null
    this.cacheTTL = 300000 // 5 minutes default
  }

  from(table) {
    this.table = table
    return this
  }

  select(fields) {
    this.selectFields = fields
    return this
  }

  filter(column, operator, value) {
    this.filters.push({ column, operator, value })
    return this
  }

  order(column, ascending = true) {
    this.orderBy = { column, ascending }
    return this
  }

  limit(count) {
    this.limitValue = count
    return this
  }

  cached(key, ttl = this.cacheTTL) {
    this.cacheKey = key
    this.cacheTTL = ttl
    return this
  }

  async execute() {
    // Check cache first
    if (this.cacheKey) {
      const cached = cache.get(this.cacheKey)
      if (cached) {
        return { data: cached, error: null, fromCache: true }
      }
    }

    let query = this.supabase.from(this.table).select(this.selectFields)

    // Apply filters
    this.filters.forEach(({ column, operator, value }) => {
      query = query.filter(column, operator, value)
    })

    // Apply ordering
    if (this.orderBy) {
      query = query.order(this.orderBy.column, { ascending: this.orderBy.ascending })
    }

    // Apply limit
    if (this.limitValue) {
      query = query.limit(this.limitValue)
    }

    const result = await query

    // Cache successful results
    if (!result.error && this.cacheKey) {
      cache.set(this.cacheKey, result.data, this.cacheTTL)
    }

    return { ...result, fromCache: false }
  }
}

/**
 * Optimized queries for common operations
 */
export const optimizedQueries = {
  /**
   * Get dashboard metrics with caching
   */
  async getDashboardMetrics(supabase) {
    const cacheKey = 'dashboard-metrics'
    const cached = cache.get(cacheKey)
    
    if (cached) {
      return { data: cached, error: null, fromCache: true }
    }

    try {
      // Use Promise.all for parallel queries
      const [invoicesResult, testimonialsResult, contactsResult] = await Promise.all([
        // Invoices count by status
        supabase
          .from('invoices')
          .select('status', { count: 'exact', head: true })
          .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
        
        // Testimonials count this month
        supabase
          .from('testimonials')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
          .eq('is_active', true),
        
        // Contact inquiries this month
        supabase
          .from('contact_inquiries')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
      ])

      const metrics = {
        invoices: {
          total: invoicesResult.count || 0,
          // Additional invoice status breakdown would require separate queries
        },
        testimonials: testimonialsResult.count || 0,
        contacts: contactsResult.count || 0,
        lastUpdated: new Date().toISOString()
      }

      // Cache for 5 minutes
      cache.set(cacheKey, metrics, 300000)
      
      return { data: metrics, error: null, fromCache: false }
    } catch (error) {
      return { data: null, error, fromCache: false }
    }
  },

  /**
   * Get recent invoices with pagination
   */
  async getRecentInvoices(supabase, page = 1, limit = 10) {
    const offset = (page - 1) * limit
    const cacheKey = `recent-invoices-${page}-${limit}`
    
    return new OptimizedQuery(supabase)
      .from('invoices')
      .select('id, invoice_number, client_name, total_amount, status, created_at')
      .order('created_at', false)
      .limit(limit)
      .cached(cacheKey, 60000) // Cache for 1 minute
      .execute()
  },

  /**
   * Get active testimonials
   */
  async getActiveTestimonials(supabase) {
    const cacheKey = 'active-testimonials'
    
    return new OptimizedQuery(supabase)
      .from('testimonials')
      .select('id, video_url, title, client_name, created_at')
      .filter('is_active', 'eq', true)
      .order('created_at', false)
      .cached(cacheKey, 600000) // Cache for 10 minutes
      .execute()
  },

  /**
   * Get company settings
   */
  async getCompanySettings(supabase) {
    const cacheKey = 'company-settings'
    
    return new OptimizedQuery(supabase)
      .from('company_settings')
      .select('*')
      .order('updated_at', false)
      .limit(1)
      .cached(cacheKey, 3600000) // Cache for 1 hour
      .execute()
  },

  /**
   * Search invoices with optimized query
   */
  async searchInvoices(supabase, searchTerm, status = null, limit = 20) {
    let query = supabase
      .from('invoices')
      .select('id, invoice_number, client_name, client_email, total_amount, status, created_at')
      .or(`invoice_number.ilike.%${searchTerm}%,client_name.ilike.%${searchTerm}%,client_email.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) {
      query = query.eq('status', status)
    }

    return await query
  }
}

/**
 * Database connection optimization
 */
export function optimizeSupabaseClient(supabase) {
  // Add query performance logging in development
  if (process.env.NODE_ENV === 'development') {
    const originalFrom = supabase.from.bind(supabase)
    
    supabase.from = function(table) {
      const query = originalFrom(table)
      const originalSelect = query.select.bind(query)
      
      query.select = function(...args) {
        const startTime = performance.now()
        const result = originalSelect(...args)
        
        // Log slow queries
        result.then(() => {
          const duration = performance.now() - startTime
          if (duration > 100) { // Log queries taking more than 100ms
            console.warn(`Slow query on ${table}: ${duration.toFixed(2)}ms`)
          }
        })
        
        return result
      }
      
      return query
    }
  }
  
  return supabase
}

/**
 * Batch operations for better performance
 */
export class BatchOperations {
  constructor(supabase) {
    this.supabase = supabase
    this.operations = []
  }

  insert(table, data) {
    this.operations.push({ type: 'insert', table, data })
    return this
  }

  update(table, data, filters) {
    this.operations.push({ type: 'update', table, data, filters })
    return this
  }

  delete(table, filters) {
    this.operations.push({ type: 'delete', table, filters })
    return this
  }

  async execute() {
    const results = []
    
    // Group operations by type and table for better batching
    const grouped = this.operations.reduce((acc, op) => {
      const key = `${op.type}-${op.table}`
      if (!acc[key]) acc[key] = []
      acc[key].push(op)
      return acc
    }, {})

    // Execute batched operations
    for (const [key, ops] of Object.entries(grouped)) {
      const [type, table] = key.split('-')
      
      try {
        if (type === 'insert' && ops.length > 1) {
          // Batch insert
          const data = ops.map(op => op.data)
          const result = await this.supabase.from(table).insert(data)
          results.push(result)
        } else {
          // Execute individual operations
          for (const op of ops) {
            let query
            
            switch (op.type) {
              case 'insert':
                query = this.supabase.from(op.table).insert(op.data)
                break
              case 'update':
                query = this.supabase.from(op.table).update(op.data)
                op.filters.forEach(filter => {
                  query = query.filter(filter.column, filter.operator, filter.value)
                })
                break
              case 'delete':
                query = this.supabase.from(op.table).delete()
                op.filters.forEach(filter => {
                  query = query.filter(filter.column, filter.operator, filter.value)
                })
                break
            }
            
            const result = await query
            results.push(result)
          }
        }
      } catch (error) {
        results.push({ error })
      }
    }
    
    return results
  }
}

/**
 * Clear cache for specific patterns
 */
export function clearCachePattern(pattern) {
  const keys = Array.from(cache.cache.keys())
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.delete(key)
    }
  })
}