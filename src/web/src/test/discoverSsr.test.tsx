// @vitest-environment node
import { renderPage, ssrCacheKey } from '../ssr/render';

const TEMPLATE = `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <title>Mastemy</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
const BASE = 'https://mastemy.example';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

function mockApi(routes: Record<string, () => Response>) {
  const fn = vi.fn((url: string) => {
    const path = url.split('?')[0];
    const handler = routes[path];
    return Promise.resolve(handler ? handler() : json({ title: 'Not found' }, 404));
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

function jsonLd(html: string): Record<string, unknown>[] {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]) as Record<string, unknown>,
  );
}

afterEach(() => vi.unstubAllGlobals());

describe('discovery server rendering', () => {
  it('renders an article with Article JSON-LD and an unknown article as 404', async () => {
    mockApi({});
    const ok = await renderPage('/articles/how-mcq-certificates-work', {
      template: TEMPLATE,
      baseUrl: BASE,
    });
    expect(ok.status).toBe(200);
    expect(ok.html).toContain('<meta name="robots" content="index, follow">');
    const ld = jsonLd(ok.html).find((x) => x['@type'] === 'Article');
    expect(ld).toMatchObject({
      headline: "How our MCQ certificates work and what they do and don't prove",
    });
    const missing = await renderPage('/articles/nope', { template: TEMPLATE, baseUrl: BASE });
    expect(missing.status).toBe(404);
  });

  it('renders a certification with the facts and no partnership claim; unknown slugs are 404', async () => {
    mockApi({
      '/api/certifications/aws-saa': () =>
        json({
          id: 'c1',
          slug: 'aws-saa',
          title: 'Solutions Architect Associate',
          issuerName: 'Example Issuer',
          jurisdiction: '',
          examCode: 'SAA-C03',
          levelOrPart: 'Associate',
          version: 'C03',
          effectiveFrom: null,
          effectiveTo: null,
          prerequisites: '',
          officialSourceUrl: 'https://issuer.example/saa',
          lastCheckedAt: '2026-09-01T00:00:00Z',
          renewalInfo: '',
          kind: 'ProfessionalCertification',
          state: 'Verified',
          nonMcqDisclosure: 'Includes a hands-on lab.',
          replacedBySlug: null,
          objectives: [{ id: 'o1', code: 'D1', title: 'Design', weightPercent: 30, sortOrder: 1 }],
          preparationCourses: [],
        }),
    });
    const ok = await renderPage('/certifications/aws-saa', { template: TEMPLATE, baseUrl: BASE });
    expect(ok.status).toBe(200);
    expect(ok.html).toContain('SAA-C03');
    expect(ok.html).toContain('https://issuer.example/saa');
    expect(ok.html).toContain('Includes a hands-on lab.');
    expect(ok.html).toContain('is not affiliated with');
    expect(jsonLd(ok.html).some((x) => x['@type'] === 'WebPage')).toBe(true);
    const missing = await renderPage('/certifications/none', { template: TEMPLATE, baseUrl: BASE });
    expect(missing.status).toBe(404);
  });

  it('caches extended catalogue filters separately', () => {
    expect(ssrCacheKey('/courses', '?skill=py&junk=1&duration=short')).toBe(
      '/courses?duration=short&skill=py',
    );
  });
});
