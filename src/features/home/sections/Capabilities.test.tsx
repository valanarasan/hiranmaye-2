import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Capabilities } from './Capabilities';
import { pillars } from '@/content/home';
import { renderWithRouter } from '@/test/utils';

describe('Capabilities', () => {
  it('heads the section with its eyebrow and titled heading', () => {
    renderWithRouter(<Capabilities />);

    expect(screen.getByText('Capabilities')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'One growth partner. Multiple growth levers.' }),
    ).toHaveAttribute('id', 'capabilities-title');
    expect(
      screen.getByRole('region', { name: 'One growth partner. Multiple growth levers.' }),
    ).toBeInTheDocument();
  });

  it('offers a route to the full services page beside the heading', () => {
    renderWithRouter(<Capabilities />);

    expect(screen.getByRole('link', { name: 'Explore our capabilities' })).toHaveAttribute(
      'href',
      '/services',
    );
  });

  it('renders one row per pillar', () => {
    renderWithRouter(<Capabilities />);

    // One link per pillar plus the single "explore" button at the head.
    expect(screen.getAllByRole('link')).toHaveLength(pillars.length + 1);
  });

  it.each(pillars.map((pillar, index) => [pillar.label, pillar, index] as const))(
    'renders %s with its number, promise and destination',
    (_label, pillar, index) => {
      renderWithRouter(<Capabilities />);

      const label = screen.getByText(pillar.label);
      expect(label.closest('a')).toHaveAttribute('href', pillar.to);
      expect(screen.getByText(String(index + 1).padStart(2, '0'))).toBeInTheDocument();
      expect(screen.getByText(pillar.promise)).toBeInTheDocument();
    },
  );

  it('lists every capability of every pillar', () => {
    renderWithRouter(<Capabilities />);

    pillars.forEach((pillar) => {
      pillar.capabilities.forEach((capability) => {
        expect(screen.getByText(capability)).toBeInTheDocument();
      });
    });
  });

  it('staggers each row by its position in the list', () => {
    renderWithRouter(<Capabilities />);

    pillars.forEach((pillar, index) => {
      const reveal = screen.getByText(pillar.label).closest('a')!.parentElement!;
      expect(reveal.style.getPropertyValue('--_delay')).toBe(`${index * 55}ms`);
    });
  });
});
