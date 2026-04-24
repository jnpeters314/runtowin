import { ArrowRight, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    title: 'Email Templates',
    description: 'Copy, personalize, and send. Built for down-ballot campaigns.',
    items: [
      { title: 'Campaign announcement email', desc: 'First email to your personal network. Sets the tone.' },
      { title: 'Fundraising ask — first-time donors', desc: 'A direct ask to people who know you but haven\'t given.' },
      { title: 'End-of-quarter push', desc: 'Urgency-driven ask tied to your FEC filing deadline.' },
      { title: 'Volunteer recruitment email', desc: 'Converts engaged supporters into active volunteers.' },
      { title: 'Donor thank-you — personal', desc: 'Short, genuine, increases likelihood of repeat giving.' },
      { title: 'Event invitation', desc: 'House party or fundraiser invite with RSVP link.' },
    ],
  },
  {
    title: 'Social Media Scripts',
    description: 'Post ideas and copy frameworks for each stage of your campaign.',
    items: [
      { title: 'Why I\'m running — personal version', desc: 'Your origin story. Most-shared type of campaign content.' },
      { title: 'Issue post framework', desc: 'How to weigh in on local news and policy debates.' },
      { title: 'Milestone announcement', desc: '"We just hit 100 donors" — social proof drives more giving.' },
      { title: 'Supporter spotlight', desc: 'Thank a volunteer or donor publicly. Builds community.' },
      { title: 'Event recap', desc: 'Show momentum after a town hall, canvass, or house party.' },
      { title: 'Endorsement announcement', desc: 'How to introduce and amplify a major endorsement.' },
    ],
  },
  {
    title: 'Call Scripts',
    description: 'What to say when you pick up the phone. Short, tested, and direct.',
    items: [
      { title: 'Call time — fundraising ask', desc: 'The 90-second ask for a specific amount. Field-tested.' },
      { title: 'Volunteer recruitment call', desc: 'Warm call to a supporter who hasn\'t volunteered yet.' },
      { title: 'Voter ID call', desc: 'Quick script for identifying likely supporters.' },
      { title: 'GOTV reminder call', desc: 'Final days — confirm they\'re voting and offer a ride.' },
    ],
  },
  {
    title: 'Toolkits',
    description: 'Bundled resources for specific campaign moments.',
    items: [
      { title: 'Announcement Day toolkit', desc: 'Everything you need for your campaign launch: email, social, press release framework.' },
      { title: 'End-of-Quarter toolkit', desc: 'FEC deadline push: email sequence, social posts, and tracking sheet.' },
      { title: 'House Party toolkit', desc: 'Invitation templates, host briefing, and day-of checklist.' },
      { title: 'GOTV Week toolkit', desc: 'Final 7-day plan: voter contact scripts, volunteer coordination, and day-of logistics.' },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <>
      <div className="bg-navy-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Resources</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Templates, scripts, and toolkits built for down-ballot campaigns. Copy, personalize, deploy.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        {categories.map((cat) => (
          <div key={cat.title}>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">{cat.title}</h2>
              <p className="text-slate-500 text-sm mt-1">{cat.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.items.map((item) => (
                <div
                  key={item.title}
                  className="border border-slate-200 rounded-xl p-5 bg-white hover:shadow-md transition-shadow group"
                >
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex items-center gap-3">
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-colors">
                      <Download size={12} /> Get template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Coach CTA */}
        <div className="bg-navy-900 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              Need something more specific?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your Campaign Coach can write custom emails, social posts, and scripts based on your race, your voice, and your specific situation.
            </p>
          </div>
          <Link
            href="/advisor"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Ask your Coach <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  )
}
