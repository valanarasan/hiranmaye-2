import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

/**
 * CSS modules resolve to `_<key>_<hash>` under Vitest, so asserting on the
 * author's key rather than the emitted class keeps these tests readable and
 * independent of the hash.
 */
export function classKeys(element: Element): string[] {
  return element.className
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => /^_(.+)_[a-z0-9]+$/.exec(name)?.[1] ?? name);
}

export function hasClassKey(element: Element, key: string): boolean {
  return classKeys(element).includes(key);
}

/** Anything rendering a <Link> or reading the location needs a router around it. */
export function renderWithRouter(
  ui: ReactElement,
  { route = '/', ...options }: RenderOptions & { route?: string } = {},
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>,
    ...options,
  });
}
