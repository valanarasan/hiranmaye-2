import { cx } from '@/lib/cx';
import type { Service } from '@/types/content';
import styles from './ServiceIndex.module.css';

export interface ServiceIndexProps {
  services: readonly Service[];
  activeId: string | null;
}

/** Presentational only: it is told what is active, it never works it out. */
export function ServiceIndex({ services, activeId }: ServiceIndexProps) {
  return (
    <nav className={styles.index} aria-label="Capabilities">
      <p className={styles.title}>Capabilities</p>
      <ul className={styles.list}>
        {services.map((service) => (
          <li key={service.id}>
            <a
              href={`#${service.id}`}
              className={cx(styles.link, activeId === service.id && styles.active)}
              aria-current={activeId === service.id ? 'true' : undefined}
            >
              <span className={styles.num}>{service.index}</span>
              <span>{service.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
