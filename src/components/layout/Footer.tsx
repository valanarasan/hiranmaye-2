import { Link } from 'react-router-dom';
import { Container } from '@/components/primitives';
import { footerColumns, site } from '@/content/site';
import { Logo } from './Logo';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div>
            <p className={styles.statement}>
              Impressions are not growth. What moves the business forward is.
            </p>
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
        </div>

        <div className={styles.bottom}>
          <Logo onDark />
          <div className={styles.contactRow}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.location}</span>
          </div>
          <span>
            © {year} {site.name}
          </span>
        </div>
      </Container>
    </footer>
  );
}
