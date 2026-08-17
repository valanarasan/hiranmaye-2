import React, { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { 
  Rocket, Building2, Factory, Home, Activity, GraduationCap,
  Target, BarChart3, Cpu, Palette, MessageSquare, Handshake,
  ArrowRight, Sparkles, TrendingUp, CheckCircle, Zap
} from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';
import { SectionHeader } from '../components/common/SectionHeader';
import { ServiceCard } from '../components/common/ServiceCard';
import { GrowthCalculator } from '../components/widgets/GrowthCalculator';
import { Hero3DFallback } from '../components/3d/Hero3DFallback';
import { ServiceDetailModal } from '../components/modals/ServiceDetailModal';
import { servicesData } from '../data/servicesData';
import { whyChooseCards, trustSectors, processSteps } from '../data/companyData';
import { ServiceItem } from '../types';

// Lazy load Three.js 3D Canvas
const Hero3DCanvas = lazy(() =>
  import('../components/3d/Hero3DCanvas').then((m) => ({ default: m.Hero3DCanvas }))
);

const trustIconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket size={20} />,
  Building2: <Building2 size={20} />,
  Factory: <Factory size={20} />,
  Home: <Home size={20} />,
  Activity: <Activity size={20} />,
  GraduationCap: <GraduationCap size={20} />
};

const whyChooseIconMap: Record<string, React.ReactNode> = {
  Target: <Target size={22} />,
  BarChart3: <BarChart3 size={22} />,
  Cpu: <Cpu size={22} />,
  Palette: <Palette size={22} />,
  MessageSquare: <MessageSquare size={22} />,
  Handshake: <Handshake size={22} />
};

