import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Process } from './Process';
import { processSteps } from '@/content/home';
import { hasClassKey } from '@/test/utils';

describe('Process', () => {
  it('heads the dark band with an inverted section header', () => {
    render(<Process />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'From “we need marketing” to “we know what’s working.”',
    });
    expect(heading).toHaveAttribute('id', 'process-title');
    expect(hasClassKey(heading, 'toneInverse')).toBe(true);
    expect(hasClassKey(screen.getByText('How we work'), 'toneInverseMuted')).toBe(true);
  });

  it('renders the steps as an ordered list, one item per step', () => {
    render(<Process />);

    expect(screen.getAllByRole('listitem')).toHaveLength(processSteps.length);
    expect(screen.getByRole('list').tagName).toBe('OL');
  });

  it.each(processSteps.map((step) => [step.title, step] as const))(
    'renders the %s step with its number, headline and body',
    (_title, step) => {
      render(<Process />);

      expect(screen.getByText(step.index)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: step.title })).toBeInTheDocument();
      expect(screen.getByText(step.headline)).toBeInTheDocument();
      expect(screen.getByText(step.body)).toBeInTheDocument();
    },
  );

  it('staggers each step by its position', () => {
    render(<Process />);

    screen.getAllByRole('listitem').forEach((item, index) => {
      expect(item.style.getPropertyValue('--_delay')).toBe(`${index * 70}ms`);
    });
  });
});
