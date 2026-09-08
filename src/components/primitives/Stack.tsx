import type { Align, BaseProps, PolymorphicProps, DynamicTag } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Stack.module.css';

export interface StackProps extends BaseProps, PolymorphicProps {
  direction?: 'column' | 'row';
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  align?: Align;
  wrap?: boolean;
}

const ALIGN_CLASS: Record<Align, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
};

export function Stack({
  as,
  direction = 'column',
  gap = 4,
  align = 'stretch',
  wrap = false,
  className,
  children,
  ...rest
}: StackProps) {
  const Tag = (as ?? 'div') as DynamicTag;
  return (
    <Tag
      className={cx(
        styles.stack,
        direction === 'row' && styles.row,
        styles[`gap${gap}`],
        ALIGN_CLASS[align],
        wrap && styles.wrap,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
