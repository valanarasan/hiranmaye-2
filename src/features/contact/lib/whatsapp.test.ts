import { describe, expect, it } from 'vitest';
import { composeEnquiry, whatsappLink } from './whatsapp';
import type { ContactValues } from '../hooks/useContactForm';

const base: ContactValues = {
  name: 'Valan',
  company: '',
  email: '',
  phone: '',
  challenge: '',
  message: 'We opened a second outlet and enquiries have flattened.',
};

describe('whatsappLink', () => {
  it('strips every formatting character from the number', () => {
    expect(whatsappLink('+91 99006-68383')).toBe('https://wa.me/919900668383');
  });

  it('omits the text parameter when there is no message', () => {
    expect(whatsappLink('+919900668383', '')).toBe('https://wa.me/919900668383');
  });

  it('URL-encodes the message, newlines and ampersands included', () => {
    const url = whatsappLink('+919900668383', 'Hi & hello\nthere?');
    expect(url).toBe('https://wa.me/919900668383?text=Hi%20%26%20hello%0Athere%3F');
    expect(new URL(url).searchParams.get('text')).toBe('Hi & hello\nthere?');
  });
});

describe('composeEnquiry', () => {
  it('writes the minimal message in the visitor’s own voice', () => {
    expect(composeEnquiry(base)).toBe(
      "Hi Hiranmaye Digital, I'm Valan.\n\nWe opened a second outlet and enquiries have flattened.",
    );
  });

  it('names the company when given', () => {
    expect(composeEnquiry({ ...base, company: 'Acme Foods' })).toMatch(
      /^Hi Hiranmaye Digital, I'm Valan from Acme Foods\./,
    );
  });

  it('appends only the optional details that were filled in', () => {
    const message = composeEnquiry({
      ...base,
      challenge: 'Not enough leads',
      email: 'valan@acme.in',
    });

    expect(message).toContain("What's holding growth back: Not enough leads");
    expect(message).toContain('Email: valan@acme.in');
    expect(message).not.toContain('Phone:');
  });

  it('includes every detail, in a stable order, when all are given', () => {
    const lines = composeEnquiry({
      ...base,
      challenge: 'High ad costs',
      email: 'valan@acme.in',
      phone: '9900112233',
    }).split('\n');

    expect(lines.slice(-3)).toEqual([
      "What's holding growth back: High ad costs",
      'Email: valan@acme.in',
      'Phone: 9900112233',
    ]);
  });

  it('trims stray whitespace from every field', () => {
    const message = composeEnquiry({
      name: '  Valan ',
      company: ' Acme ',
      email: ' v@a.in ',
      phone: '',
      challenge: '',
      message: '  Hello there, a long enough note.  ',
    });

    expect(message).toBe(
      "Hi Hiranmaye Digital, I'm Valan from Acme.\n\nHello there, a long enough note.\n\nEmail: v@a.in",
    );
  });
});
