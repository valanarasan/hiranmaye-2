import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import { Footer } from './Footer';
import { footerColumns, site, socialChannels } from '@/content/site';
import { office } from '@/content/contact';
import { hasClassKey, renderWithRouter } from '@/test/utils';

afterEach(() => {
  vi.useRealTimers();
});

describe('Footer', () => {
  it('states the positioning line the studio leads with', () => {
    renderWithRouter(<Footer />);
    expect(
      screen.getByText('Impressions are not growth. What moves the business forward is.'),
    ).toBeInTheDocument();
  });

  it('links every social channel out to its own profile', () => {
    renderWithRouter(<Footer />);
    const list = screen.getByRole('list', { name: 'Hiranmaye Digital elsewhere' });

    expect(within(list).getAllByRole('link')).toHaveLength(socialChannels.length);
    socialChannels.forEach((channel) => {
      const link = within(list).getByRole('link', {
        name: `${channel.name} — ${channel.handle}`,
      });

      expect(link).toHaveAttribute('href', channel.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer noopener');
      expect(link).toHaveAttribute('title', channel.name);
      expect(link.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('gives each footer column its own labelled nav with all of its links', () => {
    renderWithRouter(<Footer />);

    footerColumns.forEach((column) => {
      const nav = screen.getByRole('navigation', { name: column.title });

      expect(within(nav).getAllByRole('link')).toHaveLength(column.links.length);
      column.links.forEach((link) => {
        expect(within(nav).getByRole('link', { name: link.label })).toHaveAttribute(
          'href',
          link.to,
        );
      });
    });
  });

  it('prints the studio address from the contact content', () => {
    const { container } = renderWithRouter(<Footer />);
    const address = container.querySelector('address')!;

    expect(address).toHaveTextContent(office.street);
    expect(address).toHaveTextContent(office.locality);
    expect(address).toHaveTextContent(`${office.city} ${office.postcode}`);
  });

  it('makes the phone and email directly actionable', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByRole('link', { name: site.phone })).toHaveAttribute(
      'href',
      `tel:${site.phoneRaw}`,
    );
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute(
      'href',
      `mailto:${site.email}`,
    );
  });

  it('sends the map link out to the studio pin in a new tab', () => {
    renderWithRouter(<Footer />);
    const link = screen.getByRole('link', { name: 'Find us on Google Maps' });

    expect(link).toHaveAttribute('href', office.mapsUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('carries the dark-surface logo and the domain', () => {
    renderWithRouter(<Footer />);
    const logo = screen.getByRole('link', { name: 'Hiranmaye Digital — home' });

    expect(hasClassKey(logo, 'onDark')).toBe(true);
    expect(screen.getByText(site.domain)).toBeInTheDocument();
  });

  it('dates the copyright from the clock rather than a hardcoded year', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2031-06-01T00:00:00Z'));

    renderWithRouter(<Footer />);

    expect(screen.getByText(`© 2031 ${site.name}`)).toBeInTheDocument();
  });
});
