import { describe, expect, it } from 'vitest';
import { act } from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { headerCta, primaryNav } from '@/content/site';
import { hasClassKey, renderWithRouter } from '@/test/utils';
import { setScrollY } from '@/test/setup';

function scrollTo(y: number) {
  act(() => {
    setScrollY(y);
    window.dispatchEvent(new Event('scroll'));
  });
}

describe('Header', () => {
  it('renders one primary nav link per configured item', () => {
    renderWithRouter(<Header />);
    const nav = screen.getByRole('navigation', { name: 'Primary' });

    expect(within(nav).getAllByRole('link')).toHaveLength(primaryNav.length);
    primaryNav.forEach((item) => {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        item.to,
      );
    });
  });

  it('marks the current route in the nav', () => {
    renderWithRouter(<Header />, { route: '/services' });
    const nav = screen.getByRole('navigation', { name: 'Primary' });

    expect(hasClassKey(within(nav).getByRole('link', { name: 'Services' }), 'active')).toBe(true);
  });

  /** `end` on the home link stops "/" matching every route beneath it. */
  it('leaves Home inactive on a sub-route', () => {
    renderWithRouter(<Header />, { route: '/services' });
    const nav = screen.getByRole('navigation', { name: 'Primary' });

    expect(hasClassKey(within(nav).getByRole('link', { name: 'Home' }), 'active')).toBe(false);
  });

  it('carries the call to action from the site content', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('link', { name: headerCta.label })).toHaveAttribute(
      'href',
      headerCta.to,
    );
  });

  it('starts unscrolled and condenses once the page moves past the offset', () => {
    renderWithRouter(<Header />);
    const banner = screen.getByRole('banner');

    expect(hasClassKey(banner, 'scrolled')).toBe(false);

    scrollTo(100);

    expect(hasClassKey(banner, 'scrolled')).toBe(true);
  });

  it('stays unscrolled within the offset', () => {
    renderWithRouter(<Header />);

    scrollTo(8);

    expect(hasClassKey(screen.getByRole('banner'), 'scrolled')).toBe(false);
  });

  /** The open drawer needs the solid header behind it even at the top of the page. */
  it('treats the open drawer as a scrolled header', async () => {
    renderWithRouter(<Header />);

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(hasClassKey(screen.getByRole('banner'), 'scrolled')).toBe(true);
  });

  it('opens and closes the mobile drawer from the burger', async () => {
    renderWithRouter(<Header />);
    const burger = screen.getByRole('button', { name: 'Open menu' });

    expect(burger).toHaveAttribute('aria-expanded', 'false');
    expect(burger).toHaveAttribute('aria-controls', 'mobile-nav');
    expect(document.getElementById('mobile-nav')).toBeNull();

    await userEvent.click(burger);

    expect(burger).toHaveAttribute('aria-expanded', 'true');
    expect(burger).toHaveAccessibleName('Close menu');
    expect(hasClassKey(burger, 'open')).toBe(true);
    const drawer = document.getElementById('mobile-nav')!;
    expect(within(drawer).getAllByRole('link')).toHaveLength(primaryNav.length + 1);

    await userEvent.click(burger);

    expect(document.getElementById('mobile-nav')).toBeNull();
    expect(hasClassKey(burger, 'open')).toBe(false);
  });

  it('locks the page behind the drawer and releases it on close', async () => {
    renderWithRouter(<Header />);
    const burger = screen.getByRole('button', { name: 'Open menu' });

    expect(document.body.style.overflow).toBe('');

    await userEvent.click(burger);
    expect(document.body.style.overflow).toBe('hidden');

    await userEvent.click(burger);
    expect(document.body.style.overflow).toBe('');
  });

  it('releases the page even if it unmounts while the drawer is open', async () => {
    const { unmount } = renderWithRouter(<Header />);

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('');
  });

  it('closes the drawer when a drawer link navigates away', async () => {
    renderWithRouter(<Header />, { route: '/' });

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const drawer = document.getElementById('mobile-nav')!;

    await userEvent.click(within(drawer).getByRole('link', { name: 'About' }));

    expect(document.getElementById('mobile-nav')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });
});
