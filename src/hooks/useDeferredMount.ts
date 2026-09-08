import { useEffect, useState } from 'react';

/**
 * Returns false until the browser is idle (or `timeout` has passed), so heavy
 * optional payloads never compete with first paint.
 */
export function useDeferredMount(timeout = 900): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(() => setReady(true), { timeout });
      return () => window.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(timer);
  }, [timeout]);

  return ready;
}
