import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError, downloadFile } from '../../api/client';
import { useApiMutation, useCourses } from '../../api/hooks';
import { ORG_ROLES, useMyOrgs, w2keys } from '../../api/wave2';
import type {
  AcceptedInvitationDto,
  AssignmentDto,
  BulkInviteResultDto,
  BulkPreviewDto,
  InvitationCreatedDto,
  InvitationDto,
  MemberDto,
  OrgDto,
  ProgressRowDto,
} from '../../api/wave2';
import { useAuth } from '../../auth/AuthProvider';
import { Button, ButtonLink } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { finalbOrgTabs } from '../finalb/OrgTabs';

const STAFF = ['Admin', 'SuperAdmin'] as const;

/** Enterprise problem codes with dedicated, translated explanations. */
const ORG_CODES = [
  'last_admin',
  'already_member',
  'seat_limit_reached',
  'seat_limit_below_usage',
  'slug_taken',
  'duplicate_assignment',
  'invalid_rows',
  'invalid_due_date',
  'invalid_email',
  'invitation_used',
  'invitation_expired',
  'org_inactive',
  'premium_scope_requires_admin',
] as const;

export function orgErrorMessage(e: unknown, t: TFunction): string {
  if (e instanceof ApiError) {
    const code = ORG_CODES.find((c) => e.is(c));
    if (code) return t(`orgs.err.${code}`);
  }
  return errorMessage(e, t);
}

// ---------- /orgs ----------

export function MyOrgsPage() {
  const { t } = useI18n();
  const { hasRole } = useAuth();
  const orgs = useMyOrgs();
  usePageMeta(t('orgs.title'), undefined, { noindex: true });
  return (
    <div className="container page">
      <PageHeader
        title={t('orgs.title')}
        subtitle={t('orgs.subtitle')}
        actions={
          hasRole(...STAFF) ? (
            <ButtonLink to="/admin/orgs" variant="secondary" size="sm">
              {t('orgs.adminAll')}
            </ButtonLink>
          ) : null
        }
      />
      <QueryState query={orgs}>
        {(list) => {
          const managed = list.filter((o) => o.role === 'Admin' || o.role === 'Manager');
          return managed.length === 0 ? (
            <EmptyState
              title={t('orgs.noneManaged')}
              description={t('orgs.noneManagedBody')}
              action={{ label: t('nav.dashboard'), to: '/me' }}
            />
          ) : (
            <ul className="grid" style={{ listStyle: 'none', padding: 0 }}>
              {managed.map((o) => (
                <li key={o.id} className="card">
                  <h2 style={{ marginBlockStart: 0 }}>
                    <Link to={`/orgs/${o.id}`}>{o.name}</Link>
                  </h2>
                  <p className="row">
                    <Badge>{t(`orgs.role.${o.role}`)}</Badge>
                    <span className="small muted mono">{o.slug}</span>
                  </p>
                  <p className="small">{t('orgs.assignmentCount', { n: o.assignments.length })}</p>
                </li>
              ))}
            </ul>
          );
        }}
      </QueryState>
    </div>
  );
}

// ---------- Members ----------

