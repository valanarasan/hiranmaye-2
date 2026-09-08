import { Link } from 'react-router-dom';
import { Button, Container, Reveal, Section, SectionHeader } from '@/components/primitives';
import { pillars } from '@/content/home';
import styles from './Capabilities.module.css';

export function Capabilities() {
  return (
    <Section tone="surface" aria-labelledby="capabilities-title">
      <Container>
        <div className={styles.head}>
          <SectionHeader
            eyebrow="Capabilities"
            title="One growth partner. Multiple growth levers."
            titleId="capabilities-title"
          />
          <Button as={Link} to="/services" variant="outline" withArrow>
            Explore our capabilities
          </Button>
        </div>

        <div className={styles.list}>
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={index * 55}>
              <Link to={pillar.to}>
                <div className={styles.row}>
                  <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.label}>{pillar.label}</span>

                  <span className={styles.detail}>
                    <span className={styles.promise}>{pillar.promise}</span>
                    <span className={styles.caps}>
                      {pillar.capabilities.map((capability) => (
                        <span key={capability} className={styles.cap}>
                          {capability}
                        </span>
                      ))}
                    </span>
                  </span>

                  <span className={styles.chevron} aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
