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
export type ContactStatus = 'idle' | 'success';

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
 * Validation rules live here, not in the markup. The conversation happens on
 * WhatsApp, which already carries the visitor's number, so email and phone are
 * optional — but checked if given, since they end up in the message.
 */
function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (values.name.trim().length < 2) errors.name = 'Please tell us your name.';
  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That email address looks incomplete.';
  }
  if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 8) {
    errors.phone = 'That phone number looks incomplete.';
  }
  if (values.message.trim().length < 12) {
    errors.message = 'A sentence or two about the business helps us prepare.';
  }

  return errors;
}

export interface UseContactFormOptions {
  /** What to do with a valid enquiry. Injected, so the hook never knows it is WhatsApp. */
  onSubmit?: (values: ContactValues) => void;
  initialChallenge?: string;
}

/**
 * The container half of the contact form: it owns values, validation and
 * submission, and knows nothing about how any of it is rendered or delivered.
 *
 * Submission is deliberately synchronous. The WhatsApp hand-off opens a new
 * window, and browsers only allow that inside the click that caused it — an
 * `await` before it would get the window blocked as a popup.
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

  const submit = useCallback(() => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;

    onSubmit?.(values);
    setStatus('success');
    return true;
  }, [onSubmit, values]);

  /** Back to the form with what they typed intact, e.g. to edit and resend. */
  const edit = useCallback(() => setStatus('idle'), []);

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
  }, []);

  return { values, errors, status, setField, submit, edit, reset } as const;
}
