import { useState } from 'react';
import type { RefObject } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, downloadFile } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { groupByDay, WEEK_DAYS, wsKeys } from '../../api/workspace';
import type {
  BookmarkDto,
  ContinueLearningDto,
  FolderDto,
  StudyPlanDto,
  StudyPlanRequest,
  WeekDay,
} from '../../api/workspace';
import type { PlayerHandle } from '../../components/YouTubePlayer';
import { Button, ButtonLink } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Checkbox, Field, Input, Select } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { formatTimestamp } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { fmtDateTime, WsError, wsError } from './common';
import { accountApi, accountKeys } from '../../api/account';
import { CalendarSubscription } from '../finala/Account';

function useContinueLearning(limit = 10) {
  return useQuery({
    queryKey: [...wsKeys.continueLearning, limit],
    queryFn: () => api<ContinueLearningDto[]>(`/api/me/continue-learning?limit=${limit}`),
  });
}

// ---------- continue learning (dashboard) ----------
export function ContinueLearningSection() {
  const { t, fmtNumber } = useI18n();
  const list = useContinueLearning(6);
  return (
    <section className="card" aria-labelledby="ws-continue-h">
      <div className="row row--between">
        <h2 id="ws-continue-h">{t('workspace.continue.title')}</h2>
        <div className="row">
          <Link to="/me/study-plan">{t('workspace.plan.title')}</Link>
          <Link to="/me/folders">{t('workspace.folders.title')}</Link>
          <Link to="/me/bookmarks">{t('workspace.bookmarks.title')}</Link>
        </div>
      </div>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <p className="muted">{t('workspace.continue.empty')}</p>
          ) : (
            <ul className="ws-list">
              {items.map((c) => (
                <li key={c.courseId} className="row row--between">
                  <span>
                    <strong>{c.courseTitle}</strong>
                    <span className="small muted">
                      {' '}
                      ·{' '}
                      {t('workspace.continue.progress', {
                        done: fmtNumber(c.completedLessons),
                        total: fmtNumber(c.totalLessons),
                      })}
                      {c.lessonTitle ? ` · ${c.lessonTitle}` : ''}
                    </span>
                  </span>
                  {c.courseCompleted ? (
                    <Badge tone="success">{t('workspace.continue.completed')}</Badge>
                  ) : c.lessonId ? (
                    <ButtonLink
                      size="sm"
                      to={`/learn/${c.slug}/${c.lessonId}${c.positionSeconds > 0 ? `?t=${c.positionSeconds}` : ''}`}
                      aria-label={t('workspace.continue.resumeNamed', { title: c.courseTitle })}
                    >
                      {c.positionSeconds > 0
                        ? t('workspace.continue.resumeAt', {
                            time: formatTimestamp(c.positionSeconds),
                          })
                        : t('workspace.continue.resume')}
                    </ButtonLink>
                  ) : null}
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </section>
  );
}

// ---------- study plan ----------
function defaultTarget(): string {
  const d = new Date(Date.now() + 60 * 86_400_000);
  return d.toISOString().slice(0, 10);
}

function PlanForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial: StudyPlanDto | null;
  onSaved: () => void;
  onCancel?: () => void;
}) {
  const { t } = useI18n();
  const courses = useContinueLearning(50);
  const [courseIds, setCourseIds] = useState<string[]>(initial?.courseIds ?? []);
  const [target, setTarget] = useState(initial?.targetDate.slice(0, 10) ?? defaultTarget());
  const [minutes, setMinutes] = useState(String(initial?.weeklyMinutes ?? 180));
  const [days, setDays] = useState<WeekDay[]>(
    initial?.sessionDays ?? ['Monday', 'Wednesday', 'Friday'],
  );
  const [hour, setHour] = useState(String(initial?.sessionHour ?? initial?.sessionHourUtc ?? 18));
  // Sessions are scheduled at a local hour in the profile time zone (UTC when unset).
  // optional-query: time-zone default; UTC until the profile loads
  const profile = useQuery({
    queryKey: accountKeys.profile,
    queryFn: accountApi.profile,
    enabled: !initial?.timeZone,
  });
  const zone = initial?.timeZone ?? (profile.data?.timeZone || 'UTC');
  const [reminders, setReminders] = useState(initial?.remindersEnabled ?? false);
  const mins = Number(minutes);
  const valid =
    courseIds.length >= 1 &&
    courseIds.length <= 10 &&
    days.length > 0 &&
    !!target &&
    Number.isInteger(mins) &&
    mins >= 15 &&
    mins <= 3000;
  const save = useApiMutation(
    () =>
      api<StudyPlanDto>('/api/me/study-plan', {
        method: 'PUT',
        body: {
          courseIds,
          targetDate: `${target}T00:00:00Z`,
          weeklyMinutes: mins,
          sessionDays: days,
          sessionHour: Number(hour),
          remindersEnabled: reminders,
        } satisfies StudyPlanRequest,
      }),
    [wsKeys.studyPlan],
    () => onSaved(),
  );
  return (
    <form
      className="card stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) save.mutate(undefined);
      }}
    >
      <fieldset>
        <legend>{t('workspace.plan.courses')}</legend>
        <QueryState query={courses}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('workspace.plan.noCourses')}</p>
            ) : (
              <>
                {list.map((c) => (
                  <Checkbox
                    key={c.courseId}
                    label={c.courseTitle}
                    checked={courseIds.includes(c.courseId)}
                    onChange={(e) =>
                      setCourseIds((s) =>
                        e.target.checked ? [...s, c.courseId] : s.filter((x) => x !== c.courseId),
                      )
                    }
                  />
                ))}
              </>
            )
          }
        </QueryState>
      </fieldset>
      <div className="grid-2">
        <Field label={t('workspace.plan.target')} required>
          <Input type="date" value={target} onChange={(e) => setTarget(e.target.value)} />
        </Field>
        <Field
          label={t('workspace.plan.weeklyMinutes')}
          hint={t('workspace.plan.weeklyHint')}
          required
        >
          <Input
            type="number"
            min={15}
            max={3000}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </Field>
      </div>
      <fieldset>
        <legend>{t('workspace.plan.days')}</legend>
        <div className="row">
          {WEEK_DAYS.map((d) => (
            <Checkbox
              key={d}
              label={t(`workspace.days.${d}`)}
              checked={days.includes(d)}
              onChange={(e) =>
                setDays((s) => (e.target.checked ? [...s, d] : s.filter((x) => x !== d)))
              }
            />
          ))}
        </div>
      </fieldset>
      <Field
        label={t('workspace.plan.hour')}
        hint={
          <>
            {t('finala.tz.hint', { zone })} <Link to="/me/profile">{t('finala.tz.change')}</Link>
          </>
        }
      >
        <Select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          options={Array.from({ length: 24 }, (_, h) => ({
            value: String(h),
            label: `${String(h).padStart(2, '0')}:00 ${zone}`,
          }))}
        />
      </Field>
      <Checkbox
        label={t('workspace.plan.reminders')}
        hint={t('workspace.plan.remindersHint')}
        checked={reminders}
        onChange={(e) => setReminders(e.target.checked)}
      />
      <WsError error={save.error} />
      <div className="row">
        <Button type="submit" disabled={!valid} loading={save.isPending}>
          {t('workspace.plan.save')}
        </Button>
        {onCancel ? (
          <Button variant="secondary" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        ) : null}
      </div>
    </form>
  );
}

