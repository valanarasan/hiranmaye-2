import { Container, Section, SectionHeader, Text } from '@/components/primitives';
import { team, teamSection } from '@/content/team';
import styles from './Team.module.css';

export function Team() {
  return (
    <Section id="team" tone="surface" aria-labelledby="team-title">
      <Container>
        <SectionHeader
          eyebrow={teamSection.eyebrow}
          title={teamSection.headline}
          lead={teamSection.lead}
          titleId="team-title"
        />

        <div className={styles.grid}>
          {team.map((member) => (
            <article key={member.id} className={styles.member}>
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
