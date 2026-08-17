import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0F172A', // Sovereign Midnight Slate
      light: '#1E3A8A',
      dark: '#0A1128',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#2563EB', // Royal Performance Blue
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#FAFBFC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#0F172A',
      secondary: '#334155'
    },
    divider: 'rgba(15, 23, 42, 0.08)'
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.01em',
      lineHeight: 1.18,
      color: '#0F172A'
    },
    h2: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.22,
      color: '#0F172A'
    },
    h3: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '0em',
      lineHeight: 1.28,
      color: '#0F172A'
    },
    h4: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '0em',
      color: '#0F172A'
    },
    h5: {
      fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: '0em',
      color: '#0F172A'
    },
    h6: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
      color: '#0F172A'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em'
    }
  },
  shape: {
    borderRadius: 14
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 26px',
          boxShadow: 'none',
          fontSize: '0.95rem',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 24px -8px rgba(15, 23, 42, 0.2)'
          }
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 60%, #2563EB 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #0A1128 0%, #172554 60%, #1D4ED8 100%)'
          }
        },
        outlinedPrimary: {
          borderColor: 'rgba(15, 23, 42, 0.2)',
          color: '#0F172A',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          '&:hover': {
            borderColor: '#2563EB',
            color: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.04)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 8px 30px -6px rgba(15, 23, 42, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }
      }
    }
  }
});
