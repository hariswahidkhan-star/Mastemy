import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { login } from './helpers';
import { publicPages, seedPublishedCourse } from './content';
import type { SeededCourse } from './content';

/**
 * The production Node SSR server (dist-server, started by scripts/e2e-all.sh on E2E_SSR_URL with
 * SSR_PROXY_API=1): security headers and compression, per-page SEO metadata in the server HTML (title,
 * description, canonical, Open Graph + Twitter card with the generated og:image, JSON-LD, one h1), and a
 * Content-Security-Policy smoke test: real pages, including the YouTube lesson player and a sign-in, run
 * in the browser without a single CSP violation.
 */
const SSR = process.env.E2E_SSR_URL ?? '';
test.skip(!SSR, 'E2E_SSR_URL is not set (the SSR server is started by scripts/e2e-all.sh)');

function head(html: string) {
  const meta = (attr: 'name' | 'property', key: string) =>
    new RegExp(`<meta ${attr}="${key.replace(':', '\\:')}" content="([^"]*)"`).exec(html)?.[1];
  return {
    title: /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '',
    description: meta('name', 'description'),
    robots: meta('name', 'robots'),
    canonical: /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1],
    ogTitle: meta('property', 'og:title'),
    ogDescription: meta('property', 'og:description'),
    ogImage: meta('property', 'og:image'),
    ogUrl: meta('property', 'og:url'),
    twitterCard: meta('name', 'twitter:card'),
    twitterImage: meta('name', 'twitter:image'),
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
      (m) => JSON.parse(m[1]) as { '@type': string },
    ),
    h1: (html.match(/<h1[\s>]/g) ?? []).length,
    inlineScripts: [...html.matchAll(/<script(\s[^>]*)?>/g)]
      .map((m) => m[1] ?? '')
      .filter((a) => !/src=|type="application\/(ld\+)?json"/.test(a)).length,
  };
}

/** Records CSP violations and console errors from the moment the page starts loading. */
async function watch(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error' && /Content Security Policy|Refused to/.test(m.text())) errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) => {
      (window as unknown as { __csp: string[] }).__csp ??= [];
      (window as unknown as { __csp: string[] }).__csp.push(`${e.violatedDirective} ${e.blockedURI}`);
    });
  });
  // DevTools issues also cover violations caught by the page (e.g. a library probing `new Function`).
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Audits.enable');
  cdp.on('Audits.issueAdded', (e) => {
    if (e.issue.code === 'ContentSecurityPolicyIssue')
      errors.push(`CSP issue: ${JSON.stringify(e.issue.details.contentSecurityPolicyIssueDetails)}`);
  });
  return async () => [
    ...errors,
    ...((await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? [])) as string[]),
  ];
}

