import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function sendNotification(email: string, source: string) {
  const resendKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL
  if (!resendKey || !notifyEmail) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: 'Run to Win <notifications@runtowin.ai>',
      to: notifyEmail,
      subject: `New waitlist signup: ${email}`,
      text: `New signup on Run to Win\n\nEmail: ${email}\nSource: ${source}\nTime: ${new Date().toUTCString()}`,
    }),
  })
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

  // Fire-and-forget — don't let notification failure block the response
  sendNotification(email, source ?? 'unknown').catch(() => {})

  return Response.json({ ok: true })
}
