import type { ProseBlock, ValueProp } from '@/types/content';

export const aboutHero = {
  eyebrow: 'About',
  headline: 'Ambition deserves more than average marketing.',
  paragraphs: [
    'HIRANMAYE DIGITAL was built around a simple conviction: businesses deserve marketing that can be explained in the boardroom, not just celebrated in a monthly report.',
    'We work at the intersection of commercial strategy, creative thinking, emerging technology and measurable performance to help businesses build visibility, credibility and momentum in an increasingly complex digital economy.',
  ],
} as const;

export const thinking: ProseBlock = {
  id: 'thinking',
  lead: "The Internet is no longer the marketplace. It's the infrastructure.",
  paragraphs: [
    'Your customers discover brands through search engines, social platforms, AI assistants, websites, recommendations and advertising ecosystems.',
    'That means marketing can no longer operate in silos.',
    'We believe the businesses that win are not necessarily the ones that shout the loudest. They are the ones that build coherent ecosystems — where every touchpoint reinforces trust, every campaign produces intelligence and every successful action contributes to the next.',
  ],
};

export const visionMission = [
  {
    id: 'vision',
    label: 'Vision',
    statement: "To scale up our clients' revenue and sales.",
    body: 'We help ambitious organisations navigate complexity with sharper strategy, stronger creative thinking and smarter technology, building businesses that don’t merely compete for attention, but earn enduring market relevance.',
  },
  {
    id: 'mission',
    label: 'Mission',
    statement:
      'To help businesses achieve sustainable revenue and sales growth through strategic digital marketing, creative solutions, technology and measurable performance.',
    body: 'We exist to replace guesswork with insight, disconnected activity with integrated strategy and vanity metrics with commercially meaningful outcomes.',
  },
] as const;

export const story: ProseBlock = {
  id: 'story',
  lead: 'We started with a question: why is so much marketing so busy, and so little of it actually connected to growth?',
  paragraphs: [
    'HIRANMAYE DIGITAL was founded with a simple yet powerful vision: to bridge the gap between marketing activities and real business outcomes.',
    'Many businesses invest heavily in digital marketing without seeing meaningful returns, because they lack a clear strategy. We recognised the need for a more consultative, transparent and results-oriented approach.',
    'From this vision, HIRANMAYE DIGITAL was established as a business growth partner that combines strategic planning, creative execution, advanced analytics, AI-powered marketing and continuous optimisation to deliver measurable success.',
    'Today, we continue to help businesses navigate the ever-changing digital landscape with confidence, clarity and purpose.',
  ],
};

/** Used as a pull quote between sections. */
export const marketingQuote = {
  text: "The best marketing doesn't feel like marketing.",
  attribution: 'Tom Fishburne',
} as const;

export const whyUs: readonly ValueProp[] = [
  {
    id: 'business-first',
    title: 'We start with the business, not the channel',
    body: "We don't begin by asking whether you need Instagram, SEO or Google Ads. We begin by understanding where the business is and where it needs to go.",
  },
  {
    id: 'systems',
    title: 'We think in systems',
    body: 'A campaign can create a spike. A system can create momentum.',
  },
  {
    id: 'evidence',
    title: 'We respect evidence',
    body: 'Opinions are useful. Data is accountable. We use both — but we know which one gets the final vote.',
  },
  {
    id: 'ai',
    title: 'We use AI as leverage, not decoration',
    body: 'AI is not a buzzword in our proposals. It is a practical layer of intelligence, automation and operational efficiency.',
  },
  {
    id: 'clarity',
    title: 'We make complexity understandable',
    body: 'You should never need a translator to understand your marketing report.',
  },
  {
    id: 'long-game',
    title: 'We build for the long game',
    body: 'Quick wins matter. But we are equally interested in what continues working after the campaign ends.',
  },
];
