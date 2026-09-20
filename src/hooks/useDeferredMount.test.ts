import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useDeferredMount } from './useDeferredMount';

describe('useDeferredMount', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts false so heavy payloads never compete with first paint', () => {
    expect(renderHook(() => useDeferredMount()).result.current).toBe(false);
  });

  it('becomes true once the browser reports idle', async () => {
    const idle = vi.fn((cb: IdleRequestCallback) => {
      cb({ didTimeout: false, timeRemaining: () => 50 });
      return 1;
    });
    vi.stubGlobal('requestIdleCallback', idle);
    vi.stubGlobal('cancelIdleCallback', vi.fn());

    const { result } = renderHook(() => useDeferredMount());
    expect(result.current).toBe(true);
  });

  it('passes the timeout through to requestIdleCallback', () => {
    const idle = vi.fn(() => 1);
    vi.stubGlobal('requestIdleCallback', idle);
    vi.stubGlobal('cancelIdleCallback', vi.fn());

    renderHook(() => useDeferredMount(1500));
    expect(idle).toHaveBeenCalledWith(expect.any(Function), { timeout: 1500 });
  });

  it('cancels a pending idle callback on unmount', () => {
    const cancel = vi.fn();
    vi.stubGlobal('requestIdleCallback', vi.fn(() => 7));
    vi.stubGlobal('cancelIdleCallback', cancel);

    renderHook(() => useDeferredMount()).unmount();
    expect(cancel).toHaveBeenCalledWith(7);
  });

  it('falls back to a timer where requestIdleCallback is missing', async () => {
    vi.stubGlobal('requestIdleCallback', undefined);

    const { result } = renderHook(() => useDeferredMount());
    expect(result.current).toBe(false);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });
    expect(result.current).toBe(true);
  });

  it('clears the fallback timer on unmount', () => {
    vi.stubGlobal('requestIdleCallback', undefined);
    const clear = vi.spyOn(window, 'clearTimeout');

    renderHook(() => useDeferredMount()).unmount();
    expect(clear).toHaveBeenCalled();
  });
});
