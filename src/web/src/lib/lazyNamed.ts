import { lazy } from 'react';
import type { ComponentType } from 'react';

/**
 * `React.lazy` for a named export: `lazyNamed(() => import('./Page'), 'Page')`. Route-level code splitting.
 * The SSR renderer uses `prerender` (react-dom/static), which waits for lazy chunks, so public pages still
 * render fully on the server; in the browser the server markup stays in place until the chunk arrives.
 */
export function lazyNamed<M, K extends keyof M>(load: () => Promise<M>, name: K) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return lazy(() => load().then((m) => ({ default: m[name] as ComponentType<any> })));
}
