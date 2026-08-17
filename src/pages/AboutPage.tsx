import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { 
  Compass, ShieldCheck, Zap, Award, Users, RefreshCw,
  ArrowRight, Sparkles
} from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';
import { SectionHeader } from '../components/common/SectionHeader';
import { coreValues, whyChoosePillars } from '../data/companyData';

interface AboutPageProps {
  onOpenBooking: () => void;
}

const valueIconMap: Record<string, React.ReactNode> = {
  Compass: <Compass size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Zap: <Zap size={24} />,
  Award: <Award size={24} />,
  Users: <Users size={24} />,
  RefreshCw: <RefreshCw size={24} />
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();

  usePageSEO({
    title: 'About Us | Premium Digital Marketing Agency in Bangalore',
    description: 'Learn about HIRANMAYE DIGITAL, a Bangalore-based digital marketing agency helping businesses grow through SEO, AI-powered marketing, branding, website development, performance marketing, and strategic consulting.',
    keywords: 'About HIRANMAYE DIGITAL, Digital Marketing Agency Bangalore, Business Growth Partner, Branding Agency, AI Powered Digital Marketing, SEO Agency Bangalore'
  });

  return (
    <main>
      {/* 1. Hero Section */}
      <section className="about-hero-section">
        <div className="site-container">
          <span className="eyebrow-badge animate-float">
            <Sparkles size={14} /> About HIRANMAYE DIGITAL
          </span>

          <h1 className="about-hero-title">
            Empowering Businesses with <span className="brand-gradient-text">Strategy, Creativity</span>, and Digital Innovation
          </h1>

          <p className="about-hero-desc">
            At <strong>HIRANMAYE DIGITAL</strong>, we believe that successful marketing is not about simply increasing visibility—it's about creating measurable business growth. We partner with ambitious businesses to build powerful brands, generate qualified leads, and deliver sustainable digital success through strategic marketing, technology, and innovation.
          </p>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onOpenBooking}
            endIcon={<ArrowRight size={18} />}
            sx={{ py: 1.5, px: 4, fontSize: '1.05rem', fontWeight: 700 }}
          >
            Let's Build Your Growth Story
          </Button>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="home-section-padding home-section-alt">
        <div className="site-container">
          <SectionHeader
            eyebrow="Our Identity"
            title="Your Trusted Digital Growth Partner"
            subtitle="Headquartered in Bangalore, helping businesses transform their digital presence into a powerful engine for scalable growth."
          />

          <div className="who-we-are-box">
            <div className="who-we-are-content">
              <p style={{ marginBottom: '20px' }}>
                <strong>HIRANMAYE DIGITAL</strong> is a premium digital marketing agency headquartered in Bangalore, helping businesses transform their digital presence into a powerful engine for growth.
              </p>
              <p style={{ marginBottom: '20px' }}>
                We specialize in combining strategic thinking, creative excellence, advanced technology, and performance-driven marketing to help businesses connect with the right audience and achieve measurable outcomes.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Our approach goes beyond delivering marketing services. We work as an extension of your team, understanding your business objectives, market dynamics, and customer journey to create customized strategies that drive long-term success.
              </p>
              <p>
                Whether you're launching a new brand, expanding into new markets, or scaling your existing business, we provide the expertise and solutions to help you grow with confidence.
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="vision-mission-grid">
            <div className="vision-mission-card">
              <span className="vision-mission-tag">Our Vision</span>
              <h3 className="vision-mission-heading">
                To Become India's Most Trusted Business Growth Partner
              </h3>
              <p className="vision-mission-body">
                We envision a future where businesses of every size have access to innovative digital strategies, intelligent automation, and measurable marketing solutions that empower them to compete, grow, and lead in an increasingly digital world.
                <br /><br />
                Our goal is not simply to become another marketing agency but to build long-term partnerships that create lasting business value.
              </p>
            </div>

            <div className="vision-mission-card">
              <span className="vision-mission-tag">Our Mission</span>
              <h3 className="vision-mission-heading">
                Driving Sustainable Business Growth Through Digital Excellence
              </h3>
              <p className="vision-mission-body">
                Our mission is to help businesses unlock their full potential by delivering integrated digital marketing solutions that combine creativity, technology, and data-driven decision-making.
                <br /><br />
                We bridge the gap between marketing spend and bottom-line revenue through scientific campaign execution and continuous optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Story */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="Founding Journey"
            title="Built on Passion. Driven by Purpose. Focused on Results."
          />

          <div className="story-box">
            <div className="story-content">
              <p>
                HIRANMAYE DIGITAL was founded with a simple yet powerful vision: to bridge the gap between marketing activities and real business outcomes.
              </p>
              <p>
                Many businesses invest heavily in digital marketing without seeing meaningful returns because they lack a clear strategy. We recognized the need for a more consultative, transparent, and results-oriented approach.
              </p>
              <p>
                From this vision, HIRANMAYE DIGITAL was established as a business growth partner that combines strategic planning, creative execution, advanced analytics, AI-powered marketing, and continuous optimization to deliver measurable success.
              </p>
              <p>
                Today, we continue to help businesses navigate the ever-changing digital landscape with confidence, clarity, and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values (6) */}
      <section className="home-section-padding home-section-alt">
        <div className="site-container">
          <SectionHeader
            eyebrow="Our Principles"
            title="The Principles That Guide Everything We Do"
            subtitle="Our core values define our client partnerships, operational standards, and commitment to excellence."
          />

          <div className="values-grid">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-card-item">
                <div className="feature-card-icon-box">
                  {valueIconMap[val.icon]}
                </div>
                <span className="value-badge">{val.badge}</span>
                <h3 className="feature-card-title">{val.title}</h3>
                <p className="feature-card-description">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose HIRANMAYE DIGITAL? (Pillars) */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="Why Us"
            title="Because Growth Requires More Than Marketing"
            subtitle="A holistic approach combining business strategy, artificial intelligence, and rigorous performance tracking."
          />

          <div className="feature-cards-grid">
            {whyChoosePillars.map((pillar, idx) => (
              <div key={idx} className="feature-card">
                <h3 className="feature-card-title" style={{ fontSize: '1.2rem', color: 'var(--brand-navy-900)' }}>
                  {pillar.title}
                </h3>
                <p className="feature-card-description">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="home-section-padding">
        <div className="site-container">
          <div className="final-cta-card">
            <h2 className="final-cta-title">Ready to Transform Your Business?</h2>
            <p className="final-cta-desc">
              Let's build a digital strategy that strengthens your brand, attracts the right audience, and delivers measurable business growth.
            </p>
            <div className="final-cta-buttons">
              <Button
                variant="contained"
                onClick={onOpenBooking}
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
              <Button
                variant="outlined"
                onClick={() => navigate('/contact')}
                sx={{
                  borderColor: '#FFFFFF !important',
                  color: '#FFFFFF !important',
                  fontWeight: 700,
                  py: 1.5,
                  px: 4
                }}
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
