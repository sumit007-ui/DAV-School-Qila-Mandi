-- ==============================================================================
-- 1. CREATE 'website_photos' TABLE FOR DYNAMIC SITE-WIDE PHOTO MANAGEMENT
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.website_photos (
    key TEXT PRIMARY KEY,
    page TEXT NOT NULL,
    title TEXT NOT NULL,
    section TEXT NOT NULL,
    url TEXT NOT NULL,
    default_url TEXT NOT NULL,
    alt TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 2. CREATE 'website-photos' SUPABASE STORAGE BUCKET
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-photos', 'website-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
DROP POLICY IF EXISTS "Allow public read access to website photos" ON storage.objects;
CREATE POLICY "Allow public read access to website photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'website-photos');

DROP POLICY IF EXISTS "Allow authorized users to upload website photos" ON storage.objects;
CREATE POLICY "Allow authorized users to upload website photos"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'website-photos');

DROP POLICY IF EXISTS "Allow authorized users to update website photos" ON storage.objects;
CREATE POLICY "Allow authorized users to update website photos"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'website-photos');

DROP POLICY IF EXISTS "Allow authorized users to delete website photos" ON storage.objects;
CREATE POLICY "Allow authorized users to delete website photos"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'website-photos');

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) FOR 'website_photos'
-- ==============================================================================
ALTER TABLE public.website_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read for website_photos" ON public.website_photos;
CREATE POLICY "Allow public read for website_photos"
    ON public.website_photos FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to website_photos" ON public.website_photos;
CREATE POLICY "Allow authenticated admins full access to website_photos"
    ON public.website_photos FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access to website_photos" ON public.website_photos;
CREATE POLICY "Allow service role full access to website_photos"
    ON public.website_photos FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 4. INSERT DEFAULT PHOTO SLOTS
-- ==============================================================================
INSERT INTO public.website_photos (key, page, title, section, url, default_url, alt)
VALUES
(
    'home_hero',
    'Home Page',
    'Cinematic Hero Background',
    'Hero Section Top',
    '/images/school-building.png',
    '/images/school-building.png',
    'Dr. MRS Bhalla DAV School Qila Mandi Building'
),
(
    'home_principal',
    'Home Page',
    'Principal Perspective Portrait',
    'Principal Message Section',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    'Mrs. Paramjit Kaur - Principal'
),
(
    'about_campus',
    'About Page',
    'Historic Campus & Grounds',
    'Institutional Genesis',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000',
    'DAV School Campus Grounds'
),
(
    'journey_early_years',
    'Learning Journey',
    'Stage 01: Early Years (Kindergarten)',
    'Nursery to UKG Wing',
    '/images/pre-primary.jpg',
    '/images/pre-primary.jpg',
    'Joyful Play & Foundational Literacy'
),
(
    'journey_primary',
    'Learning Journey',
    'Stage 02: Primary Wing (Classes 1–5)',
    'Primary Education Wing',
    '/images/primary-school.jpg',
    '/images/primary-school.jpg',
    'Structured Inquiry & Mathematical Habits'
),
(
    'journey_middle',
    'Learning Journey',
    'Stage 03: Middle Wing (Classes 6–8)',
    'Middle School Stage',
    '/images/middle-school.jpg',
    '/images/middle-school.jpg',
    'Independent Critical Thinking & Science Labs'
),
(
    'journey_secondary',
    'Learning Journey',
    'Stage 04: Secondary Transition (Class 9)',
    'High School Transition',
    '/images/secondary-school.jpg',
    '/images/secondary-school.jpg',
    'Academic Specialization & Career Orientation'
),
(
    'journey_board',
    'Learning Journey',
    'Stage 05: Class 10 PSEB Board Distinction',
    'Board Excellence Wing',
    '/images/ethos-learning.jpg',
    '/images/ethos-learning.jpg',
    'Board Preparation & Scholastic Mastery'
),
(
    'facility_computer_lab',
    'Facilities',
    'Modern Computer Lab & Smart Lab',
    'Campus Laboratories',
    '/images/computer-lab.jpg',
    '/images/computer-lab.jpg',
    'High Speed Computer Intranet Lab'
),
(
    'facility_science_lab',
    'Facilities',
    'Composite Science Laboratory',
    'Campus Laboratories',
    '/images/science-lab.jpg',
    '/images/science-lab.jpg',
    'Physics, Chemistry & Biology Apparatus'
),
(
    'facility_library',
    'Facilities',
    'Central School Library',
    'Academic Sanctuaries',
    '/images/library.jpg',
    '/images/library.jpg',
    'Resource Center & Reference Hall'
),
(
    'facility_sports',
    'Facilities',
    'Cricket Pitch & Martial Arts Dojo',
    'Sports & Conditioning',
    '/images/sports-ground.jpg',
    '/images/sports-ground.jpg',
    'Sports Turf & Outdoor Playfield'
),
(
    'facility_yajnashala',
    'Vedic Heritage',
    'Sacred Yajnashala & Havan Shala',
    'Spiritual & Ethical Life',
    '/images/yajnashala-havan.jpg',
    '/images/yajnashala-havan.jpg',
    'Morning Vedic Havan & Sacred Fire Ritual'
),
(
    'facility_cultural',
    'Student Life',
    'Bhangra, Giddha & Cultural Jubilees',
    'Arts & Performing Wing',
    '/images/bhangra-giddha.jpg',
    '/images/bhangra-giddha.jpg',
    'Punjabi Folk Heritage & Annual Conclave'
),
(
    'facility_patriotic',
    'Student Life',
    'Patriotic Celebrations & Flag Hoisting',
    'National Pride',
    '/images/independence-day.jpg',
    '/images/independence-day.jpg',
    'Independence & Republic Day Observances'
),
(
    'facility_vedic',
    'Student Life',
    'Vedic Values & Moral Education',
    'Dharma Shiksha',
    '/images/vedic-values.jpg',
    '/images/vedic-values.jpg',
    'Moral Discourses & Value Integration'
)
ON CONFLICT (key) DO NOTHING;
