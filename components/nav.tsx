'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/advisor', label: 'Campaign Coach' },
  { href: '/playbook', label: 'Playbook' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
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
        </div>
      )}
    </header>
  )
}
