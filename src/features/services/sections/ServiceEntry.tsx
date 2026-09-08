import { Link } from 'react-router-dom';
import { Button, Reveal } from '@/components/primitives';
import type { Service } from '@/types/content';
import styles from './ServiceEntry.module.css';

export interface ServiceEntryProps {
  service: Service;
}

export function ServiceEntry({ service }: ServiceEntryProps) {
  return (
    <Reveal as="article" id={service.id} className={styles.entry}>
      <div className={styles.top}>
        <span className={styles.num}>{service.index}</span>
        <h2 className={styles.title}>{service.title}</h2>
      </div>

      <p className={styles.promise}>{service.promise}</p>

      <div className={styles.blocks}>
        {service.problem ? (
          <div className={styles.block}>
            <span className={styles.blockLabel}>What we solve</span>
            <p>{service.problem}</p>
          </div>
        ) : null}

        <div className={styles.block}>
          <span className={styles.blockLabel}>What we do</span>
          <p>{service.approach}</p>
        </div>

        {service.outcome ? (
          <div className={styles.block}>
            <span className={styles.blockLabel}>The outcome</span>
            <p className={styles.outcome}>{service.outcome}</p>
          </div>
        ) : null}
      </div>

      {service.facets?.length ? (
        <div className={styles.facets}>
          {service.facets.map((facet) => (
            <div key={facet.id} className={styles.facet}>
              <span className={styles.facetTitle}>{facet.title}</span>
              <span className={styles.facetPromise}>{facet.promise}</span>
              <p className={styles.facetBody}>{facet.body}</p>
            </div>
          ))}
        </div>
      ) : null}

      {service.closer ? <p className={styles.closer}>{service.closer}</p> : null}

      <Button as={Link} to="/contact" variant="link" className={styles.cta} withArrow>
        {service.ctaLabel}
      </Button>
    </Reveal>
  );
}
