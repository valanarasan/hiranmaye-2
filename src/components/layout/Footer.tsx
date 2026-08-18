import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../../data/companyData';
import { servicesData } from '../../data/servicesData';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '8px' }}>
              <BrandLogo size="md" showTagline={true} />
            </Link>

            <p className="footer-brand-desc">
              HIRANMAYE DIGITAL is a full-service digital marketing agency based in Bangalore, dedicated to helping ambitious businesses grow through strategic marketing, intelligent automation, and measurable performance.
            </p>

            <div className="footer-social-links">
              <a href={companyInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={companyInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href={companyInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="Google Maps">
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/">Home</Link></li>
              <li className="footer-link-item"><Link to="/about">About Us</Link></li>
              <li className="footer-link-item"><Link to="/services">All Services</Link></li>
              <li className="footer-link-item"><Link to="/blog">Insights & Blog</Link></li>
              <li className="footer-link-item"><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links-list">
              {servicesData.slice(0, 6).map((svc) => (
                <li key={svc.id} className="footer-link-item">
                  <Link to="/services">{svc.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div>
            <h4 className="footer-heading">Headquarters</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--brand-blue-600)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{companyInfo.address}</span>
              </li>
              <li className="footer-link-item" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="var(--brand-blue-600)" style={{ flexShrink: 0 }} />
                <a href={`tel:${companyInfo.phone}`}>{companyInfo.phoneDisplay}</a>
              </li>
              <li className="footer-link-item" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} color="var(--brand-blue-600)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </li>
              <li className="footer-link-item" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Clock size={18} color="var(--brand-blue-600)" style={{ flexShrink: 0 }} />
                <span>Mon – Fri: 9:30 AM – 6:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} Hiranmaye Digital. All rights reserved. Strategy drives growth.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
