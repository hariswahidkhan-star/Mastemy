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
 * SSR_CACHE_SECONDS (default 60), SSR_PROXY_API=1 (forward /api and /health to API_INTERNAL_URL: for running
 * without nginx, e.g. the Lighthouse job; in deployment nginx routes /api itself).
 *
 * Responses are compressed (brotli or gzip, by Accept-Encoding) and carry the security headers below.
 */
import { createServer, request as httpRequest } from 'node:http';
import { brotliCompressSync, constants as zlibConstants, gzipSync } from 'node:zlib';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createHash } from 'node:crypto';
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
const PROXY_API = env.SSR_PROXY_API === '1';

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
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

/**
 * The initial stylesheet(s) are inlined into every HTML response (a few kB compressed): the first paint
 * then needs no extra round trip for render-blocking CSS. SSR_INLINE_CSS=0 keeps the <link> tags.
 */
async function inlineStyles(html: string): Promise<string> {
  if (env.SSR_INLINE_CSS === '0') return html;
  let out = html;
  for (const m of html.matchAll(
    /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g,
  )) {
    const css = await readFile(path.join(DIST, m[1]), 'utf8');
    out = out.replace(m[0], () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`);
  }
  return out;
}

const template = await inlineStyles(await readFile(path.join(DIST, 'index.html'), 'utf8'));
const cache = new Map<string, { at: number; status: number; html: string }>();

/**
 * Executable inline scripts in the template (the pre-paint theme/language snippet) are allowed by hash;
 * the SSR data block and JSON-LD are non-executing `type="application/json|ld+json"` elements.
 */
function inlineScriptHashes(html: string): string[] {
  const out: string[] = [];
  for (const m of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    const attrs = m[1] ?? '';
    if (/\ssrc=/.test(attrs) || /type="application\/(ld\+)?json"/.test(attrs) || !m[2].trim())
      continue;
    out.push(`'sha256-${createHash('sha256').update(m[2]).digest('base64')}'`);
  }
  return out;
}

const SCRIPT_HASHES = inlineScriptHashes(template).join(' ');

/**
 * Content-Security-Policy for every response. YouTube: the IFrame API script (www.youtube.com, which pulls
 * its widget code from s.ytimg.com), the embed frame (youtube-nocookie.com) and thumbnails (i.ytimg.com).
 * KaTeX fonts are bundled under /assets. Inline style attributes come from React `style` props.
 */
function contentSecurityPolicy(https: boolean): string {
  return [
    "default-src 'self'",
    // 'wasm-unsafe-eval' lets the practice lab compile/instantiate its WebAssembly engine (sql.js) in a Web
    // Worker. It permits WebAssembly only — not JavaScript eval()/new Function() — so the CSP stays strict.
    `script-src 'self' 'wasm-unsafe-eval' ${SCRIPT_HASHES} https://www.youtube.com https://s.ytimg.com`.replace(
      /\s+/g,
      ' ',
    ),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com",
    "font-src 'self' data:",
    "connect-src 'self'",
    'frame-src https://www.youtube-nocookie.com https://www.youtube.com',
    "media-src 'self' blob:",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(https ? ['upgrade-insecure-requests'] : []),
  ].join('; ');
}

function securityHeaders(req: IncomingMessage, res: ServerResponse) {
  const https = req.headers['x-forwarded-proto'] === 'https';
  res.setHeader('Content-Security-Policy', contentSecurityPolicy(https));
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), browsing-topics=(), fullscreen=(self "https://www.youtube-nocookie.com" "https://www.youtube.com"), autoplay=(self "https://www.youtube-nocookie.com" "https://www.youtube.com"), encrypted-media=(self "https://www.youtube-nocookie.com" "https://www.youtube.com"), picture-in-picture=(self "https://www.youtube-nocookie.com" "https://www.youtube.com")',
  );
  // HSTS only over HTTPS (the TLS-terminating proxy says so); browsers ignore it on plain HTTP anyway.
  if (https)
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
}

const COMPRESSIBLE = /^(text\/|application\/(json|javascript|xml)|image\/svg)/;
/** Compressed static files, keyed by path + encoding (the build output is immutable while running). */
const compressedCache = new Map<string, Buffer>();

