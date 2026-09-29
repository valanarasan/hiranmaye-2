import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Lights a numbered sequence as the reader scrolls through it.
 *
 * Returns the index of the furthest step reached, so a caller can mark every
 * step up to it — the sequence fills like a progress bar rather than moving a
 * single spotlight, which is what makes an ordered list read as ordered.
 *
 * -1 means the block has not been reached yet.
 */
export function useActiveStep<T extends HTMLElement = HTMLElement>(count: number) {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(-1);

  const measure = useCallback(() => {
    const node = ref.current;
    if (!node || count <= 0) return;

    const rect = node.getBoundingClientRect();
    const viewport = window.innerHeight || 1;

    // Progress of the block past a line four-fifths down the viewport, so a
    // step lights when it is comfortably in view rather than at the very edge.
    const travelled = viewport * 0.8 - rect.top;
    const distance = rect.height + viewport * 0.3;
    const progress = Math.min(1, Math.max(0, travelled / distance));

    setActive(progress <= 0 ? -1 : Math.min(count - 1, Math.floor(progress * count)));
  }, [count]);

  useEffect(() => {
    if (count <= 0) return;
    let frame = 0;
    let pending = false;

    // The guard is a separate flag rather than the frame id: the id is only
    // assigned after requestAnimationFrame returns, so a callback that runs
    // synchronously would leave a stale id behind and block every later event.
    const onScroll = () => {
      if (pending) return;
      pending = true;
      frame = requestAnimationFrame(() => {
        pending = false;
        frame = 0;
        measure();
      });
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count, measure]);

  return { ref, active } as const;
}
