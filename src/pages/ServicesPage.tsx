import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Sparkles, Search, Bot, MessageSquare } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';
import { ServiceCard } from '../components/common/ServiceCard';
import { ServiceDetailModal } from '../components/modals/ServiceDetailModal';
import { servicesData } from '../data/servicesData';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  usePageSEO({
    title: 'Digital Marketing Services Bangalore | SEO, AI Marketing, Branding & Performance',
    description: 'Explore HIRANMAYE DIGITAL\'s premium digital marketing services, including SEO, AEO, GEO, AI-powered marketing, branding, website development, Meta & Google Ads, content marketing, and business consulting.',
    keywords: 'Digital Marketing Services Bangalore, SEO Services, AI Powered Marketing, Website Development, Branding Agency, Performance Marketing, Meta Ads, Google Ads, Business Consulting, AEO Services, GEO Optimization'
  });

  const categories = [
    { id: 'all', label: 'All Solutions (11)' },
    { id: 'strategy', label: 'Strategy & Consulting' },
    { id: 'performance', label: 'Performance & Paid Ads' },
    { id: 'ai-search', label: 'AI, SEO, AEO & GEO' },
    { id: 'creative', label: 'Creative, Web & Branding' },
    { id: 'physical', label: 'Outdoor & Physical Branding' }
  ];

  const filteredServices = activeCategory === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  return (
    <main>
      {/* 1. Header Section */}
      <section className="services-page-header">
        <div className="site-container">
          <span className="eyebrow-badge animate-float">
            <Sparkles size={14} /> Full-Funnel Capabilities
          </span>

          <h1 className="about-hero-title">
            Strategic Digital Solutions That Drive <span className="brand-gradient-text">Measurable Business Growth</span>
          </h1>

          <p className="about-hero-desc">
            At <strong>HIRANMAYE DIGITAL</strong>, we don't believe in one-size-fits-all marketing. Every business is unique, and so are its challenges. Our services are designed to help organizations strengthen their digital presence, generate qualified leads, build lasting customer relationships, and achieve sustainable growth through strategy, creativity, technology, and data-driven execution.
          </p>

          {/* Filter Tabs */}
          <div className="services-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="home-section-padding" style={{ paddingTop: 0 }}>
        <div className="site-container">
          <div className="services-full-grid">
            {filteredServices.map((svc) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                onClick={(item) => setSelectedService(item)}
              />
            ))}
          </div>

          {/* Deep Dive SEO | AEO | GEO Feature Box */}
          <div className="seo-trio-breakdown">
            <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
              <span className="eyebrow-badge">
                <Search size={14} /> Future of Search
              </span>
              <Typography variant="h3" sx={{ color: 'var(--brand-navy-900)', mb: 2, fontWeight: 800 }}>
                SEO • AEO • GEO: Triple-Vector Visibility
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Search is no longer limited to Google keywords. Today's high-ticket buyers query AI assistants (ChatGPT, Gemini, Claude) and voice answer engines. We optimize your entire digital footprint across all 3 search dimensions.
              </Typography>
            </div>

            <div className="seo-trio-grid">
              <div className="seo-trio-col">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-blue-600)' }}>
                  <Search size={20} />
                </div>
                <div className="seo-trio-tag">SEO (Search Engine Optimization)</div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Improve your rankings on Google and attract qualified organic traffic through technical optimization, content strategy, and authority building.
                </p>
              </div>

              <div className="seo-trio-col">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-blue-600)' }}>
                  <MessageSquare size={20} />
                </div>
                <div className="seo-trio-tag">AEO (Answer Engine Optimization)</div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Structure your content to appear in featured snippets, voice search results, and AI-generated answers by providing clear, authoritative responses to user questions.
                </p>
              </div>

              <div className="seo-trio-col">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-navy-700)' }}>
                  <Bot size={20} />
                </div>
                <div className="seo-trio-tag">GEO (Generative Engine Optimization)</div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Optimize your website and content so AI platforms like ChatGPT, Gemini, Claude, and Perplexity can better understand, reference, and recommend your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Call to Action */}
      <section className="home-section-padding home-section-alt">
        <div className="site-container">
          <div className="final-cta-card">
            <h2 className="final-cta-title">Need a Tailored Digital Growth Strategy?</h2>
            <p className="final-cta-desc">
              Schedule a comprehensive audit with our digital growth team to identify high-leverage opportunities for your business.
            </p>
            <div className="final-cta-buttons">
              <Button
                variant="contained"
                onClick={() => onOpenBooking('Custom Strategy Consultation')}
                sx={{
                  bgcolor: '#FFFFFF !important',
                  color: 'var(--brand-navy-950) !important',
                  fontWeight: 800,
                  py: 1.5,
                  px: 4
                }}
              >
                Book a Free Strategy Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        open={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        onBookConsultation={(name) => onOpenBooking(name)}
      />
    </main>
  );
};
