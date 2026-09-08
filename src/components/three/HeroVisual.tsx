import { Suspense, lazy } from 'react';
import { useDeferredMount, useInView, useReducedMotion, useWebGLSupport } from '@/hooks';
import { heroScene } from '@/content/scene';
import { SceneFallback } from './SceneFallback';
import styles from './HeroVisual.module.css';

/** The only dynamic import of `three` in the application. */
const GoldScene = lazy(() => import('./GoldScene'));

/**
 * The gate. It decides *whether* WebGL runs; it does not know how the scene is
 * drawn, and the scene does not know why it was allowed to run.
 */
export function HeroVisual() {
  const supported = useWebGLSupport();
  const reducedMotion = useReducedMotion();
  const idle = useDeferredMount();
  const { ref, inView } = useInView<HTMLDivElement>({
    once: false,
    threshold: 0,
    rootMargin: '160px',
  });

  // Three conditions, each owned by its own hook: can it run, should it run,
  // and is now a good moment to start.
  const useWebGL = supported === true && !reducedMotion && idle;

  return (
    <div className={styles.visual} ref={ref}>
      {useWebGL ? (
        <Suspense fallback={<SceneFallback />}>
          <div className={styles.canvas}>
            <GoldScene config={heroScene} active={inView} />
          </div>
        </Suspense>
      ) : (
        <SceneFallback />
      )}
      <div className={styles.veil} />
      <div className={styles.base} />
    </div>
  );
}
