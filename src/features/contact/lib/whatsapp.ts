import type { ContactValues } from '../hooks/useContactForm';

/**
 * Builds a wa.me link. wa.me wants the number as bare digits with the country
 * code — no plus, spaces or dashes — so any formatting is stripped here rather
 * than trusted to the caller.
 */
export function whatsappLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Turns the form into the first message of a WhatsApp conversation. Written in
 * the visitor's voice, because they send it: it has to read like something a
 * person would type, not a database dump. Empty optional fields are left out.
 */
export function composeEnquiry(values: ContactValues): string {
  const name = values.name.trim();
  const company = values.company.trim();
  const intro = company
    ? `Hi Hiranmaye Digital, I'm ${name} from ${company}.`
    : `Hi Hiranmaye Digital, I'm ${name}.`;

  const details = [
    values.challenge.trim() && `What's holding growth back: ${values.challenge.trim()}`,
    values.email.trim() && `Email: ${values.email.trim()}`,
    values.phone.trim() && `Phone: ${values.phone.trim()}`,
  ].filter(Boolean);

  return [intro, '', values.message.trim(), ...(details.length ? ['', ...details] : [])].join('\n');
}
