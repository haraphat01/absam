import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth-server'
import { createServerClient } from '@/lib/supabase'

// PATCH /api/users/[id] - Update user status (Admin only)
async function PATCH(request, { params }) {
  try {
    const { userProfile } = request.auth
    const { id } = params
    
    // Only admins can update users
    if (userProfile.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { is_active } = body

    if (typeof is_active !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'is_active must be a boolean value' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('id', id)
      .single()

    if (fetchError || !existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent admin from deactivating themselves
    if (id === userProfile.id && !is_active) {
      return NextResponse.json(
        { success: false, error: 'You cannot deactivate your own account' },
        { status: 400 }
      )
    }

    // Update user status
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ is_active })
      .eq('id', id)
      .select('id, email, role, is_active, created_at, updated_at')
      .single()

    if (updateError) {
      console.error('Error updating user:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update user' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: `User ${is_active ? 'activated' : 'deactivated'} successfully`
    })

  } catch (error) {
    console.error('Update user API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - Delete user (Admin only)
async function DELETE(request, { params }) {
  try {
    const { userProfile } = request.auth
    const { id } = params
    
    // Only admins can delete users
    if (userProfile.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const supabase = createServerClient()

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('id', id)
      .single()

    if (fetchError || !existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent admin from deleting themselves
    if (id === userProfile.id) {
      return NextResponse.json(
        { success: false, error: 'You cannot delete your own account' },
        { status: 400 }
      )
    }

    // Delete user from auth (this will cascade to users table due to foreign key)
    const { error: deleteError } = await supabase.auth.admin.deleteUser(id)

    if (deleteError) {
      console.error('Error deleting user:', deleteError)
      return NextResponse.json(
        { success: false, error: 'Failed to delete user' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    })

  } catch (error) {
    console.error('Delete user API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

const AuthenticatedPATCH = withAuth(PATCH, 'ADMIN')
const AuthenticatedDELETE = withAuth(DELETE, 'ADMIN')

export { AuthenticatedPATCH as PATCH, AuthenticatedDELETE as DELETE }