import { heroScene } from '@/content/scene';
import styles from './SceneFallback.module.css';

/**
 * The static face of the hero: shown while the WebGL chunk loads, and shown
 * permanently on reduced-motion, low-memory or no-WebGL devices. It holds the
 * same idea at rest — a hoarding with cards strung beneath it — in flat SVG,
 * so the first frame is never empty and never animates.
 */
export function SceneFallback() {
  const { colors, cards } = heroScene;

  return (
    <div className={styles.fallback} aria-hidden="true">
      <div className={styles.wash} />
      <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Frame */}
        <rect x="18" y="12" width="64" height="2" fill={colors.ink} />
        <rect x="24" y="14" width="1.6" height="62" fill={colors.ink} />
        <rect x="74.4" y="14" width="1.6" height="62" fill={colors.ink} />

        {/* Poster */}
        <rect
          x="20"
          y="15"
          width="60"
          height="34"
          fill="#ffffff"
          stroke={colors.hairline}
          strokeWidth="0.7"
        />
        <rect x="25" y="23" width="9" height="0.8" fill={colors.accent} />
        <rect x="25" y="28" width="34" height="2.4" rx="0.4" fill={colors.ink} opacity="0.88" />
        <rect x="25" y="33" width="44" height="2.4" rx="0.4" fill={colors.ink} opacity="0.88" />
        <rect x="25" y="39" width="30" height="2.4" rx="0.4" fill={colors.accent} opacity="0.85" />

        {/* Lower rail and the cards hanging from it */}
        <rect x="18" y="50" width="64" height="1.4" fill={colors.ink} />
        {cards.map((card, index) => {
          const x = 23 + index * 9.4;
          const drop = 4 + (index % 3) * 1.6;
          return (
            <g key={card.id}>
              <rect x={x + 3.4} y="51.4" width="0.35" height={drop} fill={colors.hairline} />
              <rect
                x={x}
                y={51.4 + drop}
                width="7"
                height="4.4"
                fill={card.accent ? colors.ink : '#ffffff'}
                stroke={card.accent ? colors.accent : colors.hairline}
                strokeWidth="0.45"
              />
              <rect
                x={x + 1}
                y={52.6 + drop}
                width="2.2"
                height="0.4"
                fill={colors.accent}
                opacity={card.accent ? 1 : 0.8}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
