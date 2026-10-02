import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, qs } from '../../api/client';
import { useApiMutation, useCategories } from '../../api/hooks';
import { fbKeys } from '../../api/finalb';
import type { LinkedCourseDto } from '../../api/finalb';
import {
  CERT_KINDS,
  CERT_STATES,
  COLLECTION_KINDS,
  IDEA_STATES,
  IDEA_TRANSITIONS,
  VERIFIED_STATES,
  loc,
} from '../../api/discover';
import type {
  BestsellerRunDto,
  BestsellerStat,
  CertificationAdminDto,
  CertificationKind,
  CertificationState,
  CertificationUpsert,
  CollectionAdminDto,
  CollectionDto,
  CollectionKind,
  CourseIdeaDto,
  CourseIdeaState,
  CoverageReportDto,
  IssuerDto,
  ObjectiveDto,
  PathwayAdminDto,
  PathwayDetailDto,
  RoadmapImportResultDto,
  SkillDto,
  UnknownSkillCodeDto,
} from '../../api/discover';
import { COURSE_LEVELS } from '../../api/types';
import type { CourseLevel } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { CoverageTable } from '../../components/discover/Coverage';
import { CourseSearch, OrderedCoursePicker, UserPicker } from '../../components/discover/Pickers';
import type { PickedCourse } from '../../components/discover/Pickers';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import '../../styles/discover.css';

/** Server default for Taxonomy:CertificationFreshDays; the server enforces the configured value. */
export const FRESH_DAYS = 180;
const SKILL_CODE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;

const akeys = {
  skills: ['admin', 'skills'] as const,
  unknownCodes: ['admin', 'skills', 'unknown'] as const,
  issuers: ['admin', 'cert-issuers'] as const,
  certs: (state: string, stale: boolean) => ['admin', 'certs', state, stale] as const,
  cert: (id: string) => ['admin', 'cert', id] as const,
  coverage: (id: string, courseId: string) => ['admin', 'cert', id, 'coverage', courseId] as const,
  pathways: ['admin', 'pathways'] as const,
  collections: ['admin', 'collections'] as const,
  bestsellers: ['admin', 'bestsellers'] as const,
  ideas: ['admin', 'ideas'] as const,
};

const dateInput = (iso: string | null | undefined) => (iso ? iso.slice(0, 10) : '');
const toIso = (d: string) => (d ? new Date(`${d}T00:00:00Z`).toISOString() : null);
const nz = (s: string) => (s.trim() ? s.trim() : null);

function ErrorNotice({ error }: { error: unknown }) {
  const { t } = useI18n();
  return error ? <Notice tone="danger">{errorMessage(error, t)}</Notice> : null;
}

// =====================================================================================
// Skills
// =====================================================================================
interface SkillForm {
  code: string;
  nameEn: string;
  nameAr: string;
  parentId: string;
  isActive: boolean;
}

