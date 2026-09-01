import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oeqfpyisvpxltzxdozxv.supabase.co'

// Use SUPABASE_SERVICE_ROLE_KEY if available on server, otherwise fallback to Anon/Publishable key
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_ceqbzuKzENcnk3iHAdOByg_fI_z-3w1'

export const getSupabaseServerClient = () => {
  return createClient<any>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
