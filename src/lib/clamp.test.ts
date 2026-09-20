import { describe, expect, it } from 'vitest';
import { clamp, damp, lerp } from './clamp';

describe('clamp', () => {
  it('passes a value that is already inside the range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('pins to the bounds', () => {
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });

  it('includes the bounds themselves', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe('lerp', () => {
  it('returns each end at t = 0 and t = 1', () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it('interpolates linearly in between', () => {
    expect(lerp(0, 100, 0.25)).toBe(25);
  });

  it('extrapolates rather than clamping — callers clamp if they need to', () => {
    expect(lerp(0, 10, 2)).toBe(20);
  });
});

describe('damp', () => {
  it('does not move when delta is zero', () => {
    expect(damp(0, 100, 5, 0)).toBe(0);
  });

  it('approaches the target without overshooting', () => {
    const next = damp(0, 100, 5, 0.016);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(100);
  });

  it('converges: a long step lands very close to the target', () => {
    expect(damp(0, 100, 5, 10)).toBeCloseTo(100, 5);
  });

  it('is frame-rate independent — two half-steps match one whole step', () => {
    const once = damp(0, 100, 5, 0.032);
    const twice = damp(damp(0, 100, 5, 0.016), 100, 5, 0.016);
    expect(twice).toBeCloseTo(once, 10);
  });
});
