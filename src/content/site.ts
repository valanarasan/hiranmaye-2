import type { CtaLink, NavItem, SocialChannel } from '@/types/content';

export const site = {
  name: 'HIRANMAYE DIGITAL',
  shortName: 'Hiranmaye',
  tagline: 'Strategy drives growth',
  email: 'hiranmayemarketing@gmail.com',
  phone: '+91 99006 68383',
  /** E.164, for tel: and wa.me links. */
  phoneRaw: '+919900668383',
  domain: 'www.hiranmayedigital.com',
  location: 'Bengaluru, India',
} as const;

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Inside Hiranmaye', to: '/about' },
  { label: 'Solutions', to: '/services' },
  { label: 'Resources & Insights', to: '/insights' },
  { label: "Let's Connect", to: '/contact' },
];

export const headerCta: CtaLink = { label: "Let's talk growth", to: '/contact' };

/**
 * Each channel says what it is actually for, so the reader can pick the one
 * that suits the question they have rather than defaulting to whichever icon
 * they recognise.
 */
export const socialChannels: readonly SocialChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+91 99006 68383',
    purpose: 'Project enquiries, quick audits and real-time answers from the team.',
    tag: 'Fastest reply',
    href: 'https://wa.me/919900668383',
    cta: 'Start a chat',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Hiranmaye Digital',
    purpose: 'B2B growth playbooks, performance benchmarks and industry analysis.',
    tag: 'B2B network',
    href: 'https://www.linkedin.com/company/hiranmayedigital',
    cta: 'Connect',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@hiranmaye_digital',
    purpose: 'Daily growth insights, behind the scenes and campaign breakdowns.',
    tag: 'Visual stories',
    href: 'https://www.instagram.com/hiranmaye_digital',
    cta: 'Follow',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@Hiranmaye_Digital',
    purpose: 'Marketing tutorials, campaign teardowns and video explainers.',
    tag: 'Video guides',
    href: 'https://www.youtube.com/@Hiranmaye_Digital',
    cta: 'Subscribe',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'hiranmayedigital',
    purpose: 'Announcements, notes from the work and digital marketing news.',
    tag: 'Community',
    href: 'https://www.facebook.com/hiranmayedigital',
    cta: 'Follow',
  },
];

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
      { label: 'Inside Hiranmaye', to: '/about' },
      { label: 'Our Team', to: '/about#team' },
      { label: 'Our Clients', to: '/about#clients' },
      { label: 'Resources & Insights', to: '/insights' },
      { label: "Let's Connect", to: '/contact' },
    ],
  },
] as const;
