import type { LeadFields, LeadPayload } from './types';

export interface LeadContext {
  source: string;
  pagePath?: string;
  referrer?: string;
}

/**
 * Widens the fields a visitor typed into the payload a transport sends. Kept
 * separate from both the form and the transport so neither has to know how
 * the context is gathered.
 */
export function createLeadPayload(fields: LeadFields, context: LeadContext): LeadPayload {
  const trimmed = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value.trim()]),
  ) as LeadFields;

  return {
    ...trimmed,
    submittedAt: new Date().toISOString(),
    pagePath: context.pagePath ?? window.location.pathname,
    referrer: context.referrer ?? document.referrer,
    source: context.source,
  };
}
