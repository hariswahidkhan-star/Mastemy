import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';
import { keys, useApiMutation, useLearnCourse, useLesson } from '../../api/hooks';
import type {
  AssessmentSummary,
  AttemptView,
  LearnCourseDto,
  LearnerNoteDto,
  LessonViewDto,
} from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Duration } from '../../components/Duration';
import { Markdown } from '../../components/Markdown';
import { YouTubePlayer } from '../../components/YouTubePlayer';
import type { PlayerHandle } from '../../components/YouTubePlayer';
import { Button, ButtonLink } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Textarea } from '../../components/ui/Field';
import { Badge, Notice, QueryState } from '../../components/ui/misc';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { formatTimestamp } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { DiscussionsPanel, EnrollToPost, useIsCourseAuthor } from '../engagement/Discussions';
import {
  AnnouncementsList,
  LessonResources,
  ReportIssueButton,
  TranscriptPanel,
} from '../engagement/LessonExtras';
import { useTrackEvent } from '../../lib/analytics';
import { AiPracticePanel, TutorPanel } from '../workspace/AiPanels';
import { BookmarksPanel } from '../workspace/Study';
import { HeldLessonNotice, ReportContentButton } from '../workspace/Trust';

const PROGRESS_INTERVAL_MS = 15_000;

function useProgressSaver(
  lessonId: string,
  enabled: boolean,
  player: RefObject<PlayerHandle | null>,
) {
  const lastSent = useRef<number>(-1);
  const save = useCallback(
    (positionSeconds: number, completed = false) => {
      if (!enabled) return;
      const pos = Math.floor(positionSeconds);
      if (!completed && Math.abs(pos - lastSent.current) < 2) return;
      lastSent.current = pos;
      // Best-effort telemetry; failures are ignored and never block playback.
      api(`/api/learn/lessons/${lessonId}/progress`, {
        method: 'PUT',
        body: { positionSeconds: pos, completed },
        keepalive: true,
      }).catch(() => undefined);
    },
    [lessonId, enabled],
  );
  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      const time = player.current?.getCurrentTime() ?? 0;
      if (time > 0) save(time);
    }, PROGRESS_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [enabled, save, player]);
  return save;
}

