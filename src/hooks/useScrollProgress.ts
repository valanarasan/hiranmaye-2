import { useEffect, useRef, useState } from 'react';

/**
 * 0 → 1 progress across the first `distance` pixels of the document scroll.
 * Written as a ref + state pair so render-cheap consumers (the WebGL scene) can
 * read `.current` inside a frame loop without re-rendering React.
 */
export function useScrollProgress(distance = 900) {
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const value = Math.min(1, Math.max(0, window.scrollY / distance));
      progressRef.current = value;
      setProgress((prev) => (Math.abs(prev - value) > 0.004 ? value : prev));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return { progress, progressRef } as const;
}
