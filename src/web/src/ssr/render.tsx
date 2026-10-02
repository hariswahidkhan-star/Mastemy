import type { ReactNode } from 'react';
import { prerender } from 'react-dom/static';
import { matchPath, StaticRouter } from 'react-router';
import { dehydrate } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import { ApiError } from '../api/client';
import type { CategoryDto, CourseDetailDto } from '../api/types';
import { ensureLang } from '../i18n/I18nProvider';
import type { Lang } from '../i18n/I18nProvider';
import { HeadCollectorContext, SITE } from '../lib/seo';
import { LazyCollectorContext } from '../lib/lazyNamed';
import { ConsentCookieContext } from '../lib/analytics';
import type { PageMeta } from '../lib/seo';
import { AppTree, createQueryClient, SSR_GLOBAL } from './AppTree';
import type { SsrPayload } from './AppTree';
import { buildHead, courseJsonLd, localizedUrl, scriptJson } from './head';
import {
  DISCOVER_CACHE_PARAMS,
  DISCOVER_PUBLIC_ROUTES,
  discoverJsonLd,
  discoverNotFound,
} from './discoverHead';
import { FINALB_PUBLIC_ROUTES, finalbJsonLd, finalbNotFound } from './finalbHead';

/** Public, indexable routes rendered on the server. Everything else gets the noindex SPA shell. */
export const PUBLIC_ROUTES = [
  '/',
  '/courses',
  '/courses/:slug',
  '/categories/:slug',
  '/free-lessons',
  '/verify',
  '/verify/:code',
  '/teach',
  '/about',
  '/help',
  '/contact',
  '/login',
  '/register',
  ...DISCOVER_PUBLIC_ROUTES,
  ...FINALB_PUBLIC_ROUTES,
] as const;

/** Certificate verification results are public but per-person: rendered, never indexed. */
const NOINDEX_PUBLIC = ['/verify/:code'];

const MAX_PASSES = 5;

/**
 * Render to a complete HTML string. `prerender` (unlike `renderToString`) waits for every Suspense boundary,
 * so route-level `React.lazy` chunks are loaded and rendered on the server instead of their fallbacks.
 */
async function renderComplete(node: ReactNode): Promise<string> {
  const { prelude } = await prerender(node, {
    // Never outline large completed boundaries into hidden segments revealed by inline scripts.
    progressiveChunkSize: Number.POSITIVE_INFINITY,
    onError: (err) => console.error('SSR render error:', err),
  });
  return new Response(prelude).text();
}

export interface RenderOptions {
  /** index.html produced by `vite build` (or the dev template). */
  template: string;
  /** Absolute public origin, e.g. https://mastemy.com (no trailing slash). */
  baseUrl: string;
  /** The request carried the analytics consent cookie (no banner in the HTML). Default true. */
  consentCookie?: boolean;
}

export interface RenderResult {
  status: number;
  html: string;
}

export function langFromSearch(search: string): Lang {
  return new URLSearchParams(search).get('lang') === 'ar' ? 'ar' : 'en';
}

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((p) => matchPath(p, pathname));
}

function inject(template: string, opts: { lang: Lang; head: string; body: string; tail: string }) {
  // Function replacers only: a string replacement would expand `$&`, `$'` and "$`" found in course text.
  const htmlTag = `<html lang="${opts.lang}" dir="${opts.lang === 'ar' ? 'rtl' : 'ltr'}">`;
  let html = template
    .replace(/<html[^>]*>/, () => htmlTag)
    .replace(/\s*<title>[\s\S]*?<\/title>/, () => '')
    .replace(/\s*<meta name="description"[^>]*>/, () => '')
    .replace(/\s*<meta name="robots"[^>]*>/, () => '');
  html = html.replace('</head>', () => `    ${opts.head}\n  </head>`);
  html = html.replace(
    '<div id="root"></div>',
    () => `<div id="root">${opts.body}</div>${opts.tail}`,
  );
  return html;
}

/** Query parameters that change what a public page renders; everything else is ignored for caching. */
export const CACHE_PARAMS = [
  ...['lang', 'q', 'page', 'sort', 'category', 'level', 'language'],
  ...DISCOVER_CACHE_PARAMS,
] as const;

/**
 * SSR cache key: pathname plus the whitelisted parameters in a fixed order, so junk or reordered query
 * strings cannot multiply cache entries. Empty values are dropped.
 */
