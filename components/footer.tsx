import Link from 'next/link'

const columns = [
  {
    heading: 'Platform',
    links: [
      { href: '/advisor', label: 'Campaign Coach' },
      { href: '/playbook', label: 'Playbook' },
      { href: '/resources', label: 'Resources' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    heading: 'Coming Soon',
    links: [
      { href: '#', label: 'Fundraising Director' },
      { href: '#', label: 'Content Director' },
      { href: '#', label: 'GOTV Coordinator' },
      { href: '#', label: 'Voter Contact Agent' },
    ],
  },
  {
    heading: 'CrowdBlue',
    links: [
      { href: 'https://crowdblue.com', label: 'About CrowdBlue' },
      { href: 'https://crowdblue.com', label: 'Start a Campaign' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="text-white font-extrabold text-base mb-2 tracking-widest uppercase">
              Run to <span className="text-blue-400">Win</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered coaching and resources for down-ballot campaigns.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white text-sm font-semibold mb-3">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {new Date().getFullYear()} Run to Win. All rights reserved.</p>
          <p>Built for Democratic campaigns.</p>
        </div>
      </div>
    </footer>
  )
}
