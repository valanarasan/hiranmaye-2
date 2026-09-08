import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { BaseProps, DynamicTag } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'solid' | 'accent' | 'outline' | 'ghost' | 'inverse' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonOwnProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  withArrow?: boolean;
}

export type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps | 'as'>;

/**
 * Polymorphic by design: the same visual contract whether it renders a
 * <button>, an <a> or a router <Link>. Callers extend it by choosing a
 * variant — never by overriding internals.
 */
export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'solid',
  size = 'md',
  block = false,
  withArrow = false,
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Tag = (as ?? 'button') as DynamicTag;
  return (
    <Tag
      className={cx(
        styles.button,
        styles[variant],
        variant !== 'link' && styles[size],
        block && styles.block,
        className,
      )}
      {...rest}
    >
      {children}
      {withArrow ? (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      ) : null}
    </Tag>
  );
}
