import { ClientLogo, Container, Section, SectionHeader } from '@/components/primitives';
import { clients, clientsSection, partners } from '@/content/clients';
import styles from './Clients.module.css';

export function Clients() {
  return (
    <Section id="clients" aria-labelledby="clients-title">
      <Container>
        <SectionHeader
          eyebrow={clientsSection.eyebrow}
          title={clientsSection.headline}
          lead={clientsSection.lead}
          titleId="clients-title"
        />

        <ul className={styles.wall}>
          {clients.map((client) => (
            <li key={client.id} className={styles.cell}>
              <ClientLogo name={client.name} src={client.logo} />
              <span className={styles.sector}>{client.sector}</span>
            </li>
          ))}
        </ul>

        {partners.length > 0 ? (
          <p className={styles.partners}>
            <span className={styles.partnersLabel}>Our partners</span>
            {partners.join(' · ')}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
