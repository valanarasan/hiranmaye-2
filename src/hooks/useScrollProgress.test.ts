import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useScrollProgress } from './useScrollProgress';
import { setScrollY } from '@/test/setup';

/** Drive scroll, then let the rAF the hook schedules actually run. */
async function scroll(y: number) {
  await act(async () => {
    setScrollY(y);
    window.dispatchEvent(new Event('scroll'));
    await vi.advanceTimersByTimeAsync(20);
  });
}

describe('useScrollProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((cb: FrameRequestCallback) => window.setTimeout(() => cb(performance.now()), 16)),
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => window.clearTimeout(id)));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reads the position on mount rather than waiting for a scroll', () => {
    setScrollY(450);
    const { result } = renderHook(() => useScrollProgress(900));
    expect(result.current.progress).toBeCloseTo(0.5);
  });

  it('advances with the scroll position', async () => {
    const { result } = renderHook(() => useScrollProgress(1000));

    await scroll(250);
    expect(result.current.progress).toBeCloseTo(0.25);
  });

  it('clamps to 1 past the distance and to 0 above the top', async () => {
    const { result } = renderHook(() => useScrollProgress(500));

    await scroll(5000);
    expect(result.current.progress).toBe(1);

    await scroll(-200);
    expect(result.current.progress).toBe(0);
  });

  it('keeps the ref in step for the render loop to read', async () => {
    const { result } = renderHook(() => useScrollProgress(1000));

    await scroll(600);
    expect(result.current.progressRef.current).toBeCloseTo(0.6);
  });

  it('ignores changes below the re-render threshold, but still updates the ref', async () => {
    const { result } = renderHook(() => useScrollProgress(1000));
    await scroll(500);
    const rendered = result.current.progress;

    await scroll(501);

    expect(result.current.progress).toBe(rendered);
    expect(result.current.progressRef.current).toBeCloseTo(0.501);
  });

  it('coalesces a burst of scroll events into a single frame', async () => {
    renderHook(() => useScrollProgress(1000));
    const raf = vi.mocked(requestAnimationFrame);
    raf.mockClear();

    act(() => {
      setScrollY(100);
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
    });

    expect(raf).toHaveBeenCalledTimes(1);
  });

  it('cancels a queued frame on unmount', () => {
    const { unmount } = renderHook(() => useScrollProgress(1000));

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    unmount();

    expect(vi.mocked(cancelAnimationFrame)).toHaveBeenCalled();
  });

  it('removes its listener on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    renderHook(() => useScrollProgress()).unmount();
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
