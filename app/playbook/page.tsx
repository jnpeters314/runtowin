'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, Download, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const PLAYBOOK_PDF = 'https://drive.google.com/uc?export=download&id=1qMhRjI9rQrWuLxhP1V_Z08U_Yx_1FzDC'

const playbooks = [
  {
    category: 'Fundraising',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    accent: 'bg-blue-600',
    guides: [
      {
        title: 'The First 72 Hours Fundraising Sprint',
        desc: 'Raise your first $5k with a 3-message email/SMS cadence, a donor ladder, and a follow-up call script.',
        time: '8 min read',
        href: '/resources/first-72-hours-fundraising-sprint',
      },
      {
        title: 'Digital Ads on a Small Budget',
        desc: 'Where to spend, how to test, and what to measure when you only have a few hundred dollars.',
        time: '10 min read',
        href: '/resources/digital-ads-101',
      },
      {
        title: 'Call Time & Fundraising Basics',
        desc: 'The system, the script, and the mindset for making fundraising calls without dreading it. Ask your Campaign Coach.',
        time: 'Ask Coach',
        href: '/advisor',
      },
      {
        title: 'End-of-Quarter Fundraising Pushes',
        desc: 'How to use FEC deadlines as a reason to ask — and why they work better than most campaigns realize. Ask your Campaign Coach.',
        time: 'Ask Coach',
        href: '/advisor',
      },
    ],
  },
  {
    category: 'Voter Contact',
    color: 'bg-green-50 text-green-700 border-green-200',
    accent: 'bg-green-600',
    guides: [
      {
        title: 'Voter Contact 101: ID → Persuasion → GOTV',
        desc: 'A simple path from building your universe to mobilizing supporters, with scripts and cut-list guidance.',
        time: '10 min read',
        href: '/resources/voter-contact-101',
      },
      {
        title: 'Phonebank & Textbank Starter Kit',
        desc: 'Set up your first volunteer shifts in under a day: scripts, tools, and a simple tracking sheet.',
        time: '8 min read',
        href: '/resources/phonebank-textbank-starter-kit',
      },
      {
        title: 'Volunteer Onboarding Kit',
        desc: 'Recruit, train, and retain volunteers with clear roles, onboarding flows, and a simple tracking loop.',
        time: '10 min read',
        href: '/resources/volunteer-onboarding-kit',
      },
    ],
  },
  {
    category: 'Digital Strategy',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    accent: 'bg-purple-600',
    guides: [
      {
        title: '4-Week Content Calendar',
        desc: 'A plug-and-play plan for weekly updates, volunteer asks, short videos, and fundraising moments.',
        time: '6 min read',
        href: '/resources/4-week-content-calendar',
      },
      {
        title: 'Digital Ads 101 for Small Budgets',
        desc: 'Which channels to use, how to split your budget, and what creative actually converts.',
        time: '10 min read',
        href: '/resources/digital-ads-101',
      },
      {
        title: 'Press Basics: Announcements & Rapid Response',
        desc: 'Build media relationships, write pitches that get opened, and handle breaking news without a press team.',
        time: '10 min read',
        href: '/resources/press-basics',
      },
    ],
  },
  {
    category: 'GOTV',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    accent: 'bg-orange-600',
    guides: [
      {
        title: 'GOTV Mini-Playbook: Final Two Weeks',
        desc: 'Turn support into turnout with a crisp two-week calendar, coverage goals, and ballot-chase tactics.',
        time: '12 min read',
        href: '/resources/gotv-mini-playbook',
      },
      {
        title: 'Launch Day Toolkit',
        desc: 'Everything you need to announce your run: launch email, three social posts, and a media note.',
        time: '8 min read',
        href: '/resources/launch-day-toolkit',
      },
      {
        title: 'Compliance Basics for First-Time Candidates',
        desc: 'Open a bank account, designate a treasurer, and track contributions correctly from day one.',
        time: '8 min read',
        href: '/resources/compliance-basics',
      },
    ],
  },
]

function DownloadForm({ className }: { className?: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          source: 'playbook-download',
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }

      setDone(true)
      window.open(PLAYBOOK_PDF, '_blank')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className={cn('text-center py-2', className)}>
        <p className="text-white font-semibold mb-1">Your download is starting…</p>
        <p className="text-slate-300 text-sm mb-3">
          If it doesn't open automatically,{' '}
          <a href={PLAYBOOK_PDF} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
            click here
          </a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email *"
          required
          className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15"
        />
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 disabled:bg-white/20 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Download size={15} />
          {loading ? 'One sec…' : 'Download free'}
        </button>
      </div>
      {error && <p className="text-red-300 text-xs mt-2">{error}</p>}
      <p className="text-slate-500 text-xs mt-2">Free download. No spam, ever.</p>
    </form>
  )
}

export default function PlaybookPage() {
  return (
    <>
      {/* PDF download hero */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
              <BookOpen size={13} /> Official Playbook
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              The Run to Win<br className="hidden sm:block" /> Campaign Playbook
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mb-3 leading-relaxed">
              Everything a first-time or lean-staffed candidate needs to launch, raise, contact voters, and win — in one downloadable guide.
            </p>
            <ul className="text-slate-400 text-sm space-y-1 mb-8">
              {[
                'Fundraising cadences that work from day one',
                'Voter contact timelines and scripts',
                'Digital strategy on a small budget',
                'GOTV tactics for the final two weeks',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <DownloadForm className="max-w-xl" />
          </div>
        </div>
      </div>

      {/* Guides index */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Browse the guides</h2>
          <p className="text-slate-500 text-sm">
            Each guide below is available to read online. Download the full playbook above to get everything in one PDF.
          </p>
        </div>

        {playbooks.map((section) => (
          <div key={section.category}>
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${section.color}`}>
                {section.category}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.guides.map((guide) => (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="border border-slate-200 rounded-xl bg-white p-6 hover:shadow-md transition-shadow group"
                >
                  <div className={`w-1 h-8 rounded-full ${section.accent} mb-4`} />
                  <h3 className="font-semibold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{guide.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{guide.time}</span>
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom download CTA */}
        <div className="bg-navy-900 rounded-2xl p-8 sm:p-10">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Get the full playbook as a PDF</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Download everything above in one shareable document — useful for campaign kick-off meetings, volunteer training, or keeping on your phone.
            </p>
            <DownloadForm />
          </div>
        </div>

        {/* Coach CTA */}
        <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Want to apply this to your specific race?
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your Campaign Coach can take any playbook and translate it into a concrete plan based on your timeline, budget, and situation.
            </p>
          </div>
          <Link
            href="/advisor"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Talk to your Coach <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  )
}
