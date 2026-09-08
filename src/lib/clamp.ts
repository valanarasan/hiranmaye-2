export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number): number => from + (to - from) * t;

/** Frame-rate independent damping — safe to use inside useFrame. */
export const damp = (current: number, target: number, lambda: number, delta: number): number =>
  lerp(current, target, 1 - Math.exp(-lambda * delta));
