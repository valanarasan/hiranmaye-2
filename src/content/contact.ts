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

export const contactPoints = [
  { id: 'email', label: 'Email', value: 'hello@hiranmayedigital.com', href: 'mailto:hello@hiranmayedigital.com' },
  { id: 'phone', label: 'Phone', value: '+91 00000 00000', href: 'tel:+910000000000' },
  { id: 'hours', label: 'Hours', value: 'Mon – Sat, 10:00 – 19:00 IST' },
] as const;

export const contactAssurances = [
  'A reply within one working day.',
  'A conversation about the business, not a pitch about channels.',
  'No obligation, no lock-in, no jargon.',
] as const;
