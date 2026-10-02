import { createContext, useContext, useEffect } from 'react';

export const SITE = 'Mastemy';

/** What a page declared about itself; collected during server rendering. */
export interface PageMeta {
  title?: string;
  description?: string;
  noindex: boolean;
}

/**
 * Present only during server rendering: `usePageMeta` writes into it synchronously so the SSR server can
 * emit the same title/description/robots the client would set, without running effects.
 */
export const HeadCollectorContext = createContext<PageMeta | null>(null);

export function fullTitle(title: string | undefined): string {
  return title ? `${title} · ${SITE}` : SITE;
}

function setMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Server-rendered head tags (canonical, hreflang, Open Graph, JSON-LD) carry `data-ssr-path`.
 * Once the client navigates elsewhere they describe a different page, so they are removed.
 */
function dropStaleServerHead() {
  const path = window.location.pathname;
  document.head.querySelectorAll<HTMLElement>('[data-ssr-path]').forEach((el) => {
    if (el.dataset.ssrPath !== path) el.remove();
  });
}

/**
 * Sets document title and meta description for the current page.
 * `noindex` marks private pages (dashboards, notes, attempts) so they stay out of search indexes.
 */
export function usePageMeta(
  title: string | undefined,
  description?: string,
  opts?: { noindex?: boolean },
) {
  const noindex = !!opts?.noindex;
  const collector = useContext(HeadCollectorContext);
  if (collector) {
    // Server render: last writer (the innermost page) wins, matching effect order on the client.
    collector.title = title;
    if (description) collector.description = description;
    collector.noindex = collector.noindex || noindex;
  }
  useEffect(() => {
    document.title = fullTitle(title);
    if (description) setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    dropStaleServerHead();
  }, [title, description, noindex]);
}
