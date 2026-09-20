import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageHero } from './PageHero';
import { aboutHero } from '@/content/about';

describe('PageHero', () => {
  it('renders the headline as the page level-1 heading', () => {
    render(<PageHero eyebrow={aboutHero.eyebrow} headline={aboutHero.headline} />);

    expect(
      screen.getByRole('heading', { level: 1, name: aboutHero.headline }),
    ).toBeInTheDocument();
  });

  it('renders the eyebrow beside a decorative rule', () => {
    const { container } = render(<PageHero eyebrow={aboutHero.eyebrow} headline="Headline" />);

    expect(screen.getByText(aboutHero.eyebrow)).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('labels the section with the heading it was given an id for', () => {
    render(<PageHero eyebrow="About" headline="Headline" titleId="about-title" />);

    const region = screen.getByRole('region', { name: 'Headline' });
    expect(region).toHaveAttribute('aria-labelledby', 'about-title');
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'about-title');
  });

  /** Without a titleId there is nothing to point at, so the section stays unnamed. */
  it('leaves the section unlabelled when no titleId is given', () => {
    const { container } = render(<PageHero eyebrow="About" headline="Headline" />);

    expect(container.querySelector('section')).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByRole('heading', { level: 1 })).not.toHaveAttribute('id');
  });

  it('renders the lead when one is given', () => {
    render(<PageHero eyebrow="About" headline="Headline" lead="A single sentence." />);

    expect(screen.getByText('A single sentence.')).toBeInTheDocument();
  });

  it('renders no prose at all when neither lead nor paragraphs are given', () => {
    const { container } = render(<PageHero eyebrow="About" headline="Headline" />);

    expect(container.querySelectorAll('p')).toHaveLength(0);
  });

  it('renders one paragraph per entry it is handed', () => {
    const { container } = render(
      <PageHero
        eyebrow={aboutHero.eyebrow}
        headline={aboutHero.headline}
        paragraphs={aboutHero.paragraphs}
      />,
    );

    expect(container.querySelectorAll('p')).toHaveLength(aboutHero.paragraphs.length);
    aboutHero.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  /** An empty array is a different branch from an absent one — both must stay silent. */
  it('renders no paragraph block for an empty paragraph list', () => {
    const { container } = render(
      <PageHero eyebrow="About" headline="Headline" lead="Lead." paragraphs={[]} />,
    );

    expect(container.querySelectorAll('p')).toHaveLength(1);
    expect(screen.getByText('Lead.')).toBeInTheDocument();
  });
});
