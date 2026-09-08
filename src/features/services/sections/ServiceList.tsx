import { Container, Section } from '@/components/primitives';
import { useActiveSection } from '../hooks/useActiveSection';
import type { Service } from '@/types/content';
import { ServiceEntry } from './ServiceEntry';
import { ServiceIndex } from './ServiceIndex';
import styles from './ServiceList.module.css';

export interface ServiceListProps {
  services: readonly Service[];
}

/** Container: it owns the scroll-spy state and hands it down as data. */
export function ServiceList({ services }: ServiceListProps) {
  const activeId = useActiveSection(services.map((service) => service.id));

  return (
    <Section>
      <Container>
        <div className={styles.layout}>
          <ServiceIndex services={services} activeId={activeId} />
          <div>
            {services.map((service) => (
              <ServiceEntry key={service.id} service={service} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
