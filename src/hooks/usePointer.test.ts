import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePointer } from './usePointer';

function sizeWindow(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, configurable: true });
}

function move(clientX: number, clientY: number) {
  window.dispatchEvent(new PointerEvent('pointermove', { clientX, clientY }));
}

describe('usePointer', () => {
  it('starts centred and inactive', () => {
    const { result } = renderHook(() => usePointer());
    expect(result.current.current).toEqual({ x: 0, y: 0, active: false });
  });

  it('normalises the centre of the window to the origin', () => {
    sizeWindow(1000, 800);
    const { result } = renderHook(() => usePointer());

    move(500, 400);

    expect(result.current.current.x).toBeCloseTo(0);
    expect(result.current.current.y).toBeCloseTo(0);
  });

  it('maps the corners to the unit square, with y inverted for WebGL', () => {
    sizeWindow(1000, 800);
    const { result } = renderHook(() => usePointer());

    move(0, 0);
    expect(result.current.current.x).toBeCloseTo(-1);
    expect(result.current.current.y).toBeCloseTo(1);

    move(1000, 800);
    expect(result.current.current.x).toBeCloseTo(1);
    expect(result.current.current.y).toBeCloseTo(-1);
  });

  it('marks the pointer active on movement', () => {
    const { result } = renderHook(() => usePointer());
    move(10, 10);
    expect(result.current.current.active).toBe(true);
  });

  it('goes inactive when the pointer leaves the window', () => {
    const { result } = renderHook(() => usePointer());

    move(10, 10);
    window.dispatchEvent(new Event('pointerleave'));

    expect(result.current.current.active).toBe(false);
  });

  it('does not re-render on movement — that is the whole point of the ref', () => {
    const renders = vi.fn();
    renderHook(() => {
      renders();
      return usePointer();
    });

    const before = renders.mock.calls.length;
    move(10, 10);
    move(20, 20);

    expect(renders.mock.calls.length).toBe(before);
  });

  it('removes both listeners on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    renderHook(() => usePointer()).unmount();

    expect(remove).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(remove).toHaveBeenCalledWith('pointerleave', expect.any(Function));
  });
});
