import type { BaseProps, PolymorphicProps, DynamicTag } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Container.module.css';

export interface ContainerProps extends BaseProps, PolymorphicProps {
  width?: 'default' | 'narrow' | 'flush';
}

export function Container({
  as,
  width = 'default',
  className,
  children,
  ...rest
}: ContainerProps) {
  const Tag = (as ?? 'div') as DynamicTag;
  return (
    <Tag
      className={cx(
        styles.container,
        width === 'narrow' && styles.narrow,
        width === 'flush' && styles.flush,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
