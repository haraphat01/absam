'use client'

import { useSupabaseAuth } from '@/hooks/use-supabase-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ProtectedRoute({ children, requiredRole = null, fallbackPath = '/admin/login' }) {
  const { user, userProfile, loading, isAuthenticated, hasRole } = useSupabaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated()) {
        router.push(fallbackPath)
        return
      }

      // If specific role is required and user doesn't have it, redirect
      if (requiredRole && !hasRole(requiredRole)) {
        router.push('/admin/unauthorized')
        return
      }
    }
  }, [user, userProfile, loading, isAuthenticated, hasRole, requiredRole, router, fallbackPath])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Don't render children if not authenticated or doesn't have required role
  if (!isAuthenticated() || (requiredRole && !hasRole(requiredRole))) {
    return null
  }

  return children
}

// Higher-order component for protecting pages
export function withAuth(Component, requiredRole = null) {
  return function AuthenticatedComponent(props) {
    return (
      <ProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}

// Hook for checking permissions in components
export function usePermissions() {
  const { userProfile, isAdmin, isStaff, hasRole, isAuthenticated } = useSupabaseAuth()

  return {
    userProfile,
    isAdmin: isAdmin(),
    isStaff: isStaff(),
    isAuthenticated: isAuthenticated(),
    hasRole,
    canManageUsers: isAdmin(),
    canManageInvoices: isAdmin() || isStaff(),
    canManageTestimonials: isAdmin() || isStaff(),
    canManageSettings: isAdmin(),
  }
}