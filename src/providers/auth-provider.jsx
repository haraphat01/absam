'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile with role information
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .eq('is_active', true)
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

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
          const profile = await fetchUserProfile(session.user.id)
          setUserProfile(profile)
        } else {
          setUser(null)
          setUserProfile(null)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        setUser(null)
        setUserProfile(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (session?.user) {
            setUser(session.user)
            const profile = await fetchUserProfile(session.user.id)
            setUserProfile(profile)
          } else {
            setUser(null)
            setUserProfile(null)
          }
        } catch (error) {
          console.error('Error handling auth state change:', error)
          setUser(null)
          setUserProfile(null)
        } finally {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { data: null, error }
      }

      // Check if user exists in our users table and is active
      if (data.user) {
        const profile = await fetchUserProfile(data.user.id)
        if (!profile) {
          // User not found in users table or inactive
          await supabase.auth.signOut()
          return { 
            data: null, 
            error: { message: 'Access denied. Please contact an administrator.' }
          }
        }
        setUserProfile(profile)
      }

      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      setUser(null)
      setUserProfile(null)
      return { error }
    } catch (error) {
      console.error('Sign out error:', error)
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

  const hasRole = (role) => {
    return userProfile?.role === role
  }

  const isAuthenticated = () => {
    return !!(user && userProfile && userProfile.is_active)
  }

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signOut,
    isAdmin,
    isStaff,
    hasRole,
    isAuthenticated,
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