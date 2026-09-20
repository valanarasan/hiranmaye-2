import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { aboutHero } from '@/content/about';
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
  ])('composes the %s section', (_name, find) => {
    renderWithRouter(<AboutPage />);
    expect(find()).toBeInTheDocument();
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
