/**
 * Admin Audit Logger
 * Records every admin action (settings change, upload, delete, etc.) to the
 * admin_audit_log Supabase table for a complete forensic trail.
 */
import { getSupabaseServerClient } from '@/lib/supabase/server'

export type AuditAction =
  | 'settings_update'
  | 'photo_upload'
  | 'photo_delete'
  | 'news_create'
  | 'news_update'
  | 'news_delete'
  | 'topper_create'
  | 'topper_update'
  | 'topper_delete'
  | 'storage_upload'
  | 'storage_delete'
  | 'principal_update'
  | 'enquiry_update'
  | 'enquiry_delete'

interface AuditEntry {
  action: AuditAction
  adminEmail?: string
  ip?: string
  details?: Record<string, any>
}

/**
 * Logs an admin action to the audit table.
 * Silently swallows errors — logging failure must never block the primary action.
 */
export async function logAdminAction(entry: AuditEntry): Promise<void> {
  try {
    const supabase = getSupabaseServerClient()
    if (!supabase) return

    await supabase.from('admin_audit_log').insert({
      action: entry.action,
      admin_email: entry.adminEmail || null,
      ip_address: entry.ip || null,
      payload: entry.details || {},
      created_at: new Date().toISOString(),
    })
  } catch {
    // Never let audit logging break the main flow
  }
}

/**
 * Extracts admin email from a validated user object.
 */
export function getAdminEmail(user: any): string {
  return user?.email || user?.user_metadata?.email || 'unknown'
}