function MyNotes({
  lessonId,
  player,
}: {
  lessonId: string;
  player: RefObject<PlayerHandle | null>;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const notesKey = keys.notes({ lessonId });
  const notes = useQuery({
    queryKey: notesKey,
    queryFn: () =>
      api<LearnerNoteDto[] | { items: LearnerNoteDto[] }>(`/api/me/notes?lessonId=${lessonId}`),
    select: (d) => (Array.isArray(d) ? d : d.items),
  });
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [stamp, setStamp] = useState<number | null>(null);
  const [editing, setEditing] = useState<LearnerNoteDto | null>(null);
  const [toDelete, setToDelete] = useState<LearnerNoteDto | null>(null);

  const create = useApiMutation(
    () =>
      api('/api/me/notes', {
        method: 'POST',
        body: { lessonId, timestampSeconds: stamp, body, tags },
      }),
    [notesKey],
    () => {
      setBody('');
      setTags('');
      setStamp(null);
      toast.success(t('notes.saved'));
    },
  );
  const update = useApiMutation(
    (n: LearnerNoteDto) =>
      api(`/api/me/notes/${n.id}`, {
        method: 'PUT',
        body: { lessonId, timestampSeconds: n.timestampSeconds, body: n.body, tags: n.tags },
      }),
    [notesKey],
    () => {
      setEditing(null);
      toast.success(t('notes.saved'));
    },
  );
  const remove = useApiMutation(
    (id: string) => api(`/api/me/notes/${id}`, { method: 'DELETE' }),
    [notesKey],
    () => setToDelete(null),
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (body.trim()) create.mutate(undefined);
        }}
      >
        <div className="row">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setStamp(Math.floor(player.current?.getCurrentTime() ?? 0))}
          >
            {t('notes.addAtTime')}
          </Button>
          {stamp !== null ? (
            <span className="small">
              {t('notes.at')} <span className="mono">{formatTimestamp(stamp)}</span>{' '}
              <button
                type="button"
                className="ts-button"
                onClick={() => setStamp(null)}
                aria-label={t('notes.clearTime')}
              >
                ✕
              </button>
            </span>
          ) : null}
        </div>
        <Field label={t('notes.body')}>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            maxLength={8000}
          />
        </Field>
        <Field label={t('notes.tags')} hint={t('notes.tagsHint')}>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} maxLength={200} />
        </Field>
        {create.isError ? <Notice tone="danger">{errorMessage(create.error, t)}</Notice> : null}
        <Button type="submit" size="sm" loading={create.isPending} disabled={!body.trim()}>
          {t('notes.save')}
        </Button>
      </form>
      <div style={{ marginBlockStart: 'var(--space-4)' }}>
        <QueryState query={notes}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('notes.empty')}</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[...list]
                  .sort((a, b) => (a.timestampSeconds ?? 1e9) - (b.timestampSeconds ?? 1e9))
                  .map((n) => (
                    <li key={n.id} className="note-item">
                      {n.timestampSeconds !== null ? (
                        <button
                          type="button"
                          className="ts-button"
                          onClick={() => player.current?.seekTo(n.timestampSeconds ?? 0)}
                          aria-label={t('notes.seekTo', {
                            time: formatTimestamp(n.timestampSeconds),
                          })}
                        >
                          {formatTimestamp(n.timestampSeconds)}
                        </button>
                      ) : null}
                      {editing?.id === n.id ? (
                        <div className="note-item__body">
                          <Textarea
                            aria-label={t('notes.body')}
                            value={editing.body}
                            onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                          />
                          <div className="row" style={{ marginBlockStart: 'var(--space-2)' }}>
                            <Button
                              size="sm"
                              loading={update.isPending}
                              onClick={() => update.mutate(editing)}
                            >
                              {t('common.save')}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
                              {t('common.cancel')}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="note-item__body">
                          {n.body}
                          {n.tags ? (
                            <div className="small muted">
                              #
                              {n.tags
                                .split(',')
                                .map((x) => x.trim())
                                .join(' #')}
                            </div>
                          ) : null}
                        </div>
                      )}
                      {editing?.id !== n.id ? (
                        <div className="row">
                          <Button size="sm" variant="ghost" onClick={() => setEditing(n)}>
                            {t('common.edit')}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setToDelete(n)}>
                            {t('common.delete')}
                          </Button>
                        </div>
                      ) : null}
                    </li>
                  ))}
              </ul>
            )
          }
        </QueryState>
      </div>
      <ConfirmDialog
        open={!!toDelete}
        danger
        title={t('notes.deleteTitle')}
        body={t('notes.deleteBody')}
        confirmLabel={t('common.delete')}
        loading={remove.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() => toDelete && remove.mutate(toDelete.id)}
      />
    </div>
  );
}

export function PracticeList({ assessments }: { assessments: AssessmentSummary[] }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [starting, setStarting] = useState<string | null>(null);
  if (assessments.length === 0) return <p className="muted">{t('practice.none')}</p>;
  const start = async (a: AssessmentSummary) => {
    setStarting(a.id);
    try {
      const attempt = await api<AttemptView>(`/api/assessments/${a.id}/attempts`, {
        method: 'POST',
      });
      navigate(`/attempts/${attempt.id}`);
    } catch (e) {
      toast.error(errorMessage(e, t));
    } finally {
      setStarting(null);
    }
  };
  return (
    <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
      {assessments.map((a) => (
        <li key={a.id} className="card card--flat">
          <div className="row row--between">
            <h3 style={{ margin: 0 }}>{a.title}</h3>
            <div className="row">
              <Badge tone={a.mode === 'Practice' ? 'info' : 'warning'}>
                {t(`assessment.mode.${a.mode}`)}
              </Badge>
              {a.isPremium ? <Badge tone="accent">{t('assessment.premium')}</Badge> : null}
            </div>
          </div>
          <p className="small muted" style={{ marginBlock: 'var(--space-2)' }}>
            {t('assessment.summary', {
              n: a.questionCount,
              pass: a.passPercent,
            })}{' '}
            {a.timeLimitMinutes
              ? t('assessment.timeLimit', { m: a.timeLimitMinutes })
              : t('assessment.untimed')}{' '}
            {a.maxAttempts ? t('assessment.maxAttempts', { n: a.maxAttempts }) : null}
          </p>
          <p className="small">{t(`assessment.scoring.${a.multiSelectScoring}`)}</p>
          {user ? (
            <Button size="sm" loading={starting === a.id} onClick={() => void start(a)}>
              {t('assessment.start')}
            </Button>
          ) : (
            <ButtonLink
              size="sm"
              to={`/login?next=${encodeURIComponent(window.location.pathname)}`}
            >
              {t('assessment.loginToStart')}
            </ButtonLink>
          )}
        </li>
      ))}
    </ul>
  );
}

