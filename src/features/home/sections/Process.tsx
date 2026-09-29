import { Container, Reveal, Section, SectionHeader } from '@/components/primitives';
import { processSteps } from '@/content/home';
import { useActiveStep } from '@/hooks';
import { cx } from '@/lib/cx';
import styles from './Process.module.css';

export function Process() {
  const { ref, active } = useActiveStep<HTMLOListElement>(processSteps.length);

  return (
    <Section className={styles.section} aria-labelledby="process-title">
      <Container>
        <SectionHeader
          className={styles.head}
          eyebrow="How we work"
          title="From “we need marketing” to “we know what’s working.”"
          titleId="process-title"
          inverse
        />

        <ol className={styles.grid} role="list" ref={ref}>
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.id}
              className={cx(styles.step, index <= active && styles.lit)}
              delay={index * 70}
            >
              <span className={styles.index}>{step.index}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.headline}>{step.headline}</p>
              <p className={styles.body}>{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
