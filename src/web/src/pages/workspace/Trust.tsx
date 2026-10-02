import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { COMPLAINT_TYPES, extractGuid, fetchHealth, wsKeys } from '../../api/workspace';
import type {
  AppealDto,
  BrokenLinkDto,
  ComplaintDto,
  ComplaintTarget,
  ContentHoldDto,
  OverdueCourseDto,
  Paged,
  SuspensionDto,
} from '../../api/workspace';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, Pagination, QueryState } from '../../components/ui/misc';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { fmtDateTime, WsError, wsError } from './common';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------- public complaint ----------
export function ReportContentButton({
  targetType,
  targetId,
  size = 'sm',
}: {
  targetType: ComplaintTarget;
  targetId: string;
  size?: 'sm' | 'md';
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>('Copyright');
  const [evidence, setEvidence] = useState('');
  const [mail, setMail] = useState('');
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const evidenceOk = evidence.trim().length >= 20 && evidence.length <= 20000;
  const emailOk = user ? !mail || EMAIL_RE.test(mail) : EMAIL_RE.test(mail);
  const file = useApiMutation(
    () =>
      api('/api/complaints', {
        method: 'POST',
        body: {
          type,
          targetType,
          targetId,
          evidence: evidence.trim(),
          email: mail.trim() || null,
          name: name.trim() || null,
        },
      }),
    [],
    () => setDone(true),
  );
  const close = () => {
    setOpen(false);
    if (done) {
      setDone(false);
      setEvidence('');
    }
  };
  return (
    <>
      <Button variant="ghost" size={size} onClick={() => setOpen(true)}>
        {t('workspace.report.button')}
      </Button>
      <Dialog
        open={open}
        title={t('workspace.report.title')}
        onClose={close}
        footer={
          done ? (
            <Button onClick={close}>{t('common.close')}</Button>
          ) : (
            <>
              <Button variant="secondary" onClick={close}>
                {t('common.cancel')}
              </Button>
              <Button
                disabled={!evidenceOk || !emailOk}
                loading={file.isPending}
                onClick={() => file.mutate(undefined)}
              >
                {t('workspace.report.submit')}
              </Button>
            </>
          )
        }
      >
        {done ? (
          <Notice tone="success">{t('workspace.report.thanks')}</Notice>
        ) : (
          <>
            <p className="small muted">
              {t('workspace.report.help', { target: t(`workspace.targets.${targetType}`) })}
            </p>
            <Field label={t('workspace.report.type')}>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={COMPLAINT_TYPES.map((c) => ({
                  value: c,
                  label: t(`workspace.complaintTypes.${c}`),
                }))}
              />
            </Field>
            <Field
              label={t('workspace.report.evidence')}
              hint={t('workspace.report.evidenceHint', { n: evidence.trim().length })}
              required
              error={evidence && !evidenceOk ? t('workspace.report.evidenceShort') : undefined}
            >
              <Textarea
                rows={6}
                maxLength={20000}
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
              />
            </Field>
            <Field
              label={t('workspace.report.email')}
              hint={user ? t('workspace.report.emailOptional') : undefined}
              required={!user}
              error={mail && !emailOk ? t('workspace.report.emailInvalid') : undefined}
            >
              <Input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
            </Field>
            <Field label={t('workspace.report.name')}>
              <Input value={name} maxLength={120} onChange={(e) => setName(e.target.value)} />
            </Field>
            <WsError error={file.error} />
          </>
        )}
      </Dialog>
    </>
  );
}

// ---------- appeals (author side) ----------
export function AppealButton({
  targetType,
  targetId,
}: {
  targetType: 'Review' | 'Discussion' | 'DiscussionReply';
  targetId: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const toast = useToast();
  const ok = reason.trim().length >= 10 && reason.length <= 5000;
  const file = useApiMutation(
    () =>
      api('/api/appeals', {
        method: 'POST',
        body: { targetType, targetId, reason: reason.trim() },
      }),
    [wsKeys.myAppeals],
    () => {
      setOpen(false);
      setReason('');
      toast.success(t('workspace.appeal.filed'));
    },
  );
  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        {t('workspace.appeal.button')}
      </Button>
      <Dialog
        open={open}
        title={t('workspace.appeal.title')}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button disabled={!ok} loading={file.isPending} onClick={() => file.mutate(undefined)}>
              {t('workspace.appeal.submit')}
            </Button>
          </>
        }
      >
        <p className="small muted">{t('workspace.appeal.help')}</p>
        <Field
          label={t('workspace.appeal.reason')}
          hint={t('workspace.appeal.reasonHint')}
          required
        >
          <Textarea
            rows={5}
            maxLength={5000}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Field>
        <WsError error={file.error} />
      </Dialog>
    </>
  );
}

