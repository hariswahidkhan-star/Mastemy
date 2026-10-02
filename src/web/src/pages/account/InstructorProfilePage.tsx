import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { accountApi, accountKeys, orNull } from '../../api/account';
import { CourseCard } from '../../components/CourseCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

/**
 * Public instructor page: merges the taxonomy directory entry (`/api/instructors/{id}`: live courses,
 * ratings) with the account profile (`/api/instructors/{id}/profile`: headline, bio, links). Either may be
 * missing (no live course yet / profile not published); both missing means not found.
 */
export function InstructorProfilePage() {
  const { id = '' } = useParams();
  const { t, fmtNumber } = useI18n();
  const q = useQuery({
    queryKey: accountKeys.instructor(id),
    queryFn: async () => {
      const [directory, profile] = await Promise.all([
        orNull(accountApi.instructorDirectory(id)),
        orNull(accountApi.instructorProfile(id)),
      ]);
      return { directory, profile };
    },
    enabled: !!id,
  });
  const name = q.data?.profile?.displayName ?? q.data?.directory?.displayName;
  usePageMeta(name ?? t('account.instructor.title'), q.data?.profile?.headline || undefined);

  return (
    <div className="container page">
      <QueryState query={q}>
        {({ directory, profile }) => {
          if (!directory && !profile)
            return (
              <EmptyState
                title={t('account.instructor.notFound')}
                description={t('account.instructor.notFoundBody')}
                action={{ label: t('nav.courses'), to: '/courses' }}
              />
            );
          const initials =
            profile?.initials ??
            (name ?? '')
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((p) => p[0]?.toUpperCase())
              .join('');
          return (
            <article className="stack">
              <header className="row" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <span
                  aria-hidden="true"
                  style={{
                    inlineSize: 72,
                    blockSize: 72,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    background: 'var(--color-accent-soft, var(--color-surface-2, #e8eefc))',
                  }}
                >
                  {initials}
                </span>
                <div>
                  <h1 className="page-title">{name}</h1>
                  {profile?.headline ? <p className="page-subtitle">{profile.headline}</p> : null}
                  {directory ? (
                    <p className="small muted" style={{ margin: 0 }}>
                      {t('account.instructor.liveCourses', { n: directory.liveCourseCount })}
                      {directory.ratingAverage != null && directory.ratingCount > 0
                        ? ` · ${t('account.instructor.rating', {
                            avg: fmtNumber(Math.round(directory.ratingAverage * 10) / 10),
                            n: directory.ratingCount,
                          })}`
                        : ''}
                    </p>
                  ) : null}
                </div>
              </header>
              {profile?.bio ? (
                <section className="section">
                  <h2 className="section__title">{t('account.instructor.about')}</h2>
                  <p className="pre-wrap">{profile.bio}</p>
                </section>
              ) : null}
              {profile && profile.links.length > 0 ? (
                <section className="section">
                  <h2 className="section__title">{t('account.instructor.links')}</h2>
                  <ul>
                    {profile.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer nofollow ugc">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              <section className="section">
                <h2 className="section__title">{t('account.instructor.courses')}</h2>
                {directory && directory.courses.length > 0 ? (
                  <div className="grid">
                    {directory.courses.map((c) => (
                      <CourseCard key={c.id} course={c} />
                    ))}
                  </div>
                ) : (
                  <p className="muted">{t('account.instructor.noCourses')}</p>
                )}
              </section>
            </article>
          );
        }}
      </QueryState>
    </div>
  );
}
