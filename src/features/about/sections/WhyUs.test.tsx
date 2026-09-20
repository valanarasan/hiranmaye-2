import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WhyUs } from './WhyUs';
import { whyUs } from '@/content/about';

const numbered = (index: number) => String(index + 1).padStart(2, '0');

describe('WhyUs', () => {
  it('anchors itself at #why-us for the in-page links that point here', () => {
    render(<WhyUs />);

    const region = screen.getByRole('region', {
      name: 'Six things that change how the work gets done.',
    });
    expect(region).toHaveAttribute('id', 'why-us');
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'why-us-title');
  });

  it('renders the eyebrow above the heading', () => {
    render(<WhyUs />);

    expect(screen.getByText('Why us')).toBeInTheDocument();
  });

  it('renders one accordion trigger per reason, numbered from 01', () => {
    render(<WhyUs />);

    const triggers = screen.getAllByRole('button');
    expect(triggers).toHaveLength(whyUs.length);

    whyUs.forEach((item, index) => {
      expect(triggers[index]).toHaveAccessibleName(`${numbered(index)}${item.title}`);
    });
  });

  it('renders every reason body', () => {
    render(<WhyUs />);

    whyUs.forEach((item) => {
      expect(screen.getByText(item.body)).toBeInTheDocument();
    });
  });

  it('opens the first reason by default and leaves the rest closed', () => {
    render(<WhyUs />);

    const triggers = screen.getAllByRole('button');
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
    triggers.slice(1).forEach((trigger) => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('opens another reason and closes the first', async () => {
    const user = userEvent.setup();
    render(<WhyUs />);

    const triggers = screen.getAllByRole('button');
    await user.click(triggers[2]);

    expect(triggers[2]).toHaveAttribute('aria-expanded', 'true');
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
  });
});