export function StudyPlanPage() {
  const { t, lang, fmtNumber, fmtDate } = useI18n();
  const toast = useToast();
  usePageMeta(t('workspace.plan.title'), undefined, { noindex: true });
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const plan = useQuery({
    queryKey: wsKeys.studyPlan,
    queryFn: () => api<StudyPlanDto | undefined>('/api/me/study-plan').then((p) => p ?? null),
  });
  const regen = useApiMutation(
    () => api('/api/me/study-plan/regenerate', { method: 'POST' }),
    [wsKeys.studyPlan],
    () => toast.success(t('workspace.plan.regenerated')),
  );
  const del = useApiMutation(
    () => api('/api/me/study-plan', { method: 'DELETE' }),
    [wsKeys.studyPlan],
    () => {
      setConfirmDelete(false);
      toast.success(t('workspace.plan.deleted'));
    },
  );
  const [icsBusy, setIcsBusy] = useState(false);
  const downloadIcs = () => {
    setIcsBusy(true);
    downloadFile('/api/me/study-plan.ics', 'mastemy-study-plan.ics')
      .catch((e) => toast.error(wsError(e, t)))
      .finally(() => setIcsBusy(false));
  };
  return (
    <div className="container page">
      <PageHeader title={t('workspace.plan.title')} subtitle={t('workspace.plan.subtitle')} />
      <QueryState query={plan}>
        {(p) =>
          !p || editing ? (
            <PlanForm
              initial={p}
              onSaved={() => {
                setEditing(false);
                toast.success(t('workspace.plan.saved'));
              }}
              onCancel={p ? () => setEditing(false) : undefined}
            />
          ) : (
            <div className="stack">
              <div className="ws-stats">
                <div className="ws-stat">
                  <div className="ws-stat__label">{t('workspace.plan.remaining')}</div>
                  <div className="ws-stat__value">
                    {fmtNumber(p.remainingLessons)} / {fmtNumber(p.totalLessons)}
                  </div>
                </div>
                <div className="ws-stat">
                  <div className="ws-stat__label">{t('workspace.plan.finishes')}</div>
                  <div className="ws-stat__value">{p.finishesAt ? fmtDate(p.finishesAt) : '—'}</div>
                </div>
                <div className="ws-stat">
                  <div className="ws-stat__label">{t('workspace.plan.target')}</div>
                  <div className="ws-stat__value">{fmtDate(p.targetDate)}</div>
                </div>
              </div>
              {p.fitsBeforeTarget ? (
                <Notice tone="success">{t('workspace.plan.fits')}</Notice>
              ) : (
                <Notice tone="warning">{t('workspace.plan.doesNotFit')}</Notice>
              )}
              <div className="row">
                <Button onClick={downloadIcs} loading={icsBusy}>
                  {t('workspace.plan.ics')}
                </Button>
                <Button variant="secondary" onClick={() => setEditing(true)}>
                  {t('workspace.plan.edit')}
                </Button>
                <Button
                  variant="secondary"
                  loading={regen.isPending}
                  onClick={() => regen.mutate(undefined)}
                >
                  {t('workspace.plan.regenerate')}
                </Button>
                <Button variant="ghost" onClick={() => setConfirmDelete(true)}>
                  {t('workspace.plan.delete')}
                </Button>
              </div>
              <p className="small" data-testid="plan-zone">
                {t('finala.tz.planAt', {
                  hour: `${String(p.sessionHour ?? p.sessionHourUtc).padStart(2, '0')}:00`,
                  zone: p.timeZone ?? 'UTC',
                })}
              </p>
              <CalendarSubscription />
              <p className="small muted">
                {p.remindersEnabled
                  ? t('workspace.plan.remindersOn')
                  : t('workspace.plan.remindersOff')}
              </p>
              <WsError error={regen.error} />
              <section aria-labelledby="ws-sched-h">
                <h2 id="ws-sched-h">{t('workspace.plan.schedule')}</h2>
                {p.weeks.length === 0 ? (
                  <p className="muted">{t('workspace.plan.nothingScheduled')}</p>
                ) : (
                  p.weeks.map((w) => (
                    <article key={w.weekStart} className="ws-week">
                      <h3>
                        {t('workspace.plan.week', { date: fmtDate(w.weekStart) })} ·{' '}
                        <span className="small muted">
                          {t('workspace.plan.minutes', { n: fmtNumber(w.plannedMinutes) })}
                        </span>
                      </h3>
                      {groupByDay(w.items).map((d) => (
                        <div key={d.day} className="ws-day">
                          <strong className="small">
                            {fmtDateTime(d.items[0].scheduledAt, lang)}
                          </strong>
                          <ul>
                            {d.items.map((i) => (
                              <li key={i.id} className={i.completed ? 'ws-done' : undefined}>
                                {i.completed ? (
                                  <span className="visually-hidden">{t('learn.completed')}: </span>
                                ) : null}
                                {i.courseTitle} › {i.lessonTitle}{' '}
                                <span className="small muted">
                                  ({formatTimestamp(i.durationSeconds)})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </article>
                  ))
                )}
              </section>
            </div>
          )
        }
      </QueryState>
      <ConfirmDialog
        open={confirmDelete}
        danger
        title={t('workspace.plan.delete')}
        body={t('workspace.plan.deleteBody')}
        confirmLabel={t('common.delete')}
        loading={del.isPending}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => del.mutate(undefined)}
      />
    </div>
  );
}

// ---------- folders ----------
export function FoldersPage() {
  const { t } = useI18n();
  const toast = useToast();
  usePageMeta(t('workspace.folders.title'), undefined, { noindex: true });
  const [name, setName] = useState('');
  const folders = useQuery({
    queryKey: wsKeys.folders,
    queryFn: () => api<FolderDto[]>('/api/me/folders'),
  });
  const courses = useContinueLearning(50);
  const create = useApiMutation(
    () => api('/api/me/folders', { method: 'POST', body: { name: name.trim() } }),
    [wsKeys.folders],
    () => setName(''),
  );
  const rename = useApiMutation(
    (v: { id: string; name: string; sortOrder: number }) =>
      api(`/api/me/folders/${v.id}`, {
        method: 'PUT',
        body: { name: v.name, sortOrder: v.sortOrder },
      }),
    [wsKeys.folders],
  );
  const remove = useApiMutation(
    (id: string) => api(`/api/me/folders/${id}`, { method: 'DELETE' }),
    [wsKeys.folders],
  );
  const setCourse = useApiMutation(
    (v: { id: string; courseId: string; add: boolean }) =>
      api(`/api/me/folders/${v.id}/courses/${v.courseId}`, { method: v.add ? 'PUT' : 'DELETE' }),
    [wsKeys.folders],
  );
  const [toDelete, setToDelete] = useState<FolderDto | null>(null);
  const onError = (e: unknown) => toast.error(wsError(e, t));
  return (
    <div className="container page">
      <PageHeader title={t('workspace.folders.title')} subtitle={t('workspace.folders.subtitle')} />
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) create.mutate(undefined, { onError });
        }}
      >
        <Field label={t('workspace.folders.new')}>
          <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
        </Field>
        <Button type="submit" disabled={!name.trim()} loading={create.isPending}>
          {t('workspace.folders.create')}
        </Button>
      </form>
      <QueryState query={folders}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('workspace.folders.empty')} />
          ) : (
            <div className="stack">
              {list.map((f) => {
                const inFolder = new Set(f.courses.map((c) => c.courseId));
                const addable = (courses.data ?? []).filter((c) => !inFolder.has(c.courseId));
                return (
                  <section key={f.id} className="card" aria-label={f.name}>
                    <div className="row row--between">
                      <h2 style={{ margin: 0 }}>{f.name}</h2>
                      <div className="row">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const next = window.prompt(t('workspace.folders.renamePrompt'), f.name);
                            if (next && next.trim())
                              rename.mutate(
                                { id: f.id, name: next.trim(), sortOrder: f.sortOrder },
                                { onError },
                              );
                          }}
                        >
                          {t('curriculum.rename')}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setToDelete(f)}>
                          {t('common.delete')}
                        </Button>
                      </div>
                    </div>
                    {f.courses.length === 0 ? (
                      <p className="muted small">{t('workspace.folders.noCourses')}</p>
                    ) : (
                      <ul className="ws-list">
                        {f.courses.map((c) => (
                          <li key={c.courseId} className="row row--between">
                            <Link to={`/learn/${c.slug}`}>{c.title}</Link>
                            <Button
                              size="sm"
                              variant="ghost"
                              aria-label={t('workspace.folders.removeNamed', { title: c.title })}
                              onClick={() =>
                                setCourse.mutate(
                                  { id: f.id, courseId: c.courseId, add: false },
                                  { onError },
                                )
                              }
                            >
                              {t('workspace.folders.remove')}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {addable.length > 0 ? (
                      <Field label={t('workspace.folders.add')}>
                        <Select
                          value=""
                          placeholder={t('workspace.folders.choose')}
                          onChange={(e) =>
                            e.target.value &&
                            setCourse.mutate(
                              { id: f.id, courseId: e.target.value, add: true },
                              { onError },
                            )
                          }
                          options={addable.map((c) => ({
                            value: c.courseId,
                            label: c.courseTitle,
                          }))}
                        />
                      </Field>
                    ) : null}
                  </section>
                );
              })}
            </div>
          )
        }
      </QueryState>
      <ConfirmDialog
        open={!!toDelete}
        danger
        title={t('workspace.folders.delete')}
        body={t('workspace.folders.deleteBody', { name: toDelete?.name ?? '' })}
        confirmLabel={t('common.delete')}
        loading={remove.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() =>
          toDelete && remove.mutate(toDelete.id, { onSuccess: () => setToDelete(null), onError })
        }
      />
    </div>
  );
}

// ---------- bookmarks ----------
export function BookmarksPanel({
  lessonId,
  player,
}: {
  lessonId: string;
  player: RefObject<PlayerHandle | null>;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const [label, setLabel] = useState('');
  const list = useQuery({
    queryKey: wsKeys.bookmarks(lessonId),
    queryFn: () => api<BookmarkDto[]>(`/api/me/bookmarks?lessonId=${lessonId}`),
  });
  const add = useApiMutation(
    (ts: number) =>
      api('/api/me/bookmarks', {
        method: 'POST',
        body: { lessonId, timestampSeconds: ts, label: label.trim() || null },
      }),
    [wsKeys.bookmarks(lessonId), wsKeys.bookmarks()],
    (_r, ts) => {
      setLabel('');
      toast.success(t('workspace.bookmarks.added', { time: formatTimestamp(ts) }));
    },
  );
  const remove = useApiMutation(
    (id: string) => api(`/api/me/bookmarks/${id}`, { method: 'DELETE' }),
    [wsKeys.bookmarks(lessonId), wsKeys.bookmarks()],
  );
  return (
    <div className="stack">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          add.mutate(Math.floor(player.current?.getCurrentTime() ?? 0));
        }}
      >
        <Field label={t('workspace.bookmarks.label')}>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} maxLength={200} />
        </Field>
        <Button type="submit" loading={add.isPending}>
          {t('workspace.bookmarks.add')}
        </Button>
      </form>
      <WsError error={add.error} />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <p className="muted">{t('workspace.bookmarks.none')}</p>
          ) : (
            <ul className="ws-list">
              {items.map((b) => (
                <li key={b.id} className="row row--between">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => player.current?.seekTo(b.timestampSeconds)}
                    aria-label={t('notes.seekTo', { time: formatTimestamp(b.timestampSeconds) })}
                  >
                    {formatTimestamp(b.timestampSeconds)}
                  </Button>
                  <span style={{ flex: 1 }}>{b.label || '—'}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => remove.mutate(b.id)}
                    aria-label={t('workspace.bookmarks.removeNamed', {
                      time: formatTimestamp(b.timestampSeconds),
                    })}
                  >
                    {t('common.delete')}
                  </Button>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <Link className="small" to="/me/bookmarks">
        {t('workspace.bookmarks.all')}
      </Link>
    </div>
  );
}

