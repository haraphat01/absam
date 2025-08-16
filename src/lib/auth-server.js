import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Create a Supabase client for server-side operations
export async function createServerSupabaseClient() {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
  
  // Get the session from cookies
  const { data: { session } } = await supabase.auth.getSession()
  
  return { supabase, session }
}

// Verify user authentication and get user profile
export async function verifyAuth(requiredRole = null) {
  try {
    const { supabase, session } = await createServerSupabaseClient()
    
    if (!session?.user) {
      return { 
        success: false, 
        error: 'Not authenticated',
        status: 401 
      }
    }

    // Get user profile with role information
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .eq('is_active', true)
      .single()

    if (profileError || !userProfile) {
      return { 
        success: false, 
        error: 'User profile not found or inactive',
        status: 403 
      }
    }

    // Check role if required
    if (requiredRole && userProfile.role !== requiredRole) {
      return { 
        success: false, 
        error: `Insufficient permissions. Required role: ${requiredRole}`,
        status: 403 
      }
    }

    return { 
      success: true, 
      user: session.user, 
      userProfile,
      supabase 
    }
  } catch (error) {
    console.error('Auth verification error:', error)
    return { 
      success: false, 
      error: 'Authentication verification failed',
      status: 500 
    }
  }
}

// Middleware wrapper for API routes
export function withAuth(handler, requiredRole = null) {
  return async (request, context) => {
    const authResult = await verifyAuth(requiredRole)
    
    if (!authResult.success) {
      return Response.json(
        { 
          success: false, 
          error: authResult.error 
        },
        { status: authResult.status }
      )
    }

    // Add auth data to request context
    request.auth = {
      user: authResult.user,
      userProfile: authResult.userProfile,
      supabase: authResult.supabase
    }

    return handler(request, context)
  }
}

// Helper function to check if user has specific permissions
export function hasPermission(userProfile, permission) {
  if (!userProfile || !userProfile.is_active) {
    return false
  }

  const permissions = {
    'manage_users': userProfile.role === 'ADMIN',
    'manage_settings': userProfile.role === 'ADMIN',
    'manage_invoices': ['ADMIN', 'STAFF'].includes(userProfile.role),
    'manage_testimonials': ['ADMIN', 'STAFF'].includes(userProfile.role),
    'view_dashboard': ['ADMIN', 'STAFF'].includes(userProfile.role),
  }

  return permissions[permission] || false
}