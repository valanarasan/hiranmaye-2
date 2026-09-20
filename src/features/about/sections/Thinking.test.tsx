import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Thinking } from './Thinking';
import { thinking } from '@/content/about';

describe('Thinking', () => {
  /** The lead is written into the component so it can carry its own emphasis markup. */
  it('renders the lead as the level-2 heading that labels the section', () => {
    render(<Thinking />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'The Internet is no longer the marketplace. It’s the infrastructure.',
    });
    expect(heading).toHaveAttribute('id', 'thinking-title');
    expect(screen.getByRole('region', { name: /no longer the marketplace/ })).toHaveAttribute(
      'aria-labelledby',
      'thinking-title',
    );
  });

  it('emphasises the second half of the lead', () => {
    const { container } = render(<Thinking />);

    expect(container.querySelector('em')).toHaveTextContent('It’s the infrastructure.');
  });

  it('renders one paragraph per entry in the thinking content', () => {
    const { container } = render(<Thinking />);

    expect(container.querySelectorAll('p')).toHaveLength(thinking.paragraphs.length);
    thinking.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('staggers the prose behind the heading', () => {
    render(<Thinking />);

    const body = screen.getByText(thinking.paragraphs[0]).parentElement!;
    expect(body.style.getPropertyValue('--_delay')).toBe('80ms');
  });
});
