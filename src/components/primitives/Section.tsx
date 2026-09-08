import type { BaseProps, PolymorphicProps, Tone, DynamicTag } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Section.module.css';

export interface SectionProps extends BaseProps, PolymorphicProps {
  tone?: Tone;
  space?: 'none' | 'sm' | 'md' | 'lg';
  divided?: boolean;
  'aria-labelledby'?: string;
}

/**
 * Open/closed: new section flavours arrive as new `tone`/`space` values, never
 * as edits to the sections that already use it.
 */
export function Section({
  as,
  tone = 'default',
  space = 'md',
  divided = false,
  className,
  children,
  ...rest
}: SectionProps) {
  const Tag = (as ?? 'section') as DynamicTag;
  return (
    <Tag
      className={cx(
        styles.section,
        space !== 'md' && styles[space],
        tone !== 'default' && styles[tone],
        divided && styles.divided,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
