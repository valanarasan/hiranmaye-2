import React from 'react';
import { Box, Typography } from '@mui/material';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  maxWidth?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  maxWidth = 720
}) => {
  return (
    <Box
      sx={{
        textAlign: align,
        maxWidth: maxWidth,
        mx: align === 'center' ? 'auto' : 0,
        mb: { xs: 4, md: 6 }
      }}
    >
      {eyebrow && (
        <span className="eyebrow-badge">
          {eyebrow}
        </span>
      )}
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: '1.85rem', sm: '2.3rem', md: '2.8rem' },
          color: 'var(--brand-navy-900)',
          mb: subtitle ? 2 : 0
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: 'var(--text-secondary)',
            lineHeight: 1.7
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
