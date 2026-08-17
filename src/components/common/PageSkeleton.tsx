import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="page-skeleton-container">
      <div className="spinner-orbit" />
      <div className="skeleton-loading-text">Loading Experience...</div>
    </div>
  );
};
