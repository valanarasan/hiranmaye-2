import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useContactForm } from './useContactForm';
import type { ContactValues } from './useContactForm';

function fill(set: ReturnType<typeof useContactForm>['setField'], values: Partial<ContactValues>) {
  act(() => {
    for (const [key, value] of Object.entries(values)) set(key as keyof ContactValues, value);
  });
}

const valid = { name: 'Valan', message: 'Enquiries have flattened out lately.' };

describe('useContactForm', () => {
  it('starts empty and idle', () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.values).toEqual({
      name: '', company: '', email: '', phone: '', challenge: '', message: '',
    });
    expect(result.current.status).toBe('idle');
    expect(result.current.errors).toEqual({});
  });

  it('pre-selects a challenge passed in from another page', () => {
    const { result } = renderHook(() => useContactForm({ initialChallenge: 'High ad costs' }));
    expect(result.current.values.challenge).toBe('High ad costs');
  });

  it('blocks submission and reports every invalid field', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useContactForm({ onSubmit }));
    fill(result.current.setField, { email: 'nope', phone: '12' });

    let accepted = true;
    act(() => {
      accepted = result.current.submit();
    });

    expect(accepted).toBe(false);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(Object.keys(result.current.errors).sort()).toEqual(['email', 'message', 'name', 'phone']);
  });

  /** WhatsApp already carries their number, so neither contact field is mandatory. */
  it('accepts an enquiry with no email or phone', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useContactForm({ onSubmit }));
    fill(result.current.setField, valid);

    act(() => {
      result.current.submit();
    });

    expect(result.current.errors).toEqual({});
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining(valid));
    expect(result.current.status).toBe('success');
  });

  it('accepts well-formed optional details', () => {
    const { result } = renderHook(() => useContactForm());
    fill(result.current.setField, { ...valid, email: 'v@acme.in', phone: '+91 99001 12233' });

    let accepted = false;
    act(() => {
      accepted = result.current.submit();
    });

    expect(accepted).toBe(true);
  });

  it('succeeds without an onSubmit handler', () => {
    const { result } = renderHook(() => useContactForm());
    fill(result.current.setField, valid);

    act(() => {
      result.current.submit();
    });

    expect(result.current.status).toBe('success');
  });

  /**
   * The WhatsApp window may only open inside the click that asked for it, so
   * the handler must run before submit() returns — not after an await.
   */
  it('calls onSubmit synchronously, within the submitting call', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useContactForm({ onSubmit }));
    fill(result.current.setField, valid);

    act(() => {
      result.current.submit();
      expect(onSubmit).toHaveBeenCalledOnce();
    });
  });

  it('clears a field’s error as soon as it is edited, leaving the others', () => {
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.submit();
    });

    fill(result.current.setField, { name: 'V' });

    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.errors.message).toBeDefined();
  });

  it('keeps the error map stable when editing a field that had no error', () => {
    const { result } = renderHook(() => useContactForm());
    const before = result.current.errors;

    fill(result.current.setField, { company: 'Acme' });

    expect(result.current.errors).toBe(before);
  });

  it('returns to the form with values intact on edit', () => {
    const { result } = renderHook(() => useContactForm());
    fill(result.current.setField, valid);
    act(() => {
      result.current.submit();
    });

    act(() => result.current.edit());

    expect(result.current.status).toBe('idle');
    expect(result.current.values.name).toBe('Valan');
  });

  it('clears everything on reset', () => {
    const { result } = renderHook(() => useContactForm({ initialChallenge: 'High ad costs' }));
    fill(result.current.setField, valid);
    act(() => {
      result.current.submit();
    });

    act(() => result.current.reset());

    expect(result.current.values.name).toBe('');
    expect(result.current.values.challenge).toBe('');
    expect(result.current.status).toBe('idle');
  });
});
