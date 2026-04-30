import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { blogPosts, getBlogPost, type ContentBlock } from '@/lib/content/blog'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3">{block.text}</h2>
    case 'h3':
      return <h3 key={i} className="text-base font-semibold text-slate-800 mt-5 mb-2">{block.text}</h3>
    case 'p':
      return <p key={i} className="text-slate-600 leading-relaxed mb-4">{block.text}</p>
    case 'ul':
      return (
        <ul key={i} className="list-disc list-outside pl-5 mb-4 space-y-1.5">
          {block.items.map((item, j) => (
            <li key={j} className="text-slate-600 leading-relaxed">{item}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={i} className="list-decimal list-outside pl-5 mb-4 space-y-1.5">
          {block.items.map((item, j) => (
            <li key={j} className="text-slate-600 leading-relaxed">{item}</li>
          ))}
        </ol>
      )
    case 'tip':
      return (
        <div key={i} className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{block.label}</span>
          <p className="text-sm text-blue-800 mt-1 leading-relaxed">{block.text}</p>
        </div>
      )
  }
}

const categoryColors: Record<string, string> = {
  'Getting Started': 'bg-blue-50 text-blue-700',
  Strategy: 'bg-purple-50 text-purple-700',
  Fundraising: 'bg-green-50 text-green-700',
  Digital: 'bg-orange-50 text-orange-700',
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <>
      <div className="bg-navy-900 text-white py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-700'}`}>
              {post.category}
            </span>
            <span className="text-xs text-slate-400">{post.date}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-snug">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-lg text-slate-500 leading-relaxed mb-8 pb-8 border-b border-slate-200">{post.desc}</p>
        <div>
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 bg-slate-50 rounded-2xl p-6 sm:p-8">
          <h3 className="font-bold text-slate-900 mb-2">Want to apply this to your race?</h3>
          <p className="text-sm text-slate-500 mb-4">Your Campaign Coach can turn any of these ideas into a specific plan for your timeline, budget, and situation.</p>
          <Link
            href="/advisor"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Talk to your Coach
          </Link>
        </div>
      </div>
    </>
  )
}
