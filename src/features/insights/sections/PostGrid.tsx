import { Chip, Text } from '@/components/primitives';
import type { Post } from '@/types/content';
import styles from './PostGrid.module.css';

export interface PostGridProps {
  posts: readonly Post[];
  categories: readonly string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/** Presentational: filtering happens above it, never inside it. */
export function PostGrid({
  posts,
  categories,
  activeCategory,
  onCategoryChange,
}: PostGridProps) {
  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter articles by category">
        {categories.map((category) => (
          <Chip
            key={category}
            withDot={false}
            selected={category === activeCategory}
            aria-pressed={category === activeCategory}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Chip>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className={styles.empty}>Nothing filed under this category yet. More is on the way.</p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <Text variant="small" tone="muted">
                {post.excerpt}
              </Text>
              <span className={styles.more}>
                Read <span aria-hidden="true">→</span>
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
