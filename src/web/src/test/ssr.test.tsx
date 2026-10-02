// @vitest-environment node
import type { CourseDetailDto } from '../api/types';
import { renderPage, ssrCacheKey } from '../ssr/render';

const TEMPLATE = `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="default" />
    <title>Mastemy</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>`;
const BASE = 'https://mastemy.example';

const course: CourseDetailDto = {
  id: 'c1',
  slug: 'intro-ml',
  title: 'Introduction to Machine Learning',
  subtitle: 'Foundations </script><b>',
  level: 'Beginner',
  language: 'en',
  description: 'A practical introduction.',
  audience: 'Analysts',
  prerequisites: 'Algebra',
  outcomes: ['Explain supervised learning'],
  modules: [
    {
      id: 'm1',
      title: 'Basics',
      lessons: [
        { id: 'l1', title: 'What is ML?', durationSeconds: 600, isPreview: true, hasVideo: true },
      ],
    },
  ],
  videoCount: 1,
  questionCount: 12,
  totalDurationSeconds: 600,
  instructors: [{ userId: 'u1', displayName: 'Dr. Lina Haddad' }],
  packages: [],
  reviewedAt: '2026-09-01T00:00:00Z',
  ratingCount: 0,
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function mockApi(routes: Record<string, () => Response>) {
  const fn = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    for (const [prefix, make] of Object.entries(routes)) if (url.startsWith(prefix)) return make();
    return json({ title: 'not found', status: 404 }, 404);
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

describe('server rendering', () => {
  it('renders a course page with title, canonical, hreflang, JSON-LD and dehydrated data', async () => {
    const fetchMock = mockApi({
      '/api/courses/intro-ml': () => json(course),
      '/api/courses/c1/reviews': () => json([]),
    });
    const { status, html } = await renderPage('/courses/intro-ml', {
      template: TEMPLATE,
      baseUrl: BASE,
    });
    expect(status).toBe(200);
    expect(html).toContain('<title>Introduction to Machine Learning · Mastemy</title>');
    expect(html).not.toContain('content="default"');
    expect(html).toContain('<meta name="robots" content="index, follow">');
    expect(html).toContain(`<link rel="canonical" href="${BASE}/courses/intro-ml"`);
    expect(html).toContain(`hreflang="ar" href="${BASE}/courses/intro-ml?lang=ar"`);
    expect(html).toContain(`hreflang="x-default" href="${BASE}/courses/intro-ml"`);
    // Course content is in the markup, not just the shell.
    expect(html).toMatch(/<div id="root">.*Introduction to Machine Learning/s);

    const [ld] = jsonLd(html);
    expect(ld['@type']).toBe('Course');
    expect(ld.name).toBe('Introduction to Machine Learning');
    expect(ld.url).toBe(`${BASE}/courses/intro-ml`);
    expect(ld.provider).toMatchObject({ '@type': 'Organization', name: 'Mastemy' });
    expect(ld.creator).toEqual([{ '@type': 'Person', name: 'Dr. Lina Haddad' }]);
    // No reviews: no rating is invented.
    expect(ld).not.toHaveProperty('aggregateRating');
    // Untrusted text cannot break out of the script element.
    expect(html).not.toContain('Foundations </script><b>');

    // The client hydrates from the embedded cache instead of refetching.
    const payload = /window\.__MASTEMY_SSR__=(.*?)<\/script>/.exec(html)?.[1] ?? '';
    expect(payload).toContain('"queryKey":["course","intro-ml"]');
    expect(fetchMock).toHaveBeenCalledWith('/api/courses/intro-ml', expect.anything());
  });

  it('adds aggregateRating only from real reviews and localizes for ?lang=ar', async () => {
    mockApi({
      '/api/courses/intro-ml': () => json({ ...course, ratingCount: 3, ratingAverage: 4.666 }),
      '/api/courses/c1/reviews': () => json([]),
    });
    const { html } = await renderPage('/courses/intro-ml?lang=ar', {
      template: TEMPLATE,
      baseUrl: BASE,
    });
    expect(html).toContain('<html lang="ar" dir="rtl">');
    expect(html).toContain(`<link rel="canonical" href="${BASE}/courses/intro-ml?lang=ar"`);
    expect(jsonLd(html)[0].aggregateRating).toMatchObject({ ratingValue: 4.7, ratingCount: 3 });
  });

  it('returns 404 and noindex for an unknown course', async () => {
    mockApi({});
    const { status, html } = await renderPage('/courses/missing', {
      template: TEMPLATE,
      baseUrl: BASE,
    });
    expect(status).toBe(404);
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(html).not.toContain('rel="canonical"');
  });

  it.each(['/me', '/me/notes', '/studio', '/admin/users', '/attempts/a1', '/learn/intro-ml/l1'])(
    'serves %s as a noindex shell without fetching data',
    async (path) => {
      const fetchMock = mockApi({});
      const { status, html } = await renderPage(path, { template: TEMPLATE, baseUrl: BASE });
      expect(status).toBe(200);
      expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
      expect(html).toContain('<div id="root"></div>');
      expect(html).not.toContain('rel="canonical"');
      expect(html).not.toContain('__MASTEMY_SSR__');
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it('keeps "$" patterns in course text intact (no String.replace expansion)', async () => {
    const tricky = "Costs $' and $& and $` explained";
    mockApi({
      '/api/courses/intro-ml': () => json({ ...course, title: tricky, description: "Body $' $&" }),
      '/api/courses/c1/reviews': () => json([]),
    });
    const { status, html } = await renderPage('/courses/intro-ml', {
      template: TEMPLATE,
      baseUrl: BASE,
    });
    expect(status).toBe(200);
    // Exactly one document skeleton: nothing of the template was spliced back in.
    expect(html.match(/<\/head>/g)).toHaveLength(1);
    expect(html.match(/<div id="root">/g)).toHaveLength(1);
    expect(html.match(/<!doctype html>/gi)).toHaveLength(1);
    expect(html).toContain('Costs $&#39; and $&amp; and $` explained · Mastemy</title>');
    expect(html).toMatch(/<div id="root">.*Costs \$(&#x27;|&#39;) and \$&amp; and \$` explained/s);
  });
});

describe('ssrCacheKey', () => {
  it('keeps only rendering parameters in a fixed order', () => {
    expect(ssrCacheKey('/courses', '?utm_source=x&page=2&q=ml&fbclid=1')).toBe(
      '/courses?q=ml&page=2',
    );
    expect(ssrCacheKey('/courses', '?page=2&q=ml')).toBe(ssrCacheKey('/courses', '?q=ml&page=2'));
    expect(ssrCacheKey('/courses/x', '?lang=ar&junk=1')).toBe('/courses/x?lang=ar');
    expect(ssrCacheKey('/', '?a=1&b=2&q=')).toBe('/');
    expect(ssrCacheKey('/courses', '?sort=newest&category=tech&level=Beginner&language=en')).toBe(
      '/courses?sort=newest&category=tech&level=Beginner&language=en',
    );
  });
});
