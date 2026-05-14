import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createAuthedSupabase(token: string) {
  return createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  })
}

export async function validateRequest(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return { user: null, supabase: null }

  const supabase = createAuthedSupabase(token)
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return { user: null, supabase: null }

  return { user, supabase }
}
