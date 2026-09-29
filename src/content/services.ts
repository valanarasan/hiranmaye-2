import type { Service } from '@/types/content';

export const services: readonly Service[] = [
  {
    id: 'strategy',
    index: '01',
    title: 'Digital Marketing Strategy',
    promise: "Before you spend more, know where you're going.",
    ctaLabel: 'Build your growth blueprint',
    problem: 'Scattered activity. Unclear priorities. Marketing decisions based on instinct.',
    approach:
      'We conduct market intelligence, audience analysis, competitive benchmarking, channel prioritisation and growth planning to create a commercially grounded digital roadmap.',
    outcome: 'Less random activity. More deliberate momentum.',
  },
  {
    id: 'social',
    index: '02',
    title: 'Social Media',
    promise: "Don't just stay visible. Stay relevant.",
    ctaLabel: 'Build a stronger social presence',
    approach:
      'Social media should not be a content dumping ground. We build platform-specific strategies that combine brand storytelling, audience engagement, cultural relevance and performance intelligence.',
    outcome: 'A social presence people recognise and a strategy the business can measure.',
  },
  {
    id: 'website',
    index: '03',
    title: 'Website Design & Development',
    promise: 'Your website should be your hardest-working sales asset.',
    ctaLabel: 'Rebuild your digital storefront',
    approach:
      'We create high-performance digital experiences that bring together brand architecture, UX strategy, responsive design, website development, analytics, technical SEO, content strategy and conversion optimisation — building platforms that are fast, discoverable, measurable and designed to turn attention into action.',
    outcome:
      "A website that doesn't merely look credible — it makes credibility commercially useful.",
  },
  {
    id: 'branding',
    index: '04',
    title: 'Branding',
    promise: 'A logo is an asset. A brand is an advantage.',
    ctaLabel: 'Build your brand advantage',
    approach:
      'We develop brand identities that create distinction in crowded markets — from positioning and visual identity to messaging systems and creative direction.',
    outcome: 'A brand that is recognisable before it is explained.',
  },
  {
    id: 'content',
    index: '05',
    title: 'Content Marketing',
    promise: 'Content without strategy is just more content.',
    ctaLabel: 'Turn expertise into influence',
    approach:
      'We create search-intelligent, audience-relevant and commercially purposeful content designed to educate, influence and build authority.',
  },
  {
    id: 'performance',
    index: '06',
    title: 'Performance Marketing',
    promise: '"A penny saved is a penny earned." — Benjamin Franklin',
    ctaLabel: 'Make your ad spend work harder',
    approach:
      'We plan, launch and optimise performance campaigns across the funnel — focusing on audience quality, acquisition efficiency, conversion performance and return on investment.',
    outcome: 'Less wasted spend. More intelligent scale.',
  },
  {
    id: 'ai',
    index: '07',
    title: 'AI-Powered Marketing',
    promise: 'Use artificial intelligence to create an unfair efficiency advantage.',
    ctaLabel: 'Put AI to work for your business',
    approach:
      'We integrate AI into marketing workflows to accelerate research, improve personalisation, automate repetitive processes and surface sharper decision-making insights.',
    closer: 'AI doesn’t replace strategy. It gives good strategy more leverage.',
  },
  {
    id: 'search',
    index: '08',
    title: 'SEO • AEO • GEO',
    promise: 'Timing matters. Search has changed — your visibility strategy should too.',
    ctaLabel: 'Get found everywhere it counts',
    approach:
      'Discovery no longer happens in one place. We build visibility across classic search, answer engines and generative AI platforms as a single connected system.',
    facets: [
      {
        id: 'seo',
        title: 'SEO',
        promise: 'Be ranked.',
        body: 'Optimise for discoverability across traditional search ecosystems.',
      },
      {
        id: 'aeo',
        title: 'AEO',
        promise: 'Be answered.',
        body: 'Structure information so your brand can become the response to high-intent questions.',
      },
      {
        id: 'geo',
        title: 'GEO',
        promise: 'Be referenced.',
        body: 'Strengthen your digital entity and content ecosystem so generative AI platforms can better understand, contextualise and surface your business.',
      },
    ],
  },
  {
    id: 'ads',
    index: '09',
    title: 'Meta & Google Ads',
    promise: 'Reach people who are already moving toward a decision.',
    ctaLabel: 'Launch smarter campaigns',
    approach:
      'We build precision-led advertising systems across Meta and Google, balancing audience targeting, creative testing, conversion architecture and continuous optimisation.',
  },
  {
    id: 'consulting',
    index: '10',
    title: 'Business Consulting',
    promise: 'Marketing problems are often business problems in disguise.',
    ctaLabel: 'Get strategic clarity',
    problem:
      "Sometimes the issue isn't the campaign. It's positioning. Pricing. Customer experience. Lead qualification. Sales alignment. Growth priorities.",
    approach:
      'We help identify the structural friction preventing your business from moving forward — and build practical solutions around it.',
  },
  {
    id: 'outdoor',
    index: '11',
    title: 'Outdoor Branding',
    promise: 'The physical world still has the power to stop people in their tracks.',
    ctaLabel: 'Take your brand into the real world',
    approach:
      'From storefronts and signage to large-format print, events and on-ground brand experiences, we translate your brand identity into physical spaces that command attention.',
    closer: 'From screen to street. From attention to recall.',
  },
  {
    id: 'photoshoot',
    index: '12',
    title: 'Product Photoshoot',
    promise: 'Images that sell before you do.',
    ctaLabel: 'Show the product properly',
    approach:
      'Studio, lifestyle and detail photography, planned around your brand and built for the places your customers actually see you: your website, marketplaces, social feeds and print.',
    closer: 'From shelf to screen. From glance to purchase.',
  },
  {
    id: 'podcast',
    index: '13',
    title: 'Podcast & Video Production',
    promise: 'Your story, in every format people listen to and watch.',
    ctaLabel: 'Start publishing properly',
    approach:
      'From podcast episodes to YouTube videos and short-form clips, we plan, produce and publish content that builds trust, gets found in search and keeps your brand in front of the right people. One idea, recorded once, then turned into episodes, videos, clips and posts.',
    facets: [
      {
        id: 'podcast-production',
        title: 'Podcast',
        promise: 'One conversation, many touchpoints.',
        body: 'Concept and format, show name and cover art, recording support, editing and audio clean-up, publishing to major platforms, and video and audio clips for social.',
      },
      {
        id: 'youtube',
        title: 'YouTube',
        promise: 'Built to be found, not just posted.',
        body: 'Channel strategy, scripting, shooting and editing, thumbnails and titles, search optimisation, and short-form cuts for Reels and Shorts.',
      },
    ],
    closer: 'From one conversation to many touchpoints. From content to conversion.',
  },
];

export const servicesHero = {
  eyebrow: 'Capabilities',
  headline: 'One growth partner. Multiple growth levers.',
  lead: 'Thirteen capabilities, built to operate as one system rather than thirteen separate line items.',
} as const;
