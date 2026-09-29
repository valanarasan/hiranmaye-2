import { Container, Text } from '@/components/primitives';
import { ClientLogo } from '@/components/primitives';
import { clients } from '@/content/clients';
import styles from './ClientStrip.module.css';

/** A quiet row of marks under the trust strip — proof, not a billboard. */
export function ClientStrip() {
  return (
    <section className={styles.strip} aria-labelledby="client-strip-title">
      <Container>
        <Text id="client-strip-title" variant="eyebrow" tone="faint" className={styles.label}>
          Trusted by
        </Text>

        <ul className={styles.row}>
          {clients.map((client) => (
            <li key={client.id} className={styles.item}>
              <ClientLogo name={client.name} src={client.logo} size="sm" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
