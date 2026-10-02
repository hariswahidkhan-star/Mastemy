import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { api } from '../../api/client';
import { useCompare, useRecentlyViewed, useRelated, useWishlist } from '../../api/wave2';
import type { CompareCourseDto } from '../../api/wave2';
import { useAuth } from '../../auth/AuthProvider';
import { LiteCourseCard } from '../../components/Discovery';
import { Duration } from '../../components/Duration';
import { ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { PageHeader, QueryState } from '../../components/ui/misc';
import { Spinner } from '../../components/ui/Spinner';
import { useI18n } from '../../i18n/I18nProvider';
import { COMPARE_MAX, COMPARE_MIN, useCompareTray } from '../../lib/compare';
import { splitLines } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';

export function parseCompareIds(raw: string | null): string[] {
  const ids = (raw ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return Array.from(new Set(ids));
}

function CompareTable({ courses }: { courses: CompareCourseDto[] }) {
  const { t, fmtNumber, fmtMoney, fmtDate } = useI18n();
  const tray = useCompareTray();
  const rows: { label: string; cell: (c: CompareCourseDto) => ReactNode }[] = [
    { label: t('courses.level'), cell: (c) => t(`level.${c.level}`) },
    { label: t('course.language'), cell: (c) => t(`language.${c.language}`) },
    { label: t('compare.lessons'), cell: (c) => fmtNumber(c.lessonCount) },
    { label: t('course.videos'), cell: (c) => fmtNumber(c.readyVideoCount) },
    { label: t('course.mcqs'), cell: (c) => fmtNumber(c.activeQuestionCount) },
    { label: t('course.duration'), cell: (c) => <Duration seconds={c.totalDurationSeconds} /> },
    {
      label: t('compare.rating'),
      cell: (c) =>
        c.ratingCount > 0 && c.ratingAverage != null
          ? t('course.rating', { avg: c.ratingAverage.toFixed(1), n: fmtNumber(c.ratingCount) })
          : t('compare.noRatings'),
    },
    {
      label: t('course.reviewed'),
      cell: (c) => (c.reviewedAt ? fmtDate(c.reviewedAt) : t('course.notReviewed')),
    },
    {
      label: t('course.credential'),
      cell: (c) => c.credentialType || t('course.defaultCredential'),
    },
    {
      label: t('course.packages'),
      cell: (c) =>
        c.packages.length === 0 ? (
          <span className="muted">{t('course.noPackages')}</span>
        ) : (
          <ul className="compare-packages">
            {c.packages.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong> · {fmtMoney(p.price, p.currency)} ·{' '}
                {t('course.accessTerm', { days: p.accessDays })}
                <ul className="small">
                  {splitLines(p.contents).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ),
    },
  ];
  return (
    <div className="table-wrap">
      <table className="table compare-table">
        <caption className="visually-hidden">{t('compare.title')}</caption>
        <thead>
          <tr>
            <th scope="col">{t('compare.attribute')}</th>
            {courses.map((c) => (
              <th scope="col" key={c.id}>
                <Link to={`/courses/${c.slug}`}>{c.title}</Link>
                {tray.has(c.id) ? (
                  <div>
                    <button
                      type="button"
                      className="ts-button small"
                      onClick={() => tray.remove(c.id)}
                      aria-label={t('compare.removeNamed', { title: c.title })}
                    >
                      {t('common.remove')}
                    </button>
                  </div>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {courses.map((c) => (
                <td key={c.id}>{r.cell(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComparePage() {
  const { t } = useI18n();
  const [params] = useSearchParams();
  const tray = useCompareTray();
  const fromUrl = parseCompareIds(params.get('ids'));
  const ids = fromUrl.length > 0 ? fromUrl : tray.items.map((c) => c.id);
  const valid = ids.length >= COMPARE_MIN && ids.length <= COMPARE_MAX;
  const query = useCompare(valid ? ids : []);
  usePageMeta(t('compare.title'), undefined, { noindex: true });
  return (
    <div className="container page">
      <PageHeader title={t('compare.title')} subtitle={t('compare.subtitle')} />
      {!valid ? (
        <EmptyState
          title={t('compare.needTitle')}
          description={t('compare.needBody', { min: COMPARE_MIN, max: COMPARE_MAX })}
          action={{ label: t('courses.title'), to: '/courses' }}
        />
      ) : query.isPending ? (
        <Spinner label={t('common.loading')} block />
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => void query.refetch()} />
      ) : (
        <CompareTable courses={query.data} />
      )}
    </div>
  );
}

export function WishlistPage() {
  const { t, fmtDate } = useI18n();
  const wishlist = useWishlist();
  usePageMeta(t('wishlist.title'), undefined, { noindex: true });
  return (
    <div className="container page">
      <PageHeader title={t('wishlist.title')} subtitle={t('wishlist.subtitle')} />
      <QueryState query={wishlist}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState
              title={t('wishlist.empty')}
              description={t('wishlist.emptyBody')}
              action={{ label: t('courses.title'), to: '/courses' }}
            />
          ) : (
            <div className="grid">
              {list.map((w) => (
                <LiteCourseCard
                  key={w.course.id}
                  course={w.course}
                  extra={t('wishlist.addedOn', { date: fmtDate(w.addedAt) })}
                />
              ))}
            </div>
          )
        }
      </QueryState>
    </div>
  );
}

function RecentRail() {
  const { t } = useI18n();
  const recent = useRecentlyViewed();
  if (recent.isPending || recent.isError || recent.data.length === 0) return null;
  return (
    <section className="section" aria-labelledby="recent-h">
      <div className="section__head">
        <h2 className="section__title" id="recent-h">
          {t('discovery.recent')}
        </h2>
        <ButtonLink to="/me/wishlist" variant="ghost" size="sm">
          {t('wishlist.title')}
        </ButtonLink>
      </div>
      <div className="rail">
        {recent.data.slice(0, 8).map((r) => (
          <LiteCourseCard key={r.course.id} course={r.course} />
        ))}
      </div>
    </section>
  );
}

/** Home page rail; nothing is rendered (or fetched) for visitors or on the server. */
export function RecentlyViewedRail() {
  const { user } = useAuth();
  return user ? <RecentRail /> : null;
}

/** Records the course view for signed-in users (best effort, once per course per mount). */
export function useTrackCourseView(courseId: string | undefined) {
  const { user } = useAuth();
  const sent = useRef<string | null>(null);
  useEffect(() => {
    if (!user || !courseId || sent.current === courseId) return;
    sent.current = courseId;
    api(`/api/me/recently-viewed/${courseId}`, { method: 'POST' }).catch(() => undefined);
  }, [user, courseId]);
}

export function RelatedCourses({ courseId }: { courseId: string }) {
  const { t } = useI18n();
  const related = useRelated(courseId);
  return (
    <section className="section" aria-labelledby="related-h">
      <h2 className="section__title" id="related-h">
        {t('discovery.related')}
      </h2>
      <QueryState query={related}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('discovery.noRelated')}</p>
          ) : (
            <div className="grid">
              {list.map((c) => (
                <LiteCourseCard key={c.id} course={c} />
              ))}
            </div>
          )
        }
      </QueryState>
    </section>
  );
}
