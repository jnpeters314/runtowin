import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function sendNotification(email: string, source: string, name?: string, org?: string) {
  const resendKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL
  if (!resendKey || !notifyEmail) return

  const lines = [
    `New signup on Run to Win`,
    ``,
    `Email: ${email}`,
    name ? `Name: ${name}` : null,
    org ? `Organization: ${org}` : null,
    `Source: ${source}`,
    `Time: ${new Date().toUTCString()}`,
  ].filter(Boolean).join('\n')

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: 'Run to Win <notifications@runtowin.ai>',
      to: notifyEmail,
      subject: `New ${source} lead: ${name ? `${name} — ` : ''}${email}`,
      text: lines,
    }),
  })
}

export async function POST(request: Request) {
  const { email, source, name, org } = await request.json()

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
  sendNotification(email, source ?? 'unknown', name, org).catch(() => {})

  return Response.json({ ok: true })
}
