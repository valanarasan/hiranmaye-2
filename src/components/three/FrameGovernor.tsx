import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export interface FrameGovernorProps {
  /** Frames per second below which resolution is stepped down. */
  target?: number;
  maxDpr?: number;
  minDpr?: number;
}

/**
 * Adaptive resolution. Samples real frame rate in 1.5s windows and steps the
 * device pixel ratio down until the scene holds `target` fps — so a weak GPU
 * loses sharpness rather than smoothness.
 */
export function FrameGovernor({ target = 48, maxDpr = 1.75, minDpr = 0.85 }: FrameGovernorProps) {
  const setDpr = useThree((state) => state.setDpr);
  const frames = useRef(0);
  const elapsed = useRef(0);
  const level = useRef(maxDpr);

  useFrame((_, delta) => {
    frames.current += 1;
    elapsed.current += delta;
    if (elapsed.current < 1.5) return;

    const fps = frames.current / elapsed.current;
    frames.current = 0;
    elapsed.current = 0;

    if (fps < target && level.current > minDpr) {
      level.current = Math.max(minDpr, level.current - 0.3);
      setDpr(level.current);
    }
  });

  return null;
}
