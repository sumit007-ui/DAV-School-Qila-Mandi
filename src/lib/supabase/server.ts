import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  ''

export const getSupabaseServerClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    return {
      from: () => ({
        insert: async () => ({ error: null }),
        select: async () => ({ data: [], error: null }),
        update: async () => ({ error: null }),
        delete: async () => ({ error: null }),
        eq: () => ({ error: null }),
        order: () => ({ data: [], error: null }),
      }),
    } as any
  }

  return createClient<any>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
