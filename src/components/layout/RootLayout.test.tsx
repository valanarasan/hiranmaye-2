import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { hasClassKey } from '@/test/utils';

/** The real scroll engine needs layout; the layout test only cares that it wraps. */
vi.mock('lenis', () => ({
  default: class MockLenis {
    raf = vi.fn();
    destroy = vi.fn();
  },
}));

function renderLayout(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<h1>Home page</h1>} />
          <Route path="about" element={<h1>About page</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('RootLayout', () => {
  it('frames the routed page with the header and the footer', () => {
    renderLayout();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Home page' })).toBeInTheDocument();
  });

  it('renders the matched child route into the main landmark', () => {
    renderLayout('/about');
    const main = screen.getByRole('main');

    expect(main).toHaveAttribute('id', 'main');
    expect(main).toContainElement(screen.getByRole('heading', { name: 'About page' }));
  });

  /** The skip link is the first thing in the tab order and must target the landmark. */
  it('offers a skip link that jumps to the main landmark', () => {
    renderLayout();
    const skip = screen.getByRole('link', { name: 'Skip to content' });

    expect(skip).toHaveAttribute('href', '#main');
    expect(hasClassKey(skip, 'skip')).toBe(true);
    expect(skip.compareDocumentPosition(screen.getByRole('banner'))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('resets the scroll position for the routed page', () => {
    renderLayout('/about');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });
});
