import { useState, useEffect, RefObject } from 'react';

export function useIntersection(ref: RefObject<HTMLElement>, rootMargin = '100px'): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [ref, rootMargin]);

  return isVisible;
}
