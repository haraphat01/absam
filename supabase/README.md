# Supabase Database Setup

This directory contains the database schema, migrations, and configuration for the Absad MultiSynergy website.

## Database Schema

The database includes the following tables:

### Core Tables
- **users**: Extends Supabase auth.users with role-based access (ADMIN/STAFF)
- **testimonials**: Video testimonials with metadata
- **invoices**: Invoice management with automatic number generation
- **company_settings**: Banking and company configuration
- **contact_inquiries**: Contact form submissions

### Storage Buckets
- **testimonials**: Public bucket for video testimonials (100MB limit)
- **invoices**: Private bucket for PDF invoices (10MB limit)

## Migration Files

1. **001_initial_schema.sql**: Creates all database tables with indexes and triggers
2. **002_invoice_functions.sql**: Invoice number generation functions (INV-YYYYMM-XXXX format)
3. **003_rls_policies.sql**: Row Level Security policies for all tables
4. **004_storage_setup.sql**: Storage bucket creation and policies

## Key Features

### Invoice Number Generation
- Automatic generation in format: `INV-YYYYMM-XXXX`
- Monthly sequence numbering (resets each month)
- Zero-padded 4-digit sequence numbers

### Row Level Security
- **Public Access**: Active testimonials viewable by anyone
- **Authenticated Access**: Full CRUD for own resources
- **Admin Access**: Full CRUD for all resources
- **Role-based Permissions**: ADMIN and STAFF roles with different access levels

### Storage Security
- **Testimonials**: Public read, authenticated write
- **Invoices**: Private access, authenticated users only
- **File Type Validation**: Video formats for testimonials, PDF for invoices
- **Size Limits**: 100MB for videos, 10MB for PDFs

## Setup Instructions

### For Production (Supabase Cloud)
1. Run migrations in the Supabase dashboard SQL editor in order:
   - 001_initial_schema.sql
   - 002_invoice_functions.sql
   - 003_rls_policies.sql
   - 004_storage_setup.sql
2. Run seed.sql to insert initial company settings
3. Create storage buckets manually if not created by migration

### For Local Development
1. Install Supabase CLI
2. Run `supabase start` to start local instance
3. Migrations will be applied automatically
4. Run `supabase db seed` to insert seed data

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Database Functions

### generate_invoice_number()
Generates unique invoice numbers in the format INV-YYYYMM-XXXX where:
- YYYY = Current year
- MM = Current month
- XXXX = Zero-padded sequence number for the month

### set_invoice_number()
Trigger function that automatically sets invoice number on insert if not provided.

### update_updated_at_column()
Trigger function that automatically updates the updated_at timestamp on record updates.

## Security Considerations

- All tables have RLS enabled
- Storage buckets have appropriate access policies
- Admin-only operations are protected by role checks
- File uploads are validated by type and size
- Sensitive operations require authentication

## Backup and Maintenance

- Regular database backups are handled by Supabase
- Monitor storage usage for video files
- Archive old invoices and testimonials as needed
- Review and update RLS policies as requirements change