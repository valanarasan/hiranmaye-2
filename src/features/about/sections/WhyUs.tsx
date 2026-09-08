import { Accordion, Container, Section, SectionHeader } from '@/components/primitives';
import { whyUs } from '@/content/about';
import styles from './WhyUs.module.css';

export function WhyUs() {
  return (
    <Section id="why-us" aria-labelledby="why-us-title">
      <Container>
        <SectionHeader
          className={styles.head}
          eyebrow="Why us"
          title="Six things that change how the work gets done."
          titleId="why-us-title"
        />

        <Accordion defaultOpenId={whyUs[0]?.id}>
          {whyUs.map((item, index) => (
            <Accordion.Item
              key={item.id}
              id={item.id}
              index={String(index + 1).padStart(2, '0')}
              title={item.title}
            >
              <p className={styles.body}>{item.body}</p>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
