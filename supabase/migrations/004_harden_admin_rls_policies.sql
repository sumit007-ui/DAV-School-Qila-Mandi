-- ==============================================================================
-- Migration: 004_harden_admin_rls_policies.sql
-- Security Hardening: Enforce strict role-based access control for enquiries
-- Drops overly permissive 'TO authenticated USING (true)' policies (SEC-02)
-- ==============================================================================

-- 1. DROP LEGACY PERMISSIVE POLICIES ON ADMISSION ENQUIRIES
DROP POLICY IF EXISTS "Allow authenticated users to read admission enquiries" ON public.admission_enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update admission enquiries" ON public.admission_enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete admission enquiries" ON public.admission_enquiries;

-- 2. DROP LEGACY PERMISSIVE POLICIES ON CONTACT ENQUIRIES
DROP POLICY IF EXISTS "Allow authenticated users to read contact enquiries" ON public.contact_enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update contact enquiries" ON public.contact_enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete contact enquiries" ON public.contact_enquiries;

-- 3. CREATE STRICT ADMIN-ONLY POLICIES FOR ADMISSION ENQUIRIES
-- Only users with role = 'admin' in app_metadata or user_metadata can read
CREATE POLICY "Admins only read admission enquiries"
ON public.admission_enquiries
FOR SELECT
TO authenticated
USING (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Only users with role = 'admin' can update
CREATE POLICY "Admins only update admission enquiries"
ON public.admission_enquiries
FOR UPDATE
TO authenticated
USING (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Only users with role = 'admin' can delete
CREATE POLICY "Admins only delete admission enquiries"
ON public.admission_enquiries
FOR DELETE
TO authenticated
USING (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- 4. CREATE STRICT ADMIN-ONLY POLICIES FOR CONTACT ENQUIRIES
-- Only users with role = 'admin' in app_metadata or user_metadata can read
CREATE POLICY "Admins only read contact enquiries"
ON public.contact_enquiries
FOR SELECT
TO authenticated
USING (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Only users with role = 'admin' can update
CREATE POLICY "Admins only update contact enquiries"
ON public.contact_enquiries
FOR UPDATE
TO authenticated
USING (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Only users with role = 'admin' can delete
CREATE POLICY "Admins only delete contact enquiries"
ON public.contact_enquiries
FOR DELETE
TO authenticated
USING (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);
