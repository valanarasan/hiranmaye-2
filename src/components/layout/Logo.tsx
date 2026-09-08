import { Link } from 'react-router-dom';
import { cx } from '@/lib/cx';
import { LotusMark } from './LotusMark';
import styles from './Logo.module.css';

export interface LogoProps {
  className?: string;
  /** Horizontal lockup for the header, stacked for the footer. */
  variant?: 'inline' | 'stacked';
  onDark?: boolean;
  /** Hide the tagline entirely (tight spaces). */
  showTagline?: boolean;
}

export function Logo({
  className,
  variant = 'inline',
  onDark = false,
  showTagline = true,
}: LogoProps) {
  return (
    <Link
      to="/"
      className={cx(
        styles.logo,
        variant === 'stacked' && styles.stacked,
        onDark && styles.onDark,
        className,
      )}
      aria-label="Hiranmaye Digital — home"
    >
      <LotusMark className={styles.mark} />
      <span className={styles.words}>
        <span className={styles.word}>Hiranmaye Digital</span>
        {showTagline ? <span className={styles.tagline}>Strategy drives growth</span> : null}
      </span>
    </Link>
  );
}
