import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'

const playbooks = [
  {
    category: 'Fundraising',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    accent: 'bg-blue-600',
    guides: [
      {
        title: 'The First 30 Days of Fundraising',
        desc: 'How to build your initial donor base from your personal network before you ask strangers for money.',
        time: '12 min read',
      },
      {
        title: 'Call Time That Actually Works',
        desc: 'The system, the script, and the mindset for making fundraising calls without dreading it.',
        time: '10 min read',
      },
      {
        title: 'End-of-Quarter Fundraising Pushes',
        desc: 'How to use FEC deadlines as a reason to ask — and why they work better than most campaigns realize.',
        time: '8 min read',
      },
      {
        title: 'Small-Dollar Online Fundraising',
        desc: 'Email sequences, social posts, and recurring donor programs that build a sustainable base.',
        time: '15 min read',
      },
    ],
  },
  {
    category: 'Voter Contact',
    color: 'bg-green-50 text-green-700 border-green-200',
    accent: 'bg-green-600',
    guides: [
      {
        title: 'Door Knocking: A Practical Field Guide',
        desc: 'What to say, what to bring, how to handle objections, and how to track your results.',
        time: '14 min read',
      },
      {
        title: 'Phone Banking for Local Campaigns',
        desc: 'How to run a phone bank with volunteers, and what separates effective calls from annoying ones.',
        time: '10 min read',
      },
      {
        title: 'Voter ID and Targeting on a Small Budget',
        desc: 'How to find your likely supporters without expensive data vendors.',
        time: '9 min read',
      },
    ],
  },
  {
    category: 'Digital Strategy',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    accent: 'bg-purple-600',
    guides: [
      {
        title: 'Social Media for Down-Ballot Campaigns',
        desc: 'What platforms to prioritize, how often to post, and what content actually moves the needle.',
        time: '11 min read',
      },
      {
        title: 'Email List Building from Scratch',
        desc: 'How to grow a list of engaged supporters who will open and act on your messages.',
        time: '8 min read',
      },
      {
        title: 'Digital Ads on a Shoestring Budget',
        desc: 'When to spend on paid digital, what to run, and how to measure if it\'s working.',
        time: '12 min read',
      },
    ],
  },
  {
    category: 'GOTV',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    accent: 'bg-orange-600',
    guides: [
      {
        title: 'Building Your GOTV Plan',
        desc: 'How to map your turnout operation 60 days out so you\'re not scrambling in the final week.',
        time: '16 min read',
      },
      {
        title: 'The Final 7 Days',
        desc: 'A day-by-day plan for the closing stretch: voter contact, messaging, volunteer coordination.',
        time: '10 min read',
      },
      {
        title: 'Election Day Operations',
        desc: 'Poll monitoring, voter rides, and keeping your team coordinated when it matters most.',
        time: '9 min read',
      },
    ],
  },
]

export default function PlaybookPage() {
  return (
    <>
      <div className="bg-navy-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Playbook</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            In-depth guides for every phase of your campaign — written for candidates who are running lean and need to know what actually works.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        {playbooks.map((section) => (
          <div key={section.category}>
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${section.color}`}>
                {section.category}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.guides.map((guide) => (
                <div
                  key={guide.title}
                  className="border border-slate-200 rounded-xl bg-white p-6 hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className={`w-1 h-8 rounded-full ${section.accent} mb-4`} />
                  <h3 className="font-semibold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{guide.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{guide.time}</span>
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Coach CTA */}
        <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Want to apply this to your specific race?
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your Campaign Coach can take any playbook and translate it into a concrete plan based on your timeline, budget, and situation.
            </p>
          </div>
          <Link
            href="/advisor"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Talk to your Coach <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  )
}
