import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VisionMission } from './VisionMission';
import { visionMission } from '@/content/about';

describe('VisionMission', () => {
  it('names the section for the pair it holds', () => {
    render(<VisionMission />);

    expect(screen.getByRole('region', { name: 'Vision and mission' })).toBeInTheDocument();
  });

  it.each(visionMission.map((item) => [item.label, item] as const))(
    'renders the %s card with its label, statement and body',
    (_label, item) => {
      render(<VisionMission />);

      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.statement)).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    },
  );

  it('renders exactly one card per entry', () => {
    const { container } = render(<VisionMission />);

    expect(container.querySelectorAll('p')).toHaveLength(visionMission.length * 2);
  });

  it('staggers each card by its position', () => {
    render(<VisionMission />);

    visionMission.forEach((item, index) => {
      const card = screen.getByText(item.label).parentElement!;
      expect(card.style.getPropertyValue('--_delay')).toBe(`${index * 90}ms`);
    });
  });
});
