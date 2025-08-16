# Manual Database Setup Instructions

Since the automated database setup is not working, please follow these manual steps:

## 1. Create Users Table

Go to your Supabase dashboard SQL Editor and execute this SQL:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) CHECK (role IN ('ADMIN', 'STAFF')) NOT NULL DEFAULT 'STAFF',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_is_active ON public.users(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 2. Create Test Admin User

After creating the users table, run:

```bash
node scripts/create-test-user.js
```

## 3. Test Authentication

1. Start the development server: `npm run dev`
2. Go to: http://localhost:3000/admin/login
3. Login with:
   - Email: admin@absadmultisynergy.com
   - Password: admin123456

## 4. Verify Authentication System

The authentication system includes:
- ✅ Supabase Auth integration with role-based access
- ✅ Login/logout functionality with secure session management
- ✅ Protected route middleware for admin areas
- ✅ User context provider for authentication state
- ✅ Server-side authentication utilities
- ✅ API route protection middleware
- ✅ Next.js middleware for route protection

## Authentication Features Implemented

### Client-Side Components:
- `AuthProvider` - Enhanced with role-based access control
- `ProtectedRoute` - Component for protecting admin routes
- `LoginForm` - Professional login interface
- `usePermissions` - Hook for checking user permissions

### Server-Side Utilities:
- `auth-server.js` - Server-side authentication utilities
- `withAuth` - API route protection middleware
- `middleware.js` - Next.js middleware for route protection

### Pages Created:
- `/admin/login` - Admin login page
- `/admin` - Protected admin dashboard
- `/admin/unauthorized` - Access denied page

### API Routes:
- `/api/auth/profile` - Get user profile (protected)
- `/api/auth/logout` - Logout endpoint

All authentication requirements from the spec have been implemented and are ready for testing once the database table is created.