function LessonWorkspace({ course, view }: { course: LearnCourseDto; view: LessonViewDto }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const player = useRef<PlayerHandle>(null);
  const [tab, setTab] = useState('overview');
  const lessonId = view.lesson.id;
  const isAuthor = useIsCourseAuthor(course.id);
  const save = useProgressSaver(lessonId, !!user, player);
  useTrackEvent('lesson_view', course.id, lessonId);
  const flat = course.modules.flatMap((m) => m.lessons);
  const idx = flat.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? flat[idx - 1] : undefined;
  const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : undefined;
  const [params] = useSearchParams();
  const fromLink = Number(params.get('t'));
  const resume =
    Number.isFinite(fromLink) && fromLink > 0
      ? fromLink
      : (view.lesson.positionSeconds ?? flat[idx]?.positionSeconds ?? 0);

  useEffect(() => {
    const p = player.current;
    return () => {
      // Save position when leaving the lesson.
      const time = p?.getCurrentTime() ?? 0;
      if (time > 0) save(time);
    };
  }, [save]);

  return (
    <div>
      {view.youtubeVideoId ? (
        <YouTubePlayer
          key={view.youtubeVideoId}
          ref={player}
          videoId={view.youtubeVideoId}
          title={view.lesson.title}
          startSeconds={resume}
          onPause={(s) => save(s)}
          onEnded={(s) => save(s, true)}
        />
      ) : (
        <div className="player-error">
          <strong>{t('player.noVideo')}</strong>
        </div>
      )}
      <div className="row row--between" style={{ marginBlock: 'var(--space-4)' }}>
        <h1 className="page-title" style={{ fontSize: 'var(--text-xl)' }}>
          {view.lesson.title}
        </h1>
        <div className="row">
          <ReportIssueButton courseId={course.id} lessonId={lessonId} />
          <ReportContentButton targetType="Lesson" targetId={lessonId} />
          {prev ? (
            <ButtonLink variant="secondary" size="sm" to={`/learn/${course.slug}/${prev.id}`}>
              {t('learn.previous')}
            </ButtonLink>
          ) : null}
          {next ? (
            <ButtonLink size="sm" to={`/learn/${course.slug}/${next.id}`}>
              {t('learn.next')}
            </ButtonLink>
          ) : null}
        </div>
      </div>
      {resume > 0 ? (
        <p className="small muted">{t('learn.resumed', { time: formatTimestamp(resume) })}</p>
      ) : null}
      <Tabs
        label={t('learn.tabsLabel')}
        value={tab}
        onChange={setTab}
        tabs={[
          {
            id: 'overview',
            label: t('learn.overview'),
            content: (
              <div className="prose">
                <h2>{t('learn.objective')}</h2>
                <p>{view.lesson.objective || t('course.notSpecified')}</p>
                <p className="small muted">
                  {t('course.duration')}: <Duration seconds={view.lesson.durationSeconds} />
                </p>
                <p className="small muted">{t('learn.telemetryNote')}</p>
              </div>
            ),
          },
          {
            id: 'notes',
            label: t('learn.studyNotes'),
            content: view.notesMarkdown?.trim() ? (
              <Markdown source={view.notesMarkdown} />
            ) : (
              <p className="muted">{t('learn.noNotes')}</p>
            ),
          },
          {
            id: 'premium',
            label: t('learn.premiumNotes'),
            content:
              view.premiumLocked || view.premiumNotesMarkdown === null ? (
                <div className="locked">
                  <h2>{t('learn.premiumLockedTitle')}</h2>
                  <p>{t('learn.premiumLockedBody')}</p>
                  <ButtonLink to={`/courses/${course.slug}`}>{t('learn.seePackages')}</ButtonLink>
                </div>
              ) : view.premiumNotesMarkdown.trim() ? (
                <Markdown source={view.premiumNotesMarkdown} />
              ) : (
                <p className="muted">{t('learn.noPremiumNotes')}</p>
              ),
          },
          {
            id: 'mine',
            label: t('learn.myNotes'),
            content: user ? (
              <MyNotes lessonId={lessonId} player={player} />
            ) : (
              <div className="locked">
                <p>{t('learn.loginForNotes')}</p>
                <ButtonLink
                  to={`/login?next=${encodeURIComponent(`/learn/${course.slug}/${lessonId}`)}`}
                >
                  {t('nav.login')}
                </ButtonLink>
              </div>
            ),
          },
          {
            id: 'practice',
            label: t('learn.practice'),
            content: <PracticeList assessments={view.assessments} />,
          },
          {
            id: 'bookmarks',
            label: t('workspace.bookmarks.tab'),
            content: user ? (
              <BookmarksPanel lessonId={lessonId} player={player} />
            ) : (
              <p className="muted">{t('workspace.bookmarks.login')}</p>
            ),
          },
          {
            id: 'tutor',
            label: t('workspace.tutor.tab'),
            content: user ? (
              <TutorPanel
                courseId={course.id}
                courseSlug={course.slug}
                lessonId={lessonId}
                player={player}
              />
            ) : (
              <p className="muted">{t('workspace.tutor.login')}</p>
            ),
          },
          {
            id: 'aiPractice',
            label: t('workspace.practice.tab'),
            content: user ? (
              <AiPracticePanel courseId={course.id} lessonId={lessonId} />
            ) : (
              <p className="muted">{t('workspace.tutor.login')}</p>
            ),
          },
          {
            id: 'resources',
            label: t('resources.tab'),
            content: <LessonResources lessonId={lessonId} courseSlug={course.slug} />,
          },
          {
            id: 'transcript',
            label: t('transcript.title'),
            content: <TranscriptPanel lessonId={lessonId} player={player} />,
          },
          {
            id: 'qa',
            label: t('qa.tab'),
            content: (
              <DiscussionsPanel
                courseId={course.id}
                lessonId={lessonId}
                basePath={`/courses/${course.slug}`}
                canPost={!!user && (!!course.enrolled || isAuthor)}
                notAllowedReason={<EnrollToPost courseId={course.id} slug={course.slug} />}
              />
            ),
          },
          {
            id: 'announcements',
            label: t('announcements.title'),
            content: user ? (
              <AnnouncementsList courseId={course.id} />
            ) : (
              <p className="muted">{t('announcements.enrollToSee')}</p>
            ),
          },
        ]}
      />
    </div>
  );
}

