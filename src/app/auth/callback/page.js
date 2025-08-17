'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSupabaseAuth } from '@/hooks/use-supabase-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Loader2 } from '@/components/ui/icons'

function AuthCallbackContent() {
  const [status, setStatus] = useState('verifying')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isAdmin } = useSupabaseAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the error and message from URL params
        const error = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')
        const message = searchParams.get('message')

        if (error) {
          setStatus('error')
          setError(errorDescription || error)
          return
        }

        if (message) {
          setStatus('success')
          setMessage(message)
          return
        }

        // If no error or message, assume successful verification
        setStatus('success')
        setMessage('Email verified successfully! You can now sign in to your account.')

        // Redirect to login after a delay
        setTimeout(() => {
          router.push('/admin/login')
        }, 3000)

      } catch (err) {
        console.error('Auth callback error:', err)
        setStatus('error')
        setError('An unexpected error occurred during verification.')
      }
    }

    handleAuthCallback()
  }, [searchParams, router])

  // If user is already authenticated and is admin, redirect to admin panel
  if (isAuthenticated() && isAdmin()) {
    router.push('/admin')
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4">
              {status === 'verifying' && (
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
              )}
              {status === 'success' && (
                <CheckCircle className="h-6 w-6 text-green-600" />
              )}
              {status === 'error' && (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {status === 'verifying' && 'Verifying Email...'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {status === 'verifying' && (
              <div className="text-center">
                <p className="text-gray-600">Please wait while we verify your email address...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
                <div className="text-center text-sm text-gray-600">
                  <p>You will be redirected to the login page shortly.</p>
                </div>
                <Button 
                  onClick={() => router.push('/admin/login')} 
                  className="w-full"
                >
                  Go to Login
                </Button>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <div className="text-center text-sm text-gray-600">
                  <p>Please try again or contact support if the problem persists.</p>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={() => router.push('/admin/login')} 
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                  <Button 
                    onClick={() => router.push('/')} 
                    variant="outline" 
                    className="w-full"
                  >
                    Back to Homepage
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4">
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Loading...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600">Please wait while we load the verification page...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallbackContent />
    </Suspense>
  )
}
