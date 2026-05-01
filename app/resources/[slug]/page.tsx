import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckSquare } from 'lucide-react'
import { resources, getResource, type ContentBlock } from '@/lib/content/resources'

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) return {}
  return {
    title: resource.title,
    description: resource.subtitle,
    openGraph: { title: resource.title, description: resource.subtitle },
    twitter: { title: resource.title, description: resource.subtitle },
  }
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
    case 'checklist':
      return (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">{block.title}</p>
          <ul className="space-y-2">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckSquare size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'metrics':
      return (
        <div key={i} className="grid sm:grid-cols-2 gap-3 mb-6">
          {block.items.map((item, j) => (
            <div key={j} className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">{item.label}</p>
              <p className="font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      )
  }
}

const categoryColors: Record<string, string> = {
  Toolkit: 'bg-blue-50 text-blue-700',
  Guide: 'bg-purple-50 text-purple-700',
  Template: 'bg-green-50 text-green-700',
  Checklist: 'bg-orange-50 text-orange-700',
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) notFound()

  return (
    <>
      <div className="bg-navy-900 text-white py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/resources" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to resources
          </Link>
          <div className="mb-4">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[resource.category] ?? 'bg-slate-100 text-slate-700'}`}>
              {resource.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-snug">{resource.title}</h1>
          <p className="text-slate-300 leading-relaxed">{resource.subtitle}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div>
          {resource.content.map((block, i) => renderBlock(block, i))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 bg-navy-900 rounded-2xl p-6 sm:p-8">
          <h3 className="font-bold text-white mb-2">Need something tailored to your race?</h3>
          <p className="text-sm text-slate-300 mb-4">Your Campaign Coach can adapt any of these frameworks to your specific district, timeline, and budget.</p>
          <Link
            href="/advisor"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Ask your Coach
          </Link>
        </div>
      </div>
    </>
  )
}