export function LearnPage() {
  const { slug = '', lessonId } = useParams();
  const { t, fmtNumber } = useI18n();
  const course = useLearnCourse(slug);
  const lesson = useLesson(lessonId);
  usePageMeta(lesson.data?.lesson.title ?? course.data?.title ?? t('learn.title'));

  if (course.data && !lessonId) {
    const first = course.data.lastLessonId ?? course.data.modules.flatMap((m) => m.lessons)[0]?.id;
    if (first) return <Navigate to={`/learn/${slug}/${first}`} replace />;
  }

  return (
    <div className="container">
      <QueryState query={course}>
        {(c) => {
          const total = c.modules.reduce((n, m) => n + m.lessons.length, 0);
          const done = c.modules.reduce(
            (n, m) => n + m.lessons.filter((l) => l.completed).length,
            0,
          );
          if (total === 0)
            return (
              <div className="page">
                <EmptyState
                  title={t('learn.noLessons')}
                  action={{ label: t('courses.title'), to: '/courses' }}
                />
              </div>
            );
          return (
            <div className="workspace">
              <aside className="workspace__sidebar" aria-label={t('learn.curriculum')}>
                <h2>
                  <Link to={`/courses/${c.slug}`}>{c.title}</Link>
                </h2>
                <p className="small muted" style={{ paddingInline: 'var(--space-2)' }}>
                  {t('learn.completedOf', { done: fmtNumber(done), total: fmtNumber(total) })}
                </p>
                <nav aria-label={t('learn.curriculum')}>
                  {c.modules.map((m) => (
                    <div key={m.id}>
                      <div className="lesson-nav__module">{m.title}</div>
                      <ol className="lesson-nav">
                        {m.lessons.map((l) => (
                          <li key={l.id}>
                            <Link
                              to={`/learn/${c.slug}/${l.id}`}
                              aria-current={l.id === lessonId ? 'page' : undefined}
                            >
                              <span>
                                {l.completed ? (
                                  <span
                                    aria-label={t('learn.completed')}
                                    title={t('learn.completed')}
                                  >
                                    ✓{' '}
                                  </span>
                                ) : null}
                                {l.title}
                              </span>
                              <span className="muted small">
                                {l.durationSeconds ? formatTimestamp(l.durationSeconds) : ''}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </nav>
              </aside>
              <section aria-label={t('learn.lesson')}>
                {lessonId && lesson.error instanceof ApiError && lesson.error.status === 451 ? (
                  <HeldLessonNotice />
                ) : lessonId ? (
                  <QueryState query={lesson}>
                    {(v) => <LessonWorkspace course={c} view={v} />}
                  </QueryState>
                ) : null}
              </section>
            </div>
          );
        }}
      </QueryState>
    </div>
  );
}
