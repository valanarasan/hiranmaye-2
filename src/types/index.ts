export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'strategy' | 'creative' | 'performance' | 'ai-search' | 'physical';
  icon: string;
  subsections?: {
    title: string;
    description: string;
  }[];
  ctaText: string;
  deliverables?: string[];
  growthImpact?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  isPopular?: boolean;
  isPillar?: boolean;
  relatedIds: string[];
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
  badge: string;
}

export interface WhyChooseCard {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  detail: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ConsultationFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  location: string;
  goals: string;
  preferredService?: string;
}

export interface TrustSector {
  name: string;
  icon: string;
  growthMetric: string;
}
