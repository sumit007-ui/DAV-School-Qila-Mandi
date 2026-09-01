-- Migration: 003_admin_delete_policy.sql
-- Enables Authenticated Supabase Users (School Admin) to delete admission & contact enquiries

-- 1. Allow Authenticated Users to delete admission enquiries
CREATE POLICY "Allow authenticated users to delete admission enquiries"
ON public.admission_enquiries
FOR DELETE
TO authenticated
USING (true);

-- 2. Allow Authenticated Users to delete contact enquiries
CREATE POLICY "Allow authenticated users to delete contact enquiries"
ON public.contact_enquiries
FOR DELETE
TO authenticated
USING (true);
