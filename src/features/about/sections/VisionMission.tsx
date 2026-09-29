import { Container, Reveal, Section, Text } from '@/components/primitives';
import { visionMission } from '@/content/about';
import { useActiveStep } from '@/hooks';
import { cx } from '@/lib/cx';
import styles from './VisionMission.module.css';

export function VisionMission() {
  const { ref, active } = useActiveStep<HTMLDivElement>(visionMission.length);

  return (
    <Section tone="surface" aria-label="Vision and mission">
      <Container>
        <div className={styles.grid} ref={ref}>
          {visionMission.map((item, index) => (
            <Reveal
              key={item.id}
              className={cx(styles.card, index <= active && styles.lit)}
              delay={index * 90}
            >
              <span className={styles.label}>{item.label}</span>
              <p className={styles.statement}>{item.statement}</p>
              <Text tone="muted">{item.body}</Text>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
