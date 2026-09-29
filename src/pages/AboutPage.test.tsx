import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import { aboutHero } from '@/content/about';
import { clients, clientsSection } from '@/content/clients';
import { team, teamSection } from '@/content/team';
import { seo } from '@/content/seo';
import { renderWithRouter } from '@/test/utils';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('sets the about page metadata', () => {
    renderWithRouter(<AboutPage />);

    expect(document.title).toBe(seo.about.title);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      seo.about.description,
    );
  });

  it('opens with the about hero and its paragraphs', () => {
    renderWithRouter(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1, name: aboutHero.headline })).toBeInTheDocument();
    aboutHero.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it.each([
    ['how we think', () => screen.getByRole('heading', { level: 2, name: /no longer the marketplace/i })],
    ['vision and mission', () => screen.getByRole('region', { name: 'Vision and mission' })],
    ['our story', () => screen.getByRole('region', { name: 'Our story' })],
    ['why us', () => screen.getByRole('heading', { level: 2, name: /Six things that change/i })],
    ['the team', () => screen.getByRole('region', { name: teamSection.headline })],
    ['the clients wall', () => screen.getByRole('region', { name: clientsSection.headline })],
  ])('composes the %s section', (_name, find) => {
    renderWithRouter(<AboutPage />);
    expect(find()).toBeInTheDocument();
  });

  it('introduces every team member after the why-us section', () => {
    renderWithRouter(<AboutPage />);

    const teamRegion = screen.getByRole('region', { name: teamSection.headline });
    expect(within(teamRegion).getAllByRole('article')).toHaveLength(team.length);
  });

  it('shows one client mark per client in the wall', () => {
    renderWithRouter(<AboutPage />);

    const clientsRegion = screen.getByRole('region', { name: clientsSection.headline });
    expect(within(clientsRegion).getAllByRole('img')).toHaveLength(clients.length);
  });

  it('closes with a call to action written for this page', () => {
    renderWithRouter(<AboutPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Ambition deserves a partner that starts with the business.',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Talk to us' })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'See what we do' })).toHaveAttribute(
      'href',
      '/services',
    );
  });
});
