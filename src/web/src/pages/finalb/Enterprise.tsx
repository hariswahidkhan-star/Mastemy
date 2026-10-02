import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError, downloadFile } from '../../api/client';
import { problemCode } from '../../api/commerce';
import { loc, usePathways } from '../../api/discover';
import { fbKeys, fmtBytes } from '../../api/finalb';
import type {
  EnterpriseOrderDto,
  OrgMaterialDto,
  PathwayAssignmentDto,
  SeatRequestDto,
  SsoConfigDto as SsoConfigBase,
  SsoConfigInput,
} from '../../api/finalb';
import { useApiMutation } from '../../api/hooks';
import { w2keys } from '../../api/wave2';
import type { AssignmentDto, MemberDto, OrgDto } from '../../api/wave2';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { CStatus } from '../commerce/shared';

/** OidcSso.cs / SsoDomains.cs: one row per allowed domain; only Verified ones are honoured at sign-in. */
export interface SsoDomainDto {
  id: string;
  domain: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  txtRecordName: string;
  txtRecordValue: string;
  verifiedVia: 'dns' | 'staff' | null;
  verifiedAt: string | null;
  decisionNote: string | null;
  lastDnsCheckAt: string | null;
}
export interface SsoConfigDto extends SsoConfigBase {
  domains: SsoDomainDto[];
}
export interface StaffSsoDomainDto {
  id: string;
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  domain: string;
  status: SsoDomainDto['status'];
  verifiedVia: string | null;
  verifiedAt: string | null;
  decisionNote: string | null;
  createdAt: string;
}

const CODES = [
  'public_email_domain',
  'domain_verification_failed',
  'dns_unavailable',
  'domain_claimed',
  'domain_rejected',
  'note_required',
  'pathway_has_no_live_courses',
  'duplicate_assignment',
  'premium_scope_requires_admin',
  'quota_exceeded',
  'malware_detected',
  'seat_request_pending',
  'invalid_issuer',
  'invalid_client_id',
  'invalid_domains',
  'invalid_client_secret',
  'seat_limit_below_usage',
];

export function enterpriseError(e: unknown, t: TFunction): string {
  const code = problemCode(e);
  if (CODES.includes(code)) return t(`finalb.ent.err.${code}`);
  if (e instanceof ApiError) {
    if (e.status === 413) return t('finalb.ent.err.tooLarge');
    if (e.status === 415) return t('finalb.ent.err.fileType');
    if (e.status === 503 && !code) return t('finalb.ent.err.scanner');
  }
  return errorMessage(e, t);
}

