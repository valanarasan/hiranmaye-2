import { Container, Reveal, Section, Text } from '@/components/primitives';
import { thinking } from '@/content/about';
import styles from './Thinking.module.css';

export function Thinking() {
  return (
    <Section aria-labelledby="thinking-title">
      <Container>
        <div className={styles.grid}>
          <Reveal>
            <h2 id="thinking-title" className={styles.lead}>
              The Internet is no longer the marketplace. <em>It&rsquo;s the infrastructure.</em>
            </h2>
          </Reveal>
          <Reveal delay={80} className={styles.body}>
            {thinking.paragraphs.map((paragraph) => (
              <Text key={paragraph.slice(0, 24)} tone="muted">
                {paragraph}
              </Text>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
