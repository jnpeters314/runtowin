import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/content/blog'
import { resources } from '@/lib/content/resources'

const BASE = 'https://runtowin.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/advisor`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/playbook`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/resources`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/blog`, priority: 0.7, changeFrequency: 'weekly' },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }))

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((r) => ({
    url: `${BASE}/resources/${r.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...blogRoutes, ...resourceRoutes]
}
