import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { categories, insightsHero, newsletter, posts } from '@/content/insights';
import { seo } from '@/content/seo';
import { renderWithRouter } from '@/test/utils';
import InsightsPage from './InsightsPage';

const { contentState } = vi.hoisted(() => ({ contentState: { empty: false } }));

/**
 * The real content always has something to feature, so the empty case — the
 * only way to reach the page's "no featured article" path — is staged here.
 */
vi.mock('@/content/insights', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/insights')>();
  return {
    ...actual,
    get posts() {
      return contentState.empty ? [] : actual.posts;
    },
  };
});

const featured = posts.find((post) => post.featured) as (typeof posts)[number];
const rest = posts.filter((post) => !post.featured);

describe('InsightsPage', () => {
  it('sets the insights page metadata', () => {
    renderWithRouter(<InsightsPage />);

    expect(document.title).toBe(seo.insights.title);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      seo.insights.description,
    );
  });

  it('opens with the insights hero', () => {
    renderWithRouter(<InsightsPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: insightsHero.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText(insightsHero.lead)).toBeInTheDocument();
  });

  it('promotes the flagged post and keeps it out of the grid', () => {
    renderWithRouter(<InsightsPage />);

    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: featured.title })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: featured.title })).not.toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(rest.length + 1);
  });

  it('starts on All and offers every category as a filter', () => {
    renderWithRouter(<InsightsPage />);

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    categories.forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('narrows the grid to the chosen category', async () => {
    renderWithRouter(<InsightsPage />);

    await userEvent.click(screen.getByRole('button', { name: 'Branding' }));

    const expected = rest.filter((post) => post.category === 'Branding');
    expect(screen.getByRole('button', { name: 'Branding' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expected.forEach((post) => {
      expect(screen.getByRole('heading', { level: 3, name: post.title })).toBeInTheDocument();
    });
    // The featured article stays put, so it is one article above the filtered grid.
    expect(screen.getAllByRole('article')).toHaveLength(expected.length + 1);
  });

  it('shows the empty-state copy for a category with no posts in it', async () => {
    renderWithRouter(<InsightsPage />);

    await userEvent.click(screen.getByRole('button', { name: 'AI & The Future' }));

    expect(
      screen.getByText('Nothing filed under this category yet. More is on the way.'),
    ).toBeInTheDocument();
  });

  it('ends with the newsletter band', () => {
    renderWithRouter(<InsightsPage />);

    expect(screen.getByRole('heading', { level: 2, name: newsletter.headline })).toBeInTheDocument();
  });

  it('drops the featured slot entirely when there are no posts', () => {
    contentState.empty = true;
    try {
      renderWithRouter(<InsightsPage />);

      expect(screen.queryByText('Featured')).not.toBeInTheDocument();
      expect(
        screen.getByText('Nothing filed under this category yet. More is on the way.'),
      ).toBeInTheDocument();
    } finally {
      contentState.empty = false;
    }
  });
});
