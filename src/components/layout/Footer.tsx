import { Link } from 'react-router-dom';
import { Container } from '@/components/primitives';
import { SocialIcon } from '@/components/icons';
import type { SocialIconName } from '@/components/icons';
import { footerColumns, site, socialChannels } from '@/content/site';
import { office } from '@/content/contact';
import { Logo } from './Logo';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <p className={styles.statement}>
              Impressions are not growth. What moves the business forward is.
            </p>

            <ul className={styles.social} aria-label="Hiranmaye Digital elsewhere">
              {socialChannels.map((channel) => (
                <li key={channel.id}>
                  <a
                    className={styles.socialLink}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${channel.name} — ${channel.handle}`}
                    title={channel.name}
                  >
                    <SocialIcon name={channel.id as SocialIconName} className={styles.socialIcon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.id} aria-label={column.title}>
              <p className={styles.colTitle}>{column.title}</p>
              <ul className={styles.colList}>
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link to={link.to} className={styles.colLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className={styles.colTitle}>Studio</p>
            <address className={styles.address}>
              {office.street}
              <br />
              {office.locality}
              <br />
              {office.city} {office.postcode}
            </address>
            <ul className={styles.colList}>
              <li>
                <a className={styles.colLink} href={`tel:${site.phoneRaw}`}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a className={styles.colLink} href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  className={styles.colLink}
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Find us on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <Logo onDark />
          <span className={styles.domain}>{site.domain}</span>
          <span>
            © {year} {site.name}
          </span>
        </div>
      </Container>
    </footer>
  );
}
