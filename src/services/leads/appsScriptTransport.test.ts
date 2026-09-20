import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createAppsScriptTransport } from './appsScriptTransport';
import { LeadTransportError } from './types';
import type { LeadPayload } from './types';

const payload: LeadPayload = {
  name: 'Valan',
  company: 'Acme Foods',
  email: 'valan@acme.in',
  phone: '9900112233',
  challenge: 'Not enough leads',
  message: 'Enquiries have flattened out since the second outlet opened.',
  submittedAt: '2026-09-15T09:30:00.000Z',
  pagePath: '/contact',
  referrer: '',
  source: 'contact-page',
};

const ENDPOINT = 'https://script.google.com/macros/s/AKfy/exec';

function mockFetch(impl: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) {
  const fetchMock = vi.fn(impl);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const ok = (body: unknown) =>
  Promise.resolve(new Response(JSON.stringify(body), { status: 200 }));

describe('Apps Script transport', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('identifies itself', () => {
    expect(createAppsScriptTransport({ endpoint: ENDPOINT }).id).toBe('apps-script');
  });

  it('resolves when the script reports ok', async () => {
    const fetchMock = mockFetch(() => ok({ ok: true }));

    await expect(
      createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload),
    ).resolves.toBeUndefined();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]![0]).toBe(ENDPOINT);
  });

  /**
   * The single most breakable detail in this file. An Apps Script web app
   * cannot answer a CORS preflight, so anything other than a simple-request
   * content type makes the POST fail before it leaves the browser.
   */
  it('posts as text/plain so the browser never issues a preflight', async () => {
    const fetchMock = mockFetch(() => ok({ ok: true }));

    await createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload);

    const init = fetchMock.mock.calls[0]![1] as RequestInit;
    expect(init.method).toBe('POST');
    expect((init.headers as Record<string, string>)['Content-Type']).toBe(
      'text/plain;charset=utf-8',
    );
  });

  it('follows the redirect Apps Script answers with', async () => {
    const fetchMock = mockFetch(() => ok({ ok: true }));

    await createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload);

    expect((fetchMock.mock.calls[0]![1] as RequestInit).redirect).toBe('follow');
  });

  it('sends the payload verbatim when no token is configured', async () => {
    const fetchMock = mockFetch(() => ok({ ok: true }));

    await createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload);

    const body = JSON.parse((fetchMock.mock.calls[0]![1] as RequestInit).body as string);
    expect(body).toEqual(payload);
    expect(body).not.toHaveProperty('token');
  });

  it('adds the token when one is configured', async () => {
    const fetchMock = mockFetch(() => ok({ ok: true }));

    await createAppsScriptTransport({ endpoint: ENDPOINT, token: 'sesame' }).send(payload);

    const body = JSON.parse((fetchMock.mock.calls[0]![1] as RequestInit).body as string);
    expect(body).toMatchObject({ ...payload, token: 'sesame' });
  });

  it('rejects on a non-2xx response, naming the status', async () => {
    mockFetch(() => Promise.resolve(new Response('boom', { status: 500 })));

    await expect(createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload)).rejects.toThrow(
      /replied 500/,
    );
  });

  it('rejects when the script answers 200 but reports failure', async () => {
    mockFetch(() => ok({ ok: false, error: 'Rejected.' }));

    await expect(createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload)).rejects.toThrow(
      'Rejected.',
    );
  });

  it('falls back to a generic message when the script gives no reason', async () => {
    mockFetch(() => ok({ ok: false }));

    await expect(createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload)).rejects.toThrow(
      /rejected the enquiry/,
    );
  });

  it('wraps a network failure as a LeadTransportError, keeping the cause', async () => {
    const cause = new TypeError('Failed to fetch');
    mockFetch(() => Promise.reject(cause));

    const error = await createAppsScriptTransport({ endpoint: ENDPOINT })
      .send(payload)
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(LeadTransportError);
    expect((error as LeadTransportError).message).toMatch(/Could not reach/);
    expect((error as LeadTransportError).cause).toBe(cause);
  });

  it('wraps a malformed JSON body rather than leaking a SyntaxError', async () => {
    mockFetch(() => Promise.resolve(new Response('<html>not json</html>', { status: 200 })));

    await expect(createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload)).rejects.toThrow(
      LeadTransportError,
    );
  });

  it('aborts a request that outlives the timeout', async () => {
    vi.useFakeTimers();

    mockFetch(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }),
    );

    const pending = createAppsScriptTransport({ endpoint: ENDPOINT, timeoutMs: 50 }).send(payload);
    const assertion = expect(pending).rejects.toThrow(/Could not reach/);

    await vi.advanceTimersByTimeAsync(60);
    await assertion;

    vi.useRealTimers();
  });

  it('clears the timeout once a request settles', async () => {
    vi.useFakeTimers();
    const clear = vi.spyOn(window, 'clearTimeout');
    mockFetch(() => ok({ ok: true }));

    await createAppsScriptTransport({ endpoint: ENDPOINT }).send(payload);

    expect(clear).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