function MemberRow({
  orgId,
  m,
  canManageRoles,
  onChanged,
}: {
  orgId: string;
  m: MemberDto;
  canManageRoles: boolean;
  onChanged: () => void;
}) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [role, setRole] = useState(m.role);
  const [department, setDepartment] = useState(m.department);
  const [confirm, setConfirm] = useState(false);
  const dirty = role !== m.role || department !== m.department;
  const save = useApiMutation(
    () =>
      api<MemberDto>(`/api/orgs/${orgId}/members/${m.userId}`, {
        method: 'PATCH',
        body: { role: role !== m.role ? role : undefined, department },
      }),
    [],
    () => {
      toast.success(t('common.saved'));
      onChanged();
    },
  );
  const remove = useApiMutation(
    () => api(`/api/orgs/${orgId}/members/${m.userId}`, { method: 'DELETE' }),
    [],
    () => {
      setConfirm(false);
      toast.success(t('orgs.memberRemoved'));
      onChanged();
    },
  );
  return (
    <tr>
      <td>
        <strong>{m.displayName}</strong>
        <div className="small muted">{m.email ?? t('orgs.emailHidden')}</div>
      </td>
      <td>
        <Select
          aria-label={t('orgs.roleFor', { name: m.displayName })}
          value={role}
          disabled={!canManageRoles && m.role !== 'Member'}
          onChange={(e) => setRole(e.target.value)}
          options={ORG_ROLES.filter((r) => canManageRoles || r === 'Member' || r === m.role).map(
            (r) => ({ value: r, label: t(`orgs.role.${r}`) }),
          )}
        />
      </td>
      <td>
        <Input
          aria-label={t('orgs.departmentFor', { name: m.displayName })}
          value={department}
          maxLength={100}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </td>
      <td>{fmtDate(m.joinedAt)}</td>
      <td>
        <div className="row">
          <Button
            size="sm"
            variant="secondary"
            disabled={!dirty}
            loading={save.isPending}
            onClick={() => save.mutate(undefined)}
          >
            {t('common.save')}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setConfirm(true)}>
            {t('common.remove')}
          </Button>
        </div>
        {save.isError ? (
          <p className="field__error" role="alert">
            {orgErrorMessage(save.error, t)}
          </p>
        ) : null}
        <ConfirmDialog
          open={confirm}
          danger
          title={t('orgs.removeTitle')}
          body={
            <>
              <p>{t('orgs.removeBody', { name: m.displayName })}</p>
              {remove.isError ? (
                <Notice tone="danger">{orgErrorMessage(remove.error, t)}</Notice>
              ) : null}
            </>
          }
          confirmLabel={t('common.remove')}
          loading={remove.isPending}
          onCancel={() => {
            setConfirm(false);
            remove.reset();
          }}
          onConfirm={() => remove.mutate(undefined)}
        />
      </td>
    </tr>
  );
}

