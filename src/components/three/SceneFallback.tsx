import styles from './SceneFallback.module.css';

/**
 * The static face of the hero: shown while the WebGL chunk loads, and shown
 * permanently on reduced-motion, low-memory or no-WebGL devices. A single
 * still of the same gold body, built from gradients — no JavaScript, no
 * network request, no canvas.
 */
export function SceneFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <div className={styles.wash} />
      <svg className={styles.svg} viewBox="0 0 320 320" focusable="false">
        <defs>
          <radialGradient id="hd-body" cx="38%" cy="30%" r="78%">
            <stop offset="0%" stopColor="#fff4d8" />
            <stop offset="26%" stopColor="#eec55f" />
            <stop offset="58%" stopColor="#c8912a" />
            <stop offset="82%" stopColor="#8d5f13" />
            <stop offset="100%" stopColor="#5f3f0c" />
          </radialGradient>
          <radialGradient id="hd-bounce" cx="62%" cy="88%" r="46%">
            <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffd98a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hd-key" cx="34%" cy="24%" r="24%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hd-band" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="hd-clip">
            <path d="M160 22c46 0 78 22 96 56 20 38 30 74 12 112-19 40-62 62-108 62-44 0-84-20-102-58-18-38-8-78 13-115C89 44 116 22 160 22Z" />
          </clipPath>
        </defs>

        <g clipPath="url(#hd-clip)">
          <rect width="320" height="320" fill="url(#hd-body)" />
          <rect width="320" height="320" fill="url(#hd-bounce)" />
          <rect y="150" width="320" height="120" fill="url(#hd-band)" />
          <ellipse cx="112" cy="82" rx="42" ry="30" fill="url(#hd-key)" />
        </g>
      </svg>
    </div>
  );
}
