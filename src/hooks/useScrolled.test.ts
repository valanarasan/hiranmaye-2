import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useScrolled } from './useScrolled';
import { setScrollY } from '@/test/setup';

/** Change the position and tell the page about it. */
function scrollTo(y: number) {
  setScrollY(y);
  window.dispatchEvent(new Event('scroll'));
}

describe('useScrolled', () => {
  it('starts false at the top of the page', () => {
    setScrollY(0);
    expect(renderHook(() => useScrolled()).result.current).toBe(false);
  });

  it('reads the current position on mount rather than waiting for a scroll', () => {
    setScrollY(500);
    expect(renderHook(() => useScrolled()).result.current).toBe(true);
  });

  it('flips once the default offset is passed', () => {
    setScrollY(0);
    const { result } = renderHook(() => useScrolled());

    act(() => scrollTo(25));
    expect(result.current).toBe(true);

    act(() => scrollTo(10));
    expect(result.current).toBe(false);
  });

  it('honours a custom offset, exclusive at the boundary', () => {
    setScrollY(0);
    const { result } = renderHook(() => useScrolled(100));

    act(() => scrollTo(100));
    expect(result.current).toBe(false);

    act(() => scrollTo(101));
    expect(result.current).toBe(true);
  });

  it('removes its listener on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    renderHook(() => useScrolled()).unmount();
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
