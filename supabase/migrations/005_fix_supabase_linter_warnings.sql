-- ==============================================================================
-- Migration: 005_fix_supabase_linter_warnings.sql
-- Complete Remediation for ALL remaining Supabase Database Security Linter items
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. FIX TRIGGER FUNCTIONS & REVOKE PUBLIC EXECUTE PERMISSIONS
-- ------------------------------------------------------------------------------

-- Trigger functions do NOT need SECURITY DEFINER (removing it fixes the warning)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$;

-- Revoke execute from public/anon/authenticated on trigger functions
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM authenticated;

-- Drop set_new_user_as_admin if not strictly needed or revoke its permissions
DROP TRIGGER IF EXISTS on_auth_user_created_set_admin ON auth.users;
DROP FUNCTION IF EXISTS public.set_new_user_as_admin();

-- ------------------------------------------------------------------------------
-- 2. FIX "RLS Policy Always True" ON INSERT POLICIES
-- Replace 'WITH CHECK (true)' with schema validation constraints
-- ------------------------------------------------------------------------------

-- Drop legacy always-true insert policies
DROP POLICY IF EXISTS "Allow public insert to admission_enquiries" ON public.admission_enquiries;
DROP POLICY IF EXISTS "Allow public insert to contact_enquiries" ON public.contact_enquiries;

-- New hardened INSERT policy for Admission Enquiries
CREATE POLICY "Allow public insert to admission_enquiries"
ON public.admission_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
    parent_name IS NOT NULL AND length(trim(parent_name)) > 0 AND
    student_name IS NOT NULL AND length(trim(student_name)) > 0 AND
    phone IS NOT NULL AND length(trim(phone)) > 0
);

-- New hardened INSERT policy for Contact Enquiries
CREATE POLICY "Allow public insert to contact_enquiries"
ON public.contact_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
    name IS NOT NULL AND length(trim(name)) > 0 AND
    message IS NOT NULL AND length(trim(message)) > 0
);

-- ------------------------------------------------------------------------------
-- 3. ENSURE ALL ADMIN POLICIES USE STRICT app_metadata
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "Admins only read admission enquiries" ON public.admission_enquiries;
DROP POLICY IF EXISTS "Admins only update admission enquiries" ON public.admission_enquiries;
DROP POLICY IF EXISTS "Admins only delete admission enquiries" ON public.admission_enquiries;

CREATE POLICY "Admins only read admission enquiries"
ON public.admission_enquiries
FOR SELECT
TO authenticated
USING (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "Admins only update admission enquiries"
ON public.admission_enquiries
FOR UPDATE
TO authenticated
USING (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "Admins only delete admission enquiries"
ON public.admission_enquiries
FOR DELETE
TO authenticated
USING (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);

DROP POLICY IF EXISTS "Admins only read contact enquiries" ON public.contact_enquiries;
DROP POLICY IF EXISTS "Admins only update contact enquiries" ON public.contact_enquiries;
DROP POLICY IF EXISTS "Admins only delete contact enquiries" ON public.contact_enquiries;

CREATE POLICY "Admins only read contact enquiries"
ON public.contact_enquiries
FOR SELECT
TO authenticated
USING (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "Admins only update contact enquiries"
ON public.contact_enquiries
FOR UPDATE
TO authenticated
USING (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "Admins only delete contact enquiries"
ON public.contact_enquiries
FOR DELETE
TO authenticated
USING (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);
