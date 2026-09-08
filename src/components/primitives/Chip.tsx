import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { BaseProps, DynamicTag } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Chip.module.css';

export interface ChipOwnProps extends BaseProps {
  selected?: boolean;
  withDot?: boolean;
}

export type ChipProps<T extends ElementType = 'button'> = ChipOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof ChipOwnProps | 'as'>;

export function Chip<T extends ElementType = 'button'>({
  as,
  selected = false,
  withDot = true,
  className,
  children,
  ...rest
}: ChipProps<T>) {
  const Tag = (as ?? 'button') as DynamicTag;
  return (
    <Tag className={cx(styles.chip, selected && styles.selected, className)} {...rest}>
      {withDot ? <span className={styles.dot} aria-hidden="true" /> : null}
      {children}
    </Tag>
  );
}
