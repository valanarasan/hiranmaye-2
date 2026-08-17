import React, { useState } from 'react';
import { 
  Button, Accordion, 
  AccordionSummary, AccordionDetails, Snackbar, Alert 
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Search, BookOpen, Mail, CheckCircle2 } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';
import { SectionHeader } from '../components/common/SectionHeader';
import { BlogCard } from '../components/common/BlogCard';
import { BlogReaderModal } from '../components/modals/BlogReaderModal';
import { pillarArticles, faqData } from '../data/blogData';
import { BlogPost } from '../types';

interface BlogPageProps {
  onOpenBooking: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedToast, setSubscribedToast] = useState(false);

  usePageSEO({
    title: 'Digital Marketing Blog | SEO, AI Marketing, Branding & Growth Insights',
    description: 'Stay informed with HIRANMAYE DIGITAL\'s expert blog covering digital marketing, SEO, AEO, GEO, AI-powered marketing, website design, branding, Meta Ads, Google Ads, and business growth strategies.',
    keywords: 'Digital Marketing Blog, SEO Blog India, AI Marketing Blog, Business Growth Strategies, Website Design Tips, Branding Insights, Google Ads Guide, Meta Ads Guide, SEO AEO GEO'
  });

  const allArticles = pillarArticles;

  const filteredArticles = allArticles.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribedToast(true);
    setNewsletterEmail('');
  };

  const whyReadPoints = [
    'Research-backed marketing frameworks',
    'Practical, immediately actionable blueprints',
    'SEO and AI search optimized insights',
    'Regularly updated with algorithmic shifts',
    'Written specifically for founders & marketing heads',
    'Laser-focused on solving real pipeline bottlenecks'
  ];

  return (
    <main>
      {/* 1. Header & Search */}
      <section className="blog-hero-section">
        <div className="site-container">
          <span className="eyebrow-badge animate-float">
            <BookOpen size={14} /> Insights & Knowledge
          </span>

          <h1 className="about-hero-title">
            Digital Growth Insights & <span className="brand-gradient-text">Marketing Intelligence</span>
          </h1>

          <p className="about-hero-desc">
            Explore cutting-edge strategies, algorithmic updates, AI search breakthroughs, and proven growth blueprints curated by our senior marketing strategists.
          </p>

          <div className="blog-search-bar-wrap">
            <Search size={20} className="blog-search-icon" />
            <input
              type="text"
              placeholder="Search articles on SEO, AI, Meta Ads, Funnels, ROI..."
              className="blog-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>
        </div>
      </section>

      {/* 2. Popular Articles Section */}
      <section className="home-section-padding" style={{ paddingTop: 20 }}>
        <div className="site-container">
          <SectionHeader
            eyebrow="Popular Reads"
            title="Most Read by Business Leaders"
            subtitle="Explore our top-performing strategic guides and frameworks designed for founders and CMOs."
            align="left"
          />

          <div className="articles-grid">
            {filteredArticles.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={(item) => setSelectedPost(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Newsletter Subscription Section */}
      <section className="site-container">
        <div className="newsletter-card">
          <span className="eyebrow-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
            <Mail size={14} /> Weekly Briefing
          </span>
          <h2 className="final-cta-title" style={{ fontSize: '2.2rem' }}>Stay Ahead of Digital Trends</h2>
          <p className="final-cta-desc" style={{ maxWidth: 540 }}>
            Subscribe to receive expert insights, practical marketing strategies, industry updates, and exclusive resources delivered directly to your inbox.
          </p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your business email"
              className="newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              aria-label="Business email for newsletter"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#FFFFFF !important',
                color: 'var(--brand-navy-950) !important',
                fontWeight: 800,
                px: 3,
                py: 1.5,
                whiteSpace: 'nowrap'
              }}
            >
              Subscribe Now
            </Button>
          </form>
        </div>
      </section>

      {/* 4. Why Read Our Blog? */}
      <section className="home-section-padding home-section-alt">
        <div className="site-container">
          <SectionHeader
            eyebrow="Why Read Our Blog"
            title="Knowledge That Helps Your Business Grow"
            subtitle="Our content is created by digital marketing professionals with one goal—to help businesses make informed decisions and achieve measurable growth."
          />

          <div className="feature-cards-grid">
            {whyReadPoints.map((point, idx) => (
              <div key={idx} className="feature-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={22} color="var(--brand-blue-600)" style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, color: 'var(--brand-navy-900)', fontSize: '1.05rem' }}>{point}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="home-section-padding">
        <div className="site-container">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Got questions about our insights, frequency, or topics? Find quick answers below."
          />

          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            {faqData.map((faq, idx) => (
              <Accordion key={idx} className="faq-accordion-item">
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'var(--brand-navy-900)' }} />}>
                  <span className="faq-question-text">{faq.question}</span>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="faq-answer-text">{faq.answer}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="home-section-padding home-section-alt">
        <div className="site-container">
          <div className="final-cta-card">
            <h2 className="final-cta-title">Ready to Turn Insights into Results?</h2>
            <p className="final-cta-desc">
              Reading about digital marketing is the first step. Implementing the right strategy is what drives business growth. Partner with HIRANMAYE DIGITAL to transform ideas into measurable results.
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
            </div>
          </div>
        </div>
      </section>

      {/* Blog Reader Modal */}
      <BlogReaderModal
        post={selectedPost}
        open={Boolean(selectedPost)}
        onClose={() => setSelectedPost(null)}
        onSelectPost={(post) => setSelectedPost(post)}
        allPosts={allArticles}
      />

      {/* Subscription Toast */}
      <Snackbar
        open={subscribedToast}
        autoHideDuration={4000}
        onClose={() => setSubscribedToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', borderRadius: '12px', bgcolor: '#ECFDF5', color: '#047857' }}>
          Thank you for subscribing to HIRANMAYE DIGITAL growth insights!
        </Alert>
      </Snackbar>
    </main>
  );
};
