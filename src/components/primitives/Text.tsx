import type { BaseProps, DynamicTag, PolymorphicProps } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Text.module.css';

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'lead'
  | 'body'
  | 'small'
  | 'eyebrow';

export type TextTone = 'default' | 'muted' | 'faint' | 'accent' | 'inverse' | 'inverseMuted';

const TONE_CLASS: Record<TextTone, string | undefined> = {
  default: undefined,
  muted: styles.toneMuted,
  faint: styles.toneFaint,
  accent: styles.toneAccent,
  inverse: styles.toneInverse,
  inverseMuted: styles.toneInverseMuted,
};

export interface TextProps extends BaseProps, PolymorphicProps {
  variant?: TextVariant;
  tone?: TextTone;
  italic?: boolean;
  balance?: boolean;
}

export function Text({
  as,
  variant = 'body',
  tone = 'default',
  italic = false,
  balance = false,
  className,
  children,
  ...rest
}: TextProps) {
  const Tag = (as ?? defaultTag(variant)) as DynamicTag;
  return (
    <Tag
      className={cx(
        styles.text,
        styles[variant],
        TONE_CLASS[tone],
        italic && styles.italic,
        balance && styles.balance,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function defaultTag(variant: TextVariant): 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' {
  switch (variant) {
    case 'display':
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'eyebrow':
      return 'span';
    default:
      return 'p';
  }
}
