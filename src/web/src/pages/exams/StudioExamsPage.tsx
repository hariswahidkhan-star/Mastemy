import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, apiFetch, downloadFile, qs } from '../../api/client';
import { useApiMutation, useStudioCourse, useStudioCourses } from '../../api/hooks';
import {
  examKeys,
  fmtStat,
  postForm,
  useCaseGroups,
  useCourseResources,
  useShared,
  useTemplates,
} from '../../api/exams';
import type {
  AssessmentPolicyDto,
  CaseGroupDto,
  ChallengeDto,
  CourseTemplateDto,
  ImportCommitResult,
  ImportInspectResult,
  ImportPreviewResult,
  ImportStatusResult,
  ItemAnalyticsDto,
} from '../../api/exams';
import { toQuestionList } from '../../api/questions';
import type { RawQuestionDto } from '../../api/questions';
import type { QuestionDto, StudioCourseDto } from '../../api/types';
import { RichContent } from '../../components/RichContent';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Checkbox, Field, Input, Select } from '../../components/ui/Field';
import {
  Badge,
  Notice,
  PageHeader,
  Pagination,
  QueryState,
  QueryStatus,
} from '../../components/ui/misc';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { examError } from './examErrors';
import { RichEditor } from './RichEditor';
import '../../styles/exams.css';

interface StudioAssessment {
  id: string;
  title: string;
  kind: string;
  mode: string;
  timeLimitMinutes: number | null;
}

const useStudioAssessments = (courseId: string) =>
  useQuery({
    queryKey: ['exams', 'studio-assessments', courseId],
    queryFn: () =>
      api<StudioAssessment[] | { items: StudioAssessment[] }>(
        `/api/studio/courses/${courseId}/assessments`,
      ).then((d) => (Array.isArray(d) ? d : d.items)),
  });

const useCourseQuestions = (courseId: string) =>
  useQuery({
    queryKey: ['studio', 'questions', courseId, { state: '', q: '' }],
    queryFn: () =>
      api<RawQuestionDto[] | { items: RawQuestionDto[] }>(
        `/api/studio/courses/${courseId}/questions${qs({ pageSize: 200 })}`,
      ),
    select: toQuestionList,
    enabled: !!courseId,
  });

/** /studio/courses/:id/exams — wave 3 question bank tools for one course. */
export function StudioExamsPage() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  const course = useStudioCourse(id);
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? 'cases';
  usePageMeta(t('exams.studio.title'), undefined, { noindex: true });
  return (
    <div className="stack">
      <QueryState query={course}>
        {(c) => (
          <>
            <PageHeader
              title={t('exams.studio.title')}
              subtitle={c.title}
              actions={
                <Link to={`/studio/courses/${c.id}?tab=questions`}>{t('exams.studio.back')}</Link>
              }
            />
            <Tabs
              label={t('exams.studio.tabs')}
              value={tab}
              onChange={(v) => setParams({ tab: v }, { replace: true })}
              tabs={[
                {
                  id: 'cases',
                  label: t('exams.tab.cases'),
                  content: <CaseGroupManager course={c} />,
                },
                { id: 'import', label: t('exams.tab.import'), content: <XlsxImport course={c} /> },
                { id: 'reuse', label: t('exams.tab.reuse'), content: <ReusePanel course={c} /> },
                {
                  id: 'analytics',
                  label: t('exams.tab.analytics'),
                  content: <AnalyticsPanel course={c} />,
                },
                {
                  id: 'challenges',
                  label: t('exams.tab.challenges'),
                  content: <CourseChallenges course={c} />,
                },
                { id: 'policy', label: t('exams.tab.policy'), content: <PolicyPanel course={c} /> },
                {
                  id: 'certificate',
                  label: t('exams.tab.certificate'),
                  content: <CourseCertificateTemplate course={c} />,
                },
              ]}
            />
          </>
        )}
      </QueryState>
    </div>
  );
}

// ---------------- case groups ----------------

