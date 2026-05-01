// Extends the global CloudflareEnv interface (from @opennextjs/cloudflare)
// with bindings defined in wrangler.toml that aren't part of the default type.

interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>
}

declare global {
  interface CloudflareEnv {
    RATE_LIMITER?: RateLimiter
  }
}

export {}
