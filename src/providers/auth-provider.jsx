'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const AuthContext = createContext({})

// Create Supabase client
const supabaseUrl = 'https://nyknvbmoqkycjqefijuo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55a252Ym1vcWt5Y2pxZWZpanVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMDc4NzYsImV4cCI6MjA3MDg4Mzg3Nn0.z5HG5jxu8wUsUUldbq3Mj5ZNQOOz-79ZadZj6D8j-9Q'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log('AuthProvider render:', { user: !!user, userProfile: !!userProfile, loading, error })

  // Fetch user profile from database
  const fetchUserProfile = useCallback(async (userId) => {
    try {
      console.log('Fetching user profile for:', userId)
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }

      console.log('User profile fetched:', data)
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }, [])

  // Create user profile in database
  const createUserProfile = useCallback(async (userId, email) => {
    try {
      console.log('Creating user profile for:', userId, email)
      
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: email,
          role: 'USER', // Default role is USER
          is_active: true
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating user profile:', error)
        return null
      }

      console.log('User profile created:', data)
      return data
    } catch (error) {
      console.error('Error creating user profile:', error)
      return null
    }
  }, [])

  // Initialize authentication state
  const initializeAuth = useCallback(async () => {
    try {
      console.log('Initializing authentication...')
      setLoading(true)
      setError(null)

      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        console.error('Session error:', sessionError)
        setError(sessionError.message)
        setUser(null)
        setUserProfile(null)
        return
      }

      if (session?.user) {
        console.log('User found in session:', session.user.email)
        setUser(session.user)
        
        // Check if user profile exists
        let profile = await fetchUserProfile(session.user.id)
        
        if (!profile) {
          // Create profile if it doesn't exist (for existing users)
          console.log('No profile found, creating one...')
          profile = await createUserProfile(session.user.id, session.user.email)
        }
        
        setUserProfile(profile)
      } else {
        console.log('No session found')
        setUser(null)
        setUserProfile(null)
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      setError(error.message)
      setUser(null)
      setUserProfile(null)
    } finally {
      console.log('Setting loading to false')
      setLoading(false)
    }
  }, [fetchUserProfile, createUserProfile])

  useEffect(() => {
    // Initialize auth on mount
    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session ? 'has session' : 'no session')
        
        try {
          if (event === 'SIGNED_IN' && session?.user) {
            setUser(session.user)
            
            // Check if user profile exists
            let profile = await fetchUserProfile(session.user.id)
            
            if (!profile) {
              // Create profile for new users
              profile = await createUserProfile(session.user.id, session.user.email)
            }
            
            setUserProfile(profile)
            setError(null)
            setLoading(false)
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
            setUserProfile(null)
            setError(null)
            setLoading(false)
          } else if (event === 'TOKEN_REFRESHED' && session?.user) {
            setUser(session.user)
            // Refresh profile data
            const profile = await fetchUserProfile(session.user.id)
            setUserProfile(profile)
            setLoading(false)
          }
        } catch (error) {
          console.error('Error handling auth state change:', error)
          setError(error.message)
          setUser(null)
          setUserProfile(null)
          setLoading(false)
        }
      }
    )

    // Cleanup subscription
    return () => subscription.unsubscribe()
  }, [initializeAuth, fetchUserProfile, createUserProfile])

  // Sign up with email verification
  const signUp = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Signing up:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error('Sign up error:', error)
        setError(error.message)
        return { data: null, error }
      }

      console.log('Sign up successful, check email for verification')
      return { 
        data, 
        error: null,
        message: 'Please check your email to verify your account before signing in.'
      }
    } catch (error) {
      console.error('Sign up error:', error)
      setError(error.message)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign in - SIMPLIFIED VERSION
  const signIn = async (email, password) => {
    console.log('Starting sign in for:', email)
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign in error:', error)
        setError(error.message)
        setLoading(false)
        return { data: null, error }
      }

      console.log('Sign in successful:', data.user?.email)
      // Don't set loading to false here - let the auth state change listener handle it
      return { data, error: null }
      
    } catch (error) {
      console.error('Sign in error:', error)
      setError(error.message)
      setLoading(false)
      return { data: null, error }
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
      console.log('Signing out...')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        setError(error.message)
        return { error }
      }
      
      setUser(null)
      setUserProfile(null)
      setError(null)
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      setError(error.message)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Resetting password for:', email)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) {
        console.error('Password reset error:', error)
        setError(error.message)
        return { error }
      }

      return { 
        error: null,
        message: 'Password reset email sent. Please check your inbox.'
      }
    } catch (error) {
      console.error('Password reset error:', error)
      setError(error.message)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Update password
  const updatePassword = async (newPassword) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Updating password...')
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        console.error('Password update error:', error)
        setError(error.message)
        return { error }
      }

      return { error: null }
    } catch (error) {
      console.error('Password update error:', error)
      setError(error.message)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Helper functions for role checking
  const isAdmin = () => {
    return userProfile?.role === 'ADMIN'
  }

  const isStaff = () => {
    return userProfile?.role === 'STAFF'
  }

  const isUser = () => {
    return userProfile?.role === 'USER'
  }

  const hasRole = (role) => {
    return userProfile?.role === role
  }

  const isAuthenticated = () => {
    return !!(user && userProfile && userProfile.is_active)
  }

  const isEmailVerified = () => {
    return user?.email_confirmed_at != null
  }

  const value = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    isAdmin,
    isStaff,
    isUser,
    hasRole,
    isAuthenticated,
    isEmailVerified,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}