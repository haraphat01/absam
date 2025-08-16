-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Only authenticated users can view users, only admins can modify
CREATE POLICY "Users can view all users" ON public.users
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can insert users" ON public.users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

CREATE POLICY "Only admins can update users" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

CREATE POLICY "Only admins can delete users" ON public.users
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Testimonials table policies
-- Public can view active testimonials, authenticated users can manage
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all testimonials" ON public.testimonials
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert testimonials" ON public.testimonials
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own testimonials" ON public.testimonials
    FOR UPDATE USING (uploaded_by = auth.uid());

CREATE POLICY "Admins can update any testimonials" ON public.testimonials
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

CREATE POLICY "Users can delete their own testimonials" ON public.testimonials
    FOR DELETE USING (uploaded_by = auth.uid());

CREATE POLICY "Admins can delete any testimonials" ON public.testimonials
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Invoices table policies
-- Only authenticated users can access invoices
CREATE POLICY "Authenticated users can view invoices" ON public.invoices
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert invoices" ON public.invoices
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own invoices" ON public.invoices
    FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Admins can update any invoices" ON public.invoices
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

CREATE POLICY "Users can delete their own invoices" ON public.invoices
    FOR DELETE USING (created_by = auth.uid());

CREATE POLICY "Admins can delete any invoices" ON public.invoices
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Company settings table policies
-- Only authenticated users can view, only admins can modify
CREATE POLICY "Authenticated users can view company settings" ON public.company_settings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can insert company settings" ON public.company_settings
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

CREATE POLICY "Only admins can update company settings" ON public.company_settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

CREATE POLICY "Only admins can delete company settings" ON public.company_settings
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Contact inquiries table policies
-- Anyone can insert, only authenticated users can view
CREATE POLICY "Anyone can insert contact inquiries" ON public.contact_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact inquiries" ON public.contact_inquiries
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can update contact inquiries" ON public.contact_inquiries
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

CREATE POLICY "Only admins can delete contact inquiries" ON public.contact_inquiries
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );