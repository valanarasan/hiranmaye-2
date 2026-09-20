import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { Story } from './Story';
import { story } from '@/content/about';
import { hasClassKey } from '@/test/utils';
import { triggerIntersection } from '@/test/setup';

describe('Story', () => {
  it('labels its section with the "Our story" eyebrow', () => {
    render(<Story />);

    const region = screen.getByRole('region', { name: 'Our story' });
    expect(region).toHaveAttribute('aria-labelledby', 'story-title');
    expect(screen.getByText('Our story')).toHaveAttribute('id', 'story-title');
  });

  /** The founding question is the section's whole point, so the wording is asserted verbatim. */
  it('renders the founding question', () => {
    render(<Story />);

    expect(
      screen.getByText(
        'Why is so much marketing so busy, and so little of it actually connected to growth?',
      ),
    ).toBeInTheDocument();
  });

  it('renders the answer paragraph from the story content', () => {
    render(<Story />);

    expect(screen.getByText(story.paragraphs[1])).toBeInTheDocument();
  });

  it('renders a decorative opening quote mark', () => {
    const { container } = render(<Story />);

    const mark = container.querySelector('[aria-hidden="true"]');
    expect(mark).toHaveTextContent('“');
  });

  it('reveals the block once it enters the viewport', () => {
    render(<Story />);
    const wrap = screen.getByText('Our story').parentElement!;

    expect(hasClassKey(wrap, 'visible')).toBe(false);
    act(() => triggerIntersection(true));
    expect(hasClassKey(wrap, 'visible')).toBe(true);
  });
});
