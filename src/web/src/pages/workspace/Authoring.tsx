import { useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';
import { keys, useApiMutation, useStudioCourses } from '../../api/hooks';
import type { StudioCourseDto, StudioLessonDto, StudioModuleDto } from '../../api/types';
import type { StudioLessonDto as VersionedLessonDto } from '../../api/workspace';
import {
  bulkLessons,
  duplicateLesson,
  duplicateModule,
  getNotes,
  parseLessonList,
  restoreRevision,
  saveNotes,
  wsKeys,
} from '../../api/workspace';
import type {
  ChecklistItemDto,
  CourseHistoryDto,
  CourseTemplateDto,
  LearnerPreviewDto,
  LessonNotesDto,
  LessonRevisionDto,
  LessonRevisionSummaryDto,
  MyAgreementDto,
  StudioTranslationDto,
} from '../../api/workspace';
import { Markdown } from '../../components/Markdown';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, QueryState, QueryStatus, StatusBadge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { AiAssistPanel } from './AiPanels';
import { Drawer, fmtDateTime, WsError, wsError } from './common';

export const AUTOSAVE_MS = 20_000;

type EditorProps = { label: string; value: string; onChange: (v: string) => void; hint?: string };

interface ConflictState {
  server: LessonNotesDto;
}

/**
 * Lesson notes with optimistic concurrency: every save sends If-Match "n{notesVersion}"; a 412 opens a conflict
 * dialog (server version vs yours → reload, or overwrite by re-applying yours on top of the latest version).
 * Autosaves every 20 s while there are unsaved changes.
 */
export function NotesEditor({
  lesson,
  courseId,
  Editor,
}: {
  lesson: StudioLessonDto;
  courseId: string;
  Editor: ComponentType<EditorProps>;
}) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const qc = useQueryClient();
  const notesQ = useQuery({
    queryKey: wsKeys.notes(lesson.id),
    queryFn: () => getNotes(lesson.id),
    staleTime: Infinity,
  });
  const [notes, setNotes] = useState<string | null>(null);
  const [premium, setPremium] = useState('');
  const [etag, setEtag] = useState('');
  const [base, setBase] = useState({ notes: '', premium: '' });
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [conflict, setConflict] = useState<ConflictState | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const load = useCallback((d: LessonNotesDto) => {
    setNotes(d.notesMarkdown ?? '');
    setPremium(d.premiumNotesMarkdown ?? '');
    setBase({ notes: d.notesMarkdown ?? '', premium: d.premiumNotesMarkdown ?? '' });
    setEtag(d.etag);
  }, []);

  useEffect(() => {
    if (notes === null && notesQ.data) load(notesQ.data);
  }, [notesQ.data, notes, load]);

  const dirty = notes !== null && (notes !== base.notes || premium !== base.premium);

  const state = useRef({ notes, premium, etag, saving, conflict, dirty });
  state.current = { notes, premium, etag, saving, conflict, dirty };

  const save = useCallback(
    async (manual: boolean, overrideEtag?: string) => {
      const s = state.current;
      if (s.notes === null || s.saving) return;
      setSaving(true);
      setError(null);
      const sent = { notesMarkdown: s.notes, premiumNotesMarkdown: s.premium };
      try {
        const r = await saveNotes(lesson.id, overrideEtag ?? s.etag, sent);
        setEtag(r.etag);
        setBase({ notes: sent.notesMarkdown, premium: sent.premiumNotesMarkdown });
        setSavedAt(new Date().toISOString());
        setConflict(null);
        qc.setQueryData(wsKeys.notes(lesson.id), {
          lessonId: lesson.id,
          notesVersion: r.lesson.notesVersion,
          etag: r.etag,
          notesMarkdown: sent.notesMarkdown,
          premiumNotesMarkdown: sent.premiumNotesMarkdown || null,
        } satisfies LessonNotesDto);
        void qc.invalidateQueries({ queryKey: keys.studioCourse(courseId) });
        void qc.invalidateQueries({ queryKey: wsKeys.revisions(lesson.id) });
        if (manual) toast.success(t('editor.notesSaved'));
      } catch (e) {
        if (e instanceof ApiError && (e.status === 412 || e.is('precondition_failed'))) {
          try {
            const server = await getNotes(lesson.id);
            setConflict({ server });
          } catch (e2) {
            setError(e2);
          }
        } else setError(e);
      } finally {
        setSaving(false);
      }
    },
    [lesson.id, courseId, qc, toast, t],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      const s = state.current;
      if (s.dirty && !s.saving && !s.conflict) void save(false);
    }, AUTOSAVE_MS);
    return () => window.clearInterval(id);
  }, [save]);

  if (notesQ.isPending || notes === null)
    return <QueryState query={notesQ}>{() => null}</QueryState>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void save(true);
      }}
    >
      <div className="row row--between">
        <p className="small muted" role="status" aria-live="polite">
          {saving
            ? t('workspace.notes.saving')
            : dirty
              ? t('workspace.notes.unsaved')
              : savedAt
                ? t('workspace.notes.savedAt', { time: fmtDateTime(savedAt, lang) })
                : t('workspace.notes.upToDate')}{' '}
          · {t('workspace.notes.autosaveHint')}
        </p>
        <Button variant="secondary" size="sm" onClick={() => setHistoryOpen(true)}>
          {t('workspace.revisions.open')}
        </Button>
      </div>
      <Editor
        label={t('learn.studyNotes')}
        hint={t('editor.notesHint')}
        value={notes}
        onChange={setNotes}
      />
      <Editor
        label={t('learn.premiumNotes')}
        hint={t('editor.premiumHint')}
        value={premium}
        onChange={setPremium}
      />
      <WsError error={error} />
      <Button type="submit" loading={saving} disabled={!!conflict}>
        {t('editor.saveNotes')}
      </Button>
      <section style={{ marginBlockStart: 'var(--space-5)' }}>
        <AiAssistPanel
          courseId={courseId}
          lessonId={lesson.id}
          onInsert={(text) => setNotes((n) => (n ? `${n}\n\n${text}` : text))}
        />
      </section>
      <Dialog
        open={!!conflict}
        wide
        alert
        title={t('workspace.conflict.title')}
        onClose={() => setConflict(null)}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                if (!conflict) return;
                load(conflict.server);
                setConflict(null);
                toast.success(t('workspace.conflict.reloaded'));
              }}
            >
              {t('workspace.conflict.reload')}
            </Button>
            <Button
              variant="danger"
              loading={saving}
              onClick={() => conflict && void save(true, conflict.server.etag)}
            >
              {t('workspace.conflict.overwrite')}
            </Button>
          </>
        }
      >
        <p>{t('workspace.conflict.body')}</p>
        {conflict ? (
          <div className="ws-conflict">
            <div>
              <h3 className="small">
                {t('workspace.conflict.server', { n: conflict.server.notesVersion })}
              </h3>
              <pre
                className="ws-pre"
                aria-label={t('workspace.conflict.server', { n: conflict.server.notesVersion })}
              >
                {conflict.server.notesMarkdown || '—'}
              </pre>
            </div>
            <div>
              <h3 className="small">{t('workspace.conflict.yours')}</h3>
              <pre className="ws-pre" aria-label={t('workspace.conflict.yours')}>
                {notes || '—'}
              </pre>
            </div>
          </div>
        ) : null}
      </Dialog>
      <RevisionsDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        lessonId={lesson.id}
        etag={etag}
        dirty={dirty}
        onRestored={(l, newEtag) => {
          const d: LessonNotesDto = {
            lessonId: lesson.id,
            notesVersion: l.notesVersion,
            etag: newEtag,
            notesMarkdown: l.notesMarkdown ?? '',
            premiumNotesMarkdown: l.premiumNotesMarkdown ?? null,
          };
          qc.setQueryData(wsKeys.notes(lesson.id), d);
          load(d);
          void qc.invalidateQueries({ queryKey: keys.studioCourse(courseId) });
        }}
      />
    </form>
  );
}

