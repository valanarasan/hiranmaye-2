import { describe, expect, it, vi } from 'vitest';
import { createUnconfiguredTransport } from './unconfiguredTransport';
import { LeadTransportError } from './types';
import type { LeadPayload } from './types';

const payload: LeadPayload = {
  name: 'Valan',
  company: '',
  email: 'valan@acme.in',
  phone: '',
  challenge: '',
  message: 'Hello there.',
  submittedAt: '2026-09-15T09:30:00.000Z',
  pagePath: '/contact',
  referrer: '',
  source: 'contact-page',
};

describe('unconfigured transport', () => {
  it('identifies itself', () => {
    expect(createUnconfiguredTransport().id).toBe('unconfigured');
  });

  it('logs and resolves in development, so the flow can be demoed with no backend', async () => {
    vi.stubEnv('DEV', true);
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});

    await expect(createUnconfiguredTransport().send(payload)).resolves.toBeUndefined();
    expect(info).toHaveBeenCalledWith(expect.stringContaining('VITE_LEAD_ENDPOINT'), payload);
  });

  it('fails loudly in a production build rather than swallowing the enquiry', async () => {
    vi.stubEnv('DEV', false);

    await expect(createUnconfiguredTransport().send(payload)).rejects.toThrow(LeadTransportError);
    await expect(createUnconfiguredTransport().send(payload)).rejects.toThrow(
      /No lead endpoint is configured/,
    );
  });
});
