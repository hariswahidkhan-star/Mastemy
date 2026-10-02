import { matchPath } from 'react-router';
import type { QueryClient } from '@tanstack/react-query';
import { accountKeys } from '../api/account';
import type { InstructorDirectoryProfileDto, PublicInstructorProfileDto } from '../api/account';
import type { Lang } from '../i18n/I18nProvider';
import { SITE } from '../lib/seo';
import { localizedUrl } from './head';

/** Public routes added by the final wave B area (server-rendered and indexed). */
export const FINALB_PUBLIC_ROUTES = ['/instructors/:id'] as const;

interface InstructorPageData {
  directory: InstructorDirectoryProfileDto | null;
  profile: PublicInstructorProfileDto | null;
}

function instructorData(qc: QueryClient, pathname: string): InstructorPageData | undefined | null {
  const m = matchPath('/instructors/:id', pathname);
  if (!m?.params.id) return null;
  return qc.getQueryData<InstructorPageData>(accountKeys.instructor(m.params.id));
}

/** An instructor page with neither a directory entry nor a published profile is a 404. */
export function finalbNotFound(qc: QueryClient, pathname: string): boolean {
  const d = instructorData(qc, pathname);
  return d !== null && d !== undefined && !d.directory && !d.profile;
}

/**
 * ProfilePage + Person JSON-LD built only from what the API returned: name, the instructor's own headline
 * and bio (present only when they published their profile), their own https links and their live courses.
 * No rating markup is emitted for a person.
 */
export function finalbJsonLd(
  qc: QueryClient,
  pathname: string,
  baseUrl: string,
  lang: Lang,
): unknown[] {
  const d = instructorData(qc, pathname);
  if (!d || (!d.directory && !d.profile)) return [];
  const name = d.profile?.displayName ?? d.directory?.displayName ?? '';
  const url = localizedUrl(baseUrl, pathname, lang);
  const person: Record<string, unknown> = { '@type': 'Person', name, url };
  if (d.profile?.headline) person.description = d.profile.headline;
  const sameAs = (d.profile?.links ?? []).map((l) => l.url).filter((u) => /^https:\/\//.test(u));
  if (sameAs.length) person.sameAs = sameAs;
  const courses = d.directory?.courses ?? [];
  if (courses.length)
    person.subjectOf = courses.map((c) => ({
      '@type': 'Course',
      name: c.title,
      url: `${baseUrl}/courses/${encodeURIComponent(c.slug)}`,
      provider: { '@type': 'Organization', name: SITE, url: baseUrl },
    }));
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url,
      name,
      ...(d.profile?.bio ? { description: d.profile.bio.slice(0, 300) } : {}),
      mainEntity: person,
    },
  ];
}
