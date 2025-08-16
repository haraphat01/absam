'use client'

import { useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/auth/login-form'

export default function AdminLoginPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If already authenticated, redirect to admin dashboard
    if (!loading && isAuthenticated()) {
      router.push('/admin')
    }
  }, [isAuthenticated, loading, router])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Don't show login form if already authenticated
  if (isAuthenticated()) {
    return null
  }

  return <LoginForm redirectTo="/admin" />
}