export function BookmarksPage() {
  const { t, fmtDate } = useI18n();
  usePageMeta(t('workspace.bookmarks.title'), undefined, { noindex: true });
  const list = useQuery({
    queryKey: wsKeys.bookmarks(),
    queryFn: () => api<BookmarkDto[]>('/api/me/bookmarks'),
  });
  const slugs = useContinueLearning(50);
  const slugOf = (courseId: string) => slugs.data?.find((c) => c.courseId === courseId)?.slug;
  return (
    <div className="container page">
      <PageHeader title={t('workspace.bookmarks.title')} />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('workspace.bookmarks.none')} />
          ) : (
            <ul className="ws-list">
              {items.map((b) => {
                const slug = slugOf(b.courseId);
                return (
                  <li key={b.id} className="card card--flat">
                    <div className="row row--between">
                      <span>
                        <strong>{b.courseTitle}</strong> › {b.lessonTitle} ·{' '}
                        {formatTimestamp(b.timestampSeconds)}
                      </span>
                      <span className="small muted">{fmtDate(b.createdAt)}</span>
                    </div>
                    {b.label ? <p style={{ margin: 0 }}>{b.label}</p> : null}
                    {b.lessonAvailable && slug ? (
                      <Link to={`/learn/${slug}/${b.lessonId}?t=${b.timestampSeconds}`}>
                        {t('workspace.bookmarks.open')}
                      </Link>
                    ) : !b.lessonAvailable ? (
                      <span className="small muted">{t('workspace.bookmarks.unavailable')}</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}
