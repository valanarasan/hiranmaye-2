import type { OfficeLocation, OpeningHours } from '@/types/content';

export const contactHero = {
  eyebrow: 'Contact',
  headline: "Let's find out the potential of your business.",
  lead: "Tell us where your business is today. Tell us where you want it to go. We'll bring the questions, the perspective and the strategy.",
} as const;

export const challengeOptions = [
  'Not enough leads',
  'Weak brand presence',
  'Poor website conversion',
  'High ad costs',
  'No clear strategy',
  'Something else',
] as const;

export const contactAssurances = [
  'A reply within one working day.',
  'A conversation about the business, not a pitch about channels.',
  'No obligation, no lock-in, no jargon.',
] as const;

/**
 * Coordinates are the exact pin from the studio's Google Maps listing, so the
 * embed and the directions link both land on the door rather than on a
 * geocoded guess at the street.
 */
export const office: OfficeLocation = {
  name: 'Hiranmaye Digital',
  street: '1053, 30th Main Road',
  landmark: 'Near Sri Hari Kalyana Mantapa',
  locality: 'Siddanna Layout, Banashankari 2nd Stage, Banashankari',
  city: 'Bengaluru',
  state: 'Karnataka',
  postcode: '560070',
  country: 'India',
  latitude: 12.9287471,
  longitude: 77.5625986,
  mapsUrl: 'https://maps.app.goo.gl/9Rc3dKfoq2m8jQLC8',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=12.9287471%2C77.5625986',
  embedUrl:
    'https://maps.google.com/maps?q=12.9287471,77.5625986&z=16&hl=en&output=embed',
  consultation: 'By appointment',
};

export const officeSection = {
  eyebrow: 'Visit our office',
  headline: 'Our Bengaluru studio.',
  lead: 'South Bengaluru, Banashankari 2nd Stage, a minute from Sri Hari Kalyana Mantapa. Come by — but call first, we work by appointment.',
} as const;

/** Minutes from midnight, India Standard Time. */
export const openingHours: readonly OpeningHours[] = [
  {
    id: 'weekdays',
    label: 'Monday – Friday',
    days: [1, 2, 3, 4, 5],
    opens: 9 * 60 + 30,
    closes: 18 * 60 + 30,
    display: '9:30 – 18:30',
  },
  {
    id: 'saturday',
    label: 'Saturday',
    days: [6],
    opens: 10 * 60,
    closes: 17 * 60,
    display: '10:00 – 17:00',
  },
  { id: 'sunday', label: 'Sunday', days: [0], display: 'Closed' },
];

export const socialSection = {
  eyebrow: 'Elsewhere',
  headline: 'Five channels, five different jobs.',
  lead: 'Case studies, growth breakdowns, B2B playbooks and video tutorials — each on the channel that suits it. Pick the one that fits your question.',
} as const;