function CaseGroupForm({
  course,
  initial,
  onDone,
}: {
  course: StudioCourseDto;
  initial: CaseGroupDto | null;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const [title, setTitle] = useState(initial?.title ?? '');
  const [exhibit, setExhibit] = useState(initial?.exhibitMarkdown ?? '');
  const [resourceIds, setResourceIds] = useState<string[]>(initial?.resourceIds ?? []);
  const resources = useCourseResources(course.id);
  const attachable = (resources.data ?? []).filter((r) => !r.isPremium);
  const save = useApiMutation(
    () => {
      const body = { title: title.trim(), exhibitMarkdown: exhibit, resourceIds };
      return initial
        ? api<CaseGroupDto>(`/api/studio/case-groups/${initial.id}`, { method: 'PUT', body })
        : api<CaseGroupDto>(`/api/studio/courses/${course.id}/case-groups`, {
            method: 'POST',
            body,
          });
    },
    [examKeys.caseGroups(course.id)],
    () => {
      toast.success(t('exams.cases.saved'));
      onDone();
    },
  );
  const titleError =
    title.trim().length === 0
      ? t('validation.required')
      : title.length > 200
        ? t('exams.cases.titleMax')
        : undefined;
  const [touched, setTouched] = useState(false);
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (titleError || !exhibit.trim()) return;
        save.mutate(undefined);
      }}
    >
      <Field label={t('exams.cases.caseTitle')} error={touched ? titleError : undefined} required>
        <Input value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <RichEditor
        label={t('exams.cases.exhibit')}
        value={exhibit}
        onChange={setExhibit}
        courseId={course.id}
        rows={8}
        required
        error={touched && !exhibit.trim() ? t('validation.required') : undefined}
        hint={t('exams.editor.hint')}
      />
      <fieldset className="stack" style={{ border: 'none', padding: 0 }}>
        <legend className="field__label">{t('exams.cases.attachments')}</legend>
        {attachable.length === 0 ? (
          <p className="small muted">{t('exams.cases.noResources')}</p>
        ) : (
          attachable.map((r) => (
            <Checkbox
              key={r.id}
              label={r.fileName}
              checked={resourceIds.includes(r.id)}
              onChange={(e) =>
                setResourceIds((ids) =>
                  e.target.checked ? [...ids, r.id] : ids.filter((x) => x !== r.id),
                )
              }
            />
          ))
        )}
      </fieldset>
      {save.isError ? <Notice tone="danger">{examError(save.error, t)}</Notice> : null}
      <div className="form-actions">
        <Button type="submit" loading={save.isPending}>
          {t('common.save')}
        </Button>
        <Button variant="secondary" onClick={onDone}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}

