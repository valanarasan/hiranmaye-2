import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export const BrandLotusIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size * (72 / 100)}
      viewBox="0 0 200 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C158" />
          <stop offset="50%" stopColor="#C89D46" />
          <stop offset="100%" stopColor="#A87A28" />
        </linearGradient>
      </defs>

      {/* Golden Lotus Petals Wireframe */}
      <g stroke="url(#goldGradient)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Center Vertical Petal */}
        <path d="M 100, 10 C 82, 45 82, 95 100, 125 C 118, 95 118, 45 100, 10 Z" />

        {/* Inner Left Petal */}
        <path d="M 100, 125 C 80, 115 52, 70 70, 22 C 86, 48 94, 90 100, 125 Z" />

        {/* Inner Right Petal */}
        <path d="M 100, 125 C 120, 115 148, 70 130, 22 C 114, 48 106, 90 100, 125 Z" />

        {/* Outer Left Petal */}
        <path d="M 100, 125 C 75, 124 25, 100 20, 52 C 45, 52 75, 80 100, 125 Z" />

        {/* Outer Right Petal */}
        <path d="M 100, 125 C 125, 124 175, 100 180, 52 C 155, 52 125, 80 100, 125 Z" />

        {/* Base Cradle Curve */}
        <path d="M 32, 66 C 45, 118 75, 134 100, 134 C 125, 134 155, 118 168, 66" strokeWidth="4" />
      </g>
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  showTagline = true,
  size = 'md',
  layout = 'horizontal',
  className = ''
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? '#FFFFFF' : '#0F172A';
  const taglineColor = isWhite ? '#E2E8F0' : '#475569';

  const iconSizes = {
    sm: 32,
    md: 42,
    lg: 64
  };

  const titleSizes = {
    sm: '1.05rem',
    md: '1.28rem',
    lg: '1.9rem'
  };

  const tagSizes = {
    sm: '0.72rem',
    md: '0.85rem',
    lg: '1.15rem'
  };

  if (layout === 'vertical') {
    return (
      <div 
        className={`brand-logo-vertical ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: size === 'lg' ? '12px' : '8px',
          textDecoration: 'none'
        }}
      >
        <BrandLotusIcon size={iconSizes[size] * 1.3} />
        <div>
          <div
            style={{
              fontFamily: '"Outfit", "Playfair Display", Georgia, serif',
              fontSize: titleSizes[size],
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.01em',
              lineHeight: 1.15
            }}
          >
            Hiranmaye Digital
          </div>
          {showTagline && (
            <div
              style={{
                fontFamily: '"Playfair Display", "Alex Brush", "Brush Script MT", cursive, serif',
                fontStyle: 'italic',
                fontSize: tagSizes[size],
                color: taglineColor,
                marginTop: '3px',
                letterSpacing: '0.02em',
                fontWeight: 500
              }}
            >
              Strategy drives growth
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`brand-logo-lockup ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size === 'sm' ? '10px' : '14px',
        textDecoration: 'none'
      }}
    >
      <BrandLotusIcon size={iconSizes[size]} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: '"Outfit", "Playfair Display", Georgia, serif',
            fontSize: titleSizes[size],
            fontWeight: 800,
            color: textColor,
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}
        >
          Hiranmaye Digital
        </span>
        {showTagline && (
          <span
            style={{
              fontFamily: '"Playfair Display", "Alex Brush", "Georgia", cursive, serif',
              fontStyle: 'italic',
              fontSize: tagSizes[size],
              color: taglineColor,
              letterSpacing: '0.02em',
              lineHeight: 1.2,
              marginTop: '1px'
            }}
          >
            Strategy drives growth
          </span>
        )}
      </div>
    </div>
  );
};
