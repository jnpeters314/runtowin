import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const siteUrl = 'https://runtowin.ai'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Run to Win — AI-Powered Campaign Coaching',
    template: '%s | Run to Win',
  },
  description:
    'Launch, raise, and win. AI-powered coaching, playbooks, and resources for down-ballot campaigns.',
  openGraph: {
    type: 'website',
    siteName: 'Run to Win',
    title: 'Run to Win — AI-Powered Campaign Coaching',
    description:
      'Launch, raise, and win. AI-powered coaching, playbooks, and resources for down-ballot campaigns.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Run to Win — AI-Powered Campaign Coaching',
    description:
      'Launch, raise, and win. AI-powered coaching, playbooks, and resources for down-ballot campaigns.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const analyticsToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        {analyticsToken && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: analyticsToken })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
