-- Update users table to support USER role and add status field
ALTER TABLE public.users 
DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE public.users 
ADD CONSTRAINT users_role_check 
CHECK (role IN ('ADMIN', 'STAFF', 'USER'));

-- Update default role to USER for new signups
ALTER TABLE public.users 
ALTER COLUMN role SET DEFAULT 'USER';

-- Add status field for better user management
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED'));

-- Add email verification status
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

-- Add last login tracking
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Create index for status field
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);

-- Create index for email verification
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON public.users(email_verified);

-- Update existing users to have proper status
UPDATE public.users 
SET status = 'ACTIVE' 
WHERE status IS NULL;

-- Update existing admin user to have email verified
UPDATE public.users 
SET email_verified = true 
WHERE email = 'admin@absadmultisynergy.com';
