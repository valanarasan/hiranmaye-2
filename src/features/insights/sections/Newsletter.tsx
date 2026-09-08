import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Container, Section } from '@/components/primitives';
import { newsletter } from '@/content/insights';
import { cx } from '@/lib/cx';
import styles from './Newsletter.module.css';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <Section className={styles.band} aria-labelledby="newsletter-title">
      <Container>
        <div className={styles.inner}>
          <div>
            <h2 id="newsletter-title" className={styles.title}>
              {newsletter.headline}
            </h2>
            <p className={styles.body}>{newsletter.body}</p>
          </div>

          <div>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className="u-sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                className={styles.input}
                type="email"
                inputMode="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Button type="submit" variant="inverse">
                {newsletter.cta}
              </Button>
            </form>
            <p className={cx(styles.note, submitted && styles.done)}>
              {submitted
                ? 'Thank you — you are on the list.'
                : 'One email. No spam. Unsubscribe whenever you like.'}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