export function AdminSkillsPage() {
  const { t, lang } = useI18n();
  const toast = useToast();
  usePageMeta(t('discover.admin.skills.title'), undefined, { noindex: true });
  const skills = useQuery({
    queryKey: akeys.skills,
    queryFn: () => api<SkillDto[]>('/api/admin/skills'),
  });
  const unknown = useQuery({
    queryKey: akeys.unknownCodes,
    queryFn: () => api<UnknownSkillCodeDto[]>('/api/admin/skills/unknown-question-codes'),
  });
  const [editing, setEditing] = useState<{ id: number | null; form: SkillForm } | null>(null);
  const [codeError, setCodeError] = useState('');
  const save = useApiMutation(
    (e: { id: number | null; form: SkillForm }) =>
      api<SkillDto>(e.id ? `/api/admin/skills/${e.id}` : '/api/admin/skills', {
        method: e.id ? 'PUT' : 'POST',
        body: {
          code: e.form.code.trim(),
          nameEn: e.form.nameEn.trim(),
          nameAr: nz(e.form.nameAr),
          parentId: e.form.parentId ? Number(e.form.parentId) : null,
          isActive: e.form.isActive,
        },
      }),
    [akeys.skills, akeys.unknownCodes, ['discover', 'skills']],
    () => {
      setEditing(null);
      toast.success(t('discover.admin.saved'));
    },
  );
  const open = (s?: SkillDto, code?: string) => {
    save.reset();
    setCodeError('');
    setEditing({
      id: s?.id ?? null,
      form: {
        code: s?.code ?? code ?? '',
        nameEn: s?.nameEn ?? '',
        nameAr: s?.nameAr ?? '',
        parentId: s?.parentId ? String(s.parentId) : '',
        isActive: s?.isActive ?? true,
      },
    });
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!SKILL_CODE.test(editing.form.code.trim())) {
      setCodeError(t('discover.admin.skills.codeRule'));
      return;
    }
    save.mutate(editing);
  };
  const set = (patch: Partial<SkillForm>) =>
    editing && setEditing({ ...editing, form: { ...editing.form, ...patch } });
  const byId = new Map((skills.data ?? []).map((s) => [s.id, s]));

  return (
    <>
      <PageHeader
        title={t('discover.admin.skills.title')}
        subtitle={t('discover.admin.skills.subtitle')}
        actions={<Button onClick={() => open()}>{t('discover.admin.skills.new')}</Button>}
      />
      <QueryState query={skills}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('discover.admin.skills.empty')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('discover.admin.skills.code')}</th>
                    <th scope="col">{t('discover.admin.skills.name')}</th>
                    <th scope="col">{t('discover.admin.skills.parent')}</th>
                    <th scope="col">{t('discover.admin.status')}</th>
                    <th scope="col">
                      <span className="visually-hidden">{t('discover.admin.actions')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => (
                    <tr key={s.id}>
                      <td className="mono">{s.code}</td>
                      <td>{loc(lang, s.nameEn, s.nameAr)}</td>
                      <td>{s.parentId ? (byId.get(s.parentId)?.code ?? s.parentId) : '—'}</td>
                      <td>
                        <Badge tone={s.isActive ? 'success' : 'neutral'}>
                          {s.isActive ? t('discover.admin.active') : t('discover.admin.inactive')}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => open(s)}
                          aria-label={t('discover.admin.editNamed', { title: s.code })}
                        >
                          {t('discover.admin.edit')}
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
      <section className="section" aria-labelledby="unknown-codes">
        <h2 className="section__title" id="unknown-codes">
          {t('discover.admin.skills.unknownTitle')}
        </h2>
        <p className="small muted">{t('discover.admin.skills.unknownBody')}</p>
        <QueryState query={unknown}>
          {(rows) =>
            rows.length === 0 ? (
              <p className="small">{t('discover.admin.skills.unknownNone')}</p>
            ) : (
              <ul className="ordered-picker">
                {rows.map((r) => (
                  <li key={r.code}>
                    <span className="mono">
                      {r.code}{' '}
                      <span className="small muted">
                        ({t('discover.admin.skills.questions', { n: r.questionCount })})
                      </span>
                    </span>
                    <Button size="sm" variant="secondary" onClick={() => open(undefined, r.code)}>
                      {t('discover.admin.skills.addToCatalog')}
                    </Button>
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
      <Dialog
        open={!!editing}
        title={editing?.id ? t('discover.admin.skills.edit') : t('discover.admin.skills.new')}
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <form
            onSubmit={submit}
            className="stack"
            style={{ display: 'grid', gap: 'var(--space-3)' }}
          >
            <Field
              label={t('discover.admin.skills.code')}
              required
              error={codeError}
              hint={t('discover.admin.skills.codeRule')}
            >
              <Input
                value={editing.form.code}
                onChange={(e) => set({ code: e.target.value })}
                required
              />
            </Field>
            <Field label={t('discover.admin.skills.nameEn')} required>
              <Input
                value={editing.form.nameEn}
                onChange={(e) => set({ nameEn: e.target.value })}
                required
              />
            </Field>
            <Field label={t('discover.admin.skills.nameAr')}>
              <Input
                dir="rtl"
                lang="ar"
                value={editing.form.nameAr}
                onChange={(e) => set({ nameAr: e.target.value })}
              />
            </Field>
            <Field label={t('discover.admin.skills.parent')}>
              <Select
                value={editing.form.parentId}
                onChange={(e) => set({ parentId: e.target.value })}
                placeholder={t('discover.admin.none')}
                options={(skills.data ?? [])
                  .filter((s) => s.id !== editing.id)
                  .map((s) => ({ value: String(s.id), label: `${s.code} — ${s.nameEn}` }))}
              />
            </Field>
            <Checkbox
              label={t('discover.admin.active')}
              checked={editing.form.isActive}
              onChange={(e) => set({ isActive: e.target.checked })}
            />
            <ErrorNotice error={save.error} />
            <div className="form-actions">
              <Button variant="secondary" onClick={() => setEditing(null)}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" loading={save.isPending}>
                {t('common.save')}
              </Button>
            </div>
          </form>
        ) : null}
      </Dialog>
    </>
  );
}

// =====================================================================================
// Certification directory
// =====================================================================================
function IssuersPanel() {
  const { t } = useI18n();
  const toast = useToast();
  const issuers = useQuery({
    queryKey: akeys.issuers,
    queryFn: () => api<IssuerDto[]>('/api/admin/certification-issuers'),
  });
  const [editing, setEditing] = useState<{
    id: string | null;
    name: string;
    websiteUrl: string;
    country: string;
  } | null>(null);
  const save = useApiMutation(
    (e: NonNullable<typeof editing>) =>
      api<IssuerDto>(
        e.id ? `/api/admin/certification-issuers/${e.id}` : '/api/admin/certification-issuers',
        {
          method: e.id ? 'PUT' : 'POST',
          body: { name: e.name.trim(), websiteUrl: nz(e.websiteUrl), country: nz(e.country) },
        },
      ),
    [akeys.issuers],
    () => {
      setEditing(null);
      toast.success(t('discover.admin.saved'));
    },
  );
  return (
    <section className="section" aria-labelledby="issuers-h">
      <div className="section__head">
        <h2 className="section__title" id="issuers-h">
          {t('discover.admin.certs.issuers')}
        </h2>
        <Button
          size="sm"
          onClick={() => {
            save.reset();
            setEditing({ id: null, name: '', websiteUrl: '', country: '' });
          }}
        >
          {t('discover.admin.certs.newIssuer')}
        </Button>
      </div>
      <QueryState query={issuers}>
        {(list) =>
          list.length === 0 ? (
            <p className="small muted">{t('discover.admin.certs.noIssuers')}</p>
          ) : (
            <ul className="ordered-picker">
              {list.map((i) => (
                <li key={i.id}>
                  <span>
                    <strong>{i.name}</strong>{' '}
                    <span className="small muted">
                      {[i.country, i.websiteUrl].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    aria-label={t('discover.admin.editNamed', { title: i.name })}
                    onClick={() => {
                      save.reset();
                      setEditing({
                        id: i.id,
                        name: i.name,
                        websiteUrl: i.websiteUrl ?? '',
                        country: i.country ?? '',
                      });
                    }}
                  >
                    {t('discover.admin.edit')}
                  </Button>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <Dialog
        open={!!editing}
        title={
          editing?.id ? t('discover.admin.certs.editIssuer') : t('discover.admin.certs.newIssuer')
        }
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <form
            className="stack"
            style={{ display: 'grid', gap: 'var(--space-3)' }}
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(editing);
            }}
          >
            <Field label={t('discover.admin.certs.issuerName')} required>
              <Input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                required
              />
            </Field>
            <Field
              label={t('discover.admin.certs.website')}
              hint={t('discover.admin.certs.httpsHint')}
            >
              <Input
                type="url"
                value={editing.websiteUrl}
                onChange={(e) => setEditing({ ...editing, websiteUrl: e.target.value })}
              />
            </Field>
            <Field label={t('discover.admin.certs.country')}>
              <Input
                value={editing.country}
                onChange={(e) => setEditing({ ...editing, country: e.target.value })}
              />
            </Field>
            <ErrorNotice error={save.error} />
            <div className="form-actions">
              <Button variant="secondary" onClick={() => setEditing(null)}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" loading={save.isPending}>
                {t('common.save')}
              </Button>
            </div>
          </form>
        ) : null}
      </Dialog>
    </section>
  );
}

type CertForm = { [K in Exclude<keyof CertificationUpsert, 'hasNonMcqTasks'>]-?: string } & {
  hasNonMcqTasks: boolean;
};

function certToForm(c?: CertificationAdminDto): CertForm {
  return {
    issuerId: c?.issuerId ?? '',
    title: c?.title ?? '',
    slug: c?.slug ?? '',
    jurisdiction: c?.jurisdiction ?? '',
    examCode: c?.examCode ?? '',
    levelOrPart: c?.levelOrPart ?? '',
    version: c?.version ?? '',
    effectiveFrom: dateInput(c?.effectiveFrom),
    effectiveTo: dateInput(c?.effectiveTo),
    prerequisites: c?.prerequisites ?? '',
    officialSourceUrl: c?.officialSourceUrl ?? '',
    lastCheckedAt: dateInput(c?.lastCheckedAt),
    evidenceNotes: c?.evidenceNotes ?? '',
    renewalInfo: c?.renewalInfo ?? '',
    rightsNotes: c?.rightsNotes ?? '',
    kind: c?.kind ?? 'Examination',
    hasNonMcqTasks: c?.hasNonMcqTasks ?? false,
    nonMcqDisclosure: c?.nonMcqDisclosure ?? '',
    replacedById: c?.replacedById ?? '',
  };
}

function formToBody(f: CertForm): CertificationUpsert {
  return {
    issuerId: f.issuerId,
    title: f.title.trim(),
    slug: nz(f.slug),
    jurisdiction: nz(f.jurisdiction),
    examCode: nz(f.examCode),
    levelOrPart: nz(f.levelOrPart),
    version: nz(f.version),
    effectiveFrom: toIso(f.effectiveFrom),
    effectiveTo: toIso(f.effectiveTo),
    prerequisites: nz(f.prerequisites),
    officialSourceUrl: nz(f.officialSourceUrl),
    lastCheckedAt: toIso(f.lastCheckedAt),
    evidenceNotes: nz(f.evidenceNotes),
    renewalInfo: nz(f.renewalInfo),
    rightsNotes: nz(f.rightsNotes),
    kind: f.kind as CertificationKind,
    hasNonMcqTasks: f.hasNonMcqTasks,
    nonMcqDisclosure: nz(f.nonMcqDisclosure),
    replacedById: nz(f.replacedById),
  };
}

function CertificationForm({
  initial,
  submitLabel,
  onSubmit,
  pending,
  error,
  allCerts,
}: {
  initial?: CertificationAdminDto;
  submitLabel: string;
  onSubmit: (body: CertificationUpsert) => void;
  pending: boolean;
  error: unknown;
  allCerts?: CertificationAdminDto[];
}) {
  const { t } = useI18n();
  const issuers = useQuery({
    queryKey: akeys.issuers,
    queryFn: () => api<IssuerDto[]>('/api/admin/certification-issuers'),
  });
  const [f, setF] = useState<CertForm>(() => certToForm(initial));
  useEffect(() => setF(certToForm(initial)), [initial]);
  const set = (patch: Partial<CertForm>) => setF((x) => ({ ...x, ...patch }));
  return (
    <form
      className="stack"
      style={{ display: 'grid', gap: 'var(--space-3)' }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formToBody(f));
      }}
    >
      <div className="dfilters">
        <Field label={t('discover.admin.certs.issuer')} required>
          <Select
            value={f.issuerId}
            required
            onChange={(e) => set({ issuerId: e.target.value })}
            placeholder={t('discover.admin.choose')}
            options={(issuers.data ?? []).map((i) => ({ value: i.id, label: i.name }))}
          />
        </Field>
        <Field label={t('discover.admin.certs.titleField')} required>
          <Input value={f.title} onChange={(e) => set({ title: e.target.value })} required />
        </Field>
        <Field label={t('discover.admin.certs.slug')} hint={t('discover.admin.certs.slugHint')}>
          <Input value={f.slug} onChange={(e) => set({ slug: e.target.value })} />
        </Field>
        <Field label={t('discover.cert.kind')} required>
          <Select
            value={f.kind}
            onChange={(e) => set({ kind: e.target.value })}
            options={CERT_KINDS.map((k) => ({ value: k, label: t(`discover.certKind.${k}`) }))}
          />
        </Field>
        <Field label={t('discover.cert.examCode')}>
          <Input value={f.examCode} onChange={(e) => set({ examCode: e.target.value })} />
        </Field>
        <Field label={t('discover.cert.level')}>
          <Input value={f.levelOrPart} onChange={(e) => set({ levelOrPart: e.target.value })} />
        </Field>
        <Field label={t('discover.cert.version')}>
          <Input value={f.version} onChange={(e) => set({ version: e.target.value })} />
        </Field>
        <Field label={t('discover.cert.jurisdiction')}>
          <Input value={f.jurisdiction} onChange={(e) => set({ jurisdiction: e.target.value })} />
        </Field>
        <Field label={t('discover.admin.certs.effectiveFrom')}>
          <Input
            type="date"
            value={f.effectiveFrom}
            onChange={(e) => set({ effectiveFrom: e.target.value })}
          />
        </Field>
        <Field label={t('discover.admin.certs.effectiveTo')}>
          <Input
            type="date"
            value={f.effectiveTo}
            onChange={(e) => set({ effectiveTo: e.target.value })}
          />
        </Field>
      </div>
      <Field label={t('discover.cert.officialSource')} hint={t('discover.admin.certs.httpsHint')}>
        <Input
          type="url"
          value={f.officialSourceUrl}
          onChange={(e) => set({ officialSourceUrl: e.target.value })}
        />
      </Field>
      <Field
        label={t('discover.cert.lastCheckedLabel')}
        hint={t('discover.admin.certs.lastCheckedHint', { n: FRESH_DAYS })}
      >
        <Input
          type="date"
          value={f.lastCheckedAt}
          onChange={(e) => set({ lastCheckedAt: e.target.value })}
        />
      </Field>
      <Field label={t('discover.cert.prerequisites')}>
        <Textarea
          rows={2}
          value={f.prerequisites}
          onChange={(e) => set({ prerequisites: e.target.value })}
        />
      </Field>
      <Field label={t('discover.cert.renewal')}>
        <Textarea
          rows={2}
          value={f.renewalInfo}
          onChange={(e) => set({ renewalInfo: e.target.value })}
        />
      </Field>
      <Field label={t('discover.admin.certs.evidence')} hint={t('discover.admin.certs.internal')}>
        <Textarea
          rows={2}
          value={f.evidenceNotes}
          onChange={(e) => set({ evidenceNotes: e.target.value })}
        />
      </Field>
      <Field label={t('discover.admin.certs.rights')} hint={t('discover.admin.certs.internal')}>
        <Textarea
          rows={2}
          value={f.rightsNotes}
          onChange={(e) => set({ rightsNotes: e.target.value })}
        />
      </Field>
      <Checkbox
        label={t('discover.admin.certs.hasNonMcq')}
        checked={f.hasNonMcqTasks}
        onChange={(e) => set({ hasNonMcqTasks: e.target.checked })}
      />
      {f.hasNonMcqTasks ? (
        <Field
          label={t('discover.cert.nonMcqTitle')}
          required
          hint={t('discover.admin.certs.nonMcqHint')}
        >
          <Textarea
            rows={3}
            value={f.nonMcqDisclosure}
            onChange={(e) => set({ nonMcqDisclosure: e.target.value })}
          />
        </Field>
      ) : null}
      {allCerts ? (
        <Field label={t('discover.admin.certs.replacedBy')}>
          <Select
            value={f.replacedById}
            onChange={(e) => set({ replacedById: e.target.value })}
            placeholder={t('discover.admin.none')}
            options={allCerts
              .filter((c) => c.id !== initial?.id)
              .map((c) => ({ value: c.id, label: c.title }))}
          />
        </Field>
      ) : null}
      {initial ? <Notice tone="warning">{t('discover.admin.certs.editClears')}</Notice> : null}
      <ErrorNotice error={error} />
      <div className="form-actions">
        <Button type="submit" loading={pending}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export function AdminCertificationsPage() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const navigate = useNavigate();
  usePageMeta(t('discover.admin.certs.title'), undefined, { noindex: true });
  const [params, setParams] = useSearchParams();
  const state = params.get('state') ?? '';
  const stale = params.get('stale') === 'true';
  const certs = useQuery({
    queryKey: akeys.certs(state, stale),
    queryFn: () =>
      api<CertificationAdminDto[]>(
        `/api/admin/certifications${qs({ state: state || undefined, stale: stale || undefined })}`,
      ),
  });
  const [creating, setCreating] = useState(false);
  const create = useApiMutation(
    (body: CertificationUpsert) =>
      api<CertificationAdminDto>('/api/admin/certifications', { body }),
    [['admin', 'certs']],
    (c) => {
      setCreating(false);
      toast.success(t('discover.admin.saved'));
      navigate(`/admin/certifications/${c.id}`);
    },
  );
  const { hasRole } = useAuth();
  const flag = useApiMutation(
    () => api<{ flagged: number }>('/api/admin/certifications/flag-stale', { method: 'POST' }),
    [['admin', 'certs']],
    (r) => toast.success(t('discover.admin.certs.flagged', { n: r.flagged })),
  );
  const setParam = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v);
    else next.delete(k);
    setParams(next);
  };
  return (
    <>
      <PageHeader
        title={t('discover.admin.certs.title')}
        subtitle={t('discover.admin.certs.subtitle')}
        actions={
          <>
            {hasRole('Admin', 'SuperAdmin') ? (
              <Button
                variant="secondary"
                loading={flag.isPending}
                onClick={() =>
                  flag.mutate(undefined, { onError: (e) => toast.error(errorMessage(e, t)) })
                }
              >
                {t('discover.admin.certs.flagStale')}
              </Button>
            ) : null}
            <Button
              onClick={() => {
                create.reset();
                setCreating(true);
              }}
            >
              {t('discover.admin.certs.new')}
            </Button>
          </>
        }
      />
      <VerificationRules />
      <div className="filters card card--flat" style={{ marginBlock: 'var(--space-4)' }}>
        <Field label={t('discover.admin.certs.state')}>
          <Select
            value={state}
            onChange={(e) => setParam('state', e.target.value)}
            placeholder={t('discover.filters.any')}
            options={CERT_STATES.map((s) => ({ value: s, label: t(`discover.certState.${s}`) }))}
          />
        </Field>
        <Checkbox
          label={t('discover.admin.certs.staleQueue')}
          hint={t('discover.admin.certs.staleQueueHint')}
          checked={stale}
          onChange={(e) => setParam('stale', e.target.checked ? 'true' : '')}
        />
      </div>
      <QueryState query={certs}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState
              title={stale ? t('discover.admin.certs.staleEmpty') : t('discover.admin.certs.empty')}
            />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('discover.admin.certs.titleField')}</th>
                    <th scope="col">{t('discover.cert.issuer')}</th>
                    <th scope="col">{t('discover.admin.certs.state')}</th>
                    <th scope="col">{t('discover.cert.lastCheckedLabel')}</th>
                    <th scope="col">{t('discover.admin.certs.visibility')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <Link to={`/admin/certifications/${c.id}`}>{c.title}</Link>
                        {c.examCode ? (
                          <span className="small muted mono"> {c.examCode}</span>
                        ) : null}
                      </td>
                      <td>{c.issuerName}</td>
                      <td>
                        <Badge tone="info">{t(`discover.certState.${c.state}`)}</Badge>
                      </td>
                      <td>
                        {fmtDate(c.lastCheckedAt) || '—'}{' '}
                        {c.isStale ? (
                          <Badge tone="warning">{t('discover.admin.certs.stale')}</Badge>
                        ) : null}
                      </td>
                      <td>
                        <Badge tone={c.publiclyVisible ? 'success' : 'neutral'}>
                          {c.publiclyVisible
                            ? t('discover.admin.certs.public')
                            : t('discover.admin.certs.hidden')}
                        </Badge>
                        {!c.reviewerId && VERIFIED_STATES.includes(c.state) ? (
                          <span className="small muted">
                            {' '}
                            {t('discover.admin.certs.needsReverify')}
                          </span>
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
      <IssuersPanel />
      <Dialog
        open={creating}
        title={t('discover.admin.certs.new')}
        onClose={() => setCreating(false)}
        wide
      >
        <CertificationForm
          submitLabel={t('discover.admin.certs.create')}
          onSubmit={(b) => create.mutate(b)}
          pending={create.isPending}
          error={create.error}
        />
      </Dialog>
    </>
  );
}

function VerificationRules() {
  const { t } = useI18n();
  return (
    <details className="card card--flat">
      <summary>
        <strong>{t('discover.admin.certs.rulesTitle')}</strong>
      </summary>
      <ul className="small">
        <li>{t('discover.admin.certs.rule.https')}</li>
        <li>{t('discover.admin.certs.rule.fresh', { n: FRESH_DAYS })}</li>
        <li>{t('discover.admin.certs.rule.reviewer')}</li>
        <li>{t('discover.admin.certs.rule.nonMcq')}</li>
        <li>{t('discover.admin.certs.rule.objectives')}</li>
        <li>{t('discover.admin.certs.rule.liveCourse')}</li>
        <li>{t('discover.admin.certs.rule.edit')}</li>
        <li>{t('discover.admin.certs.rule.retired')}</li>
      </ul>
    </details>
  );
}

/** Client-side preview of the server's verification checks for a target state (the server decides). */
export function verificationChecks(
  c: Pick<
    CertificationAdminDto,
    | 'officialSourceUrl'
    | 'lastCheckedAt'
    | 'lastEditedBy'
    | 'hasNonMcqTasks'
    | 'nonMcqDisclosure'
    | 'objectives'
  >,
  target: CertificationState,
  userId: string | undefined,
  now = Date.now(),
): { key: string; ok: boolean | null }[] {
  if (!VERIFIED_STATES.includes(target)) return [];
  const fresh =
    !!c.lastCheckedAt && now - new Date(c.lastCheckedAt).getTime() <= FRESH_DAYS * 86_400_000;
  const checks: { key: string; ok: boolean | null }[] = [
    { key: 'https', ok: /^https:\/\/\S+$/i.test(c.officialSourceUrl ?? '') },
    { key: 'fresh', ok: fresh },
    { key: 'reviewer', ok: !!userId && c.lastEditedBy !== userId },
  ];
  if (c.hasNonMcqTasks) checks.push({ key: 'nonMcq', ok: !!c.nonMcqDisclosure?.trim() });
  if (target === 'InProduction' || target === 'PublishedPreparation')
    checks.push({ key: 'objectives', ok: c.objectives.length > 0 });
  // Linked live courses are not listed by the admin API, so this one is left to the server.
  if (target === 'PublishedPreparation') checks.push({ key: 'liveCourse', ok: null });
  return checks;
}

function StatePanel({ cert }: { cert: CertificationAdminDto }) {
  const { t, fmtDate } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  // Retired entries can only be reopened as research candidates; re-posting the current state re-verifies it.
  const allowed: CertificationState[] =
    cert.state === 'Retired' ? ['ResearchCandidate'] : [...CERT_STATES];
  const [target, setTarget] = useState<CertificationState>(() =>
    cert.state === 'Retired'
      ? 'ResearchCandidate'
      : VERIFIED_STATES.includes(cert.state) && !cert.reviewerId
        ? cert.state
        : cert.state === 'ResearchCandidate'
          ? 'Verified'
          : cert.state,
  );
  const [notes, setNotes] = useState('');
  const change = useApiMutation(
    () =>
      api<CertificationAdminDto>(`/api/admin/certifications/${cert.id}/state`, {
        body: { state: target, notes: nz(notes) },
      }),
    [akeys.cert(cert.id), ['admin', 'certs'], ['discover']],
    () => {
      setNotes('');
      toast.success(t('discover.admin.certs.stateChanged'));
    },
  );
  const checks = verificationChecks(cert, target, user?.id);
  return (
    <section className="section card" aria-labelledby="state-h">
      <h2 className="section__title" id="state-h">
        {t('discover.admin.certs.stateTitle')}
      </h2>
      <dl className="dfacts">
        <dt>{t('discover.admin.certs.state')}</dt>
        <dd>
          <Badge tone="info">{t(`discover.certState.${cert.state}`)}</Badge>
        </dd>
        <dt>{t('discover.admin.certs.verified')}</dt>
        <dd>
          {cert.reviewerId
            ? t('discover.admin.certs.verifiedOn', { date: fmtDate(cert.verifiedAt) })
            : t('discover.admin.certs.notVerified')}
        </dd>
        <dt>{t('discover.admin.certs.visibility')}</dt>
        <dd>
          {cert.publiclyVisible
            ? t('discover.admin.certs.public')
            : t('discover.admin.certs.hidden')}
        </dd>
        {cert.staleFlaggedAt ? (
          <>
            <dt>{t('discover.admin.certs.staleFlagged')}</dt>
            <dd>{fmtDate(cert.staleFlaggedAt)}</dd>
          </>
        ) : null}
      </dl>
      <form
        className="stack"
        style={{ display: 'grid', gap: 'var(--space-3)', marginBlockStart: 'var(--space-4)' }}
        onSubmit={(e) => {
          e.preventDefault();
          change.mutate(undefined);
        }}
      >
        <Field label={t('discover.admin.certs.newState')}>
          <Select
            value={target}
            onChange={(e) => setTarget(e.target.value as CertificationState)}
            options={allowed.map((s) => ({ value: s, label: t(`discover.certState.${s}`) }))}
          />
        </Field>
        {checks.length > 0 ? (
          <ul className="check-list small" aria-label={t('discover.admin.certs.checks')}>
            {checks.map((c) => (
              <li key={c.key}>
                <span aria-hidden="true">{c.ok === null ? '•' : c.ok ? '✓' : '✗'}</span>{' '}
                {t(`discover.admin.certs.rule.${c.key}`, { n: FRESH_DAYS })}{' '}
                <span className="visually-hidden">
                  {c.ok === null
                    ? t('discover.admin.certs.checkServer')
                    : c.ok
                      ? t('discover.admin.certs.checkOk')
                      : t('discover.admin.certs.checkFail')}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        <Field label={t('discover.admin.certs.notes')}>
          <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>
        <ErrorNotice error={change.error} />
        <div className="form-actions">
          <Button type="submit" loading={change.isPending}>
            {cert.state === target
              ? t('discover.admin.certs.reverify')
              : t('discover.admin.certs.applyState')}
          </Button>
        </div>
      </form>
    </section>
  );
}

function ObjectivesPanel({ cert }: { cert: CertificationAdminDto }) {
  const { t, fmtNumber } = useI18n();
  const toast = useToast();
  const [editing, setEditing] = useState<{
    id: string | null;
    code: string;
    title: string;
    weightPercent: string;
    sortOrder: string;
  } | null>(null);
  const [deleting, setDeleting] = useState<ObjectiveDto | null>(null);
  const save = useApiMutation(
    (e: NonNullable<typeof editing>) =>
      api<CertificationAdminDto>(
        e.id
          ? `/api/admin/certification-objectives/${e.id}`
          : `/api/admin/certifications/${cert.id}/objectives`,
        {
          method: e.id ? 'PUT' : 'POST',
          body: {
            code: e.code.trim(),
            title: e.title.trim(),
            weightPercent: Number(e.weightPercent || 0),
            sortOrder: e.sortOrder ? Number(e.sortOrder) : null,
          },
        },
      ),
    [akeys.cert(cert.id), ['admin', 'certs']],
    () => {
      setEditing(null);
      toast.success(t('discover.admin.saved'));
    },
  );
  const del = useApiMutation(
    (id: string) => api(`/api/admin/certification-objectives/${id}`, { method: 'DELETE' }),
    [akeys.cert(cert.id), ['admin', 'certs']],
    () => {
      setDeleting(null);
      toast.success(t('discover.admin.deleted'));
    },
  );
  const total = cert.objectives.reduce((s, o) => s + o.weightPercent, 0);
  return (
    <section className="section" aria-labelledby="obj-h">
      <div className="section__head">
        <h2 className="section__title" id="obj-h">
          {t('discover.cert.blueprint')}
        </h2>
        <Button
          size="sm"
          onClick={() => {
            save.reset();
            setEditing({ id: null, code: '', title: '', weightPercent: '', sortOrder: '' });
          }}
        >
          {t('discover.admin.certs.addObjective')}
        </Button>
      </div>
      <p className="small muted">
        {t('discover.admin.certs.weightTotal', { n: fmtNumber(total) })}
      </p>
      {cert.objectives.length === 0 ? (
        <p className="small muted">{t('discover.cert.noBlueprint')}</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">{t('discover.cert.objCode')}</th>
                <th scope="col">{t('discover.cert.objTitle')}</th>
                <th scope="col">{t('discover.cert.objWeight')}</th>
                <th scope="col">
                  <span className="visually-hidden">{t('discover.admin.actions')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cert.objectives.map((o) => (
                <tr key={o.id}>
                  <td className="mono">{o.code}</td>
                  <td>{o.title}</td>
                  <td>{fmtNumber(o.weightPercent)}%</td>
                  <td className="row">
                    <Button
                      size="sm"
                      variant="secondary"
                      aria-label={t('discover.admin.editNamed', { title: o.code })}
                      onClick={() => {
                        save.reset();
                        setEditing({
                          id: o.id,
                          code: o.code,
                          title: o.title,
                          weightPercent: String(o.weightPercent),
                          sortOrder: String(o.sortOrder),
                        });
                      }}
                    >
                      {t('discover.admin.edit')}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label={t('discover.admin.deleteNamed', { title: o.code })}
                      onClick={() => {
                        del.reset();
                        setDeleting(o);
                      }}
                    >
                      {t('discover.admin.delete')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Dialog
        open={!!editing}
        title={
          editing?.id
            ? t('discover.admin.certs.editObjective')
            : t('discover.admin.certs.addObjective')
        }
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <form
            className="stack"
            style={{ display: 'grid', gap: 'var(--space-3)' }}
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(editing);
            }}
          >
            <Field label={t('discover.cert.objCode')} required>
              <Input
                value={editing.code}
                onChange={(e) => setEditing({ ...editing, code: e.target.value })}
                required
              />
            </Field>
            <Field label={t('discover.cert.objTitle')} required>
              <Input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                required
              />
            </Field>
            <Field label={t('discover.cert.objWeight')} hint={t('discover.admin.certs.weightHint')}>
              <Input
                type="number"
                min={0}
                max={100}
                step="0.01"
                value={editing.weightPercent}
                onChange={(e) => setEditing({ ...editing, weightPercent: e.target.value })}
              />
            </Field>
            <Field label={t('discover.admin.sortOrder')}>
              <Input
                type="number"
                value={editing.sortOrder}
                onChange={(e) => setEditing({ ...editing, sortOrder: e.target.value })}
              />
            </Field>
            <Notice tone="warning">{t('discover.admin.certs.editClears')}</Notice>
            <ErrorNotice error={save.error} />
            <div className="form-actions">
              <Button variant="secondary" onClick={() => setEditing(null)}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" loading={save.isPending}>
                {t('common.save')}
              </Button>
            </div>
          </form>
        ) : null}
      </Dialog>
      <ConfirmDialog
        open={!!deleting}
        danger
        title={t('discover.admin.deleteNamed', { title: deleting?.code ?? '' })}
        body={
          <>
            <p>{t('discover.admin.certs.deleteObjective')}</p>
            <ErrorNotice error={del.error} />
          </>
        }
        confirmLabel={t('discover.admin.delete')}
        loading={del.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={() => deleting && del.mutate(deleting.id)}
      />
    </section>
  );
}

function LinkedCourses({
  certId,
  onCoverage,
  onUnlink,
  busy,
}: {
  certId: string;
  onCoverage: (c: LinkedCourseDto) => void;
  onUnlink: (c: LinkedCourseDto) => void;
  busy: boolean;
}) {
  const { t, fmtDate } = useI18n();
  const q = useQuery({
    queryKey: fbKeys.certCourses(certId),
    queryFn: () => api<LinkedCourseDto[]>(`/api/admin/certifications/${certId}/courses`),
  });
  return (
    <QueryState query={q}>
      {(list) =>
        list.length === 0 ? (
          <p className="muted">{t('finalb.certCourses.none')}</p>
        ) : (
          <ul
            className="stack"
            style={{ listStyle: 'none', padding: 0 }}
            aria-label={t('finalb.certCourses.title')}
            data-testid="linked-courses"
          >
            {list.map((c) => (
              <li key={c.courseId} className="card card--flat row row--between">
                <span>
                  {c.isLive ? (
                    <Link to={`/courses/${c.slug}`}>{c.title}</Link>
                  ) : (
                    <strong>{c.title}</strong>
                  )}{' '}
                  <Badge tone={c.isLive ? 'success' : 'neutral'}>
                    {c.isLive ? t('finalb.certCourses.live') : c.status}
                  </Badge>{' '}
                  <span className="small muted">
                    {t('finalb.certCourses.linkedAt', { date: fmtDate(c.linkedAt) })}
                  </span>
                </span>
                <span className="row">
                  <Button size="sm" variant="ghost" onClick={() => onCoverage(c)}>
                    {t('discover.admin.certs.coverageFor')}
                  </Button>
                  <Button size="sm" variant="secondary" loading={busy} onClick={() => onUnlink(c)}>
                    {t('discover.admin.certs.unlink')}
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )
      }
    </QueryState>
  );
}

function CourseLinksPanel({ cert }: { cert: CertificationAdminDto }) {
  const { t, fmtNumber } = useI18n();
  const toast = useToast();
  const [courseId, setCourseId] = useState('');
  const [picked, setPicked] = useState<{ id: string; title: string } | null>(null);
  const coverage = useQuery({
    queryKey: akeys.coverage(cert.id, courseId),
    queryFn: () =>
      api<CoverageReportDto>(
        `/api/admin/certifications/${cert.id}/coverage${qs({ courseId: courseId || undefined })}`,
      ),
  });
  const link = useApiMutation(
    (e: { courseId: string; link: boolean }) =>
      api(`/api/admin/certifications/${cert.id}/courses/${e.courseId}`, {
        method: e.link ? 'PUT' : 'DELETE',
      }),
    [['admin', 'cert', cert.id], ['discover']],
    (_r, e) =>
      toast.success(e.link ? t('discover.admin.certs.linked') : t('discover.admin.certs.unlinked')),
  );
  return (
    <section className="section" aria-labelledby="links-h">
      <h2 className="section__title" id="links-h">
        {t('discover.admin.certs.courseLinks')}
      </h2>
      <p className="small muted">{t('discover.admin.certs.linksNote')}</p>
      <LinkedCourses
        certId={cert.id}
        onCoverage={(c) => {
          setPicked({ id: c.courseId, title: c.title });
          setCourseId(c.courseId);
        }}
        onUnlink={(c) =>
          link.mutate(
            { courseId: c.courseId, link: false },
            { onError: (e) => toast.error(errorMessage(e, t)) },
          )
        }
        busy={link.isPending}
      />
      <CourseSearch
        label={t('discover.admin.findCourse')}
        onPick={(c) => setPicked({ id: c.id, title: c.title })}
        pickLabel={(title) => t('discover.admin.chooseNamed', { title })}
      />
      {picked ? (
        <div className="row" style={{ marginBlock: 'var(--space-3)' }}>
          <strong>{picked.title}</strong>
          <Button
            size="sm"
            loading={link.isPending}
            onClick={() =>
              link.mutate(
                { courseId: picked.id, link: true },
                { onError: (e) => toast.error(errorMessage(e, t)) },
              )
            }
          >
            {t('discover.admin.certs.link')}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            loading={link.isPending}
            onClick={() =>
              link.mutate(
                { courseId: picked.id, link: false },
                { onError: (e) => toast.error(errorMessage(e, t)) },
              )
            }
          >
            {t('discover.admin.certs.unlink')}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setCourseId(picked.id)}>
            {t('discover.admin.certs.coverageFor')}
          </Button>
        </div>
      ) : null}
      <h3 style={{ fontSize: 'var(--text-md)' }}>
        {courseId
          ? t('discover.admin.certs.coverageCourse', { title: picked?.title ?? courseId })
          : t('discover.admin.certs.coverageAll')}
        {courseId ? (
          <>
            {' '}
            <Button size="sm" variant="ghost" onClick={() => setCourseId('')}>
              {t('discover.admin.certs.coverageAllBtn')}
            </Button>
          </>
        ) : null}
      </h3>
      <QueryState query={coverage}>
        {(r) => <CoverageTable report={r} fmt={fmtNumber} />}
      </QueryState>
    </section>
  );
}

export function AdminCertificationDetailPage() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  const toast = useToast();
  const cert = useQuery({
    queryKey: akeys.cert(id),
    queryFn: () => api<CertificationAdminDto>(`/api/admin/certifications/${id}`),
  });
  const all = useQuery({
    queryKey: akeys.certs('', false),
    queryFn: () => api<CertificationAdminDto[]>('/api/admin/certifications'),
  });
  usePageMeta(cert.data?.title ?? t('discover.admin.certs.title'), undefined, { noindex: true });
  const update = useApiMutation(
    (body: CertificationUpsert) =>
      api<CertificationAdminDto>(`/api/admin/certifications/${id}`, { method: 'PUT', body }),
    [akeys.cert(id), ['admin', 'certs'], ['discover']],
    () => toast.success(t('discover.admin.saved')),
  );
  return (
    <QueryState query={cert}>
      {(c) => (
        <>
          <nav className="small muted" aria-label={t('common.breadcrumb')}>
            <Link to="/admin/certifications">{t('discover.admin.certs.title')}</Link> / {c.title}
          </nav>
          <PageHeader
            title={c.title}
            subtitle={`${c.issuerName}${c.examCode ? ` · ${c.examCode}` : ''}`}
            actions={
              c.publiclyVisible ? (
                <Link className="btn btn--secondary btn--sm" to={`/certifications/${c.slug}`}>
                  {t('discover.admin.viewPublic')}
                </Link>
              ) : null
            }
          />
          <StatePanel cert={c} />
          <section className="section card" aria-labelledby="edit-h">
            <h2 className="section__title" id="edit-h">
              {t('discover.admin.certs.details')}
            </h2>
            <CertificationForm
              initial={c}
              allCerts={all.data}
              submitLabel={t('common.save')}
              onSubmit={(b) => update.mutate(b)}
              pending={update.isPending}
              error={update.error}
            />
          </section>
          <ObjectivesPanel cert={c} />
          <CourseLinksPanel cert={c} />
        </>
      )}
    </QueryState>
  );
}

// =====================================================================================
// Pathways & collections
// =====================================================================================
interface PathwayForm {
  id: string | null;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  level: CourseLevel;
  categoryId: string;
  isPublished: boolean;
  sortOrder: string;
  courses: PickedCourse[];
  skillCodes: string[];
}

function useNamedCourses(
  ids: string[],
  fetchNames: (() => Promise<{ id: string; title: string }[]>) | null,
) {
  const names = useQuery({
    queryKey: ['admin', 'course-names', ids.join(',')],
    queryFn: () => (fetchNames ? fetchNames() : Promise.resolve([])),
    enabled: !!fetchNames && ids.length > 0,
    retry: false,
  });
  const map = new Map((names.data ?? []).map((c) => [c.id, c.title]));
  return ids.map((id) => ({ id, title: map.get(id) }));
}

function PathwayEditor({
  initial,
  onClose,
}: {
  initial: PathwayAdminDto | null;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const categories = useCategories();
  const skills = useQuery({
    queryKey: akeys.skills,
    queryFn: () => api<SkillDto[]>('/api/admin/skills'),
  });
  const named = useNamedCourses(
    initial?.courseIds ?? [],
    initial
      ? () =>
          api<PathwayDetailDto>(`/api/pathways/${encodeURIComponent(initial.slug)}`).then(
            (p) => p.courses,
          )
      : null,
  );
  const [f, setF] = useState<PathwayForm>({
    id: initial?.id ?? null,
    slug: initial?.slug ?? '',
    titleEn: initial?.titleEn ?? '',
    titleAr: initial?.titleAr ?? '',
    descriptionEn: initial?.descriptionEn ?? '',
    descriptionAr: initial?.descriptionAr ?? '',
    level: initial?.level ?? 'Beginner',
    categoryId: initial?.categoryId ? String(initial.categoryId) : '',
    isPublished: initial?.isPublished ?? false,
    sortOrder: initial ? String(initial.sortOrder) : '',
    courses: [],
    skillCodes: initial?.skillCodes ?? [],
  });
  const namedKey = named.map((n) => `${n.id}:${n.title ?? ''}`).join('|');
  useEffect(() => {
    setF((x) =>
      x.courses.length === 0 && named.length > 0
        ? { ...x, courses: named }
        : {
            ...x,
            courses: x.courses.map((c) => ({
              ...c,
              title: c.title ?? named.find((n) => n.id === c.id)?.title,
            })),
          },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namedKey]);
  const save = useApiMutation(
    () =>
      api<PathwayAdminDto>(f.id ? `/api/admin/pathways/${f.id}` : '/api/admin/pathways', {
        method: f.id ? 'PUT' : 'POST',
        body: {
          slug: f.slug.trim(),
          titleEn: f.titleEn.trim(),
          titleAr: nz(f.titleAr),
          descriptionEn: nz(f.descriptionEn),
          descriptionAr: nz(f.descriptionAr),
          level: f.level,
          categoryId: f.categoryId ? Number(f.categoryId) : null,
          isPublished: f.isPublished,
          sortOrder: f.sortOrder ? Number(f.sortOrder) : null,
          courseIds: f.courses.map((c) => c.id),
          skillCodes: f.skillCodes,
        },
      }),
    [akeys.pathways, ['discover']],
    () => {
      toast.success(t('discover.admin.saved'));
      onClose();
    },
  );
  const set = (p: Partial<PathwayForm>) => setF((x) => ({ ...x, ...p }));
  return (
    <form
      className="stack"
      style={{ display: 'grid', gap: 'var(--space-3)' }}
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(undefined);
      }}
    >
      <div className="dfilters">
        <Field label={t('discover.admin.slug')} required hint={t('discover.admin.slugHint')}>
          <Input value={f.slug} onChange={(e) => set({ slug: e.target.value })} required />
        </Field>
        <Field label={t('discover.admin.titleEn')} required>
          <Input value={f.titleEn} onChange={(e) => set({ titleEn: e.target.value })} required />
        </Field>
        <Field label={t('discover.admin.titleAr')}>
          <Input
            dir="rtl"
            lang="ar"
            value={f.titleAr}
            onChange={(e) => set({ titleAr: e.target.value })}
          />
        </Field>
        <Field label={t('courses.level')}>
          <Select
            value={f.level}
            onChange={(e) => set({ level: e.target.value as CourseLevel })}
            options={COURSE_LEVELS.map((l) => ({ value: l, label: t(`level.${l}`) }))}
          />
        </Field>
        <Field label={t('courses.category')}>
          <Select
            value={f.categoryId}
            onChange={(e) => set({ categoryId: e.target.value })}
            placeholder={t('discover.admin.none')}
            options={(categories.data ?? []).map((c) => ({
              value: String(c.id),
              label: loc(lang, c.nameEn, c.nameAr),
            }))}
          />
        </Field>
        <Field label={t('discover.admin.sortOrder')}>
          <Input
            type="number"
            value={f.sortOrder}
            onChange={(e) => set({ sortOrder: e.target.value })}
          />
        </Field>
      </div>
      <Field label={t('discover.admin.descriptionEn')}>
        <Textarea
          rows={2}
          value={f.descriptionEn}
          onChange={(e) => set({ descriptionEn: e.target.value })}
        />
      </Field>
      <Field label={t('discover.admin.descriptionAr')}>
        <Textarea
          rows={2}
          dir="rtl"
          lang="ar"
          value={f.descriptionAr}
          onChange={(e) => set({ descriptionAr: e.target.value })}
        />
      </Field>
      <Checkbox
        label={t('discover.admin.published')}
        hint={t('discover.admin.pathways.publishedHint')}
        checked={f.isPublished}
        onChange={(e) => set({ isPublished: e.target.checked })}
      />
      <OrderedCoursePicker value={f.courses} onChange={(courses) => set({ courses })} />
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field__label">{t('discover.admin.pathways.skills')}</legend>
        <div className="check-grid">
          {(skills.data ?? [])
            .filter((s) => s.isActive || f.skillCodes.includes(s.code))
            .map((s) => (
              <Checkbox
                key={s.id}
                label={`${s.code} — ${loc(lang, s.nameEn, s.nameAr)}`}
                checked={f.skillCodes.includes(s.code)}
                onChange={(e) =>
                  set({
                    skillCodes: e.target.checked
                      ? [...f.skillCodes, s.code]
                      : f.skillCodes.filter((c) => c !== s.code),
                  })
                }
              />
            ))}
        </div>
      </fieldset>
      <ErrorNotice error={save.error} />
      <div className="form-actions">
        <Button variant="secondary" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" loading={save.isPending}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}

export function AdminPathwaysPage() {
  const { t, lang } = useI18n();
  const toast = useToast();
  usePageMeta(t('discover.admin.pathways.title'), undefined, { noindex: true });
  const list = useQuery({
    queryKey: akeys.pathways,
    queryFn: () => api<PathwayAdminDto[]>('/api/admin/pathways'),
  });
  const [editing, setEditing] = useState<PathwayAdminDto | 'new' | null>(null);
  const [deleting, setDeleting] = useState<PathwayAdminDto | null>(null);
  const del = useApiMutation(
    (id: string) => api(`/api/admin/pathways/${id}`, { method: 'DELETE' }),
    [akeys.pathways, ['discover']],
    () => {
      setDeleting(null);
      toast.success(t('discover.admin.deleted'));
    },
  );
  return (
    <>
      <PageHeader
        title={t('discover.admin.pathways.title')}
        subtitle={t('discover.admin.pathways.subtitle')}
        actions={
          <Button onClick={() => setEditing('new')}>{t('discover.admin.pathways.new')}</Button>
        }
      />
      <QueryState query={list}>
        {(rows) =>
          rows.length === 0 ? (
            <EmptyState title={t('discover.admin.pathways.empty')} />
          ) : (
            <ul className="dlist">
              {rows.map((p) => (
                <li key={p.id} className="card card--flat row row--between">
                  <span>
                    <strong>{loc(lang, p.titleEn, p.titleAr)}</strong>{' '}
                    <span className="small muted mono">/{p.slug}</span>{' '}
                    <Badge tone={p.isPublished ? 'success' : 'neutral'}>
                      {p.isPublished ? t('discover.admin.published') : t('discover.admin.draft')}
                    </Badge>{' '}
                    <span className="small muted">
                      {t('discover.pathways.courseCount', { n: p.courseIds.length })}
                    </span>
                  </span>
                  <span className="row">
                    {p.isPublished ? (
                      <Link className="btn btn--ghost btn--sm" to={`/pathways/${p.slug}`}>
                        {t('discover.admin.viewPublic')}
                      </Link>
                    ) : null}
                    <Button
                      size="sm"
                      variant="secondary"
                      aria-label={t('discover.admin.editNamed', { title: p.titleEn })}
                      onClick={() => setEditing(p)}
                    >
                      {t('discover.admin.edit')}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label={t('discover.admin.deleteNamed', { title: p.titleEn })}
                      onClick={() => {
                        del.reset();
                        setDeleting(p);
                      }}
                    >
                      {t('discover.admin.delete')}
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <Dialog
        open={!!editing}
        wide
        title={
          editing === 'new' ? t('discover.admin.pathways.new') : t('discover.admin.pathways.edit')
        }
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <PathwayEditor
            key={editing === 'new' ? 'new' : editing.id}
            initial={editing === 'new' ? null : editing}
            onClose={() => setEditing(null)}
          />
        ) : null}
      </Dialog>
      <ConfirmDialog
        open={!!deleting}
        danger
        title={t('discover.admin.deleteNamed', { title: deleting?.titleEn ?? '' })}
        body={
          <>
            <p>{t('discover.admin.pathways.deleteBody')}</p>
            <ErrorNotice error={del.error} />
          </>
        }
        confirmLabel={t('discover.admin.delete')}
        loading={del.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={() => deleting && del.mutate(deleting.id)}
      />
    </>
  );
}

interface CollectionForm {
  id: string | null;
  slug: string;
  titleEn: string;
  titleAr: string;
  kind: CollectionKind;
  categoryId: string;
  activeFrom: string;
  activeTo: string;
  sortOrder: string;
  courses: PickedCourse[];
}

function CollectionEditor({
  initial,
  onClose,
}: {
  initial: CollectionAdminDto | null;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const categories = useCategories();
  const named = useNamedCourses(
    initial?.courseIds ?? [],
    initial
      ? () =>
          api<CollectionDto>(`/api/collections/${encodeURIComponent(initial.slug)}`).then(
            (c) => c.courses,
          )
      : null,
  );
  const [f, setF] = useState<CollectionForm>({
    id: initial?.id ?? null,
    slug: initial?.slug ?? '',
    titleEn: initial?.titleEn ?? '',
    titleAr: initial?.titleAr ?? '',
    kind: initial?.kind ?? 'Editorial',
    categoryId: initial?.categoryId ? String(initial.categoryId) : '',
    activeFrom: dateInput(initial?.activeFrom),
    activeTo: dateInput(initial?.activeTo),
    sortOrder: initial ? String(initial.sortOrder) : '',
    courses: [],
  });
  const namedKey = named.map((n) => `${n.id}:${n.title ?? ''}`).join('|');
  useEffect(() => {
    setF((x) =>
      x.courses.length === 0 && named.length > 0
        ? { ...x, courses: named }
        : {
            ...x,
            courses: x.courses.map((c) => ({
              ...c,
              title: c.title ?? named.find((n) => n.id === c.id)?.title,
            })),
          },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namedKey]);
  const save = useApiMutation(
    () =>
      api<CollectionAdminDto>(f.id ? `/api/admin/collections/${f.id}` : '/api/admin/collections', {
        method: f.id ? 'PUT' : 'POST',
        body: {
          slug: f.slug.trim(),
          titleEn: f.titleEn.trim(),
          titleAr: nz(f.titleAr),
          kind: f.kind,
          categoryId: f.categoryId ? Number(f.categoryId) : null,
          activeFrom: toIso(f.activeFrom),
          activeTo: toIso(f.activeTo),
          sortOrder: f.sortOrder ? Number(f.sortOrder) : null,
          courseIds: f.courses.map((c) => c.id),
        },
      }),
    [akeys.collections, ['discover']],
    () => {
      toast.success(t('discover.admin.saved'));
      onClose();
    },
  );
  const set = (p: Partial<CollectionForm>) => setF((x) => ({ ...x, ...p }));
  return (
    <form
      className="stack"
      style={{ display: 'grid', gap: 'var(--space-3)' }}
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(undefined);
      }}
    >
      <div className="dfilters">
        <Field label={t('discover.admin.slug')} required hint={t('discover.admin.slugHint')}>
          <Input value={f.slug} onChange={(e) => set({ slug: e.target.value })} required />
        </Field>
        <Field label={t('discover.admin.titleEn')} required>
          <Input value={f.titleEn} onChange={(e) => set({ titleEn: e.target.value })} required />
        </Field>
        <Field label={t('discover.admin.titleAr')}>
          <Input
            dir="rtl"
            lang="ar"
            value={f.titleAr}
            onChange={(e) => set({ titleAr: e.target.value })}
          />
        </Field>
        <Field label={t('discover.admin.collections.kind')}>
          <Select
            value={f.kind}
            onChange={(e) => set({ kind: e.target.value as CollectionKind })}
            options={COLLECTION_KINDS.map((k) => ({
              value: k,
              label: t(`discover.admin.collections.kind_${k}`),
            }))}
          />
        </Field>
        <Field label={t('courses.category')} hint={t('discover.admin.collections.categoryHint')}>
          <Select
            value={f.categoryId}
            onChange={(e) => set({ categoryId: e.target.value })}
            placeholder={t('discover.admin.none')}
            options={(categories.data ?? []).map((c) => ({
              value: String(c.id),
              label: loc(lang, c.nameEn, c.nameAr),
            }))}
          />
        </Field>
        <Field label={t('discover.admin.collections.activeFrom')}>
          <Input
            type="date"
            value={f.activeFrom}
            onChange={(e) => set({ activeFrom: e.target.value })}
          />
        </Field>
        <Field label={t('discover.admin.collections.activeTo')}>
          <Input
            type="date"
            value={f.activeTo}
            onChange={(e) => set({ activeTo: e.target.value })}
          />
        </Field>
        <Field label={t('discover.admin.sortOrder')}>
          <Input
            type="number"
            value={f.sortOrder}
            onChange={(e) => set({ sortOrder: e.target.value })}
          />
        </Field>
      </div>
      <OrderedCoursePicker value={f.courses} onChange={(courses) => set({ courses })} />
      <ErrorNotice error={save.error} />
      <div className="form-actions">
        <Button variant="secondary" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" loading={save.isPending}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}

export function AdminCollectionsPage() {
  const { t, lang, fmtDate } = useI18n();
  const toast = useToast();
  usePageMeta(t('discover.admin.collections.title'), undefined, { noindex: true });
  const list = useQuery({
    queryKey: akeys.collections,
    queryFn: () => api<CollectionAdminDto[]>('/api/admin/collections'),
  });
  const [editing, setEditing] = useState<CollectionAdminDto | 'new' | null>(null);
  const [deleting, setDeleting] = useState<CollectionAdminDto | null>(null);
  const del = useApiMutation(
    (id: string) => api(`/api/admin/collections/${id}`, { method: 'DELETE' }),
    [akeys.collections, ['discover']],
    () => {
      setDeleting(null);
      toast.success(t('discover.admin.deleted'));
    },
  );
  return (
    <>
      <PageHeader
        title={t('discover.admin.collections.title')}
        subtitle={t('discover.admin.collections.subtitle')}
        actions={
          <Button onClick={() => setEditing('new')}>{t('discover.admin.collections.new')}</Button>
        }
      />
      <QueryState query={list}>
        {(rows) =>
          rows.length === 0 ? (
            <EmptyState title={t('discover.admin.collections.empty')} />
          ) : (
            <ul className="dlist">
              {rows.map((c) => (
                <li key={c.id} className="card card--flat row row--between">
                  <span>
                    <strong>{loc(lang, c.titleEn, c.titleAr)}</strong>{' '}
                    <span className="small muted mono">/{c.slug}</span>{' '}
                    <Badge>{t(`discover.admin.collections.kind_${c.kind}`)}</Badge>{' '}
                    <Badge tone={c.activeNow ? 'success' : 'neutral'}>
                      {c.activeNow ? t('discover.admin.active') : t('discover.admin.inactive')}
                    </Badge>{' '}
                    <span className="small muted">
                      {t('discover.pathways.courseCount', { n: c.courseIds.length })}
                      {c.activeFrom || c.activeTo
                        ? ` · ${fmtDate(c.activeFrom) || '…'} – ${fmtDate(c.activeTo) || '…'}`
                        : ''}
                    </span>
                  </span>
                  <span className="row">
                    {c.activeNow ? (
                      <Link className="btn btn--ghost btn--sm" to={`/collections/${c.slug}`}>
                        {t('discover.admin.viewPublic')}
                      </Link>
                    ) : null}
                    <Button
                      size="sm"
                      variant="secondary"
                      aria-label={t('discover.admin.editNamed', { title: c.titleEn })}
                      onClick={() => setEditing(c)}
                    >
                      {t('discover.admin.edit')}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label={t('discover.admin.deleteNamed', { title: c.titleEn })}
                      onClick={() => {
                        del.reset();
                        setDeleting(c);
                      }}
                    >
                      {t('discover.admin.delete')}
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <Dialog
        open={!!editing}
        wide
        title={
          editing === 'new'
            ? t('discover.admin.collections.new')
            : t('discover.admin.collections.edit')
        }
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <CollectionEditor
            key={editing === 'new' ? 'new' : editing.id}
            initial={editing === 'new' ? null : editing}
            onClose={() => setEditing(null)}
          />
        ) : null}
      </Dialog>
      <ConfirmDialog
        open={!!deleting}
        danger
        title={t('discover.admin.deleteNamed', { title: deleting?.titleEn ?? '' })}
        body={
          <>
            <p>{t('discover.admin.collections.deleteBody')}</p>
            <ErrorNotice error={del.error} />
          </>
        }
        confirmLabel={t('discover.admin.delete')}
        loading={del.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={() => deleting && del.mutate(deleting.id)}
      />
    </>
  );
}

// =====================================================================================
// Bestsellers
// =====================================================================================
export function AdminBestsellersPage() {
  const { t, fmtDate, fmtNumber } = useI18n();
  const toast = useToast();
  usePageMeta(t('discover.admin.best.title'), undefined, { noindex: true });
  const list = useQuery({
    queryKey: akeys.bestsellers,
    queryFn: () => api<BestsellerStat[]>('/api/admin/bestsellers'),
  });
  const [run, setRun] = useState<BestsellerRunDto | null>(null);
  const recompute = useApiMutation(
    () => api<BestsellerRunDto>('/api/admin/bestsellers/recompute', { method: 'POST' }),
    [akeys.bestsellers, ['discover']],
    (r) => {
      setRun(r);
      toast.success(t('discover.admin.best.done', { n: r.eligible }));
    },
  );
  return (
    <>
      <PageHeader
        title={t('discover.admin.best.title')}
        subtitle={t('discover.admin.best.subtitle')}
        actions={
          <Button
            loading={recompute.isPending}
            onClick={() =>
              recompute.mutate(undefined, { onError: (e) => toast.error(errorMessage(e, t)) })
            }
          >
            {t('discover.admin.best.recompute')}
          </Button>
        }
      />
      <Notice tone="info">{t('discover.admin.best.rule')}</Notice>
      {run ? (
        <p role="status" className="small">
          {t('discover.admin.best.runSummary', {
            considered: run.coursesConsidered,
            eligible: run.eligible,
            from: fmtDate(run.windowStart),
            at: fmtDate(run.computedAt),
          })}
        </p>
      ) : null}
      <QueryState query={list}>
        {(rows) =>
          rows.length === 0 ? (
            <EmptyState title={t('discover.admin.best.empty')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('discover.admin.best.course')}</th>
                    <th scope="col">{t('discover.admin.best.buyers')}</th>
                    <th scope="col">{t('discover.admin.best.revenue')}</th>
                    <th scope="col">{t('discover.admin.best.eligible')}</th>
                    <th scope="col">{t('discover.admin.best.computed')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.courseId}>
                      <td>
                        {r.courseSlug ? (
                          <Link to={`/courses/${r.courseSlug}`}>{r.courseTitle}</Link>
                        ) : (
                          <span className="mono small">{r.courseId}</span>
                        )}
                      </td>
                      <td>{fmtNumber(r.distinctBuyers)}</td>
                      <td>{fmtNumber(r.netRevenue)}</td>
                      <td>
                        <Badge tone={r.eligible ? 'success' : 'neutral'}>
                          {r.eligible ? t('discover.admin.yes') : t('discover.admin.no')}
                        </Badge>
                      </td>
                      <td>{fmtDate(r.computedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
      <p className="small muted">{t('discover.admin.best.revenueNote')}</p>
    </>
  );
}

// =====================================================================================
// Course ideas backlog
// =====================================================================================
interface IdeaForm {
  id: string | null;
  title: string;
  audience: string;
  rationale: string;
  demandEvidence: string;
  group: string;
  ownerId: string | null;
  updateOwnerId: string | null;
  linkedCourseId: string;
  linkedCourseTitle: string;
  maintenanceCostNote: string;
  priorityScore: string;
  certificationIds: string[];
}

function ideaToForm(i?: CourseIdeaDto): IdeaForm {
  return {
    id: i?.id ?? null,
    title: i?.title ?? '',
    audience: i?.audience ?? '',
    rationale: i?.rationale ?? '',
    demandEvidence: i?.demandEvidence ?? '',
    group: i?.group ?? '',
    ownerId: i?.ownerId ?? null,
    updateOwnerId: i?.updateOwnerId ?? null,
    linkedCourseId: i?.linkedCourseId ?? '',
    linkedCourseTitle: '',
    maintenanceCostNote: i?.maintenanceCostNote ?? '',
    priorityScore: i ? String(i.priorityScore) : '',
    certificationIds: i?.certificationIds ?? [],
  };
}

function IdeaEditor({ initial, onClose }: { initial?: CourseIdeaDto; onClose: () => void }) {
  const { t } = useI18n();
  const toast = useToast();
  const [f, setF] = useState<IdeaForm>(() => ideaToForm(initial));
  const certs = useQuery({
    queryKey: akeys.certs('', false),
    queryFn: () => api<CertificationAdminDto[]>('/api/admin/certifications'),
    retry: false,
  });
  const set = (p: Partial<IdeaForm>) => setF((x) => ({ ...x, ...p }));
  const save = useApiMutation(
    () =>
      api<CourseIdeaDto>(f.id ? `/api/admin/course-ideas/${f.id}` : '/api/admin/course-ideas', {
        method: f.id ? 'PUT' : 'POST',
        body: {
          title: f.title.trim(),
          audience: nz(f.audience),
          rationale: nz(f.rationale),
          demandEvidence: nz(f.demandEvidence),
          group: nz(f.group),
          ownerId: f.ownerId,
          updateOwnerId: f.updateOwnerId,
          linkedCourseId: nz(f.linkedCourseId),
          certificationIds: f.certificationIds,
          maintenanceCostNote: nz(f.maintenanceCostNote),
          priorityScore: f.priorityScore ? Number(f.priorityScore) : null,
        },
      }),
    [akeys.ideas],
    () => {
      toast.success(t('discover.admin.saved'));
      onClose();
    },
  );
  return (
    <form
      className="stack"
      style={{ display: 'grid', gap: 'var(--space-3)' }}
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(undefined);
      }}
    >
      <Field label={t('discover.admin.ideas.titleField')} required>
        <Input value={f.title} onChange={(e) => set({ title: e.target.value })} required />
      </Field>
      <div className="dfilters">
        <Field label={t('discover.admin.ideas.group')}>
          <Input value={f.group} onChange={(e) => set({ group: e.target.value })} />
        </Field>
        <Field
          label={t('discover.admin.ideas.priority')}
          hint={t('discover.admin.ideas.priorityHint')}
        >
          <Input
            type="number"
            min={0}
            max={1000}
            value={f.priorityScore}
            onChange={(e) => set({ priorityScore: e.target.value })}
          />
        </Field>
      </div>
      <Field label={t('discover.admin.ideas.audience')}>
        <Textarea rows={2} value={f.audience} onChange={(e) => set({ audience: e.target.value })} />
      </Field>
      <Field label={t('discover.admin.ideas.rationale')}>
        <Textarea
          rows={2}
          value={f.rationale}
          onChange={(e) => set({ rationale: e.target.value })}
        />
      </Field>
      <Field label={t('discover.admin.ideas.demand')}>
        <Textarea
          rows={2}
          value={f.demandEvidence}
          onChange={(e) => set({ demandEvidence: e.target.value })}
        />
      </Field>
      <Field label={t('discover.admin.ideas.maintenance')}>
        <Textarea
          rows={2}
          value={f.maintenanceCostNote}
          onChange={(e) => set({ maintenanceCostNote: e.target.value })}
        />
      </Field>
      <UserPicker
        label={t('discover.admin.ideas.owner')}
        value={f.ownerId}
        onChange={(id) => set({ ownerId: id })}
      />
      <UserPicker
        label={t('discover.admin.ideas.updateOwner')}
        value={f.updateOwnerId}
        onChange={(id) => set({ updateOwnerId: id })}
      />
      <Field
        label={t('discover.admin.ideas.linkedCourseId')}
        hint={f.linkedCourseTitle || t('discover.admin.ideas.linkedHint')}
      >
        <Input
          value={f.linkedCourseId}
          onChange={(e) => set({ linkedCourseId: e.target.value, linkedCourseTitle: '' })}
        />
      </Field>
      <CourseSearch
        label={t('discover.admin.findCourse')}
        onPick={(c) => set({ linkedCourseId: c.id, linkedCourseTitle: c.title })}
        pickLabel={(title) => t('discover.admin.chooseNamed', { title })}
      />
      {certs.data && certs.data.length > 0 ? (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="field__label">{t('discover.admin.ideas.certifications')}</legend>
          <div className="check-grid">
            {certs.data.map((c) => (
              <Checkbox
                key={c.id}
                label={c.title}
                checked={f.certificationIds.includes(c.id)}
                onChange={(e) =>
                  set({
                    certificationIds: e.target.checked
                      ? [...f.certificationIds, c.id]
                      : f.certificationIds.filter((x) => x !== c.id),
                  })
                }
              />
            ))}
          </div>
        </fieldset>
      ) : null}
      <ErrorNotice error={save.error} />
      <div className="form-actions">
        <Button variant="secondary" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" loading={save.isPending}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}

function IdeaCard({ idea, onEdit }: { idea: CourseIdeaDto; onEdit: () => void }) {
  const { t } = useI18n();
  const toast = useToast();
  const [target, setTarget] = useState<CourseIdeaState | ''>('');
  const [deleting, setDeleting] = useState(false);
  const change = useApiMutation(
    (state: CourseIdeaState) =>
      api<CourseIdeaDto>(`/api/admin/course-ideas/${idea.id}/state`, {
        body: { state, notes: null },
      }),
    [akeys.ideas],
    () => {
      setTarget('');
      toast.success(t('discover.admin.ideas.moved'));
    },
  );
  const del = useApiMutation(
    () => api(`/api/admin/course-ideas/${idea.id}`, { method: 'DELETE' }),
    [akeys.ideas],
    () => {
      setDeleting(false);
      toast.success(t('discover.admin.deleted'));
    },
  );
  const next = IDEA_TRANSITIONS[idea.state];
  return (
    <li className="card card--flat">
      <h3 style={{ fontSize: 'var(--text-md)', margin: 0 }}>{idea.title}</h3>
      <p className="small muted" style={{ margin: 'var(--space-1) 0' }}>
        {[
          idea.group,
          t('discover.admin.ideas.priorityShort', { n: idea.priorityScore }),
          idea.roadmapRank ? t('discover.admin.ideas.rank', { n: idea.roadmapRank }) : '',
        ]
          .filter(Boolean)
          .join(' · ')}
      </p>
      {next.length > 0 ? (
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            if (target) change.mutate(target);
          }}
        >
          <Select
            aria-label={t('discover.admin.ideas.moveNamed', { title: idea.title })}
            value={target}
            onChange={(e) => setTarget(e.target.value as CourseIdeaState)}
            placeholder={t('discover.admin.ideas.moveTo')}
            options={next.map((s) => ({ value: s, label: t(`discover.ideaState.${s}`) }))}
          />
          <Button size="sm" type="submit" disabled={!target} loading={change.isPending}>
            {t('discover.admin.ideas.move')}
          </Button>
        </form>
      ) : null}
      {change.isError ? <ErrorNotice error={change.error} /> : null}
      <div className="row" style={{ marginBlockStart: 'var(--space-2)' }}>
        <Button
          size="sm"
          variant="secondary"
          onClick={onEdit}
          aria-label={t('discover.admin.editNamed', { title: idea.title })}
        >
          {t('discover.admin.edit')}
        </Button>
        {idea.state !== 'InProduction' && idea.state !== 'Published' ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              del.reset();
              setDeleting(true);
            }}
            aria-label={t('discover.admin.deleteNamed', { title: idea.title })}
          >
            {t('discover.admin.delete')}
          </Button>
        ) : null}
      </div>
      <ConfirmDialog
        open={deleting}
        danger
        title={t('discover.admin.deleteNamed', { title: idea.title })}
        body={
          <>
            <p>{t('discover.admin.ideas.deleteBody')}</p>
            <ErrorNotice error={del.error} />
          </>
        }
        confirmLabel={t('discover.admin.delete')}
        loading={del.isPending}
        onCancel={() => setDeleting(false)}
        onConfirm={() => del.mutate(undefined)}
      />
    </li>
  );
}

export function AdminIdeasPage() {
  const { t } = useI18n();
  const toast = useToast();
  usePageMeta(t('discover.admin.ideas.title'), undefined, { noindex: true });
  const [q, setQ] = useState('');
  const ideas = useQuery({
    queryKey: [...akeys.ideas, q],
    queryFn: () =>
      api<CourseIdeaDto[]>(`/api/admin/course-ideas${qs({ q: q.trim() || undefined })}`),
  });
  const [editing, setEditing] = useState<CourseIdeaDto | 'new' | null>(null);
  const [importing, setImporting] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [importResult, setImportResult] = useState<RoadmapImportResultDto | null>(null);
  const importRoadmap = useApiMutation(
    () =>
      api<RoadmapImportResultDto>('/api/admin/course-ideas/import-roadmap', {
        body: { markdown: nz(markdown) },
      }),
    [akeys.ideas],
    (r) => {
      setImportResult(r);
      setImporting(false);
      toast.success(t('discover.admin.ideas.imported', { created: r.created, skipped: r.skipped }));
    },
  );
  return (
    <>
      <PageHeader
        title={t('discover.admin.ideas.title')}
        subtitle={t('discover.admin.ideas.subtitle')}
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                importRoadmap.reset();
                setImporting(true);
              }}
            >
              {t('discover.admin.ideas.import')}
            </Button>
            <Button onClick={() => setEditing('new')}>{t('discover.admin.ideas.new')}</Button>
          </>
        }
      />
      <Notice tone="info">{t('discover.admin.ideas.private')}</Notice>
      {importResult ? (
        <p role="status" className="small">
          {t('discover.admin.ideas.importSummary', {
            parsed: importResult.parsed,
            created: importResult.created,
            skipped: importResult.skipped,
          })}
        </p>
      ) : null}
      <form
        className="filters card card--flat"
        role="search"
        onSubmit={(e) => e.preventDefault()}
        style={{ marginBlock: 'var(--space-4)' }}
      >
        <Field label={t('discover.admin.ideas.search')}>
          <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} />
        </Field>
      </form>
      <QueryState query={ideas}>
        {(list) => (
          <div className="board" role="list" aria-label={t('discover.admin.ideas.board')}>
            {IDEA_STATES.map((s) => {
              const col = list
                .filter((i) => i.state === s)
                .sort(
                  (a, b) =>
                    b.priorityScore - a.priorityScore ||
                    (a.roadmapRank ?? 1e9) - (b.roadmapRank ?? 1e9),
                );
              return (
                <section
                  key={s}
                  className="board__col"
                  role="listitem"
                  aria-labelledby={`col-${s}`}
                >
                  <h2 id={`col-${s}`}>
                    {t(`discover.ideaState.${s}`)}{' '}
                    <span className="small muted">({col.length})</span>
                  </h2>
                  {col.length === 0 ? (
                    <p className="small muted">{t('discover.admin.ideas.emptyCol')}</p>
                  ) : (
                    <ul className="board__list">
                      {col.map((i) => (
                        <IdeaCard key={i.id} idea={i} onEdit={() => setEditing(i)} />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </QueryState>
      <Dialog
        open={!!editing}
        wide
        title={editing === 'new' ? t('discover.admin.ideas.new') : t('discover.admin.ideas.edit')}
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <IdeaEditor
            key={editing === 'new' ? 'new' : editing.id}
            initial={editing === 'new' ? undefined : editing}
            onClose={() => setEditing(null)}
          />
        ) : null}
      </Dialog>
      <Dialog
        open={importing}
        title={t('discover.admin.ideas.import')}
        onClose={() => setImporting(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setImporting(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={importRoadmap.isPending}
              onClick={() => importRoadmap.mutate(undefined)}
            >
              {t('discover.admin.ideas.runImport')}
            </Button>
          </>
        }
      >
        <p>{t('discover.admin.ideas.importBody')}</p>
        <Field
          label={t('discover.admin.ideas.markdown')}
          hint={t('discover.admin.ideas.markdownHint')}
        >
          <Textarea rows={6} value={markdown} onChange={(e) => setMarkdown(e.target.value)} />
        </Field>
        <ErrorNotice error={importRoadmap.error} />
      </Dialog>
    </>
  );
}
