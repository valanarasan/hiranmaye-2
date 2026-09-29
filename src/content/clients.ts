import type { Client } from '@/types/content';

export const clientsSection = {
  eyebrow: 'Our clients',
  headline: 'Businesses that trusted us early.',
  lead: 'Across automotive, energy, hospitality, real estate and social impact — different markets, the same growth engine.',
} as const;

/**
 * Logo paths are relative so they resolve against the deploy base: the site is
 * served from /<repo>/ on GitHub Pages and from / on a custom domain.
 */
export const clients: readonly Client[] = [
  {
    id: 'moto-car-spa',
    name: 'Moto Car Spa',
    logo: 'clients/moto-car-spa.webp',
    sector: 'Automotive care',
  },
  {
    id: 'kej',
    name: 'KEJ — Key Emerging Journey',
    logo: 'clients/kej.webp',
    sector: 'Coaching and development',
  },
  {
    id: 'yellow-gold-energy',
    name: 'Yellow Gold Energy',
    logo: 'clients/yellow-gold-energy.webp',
    sector: 'Energy',
  },
  {
    id: 'natures-soul-resort',
    name: "Nature's Soul Resort",
    logo: 'clients/natures-soul-resort.webp',
    sector: 'Hospitality',
  },
  {
    id: 'sael',
    name: 'SAEL',
    logo: 'clients/sael.webp',
    sector: 'Social impact',
  },
  {
    id: 'stern-promoters',
    name: 'Stern Promoters',
    logo: 'clients/stern-promoters.webp',
    sector: 'Real estate',
  },
];

export const partners = ['Jeeva'] as const;
