import { Container, Reveal, Section, Text } from '@/components/primitives';
import { story } from '@/content/about';
import styles from './Story.module.css';

export function Story() {
  return (
    <Section aria-labelledby="story-title">
      <Container>
        <Reveal className={styles.wrap}>
          <span className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          <Text variant="eyebrow" tone="faint" id="story-title">
            Our story
          </Text>
          <p className={styles.question}>
            Why is so much marketing so busy, and so little of it actually connected to growth?
          </p>
          <Text tone="muted" balance>
            {story.paragraphs[1]}
          </Text>
        </Reveal>
      </Container>
    </Section>
  );
}
