/**
 * Dependency inversion for the WebGL hero: the scene reads its shape from this
 * config object rather than from constants baked into the shader components.
 * Tune the hero here — not in the GLSL.
 */
export interface SceneConfig {
  /** Body radius as a fraction of viewport height — keeps its share of any screen. */
  radiusRatio: number;
  /** Smooth-union blend, in radii. Higher is more molten, lower more beaded. */
  viscosity: number;
  /** Size of the pointer's dent, in radii. */
  dentRadius: number;
  /** How far in front of the body the dent sits, in radii. */
  dentDepth: number;
  /** Horizontal placement as a fraction of viewport width (desktop). */
  offsetX: number;
  /** Vertical placement as a fraction of viewport height. */
  offsetY: number;
  /** Vertical placement on narrow screens. */
  offsetYCompact: number;
  /** Raymarch iterations. Lower is faster and rounds off fine concavities. */
  steps: number;
  colors: {
    /** Metal tint multiplied into the reflection. */
    gold: string;
    /** Fresnel rim at grazing angles. */
    sheen: string;
  };
}

export const heroScene: SceneConfig = {
  radiusRatio: 0.125,
  viscosity: 0.5,
  dentRadius: 0.95,
  dentDepth: 1.45,
  offsetX: 0.2,
  offsetY: 0.02,
  offsetYCompact: -0.14,
  steps: 88,
  colors: {
    gold: '#d9a63a',
    sheen: '#fff3d6',
  },
};
