import { useCallback, useMemo } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Container, Field, Section, Text } from '@/components/primitives';
import { challengeOptions, contactAssurances } from '@/content/contact';
import { site } from '@/content/site';
import { createLeadPayload, getLeadTransport } from '@/services/leads';
import type { ContactValues } from '../hooks/useContactForm';
import { useContactForm } from '../hooks/useContactForm';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [searchParams] = useSearchParams();

  // The presenter resolves the transport once and hands the hook a plain
  // function, so the hook stays ignorant of Apps Script, fetch and env vars.
  const transport = useMemo(() => getLeadTransport(), []);
  const deliver = useCallback(
    async (fields: ContactValues) => {
      await transport.send(createLeadPayload(fields, { source: 'contact-page' }));
    },
    [transport],
  );

  const { values, errors, formError, status, setField, submit, honeypotProps } = useContactForm({
    onSubmit: deliver,
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

                <div className={styles.decoy} aria-hidden="true">
                  <label htmlFor="company-website">
                    Leave this field empty
                    <input {...honeypotProps} id="company-website" type="text" />
                  </label>
                </div>

                {formError ? (
                  <p className={styles.formError} role="alert">
                    {formError}{' '}
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                ) : null}

                <div className={styles.actions}>
                  <Button type="submit" size="lg" withArrow disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send the brief'}
                  </Button>
                  <span className={styles.note}>No obligation. No sales sequence.</span>
                </div>
              </form>
            )}
          </div>

          <aside className={styles.aside} aria-label="What to expect">
            <div className={styles.point}>
              <span className={styles.pointLabel}>Rather talk?</span>
              <a className={styles.pointValue} href={`tel:${site.phoneRaw}`}>
                {site.phone}
              </a>
            </div>

            <div className={styles.point}>
              <span className={styles.pointLabel}>Or email</span>
              <a className={styles.pointValue} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>

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
