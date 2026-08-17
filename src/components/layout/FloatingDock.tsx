import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { companyInfo } from '../../data/companyData';

interface FloatingDockProps {
  onOpenBooking: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenBooking }) => {
  return (
    <div className="floating-dock-wrapper">
      <a
        href={companyInfo.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-dock-btn dock-whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="dock-btn-text">WhatsApp Us</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="floating-dock-btn dock-consult-btn"
        aria-label="Book Free Consultation"
      >
        <Sparkles size={18} />
        <span className="dock-btn-text">Free Strategy Call</span>
      </button>
    </div>
  );
};
