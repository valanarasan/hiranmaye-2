import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ClientStrip } from './ClientStrip';
import { clients } from '@/content/clients';
import { hasClassKey } from '@/test/utils';

describe('ClientStrip', () => {
  it('names the strip for what it shows', () => {
    render(<ClientStrip />);

    expect(screen.getByRole('region', { name: 'Trusted by' })).toBeInTheDocument();
  });

  it('renders one mark per client, in content order', () => {
    render(<ClientStrip />);

    const marks = screen.getAllByRole('img');
    expect(marks.map((mark) => mark.getAttribute('alt'))).toEqual(
      clients.map((client) => client.name),
    );
  });

  it('puts each mark in its own list item', () => {
    render(<ClientStrip />);

    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(clients.length);
    items.forEach((item) => expect(within(item).getByRole('img')).toBeInTheDocument());
  });

  it.each(clients.map((client) => [client.name, client.logo] as const))(
    'points the %s mark at its own logo',
    (name, logo) => {
      render(<ClientStrip />);

      expect(screen.getByRole('img', { name })).toHaveAttribute(
        'src',
        `${import.meta.env.BASE_URL}${logo}`,
      );
    },
  );

  /** A strip, not a wall: the marks run small so the row stays quiet. */
  it('renders every mark at the small size', () => {
    render(<ClientStrip />);

    screen.getAllByRole('img').forEach((mark) => {
      expect(hasClassKey(mark, 'sm')).toBe(true);
    });
  });
});
