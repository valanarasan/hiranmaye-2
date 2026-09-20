import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { renderWithRouter } from '@/test/utils';

/** jsdom implements no layout, so it ships no scrollIntoView to spy on. */
Element.prototype.scrollIntoView = vi.fn();

const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
const scrollTo = vi.mocked(window.scrollTo);

describe('ScrollToTop', () => {
  it('jumps to the top of the document on first render', () => {
    renderWithRouter(<ScrollToTop />, { route: '/services' });

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('jumps to the top again on every route change', async () => {
    renderWithRouter(
      <>
        <Link to="/insights">Insights</Link>
        <ScrollToTop />
      </>,
      { route: '/about' },
    );
    expect(scrollTo).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole('link', { name: 'Insights' }));

    expect(scrollTo).toHaveBeenCalledTimes(2);
  });

  it('scrolls a matching in-page anchor into view instead of the top', () => {
    renderWithRouter(
      <>
        <div id="why-us">Why us</div>
        <ScrollToTop />
      </>,
      { route: '/about#why-us' },
    );

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('falls back to the top when the hash matches nothing on the page', () => {
    renderWithRouter(<ScrollToTop />, { route: '/about#missing' });

    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('renders nothing of its own', () => {
    const { container } = renderWithRouter(<ScrollToTop />);
    expect(container).toBeEmptyDOMElement();
  });
});
