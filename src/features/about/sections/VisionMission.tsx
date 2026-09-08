import { Container, Reveal, Section, Text } from '@/components/primitives';
import { visionMission } from '@/content/about';
import styles from './VisionMission.module.css';

export function VisionMission() {
  return (
    <Section tone="surface" aria-label="Vision and mission">
      <Container>
        <div className={styles.grid}>
          {visionMission.map((item, index) => (
            <Reveal key={item.id} className={styles.card} delay={index * 90}>
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
