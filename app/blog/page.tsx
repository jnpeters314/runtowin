import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import WaitlistForm from '@/components/waitlist-form'
import { blogPosts } from '@/lib/content/blog'

const categoryColors: Record<string, string> = {
  'Getting Started': 'bg-blue-50 text-blue-700',
  Fundraising: 'bg-green-50 text-green-700',
  Strategy: 'bg-purple-50 text-purple-700',
  Digital: 'bg-orange-50 text-orange-700',
  'Voter Contact': 'bg-teal-50 text-teal-700',
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
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
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
            Subscribe to the Run to Win Dispatch — practical tips and resources for down-ballot campaigns, delivered weekly.
          </p>
          <WaitlistForm source="blog-newsletter" buttonLabel="Subscribe" dark />
        </div>
      </div>
    </>
  )
}
