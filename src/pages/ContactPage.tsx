import React, { useState } from 'react';
import { 
  Button, Typography, Box, TextField, MenuItem, 
  Snackbar, Alert, CircularProgress 
} from '@mui/material';
import { 
  MapPin, Phone, Mail, Send, MessageCircle, 
  Calendar, ExternalLink, Sparkles 
} from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';
import { companyInfo } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { ConsultationFormData } from '../types';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    location: '',
    goals: '',
    preferredService: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  usePageSEO({
    title: 'Contact Us | Digital Marketing Agency in Bangalore',
    description: 'Get in touch with HIRANMAYE DIGITAL for expert digital marketing, SEO, AI-powered marketing, website development, branding, Meta Ads, Google Ads, and business consulting.',
    keywords: 'Contact Digital Marketing Agency Bangalore, Digital Marketing Consultant Bangalore, SEO Agency Contact, Website Development Company Bangalore, Book Free Marketing Consultation'
  });

  const handleChange = (field: keyof ConsultationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.goals) {
      return;
    }

    setIsSubmitting(true);

    // Simulate instant asynchronous dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setToastOpen(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        location: '',
        goals: '',
        preferredService: ''
      });
    }, 800);
  };

  return (
    <main>
      {/* 1. Header Section */}
      <section className="contact-page-header">
        <div className="site-container">
          <span className="eyebrow-badge animate-float">
            <Sparkles size={14} /> Direct Growth Channel
          </span>

          <h1 className="about-hero-title">
            Let's Build Your <span className="brand-gradient-text">Growth Trajectory</span>
          </h1>

          <p className="about-hero-desc">
            We're always ready to discuss your business goals and explore how strategic digital marketing can help you achieve sustainable, measurable growth.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="site-container">
        <div className="contact-main-grid">
          {/* Left Column: Headquarters Details & Hours */}
          <div className="contact-info-panel">
            <div className="contact-info-card">
              <Typography variant="h5" sx={{ color: 'var(--brand-navy-900)', fontWeight: 800, mb: 3 }}>
                Bangalore Headquarters
              </Typography>

              <div className="contact-info-row">
                <div className="contact-icon-box">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="contact-info-lbl">Office Location</div>
                  <div className="contact-info-val">
                    {companyInfo.name} — {companyInfo.address}
                  </div>
                  <a 
                    href={companyInfo.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', color: 'var(--brand-blue-600)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4 }}
                  >
                    Open in Google Maps <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-icon-box">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="contact-info-lbl">Phone Support</div>
                  <div className="contact-info-val">
                    <a href={`tel:${companyInfo.phone}`}>{companyInfo.phoneDisplay}</a>
                  </div>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="contact-icon-box">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="contact-info-lbl">Official Email</div>
                  <div className="contact-info-val">
                    <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="contact-info-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Typography variant="h6" sx={{ color: 'var(--brand-navy-900)', fontWeight: 700 }}>
                  Business Hours
                </Typography>
                <div className="hours-status-pill">
                  <div className="status-dot-pulse" />
                  <span>Open for Inquiries</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {companyInfo.businessHours.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: item.isWorkday ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                    <span style={{ fontWeight: item.isWorkday ? 600 : 400 }}>{item.days}</span>
                    <span style={{ fontWeight: 700, color: item.isWorkday ? 'var(--brand-navy-900)' : 'var(--text-muted)' }}>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Message Contact Form */}
          <div className="contact-form-card">
            <Typography variant="h4" sx={{ color: 'var(--brand-navy-900)', fontWeight: 800, mb: 1 }}>
              Tell Us About Your Project
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
              Complete the form below, and one of our digital growth specialists will get in touch with you within one business day.
            </Typography>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div>
                  <TextField
                    fullWidth
                    label="Full Name *"
                    size="small"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    label="Company Name"
                    size="small"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    label="Email Address *"
                    type="email"
                    size="small"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    label="Phone Number *"
                    size="small"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="form-full-width">
                  <TextField
                    fullWidth
                    label="Business Location (City / State)"
                    size="small"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>
                <div className="form-full-width">
                  <TextField
                    select
                    fullWidth
                    label="Primary Service Needed"
                    size="small"
                    value={formData.preferredService}
                    onChange={(e) => handleChange('preferredService', e.target.value)}
                  >
                    <MenuItem value="">General Growth Strategy</MenuItem>
                    {servicesData.map((svc) => (
                      <MenuItem key={svc.id} value={svc.title}>
                        {svc.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="form-full-width">
                  <TextField
                    fullWidth
                    label="Tell Us About Your Business Goals *"
                    multiline
                    rows={4}
                    size="small"
                    value={formData.goals}
                    onChange={(e) => handleChange('goals', e.target.value)}
                    required
                    placeholder="Describe your target audience, current challenges, and growth targets..."
                  />
                </div>
              </div>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send size={18} />}
                  sx={{ py: 1.5, px: 4, fontWeight: 700 }}
                >
                  {isSubmitting ? 'Submitting Request...' : 'Request a Free Consultation'}
                </Button>
              </Box>
            </form>
          </div>
        </div>

        {/* 3. Quick Connect Cards: Schedule One-on-One + WhatsApp Support */}
        <div className="quick-connect-grid">
          <div className="quick-connect-card">
            <div>
              <div className="contact-icon-box" style={{ marginBottom: 16 }}>
                <Calendar size={22} />
              </div>
              <h3 className="feature-card-title">Schedule a One-on-One Consultation</h3>
              <p className="feature-card-description">
                Looking for expert guidance? Book a free strategy session with our team to discuss your business goals, identify growth opportunities, and receive actionable recommendations.
              </p>
            </div>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={onOpenBooking}
                fullWidth
                sx={{ py: 1.25, fontWeight: 700 }}
              >
                Schedule Consultation Now
              </Button>
            </Box>
          </div>

          <div className="quick-connect-card">
            <div>
              <div className="contact-icon-box" style={{ background: 'rgba(37, 211, 102, 0.12)', color: '#059669', marginBottom: 16 }}>
                <MessageCircle size={22} />
              </div>
              <h3 className="feature-card-title">Chat with Our Team on WhatsApp</h3>
              <p className="feature-card-description">
                Need a quick answer? Connect with us on WhatsApp for fast assistance, service inquiries, and immediate project discussions with our senior consultants.
              </p>
            </div>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                href={companyInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{
                  bgcolor: '#25D366 !important',
                  color: '#FFFFFF !important',
                  py: 1.25,
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#1EA952 !important' }
                }}
              >
                Chat on WhatsApp (+91 99006 68383)
              </Button>
            </Box>
          </div>
        </div>
      </section>

      {/* Success Feedback Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', borderRadius: '12px', bgcolor: '#ECFDF5', color: '#047857' }}>
          Thank you! Your inquiry has been received. Our digital growth team will contact you within 1 business day.
        </Alert>
      </Snackbar>
    </main>
  );
};
