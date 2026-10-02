import { matchPath } from 'react-router';
import type { QueryClient } from '@tanstack/react-query';
import { ApiError } from '../api/client';
import { dkeys, loc } from '../api/discover';
import type { CollectionDto, PathwayDetailDto, PublicCertificationDto } from '../api/discover';
import type { CourseCardDto } from '../api/types';
import type { Lang } from '../i18n/I18nProvider';
import { findArticle } from '../lib/articles';
import { SITE } from '../lib/seo';
import { localizedUrl } from './head';

/** Public discovery routes rendered (and indexed) by the SSR server. */
export const DISCOVER_PUBLIC_ROUTES = [
  '/categories',
  '/academies/:slug',
  '/certifications',
  '/certifications/:slug',
  '/pathways',
  '/pathways/:slug',
  '/collections/:slug',
  '/instructors',
  '/packages',
  '/practice',
  '/notes-library',
  '/business',
  '/bestseller-rule',
  '/articles',
  '/articles/:slug',
] as const;

/** Extra query parameters that change what a discovery page renders (SSR cache key). */
export const DISCOVER_CACHE_PARAMS = [
  'instructor',
  'duration',
  'updatedWithinDays',
  'minPrice',
  'maxPrice',
  'minRating',
  'skill',
  'certification',
  'kind',
] as const;

/** True when a discovery detail page has no such entity (server 404, or an unknown article slug). */
export function discoverNotFound(qc: QueryClient, pathname: string): boolean {
  const article = matchPath('/articles/:slug', pathname);
  if (article && !findArticle(article.params.slug ?? '')) return true;
  return qc
    .getQueryCache()
    .getAll()
    .some(
      (q) =>
        q.queryKey[0] === dkeys.certification('')[0] &&
        q.state.error instanceof ApiError &&
        q.state.error.status === 404,
    );
}

function itemList(name: string, url: string, courses: CourseCardDto[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url,
    numberOfItems: courses.length,
    itemListElement: courses.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${baseUrl}/courses/${encodeURIComponent(c.slug)}`,
      name: c.title,
    })),
  };
}

/**
 * JSON-LD for discovery pages, built only from data the API returned or from first-party article files.
 * Certifications are described as a WebPage about the external credential (never as something Mastemy
 * issues), and pathways/collections as ordered lists of real live courses.
 */
export function discoverJsonLd(
  qc: QueryClient,
  pathname: string,
  baseUrl: string,
  lang: Lang,
): unknown[] {
  const url = localizedUrl(baseUrl, pathname, lang);
  const out: unknown[] = [];
  const pw = matchPath('/pathways/:slug', pathname);
  if (pw?.params.slug) {
    const p = qc.getQueryData<PathwayDetailDto>(dkeys.pathway(pw.params.slug));
    if (p) out.push(itemList(loc(lang, p.titleEn, p.titleAr), url, p.courses, baseUrl));
  }
  const col = matchPath('/collections/:slug', pathname);
  if (col?.params.slug) {
    const c = qc.getQueryData<CollectionDto>(dkeys.collection(col.params.slug));
    if (c) out.push(itemList(loc(lang, c.titleEn, c.titleAr), url, c.courses, baseUrl));
  }
  const cert = matchPath('/certifications/:slug', pathname);
  if (cert?.params.slug) {
    const c = qc.getQueryData<PublicCertificationDto>(dkeys.certification(cert.params.slug));
    if (c) {
      out.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: c.title,
        url,
        dateModified: c.lastCheckedAt,
        about: {
          '@type': 'EducationalOccupationalCredential',
          name: c.title,
          recognizedBy: { '@type': 'Organization', name: c.issuerName },
          url: c.officialSourceUrl,
        },
        publisher: { '@type': 'Organization', name: SITE, url: baseUrl },
      });
      if (c.preparationCourses.length)
        out.push(itemList(`${c.title} preparation`, url, c.preparationCourses, baseUrl));
    }
  }
  const art = matchPath('/articles/:slug', pathname);
  if (art?.params.slug) {
    const a = findArticle(art.params.slug);
    if (a)
      out.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: a.title,
        description: a.description,
        inLanguage: 'en',
        url,
        ...(a.published ? { datePublished: a.published } : {}),
        author: { '@type': 'Organization', name: SITE, url: baseUrl },
        publisher: { '@type': 'Organization', name: SITE, url: baseUrl },
      });
  }
  return out;
}
