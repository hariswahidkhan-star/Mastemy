import type { CourseDetailDto, InstructorSummary } from '../api/types';
import type { Lang } from '../i18n/I18nProvider';
import { fullTitle, SITE } from '../lib/seo';
import type { PageMeta } from '../lib/seo';

/** Escape text for an HTML attribute or text node. */
export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** JSON safe to embed inside a <script> element (no `</script>` breakout). */
export function scriptJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/** Absolute URL for a path in the given language: English is the bare path, Arabic adds `?lang=ar`. */
export function localizedUrl(baseUrl: string, pathname: string, lang: Lang): string {
  return `${baseUrl}${pathname}${lang === 'ar' ? '?lang=ar' : ''}`;
}

function instructorName(i: InstructorSummary | string): string {
  return typeof i === 'string' ? i : i.displayName;
}

/**
 * schema.org Course built only from fields the API actually returns. `aggregateRating` is emitted only
 * when there are real published reviews; nothing is invented.
 */
export function courseJsonLd(course: CourseDetailDto, url: string, baseUrl: string) {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: (course.subtitle || course.description || course.title).slice(0, 500),
    url,
    inLanguage: course.language,
    educationalLevel: course.level,
    // Video lessons are free YouTube embeds and never gated (spec); paid packages are optional extras.
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: SITE, url: baseUrl },
    hasCourseInstance: [{ '@type': 'CourseInstance', courseMode: 'Online' }],
  };
  if (course.outcomes?.length) ld.teaches = course.outcomes;
  const instructors = (course.instructors ?? []).map(instructorName).filter(Boolean);
  if (instructors.length) ld.creator = instructors.map((name) => ({ '@type': 'Person', name }));
  if (course.updatedAt) ld.dateModified = course.updatedAt;
  if (course.ratingCount > 0 && typeof course.ratingAverage === 'number') {
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Math.round(course.ratingAverage * 10) / 10,
      ratingCount: course.ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return ld;
}

export interface HeadInput {
  meta: PageMeta;
  pathname: string;
  lang: Lang;
  baseUrl: string;
  /** Private or unknown page: always noindex, no canonical/alternates. */
  indexable: boolean;
  jsonLd: unknown[];
}

/** The <head> tags the SSR server injects (title, description, robots, canonical, hreflang, OG, JSON-LD). */
export function buildHead(h: HeadInput): string {
  const title = fullTitle(h.meta.title);
  const noindex = !h.indexable || h.meta.noindex;
  const tag = (s: string) => s.replace(/>$/, ` data-ssr-path="${esc(h.pathname)}">`);
  const out: string[] = [`<title>${esc(title)}</title>`];
  if (h.meta.description)
    out.push(`<meta name="description" content="${esc(h.meta.description)}">`);
  out.push(`<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}">`);
  if (!noindex) {
    const canonical = localizedUrl(h.baseUrl, h.pathname, h.lang);
    out.push(tag(`<link rel="canonical" href="${esc(canonical)}">`));
    for (const [hl, l] of [
      ['en', 'en'],
      ['ar', 'ar'],
      ['x-default', 'en'],
    ] as const) {
      out.push(
        tag(
          `<link rel="alternate" hreflang="${hl}" href="${esc(localizedUrl(h.baseUrl, h.pathname, l))}">`,
        ),
      );
    }
    out.push(tag(`<meta property="og:type" content="website">`));
    out.push(tag(`<meta property="og:site_name" content="${SITE}">`));
    out.push(tag(`<meta property="og:title" content="${esc(title)}">`));
    if (h.meta.description)
      out.push(tag(`<meta property="og:description" content="${esc(h.meta.description)}">`));
    out.push(tag(`<meta property="og:url" content="${esc(canonical)}">`));
    out.push(tag(`<meta property="og:locale" content="${h.lang === 'ar' ? 'ar_AR' : 'en_US'}">`));
    out.push(tag(`<meta name="twitter:card" content="summary">`));
    for (const ld of h.jsonLd) {
      out.push(
        `<script type="application/ld+json" data-ssr-path="${esc(h.pathname)}">${scriptJson(ld)}</script>`,
      );
    }
  }
  return out.join('\n    ');
}
