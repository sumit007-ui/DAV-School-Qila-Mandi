-- ==============================================================================
-- 1. CREATE 'school_settings' TABLE FOR DYNAMIC SITE CONFIGURATION
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.school_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    school_name TEXT NOT NULL DEFAULT 'Dr. MRS Bhalla DAV School',
    sub_name TEXT NOT NULL DEFAULT 'Qila Mandi, Batala',
    established_year INT NOT NULL DEFAULT 1990,
    years_override INT DEFAULT NULL,
    office_hours TEXT NOT NULL DEFAULT 'Monday – Saturday: 8:00 AM – 2:30 PM',
    reception_phone TEXT NOT NULL DEFAULT '01871-501096',
    office_phone TEXT NOT NULL DEFAULT '01871-221285',
    email TEXT NOT NULL DEFAULT 'davqillamandi@gmail.com',
    address TEXT NOT NULL DEFAULT 'Qila Mandi Batala, Near Historic Qila Mandi, Batala, Punjab 143505',
    google_maps_url TEXT NOT NULL DEFAULT 'https://maps.google.com/?q=Dr.+MRS+Bhalla+DAV+School+Qila+Mandi+Batala',
    youtube_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@DrMRSBhalla',
    facebook_url TEXT NOT NULL DEFAULT 'https://www.facebook.com/share/18Fmov8Rc9/?mibextid=wwXIfr',
    instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/drmrsbhalladavschool_batala?stkn=NHJobHg5N3Rzcmtz&utm_source=qr',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS) FOR SCHOOL SETTINGS
-- ==============================================================================
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to school settings
DROP POLICY IF EXISTS "Allow public read access to school_settings" ON public.school_settings;
CREATE POLICY "Allow public read access to school_settings"
    ON public.school_settings
    FOR SELECT
    USING (true);

-- Allow authenticated admins full access to update settings
DROP POLICY IF EXISTS "Allow authenticated admins to modify school_settings" ON public.school_settings;
CREATE POLICY "Allow authenticated admins to modify school_settings"
    ON public.school_settings
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service role full access
DROP POLICY IF EXISTS "Allow service role full access to school_settings" ON public.school_settings;
CREATE POLICY "Allow service role full access to school_settings"
    ON public.school_settings
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 3. INSERT DEFAULT SEED ROW (ID: 'default')
-- ==============================================================================
INSERT INTO public.school_settings (
    id,
    school_name,
    sub_name,
    established_year,
    years_override,
    office_hours,
    reception_phone,
    office_phone,
    email,
    address,
    youtube_url,
    facebook_url,
    instagram_url
)
VALUES (
    'default',
    'Dr. MRS Bhalla DAV School',
    'Qila Mandi, Batala',
    1990,
    NULL,
    'Monday – Saturday: 8:00 AM – 2:30 PM',
    '01871-501096',
    '01871-221285',
    'davqillamandi@gmail.com',
    'Qila Mandi Batala, Near Historic Qila Mandi, Batala, Punjab 143505',
    'https://www.youtube.com/@DrMRSBhalla',
    'https://www.facebook.com/share/18Fmov8Rc9/?mibextid=wwXIfr',
    'https://www.instagram.com/drmrsbhalladavschool_batala?stkn=NHJobHg5N3Rzcmtz&utm_source=qr'
)
ON CONFLICT (id) DO NOTHING;
