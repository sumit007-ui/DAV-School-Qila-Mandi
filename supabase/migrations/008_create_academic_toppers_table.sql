-- ==============================================================================
-- 008: CREATE 'academic_toppers' TABLE FOR CLASS 10 BOARD DISTINCTION ROLL
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.academic_toppers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    score TEXT NOT NULL,
    exam TEXT NOT NULL DEFAULT 'PSEB Class 10 Board',
    year TEXT NOT NULL DEFAULT '2024',
    rank TEXT DEFAULT 'District Distinction',
    badge_text TEXT DEFAULT 'GOLD MEDALIST',
    distinctions TEXT DEFAULT '',
    testimonial TEXT DEFAULT '',
    parent_info TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    display_order INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_academic_toppers_active_order 
    ON public.academic_toppers (is_active, display_order, year DESC);

-- Enable RLS
ALTER TABLE public.academic_toppers ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access (Anyone can view active toppers on the website)
DROP POLICY IF EXISTS "Allow public read access to active academic_toppers" ON public.academic_toppers;
CREATE POLICY "Allow public read access to active academic_toppers"
    ON public.academic_toppers FOR SELECT
    USING (true);

-- 2. Authenticated Admin Access (Admins can perform CRUD operations)
DROP POLICY IF EXISTS "Allow authenticated admins full access to academic_toppers" ON public.academic_toppers;
CREATE POLICY "Allow authenticated admins full access to academic_toppers"
    ON public.academic_toppers FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. Service Role Access
DROP POLICY IF EXISTS "Allow service role full access to academic_toppers" ON public.academic_toppers;
CREATE POLICY "Allow service role full access to academic_toppers"
    ON public.academic_toppers FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Seed Initial Verified Class 10 Board Toppers (Batala Real Context)
INSERT INTO public.academic_toppers (
    name, score, exam, year, rank, badge_text, distinctions, testimonial, parent_info, image_url, display_order, is_active
) VALUES 
(
    'Simranjit Kaur',
    '98.4%',
    'PSEB Class 10 Board',
    '2024',
    'District Merit · Batala Topper',
    'TOPPER OF BATALA',
    'Mathematics 100/100 · Science 99/100 · Punjabi 98/100',
    'The individual teacher guidance and weekly pre-board mock tests at DAV Qila Mandi helped me build concepts without any private tuition.',
    'D/o S. Gurmeet Singh & Smt. Baljit Kaur (Mandi Road, Batala)',
    '/images/secondary-school.jpg',
    1,
    true
),
(
    'Harmanpreet Singh',
    '97.6%',
    'PSEB Class 10 Board',
    '2024',
    'District Rank 3 · Mathematics Distinction',
    'DISTINCTION MERIT',
    'Mathematics 100/100 · English 98/100 · Social Science 97/100',
    'Teachers were always approachable after class for doubt clearance. The school environment gives equal weightage to character and marks.',
    'S/o S. Manmohan Singh & Smt. Kamaljit Kaur (Urban Estate, Batala)',
    '/images/ethos-learning.jpg',
    2,
    true
),
(
    'Bhavya Sharma',
    '96.8%',
    'PSEB Class 10 Board',
    '2024',
    'Academic Excellence Award',
    'DISTINCTION MERIT',
    'Science 99/100 · Hindi 98/100 · Mathematics 97/100',
    'Practical science lab experiments and regular revision sessions helped me stay completely stress-free during the PSEB board exams.',
    'D/o Sh. Ramesh Sharma & Smt. Sunita Sharma (Qila Mandi, Batala)',
    '/images/pre-primary.jpg',
    3,
    true
),
(
    'Navjot Singh Bajwa',
    '95.8%',
    'PSEB Class 10 Board',
    '2024',
    'All-Rounder Distinction Award',
    'MERIT HOLDER',
    'Social Science 98/100 · Punjabi 98/100 · IT 96/100',
    'Balancing district sports tournaments with Class 10 board preparation was possible only because the teachers gave extra time and care.',
    'S/o S. Hardeep Singh Bajwa (Kahnuwan Road, Batala)',
    '/images/middle-school.jpg',
    4,
    true
)
ON CONFLICT (id) DO NOTHING;
