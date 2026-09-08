import { Container, Reveal, Section, Text } from '@/components/primitives';
import { whoWeAre, whoWeAreCloser } from '@/content/home';
import { cx } from '@/lib/cx';
import styles from './WhoWeAre.module.css';

export function WhoWeAre() {
  return (
    <Section aria-labelledby="who-we-are-title">
      <Container>
        <div className={styles.grid}>
          <Reveal>
            <h2 id="who-we-are-title" className={styles.lead}>
              Most businesses don&rsquo;t have a marketing problem.{' '}
              <em>They have a fragmentation problem.</em>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className={styles.body}>
              {whoWeAre.paragraphs.map((paragraph, index) => (
                <Text
                  key={paragraph.slice(0, 24)}
                  tone={index === 1 ? 'default' : 'muted'}
                  className={cx(index === 1 && styles.emphasis)}
                >
                  {paragraph}
                </Text>
              ))}
            </div>
            <p className={styles.closer}>{whoWeAreCloser}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
