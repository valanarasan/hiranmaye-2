import type { Post } from '@/types/content';

export const insightsHero = {
  eyebrow: 'The Growth Intelligence Room',
  headline: 'Ideas for businesses that intend to outgrow their competition.',
  lead: 'We decode the shifts changing how customers discover, evaluate and choose brands — from AI search and advertising economics to branding, conversion and digital strategy.',
} as const;

export const categories = [
  'All',
  'AI & The Future',
  'Search',
  'Paid Growth',
  'Branding',
  'Websites',
  'Business Strategy',
] as const;

export type Category = (typeof categories)[number];

export const posts: readonly Post[] = [
  {
    id: 'new-search-economy',
    title: 'The New Search Economy: what happens when Google is no longer the only answer?',
    category: 'AI & The Future',
    readTime: '8 minutes',
    excerpt:
      'Answer engines and generative assistants are quietly rewriting the discovery layer. Here is what changes for businesses that still treat search as ten blue links.',
    featured: true,
  },
  {
    id: 'orange-economy',
    title: 'The Orange Economy: how to create content that prevents doomscrolls',
    category: 'Branding',
    readTime: '6 minutes',
    excerpt:
      'Attention is not won by volume. It is won by the first two seconds — and by a reason to stay that survives the thumb.',
  },
  {
    id: 'ad-cost-inflation',
    title: 'Why your ad costs keep rising and your returns keep falling',
    category: 'Paid Growth',
    readTime: '7 minutes',
    excerpt:
      'Auction inflation is real, but it is rarely the whole story. Most accounts are paying a premium for problems that sit outside the ad platform.',
  },
  {
    id: 'website-conversion',
    title: 'Your website is not underperforming. It is under-briefed.',
    category: 'Websites',
    readTime: '5 minutes',
    excerpt:
      'Conversion is an argument, not a colour. A rebuild that skips the argument only makes the same site faster.',
  },
  {
    id: 'aeo-structure',
    title: 'Structuring content so AI assistants can actually quote you',
    category: 'Search',
    readTime: '9 minutes',
    excerpt:
      'Answer engines reward clarity, entity strength and structure. A practical guide to becoming the response rather than a result.',
  },
  {
    id: 'marketing-board',
    title: 'The marketing report your board would actually read',
    category: 'Business Strategy',
    readTime: '6 minutes',
    excerpt:
      'Impressions, reach and engagement rate answer questions nobody in the room asked. Here is what to put in their place.',
  },
];

export const newsletter = {
  headline: 'One useful email. No digital marketing nonsense.',
  body: 'A curated briefing on what’s changing, what’s working and what your business should probably be paying attention to.',
  cta: 'Subscribe',
} as const;