function RevisionsDrawer({
  open,
  onClose,
  lessonId,
  etag,
  dirty,
  onRestored,
}: {
  open: boolean;
  onClose: () => void;
  lessonId: string;
  etag: string;
  dirty: boolean;
  onRestored: (lesson: VersionedLessonDto, etag: string) => void;
}) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: wsKeys.revisions(lessonId),
    queryFn: () => api<LessonRevisionSummaryDto[]>(`/api/studio/lessons/${lessonId}/revisions`),
    enabled: open,
  });
  const [viewing, setViewing] = useState<number | null>(null);
  const detail = useQuery({
    queryKey: [...wsKeys.revisions(lessonId), viewing],
    queryFn: () =>
      api<LessonRevisionDto>(`/api/studio/lessons/${lessonId}/revisions/${viewing ?? 0}`),
    enabled: open && viewing !== null,
  });
  const restore = useApiMutation(
    (revision: number) => restoreRevision(lessonId, revision, etag),
    [wsKeys.revisions(lessonId)],
    (r) => {
      onRestored(r.lesson, r.etag);
      toast.success(t('workspace.revisions.restored'));
      setViewing(null);
    },
  );
  return (
    <Drawer open={open} onClose={onClose} title={t('workspace.revisions.title')}>
      {dirty ? <Notice tone="warning">{t('workspace.revisions.dirtyWarning')}</Notice> : null}
      {viewing !== null ? (
        <div className="stack">
          <Button variant="ghost" size="sm" onClick={() => setViewing(null)}>
            ← {t('workspace.revisions.back')}
          </Button>
          <QueryState query={detail}>
            {(r) => (
              <div className="stack">
                <h3>{t('workspace.revisions.revision', { n: r.revision })}</h3>
                <p className="small muted">
                  {r.authorName ?? t('workspace.revisions.unknownAuthor')} ·{' '}
                  {fmtDateTime(r.createdAt, lang)}
                </p>
                <h4>{t('learn.studyNotes')}</h4>
                <pre className="ws-pre">{r.notesMarkdown || '—'}</pre>
                <h4>{t('learn.premiumNotes')}</h4>
                <pre className="ws-pre">{r.premiumNotesMarkdown || '—'}</pre>
                {r.isCurrent ? (
                  <Badge tone="success">{t('workspace.revisions.current')}</Badge>
                ) : (
                  <Button loading={restore.isPending} onClick={() => restore.mutate(r.revision)}>
                    {t('workspace.revisions.restore', { n: r.revision })}
                  </Button>
                )}
                {restore.isError ? (
                  <Notice tone="danger">
                    {wsError(restore.error, t)}{' '}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        void qc.invalidateQueries({ queryKey: wsKeys.notes(lessonId) });
                        restore.reset();
                      }}
                    >
                      {t('common.retry')}
                    </Button>
                  </Notice>
                ) : null}
              </div>
            )}
          </QueryState>
        </div>
      ) : (
        <QueryState query={list}>
          {(items) =>
            items.length === 0 ? (
              <p className="muted">{t('workspace.revisions.none')}</p>
            ) : (
              <ul className="ws-list">
                {items.map((r) => (
                  <li key={r.revision} className="card card--flat">
                    <div className="row row--between">
                      <strong>{t('workspace.revisions.revision', { n: r.revision })}</strong>
                      {r.isCurrent ? (
                        <Badge tone="success">{t('workspace.revisions.current')}</Badge>
                      ) : null}
                    </div>
                    <div className="small muted">
                      {r.authorName ?? t('workspace.revisions.unknownAuthor')} ·{' '}
                      {fmtDateTime(r.createdAt, lang)}
                      {r.restoredFromRevision
                        ? ` · ${t('workspace.revisions.restoredFrom', { n: r.restoredFromRevision })}`
                        : ''}
                    </div>
                    <div className="small muted">
                      {t('workspace.revisions.lengths', {
                        notes: r.notesLength,
                        premium: r.premiumNotesLength,
                      })}
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setViewing(r.revision)}
                      aria-label={t('workspace.revisions.viewNamed', { n: r.revision })}
                    >
                      {t('workspace.revisions.view')}
                    </Button>
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      )}
    </Drawer>
  );
}

// ---------- course history ----------
export function CourseHistoryPanel({ course }: { course: StudioCourseDto }) {
  const { t, lang } = useI18n();
  const [pages, setPages] = useState(1);
  const history = useQuery({
    queryKey: [...wsKeys.history(course.id), pages],
    queryFn: async () => {
      const all: CourseHistoryDto['items'] = [];
      let hasMore = false;
      for (let p = 1; p <= pages; p++) {
        const r = await api<CourseHistoryDto>(
          `/api/studio/courses/${course.id}/history?page=${p}&pageSize=50`,
        );
        all.push(...r.items);
        hasMore = r.hasMore;
      }
      return { items: all, hasMore };
    },
    placeholderData: (prev) => prev,
  });
  const lessonTitle = (id: string | null) =>
    id
      ? (course.modules.flatMap((m) => m.lessons).find((l) => l.id === id)?.title ??
        t('workspace.history.removedLesson'))
      : null;
  return (
    <QueryState query={history}>
      {(h) =>
        h.items.length === 0 ? (
          <p className="muted">{t('workspace.history.none')}</p>
        ) : (
          <div className="stack">
            <ol className="ws-list" aria-label={t('workspace.history.title')}>
              {h.items.map((e, i) => (
                <li key={`${e.at}-${i}`} className="card card--flat">
                  <div className="row row--between">
                    <strong>
                      {e.kind === 'notes_revision'
                        ? t('workspace.history.notesRevision', {
                            n: e.revision ?? 0,
                            lesson: lessonTitle(e.lessonId) ?? '',
                          })
                        : e.action}
                    </strong>
                    <span className="small muted">
                      <time dateTime={e.at}>{fmtDateTime(e.at, lang)}</time>
                    </span>
                  </div>
                  <div className="small muted">
                    {e.actorName ?? t('workspace.revisions.unknownAuthor')}
                    {e.kind === 'audit' && e.lessonId ? ` · ${lessonTitle(e.lessonId)}` : ''}
                  </div>
                  {e.details && e.kind === 'audit' ? (
                    <details>
                      <summary className="small">{t('workspace.history.details')}</summary>
                      <pre className="ws-pre">{e.details}</pre>
                    </details>
                  ) : null}
                </li>
              ))}
            </ol>
            {h.hasMore ? (
              <Button
                variant="secondary"
                loading={history.isFetching}
                onClick={() => setPages((p) => p + 1)}
              >
                {t('workspace.history.more')}
              </Button>
            ) : null}
          </div>
        )
      }
    </QueryState>
  );
}

// ---------- duplicate / bulk ----------
export function DuplicateCourseButton({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const dup = useApiMutation(
    () =>
      api<StudioCourseDto>(`/api/studio/courses/${course.id}/duplicate`, {
        method: 'POST',
        body: { title: title.trim() || null },
      }),
    [keys.studioCourses],
    (c) => {
      setOpen(false);
      navigate(`/studio/courses/${c.id}`);
    },
  );
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {t('workspace.duplicate.course')}
      </Button>
      <Dialog
        open={open}
        title={t('workspace.duplicate.course')}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button loading={dup.isPending} onClick={() => dup.mutate(undefined)}>
              {t('workspace.duplicate.create')}
            </Button>
          </>
        }
      >
        <p className="small">{t('workspace.duplicate.courseHelp')}</p>
        <Field label={t('workspace.duplicate.newTitle')} hint={t('workspace.duplicate.titleHint')}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
        </Field>
        <WsError error={dup.error} />
      </Dialog>
    </>
  );
}

