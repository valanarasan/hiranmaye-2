import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'digital-marketing-strategy',
    number: '01',
    title: 'Digital Marketing Strategy',
    subtitle: 'Build a Roadmap for Sustainable Business Growth',
    description: 'Successful digital marketing starts with a clear strategy. We analyze your business, competitors, market trends, and customer behavior to develop customized marketing plans that align with your objectives and maximize your return on investment.',
    category: 'strategy',
    icon: 'Compass',
    ctaText: 'Develop Your Growth Strategy →',
    deliverables: [
      'Comprehensive Market & Competitor Landscape Audit',
      'Target Audience ICP & Customer Journey Mapping',
      'Full-Funnel Omnichannel Digital Growth Blueprint',
      'KPI Framework, Attribution Modeling & Budget Allocation'
    ],
    growthImpact: 'Provides clear alignment between your marketing spend and scalable revenue outcomes.'
  },
  {
    id: 'social-media-marketing',
    number: '02',
    title: 'Social Media Marketing',
    subtitle: 'Build Meaningful Connections That Convert into Customers',
    description: 'Social media is more than just publishing posts—it\'s about creating conversations, building trust, and driving business growth. We develop data-driven social media strategies that increase brand awareness, engage your audience, and generate measurable business results.',
    category: 'creative',
    icon: 'Share2',
    ctaText: 'Grow Your Brand Online →',
    deliverables: [
      'Cross-Platform Content Strategy (Instagram, LinkedIn, YouTube, X)',
      'High-Impact Video Reels, Shorts & Motion Design',
      'Community Management & Strategic Social Listening',
      'Influencer Collaborations & Viral Brand Activations'
    ],
    growthImpact: 'Transforms passive followers into an active, highly engaged community of brand advocates.'
  },
  {
    id: 'website-design-development',
    number: '03',
    title: 'Website Design & Development',
    subtitle: 'Premium Websites Designed to Convert Visitors into Customers',
    description: 'Your website is your most valuable digital asset. We build modern, responsive, SEO-friendly websites that combine exceptional design with outstanding user experience to generate leads, improve credibility, and support business growth.',
    category: 'creative',
    icon: 'Layout',
    ctaText: 'Build Your Business Website →',
    deliverables: [
      'Conversion-Optimized UX/UI Architecture & Wireframing',
      'High-Performance Responsive Front-End Engineering',
      'Core Web Vitals & Technical Speed Optimization (95+ Lighthouse)',
      'Custom CMS Integration, Analytics & Lead Capture Pipelines'
    ],
    growthImpact: 'Elevates brand credibility while significantly increasing visitor-to-lead conversion rates.'
  },
  {
    id: 'branding-creative-design',
    number: '04',
    title: 'Branding & Creative Design',
    subtitle: 'Create a Brand That Inspires Trust and Recognition',
    description: 'Strong brands create lasting impressions. We help businesses establish distinctive brand identities through strategic design, visual storytelling, and consistent communication that builds credibility and customer loyalty.',
    category: 'creative',
    icon: 'Sparkles',
    ctaText: 'Build Your Brand Identity →',
    deliverables: [
      'Brand Identity Systems, Logo Suites & Color Harmonies',
      'Brand Guidelines, Typography Systems & Tone of Voice',
      'Marketing Collaterals, Pitch Decks & Digital Assets',
      'Visual Storytelling & Premium Packaging Design'
    ],
    growthImpact: 'Positions your enterprise as a premium market leader that commands trust and pricing power.'
  },
  {
    id: 'content-marketing',
    number: '05',
    title: 'Content Marketing',
    subtitle: 'Content That Builds Authority and Drives Growth',
    description: 'High-quality content attracts the right audience, improves search visibility, and establishes your business as an industry leader. We create strategic content designed to educate, engage, and convert.',
    category: 'creative',
    icon: 'FileText',
    ctaText: 'Create Content That Converts →',
    deliverables: [
      'Authority Pillar Content, Whitepapers & Case Studies',
      'SEO-Driven Blog Articles & Thought Leadership Pieces',
      'Video Scripts, Infographics & Visual Data Stories',
      'Content Syndication & Omnichannel Distribution Plans'
    ],
    growthImpact: 'Attracts inbound qualified prospects organically by answering high-value buyer queries.'
  },
  {
    id: 'performance-marketing',
    number: '06',
    title: 'Performance Marketing',
    subtitle: 'Maximize ROI Through Data-Driven Advertising',
    description: 'Performance marketing is about measurable results. We continuously optimize campaigns to improve lead quality, reduce acquisition costs, and maximize your marketing investment.',
    category: 'performance',
    icon: 'TrendingUp',
    ctaText: 'Scale Your Business Faster →',
    deliverables: [
      'Multi-Touch Attribution & Funnel Optimization',
      'Rigorous A/B Creative Testing & Conversion Rate Optimization (CRO)',
      'Lead Quality Scoring & Automated CRM Sync',
      'Dynamic Retargeting & High-Intent Audience Segmentation'
    ],
    growthImpact: 'Drives consistent, predictable customer acquisition with maximum return on ad spend (ROAS).'
  },
  {
    id: 'ai-powered-digital-marketing',
    number: '07',
    title: 'AI-Powered Digital Marketing',
    subtitle: 'Harness Artificial Intelligence to Accelerate Business Growth',
    description: 'AI is reshaping digital marketing. We integrate intelligent automation and AI-powered tools to streamline operations, personalize customer experiences, improve decision-making, and enhance marketing efficiency.',
    category: 'ai-search',
    icon: 'Bot',
    ctaText: 'Future-Proof Your Marketing →',
    deliverables: [
      'Predictive Lead Scoring & Audience Intent Modeling',
      'Automated Multi-Variant Content Generation & Personalization',
      'Intelligent Chatbots & Conversational AI Funnels',
      'Marketing Automation Workflows & Workflow Optimization'
    ],
    growthImpact: 'Multiplies team throughput while delivering deeply personalized customer experiences at scale.'
  },
  {
    id: 'seo-aeo-geo',
    number: '08',
    title: 'SEO | AEO | GEO',
    subtitle: 'Be Visible Wherever Your Customers Search',
    description: 'Search is no longer limited to Google. Today\'s customers also rely on AI assistants, voice search, and generative search experiences. We optimize your digital presence for traditional search engines, answer engines, and AI-powered platforms to help your business stay discoverable.',
    category: 'ai-search',
    icon: 'Search',
    subsections: [
      {
        title: 'SEO (Search Engine Optimization)',
        description: 'Improve your rankings on Google and attract qualified organic traffic through technical optimization, content strategy, and authority building.'
      },
      {
        title: 'AEO (Answer Engine Optimization)',
        description: 'Structure your content to appear in featured snippets, voice search results, and AI-generated answers by providing clear, authoritative responses to user questions.'
      },
      {
        title: 'GEO (Generative Engine Optimization)',
        description: 'Optimize your website and content so AI platforms like ChatGPT, Gemini, Claude, and Perplexity can better understand, reference, and recommend your business.'
      }
    ],
    ctaText: 'Increase Your Digital Visibility →',
    deliverables: [
      'Technical SEO Audit & Schema Structured Data Architecture',
      'AEO Snippet & Zero-Click Direct Answer Engineering',
      'GEO Entity Graph & LLM Knowledge Base Inclusion Strategy',
      'High-Authority Backlink Acquisition & Digital PR'
    ],
    growthImpact: 'Ensures your brand remains the top recommended authority across Google, ChatGPT, Gemini, and Claude.'
  },
  {
    id: 'meta-google-ads',
    number: '09',
    title: 'Meta & Google Ads',
    subtitle: 'Reach High-Intent Customers with Precision Advertising',
    description: 'Our paid advertising strategies are designed to generate qualified leads, increase conversions, and maximize return on ad spend through continuous optimization and performance monitoring.',
    category: 'performance',
    icon: 'Target',
    ctaText: 'Launch High-Performing Ad Campaigns →',
    deliverables: [
      'Google Search, Display, Performance Max & YouTube Campaigns',
      'Meta (Facebook & Instagram) Targeted Lead Generation',
      'Precision Keyword Targeting & Negative Match Pruning',
      'Real-Time Bid Optimization & Conversion Tracking'
    ],
    growthImpact: 'Captures in-market buyers at the exact moment they express intent for your services.'
  },
  {
    id: 'business-consulting',
    number: '10',
    title: 'Business Consulting',
    subtitle: 'Strategic Guidance for Long-Term Business Success',
    description: 'Business growth requires more than marketing. Our consulting services help organizations identify opportunities, optimize digital initiatives, and develop scalable growth strategies that align with their long-term vision.',
    category: 'strategy',
    icon: 'Briefcase',
    ctaText: 'Let\'s Build Your Growth Roadmap →',
    deliverables: [
      'Digital Transformation & Go-to-Market (GTM) Strategy',
      'Revenue Operations & Tech Stack Streamlining',
      'Product-Market Fit & Pricing Strategy Advisory',
      'Executive KPI Dashboards & Growth Governance'
    ],
    growthImpact: 'Bridges the gap between high-level business strategy and tactical digital execution.'
  },
  {
    id: 'outdoor-branding',
    number: '11',
    title: 'Outdoor Branding',
    subtitle: 'From Screen to Street. From Print to Powerful Brand Presence.',
    description: 'Your brand deserves to be seen beyond the digital world. At HIRANMAYE DIGITAL, we bridge the gap between digital creativity and physical visibility with end-to-end outdoor branding solutions. From concept and design to premium printing and professional signage, we transform your ideas into impactful brand experiences that capture attention and leave a lasting impression.',
    category: 'physical',
    icon: 'Eye',
    ctaText: 'Explore Outdoor Branding Solutions →',
    deliverables: [
      'Premium Architectural Signage, 3D Acrylic & LED Signboards',
      'Large-Format Billboards, Hoardings & Transit Advertising',
      'Corporate Office Branding, Wall Graphics & Spatial Design',
      'High-Impact Event Booths, Expo Stalls & Retail Point-of-Sale (POS)'
    ],
    growthImpact: 'Creates unmissable physical brand authority across prime commercial and retail locations.'
  }
];
