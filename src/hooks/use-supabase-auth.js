'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabaseUrl = 'https://nyknvbmoqkycjqefijuo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55a252Ym1vcWt5Y2pxZWZpanVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMDc4NzYsImV4cCI6MjA3MDg4Mzg3Nn0.z5HG5jxu8wUsUUldbq3Mj5ZNQOOz-79ZadZj6D8j-9Q'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function useSupabaseAuth() {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch user profile from database
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
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
          setUser(session.user)
          const profile = await fetchUserProfile(session.user.id)
          setUserProfile(profile)
        } else {
          setUser(null)
          setUserProfile(null)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setError(error.message)
        setUser(null)
        setUserProfile(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (event === 'SIGNED_IN' && session?.user) {
            setUser(session.user)
            const profile = await fetchUserProfile(session.user.id)
            setUserProfile(profile)
            setError(null)
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
            setUserProfile(null)
            setError(null)
          } else if (event === 'TOKEN_REFRESHED' && session?.user) {
            setUser(session.user)
            const profile = await fetchUserProfile(session.user.id)
            setUserProfile(profile)
          }
        } catch (error) {
          console.error('Error handling auth state change:', error)
          setError(error.message)
          setUser(null)
          setUserProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
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

  return {
    user,
    userProfile,
    loading,
    error,
    signOut,
    isAdmin,
    isStaff,
    isUser,
    hasRole,
    isAuthenticated,
    isEmailVerified,
  }
}
