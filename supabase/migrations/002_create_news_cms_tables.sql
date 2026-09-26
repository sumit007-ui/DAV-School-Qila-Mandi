-- ==============================================================================
-- DAV Public School Qila Mandi - News CMS Database Schema & Storage Setup
-- Run this complete script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/oeqfpyisvpxltzxdozxv/sql/new
-- ==============================================================================

-- 1. CREATE NEWS TABLE
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    excerpt TEXT NOT NULL,
    content TEXT[] NOT NULL DEFAULT '{}',
    date TEXT NOT NULL DEFAULT to_char(now(), 'Mon DD, YYYY'),
    read_time TEXT DEFAULT '3 min read',
    author_name TEXT DEFAULT 'DAV Editorial Board',
    author_role TEXT DEFAULT 'Dr. MRS Bhalla DAV School Qila Mandi',
    image TEXT DEFAULT '/images/school-building.png',
    featured BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexing for high-speed queries
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news(status);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON public.news(created_at DESC);

-- 2. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone (public) can read published news
DROP POLICY IF EXISTS "Allow public read published news" ON public.news;
CREATE POLICY "Allow public read published news"
    ON public.news
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- Policy 2: Full access for service_role (used by backend API routes)
DROP POLICY IF EXISTS "Allow service_role full access to news" ON public.news;
CREATE POLICY "Allow service_role full access to news"
    ON public.news
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy 3: Authenticated administrators can manage all news
DROP POLICY IF EXISTS "Allow authenticated admin full access to news" ON public.news;
CREATE POLICY "Allow authenticated admin full access to news"
    ON public.news
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. STORAGE BUCKET FOR NEWS IMAGES ('news-images')
-- Create bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'news-images',
    'news-images',
    true,
    5242880, -- 5 MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- 4. STORAGE POLICIES FOR 'news-images' BUCKET
-- Allow public to view any image in 'news-images' bucket
DROP POLICY IF EXISTS "Public can view news images" ON storage.objects;
CREATE POLICY "Public can view news images"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'news-images');

-- Allow service_role and authenticated users to upload images
DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
CREATE POLICY "Admins can upload news images"
    ON storage.objects FOR INSERT
    TO service_role, authenticated
    WITH CHECK (bucket_id = 'news-images');

-- Allow service_role and authenticated users to update/delete images
DROP POLICY IF EXISTS "Admins can update news images" ON storage.objects;
CREATE POLICY "Admins can update news images"
    ON storage.objects FOR UPDATE
    TO service_role, authenticated
    USING (bucket_id = 'news-images');

DROP POLICY IF EXISTS "Admins can delete news images" ON storage.objects;
CREATE POLICY "Admins can delete news images"
    ON storage.objects FOR DELETE
    TO service_role, authenticated
    USING (bucket_id = 'news-images');

-- 5. INITIAL SEED DATA (Default School News)
INSERT INTO public.news (
    title, slug, category, excerpt, content, date, read_time, author_name, author_role, image, featured, status
)
VALUES
(
    'Admissions Open for Session 2026-2027: Pre-Nursery to Class 10',
    'admissions-open-session-2026-2027',
    'Admissions',
    'Registration commences for Nursery, Kindergarten, Primary and High School with merit scholarships for outstanding achievers.',
    ARRAY[
        'Dr. MRS Bhalla DAV School Qila Mandi announces the commencement of admission procedures for the upcoming academic session 2026-2027.',
        'Parents seeking holistic, value-based education integrated with modern STEM infrastructure and sports facilities are invited to submit enquiries online or collect registration forms from the administrative reception.',
        'Special merit scholarships will be awarded to students scoring top marks in previous academic terms.'
    ],
    'March 2026',
    '3 min read',
    'Admissions Office',
    'Dr. MRS Bhalla DAV School Qila Mandi',
    '/images/school-building.png',
    true,
    'published'
),
(
    'Annual Science & Atal Robotics Technology Expo 2026',
    'annual-science-tech-expo-2026',
    'Academics',
    'Over 150 student innovations showcased spanning autonomous agricultural drones, smart solar trackers, and biomedical sensors.',
    ARRAY[
        'Young innovators from Classes 6 through 10 presented cutting-edge working prototypes at the annual DAV Qila Mandi Science & Innovation Conclave.',
        'Distinguished university professors evaluated 85 competitive exhibits and lauded the empirical rigor demonstrated by middle school participants.',
        'The robotics team will represent the district at the upcoming Northern India CBSE & PSEB Innovation Forum in Chandigarh.'
    ],
    'February 2026',
    '4 min read',
    'Department of Science',
    'Dr. MRS Bhalla DAV School Qila Mandi',
    '/images/science-lab.jpg',
    false,
    'published'
),
(
    'Sacred Vedic Havan & Academic Blessing Ceremony',
    'sacred-vedic-havan-and-blessing-ceremony',
    'Heritage',
    'Students and faculty gathered at the Yajnashala to seek divine wisdom ahead of upcoming board examinations.',
    ARRAY[
        'The solemn weekly Havan ceremony was conducted with chanting of sacred Gayatri and Mahamrityunjaya Mantras, sanctifying the school atmosphere.',
        'Principal Paramjit Kaur bestowed blessings upon the outgoing Class 10 scholars, reinforcing DAV moral ideals and perseverance in life.',
        'Prasad was distributed to all attendees following Vedic devotional hymns.'
    ],
    'January 2026',
    '2 min read',
    'Vedic Heritage Cell',
    'Dr. MRS Bhalla DAV School Qila Mandi',
    '/images/yajnashala-havan.jpg',
    false,
    'published'
),
(
    'DAV Qila Mandi Dominates District Cricket & Karate Championships',
    'district-cricket-karate-championship-2026',
    'Sports',
    'School athletes brought home 12 Gold and 6 Silver medals at the Punjab State Inter-School Sports Tournament.',
    ARRAY[
        'Our cricket team secured an emphatic 48-run victory in the finals, while the Karate dojo participants won top honors across kata and kumite categories.',
        'Special recognition was awarded to Master Arjun Sharma for individual best all-rounder and Miss Simranjeet Kaur for Karate black-belt excellence.'
    ],
    'March 2026',
    '3 min read',
    'Sports Directorate',
    'Dr. MRS Bhalla DAV School Qila Mandi',
    '/images/sports-champions.jpg',
    true,
    'published'
)
ON CONFLICT (slug) DO NOTHING;
