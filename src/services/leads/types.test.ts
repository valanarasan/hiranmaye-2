import { describe, expect, it } from 'vitest';
import { LeadTransportError } from './types';

describe('LeadTransportError', () => {
  it('is a named Error subclass, so callers can branch on it', () => {
    const error = new LeadTransportError('nope');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('LeadTransportError');
    expect(error.message).toBe('nope');
  });

  it('keeps the underlying cause for debugging', () => {
    const cause = new TypeError('Failed to fetch');
    expect(new LeadTransportError('wrapped', { cause }).cause).toBe(cause);
  });
});
