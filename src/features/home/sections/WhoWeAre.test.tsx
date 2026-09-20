import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhoWeAre } from './WhoWeAre';
import { whoWeAre, whoWeAreCloser } from '@/content/home';
import { hasClassKey } from '@/test/utils';

describe('WhoWeAre', () => {
  it('renders the lead as the level-2 heading that labels the section', () => {
    render(<WhoWeAre />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Most businesses don’t have a marketing problem. They have a fragmentation problem.',
    });
    expect(heading).toHaveAttribute('id', 'who-we-are-title');
    expect(screen.getByRole('region', { name: /fragmentation problem/ })).toBeInTheDocument();
  });

  it('emphasises the diagnosis in the second half of the lead', () => {
    const { container } = render(<WhoWeAre />);

    expect(container.querySelector('h2 em')).toHaveTextContent('They have a fragmentation problem.');
  });

  it('renders one paragraph per entry plus the closer', () => {
    const { container } = render(<WhoWeAre />);

    expect(container.querySelectorAll('p')).toHaveLength(whoWeAre.paragraphs.length + 1);
    whoWeAre.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
    expect(screen.getByText(whoWeAreCloser)).toBeInTheDocument();
  });

  /** The second paragraph is the turn in the argument, so it alone keeps full contrast. */
  it('emphasises the second paragraph and mutes the rest', () => {
    render(<WhoWeAre />);

    whoWeAre.paragraphs.forEach((paragraph, index) => {
      const node = screen.getByText(paragraph);
      expect(hasClassKey(node, 'emphasis')).toBe(index === 1);
      expect(hasClassKey(node, 'toneMuted')).toBe(index !== 1);
    });
  });
});