/** Bulk import preview: the commit button stays disabled unless the API says the batch can be committed. */
export function BulkPreviewView({
  preview,
  onCommit,
  committing,
}: {
  preview: BulkPreviewDto;
  onCommit: () => void;
  committing?: boolean;
}) {
  const { t } = useI18n();
  const errors = preview.rows.filter((r) => r.error);
  const canCommit = preview.canCommit && errors.length === 0 && preview.valid > 0;
  return (
    <div className="stack">
      <p className="row">
        <Badge tone="success">{t('orgs.bulkValid', { n: preview.valid })}</Badge>
        <Badge tone={errors.length ? 'danger' : 'neutral'}>
          {t('orgs.bulkErrors', { n: errors.length })}
        </Badge>
        <Badge>{t('orgs.bulkSeats', { n: preview.seatsAvailable })}</Badge>
      </p>
      {preview.valid > preview.seatsAvailable ? (
        <Notice tone="warning">{t('orgs.err.seat_limit_reached')}</Notice>
      ) : null}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t('orgs.line')}</th>
              <th scope="col">{t('auth.email')}</th>
              <th scope="col">{t('dashboard.status')}</th>
            </tr>
          </thead>
          <tbody>
            {preview.rows.map((r) => (
              <tr key={r.line} className={r.error ? 'row--error' : undefined}>
                <td>{r.line}</td>
                <td>{r.email}</td>
                <td>
                  {r.error ? <span className="field__error">{r.error}</span> : t('orgs.rowOk')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!canCommit ? <p className="small muted">{t('orgs.bulkFixFirst')}</p> : null}
      <Button onClick={onCommit} disabled={!canCommit} loading={committing}>
        {t('orgs.bulkCommit', { n: preview.valid })}
      </Button>
    </div>
  );
}

export function invitationLink(token: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/org-invitations/accept?token=${encodeURIComponent(token)}`;
}

/** Accept links for new invitations; prominent when no email could be queued. */
function InvitationLinks({ invitations }: { invitations: InvitationCreatedDto[] }) {
  const { t } = useI18n();
  const toast = useToast();
  if (invitations.length === 0) return null;
  const unsent = invitations.some((i) => !i.emailQueued);
  return (
    <Notice tone={unsent ? 'warning' : 'success'} title={t('orgs.invitationLinksTitle')}>
      <p style={{ marginBlockStart: 0 }}>
        {unsent ? t('orgs.invitationShareManually') : t('orgs.invitationEmailed')}
      </p>
      <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
        {invitations.map((i) => (
          <li key={i.id}>
            <strong>{i.email}</strong>
            <div className="row">
              <Input
                readOnly
                className="grow"
                aria-label={t('orgs.invitationLinkFor', { email: i.email })}
                value={invitationLink(i.token)}
                onFocus={(e) => e.currentTarget.select()}
              />
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  const text = invitationLink(i.token);
                  const done = navigator.clipboard?.writeText(text);
                  if (!done) {
                    toast.error(t('orgs.copyFailed'));
                    return;
                  }
                  done
                    .then(() => toast.success(t('orgs.copied')))
                    .catch(() => toast.error(t('orgs.copyFailed')));
                }}
              >
                {t('orgs.copyLink')}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Notice>
  );
}

function BulkAdd({
  orgId,
  onDone,
}: {
  orgId: string;
  onDone: (invitations: InvitationCreatedDto[]) => void;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const [csv, setCsv] = useState('');
  const [department, setDepartment] = useState('');
  const [preview, setPreview] = useState<BulkPreviewDto | null>(null);
  const body = () => ({ csv, department: department.trim() || undefined });
  const check = useApiMutation(
    () =>
      api<BulkPreviewDto>(`/api/orgs/${orgId}/members/bulk/preview`, {
        method: 'POST',
        body: body(),
      }),
    [],
    (r) => setPreview(r),
  );
  const commit = useApiMutation(
    () =>
      api<BulkInviteResultDto>(`/api/orgs/${orgId}/members/bulk`, { method: 'POST', body: body() }),
    [w2keys.orgInvitations(orgId)],
    (r) => {
      toast.success(t('orgs.bulkDone', { n: r.invited }));
      setPreview(null);
      setCsv('');
      onDone(r.invitations);
    },
  );
  return (
    <section className="card card--flat" aria-labelledby="bulk-h">
      <h3 id="bulk-h">{t('orgs.bulkTitle')}</h3>
      <p className="small muted">{t('orgs.bulkHint')}</p>
      <Field label={t('orgs.csvFile')}>
        <Input
          type="file"
          accept=".csv,text/csv,text/plain"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f)
              void f.text().then((text) => {
                setCsv(text);
                setPreview(null);
              });
          }}
        />
      </Field>
      <Field label={t('orgs.csvText')}>
        <Textarea
          rows={5}
          value={csv}
          onChange={(e) => {
            setCsv(e.target.value);
            setPreview(null);
          }}
        />
      </Field>
      <Field label={t('orgs.department')} hint={t('orgs.bulkDepartmentHint')}>
        <Input value={department} maxLength={100} onChange={(e) => setDepartment(e.target.value)} />
      </Field>
      <Button
        variant="secondary"
        disabled={!csv.trim()}
        loading={check.isPending}
        onClick={() => check.mutate(undefined)}
      >
        {t('orgs.bulkPreview')}
      </Button>
      {check.isError ? <Notice tone="danger">{orgErrorMessage(check.error, t)}</Notice> : null}
      {preview ? (
        <BulkPreviewView
          preview={preview}
          committing={commit.isPending}
          onCommit={() => commit.mutate(undefined)}
        />
      ) : null}
      {commit.isError ? <Notice tone="danger">{orgErrorMessage(commit.error, t)}</Notice> : null}
    </section>
  );
}

function PendingInvitations({ orgId }: { orgId: string }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const list = useQuery({
    queryKey: w2keys.orgInvitations(orgId),
    queryFn: () => api<InvitationDto[]>(`/api/orgs/${orgId}/invitations`),
  });
  const revoke = useApiMutation(
    (id: string) => api(`/api/orgs/${orgId}/invitations/${id}`, { method: 'DELETE' }),
    [w2keys.orgInvitations(orgId)],
    () => toast.success(t('orgs.invitationRevoked')),
  );
  return (
    <section aria-labelledby="inv-h">
      <h3 id="inv-h">{t('orgs.pendingInvitations')}</h3>
      {revoke.isError ? <Notice tone="danger">{orgErrorMessage(revoke.error, t)}</Notice> : null}
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <p className="muted small">{t('orgs.noInvitations')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {items.map((i) => (
                <li key={i.id} className="row row--between">
                  <span>
                    {i.email} <Badge>{t(`orgs.role.${i.role}`)}</Badge>
                    {i.department ? <span className="small muted"> · {i.department}</span> : null}
                    <span className="small muted">
                      {' '}
                      · {t('orgs.expires', { date: fmtDate(i.expiresAt) })}
                    </span>
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    loading={revoke.isPending && revoke.variables === i.id}
                    onClick={() => revoke.mutate(i.id)}
                    aria-label={t('orgs.revokeFor', { email: i.email })}
                  >
                    {t('orgs.revokeInvitation')}
                  </Button>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </section>
  );
}

function MembersTab({ org, canManageRoles }: { org: OrgDto; canManageRoles: boolean }) {
  const { t } = useI18n();
  const members = useQuery({
    queryKey: w2keys.orgMembers(org.id),
    queryFn: () => api<MemberDto[]>(`/api/orgs/${org.id}/members`),
  });
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [department, setDepartment] = useState('');
  const [created, setCreated] = useState<InvitationCreatedDto[]>([]);
  const refresh = () => void members.refetch();
  const invite = useApiMutation(
    () =>
      api<InvitationCreatedDto>(`/api/orgs/${org.id}/members`, {
        method: 'POST',
        body: { email: email.trim(), role, department: department.trim() || undefined },
      }),
    [w2keys.org(org.id), w2keys.orgInvitations(org.id)],
    (r) => {
      setCreated([r]);
      setEmail('');
      setDepartment('');
    },
  );
  return (
    <div className="stack">
      <p className="small muted">
        {t('orgs.seats', { used: org.seatsUsed, limit: org.seatLimit })}
      </p>
      <form
        className="card card--flat"
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) invite.mutate(undefined);
        }}
      >
        <h3>{t('orgs.addMember')}</h3>
        <p className="small muted">{t('orgs.addMemberHint')}</p>
        <div className="row">
          <Field label={t('auth.email')} className="grow" required>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label={t('orgs.roleLabel')}>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={ORG_ROLES.filter((r) => canManageRoles || r === 'Member').map((r) => ({
                value: r,
                label: t(`orgs.role.${r}`),
              }))}
            />
          </Field>
          <Field label={t('orgs.department')}>
            <Input
              value={department}
              maxLength={100}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Field>
        </div>
        {invite.isError ? <Notice tone="danger">{orgErrorMessage(invite.error, t)}</Notice> : null}
        <Button type="submit" loading={invite.isPending} disabled={!email.trim()}>
          {t('orgs.add')}
        </Button>
      </form>
      {created.length > 0 ? (
        <div role="status">
          <p className="small">{t('orgs.invitationSent')}</p>
          <InvitationLinks invitations={created} />
        </div>
      ) : null}
      <PendingInvitations orgId={org.id} />
      <h3>{t('orgs.members')}</h3>
      <QueryState query={members}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('orgs.noMembers')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('orgs.member')}</th>
                    <th scope="col">{t('orgs.roleLabel')}</th>
                    <th scope="col">{t('orgs.department')}</th>
                    <th scope="col">{t('orgs.joined')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((m) => (
                    <MemberRow
                      key={`${m.userId}-${m.role}-${m.department}`}
                      orgId={org.id}
                      m={m}
                      canManageRoles={canManageRoles}
                      onChanged={refresh}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
      <BulkAdd orgId={org.id} onDone={setCreated} />
    </div>
  );
}

// ---------- Assignments ----------

/** <input type="date"> value → end of that day in local time, as ISO (the API requires a future date). */
export function dueDateToIso(date: string): string | undefined {
  if (!date) return undefined;
  const d = new Date(`${date}T23:59:00`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function AssignmentsTab({ org, canGrantPremium }: { org: OrgDto; canGrantPremium: boolean }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const assignments = useQuery({
    queryKey: w2keys.orgAssignments(org.id),
    queryFn: () => api<AssignmentDto[]>(`/api/orgs/${org.id}/assignments`),
  });
  const members = useQuery({
    queryKey: w2keys.orgMembers(org.id),
    queryFn: () => api<MemberDto[]>(`/api/orgs/${org.id}/members`),
  });
  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const courses = useCourses({ q: search || undefined, page: 1 });
  const [courseId, setCourseId] = useState('');
  const [scope, setScope] = useState<'Organization' | 'Department' | 'User'>('Organization');
  const [department, setDepartment] = useState('');
  const [userId, setUserId] = useState('');
  const [due, setDue] = useState('');
  const [premium, setPremium] = useState(false);
  const [toDelete, setToDelete] = useState<AssignmentDto | null>(null);
  const departments = Array.from(
    new Set((members.data ?? []).map((m) => m.department).filter(Boolean)),
  );
  const create = useApiMutation(
    () =>
      api<AssignmentDto>(`/api/orgs/${org.id}/assignments`, {
        method: 'POST',
        body: {
          courseId,
          userId: scope === 'User' ? userId : undefined,
          department: scope === 'Department' ? department : undefined,
          dueAt: dueDateToIso(due),
          grantsPremium: premium,
        },
      }),
    [w2keys.orgAssignments(org.id), w2keys.orgReport(org.id)],
    () => {
      toast.success(t('orgs.assigned'));
      setDue('');
      setPremium(false);
    },
  );
  const remove = useApiMutation(
    (id: string) => api(`/api/orgs/${org.id}/assignments/${id}`, { method: 'DELETE' }),
    [w2keys.orgAssignments(org.id), w2keys.orgReport(org.id)],
    () => setToDelete(null),
  );
  const memberName = (id: string | null) =>
    members.data?.find((m) => m.userId === id)?.displayName ?? id ?? '';
  const valid =
    !!courseId &&
    (scope === 'Organization' ||
      (scope === 'Department' && !!department.trim()) ||
      (scope === 'User' && !!userId));
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="stack">
      <form
        className="card card--flat"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) create.mutate(undefined);
        }}
      >
        <h3>{t('orgs.assignCourse')}</h3>
        <div className="row">
          <Field label={t('orgs.findCourse')} className="grow">
            <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} />
          </Field>
          <Button variant="secondary" onClick={() => setSearch(q.trim())}>
            {t('courses.searchButton')}
          </Button>
        </div>
        <Field label={t('orgs.course')} required>
          <Select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder={courses.isPending ? t('common.loading') : t('orgs.chooseCourse')}
            options={(courses.data?.items ?? []).map((c) => ({ value: c.id, label: c.title }))}
          />
        </Field>
        <div className="row">
          <Field label={t('orgs.scope')}>
            <Select
              value={scope}
              onChange={(e) => setScope(e.target.value as typeof scope)}
              options={(['Organization', 'Department', 'User'] as const).map((s) => ({
                value: s,
                label: t(`orgs.scopeOpt.${s}`),
              }))}
            />
          </Field>
          {scope === 'Department' ? (
            <Field label={t('orgs.department')} required>
              <Input
                list="org-departments"
                value={department}
                maxLength={100}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Field>
          ) : null}
          {scope === 'User' ? (
            <Field label={t('orgs.member')} required>
              <Select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder={t('orgs.chooseMember')}
                options={(members.data ?? []).map((m) => ({
                  value: m.userId,
                  label: `${m.displayName} (${m.email})`,
                }))}
              />
            </Field>
          ) : null}
          <Field label={t('orgs.dueDate')} hint={t('orgs.dueHint')}>
            <Input type="date" min={today} value={due} onChange={(e) => setDue(e.target.value)} />
          </Field>
        </div>
        <datalist id="org-departments">
          {departments.map((d) => (
            <option key={d} value={d} />
          ))}
        </datalist>
        <Checkbox
          label={t('orgs.grantPremium')}
          hint={canGrantPremium ? t('orgs.grantPremiumHint') : t('orgs.grantPremiumAdminOnly')}
          checked={premium}
          disabled={!canGrantPremium}
          onChange={(e) => setPremium(e.target.checked)}
        />
        {create.isError ? <Notice tone="danger">{orgErrorMessage(create.error, t)}</Notice> : null}
        <Button type="submit" disabled={!valid} loading={create.isPending}>
          {t('orgs.assign')}
        </Button>
      </form>
      <QueryState query={assignments}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('orgs.noAssignments')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('orgs.course')}</th>
                    <th scope="col">{t('orgs.scope')}</th>
                    <th scope="col">{t('orgs.dueDate')}</th>
                    <th scope="col">{t('orgs.premium')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((a) => (
                    <tr key={a.id}>
                      <td>{a.courseTitle}</td>
                      <td>
                        {t(`orgs.scopeOpt.${a.scope}`)}
                        {a.scope === 'Department' ? `: ${a.department}` : ''}
                        {a.scope === 'User' ? `: ${memberName(a.userId)}` : ''}
                      </td>
                      <td>{a.dueAt ? fmtDate(a.dueAt) : '—'}</td>
                      <td>
                        {a.grantsPremium ? (
                          <Badge tone="accent">{t('common.yes')}</Badge>
                        ) : (
                          t('common.no')
                        )}
                      </td>
                      <td>
                        <Button size="sm" variant="ghost" onClick={() => setToDelete(a)}>
                          {t('common.remove')}
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
      <ConfirmDialog
        open={!!toDelete}
        danger
        title={t('orgs.unassignTitle')}
        body={
          <>
            <p>{t('orgs.unassignBody', { title: toDelete?.courseTitle ?? '' })}</p>
            {remove.isError ? (
              <Notice tone="danger">{orgErrorMessage(remove.error, t)}</Notice>
            ) : null}
          </>
        }
        confirmLabel={t('common.remove')}
        loading={remove.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() => toDelete && remove.mutate(toDelete.id)}
      />
    </div>
  );
}

// ---------- Progress report ----------

function ReportTab({ org }: { org: OrgDto }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [downloading, setDownloading] = useState(false);
  const report = useQuery({
    queryKey: w2keys.orgReport(org.id),
    queryFn: () => api<ProgressRowDto[]>(`/api/orgs/${org.id}/reports/progress`),
  });
  return (
    <div className="stack">
      <div className="row row--between">
        <p className="small muted">{t('orgs.reportHint')}</p>
        <Button
          variant="secondary"
          size="sm"
          loading={downloading}
          onClick={() => {
            setDownloading(true);
            downloadFile(
              `/api/orgs/${org.id}/reports/progress?format=csv`,
              `${org.slug}-progress.csv`,
            )
              .catch((e) => toast.error(errorMessage(e, t)))
              .finally(() => setDownloading(false));
          }}
        >
          {t('orgs.downloadCsv')}
        </Button>
      </div>
      <QueryState query={report}>
        {(rows) =>
          rows.length === 0 ? (
            <EmptyState title={t('orgs.reportEmpty')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <caption className="visually-hidden">{t('orgs.report')}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t('orgs.member')}</th>
                    <th scope="col">{t('orgs.department')}</th>
                    <th scope="col">{t('orgs.course')}</th>
                    <th scope="col">{t('orgs.progress')}</th>
                    <th scope="col">{t('orgs.bestScore')}</th>
                    <th scope="col">{t('dashboard.status')}</th>
                    <th scope="col">{t('orgs.dueDate')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={`${r.userId}-${r.courseId}`}>
                      <td>
                        {r.displayName}
                        <div className="small muted">{r.email}</div>
                      </td>
                      <td>{r.department || '—'}</td>
                      <td>{r.courseTitle}</td>
                      <td>
                        {t('orgs.lessonsDone', {
                          done: r.completedLessons,
                          total: r.totalLessons,
                          pct: Math.round(r.progressPercent),
                        })}
                      </td>
                      <td>
                        {r.bestScorePercent != null ? `${Math.round(r.bestScorePercent)}%` : '—'}
                      </td>
                      <td>
                        {r.passed ? <Badge tone="success">{t('result.passed')}</Badge> : null}{' '}
                        {r.overdue ? <Badge tone="danger">{t('orgs.overdue')}</Badge> : null}{' '}
                        {r.certificateCode ? (
                          <Link to={`/verify/${encodeURIComponent(r.certificateCode)}`}>
                            {r.certificateCode}
                          </Link>
                        ) : null}
                        {!r.passed && !r.overdue && !r.certificateCode
                          ? t('orgs.inProgress')
                          : null}
                      </td>
                      <td>{r.dueAt ? fmtDate(r.dueAt) : '—'}</td>
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

// ---------- /orgs/:id ----------

export function OrgPage() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  const { hasRole } = useAuth();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? 'members';
  const org = useQuery({
    queryKey: w2keys.org(id),
    queryFn: () => api<OrgDto>(`/api/orgs/${id}`),
    retry: false,
  });
  const mine = useMyOrgs();
  const myRole = mine.data?.find((o) => o.id === id)?.role;
  const staff = hasRole(...STAFF);
  const isOrgAdmin = staff || myRole === 'Admin';
  usePageMeta(org.data?.name ?? t('orgs.title'), undefined, { noindex: true });
  if (org.isError && org.error instanceof ApiError && org.error.status === 404)
    return (
      <div className="container page">
        <EmptyState
          title={t('orgs.notFound')}
          description={t('orgs.notFoundBody')}
          action={{ label: t('orgs.title'), to: '/orgs' }}
        />
      </div>
    );
  return (
    <div className="container page">
      <QueryState query={org}>
        {(o) => (
          <>
            <nav aria-label={t('common.breadcrumb')} className="small muted">
              <Link to="/orgs">{t('orgs.title')}</Link> / {o.name}
            </nav>
            <PageHeader
              title={o.name}
              subtitle={
                <span className="row">
                  <span className="mono">{o.slug}</span>
                  {o.isActive ? null : <Badge tone="danger">{t('orgs.inactive')}</Badge>}
                  {myRole ? <Badge>{t(`orgs.role.${myRole}`)}</Badge> : null}
                </span>
              }
            />
            <Tabs
              label={t('orgs.tabs')}
              value={tab}
              onChange={(v) => setParams({ tab: v }, { replace: true })}
              tabs={[
                {
                  id: 'members',
                  label: t('orgs.members'),
                  content: <MembersTab org={o} canManageRoles={isOrgAdmin} />,
                },
                {
                  id: 'assignments',
                  label: t('orgs.assignments'),
                  content: <AssignmentsTab org={o} canGrantPremium={isOrgAdmin} />,
                },
                { id: 'report', label: t('orgs.report'), content: <ReportTab org={o} /> },
                ...finalbOrgTabs(o, isOrgAdmin, t),
              ]}
            />
          </>
        )}
      </QueryState>
    </div>
  );
}

// ---------- /admin/orgs (staff) ----------

function OrgForm({
  initial,
  onSubmit,
  pending,
  error,
  submitLabel,
}: {
  initial?: OrgDto;
  onSubmit: (v: { name: string; slug: string; seatLimit: number }) => void;
  pending: boolean;
  error: unknown;
  submitLabel: string;
}) {
  const { t } = useI18n();
  const [name, setName] = useState(initial?.name ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [seats, setSeats] = useState(String(initial?.seatLimit ?? 10));
  const slugOk = /^[a-z0-9-]{1,64}$/.test(slug);
  const seatsN = Number(seats);
  const seatsOk = Number.isInteger(seatsN) && seatsN >= 1 && seatsN <= 100000;
  const nameOk = name.trim().length >= 2 && name.trim().length <= 200;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (slugOk && seatsOk && nameOk) onSubmit({ name: name.trim(), slug, seatLimit: seatsN });
      }}
      noValidate
    >
      <div className="row">
        <Field label={t('orgs.name')} required className="grow">
          <Input value={name} maxLength={200} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field
          label={t('orgs.slug')}
          hint={t('orgs.slugHint')}
          error={slug && !slugOk ? t('orgs.slugInvalid') : undefined}
          required
        >
          <Input
            value={slug}
            maxLength={64}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
          />
        </Field>
        <Field
          label={t('orgs.seatLimit')}
          error={!seatsOk ? t('orgs.seatsInvalid') : undefined}
          required
        >
          <Input
            type="number"
            min={1}
            max={100000}
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />
        </Field>
      </div>
      {error ? <Notice tone="danger">{orgErrorMessage(error, t)}</Notice> : null}
      <Button type="submit" loading={pending} disabled={!slugOk || !seatsOk || !nameOk}>
        {submitLabel}
      </Button>
    </form>
  );
}

export function AdminOrgsPage() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  usePageMeta(t('orgs.adminTitle'), undefined, { noindex: true });
  const orgs = useQuery({
    queryKey: w2keys.adminOrgs,
    queryFn: () => api<OrgDto[]>('/api/admin/orgs'),
  });
  const [formKey, setFormKey] = useState(0);
  const [editing, setEditing] = useState<OrgDto | null>(null);
  const [toggling, setToggling] = useState<OrgDto | null>(null);
  const create = useApiMutation(
    (v: { name: string; slug: string; seatLimit: number }) =>
      api<OrgDto>('/api/admin/orgs', { method: 'POST', body: v }),
    [w2keys.adminOrgs],
    (o) => {
      toast.success(t('orgs.created', { name: o.name }));
      setFormKey((k) => k + 1);
    },
  );
  const update = useApiMutation(
    (v: { id: string; name: string; slug: string; seatLimit: number }) =>
      api<OrgDto>(`/api/admin/orgs/${v.id}`, {
        method: 'PUT',
        body: { name: v.name, slug: v.slug, seatLimit: v.seatLimit },
      }),
    [w2keys.adminOrgs],
    () => {
      setEditing(null);
      toast.success(t('common.saved'));
    },
  );
  const toggle = useApiMutation(
    (o: OrgDto) =>
      api<OrgDto>(`/api/admin/orgs/${o.id}/${o.isActive ? 'deactivate' : 'reactivate'}`, {
        method: 'POST',
      }),
    [w2keys.adminOrgs],
    (o) => {
      setToggling(null);
      toast.success(o.isActive ? t('orgs.reactivated') : t('orgs.deactivated'));
    },
  );
  return (
    <>
      <PageHeader title={t('orgs.adminTitle')} subtitle={t('orgs.adminSubtitle')} />
      <section className="card">
        <h2>{t('orgs.create')}</h2>
        <OrgForm
          key={formKey}
          onSubmit={(v) => create.mutate(v)}
          pending={create.isPending}
          error={create.error}
          submitLabel={t('orgs.create')}
        />
      </section>
      <QueryState query={orgs}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('orgs.noneYet')} />
          ) : (
            <div className="table-wrap" style={{ marginBlockStart: 'var(--space-4)' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('orgs.name')}</th>
                    <th scope="col">{t('orgs.seatLimit')}</th>
                    <th scope="col">{t('dashboard.status')}</th>
                    <th scope="col">{t('dashboard.date')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <Link to={`/orgs/${o.id}`}>{o.name}</Link>
                        <div className="small muted mono">{o.slug}</div>
                      </td>
                      <td>{t('orgs.seats', { used: o.seatsUsed, limit: o.seatLimit })}</td>
                      <td>
                        {o.isActive ? (
                          <Badge tone="success">{t('orgs.active')}</Badge>
                        ) : (
                          <Badge tone="danger">{t('orgs.inactive')}</Badge>
                        )}
                      </td>
                      <td>{fmtDate(o.createdAt)}</td>
                      <td>
                        <div className="row">
                          <Button size="sm" variant="secondary" onClick={() => setEditing(o)}>
                            {t('common.edit')}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setToggling(o)}>
                            {o.isActive ? t('orgs.deactivate') : t('orgs.reactivate')}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
      <Dialog open={!!editing} title={t('orgs.editTitle')} onClose={() => setEditing(null)} wide>
        {editing ? (
          <OrgForm
            initial={editing}
            onSubmit={(v) => update.mutate({ id: editing.id, ...v })}
            pending={update.isPending}
            error={update.error}
            submitLabel={t('common.save')}
          />
        ) : null}
      </Dialog>
      <ConfirmDialog
        open={!!toggling}
        danger={!!toggling?.isActive}
        title={toggling?.isActive ? t('orgs.deactivateTitle') : t('orgs.reactivateTitle')}
        body={
          <>
            <p>{toggling?.isActive ? t('orgs.deactivateBody') : t('orgs.reactivateBody')}</p>
            {toggle.isError ? (
              <Notice tone="danger">{orgErrorMessage(toggle.error, t)}</Notice>
            ) : null}
          </>
        }
        confirmLabel={toggling?.isActive ? t('orgs.deactivate') : t('orgs.reactivate')}
        loading={toggle.isPending}
        onCancel={() => setToggling(null)}
        onConfirm={() => toggling && toggle.mutate(toggling)}
      />
    </>
  );
}

/** /org-invitations/accept?token=… — the invited person accepts while signed in with the invited email. */
export function AcceptInvitationPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  usePageMeta(t('orgs.acceptTitle'), undefined, { noindex: true });
  const accept = useApiMutation(
    () =>
      api<AcceptedInvitationDto>('/api/org-invitations/accept', {
        method: 'POST',
        body: { token },
      }),
    [w2keys.myOrgs],
  );
  const failure =
    accept.error instanceof ApiError && accept.error.status === 404
      ? t('orgs.acceptNotFound', { email: user?.email ?? '' })
      : accept.error
        ? orgErrorMessage(accept.error, t)
        : null;
  return (
    <div className="container page">
      <PageHeader title={t('orgs.acceptTitle')} />
      {!token ? (
        <Notice tone="warning">{t('orgs.acceptNoToken')}</Notice>
      ) : accept.data ? (
        <Notice tone="success" title={t('orgs.acceptDone', { name: accept.data.organizationName })}>
          <p style={{ marginBlockStart: 0 }}>
            {t('orgs.acceptedAs', { role: t(`orgs.role.${accept.data.role}`) })}
          </p>
          <ButtonLink to="/me" size="sm">
            {t('nav.dashboard')}
          </ButtonLink>
        </Notice>
      ) : (
        <div className="stack">
          <p>{t('orgs.acceptBody', { email: user?.email ?? '' })}</p>
          {failure ? <Notice tone="danger">{failure}</Notice> : null}
          <div>
            <Button loading={accept.isPending} onClick={() => accept.mutate(undefined)}>
              {t('orgs.accept')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
