'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    const { error } = await signIn(email.trim())
    setLoading(false)
    if (error) setError(error)
    else setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">📬</div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Check your email</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We sent a sign-in link to{' '}
              <span className="font-semibold text-slate-700">{email}</span>.
              Click it to sign in — no password needed.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Sign in to Run to Win</h2>
            <p className="text-sm text-slate-500 mb-5">
              Save conversations with your Campaign Coach and bookmark resources for later.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoFocus
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {loading ? 'Sending…' : 'Send sign-in link'}
              </button>
            </form>
            <p className="text-[11px] text-slate-400 text-center mt-4">
              No password required. We'll email you a magic link.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
