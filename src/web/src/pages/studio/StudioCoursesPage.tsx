import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { useStudioCourses } from '../../api/hooks';
import type { EarningsDto } from '../../api/types';
import { ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader, QueryState, StatusBadge } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

export function StudioCoursesPage() {
  const { t, fmtDate } = useI18n();
  const courses = useStudioCourses();
  usePageMeta(t('studio.courses'), undefined, { noindex: true });
  return (
    <>
      <PageHeader
        title={t('studio.courses')}
        subtitle={t('studio.coursesSubtitle')}
        actions={<ButtonLink to="/studio/new">{t('studio.newCourse')}</ButtonLink>}
      />
      <QueryState query={courses}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState
              title={t('studio.noCourses')}
              description={t('studio.noCoursesBody')}
              action={{ label: t('studio.newCourse'), to: '/studio/new' }}
            />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('studio.courseTitle')}</th>
                    <th scope="col">{t('dashboard.status')}</th>
                    <th scope="col">{t('studio.modules')}</th>
                    <th scope="col">{t('studio.updated')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <Link to={`/studio/courses/${c.id}`}>{c.title}</Link>
                      </td>
                      <td>
                        <StatusBadge status={c.status} />
                      </td>
                      <td>{c.modules?.length ?? 0}</td>
                      <td>{fmtDate(c.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
    </>
  );
}

export function EarningsPage() {
  const { t, fmtDate, fmtMoney } = useI18n();
  usePageMeta(t('studio.earnings'), undefined, { noindex: true });
  const earnings = useQuery({
    queryKey: ['studio', 'earnings'],
    queryFn: () => api<EarningsDto>('/api/studio/earnings'),
  });
  return (
    <>
      <PageHeader title={t('studio.earnings')} subtitle={t('studio.earningsSubtitle')} />
      <QueryState query={earnings}>
        {(e) => {
          // The API returns one total per currency: { currency, instructorAmount, grossSales, entries }.
          const totals = Array.isArray(e.totals) ? e.totals : [];
          return (
            <div className="stack">
              {totals.map((tot) => (
                <dl key={tot.currency} className="facts">
                  <div>
                    <dt>{t('earnings.gross')}</dt>
                    <dd>{fmtMoney(tot.grossSales, tot.currency)}</dd>
                  </div>
                  <div>
                    <dt>{t('earnings.instructor')}</dt>
                    <dd>{fmtMoney(tot.instructorAmount, tot.currency)}</dd>
                  </div>
                </dl>
              ))}
              {e.entries.length === 0 ? (
                <EmptyState title={t('earnings.none')} description={t('earnings.noneBody')} />
              ) : (
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">{t('dashboard.date')}</th>
                        <th scope="col">{t('studio.courseTitle')}</th>
                        <th scope="col">{t('earnings.kind')}</th>
                        <th scope="col">{t('earnings.gross')}</th>
                        <th scope="col">{t('earnings.instructor')}</th>
                        <th scope="col">{t('earnings.platform')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {e.entries.map((x) => (
                        <tr key={x.id}>
                          <td>{fmtDate(x.createdAt)}</td>
                          <td>{x.courseTitle ?? x.courseId}</td>
                          <td>{t(`earnings.kind_${x.kind}`)}</td>
                          <td>{fmtMoney(x.grossAmount, x.currency)}</td>
                          <td>{fmtMoney(x.instructorAmount, x.currency)}</td>
                          <td>{fmtMoney(x.platformAmount, x.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        }}
      </QueryState>
    </>
  );
}
