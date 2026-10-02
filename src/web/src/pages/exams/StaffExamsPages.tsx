import { useState } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, apiUrl, qs } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { examKeys, useTemplates } from '../../api/exams';
import type {
  AccommodationDto,
  AppealDto,
  CertificateFlagDto,
  CertificateTemplateDto,
  CertificateTemplateInput,
  ChallengeDto,
  ChallengeResolution,
  CorrectionDto,
  RegradeDetailDto,
  RegradeDto,
} from '../../api/exams';
import type { RawQuestionDto } from '../../api/questions';
import { toQuestion, toQuestionList } from '../../api/questions';
import type { AdminUserDto, Paged, Role } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { RichContent } from '../../components/RichContent';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { examError } from './examErrors';
import '../../styles/exams.css';

const REVIEW: Role[] = ['Reviewer', 'Admin', 'SuperAdmin'];
const STAFF: Role[] = ['Admin', 'SuperAdmin'];

export const STAFF_EXAM_SECTIONS: { to: string; key: string; roles: Role[] }[] = [
  { to: '/staff/exams/challenges', key: 'challenges', roles: REVIEW },
  { to: '/staff/exams/regrades', key: 'regrades', roles: REVIEW },
  { to: '/staff/exams/flags', key: 'flags', roles: STAFF },
  { to: '/staff/exams/accommodations', key: 'accommodations', roles: STAFF },
  { to: '/staff/exams/templates', key: 'templates', roles: STAFF },
  { to: '/staff/exams/corrections', key: 'corrections', roles: STAFF },
  { to: '/staff/exams/appeals', key: 'appeals', roles: STAFF },
  { to: '/staff/exams/reusable', key: 'reusable', roles: STAFF },
];

