import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { useInView } from './useInView';
import { intersectionObservers, latestIntersectionObserver, triggerIntersection } from '@/test/setup';

function Probe({ once, attach = true }: { once?: boolean; attach?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(once === undefined ? {} : { once });
  return (
    <div ref={attach ? ref : undefined} data-testid="probe">
      {String(inView)}
    </div>
  );
}

const state = () => screen.getByTestId('probe').textContent;

describe('useInView', () => {
  it('starts out of view', () => {
    render(<Probe />);
    expect(state()).toBe('false');
  });

  it('flips to in-view when the element intersects', () => {
    render(<Probe />);
    act(() => triggerIntersection(true));
    expect(state()).toBe('true');
  });

  it('latches by default — leaving the viewport does not undo it', () => {
    render(<Probe />);
    act(() => triggerIntersection(true));
    act(() => triggerIntersection(false));
    expect(state()).toBe('true');
  });

  it('tracks both directions when once is false', () => {
    render(<Probe once={false} />);

    act(() => triggerIntersection(true));
    expect(state()).toBe('true');

    act(() => triggerIntersection(false));
    expect(state()).toBe('false');
  });

  it('ignores a callback fired with no entries', () => {
    render(<Probe />);

    // An empty entry list must neither throw nor change state.
    act(() => latestIntersectionObserver().emit([]));

    expect(state()).toBe('false');
  });

  it('observes with the caller-supplied margin and threshold', () => {
    render(<Probe />);

    expect(latestIntersectionObserver().options).toEqual({
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.15,
    });
    expect(latestIntersectionObserver().observe).toHaveBeenCalledWith(screen.getByTestId('probe'));
  });

  it('does nothing when no node is attached to the ref', () => {
    render(<Probe attach={false} />);
    expect(state()).toBe('false');
    expect(intersectionObservers).toHaveLength(0);
  });

  it('assumes visible where IntersectionObserver is unavailable', () => {
    const original = window.IntersectionObserver;
    // @ts-expect-error — deliberately removing the global for this case.
    delete window.IntersectionObserver;

    render(<Probe />);
    expect(state()).toBe('true');

    window.IntersectionObserver = original;
  });

  it('disconnects on unmount', () => {
    const { unmount } = render(<Probe />);
    const observer = latestIntersectionObserver();

    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
  });
});
