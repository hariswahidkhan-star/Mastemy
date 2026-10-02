import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';
import { wsKeys } from '../../api/workspace';
import type {
  AdminDashboardDto,
  CourseAnalyticsDto,
  CurrencyBucketDto,
  LedgerTotalDto,
  QuestionStatDto,
} from '../../api/workspace';
import type { StudioCourseDto } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Field, Select } from '../../components/ui/Field';
import { PageHeader, QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { ColumnChart, DataTable, MeterList, StatTile } from './Charts';
import { WsError } from './common';

// ---------- helpers ----------
const RANGES = [
  { days: 30, bucket: 'day' },
  { days: 90, bucket: 'week' },
  { days: 365, bucket: 'month' },
] as const;

function rangeQuery(days: number, bucket: string): string {
  const to = new Date();
  const from = new Date(to.getTime() - days * 86_400_000);
  return `from=${from.toISOString().slice(0, 10)}&to=${to.toISOString().slice(0, 10)}&bucket=${bucket}`;
}

function RangePicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const { t } = useI18n();
  return (
    <Field label={t('workspace.analytics.range')}>
      <Select
        value={String(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        options={RANGES.map((r) => ({
          value: String(r.days),
          label: t('workspace.analytics.lastDays', { n: r.days }),
        }))}
      />
    </Field>
  );
}

function pct(n: number | null | undefined, fmt: (n: number) => string): string {
  return n == null ? '—' : `${fmt(Math.round(n * 10) / 10)}%`;
}

/** One chart per currency (never mix currencies on one axis). */
function RevenueCharts({ rows, title }: { rows: CurrencyBucketDto[]; title: string }) {
  const { fmtMoney } = useI18n();
  const currencies = [...new Set(rows.map((r) => r.currency))];
  return (
    <>
      {currencies.map((c) => (
        <ColumnChart
          key={c}
          title={`${title} (${c})`}
          format={(n) => fmtMoney(n, c)}
          points={rows
            .filter((r) => r.currency === c)
            .map((r) => ({ label: r.bucket, value: r.amount }))}
        />
      ))}
    </>
  );
}

function LedgerTable({ rows, caption }: { rows: LedgerTotalDto[]; caption: string }) {
  const { t, fmtMoney, fmtNumber } = useI18n();
  if (rows.length === 0) return <p className="muted small">{t('workspace.charts.noData')}</p>;
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{t('workspace.analytics.kind')}</th>
            <th scope="col">{t('workspace.analytics.gross')}</th>
            <th scope="col">{t('workspace.analytics.instructor')}</th>
            <th scope="col">{t('workspace.analytics.platform')}</th>
            <th scope="col">{t('workspace.analytics.entries')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.currency}-${r.kind}`}>
              <td>{r.kind}</td>
              <td>{fmtMoney(r.gross, r.currency)}</td>
              <td>{fmtMoney(r.instructorAmount, r.currency)}</td>
              <td>{fmtMoney(r.platformAmount, r.currency)}</td>
              <td>{fmtNumber(r.entries)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- instructor course analytics ----------
export function CourseAnalyticsPanel({ course }: { course: StudioCourseDto }) {
  const { t, fmtNumber } = useI18n();
  const [days, setDays] = useState(30);
  const range = RANGES.find((r) => r.days === days) ?? RANGES[0];
  const q = rangeQuery(range.days, range.bucket);
  const data = useQuery({
    queryKey: wsKeys.courseAnalytics(course.id, q),
    queryFn: () => api<CourseAnalyticsDto>(`/api/studio/courses/${course.id}/analytics?${q}`),
    retry: false,
  });
  if (data.isError)
    return data.error instanceof ApiError && data.error.status === 403 ? (
      <WsError error={data.error} />
    ) : (
      <QueryState query={data}>{() => null}</QueryState>
    );
  return (
    <div className="stack">
      <RangePicker value={days} onChange={setDays} />
      <QueryState query={data}>
        {(a) => (
          <div className="stack">
            <div className="ws-stats">
              <StatTile
                label={t('workspace.analytics.enrollments')}
                value={fmtNumber(a.enrollmentsInRange)}
                hint={t('workspace.analytics.total', { n: fmtNumber(a.totalEnrollments) })}
              />
              <StatTile
                label={t('workspace.analytics.active')}
                value={fmtNumber(a.activeLearnersInRange)}
              />
              <StatTile
                label={t('workspace.analytics.avgProgress')}
                value={pct(a.averageProgressPercent, fmtNumber)}
              />
              <StatTile
                label={t('workspace.analytics.refundRate')}
                value={pct(a.refunds.refundRatePercent, fmtNumber)}
                hint={t('workspace.analytics.refundCounts', {
                  refunded: fmtNumber(a.refunds.refundedOrders),
                  paid: fmtNumber(a.refunds.paidOrders),
                })}
              />
            </div>
            <ColumnChart
              title={t('workspace.analytics.enrollmentsOverTime')}
              points={a.enrollmentsOverTime.map((p) => ({ label: p.bucket, value: p.value }))}
            />
            <ColumnChart
              title={t('workspace.analytics.activeOverTime')}
              points={a.activeLearnersOverTime.map((p) => ({ label: p.bucket, value: p.value }))}
            />
            <MeterList
              title={t('workspace.analytics.funnel')}
              rows={a.completionFunnel.map((f) => ({
                key: f.lessonId,
                label: `${f.moduleTitle} › ${f.lessonTitle}`,
                value: f.completed,
                max: Math.max(f.started, f.completed),
                text: t('workspace.analytics.funnelRow', {
                  started: fmtNumber(f.started),
                  completed: fmtNumber(f.completed),
                }),
              }))}
            />
            <section>
              <h3>{t('workspace.analytics.conversion')}</h3>
              <div className="ws-stats">
                <StatTile
                  label={t('workspace.analytics.views')}
                  value={fmtNumber(a.conversion.courseViewVisitors)}
                />
                <StatTile
                  label={t('workspace.analytics.viewToEnroll')}
                  value={pct(a.conversion.viewToEnrollPercent, fmtNumber)}
                />
                <StatTile
                  label={t('workspace.analytics.purchases')}
                  value={fmtNumber(a.conversion.purchases)}
                />
                <StatTile
                  label={t('workspace.analytics.enrollToPurchase')}
                  value={pct(a.conversion.enrollToPurchasePercent, fmtNumber)}
                />
              </div>
              {a.conversion.note ? <p className="small muted">{a.conversion.note}</p> : null}
            </section>
            <section>
              <h3>{t('workspace.analytics.assessments')}</h3>
              <DataTable
                caption={t('workspace.analytics.assessments')}
                head={[
                  t('workspace.analytics.assessment'),
                  t('workspace.analytics.attempts'),
                  t('workspace.analytics.passRate'),
                  t('workspace.analytics.avgScore'),
                ]}
                rows={a.assessments.map((s) => [
                  s.title,
                  fmtNumber(s.attempts),
                  pct(s.passRatePercent, fmtNumber),
                  pct(s.averageScorePercent, fmtNumber),
                ])}
              />
              {a.assessments.length === 0 ? (
                <p className="muted small">{t('workspace.charts.noData')}</p>
              ) : null}
            </section>
            <section>
              <h3>{t('workspace.analytics.revenue')}</h3>
              <RevenueCharts
                rows={a.revenueOverTime}
                title={t('workspace.analytics.revenueOverTime')}
              />
              <LedgerTable rows={a.revenue} caption={t('workspace.analytics.revenue')} />
              <h4>{t('workspace.analytics.myEarnings')}</h4>
              <LedgerTable rows={a.myEarnings} caption={t('workspace.analytics.myEarnings')} />
            </section>
            <QuestionStatsTable courseId={course.id} />
          </div>
        )}
      </QueryState>
    </div>
  );
}

function QuestionStatsTable({ courseId }: { courseId: string }) {
  const { t, fmtNumber } = useI18n();
  const stats = useQuery({
    queryKey: wsKeys.questionStats(courseId),
    queryFn: () => api<QuestionStatDto[]>(`/api/studio/courses/${courseId}/analytics/questions`),
  });
  const [sortHard, setSortHard] = useState(true);
  return (
    <section>
      <div className="row row--between">
        <h3>{t('workspace.analytics.questionStats')}</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setSortHard((v) => !v)}
          aria-pressed={sortHard}
        >
          {t('workspace.analytics.hardestFirst')}
        </Button>
      </div>
      <QueryState query={stats}>
        {(rows) => {
          if (rows.length === 0)
            return <p className="muted small">{t('workspace.charts.noData')}</p>;
          const sorted = sortHard
            ? [...rows].sort((x, y) => (x.fullCreditPercent ?? 101) - (y.fullCreditPercent ?? 101))
            : rows;
          return (
            <div className="table-wrap">
              <table className="table">
                <caption className="visually-hidden">
                  {t('workspace.analytics.questionStats')}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">{t('workspace.analytics.question')}</th>
                    <th scope="col">{t('workspace.analytics.answered')}</th>
                    <th scope="col">{t('workspace.analytics.fullCredit')}</th>
                    <th scope="col">{t('workspace.analytics.avgPoints')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((r) => (
                    <tr key={r.questionId}>
                      <td className="mono">{r.externalId}</td>
                      <td>{fmtNumber(r.answered)}</td>
                      <td>{pct(r.fullCreditPercent, fmtNumber)}</td>
                      <td>
                        {r.averagePoints == null
                          ? '—'
                          : fmtNumber(Math.round(r.averagePoints * 100) / 100)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }}
      </QueryState>
    </section>
  );
}

// ---------- admin platform dashboard ----------
export function AdminDashboardPage() {
  const { t, fmtNumber, fmtMoney, fmtDate } = useI18n();
  usePageMeta(t('workspace.dashboard.title'), undefined, { noindex: true });
  const [days, setDays] = useState(30);
  const range = RANGES.find((r) => r.days === days) ?? RANGES[0];
  const q = rangeQuery(range.days, range.bucket);
  const data = useQuery({
    queryKey: wsKeys.adminDashboard(q),
    queryFn: () => api<AdminDashboardDto>(`/api/admin/analytics/dashboard?${q}`),
  });
  return (
    <>
      <PageHeader title={t('workspace.dashboard.title')} />
      <RangePicker value={days} onChange={setDays} />
      <QueryState query={data}>
        {(d) => (
          <div className="stack">
            <div className="ws-stats" data-testid="admin-stats">
              <StatTile label={t('workspace.dashboard.users')} value={fmtNumber(d.totalUsers)} />
              <StatTile
                label={t('workspace.dashboard.signups')}
                value={fmtNumber(d.newSignupsInRange)}
              />
              <StatTile
                label={t('workspace.dashboard.active')}
                value={fmtNumber(d.activeLearnersInRange)}
              />
              <StatTile
                label={t('workspace.dashboard.published')}
                value={fmtNumber(d.publishedCourses)}
              />
              <StatTile
                label={t('workspace.dashboard.pendingRefunds')}
                value={fmtNumber(d.pendingRefundRequests)}
              />
              <StatTile
                label={t('workspace.dashboard.aiUsage')}
                value={d.aiUsage == null ? t('workspace.dashboard.notTracked') : String(d.aiUsage)}
              />
            </div>
            <ColumnChart
              title={t('workspace.dashboard.signupsOverTime')}
              points={d.signupsOverTime.map((p) => ({ label: p.bucket, value: p.value }))}
            />
            <ColumnChart
              title={t('workspace.dashboard.activeOverTime')}
              points={d.activeLearnersOverTime.map((p) => ({ label: p.bucket, value: p.value }))}
            />
            <RevenueCharts
              rows={d.revenueOverTime}
              title={t('workspace.analytics.revenueOverTime')}
            />
            <section>
              <h2>{t('workspace.dashboard.orders')}</h2>
              <DataTable
                caption={t('workspace.dashboard.orders')}
                head={[
                  t('workspace.dashboard.currency'),
                  t('workspace.dashboard.count'),
                  t('workspace.dashboard.amount'),
                ]}
                rows={d.ordersByCurrency.map((o) => [
                  o.currency,
                  fmtNumber(o.count),
                  fmtMoney(o.amount, o.currency),
                ])}
              />
              <DataTable
                caption={t('workspace.dashboard.refunds')}
                head={[
                  t('workspace.dashboard.currency'),
                  t('workspace.dashboard.count'),
                  t('workspace.dashboard.amount'),
                ]}
                rows={d.refundsByCurrency.map((o) => [
                  o.currency,
                  fmtNumber(o.count),
                  fmtMoney(o.amount, o.currency),
                ])}
              />
            </section>
            <section>
              <h2>{t('workspace.dashboard.queues')}</h2>
              <ul>
                <li>{t('workspace.dashboard.q.courses', { n: d.reviewQueues.coursesInReview })}</li>
                <li>
                  {t('workspace.dashboard.q.qReview', {
                    n: d.reviewQueues.questionsAwaitingReview,
                  })}
                </li>
                <li>
                  {t('workspace.dashboard.q.qApproval', {
                    n: d.reviewQueues.questionsAwaitingApproval,
                  })}
                </li>
                <li>
                  {t('workspace.dashboard.q.applications', {
                    n: d.reviewQueues.instructorApplications,
                  })}
                </li>
                <li>{t('workspace.dashboard.q.refunds', { n: d.reviewQueues.refundRequests })}</li>
                <li>{t('workspace.dashboard.q.uploads', { n: d.reviewQueues.uploadApprovals })}</li>
              </ul>
            </section>
            <section>
              <h2>{t('workspace.dashboard.repair', { n: d.videosNeedingRepair })}</h2>
              {d.videosNeedingRepairSample.length === 0 ? (
                <p className="muted">{t('workspace.charts.noData')}</p>
              ) : (
                <ul>
                  {d.videosNeedingRepairSample.map((v) => (
                    <li key={v.id}>
                      {v.title} <span className="mono small">{v.youTubeVideoId}</span> · {v.status}
                      {v.reason ? ` · ${v.reason}` : ''}
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/admin/operations">{t('workspace.ops.title')}</Link>
            </section>
            <section>
              <h2>
                {t('workspace.dashboard.overdue', {
                  n: d.overdueContentUpdates,
                  months: d.contentReviewMonths,
                })}
              </h2>
              {d.overdueContentSample.length === 0 ? (
                <p className="muted">{t('workspace.charts.noData')}</p>
              ) : (
                <ul>
                  {d.overdueContentSample.map((c) => (
                    <li key={c.id}>
                      {c.title} ({c.code}) · {fmtDate(c.lastPublishedAt)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </QueryState>
      <p className="small muted">{t('workspace.dashboard.cacheNote')}</p>
    </>
  );
}
