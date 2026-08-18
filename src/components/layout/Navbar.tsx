import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Button, IconButton, Drawer, List, ListItem, 
  ListItemButton, ListItemText, Box, Typography 
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Insights & Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="navbar-container">
        {/* Brand Logo with Official Golden Lotus */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <BrandLogo size="sm" showTagline={true} />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="nav-actions-desktop">
          <Button
            variant="contained"
            color="primary"
            onClick={onOpenBooking}
            sx={{ fontWeight: 700, fontSize: '0.9rem' }}
          >
            Free Strategy Call
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <IconButton
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          sx={{ color: 'var(--plum-800)' }}
          aria-label="open mobile menu"
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            sx: {
              width: 280,
              bgcolor: '#FFFFFF',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Link to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
                <BrandLogo size="sm" showTagline={true} />
              </Link>
              <IconButton onClick={() => setMobileOpen(false)} size="small" aria-label="close mobile menu">
                <CloseIcon />
              </IconButton>
            </Box>

            <List disablePadding>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      sx={{
                        borderRadius: '10px',
                        bgcolor: isActive ? 'var(--bg-accent-soft)' : 'transparent',
                        color: isActive ? 'var(--plum-800)' : 'var(--text-secondary)',
                        fontWeight: isActive ? 700 : 500
                      }}
                    >
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box sx={{ pt: 2, borderTop: '1px solid var(--border-subtle)' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
            >
              Book Strategy Session
            </Button>
            <Typography
              variant="caption"
              sx={{ display: 'block', textAlign: 'center', mt: 2, color: 'var(--text-muted)' }}
            >
              +91 99006 68383 • Bangalore
            </Typography>
          </Box>
        </Drawer>
      </nav>
    </header>
  );
};
