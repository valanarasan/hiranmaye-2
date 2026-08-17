import { CoreValue, WhyChooseCard, ProcessStep, TrustSector } from '../types';

export const companyInfo = {
  name: 'HIRANMAYE DIGITAL',
  tagline: 'Your Strategic Partner for Sustainable Digital Growth',
  address: 'Bangalore, Karnataka, India',
  phone: '+91 99006 68383',
  phoneDisplay: '+91 99006 68383',
  email: 'hiranmayemarketing@gmail.com',
  website: 'www.hiranmayedigital.com',
  googleMapsUrl: 'https://maps.app.goo.gl/W3sgGPeEHgHCygt96',
  social: {
    instagram: 'https://www.instagram.com/Hiranmaye_Digital',
    facebook: 'https://www.facebook.com/hiranmayedigital',
    youtube: 'https://www.youtube.com/@Hiranmaye_Digital',
    whatsapp: 'https://wa.me/919900668383'
  },
  businessHours: [
    { days: 'Monday – Friday', hours: '9:30 AM – 6:30 PM', isWorkday: true },
    { days: 'Saturday', hours: '10:00 AM – 5:00 PM', isWorkday: true },
    { days: 'Sunday', hours: 'Closed', isWorkday: false }
  ]
};

export const trustSectors: TrustSector[] = [
  { name: 'Startups', icon: 'Rocket', growthMetric: '3.4x Pipeline Growth' },
  { name: 'SMEs', icon: 'Building2', growthMetric: '140% Lead Influx' },
  { name: 'Manufacturing Companies', icon: 'Factory', growthMetric: 'High-Ticket B2B Contracts' },
  { name: 'Real Estate Brands', icon: 'Home', growthMetric: 'Qualified Buyer Inquiries' },
  { name: 'Healthcare', icon: 'Activity', growthMetric: 'Patient Acquisition Trust' },
  { name: 'Educational Institutions', icon: 'GraduationCap', growthMetric: 'Enrolment Campaigns' }
];

export const whyChooseCards: WhyChooseCard[] = [
  {
    title: 'Strategy First',
    description: 'Every project begins with understanding your business, customers, competitors, and objectives before executing any campaign.',
    icon: 'Target'
  },
  {
    title: 'Performance Driven',
    description: 'Every decision is backed by analytics, ensuring every marketing investment contributes to measurable business outcomes.',
    icon: 'BarChart3'
  },
  {
    title: 'AI-Powered Solutions',
    description: 'We integrate intelligent automation and AI-driven workflows to enhance efficiency, improve customer experiences, and maximize marketing performance.',
    icon: 'Cpu'
  },
  {
    title: 'Creative Excellence',
    description: 'Our team creates compelling designs, engaging content, and memorable brand experiences that leave a lasting impact.',
    icon: 'Palette'
  },
  {
    title: 'Transparent Communication',
    description: 'Clear reporting, honest insights, and regular updates keep you informed at every stage of your marketing journey.',
    icon: 'MessageSquare'
  },
  {
    title: 'Long-Term Partnership',
    description: 'We focus on building enduring relationships by delivering consistent value and supporting your business growth over time.',
    icon: 'Handshake'
  }
];

export const coreValues: CoreValue[] = [
  {
    title: 'Strategic Thinking',
    description: 'Every decision begins with understanding your business goals, market opportunities, and customer needs.',
    icon: 'Compass',
    badge: 'Foundation'
  },
  {
    title: 'Integrity',
    description: 'We believe in transparency, honest communication, and building relationships based on trust.',
    icon: 'ShieldCheck',
    badge: 'Ethics'
  },
  {
    title: 'Innovation',
    description: 'We embrace emerging technologies, AI-powered solutions, and modern marketing techniques to keep our clients ahead of the competition.',
    icon: 'Zap',
    badge: 'Future-Ready'
  },
  {
    title: 'Excellence',
    description: 'We maintain high standards in every project, ensuring quality, consistency, and measurable impact.',
    icon: 'Award',
    badge: 'Quality'
  },
  {
    title: 'Collaboration',
    description: 'We work closely with our clients, treating their success as our own and building long-term partnerships.',
    icon: 'Users',
    badge: 'Teamwork'
  },
  {
    title: 'Continuous Improvement',
    description: 'Digital marketing evolves every day, and so do we. We continuously learn, adapt, and optimize to deliver better results.',
    icon: 'RefreshCw',
    badge: 'Agility'
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'Understand your business, audience, challenges, and objectives.',
    icon: 'Search',
    detail: 'We conduct deep-dive stakeholder interviews, audit digital touchpoints, analyze competitor benchmarks, and map audience personas.'
  },
  {
    step: '02',
    title: 'Strategize',
    description: 'Develop customized digital strategies based on research and data.',
    icon: 'MapPin',
    detail: 'We formulate the omnichannel roadmap, budget allocation, conversion funnels, messaging frameworks, and KPI benchmarks.'
  },
  {
    step: '03',
    title: 'Execute',
    description: 'Launch campaigns with precision, creativity, and technical excellence.',
    icon: 'Rocket',
    detail: 'Our creatives, media buyers, and developers launch high-impact campaigns, landing pages, tracking pixels, and automated workflows.'
  },
  {
    step: '04',
    title: 'Optimize',
    description: 'Continuously monitor, analyze, and refine performance for maximum ROI.',
    icon: 'Sliders',
    detail: 'We perform multi-variant testing, bid optimization, search intent adjustments, and conversion rate engineering to maximize efficiency.'
  },
  {
    step: '05',
    title: 'Scale',
    description: 'Expand successful campaigns to achieve sustainable business growth.',
    icon: 'TrendingUp',
    detail: 'We scale high-performing channels, unlock new market segments, and expand your digital ecosystem for long-term compound growth.'
  }
];

export const whyChoosePillars = [
  {
    title: 'Business-First Approach',
    description: 'We align every marketing initiative with your business objectives, ensuring that every campaign contributes to measurable growth.'
  },
  {
    title: 'Customized Strategies',
    description: 'No two businesses are alike. Every solution we create is tailored to your industry, audience, and goals.'
  },
  {
    title: 'Data-Driven Decisions',
    description: 'Our recommendations are backed by research, analytics, and performance insights—not assumptions.'
  },
  {
    title: 'AI-Powered Innovation',
    description: 'We integrate artificial intelligence and automation to improve efficiency, enhance customer experiences, and optimize campaign performance.'
  },
  {
    title: 'Transparent Partnership',
    description: 'Clear communication, regular reporting, and complete transparency keep you informed every step of the way.'
  },
  {
    title: 'Long-Term Growth',
    description: 'We focus on building sustainable digital ecosystems that continue to generate value long after campaigns are launched.'
  }
];
