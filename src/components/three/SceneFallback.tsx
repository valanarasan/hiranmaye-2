import { useMemo } from 'react';
import styles from './SceneFallback.module.css';

interface Shard {
  points: string;
  opacity: number;
  rim: boolean;
}

/**
 * The static face of the hero: shown while the WebGL chunk loads, and shown
 * permanently on reduced-motion, low-memory or no-WebGL devices. It holds the
 * same idea at its first beat — scattered glass, not yet resolved — using
 * gradients and polygons only.
 */
export function SceneFallback() {
  const shards = useMemo<Shard[]>(() => {
    let seed = 20260908;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    return Array.from({ length: 26 }, () => {
      const cx = 22 + rand() * 60;
      const cy = 18 + rand() * 64;
      const scale = 4 + rand() * 7;
      const sides = 5;
      const rotation = rand() * Math.PI;

      const points = Array.from({ length: sides }, (_, i) => {
        const a = rotation + (i / sides) * Math.PI * 2;
        const r = scale * (0.55 + rand() * 0.55);
        return `${(cx + Math.cos(a) * r * 0.62).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`;
      }).join(' ');

      return { points, opacity: 0.1 + rand() * 0.3, rim: rand() > 0.62 };
    });
  }, []);

  return (
    <div className={styles.fallback} aria-hidden="true">
      <div className={styles.wash} />
      <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="hd-glass" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#dfe6f1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a9b8cd" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {shards.map((shard, index) => (
          <polygon
            key={index}
            points={shard.points}
            fill="url(#hd-glass)"
            fillOpacity={shard.opacity}
            stroke={shard.rim ? '#cf9a28' : '#8e9fb8'}
            strokeOpacity={shard.rim ? 0.5 : 0.35}
            strokeWidth="0.28"
          />
        ))}
      </svg>
    </div>
  );
}
