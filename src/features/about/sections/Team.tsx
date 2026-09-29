import { Container, Section, SectionHeader, Text } from '@/components/primitives';
import { team, teamSection } from '@/content/team';
import { useActiveStep } from '@/hooks';
import { cx } from '@/lib/cx';
import styles from './Team.module.css';

export function Team() {
  const { ref, active } = useActiveStep<HTMLDivElement>(team.length);

  return (
    <Section id="team" tone="surface" aria-labelledby="team-title">
      <Container>
        <SectionHeader
          eyebrow={teamSection.eyebrow}
          title={teamSection.headline}
          lead={teamSection.lead}
          titleId="team-title"
        />

        <div className={styles.grid} ref={ref}>
          {team.map((member, index) => (
            <article
              key={member.id}
              className={cx(styles.member, index <= active && styles.lit)}
            >
              <header className={styles.head}>
                <Text variant="h3" as="h3">
                  {member.name}
                </Text>
                <p className={styles.role}>{member.role}</p>
                {member.meta ? <p className={styles.meta}>{member.meta}</p> : null}
              </header>

              <div className={styles.bio}>
                {member.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
