import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { categories, posts } from '@/content/insights';
import type { PostGridProps } from './PostGrid';
import { PostGrid } from './PostGrid';

const listed = posts.filter((post) => !post.featured);

function renderGrid(overrides: Partial<PostGridProps> = {}) {
  const onCategoryChange = vi.fn();
  render(
    <PostGrid
      posts={listed}
      categories={categories}
      activeCategory="All"
      onCategoryChange={onCategoryChange}
      {...overrides}
    />,
  );
  return { onCategoryChange };
}

describe('PostGrid', () => {
  it('offers one filter chip per category inside a labelled group', () => {
    renderGrid();
    const group = screen.getByRole('group', { name: 'Filter articles by category' });

    expect(within(group).getAllByRole('button')).toHaveLength(categories.length);
  });

  it('marks only the active category as pressed', () => {
    renderGrid({ activeCategory: 'Search' });

    expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('reports the chosen category upwards rather than filtering itself', async () => {
    const { onCategoryChange } = renderGrid();

    await userEvent.click(screen.getByRole('button', { name: 'Branding' }));

    expect(onCategoryChange).toHaveBeenCalledTimes(1);
    expect(onCategoryChange).toHaveBeenCalledWith('Branding');
    // Still showing everything it was handed: the filtering happens above it.
    expect(screen.getAllByRole('article')).toHaveLength(listed.length);
  });

  it('renders one card per post it is given', () => {
    renderGrid();
    const cards = screen.getAllByRole('article');

    expect(cards).toHaveLength(listed.length);
    listed.forEach((post, index) => {
      const card = cards[index];
      expect(within(card).getByRole('heading', { level: 3, name: post.title })).toBeInTheDocument();
      expect(within(card).getByText(post.category)).toBeInTheDocument();
      expect(within(card).getByText(post.readTime)).toBeInTheDocument();
      expect(within(card).getByText(post.excerpt)).toBeInTheDocument();
    });
  });

  it('explains the gap when a category has nothing in it yet', () => {
    renderGrid({ posts: [], activeCategory: 'Websites' });

    expect(screen.queryByRole('article')).not.toBeInTheDocument();
    expect(
      screen.getByText('Nothing filed under this category yet. More is on the way.'),
    ).toBeInTheDocument();
  });
});
