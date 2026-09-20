import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * The factory caches its choice, so every case here re-imports the module with
 * a fresh registry rather than fighting the cache.
 */
async function loadFactory() {
  vi.resetModules();
  return import('./index');
}

describe('getLeadTransport', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('falls back to the unconfigured transport when no endpoint is set', async () => {
    vi.stubEnv('VITE_LEAD_ENDPOINT', '');

    const { getLeadTransport } = await loadFactory();
    expect(getLeadTransport().id).toBe('unconfigured');
  });

  it('treats a whitespace-only endpoint as absent', async () => {
    vi.stubEnv('VITE_LEAD_ENDPOINT', '   ');

    const { getLeadTransport } = await loadFactory();
    expect(getLeadTransport().id).toBe('unconfigured');
  });

  it('builds the Apps Script transport when an endpoint is configured', async () => {
    vi.stubEnv('VITE_LEAD_ENDPOINT', 'https://script.google.com/macros/s/AKfy/exec');

    const { getLeadTransport } = await loadFactory();
    expect(getLeadTransport().id).toBe('apps-script');
  });

  it('passes a configured token through to the transport', async () => {
    vi.stubEnv('VITE_LEAD_ENDPOINT', 'https://script.google.com/macros/s/AKfy/exec');
    vi.stubEnv('VITE_LEAD_TOKEN', 'sesame');
    const fetchMock = vi.fn((_input: RequestInfo | URL, _init?: RequestInit) =>
      Promise.resolve(new Response('{"ok":true}', { status: 200 })),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { createLeadPayload, getLeadTransport } = await loadFactory();
    await getLeadTransport().send(
      createLeadPayload(
        { name: 'V', company: '', email: 'v@a.in', phone: '', challenge: '', message: 'hi' },
        { source: 'contact-page' },
      ),
    );

    const body = JSON.parse((fetchMock.mock.calls[0]![1] as RequestInit).body as string);
    expect(body.token).toBe('sesame');
    vi.unstubAllGlobals();
  });

  it('omits an empty token rather than sending a blank one', async () => {
    vi.stubEnv('VITE_LEAD_ENDPOINT', 'https://script.google.com/macros/s/AKfy/exec');
    vi.stubEnv('VITE_LEAD_TOKEN', '  ');
    const fetchMock = vi.fn((_input: RequestInfo | URL, _init?: RequestInit) =>
      Promise.resolve(new Response('{"ok":true}', { status: 200 })),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { createLeadPayload, getLeadTransport } = await loadFactory();
    await getLeadTransport().send(
      createLeadPayload(
        { name: 'V', company: '', email: 'v@a.in', phone: '', challenge: '', message: 'hi' },
        { source: 'contact-page' },
      ),
    );

    expect(
      JSON.parse((fetchMock.mock.calls[0]![1] as RequestInit).body as string),
    ).not.toHaveProperty('token');
    vi.unstubAllGlobals();
  });

  it('resolves the transport once and reuses it', async () => {
    vi.stubEnv('VITE_LEAD_ENDPOINT', 'https://script.google.com/macros/s/AKfy/exec');

    const { getLeadTransport } = await loadFactory();
    expect(getLeadTransport()).toBe(getLeadTransport());
  });
});
