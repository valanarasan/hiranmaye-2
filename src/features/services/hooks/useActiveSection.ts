import { useEffect, useState } from 'react';

/**
 * Scroll-spy. Returns the id of the section nearest the top of the viewport, or
 * null before anything has been observed.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|').filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        if (best) setActiveId(best[0]);
      },
      { rootMargin: '-18% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
