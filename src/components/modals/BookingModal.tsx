import React, { useState } from 'react';
import { 
  Dialog, IconButton, Typography, Box, Button, TextField, 
  MenuItem, Grid, Alert 
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { CheckCircle } from 'lucide-react';
import { servicesData } from '../../data/servicesData';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  initialService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  initialService = ''
}) => {
  const [selectedService, setSelectedService] = useState(initialService);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleReset}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'modal-custom-dialog'
      }}
    >
      <div className="modal-header-gradient">
        <IconButton className="modal-close-btn" onClick={handleReset} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.85 }}>
          One-on-One Session
        </span>
        <Typography variant="h5" component="h3" sx={{ color: '#FFFFFF', fontWeight: 800, mt: 0.5 }}>
          Book a Free Strategy Consultation
        </Typography>
      </div>

      <div className="modal-body-content">
        {submitted ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle size={56} color="#10B981" style={{ margin: '0 auto 16px' }} />
            <Typography variant="h5" sx={{ color: 'var(--plum-800)', fontWeight: 800, mb: 1 }}>
              Consultation Requested!
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--text-secondary)', maxWidth: 420, mx: 'auto', mb: 3 }}>
              Thank you, <strong>{fullName}</strong>. A HIRANMAYE digital growth specialist will reach out within 1 business day to confirm your consultation schedule.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleReset}>
              Done
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Alert severity="info" sx={{ mb: 3, borderRadius: '12px', bgcolor: 'var(--bg-accent-soft)', color: 'var(--plum-800)' }}>
              Discuss your growth roadmap, audit existing channels, and get actionable recommendations with our senior partners.
            </Alert>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name *"
                  size="small"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address *"
                  type="email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number *"
                  size="small"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Primary Service of Interest"
                  size="small"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <MenuItem value="">General Growth Strategy Consultation</MenuItem>
                  {servicesData.map((svc) => (
                    <MenuItem key={svc.id} value={svc.title}>
                      {svc.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Date"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Preferred Time Slot"
                  size="small"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <MenuItem value="10:00 AM">10:00 AM – 11:00 AM</MenuItem>
                  <MenuItem value="11:30 AM">11:30 AM – 12:30 PM</MenuItem>
                  <MenuItem value="02:30 PM">02:30 PM – 03:30 PM</MenuItem>
                  <MenuItem value="04:30 PM">04:30 PM – 05:30 PM</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 2, borderTop: '1px solid var(--border-subtle)' }}>
              <Button variant="outlined" onClick={handleReset}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Confirm Strategy Booking
              </Button>
            </Box>
          </form>
        )}
      </div>
    </Dialog>
  );
};
