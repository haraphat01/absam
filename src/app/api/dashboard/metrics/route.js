import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { withCache, cacheConfig } from '@/lib/api-cache'
import { optimizedQueries } from '@/lib/database-optimizations'

async function handler(request) {
  try {
    const supabase = createClient()
    
    // Get dashboard metrics using optimized queries
    const { data: metrics, error, fromCache } = await optimizedQueries.getDashboardMetrics(supabase)
    
    if (error) {
      console.error('Error fetching dashboard metrics:', error)
      return NextResponse.json(
        { error: 'Failed to fetch dashboard metrics' },
        { status: 500 }
      )
    }

    // Add cache information to response
    const response = {
      ...metrics,
      _meta: {
        fromCache,
        timestamp: new Date().toISOString(),
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Dashboard metrics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Apply caching middleware with 5-minute cache
export const GET = withCache(handler, cacheConfig.dynamic)