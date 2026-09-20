import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { seo } from '@/content/seo';
import { trust } from '@/content/home';
import { renderWithRouter } from '@/test/utils';
import HomePage from './HomePage';

// The WebGL hero is a GPU component; jsdom only needs to know it was mounted.
vi.mock('@/components/three', () => ({
  HeroVisual: () => <div data-testid="hero-visual" />,
}));

describe('HomePage', () => {
  it('sets the home page metadata', () => {
    renderWithRouter(<HomePage />);

    expect(document.title).toBe(seo.home.title);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      seo.home.description,
    );
  });

  it('opens with the hero and its visual', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByTestId('hero-visual')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /creates momentum/i })).toBeInTheDocument();
  });

  it.each([
    ['the trust strip', () => screen.getByRole('region', { name: 'Who we work with' })],
    ['who we are', () => screen.getByRole('heading', { level: 2, name: /fragmentation problem/i })],
    ['the capabilities', () => screen.getByRole('heading', { level: 2, name: 'One growth partner. Multiple growth levers.' })],
    ['the process', () => screen.getByRole('heading', { level: 2, name: /we know what/i })],
  ])('composes %s section', (_name, find) => {
    renderWithRouter(<HomePage />);
    expect(find()).toBeInTheDocument();
  });

  it('shows the trust headline the strip is given', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(trust.headline)).toBeInTheDocument();
  });

  it('closes with the default call-to-action band', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByRole('link', { name: 'Start the conversation' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(screen.getByRole('link', { name: 'See our capabilities' })).toHaveAttribute(
      'href',
      '/services',
    );
  });
});
