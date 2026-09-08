import { useCallback, useState } from 'react';

export interface ContactValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  challenge: string;
  message: string;
}

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
 * The container half of the contact form: it owns values, validation and
 * submission, and knows nothing about how any of it is rendered.
 */
export function useContactForm({ onSubmit, initialChallenge = '' }: UseContactFormOptions = {}) {
  const [values, setValues] = useState<ContactValues>({
    ...EMPTY,
    challenge: initialChallenge,
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<ContactStatus>('idle');

  const setField = useCallback(<K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  }, []);

  const submit = useCallback(async () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;

    setStatus('submitting');
    try {
      await (onSubmit?.(values) ?? Promise.resolve());
      setStatus('success');
      return true;
    } catch {
      setStatus('idle');
      setErrors({ message: 'Something went wrong sending that. Please try again or email us.' });
      return false;
    }
  }, [onSubmit, values]);

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
  }, []);

  return { values, errors, status, setField, submit, reset } as const;
}
