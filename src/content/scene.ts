/**
 * Dependency inversion for the WebGL hero: the scene reads its shape from this
 * config object rather than from constants baked into the components. Tune the
 * hero here — not in the GLSL, and not in the layout code.
 */
export interface SceneConfig {
  /** Shards on a desktop-class device. */
  count: number;
  /** Shards on a narrow viewport. */
  countCompact: number;

  /** Half-extents of the scattered cloud, in world units. */
  scatter: { x: number; y: number; z: number };

  /** The lathe-turned form the shards resolve onto. */
  form: { height: number; radius: number };

  /** Base shard dimensions before per-shard variation. */
  shard: { width: number; height: number; depth: number };

  /** Idle drift amplitude while scattered. */
  drift: number;
  /** Idle tumble speed while scattered. */
  tumble: number;
  /** Turns per second of the resolved form. */
  spin: number;

  /** Placement as a fraction of the viewport. */
  offsetX: number;
  offsetY: number;
  offsetYCompact: number;

  colors: {
    /** Glass body colour. Distance from white sets how much it absorbs. */
    tint: string;
    /** The lit edge. */
    rim: string;
  };
}

export const heroScene: SceneConfig = {
  count: 52,
  countCompact: 30,

  scatter: { x: 1.30, y: 1.12, z: 1.05 },
  form: { height: 2.35, radius: 0.86 },
  shard: { width: 0.42, height: 0.52, depth: 0.045 },

  drift: 0.22,
  tumble: 0.16,
  spin: 0.055,

  offsetX: 0.235,
  offsetY: 0.0,
  offsetYCompact: -0.13,

  colors: {
    tint: '#dce6f2',
    rim: '#f6e6c4',
  },
};
