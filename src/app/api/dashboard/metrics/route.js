import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { optimizedQueries } from '@/lib/database-optimizations'

export async function GET(request) {
  try {
    const supabase = createServerClient()
    
    // Get dashboard metrics using optimized queries
    const { data: metrics, error, fromCache } = await optimizedQueries.getDashboardMetrics(supabase)
    
    if (error) {
      console.error('Error fetching dashboard metrics:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: { message: 'Failed to fetch dashboard metrics' }
        },
        { status: 500 }
      )
    }

    // Format response to match frontend expectations
    const response = {
      success: true,
      data: {
        ...metrics,
        _meta: {
          fromCache,
          timestamp: new Date().toISOString(),
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Dashboard metrics API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: { message: 'Internal server error' }
      },
      { status: 500 }
    )
  }
}