import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Logo } from './Logo';
import { hasClassKey, renderWithRouter } from '@/test/utils';

const NAME = 'Hiranmaye Digital — home';

describe('Logo', () => {
  it('links home under an accessible name', () => {
    renderWithRouter(<Logo />, { route: '/about' });
    const link = screen.getByRole('link', { name: NAME });

    expect(link).toHaveAttribute('href', '/');
  });

  it('shows the wordmark, the tagline and the lotus', () => {
    renderWithRouter(<Logo />);
    const link = screen.getByRole('link', { name: NAME });

    expect(screen.getByText('Hiranmaye Digital')).toBeInTheDocument();
    expect(screen.getByText('Strategy drives growth')).toBeInTheDocument();
    expect(link.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the inline lockup by default', () => {
    renderWithRouter(<Logo />);
    const link = screen.getByRole('link', { name: NAME });

    expect(hasClassKey(link, 'logo')).toBe(true);
    expect(hasClassKey(link, 'stacked')).toBe(false);
    expect(hasClassKey(link, 'onDark')).toBe(false);
  });

  it('stacks the lockup when asked', () => {
    renderWithRouter(<Logo variant="stacked" />);
    expect(hasClassKey(screen.getByRole('link', { name: NAME }), 'stacked')).toBe(true);
  });

  it('switches to the dark-surface treatment', () => {
    renderWithRouter(<Logo onDark />);
    expect(hasClassKey(screen.getByRole('link', { name: NAME }), 'onDark')).toBe(true);
  });

  it('drops the tagline in tight spaces', () => {
    renderWithRouter(<Logo showTagline={false} />);

    expect(screen.getByText('Hiranmaye Digital')).toBeInTheDocument();
    expect(screen.queryByText('Strategy drives growth')).not.toBeInTheDocument();
  });

  it('merges a caller class with its own', () => {
    renderWithRouter(<Logo className="custom" />);
    const link = screen.getByRole('link', { name: NAME });

    expect(link).toHaveClass('custom');
    expect(hasClassKey(link, 'logo')).toBe(true);
  });
});
