import { createServerSupabaseClient } from '@/lib/auth-server'

export async function POST() {
  try {
    const { supabase } = await createServerSupabaseClient()
    
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return Response.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    )
  }
}