import React from 'react';
import { Dialog, IconButton, Button, Typography, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { CheckCircle, Zap } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  open: boolean;
  onClose: () => void;
  onBookConsultation: (serviceName?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  open,
  onClose,
  onBookConsultation
}) => {
  if (!service) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: 'modal-custom-dialog'
      }}
    >
      <div className="modal-header-gradient">
        <IconButton className="modal-close-btn" onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.85 }}>
          Service {service.number}
        </span>
        <Typography variant="h4" component="h3" sx={{ color: '#FFFFFF', fontWeight: 800, mt: 0.5 }}>
          {service.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.9)', mt: 0.5 }}>
          {service.subtitle}
        </Typography>
      </div>

      <div className="modal-body-content">
        <Typography variant="body1" sx={{ color: 'var(--text-secondary)', lineHeight: 1.8, mb: 3 }}>
          {service.description}
        </Typography>

        {service.subsections && (
          <Box sx={{ my: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {service.subsections.map((sub, idx) => (
              <Box 
                key={idx} 
                sx={{ 
                  p: 2.5, 
                  borderRadius: '12px', 
                  bgcolor: 'var(--bg-accent-soft)',
                  border: '1px solid rgba(15, 23, 42, 0.08)'
                }}
              >
                <Typography variant="h6" sx={{ color: 'var(--brand-navy-900)', fontSize: '1.05rem', mb: 0.5 }}>
                  {sub.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {sub.description}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {service.deliverables && (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" sx={{ color: 'var(--brand-navy-900)', mb: 1.5, fontSize: '1.1rem' }}>
              Key Deliverables & Capabilities
            </Typography>
            <ul className="deliverables-list">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="deliverable-item">
                  <CheckCircle size={18} className="deliverable-check-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Box>
        )}

        {service.growthImpact && (
          <Box 
            sx={{ 
              p: 2.5, 
              borderRadius: '12px', 
              bgcolor: '#F0F9FF', 
              borderLeft: '4px solid var(--brand-blue-600)',
              mb: 4 
            }}
          >
            <Typography variant="subtitle2" sx={{ color: 'var(--brand-blue-600)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Zap size={16} /> Measurable Business Impact
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5, lineHeight: 1.6 }}>
              {service.growthImpact}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2, borderTop: '1px solid var(--border-subtle)' }}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              onClose();
              onBookConsultation(service.title);
            }}
          >
            Schedule Strategy Consultation
          </Button>
        </Box>
      </div>
    </Dialog>
  );
};
