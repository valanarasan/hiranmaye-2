import { createContext, useContext, useId, useMemo, useState } from 'react';
import type { BaseProps } from '@/types/ui';
import { cx } from '@/lib/cx';
import styles from './Accordion.module.css';

interface AccordionContextValue {
  openId: string | null;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(component: string): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(`<${component}> must be rendered inside <Accordion>.`);
  }
  return context;
}

export interface AccordionProps extends BaseProps {
  /** Id of the item open on first render. */
  defaultOpenId?: string | null;
  /** Allow every item to be closed at once. */
  collapsible?: boolean;
}

export function Accordion({
  defaultOpenId,
  collapsible = true,
  className,
  children,
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const value = useMemo<AccordionContextValue>(
    () => ({
      openId,
      toggle: (id) => setOpenId((current) => (current === id ? (collapsible ? null : id) : id)),
    }),
    [openId, collapsible],
  );

  return (
    <AccordionContext.Provider value={value}>
      <div className={cx(styles.root, className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends BaseProps {
  id: string;
  index?: string;
  title: string;
}

function AccordionItem({ id, index, title, className, children }: AccordionItemProps) {
  const { openId, toggle } = useAccordionContext('Accordion.Item');
  const panelId = useId();
  const open = openId === id;

  return (
    <div className={cx(styles.item, open && styles.open, className)}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => toggle(id)}
      >
        <span className={styles.index}>{index ?? ''}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon} aria-hidden="true" />
      </button>

      <div className={styles.panel} id={panelId} role="region">
        <div className={styles.panelInner}>
          <div className={styles.panelBody}>{children}</div>
        </div>
      </div>
    </div>
  );
}

Accordion.Item = AccordionItem;
