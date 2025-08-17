import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { rateLimit, getClientIP, applySecurityHeaders } from './src/lib/security'

export async function middleware(req) {
  // HTTPS enforcement in production
  if (process.env.NODE_ENV === 'production' && 
      req.nextUrl.protocol === 'http:' && 
      !req.nextUrl.hostname.includes('localhost')) {
    return NextResponse.redirect(
      `https://${req.nextUrl.hostname}${req.nextUrl.pathname}${req.nextUrl.search}`,
      301
    )
  }

  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  // Apply security headers to all responses
  response = applySecurityHeaders(response)

  // Rate limiting for API routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const clientIP = getClientIP(req)
    
    // Different rate limits for different endpoints
    let maxRequests = 100
    let windowMs = 15 * 60 * 1000 // 15 minutes
    
    // Stricter limits for sensitive endpoints
    if (req.nextUrl.pathname.includes('/contact') || 
        req.nextUrl.pathname.includes('/auth') ||
        req.nextUrl.pathname.includes('/users')) {
      maxRequests = 20
      windowMs = 15 * 60 * 1000 // 15 minutes
    }
    
    // Very strict limits for file upload endpoints
    if (req.nextUrl.pathname.includes('/upload') || 
        req.nextUrl.pathname.includes('/testimonials')) {
      maxRequests = 10
      windowMs = 60 * 60 * 1000 // 1 hour
    }
    
    if (!rateLimit(clientIP, maxRequests, windowMs)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please try again later.'
          }
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(windowMs / 1000).toString()
          }
        }
      )
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  // Admin routes protection
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page and auth callback
    if (req.nextUrl.pathname === '/admin/login' || req.nextUrl.pathname.startsWith('/auth/')) {
      return response
    }

    // For all other admin routes, check authentication
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // Check if user exists in our users table and has admin role
    try {
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .eq('is_active', true)
        .eq('role', 'ADMIN')
        .single()

      if (!userProfile) {
        // User not found, inactive, or not admin, redirect to login
        const redirectResponse = NextResponse.redirect(new URL('/admin/login', req.url))
        // Clear the session
        await supabase.auth.signOut()
        return redirectResponse
      }
    } catch (error) {
      console.error('Error checking user profile:', error)
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all routes except static files and images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}