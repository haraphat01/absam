import { withAuth } from '@/lib/auth-server'

async function handler(request) {
  const { user, userProfile } = request.auth

  return Response.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      profile: userProfile
    }
  })
}

export const GET = withAuth(handler)