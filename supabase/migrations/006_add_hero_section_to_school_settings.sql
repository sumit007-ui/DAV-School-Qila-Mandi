-- ==============================================================================
-- MIGRATION 006: ADD HERO SECTION HEADLINES & DESCRIPTION TO SCHOOL SETTINGS
-- ==============================================================================

-- 1. Add hero section dynamic columns to existing school_settings table
ALTER TABLE public.school_settings
ADD COLUMN IF NOT EXISTS hero_badge_text TEXT DEFAULT 'Welcome to Dr. M.R.S. Bhalla D.A.V. School',
ADD COLUMN IF NOT EXISTS hero_title_line1 TEXT DEFAULT 'Nurturing Excellence,',
ADD COLUMN IF NOT EXISTS hero_title_line2 TEXT DEFAULT 'Inspiring Futures.',
ADD COLUMN IF NOT EXISTS hero_description TEXT DEFAULT 'An acclaimed academic sanctuary cultivating intellectual rigor, Vedic values, and holistic leadership at Qila Mandi, Batala.';

-- 2. Update default row with default hero content if columns are currently null
UPDATE public.school_settings
SET 
  hero_badge_text = COALESCE(hero_badge_text, 'Welcome to Dr. M.R.S. Bhalla D.A.V. School'),
  hero_title_line1 = COALESCE(hero_title_line1, 'Nurturing Excellence,'),
  hero_title_line2 = COALESCE(hero_title_line2, 'Inspiring Futures.'),
  hero_description = COALESCE(hero_description, 'An acclaimed academic sanctuary cultivating intellectual rigor, Vedic values, and holistic leadership at Qila Mandi, Batala.')
WHERE id = 'default';
