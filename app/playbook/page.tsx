import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'

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

export default function PlaybookPage() {
  return (
    <>
      <div className="bg-navy-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Playbook</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            In-depth guides for every phase of your campaign — written for candidates who are running lean and need to know what actually works.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
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
