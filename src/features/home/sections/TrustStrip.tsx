import { Fragment } from 'react';
import { Container, Marquee, Text } from '@/components/primitives';
import { trust } from '@/content/home';
import { useActiveStep } from '@/hooks';
import { cx } from '@/lib/cx';
import styles from './TrustStrip.module.css';

export function TrustStrip() {
  const { ref, active } = useActiveStep<HTMLDivElement>(trust.stages.length);

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

        <div className={styles.stages} ref={ref}>
          {trust.stages.map((stage, index) => (
            <Fragment key={stage}>
              {index > 0 ? (
                <span
                  className={cx(styles.arrow, index <= active && styles.lit)}
                  aria-hidden="true"
                >
                  →
                </span>
              ) : null}
              <span className={cx(styles.stage, index <= active && styles.lit)}>{stage}</span>
            </Fragment>
          ))}
        </div>

        <Marquee items={trust.industries} />
      </Container>
    </section>
  );
}
