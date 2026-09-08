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
    statement:
      'To become the growth partner businesses call before they become market leaders.',
    body: 'Our vision is to help ambitious organisations navigate complexity with sharper strategy, stronger creative thinking and smarter technology, building businesses that don’t merely compete for attention, but earn enduring market relevance.',
  },
  {
    id: 'mission',
    label: 'Mission',
    statement: 'To make marketing more accountable, intelligent and useful to business.',
    body: 'We exist to replace guesswork with insight, disconnected activity with integrated strategy and vanity metrics with commercially meaningful outcomes.',
  },
] as const;

export const story: ProseBlock = {
  id: 'story',
  lead: 'We started with a question.',
  paragraphs: [
    'Why is so much marketing so busy, and so little of it actually connected to growth?',
    'That question turned into a way of working: start with the business, build systems rather than campaigns, keep the evidence in charge and make the whole thing explainable to the people paying for it.',
  ],
};

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
