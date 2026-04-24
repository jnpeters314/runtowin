export const runtime = 'edge'

import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: Request) {
  const { email, source } = await request.json()

  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Valid email required' }, { status: 400 })
  }

  const supabase = getSupabase()

  const { error } = await supabase
    .from('waitlist')
    .insert({ email: email.toLowerCase().trim(), source: source ?? 'unknown' })

  if (error) {
    // Duplicate email — treat as success so we don't leak info
    if (error.code === '23505') {
      return Response.json({ ok: true })
    }
    return Response.json({ error: 'Could not save. Please try again.' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
