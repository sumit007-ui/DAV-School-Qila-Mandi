-- ============================================================================
-- 010: ADMIN AUDIT LOG TABLE
-- Dr. M.R.S. Bhalla D.A.V. School, Qila Mandi, Batala
-- Tracks every admin action for security forensics
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    admin_email TEXT,
    ip_address TEXT,
    payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast lookup by action or email
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON public.admin_audit_log (action);
CREATE INDEX IF NOT EXISTS idx_audit_log_email  ON public.admin_audit_log (admin_email);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON public.admin_audit_log (created_at DESC);

-- Enable RLS
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can read audit log
DROP POLICY IF EXISTS "Admins can read audit log" ON public.admin_audit_log;
CREATE POLICY "Admins can read audit log"
    ON public.admin_audit_log FOR SELECT
    TO authenticated USING (true);

-- Only service role (server-side) can insert
DROP POLICY IF EXISTS "Service role can insert audit log" ON public.admin_audit_log;
CREATE POLICY "Service role can insert audit log"
    ON public.admin_audit_log FOR INSERT
    TO service_role WITH CHECK (true);

-- Nobody can update or delete audit log rows (immutable)
-- (No UPDATE or DELETE policies = deny by default with RLS enabled)

-- Auto-cleanup: keep last 90 days of logs to avoid unbounded growth
-- Run this periodically via Supabase cron or pg_cron:
-- DELETE FROM admin_audit_log WHERE created_at < now() - interval '90 days';