export function DuplicateLessonButton({
  lesson,
  courseId,
}: {
  lesson: StudioLessonDto;
  courseId: string;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const dup = useApiMutation(
    () => duplicateLesson(lesson.id),
    [keys.studioCourse(courseId)],
    () => toast.success(t('workspace.duplicate.lessonDone')),
  );
  return (
    <Button
      size="sm"
      variant="ghost"
      loading={dup.isPending}
      onClick={() => dup.mutate(undefined, { onError: (e) => toast.error(wsError(e, t)) })}
      aria-label={t('workspace.duplicate.lessonNamed', { title: lesson.title })}
    >
      {t('workspace.duplicate.short')}
    </Button>
  );
}

/** Per-module tools in the curriculum: duplicate the module, paste a list of lesson titles. */
export function ModuleTools({ module, courseId }: { module: StudioModuleDto; courseId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const titles = parseLessonList(text);
  const dup = useApiMutation(
    () => duplicateModule(module.id),
    [keys.studioCourse(courseId)],
    () => toast.success(t('workspace.duplicate.moduleDone')),
  );
  const bulk = useApiMutation(
    () => bulkLessons(module.id, titles),
    [keys.studioCourse(courseId)],
    (r) => {
      toast.success(t('workspace.bulk.done', { n: r.length }));
      setOpen(false);
      setText('');
    },
  );
  return (
    <span className="row" style={{ display: 'inline-flex' }}>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        {t('workspace.bulk.open')}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        loading={dup.isPending}
        onClick={() => dup.mutate(undefined, { onError: (e) => toast.error(wsError(e, t)) })}
        aria-label={t('workspace.duplicate.moduleNamed', { title: module.title })}
      >
        {t('workspace.duplicate.module')}
      </Button>
      <Dialog
        open={open}
        title={t('workspace.bulk.title', { module: module.title })}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={bulk.isPending}
              disabled={titles.length === 0 || titles.length > 100}
              onClick={() => bulk.mutate(undefined)}
            >
              {t('workspace.bulk.create', { n: titles.length })}
            </Button>
          </>
        }
      >
        <Field label={t('workspace.bulk.label')} hint={t('workspace.bulk.hint')}>
          <Textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} />
        </Field>
        <p className="small" aria-live="polite">
          {titles.length > 100
            ? t('workspace.bulk.tooMany')
            : t('workspace.bulk.count', { n: titles.length })}
        </p>
        <WsError error={bulk.error} />
      </Dialog>
    </span>
  );
}

