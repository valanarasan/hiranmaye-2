/**
 * Dependency inversion for the WebGL hero: the scene reads its shape and its
 * words from this config rather than from constants baked into the components.
 * Tune the hero here — not in the geometry, and not in the layout code.
 */
export interface HeroCard {
  readonly id: string;
  readonly label: string;
  readonly sub: string;
  /** One card in the row is inked navy, to stop the run reading as wallpaper. */
  readonly accent?: boolean;
}

export interface SceneConfig {
  /** The hoarding itself, in world units. */
  panel: { width: number; height: number };

  /** Business cards strung along the lower rail. */
  cards: readonly HeroCard[];
  /** Drop of each card below the rail, cycled across the row. */
  cardDrops: readonly number[];

  /** What the hoarding says. Lines are rendered one per line, no wrapping. */
  poster: {
    eyebrow: string;
    /** Set in the wordmark serif, one line each. */
    lines: readonly string[];
    /** The italic line under the rule. */
    closer: string;
  };

  /** Idle motion. `drift` turns the rig, `sway` swings the cards. */
  drift: number;
  sway: number;
  /** How far the rig turns towards the pointer, in radians. */
  follow: number;

  /** Placement as a fraction of the viewport. */
  offsetX: number;
  offsetY: number;
  /** On a portrait viewport the hoarding drops below the copy instead of
      sitting behind it, so it needs its own placement rather than a nudge. */
  offsetXCompact: number;
  offsetYCompact: number;

  colors: {
    /** Steel of the frame, and the ink on the poster. */
    ink: string;
    /** The single accent, used on the rule and one card. */
    accent: string;
    /** Trim edge that separates white card from white page. */
    hairline: string;
    muted: string;
  };
}

export const heroScene: SceneConfig = {
  panel: { width: 7.4, height: 4.16 },

  cards: [
    { id: 'strategy', label: 'Strategy', sub: 'Know where' },
    { id: 'branding', label: 'Branding', sub: 'Be distinct' },
    { id: 'search', label: 'Search', sub: 'Be found', accent: true },
    { id: 'performance', label: 'Performance', sub: 'Be chosen' },
    { id: 'ai', label: 'AI', sub: 'Be faster' },
    { id: 'content', label: 'Content', sub: 'Be useful' },
  ],
  cardDrops: [0.68, 0.82, 0.96],

  poster: {
    eyebrow: 'BENGALURU · EST. 2026',
    lines: ['Hiranmaye', 'Digital'],
    closer: 'Strategy drives growth',
  },

  drift: 0.035,
  sway: 0.085,
  follow: 0.24,

  offsetX: 0.23,
  offsetY: 0.12,
  offsetXCompact: 0.04,
  offsetYCompact: -0.3,

  colors: {
    ink: '#101f36',
    accent: '#cf9a28',
    hairline: '#c8d0dd',
    muted: '#63718a',
  },
};
