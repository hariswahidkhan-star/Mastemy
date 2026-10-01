import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, qs } from '../../api/client';
import { keys, useApiMutation, useChannels } from '../../api/hooks';
import { asList } from '../../api/list';
import { ROLES } from '../../api/types';
import type {
  AdminUserDto,
  ApplicationStatus,
  AuditEntry,
  InstructorApplicationDto,
  PackageDto,
  Paged,
  PlatformSettings,
  RefundDto,
  Role,
  VideoAssetDto,
  VideoStatus,
  YouTubeChannelDto,
} from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import {
  Badge,
  Notice,
  PageHeader,
  Pagination,
  QueryState,
  StatusBadge,
} from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { splitLines } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { youtubeWatchUrl } from '../../lib/youtube';

// ---------------- Settings ----------------
export function SettingsPage() {
  const { t } = useI18n();
  const { hasRole } = useAuth();
  const toast = useToast();
  usePageMeta(t('admin.section.settings'), undefined, { noindex: true });
  const canEdit = hasRole('SuperAdmin');
  const settings = useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: () => api<PlatformSettings>('/api/admin/settings'),
  });
  const [pending, setPending] = useState<{ key: string; value: boolean } | null>(null);
  const save = useApiMutation(
    (p: { key: string; value: boolean }) =>
      api(`/api/admin/settings/${encodeURIComponent(p.key)}`, {
        method: 'PUT',
        body: { value: p.value },
      }),
    [['admin', 'settings'], ['onboarding']],
    () => {
      setPending(null);
      toast.success(t('settings.saved'));
    },
  );
  const describe = (key: string) => {
    const k = `flags.${key}`;
    const v = t(k);
    return v === k ? t('flags.unknown') : v;
  };
  return (
    <>
      <PageHeader title={t('admin.section.settings')} subtitle={t('settings.subtitle')} />
      {!canEdit ? <Notice tone="info">{t('settings.readOnly')}</Notice> : null}
      <QueryState query={settings}>
        {(s) =>
          Object.keys(s).length === 0 ? (
            <EmptyState title={t('settings.none')} />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {Object.entries(s).map(([key, value]) => (
                <li key={key} className="card card--flat">
                  <div className="row row--between">
                    <div style={{ flex: 1, minInlineSize: 220 }}>
                      <h2 className="mono" style={{ fontSize: 'var(--text-md)' }}>
                        {key}
                      </h2>
                      <p className="small muted" style={{ margin: 0 }}>
                        {describe(key)}
                      </p>
                    </div>
                    <div className="row">
                      <Badge tone={value ? 'success' : 'neutral'}>
                        {value ? t('settings.on') : t('settings.off')}
                      </Badge>
                      <Button
                        size="sm"
                        variant={value ? 'secondary' : 'primary'}
                        disabled={!canEdit}
                        onClick={() => setPending({ key, value: !value })}
                        aria-label={t(value ? 'settings.disableFlag' : 'settings.enableFlag', {
                          key,
                        })}
                      >
                        {value ? t('settings.disable') : t('settings.enable')}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <ConfirmDialog
        open={!!pending}
        danger={pending?.value === false}
        title={t('settings.confirmTitle', { key: pending?.key ?? '' })}
        body={
          <>
            <p>
              {pending
                ? pending.value
                  ? t('settings.confirmEnable')
                  : t('settings.confirmDisable')
                : null}
            </p>
            <p className="small muted">{t('settings.audited')}</p>
            {save.isError ? <Notice tone="danger">{errorMessage(save.error, t)}</Notice> : null}
          </>
        }
        confirmLabel={pending?.value ? t('settings.enable') : t('settings.disable')}
        loading={save.isPending}
        onCancel={() => setPending(null)}
        onConfirm={() => pending && save.mutate(pending)}
      />
    </>
  );
}

// ---------------- Users & roles ----------------
export function UsersPage() {
  const { t } = useI18n();
  const { hasRole, user: me } = useAuth();
  const toast = useToast();
  usePageMeta(t('admin.section.users'), undefined, { noindex: true });
  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<{ user: AdminUserDto; roles: Role[] } | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<AdminUserDto | null>(null);
  const key = ['admin', 'users', search, page];
  const users = useQuery({
    queryKey: key,
    queryFn: () => api<Paged<AdminUserDto>>(`/api/admin/users${qs({ q: search, page })}`),
    placeholderData: (p) => p,
  });
  const isSuper = hasRole('SuperAdmin');
  const canAssign = hasRole('Admin', 'SuperAdmin');
  const privileged: Role[] = ['Admin', 'SuperAdmin', 'Finance'];
  const saveRoles = useApiMutation(
    (e: { id: string; roles: Role[] }) =>
      api(`/api/admin/users/${e.id}/roles`, { method: 'PUT', body: { roles: e.roles } }),
    [['admin', 'users']],
    () => {
      setEditing(null);
      toast.success(t('users.rolesSaved'));
    },
  );
  const suspend = useApiMutation(
    (u: AdminUserDto) =>
      api(`/api/admin/users/${u.id}/suspend`, {
        method: 'PUT',
        body: { suspended: !u.isSuspended },
      }),
    [['admin', 'users']],
    () => setSuspendTarget(null),
  );
  return (
    <>
      <PageHeader title={t('admin.section.users')} subtitle={t('users.subtitle')} />
      <form
        className="row"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setSearch(q.trim());
        }}
      >
        <Field label={t('users.search')} className="grow">
          <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} />
        </Field>
        <Button type="submit">{t('courses.searchButton')}</Button>
      </form>
      <QueryState query={users}>
        {(d) =>
          d.items.length === 0 ? (
            <EmptyState title={t('users.none')} />
          ) : (
            <>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('auth.displayName')}</th>
                      <th scope="col">{t('auth.email')}</th>
                      <th scope="col">{t('users.roles')}</th>
                      <th scope="col">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.items.map((u) => (
                      <tr key={u.id}>
                        <td>
                          {u.displayName}{' '}
                          {u.isSuspended ? <StatusBadge status="Restricted" /> : null}
                        </td>
                        <td>{u.email}</td>
                        <td>{u.roles.map((r) => t(`role.${r}`)).join(', ') || '—'}</td>
                        <td>
                          <div className="row">
                            {canAssign ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditing({ user: u, roles: [...u.roles] })}
                              >
                                {t('users.editRoles')}
                              </Button>
                            ) : null}
                            {canAssign && u.id !== me?.id ? (
                              <Button size="sm" variant="ghost" onClick={() => setSuspendTarget(u)}>
                                {u.isSuspended ? t('users.unsuspend') : t('users.suspend')}
                              </Button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination page={d.page} pageSize={d.pageSize} total={d.total} onPage={setPage} />
            </>
          )
        }
      </QueryState>
      <Dialog
        open={!!editing}
        title={t('users.editRolesFor', { name: editing?.user.displayName ?? '' })}
        onClose={() => setEditing(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={saveRoles.isPending}
              onClick={() =>
                editing && saveRoles.mutate({ id: editing.user.id, roles: editing.roles })
              }
            >
              {t('common.save')}
            </Button>
          </>
        }
      >
        {editing ? (
          <fieldset style={{ border: 'none', padding: 0 }}>
            <legend className="visually-hidden">{t('users.roles')}</legend>
            {ROLES.map((r) => {
              const locked =
                (!isSuper && privileged.includes(r)) ||
                (r === 'SuperAdmin' && editing.user.id === me?.id);
              return (
                <Checkbox
                  key={r}
                  label={t(`role.${r}`)}
                  hint={locked ? t('users.lockedRole') : undefined}
                  checked={editing.roles.includes(r)}
                  disabled={locked}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      roles: e.target.checked
                        ? [...editing.roles, r]
                        : editing.roles.filter((x) => x !== r),
                    })
                  }
                />
              );
            })}
          </fieldset>
        ) : null}
        {saveRoles.isError ? (
          <Notice tone="danger">{errorMessage(saveRoles.error, t)}</Notice>
        ) : null}
      </Dialog>
      <ConfirmDialog
        open={!!suspendTarget}
        danger={!suspendTarget?.isSuspended}
        title={suspendTarget?.isSuspended ? t('users.unsuspend') : t('users.suspend')}
        body={
          <>
            <p>
              {t(suspendTarget?.isSuspended ? 'users.unsuspendBody' : 'users.suspendBody', {
                name: suspendTarget?.displayName ?? '',
              })}
            </p>
            {suspend.isError ? (
              <Notice tone="danger">{errorMessage(suspend.error, t)}</Notice>
            ) : null}
          </>
        }
        confirmLabel={suspendTarget?.isSuspended ? t('users.unsuspend') : t('users.suspend')}
        loading={suspend.isPending}
        onCancel={() => setSuspendTarget(null)}
        onConfirm={() => suspendTarget && suspend.mutate(suspendTarget)}
      />
    </>
  );
}

