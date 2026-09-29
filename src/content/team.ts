import type { TeamMember } from '@/types/content';

export const teamSection = {
  eyebrow: 'Our team',
  headline: 'The people behind the work.',
  lead: 'A small team that answers to the business, not to the channel.',
} as const;

export const team: readonly TeamMember[] = [
  {
    id: 'vijayalakshmi-girish',
    name: 'Vijayalakshmi Girish',
    role: 'Founder Director',
    meta: 'Managing Director, Gavin Technologies · Founder, Hiranmaye E-Mart',
    paragraphs: [
      'Vijayalakshmi leads strategy, planning, finance and sales at Hiranmaye Digital. She brings 17 years in the IT industry and is Managing Director of Gavin Technologies Pvt Ltd, where she oversees operations, finance and people.',
      'Five years ago, alongside her IT company, she launched Hiranmaye E-Mart, a clothing store that began during the pandemic and continues to operate today. Running it taught her what it takes to grow a business through efficient operations, careful inventory management and personalised customer service.',
      'A graduate of Bangalore University, she has handled the accounts of both companies. That financial discipline shapes how Hiranmaye Digital works: every rupee of marketing spend should have a reason and a return.',
    ],
  },
  {
    id: 'praveena-pradeep',
    name: 'Praveena Pradeep',
    role: 'Digital Marketing',
    paragraphs: [
      'Praveena works closely with businesses to build their brands and strengthen their presence in the digital space. Her work spans digital marketing strategy, social media, content, branding and campaign planning, with a strong focus on understanding what each business actually needs to grow.',
      'She believes good marketing starts with understanding the business, its customers and its goals before deciding what to communicate and where. Her work ranges from social media strategies and content plans to brand communication and digital campaigns.',
      'Her approach is straightforward: create marketing that feels genuine, communicates clearly and serves a purpose. Success is not just how a brand looks online, but how effectively its marketing helps the business move forward.',
    ],
  },
  {
    id: 'abhishek-mishra',
    name: 'Abhishek Mishra',
    role: 'Board member',
    meta: 'HR and Talent leadership',
    paragraphs: [
      'Abhishek is a senior HR and Talent leader with nearly 21 years of experience across talent management, leadership development, HR business partnering, consulting, executive coaching and organisational change.',
      'He works closely with leadership teams as an advisor, mentor, sounding board and problem-solving partner, helping them navigate complex people, talent and organisational challenges with greater clarity.',
      'His experience spans talent and leadership strategy, culture and change, capability building, organisational transitions and the people dimensions of business growth, including Global Capability Centres.',
    ],
  },
];
