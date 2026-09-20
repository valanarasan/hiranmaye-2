import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { seo } from '@/content/seo';
import { renderWithRouter } from '@/test/utils';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('sets the not-found metadata', () => {
    renderWithRouter(<NotFoundPage />);

    expect(document.title).toBe(seo.notFound.title);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      seo.notFound.description,
    );
  });

  it('shows the status code and an explanation', () => {
    renderWithRouter(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'This page went off-strategy.' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/The link is broken or the page has moved/)).toBeInTheDocument();
  });

  it('offers a way back to the homepage', () => {
    renderWithRouter(<NotFoundPage />, { route: '/nope' });

    expect(screen.getByRole('link', { name: 'Back to the homepage' })).toHaveAttribute('href', '/');
  });
});
