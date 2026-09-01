-- Migration: 002_admin_enquiries_policy.sql
-- Enables Authenticated Supabase Users (School Admin) to read and manage admission & contact enquiries

-- 1. Enable Authenticated Users to read Admission Enquiries
CREATE POLICY "Allow authenticated users to read admission enquiries"
ON public.admission_enquiries
FOR SELECT
TO authenticated
USING (true);

-- 2. Allow Authenticated Users to update status of admission enquiries
CREATE POLICY "Allow authenticated users to update admission enquiries"
ON public.admission_enquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. Enable Authenticated Users to read Contact Enquiries
CREATE POLICY "Allow authenticated users to read contact enquiries"
ON public.contact_enquiries
FOR SELECT
TO authenticated
USING (true);

-- 4. Allow Authenticated Users to update status of contact enquiries
CREATE POLICY "Allow authenticated users to update contact enquiries"
ON public.contact_enquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
