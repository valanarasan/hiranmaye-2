import type { LeadPayload, LeadTransport } from './types';
import { LeadTransportError } from './types';

export interface AppsScriptTransportOptions {
  /** The /exec URL of the deployed Apps Script web app. */
  endpoint: string;
  /** Optional shared secret, checked server-side before anything is written. */
  token?: string;
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 12_000;

/**
 * Posts the lead to a Google Apps Script web app, which appends it to a Sheet
 * and emails the studio.
 *
 * The Content-Type is deliberately text/plain. An Apps Script web app cannot
 * answer a CORS preflight, so any request that triggers one — application/json
 * included — fails before it leaves the browser. text/plain keeps this a
 * "simple request": no preflight, and the script parses the body itself.
 */
export function createAppsScriptTransport({
  endpoint,
  token,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: AppsScriptTransportOptions): LeadTransport {
  return {
    id: 'apps-script',

    async send(payload: LeadPayload): Promise<void> {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(token ? { ...payload, token } : payload),
          signal: controller.signal,
          // Apps Script answers with a 302 to googleusercontent.com; the
          // redirected response is the one carrying the JSON and the CORS
          // header, so it has to be followed.
          redirect: 'follow',
        });

        if (!response.ok) {
          throw new LeadTransportError(`The lead endpoint replied ${response.status}.`);
        }

        const result = (await response.json()) as { ok?: boolean; error?: string };
        if (!result.ok) {
          throw new LeadTransportError(result.error ?? 'The lead endpoint rejected the enquiry.');
        }
      } catch (cause) {
        if (cause instanceof LeadTransportError) throw cause;
        throw new LeadTransportError('Could not reach the lead endpoint.', { cause });
      } finally {
        window.clearTimeout(timer);
      }
    },
  };
}
