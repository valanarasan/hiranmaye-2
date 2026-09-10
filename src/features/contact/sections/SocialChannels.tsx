import { Container, Section, SectionHeader } from '@/components/primitives';
import { SocialIcon } from '@/components/icons';
import type { SocialIconName } from '@/components/icons';
import { socialChannels } from '@/content/site';
import { socialSection } from '@/content/contact';
import styles from './SocialChannels.module.css';

export function SocialChannels() {
  return (
    <Section aria-labelledby="social-title">
      <Container>
        <SectionHeader
          eyebrow={socialSection.eyebrow}
          title={socialSection.headline}
          lead={socialSection.lead}
          titleId="social-title"
        />

        <div className={styles.grid}>
          {socialChannels.map((channel) => (
            <a
              key={channel.id}
              className={styles.card}
              href={channel.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className={styles.top}>
                <SocialIcon name={channel.id as SocialIconName} className={styles.icon} />
                <span className={styles.tag}>{channel.tag}</span>
              </span>

              <span className={styles.name}>
                <span className={styles.platform}>{channel.name}</span>
                <span className={styles.handle}>{channel.handle}</span>
              </span>

              <span className={styles.purpose}>{channel.purpose}</span>

              <span className={styles.cta}>
                {channel.cta}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          ))}
          <span className={styles.filler} aria-hidden="true" />
        </div>
      </Container>
    </Section>
  );
}
