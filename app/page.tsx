import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, Layers, Mail, MessageSquare, Zap } from 'lucide-react'
import WaitlistForm from '@/components/waitlist-form'

const steps = [
  { n: '01', title: 'Create your campaign page', body: 'Set up your CrowdBlue profile with your race, bio, and photo.' },
  { n: '02', title: 'Set a fundraising goal', body: 'Give donors a target to rally around and a progress bar to watch.' },
  { n: '03', title: 'Tell your story', body: "Write your first post — why you're running, in your own words." },
  { n: '04', title: 'Import your contacts', body: 'Seed your supporter list with people who already know and trust you.' },
  { n: '05', title: 'Make your first ask', body: 'Send a direct fundraising message to your warmest contacts.' },
  { n: '06', title: 'Build a content schedule', body: 'Commit to a posting cadence — 2–3 times per week minimum.' },
  { n: '07', title: 'Launch voter outreach', body: 'Use your playbook to start knocking doors and making calls.' },
  { n: '08', title: 'Grow your volunteer base', body: 'Turn engaged supporters into campaign volunteers.' },
  { n: '09', title: 'Verify compliance', body: 'Confirm your campaign finance filings and disclosure requirements.' },
  { n: '10', title: 'Plan your GOTV push', body: 'Map your turnout operation before the final 30 days.' },
]

const resources = [
  {
    icon: BookOpen,
    title: 'Playbooks',
    body: 'Step-by-step guides for fundraising, voter contact, digital strategy, and GOTV — written for down-ballot campaigns.',
    href: '/playbook',
    cta: 'Browse playbooks',
  },
  {
    icon: FileText,
    title: 'Templates & Scripts',
    body: 'Ready-to-use email drafts, call scripts, social posts, and door-knock scripts. Copy, personalize, deploy.',
    href: '/resources',
    cta: 'Get templates',
  },
  {
    icon: Layers,
    title: 'Toolkits',
    body: 'Bundled resources for specific campaign moments — announcement day, end of quarter, GOTV week, and more.',
    href: '/resources',
    cta: 'View toolkits',
  },
]

const agents = [
  {
    label: 'Live now',
    live: true,
    title: 'Campaign Coach',
    body: 'Ask anything. Strategy, fundraising, messaging, voter contact — your AI coach gives straight answers.',
    href: '/advisor',
    cta: 'Start a conversation',
  },
  {
    label: 'Coming soon',
    live: false,
    title: 'Fundraising Director',
    body: 'Prioritized call sheets every morning. Automated donor thank-yous. Fundraising email sequences that write themselves.',
    href: '#',
    cta: 'Join the waitlist',
  },
  {
    label: 'Coming soon',
    live: false,
    title: 'Content Director',
    body: 'A content calendar that fills itself. Social drafts for every platform. Rapid-response posts when news breaks.',
    href: '#',
    cta: 'Join the waitlist',
  },
  {
    label: 'Coming soon',
    live: false,
    title: 'GOTV Coordinator',
    body: 'Voter contact lists, canvassing schedules, and turnout modeling — automated for your final 30 days.',
    href: '#',
    cta: 'Join the waitlist',
  },
]

const exampleQuestions = [
  '"Write me a fundraising email for end of quarter."',
  '"I haven\'t posted in two weeks. What should I say?"',
  '"My opponent just attacked me. How do I respond?"',
  '"We\'re 30 days out. What should I focus on every day?"',
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-navy-800 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
              <Zap size={12} />
              AI-powered campaign coaching
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Launch, raise, and win —{' '}
              <span className="text-blue-400">with an AI coach in your corner.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Campaign HQ gives down-ballot campaigns the playbooks, templates, and AI coaching that big-budget races take for granted. No campaign manager required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/advisor"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
              >
                Talk to your Campaign Coach <ArrowRight size={16} />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-800 hover:bg-navy-700 text-white font-semibold rounded-md transition-colors"
              >
                Browse resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent Suite */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Your AI campaign staff
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl">
              Specialized AI agents that do the work experienced campaign staff would — at a fraction of the cost.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.title}
                className={`rounded-xl border p-6 flex flex-col bg-white ${
                  agent.live ? 'border-blue-600 shadow-sm' : 'border-slate-200'
                }`}
              >
                <span
                  className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full mb-4 ${
                    agent.live
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {agent.label}
                </span>
                <h3 className="font-semibold text-slate-900 mb-2">{agent.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{agent.body}</p>
                <Link
                  href={agent.href}
                  className={`text-sm font-semibold inline-flex items-center gap-1 transition-colors ${
                    agent.live
                      ? 'text-blue-600 hover:text-blue-800'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {agent.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Coach feature callout */}
      <section className="bg-navy-900 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wide mb-4">
              <MessageSquare size={14} />
              Campaign Coach — Live now
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              A senior strategist in your pocket. Ask it anything.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Fundraising stuck? Not sure how to respond to your opponent? Need a message for tonight&apos;s event? Your Campaign Coach knows down-ballot races and gives you straight, practical advice — not generic tips.
            </p>
            <ul className="space-y-2 mb-8">
              {exampleQuestions.map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                  <span className="italic">{q}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/advisor"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            >
              Start a conversation <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mock chat preview */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-navy-800 rounded-xl p-5 space-y-4 border border-navy-700">
              <div className="flex gap-3 items-end">
                <div className="w-7 h-7 rounded-full bg-slate-500 shrink-0 flex items-center justify-center text-white text-xs font-bold">U</div>
                <div className="bg-navy-700 rounded-lg rounded-bl-none px-4 py-2.5 text-sm text-white max-w-xs">
                  We&apos;re 45 days out and fundraising has stalled. What should I do?
                </div>
              </div>
              <div className="flex gap-3 items-end flex-row-reverse">
                <div className="w-7 h-7 rounded-full bg-blue-600 shrink-0 flex items-center justify-center text-white text-xs font-bold">C</div>
                <div className="bg-blue-950 border border-blue-800 rounded-lg rounded-br-none px-4 py-2.5 text-sm text-slate-200 max-w-xs">
                  45 days is tight but workable. First question: have you actually been asking, or has fundraising just drifted? Most stalls at this stage aren&apos;t about donors — they&apos;re about the candidate stopping the asks.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Everything your campaign needs
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl">
              Practical resources built for down-ballot campaigns that can&apos;t afford a full consulting team.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {resources.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.title} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{r.body}</p>
                  <Link
                    href={r.href}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-colors"
                  >
                    {r.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 10 Steps */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              First 10 steps checklist
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl">
              New to the platform? Start here. This is the sequence that gets your campaign operational and fundable.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {steps.map((step) => (
              <div key={step.n} className="flex gap-4 bg-white rounded-xl border border-slate-200 p-5">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-md w-8 h-8 flex items-center justify-center shrink-0">
                  {step.n}
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Coach waitlist */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-4">
              <Mail size={14} />
              Coming soon
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              &ldquo;Your Campaign This Week&rdquo; — weekly AI coaching in your inbox
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              A personalized coaching email every Monday morning. Your numbers, your race, your week ahead — written by an AI that knows where you are and what you need to do next.
            </p>
            <WaitlistForm source="email-coach" buttonLabel="Get early access" />
          </div>
        </div>
      </section>
    </>
  )
}
