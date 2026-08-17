import React, { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { 
  Rocket, Building2, Factory, Home, Activity, GraduationCap,
  Target, BarChart3, Cpu, Palette, MessageSquare, Handshake,
  ArrowRight, Sparkles, TrendingUp, CheckCircle
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
  Rocket: <Rocket size={22} />,
  Building2: <Building2 size={22} />,
  Factory: <Factory size={22} />,
  Home: <Home size={22} />,
  Activity: <Activity size={22} />,
  GraduationCap: <GraduationCap size={22} />
};

const whyChooseIconMap: Record<string, React.ReactNode> = {
  Target: <Target size={24} />,
  BarChart3: <BarChart3 size={24} />,
  Cpu: <Cpu size={24} />,
  Palette: <Palette size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Handshake: <Handshake size={24} />
};

interface HomePageProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  usePageSEO({
    title: 'Digital Marketing Agency Bangalore | SEO, AI & Performance',
    description: 'HIRANMAYE DIGITAL helps businesses grow through SEO, AI-powered digital marketing, website development, branding, Meta Ads, Google Ads, and performance marketing.',
    keywords: 'Digital Marketing Agency Bangalore, AI Digital Marketing, SEO Services, Performance Marketing, Meta Ads, Google Ads, Branding Agency'
  });

  return (
    <main>
      {/* 1. Hero Section with 3D WebGL */}
      <section className="hero-section">
        <div className="site-container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <span className="eyebrow-badge animate-float">
                <Sparkles size={14} /> AI-Powered Digital Growth Partner
              </span>

              <h1 className="hero-title">
                Transforming Businesses into <span className="brand-gradient-text">Market Leaders</span> Through Strategic Digital Growth
              </h1>

              <p className="hero-subtitle">
                At <strong>HIRANMAYE DIGITAL</strong>, we combine strategy, creativity, AI-powered marketing, and performance-driven campaigns to help ambitious businesses generate qualified leads, strengthen their brand, and achieve sustainable growth.
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
                  View Our Work
                </Button>
              </div>

              {/* Quick Trust Highlights */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', pt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle size={18} color="var(--brand-blue-600)" />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Data-Driven ROI
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle size={18} color="var(--brand-blue-600)" />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    AI & AEO Ready
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle size={18} color="var(--brand-blue-600)" />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Custom Strategy Roadmap
                  </Typography>
                </Box>
              </Box>
            </div>

            {/* Right 3D Interactive Canvas */}
            <div style={{ position: 'relative' }}>
              <Suspense fallback={<Hero3DFallback />}>
                <Hero3DCanvas />
              </Suspense>

              {/* Floating Holographic Metric Badges */}
              <div className="floating-metric-badge floating-badge-top-left animate-float">
                <div className="badge-icon-box">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="badge-value">10x ROI</div>
                  <div className="badge-label">Lead Quality Focus</div>
                </div>
              </div>

              <div className="floating-metric-badge floating-badge-bottom-right animate-float-delayed">
                <div className="badge-icon-box" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="badge-value">AI + SEO + GEO</div>
                  <div className="badge-label">Modern Search Domination</div>
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

      {/* 3. Who We Are */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="Who We Are"
            title="Your Strategic Partner for Sustainable Digital Growth"
            subtitle="We don't believe in generic marketing campaigns. Every strategy we develop is tailored to your business objectives, target audience, industry landscape, and growth ambitions."
          />

          <div className="who-we-are-box">
            <div className="who-we-are-content">
              <p style={{ marginBottom: '20px' }}>
                <strong className="who-we-are-highlight">HIRANMAYE DIGITAL</strong> is a full-service digital marketing agency based in Bangalore, dedicated to helping businesses grow through strategic marketing, powerful branding, intelligent automation, and measurable performance.
              </p>
              <p style={{ marginBottom: '20px' }}>
                By combining <span className="who-we-are-highlight">creativity, technology, analytics, and AI-driven insights</span>, we create marketing systems that generate real business outcomes, not just impressions or clicks.
              </p>
              <p>
                Whether you're a startup looking to establish your presence or an established business aiming to scale, we partner with you to build sustainable digital growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose HIRANMAYE DIGITAL? */}
      <section className="home-section-padding home-section-alt">
        <div className="site-container">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="More Than a Marketing Agency — Your Business Growth Partner"
            subtitle="Built on strategic rigour, creative precision, and transparent accountability."
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

      {/* 5. Our Services (11 Services) */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="Our Services"
            title="Comprehensive Digital Solutions Designed for Business Growth"
            subtitle="From strategic planning to execution and optimization, we offer end-to-end digital marketing services that help businesses attract customers, increase visibility, and accelerate growth."
          />

          <div className="services-full-grid">
            {servicesData.map((svc) => (
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

      {/* 7. Our Process (5-Step Framework) */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="Our Process"
            title="Our Proven Growth Framework"
            subtitle="A systematic, scientific methodology designed to turn marketing spend into predictable, compounding revenue."
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

      {/* 8. Final CTA Section */}
      <section className="home-section-padding">
        <div className="site-container">
          <div className="final-cta-card">
            <span className="eyebrow-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}>
              Let's Scale Together
            </span>
            <h2 className="final-cta-title">Ready to Grow Your Business?</h2>
            <p className="final-cta-desc">
              Let's build a digital strategy that delivers measurable results, strengthens your brand, and drives sustainable growth.
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