// ---------- templates ----------
export function useTemplates() {
  return useQuery({
    queryKey: wsKeys.templates,
    queryFn: () => api<CourseTemplateDto[]>('/api/studio/course-templates'),
    staleTime: 5 * 60_000,
  });
}

export function TemplatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const { t } = useI18n();
  const templates = useTemplates();
  if (templates.isPending || templates.isError || (templates.data ?? []).length === 0) return null;
  const list = templates.data;
  const chosen = list.find((x) => x.id === value);
  return (
    <div className="stack">
      <Field label={t('workspace.templates.label')} hint={t('workspace.templates.hint')}>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('workspace.templates.none')}
          options={list.map((x) => ({ value: x.id, label: x.name }))}
        />
      </Field>
      {chosen ? (
        <div className="card card--flat small">
          {chosen.description ? <p style={{ marginBlockStart: 0 }}>{chosen.description}</p> : null}
          <p className="muted" style={{ margin: 0 }}>
            {t('workspace.templates.summary', {
              modules: chosen.modules.length,
              lessons: chosen.modules.reduce((n, m) => n + (m.lessons?.length ?? 0), 0),
              checklist: chosen.checklist.length,
            })}
          </p>
        </div>
      ) : null}
    </div>
  );
}

// ---------- checklist ----------
export function ChecklistPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const [text, setText] = useState('');
  const list = useQuery({
    queryKey: wsKeys.checklist(course.id),
    queryFn: () => api<ChecklistItemDto[]>(`/api/studio/courses/${course.id}/checklist`),
  });
  const add = useApiMutation(
    () =>
      api(`/api/studio/courses/${course.id}/checklist`, {
        method: 'POST',
        body: { text: text.trim() },
      }),
    [wsKeys.checklist(course.id)],
    () => setText(''),
  );
  const toggle = useApiMutation(
    (v: { id: string; done: boolean }) =>
      api(`/api/studio/courses/${course.id}/checklist/${v.id}`, {
        method: 'PUT',
        body: { done: v.done },
      }),
    [wsKeys.checklist(course.id)],
  );
  return (
    <div className="stack">
      <p className="small muted">{t('workspace.checklist.help')}</p>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <p className="muted">{t('workspace.checklist.empty')}</p>
          ) : (
            <>
              <p className="small">
                {t('workspace.checklist.progress', {
                  done: items.filter((i) => i.done).length,
                  total: items.length,
                })}
              </p>
              <ul className="ws-list">
                {items.map((i) => (
                  <li key={i.id}>
                    <Checkbox
                      label={i.text}
                      checked={i.done}
                      disabled={toggle.isPending}
                      onChange={(e) =>
                        toggle.mutate(
                          { id: i.id, done: e.target.checked },
                          { onError: (er) => toast.error(wsError(er, t)) },
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </>
          )
        }
      </QueryState>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) add.mutate(undefined);
        }}
      >
        <Field label={t('workspace.checklist.new')}>
          <Input value={text} onChange={(e) => setText(e.target.value)} maxLength={300} />
        </Field>
        <Button type="submit" disabled={!text.trim()} loading={add.isPending}>
          {t('workspace.checklist.add')}
        </Button>
      </form>
      <WsError error={add.error} />
    </div>
  );
}