// ---------------- Instructor applications + invitations ----------------
const APP_STATUSES: ApplicationStatus[] = [
  'Submitted',
  'InReview',
  'ChangesRequested',
  'Approved',
  'Rejected',
];

export function ApplicationsPage() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  usePageMeta(t('admin.section.applications'), undefined, { noindex: true });
  const [status, setStatus] = useState<ApplicationStatus>('Submitted');
  const [open, setOpen] = useState<InstructorApplicationDto | null>(null);
  const [decision, setDecision] = useState<'Approve' | 'Reject' | 'RequestChanges'>('Approve');
  const [notes, setNotes] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const apps = useQuery({
    queryKey: ['admin', 'applications', status],
    queryFn: () =>
      api<InstructorApplicationDto[] | Paged<InstructorApplicationDto>>(
        `/api/admin/instructor-applications${qs({ status })}`,
      ),
    select: asList,
  });
  const decide = useApiMutation(
    () =>
      api(`/api/admin/instructor-applications/${open?.id}/decision`, {
        method: 'POST',
        body: { decision, notes },
      }),
    [['admin', 'applications']],
    () => {
      setOpen(null);
      setNotes('');
      toast.success(t('review.decided'));
    },
  );
  const invite = useApiMutation(
    () =>
      api<{ code: string }>('/api/admin/instructor-invitations', {
        method: 'POST',
        body: { email: inviteEmail.trim() },
      }),
    [],
    (r) => {
      setInviteCode(r.code);
      setInviteEmail('');
    },
  );
  return (
    <>
      <PageHeader title={t('admin.section.applications')} subtitle={t('applications.subtitle')} />
      <section className="card card--flat" style={{ marginBlockEnd: 'var(--space-5)' }}>
        <h2>{t('applications.inviteTitle')}</h2>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            if (/^\S+@\S+\.\S+$/.test(inviteEmail.trim())) invite.mutate(undefined);
          }}
        >
          <Field label={t('auth.email')} className="grow">
            <Input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </Field>
          <Button
            type="submit"
            loading={invite.isPending}
            disabled={!/^\S+@\S+\.\S+$/.test(inviteEmail.trim())}
          >
            {t('applications.invite')}
          </Button>
        </form>
        {invite.isError ? <Notice tone="danger">{errorMessage(invite.error, t)}</Notice> : null}
        {inviteCode ? (
          <Notice tone="success" title={t('applications.codeTitle')}>
            <p className="mono" style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
              {inviteCode}
            </p>
            <p className="small" style={{ margin: 0 }}>
              {t('applications.codeOnce')}
            </p>
          </Notice>
        ) : null}
      </section>
      <Field label={t('dashboard.status')}>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          options={APP_STATUSES.map((s) => ({ value: s, label: t(`status.${s}`) }))}
        />
      </Field>
      <QueryState query={apps}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('applications.none')} />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((a) => (
                <li key={a.id} className="card card--flat">
                  <div className="row row--between">
                    <div>
                      <strong>{a.applicantName ?? a.applicantEmail ?? a.userId}</strong> —{' '}
                      {a.headline}
                      <div className="small muted">{fmtDate(a.createdAt)}</div>
                    </div>
                    <div className="row">
                      <StatusBadge status={a.status} />
                      <Button size="sm" variant="secondary" onClick={() => setOpen(a)}>
                        {t('review.open')}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <Dialog
        open={!!open}
        wide
        title={open?.headline ?? ''}
        onClose={() => setOpen(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(null)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={decide.isPending}
              disabled={decision !== 'Approve' && !notes.trim()}
              onClick={() => decide.mutate(undefined)}
            >
              {t('review.recordDecision')}
            </Button>
          </>
        }
      >
        {open ? (
          <div className="stack">
            <dl className="kv">
              <dt>{t('teach.bio')}</dt>
              <dd style={{ whiteSpace: 'pre-wrap' }}>{open.bio}</dd>
              <dt>{t('teach.evidence')}</dt>
              <dd style={{ whiteSpace: 'pre-wrap' }}>{open.expertiseEvidence}</dd>
              <dt>{t('teach.testVideo')}</dt>
              <dd>
                <a href={open.testVideoUrl} target="_blank" rel="noopener noreferrer">
                  {open.testVideoUrl}
                </a>
              </dd>
            </dl>
            <Field label={t('applications.decision')}>
              <Select
                value={decision}
                onChange={(e) => setDecision(e.target.value as typeof decision)}
                options={[
                  { value: 'Approve', label: t('applications.approve') },
                  { value: 'RequestChanges', label: t('review.requestChanges') },
                  { value: 'Reject', label: t('applications.reject') },
                ]}
              />
            </Field>
            <Field
              label={t('review.notes')}
              hint={decision !== 'Approve' ? t('review.notesRequired') : undefined}
            >
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
            {decide.isError ? <Notice tone="danger">{errorMessage(decide.error, t)}</Notice> : null}
          </div>
        ) : null}
      </Dialog>
    </>
  );
}

// ---------------- Package approvals ----------------
export function PackagesApprovalPage() {
  const { t, fmtMoney } = useI18n();
  const toast = useToast();
  usePageMeta(t('admin.section.packages'), undefined, { noindex: true });
  const list = useQuery({
    queryKey: ['admin', 'packages'],
    queryFn: () => api<PackageDto[] | Paged<PackageDto>>('/api/admin/packages?status=Proposed'),
    select: asList,
  });
  const [pending, setPending] = useState<{
    pkg: PackageDto;
    decision: 'Approve' | 'Reject';
  } | null>(null);
  const decide = useApiMutation(
    (p: { pkg: PackageDto; decision: string }) =>
      api(`/api/admin/packages/${p.pkg.id}/decision`, {
        method: 'POST',
        body: { decision: p.decision },
      }),
    [['admin', 'packages']],
    () => {
      setPending(null);
      toast.success(t('review.decided'));
    },
  );
  return (
    <>
      <PageHeader title={t('admin.section.packages')} subtitle={t('packagesAdmin.subtitle')} />
      <Notice tone="info">{t('packagesAdmin.checklist')}</Notice>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('packagesAdmin.none')} />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {items.map((p) => (
                <li key={p.id} className="card card--flat">
                  <div className="row row--between">
                    <div>
                      <strong>{p.title}</strong>{' '}
                      {p.courseTitle ? <span className="muted">· {p.courseTitle}</span> : null}
                      <div className="small">
                        {fmtMoney(p.price, p.currency)} ·{' '}
                        {t('course.accessTerm', { days: p.accessDays })}
                      </div>
                    </div>
                    {p.approvalStatus ? <StatusBadge status={p.approvalStatus} /> : null}
                  </div>
                  <ul className="check-list small">
                    {splitLines(p.contents).map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <div className="row">
                    <Button size="sm" onClick={() => setPending({ pkg: p, decision: 'Approve' })}>
                      {t('applications.approve')}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPending({ pkg: p, decision: 'Reject' })}
                    >
                      {t('applications.reject')}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <ConfirmDialog
        open={!!pending}
        danger={pending?.decision === 'Reject'}
        title={
          pending?.decision === 'Approve' ? t('applications.approve') : t('applications.reject')
        }
        body={
          <>
            <p>{t('packagesAdmin.confirm', { title: pending?.pkg.title ?? '' })}</p>
            {decide.isError ? <Notice tone="danger">{errorMessage(decide.error, t)}</Notice> : null}
          </>
        }
        confirmLabel={t('review.recordDecision')}
        loading={decide.isPending}
        onCancel={() => setPending(null)}
        onConfirm={() => pending && decide.mutate(pending)}
      />
    </>
  );
}

// ---------------- Refunds ----------------
export function RefundsPage() {
  const { t, fmtDate, fmtMoney } = useI18n();
  const toast = useToast();
  usePageMeta(t('admin.section.refunds'), undefined, { noindex: true });
  const list = useQuery({
    queryKey: ['admin', 'refunds'],
    queryFn: () => api<RefundDto[] | Paged<RefundDto>>('/api/admin/refunds'),
    select: asList,
  });
  const [pending, setPending] = useState<{ r: RefundDto; decision: 'Approve' | 'Reject' } | null>(
    null,
  );
  const decide = useApiMutation(
    (p: { r: RefundDto; decision: string }) =>
      api(`/api/admin/refunds/${p.r.id}/decision`, {
        method: 'POST',
        body: { decision: p.decision },
      }),
    [['admin', 'refunds']],
    () => {
      setPending(null);
      toast.success(t('review.decided'));
    },
  );
  return (
    <>
      <PageHeader title={t('admin.section.refunds')} subtitle={t('refunds.subtitle')} />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('refunds.none')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('dashboard.date')}</th>
                    <th scope="col">{t('refunds.order')}</th>
                    <th scope="col">{t('refunds.amount')}</th>
                    <th scope="col">{t('refunds.reason')}</th>
                    <th scope="col">{t('dashboard.status')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((r) => (
                    <tr key={r.id}>
                      <td>{fmtDate(r.createdAt)}</td>
                      <td className="mono small">{r.orderId}</td>
                      <td>{fmtMoney(r.amount, r.currency ?? 'USD')}</td>
                      <td>{r.reason}</td>
                      <td>
                        <StatusBadge status={r.status} />
                      </td>
                      <td>
                        {r.status === 'Requested' ? (
                          <div className="row">
                            <Button
                              size="sm"
                              onClick={() => setPending({ r, decision: 'Approve' })}
                            >
                              {t('applications.approve')}
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setPending({ r, decision: 'Reject' })}
                            >
                              {t('applications.reject')}
                            </Button>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
      <ConfirmDialog
        open={!!pending}
        danger={pending?.decision === 'Approve'}
        title={
          pending?.decision === 'Approve' ? t('refunds.approveTitle') : t('refunds.rejectTitle')
        }
        body={
          <>
            <p>
              {pending?.decision === 'Approve' ? t('refunds.approveBody') : t('refunds.rejectBody')}
            </p>
            {decide.isError ? <Notice tone="danger">{errorMessage(decide.error, t)}</Notice> : null}
          </>
        }
        confirmLabel={t('review.recordDecision')}
        loading={decide.isPending}
        onCancel={() => setPending(null)}
        onConfirm={() => pending && decide.mutate(pending)}
      />
    </>
  );
}

// ---------------- YouTube videos ----------------
const VIDEO_STATUSES: VideoStatus[] = [
  'Draft',
  'AwaitingApproval',
  'AwaitingSourceFile',
  'Uploading',
  'Processing',
  'InContentReview',
  'Ready',
  'Restricted',
  'Failed',
];

function ChannelsSection() {
  const { t } = useI18n();
  const toast = useToast();
  const channels = useChannels();
  const [draft, setDraft] = useState({ channelId: '', title: '' });
  const valid = /^UC[A-Za-z0-9_-]{22}$/.test(draft.channelId.trim()) && !!draft.title.trim();
  const create = useApiMutation(
    () =>
      api<YouTubeChannelDto>('/api/admin/youtube/channels', {
        method: 'POST',
        body: {
          channelId: draft.channelId.trim(),
          title: draft.title.trim(),
          mode: 'MastemyManaged',
        },
      }),
    [keys.channels],
    () => {
      setDraft({ channelId: '', title: '' });
      toast.success(t('channels.created'));
    },
  );
  return (
    <section className="card card--flat" style={{ marginBlockEnd: 'var(--space-5)' }}>
      <h2>{t('channels.title')}</h2>
      <p className="small muted">{t('channels.help')}</p>
      {channels.data && channels.data.length > 0 ? (
        <ul>
          {channels.data.map((c) => (
            <li key={c.id}>
              {c.title} <span className="mono small">{c.channelId}</span> ·{' '}
              {t(`channelMode.${c.mode}`)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">{t('channels.none')}</p>
      )}
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) create.mutate(undefined);
        }}
      >
        <Field label={t('channels.channelId')} hint={t('channels.channelIdHint')} className="grow">
          <Input
            value={draft.channelId}
            onChange={(e) => setDraft({ ...draft, channelId: e.target.value })}
          />
        </Field>
        <Field label={t('channels.name')} className="grow">
          <Input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            maxLength={200}
          />
        </Field>
        <Button type="submit" loading={create.isPending} disabled={!valid}>
          {t('channels.add')}
        </Button>
      </form>
      {create.isError ? <Notice tone="danger">{errorMessage(create.error, t)}</Notice> : null}
    </section>
  );
}

export function VideosPage() {
  const { t, fmtDate } = useI18n();
  const { hasRole } = useAuth();
  const toast = useToast();
  usePageMeta(t('admin.section.videos'), undefined, { noindex: true });
  const [status, setStatus] = useState('');
  const [rejecting, setRejecting] = useState<{ video: VideoAssetDto; reason: string } | null>(null);
  const list = useQuery({
    queryKey: ['admin', 'videos', status],
    queryFn: () =>
      api<VideoAssetDto[] | Paged<VideoAssetDto>>(`/api/admin/youtube/videos${qs({ status })}`),
    select: asList,
  });
  const confirm = useApiMutation(
    (p: { id: string; approve: boolean; reason?: string }) =>
      api<VideoAssetDto>(`/api/admin/youtube/videos/${p.id}/confirm`, {
        method: 'POST',
        body: { approve: p.approve, reason: p.reason },
      }),
    [['admin', 'videos']],
    (v) => {
      setRejecting(null);
      toast.success(t('video.linked', { status: t(`status.${v.status}`) }));
    },
  );
  return (
    <>
      <PageHeader title={t('admin.section.videos')} subtitle={t('videos.subtitle')} />
      {hasRole('Admin', 'SuperAdmin') ? <ChannelsSection /> : null}
      {confirm.isError && !rejecting ? (
        <Notice tone="danger">{errorMessage(confirm.error, t)}</Notice>
      ) : null}
      <Field label={t('dashboard.status')}>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder={t('videos.all')}
          options={VIDEO_STATUSES.map((s) => ({ value: s, label: t(`status.${s}`) }))}
        />
      </Field>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('videos.none')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('video.title')}</th>
                    <th scope="col">{t('playlist.videoId')}</th>
                    <th scope="col">{t('dashboard.status')}</th>
                    <th scope="col">{t('video.statusReason')}</th>
                    <th scope="col">{t('video.lastChecked')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((v) => (
                    <tr key={v.id}>
                      <td>
                        {v.title}
                        {v.courseTitle ? <div className="small muted">{v.courseTitle}</div> : null}
                      </td>
                      <td className="mono small">
                        <a
                          href={youtubeWatchUrl(v.youTubeVideoId)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {v.youTubeVideoId}
                        </a>
                      </td>
                      <td>
                        <StatusBadge status={v.status} />
                      </td>
                      <td className="small">{v.statusReason ?? '—'}</td>
                      <td>{v.lastCheckedAt ? fmtDate(v.lastCheckedAt) : '—'}</td>
                      <td>
                        {v.status === 'InContentReview' ? (
                          <div className="row">
                            <Button
                              size="sm"
                              loading={confirm.isPending}
                              onClick={() => confirm.mutate({ id: v.id, approve: true })}
                              aria-label={t('videos.confirmFor', { title: v.title })}
                            >
                              {t('videos.confirm')}
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setRejecting({ video: v, reason: '' })}
                            >
                              {t('applications.reject')}
                            </Button>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
      <ConfirmDialog
        open={!!rejecting}
        danger
        title={t('videos.rejectTitle')}
        body={
          rejecting ? (
            <>
              <Field label={t('review.notes')} hint={t('review.notesRequired')}>
                <Textarea
                  value={rejecting.reason}
                  onChange={(e) => setRejecting({ ...rejecting, reason: e.target.value })}
                />
              </Field>
              {confirm.isError ? (
                <Notice tone="danger">{errorMessage(confirm.error, t)}</Notice>
              ) : null}
            </>
          ) : null
        }
        confirmLabel={t('review.recordDecision')}
        loading={confirm.isPending}
        onCancel={() => setRejecting(null)}
        onConfirm={() =>
          rejecting?.reason.trim() &&
          confirm.mutate({
            id: rejecting.video.id,
            approve: false,
            reason: rejecting.reason.trim(),
          })
        }
      />
    </>
  );
}

// ---------------- Audit ----------------
export function AuditPage() {
  const { t } = useI18n();
  usePageMeta(t('admin.section.audit'), undefined, { noindex: true });
  const [entityType, setEntityType] = useState('');
  const [applied, setApplied] = useState('');
  const [page, setPage] = useState(1);
  const list = useQuery({
    queryKey: ['admin', 'audit', applied, page],
    queryFn: () => api<Paged<AuditEntry>>(`/api/admin/audit${qs({ entityType: applied, page })}`),
    placeholderData: (p) => p,
  });
  const fmt = (iso: string) => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
  };
  return (
    <>
      <PageHeader title={t('admin.section.audit')} subtitle={t('audit.subtitle')} />
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setApplied(entityType.trim());
        }}
      >
        <Field label={t('audit.entityType')} className="grow">
          <Input
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            placeholder="Course"
          />
        </Field>
        <Button type="submit">{t('audit.filter')}</Button>
      </form>
      <QueryState query={list}>
        {(d) =>
          d.items.length === 0 ? (
            <EmptyState title={t('audit.none')} />
          ) : (
            <>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('audit.when')}</th>
                      <th scope="col">{t('audit.action')}</th>
                      <th scope="col">{t('audit.entity')}</th>
                      <th scope="col">{t('audit.actor')}</th>
                      <th scope="col">{t('audit.details')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.items.map((a) => (
                      <tr key={a.id}>
                        <td className="small">{fmt(a.createdAt)}</td>
                        <td>{a.action}</td>
                        <td className="small">
                          {a.entityType} <span className="mono">{a.entityId}</span>
                        </td>
                        <td className="mono small">{a.actorId ?? '—'}</td>
                        <td className="small" style={{ overflowWrap: 'anywhere' }}>
                          {a.details ?? ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination page={d.page} pageSize={d.pageSize} total={d.total} onPage={setPage} />
            </>
          )
        }
      </QueryState>
    </>
  );
}