function dueIso(date: string): string | null {
  if (!date) return null;
  const d = new Date(`${date}T23:59:00`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

// ---------------- Assigned pathways ----------------
export function PathwayAssignmentsTab({
  org,
  canGrantPremium,
}: {
  org: OrgDto;
  canGrantPremium: boolean;
}) {
  const { t, lang, fmtDate } = useI18n();
  const toast = useToast();
  const list = useQuery({
    queryKey: fbKeys.pathwayAssignments(org.id),
    queryFn: () => api<PathwayAssignmentDto[]>(`/api/orgs/${org.id}/pathway-assignments`),
  });
  const pathways = usePathways();
  const members = useQuery({
    queryKey: w2keys.orgMembers(org.id),
    queryFn: () => api<MemberDto[]>(`/api/orgs/${org.id}/members`),
  });
  const courseAssignments = useQuery({
    queryKey: w2keys.orgAssignments(org.id),
    queryFn: () => api<AssignmentDto[]>(`/api/orgs/${org.id}/assignments`),
  });
  const title = (id: string) =>
    courseAssignments.data?.find((a) => a.courseId === id)?.courseTitle ?? id;
  const [pathwayId, setPathwayId] = useState('');
  const [scope, setScope] = useState<'Organization' | 'Department' | 'User'>('Organization');
  const [department, setDepartment] = useState('');
  const [userId, setUserId] = useState('');
  const [due, setDue] = useState('');
  const [premium, setPremium] = useState(false);
  const [toDelete, setToDelete] = useState<PathwayAssignmentDto | null>(null);
  const departments = Array.from(
    new Set((members.data ?? []).map((m) => m.department).filter(Boolean)),
  );
  const invalidate = [
    fbKeys.pathwayAssignments(org.id),
    w2keys.orgAssignments(org.id),
    w2keys.orgReport(org.id),
  ];
  const create = useApiMutation(
    () =>
      api<PathwayAssignmentDto>(`/api/orgs/${org.id}/pathway-assignments`, {
        method: 'POST',
        body: {
          pathwayId,
          userId: scope === 'User' ? userId : null,
          department: scope === 'Department' ? department.trim() : null,
          dueAt: dueIso(due),
          grantsPremium: premium,
        },
      }),
    invalidate,
    (r) => {
      toast.success(
        t('finalb.ent.pathways.assigned', {
          n: r.courseIds.length,
          skipped: r.skippedCourseIds.length,
        }),
      );
      setDue('');
      setPremium(false);
    },
  );
  const remove = useApiMutation(
    (id: string) => api(`/api/orgs/${org.id}/pathway-assignments/${id}`, { method: 'DELETE' }),
    invalidate,
    () => setToDelete(null),
  );
  const valid =
    !!pathwayId &&
    (scope === 'Organization' ||
      (scope === 'Department' && !!department.trim()) ||
      (scope === 'User' && !!userId));
  const today = new Date().toISOString().slice(0, 10);
  const memberName = (id: string | null) =>
    members.data?.find((m) => m.userId === id)?.displayName ?? id ?? '';
  return (
    <div className="stack">
      <form
        className="card"
        aria-labelledby="pw-assign-h"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (valid) create.mutate(undefined);
        }}
      >
        <h2 id="pw-assign-h">{t('finalb.ent.pathways.title')}</h2>
        <p className="small muted">{t('finalb.ent.pathways.note')}</p>
        <div className="grid-2">
          <Field label={t('finalb.ent.pathways.pathway')} required>
            <Select
              value={pathwayId}
              onChange={(e) => setPathwayId(e.target.value)}
              placeholder={pathways.isPending ? t('common.loading') : t('finalb.ent.choose')}
              options={(pathways.data ?? []).map((p) => ({
                value: p.id,
                label: `${loc(lang, p.titleEn, p.titleAr)} · ${t('finalb.ent.pathways.courses', { n: p.courseCount })}`,
              }))}
            />
          </Field>
          <Field label={t('finalb.ent.scope')}>
            <Select
              value={scope}
              onChange={(e) => setScope(e.target.value as typeof scope)}
              options={[
                { value: 'Organization', label: t('finalb.ent.scopeOrg') },
                { value: 'Department', label: t('finalb.ent.scopeDept') },
                { value: 'User', label: t('finalb.ent.scopeUser') },
              ]}
            />
          </Field>
          {scope === 'Department' ? (
            <Field label={t('finalb.ent.department')} required>
              <Input
                value={department}
                list="pw-depts"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Field>
          ) : null}
          {scope === 'User' ? (
            <Field label={t('finalb.ent.member')} required>
              <Select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder={t('finalb.ent.choose')}
                options={(members.data ?? []).map((m) => ({
                  value: m.userId,
                  label: m.email ? `${m.displayName} (${m.email})` : m.displayName,
                }))}
              />
            </Field>
          ) : null}
          <Field label={t('finalb.ent.due')}>
            <Input type="date" min={today} value={due} onChange={(e) => setDue(e.target.value)} />
          </Field>
        </div>
        <datalist id="pw-depts">
          {departments.map((d) => (
            <option key={d} value={d} />
          ))}
        </datalist>
        {canGrantPremium ? (
          <Checkbox
            label={t('finalb.ent.premium')}
            hint={t('finalb.ent.premiumHint')}
            checked={premium}
            onChange={(e) => setPremium(e.target.checked)}
          />
        ) : null}
        {create.isError ? <Notice tone="danger">{enterpriseError(create.error, t)}</Notice> : null}
        <Button type="submit" disabled={!valid} loading={create.isPending}>
          {t('finalb.ent.pathways.assign')}
        </Button>
      </form>
      <QueryState query={list}>
        {(rows) =>
          rows.length === 0 ? (
            <EmptyState title={t('finalb.ent.pathways.empty')} />
          ) : (
            <ul
              className="stack"
              style={{ listStyle: 'none', padding: 0 }}
              data-testid="pathway-assignments"
            >
              {rows.map((a) => (
                <li key={a.id} className="card card--flat">
                  <div className="row row--between">
                    <strong>{a.pathwayTitle}</strong>
                    <Button size="sm" variant="danger" onClick={() => setToDelete(a)}>
                      {t('common.remove')}
                    </Button>
                  </div>
                  <p className="small">
                    {a.scope === 'User'
                      ? t('finalb.ent.forUser', { name: memberName(a.userId) })
                      : a.scope === 'Department'
                        ? t('finalb.ent.forDept', { dept: a.department ?? '' })
                        : t('finalb.ent.forOrg')}{' '}
                    ·{' '}
                    {a.dueAt
                      ? t('finalb.ent.dueOn', { date: fmtDate(a.dueAt) })
                      : t('finalb.ent.noDue')}{' '}
                    {a.grantsPremium ? (
                      <Badge tone="accent">{t('finalb.ent.premiumBadge')}</Badge>
                    ) : null}
                  </p>
                  <p className="small" style={{ marginBlockEnd: 0 }}>
                    {t('finalb.ent.pathways.expanded', { n: a.courseIds.length })}
                  </p>
                  <ul className="small">
                    {a.courseIds.map((c) => (
                      <li key={c}>{title(c)}</li>
                    ))}
                  </ul>
                  {a.skippedCourseIds.length > 0 ? (
                    <>
                      <p className="small muted" style={{ marginBlockEnd: 0 }}>
                        {t('finalb.ent.pathways.skipped', { n: a.skippedCourseIds.length })}
                      </p>
                      <ul className="small muted">
                        {a.skippedCourseIds.map((c) => (
                          <li key={c}>{title(c)}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <ConfirmDialog
        open={!!toDelete}
        danger
        title={t('finalb.ent.pathways.removeTitle')}
        body={
          <>
            <p>{t('finalb.ent.pathways.removeBody', { title: toDelete?.pathwayTitle ?? '' })}</p>
            {remove.isError ? (
              <Notice tone="danger">{enterpriseError(remove.error, t)}</Notice>
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

// ---------------- Org-private materials ----------------
function scanTone(v: string) {
  return v === 'Clean' ? 'success' : v === 'Infected' ? 'danger' : 'warning';
}

function MaterialRow({
  m,
  onDelete,
}: {
  m: OrgMaterialDto;
  onDelete?: (m: OrgMaterialDto) => void;
}) {
  const { t, fmtDate } = useI18n();
  const [err, setErr] = useState<string | null>(null);
  return (
    <li className="card card--flat" data-material-title={m.title}>
      <div className="row row--between">
        <span>
          <strong>{m.title}</strong>{' '}
          <span className="small muted">
            {m.fileName} · {fmtBytes(m.sizeBytes)} · {fmtDate(m.createdAt)}
            {m.department ? ` · ${t('finalb.ent.forDept', { dept: m.department })}` : ''}
          </span>{' '}
          <Badge tone={scanTone(m.scanVerdict)}>
            {t('finalb.ent.materials.scan', { verdict: m.scanVerdict })}
          </Badge>
        </span>
        <span className="row">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              downloadFile(m.downloadUrl, m.fileName).catch((e: unknown) =>
                setErr(errorMessage(e, t)),
              )
            }
          >
            {t('finalb.ent.materials.download')}
          </Button>
          {onDelete ? (
            <Button size="sm" variant="danger" onClick={() => onDelete(m)}>
              {t('common.delete')}
            </Button>
          ) : null}
        </span>
      </div>
      {err ? <Notice tone="danger">{err}</Notice> : null}
    </li>
  );
}

export function MaterialsTab({ org, isAdmin }: { org: OrgDto; isAdmin: boolean }) {
  const { t } = useI18n();
  const toast = useToast();
  const list = useQuery({
    queryKey: fbKeys.materials(org.id),
    queryFn: () => api<OrgMaterialDto[]>(`/api/orgs/${org.id}/materials`),
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [toDelete, setToDelete] = useState<OrgMaterialDto | null>(null);
  const upload = useApiMutation(
    () => {
      const fd = new FormData();
      fd.append('file', file as File);
      const q = new URLSearchParams({ title: title.trim() || (file?.name ?? '') });
      if (department.trim()) q.set('department', department.trim());
      return api<OrgMaterialDto>(`/api/orgs/${org.id}/materials?${q.toString()}`, {
        method: 'POST',
        body: fd,
      });
    },
    [fbKeys.materials(org.id)],
    () => {
      toast.success(t('finalb.ent.materials.uploaded'));
      setFile(null);
      setTitle('');
      if (fileRef.current) fileRef.current.value = '';
    },
  );
  const remove = useApiMutation(
    (id: string) => api(`/api/orgs/${org.id}/materials/${id}`, { method: 'DELETE' }),
    [fbKeys.materials(org.id)],
    () => setToDelete(null),
  );
  const used = (list.data ?? []).reduce((n, m) => n + m.sizeBytes, 0);
  return (
    <div className="stack">
      {isAdmin ? (
        <form
          className="card"
          aria-labelledby="mat-up-h"
          onSubmit={(e) => {
            e.preventDefault();
            if (file) upload.mutate(undefined);
          }}
        >
          <h2 id="mat-up-h">{t('finalb.ent.materials.upload')}</h2>
          <p className="small muted">{t('finalb.ent.materials.note')}</p>
          <div className="grid-2">
            <Field label={t('finalb.ent.materials.file')} required>
              <Input
                ref={fileRef}
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </Field>
            <Field label={t('finalb.ent.materials.titleField')}>
              <Input value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} />
            </Field>
            <Field label={t('finalb.ent.department')} hint={t('finalb.ent.materials.deptHint')}>
              <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
            </Field>
          </div>
          {upload.isError ? (
            <Notice tone="danger">{enterpriseError(upload.error, t)}</Notice>
          ) : null}
          <Button type="submit" disabled={!file} loading={upload.isPending}>
            {t('finalb.ent.materials.uploadBtn')}
          </Button>
        </form>
      ) : null}
      <QueryState query={list}>
        {(rows) => (
          <>
            <div aria-live="polite">
              <p className="small" data-testid="materials-usage">
                {t('finalb.ent.materials.usage', { used: fmtBytes(used), n: rows.length })}
              </p>
              <p className="small muted">{t('finalb.ent.materials.quotaNote')}</p>
            </div>
            {rows.length === 0 ? (
              <EmptyState title={t('finalb.ent.materials.empty')} />
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {rows.map((m) => (
                  <MaterialRow key={m.id} m={m} onDelete={isAdmin ? setToDelete : undefined} />
                ))}
              </ul>
            )}
          </>
        )}
      </QueryState>
      <ConfirmDialog
        open={!!toDelete}
        danger
        title={t('finalb.ent.materials.deleteTitle')}
        body={
          <>
            <p>{toDelete?.title}</p>
            {remove.isError ? (
              <Notice tone="danger">{enterpriseError(remove.error, t)}</Notice>
            ) : null}
          </>
        }
        confirmLabel={t('common.delete')}
        loading={remove.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() => toDelete && remove.mutate(toDelete.id)}
      />
    </div>
  );
}

/** Member view on /me: the organization's private materials this member may download. */
export function OrgMaterialsList({ orgId }: { orgId: string }) {
  const { t } = useI18n();
  const list = useQuery({
    queryKey: fbKeys.materials(orgId),
    queryFn: () => api<OrgMaterialDto[]>(`/api/orgs/${orgId}/materials`),
    retry: false,
  });
  if (list.isPending || list.isError || list.data.length === 0) return null;
  return (
    <div>
      <h4 style={{ marginBlockEnd: 0 }}>{t('finalb.ent.materials.memberTitle')}</h4>
      <ul
        className="stack"
        style={{ listStyle: 'none', padding: 0 }}
        data-testid="member-materials"
      >
        {list.data.map((m) => (
          <MaterialRow key={m.id} m={m} />
        ))}
      </ul>
    </div>
  );
}

// ---------------- Seats ----------------
function InvoicePdfButton({ o, staff }: { o: EnterpriseOrderDto; staff: boolean }) {
  const { t } = useI18n();
  const [err, setErr] = useState<string | null>(null);
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          downloadFile(
            staff
              ? `/api/admin/invoices/${o.invoiceId}/pdf`
              : `/api/me/invoices/${o.invoiceId}/pdf`,
            `${o.invoiceNumber}.pdf`,
          ).catch((e: unknown) => setErr(errorMessage(e, t)))
        }
      >
        {t('finalb.ent.seats.invoicePdf', { number: o.invoiceNumber })}
      </Button>
      {err ? (
        <span className="small" role="alert">
          {err}
        </span>
      ) : null}
    </>
  );
}

export function SeatsTab({ org }: { org: OrgDto }) {
  const { t, fmtDate, fmtMoney } = useI18n();
  const toast = useToast();
  const requests = useQuery({
    queryKey: fbKeys.seatRequests(org.id),
    queryFn: () => api<SeatRequestDto[]>(`/api/orgs/${org.id}/seat-requests`),
  });
  const orders = useQuery({
    queryKey: fbKeys.orgOrders(org.id),
    queryFn: () => api<EnterpriseOrderDto[]>(`/api/orgs/${org.id}/enterprise-orders`),
  });
  const [qty, setQty] = useState('10');
  const [note, setNote] = useState('');
  const n = Number(qty);
  const valid = Number.isInteger(n) && n >= 1 && n <= 100000;
  const create = useApiMutation(
    () =>
      api<SeatRequestDto>(`/api/orgs/${org.id}/seat-requests`, {
        method: 'POST',
        body: { quantity: n, note: note.trim() || null },
      }),
    [fbKeys.seatRequests(org.id)],
    () => {
      toast.success(t('finalb.ent.seats.requested'));
      setNote('');
    },
  );
  return (
    <div className="stack">
      <p>{t('orgs.seats', { used: org.seatsUsed, limit: org.seatLimit })}</p>
      <form
        className="card"
        aria-labelledby="seat-h"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) create.mutate(undefined);
        }}
      >
        <h2 id="seat-h">{t('finalb.ent.seats.request')}</h2>
        <p className="small muted">{t('finalb.ent.seats.note')}</p>
        <div className="grid-2">
          <Field
            label={t('finalb.ent.seats.quantity')}
            required
            error={qty && !valid ? t('finalb.ent.seats.qtyRange') : undefined}
          >
            <Input
              type="number"
              min={1}
              max={100000}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </Field>
          <Field label={t('finalb.ent.seats.noteField')}>
            <Textarea
              rows={2}
              maxLength={2000}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
        </div>
        {create.isError ? <Notice tone="danger">{enterpriseError(create.error, t)}</Notice> : null}
        <Button type="submit" disabled={!valid} loading={create.isPending}>
          {t('finalb.ent.seats.submit')}
        </Button>
      </form>
      <section aria-labelledby="seat-req-h">
        <h3 id="seat-req-h">{t('finalb.ent.seats.requests')}</h3>
        <QueryState query={requests}>
          {(rows) =>
            rows.length === 0 ? (
              <p className="muted">{t('finalb.ent.seats.noRequests')}</p>
            ) : (
              <ul>
                {rows.map((r) => (
                  <li key={r.id}>
                    {t('finalb.ent.seats.qty', { n: r.quantity })} · <CStatus status={r.status} /> ·{' '}
                    {fmtDate(r.createdAt)}
                    {r.decisionNote ? ` · ${r.decisionNote}` : ''}
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
      <section aria-labelledby="seat-ord-h">
        <h3 id="seat-ord-h">{t('finalb.ent.seats.orders')}</h3>
        <QueryState query={orders}>
          {(rows) =>
            rows.length === 0 ? (
              <p className="muted">{t('finalb.ent.seats.noOrders')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {rows.map((o) => (
                  <li key={o.id} className="card card--flat">
                    <div className="row row--between">
                      <span>
                        {o.invoiceNumber} · {t('finalb.ent.seats.qty', { n: o.quantity })} ·{' '}
                        {fmtMoney(o.total, o.currency)} <CStatus status={o.status} />
                      </span>
                      <InvoicePdfButton o={o} staff={false} />
                    </div>
                    {o.status === 'AwaitingPayment' ? (
                      <p className="small pre-wrap">{o.paymentInstructions}</p>
                    ) : (
                      <p className="small muted">
                        {t('finalb.ent.seats.paidOn', { date: fmtDate(o.paidAt) })}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
    </div>
  );
}

// ---------------- SSO configuration ----------------
export function SsoTab({ org }: { org: OrgDto }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const cfg = useQuery({
    queryKey: fbKeys.sso(org.id),
    queryFn: async () => {
      try {
        return await api<SsoConfigDto>(`/api/orgs/${org.id}/sso`);
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) return null;
        throw e;
      }
    },
  });
  return (
    <QueryState query={cfg}>
      {(c) => (
        <SsoForm
          key={c?.updatedAt ?? 'new'}
          org={org}
          current={c}
          onSaved={() => toast.success(t('finalb.sso.saved'))}
          fmtDate={fmtDate}
        />
      )}
    </QueryState>
  );
}

function SsoForm({
  org,
  current,
  onSaved,
  fmtDate,
}: {
  org: OrgDto;
  current: SsoConfigDto | null;
  onSaved: () => void;
  fmtDate: (s: string) => string;
}) {
  const { t } = useI18n();
  const [issuer, setIssuer] = useState(current?.issuer ?? '');
  const [clientId, setClientId] = useState(current?.clientId ?? '');
  const [secret, setSecret] = useState('');
  const [domains, setDomains] = useState((current?.allowedDomains ?? []).join('\n'));
  const [enabled, setEnabled] = useState(current?.enabled ?? true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const domainList = domains
    .split(/[\s,]+/)
    .map((d) => d.trim().replace(/^@/, '').toLowerCase())
    .filter(Boolean);
  const valid =
    /^https?:\/\//.test(issuer.trim()) &&
    clientId.trim().length > 0 &&
    domainList.length >= 1 &&
    domainList.length <= 50 &&
    (!!current || secret.trim().length > 0);
  const save = useApiMutation(
    () => {
      const body: SsoConfigInput = {
        issuer: issuer.trim(),
        clientId: clientId.trim(),
        clientSecret: secret.trim() || null,
        allowedDomains: domainList,
        enabled,
      };
      return api<SsoConfigDto>(`/api/orgs/${org.id}/sso`, { method: 'PUT', body });
    },
    [fbKeys.sso(org.id)],
    () => {
      setSecret('');
      onSaved();
    },
  );
  const remove = useApiMutation(
    () => api(`/api/orgs/${org.id}/sso`, { method: 'DELETE' }),
    [fbKeys.sso(org.id)],
    () => setConfirmDelete(false),
  );
  const testPath = `/sso/${org.slug}`;
  return (
    <div className="stack">
      <form
        className="card"
        aria-labelledby="sso-h"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) save.mutate(undefined);
        }}
      >
        <h2 id="sso-h">{t('finalb.sso.title')}</h2>
        <p className="small muted">{t('finalb.sso.note')}</p>
        {current ? (
          <p className="small">
            {current.enabled ? (
              <Badge tone="success">{t('finalb.sso.enabled')}</Badge>
            ) : (
              <Badge>{t('finalb.sso.disabled')}</Badge>
            )}{' '}
            {t('finalb.sso.updated', { date: fmtDate(current.updatedAt) })}
          </p>
        ) : (
          <Notice tone="info">{t('finalb.sso.none')}</Notice>
        )}
        <Field label={t('finalb.sso.issuer')} hint={t('finalb.sso.issuerHint')} required>
          <Input type="url" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
        </Field>
        <Field label={t('finalb.sso.clientId')} required>
          <Input
            value={clientId}
            autoComplete="off"
            onChange={(e) => setClientId(e.target.value)}
          />
        </Field>
        <Field
          label={t('finalb.sso.secret')}
          hint={
            current?.hasClientSecret ? t('finalb.sso.secretKeep') : t('finalb.sso.secretRequired')
          }
          required={!current}
        >
          <Input
            type="password"
            autoComplete="new-password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </Field>
        <Field label={t('finalb.sso.domains')} hint={t('finalb.sso.domainsHint')} required>
          <Textarea rows={3} value={domains} onChange={(e) => setDomains(e.target.value)} />
        </Field>
        <Checkbox
          label={t('finalb.sso.enable')}
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        {current?.redirectUri ? (
          <p className="small">
            {t('finalb.sso.redirectUri')} <code>{current.redirectUri}</code>
          </p>
        ) : current ? (
          <Notice tone="warning">{t('finalb.sso.serverNotConfigured')}</Notice>
        ) : null}
        {save.isError ? <Notice tone="danger">{enterpriseError(save.error, t)}</Notice> : null}
        <div className="row">
          <Button type="submit" disabled={!valid} loading={save.isPending}>
            {t('common.save')}
          </Button>
          {current ? (
            <Button type="button" variant="danger" onClick={() => setConfirmDelete(true)}>
              {t('finalb.sso.remove')}
            </Button>
          ) : null}
        </div>
      </form>
      {current && current.domains.length > 0 ? (
        <SsoDomainsCard org={org} current={current} />
      ) : null}
      {current?.enabled ? (
        <section className="card" aria-labelledby="sso-test-h">
          <h3 id="sso-test-h">{t('finalb.sso.testTitle')}</h3>
          <p className="small">{t('finalb.sso.testNote')}</p>
          <p>
            <Link to={testPath} target="_blank" rel="noopener">
              {window.location.origin}
              {testPath}
            </Link>
          </p>
        </section>
      ) : null}
      <ConfirmDialog
        open={confirmDelete}
        danger
        title={t('finalb.sso.remove')}
        body={
          <>
            <p>{t('finalb.sso.removeBody')}</p>
            {remove.isError ? (
              <Notice tone="danger">{enterpriseError(remove.error, t)}</Notice>
            ) : null}
          </>
        }
        confirmLabel={t('finalb.sso.remove')}
        loading={remove.isPending}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => remove.mutate(undefined)}
      />
    </div>
  );
}

function SsoDomainsCard({ org, current }: { org: OrgDto; current: SsoConfigDto }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [checking, setChecking] = useState<string | null>(null);
  const verify = useApiMutation(
    (id: string) =>
      api<SsoDomainDto>(`/api/orgs/${org.id}/sso/domains/${id}/verify`, { method: 'POST' }),
    [fbKeys.sso(org.id)],
    (d) => toast.success(t('finalb.sso.dom.verifiedToast', { domain: d.domain })),
  );
  const tone = (s: SsoDomainDto['status']) =>
    s === 'Verified' ? 'success' : s === 'Rejected' ? 'danger' : 'warning';
  return (
    <section className="card stack" aria-labelledby="sso-dom-h">
      <h3 id="sso-dom-h">{t('finalb.sso.dom.title')}</h3>
      <p className="small muted">{t('finalb.sso.dom.note')}</p>
      <ul className="stack" style={{ listStyle: 'none', padding: 0 }} data-testid="sso-domains">
        {current.domains.map((d) => (
          <li key={d.id} className="card card--flat stack" data-domain={d.domain}>
            <div className="row row--between">
              <strong>{d.domain}</strong>
              <Badge tone={tone(d.status)}>{t(`finalb.sso.dom.status.${d.status}`)}</Badge>
            </div>
            {d.status === 'Verified' ? (
              <p className="small">
                {d.verifiedVia === 'staff'
                  ? t('finalb.sso.dom.viaStaff', {
                      date: d.verifiedAt ? fmtDate(d.verifiedAt) : '',
                    })
                  : t('finalb.sso.dom.viaDns', { date: d.verifiedAt ? fmtDate(d.verifiedAt) : '' })}
              </p>
            ) : d.status === 'Rejected' ? (
              <Notice tone="danger">
                {t('finalb.sso.dom.rejected', { note: d.decisionNote ?? '' })}
              </Notice>
            ) : (
              <>
                <p className="small">{t('finalb.sso.dom.pending')}</p>
                <dl className="small" style={{ margin: 0 }}>
                  <dt>{t('finalb.sso.dom.txtName')}</dt>
                  <dd>
                    <code>{d.txtRecordName}</code>
                  </dd>
                  <dt>{t('finalb.sso.dom.txtValue')}</dt>
                  <dd>
                    <code style={{ wordBreak: 'break-all' }}>{d.txtRecordValue}</code>
                  </dd>
                </dl>
                {d.lastDnsCheckAt ? (
                  <p className="small muted">
                    {t('finalb.sso.dom.lastCheck', { date: fmtDate(d.lastDnsCheckAt) })}
                  </p>
                ) : null}
                <div>
                  <Button
                    size="sm"
                    variant="secondary"
                    loading={verify.isPending && checking === d.id}
                    onClick={() => {
                      setChecking(d.id);
                      verify.mutate(d.id);
                    }}
                  >
                    {t('finalb.sso.dom.check')}
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {verify.isError ? <Notice tone="danger">{enterpriseError(verify.error, t)}</Notice> : null}
    </section>
  );
}

// ---------------- Staff: SSO domain approvals ----------------
function StaffSsoDomains() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [status, setStatus] = useState('Pending');
  const [rejecting, setRejecting] = useState<StaffSsoDomainDto | null>(null);
  const key = ['admin', 'enterprise', 'sso-domains', status];
  const rows = useQuery({
    queryKey: key,
    queryFn: () =>
      api<StaffSsoDomainDto[]>(
        `/api/admin/enterprise/sso-domains${status ? `?status=${encodeURIComponent(status)}` : ''}`,
      ),
  });
  const approve = useApiMutation(
    (id: string) =>
      api<StaffSsoDomainDto>(`/api/admin/enterprise/sso-domains/${id}/approve`, {
        method: 'POST',
        body: { note: null },
      }),
    [['admin', 'enterprise']],
    (d) => toast.success(t('finalb.staffEnt.dom.approvedToast', { domain: d.domain })),
  );
  return (
    <section className="section" aria-labelledby="se-dom-h">
      <h2 className="section__title" id="se-dom-h">
        {t('finalb.staffEnt.dom.title')}
      </h2>
      <p className="small muted">{t('finalb.staffEnt.dom.note')}</p>
      <Field label={t('dashboard.status')}>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder={t('finalb.orders.any')}
          options={['Pending', 'Verified', 'Rejected'].map((s) => ({
            value: s,
            label: t(`finalb.sso.dom.status.${s}`),
          }))}
        />
      </Field>
      {approve.isError ? <Notice tone="danger">{enterpriseError(approve.error, t)}</Notice> : null}
      <QueryState query={rows}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('finalb.staffEnt.dom.none')} />
          ) : (
            <ul
              className="stack"
              style={{ listStyle: 'none', padding: 0 }}
              data-testid="staff-sso-domains"
            >
              {list.map((d) => (
                <li key={d.id} className="card card--flat row row--between" data-domain={d.domain}>
                  <span>
                    <strong>{d.domain}</strong> · {d.organizationName} ({d.organizationSlug}) ·{' '}
                    {t(`finalb.sso.dom.status.${d.status}`)} · {fmtDate(d.createdAt)}
                    {d.decisionNote ? (
                      <span className="small muted"> · {d.decisionNote}</span>
                    ) : null}
                  </span>
                  {d.status === 'Pending' ? (
                    <span className="row">
                      <Button
                        size="sm"
                        loading={approve.isPending && approve.variables === d.id}
                        onClick={() => approve.mutate(d.id)}
                      >
                        {t('finalb.staffEnt.dom.approve')}
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => setRejecting(d)}>
                        {t('finalb.staffEnt.reject')}
                      </Button>
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      {rejecting ? <RejectDomainDialog row={rejecting} onClose={() => setRejecting(null)} /> : null}
    </section>
  );
}

function RejectDomainDialog({ row, onClose }: { row: StaffSsoDomainDto; onClose: () => void }) {
  const { t } = useI18n();
  const [note, setNote] = useState('');
  const reject = useApiMutation(
    () =>
      api(`/api/admin/enterprise/sso-domains/${row.id}/reject`, {
        method: 'POST',
        body: { note: note.trim() },
      }),
    [['admin', 'enterprise']],
    onClose,
  );
  return (
    <Dialog
      open
      title={t('finalb.staffEnt.dom.rejectTitle', { domain: row.domain })}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            variant="danger"
            disabled={!note.trim()}
            loading={reject.isPending}
            onClick={() => reject.mutate(undefined)}
          >
            {t('finalb.staffEnt.reject')}
          </Button>
        </>
      }
    >
      <Field label={t('finalb.staffEnt.dom.reason')} required>
        <Textarea
          rows={3}
          value={note}
          maxLength={1000}
          onChange={(e) => setNote(e.target.value)}
        />
      </Field>
      {reject.isError ? <Notice tone="danger">{enterpriseError(reject.error, t)}</Notice> : null}
    </Dialog>
  );
}

// ---------------- Staff: enterprise seat requests and orders ----------------
function CreateOrderDialog({ req, onClose }: { req: SeatRequestDto; onClose: () => void }) {
  const { t } = useI18n();
  const toast = useToast();
  const [qty, setQty] = useState(String(req.quantity));
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const q = Number(qty);
  const p = Number(price);
  const valid =
    Number.isInteger(q) && q >= 1 && price.trim() !== '' && p > 0 && /^[A-Za-z]{3}$/.test(currency);
  const create = useApiMutation(
    () =>
      api<EnterpriseOrderDto>('/api/admin/enterprise/orders', {
        method: 'POST',
        body: {
          organizationId: req.organizationId,
          seatRequestId: req.id,
          quantity: q,
          unitPrice: p,
          currency: currency.toUpperCase(),
        },
      }),
    [['admin', 'enterprise']],
    (o) => {
      toast.success(t('finalb.staffEnt.orderCreated', { number: o.invoiceNumber }));
      onClose();
    },
  );
  return (
    <Dialog
      open
      title={t('finalb.staffEnt.createOrder', { org: req.organizationName })}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            disabled={!valid}
            loading={create.isPending}
            onClick={() => create.mutate(undefined)}
          >
            {t('finalb.staffEnt.create')}
          </Button>
        </>
      }
    >
      <Field label={t('finalb.ent.seats.quantity')} required>
        <Input type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} />
      </Field>
      <Field label={t('finalb.staffEnt.unitPrice')} required>
        <Input
          type="number"
          min={0}
          step="0.01"
          inputMode="decimal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Field>
      <Field label={t('commerce.prices.currency')} required>
        <Input
          value={currency}
          maxLength={3}
          onChange={(e) => setCurrency(e.target.value.toUpperCase())}
        />
      </Field>
      <p className="small muted">{t('finalb.staffEnt.createNote')}</p>
      {create.isError ? <Notice tone="danger">{enterpriseError(create.error, t)}</Notice> : null}
    </Dialog>
  );
}

function MarkPaidDialog({ o, onClose }: { o: EnterpriseOrderDto; onClose: () => void }) {
  const { t } = useI18n();
  const toast = useToast();
  const [ref, setRef] = useState('');
  const pay = useApiMutation(
    () =>
      api<EnterpriseOrderDto>(`/api/admin/enterprise/orders/${o.id}/mark-paid`, {
        method: 'POST',
        body: { paymentReference: ref.trim() || null },
      }),
    [
      ['admin', 'enterprise'],
      ['orgs', o.organizationId],
    ],
    (r) => {
      toast.success(
        t('finalb.staffEnt.paid', { before: r.seatLimitBefore ?? 0, after: r.seatLimitAfter ?? 0 }),
      );
      onClose();
    },
  );
  return (
    <Dialog
      open
      title={t('finalb.staffEnt.markPaid')}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button loading={pay.isPending} onClick={() => pay.mutate(undefined)}>
            {t('finalb.staffEnt.markPaid')}
          </Button>
        </>
      }
    >
      <p>{t('finalb.staffEnt.markPaidBody', { number: o.invoiceNumber, n: o.quantity })}</p>
      <Field label={t('finalb.staffEnt.reference')}>
        <Input value={ref} maxLength={200} onChange={(e) => setRef(e.target.value)} />
      </Field>
      {pay.isError ? <Notice tone="danger">{enterpriseError(pay.error, t)}</Notice> : null}
    </Dialog>
  );
}

function RejectDialog({ req, onClose }: { req: SeatRequestDto; onClose: () => void }) {
  const { t } = useI18n();
  const [note, setNote] = useState('');
  const reject = useApiMutation(
    () =>
      api(`/api/admin/enterprise/seat-requests/${req.id}/reject`, {
        method: 'POST',
        body: { note: note.trim() || null },
      }),
    [['admin', 'enterprise']],
    onClose,
  );
  return (
    <Dialog
      open
      title={t('finalb.staffEnt.reject')}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            variant="danger"
            loading={reject.isPending}
            onClick={() => reject.mutate(undefined)}
          >
            {t('finalb.staffEnt.reject')}
          </Button>
        </>
      }
    >
      <Field label={t('finalb.staffEnt.rejectNote')}>
        <Textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
      </Field>
      {reject.isError ? <Notice tone="danger">{enterpriseError(reject.error, t)}</Notice> : null}
    </Dialog>
  );
}

/** `/admin/enterprise`: staff seat requests → enterprise orders (bank transfer) → mark paid. */
export function StaffEnterprisePage() {
  const { t, fmtDate, fmtMoney } = useI18n();
  usePageMeta(t('finalb.staffEnt.title'), undefined, { noindex: true });
  const [status, setStatus] = useState('Requested');
  const requests = useQuery({
    queryKey: fbKeys.staffSeatRequests(status),
    queryFn: () =>
      api<SeatRequestDto[]>(
        `/api/admin/enterprise/seat-requests${status ? `?status=${encodeURIComponent(status)}` : ''}`,
      ),
  });
  const orders = useQuery({
    queryKey: fbKeys.staffOrders,
    queryFn: () => api<EnterpriseOrderDto[]>('/api/admin/enterprise/orders'),
  });
  const [creating, setCreating] = useState<SeatRequestDto | null>(null);
  const [rejecting, setRejecting] = useState<SeatRequestDto | null>(null);
  const [paying, setPaying] = useState<EnterpriseOrderDto | null>(null);
  return (
    <div className="page">
      <PageHeader title={t('finalb.staffEnt.title')} subtitle={t('finalb.staffEnt.subtitle')} />
      <StaffSsoDomains />
      <section className="section" aria-labelledby="se-req-h">
        <h2 className="section__title" id="se-req-h">
          {t('finalb.ent.seats.requests')}
        </h2>
        <Field label={t('dashboard.status')}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder={t('finalb.orders.any')}
            options={['Requested', 'Invoiced', 'Paid', 'Rejected', 'Cancelled'].map((s) => ({
              value: s,
              label: s,
            }))}
          />
        </Field>
        <QueryState query={requests}>
          {(rows) =>
            rows.length === 0 ? (
              <EmptyState title={t('finalb.ent.seats.noRequests')} />
            ) : (
              <ul
                className="stack"
                style={{ listStyle: 'none', padding: 0 }}
                data-testid="staff-seat-requests"
              >
                {rows.map((r) => (
                  <li
                    key={r.id}
                    className="card card--flat row row--between"
                    data-org={r.organizationName}
                  >
                    <span>
                      <strong>{r.organizationName}</strong> ·{' '}
                      {t('finalb.ent.seats.qty', { n: r.quantity })} · <CStatus status={r.status} />{' '}
                      · {fmtDate(r.createdAt)}
                      {r.note ? <span className="small muted"> · {r.note}</span> : null}
                    </span>
                    {r.status === 'Requested' ? (
                      <span className="row">
                        <Button size="sm" onClick={() => setCreating(r)}>
                          {t('finalb.staffEnt.createOrderBtn')}
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => setRejecting(r)}>
                          {t('finalb.staffEnt.reject')}
                        </Button>
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
      <section className="section" aria-labelledby="se-ord-h">
        <h2 className="section__title" id="se-ord-h">
          {t('finalb.ent.seats.orders')}
        </h2>
        <QueryState query={orders}>
          {(rows) =>
            rows.length === 0 ? (
              <EmptyState title={t('finalb.ent.seats.noOrders')} />
            ) : (
              <ul
                className="stack"
                style={{ listStyle: 'none', padding: 0 }}
                data-testid="staff-ent-orders"
              >
                {rows.map((o) => (
                  <li key={o.id} className="card card--flat" data-invoice={o.invoiceNumber}>
                    <div className="row row--between">
                      <span>
                        <strong>{o.organizationName}</strong> · {o.invoiceNumber} ·{' '}
                        {t('finalb.ent.seats.qty', { n: o.quantity })} ·{' '}
                        {fmtMoney(o.total, o.currency)} <CStatus status={o.status} />
                      </span>
                      <span className="row">
                        <InvoicePdfButton o={o} staff />
                        {o.status === 'AwaitingPayment' ? (
                          <Button size="sm" onClick={() => setPaying(o)}>
                            {t('finalb.staffEnt.markPaid')}
                          </Button>
                        ) : null}
                      </span>
                    </div>
                    {o.status === 'Paid' ? (
                      <p className="small muted">
                        {t('finalb.staffEnt.paidLine', {
                          date: fmtDate(o.paidAt),
                          ref: o.paymentReference ?? '—',
                          before: o.seatLimitBefore ?? 0,
                          after: o.seatLimitAfter ?? 0,
                        })}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
      {creating ? <CreateOrderDialog req={creating} onClose={() => setCreating(null)} /> : null}
      {rejecting ? <RejectDialog req={rejecting} onClose={() => setRejecting(null)} /> : null}
      {paying ? <MarkPaidDialog o={paying} onClose={() => setPaying(null)} /> : null}
    </div>
  );
}
