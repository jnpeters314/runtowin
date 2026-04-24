'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WaitlistFormProps {
  source: string
  placeholder?: string
  buttonLabel?: string
  dark?: boolean
}

export default function WaitlistForm({
  source,
  placeholder = 'your@email.com',
  buttonLabel = 'Get early access',
  dark = false,
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    })

    setStatus(res.ok ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-500">
        <CheckCircle size={16} />
        You&apos;re on the list — we&apos;ll be in touch.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className={cn(
          'flex-1 px-4 py-2.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600',
          dark
            ? 'bg-navy-800 border border-navy-700 text-white placeholder:text-slate-500'
            : 'bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400'
        )}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        {status === 'loading' ? 'Saving...' : buttonLabel}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-400 mt-1 text-center">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
