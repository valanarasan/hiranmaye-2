/**
 * The contract between the contact form and whatever actually carries a lead
 * away from the browser. The form depends on this file; it never imports a
 * concrete transport, so the delivery mechanism can change without the form
 * knowing.
 */

/** The fields a visitor fills in. */
export interface LeadFields {
  name: string;
  company: string;
  email: string;
  phone: string;
  challenge: string;
  message: string;
}

/**
 * What a transport receives: the fields, plus the context captured around
 * them. The context is what lets the studio tell an enquiry from the services
 * page apart from one that arrived cold on the contact page.
 */
export interface LeadPayload extends LeadFields {
  /** ISO 8601, from the visitor's clock. The server stamps its own too. */
  submittedAt: string;
  /** Route the form was submitted from, e.g. "/contact". */
  pagePath: string;
  /** Referring URL, or an empty string when there is none. */
  referrer: string;
  /** Which form on the site produced this. */
  source: string;
}

export interface LeadTransport {
  /** Identifies the implementation in logs and tests. */
  readonly id: string;
  /** Resolves when the lead is safely delivered; rejects otherwise. */
  send(payload: LeadPayload): Promise<void>;
}

/**
 * Every transport failure surfaces as this type, so the form can distinguish
 * "we could not deliver this" from a genuine programming error.
 */
export class LeadTransportError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'LeadTransportError';
  }
}
