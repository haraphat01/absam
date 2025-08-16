-- Performance optimization indexes
-- These indexes will significantly improve query performance for common operations

-- Composite indexes for common query patterns
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_status_created_at 
ON public.invoices(status, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_client_name_created_at 
ON public.invoices(client_name, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_testimonials_active_created_at 
ON public.testimonials(is_active, created_at DESC);

-- Text search indexes for better search performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_client_name_gin 
ON public.invoices USING gin(to_tsvector('english', client_name));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_invoice_number_gin 
ON public.invoices USING gin(to_tsvector('english', invoice_number));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_contact_inquiries_name_gin 
ON public.contact_inquiries USING gin(to_tsvector('english', name));

-- Partial indexes for common filtered queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_unpaid 
ON public.invoices(created_at DESC) WHERE status = 'UNPAID';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_paid 
ON public.invoices(created_at DESC) WHERE status = 'PAID';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_testimonials_active 
ON public.testimonials(created_at DESC) WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_active_admins 
ON public.users(created_at DESC) WHERE is_active = true AND role = 'ADMIN';

-- Indexes for date range queries (monthly reports, etc.)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_created_month 
ON public.invoices(date_trunc('month', created_at), status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_testimonials_created_month 
ON public.testimonials(date_trunc('month', created_at)) WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_contact_inquiries_created_month 
ON public.contact_inquiries(date_trunc('month', created_at));

-- Indexes for JSON queries on invoice items
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_items_gin 
ON public.invoices USING gin(items);

-- Foreign key indexes (if not already created by the foreign key constraints)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_testimonials_uploaded_by_btree 
ON public.testimonials(uploaded_by) WHERE uploaded_by IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_created_by_btree 
ON public.invoices(created_by) WHERE created_by IS NOT NULL;

-- Covering indexes for common SELECT queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_invoices_dashboard_covering 
ON public.invoices(created_at DESC) 
INCLUDE (id, invoice_number, client_name, total_amount, status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_testimonials_public_covering 
ON public.testimonials(created_at DESC) 
INCLUDE (id, video_url, title, client_name) 
WHERE is_active = true;

-- Statistics update for better query planning
ANALYZE public.invoices;
ANALYZE public.testimonials;
ANALYZE public.contact_inquiries;
ANALYZE public.users;
ANALYZE public.company_settings;

-- Create a function to refresh statistics periodically
CREATE OR REPLACE FUNCTION refresh_table_statistics()
RETURNS void AS $$
BEGIN
    ANALYZE public.invoices;
    ANALYZE public.testimonials;
    ANALYZE public.contact_inquiries;
    ANALYZE public.users;
    ANALYZE public.company_settings;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON INDEX idx_invoices_status_created_at IS 'Optimizes queries filtering by status and ordering by creation date';
COMMENT ON INDEX idx_invoices_client_name_gin IS 'Enables fast text search on client names';
COMMENT ON INDEX idx_invoices_unpaid IS 'Partial index for unpaid invoices queries';
COMMENT ON INDEX idx_testimonials_active IS 'Partial index for active testimonials';
COMMENT ON INDEX idx_invoices_created_month IS 'Optimizes monthly reporting queries';
COMMENT ON FUNCTION refresh_table_statistics() IS 'Refreshes table statistics for optimal query planning';