import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth-server'
import { userSchema } from '@/lib/validations'
import { createServerClient } from '@/lib/supabase'
import { withRateLimit, sanitize, password } from '@/lib/security'

// GET /api/users - List all users (Admin only)
async function GET(request) {
  try {
    const { userProfile } = request.auth
    
    // Only admins can list users
    if (userProfile.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const supabase = createServerClient()
    
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, role, is_active, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch users' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: users
    })

  } catch (error) {
    console.error('Users API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create new user (Admin only)
async function POST(request) {
  try {
    const { userProfile } = request.auth
    
    // Only admins can create users
    if (userProfile.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Sanitize input
    const sanitizedBody = sanitize.object(body)
    
    // Validate input
    const validation = userSchema.safeParse(sanitizedBody)
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validation.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const { email, password: userPassword, role } = validation.data

    // Additional password strength validation
    const passwordValidation = password.validate(userPassword)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password does not meet security requirements',
          details: { password: passwordValidation.errors }
        },
        { status: 400 }
      )
    }
    const supabase = createServerClient()

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: userPassword,
      email_confirm: true
    })

    if (authError) {
      console.error('Error creating auth user:', authError)
      return NextResponse.json(
        { success: false, error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Create user profile in users table
    const { data: user, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        email,
        role,
        is_active: true
      })
      .select('id, email, role, is_active, created_at, updated_at')
      .single()

    if (profileError) {
      console.error('Error creating user profile:', profileError)
      
      // Cleanup: delete the auth user if profile creation failed
      await supabase.auth.admin.deleteUser(authUser.user.id)
      
      return NextResponse.json(
        { success: false, error: 'Failed to create user profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create user API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

const AuthenticatedGET = withAuth(GET, 'ADMIN')
const AuthenticatedPOST = withAuth(POST, 'ADMIN')

// Apply rate limiting to user creation
const RateLimitedPOST = withRateLimit(AuthenticatedPOST, {
  maxRequests: 10, // 10 user creations per hour
  windowMs: 60 * 60 * 1000,
  message: 'Too many user creation attempts. Please wait before creating more users.'
})

export { AuthenticatedGET as GET, RateLimitedPOST as POST }