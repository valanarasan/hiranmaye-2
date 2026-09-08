import type {
  HeroContent,
  Pillar,
  ProcessStep,
  ProseBlock,
  TrustContent,
} from '@/types/content';

export const hero: HeroContent = {
  eyebrow: 'Strategy × Creativity × Technology',
  headline: "Marketing that doesn't just create noise. It creates momentum.",
  subcopy:
    'HIRANMAYE DIGITAL helps ambitious businesses turn fragmented marketing into a cohesive growth engine. We combine strategic intelligence, creative firepower, AI-enabled systems and performance marketing to build brands that are easier to discover, harder to ignore and engineered to grow.',
  primaryCta: { label: "Let's talk growth", to: '/contact' },
  secondaryCta: { label: 'Explore our capabilities', to: '/services' },
  promptLabel: "What's holding your growth back?",
  painPoints: [
    { id: 'leads', label: 'Not enough leads', to: '/services#performance' },
    { id: 'brand', label: 'Weak brand presence', to: '/services#branding' },
    { id: 'conversion', label: 'Poor website conversion', to: '/services#website' },
    { id: 'adcost', label: 'High ad costs', to: '/services#ads' },
    { id: 'strategy', label: 'No clear strategy', to: '/services#strategy' },
  ],
};

export const trust: TrustContent = {
  headline: 'Built for businesses at every stage of ambition.',
  stages: ['Startups', 'Scale-ups', 'SMEs', 'Enterprises'],
  industries: [
    'Manufacturing',
    'Real Estate',
    'Healthcare',
    'Education',
    'Professional Services',
    'Retail',
    'Hospitality',
  ],
};

export const whoWeAre: ProseBlock = {
  id: 'who-we-are',
  lead: "Most businesses don't have a marketing problem. They have a fragmentation problem.",
  paragraphs: [
    'Their website says one thing. Their advertising says another. Their social media is active but directionless. Their campaigns generate numbers, but nobody can confidently explain what those numbers mean for the business.',
    'HIRANMAYE DIGITAL exists to bring the pieces together.',
    'We connect business objectives with brand strategy, digital infrastructure, creative communication, paid media, search visibility and intelligent automation, so marketing stops functioning as a series of isolated activities and starts operating as a coordinated growth system.',
    'Because impressions are not growth. Followers are not growth. Traffic is not growth.',
  ],
};

export const whoWeAreCloser = 'What matters is what moves the business forward; that is growth.';

export const pillars: readonly Pillar[] = [
  {
    id: 'found',
    label: 'Get Found',
    promise: 'Be discoverable where the decision starts.',
    capabilities: ['SEO', 'AEO', 'GEO', 'Content Strategy'],
    to: '/services#search',
  },
  {
    id: 'noticed',
    label: 'Get Noticed',
    promise: 'Be distinct in a market that all looks the same.',
    capabilities: ['Branding', 'Creative Design', 'Social Media', 'Outdoor Branding'],
    to: '/services#branding',
  },
  {
    id: 'chosen',
    label: 'Get Chosen',
    promise: 'Turn interest into commercial intent.',
    capabilities: ['Website Experience', 'Conversion Strategy', 'Content'],
    to: '/services#website',
  },
  {
    id: 'results',
    label: 'Get Results',
    promise: 'Make every rupee accountable.',
    capabilities: ['Meta Ads', 'Google Ads', 'Performance Marketing'],
    to: '/services#performance',
  },
  {
    id: 'smarter',
    label: 'Get Smarter',
    promise: 'Compound what works with intelligence.',
    capabilities: ['AI Marketing', 'Automation', 'Business Consulting'],
    to: '/services#ai',
  },
];

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'diagnose',
    index: '01',
    title: 'Diagnose',
    headline: 'We interrogate the business before we recommend the solution.',
    body: 'We examine your objectives, audience behaviour, market dynamics, competitive environment and existing digital ecosystem.',
  },
  {
    id: 'architect',
    index: '02',
    title: 'Architect',
    headline: 'We turn insight into a commercially intelligent strategy.',
    body: 'Clear priorities. Clear positioning. Clear channels. Clear KPIs.',
  },
  {
    id: 'activate',
    index: '03',
    title: 'Activate',
    headline: 'Strategy leaves the presentation deck and enters the market.',
    body: 'Campaigns, content, websites, advertising, automation and creative execution — activated with purpose.',
  },
  {
    id: 'optimise',
    index: '04',
    title: 'Optimise',
    headline: "We don't fall in love with ideas. We follow the evidence.",
    body: 'We monitor performance, identify friction and continuously improve what matters.',
  },
  {
    id: 'compound',
    index: '05',
    title: 'Compound',
    headline: "What works gets stronger. What doesn't gets smarter.",
    body: 'Successful systems are scaled to create momentum that compounds over time.',
  },
];
