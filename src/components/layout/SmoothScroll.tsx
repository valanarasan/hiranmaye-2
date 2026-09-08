import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/hooks';

export interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Smooth scrolling is a cross-cutting concern, so it lives in exactly one place
 * and is switched off wholesale for users who asked for less motion.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
    });

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