function CaseGroupManager({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const groups = useCaseGroups(course.id);
  const questions = useCourseQuestions(course.id);
  const [editing, setEditing] = useState<CaseGroupDto | 'new' | null>(null);
  const [deleting, setDeleting] = useState<CaseGroupDto | null>(null);
  const remove = useApiMutation(
    (g: CaseGroupDto) => api(`/api/studio/case-groups/${g.id}`, { method: 'DELETE' }),
    [examKeys.caseGroups(course.id)],
    () => {
      setDeleting(null);
      toast.success(t('exams.cases.deleted'));
    },
  );
  const byId = new Map((questions.data ?? []).map((q) => [q.id, q]));
  return (
    <div className="stack">
      <div className="row row--between">
        <p className="small muted">{t('exams.cases.intro')}</p>
        <Button onClick={() => setEditing('new')}>{t('exams.cases.new')}</Button>
      </div>
      <QueryState query={groups}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('exams.cases.none')} description={t('exams.cases.noneBody')} />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((g) => (
                <li key={g.id} className="card stack">
                  <div className="row row--between">
                    <h3 style={{ margin: 0 }}>{g.title}</h3>
                    <div className="row">
                      <Button size="sm" variant="ghost" onClick={() => setEditing(g)}>
                        {t('common.edit')}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setDeleting(g)}>
                        {t('common.remove')}
                      </Button>
                    </div>
                  </div>
                  <details>
                    <summary>{t('exams.cases.showExhibit')}</summary>
                    <RichContent source={g.exhibitMarkdown} />
                  </details>
                  <p className="small">
                    {t('exams.cases.members', { n: g.questionIds.length })}{' '}
                    {g.questionIds.map((qid, i) => (
                      <Badge key={qid}>
                        {i + 1}. {byId.get(qid)?.externalId ?? qid.slice(0, 8)}
                      </Badge>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <p className="small muted">{t('exams.cases.howToAdd')}</p>
      <Dialog
        open={editing !== null}
        wide
        title={editing === 'new' ? t('exams.cases.new') : t('exams.cases.edit')}
        onClose={() => setEditing(null)}
      >
        {editing !== null ? (
          <CaseGroupForm
            course={course}
            initial={editing === 'new' ? null : editing}
            onDone={() => setEditing(null)}
          />
        ) : null}
      </Dialog>
      <ConfirmDialog
        open={deleting !== null}
        title={t('exams.cases.deleteTitle')}
        confirmLabel={t('common.remove')}
        loading={remove.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={() =>
          deleting &&
          remove.mutate(deleting, {
            onError: (e) => {
              setDeleting(null);
              toast.error(examError(e, t));
            },
          })
        }
        body={<p>{t('exams.cases.deleteBody', { title: deleting?.title ?? '' })}</p>}
      />
    </div>
  );
}

// ---------------- XLSX / CSV import ----------------

type ImportStep =
  | { step: 'upload' }
  | { step: 'map'; inspect: ImportInspectResult; mapping: Record<string, string> }
  | { step: 'preview'; preview: ImportPreviewResult }
  | { step: 'done'; status: ImportStatusResult | ImportCommitResult };

/** Required canonical columns not yet mapped by any header. */
export function missingRequired(
  inspect: ImportInspectResult,
  mapping: Record<string, string>,
): string[] {
  const mapped = new Set(Object.values(mapping).filter(Boolean));
  return inspect.requiredColumns.filter((c) => !mapped.has(c));
}

/** Canonical columns mapped by more than one header. */
export function duplicateTargets(mapping: Record<string, string>): string[] {
  const seen = new Map<string, number>();
  for (const v of Object.values(mapping)) if (v) seen.set(v, (seen.get(v) ?? 0) + 1);
  return [...seen.entries()].filter(([, n]) => n > 1).map(([k]) => k);
}

function newKey(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

function XlsxImport({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'create' | 'update'>('create');
  const [state, setState] = useState<ImportStep>({ step: 'upload' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [polling, setPolling] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const status = useQuery({
    queryKey: ['exams', 'import-status', course.id, polling],
    queryFn: () =>
      api<ImportStatusResult>(`/api/studio/courses/${course.id}/questions/import/${polling}`),
    enabled: !!polling,
    refetchInterval: (q) =>
      q.state.data && ['Committed', 'Failed'].includes(q.state.data.status) ? false : 1500,
  });
  useEffect(() => {
    const s = status.data;
    if (s && ['Committed', 'Failed'].includes(s.status)) {
      setState({ step: 'done', status: s });
      setPolling(null);
    }
  }, [status.data]);

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };

  const inspect = () =>
    run(async () => {
      if (!file) return;
      const form = new FormData();
      form.append('file', file);
      const { body } = await postForm<ImportInspectResult>(
        `/api/studio/courses/${course.id}/questions/import/inspect`,
        form,
      );
      const mapping: Record<string, string> = {};
      for (const h of body.headers) mapping[h] = body.suggestedMapping[h] ?? '';
      setState({ step: 'map', inspect: body, mapping });
    });

  const preview = (mapping: Record<string, string>) =>
    run(async () => {
      if (!file) return;
      const form = new FormData();
      form.append('file', file);
      form.append('mode', mode);
      form.append('idempotencyKey', newKey());
      form.append('mapping', JSON.stringify(mapping));
      const { body } = await postForm<ImportPreviewResult>(
        `/api/studio/courses/${course.id}/questions/import/preview`,
        form,
      );
      setState({ step: 'preview', preview: body });
    });

  const commit = (batchId: string) =>
    run(async () => {
      const res = await apiFetch(
        `/api/studio/courses/${course.id}/questions/import/${batchId}/commit`,
        { method: 'POST' },
      );
      const body = (await res.json()) as ImportCommitResult;
      if (res.status === 202 || body.status === 'Queued' || body.status === 'Processing') {
        setPolling(batchId);
        toast.info(t('exams.import.queued'));
      } else {
        setState({ step: 'done', status: body });
        toast.success(t('exams.import.committed', { n: body.created + body.updated }));
      }
    });

  const download = (path: string, name: string) => {
    setDownloading(path);
    downloadFile(path, name)
      .catch((e) => toast.error(examError(e, t)))
      .finally(() => setDownloading(null));
  };

  const reset = () => {
    setState({ step: 'upload' });
    setError(null);
    setPolling(null);
  };

  return (
    <div className="stack">
      <div className="row">
        <Button
          variant="secondary"
          size="sm"
          loading={downloading === 'template'}
          onClick={() => download('/api/templates/mcq-import.xlsx', 'mcq-import.xlsx')}
        >
          {t('exams.import.template')}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          loading={downloading === 'export'}
          onClick={() =>
            download(
              `/api/studio/courses/${course.id}/questions/export.xlsx`,
              `questions-${course.slug}.xlsx`,
            )
          }
        >
          {t('exams.import.exportXlsx')}
        </Button>
      </div>
      <Notice tone="info" title={t('exams.import.rulesTitle')}>
        <ul>
          <li>{t('exams.import.ruleFirstSheet')}</li>
          <li>{t('exams.import.ruleFormula')}</li>
          <li>{t('exams.import.ruleImage')}</li>
          {course.code ? <li>{t('exams.import.courseCode', { code: course.code })}</li> : null}
        </ul>
      </Notice>
      <ol className="row small" aria-label={t('exams.import.steps')}>
        {(['upload', 'map', 'preview', 'done'] as const).map((s, i) => (
          <li key={s} aria-current={state.step === s ? 'step' : undefined}>
            <Badge tone={state.step === s ? 'info' : 'neutral'}>
              {i + 1}. {t(`exams.import.step.${s}`)}
            </Badge>
          </li>
        ))}
      </ol>

      {state.step === 'upload' ? (
        <form
          className="card stack"
          onSubmit={(e) => {
            e.preventDefault();
            void inspect();
          }}
        >
          <Field label={t('exams.import.file')} hint={t('exams.import.fileHint')} required>
            <Input
              type="file"
              accept=".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </Field>
          <Field label={t('exams.import.mode')}>
            <Select
              value={mode}
              onChange={(e) => setMode(e.target.value === 'update' ? 'update' : 'create')}
              options={[
                { value: 'create', label: t('exams.import.modeCreate') },
                { value: 'update', label: t('exams.import.modeUpdate') },
              ]}
            />
          </Field>
          <div>
            <Button type="submit" loading={busy} disabled={!file}>
              {t('exams.import.inspect')}
            </Button>
          </div>
        </form>
      ) : null}

      {state.step === 'map' ? (
        <MappingStep
          inspect={state.inspect}
          mapping={state.mapping}
          onChange={(mapping) => setState({ ...state, mapping })}
          busy={busy}
          onBack={reset}
          onPreview={() => void preview(state.mapping)}
        />
      ) : null}

      {state.step === 'preview' ? (
        <section className="card stack" aria-labelledby="imp-prev-h">
          <h3 id="imp-prev-h">{t('exams.import.previewTitle')}</h3>
          <p>
            {t('exams.import.previewCounts', {
              ok: state.preview.validCount,
              bad: state.preview.errorCount,
            })}
          </p>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">{t('exams.import.row')}</th>
                  <th scope="col">{t('question.externalId')}</th>
                  <th scope="col">{t('exams.import.result')}</th>
                </tr>
              </thead>
              <tbody>
                {state.preview.rows.map((r) => (
                  <tr key={r.row}>
                    <td>{r.row}</td>
                    <td className="mono">{r.externalId}</td>
                    <td>
                      {r.ok ? (
                        <Badge tone="success">{t('exams.import.ok')}</Badge>
                      ) : (
                        <ul className="small" style={{ margin: 0 }}>
                          {r.errors.map((e) => (
                            <li key={e}>{e}</li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {state.preview.errorCount > 0 ? (
            <Notice tone="warning">{t('exams.import.fixErrors')}</Notice>
          ) : null}
          <div className="row">
            <Button
              loading={busy || !!polling}
              disabled={state.preview.errorCount > 0 || state.preview.validCount === 0}
              onClick={() => void commit(state.preview.batchId)}
            >
              {t('exams.import.commit', { n: state.preview.validCount })}
            </Button>
            <Button variant="secondary" onClick={reset}>
              {t('exams.import.restart')}
            </Button>
          </div>
          {polling ? (
            <div aria-live="polite">
              <p>
                {t('exams.import.progress', {
                  status: status.data ? t(`exams.import.status.${status.data.status}`) : '…',
                })}
              </p>
              <progress aria-label={t('exams.import.progressLabel')} />
            </div>
          ) : null}
        </section>
      ) : null}

      {state.step === 'done' ? (
        <section className="card stack" aria-live="polite">
          {state.status.status === 'Committed' ? (
            <Notice tone="success" title={t('exams.import.doneTitle')}>
              {t('exams.import.doneBody', {
                created: state.status.created,
                updated: state.status.updated,
              })}
            </Notice>
          ) : (
            <Notice tone="danger" title={t('exams.import.failedTitle')}>
              {state.status.error ?? t('exams.import.failedBody')}
            </Notice>
          )}
          <div>
            <Button variant="secondary" onClick={reset}>
              {t('exams.import.another')}
            </Button>
          </div>
        </section>
      ) : null}

      {error ? <Notice tone="danger">{examError(error, t)}</Notice> : null}
    </div>
  );
}

function MappingStep({
  inspect,
  mapping,
  onChange,
  onPreview,
  onBack,
  busy,
}: {
  inspect: ImportInspectResult;
  mapping: Record<string, string>;
  onChange: (m: Record<string, string>) => void;
  onPreview: () => void;
  onBack: () => void;
  busy: boolean;
}) {
  const { t } = useI18n();
  const missing = missingRequired(inspect, mapping);
  const dups = duplicateTargets(mapping);
  return (
    <section className="card stack" aria-labelledby="map-h">
      <h3 id="map-h">{t('exams.import.mapTitle')}</h3>
      <p className="small">
        {t('exams.import.mapIntro', { format: inspect.format.toUpperCase(), n: inspect.rowCount })}
      </p>
      <div className="mapping-grid">
        {inspect.headers.map((h) => (
          <Field key={h} label={t('exams.import.mapHeader', { header: h || '—' })}>
            <Select
              value={mapping[h] ?? ''}
              onChange={(e) => onChange({ ...mapping, [h]: e.target.value })}
              placeholder={t('exams.import.ignore')}
              options={inspect.columns.map((c) => ({
                value: c,
                label: inspect.requiredColumns.includes(c) ? `${c} *` : c,
              }))}
            />
          </Field>
        ))}
      </div>
      {missing.length > 0 ? (
        <Notice tone="warning">{t('exams.import.missing', { cols: missing.join(', ') })}</Notice>
      ) : null}
      {dups.length > 0 ? (
        <Notice tone="warning">{t('exams.import.duplicates', { cols: dups.join(', ') })}</Notice>
      ) : null}
      {inspect.sampleRows.length > 0 ? (
        <details>
          <summary>{t('exams.import.sample', { n: inspect.sampleRows.length })}</summary>
          <div className="table-wrap">
            <table className="table small">
              <thead>
                <tr>
                  {inspect.headers.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inspect.sampleRows.map((r, i) => (
                  <tr key={i}>
                    {inspect.headers.map((h, j) => (
                      <td key={h}>{r[j] ?? ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ) : null}
      <div className="row">
        <Button loading={busy} disabled={missing.length > 0 || dups.length > 0} onClick={onPreview}>
          {t('exams.import.previewButton')}
        </Button>
        <Button variant="secondary" onClick={onBack}>
          {t('common.back')}
        </Button>
      </div>
    </section>
  );
}

// ---------------- reuse ----------------

function ReusePanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const [source, setSource] = useState<'shared' | 'course'>('shared');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [fromCourse, setFromCourse] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [prefix, setPrefix] = useState('');
  const [created, setCreated] = useState<QuestionDto[] | null>(null);
  const shared = useShared(q, page);
  const courses = useStudioCourses();
  const otherQuestions = useCourseQuestions(source === 'course' ? fromCourse : '');
  const copy = useApiMutation(
    () =>
      api<{ created: RawQuestionDto[] }>(`/api/studio/courses/${course.id}/questions/copy`, {
        method: 'POST',
        body: { sourceQuestionIds: selected, externalIdPrefix: prefix.trim() || undefined },
      }),
    [['studio', 'questions', course.id]],
    (r) => {
      setCreated(toQuestionList(r.created));
      setSelected([]);
      toast.success(t('exams.reuse.copied', { n: r.created.length }));
    },
  );
  const toggle = (id: string, on: boolean) =>
    setSelected((s) => (on ? (s.length >= 50 ? s : [...s, id]) : s.filter((x) => x !== id)));
  const courseList = (Array.isArray(courses.data) ? courses.data : []) as {
    id: string;
    title: string;
  }[];
  return (
    <div className="stack">
      <p className="small muted">{t('exams.reuse.intro')}</p>
      <div className="row">
        <Field label={t('exams.reuse.source')}>
          <Select
            value={source}
            onChange={(e) => {
              setSource(e.target.value === 'course' ? 'course' : 'shared');
              setSelected([]);
            }}
            options={[
              { value: 'shared', label: t('exams.reuse.sharedBank') },
              { value: 'course', label: t('exams.reuse.myCourses') },
            ]}
          />
        </Field>
        {source === 'shared' ? (
          <Field label={t('courses.search')}>
            <Input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </Field>
        ) : (
          <Field label={t('exams.reuse.fromCourse')} hint={<QueryStatus query={courses} />}>
            <Select
              value={fromCourse}
              onChange={(e) => {
                setFromCourse(e.target.value);
                setSelected([]);
              }}
              placeholder={t('exams.reuse.pickCourse')}
              options={courseList
                .filter((c) => c.id !== course.id)
                .map((c) => ({ value: c.id, label: c.title }))}
            />
          </Field>
        )}
      </div>
      {source === 'shared' ? (
        <QueryState query={shared}>
          {(p) =>
            p.items.length === 0 ? (
              <EmptyState title={t('exams.reuse.none')} description={t('exams.reuse.noneBody')} />
            ) : (
              <>
                <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                  {p.items.map((sq) => (
                    <li key={sq.id} className="card">
                      <Checkbox
                        label={
                          <span>
                            <span className="mono">{sq.externalId}</span> v{sq.version} ·{' '}
                            {t(`question.${sq.type}`)} · {t(`question.${sq.difficulty}`)}
                            {sq.cognitiveLevel ? ` · ${t(`exams.level.${sq.cognitiveLevel}`)}` : ''}
                          </span>
                        }
                        checked={selected.includes(sq.id)}
                        onChange={(e) => toggle(sq.id, e.target.checked)}
                      />
                      <RichContent source={sq.stem} className="small" />
                    </li>
                  ))}
                </ul>
                <Pagination page={p.page} pageSize={p.pageSize} total={p.total} onPage={setPage} />
              </>
            )
          }
        </QueryState>
      ) : fromCourse ? (
        <QueryState query={otherQuestions}>
          {(list) =>
            list.length === 0 ? (
              <EmptyState title={t('question.none')} description={t('exams.reuse.noneBody')} />
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {list.map((oq) => (
                  <li key={oq.id} className="card">
                    <Checkbox
                      label={
                        <span>
                          <span className="mono">{oq.externalId}</span> · {t(`status.${oq.state}`)}
                        </span>
                      }
                      disabled={oq.state === 'Retired'}
                      checked={selected.includes(oq.id)}
                      onChange={(e) => toggle(oq.id, e.target.checked)}
                    />
                    <RichContent source={oq.stem} className="small" />
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      ) : null}
      <div className="row">
        <Field label={t('exams.reuse.prefix')} hint={t('exams.reuse.prefixHint')}>
          <Input value={prefix} maxLength={40} onChange={(e) => setPrefix(e.target.value)} />
        </Field>
      </div>
      {copy.isError ? <Notice tone="danger">{examError(copy.error, t)}</Notice> : null}
      <div>
        <Button
          disabled={selected.length === 0}
          loading={copy.isPending}
          onClick={() => copy.mutate(undefined)}
        >
          {t('exams.reuse.copy', { n: selected.length })}
        </Button>
      </div>
      {created ? (
        <section className="card" aria-labelledby="copied-h">
          <h3 id="copied-h">{t('exams.reuse.createdTitle')}</h3>
          <ul>
            {created.map((c) => (
              <li key={c.id}>
                <span className="mono">{c.externalId}</span> — {t('status.Draft')} ·{' '}
                {t('exams.reuse.provenance', {
                  q: c.sourceQuestionId?.slice(0, 8) ?? '?',
                  v: c.sourceVersion ?? '?',
                  course:
                    courseList.find((x) => x.id === c.sourceCourseId)?.title ??
                    c.sourceCourseId?.slice(0, 8) ??
                    '?',
                })}
              </li>
            ))}
          </ul>
          <p className="small muted">{t('exams.reuse.mustReview')}</p>
        </section>
      ) : null}
    </div>
  );
}

// ---------------- analytics ----------------

function Ci({ low, high }: { low: number | null; high: number | null }) {
  if (low === null || high === null) return null;
  return (
    <span className="small muted stat-ci">
      [{low.toFixed(2)}, {high.toFixed(2)}]
    </span>
  );
}

export function ItemAnalyticsTable({ items }: { items: ItemAnalyticsDto[] }) {
  const { t } = useI18n();
  if (items.length === 0) return <p className="muted">{t('exams.analytics.none')}</p>;
  return (
    <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
      {items.map((a) => (
        <li key={a.questionVersionId} className="card stack">
          <div className="row row--between">
            <strong className="mono">
              {a.externalId} v{a.version}
            </strong>
            <span className="small">
              {t('exams.analytics.n', { n: a.n })} ·{' '}
              {t('exams.analytics.exposures', { n: a.exposures, learners: a.distinctLearners })}
            </span>
          </div>
          {!a.sufficientData ? (
            <Notice tone="info">
              {t('exams.analytics.insufficient', { min: a.minimumN, n: a.n })}
            </Notice>
          ) : null}
          <dl className="facts">
            <div>
              <dt>{t('exams.analytics.difficulty')}</dt>
              <dd>
                {fmtStat(a.difficulty)} <Ci low={a.difficultyLow} high={a.difficultyHigh} />
              </dd>
            </div>
            <div>
              <dt>{t('exams.analytics.discrimination')}</dt>
              <dd>
                {fmtStat(a.discrimination)}{' '}
                <Ci low={a.discriminationLow} high={a.discriminationHigh} />
              </dd>
            </div>
          </dl>
          <div className="table-wrap">
            <table className="table small">
              <caption className="visually-hidden">{t('exams.analytics.distractors')}</caption>
              <thead>
                <tr>
                  <th scope="col">{t('exams.analytics.option')}</th>
                  <th scope="col">{t('exams.analytics.count')}</th>
                  <th scope="col">{t('exams.analytics.proportion')}</th>
                </tr>
              </thead>
              <tbody>
                {a.distractors.map((d) => (
                  <tr key={d.optionId}>
                    <td>
                      {String.fromCharCode(65 + d.sortOrder)}.{' '}
                      <RichContent source={d.text} inline />{' '}
                      {d.isCorrect ? (
                        <Badge tone="success">{t('result.correctAnswer')}</Badge>
                      ) : null}
                    </td>
                    <td>{d.selectedCount}</td>
                    <td>
                      {d.selectedProportion === null ? (
                        <span className="muted">{t('exams.analytics.insufficientShort')}</span>
                      ) : (
                        <span className="row">
                          <span className="bar" aria-hidden="true">
                            <span
                              style={{ inlineSize: `${Math.round(d.selectedProportion * 100)}%` }}
                            />
                          </span>
                          {Math.round(d.selectedProportion * 100)}%
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {a.note ? <p className="small muted">{a.note}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function AnalyticsPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const assessments = useStudioAssessments(course.id);
  const [assessmentId, setAssessmentId] = useState('');
  const analytics = useQuery({
    queryKey: examKeys.analytics(assessmentId),
    queryFn: () =>
      api<ItemAnalyticsDto[]>(`/api/studio/assessments/${assessmentId}/item-analytics`),
    enabled: !!assessmentId,
  });
  return (
    <div className="stack">
      <p className="small muted">{t('exams.analytics.intro')}</p>
      <QueryState query={assessments}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('exams.analytics.noAssessments')}</p>
          ) : (
            <Field label={t('exams.analytics.assessment')}>
              <Select
                value={assessmentId}
                onChange={(e) => setAssessmentId(e.target.value)}
                placeholder={t('exams.analytics.pick')}
                options={list.map((a) => ({ value: a.id, label: a.title }))}
              />
            </Field>
          )
        }
      </QueryState>
      {assessmentId ? (
        <QueryState query={analytics}>{(items) => <ItemAnalyticsTable items={items} />}</QueryState>
      ) : null}
    </div>
  );
}

// ---------------- challenges (course view) ----------------

export function ChallengeList({ list }: { list: ChallengeDto[] }) {
  const { t, fmtDate } = useI18n();
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t('question.externalId')}</th>
            <th scope="col">{t('exams.challenge.reason')}</th>
            <th scope="col">{t('exams.challenge.statusLabel')}</th>
            <th scope="col">{t('exams.challenge.date')}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id}>
              <td className="mono">{c.questionExternalId}</td>
              <td>{c.reason}</td>
              <td>
                <Badge tone={c.status === 'Open' ? 'warning' : 'success'}>
                  {t(`exams.challenge.status.${c.status}`)}
                </Badge>{' '}
                {c.resolution ? t(`exams.challenge.resolution.${c.resolution}`) : null}
                {c.resolutionNote ? <div className="small muted">{c.resolutionNote}</div> : null}
              </td>
              <td>{fmtDate(c.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CourseChallenges({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const [status, setStatus] = useState('Open');
  const list = useQuery({
    queryKey: examKeys.courseChallenges(course.id, status),
    queryFn: () =>
      api<ChallengeDto[]>(`/api/studio/courses/${course.id}/question-challenges${qs({ status })}`),
  });
  return (
    <div className="stack">
      <p className="small muted">{t('exams.challenge.courseIntro')}</p>
      <Field label={t('exams.challenge.statusLabel')}>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder={t('exams.common.all')}
          options={['Open', 'Resolved'].map((s) => ({
            value: s,
            label: t(`exams.challenge.status.${s}`),
          }))}
        />
      </Field>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <p className="muted">{t('exams.challenge.none')}</p>
          ) : (
            <ChallengeList list={items} />
          )
        }
      </QueryState>
    </div>
  );
}

// ---------------- assessment policy ----------------

function PolicyEditor({ assessmentId }: { assessmentId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const policy = useQuery({
    queryKey: examKeys.policy(assessmentId),
    queryFn: () => api<AssessmentPolicyDto>(`/api/studio/assessments/${assessmentId}/policy`),
  });
  return (
    <QueryState query={policy}>
      {(p) => (
        <PolicyForm
          key={p.updatedAt ?? 'new'}
          policy={p}
          onSaved={() => toast.success(t('exams.policy.saved'))}
        />
      )}
    </QueryState>
  );
}

function PolicyForm({ policy, onSaved }: { policy: AssessmentPolicyDto; onSaved: () => void }) {
  const { t } = useI18n();
  const [allowPause, setAllowPause] = useState(policy.allowPause);
  const [minutes, setMinutes] = useState(policy.maxPauseMinutes || 10);
  const [cap, setCap] = useState<string>(policy.maxExposuresPerQuestion?.toString() ?? '');
  const save = useApiMutation(
    () =>
      api<AssessmentPolicyDto>(`/api/studio/assessments/${policy.assessmentId}/policy`, {
        method: 'PUT',
        body: {
          allowPause,
          maxPauseMinutes: allowPause ? minutes : 0,
          maxExposuresPerQuestion: cap.trim() ? Number(cap) : null,
        },
      }),
    [examKeys.policy(policy.assessmentId)],
    onSaved,
  );
  const minutesOk = !allowPause || (Number.isInteger(minutes) && minutes >= 1 && minutes <= 240);
  const capOk = !cap.trim() || (Number.isInteger(Number(cap)) && Number(cap) >= 1);
  return (
    <form
      className="stack"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (minutesOk && capOk) save.mutate(undefined);
      }}
    >
      <Checkbox
        label={t('exams.policy.allowPause')}
        hint={t('exams.policy.allowPauseHint')}
        checked={allowPause}
        onChange={(e) => setAllowPause(e.target.checked)}
      />
      {allowPause ? (
        <Field
          label={t('exams.policy.maxPause')}
          error={minutesOk ? undefined : t('exams.policy.maxPauseRule')}
        >
          <Input
            type="number"
            min={1}
            max={240}
            value={Number.isNaN(minutes) ? '' : minutes}
            onChange={(e) => setMinutes(e.target.valueAsNumber)}
          />
        </Field>
      ) : null}
      <Field
        label={t('exams.policy.exposure')}
        hint={t('exams.policy.exposureHint')}
        error={capOk ? undefined : t('exams.policy.exposureRule')}
      >
        <Input type="number" min={1} value={cap} onChange={(e) => setCap(e.target.value)} />
      </Field>
      {save.isError ? <Notice tone="danger">{examError(save.error, t)}</Notice> : null}
      <div>
        <Button type="submit" loading={save.isPending}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}

function PolicyPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const assessments = useStudioAssessments(course.id);
  const [assessmentId, setAssessmentId] = useState('');
  return (
    <div className="stack">
      <QueryState query={assessments}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('exams.analytics.noAssessments')}</p>
          ) : (
            <Field label={t('exams.analytics.assessment')}>
              <Select
                value={assessmentId}
                onChange={(e) => setAssessmentId(e.target.value)}
                placeholder={t('exams.analytics.pick')}
                options={list.map((a) => ({ value: a.id, label: a.title }))}
              />
            </Field>
          )
        }
      </QueryState>
      {assessmentId ? <PolicyEditor key={assessmentId} assessmentId={assessmentId} /> : null}
    </div>
  );
}

// ---------------- course certificate template ----------------

function CourseCertificateTemplate({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const templates = useTemplates(false);
  const current = useQuery({
    queryKey: examKeys.courseTemplate(course.id),
    queryFn: () => api<CourseTemplateDto>(`/api/studio/courses/${course.id}/certificate-template`),
  });
  const [choice, setChoice] = useState<string | null>(null);
  const value = choice ?? current.data?.templateId ?? '';
  const save = useApiMutation(
    () =>
      api<CourseTemplateDto>(`/api/studio/courses/${course.id}/certificate-template`, {
        method: 'PUT',
        body: { templateId: value || null },
      }),
    [examKeys.courseTemplate(course.id)],
    () => toast.success(t('exams.cert.courseSaved')),
  );
  const options = useMemo(
    () => (templates.data ?? []).map((tp) => ({ value: tp.id, label: tp.name })),
    [templates.data],
  );
  return (
    <div className="stack">
      <p className="small muted">{t('exams.cert.courseIntro')}</p>
      <QueryStatus query={templates} />
      <QueryState query={current}>
        {() => (
          <form
            className="row"
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(undefined);
            }}
          >
            <Field label={t('exams.cert.template')}>
              <Select
                value={value}
                onChange={(e) => setChoice(e.target.value)}
                placeholder={t('exams.cert.defaultTemplate')}
                options={options}
              />
            </Field>
            <Button type="submit" loading={save.isPending}>
              {t('common.save')}
            </Button>
          </form>
        )}
      </QueryState>
      {save.isError ? <Notice tone="danger">{examError(save.error, t)}</Notice> : null}
    </div>
  );
}
