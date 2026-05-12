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
        <div style={{
          background: '#ffffff',
          borderBottom: '2px solid #1a4fc4',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '28px',
          fontFamily: "'Libre Franklin', 'Franklin Gothic Medium', Arial, sans-serif",
          fontSize: '11px',
          letterSpacing: '0.08em',
        }}>
          <a href="https://crowdblue.com/feed" style={{
            fontWeight: 800,
            color: '#0d1b3e',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>CrowdBlue</a>
          <a href="https://decidetorun.com/" style={{
            fontWeight: 600,
            color: '#1a4fc4',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>Decide to Run</a>
          <a href="https://runtowin.ai/" style={{
            fontWeight: 600,
            color: '#1a4fc4',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            borderBottom: '1.5px solid #1a4fc4',
            paddingBottom: '1px',
          }}>Run to Win</a>
        </div>
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
