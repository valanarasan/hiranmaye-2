import React from 'react';

export const Hero3DFallback: React.FC = () => {
  return (
    <div className="hero-3d-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div 
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(15, 23, 42, 0.04) 50%, transparent 80%)',
          border: '1px dashed rgba(15, 23, 42, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulseGlow 3s ease-in-out infinite'
        }}
      >
        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.8) 0%, rgba(15, 23, 42, 0.95) 80%)',
          boxShadow: '0 0 50px rgba(15, 23, 42, 0.3)'
        }} />
      </div>
    </div>
  );
};
