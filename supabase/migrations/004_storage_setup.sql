-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('testimonials', 'testimonials', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']),
    ('invoices', 'invoices', false, 10485760, ARRAY['application/pdf']);

-- Storage policies for testimonials bucket
CREATE POLICY "Anyone can view testimonials" ON storage.objects
    FOR SELECT USING (bucket_id = 'testimonials');

CREATE POLICY "Authenticated users can upload testimonials" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'testimonials' AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can update their own testimonials" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'testimonials' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own testimonials" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'testimonials' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Admins can manage all testimonials" ON storage.objects
    FOR ALL USING (
        bucket_id = 'testimonials' AND 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- Storage policies for invoices bucket
CREATE POLICY "Authenticated users can view invoices" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'invoices' AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Authenticated users can upload invoices" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'invoices' AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can update their own invoices" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'invoices' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own invoices" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'invoices' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Admins can manage all invoices" ON storage.objects
    FOR ALL USING (
        bucket_id = 'invoices' AND 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );