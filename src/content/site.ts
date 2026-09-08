import type { CtaLink, NavItem } from '@/types/content';

export const site = {
  name: 'HIRANMAYE DIGITAL',
  shortName: 'Hiranmaye',
  tagline: 'Strategy × Creativity × Technology',
  email: 'hello@hiranmayedigital.com',
  phone: '+91 00000 00000',
  location: 'India',
} as const;

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const headerCta: CtaLink = { label: "Let's talk growth", to: '/contact' };

export const footerColumns = [
  {
    id: 'capabilities',
    title: 'Capabilities',
    links: [
      { label: 'Digital Marketing Strategy', to: '/services#strategy' },
      { label: 'SEO • AEO • GEO', to: '/services#search' },
      { label: 'Performance Marketing', to: '/services#performance' },
      { label: 'Branding', to: '/services#branding' },
      { label: 'AI-Powered Marketing', to: '/services#ai' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Why Us', to: '/about#why-us' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
] as const;
