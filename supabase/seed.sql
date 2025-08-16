-- Insert initial company settings
INSERT INTO public.company_settings (
    bank_name,
    account_name,
    account_number,
    swift_code,
    currency
) VALUES (
    'First Bank of Nigeria',
    'Absad MultiSynergy Limited',
    '1234567890',
    'FBNGNGLA',
    'NGN'
) ON CONFLICT DO NOTHING;

-- Insert sample testimonials for testing (using placeholder video URLs)
INSERT INTO public.testimonials (
    video_url,
    title,
    client_name,
    is_active
) VALUES 
(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'Excellent Service and Quality Products',
    'John Smith',
    true
),
(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'Reliable Import Partner',
    'Sarah Johnson',
    true
),
(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'Outstanding Customer Support',
    'Michael Brown',
    true
) ON CONFLICT DO NOTHING;

-- Note: Admin users will be created through the authentication system
-- This seed file focuses on initial company data that doesn't require authentication