import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, downloadFile } from '../../api/client';
import { keys, useDashboard } from '../../api/hooks';
import type { LearnerNoteDto } from '../../api/types';
import { ButtonLink, Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input } from '../../components/ui/Field';
import { Badge, PageHeader, QueryState, StatusBadge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { formatTimestamp } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';

export function DashboardPage() {
  const { t, fmtDate } = useI18n();
  const dash = useDashboard();
  usePageMeta(t('dashboard.title'), undefined, { noindex: true });
  return (
    <div className="container page">
      <PageHeader
        title={t('dashboard.title')}
        actions={
          <ButtonLink to="/me/notes" variant="secondary">
            {t('dashboard.myNotes')}
          </ButtonLink>
        }
      />
      <QueryState query={dash}>
        {(d) => (
          <div className="stack">
            <section className="card">
              <h2>{t('dashboard.continue')}</h2>
              {d.enrollments.length === 0 ? (
                <EmptyState
                  title={t('dashboard.noEnrollments')}
                  description={t('dashboard.noEnrollmentsBody')}
                  action={{ label: t('courses.title'), to: '/courses' }}
                />
              ) : (
                <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                  {d.enrollments.map((e) => (
                    <li key={e.course.id} className="row row--between">
                      <div style={{ flex: 1, minInlineSize: 200 }}>
                        <Link to={`/courses/${e.course.slug}`}>
                          <strong>{e.course.title}</strong>
                        </Link>
                        <div
                          className="meter"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(e.progressPercent)}
                          aria-label={t('dashboard.progress', { title: e.course.title })}
                          style={{ marginBlockStart: 'var(--space-2)' }}
                        >
                          <span style={{ inlineSize: `${Math.min(100, e.progressPercent)}%` }} />
                        </div>
                        <span className="small muted">
                          {t('dashboard.percent', { n: Math.round(e.progressPercent) })}
                        </span>
                      </div>
                      <ButtonLink
                        size="sm"
                        to={`/learn/${e.course.slug}${e.lastLessonId ? `/${e.lastLessonId}` : ''}`}
                      >
                        {e.lastLessonId ? t('dashboard.resume') : t('course.startWatching')}
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <div className="grid-2">
              <section className="card">
                <h2>{t('dashboard.entitlements')}</h2>
                <p className="small muted">{t('dashboard.entitlementsNote')}</p>
                {d.entitlements.length === 0 ? (
                  <p className="muted">{t('dashboard.noEntitlements')}</p>
                ) : (
                  <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                    {d.entitlements.map((en) => (
                      <li key={en.id}>
                        <strong>
                          {en.packageTitle ?? en.courseTitle ?? t('dashboard.package')}
                        </strong>{' '}
                        <Badge tone={en.source === 'Purchase' ? 'accent' : 'neutral'}>
                          {t(`entitlement.${en.source}`)}
                        </Badge>
                        <div className="small muted">
                          {en.courseSlug ? (
                            <Link to={`/courses/${en.courseSlug}`}>{en.courseTitle}</Link>
                          ) : null}{' '}
                          {en.endsAt
                            ? t('dashboard.until', { date: fmtDate(en.endsAt) })
                            : t('dashboard.noExpiry')}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <h3 style={{ marginBlockStart: 'var(--space-4)' }}>
                  {t('dashboard.freeEnrollments')}
                </h3>
                <p className="small">
                  {t('dashboard.freeEnrollmentsBody', { n: d.enrollments.length })}
                </p>
              </section>
              <section className="card">
                <h2>{t('dashboard.certificates')}</h2>
                {d.certificates.length === 0 ? (
                  <p className="muted">{t('dashboard.noCertificates')}</p>
                ) : (
                  <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                    {d.certificates.map((c) => (
                      <li key={c.code}>
                        <strong>{c.courseTitle}</strong> <StatusBadge status={c.status} />
                        <div className="small">
                          <Link to={`/verify/${encodeURIComponent(c.code)}`}>{c.code}</Link> ·{' '}
                          {fmtDate(c.issuedAt)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
            <section className="card">
              <h2>{t('dashboard.attempts')}</h2>
              {d.recentAttempts.length === 0 ? (
                <p className="muted">{t('dashboard.noAttempts')}</p>
              ) : (
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">{t('dashboard.assessment')}</th>
                        <th scope="col">{t('dashboard.status')}</th>
                        <th scope="col">{t('result.score')}</th>
                        <th scope="col">{t('dashboard.date')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.recentAttempts.map((a) => (
                        <tr key={a.id}>
                          <td>
                            <Link to={`/attempts/${a.id}`}>
                              {a.assessmentTitle ?? t('attempt.title')}
                            </Link>
                          </td>
                          <td>
                            <StatusBadge status={a.status} />{' '}
                            {a.passed === true ? (
                              <Badge tone="success">{t('result.passed')}</Badge>
                            ) : null}
                          </td>
                          <td>{a.scorePercent != null ? `${Math.round(a.scorePercent)}%` : '—'}</td>
                          <td>{fmtDate(a.submittedAt ?? a.startedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </QueryState>
    </div>
  );
}

export function MyNotesPage() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const [exporting, setExporting] = useState(false);
  usePageMeta(t('notes.pageTitle'), undefined, { noindex: true });
  const notes = useQuery({
    queryKey: keys.notes({ q: search }),
    queryFn: () =>
      api<LearnerNoteDto[] | { items: LearnerNoteDto[] }>(
        `/api/me/notes${search ? `?q=${encodeURIComponent(search)}` : ''}`,
      ),
    select: (d) => (Array.isArray(d) ? d : d.items),
  });
  return (
    <div className="container page">
      <PageHeader
        title={t('notes.pageTitle')}
        subtitle={t('notes.pageSubtitle')}
        actions={
          <Button
            variant="secondary"
            loading={exporting}
            onClick={() => {
              setExporting(true);
              downloadFile('/api/me/notes/export', 'mastemy-notes.md')
                .catch((e) => toast.error(errorMessage(e, t)))
                .finally(() => setExporting(false));
            }}
          >
            {t('notes.export')}
          </Button>
        }
      />
      <form
        role="search"
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(q.trim());
        }}
      >
        <Field label={t('notes.search')} className="grow">
          <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} />
        </Field>
        <Button type="submit">{t('courses.searchButton')}</Button>
      </form>
      <QueryState query={notes}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={search ? t('notes.noMatches') : t('notes.empty')} />
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {list.map((n) => (
                <li key={n.id} className="note-item">
                  {n.timestampSeconds !== null && n.courseSlug ? (
                    <Link
                      className="ts-button"
                      to={`/learn/${n.courseSlug}/${n.lessonId}?t=${n.timestampSeconds}`}
                    >
                      {formatTimestamp(n.timestampSeconds)}
                    </Link>
                  ) : null}
                  <div className="note-item__body">
                    {n.lessonTitle ? <div className="small muted">{n.lessonTitle}</div> : null}
                    {n.body}
                    <div className="small muted">
                      {n.tags
                        ? `#${n.tags
                            .split(',')
                            .map((x) => x.trim())
                            .join(' #')} · `
                        : ''}
                      {fmtDate(n.updatedAt)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}
