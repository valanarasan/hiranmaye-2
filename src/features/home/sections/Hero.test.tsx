import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Hero } from './Hero';
import { hero } from '@/content/home';
import { renderWithRouter } from '@/test/utils';

describe('Hero', () => {
  it('renders the headline as the page level-1 heading and labels the section with it', () => {
    renderWithRouter(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveAttribute('id', 'hero-title');
    expect(heading).toHaveTextContent(
      'Marketing that doesn’t just create noise. It creates momentum.',
    );
    expect(screen.getByRole('region', { name: /It creates momentum/ })).toBeInTheDocument();
  });

  it('emphasises the promise in the second half of the headline', () => {
    const { container } = renderWithRouter(<Hero />);

    expect(container.querySelector('h1 em')).toHaveTextContent('It creates momentum.');
  });

  it('renders the eyebrow and subcopy from the hero content', () => {
    renderWithRouter(<Hero />);

    expect(screen.getByText(hero.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(hero.subcopy)).toBeInTheDocument();
  });

  it.each([
    ['primary', hero.primaryCta],
    ['secondary', hero.secondaryCta],
  ])('routes the %s call to action at its destination', (_kind, cta) => {
    renderWithRouter(<Hero />);

    expect(screen.getByRole('link', { name: cta.label })).toHaveAttribute('href', cta.to);
  });

  it('renders the prompt label as a level-4 heading', () => {
    renderWithRouter(<Hero />);

    expect(screen.getByRole('heading', { level: 4, name: hero.promptLabel })).toBeInTheDocument();
  });

  it('renders one chip per pain point, each linking to its service anchor', () => {
    renderWithRouter(<Hero />);

    hero.painPoints.forEach((point) => {
      expect(screen.getByRole('link', { name: point.label })).toHaveAttribute('href', point.to);
    });
    // Pain-point chips plus the two calls to action.
    expect(screen.getAllByRole('link')).toHaveLength(hero.painPoints.length + 2);
  });

  it('hides the scroll hint from assistive technology', () => {
    renderWithRouter(<Hero />);

    const hint = screen.getByText('Scroll').parentElement!;
    expect(hint).toHaveAttribute('aria-hidden', 'true');
  });
});
