import { beforeEach, describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';
import { intersectionObservers, latestIntersectionObserver } from '@/test/setup';

const IDS = ['strategy', 'search', 'performance'] as const;

function mountSections(ids: readonly string[]) {
  document.body.innerHTML = ids.map((id) => `<section id="${id}"></section>`).join('');
}

function entry(id: string, isIntersecting: boolean, ratio: number) {
  return {
    target: document.getElementById(id)!,
    isIntersecting,
    intersectionRatio: ratio,
  } as unknown as IntersectionObserverEntry;
}

describe('useActiveSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('starts on the first id so the rail is never blank', () => {
    mountSections(IDS);
    expect(renderHook(() => useActiveSection(IDS)).result.current).toBe('strategy');
  });

  it('returns null when given no ids at all', () => {
    expect(renderHook(() => useActiveSection([])).result.current).toBeNull();
  });

  it('observes every section that exists in the document', () => {
    mountSections(IDS);
    renderHook(() => useActiveSection(IDS));

    expect(latestIntersectionObserver().observe).toHaveBeenCalledTimes(3);
  });

  it('skips ids with no matching element', () => {
    mountSections(['strategy']);
    renderHook(() => useActiveSection(IDS));

    expect(latestIntersectionObserver().observe).toHaveBeenCalledTimes(1);
  });

  it('does not observe at all when none of the ids are in the document', () => {
    renderHook(() => useActiveSection(IDS));
    expect(intersectionObservers).toHaveLength(0);
  });

  it('activates the section with the largest visible ratio', () => {
    mountSections(IDS);
    const { result } = renderHook(() => useActiveSection(IDS));

    act(() =>
      latestIntersectionObserver().emit([
        entry('strategy', true, 0.2),
        entry('search', true, 0.9),
      ]),
    );

    expect(result.current).toBe('search');
  });

  it('drops a section once it leaves, falling back to the next best', () => {
    mountSections(IDS);
    const { result } = renderHook(() => useActiveSection(IDS));

    act(() =>
      latestIntersectionObserver().emit([
        entry('strategy', true, 0.3),
        entry('search', true, 0.9),
      ]),
    );
    act(() => latestIntersectionObserver().emit([entry('search', false, 0)]));

    expect(result.current).toBe('strategy');
  });

  it('keeps the last active section when nothing is visible', () => {
    mountSections(IDS);
    const { result } = renderHook(() => useActiveSection(IDS));

    act(() => latestIntersectionObserver().emit([entry('search', true, 0.8)]));
    act(() => latestIntersectionObserver().emit([entry('search', false, 0)]));

    expect(result.current).toBe('search');
  });

  it('re-observes when the id list changes', () => {
    mountSections(IDS);
    const { rerender } = renderHook(({ ids }: { ids: readonly string[] }) => useActiveSection(ids), {
      initialProps: { ids: IDS as readonly string[] },
    });
    const first = latestIntersectionObserver();

    rerender({ ids: ['strategy'] });

    expect(first.disconnect).toHaveBeenCalled();
    expect(intersectionObservers).toHaveLength(2);
  });

  it('disconnects on unmount', () => {
    mountSections(IDS);
    const { unmount } = renderHook(() => useActiveSection(IDS));
    const observer = latestIntersectionObserver();

    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
  });
});
