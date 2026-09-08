import type { BaseProps } from '@/types/ui';
import { cx } from '@/lib/cx';
import { Text } from './Text';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps extends BaseProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'start' | 'center';
  inverse?: boolean;
  titleId?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'start',
  inverse = false,
  titleId,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx(styles.header, align === 'center' && styles.center, className)}>
      {eyebrow ? (
        <div className={styles.eyebrowRow}>
          <span className={styles.rule} aria-hidden="true" />
          <Text variant="eyebrow" tone={inverse ? 'inverseMuted' : 'faint'}>
            {eyebrow}
          </Text>
        </div>
      ) : null}
      <Text variant="h2" id={titleId} tone={inverse ? 'inverse' : 'default'} balance>
        {title}
      </Text>
      {lead ? (
        <Text variant="lead" tone={inverse ? 'inverseMuted' : 'muted'} balance>
          {lead}
        </Text>
      ) : null}
    </div>
  );
}