test.describe.serial('SSR server: headers, SEO metadata, CSP', () => {
  let course: SeededCourse;

  test('setup: a published course', async ({ request }) => {
    course = await seedPublishedCourse(request, 'ssr');
  });

  test('security headers and compression', async ({ request }) => {
    const res = await request.get(`${SSR}/`, { headers: { 'Accept-Encoding': 'br, gzip' } });
    expect(res.status()).toBe(200);
    const h = res.headers();
    const csp = h['content-security-policy'] ?? '';
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain('https://www.youtube-nocookie.com');
    expect(csp).toMatch(/script-src 'self' 'sha256-[A-Za-z0-9+/=]+'/);
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-(inline|eval)'/);
    expect(h['x-content-type-options']).toBe('nosniff');
    expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(h['cross-origin-opener-policy']).toBe('same-origin');
    expect(h['permissions-policy']).toContain('camera=()');
    expect(h['strict-transport-security']).toBeUndefined(); // plain HTTP
    expect(h['content-encoding']).toBe('br');

    const https = await request.get(`${SSR}/about`, { headers: { 'X-Forwarded-Proto': 'https' } });
    expect(https.headers()['strict-transport-security']).toBe('max-age=63072000; includeSubDomains; preload');
    expect(https.headers()['content-security-policy']).toContain('upgrade-insecure-requests');

    const html = await res.text();
    const js = /src="(\/assets\/index-[^"]+\.js)"/.exec(html)?.[1];
    expect(js).toBeTruthy();
    const asset = await request.get(`${SSR}${js}`, { headers: { 'Accept-Encoding': 'gzip' } });
    expect(asset.headers()['content-encoding']).toBe('gzip');
    expect(asset.headers()['cache-control']).toContain('immutable');
    for (const p of ['/robots.txt', '/sitemap.xml']) expect((await request.get(`${SSR}${p}`)).status()).toBe(200);
  });

  test('every public page: unique title/description, canonical, OG + Twitter card, one h1', async ({ request }) => {
    const problems: string[] = [];
    const titles = new Map<string, string>();
    for (const p of publicPages(course)) {
      const res = await request.get(`${SSR}${p.path}`);
      if (res.status() !== 200) {
        problems.push(`${p.name}: HTTP ${res.status()}`);
        continue;
      }
      const m = head(await res.text());
      const where = `${p.name} (${p.path})`;
      if (!m.title || m.title === 'Mastemy') problems.push(`${where}: generic title`);
      if (titles.has(m.title)) problems.push(`${where}: title shared with ${titles.get(m.title)}`);
      titles.set(m.title, p.name);
      if (!m.description) problems.push(`${where}: no description`);
      if (m.robots !== 'index, follow') problems.push(`${where}: robots ${m.robots}`);
      if (!m.canonical?.startsWith('http')) problems.push(`${where}: canonical ${m.canonical}`);
      if (m.ogTitle !== m.title || !m.ogDescription || m.ogUrl !== m.canonical) problems.push(`${where}: incomplete og:*`);
      if (!m.ogImage?.endsWith('/og-image.png') || m.twitterImage !== m.ogImage) problems.push(`${where}: og/twitter image`);
      if (m.twitterCard !== 'summary_large_image') problems.push(`${where}: twitter:card ${m.twitterCard}`);
      if (m.h1 !== 1) problems.push(`${where}: ${m.h1} h1 in server HTML`);
      if (m.inlineScripts !== 1) problems.push(`${where}: ${m.inlineScripts} executable inline scripts (expected the theme snippet only)`);
      if (p.name === 'home' && !m.jsonLd.some((l) => l['@type'] === 'Organization')) problems.push('home: no Organization JSON-LD');
      if (p.name === 'course detail' && !m.jsonLd.some((l) => l['@type'] === 'Course')) problems.push('course: no Course JSON-LD');
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });

  test('the generated share image is a 1200x630 PNG (with WebP and AVIF variants)', async ({ request }) => {
    const png = await request.get(`${SSR}/og-image.png`);
    expect(png.status()).toBe(200);
    expect(png.headers()['content-type']).toBe('image/png');
    const buf = await png.body();
    expect([buf.readUInt32BE(16), buf.readUInt32BE(20)]).toEqual([1200, 630]);
    for (const [ext, type] of [
      ['webp', 'image/webp'],
      ['avif', 'image/avif'],
    ]) {
      const r = await request.get(`${SSR}/og-image.${ext}`);
      expect(r.status(), ext).toBe(200);
      expect(r.headers()['content-type']).toBe(type);
    }
  });

  test('CSP smoke: public pages, the lesson player and sign-in run without violations', async ({ browser }) => {
    const ctx = await browser.newContext({ baseURL: SSR });
    const page = await ctx.newPage();
    const violations = await watch(page);
    for (const p of publicPages(course)) {
      await page.goto(p.path);
      await expect(page.locator('main h1').first()).toBeVisible();
    }
    // Hydrated and interactive: the Explore menu opens.
    await page.goto('/');
    await page.getByRole('button', { name: /^Explore/ }).click();
    await expect(page.getByRole('button', { name: /^Explore/ })).toHaveAttribute('aria-expanded', 'true');
    // Signed in (API calls through the same origin) and the lesson with its YouTube player.
    await login(page, course.studentEmail);
    await page.goto(`/learn/${course.slug}/${course.lessonId}`);
    await expect(page.locator('main h1').first()).toBeVisible();
    await expect(page.locator('iframe[src*="youtube"], .player-frame').first()).toBeVisible();
    await page.waitForTimeout(1000);
    const found = await violations();
    await ctx.close();
    expect(found, found.join('\n')).toEqual([]);
  });
});
