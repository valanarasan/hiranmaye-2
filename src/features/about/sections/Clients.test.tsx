import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Clients } from './Clients';
import { clients, clientsSection, partners } from '@/content/clients';
import { hasClassKey } from '@/test/utils';

const { contentState } = vi.hoisted(() => ({ contentState: { withoutPartners: false } }));

/**
 * The real content always names a partner, so the "no partners" path — the
 * only way the line is dropped — is staged here.
 */
vi.mock('@/content/clients', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/content/clients')>();
  return {
    ...actual,
    get partners() {
      return contentState.withoutPartners ? [] : actual.partners;
    },
  };
});

describe('Clients', () => {
  it('anchors itself at #clients for the in-page links that point here', () => {
    render(<Clients />);

    const region = screen.getByRole('region', { name: clientsSection.headline });
    expect(region).toHaveAttribute('id', 'clients');
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'clients-title');
  });

  it('renders the section header from the clients content', () => {
    render(<Clients />);

    expect(screen.getByText(clientsSection.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: clientsSection.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText(clientsSection.lead)).toBeInTheDocument();
  });

  it('gives every client a cell of the wall', () => {
    render(<Clients />);

    const cells = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(cells).toHaveLength(clients.length);
  });

  it.each(clients.map((client) => [client.name, client.logo, client.sector] as const))(
    'shows the %s mark with the sector it works in',
    (name, logo, sector) => {
      render(<Clients />);

      const cell = screen.getByRole('img', { name }).closest('li') as HTMLElement;
      expect(screen.getByRole('img', { name })).toHaveAttribute(
        'src',
        `${import.meta.env.BASE_URL}${logo}`,
      );
      expect(within(cell).getByText(sector)).toBeInTheDocument();
    },
  );

  /** The wall gets the larger mark; the home strip is the small one. */
  it('renders the wall marks at the default size', () => {
    render(<Clients />);

    screen.getAllByRole('img').forEach((mark) => {
      expect(hasClassKey(mark, 'sm')).toBe(false);
    });
  });

  it('names the partners on a line of their own', () => {
    render(<Clients />);

    const line = screen.getByText('Our partners').parentElement as HTMLElement;
    expect(line).toHaveTextContent(partners.join(' · '));
  });

  it('drops the partners line entirely when there are no partners', () => {
    contentState.withoutPartners = true;
    try {
      render(<Clients />);

      expect(screen.queryByText('Our partners')).not.toBeInTheDocument();
      expect(screen.getAllByRole('img')).toHaveLength(clients.length);
    } finally {
      contentState.withoutPartners = false;
    }
  });
});