export function ssrCacheKey(pathname: string, search: string): string {
  const src = new URLSearchParams(search);
  const out = new URLSearchParams();
  for (const k of CACHE_PARAMS) {
    const v = src.get(k);
    if (v !== null && v !== '') out.set(k, v);
  }
  const qs = out.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

/** Fetch every query the last render registered but has no data for yet. */
async function settle(qc: QueryClient): Promise<number> {
  const pending = qc
    .getQueryCache()
    .getAll()
    .filter((q) => q.state.status === 'pending' && q.state.fetchStatus === 'idle');
  await Promise.all(pending.map((q) => q.fetch().catch(() => undefined)));
  return pending.length;
}

function notFoundQuery(qc: QueryClient): boolean {
  return qc
    .getQueryCache()
    .getAll()
    .some(
      (q) =>
        (q.queryKey[0] === 'course' || q.queryKey[0] === 'category') &&
        q.state.error instanceof ApiError &&
        q.state.error.status === 404,
    );
}

/** The SPA shell for private/unknown routes: no content, explicit noindex. */
export function renderShell(template: string, lang: Lang): string {
  return inject(template, {
    lang,
    head: buildHead({
      meta: { noindex: true },
      pathname: '/',
      lang,
      baseUrl: '',
      indexable: false,
      jsonLd: [],
    }),
    body: '',
    tail: '',
  });
}

/**
 * Render a public URL to HTML: run the app against a fresh query cache, fetch whatever the page asked for
 * (repeating until no new queries appear), then render once more with data and embed the dehydrated cache
 * so the browser hydrates without a loading flash or refetch.
 */
export async function renderPage(url: string, opts: RenderOptions): Promise<RenderResult> {
  const { pathname, search } = new URL(url, 'http://ssr.local');
  const lang = langFromSearch(search);
  if (!isPublicRoute(pathname)) return { status: 200, html: renderShell(opts.template, lang) };

  await ensureLang(lang);
  const qc = createQueryClient();
  // No retries on the server: one slow API call should not stall a crawler.
  qc.setDefaultOptions({ queries: { ...qc.getDefaultOptions().queries, retry: false } });
  let meta: PageMeta = { noindex: false };
  let body = '';
  let lazyUsed = new Set<string>();
  for (let pass = 0; pass < MAX_PASSES; pass++) {
    meta = { noindex: false };
    lazyUsed = new Set<string>();
    body = await renderComplete(
      <LazyCollectorContext.Provider value={lazyUsed}>
        <ConsentCookieContext.Provider value={opts.consentCookie ?? true}>
          <HeadCollectorContext.Provider value={meta}>
            <AppTree
              queryClient={qc}
              lang={lang}
              router={(app) => <StaticRouter location={pathname + search}>{app}</StaticRouter>}
            />
          </HeadCollectorContext.Provider>
        </ConsentCookieContext.Provider>
      </LazyCollectorContext.Provider>,
    );
    const fetched = await settle(qc);
    // A pass that had to wait for a lazy route chunk may reveal it with React's inline runtime scripts
    // (which the CSP blocks); once the chunk is loaded the next pass renders it in place, script-free.
    if (fetched === 0 && !body.includes('<script')) break;
  }

  const categoryMatch = matchPath('/categories/:slug', pathname);
  const categories = qc.getQueryData<CategoryDto[]>(['categories']);
  const unknownCategory =
    !!categoryMatch &&
    !!categories &&
    !categories.some((c) => c.slug === categoryMatch.params.slug);
  const notFound =
    notFoundQuery(qc) ||
    unknownCategory ||
    discoverNotFound(qc, pathname) ||
    finalbNotFound(qc, pathname);
  const jsonLd: unknown[] = [];
  const courseMatch = matchPath('/courses/:slug', pathname);
  if (courseMatch?.params.slug) {
    const course = qc.getQueryData<CourseDetailDto>(['course', courseMatch.params.slug]);
    if (course)
      jsonLd.push(courseJsonLd(course, localizedUrl(opts.baseUrl, pathname, lang), opts.baseUrl));
  }
  jsonLd.push(...discoverJsonLd(qc, pathname, opts.baseUrl, lang));
  jsonLd.push(...finalbJsonLd(qc, pathname, opts.baseUrl, lang));
  if (pathname === '/') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE,
      url: opts.baseUrl,
      logo: `${opts.baseUrl}/favicon.svg`,
    });
  }

  const payload: SsrPayload = { lang, state: dehydrate(qc), lazy: [...lazyUsed] };
  const head = buildHead({
    meta,
    pathname,
    lang,
    baseUrl: opts.baseUrl,
    indexable: !notFound && !NOINDEX_PUBLIC.some((p) => matchPath(p, pathname)),
    jsonLd,
  });
  qc.clear();
  return {
    status: notFound ? 404 : 200,
    html: inject(opts.template, {
      lang,
      head,
      body,
      // A non-executing JSON block: no inline script for the Content-Security-Policy to allow.
      tail: `<script type="application/json" id="${SSR_GLOBAL}">${scriptJson(payload)}</script>`,
    }),
  };
}
