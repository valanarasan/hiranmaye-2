import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { setMatchMedia } from '@/test/setup';

describe('useReducedMotion', () => {
  it('is false when the visitor has expressed no preference', () => {
    setMatchMedia(false);
    expect(renderHook(() => useReducedMotion()).result.current).toBe(false);
  });

  it('is true when reduced motion is requested', () => {
    setMatchMedia((query) => query === '(prefers-reduced-motion: reduce)');
    expect(renderHook(() => useReducedMotion()).result.current).toBe(true);
  });

  it('follows a preference changed while the page is open', () => {
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

    const { result } = renderHook(() => useReducedMotion());
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

    renderHook(() => useReducedMotion()).unmount();
    expect(removeEventListener).toHaveBeenCalled();
  });

  it('degrades to false with no matchMedia available', () => {
    vi.stubGlobal('matchMedia', undefined);

    const { result, unmount } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    expect(() => unmount()).not.toThrow();

    setMatchMedia(false);
  });
});
