import { Link } from 'react-router-dom';
import { Button, Container, Reveal, Section, Text } from '@/components/primitives';
import styles from './CtaBand.module.css';

export interface CtaBandProps {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

/** Reused verbatim at the foot of every page — configured, never re-written. */
export function CtaBand({
  title = 'Let’s find out the potential of your business.',
  body = 'Tell us where your business is today. Tell us where you want it to go. We’ll bring the questions, the perspective and the strategy.',
  primaryLabel = 'Start the conversation',
  primaryTo = '/contact',
  secondaryLabel = 'See our capabilities',
  secondaryTo = '/services',
}: CtaBandProps) {
  return (
    <Section className={styles.band} space="lg">
      <Container>
        <Reveal className={styles.inner}>
          <h2 className={styles.title}>{title}</h2>
          <Text variant="lead" tone="muted" balance>
            {body}
          </Text>
          <div className={styles.actions}>
            <Button as={Link} to={primaryTo} size="lg" withArrow>
              {primaryLabel}
            </Button>
            <Button as={Link} to={secondaryTo} variant="outline" size="lg">
              {secondaryLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
