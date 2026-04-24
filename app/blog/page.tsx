import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import WaitlistForm from '@/components/waitlist-form'

const posts = [
  {
    date: 'April 14, 2026',
    category: 'Fundraising',
    title: 'Why Your Fundraising Stalled (And How to Restart It)',
    desc: 'The most common reason campaigns plateau is simpler than you think: the candidate stopped asking. Here\'s the diagnosis and the fix.',
    slug: '#',
  },
  {
    date: 'April 7, 2026',
    category: 'Strategy',
    title: 'The 30-Day Campaign: How to Run an Effective Last-Minute Race',
    desc: 'Not every campaign has a full year. If you\'re entering late, here\'s how to compress a full campaign into 30 days without burning out.',
    slug: '#',
  },
  {
    date: 'March 31, 2026',
    category: 'Digital',
    title: 'What Actually Works on Social Media for Local Campaigns',
    desc: 'Personal stories outperform policy posts 3-to-1. Here\'s what the data says about what down-ballot candidates should be posting.',
    slug: '#',
  },
  {
    date: 'March 24, 2026',
    category: 'Voter Contact',
    title: 'Door Knocking in 2026: What\'s Changed and What Hasn\'t',
    desc: 'Voters are more skeptical, schedules are harder to predict, and digital follow-up matters more than ever. Our updated field guide.',
    slug: '#',
  },
  {
    date: 'March 17, 2026',
    category: 'AI & Campaigns',
    title: 'How AI is Changing Campaign Coaching for Down-Ballot Races',
    desc: 'Big campaigns have had access to senior strategists for decades. AI is finally democratizing that access — here\'s what it means for local races.',
    slug: '#',
  },
  {
    date: 'March 10, 2026',
    category: 'Fundraising',
    title: 'End-of-Quarter Fundraising: Why the Last 72 Hours Matter Most',
    desc: 'FEC deadlines create genuine urgency. Here\'s how to use that urgency without burning your list.',
    slug: '#',
  },
]

const categoryColors: Record<string, string> = {
  Fundraising: 'bg-blue-50 text-blue-700',
  Strategy: 'bg-purple-50 text-purple-700',
  Digital: 'bg-green-50 text-green-700',
  'Voter Contact': 'bg-orange-50 text-orange-700',
  'AI & Campaigns': 'bg-slate-100 text-slate-700',
}

export default function BlogPage() {
  return (
    <>
      <div className="bg-navy-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Blog</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Field-tested insights for down-ballot candidates and campaign managers.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.slug}
              className="border border-slate-200 rounded-xl bg-white p-6 hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-700'}`}>
                  {post.category}
                </span>
                <span className="text-xs text-slate-400">{post.date}</span>
              </div>
              <h2 className="font-semibold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{post.desc}</p>
              <span className="text-sm font-semibold text-blue-600 inline-flex items-center gap-1">
                Read more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-navy-900 rounded-2xl p-8 sm:p-10 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Get these insights in your inbox</h3>
          <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
            Subscribe to Campaign HQ Dispatch — practical tips and resources for down-ballot campaigns, delivered weekly.
          </p>
          <WaitlistForm source="blog-newsletter" buttonLabel="Subscribe" dark />
        </div>
      </div>
    </>
  )
}
