import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SmoothScroll } from './SmoothScroll';
import { setMatchMedia } from '@/test/setup';

interface FakeLenis {
  options: Record<string, unknown>;
  raf: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
}

const lenis = vi.hoisted(() => ({ instances: [] as FakeLenis[] }));

vi.mock('lenis', () => ({
  default: class MockLenis {
    raf = vi.fn();
    destroy = vi.fn();

    constructor(public options: Record<string, unknown>) {
      lenis.instances.push(this as unknown as FakeLenis);
    }
  },
}));

let frames: FrameRequestCallback[] = [];
let cancelled: number[] = [];

beforeEach(() => {
  lenis.instances.length = 0;
  frames = [];
  cancelled = [];
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.push(callback);
    return frames.length;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((handle) => {
    cancelled.push(handle);
  });
});

describe('SmoothScroll', () => {
  it('renders its children untouched', () => {
    render(
      <SmoothScroll>
        <p>Page body</p>
      </SmoothScroll>,
    );

    expect(screen.getByText('Page body')).toBeInTheDocument();
  });

  it('starts a single scroll engine with the studio easing settings', () => {
    render(<SmoothScroll>body</SmoothScroll>);

    expect(lenis.instances).toHaveLength(1);
    expect(lenis.instances[0].options).toMatchObject({ duration: 1.05, touchMultiplier: 1.4 });
  });

  /** Exponential ease-out: it must start near zero and land exactly on one. */
  it('eases out and clamps at one so the scroll always settles', () => {
    render(<SmoothScroll>body</SmoothScroll>);
    const easing = lenis.instances[0].options.easing as (t: number) => number;

    expect(easing(0)).toBeCloseTo(0.001);
    expect(easing(0.5)).toBeGreaterThan(0.9);
    expect(easing(1)).toBe(1);
  });

  it('drives the engine from the animation frame loop', () => {
    render(<SmoothScroll>body</SmoothScroll>);
    const instance = lenis.instances[0];

    expect(frames).toHaveLength(1);

    frames[0](12);

    expect(instance.raf).toHaveBeenCalledWith(12);
    expect(frames).toHaveLength(2);

    frames[1](34);

    expect(instance.raf).toHaveBeenNthCalledWith(2, 34);
  });

  it('cancels the pending frame and destroys the engine on unmount', () => {
    const { unmount } = render(<SmoothScroll>body</SmoothScroll>);
    const instance = lenis.instances[0];

    frames[0](12);
    unmount();

    expect(cancelled).toEqual([2]);
    expect(instance.destroy).toHaveBeenCalledTimes(1);
  });

  /** Reduced motion means no engine at all, not an engine that is idle. */
  it('never starts the engine when the reader asked for less motion', () => {
    setMatchMedia((query) => query === '(prefers-reduced-motion: reduce)');

    const { unmount } = render(<SmoothScroll>body</SmoothScroll>);

    expect(lenis.instances).toHaveLength(0);
    expect(frames).toHaveLength(0);

    unmount();

    expect(cancelled).toEqual([]);
  });
});
