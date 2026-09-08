import { Link } from 'react-router-dom';
import { Button, Container, Text } from '@/components/primitives';
import { seo } from '@/content/seo';
import { useSeo } from '@/hooks';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  useSeo(seo.notFound);

  return (
    <Container>
      <div className={styles.wrap}>
        <span className={styles.code}>404</span>
        <Text variant="h2" balance>
          This page went off-strategy.
        </Text>
        <Text variant="lead" tone="muted" balance>
          The link is broken or the page has moved. Everything else is still where it should be.
        </Text>
        <Button as={Link} to="/" size="lg" withArrow>
          Back to the homepage
        </Button>
      </div>
    </Container>
  );
}