// ---------- translations ----------
export function TranslationsPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const [target, setTarget] = useState('');
  const list = useQuery({
    queryKey: wsKeys.translations(course.id),
    queryFn: () => api<StudioTranslationDto[]>(`/api/studio/courses/${course.id}/translations`),
    retry: false,
  });
  const mine = useStudioCourses();
  const link = useApiMutation(
    () =>
      api(`/api/studio/courses/${course.id}/translations`, {
        method: 'POST',
        body: { courseId: target },
      }),
    [wsKeys.translations(course.id)],
    () => {
      setTarget('');
      toast.success(t('workspace.translations.linked'));
    },
  );
  const unlink = useApiMutation(
    () => api(`/api/studio/courses/${course.id}/translations`, { method: 'DELETE' }),
    [wsKeys.translations(course.id)],
    () => toast.success(t('workspace.translations.unlinked')),
  );
  const linkedIds = new Set((list.data ?? []).map((x) => x.courseId));
  const candidates = (mine.data ?? []).filter((c) => c.id !== course.id && !linkedIds.has(c.id));
  return (
    <div className="stack">
      <h2>{t('workspace.translations.title')}</h2>
      <p className="small muted">{t('workspace.translations.help')}</p>
      <QueryStatus query={mine} />
      {list.isError ? (
        <WsError error={list.error} />
      ) : (
        <QueryState query={list}>
          {(items) =>
            items.length === 0 ? (
              <p className="muted">{t('workspace.translations.none')}</p>
            ) : (
              <>
                <ul className="ws-list">
                  {items.map((x) => (
                    <li key={x.courseId} className="card card--flat row row--between">
                      <span>
                        <strong>{x.title}</strong>{' '}
                        <span className="small muted">
                          {x.code} · {t(`language.${x.language}`)}
                        </span>
                      </span>
                      <StatusBadge status={x.status} />
                    </li>
                  ))}
                </ul>
                <Button
                  variant="secondary"
                  size="sm"
                  loading={unlink.isPending}
                  onClick={() => unlink.mutate(undefined)}
                >
                  {t('workspace.translations.unlink')}
                </Button>
              </>
            )
          }
        </QueryState>
      )}
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          if (target) link.mutate(undefined);
        }}
      >
        <Field label={t('workspace.translations.pick')}>
          <Select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder={t('workspace.translations.choose')}
            options={candidates.map((c) => ({
              value: c.id,
              label: c.code ? `${c.title} (${c.code})` : c.title,
            }))}
          />
        </Field>
        <Button type="submit" disabled={!target} loading={link.isPending}>
          {t('workspace.translations.link')}
        </Button>
      </form>
      <WsError error={link.error ?? unlink.error} />
    </div>
  );
}

