import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from './PageTransition';
import { hasClassKey, renderWithRouter } from '@/test/utils';

function Probe({ onMount }: { onMount: () => void }) {
  useEffect(onMount, [onMount]);
  return <p>Page body</p>;
}

describe('PageTransition', () => {
  it('wraps the page body in the transition element', () => {
    renderWithRouter(
      <PageTransition>
        <p>Page body</p>
      </PageTransition>,
    );
    const body = screen.getByText('Page body');

    expect(hasClassKey(body.parentElement!, 'page')).toBe(true);
  });

  /**
   * The animation is keyed on the pathname, so a route change has to tear the
   * subtree down and build it again — otherwise the transition never replays.
   */
  it('remounts the page when the route changes', async () => {
    const onMount = vi.fn();
    renderWithRouter(
      <>
        <Link to="/services">Services</Link>
        <PageTransition>
          <Probe onMount={onMount} />
        </PageTransition>
      </>,
      { route: '/about' },
    );

    expect(onMount).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole('link', { name: 'Services' }));

    expect(onMount).toHaveBeenCalledTimes(2);
  });

  it('keeps the page mounted when the route does not change', async () => {
    const onMount = vi.fn();
    renderWithRouter(
      <>
        <Link to="/about">About</Link>
        <PageTransition>
          <Probe onMount={onMount} />
        </PageTransition>
      </>,
      { route: '/about' },
    );

    await userEvent.click(screen.getByRole('link', { name: 'About' }));

    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
