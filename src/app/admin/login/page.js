'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, EyeOff, Loader2, Mail, Lock, User, LogOut, AlertTriangle } from '@/components/ui/icons'
import Link from 'next/link'

// Create Supabase client
const supabaseUrl = 'https://nyknvbmoqkycjqefijuo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55a252Ym1vcWt5Y2pxZWZpanVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMDc4NzYsImV4cCI6MjA3MDg4Mzg3Nn0.z5HG5jxu8wUsUUldbq3Mj5ZNQOOz-79ZadZj6D8j-9Q'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  
  const router = useRouter()

  const fetchUserProfile = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return
      }

      setUserProfile(data)
      
      // If user is admin, redirect to admin panel
      if (data.role === 'ADMIN' && data.is_active) {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }, [router])

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(session.user)
        await fetchUserProfile(session.user.id)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
    } finally {
      setAuthLoading(false)
    }
  }, [fetchUserProfile])

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session ? 'has session' : 'no session')
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          await fetchUserProfile(session.user.id)
          setAuthLoading(false)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setUserProfile(null)
          setAuthLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [checkAuth, fetchUserProfile])

  const isAuthenticated = useCallback(() => {
    return !!(user && userProfile && userProfile.is_active)
  }, [user, userProfile])

  const isAdmin = useCallback(() => {
    return userProfile?.role === 'ADMIN'
  }, [userProfile])

  // Redirect if already authenticated and is admin
  useEffect(() => {
    if (isAuthenticated() && isAdmin()) {
      router.push('/admin')
    }
  }, [isAuthenticated, isAdmin, router])

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything while redirecting
  if (isAuthenticated() && isAdmin()) {
    return null
  }

  // Show access denied if authenticated but not admin
  if (isAuthenticated() && !isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Access Denied
              </CardTitle>
              <CardDescription>
                Only administrators can access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Your account ({userProfile?.email}) has the role &ldquo;{userProfile?.role}&rdquo;. 
                  Only users with ADMIN role can access the admin panel.
                </AlertDescription>
              </Alert>
              
              <div className="text-center text-sm text-gray-600">
                <p>If you need admin access, please contact the site owner to upgrade your account.</p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={() => router.push('/')} 
                  variant="outline" 
                  className="w-full"
                >
                  Back to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) {
        setError(error.message || 'Failed to sign up')
        return
      }

      setSuccess('Account created successfully! Please check your email to verify your account.')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Sign up error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        setError(error.message || 'Failed to sign in')
        return
      }

      console.log('Sign in successful, auth state will be updated')
      // The auth state change listener will handle the redirect
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Sign in error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-lg">AM</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <Tabs value={isSignUp ? "signup" : "signin"} onValueChange={(value) => setIsSignUp(value === "signup")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <CardTitle className="flex items-center space-x-2">
                  <LogOut className="h-5 w-5" />
                  <span>Welcome Back</span>
                </CardTitle>
                <CardDescription>
                  Sign in to your admin account
                </CardDescription>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Create Account</span>
                </CardTitle>
                <CardDescription>
                  Create a new account (requires admin approval)
                </CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="mb-4">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            
            {isSignUp ? (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                      disabled={isLoading}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      disabled={isLoading}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Back to Homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}