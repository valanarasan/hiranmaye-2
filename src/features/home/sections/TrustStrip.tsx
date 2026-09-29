import { Fragment } from 'react';
import { Container, Marquee, Text } from '@/components/primitives';
import { trust } from '@/content/home';
import styles from './TrustStrip.module.css';

export function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="Who we work with">
      <Container>
        {trust.eyebrow ? (
          <Text variant="eyebrow" tone="faint" className={styles.eyebrow}>
            {trust.eyebrow}
          </Text>
        ) : null}

        <Text variant="h4" className={styles.headline} tone="muted" balance>
          {trust.headline}
        </Text>

        <div className={styles.stages}>
          {trust.stages.map((stage, index) => (
            <Fragment key={stage}>
              {index > 0 ? (
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              ) : null}
              <span className={styles.stage}>{stage}</span>
            </Fragment>
          ))}
        </div>

        <Marquee items={trust.industries} />
      </Container>
    </section>
  );
}
