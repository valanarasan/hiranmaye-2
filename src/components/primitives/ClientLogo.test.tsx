import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ClientLogo } from './ClientLogo';
import { hasClassKey } from '@/test/utils';

afterEach(() => {
  vi.unstubAllEnvs();
});

const sizes: ReadonlyArray<[label: string, size: 'sm' | 'md' | undefined, isSmall: boolean]> = [
  ['default', undefined, false],
  ['md', 'md', false],
  ['sm', 'sm', true],
];

describe('ClientLogo', () => {
  it('labels the mark with the client name', () => {
    render(<ClientLogo name="Nature's Soul Resort" src="clients/natures-soul-resort.webp" />);

    expect(screen.getByRole('img', { name: "Nature's Soul Resort" })).toBeInTheDocument();
  });

  /**
   * The whole point of the component: the site is served from /<repo>/ on
   * GitHub Pages and from / on a custom domain, so a logo path must resolve
   * against the deploy base rather than the server root.
   */
  it('resolves the src against the deploy base', () => {
    vi.stubEnv('BASE_URL', '/hiranmaye-2/');
    render(<ClientLogo name="SAEL" src="clients/sael.webp" />);

    expect(screen.getByRole('img', { name: 'SAEL' })).toHaveAttribute(
      'src',
      '/hiranmaye-2/clients/sael.webp',
    );
  });

  it('resolves the src against the root when the site is served from the root', () => {
    vi.stubEnv('BASE_URL', '/');
    render(<ClientLogo name="SAEL" src="clients/sael.webp" />);

    expect(screen.getByRole('img', { name: 'SAEL' })).toHaveAttribute(
      'src',
      '/clients/sael.webp',
    );
  });

  it('resolves the src against whatever base the build was given', () => {
    render(<ClientLogo name="SAEL" src="clients/sael.webp" />);

    expect(screen.getByRole('img', { name: 'SAEL' })).toHaveAttribute(
      'src',
      `${import.meta.env.BASE_URL}clients/sael.webp`,
    );
  });

  it.each(sizes)('sizes the box for the %s size', (_label, size, isSmall) => {
    render(<ClientLogo name="KEJ" src="clients/kej.webp" size={size} />);
    const logo = screen.getByRole('img', { name: 'KEJ' });

    expect(hasClassKey(logo, 'logo')).toBe(true);
    expect(hasClassKey(logo, 'sm')).toBe(isSmall);
  });

  it('keeps the mark off the critical path', () => {
    render(<ClientLogo name="KEJ" src="clients/kej.webp" />);
    const logo = screen.getByRole('img', { name: 'KEJ' });

    expect(logo).toHaveAttribute('loading', 'lazy');
    expect(logo).toHaveAttribute('decoding', 'async');
  });

  it('keeps the caller class alongside its own', () => {
    render(<ClientLogo name="KEJ" src="clients/kej.webp" className="custom" />);
    const logo = screen.getByRole('img', { name: 'KEJ' });

    expect(logo).toHaveClass('custom');
    expect(hasClassKey(logo, 'logo')).toBe(true);
  });
});
