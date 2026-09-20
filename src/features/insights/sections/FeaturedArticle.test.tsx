import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { posts } from '@/content/insights';
import { FeaturedArticle } from './FeaturedArticle';

const post = posts[0];

describe('FeaturedArticle', () => {
  it('leads with the post title as the article heading', () => {
    render(<FeaturedArticle post={post} />);
    expect(screen.getByRole('heading', { level: 2, name: post.title })).toBeInTheDocument();
  });

  it('badges the post as featured alongside its category and read time', () => {
    render(<FeaturedArticle post={post} />);

    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText(post.category)).toBeInTheDocument();
    expect(screen.getByText(`Read time: ${post.readTime}`)).toBeInTheDocument();
  });

  it('shows the excerpt and an invitation to read the analysis', () => {
    render(<FeaturedArticle post={post} />);

    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
    expect(screen.getByText('In this analysis')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Read the analysis' })).toBeInTheDocument();
  });

  it('renders whichever post it is handed', () => {
    const other = posts[2];
    render(<FeaturedArticle post={other} />);

    expect(screen.getByRole('heading', { level: 2, name: other.title })).toBeInTheDocument();
    expect(screen.getByText(`Read time: ${other.readTime}`)).toBeInTheDocument();
  });
});
