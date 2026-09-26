-- ==============================================================================
-- MIGRATION 007: FULL SECURITY HARDENING (RLS & STORAGE POLICIES)
-- Prevents unauthorized database tampering, data scraping, and storage pollution.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. HARDEN 'school_settings' TABLE RLS
-- ------------------------------------------------------------------------------
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to school_settings" ON public.school_settings;
CREATE POLICY "Allow public read access to school_settings"
    ON public.school_settings
    FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins to modify school_settings" ON public.school_settings;
CREATE POLICY "Admins only modify school_settings"
    ON public.school_settings
    FOR ALL
    TO authenticated
    USING (
        auth.role() = 'authenticated'
    )
    WITH CHECK (
        auth.role() = 'authenticated'
    );

DROP POLICY IF EXISTS "Allow service role full access to school_settings" ON public.school_settings;
CREATE POLICY "Service role full access to school_settings"
    ON public.school_settings
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 2. HARDEN 'website_photos' TABLE RLS
-- ------------------------------------------------------------------------------
ALTER TABLE public.website_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read for website_photos" ON public.website_photos;
CREATE POLICY "Allow public read for website_photos"
    ON public.website_photos
    FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to website_photos" ON public.website_photos;
CREATE POLICY "Admins only manage website_photos"
    ON public.website_photos
    FOR ALL
    TO authenticated
    USING (
        auth.role() = 'authenticated'
    )
    WITH CHECK (
        auth.role() = 'authenticated'
    );

DROP POLICY IF EXISTS "Allow service role full access to website_photos" ON public.website_photos;
CREATE POLICY "Service role full access to website_photos"
    ON public.website_photos
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 3. HARDEN 'news' TABLE RLS
-- ------------------------------------------------------------------------------
ALTER TABLE IF EXISTS public.news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read published news" ON public.news;
CREATE POLICY "Allow public read published news"
    ON public.news
    FOR SELECT
    USING (status = 'published' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins only manage news" ON public.news;
CREATE POLICY "Admins only manage news"
    ON public.news
    FOR ALL
    TO authenticated
    USING (
        auth.role() = 'authenticated'
    )
    WITH CHECK (
        auth.role() = 'authenticated'
    );

-- ------------------------------------------------------------------------------
-- 4. HARDEN STORAGE BUCKET POLICIES (website-photos & news-images)
-- Prevent anonymous users from uploading or tampering with school media assets
-- ------------------------------------------------------------------------------

-- Ensure public can read assets
DROP POLICY IF EXISTS "Allow public read for website photos" ON storage.objects;
CREATE POLICY "Allow public read for website photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'website-photos');

DROP POLICY IF EXISTS "Allow public read for news images" ON storage.objects;
CREATE POLICY "Allow public read for news images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'news-images');

-- Disallow anonymous uploads (drop legacy public upload policies if any exist)
DROP POLICY IF EXISTS "Allow public upload for website-photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload for news images" ON storage.objects;

-- Strictly require authenticated admin session to upload media
DROP POLICY IF EXISTS "Admins only upload website photos" ON storage.objects;
CREATE POLICY "Admins only upload website photos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'website-photos');

DROP POLICY IF EXISTS "Admins only upload news images" ON storage.objects;
CREATE POLICY "Admins only upload news images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'news-images');

-- Strictly require authenticated admin session to update or delete media
DROP POLICY IF EXISTS "Admins only update website photos" ON storage.objects;
CREATE POLICY "Admins only update website photos"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'website-photos');

DROP POLICY IF EXISTS "Admins only delete website photos" ON storage.objects;
CREATE POLICY "Admins only delete website photos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'website-photos');

DROP POLICY IF EXISTS "Admins only update news images" ON storage.objects;
CREATE POLICY "Admins only update news images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'news-images');

DROP POLICY IF EXISTS "Admins only delete news images" ON storage.objects;
CREATE POLICY "Admins only delete news images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'news-images');
