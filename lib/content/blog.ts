export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'tip'; label: string; text: string }

export type BlogPost = {
  slug: string
  title: string
  date: string
  category: string
  desc: string
  content: ContentBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'thinking-about-running',
    title: 'Thinking About Running for Office? Start Here.',
    date: 'September 17, 2025',
    category: 'Getting Started',
    desc: 'Running for office isn\'t just for insiders or political veterans — it\'s for everyday people who care deeply about their communities.',
    content: [
      { type: 'p', text: 'Running for office isn\'t just for insiders or political veterans — it\'s for everyday people who care deeply about their communities. Whether you\'re fired up about reproductive rights, clean energy, school funding, or justice reform, your voice deserves a platform. And you don\'t have to do it alone.' },
      { type: 'p', text: 'Your reason for running is your campaign\'s superpower.' },
      { type: 'h2', text: 'How do you know if it\'s time to run?' },
      { type: 'p', text: 'Five signs you\'re ready to step forward:' },
      { type: 'ul', items: [
        'You feel frustrated by the status quo and want to fix it — not just talk about it.',
        'Friends or neighbors often come to you for advice or leadership.',
        'You\'re already organizing, volunteering, or speaking up in your community.',
        'You can name a specific issue or cause you\'re passionate about.',
        'You want to be a voice for people who\'ve been left out of decisions.',
      ]},
      { type: 'h2', text: 'Start with Your "Why"' },
      { type: 'p', text: 'Before you design a logo or raise a dollar, you need to answer: Why you? Why now? This core message will become your North Star — from your fundraising emails to your voter conversations.' },
      { type: 'p', text: 'Work through these questions before anything else:' },
      { type: 'ul', items: [
        'Why do I want to run?',
        'What change do I want to create?',
        'Who will benefit most from my leadership?',
        'Who are my potential supporters?',
      ]},
      { type: 'h2', text: 'Pro Tips for First-Time Candidates' },
      { type: 'ul', items: [
        'Stay rooted in your story. Voters connect with authenticity more than polish.',
        'Start small and scale. You don\'t need a national network. You need a strong community foundation.',
        'Surround yourself with believers. Build your team from people who believe in you first — then in the mission.',
        'Own your lived experience. Don\'t hide what makes you different. That\'s what makes you relatable.',
      ]},
    ],
  },
  {
    slug: 'choosing-the-right-office',
    title: 'Choosing the Right Office for Your First Campaign',
    date: 'September 17, 2025',
    category: 'Strategy',
    desc: 'If you\'re fired up and ready to run — the next question is: run for what? Choosing the right office is one of the most strategic decisions you\'ll make.',
    content: [
      { type: 'p', text: 'If you\'re fired up and ready to run — the next question is: run for what? Choosing the right office is one of the most strategic decisions you\'ll make as a first-time candidate. It\'s not just about what\'s open or available. It\'s about matching your lived experience, your community roots, and your passion with the seat where you can make the greatest impact.' },
      { type: 'p', text: 'There\'s no such thing as a "small" race — only the right race for you.' },
      { type: 'h2', text: 'Factors to Consider When Choosing an Office' },
      { type: 'h3', text: '1. Community Impact' },
      { type: 'p', text: 'Where can you make the biggest difference in people\'s lives? School boards shape education. City councils decide on housing, safety, and local budgets. The closer the seat is to the people, the more immediate the impact.' },
      { type: 'h3', text: '2. Your Experience and Connections' },
      { type: 'p', text: 'You don\'t need to be a policy expert — but you do need credibility in your community. If you\'re already organizing or volunteering, you\'re building trust that can carry into elected leadership.' },
      { type: 'h3', text: '3. The Political Landscape' },
      { type: 'p', text: 'What\'s the district\'s voting history? How active are voters? Are there open seats or vulnerable incumbents? These factors determine your path to viability.' },
      { type: 'h3', text: '4. The Scope of the Role' },
      { type: 'p', text: 'Consider what the position actually controls. Some titles sound powerful but have limited influence. Others may fly under the radar but drive critical decisions — like utility boards, planning commissions, and school boards.' },
      { type: 'h2', text: 'Questions to Ask Before You Decide' },
      { type: 'ul', items: [
        'What offices are on the ballot in my area this cycle?',
        'What\'s the voter turnout history for this seat?',
        'Is this an open seat or an incumbent race?',
        'Do I meet the residency and eligibility requirements?',
        'What are the filing deadlines and signature requirements?',
        'Can I commit to the time demands of this role if I win?',
      ]},
      { type: 'h2', text: 'Pro Tips from Campaign Veterans' },
      { type: 'ul', items: [
        'Choose a role that aligns with your passion. If you\'re focused on environmental justice, a local board seat might move the needle more than a legislative one.',
        'Don\'t overlook smaller seats. They\'re often winnable, powerful, and build your bench for future races.',
        'Check timing and term length. Do you have the capacity to serve right now? Do you understand what the next 2–4 years will demand of you?',
        'Research before you commit. Talk to people who\'ve held the seat and community members who\'ll be affected.',
      ]},
    ],
  },
  {
    slug: 'building-your-campaign-plan',
    title: 'Building Your Campaign Plan: Your Roadmap to Winning',
    date: 'September 17, 2025',
    category: 'Strategy',
    desc: 'A good campaign doesn\'t happen by accident. It\'s built with a plan. Here\'s what every campaign plan needs.',
    content: [
      { type: 'p', text: 'A good campaign doesn\'t happen by accident. It\'s built with a plan. If you\'ve decided to run and chosen your office — the next step is to map out how you\'ll win. Your plan doesn\'t need to be fancy, but it does need to be clear, realistic, and rooted in your strengths.' },
      { type: 'h2', text: 'What Every Campaign Plan Needs' },
      { type: 'h3', text: 'Mission & Goals' },
      { type: 'ul', items: [
        'Why are you running?',
        'What are your top three priorities?',
        'What does success look like beyond just winning?',
      ]},
      { type: 'h3', text: 'Campaign Timeline' },
      { type: 'ul', items: [
        'When will you launch?',
        'When are your filing deadlines?',
        'When will you do outreach, host events, or ramp up Get Out the Vote?',
      ]},
      { type: 'h3', text: 'Fundraising Strategy' },
      { type: 'ul', items: [
        'How much money do you need to raise?',
        'What are your biggest expense categories?',
        'Who are your early donors?',
      ]},
      { type: 'h3', text: 'Communications & Branding' },
      { type: 'ul', items: [
        'What\'s your message?',
        'What\'s your story?',
        'How will you consistently share your values across email, social, and in-person events?',
      ]},
      { type: 'h2', text: 'Pro Tips for New Candidates' },
      { type: 'ul', items: [
        'Work backwards from Election Day. Start from when voting begins and build your timeline in reverse.',
        'Don\'t overcomplicate the plan. Focus on key goals: raise money, talk to voters, and stay on message.',
        'Revisit your plan every month. Update your strategy based on what\'s working and what needs improvement.',
        'Assign ownership. Every piece of your plan should have someone responsible — even if that person is you.',
        'Include a plan for self-care and rest. Burnout loses campaigns.',
      ]},
      { type: 'h2', text: 'Build Your Timeline in Reverse' },
      { type: 'p', text: 'Start from Election Day and work backwards. Block out: GOTV (final 2 weeks), persuasion phase (months 2–3 before election), early fundraising and list-building (launch through month 1), and filing deadlines (check your state\'s requirements).' },
      { type: 'p', text: 'Once you have your skeleton timeline, assign weekly goals for voter contacts, fundraising calls, and content. Stick to it — consistency is what separates campaigns that peak too early from ones that close strong.' },
    ],
  },
  {
    slug: 'pro-campaign-tips',
    title: 'Pro Campaign Tips: A Guide for Every Stage',
    date: 'September 17, 2025',
    category: 'Strategy',
    desc: 'Comprehensive guidance across 12 stages of running a political campaign — from deciding to run through election night and beyond.',
    content: [
      { type: 'p', text: 'Running a campaign is one of the hardest things you\'ll ever do. It\'s also one of the most meaningful. Here\'s field-tested advice for every stage — from the moment you decide to run through the days after the polls close.' },
      { type: 'h2', text: '1. Deciding to Run' },
      { type: 'p', text: 'Anchor your campaign in a personal story. People vote for people, not platforms. Don\'t wait to be asked — deciding to run is leadership in action. Start journaling your motivations and values now; they\'ll shape your messaging for the entire campaign.' },
      { type: 'h2', text: '2. Choosing the Right Office' },
      { type: 'p', text: 'Match your passion with positions of genuine influence. Research voter turnout data before committing. A local seat where you have real community ties is often more winnable — and more impactful — than a higher-profile race where you\'re starting from zero.' },
      { type: 'h2', text: '3. Building a Campaign Plan' },
      { type: 'p', text: 'Work backward from Election Day. Include a plan for self-care and rest. Burnout loses campaigns. Your plan is a living document — review it monthly and adjust based on what\'s working.' },
      { type: 'h2', text: '4. Filing, Legal, and Compliance Basics' },
      { type: 'p', text: 'Create a dedicated campaign bank account immediately. Stay ahead of filing deadlines — missing one can disqualify you or create legal exposure. When in doubt, hire a compliance professional even if just for an hour of advice.' },
      { type: 'h2', text: '5. Assembling Your Campaign Team' },
      { type: 'p', text: 'Three essential early roles: campaign manager, fundraiser, and digital lead. Trust outweighs experience — a loyal person who learns fast beats a skeptic with a resume. Define everyone\'s lane clearly from day one.' },
      { type: 'h2', text: '6. Building a Budget and Fundraising Strategy' },
      { type: 'p', text: 'Focus on small-dollar recurring donors early — they\'re your most committed supporters. Practice your fundraising ask until it feels natural. The candidate who is comfortable asking wins more money than the one with the most connections.' },
      { type: 'h2', text: '7. Outreach and Organizing' },
      { type: 'p', text: 'Face-to-face contact is still the most effective way to win votes. Nothing replaces it. Doors, phones, and community events should dominate your calendar in the final 60 days. Build your volunteer base early so you have people to do it with.' },
      { type: 'h2', text: '8. Communications, Branding & Digital Strategy' },
      { type: 'p', text: 'Consistency across platforms matters more than volume. Pick 2–3 platforms and show up consistently. Lead with stories, then policy. Post 3 times per week minimum. Video outperforms static every time.' },
      { type: 'h2', text: '9. Voter Contact at Scale' },
      { type: 'p', text: 'Your voter contact universe should be built from the voter file, not from guesses. Prioritize high-propensity supporters and persuadables. Log every contact — that data shapes your GOTV targeting.' },
      { type: 'h2', text: '10. Get Out The Vote' },
      { type: 'p', text: 'Prioritize voters who need encouragement over guaranteed supporters. Focus GOTV resources on your supporters who have low turnout history — they\'re your biggest source of untapped votes. Lock in volunteers for every shift 2 weeks in advance.' },
      { type: 'h2', text: '11. Election Day Readiness' },
      { type: 'p', text: 'Every volunteer has a list. Every list has a captain. Nightly check-ins during the final week. Real-time turnout monitoring by precinct. Have a legal contact on call. Don\'t wait until problems happen to figure out who to call.' },
      { type: 'h2', text: '12. After the Election' },
      { type: 'p', text: 'Win or lose: thank your supporters personally. Complete your compliance filings. Debrief your team while the details are fresh. What worked? What didn\'t? Who do you want to work with again? The relationships you built are an asset regardless of the outcome.' },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
