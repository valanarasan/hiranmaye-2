import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createLeadPayload } from './payload';
import type { LeadFields } from './types';

const fields: LeadFields = {
  name: '  Valan  ',
  company: ' Acme Foods ',
  email: ' valan@acme.in ',
  phone: ' 9900112233 ',
  challenge: 'Not enough leads',
  message: '  Enquiries have flattened out.  ',
};

describe('createLeadPayload', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-15T09:30:00.000Z'));
  });

  it('trims every field so stray whitespace never reaches the sheet', () => {
    const payload = createLeadPayload(fields, { source: 'contact-page' });

    expect(payload.name).toBe('Valan');
    expect(payload.company).toBe('Acme Foods');
    expect(payload.email).toBe('valan@acme.in');
    expect(payload.phone).toBe('9900112233');
    expect(payload.message).toBe('Enquiries have flattened out.');
  });

  it('stamps the submission time', () => {
    expect(createLeadPayload(fields, { source: 'contact-page' }).submittedAt).toBe(
      '2026-09-15T09:30:00.000Z',
    );
  });

  it('carries the source through unchanged', () => {
    expect(createLeadPayload(fields, { source: 'newsletter' }).source).toBe('newsletter');
  });

  it('falls back to the live location and referrer when none are given', () => {
    window.history.pushState({}, '', '/services');
    vi.spyOn(document, 'referrer', 'get').mockReturnValue('https://www.linkedin.com/');

    const payload = createLeadPayload(fields, { source: 'contact-page' });

    expect(payload.pagePath).toBe('/services');
    expect(payload.referrer).toBe('https://www.linkedin.com/');
  });

  it('prefers explicit context over the live values', () => {
    window.history.pushState({}, '', '/contact');

    const payload = createLeadPayload(fields, {
      source: 'contact-page',
      pagePath: '/campaign/diwali',
      referrer: 'https://example.test/ad',
    });

    expect(payload.pagePath).toBe('/campaign/diwali');
    expect(payload.referrer).toBe('https://example.test/ad');
  });

  it('accepts an empty referrer without substituting the live one', () => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue('https://should-not-be-used.test/');

    expect(createLeadPayload(fields, { source: 'contact-page', referrer: '' }).referrer).toBe('');
  });
});
