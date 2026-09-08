import { Link } from 'react-router-dom';
import { Button, Chip, Container, Text } from '@/components/primitives';
import { HeroVisual } from '@/components/three';
import { hero } from '@/content/home';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroVisual />

      <Container>
        <div className={styles.content}>
          <div className={styles.eyebrowRow}>
            <span className={styles.rule} aria-hidden="true" />
            <Text variant="eyebrow" tone="muted">
              {hero.eyebrow}
            </Text>
          </div>

          <Text variant="display" id="hero-title" className={styles.headline} balance>
            Marketing that doesn&rsquo;t just create noise.{' '}
            <em>It creates momentum.</em>
          </Text>

          <Text variant="lead" tone="muted" className={styles.subcopy}>
            {hero.subcopy}
          </Text>

          <div className={styles.ctas}>
            <Button as={Link} to={hero.primaryCta.to} size="lg" withArrow>
              {hero.primaryCta.label}
            </Button>
            <Button as={Link} to={hero.secondaryCta.to} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <div className={styles.prompt}>
            <Text variant="h4" className={styles.promptLabel}>
              {hero.promptLabel}
            </Text>
            <div className={styles.chips}>
              {hero.painPoints.map((point) => (
                <Chip key={point.id} as={Link} to={point.to}>
                  {point.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
