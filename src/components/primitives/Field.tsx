import { useId } from 'react';
import type { ReactElement } from 'react';
import type { BaseProps } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Field.module.css';

export interface FieldProps extends Omit<BaseProps, 'children'> {
  label: string;
  error?: string;
  /** Render prop: the field owns layout and a11y wiring, the caller owns the control. */
  children: (props: {
    id: string;
    className: string;
    'aria-invalid': boolean;
    'aria-describedby': string | undefined;
  }) => ReactElement;
}

/**
 * Interface segregation: Field asks for exactly what it renders — a label, an
 * optional error, and a control it does not need to know the type of.
 */
export function Field({ label, error, className, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {children({
        id,
        className: styles.control,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
      })}
      {error ? (
        <span className={styles.error} id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
