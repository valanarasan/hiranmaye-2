import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrustStrip } from './TrustStrip';
import { trust } from '@/content/home';

describe('TrustStrip', () => {
  it('names the strip for what it shows', () => {
    render(<TrustStrip />);

    expect(screen.getByRole('region', { name: 'Who we work with' })).toBeInTheDocument();
  });

  it('renders the headline as a level-4 heading', () => {
    render(<TrustStrip />);

    expect(screen.getByRole('heading', { level: 4, name: trust.headline })).toBeInTheDocument();
  });

  it('renders every stage of ambition', () => {
    render(<TrustStrip />);

    trust.stages.forEach((stage) => {
      expect(screen.getByText(stage)).toBeInTheDocument();
    });
  });

  /** Arrows sit between stages, never before the first — one fewer than the stages. */
  it('separates the stages with one decorative arrow fewer than there are stages', () => {
    render(<TrustStrip />);

    const stages = screen.getByText(trust.stages[0]).parentElement!;
    const arrows = stages.querySelectorAll('[aria-hidden="true"]');

    expect(arrows).toHaveLength(trust.stages.length - 1);
    arrows.forEach((arrow) => expect(arrow).toHaveTextContent('→'));
    expect(stages.firstElementChild).toHaveTextContent(trust.stages[0]);
  });

  it('marquees the industries and leaves a readable copy for screen readers', () => {
    render(<TrustStrip />);

    // The marquee duplicates its group for a seamless loop, so each name appears twice.
    trust.industries.forEach((industry) => {
      expect(screen.getAllByText(industry)).toHaveLength(2);
    });
    expect(screen.getByText(trust.industries.join(', '))).toBeInTheDocument();
  });
});
