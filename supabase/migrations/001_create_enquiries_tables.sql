-- ==============================================================================
-- DAV Public School Qilla Mandi - Enquiries Database Schema & RLS Policies
-- ==============================================================================

-- 1. ADMISSION ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.admission_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL,
    student_name TEXT NOT NULL,
    applying_for_class TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    preferred_contact_method TEXT DEFAULT 'WhatsApp',
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
    source TEXT DEFAULT 'website_admission_modal',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. CONTACT ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    subject TEXT,
    category TEXT DEFAULT 'General Enquiry',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    source TEXT DEFAULT 'website_contact_page',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.admission_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES FOR ADMISSION ENQUIRIES
-- Allow public (anon) and authenticated users to submit new enquiries
CREATE POLICY "Allow public insert to admission_enquiries"
    ON public.admission_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Disallow public read/update/delete - Only service_role can select/update/delete
CREATE POLICY "Allow service_role full access to admission_enquiries"
    ON public.admission_enquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 5. RLS POLICIES FOR CONTACT ENQUIRIES
-- Allow public (anon) and authenticated users to submit contact enquiries
CREATE POLICY "Allow public insert to contact_enquiries"
    ON public.contact_enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Disallow public read/update/delete - Only service_role can select/update/delete
CREATE POLICY "Allow service_role full access to contact_enquiries"
    ON public.contact_enquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 6. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_admission_enquiries_updated_at ON public.admission_enquiries;
CREATE TRIGGER set_admission_enquiries_updated_at
    BEFORE UPDATE ON public.admission_enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_contact_enquiries_updated_at ON public.contact_enquiries;
CREATE TRIGGER set_contact_enquiries_updated_at
    BEFORE UPDATE ON public.contact_enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Indices for rapid administrative querying
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_created_at ON public.admission_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_status ON public.admission_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON public.contact_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries(status);
