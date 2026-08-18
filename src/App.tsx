import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { muiTheme } from './theme/muiTheme';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingDock } from './components/layout/FloatingDock';
import { PageSkeleton } from './components/common/PageSkeleton';
import { BookingModal } from './components/modals/BookingModal';

// Stylesheets (Separated CSS Modules)
import './styles/globals.css';
import './styles/animations.css';
import './styles/components/navbar.css';
import './styles/components/hero3d.css';
import './styles/components/cards.css';
import './styles/components/calculator.css';
import './styles/components/modals.css';
import './styles/components/dock.css';
import './styles/components/footer.css';
import './styles/components/skeleton.css';
import './styles/pages/home.css';
import './styles/pages/about.css';
import './styles/pages/services.css';
import './styles/pages/blog.css';
import './styles/pages/contact.css';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

export const App: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string>('');

  const handleOpenBooking = (serviceName?: string) => {
    setBookingService(serviceName || '');
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router basename={import.meta.env.BASE_URL}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Global Sticky Navbar */}
          <Navbar onOpenBooking={() => handleOpenBooking()} />

          {/* Main Content View with Suspense Lazy Loading */}
          <div style={{ flexGrow: 1 }}>
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
                <Route path="/about" element={<AboutPage onOpenBooking={() => handleOpenBooking()} />} />
                <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/blog" element={<BlogPage onOpenBooking={() => handleOpenBooking()} />} />
                <Route path="/contact" element={<ContactPage onOpenBooking={() => handleOpenBooking()} />} />
                <Route path="*" element={<HomePage onOpenBooking={handleOpenBooking} />} />
              </Routes>
            </Suspense>
          </div>

          {/* Global Semantic Footer */}
          <Footer />

          {/* Floating Action Dock (WhatsApp & Booking) */}
          <FloatingDock onOpenBooking={() => handleOpenBooking()} />

          {/* Global Consultation Booking Scheduler Modal */}
          <BookingModal
            open={bookingOpen}
            onClose={handleCloseBooking}
            initialService={bookingService}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
