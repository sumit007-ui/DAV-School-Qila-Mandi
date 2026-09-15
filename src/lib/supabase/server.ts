import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  ''

export const getSupabaseServerClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      '[Supabase Server Config Alert] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Database operations cannot be executed.'
    )

    const unconfiguredError = {
      message: 'Supabase credentials are not configured on the server environment.',
      code: 'UNCONFIGURED_DATABASE_CLIENT',
    }

    return {
      from: () => ({
        insert: async () => ({ data: null, error: unconfiguredError }),
        select: async () => ({ data: null, error: unconfiguredError }),
        update: async () => ({ data: null, error: unconfiguredError }),
        delete: async () => ({ data: null, error: unconfiguredError }),
        eq: () => ({ data: null, error: unconfiguredError }),
        order: () => ({ data: null, error: unconfiguredError }),
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
