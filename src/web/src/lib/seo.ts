import { useEffect } from 'react';

const SITE = 'Mastemy';

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
 * Sets document title and meta description for the current page.
 * `noindex` marks private pages (dashboards, notes, attempts) so they stay out of search indexes.
 */
export function usePageMeta(
  title: string | undefined,
  description?: string,
  opts?: { noindex?: boolean },
) {
  const noindex = !!opts?.noindex;
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : SITE;
    if (description) setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
  }, [title, description, noindex]);
}