/** Shown where a learner/author lands on content that is not available to them (hidden or removed). */
export function HiddenContentNotice({
  targetType,
  targetId,
}: {
  targetType: 'Review' | 'Discussion' | 'DiscussionReply';
  targetId: string;
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  return (
    <Notice tone="info" title={t('workspace.appeal.hiddenTitle')}>
      <p style={{ marginBlockStart: 0 }}>{t('workspace.appeal.hiddenBody')}</p>
      {user ? <AppealButton targetType={targetType} targetId={targetId} /> : null}
    </Notice>
  );
}

const APPEAL_TARGETS = ['Discussion', 'DiscussionReply', 'Review'] as const;

export function MyAppealsPage() {
  const { t, lang } = useI18n();
  usePageMeta(t('workspace.appeal.mine'), undefined, { noindex: true });
  const [params] = useSearchParams();
  const [targetType, setTargetType] = useState<(typeof APPEAL_TARGETS)[number]>(
    (APPEAL_TARGETS as readonly string[]).includes(params.get('targetType') ?? '')
      ? (params.get('targetType') as (typeof APPEAL_TARGETS)[number])
      : 'Discussion',
  );
  const [link, setLink] = useState(params.get('targetId') ?? '');
  const id = extractGuid(link);
  const list = useQuery({
    queryKey: wsKeys.myAppeals,
    queryFn: () => api<AppealDto[]>('/api/me/appeals'),
  });
  return (
    <div className="container page">
      <PageHeader title={t('workspace.appeal.mine')} />
      <section className="card stack">
        <h2>{t('workspace.appeal.title')}</h2>
        <p className="small muted">{t('workspace.appeal.pageHelp')}</p>
        <div className="grid-2">
          <Field label={t('workspace.appeal.targetType')}>
            <Select
              value={targetType}
              onChange={(e) => setTargetType(e.target.value as (typeof APPEAL_TARGETS)[number])}
              options={APPEAL_TARGETS.map((x) => ({
                value: x,
                label: t(`workspace.targets.${x}`),
              }))}
            />
          </Field>
          <Field label={t('workspace.appeal.link')} hint={t('workspace.appeal.linkHint')}>
            <Input value={link} onChange={(e) => setLink(e.target.value)} />
          </Field>
        </div>
        {id ? <AppealButton targetType={targetType} targetId={id} /> : null}
      </section>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('workspace.appeal.none')} />
          ) : (
            <ul className="ws-list">
              {items.map((a) => (
                <li key={a.id} className="card card--flat">
                  <div className="row row--between">
                    <strong>{t(`workspace.targets.${a.targetType}`)}</strong>
                    <AppealStatus status={a.status} />
                  </div>
                  <p className="pre-wrap">{a.reason}</p>
                  <div className="small muted">{fmtDateTime(a.createdAt, lang)}</div>
                  {a.decisionNote ? (
                    <p className="small">
                      {t('workspace.appeal.decisionNote')}: {a.decisionNote}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

function AppealStatus({ status }: { status: string }) {
  const { t } = useI18n();
  const tone = status === 'Reinstated' ? 'success' : status === 'Upheld' ? 'danger' : 'info';
  return <Badge tone={tone}>{t(`workspace.appealStatus.${status}`)}</Badge>;
}

/** 451 on a lesson: shown in the learning workspace instead of the player and notes. */
export function HeldLessonNotice() {
  const { t } = useI18n();
  return (
    <Notice tone="warning" title={t('workspace.held.title')}>
      {t('workspace.held.body')}
    </Notice>
  );
}

// ---------- staff: trust console ----------
function NoteDialog({
  open,
  title,
  label,
  min,
  confirm,
  danger,
  pending,
  error,
  onClose,
  onSubmit,
  children,
}: {
  open: boolean;
  title: string;
  label: string;
  min: number;
  confirm: string;
  danger?: boolean;
  pending: boolean;
  error: unknown;
  onClose: () => void;
  onSubmit: (note: string) => void;
  children?: ReactNode;
}) {
  const { t } = useI18n();
  const [note, setNote] = useState('');
  const ok = note.trim().length >= min;
  return (
    <Dialog
      open={open}
      title={title}
      onClose={onClose}
      alert={danger}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            disabled={!ok}
            loading={pending}
            onClick={() => onSubmit(note.trim())}
          >
            {confirm}
          </Button>
        </>
      }
    >
      {children}
      <Field label={label} hint={t('workspace.trust.minChars', { n: min })} required>
        <Textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
      </Field>
      <WsError error={error} />
    </Dialog>
  );
}

function ComplaintsTab() {
  const { t, lang } = useI18n();
  const toast = useToast();
  const [status, setStatus] = useState('Open');
  const [page, setPage] = useState(1);
  const [acting, setActing] = useState<{
    c: ComplaintDto;
    action: 'Dismiss' | 'Hide' | 'Archive';
  } | null>(null);
  const list = useQuery({
    queryKey: wsKeys.complaints(status, page),
    queryFn: () =>
      api<Paged<ComplaintDto>>(
        `/api/admin/trust/complaints?status=${status}&page=${page}&pageSize=25`,
      ),
  });
  const resolve = useApiMutation(
    (v: { id: string; action: string; note: string }) =>
      api(`/api/admin/trust/complaints/${v.id}/resolve`, {
        method: 'POST',
        body: { action: v.action, note: v.note },
      }),
    [
      ['ws', 'complaints'],
      ['ws', 'holds'],
    ],
    () => {
      setActing(null);
      toast.success(t('workspace.trust.resolved'));
    },
  );
  return (
    <div className="stack">
      <Field label={t('workspace.trust.status')}>
        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          options={['Open', 'Dismissed', 'Actioned'].map((s) => ({
            value: s,
            label: t(`workspace.complaintStatus.${s}`),
          }))}
        />
      </Field>
      <QueryState query={list}>
        {(p) =>
          p.items.length === 0 ? (
            <EmptyState title={t('workspace.trust.noComplaints')} />
          ) : (
            <>
              <ul className="ws-list">
                {p.items.map((c) => (
                  <li
                    key={c.id}
                    className="card card--flat"
                    aria-label={t('workspace.trust.complaintAbout', {
                      target: t(`workspace.targets.${c.targetType}`),
                    })}
                  >
                    <div className="row row--between">
                      <strong>
                        {t(`workspace.complaintTypes.${c.type}`)} ·{' '}
                        {t(`workspace.targets.${c.targetType}`)}
                      </strong>
                      <span className="small muted">{fmtDateTime(c.createdAt, lang)}</span>
                    </div>
                    <div className="small">
                      {c.courseTitle ?? '—'} · <span className="mono">{c.targetId}</span>
                    </div>
                    <div className="small muted">
                      {c.reporterName || '—'} &lt;{c.reporterEmail}&gt;
                    </div>
                    <p className="pre-wrap">{c.evidence}</p>
                    {c.status === 'Open' ? (
                      <div className="row">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setActing({ c, action: 'Dismiss' })}
                        >
                          {t('workspace.trust.dismiss')}
                        </Button>
                        {c.targetType !== 'Course' ? (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => setActing({ c, action: 'Hide' })}
                          >
                            {t('workspace.trust.hide')}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => setActing({ c, action: 'Archive' })}
                          >
                            {t('workspace.trust.archive')}
                          </Button>
                        )}
                      </div>
                    ) : (
                      <p className="small">
                        <Badge>{t(`workspace.complaintStatus.${c.status}`)}</Badge> {c.action} ·{' '}
                        {c.resolutionNote}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <Pagination page={p.page} pageSize={p.pageSize} total={p.total} onPage={setPage} />
            </>
          )
        }
      </QueryState>
      <NoteDialog
        key={acting ? `${acting.c.id}-${acting.action}` : 'none'}
        open={!!acting}
        danger={acting?.action !== 'Dismiss'}
        title={acting ? t(`workspace.trust.confirm${acting.action}`) : ''}
        label={t('workspace.trust.note')}
        min={3}
        confirm={acting ? t(`workspace.trust.${acting.action.toLowerCase()}`) : ''}
        pending={resolve.isPending}
        error={resolve.error}
        onClose={() => {
          setActing(null);
          resolve.reset();
        }}
        onSubmit={(note) =>
          acting && resolve.mutate({ id: acting.c.id, action: acting.action, note })
        }
      />
    </div>
  );
}

function HoldsTab() {
  const { t, lang } = useI18n();
  const toast = useToast();
  const [all, setAll] = useState(false);
  const [releasing, setReleasing] = useState<ContentHoldDto | null>(null);
  const list = useQuery({
    queryKey: wsKeys.holds(all),
    queryFn: () => api<ContentHoldDto[]>(`/api/admin/trust/holds?includeReleased=${all}`),
  });
  const release = useApiMutation(
    (v: { id: string; note: string }) =>
      api(`/api/admin/trust/holds/${v.id}/release`, { method: 'POST', body: { note: v.note } }),
    [['ws', 'holds']],
    () => {
      setReleasing(null);
      toast.success(t('workspace.trust.released'));
    },
  );
  return (
    <div className="stack">
      <Checkbox
        label={t('workspace.trust.includeReleased')}
        checked={all}
        onChange={(e) => setAll(e.target.checked)}
      />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('workspace.trust.noHolds')} />
          ) : (
            <ul className="ws-list">
              {items.map((h) => (
                <li key={h.id} className="card card--flat row row--between">
                  <span>
                    <strong>{t(`workspace.targets.${h.targetType}`)}</strong>{' '}
                    <span className="mono small">{h.targetId}</span>
                    <span className="small muted"> · {fmtDateTime(h.createdAt, lang)}</span>
                    {h.releasedAt ? (
                      <Badge tone="success">
                        {t('workspace.trust.releasedAt', { date: fmtDateTime(h.releasedAt, lang) })}
                      </Badge>
                    ) : null}
                  </span>
                  {!h.releasedAt ? (
                    <Button size="sm" variant="secondary" onClick={() => setReleasing(h)}>
                      {t('workspace.trust.release')}
                    </Button>
                  ) : null}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <NoteDialog
        key={releasing?.id ?? 'none'}
        open={!!releasing}
        title={t('workspace.trust.release')}
        label={t('workspace.trust.note')}
        min={3}
        confirm={t('workspace.trust.release')}
        pending={release.isPending}
        error={release.error}
        onClose={() => setReleasing(null)}
        onSubmit={(note) => releasing && release.mutate({ id: releasing.id, note })}
      />
    </div>
  );
}

function SuspensionsTab() {
  const { t, lang } = useI18n();
  const toast = useToast();
  const [all, setAll] = useState(false);
  const [userRef, setUserRef] = useState('');
  const [suspending, setSuspending] = useState(false);
  const [reinstating, setReinstating] = useState<SuspensionDto | null>(null);
  const list = useQuery({
    queryKey: wsKeys.suspensions(all),
    queryFn: () => api<SuspensionDto[]>(`/api/admin/trust/suspensions?includeEnded=${all}`),
  });
  const suspend = useApiMutation(
    (v: { userId: string; reason: string }) =>
      api(`/api/admin/trust/instructors/${v.userId}/suspend`, {
        method: 'POST',
        body: { reason: v.reason },
      }),
    [['ws', 'suspensions']],
    () => {
      setSuspending(false);
      setUserRef('');
      toast.success(t('workspace.trust.suspended'));
    },
  );
  const reinstate = useApiMutation(
    (v: { userId: string; note: string }) =>
      api(`/api/admin/trust/instructors/${v.userId}/reinstate`, {
        method: 'POST',
        body: { note: v.note },
      }),
    [['ws', 'suspensions']],
    () => {
      setReinstating(null);
      toast.success(t('workspace.trust.reinstated'));
    },
  );
  const userId = extractGuid(userRef);
  return (
    <div className="stack">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          if (userId) setSuspending(true);
        }}
      >
        <Field
          label={t('workspace.trust.instructorId')}
          hint={t('workspace.trust.instructorIdHint')}
        >
          <Input value={userRef} onChange={(e) => setUserRef(e.target.value)} />
        </Field>
        <Button type="submit" variant="danger" disabled={!userId}>
          {t('workspace.trust.suspend')}
        </Button>
      </form>
      <Checkbox
        label={t('workspace.trust.includeEnded')}
        checked={all}
        onChange={(e) => setAll(e.target.checked)}
      />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('workspace.trust.noSuspensions')} />
          ) : (
            <ul className="ws-list">
              {items.map((s) => (
                <li key={s.id} className="card card--flat">
                  <div className="row row--between">
                    <strong>{s.displayName ?? s.userId}</strong>
                    <span className="small muted">{fmtDateTime(s.suspendedAt, lang)}</span>
                  </div>
                  <p className="pre-wrap small">{s.reason}</p>
                  <p className="small muted">
                    {t('workspace.trust.heldEntries', { n: s.heldEntries })}
                  </p>
                  {s.reinstatedAt ? (
                    <Badge tone="success">
                      {t('workspace.trust.reinstatedAt', {
                        date: fmtDateTime(s.reinstatedAt, lang),
                      })}
                    </Badge>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => setReinstating(s)}>
                      {t('workspace.trust.reinstate')}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <NoteDialog
        key={suspending ? `s-${userId}` : 'ns'}
        open={suspending}
        danger
        title={t('workspace.trust.suspend')}
        label={t('workspace.trust.reason')}
        min={5}
        confirm={t('workspace.trust.suspend')}
        pending={suspend.isPending}
        error={suspend.error}
        onClose={() => setSuspending(false)}
        onSubmit={(reason) => userId && suspend.mutate({ userId, reason })}
      >
        <p className="small">{t('workspace.trust.suspendHelp')}</p>
      </NoteDialog>
      <NoteDialog
        key={reinstating?.id ?? 'nr'}
        open={!!reinstating}
        title={t('workspace.trust.reinstate')}
        label={t('workspace.trust.note')}
        min={3}
        confirm={t('workspace.trust.reinstate')}
        pending={reinstate.isPending}
        error={reinstate.error}
        onClose={() => setReinstating(null)}
        onSubmit={(note) => reinstating && reinstate.mutate({ userId: reinstating.userId, note })}
      />
    </div>
  );
}

function AppealsTab() {
  const { t, lang } = useI18n();
  const toast = useToast();
  const [status, setStatus] = useState('Pending');
  const [page, setPage] = useState(1);
  const [deciding, setDeciding] = useState<{
    a: AppealDto;
    decision: 'Uphold' | 'Reinstate';
  } | null>(null);
  const list = useQuery({
    queryKey: wsKeys.appeals(status, page),
    queryFn: () =>
      api<Paged<AppealDto>>(`/api/admin/trust/appeals?status=${status}&page=${page}&pageSize=25`),
  });
  const decide = useApiMutation(
    (v: { id: string; decision: string; note: string }) =>
      api(`/api/admin/trust/appeals/${v.id}/decision`, {
        method: 'POST',
        body: { decision: v.decision, note: v.note },
      }),
    [['ws', 'appeals']],
    () => {
      setDeciding(null);
      toast.success(t('workspace.trust.decided'));
    },
  );
  return (
    <div className="stack">
      <Field label={t('workspace.trust.status')}>
        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          options={['Pending', 'Upheld', 'Reinstated'].map((s) => ({
            value: s,
            label: t(`workspace.appealStatus.${s}`),
          }))}
        />
      </Field>
      <QueryState query={list}>
        {(p) =>
          p.items.length === 0 ? (
            <EmptyState title={t('workspace.trust.noAppeals')} />
          ) : (
            <>
              <ul className="ws-list">
                {p.items.map((a) => (
                  <li key={a.id} className="card card--flat">
                    <div className="row row--between">
                      <strong>
                        {t(`workspace.targets.${a.targetType}`)}{' '}
                        <span className="mono small">{a.targetId}</span>
                      </strong>
                      <AppealStatus status={a.status} />
                    </div>
                    <p className="pre-wrap">{a.reason}</p>
                    <div className="small muted">{fmtDateTime(a.createdAt, lang)}</div>
                    {a.status === 'Pending' ? (
                      <div className="row">
                        <Button size="sm" onClick={() => setDeciding({ a, decision: 'Reinstate' })}>
                          {t('workspace.trust.reinstateContent')}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setDeciding({ a, decision: 'Uphold' })}
                        >
                          {t('workspace.trust.uphold')}
                        </Button>
                      </div>
                    ) : a.decisionNote ? (
                      <p className="small">{a.decisionNote}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
              <Pagination page={p.page} pageSize={p.pageSize} total={p.total} onPage={setPage} />
            </>
          )
        }
      </QueryState>
      <NoteDialog
        key={deciding ? `${deciding.a.id}-${deciding.decision}` : 'nd'}
        open={!!deciding}
        title={
          deciding?.decision === 'Reinstate'
            ? t('workspace.trust.reinstateContent')
            : t('workspace.trust.uphold')
        }
        label={t('workspace.trust.note')}
        min={3}
        confirm={
          deciding?.decision === 'Reinstate'
            ? t('workspace.trust.reinstateContent')
            : t('workspace.trust.uphold')
        }
        pending={decide.isPending}
        error={decide.error}
        onClose={() => setDeciding(null)}
        onSubmit={(note) =>
          deciding && decide.mutate({ id: deciding.a.id, decision: deciding.decision, note })
        }
      />
    </div>
  );
}

export function TrustConsolePage() {
  const { t } = useI18n();
  usePageMeta(t('workspace.trust.title'), undefined, { noindex: true });
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? 'complaints';
  return (
    <>
      <PageHeader title={t('workspace.trust.title')} />
      <Tabs
        label={t('workspace.trust.title')}
        value={tab}
        onChange={(v) => setParams({ tab: v }, { replace: true })}
        tabs={[
          { id: 'complaints', label: t('workspace.trust.complaints'), content: <ComplaintsTab /> },
          { id: 'holds', label: t('workspace.trust.holds'), content: <HoldsTab /> },
          {
            id: 'suspensions',
            label: t('workspace.trust.suspensions'),
            content: <SuspensionsTab />,
          },
          { id: 'appeals', label: t('workspace.trust.appeals'), content: <AppealsTab /> },
        ]}
      />
    </>
  );
}

// ---------- staff: operations ----------
function BrokenLinksTab() {
  const { t, lang } = useI18n();
  const toast = useToast();
  const list = useQuery({
    queryKey: wsKeys.brokenLinks,
    queryFn: () => api<BrokenLinkDto[]>('/api/admin/operations/broken-links'),
  });
  const notify = useApiMutation(
    (id: string) =>
      api<{ coursesNotified: number; recipients: number }>(
        `/api/admin/operations/broken-links/${id}/notify`,
        { method: 'POST' },
      ),
    [wsKeys.brokenLinks],
    (r) =>
      toast.success(
        t('workspace.ops.notified', { courses: r.coursesNotified, people: r.recipients }),
      ),
  );
  return (
    <QueryState query={list}>
      {(items) =>
        items.length === 0 ? (
          <EmptyState title={t('workspace.ops.noBroken')} />
        ) : (
          <ul className="ws-list">
            {items.map((b) => (
              <li key={b.videoAssetId} className="card card--flat" aria-label={b.title}>
                <div className="row row--between">
                  <strong>{b.title}</strong>
                  <Badge tone="danger">{b.status}</Badge>
                </div>
                <div className="small muted">
                  <span className="mono">{b.youTubeVideoId}</span>
                  {b.statusReason ? ` · ${b.statusReason}` : ''}
                  {b.lastCheckedAt
                    ? ` · ${t('workspace.ops.checked', { date: fmtDateTime(b.lastCheckedAt, lang) })}`
                    : ''}
                </div>
                <ul className="small">
                  {b.courses.map((c) => (
                    <li key={c.courseId}>
                      <Link to={`/courses/${c.slug}`}>{c.title}</Link> (v{c.version}):{' '}
                      {c.lessons.map((l) => l.title).join(', ')}
                    </li>
                  ))}
                </ul>
                <div className="row">
                  <Button
                    size="sm"
                    loading={notify.isPending && notify.variables === b.videoAssetId}
                    onClick={() =>
                      notify.mutate(b.videoAssetId, { onError: (e) => toast.error(wsError(e, t)) })
                    }
                  >
                    {t('workspace.ops.notify')}
                  </Button>
                  <span className="small muted">
                    {b.lastNotifiedAt
                      ? t('workspace.ops.lastNotified', {
                          date: fmtDateTime(b.lastNotifiedAt, lang),
                        })
                      : t('workspace.ops.neverNotified')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )
      }
    </QueryState>
  );
}

function OverdueTab() {
  const { t, fmtDate } = useI18n();
  const [months, setMonths] = useState(12);
  const list = useQuery({
    queryKey: wsKeys.overdue(months),
    queryFn: () =>
      api<OverdueCourseDto[]>(`/api/admin/operations/overdue-content?months=${months}`),
  });
  return (
    <div className="stack">
      <Field label={t('workspace.ops.months')}>
        <Input
          type="number"
          min={1}
          max={120}
          value={months}
          onChange={(e) => setMonths(Math.min(120, Math.max(1, Number(e.target.value) || 1)))}
        />
      </Field>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('workspace.ops.noOverdue')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('workspace.ops.course')}</th>
                    <th scope="col">{t('workspace.ops.owner')}</th>
                    <th scope="col">{t('workspace.ops.lastPublished')}</th>
                    <th scope="col">{t('workspace.ops.monthsAgo')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((c) => (
                    <tr key={c.courseId}>
                      <td>
                        <Link to={`/courses/${c.slug}`}>{c.title}</Link>
                      </td>
                      <td>{c.ownerName ?? '—'}</td>
                      <td>{fmtDate(c.lastPublishedAt)}</td>
                      <td>{c.monthsSincePublish}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
    </div>
  );
}

function HealthTab() {
  const { t } = useI18n();
  const health = useQuery({
    queryKey: wsKeys.health,
    queryFn: fetchHealth,
    refetchInterval: 30_000,
  });
  const tone = (s: string) =>
    s === 'Healthy' ? 'success' : s === 'Degraded' ? 'warning' : 'danger';
  return (
    <QueryState query={health}>
      {(h) => (
        <div className="stack">
          <p>
            {t('workspace.ops.overall')}: <Badge tone={tone(h.status)}>{h.status}</Badge>
            {h.totalDurationMs != null ? (
              <span className="small muted"> · {h.totalDurationMs} ms</span>
            ) : null}
          </p>
          {(h.checks ?? []).length === 0 ? (
            <p className="muted">{t('workspace.ops.noDetail')}</p>
          ) : (
            <ul className="ws-list">
              {(h.checks ?? []).map((c) => (
                <li key={c.name} className="card card--flat">
                  <div className="row row--between">
                    <strong className="mono">{c.name}</strong>
                    <Badge tone={tone(c.status)}>{c.status}</Badge>
                  </div>
                  {c.description ? <p className="small">{c.description}</p> : null}
                  <div className="small muted">{c.durationMs} ms</div>
                  {c.data ? <pre className="ws-pre">{JSON.stringify(c.data, null, 2)}</pre> : null}
                </li>
              ))}
            </ul>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => void health.refetch()}
            loading={health.isFetching}
          >
            {t('common.retry')}
          </Button>
        </div>
      )}
    </QueryState>
  );
}

export function OperationsPage() {
  const { t } = useI18n();
  usePageMeta(t('workspace.ops.title'), undefined, { noindex: true });
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? 'broken';
  return (
    <>
      <PageHeader title={t('workspace.ops.title')} />
      <Tabs
        label={t('workspace.ops.title')}
        value={tab}
        onChange={(v) => setParams({ tab: v }, { replace: true })}
        tabs={[
          { id: 'broken', label: t('workspace.ops.broken'), content: <BrokenLinksTab /> },
          { id: 'overdue', label: t('workspace.ops.overdue'), content: <OverdueTab /> },
          { id: 'health', label: t('workspace.ops.health'), content: <HealthTab /> },
        ]}
      />
    </>
  );
}