interface HomePageProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  usePageSEO({
    title: 'HIRANMAYE DIGITAL | Strategic Digital Growth Agency',
    description: 'We help ambitious brands generate qualified leads and scale revenue through AI-powered marketing, SEO, Meta & Google Ads, and high-converting websites.',
    keywords: 'Digital Marketing Agency Bangalore, AI Marketing, Performance Marketing, SEO, Meta Ads, Google Ads'
  });

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'performance', label: 'Paid Ads' },
    { id: 'ai-search', label: 'AI & SEO' },
    { id: 'creative', label: 'Creative & Web' },
    { id: 'physical', label: 'Outdoor' }
  ];

  const filteredServices = activeCategory === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  return (
    <main>
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="site-container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <span className="eyebrow-badge animate-float">
                <Sparkles size={14} /> Full-Service Digital Growth Partner
              </span>

              <h1 className="hero-title">
                We Turn Businesses into <span className="brand-gradient-text">Market Leaders</span>
              </h1>

              <p className="hero-subtitle">
                At <strong>HIRANMAYE DIGITAL</strong>, we combine data-driven strategy, AI-powered marketing, and high-converting creative campaigns to generate qualified leads and accelerate revenue.
              </p>

              <div className="hero-cta-group">
                <Button
                  variant="contained"
                  color="primary"
                  className="hero-cta-btn-primary"
                  onClick={() => onOpenBooking()}
                  endIcon={<ArrowRight size={18} />}
                >
                  Book a Free Strategy Consultation
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className="hero-cta-btn-secondary"
                  onClick={() => navigate('/services')}
                >
                  Explore Services
                </Button>
              </div>

              {/* Quick Trust Highlights */}
              <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 3 }, flexWrap: 'wrap', pt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle size={16} color="var(--brand-blue-600)" />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Measurable ROI
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle size={16} color="var(--brand-blue-600)" />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    AI-Driven Marketing
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle size={16} color="var(--brand-blue-600)" />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Bangalore Headquarters
                  </Typography>
                </Box>
              </Box>
            </div>

            {/* Right 3D Interactive Canvas */}
            <div style={{ position: 'relative' }}>
              <Suspense fallback={<Hero3DFallback />}>
                <Hero3DCanvas />
              </Suspense>

              {/* Floating Metric Badges */}
              <div className="floating-metric-badge floating-badge-top-left animate-float">
                <div className="badge-icon-box">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="badge-value">10x ROI</div>
                  <div className="badge-label">Lead Pipeline Growth</div>
                </div>
              </div>

              <div className="floating-metric-badge floating-badge-bottom-right animate-float-delayed">
                <div className="badge-icon-box" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)' }}>
                  <Zap size={18} />
                </div>
                <div>
                  <div className="badge-value">SEO • AEO • GEO</div>
                  <div className="badge-label">Google & AI Search Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section className="trust-strip-wrapper">
        <div className="site-container">
          <div className="trust-strip-header">
            Trusted by Ambitious Enterprises Across Industries
          </div>
          <div className="trust-items-grid">
            {trustSectors.map((sector, idx) => (
              <div key={idx} className="trust-card">
                <div className="trust-card-icon">
                  {trustIconMap[sector.icon]}
                </div>
                <div className="trust-card-name">{sector.name}</div>
                <div className="trust-card-metric">{sector.growthMetric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Who We Are (Minimal & Punchy) */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="Who We Are"
            title="Your Strategic Partner for Sustainable Digital Growth"
            subtitle="HIRANMAYE DIGITAL is a full-service agency based in Bangalore. We don't do generic campaigns—we build tailored growth engines that convert visitors into paying clients."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div className="feature-card">
              <div className="feature-card-icon-box">
                <Target size={22} />
              </div>
              <h3 className="feature-card-title">Tailored Strategy</h3>
              <p className="feature-card-description">
                Every strategy is engineered around your specific market, audience, and revenue goals before a single rupee is spent.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon-box">
                <Cpu size={22} />
              </div>
              <h3 className="feature-card-title">AI & Intelligence</h3>
              <p className="feature-card-description">
                We integrate artificial intelligence and predictive automation to optimize campaigns, personalize funnels, and multiply efficiency.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-card-icon-box">
                <BarChart3 size={22} />
              </div>
              <h3 className="feature-card-title">Measurable Outcomes</h3>
              <p className="feature-card-description">
                We track real business metrics: qualified inquiries, customer acquisition cost (CAC), and return on ad spend (ROAS).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (6 Minimal Cards) */}
      <section className="home-section-padding home-section-alt">
        <div className="site-container">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Built for Measurable Business Growth"
            subtitle="Why founders and marketing leaders trust HIRANMAYE DIGITAL to scale their revenue."
          />

          <div className="feature-cards-grid">
            {whyChooseCards.map((card, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-card-icon-box">
                  {whyChooseIconMap[card.icon]}
                </div>
                <h3 className="feature-card-title">{card.title}</h3>
                <p className="feature-card-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Services (With Quick Category Switcher) */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="What We Do"
            title="Comprehensive Digital Solutions"
            subtitle="From strategic planning and paid ads to AI-powered search and physical outdoor branding."
          />

          {/* Quick Filter Switcher */}
          <div className="services-filter-tabs" style={{ margin: '0 auto 36px', justifyContent: 'center' }}>
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

          <div className="services-full-grid">
            {filteredServices.map((svc) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                onClick={(item) => setSelectedService(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Growth & ROI Estimator */}
      <section className="home-section-padding home-section-alt">
        <div className="site-container">
          <GrowthCalculator onBookConsultation={() => onOpenBooking('Growth ROI Audit')} />
        </div>
      </section>

      {/* 7. Our 5-Step Framework */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="Our Process"
            title="Our Proven Growth Framework"
            subtitle="A clear, 5-step methodology that turns marketing spend into predictable, compounding revenue."
          />

          <div className="process-timeline-grid">
            {processSteps.map((step) => (
              <div key={step.step} className="process-step-card">
                <div className="process-step-num">{step.step}</div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="home-section-padding">
        <div className="site-container">
          <div className="final-cta-card">
            <span className="eyebrow-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
              Let's Scale Together
            </span>
            <h2 className="final-cta-title">Ready to Grow Your Business?</h2>
            <p className="final-cta-desc">
              Let's build a custom digital strategy that generates qualified leads, strengthens your brand, and delivers measurable ROI.
            </p>
            <div className="final-cta-buttons">
              <Button
                variant="contained"
                onClick={() => onOpenBooking()}
                sx={{
                  bgcolor: '#FFFFFF !important',
                  color: 'var(--brand-navy-950) !important',
                  fontWeight: 800,
                  fontSize: '1rem',
                  py: 1.5,
                  px: 4,
                  '&:hover': { bgcolor: '#EFF6FF !important' }
                }}
              >
                Book a Free Strategy Consultation
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/contact')}
                sx={{
                  borderColor: '#FFFFFF !important',
                  color: '#FFFFFF !important',
                  fontWeight: 700,
                  fontSize: '1rem',
                  py: 1.5,
                  px: 4,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1) !important' }
                }}
              >
                Talk to Our Experts
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
