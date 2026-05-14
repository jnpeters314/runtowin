import { validateRequest } from '@/lib/supabase-server'

export async function GET(request: Request) {
  const { user, supabase } = await validateRequest(request)
  if (!user || !supabase) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('conversations')
    .select('id, title, race_context, created_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(50)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ conversations: data ?? [] })
}

export async function POST(request: Request) {
  const { user, supabase } = await validateRequest(request)
  if (!user || !supabase) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, raceContext } = await request.json()

  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user_id: user.id,
      title: (title ?? 'New conversation').slice(0, 80),
      race_context: raceContext ?? null,
    })
    .select('id, title, created_at, updated_at')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ conversation: data })
}
