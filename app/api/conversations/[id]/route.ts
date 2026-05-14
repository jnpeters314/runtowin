import { validateRequest } from '@/lib/supabase-server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, supabase } = await validateRequest(request)
  if (!user || !supabase) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const { data: conversation, error: convError } = await supabase
    .from('conversations')
    .select('id, title, race_context, created_at, updated_at')
    .eq('id', id)
    .single()

  if (convError || !conversation) return Response.json({ error: 'Not found' }, { status: 404 })

  const { data: messages, error: msgError } = await supabase
    .from('chat_messages')
    .select('id, role, content, created_at')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true })

  if (msgError) return Response.json({ error: msgError.message }, { status: 500 })

  return Response.json({ conversation, messages: messages ?? [] })
}
