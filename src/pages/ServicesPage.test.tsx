import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import { seo } from '@/content/seo';
import { services, servicesHero } from '@/content/services';
import { renderWithRouter } from '@/test/utils';
import ServicesPage from './ServicesPage';

describe('ServicesPage', () => {
  it('sets the capabilities page metadata', () => {
    renderWithRouter(<ServicesPage />);

    expect(document.title).toBe(seo.services.title);
    expect(document.head.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      seo.services.description,
    );
  });

  it('opens with the capabilities hero', () => {
    renderWithRouter(<ServicesPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: servicesHero.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText(servicesHero.lead)).toBeInTheDocument();
  });

  it('lists every capability in both the index and the body', () => {
    renderWithRouter(<ServicesPage />);

    const nav = screen.getByRole('navigation', { name: 'Capabilities' });
    expect(within(nav).getAllByRole('link')).toHaveLength(services.length);
    expect(screen.getAllByRole('article')).toHaveLength(services.length);
    services.forEach((service) => {
      expect(screen.getByRole('heading', { level: 2, name: service.title })).toBeInTheDocument();
    });
  });

  it('closes with a call to action written for this page', () => {
    renderWithRouter(<ServicesPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Not sure which lever moves your business first?',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ask us' })).toHaveAttribute('href', '/contact');
  });
});
