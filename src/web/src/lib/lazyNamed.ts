import { createContext, createElement, useContext } from 'react';
import type { ComponentType } from 'react';

/**
 * Route-level code splitting for a named export: `lazyNamed(() => import('./Page'), 'Page')`.
 *
 * Unlike `React.lazy`, a chunk that has been preloaded renders synchronously. That matters for hydration:
 * the SSR renderer records which lazy components a page used (LazyCollectorContext) and the browser entry
 * preloads them (`preloadLazy`) before `hydrateRoot`, so hydration never suspends on a route chunk. (A
 * dehydrated boundary that is still suspended when a provider above it updates gets client-rendered, i.e.
 * its server markup is swapped for the loading fallback: a large layout shift.)
 * The server uses `prerender` (react-dom/static), which waits for the chunk, so public pages render fully.
 */

/** Collects the names of lazy components rendered during one SSR pass. */
export const LazyCollectorContext = createContext<Set<string> | null>(null);

const registry = new Map<string, (() => Promise<unknown>)[]>();

/** Starts loading every lazy component registered under these names; resolves when all are ready. */
export function preloadLazy(names: readonly string[]): Promise<unknown> {
  return Promise.all(names.flatMap((n) => (registry.get(n) ?? []).map((p) => p())));
}

export function lazyNamed<M, K extends keyof M & string>(load: () => Promise<M>, name: K) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Loaded: ComponentType<any> | undefined;
  let pending: Promise<unknown> | undefined;
  const preload = () =>
    (pending ??= load()
      .then((m) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Loaded = m[name] as ComponentType<any>;
      })
      .catch((err: unknown) => {
        pending = undefined; // a failed chunk load can be retried on the next render
        throw err;
      }));
  registry.set(name, [...(registry.get(name) ?? []), preload]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function LazyRoute(props: any) {
    useContext(LazyCollectorContext)?.add(name);
    // Suspend until the chunk arrives (the classic Suspense protocol, as React.lazy does).
    if (!Loaded) throw preload();
    return createElement(Loaded as ComponentType, props);
  }
  LazyRoute.displayName = `Lazy(${name})`;
  return LazyRoute;
}
