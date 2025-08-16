# Database Setup Guide

This guide covers the complete database setup for the Absad MultiSynergy website using Supabase.

## Overview

The database schema includes:
- **User management** with role-based access (ADMIN/STAFF)
- **Testimonials** with video storage
- **Invoice management** with automatic number generation
- **Company settings** for banking details
- **Contact inquiries** from the website
- **Storage buckets** for videos and PDFs

## Quick Setup

### Option 1: Automated Setup (Recommended for Development)

```bash
# Setup database schema and policies
npm run db:setup

# Seed initial data
npm run db:seed
```

### Option 2: Manual Setup (Recommended for Production)

```bash
# Get manual setup instructions
npm run db:setup:manual
```

Then follow the instructions to manually execute SQL files in your Supabase dashboard.

## Detailed Setup Steps

### 1. Environment Variables

Ensure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Database Schema

The setup creates the following tables:

#### Users Table
- Extends Supabase auth.users
- Adds role (ADMIN/STAFF) and status fields
- Links to auth.users via foreign key

#### Testimonials Table
- Stores video testimonial metadata
- Links to Supabase Storage for video files
- Tracks uploader and creation date

#### Invoices Table
- Automatic invoice number generation (INV-YYYYMM-XXXX)
- JSONB storage for flexible item structures
- Status tracking (PAID/UNPAID)
- PDF storage integration

#### Company Settings Table
- Banking and payment details
- Single record with update tracking
- Used for invoice generation

#### Contact Inquiries Table
- Website contact form submissions
- Response tracking
- Admin management interface

### 3. Row Level Security (RLS)

All tables have RLS enabled with policies for:

- **Public Access**: Active testimonials viewable by anyone
- **Authenticated Access**: Users can manage their own resources
- **Admin Access**: Full CRUD permissions for all resources
- **Role-based Permissions**: Different access levels for ADMIN vs STAFF

### 4. Storage Buckets

#### Testimonials Bucket
- **Public**: Yes (videos viewable by anyone)
- **Size Limit**: 100MB per file
- **Allowed Types**: MP4, WebM, QuickTime, AVI
- **Access**: Authenticated users can upload, anyone can view

#### Invoices Bucket
- **Public**: No (private access only)
- **Size Limit**: 10MB per file
- **Allowed Types**: PDF only
- **Access**: Authenticated users only

### 5. Database Functions

#### generate_invoice_number()
- Generates unique invoice numbers
- Format: INV-YYYYMM-XXXX
- Monthly sequence numbering
- Zero-padded 4-digit sequence

#### Automatic Triggers
- `updated_at` timestamp updates
- Invoice number generation on insert
- Data validation and constraints

## Post-Setup Tasks

### 1. Create First Admin User

Since user signup is disabled by default, you'll need to:

1. Temporarily enable signup in Supabase Auth settings
2. Sign up through your application
3. Update the user's role to 'ADMIN' in the database:

```sql
UPDATE public.users 
SET role = 'ADMIN' 
WHERE email = 'your-admin-email@example.com';
```

4. Disable signup again for security

### 2. Configure Company Settings

1. Log into the admin dashboard
2. Navigate to Company Settings
3. Update banking details for invoice generation

### 3. Test Storage Buckets

1. Upload a test video testimonial
2. Generate a test invoice PDF
3. Verify file access permissions

## Development vs Production

### Development Setup
- Use automated scripts for quick setup
- Enable more permissive policies for testing
- Use local Supabase instance if needed

### Production Setup
- Use manual SQL execution for better control
- Review all RLS policies before deployment
- Set up proper backup and monitoring
- Configure domain verification for storage

## Troubleshooting

### Common Issues

1. **Permission Denied Errors**
   - Check RLS policies are correctly applied
   - Verify user roles are set properly
   - Ensure service role key is used for admin operations

2. **Storage Upload Failures**
   - Check file size limits
   - Verify MIME type restrictions
   - Ensure bucket policies allow uploads

3. **Invoice Number Generation Issues**
   - Verify the generate_invoice_number() function exists
   - Check trigger is properly attached to invoices table
   - Test function manually in SQL editor

### Debugging Commands

```bash
# Test database connection
node -e "
import { createClient } from '@supabase/supabase-js';
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
client.from('users').select('count').then(console.log);
"

# Check storage buckets
node -e "
import { createClient } from '@supabase/supabase-js';
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
client.storage.listBuckets().then(console.log);
"
```

## Security Considerations

- All tables use Row Level Security
- Storage buckets have appropriate access policies
- Service role key is only used server-side
- File uploads are validated by type and size
- Admin operations require proper role verification

## Backup and Maintenance

- Supabase handles automatic backups
- Monitor storage usage for large video files
- Archive old invoices and testimonials as needed
- Review and update RLS policies as requirements change
- Keep database functions updated with business logic changes

## Support

For issues with this setup:
1. Check the Supabase dashboard for error logs
2. Review RLS policies in the SQL editor
3. Test database functions manually
4. Verify environment variables are correct
5. Check storage bucket configurations