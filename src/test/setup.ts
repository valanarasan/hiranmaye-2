import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import { cleanup } from '@testing-library/react';

/**
 * jsdom implements neither IntersectionObserver nor ResizeObserver, and several
 * hooks here read them on mount. Stubbing both centrally keeps every test file
 * from repeating the same boilerplate.
 */

export interface ObserverRecord {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
  observe: Mock;
  unobserve: Mock;
  disconnect: Mock;
  /** Drive the callback as if the observed element crossed the threshold. */
  trigger(isIntersecting: boolean, target?: Element): void;
  /** Drive the callback with an arbitrary entry list, including an empty one. */
  emit(entries: IntersectionObserverEntry[]): void;
}

export const intersectionObservers: ObserverRecord[] = [];

export function latestIntersectionObserver(): ObserverRecord {
  const latest = intersectionObservers.at(-1);
  if (!latest) throw new Error('No IntersectionObserver was created.');
  return latest;
}

/** Fire the most recently created observer — the one the component under test made. */
export function triggerIntersection(isIntersecting: boolean, target?: Element) {
  latestIntersectionObserver().trigger(isIntersecting, target);
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => [] as IntersectionObserverEntry[]);

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    const emit = (entries: IntersectionObserverEntry[]) => callback(entries, this);
    intersectionObservers.push({
      callback,
      options,
      observe: this.observe,
      unobserve: this.unobserve,
      disconnect: this.disconnect,
      emit,
      trigger: (isIntersecting, target = document.createElement('div')) =>
        emit([
          {
            isIntersecting,
            target,
            intersectionRatio: isIntersecting ? 1 : 0,
          } as unknown as IntersectionObserverEntry,
        ]),
    });
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('ResizeObserver', MockResizeObserver);

/**
 * matchMedia defaults to "no match" — the desktop, motion-allowed case. Tests
 * needing the other side call this with `true`, or with a predicate when only
 * one of several queries should match.
 */
export function setMatchMedia(matches: boolean | ((query: string) => boolean)) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: typeof matches === 'function' ? matches(query) : matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

export function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true });
}

setMatchMedia(false);
setScrollY(0);

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

afterEach(() => {
  cleanup();
  intersectionObservers.length = 0;
  setMatchMedia(false);
  setScrollY(0);
});
