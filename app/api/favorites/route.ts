import { validateRequest } from '@/lib/supabase-server'

export async function GET(request: Request) {
  const { user, supabase } = await validateRequest(request)
  if (!user || !supabase) return Response.json({ favorites: [] })

  const { data } = await supabase
    .from('resource_favorites')
    .select('resource_slug')
    .order('created_at', { ascending: false })

  return Response.json({ favorites: (data ?? []).map((f) => f.resource_slug) })
}

export async function POST(request: Request) {
  const { user, supabase } = await validateRequest(request)
  if (!user || !supabase) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, action } = await request.json()

  if (action === 'remove') {
    await supabase
      .from('resource_favorites')
      .delete()
      .eq('resource_slug', slug)
    return Response.json({ favorited: false })
  }

  await supabase
    .from('resource_favorites')
    .upsert({ user_id: user.id, resource_slug: slug }, { onConflict: 'user_id,resource_slug' })
  return Response.json({ favorited: true })
}
