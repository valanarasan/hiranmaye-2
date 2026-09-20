import { createAppsScriptTransport } from './appsScriptTransport';
import { createUnconfiguredTransport } from './unconfiguredTransport';
import type { LeadTransport } from './types';

export type { LeadContext } from './payload';
export type { LeadFields, LeadPayload, LeadTransport } from './types';
export { LeadTransportError } from './types';
export { createLeadPayload } from './payload';
export { createAppsScriptTransport } from './appsScriptTransport';
export { createUnconfiguredTransport } from './unconfiguredTransport';

let cached: LeadTransport | undefined;

function createFromEnvironment(): LeadTransport {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT?.trim();
  if (!endpoint) return createUnconfiguredTransport();

  return createAppsScriptTransport({
    endpoint,
    token: import.meta.env.VITE_LEAD_TOKEN?.trim() || undefined,
  });
}

/**
 * The one place the app chooses a concrete transport. Everything else takes a
 * LeadTransport as a dependency, so tests and stories can hand in their own.
 */
export function getLeadTransport(): LeadTransport {
  cached ??= createFromEnvironment();
  return cached;
}
