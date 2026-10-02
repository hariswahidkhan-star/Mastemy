/**
 * Mastemy web SSR server (node:http, no framework).
 *
 * - Serves the Vite client build (`dist/`) with long-lived caching for hashed assets.
 * - Renders public routes on demand (`renderPage`) with data fetched from the API at API_INTERNAL_URL,
 *   caching each rendered URL for SSR_CACHE_SECONDS.
 * - Returns the SPA shell with `noindex` for every other route (learn, me, studio, admin, attempts, ...).
 * - Proxies /robots.txt and /sitemap.xml to the API so it works without nginx in front.
 *
 * Environment: PUBLIC_BASE_URL (required, e.g. https://mastemy.com), API_INTERNAL_URL (default
 * http://api:8080), PORT (default 3000), DIST_DIR (default ../dist next to this bundle),
 * SSR_CACHE_SECONDS (default 60).
 */
import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage, renderShell, langFromSearch, ssrCacheKey } from '../src/ssr/render';

const env = process.env;
const baseUrlRaw = (env.PUBLIC_BASE_URL ?? '').trim();
if (!/^https?:\/\/[^/]+/.test(baseUrlRaw)) {
  console.error(
    'PUBLIC_BASE_URL must be set to the absolute public origin (e.g. https://mastemy.com).',
  );
  process.exit(1);
}
const BASE_URL = baseUrlRaw.replace(/\/+$/, '');
const API = (env.API_INTERNAL_URL ?? 'http://api:8080').replace(/\/+$/, '');
const PORT = Number(env.PORT ?? 3000);
const CACHE_MS = Number(env.SSR_CACHE_SECONDS ?? 60) * 1000;
const here = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(env.DIST_DIR ?? path.join(here, '..', 'dist'));

// The app's API client issues same-origin relative requests ("/api/..."); on the server they go to the
// internal API address, with a timeout so a slow backend cannot hang a render.
const nativeFetch = globalThis.fetch.bind(globalThis);
globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  if (typeof input === 'string' && input.startsWith('/')) {
    return nativeFetch(`${API}${input}`, {
      ...init,
      signal: init?.signal ?? AbortSignal.timeout(5000),
    });
  }
  return nativeFetch(input, init);
};

const TYPES: Record<string, string> = {
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');
const cache = new Map<string, { at: number; status: number; html: string }>();

function securityHeaders(res: ServerResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}

async function serveStatic(pathname: string, res: ServerResponse): Promise<boolean> {
  if (pathname === '/' || pathname === '/index.html') return false;
  const file = path.resolve(DIST, '.' + decodeURIComponent(pathname));
  if (!file.startsWith(DIST + path.sep)) return false;
  try {
    const s = await stat(file);
    if (!s.isFile()) return false;
  } catch {
    return false;
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', TYPES[path.extname(file)] ?? 'application/octet-stream');
  res.setHeader(
    'Cache-Control',
    pathname.startsWith('/assets/')
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=3600',
  );
  res.end(await readFile(file));
  return true;
}

async function proxyApiText(pathname: string, res: ServerResponse) {
  const upstream = await nativeFetch(`${API}${pathname}`, { signal: AbortSignal.timeout(10000) });
  res.statusCode = upstream.status;
  res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'text/plain');
  res.setHeader('Cache-Control', upstream.headers.get('cache-control') ?? 'no-store');
  res.end(Buffer.from(await upstream.arrayBuffer()));
}

async function handle(req: IncomingMessage, res: ServerResponse) {
  securityHeaders(res);
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.end();
    return;
  }
  const url = new URL(req.url ?? '/', 'http://ssr.local');
  if (url.pathname === '/healthz') {
    res.end('ok');
    return;
  }
  if (url.pathname === '/robots.txt' || url.pathname === '/sitemap.xml') {
    await proxyApiText(url.pathname, res);
    return;
  }
  if (url.pathname.startsWith('/api/')) {
    // In deployment nginx routes /api to the API container directly.
    res.statusCode = 404;
    res.end('API is not served by the web renderer.');
    return;
  }
  if (await serveStatic(url.pathname, res)) return;

  const key = ssrCacheKey(url.pathname, url.search);
  const hit = cache.get(key);
  let page = hit && Date.now() - hit.at < CACHE_MS ? hit : null;
  if (!page) {
    try {
      const r = await renderPage(key, { template, baseUrl: BASE_URL });
      page = { at: Date.now(), ...r };
      if (cache.size > 500) cache.delete(cache.keys().next().value as string);
      cache.set(key, page);
    } catch (err) {
      console.error('SSR failed for', key, err);
      // The client still renders the page; crawlers are told to come back.
      page = { at: 0, status: 503, html: renderShell(template, langFromSearch(url.search)) };
      res.setHeader('Retry-After', '60');
    }
  }
  res.statusCode = page.status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Vary', 'Accept-Encoding');
  res.end(req.method === 'HEAD' ? undefined : page.html);
}

createServer((req, res) => {
  handle(req, res).catch((err) => {
    console.error(err);
    if (!res.headersSent) res.statusCode = 500;
    res.end();
  });
}).listen(PORT, () =>
  console.log(`Mastemy SSR listening on :${PORT} (API ${API}, site ${BASE_URL})`),
);
