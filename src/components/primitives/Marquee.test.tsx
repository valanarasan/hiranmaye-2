import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Marquee } from './Marquee';

const ITEMS = ['SEO', 'AEO', 'GEO'] as const;

describe('Marquee', () => {
  it('duplicates the run so the scroll can loop seamlessly', () => {
    const { container } = render(<Marquee items={ITEMS} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });

  it('hides the visual copies from assistive tech and offers one readable list', () => {
    render(<Marquee items={ITEMS} />);
    // The duplicated visual runs are hidden; the sr-only copy carries the text once.
    expect(screen.getByText('SEO, AEO, GEO')).toBeInTheDocument();
  });

  it('renders every item in each run', () => {
    const { container } = render(<Marquee items={ITEMS} />);
    const first = container.querySelectorAll('[aria-hidden="true"]')[0]!;

    expect(first.textContent).toBe('SEOAEOGEO');
  });

  it('exposes the duration as a custom property', () => {
    const { container } = render(<Marquee items={ITEMS} duration={12} />);
    const track = container.querySelector('[style]') as HTMLElement;

    expect(track.style.getPropertyValue('--_duration')).toBe('12s');
  });

  it('defaults the duration', () => {
    const { container } = render(<Marquee items={ITEMS} />);
    const track = container.querySelector('[style]') as HTMLElement;

    expect(track.style.getPropertyValue('--_duration')).toBe('46s');
  });

  it('handles an empty list without breaking', () => {
    render(<Marquee items={[]} />);
    expect(screen.getByText('', { selector: '.u-sr-only' })).toBeInTheDocument();
  });

  it('keeps caller classes', () => {
    const { container } = render(<Marquee items={ITEMS} className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
  });
});