/** Tab content: duplicate the course + language variants. Management actions; editors see the server's 403. */
export function CopiesPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  return (
    <div className="stack">
      <section className="stack">
        <h2>{t('workspace.duplicate.course')}</h2>
        <div>
          <DuplicateCourseButton course={course} />
        </div>
      </section>
      <TranslationsPanel course={course} />
    </div>
  );
}

// ---------- learner preview ----------
export function PreviewPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const [as, setAs] = useState<'free' | 'premium'>('free');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [lessonId, setLessonId] = useState('');
  const preview = useQuery({
    queryKey: ['ws', 'preview', course.id, as, device],
    queryFn: () =>
      api<LearnerPreviewDto>(`/api/studio/courses/${course.id}/preview?as=${as}&device=${device}`),
  });
  return (
    <div className="stack">
      <Notice tone="info">{t('workspace.preview.note')}</Notice>
      <div className="row">
        <fieldset className="row" style={{ border: 0, padding: 0 }}>
          <legend className="small">{t('workspace.preview.as')}</legend>
          {(['free', 'premium'] as const).map((v) => (
            <label key={v} className="row small">
              <input type="radio" name="ws-as" checked={as === v} onChange={() => setAs(v)} />
              {t(`workspace.preview.${v}`)}
            </label>
          ))}
        </fieldset>
        <fieldset className="row" style={{ border: 0, padding: 0 }}>
          <legend className="small">{t('workspace.preview.device')}</legend>
          {(['desktop', 'mobile'] as const).map((v) => (
            <label key={v} className="row small">
              <input
                type="radio"
                name="ws-device"
                checked={device === v}
                onChange={() => setDevice(v)}
              />
              {t(`workspace.preview.${v}`)}
            </label>
          ))}
        </fieldset>
      </div>
      <QueryState query={preview}>
        {(p) => {
          const current = p.lessons.find((l) => l.lesson.id === lessonId) ?? p.lessons[0];
          return (
            <div
              className={`ws-frame ws-frame--${device}`}
              aria-label={t('workspace.preview.frame', {
                device: t(`workspace.preview.${device}`),
              })}
              role="region"
            >
              <h3 style={{ marginBlockStart: 0 }}>{p.curriculum.title}</h3>
              <Field label={t('workspace.preview.lesson')}>
                <Select
                  value={current?.lesson.id ?? ''}
                  onChange={(e) => setLessonId(e.target.value)}
                  options={p.lessons.map((l) => ({ value: l.lesson.id, label: l.lesson.title }))}
                />
              </Field>
              {current ? (
                <div className="stack">
                  <h4>{current.lesson.title}</h4>
                  {current.youtubeVideoId ? (
                    <p className="small muted">
                      {t('workspace.preview.video', { id: current.youtubeVideoId })}
                    </p>
                  ) : (
                    <p className="small muted">{t('player.noVideo')}</p>
                  )}
                  <h5>{t('learn.studyNotes')}</h5>
                  {current.notesMarkdown.trim() ? (
                    <Markdown source={current.notesMarkdown} />
                  ) : (
                    <p className="muted">{t('learn.noNotes')}</p>
                  )}
                  <h5>{t('learn.premiumNotes')}</h5>
                  {current.premiumLocked || current.premiumNotesMarkdown === null ? (
                    <div className="locked">
                      <p>{t('learn.premiumLockedBody')}</p>
                    </div>
                  ) : (
                    <Markdown source={current.premiumNotesMarkdown} />
                  )}
                  {current.assessments.length > 0 ? (
                    <>
                      <h5>{t('learn.practice')}</h5>
                      <ul>
                        {current.assessments.map((a) => (
                          <li key={a.id}>
                            {a.title} · {t('workspace.preview.questions', { n: a.questionCount })}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              ) : (
                <p className="muted">{t('learn.noLessons')}</p>
              )}
            </div>
          );
        }}
      </QueryState>
    </div>
  );
}

// ---------- instructor agreement ----------
/**
 * Before the first submission: if the server requires acceptance of the current agreement, show it and record
 * acceptance; then run the original action. A submit refused with 409 agreement_required re-opens the dialog.
 */
export function useAgreementGate(): {
  run: (action: () => void) => void;
  handleError: (e: unknown, retry: () => void) => boolean;
  dialog: ReactNode;
} {
  const { t } = useI18n();
  const qc = useQueryClient();
  const [pending, setPending] = useState<(() => void) | null>(null);
  const [agreement, setAgreement] = useState<MyAgreementDto | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);

  const open = async (action: () => void) => {
    setError(null);
    try {
      const a = await qc.fetchQuery({
        queryKey: wsKeys.agreement,
        queryFn: () => api<MyAgreementDto>('/api/studio/agreement'),
        staleTime: 0,
      });
      if (a.required && !a.accepted && a.current) {
        setAgreement(a);
        setChecked(false);
        setPending(() => action);
      } else action();
    } catch {
      // If the agreement cannot be read, let the server decide on submit.
      action();
    }
  };

  const accept = async () => {
    if (!agreement?.current) return;
    setBusy(true);
    setError(null);
    try {
      await api('/api/studio/agreement/accept', {
        method: 'POST',
        body: { version: agreement.current.version },
      });
      await qc.invalidateQueries({ queryKey: wsKeys.agreement });
      const a = pending;
      setAgreement(null);
      setPending(null);
      a?.();
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };

  const dialog = (
    <Dialog
      open={!!agreement}
      wide
      title={agreement?.current?.title ?? t('workspace.agreement.title')}
      onClose={() => {
        setAgreement(null);
        setPending(null);
      }}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={() => {
              setAgreement(null);
              setPending(null);
            }}
          >
            {t('common.cancel')}
          </Button>
          <Button disabled={!checked} loading={busy} onClick={() => void accept()}>
            {t('workspace.agreement.accept')}
          </Button>
        </>
      }
    >
      <p className="small muted">
        {t('workspace.agreement.intro', { version: agreement?.current?.version ?? '' })}
      </p>
      <div className="ws-pre" style={{ fontFamily: 'inherit' }}>
        <Markdown source={agreement?.current?.body ?? ''} />
      </div>
      <Checkbox
        label={t('workspace.agreement.confirm')}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <WsError error={error} />
    </Dialog>
  );

  return {
    run: (action) => void open(action),
    handleError: (e, retry) => {
      if (e instanceof ApiError && e.is('agreement_required')) {
        void qc.invalidateQueries({ queryKey: wsKeys.agreement });
        void open(retry);
        return true;
      }
      return false;
    },
    dialog,
  };
}
