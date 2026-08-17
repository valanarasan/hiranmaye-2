import React from 'react';
import { ServiceItem } from '../../types';
import { 
  Compass, Share2, Layout, Sparkles, FileText, 
  TrendingUp, Bot, Search, Target, Briefcase, Eye 
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onClick: (service: ServiceItem) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass size={24} />,
  Share2: <Share2 size={24} />,
  Layout: <Layout size={24} />,
  Sparkles: <Sparkles size={24} />,
  FileText: <FileText size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Bot: <Bot size={24} />,
  Search: <Search size={24} />,
  Target: <Target size={24} />,
  Briefcase: <Briefcase size={24} />,
  Eye: <Eye size={24} />
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <div className="service-card" onClick={() => onClick(service)}>
      <div>
        <div className="service-card-top">
          <span className="service-number">{service.number}</span>
          <div className="service-card-icon">
            {iconMap[service.icon] || <Sparkles size={24} />}
          </div>
        </div>

        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-sub">{service.subtitle}</p>
        <p className="service-card-desc">{service.description}</p>
      </div>

      <div className="service-card-cta">
        {service.ctaText}
      </div>
    </div>
  );
};
