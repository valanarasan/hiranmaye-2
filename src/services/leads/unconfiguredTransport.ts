import type { LeadPayload, LeadTransport } from './types';
import { LeadTransportError } from './types';

/**
 * Stands in when no endpoint is configured. In development it logs the lead so
 * the form can be exercised end to end without a backend; in a production
 * build it fails loudly, because a contact form that silently swallows
 * enquiries is worse than one that admits it is broken.
 */
export function createUnconfiguredTransport(): LeadTransport {
  return {
    id: 'unconfigured',

    async send(payload: LeadPayload): Promise<void> {
      if (import.meta.env.DEV) {
        console.info('[leads] No VITE_LEAD_ENDPOINT set — logging instead of sending.', payload);
        return;
      }

      throw new LeadTransportError('No lead endpoint is configured for this build.');
    },
  };
}
