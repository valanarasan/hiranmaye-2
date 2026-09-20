import { useCallback } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Container, Field, Section, Text } from '@/components/primitives';
import { challengeOptions, contactAssurances } from '@/content/contact';
import { site } from '@/content/site';
import type { ContactValues } from '../hooks/useContactForm';
import { useContactForm } from '../hooks/useContactForm';
import { composeEnquiry, whatsappLink } from '../lib/whatsapp';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [searchParams] = useSearchParams();

  // Hands a valid enquiry to WhatsApp with the message pre-written. If the
  // browser blocks the new tab, fall back to navigating this one there, so the
  // visitor always lands in the chat.
  const openWhatsApp = useCallback((fields: ContactValues) => {
    const url = whatsappLink(site.phoneRaw, composeEnquiry(fields));
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.assign(url);
  }, []);

  const { values, errors, status, setField, submit, edit } = useContactForm({
    onSubmit: openWhatsApp,
    initialChallenge: searchParams.get('challenge') ?? '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
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
                <Text variant="h3">Your message is ready in WhatsApp.</Text>
                <Text tone="muted">
                  Press send there and it reaches us directly. We read every enquiry properly
                  and reply within one working day, from a person who has actually looked at
                  your business.
                </Text>
                <div className={styles.successActions}>
                  <Button
                    as="a"
                    href={whatsappLink(site.phoneRaw, composeEnquiry(values))}
                    target="_blank"
                    rel="noreferrer noopener"
                    withArrow
                  >
                    WhatsApp didn't open? Continue here
                  </Button>
                  <Button type="button" variant="link" onClick={edit}>
                    Edit my message
                  </Button>
                </div>
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
                        placeholder="Optional"
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
                  <Button type="submit" size="lg" withArrow>
                    Continue on WhatsApp
                  </Button>
                  <span className={styles.note}>
                    Opens WhatsApp with your message ready — you press send.
                  </span>
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
