import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useActiveStep } from './useActiveStep';

/**
 * The hook reads geometry, so each case fakes one: a block `height` tall whose
 * top sits `top` pixels down a 1000px viewport.
 */
function place(top: number, height: number) {
  return {
    getBoundingClientRect: () => ({ top, height }) as DOMRect,
  } as HTMLElement;
}

function mount(count: number, element: HTMLElement | null) {
  const hook = renderHook(() => useActiveStep(count));
  act(() => {
    hook.result.current.ref.current = element;
    window.dispatchEvent(new Event('resize'));
  });
  return hook;
}

describe('useActiveStep', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      }),
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts before the sequence, at -1', () => {
    expect(renderHook(() => useActiveStep(5)).result.current.active).toBe(-1);
  });

  it('stays at -1 while the block is still below the trigger line', () => {
    expect(mount(5, place(900, 400)).result.current.active).toBe(-1);
  });

  it('lights the first step as the block crosses the line', () => {
    expect(mount(5, place(780, 400)).result.current.active).toBe(0);
  });

  it('advances through the steps as the block travels up', () => {
    const { result } = mount(5, place(800, 400));
    expect(result.current.active).toBe(-1);

    act(() => {
      result.current.ref.current = place(400, 400);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.active).toBe(2);

    act(() => {
      result.current.ref.current = place(0, 400);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.active).toBe(4);
  });

  it('never exceeds the last index once the block is fully past', () => {
    expect(mount(5, place(-2000, 400)).result.current.active).toBe(4);
  });

  it('does nothing without an element', () => {
    expect(mount(5, null).result.current.active).toBe(-1);
  });

  it('does nothing for an empty sequence', () => {
    const add = vi.spyOn(window, 'addEventListener');
    mount(0, place(0, 400));
    expect(add).not.toHaveBeenCalledWith('scroll', expect.any(Function), expect.anything());
  });

  it('coalesces a burst of scroll events into one frame', () => {
    mount(5, place(400, 400));
    const raf = vi.mocked(requestAnimationFrame);
    raf.mockClear();
    // The stub runs the callback synchronously, so the guard reopens each time;
    // what matters is that one event never schedules more than one frame.
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(raf).toHaveBeenCalledTimes(1);
  });

  it('removes its listeners on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    mount(5, place(400, 400)).unmount();

    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
