import { Button, Container, Section, SectionHeader, Text } from '@/components/primitives';
import { office, officeSection, openingHours } from '@/content/contact';
import { site } from '@/content/site';
import { cx } from '@/lib/cx';
import { useOpenNow } from '../hooks/useOpenNow';
import styles from './OfficeMap.module.css';

export function OfficeMap() {
  const status = useOpenNow(openingHours);

  const todayIndex = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
  ).getDay();

  return (
    <Section tone="surface" aria-labelledby="office-title">
      <Container>
        <SectionHeader
          eyebrow={officeSection.eyebrow}
          title={officeSection.headline}
          lead={officeSection.lead}
          titleId="office-title"
        />

        <div className={styles.layout}>
          <div className={styles.mapFrame}>
            <div className={styles.mapFallback} aria-hidden="true">
              <strong>{office.name}</strong>
              <span>
                {office.locality}, {office.city} {office.postcode}
              </span>
            </div>
            <iframe
              title={`Map showing ${office.name}, ${office.locality}, ${office.city}`}
              src={office.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <p className={styles.mapNote}>
              <span>
                <strong>{office.name}</strong> · {office.landmark}
              </span>
              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.rowLink}
              >
                Open in Google Maps →
              </a>
            </p>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <Text variant="h4">Office address</Text>
              <span className={styles.status}>
                <span className={cx(styles.dot, status.open && styles.dotOpen)} />
                {status.open ? 'Open now' : 'Closed'}
              </span>
            </div>

            <address className={styles.address}>
              {office.street}
              <br />
              {office.locality}
              <br />
              {office.city}, {office.state} {office.postcode}
              <br />
              {office.country}
            </address>

            <div className={styles.landmark}>
              <span className={styles.landmarkLabel}>Key landmark</span>
              <span>{office.landmark}, Siddanna Layout</span>
            </div>

            <dl className={styles.rows}>
              <div className={styles.row}>
                <dt className={styles.rowLabel}>Phone</dt>
                <dd className={styles.rowValue}>
                  <a className={styles.rowLink} href={`tel:${site.phoneRaw}`}>
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.rowLabel}>Email</dt>
                <dd className={styles.rowValue}>
                  <a className={styles.rowLink} href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.rowLabel}>Consultation</dt>
                <dd className={styles.rowValue}>{office.consultation}</dd>
              </div>
            </dl>

            <div className={styles.hours}>
              <p className={styles.hoursTitle}>Operating hours</p>
              <p className={cx(styles.hoursStatus, status.open && styles.hoursStatusOpen)}>
                {status.label}
              </p>
              {openingHours.map((row) => {
                const isToday = row.days.includes(todayIndex);
                return (
                  <div
                    key={row.id}
                    className={cx(styles.hoursRow, isToday && styles.hoursToday)}
                  >
                    <span>{row.label}</span>
                    <span
                      className={cx(styles.hoursTime, row.opens === undefined && styles.closed)}
                    >
                      {row.display}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.actions}>
              <Button as="a" href={`tel:${site.phoneRaw}`} size="md">
                Call the studio
              </Button>
              <Button
                as="a"
                href={office.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="outline"
                size="md"
                withArrow
              >
                Directions
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
