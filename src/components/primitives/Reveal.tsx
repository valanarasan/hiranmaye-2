import type { CSSProperties } from 'react';
import type { BaseProps, PolymorphicProps, DynamicTag } from '@/types/ui';
import { cx } from '@/lib/cx';
import { useInView, useReducedMotion } from '@/hooks';
import styles from './Reveal.module.css';

export interface RevealProps extends BaseProps, PolymorphicProps {
  /** Stagger in milliseconds. */
  delay?: number;
  shift?: number;
}

/** The only place in the app that knows how an element enters the viewport. */
export function Reveal({
  as,
  delay = 0,
  shift = 18,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const Tag = (as ?? 'div') as DynamicTag;
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  if (reduced) {
    return (
      <Tag className={cx(styles.reveal, styles.static, className)} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={cx(styles.reveal, inView && styles.visible, className)}
      style={
        {
          ...style,
          '--_delay': `${delay}ms`,
          '--_shift': `${shift}px`,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