export function StaffExamsLayout() {
  const { t } = useI18n();
  const { hasRole } = useAuth();
  return (
    <div className="container side-layout">
      <nav aria-label={t('exams.staff.nav')}>
        <ul className="side-nav">
          {STAFF_EXAM_SECTIONS.filter((s) => hasRole(...s.roles)).map((s) => (
            <li key={s.to}>
              <NavLink to={s.to}>{t(`exams.staff.section.${s.key}`)}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export function StaffExamsIndex() {
  return <Navigate to="/staff/exams/challenges" replace />;
}

function StatusFilter({
  value,
  onChange,
  values,
  prefix,
}: {
  value: string;
  onChange: (v: string) => void;
  values: string[];
  prefix: string;
}) {
  const { t } = useI18n();
  return (
    <Field label={t('exams.common.status')}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('exams.common.all')}
        options={values.map((v) => ({ value: v, label: t(`${prefix}.${v}`) }))}
      />
    </Field>
  );
}

// ---------------- challenges queue ----------------

export function ChallengesQueuePage() {
  const { t, fmtDate } = useI18n();
  usePageMeta(t('exams.staff.section.challenges'), undefined, { noindex: true });
  const toast = useToast();
  const [status, setStatus] = useState('Open');
  const [resolving, setResolving] = useState<ChallengeDto | null>(null);
  const [proposing, setProposing] = useState<ChallengeDto | null>(null);
  const [resolution, setResolution] = useState<ChallengeResolution>('NoChange');
  const [note, setNote] = useState('');
  const list = useQuery({
    queryKey: examKeys.reviewChallenges(status),
    queryFn: () => api<ChallengeDto[]>(`/api/review/question-challenges${qs({ status })}`),
  });
  const resolve = useApiMutation(
    () =>
      api<ChallengeDto>(`/api/review/question-challenges/${resolving?.id}/resolve`, {
        method: 'POST',
        body: { resolution, note: note.trim() },
      }),
    [['exams', 'review-challenges']],
    () => {
      setResolving(null);
      toast.success(t('exams.challenge.resolved'));
    },
  );
  return (
    <div className="stack">
      <PageHeader
        title={t('exams.staff.section.challenges')}
        subtitle={t('exams.challenge.queueIntro')}
      />
      <StatusFilter
        value={status}
        onChange={setStatus}
        values={['Open', 'Resolved']}
        prefix="exams.challenge.status"
      />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              title={t('exams.challenge.none')}
              description={t('exams.challenge.noneBody')}
            />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {items.map((c) => (
                <li key={c.id} className="card stack">
                  <div className="row row--between">
                    <strong className="mono">{c.questionExternalId}</strong>
                    <span className="small muted">{fmtDate(c.createdAt)}</span>
                  </div>
                  <p>{c.reason}</p>
                  {c.status === 'Open' ? (
                    <div className="row">
                      <Button
                        size="sm"
                        onClick={() => {
                          setResolving(c);
                          setResolution('NoChange');
                          setNote('');
                        }}
                      >
                        {t('exams.challenge.resolve')}
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => setProposing(c)}>
                        {t('exams.regrade.propose')}
                      </Button>
                    </div>
                  ) : (
                    <p className="small">
                      <Badge tone="success">
                        {c.resolution ? t(`exams.challenge.resolution.${c.resolution}`) : ''}
                      </Badge>{' '}
                      {c.resolutionNote}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <Dialog
        open={resolving !== null}
        title={t('exams.challenge.resolveTitle', { id: resolving?.questionExternalId ?? '' })}
        onClose={() => setResolving(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setResolving(null)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={resolve.isPending}
              disabled={!note.trim()}
              onClick={() => resolve.mutate(undefined)}
            >
              {t('exams.challenge.resolve')}
            </Button>
          </>
        }
      >
        <fieldset className="stack" style={{ border: 'none', padding: 0 }}>
          <legend className="field__label">{t('exams.challenge.resolutionLabel')}</legend>
          {(['NoChange', 'Revise', 'Retire'] as const).map((r) => (
            <label key={r} className="option">
              <input
                type="radio"
                name="resolution"
                checked={resolution === r}
                onChange={() => setResolution(r)}
              />
              <span>
                {t(`exams.challenge.resolution.${r}`)}
                <span className="small muted" style={{ display: 'block' }}>
                  {t(`exams.challenge.resolutionHint.${r}`)}
                </span>
              </span>
            </label>
          ))}
        </fieldset>
        <Field label={t('exams.challenge.note')} hint={t('exams.challenge.noteHint')} required>
          <Textarea
            rows={3}
            maxLength={2000}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Field>
        {resolve.isError ? <Notice tone="danger">{examError(resolve.error, t)}</Notice> : null}
      </Dialog>
      {proposing ? (
        <RegradeProposalDialog
          questionId={proposing.questionId}
          onClose={() => setProposing(null)}
        />
      ) : null}
    </div>
  );
}

function RegradeProposalDialog({
  questionId,
  onClose,
}: {
  questionId: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const question = useQuery({
    queryKey: ['exams', 'question', questionId],
    queryFn: () =>
      api<{ question: RawQuestionDto }>(`/api/studio/questions/${questionId}`).then(
        (d) => d.question,
      ),
  });
  const [key, setKey] = useState<string[] | null>(null);
  const [reason, setReason] = useState('');
  const current = question.data?.version;
  const selected = key ?? current?.options.filter((o) => o.isCorrect).map((o) => o.id) ?? [];
  const propose = useApiMutation(
    () =>
      api<RegradeDto>(`/api/review/questions/${questionId}/regrades`, {
        method: 'POST',
        body: { correctOptionIds: selected, reason: reason.trim() },
      }),
    [['exams', 'regrades']],
    () => {
      toast.success(t('exams.regrade.proposed'));
      onClose();
    },
  );
  const single = current?.type === 'SingleChoice';
  return (
    <Dialog
      open
      wide
      title={t('exams.regrade.proposeTitle')}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            loading={propose.isPending}
            disabled={!reason.trim() || selected.length === 0}
            onClick={() => propose.mutate(undefined)}
          >
            {t('exams.regrade.submitProposal')}
          </Button>
        </>
      }
    >
      <QueryState query={question}>
        {(q) => (
          <div className="stack">
            <RichContent source={q.version.stem} />
            <fieldset className="stack" style={{ border: 'none', padding: 0 }}>
              <legend className="field__label">{t('exams.regrade.newKey')}</legend>
              {q.version.options.map((o) => (
                <label key={o.id} className="option">
                  <input
                    type={single ? 'radio' : 'checkbox'}
                    name="newkey"
                    checked={selected.includes(o.id)}
                    onChange={(e) =>
                      setKey(
                        single
                          ? [o.id]
                          : e.target.checked
                            ? [...selected, o.id]
                            : selected.filter((x) => x !== o.id),
                      )
                    }
                  />
                  <span>
                    <RichContent source={o.text} inline />{' '}
                    {o.isCorrect ? <Badge>{t('exams.regrade.currentKey')}</Badge> : null}
                  </span>
                </label>
              ))}
            </fieldset>
            <Field label={t('exams.regrade.reason')} required>
              <Textarea
                rows={3}
                maxLength={2000}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Field>
            {propose.isError ? <Notice tone="danger">{examError(propose.error, t)}</Notice> : null}
          </div>
        )}
      </QueryState>
    </Dialog>
  );
}

// ---------------- regrades ----------------

export function RegradesPage() {
  const { t, fmtDate } = useI18n();
  usePageMeta(t('exams.staff.section.regrades'), undefined, { noindex: true });
  const [status, setStatus] = useState('Proposed');
  const [open, setOpen] = useState<string | null>(null);
  const list = useQuery({
    queryKey: examKeys.regrades(status),
    queryFn: () => api<RegradeDto[]>(`/api/review/regrades${qs({ status })}`),
  });
  return (
    <div className="stack">
      <PageHeader title={t('exams.staff.section.regrades')} subtitle={t('exams.regrade.intro')} />
      <StatusFilter
        value={status}
        onChange={setStatus}
        values={['Proposed', 'Applied', 'Rejected']}
        prefix="exams.regrade.status"
      />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('exams.regrade.none')} description={t('exams.regrade.noneBody')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('exams.regrade.proposedAt')}</th>
                    <th scope="col">{t('exams.regrade.reason')}</th>
                    <th scope="col">{t('exams.common.status')}</th>
                    <th scope="col">{t('exams.regrade.affected')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((r) => (
                    <tr key={r.id}>
                      <td>{fmtDate(r.proposedAt)}</td>
                      <td>{r.reason}</td>
                      <td>
                        <Badge
                          tone={
                            r.status === 'Applied'
                              ? 'success'
                              : r.status === 'Rejected'
                                ? 'danger'
                                : 'warning'
                          }
                        >
                          {t(`exams.regrade.status.${r.status}`)}
                        </Badge>
                      </td>
                      <td>
                        {r.status === 'Applied'
                          ? t('exams.regrade.affectedCount', {
                              n: r.affectedAttempts,
                              changed: r.changedAttempts,
                            })
                          : '—'}
                      </td>
                      <td>
                        <Button size="sm" variant="secondary" onClick={() => setOpen(r.id)}>
                          {t('exams.regrade.open')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
      {open ? <RegradeDetailDialog id={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}

function RegradeDetailDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const { t, fmtNumber } = useI18n();
  const { hasRole, user } = useAuth();
  const toast = useToast();
  const isStaff = hasRole(...STAFF);
  const [note, setNote] = useState('');
  const [after, setAfter] = useState<RegradeDetailDto | null>(null);
  const detail = useQuery({
    queryKey: examKeys.regrade(id),
    queryFn: () => api<RegradeDetailDto>(`/api/review/regrades/${id}`),
  });
  const question = useQuery({
    queryKey: ['exams', 'question', detail.data?.regrade.questionId],
    queryFn: () =>
      api<{ question: RawQuestionDto }>(
        `/api/studio/questions/${detail.data?.regrade.questionId}`,
      ).then((d) => toQuestion(d.question)),
    enabled: !!detail.data,
  });
  const decide = useApiMutation(
    (approve: boolean) =>
      api<RegradeDetailDto | RegradeDto>(
        `/api/admin/regrades/${id}/${approve ? 'approve' : 'reject'}`,
        {
          method: 'POST',
          body: { note: note.trim() },
        },
      ),
    [['exams', 'regrades'], examKeys.regrade(id)],
    (res, approve) => {
      if (approve && 'results' in res) setAfter(res);
      toast.success(approve ? t('exams.regrade.applied') : t('exams.regrade.rejected'));
    },
  );
  const data = after ?? detail.data;
  const optText = (oid: string) => {
    const opts = question.data?.options ?? [];
    const i = opts.findIndex((o) => o.id === oid);
    return i < 0 ? oid.slice(0, 8) : `${String.fromCharCode(65 + i)}. ${opts[i].text}`;
  };
  return (
    <Dialog open wide title={t('exams.regrade.detailTitle')} onClose={onClose}>
      {!data ? (
        <QueryState query={detail}>{() => null}</QueryState>
      ) : (
        <div className="stack">
          <p>{data.regrade.reason}</p>
          <dl className="facts">
            <div>
              <dt>{t('exams.regrade.oldKey')}</dt>
              <dd>{data.regrade.oldCorrectOptionIds.map(optText).join(', ')}</dd>
            </div>
            <div>
              <dt>{t('exams.regrade.newKey')}</dt>
              <dd>{data.regrade.newCorrectOptionIds.map(optText).join(', ')}</dd>
            </div>
            <div>
              <dt>{t('exams.regrade.affected')}</dt>
              <dd data-testid="regrade-affected">
                {data.regrade.status === 'Applied'
                  ? t('exams.regrade.affectedCount', {
                      n: data.regrade.affectedAttempts,
                      changed: data.regrade.changedAttempts,
                    })
                  : t('exams.regrade.affectedOnApproval')}
              </dd>
            </div>
          </dl>
          {data.results.length > 0 ? (
            <div className="table-wrap">
              <table className="table small">
                <caption>{t('exams.regrade.deltas')}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t('exams.regrade.attempt')}</th>
                    <th scope="col">{t('exams.regrade.oldScore')}</th>
                    <th scope="col">{t('exams.regrade.newScore')}</th>
                    <th scope="col">{t('exams.regrade.delta')}</th>
                    <th scope="col">{t('exams.regrade.pass')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((r) => {
                    const delta = r.newScorePercent - r.oldScorePercent;
                    return (
                      <tr key={r.attemptId}>
                        <td className="mono">{r.attemptId.slice(0, 8)}</td>
                        <td>{fmtNumber(r.oldScorePercent)}%</td>
                        <td>{fmtNumber(r.newScorePercent)}%</td>
                        <td>
                          {delta > 0 ? '+' : ''}
                          {fmtNumber(Math.round(delta * 100) / 100)}
                        </td>
                        <td>
                          {r.oldPassed === r.newPassed
                            ? t(r.newPassed ? 'result.passed' : 'result.notPassed')
                            : `${t(r.oldPassed ? 'result.passed' : 'result.notPassed')} → ${t(
                                r.newPassed ? 'result.passed' : 'result.notPassed',
                              )}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
          {data.issuedCertificateCodes.length > 0 ? (
            <Notice tone="success">
              {t('exams.regrade.issued', { codes: data.issuedCertificateCodes.join(', ') })}
            </Notice>
          ) : null}
          {data.flaggedCertificateIds.length > 0 ? (
            <Notice tone="warning">
              {t('exams.regrade.flagged', { n: data.flaggedCertificateIds.length })}
            </Notice>
          ) : null}
          {data.regrade.status === 'Proposed' ? (
            isStaff ? (
              data.regrade.proposedBy === user?.id ? (
                <Notice tone="info">{t('exams.regrade.notOwn')}</Notice>
              ) : (
                <>
                  <Notice tone="warning">{t('exams.regrade.approveWarning')}</Notice>
                  <Field label={t('exams.regrade.note')} required>
                    <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
                  </Field>
                  {decide.isError ? (
                    <Notice tone="danger">{examError(decide.error, t)}</Notice>
                  ) : null}
                  <div className="row">
                    <Button
                      loading={decide.isPending && decide.variables === true}
                      disabled={!note.trim()}
                      onClick={() => decide.mutate(true)}
                    >
                      {t('exams.regrade.approve')}
                    </Button>
                    <Button
                      variant="danger"
                      loading={decide.isPending && decide.variables === false}
                      disabled={!note.trim()}
                      onClick={() => decide.mutate(false)}
                    >
                      {t('exams.regrade.reject')}
                    </Button>
                  </div>
                </>
              )
            ) : (
              <p className="small muted">{t('exams.regrade.awaitingStaff')}</p>
            )
          ) : data.regrade.decisionNote ? (
            <p className="small">
              {t('exams.regrade.note')}: {data.regrade.decisionNote}
            </p>
          ) : null}
        </div>
      )}
    </Dialog>
  );
}

// ---------------- certificate flags ----------------

export function CertificateFlagsPage() {
  const { t, fmtDate } = useI18n();
  usePageMeta(t('exams.staff.section.flags'), undefined, { noindex: true });
  const toast = useToast();
  const [status, setStatus] = useState('Open');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const list = useQuery({
    queryKey: examKeys.flags(status),
    queryFn: () => api<CertificateFlagDto[]>(`/api/admin/certificate-flags${qs({ status })}`),
  });
  const decide = useApiMutation(
    (v: { id: string; revoke: boolean }) =>
      api(`/api/admin/certificate-flags/${v.id}/decide`, {
        method: 'POST',
        body: { revoke: v.revoke, note: (notes[v.id] ?? '').trim() },
      }),
    [['exams', 'flags']],
    () => toast.success(t('exams.common.decided')),
  );
  return (
    <div className="stack">
      <PageHeader title={t('exams.staff.section.flags')} subtitle={t('exams.flags.intro')} />
      <StatusFilter
        value={status}
        onChange={setStatus}
        values={['Open', 'Kept', 'Revoked']}
        prefix="exams.flags.status"
      />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('exams.flags.none')} description={t('exams.flags.noneBody')} />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {items.map((f) => (
                <li key={f.id} className="card stack">
                  <div className="row row--between">
                    <strong className="mono">{f.certificateCode}</strong>
                    <span className="small muted">{fmtDate(f.createdAt)}</span>
                  </div>
                  <p>{f.reason}</p>
                  {f.status === 'Open' ? (
                    <>
                      <Field label={t('exams.common.note')} required>
                        <Input
                          value={notes[f.id] ?? ''}
                          onChange={(e) => setNotes((n) => ({ ...n, [f.id]: e.target.value }))}
                        />
                      </Field>
                      <div className="row">
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={!(notes[f.id] ?? '').trim()}
                          onClick={() =>
                            decide.mutate(
                              { id: f.id, revoke: false },
                              { onError: (e) => toast.error(examError(e, t)) },
                            )
                          }
                        >
                          {t('exams.flags.keep')}
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          disabled={!(notes[f.id] ?? '').trim()}
                          onClick={() =>
                            decide.mutate(
                              { id: f.id, revoke: true },
                              { onError: (e) => toast.error(examError(e, t)) },
                            )
                          }
                        >
                          {t('exams.flags.revoke')}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Badge>{t(`exams.flags.status.${f.status}`)}</Badge>
                  )}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

// ---------------- accommodations ----------------

export function AccommodationsPage() {
  const { t, fmtDate } = useI18n();
  usePageMeta(t('exams.staff.section.accommodations'), undefined, { noindex: true });
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [user, setUser] = useState<AdminUserDto | null>(null);
  const [includeRevoked, setIncludeRevoked] = useState(false);
  const [assessmentId, setAssessmentId] = useState('');
  const [extra, setExtra] = useState(50);
  const [untimed, setUntimed] = useState(false);
  const [reason, setReason] = useState('');
  const users = useQuery({
    queryKey: ['exams', 'user-search', submitted],
    queryFn: () => api<Paged<AdminUserDto>>(`/api/admin/users${qs({ q: submitted, page: 1 })}`),
    enabled: !!submitted,
  });
  const grants = useQuery({
    queryKey: examKeys.accommodations(user?.id ?? '', includeRevoked),
    queryFn: () =>
      api<AccommodationDto[]>(
        `/api/admin/accommodations${qs({ userId: user?.id, includeRevoked })}`,
      ),
  });
  const grant = useApiMutation(
    () =>
      api<AccommodationDto>('/api/admin/accommodations', {
        method: 'POST',
        body: {
          userId: user?.id,
          assessmentId: assessmentId.trim() || null,
          extraTimePercent: untimed ? 0 : extra,
          untimed,
          reason: reason.trim(),
        },
      }),
    [['exams', 'accommodations']],
    () => {
      setReason('');
      toast.success(t('exams.acc.granted'));
    },
  );
  const revoke = useApiMutation(
    (id: string) => api(`/api/admin/accommodations/${id}`, { method: 'DELETE' }),
    [['exams', 'accommodations']],
    () => toast.success(t('exams.acc.revoked')),
  );
  const extraOk = untimed || (Number.isInteger(extra) && extra >= 0 && extra <= 300);
  const guidOk = !assessmentId.trim() || /^[0-9a-f-]{36}$/i.test(assessmentId.trim());
  return (
    <div className="stack">
      <PageHeader title={t('exams.staff.section.accommodations')} subtitle={t('exams.acc.intro')} />
      <form
        className="row"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(search.trim());
        }}
      >
        <Field label={t('exams.acc.findUser')}>
          <Input type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Field>
        <Button type="submit" variant="secondary">
          {t('exams.acc.search')}
        </Button>
      </form>
      {submitted ? (
        <QueryState query={users}>
          {(p) =>
            p.items.length === 0 ? (
              <p className="muted">{t('exams.acc.noUsers')}</p>
            ) : (
              <ul className="row" style={{ listStyle: 'none', padding: 0 }}>
                {p.items.map((u) => (
                  <li key={u.id}>
                    <Button
                      size="sm"
                      variant={user?.id === u.id ? 'primary' : 'secondary'}
                      aria-pressed={user?.id === u.id}
                      onClick={() => setUser(u)}
                    >
                      {u.displayName} ({u.email})
                    </Button>
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      ) : null}
      {user ? (
        <form
          className="card stack"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (extraOk && guidOk && reason.trim()) grant.mutate(undefined);
          }}
        >
          <h2>{t('exams.acc.grantFor', { name: user.displayName })}</h2>
          <Field
            label={t('exams.acc.assessment')}
            hint={t('exams.acc.assessmentHint')}
            error={guidOk ? undefined : t('exams.acc.guidRule')}
          >
            <Input value={assessmentId} onChange={(e) => setAssessmentId(e.target.value)} />
          </Field>
          <Checkbox
            label={t('exams.acc.untimedLabel')}
            checked={untimed}
            onChange={(e) => setUntimed(e.target.checked)}
          />
          {!untimed ? (
            <Field
              label={t('exams.acc.extraLabel')}
              error={extraOk ? undefined : t('exams.acc.extraRule')}
            >
              <Input
                type="number"
                min={0}
                max={300}
                value={Number.isNaN(extra) ? '' : extra}
                onChange={(e) => setExtra(e.target.valueAsNumber)}
              />
            </Field>
          ) : null}
          <Field label={t('exams.acc.reason')} required>
            <Textarea rows={2} value={reason} onChange={(e) => setReason(e.target.value)} />
          </Field>
          {grant.isError ? <Notice tone="danger">{examError(grant.error, t)}</Notice> : null}
          <div>
            <Button type="submit" loading={grant.isPending} disabled={!reason.trim()}>
              {t('exams.acc.grant')}
            </Button>
          </div>
        </form>
      ) : null}
      <section className="card stack">
        <div className="row row--between">
          <h2>
            {user ? t('exams.acc.grantsOf', { name: user.displayName }) : t('exams.acc.allGrants')}
          </h2>
          <Checkbox
            label={t('exams.acc.includeRevoked')}
            checked={includeRevoked}
            onChange={(e) => setIncludeRevoked(e.target.checked)}
          />
        </div>
        <QueryState query={grants}>
          {(items) =>
            items.length === 0 ? (
              <p className="muted">{t('exams.acc.none')}</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('exams.acc.user')}</th>
                      <th scope="col">{t('exams.acc.scope')}</th>
                      <th scope="col">{t('exams.acc.grantColumn')}</th>
                      <th scope="col">{t('exams.acc.reason')}</th>
                      <th scope="col">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((a) => (
                      <tr key={a.id}>
                        <td className="mono">{a.userId.slice(0, 8)}</td>
                        <td>
                          {a.assessmentId ? a.assessmentId.slice(0, 8) : t('exams.acc.global')}
                        </td>
                        <td>
                          {a.untimed
                            ? t('exams.acc.untimedShort')
                            : t('exams.acc.extraShort', { n: a.extraTimePercent })}
                        </td>
                        <td>{a.reason}</td>
                        <td>
                          {a.revokedAt ? (
                            <Badge>
                              {t('exams.acc.revokedOn', { date: fmtDate(a.revokedAt) })}
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                revoke.mutate(a.id, {
                                  onError: (e) => toast.error(examError(e, t)),
                                })
                              }
                            >
                              {t('exams.acc.revoke')}
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </QueryState>
      </section>
    </div>
  );
}

// ---------------- certificate templates ----------------

const HEX = /^#[0-9a-fA-F]{6}$/;
const emptyTemplate: CertificateTemplateInput = {
  name: '',
  titleText: 'Certificate of Completion',
  primaryColor: '#1f3a8a',
  accentColor: '#b45309',
  logoResourceId: null,
  signatureName: '',
  signatureTitle: '',
};

export function CertificatePreview({ v }: { v: CertificateTemplateInput }) {
  const { t } = useI18n();
  const style = {
    '--cert-primary': HEX.test(v.primaryColor) ? v.primaryColor : '#1f3a8a',
    '--cert-accent': HEX.test(v.accentColor) ? v.accentColor : '#b45309',
  } as React.CSSProperties;
  return (
    <figure className="cert-preview" style={style} aria-label={t('exams.cert.livePreview')}>
      {v.logoResourceId ? (
        <img
          src={apiUrl(`/api/learn/resources/${v.logoResourceId}/download`)}
          alt=""
          style={{ maxBlockSize: '3rem', marginInline: 'auto' }}
        />
      ) : null}
      <div className="cert-preview__title">{v.titleText || '—'}</div>
      <div className="cert-preview__rule" />
      <div>{t('exams.cert.sampleRecipient')}</div>
      <div className="small">{t('exams.cert.sampleCourse')}</div>
      <div className="small">
        {v.signatureName || '—'}
        <br />
        <span className="muted">{v.signatureTitle}</span>
      </div>
    </figure>
  );
}

function TemplateForm({
  initial,
  onDone,
}: {
  initial: CertificateTemplateDto | null;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const [v, setV] = useState<CertificateTemplateInput>(
    initial
      ? {
          name: initial.name,
          titleText: initial.titleText,
          primaryColor: initial.primaryColor,
          accentColor: initial.accentColor,
          logoResourceId: initial.logoResourceId,
          signatureName: initial.signatureName,
          signatureTitle: initial.signatureTitle,
        }
      : emptyTemplate,
  );
  const [code, setCode] = useState('');
  const set = <K extends keyof CertificateTemplateInput>(k: K, val: CertificateTemplateInput[K]) =>
    setV((x) => ({ ...x, [k]: val }));
  const save = useApiMutation(
    () =>
      initial
        ? api(`/api/admin/certificate-templates/${initial.id}`, { method: 'PUT', body: v })
        : api('/api/admin/certificate-templates', { method: 'POST', body: v }),
    [['exams', 'templates']],
    () => {
      toast.success(t('exams.cert.saved'));
      onDone();
    },
  );
  const colorsOk = HEX.test(v.primaryColor) && HEX.test(v.accentColor);
  const logoOk = !v.logoResourceId || /^[0-9a-f-]{36}$/i.test(v.logoResourceId);
  return (
    <div className="split">
      <form
        className="stack"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (v.name.trim() && colorsOk && logoOk) save.mutate(undefined);
        }}
      >
        <Field label={t('exams.cert.name')} required>
          <Input value={v.name} maxLength={100} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field label={t('exams.cert.titleText')} required>
          <Input
            value={v.titleText}
            maxLength={120}
            onChange={(e) => set('titleText', e.target.value)}
          />
        </Field>
        <div className="row">
          <Field
            label={t('exams.cert.primary')}
            error={HEX.test(v.primaryColor) ? undefined : t('exams.cert.hexRule')}
          >
            <Input
              type="color"
              value={HEX.test(v.primaryColor) ? v.primaryColor : '#000000'}
              onChange={(e) => set('primaryColor', e.target.value)}
            />
          </Field>
          <Field
            label={t('exams.cert.accent')}
            error={HEX.test(v.accentColor) ? undefined : t('exams.cert.hexRule')}
          >
            <Input
              type="color"
              value={HEX.test(v.accentColor) ? v.accentColor : '#000000'}
              onChange={(e) => set('accentColor', e.target.value)}
            />
          </Field>
        </div>
        <Field
          label={t('exams.cert.logo')}
          hint={t('exams.cert.logoHint')}
          error={logoOk ? undefined : t('exams.acc.guidRule')}
        >
          <Input
            value={v.logoResourceId ?? ''}
            onChange={(e) => set('logoResourceId', e.target.value.trim() || null)}
          />
        </Field>
        <Field label={t('exams.cert.signatureName')}>
          <Input
            value={v.signatureName}
            maxLength={100}
            onChange={(e) => set('signatureName', e.target.value)}
          />
        </Field>
        <Field label={t('exams.cert.signatureTitle')}>
          <Input
            value={v.signatureTitle}
            maxLength={100}
            onChange={(e) => set('signatureTitle', e.target.value)}
          />
        </Field>
        {save.isError ? <Notice tone="danger">{examError(save.error, t)}</Notice> : null}
        <div className="form-actions">
          <Button type="submit" loading={save.isPending} disabled={!v.name.trim()}>
            {t('common.save')}
          </Button>
          <Button variant="secondary" onClick={onDone}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
      <div className="stack">
        <CertificatePreview v={v} />
        <Field label={t('exams.cert.pdfCode')} hint={t('exams.cert.pdfHint')}>
          <Input value={code} onChange={(e) => setCode(e.target.value.trim())} />
        </Field>
        {code ? (
          <a
            href={apiUrl(`/api/certificates/${encodeURIComponent(code)}/pdf`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('exams.cert.openPdf')}
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function TemplatesPage() {
  const { t } = useI18n();
  usePageMeta(t('exams.staff.section.templates'), undefined, { noindex: true });
  const toast = useToast();
  const [includeArchived, setIncludeArchived] = useState(false);
  const [editing, setEditing] = useState<CertificateTemplateDto | 'new' | null>(null);
  const list = useTemplates(includeArchived);
  const archive = useApiMutation(
    (id: string) => api(`/api/admin/certificate-templates/${id}`, { method: 'DELETE' }),
    [['exams', 'templates']],
    () => toast.success(t('exams.cert.archived')),
  );
  return (
    <div className="stack">
      <PageHeader
        title={t('exams.staff.section.templates')}
        subtitle={t('exams.cert.intro')}
        actions={<Button onClick={() => setEditing('new')}>{t('exams.cert.new')}</Button>}
      />
      <Checkbox
        label={t('exams.cert.includeArchived')}
        checked={includeArchived}
        onChange={(e) => setIncludeArchived(e.target.checked)}
      />
      {editing ? (
        <section className="card">
          <h2>{editing === 'new' ? t('exams.cert.new') : t('exams.cert.edit')}</h2>
          <TemplateForm
            key={editing === 'new' ? 'new' : editing.id}
            initial={editing === 'new' ? null : editing}
            onDone={() => setEditing(null)}
          />
        </section>
      ) : null}
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('exams.cert.none')} description={t('exams.cert.noneBody')} />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {items.map((tp) => (
                <li key={tp.id} className="card row row--between">
                  <span>
                    <strong>{tp.name}</strong> <span className="small muted">{tp.titleText}</span>{' '}
                    {tp.archived ? <Badge>{t('exams.cert.archivedBadge')}</Badge> : null}
                  </span>
                  <span className="row">
                    <Button size="sm" variant="secondary" onClick={() => setEditing(tp)}>
                      {t('common.edit')}
                    </Button>
                    {!tp.archived ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          archive.mutate(tp.id, { onError: (e) => toast.error(examError(e, t)) })
                        }
                      >
                        {t('exams.cert.archive')}
                      </Button>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

// ---------------- corrections & appeals ----------------

function RequestQueue<T extends CorrectionDto | AppealDto>({
  kind,
}: {
  kind: 'corrections' | 'appeals';
}) {
  const { t, fmtDate } = useI18n();
  usePageMeta(t(`exams.staff.section.${kind}`), undefined, { noindex: true });
  const toast = useToast();
  const [status, setStatus] = useState('Pending');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const key = kind === 'corrections' ? examKeys.corrections(status) : examKeys.appeals(status);
  const list = useQuery({
    queryKey: key,
    queryFn: () => api<T[]>(`/api/admin/certificate-${kind}${qs({ status })}`),
  });
  const decide = useApiMutation(
    (v: { id: string; approve: boolean }) =>
      api(`/api/admin/certificate-${kind}/${v.id}/decide`, {
        method: 'POST',
        body: { approve: v.approve, note: (notes[v.id] ?? '').trim() },
      }),
    [['exams', kind]],
    () => toast.success(t('exams.common.decided')),
  );
  return (
    <div className="stack">
      <PageHeader
        title={t(`exams.staff.section.${kind}`)}
        subtitle={t(`exams.requests.${kind}Intro`)}
      />
      <StatusFilter
        value={status}
        onChange={setStatus}
        values={['Pending', 'Approved', 'Rejected']}
        prefix="exams.requests.status"
      />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              title={t('exams.requests.none')}
              description={t('exams.requests.noneBody')}
            />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {items.map((r) => (
                <li key={r.id} className="card stack">
                  <div className="row row--between">
                    <strong className="mono">{r.certificateCode}</strong>
                    <span className="small muted">{fmtDate(r.createdAt)}</span>
                  </div>
                  {'requestedName' in r ? (
                    <p>
                      {t('exams.requests.nameChange', { from: r.currentName, to: r.requestedName })}
                    </p>
                  ) : (
                    <p className="small">
                      {t('exams.requests.revokedFor', { reason: r.revocationReason ?? '—' })}
                    </p>
                  )}
                  <p className="small">{r.reason}</p>
                  {r.status === 'Pending' ? (
                    <>
                      <Field label={t('exams.common.note')}>
                        <Input
                          value={notes[r.id] ?? ''}
                          onChange={(e) => setNotes((n) => ({ ...n, [r.id]: e.target.value }))}
                        />
                      </Field>
                      <div className="row">
                        <Button
                          size="sm"
                          onClick={() =>
                            decide.mutate(
                              { id: r.id, approve: true },
                              { onError: (e) => toast.error(examError(e, t)) },
                            )
                          }
                        >
                          {t(
                            kind === 'corrections'
                              ? 'exams.requests.approveCorrection'
                              : 'exams.requests.reinstate',
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            decide.mutate(
                              { id: r.id, approve: false },
                              { onError: (e) => toast.error(examError(e, t)) },
                            )
                          }
                        >
                          {t('exams.requests.reject')}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p className="small">
                      <Badge tone={r.status === 'Approved' ? 'success' : 'danger'}>
                        {t(`exams.requests.status.${r.status}`)}
                      </Badge>{' '}
                      {r.decisionNote}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

export const CorrectionsQueuePage = () => <RequestQueue<CorrectionDto> kind="corrections" />;
export const AppealsQueuePage = () => <RequestQueue<AppealDto> kind="appeals" />;

// ---------------- reusable bank flagging ----------------

export function ReusableBankPage() {
  const { t } = useI18n();
  usePageMeta(t('exams.staff.section.reusable'), undefined, { noindex: true });
  const toast = useToast();
  const [courseQuery, setCourseQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [courseId, setCourseId] = useState('');
  const courses = useQuery({
    queryKey: ['exams', 'catalog', submitted],
    queryFn: () =>
      api<{ items: { id: string; title: string }[] } | { id: string; title: string }[]>(
        `/api/courses${qs({ q: submitted, pageSize: 20 })}`,
      ).then((d) => (Array.isArray(d) ? d : d.items)),
    enabled: !!submitted,
  });
  const questions = useQuery({
    queryKey: ['studio', 'questions', courseId, { state: 'Active', q: '' }],
    queryFn: () =>
      api<RawQuestionDto[] | { items: RawQuestionDto[] }>(
        `/api/studio/courses/${courseId}/questions${qs({ state: 'Active', pageSize: 200 })}`,
      ),
    select: toQuestionList,
    enabled: !!courseId,
  });
  const flag = useApiMutation(
    (v: { id: string; reusable: boolean }) =>
      api(`/api/admin/questions/${v.id}/reusable`, {
        method: 'PUT',
        body: { reusable: v.reusable },
      }),
    [['studio', 'questions', courseId]],
    (_, v) => toast.success(v.reusable ? t('exams.reusable.marked') : t('exams.reusable.unmarked')),
  );
  return (
    <div className="stack">
      <PageHeader title={t('exams.staff.section.reusable')} subtitle={t('exams.reusable.intro')} />
      <form
        className="row"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(courseQuery.trim());
        }}
      >
        <Field label={t('exams.reusable.findCourse')}>
          <Input
            type="search"
            value={courseQuery}
            onChange={(e) => setCourseQuery(e.target.value)}
          />
        </Field>
        <Button type="submit" variant="secondary">
          {t('exams.acc.search')}
        </Button>
      </form>
      {submitted ? (
        <QueryState query={courses}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('exams.reusable.noCourses')}</p>
            ) : (
              <Field label={t('exams.reusable.course')}>
                <Select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  placeholder={t('exams.reuse.pickCourse')}
                  options={list.map((c) => ({ value: c.id, label: c.title }))}
                />
              </Field>
            )
          }
        </QueryState>
      ) : null}
      {courseId ? (
        <QueryState query={questions}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('exams.reusable.noActive')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {list.map((q) => (
                  <li key={q.id} className="card row row--between">
                    <span>
                      <span className="mono">{q.externalId}</span>{' '}
                      {q.reusable ? (
                        <Badge tone="success">{t('exams.reusable.badge')}</Badge>
                      ) : null}
                      <RichContent source={q.stem} className="small" />
                    </span>
                    <Button
                      size="sm"
                      variant={q.reusable ? 'ghost' : 'secondary'}
                      onClick={() =>
                        flag.mutate(
                          { id: q.id, reusable: !q.reusable },
                          { onError: (e) => toast.error(examError(e, t)) },
                        )
                      }
                    >
                      {q.reusable ? t('exams.reusable.unmark') : t('exams.reusable.mark')}
                    </Button>
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      ) : null}
    </div>
  );
}
