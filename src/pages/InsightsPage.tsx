import { useMemo, useState } from 'react';
import { Container, Section } from '@/components/primitives';
import { PageHero } from '@/features/about/sections';
import { FeaturedArticle, Newsletter, PostGrid } from '@/features/insights/sections';
import { categories, insightsHero, posts } from '@/content/insights';
import { seo } from '@/content/seo';
import { useSeo } from '@/hooks';

export default function InsightsPage() {
  useSeo(seo.insights);

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const featured = useMemo(() => posts.find((post) => post.featured) ?? posts[0], []);

  const visible = useMemo(
    () =>
      posts.filter(
        (post) => !post.featured && (activeCategory === 'All' || post.category === activeCategory),
      ),
    [activeCategory],
  );

  return (
    <>
      <PageHero
        eyebrow={insightsHero.eyebrow}
        headline={insightsHero.headline}
        lead={insightsHero.lead}
        titleId="insights-title"
      />

      {featured ? (
        <Section space="sm">
          <Container>
            <FeaturedArticle post={featured} />
          </Container>
        </Section>
      ) : null}

      <Section space="sm">
        <Container>
          <PostGrid
            posts={visible}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}
