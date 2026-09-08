import { Container, Text } from '@/components/primitives';
import styles from './PageHero.module.css';

export interface PageHeroProps {
  eyebrow: string;
  headline: string;
  lead?: string;
  paragraphs?: readonly string[];
  titleId?: string;
}

/**
 * One hero, five pages. Extended by props rather than duplicated per feature —
 * the About feature owns it, everyone else consumes it.
 */
export function PageHero({ eyebrow, headline, lead, paragraphs, titleId }: PageHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby={titleId}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.eyebrowRow}>
            <span className={styles.rule} aria-hidden="true" />
            <Text variant="eyebrow" tone="muted">
              {eyebrow}
            </Text>
          </div>

          <Text variant="h1" id={titleId} className={styles.headline} balance>
            {headline}
          </Text>

          {lead ? (
            <Text variant="lead" tone="muted" className={styles.lead} balance>
              {lead}
            </Text>
          ) : null}

          {paragraphs?.length ? (
            <div className={styles.paragraphs}>
              {paragraphs.map((paragraph) => (
                <Text key={paragraph.slice(0, 24)} tone="muted">
                  {paragraph}
                </Text>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
