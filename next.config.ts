import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages — output as edge-compatible Workers
  // All routes default to the edge runtime via @cloudflare/next-on-pages
}

export default nextConfig
