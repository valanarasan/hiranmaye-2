import type { FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Container, Field, Section, Text } from '@/components/primitives';
import { challengeOptions, contactAssurances, contactPoints } from '@/content/contact';
import { useContactForm } from '../hooks/useContactForm';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const { values, errors, status, setField, submit } = useContactForm({
    initialChallenge: searchParams.get('challenge') ?? '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit();
  };

  return (
    <Section aria-labelledby="contact-form-title">
      <Container>
        <div className={styles.layout}>
          <div>
            <h2 id="contact-form-title" className="u-sr-only">
              Contact form
            </h2>

            {status === 'success' ? (
              <div className={styles.success}>
                <span className={styles.successMark} aria-hidden="true">
                  ✓
                </span>
                <Text variant="h3">Thank you — that has reached us.</Text>
                <Text tone="muted">
                  We read every enquiry properly rather than routing it into a funnel. Expect a
                  reply within one working day, from a person who has actually looked at your
                  business.
                </Text>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.pair}>
                  <Field label="Your name" error={errors.name}>
                    {(props) => (
                      <input
                        {...props}
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        value={values.name}
                        onChange={(event) => setField('name', event.target.value)}
                      />
                    )}
                  </Field>

                  <Field label="Company">
                    {(props) => (
                      <input
                        {...props}
                        type="text"
                        autoComplete="organization"
                        placeholder="Business name"
                        value={values.company}
                        onChange={(event) => setField('company', event.target.value)}
                      />
                    )}
                  </Field>
                </div>

                <div className={styles.pair}>
                  <Field label="Email" error={errors.email}>
                    {(props) => (
                      <input
                        {...props}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={values.email}
                        onChange={(event) => setField('email', event.target.value)}
                      />
                    )}
                  </Field>

                  <Field label="Phone" error={errors.phone}>
                    {(props) => (
                      <input
                        {...props}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Optional"
                        value={values.phone}
                        onChange={(event) => setField('phone', event.target.value)}
                      />
                    )}
                  </Field>
                </div>

                <Field label="What's holding growth back?">
                  {(props) => (
                    <select
                      {...props}
                      value={values.challenge}
                      onChange={(event) => setField('challenge', event.target.value)}
                    >
                      <option value="">Select the closest one</option>
                      {challengeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>

                <Field label="Where is the business today?" error={errors.message}>
                  {(props) => (
                    <textarea
                      {...props}
                      rows={5}
                      placeholder="A few sentences on where you are and where you want to go."
                      value={values.message}
                      onChange={(event) => setField('message', event.target.value)}
                    />
                  )}
                </Field>

                <div className={styles.actions}>
                  <Button type="submit" size="lg" withArrow disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send the brief'}
                  </Button>
                  <span className={styles.note}>No obligation. No sales sequence.</span>
                </div>
              </form>
            )}
          </div>

          <aside className={styles.aside} aria-label="Contact details">
            {contactPoints.map((point) =>
              'href' in point && point.href ? (
                <div key={point.id} className={styles.point}>
                  <span className={styles.pointLabel}>{point.label}</span>
                  <a className={styles.pointValue} href={point.href}>
                    {point.value}
                  </a>
                </div>
              ) : (
                <div key={point.id} className={styles.point}>
                  <span className={styles.pointLabel}>{point.label}</span>
                  <span className={styles.pointValue}>{point.value}</span>
                </div>
              ),
            )}

            <ul className={styles.assurances}>
              {contactAssurances.map((assurance) => (
                <li key={assurance} className={styles.assurance}>
                  <span className={styles.tick} aria-hidden="true">
                    ✓
                  </span>
                  <span>{assurance}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
