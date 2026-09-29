import type { BaseProps } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './ClientLogo.module.css';

export interface ClientLogoProps extends Omit<BaseProps, 'children'> {
  name: string;
  /** Path under /public, without a leading slash. */
  src: string;
  /** Larger marks for a dedicated wall, smaller for an inline strip. */
  size?: 'sm' | 'md';
}

/**
 * One client mark. Logos arrive at every aspect ratio, so each sits in a fixed
 * box and scales to fit rather than dictating the row's height.
 *
 * The src is resolved against BASE_URL because the site is served from
 * /<repo>/ on GitHub Pages and from / on a custom domain.
 */
export function ClientLogo({ name, src, size = 'md', className }: ClientLogoProps) {
  return (
    <img
      className={cx(styles.logo, size === 'sm' && styles.sm, className)}
      src={`${import.meta.env.BASE_URL}${src}`}
      alt={name}
      loading="lazy"
      decoding="async"
    />
  );
}
