import type { CSSProperties } from 'react';
import type { BaseProps } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Marquee.module.css';

export interface MarqueeProps extends BaseProps {
  items: readonly string[];
  /** Seconds for one full cycle. */
  duration?: number;
}

export function Marquee({ items, duration = 46, className }: MarqueeProps) {
  const group = (
    <div className={styles.group} aria-hidden="true">
      {items.map((item) => (
        <span key={item} className={styles.item}>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cx(styles.marquee, className)}>
      <div className={styles.track} style={{ '--_duration': `${duration}s` } as CSSProperties}>
        {group}
        {group}
      </div>
      <span className="u-sr-only">{items.join(', ')}</span>
    </div>
  );
}
