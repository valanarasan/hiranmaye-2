import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { setMatchMedia } from '@/test/setup';

describe('useMediaQuery', () => {
  it('reports the current match', () => {
    setMatchMedia(true);
    expect(renderHook(() => useMediaQuery('(min-width: 900px)')).result.current).toBe(true);
  });

  it('reports a non-match', () => {
    setMatchMedia(false);
    expect(renderHook(() => useMediaQuery('(min-width: 900px)')).result.current).toBe(false);
  });

  it('evaluates the query it was given', () => {
    setMatchMedia((query) => query === '(min-width: 900px)');

    expect(renderHook(() => useMediaQuery('(min-width: 900px)')).result.current).toBe(true);
    expect(renderHook(() => useMediaQuery('(min-width: 1400px)')).result.current).toBe(false);
  });

  it('re-reads when the media list changes', () => {
    let notify = () => {};
    let matches = false;
    vi.stubGlobal(
      'matchMedia',
      vi.fn((media: string) => ({
        get matches() {
          return matches;
        },
        media,
        onchange: null,
        addEventListener: (_: string, handler: () => void) => {
          notify = handler;
        },
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );

    const { result } = renderHook(() => useMediaQuery('(min-width: 900px)'));
    expect(result.current).toBe(false);

    act(() => {
      matches = true;
      notify();
    });

    expect(result.current).toBe(true);
  });

  it('unsubscribes on unmount', () => {
    const removeEventListener = vi.fn();
    vi.stubGlobal(
      'matchMedia',
      vi.fn((media: string) => ({
        matches: false,
        media,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );

    renderHook(() => useMediaQuery('(min-width: 900px)')).unmount();
    expect(removeEventListener).toHaveBeenCalled();
  });

  it('reports false when the environment has no matchMedia', () => {
    vi.stubGlobal('matchMedia', undefined);

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 900px)'));
    expect(renderHook(() => useMediaQuery('(min-width: 900px)')).result.current).toBe(false);

    // The no-op unsubscribe must still be callable.
    expect(() => unmount()).not.toThrow();
    setMatchMedia(false);
  });
});
