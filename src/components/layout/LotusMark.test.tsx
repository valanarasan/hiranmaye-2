import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { LotusMark } from './LotusMark';

describe('LotusMark', () => {
  it('draws the five petals on the 100x62 viewBox', () => {
    const { container } = render(<LotusMark />);
    const svg = container.querySelector('svg')!;

    expect(svg).toHaveAttribute('viewBox', '0 0 100 62');
    expect(svg.querySelectorAll('path')).toHaveLength(5);
  });

  it('inherits its colour rather than carrying a fill of its own', () => {
    const { container } = render(<LotusMark />);
    const svg = container.querySelector('svg')!;

    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  /** Decorative: the mark always sits next to the wordmark, so it is not announced. */
  it('hides itself from assistive technology and from the tab order', () => {
    const { container } = render(<LotusMark />);
    const svg = container.querySelector('svg')!;

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
  });

  it('strokes at 2.6 by default', () => {
    const { container } = render(<LotusMark />);
    expect(container.querySelector('svg')).toHaveAttribute('stroke-width', '2.6');
  });

  it('accepts a heavier stroke weight', () => {
    const { container } = render(<LotusMark weight={5} />);
    expect(container.querySelector('svg')).toHaveAttribute('stroke-width', '5');
  });

  it('applies the caller class', () => {
    const { container } = render(<LotusMark className="mark" />);
    expect(container.querySelector('svg')).toHaveClass('mark');
  });
});
