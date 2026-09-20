import { useCallback, useMemo, useRef, useState } from 'react';
import type { LeadFields } from '@/services/leads';

export type ContactValues = LeadFields;
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export type ContactStatus = 'idle' | 'submitting' | 'success';

const EMPTY: ContactValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  challenge: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * A floor on how fast the form can plausibly be filled in. Five fields and a
 * paragraph take a person far longer than this; a script posts instantly.
 */
const MIN_FILL_MS = 3_000;

/** Validation rules live here, not in the markup. */
function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (values.name.trim().length < 2) errors.name = 'Please tell us your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'A valid email address, please.';
  if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 8) {
    errors.phone = 'That phone number looks incomplete.';
  }
  if (values.message.trim().length < 12) {
    errors.message = 'A sentence or two about the business helps us prepare.';
  }

  return errors;
}

export interface UseContactFormOptions {
  /** Injected transport. Defaults to a no-op so the UI works without a backend. */
  onSubmit?: (values: ContactValues) => Promise<void>;
  initialChallenge?: string;
}

/**
 * The container half of the contact form: it owns values, validation,
 * spam filtering and submission, and knows nothing about how any of it is
 * rendered.
 */
export function useContactForm({ onSubmit, initialChallenge = '' }: UseContactFormOptions = {}) {
  const [values, setValues] = useState<ContactValues>({
    ...EMPTY,
    challenge: initialChallenge,
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<ContactStatus>('idle');

  /**
   * Two invisible bot filters: a field only a script would fill, and the time
   * floor above. Neither asks the visitor to prove anything, which is the
   * point — a captcha on a five-field form costs more leads than it saves.
   */
  const [honeypot, setHoneypot] = useState('');
  const openedAt = useRef(Date.now());

  const setField = useCallback(<K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
    setFormError(undefined);
  }, []);

  const submit = useCallback(async () => {
    const looksAutomated = honeypot.trim() !== '' || Date.now() - openedAt.current < MIN_FILL_MS;
    if (looksAutomated) {
      // Show a bot exactly the screen it is looking for, and send nothing.
      setStatus('success');
      return true;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFormError(undefined);
    if (Object.keys(nextErrors).length > 0) return false;

    setStatus('submitting');
    try {
      await (onSubmit?.(values) ?? Promise.resolve());
      setStatus('success');
      return true;
    } catch {
      setStatus('idle');
      setFormError('That did not send. Please try again, or email us directly — the address is just below.');
      return false;
    }
  }, [honeypot, onSubmit, values]);

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setFormError(undefined);
    setStatus('idle');
    setHoneypot('');
    openedAt.current = Date.now();
  }, []);

  /** Spread onto the decoy input; the view never has to know what it is for. */
  const honeypotProps = useMemo(
    () => ({
      name: 'company_website',
      value: honeypot,
      onChange: (event: { target: { value: string } }) => setHoneypot(event.target.value),
      tabIndex: -1,
      autoComplete: 'off' as const,
    }),
    [honeypot],
  );

  return { values, errors, formError, status, setField, submit, reset, honeypotProps } as const;
}
