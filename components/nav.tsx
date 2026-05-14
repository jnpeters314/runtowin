'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import AuthModal from '@/components/auth-modal'

const links = [
  { href: '/advisor', label: 'Campaign Coach' },
  { href: '/playbook', label: 'Playbook' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const { user, loading, signOut } = useAuth()

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy-900 border-b border-navy-800">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-white text-lg leading-none">
              <span className="font-black tracking-widest uppercase">RUN</span>
              <span className="font-normal tracking-wide lowercase"> to </span>
              <span className="font-black tracking-widest uppercase">WIN</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-navy-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800'
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/advisor"
              className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
            >
              Talk to your Coach
            </Link>

            {!loading && (
              user ? (
                <div className="ml-3 flex items-center gap-2">
                  <span className="text-xs text-slate-400 max-w-30 truncate">{user.email}</span>
                  <button
                    onClick={signOut}
                    title="Sign out"
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="ml-3 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
              )
            )}
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden bg-navy-900 border-t border-navy-800 px-4 pb-4 space-y-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm text-slate-300 hover:text-white rounded-md hover:bg-navy-800"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/advisor"
              onClick={() => setOpen(false)}
              className="block mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md text-center"
            >
              Talk to your Coach
            </Link>
            {!loading && (
              user ? (
                <div className="pt-2 border-t border-navy-800 mt-2">
                  <p className="px-3 py-1 text-xs text-slate-400 truncate">{user.email}</p>
                  <button
                    onClick={() => { signOut(); setOpen(false) }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setShowAuth(true); setOpen(false) }}
                  className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white"
                >
                  Sign In
                </button>
              )
            )}
          </div>
        )}
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
