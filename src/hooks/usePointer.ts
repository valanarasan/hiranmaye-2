import { useEffect, useRef } from 'react';

export interface PointerState {
  /** Normalised device coordinates, -1 → 1 on both axes. */
  x: number;
  y: number;
  active: boolean;
}

/**
 * Pointer tracking as a mutable ref: no re-render per mousemove, which is what
 * makes it safe to consume from a render loop.
 */
export function usePointer() {
  const pointer = useRef<PointerState>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return pointer;
}
