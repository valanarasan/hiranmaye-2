import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { services } from '@/content/services';
import { hasClassKey } from '@/test/utils';
import { ServiceIndex } from './ServiceIndex';

describe('ServiceIndex', () => {
  it('lists every service as an in-page anchor', () => {
    render(<ServiceIndex services={services} activeId={null} />);
    const nav = screen.getByRole('navigation', { name: 'Capabilities' });
    const links = within(nav).getAllByRole('link');

    expect(links).toHaveLength(services.length);
    links.forEach((link, index) => {
      const service = services[index];
      expect(link).toHaveAttribute('href', `#${service.id}`);
      expect(link).toHaveTextContent(service.index);
      expect(link).toHaveTextContent(service.title);
    });
  });

  it('marks nothing as current before a section has been observed', () => {
    render(<ServiceIndex services={services} activeId={null} />);

    screen.getAllByRole('link').forEach((link) => {
      expect(link).not.toHaveAttribute('aria-current');
      expect(hasClassKey(link, 'active')).toBe(false);
    });
  });

  it('marks exactly the active service as current', () => {
    const active = services[3];
    render(<ServiceIndex services={services} activeId={active.id} />);

    const current = screen.getByRole('link', { current: true });
    expect(current).toHaveAttribute('href', `#${active.id}`);
    expect(hasClassKey(current, 'active')).toBe(true);
    expect(screen.getAllByRole('link').filter((link) => link.hasAttribute('aria-current'))).toHaveLength(1);
  });

  it('renders an empty list rather than failing when there are no services', () => {
    render(<ServiceIndex services={[]} activeId={null} />);

    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(screen.getByRole('navigation', { name: 'Capabilities' })).toBeInTheDocument();
  });
});
