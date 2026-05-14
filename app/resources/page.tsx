'use client'

import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { resources } from '@/lib/content/resources'
import { useAuth } from '@/lib/auth-context'
import AuthModal from '@/components/auth-modal'
import { cn } from '@/lib/utils'

const categoryColors: Record<string, string> = {
  Toolkit: 'bg-blue-50 text-blue-700',
  Guide: 'bg-purple-50 text-purple-700',
  Template: 'bg-green-50 text-green-700',
  Checklist: 'bg-orange-50 text-orange-700',
}

const sections = [
  {
    title: 'Toolkits',
    description: 'Bundled resources for specific campaign moments. Open, copy, deploy.',
    slugs: ['launch-day-toolkit', 'phonebank-textbank-starter-kit', 'volunteer-onboarding-kit'],
  },
  {
    title: 'Field Guides',
    description: 'Step-by-step guidance for the most important campaign activities.',
    slugs: ['voter-contact-101', 'gotv-mini-playbook', 'press-basics'],
  },
  {
    title: 'Fundraising',
    description: 'Scripts, cadences, and frameworks for raising money at every stage.',
    slugs: ['first-72-hours-fundraising-sprint', 'digital-ads-101'],
  },
  {
    title: 'Operations',
    description: 'The behind-the-scenes work that keeps your campaign legal and organized.',
    slugs: ['compliance-basics', '4-week-content-calendar'],
  },
]

export default function ResourcesPage() {
  const { user, getToken } = useAuth()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState(false)

  const bySlug = Object.fromEntries(resources.map((r) => [r.slug, r]))

  useEffect(() => {
    if (!user) { setFavorites(new Set()); return }
    getToken().then((token) => {
      if (!token) return
      fetch('/api/favorites', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then(({ favorites }) => setFavorites(new Set(favorites ?? [])))
        .catch(() => {})
    })
  }, [user, getToken])

  async function toggleFavorite(slug: string, e: React.MouseEvent) {
    e.preventDefault()
    if (!user) { setShowAuth(true); return }
    if (togglingSlug) return

    setTogglingSlug(slug)
    const isFav = favorites.has(slug)
    // Optimistic update
    setFavorites((prev) => {
      const next = new Set(prev)
      isFav ? next.delete(slug) : next.add(slug)
      return next
    })

    try {
      const token = await getToken()
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ slug, action: isFav ? 'remove' : 'add' }),
      })
    } catch {
      // Roll back on error
      setFavorites((prev) => {
        const next = new Set(prev)
        isFav ? next.add(slug) : next.delete(slug)
        return next
      })
    } finally {
      setTogglingSlug(null)
    }
  }

  const favoritedResources = resources.filter((r) => favorites.has(r.slug))

  function ResourceCard({ slug }: { slug: string }) {
    const resource = bySlug[slug]
    if (!resource) return null
    const isFav = favorites.has(slug)

    return (
      <div className="relative group">
        <Link
          href={`/resources/${slug}`}
          className="border border-slate-200 rounded-xl p-5 bg-white hover:shadow-md transition-shadow flex flex-col h-full"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[resource.category] ?? 'bg-slate-100 text-slate-700'}`}>
              {resource.category}
            </span>
          </div>
          <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{resource.title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4">{resource.subtitle}</p>
          <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
            {resource.cta} <ArrowRight size={11} />
          </span>
        </Link>
        <button
          onClick={(e) => toggleFavorite(slug, e)}
          title={isFav ? 'Remove from saved' : 'Save this resource'}
          className={cn(
            'absolute top-3 right-3 p-1.5 rounded-lg transition-all',
            isFav
              ? 'text-amber-400 bg-amber-50 opacity-100'
              : 'text-slate-300 hover:text-amber-400 hover:bg-amber-50 opacity-0 group-hover:opacity-100'
          )}
        >
          <Star size={14} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="bg-navy-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Resources</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Guides, toolkits, and checklists built for down-ballot campaigns. Open any resource to read the full content.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">

        {/* Saved resources — shown only when user has favorites */}
        {user && favoritedResources.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Star size={18} className="text-amber-400" fill="currentColor" />
                My Saved Resources
              </h2>
              <p className="text-slate-500 text-sm mt-1">Resources you've starred for quick access.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoritedResources.map((r) => (
                <ResourceCard key={r.slug} slug={r.slug} />
              ))}
            </div>
          </div>
        )}

        {sections.map((section) => (
          <div key={section.title}>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
              <p className="text-slate-500 text-sm mt-1">{section.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.slugs.map((slug) => (
                <ResourceCard key={slug} slug={slug} />
              ))}
            </div>
          </div>
        ))}

        {!user && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
            <Star size={20} className="text-amber-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 mb-1">Save resources for later</p>
            <p className="text-xs text-slate-500 mb-3">Sign in to star resources and access them quickly from any device.</p>
            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Sign in free
            </button>
          </div>
        )}

        <div className="bg-navy-900 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Need something tailored to your race?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your Campaign Coach can write custom emails, social posts, and scripts based on your race, your voice, and your specific situation.
            </p>
          </div>
          <Link
            href="/advisor"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Ask your Coach <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
