import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { contactHero, officeSection, socialSection } from '@/content/contact';
import { seo } from '@/content/seo';
import { renderWithRouter } from '@/test/utils';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('sets the contact page metadata', () => {
    renderWithRouter(<ContactPage />);

    expect(document.title).toBe(seo.contact.title);
    expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      seo.contact.title,
    );
  });

  it('opens with the contact hero', () => {
    renderWithRouter(<ContactPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: contactHero.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText(contactHero.lead)).toBeInTheDocument();
  });

  it.each([
    ['the enquiry form', 'Contact form'],
    ['the office and map', officeSection.headline],
    ['the social channels', socialSection.headline],
  ])('composes %s', (_name, heading) => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument();
  });
});
