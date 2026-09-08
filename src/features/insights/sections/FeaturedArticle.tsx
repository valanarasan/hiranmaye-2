import { Button, Text } from '@/components/primitives';
import type { Post } from '@/types/content';
import styles from './FeaturedArticle.module.css';

export interface FeaturedArticleProps {
  post: Post;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <article className={styles.featured}>
      <div>
        <div className={styles.meta}>
          <span className={styles.tag}>Featured</span>
          <span className={styles.readTime}>{post.category}</span>
          <span className={styles.readTime}>Read time: {post.readTime}</span>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <Text tone="muted">{post.excerpt}</Text>
      </div>

      <div className={styles.side}>
        <Text variant="eyebrow" tone="faint">
          In this analysis
        </Text>
        <Text tone="muted">
          What answer engines change about discovery, why classic ranking is no longer the whole
          game, and the three moves that keep a business visible when the interface stops being a
          list of links.
        </Text>
        <Button variant="link" withArrow>
          Read the analysis
        </Button>
      </div>
    </article>
  );
}
