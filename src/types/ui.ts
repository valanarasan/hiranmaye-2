import type { ComponentType, CSSProperties, ElementType, ReactNode } from 'react';

/**
 * The contract EVERY primitive honours (Liskov): any primitive can stand in for
 * another without a caller changing how it passes styling or identity.
 */
export interface BaseProps {
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
}

/** Opt-in polymorphism: `as` never changes a component's own contract. */
export interface PolymorphicProps {
  as?: ElementType;
}

/**
 * The type a polymorphic component casts `as` to before rendering it.
 * TypeScript intersects the props of every possible intrinsic element when a
 * bare `ElementType` is placed in JSX, which collapses `children` to `never`;
 * widening the props parameter is the standard escape hatch and is confined to
 * this single alias so no component has to reach for `any` itself.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DynamicTag = ComponentType<any>;

export type Tone = 'default' | 'surface' | 'ink';
export type Align = 'start' | 'center' | 'end' | 'stretch';