function encodingFor(req: IncomingMessage): 'br' | 'gzip' | null {
  const accept = String(req.headers['accept-encoding'] ?? '');
  if (/\bbr\b/.test(accept)) return 'br';
  if (/\bgzip\b/.test(accept)) return 'gzip';
  return null;
}

function compress(body: Buffer, enc: 'br' | 'gzip', quality: number): Buffer {
  return enc === 'br'
    ? brotliCompressSync(body, {
        params: {
          [zlibConstants.BROTLI_PARAM_QUALITY]: quality,
          [zlibConstants.BROTLI_PARAM_SIZE_HINT]: body.length,
        },
      })
    : gzipSync(body, { level: Math.min(9, quality) });
}

/** Sends `body`, compressed when the client accepts it and the type is worth compressing. */
function send(
  req: IncomingMessage,
  res: ServerResponse,
  body: Buffer,
  type: string,
  cacheKey?: string,
) {
  res.setHeader('Content-Type', type);
  res.setHeader('Vary', 'Accept-Encoding');
  const enc = body.length > 1024 && COMPRESSIBLE.test(type) ? encodingFor(req) : null;
  let out = body;
  if (enc) {
    const key = cacheKey ? `${cacheKey}|${enc}` : '';
    out = (key && compressedCache.get(key)) || compress(body, enc, cacheKey ? 11 : 5);
    if (key) compressedCache.set(key, out);
    res.setHeader('Content-Encoding', enc);
  }
  res.setHeader('Content-Length', out.length);
  res.end(req.method === 'HEAD' ? undefined : out);
}

/** Forwards a request to the API unchanged (SSR_PROXY_API=1 only). */
function proxyApi(req: IncomingMessage, res: ServerResponse) {
  const target = new URL(req.url ?? '/', API);
  const upstream = httpRequest(
    target,
    {
      method: req.method,
      headers: { ...req.headers, host: target.host, 'x-forwarded-host': req.headers.host ?? '' },
    },
    (up) => {
      res.writeHead(up.statusCode ?? 502, up.headers);
      up.pipe(res);
    },
  );
  upstream.on('error', () => {
    if (!res.headersSent) res.statusCode = 502;
    res.end();
  });
  req.pipe(upstream);
}

async function serveStatic(
  req: IncomingMessage,
  pathname: string,
  res: ServerResponse,
): Promise<boolean> {
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
  // Share-card images and icons are fetched by other sites' link previews.
  if (/\.(png|webp|avif|svg|ico)$/.test(file))
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader(
    'Cache-Control',
    pathname.startsWith('/assets/')
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=3600',
  );
  send(
    req,
    res,
    await readFile(file),
    TYPES[path.extname(file)] ?? 'application/octet-stream',
    file,
  );
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
  securityHeaders(req, res);
  if (PROXY_API && /^\/(api\/|health(\/|$|\?))/.test(req.url ?? '')) {
    proxyApi(req, res);
    return;
  }
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
  if (await serveStatic(req, url.pathname, res)) return;

  // Two variants per URL: with and without the consent banner (first-time visitors get it in the HTML).
  const consentCookie = /(?:^|;\s*)mastemy_consent=/.test(String(req.headers.cookie ?? ''));
  const pageKey = ssrCacheKey(url.pathname, url.search);
  const key = `${consentCookie ? 'c' : 'n'}|${pageKey}`;
  const hit = cache.get(key);
  let page = hit && Date.now() - hit.at < CACHE_MS ? hit : null;
  if (!page) {
    try {
      const r = await renderPage(pageKey, { template, baseUrl: BASE_URL, consentCookie });
      page = { at: Date.now(), ...r };
      if (cache.size > 500) cache.delete(cache.keys().next().value as string);
      cache.set(key, page);
    } catch (err) {
      console.error('SSR failed for', pageKey, err);
      // The client still renders the page; crawlers are told to come back.
      page = { at: 0, status: 503, html: renderShell(template, langFromSearch(url.search)) };
      res.setHeader('Retry-After', '60');
    }
  }
  res.statusCode = page.status;
  res.setHeader('Cache-Control', 'no-cache');
  send(req, res, Buffer.from(page.html), 'text/html; charset=utf-8');
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
