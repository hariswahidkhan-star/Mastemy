import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError, qs } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import type { StudioCourseDto } from '../../api/types';
import { formatBytes, uploadFile, useChannelInfo, w2keys } from '../../api/wave2';
import type {
  AnnouncementCreatedDto,
  CaptionPushResult,
  ChannelInfoDto,
  CourseDiffDto,
  EngagementPage,
  IssueDto,
  PlaylistSyncResult,
  PublishedPreviewDto,
  ResourceDto,
  ResourceUsageDto,
} from '../../api/wave2';
import { useAuth } from '../../auth/AuthProvider';
import { CourseDiffView } from '../../components/CourseDiffView';
import { Duration } from '../../components/Duration';
import { Markdown } from '../../components/Markdown';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, Pagination, QueryState, QueryStatus } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { newIdempotencyKey, splitLines } from '../../lib/format';
import { resourceUploadMessage } from '../../lib/resourceErrors';
import { DiscussionsPanel } from '../engagement/Discussions';

const EDITABLE = ['Draft', 'ChangesRequested', 'Updating'];

function lessonOptions(course: StudioCourseDto) {
  return course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ value: l.id, label: `${m.title} › ${l.title}` })),
  );
}

// ---------- Resources manager ----------

function UsageBar({ usage }: { usage: ResourceUsageDto }) {
  const { t, lang } = useI18n();
  const pct = usage.quotaBytes > 0 ? Math.min(100, (usage.usedBytes / usage.quotaBytes) * 100) : 0;
  return (
    <div>
      <div
        className={pct >= 90 ? 'meter meter--warn' : 'meter'}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-label={t('resources.quota')}
      >
        <span style={{ inlineSize: `${pct}%` }} />
      </div>
      <p className="small muted">
        {t('resources.usage', {
          used: formatBytes(usage.usedBytes, lang),
          quota: formatBytes(usage.quotaBytes, lang),
          max: formatBytes(usage.maxFileBytes, lang),
        })}
      </p>
    </div>
  );
}

function ProgressLine({ fraction }: { fraction: number | null }) {
  const { t } = useI18n();
  if (fraction === null) return null;
  const pct = Math.round(fraction * 100);
  return (
    <div
      className="meter"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={t('resources.uploading')}
    >
      <span style={{ inlineSize: `${pct}%` }} />
    </div>
  );
}

function ResourceRow({
  r,
  editable,
  lessonTitle,
  maxFileBytes,
  onChanged,
}: {
  r: ResourceDto;
  editable: boolean;
  lessonTitle: string;
  maxFileBytes?: number;
  onChanged: () => void;
}) {
  const { t, lang, fmtDate } = useI18n();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const premium = useApiMutation(
    (isPremium: boolean) =>
      api<ResourceDto>(`/api/studio/resources/${r.id}`, { method: 'PATCH', body: { isPremium } }),
    [],
    () => onChanged(),
  );
  const remove = useApiMutation(
    () => api(`/api/studio/resources/${r.id}`, { method: 'DELETE' }),
    [],
    () => {
      setConfirm(false);
      toast.success(t('resources.deleted'));
      onChanged();
    },
  );
  const replace = async (file: File) => {
    setProblem(null);
    setProgress(0);
    try {
      await uploadFile<ResourceDto>(`/api/studio/resources/${r.id}/file`, file, {
        method: 'PUT',
        onProgress: setProgress,
      });
      toast.success(t('resources.replaced'));
      onChanged();
    } catch (e) {
      setProblem(resourceUploadMessage(e, t, { maxFileBytes, lang }));
    } finally {
      setProgress(null);
      if (fileRef.current) fileRef.current.value = '';
    }
  };
  const caption = r.kind === 'Caption';
  return (
    <tr>
      <td>
        <strong>{r.fileName}</strong>
        <div className="small muted">
          {formatBytes(r.sizeBytes, lang)} · v{r.version} · {fmtDate(r.createdAt)}
        </div>
        <ProgressLine fraction={progress} />
        {problem ? (
          <p className="field__error" role="alert">
            {problem}
          </p>
        ) : null}
      </td>
      <td>
        {caption ? (
          <Badge tone="info">{t('resources.captionLang', { lang: r.language })}</Badge>
        ) : (
          <Badge>{t('resources.kindResource')}</Badge>
        )}
      </td>
      <td>{lessonTitle}</td>
      <td>
        {caption ? (
          <span className="small muted">{t('resources.captionsFree')}</span>
        ) : (
          <Checkbox
            label={t('resources.premium')}
            checked={r.isPremium}
            disabled={!editable || premium.isPending}
            onChange={(e) => premium.mutate(e.target.checked)}
          />
        )}
        {premium.isError ? (
          <p className="field__error" role="alert">
            {errorMessage(premium.error, t)}
          </p>
        ) : null}
      </td>
      <td>
        {editable ? (
          <div className="row">
            <input
              ref={fileRef}
              type="file"
              className="visually-hidden"
              aria-label={t('resources.replaceNamed', { name: r.fileName })}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void replace(f);
              }}
            />
            <Button
              size="sm"
              variant="secondary"
              loading={progress !== null}
              onClick={() => fileRef.current?.click()}
            >
              {t('resources.replace')}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirm(true)}>
              {t('common.delete')}
            </Button>
          </div>
        ) : null}
        <ConfirmDialog
          open={confirm}
          danger
          title={t('resources.deleteTitle')}
          body={
            <>
              <p>{t('resources.deleteBody', { name: r.fileName })}</p>
              {remove.isError ? (
                <Notice tone="danger">{errorMessage(remove.error, t)}</Notice>
              ) : null}
            </>
          }
          confirmLabel={t('common.delete')}
          loading={remove.isPending}
          onCancel={() => setConfirm(false)}
          onConfirm={() => remove.mutate(undefined)}
        />
      </td>
    </tr>
  );
}

export function ResourcesManager({ course }: { course: StudioCourseDto }) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const editable = EDITABLE.includes(course.status);
  const list = useQuery({
    queryKey: w2keys.studioResources(course.id),
    queryFn: () => api<ResourceDto[]>(`/api/studio/courses/${course.id}/resources`),
  });
  const usage = useQuery({
    queryKey: w2keys.resourceUsage(course.id),
    queryFn: () => api<ResourceUsageDto>(`/api/studio/courses/${course.id}/resources/usage`),
  });
  const lessons = lessonOptions(course);
  const [kind, setKind] = useState<'Resource' | 'Caption'>('Resource');
  const [lessonId, setLessonId] = useState('');
  const [language, setLanguage] = useState(course.language || 'en');
  const [isPremium, setIsPremium] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const refresh = () => {
    void list.refetch();
    void usage.refetch();
  };

  const upload = async () => {
    if (!file) return;
    if (kind === 'Caption' && !lessonId) {
      setProblem(t('resources.captionNeedsLesson'));
      return;
    }
    setProblem(null);
    setProgress(0);
    try {
      await uploadFile<ResourceDto>(
        `/api/studio/courses/${course.id}/resources${qs({
          lessonId: lessonId || undefined,
          kind,
          language: kind === 'Caption' ? language : undefined,
          isPremium: kind === 'Caption' ? false : isPremium,
        })}`,
        file,
        { onProgress: setProgress },
      );
      toast.success(t('resources.uploaded', { name: file.name }));
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      refresh();
    } catch (e) {
      setProblem(resourceUploadMessage(e, t, { maxFileBytes: usage.data?.maxFileBytes, lang }));
    } finally {
      setProgress(null);
    }
  };

  const lessonTitle = (id: string | null) =>
    id
      ? (lessons.find((l) => l.value === id)?.label ?? t('resources.unknownLesson'))
      : t('resources.wholeCourse');

  return (
    <div className="stack">
      <p className="small muted">{t('resources.intro')}</p>
      <QueryStatus query={usage} />
      {usage.data ? <UsageBar usage={usage.data} /> : null}
      {!editable ? <Notice tone="info">{t('resources.notEditable')}</Notice> : null}
      {editable ? (
        <form
          className="card card--flat"
          onSubmit={(e) => {
            e.preventDefault();
            void upload();
          }}
        >
          <h3>{t('resources.uploadTitle')}</h3>
          <div className="split">
            <div>
              <Field label={t('resources.kind')}>
                <Select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as 'Resource' | 'Caption')}
                  options={[
                    { value: 'Resource', label: t('resources.kindResource') },
                    { value: 'Caption', label: t('resources.kindCaption') },
                  ]}
                />
              </Field>
              <Field label={t('resources.lesson')} required={kind === 'Caption'}>
                <Select
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  placeholder={t('resources.wholeCourse')}
                  options={lessons}
                />
              </Field>
            </div>
            <div>
              <Field
                label={t('resources.file')}
                hint={kind === 'Caption' ? t('resources.captionHint') : t('resources.fileHint')}
              >
                <Input
                  ref={fileRef}
                  type="file"
                  accept={
                    kind === 'Caption'
                      ? '.vtt,.srt'
                      : '.pdf,.docx,.pptx,.xlsx,.csv,.txt,.md,.png,.jpg,.jpeg,.webp'
                  }
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </Field>
              {kind === 'Caption' ? (
                <Field label={t('resources.language')} hint={t('resources.languageHint')}>
                  <Input
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    maxLength={35}
                  />
                </Field>
              ) : (
                <Checkbox
                  label={t('resources.premiumUpload')}
                  hint={t('resources.premiumHint')}
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                />
              )}
            </div>
          </div>
          <ProgressLine fraction={progress} />
          {problem ? (
            <Notice tone="danger" title={t('resources.uploadFailed')}>
              {problem}
            </Notice>
          ) : null}
          <Button type="submit" disabled={!file} loading={progress !== null}>
            {t('resources.upload')}
          </Button>
        </form>
      ) : null}
      <Field label={t('resources.filter')}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={t('resources.filterAll')}
          options={[{ value: 'course', label: t('resources.wholeCourse') }, ...lessons]}
        />
      </Field>
      <QueryState query={list}>
        {(items) => {
          const shown = items.filter((r) =>
            !filter ? true : filter === 'course' ? !r.lessonId : r.lessonId === filter,
          );
          return shown.length === 0 ? (
            <EmptyState title={t('resources.noneStudio')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('resources.file')}</th>
                    <th scope="col">{t('resources.kind')}</th>
                    <th scope="col">{t('resources.lesson')}</th>
                    <th scope="col">{t('resources.access')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((r) => (
                    <ResourceRow
                      key={`${r.id}-${r.version}`}
                      r={r}
                      editable={editable}
                      lessonTitle={lessonTitle(r.lessonId)}
                      maxFileBytes={usage.data?.maxFileBytes}
                      onChanged={refresh}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          );
        }}
      </QueryState>
    </div>
  );
}

// ---------- Announcements composer ----------

export function AnnouncementsComposer({ course }: { course: StudioCourseDto }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [page, setPage] = useState(1);
  const live = course.status === 'Published' || course.status === 'Updating';
  // One key per draft: a retried or double-submitted post is recognised by the API as the same announcement.
  const [idemKey, setIdemKey] = useState(() => newIdempotencyKey());
  const list = useQuery({
    queryKey: [...w2keys.announcements(course.id), page],
    queryFn: () =>
      api<
        EngagementPage<{
          id: string;
          title: string;
          body: string;
          authorName: string;
          createdAt: string;
        }>
      >(`/api/courses/${course.id}/announcements${qs({ page, pageSize: 10 })}`),
  });
  const post = useApiMutation(
    () =>
      api<AnnouncementCreatedDto>(`/api/studio/courses/${course.id}/announcements`, {
        method: 'POST',
        body: { title: title.trim(), body: body.trim() },
        headers: { 'Idempotency-Key': idemKey },
      }),
    [w2keys.announcements(course.id)],
    (r) => {
      setTitle('');
      setBody('');
      setIdemKey(newIdempotencyKey());
      if (r.duplicate) toast.info(t('announcements.duplicate'));
      else toast.success(t('announcements.sent', { n: r.notifiedCount }));
    },
  );
  const postError = post.error;
  const message =
    postError instanceof ApiError && postError.is('announcement_rate_limited')
      ? t('announcements.rateLimited')
      : postError instanceof ApiError && postError.is('course_not_live')
        ? t('announcements.notLive')
        : postError
          ? errorMessage(postError, t)
          : null;
  return (
    <div className="stack">
      <form
        className="card card--flat"
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim().length >= 3 && body.trim()) post.mutate(undefined);
        }}
      >
        <h3>{t('announcements.compose')}</h3>
        <p className="small muted">{t('announcements.composeHint')}</p>
        {!live ? <Notice tone="info">{t('announcements.notLive')}</Notice> : null}
        <Field label={t('announcements.titleLabel')} required>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
        </Field>
        <Field label={t('announcements.bodyLabel')} hint={t('qa.plainText')} required>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} />
        </Field>
        {message ? <Notice tone="danger">{message}</Notice> : null}
        <Button
          type="submit"
          loading={post.isPending}
          disabled={!live || title.trim().length < 3 || !body.trim()}
        >
          {t('announcements.send')}
        </Button>
      </form>
      <h3>{t('announcements.sentList')}</h3>
      <QueryState query={list}>
        {(data) =>
          data.items.length === 0 ? (
            <p className="muted">{t('announcements.none')}</p>
          ) : (
            <>
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {data.items.map((a) => (
                  <li key={a.id} className="card card--flat">
                    <strong>{a.title}</strong>
                    <div className="small muted">
                      {a.authorName} · {fmtDate(a.createdAt)}
                    </div>
                    <p className="pre-wrap" style={{ margin: 0 }}>
                      {a.body}
                    </p>
                  </li>
                ))}
              </ul>
              <Pagination
                page={data.page}
                pageSize={data.pageSize}
                total={data.total}
                onPage={setPage}
              />
            </>
          )
        }
      </QueryState>
    </div>
  );
}

// ---------- Issues inbox ----------

export function IssuesInbox({ course }: { course: StudioCourseDto }) {
  const { t, fmtDate } = useI18n();
  const [page, setPage] = useState(1);
  const lessons = lessonOptions(course);
  const issues = useQuery({
    queryKey: [...w2keys.issues(course.id), page],
    queryFn: () =>
      api<EngagementPage<IssueDto>>(
        `/api/studio/courses/${course.id}/issues${qs({ page, pageSize: 20 })}`,
      ),
  });
  return (
    <QueryState query={issues}>
      {(data) =>
        data.items.length === 0 ? (
          <EmptyState title={t('issues.none')} description={t('issues.noneBody')} />
        ) : (
          <>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('dashboard.date')}</th>
                    <th scope="col">{t('issues.category')}</th>
                    <th scope="col">{t('resources.lesson')}</th>
                    <th scope="col">{t('issues.body')}</th>
                    <th scope="col">{t('issues.reporter')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((i) => (
                    <tr key={i.id}>
                      <td>{fmtDate(i.createdAt)}</td>
                      <td>
                        <Badge tone={i.category === 'VideoUnavailable' ? 'danger' : 'warning'}>
                          {t(`issues.cat.${i.category}`)}
                        </Badge>
                      </td>
                      <td>
                        {i.lessonId
                          ? (lessons.find((l) => l.value === i.lessonId)?.label ?? '—')
                          : t('resources.wholeCourse')}
                      </td>
                      <td className="pre-wrap">{i.body}</td>
                      <td>{i.reporterName || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={data.page}
              pageSize={data.pageSize}
              total={data.total}
              onPage={setPage}
            />
          </>
        )
      }
    </QueryState>
  );
}

// ---------- Q&A inbox ----------

export function QaInbox({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const live = course.status === 'Published' || course.status === 'Updating';
  if (!live) return <p className="muted">{t('qa.inboxNotLive')}</p>;
  return (
    <DiscussionsPanel
      courseId={course.id}
      basePath={`/courses/${course.slug}`}
      canPost={false}
      initialResolved="unresolved"
      hideForm
    />
  );
}

export function EngagementPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  return (
    <div className="stack">
      <section aria-labelledby="eng-ann">
        <h2 id="eng-ann">{t('announcements.title')}</h2>
        <AnnouncementsComposer course={course} />
      </section>
      <section aria-labelledby="eng-qa">
        <h2 id="eng-qa">{t('qa.inbox')}</h2>
        <QaInbox course={course} />
      </section>
      <section aria-labelledby="eng-issues">
        <h2 id="eng-issues">{t('issues.inbox')}</h2>
        <IssuesInbox course={course} />
      </section>
    </div>
  );
}

// ---------- Published preview and diff ----------

export function PublishedPreview({ courseId }: { courseId: string }) {
  const { t, fmtDate } = useI18n();
  const preview = useQuery({
    queryKey: w2keys.publishedPreview(courseId),
    queryFn: () => api<PublishedPreviewDto>(`/api/studio/courses/${courseId}/published-preview`),
    retry: false,
  });
  if (preview.isError && preview.error instanceof ApiError && preview.error.status === 404)
    return <p className="muted">{t('published.never')}</p>;
  return (
    <QueryState query={preview}>
      {(p) => (
        <div className="stack">
          <p className="small muted">
            {t('published.version', { v: p.version, date: fmtDate(p.publishedAt) })}
          </p>
          <div className="card card--flat">
            <h3 style={{ marginBlockStart: 0 }}>{p.payload.title}</h3>
            {p.payload.subtitle ? <p className="muted">{p.payload.subtitle}</p> : null}
            <p className="row">
              <Badge>{t(`level.${p.payload.level}`)}</Badge>
              <Badge>{t(`language.${p.payload.language}`)}</Badge>
            </p>
            <p className="pre-wrap">{p.payload.description}</p>
            <h4>{t('course.outcomes')}</h4>
            <ul>
              {splitLines(p.payload.outcomes).map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <h4>{t('course.curriculum')}</h4>
            {[...p.payload.modules]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((m) => (
                <details key={m.id}>
                  <summary>
                    {m.code} · {m.title}
                  </summary>
                  <ol>
                    {[...m.lessons]
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((l) => (
                        <li key={l.id}>
                          <strong>{l.title}</strong>{' '}
                          {l.isPreview ? <Badge tone="accent">{t('course.preview')}</Badge> : null}{' '}
                          <span className="small muted">
                            <Duration seconds={l.durationSeconds} />
                            {l.youtubeVideoId
                              ? ` · ${l.youtubeVideoId}`
                              : ` · ${t('published.noVideo')}`}
                          </span>
                          {l.notesMarkdown.trim() ? (
                            <details>
                              <summary className="small">{t('learn.studyNotes')}</summary>
                              <Markdown source={l.notesMarkdown} />
                            </details>
                          ) : null}
                        </li>
                      ))}
                  </ol>
                </details>
              ))}
          </div>
        </div>
      )}
    </QueryState>
  );
}

export function DiffPanel({ courseId }: { courseId: string }) {
  const diff = useQuery({
    queryKey: w2keys.diff(courseId),
    queryFn: () => api<CourseDiffDto>(`/api/review/courses/${courseId}/diff`),
    retry: false,
  });
  return <QueryState query={diff}>{(d) => <CourseDiffView diff={d} />}</QueryState>;
}

// ---------- YouTube publishing extras ----------

/** Channels the API lets this user publish to: authorized, and owned by them (or any, for staff). */
export function publishableChannels(
  channels: ChannelInfoDto[],
  userId: string | undefined,
  staff: boolean,
): ChannelInfoDto[] {
  return channels.filter(
    (c) =>
      c.isActive &&
      (staff || (c.mode === 'InstructorOwned' && !!userId && c.ownerUserId === userId)),
  );
}

function youtubeMessage(e: unknown, t: (k: string, v?: Record<string, string | number>) => string) {
  if (e instanceof ApiError) {
    for (const code of [
      'channel_not_authorized',
      'youtube_scope_missing',
      'course_channel_missing',
      'youtube_quota_exhausted',
      'youtube_upstream_error',
      'invalid_thumbnail',
      'not_a_caption',
      'invalid_caption_language',
      'caption_course_mismatch',
      'resource_missing',
      'resource_integrity',
    ])
      if (e.is(code))
        return {
          text: t(`youtube.err.${code}`),
          reconnect: code === 'channel_not_authorized' || code === 'youtube_scope_missing',
        };
  }
  return { text: errorMessage(e, t), reconnect: false };
}

function ReconnectHint({ mode }: { mode: ChannelInfoDto['mode'] }) {
  const { t } = useI18n();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <p className="small">{t('youtube.reconnectHint')}</p>
      <Button
        size="sm"
        variant="secondary"
        loading={busy}
        onClick={() => {
          setBusy(true);
          api<{ authorizationUrl: string }>(`/api/youtube/oauth/start${qs({ mode })}`)
            .then((r) => window.location.assign(r.authorizationUrl))
            .catch((e) => {
              toast.error(errorMessage(e, t));
              setBusy(false);
            });
        }}
      >
        {t('youtube.reconnect')}
      </Button>
    </div>
  );
}

function ResultNotice({ error, mode }: { error: unknown; mode: ChannelInfoDto['mode'] }) {
  const { t } = useI18n();
  if (!error) return null;
  const m = youtubeMessage(error, t);
  return (
    <Notice tone="danger">
      <p style={{ marginBlockStart: 0 }}>{m.text}</p>
      {m.reconnect ? <ReconnectHint mode={mode} /> : null}
    </Notice>
  );
}

export function YouTubePublishing({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const { user, hasRole } = useAuth();
  const toast = useToast();
  const staff = hasRole('Admin', 'SuperAdmin');
  const canUseChannels = hasRole('Instructor', 'Admin', 'SuperAdmin');
  const channels = useChannelInfo(canUseChannels);
  const resources = useQuery({
    queryKey: w2keys.studioResources(course.id),
    queryFn: () => api<ResourceDto[]>(`/api/studio/courses/${course.id}/resources`),
  });
  const [privacy, setPrivacy] = useState('unlisted');
  const [syncResult, setSyncResult] = useState<PlaylistSyncResult | null>(null);
  const sync = useApiMutation(
    () =>
      api<PlaylistSyncResult>(`/api/studio/courses/${course.id}/youtube/playlist/sync`, {
        method: 'POST',
        body: { privacyStatus: privacy },
      }),
    [],
    (r) => {
      setSyncResult(r);
      toast.success(t('youtube.synced'));
    },
  );
  const thumbErrors = useState<Record<string, unknown>>({});
  const [thumbError, setThumbError] = thumbErrors;
  const [thumbBusy, setThumbBusy] = useState<string | null>(null);
  const [captionChoice, setCaptionChoice] = useState<Record<string, string>>({});
  const [captionError, setCaptionError] = useState<Record<string, unknown>>({});
  const [captionBusy, setCaptionBusy] = useState<string | null>(null);

  if (!canUseChannels) return <p className="muted">{t('youtube.noPublishableChannel')}</p>;
  return (
    <QueryState query={channels}>
      {(list) => {
        const usable = publishableChannels(list, user?.id, staff);
        if (usable.length === 0)
          return <p className="muted">{t('youtube.noPublishableChannel')}</p>;
        const usableIds = new Set(usable.map((c) => c.id));
        const mode = usable[0].mode;
        const videos = course.modules.flatMap((m) =>
          m.lessons.flatMap((l) => (l.video?.channelId ? [{ lesson: l, video: l.video }] : [])),
        );
        const ours = videos.filter((v) => usableIds.has(v.video.channelId ?? ''));
        const captions = (resources.data ?? []).filter((r) => r.kind === 'Caption');
        return (
          <div className="stack">
            <p className="small muted">{t('youtube.publishingIntro')}</p>
            <QueryStatus query={resources} />
            <section className="card card--flat">
              <h3>{t('youtube.playlist')}</h3>
              <p className="small">{t('youtube.playlistHint')}</p>
              <div className="row">
                <Field label={t('youtube.privacy')}>
                  <Select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                    options={['unlisted', 'private', 'public'].map((p) => ({
                      value: p,
                      label: t(`youtube.privacyOpt.${p}`),
                    }))}
                  />
                </Field>
                <Button loading={sync.isPending} onClick={() => sync.mutate(undefined)}>
                  {t('youtube.syncPlaylist')}
                </Button>
              </div>
              {syncResult ? (
                <Notice tone="success">
                  {t('youtube.syncResult', {
                    n: syncResult.videoCount,
                    inserted: syncResult.inserted,
                    moved: syncResult.moved,
                    removed: syncResult.removed,
                    skipped: syncResult.skippedLessonIds.length,
                  })}
                </Notice>
              ) : null}
              <ResultNotice error={sync.error} mode={mode} />
            </section>
            <section className="card card--flat">
              <h3>{t('youtube.videos')}</h3>
              {ours.length === 0 ? (
                <p className="muted">{t('youtube.noOwnVideos')}</p>
              ) : (
                <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                  {ours.map(({ lesson, video }) => {
                    const lessonCaptions = captions.filter(
                      (c) => !c.lessonId || c.lessonId === lesson.id,
                    );
                    return (
                      <li key={lesson.id} className="stack">
                        <strong>{lesson.title}</strong>
                        <span className="small muted">{video.youTubeVideoId}</span>
                        <div className="row">
                          <label className="btn btn--secondary btn--sm">
                            {thumbBusy === video.id
                              ? t('common.loading')
                              : t('youtube.uploadThumbnail')}
                            <input
                              type="file"
                              accept="image/jpeg,image/png"
                              className="visually-hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                e.target.value = '';
                                if (!f) return;
                                setThumbBusy(video.id);
                                setThumbError((m) => ({ ...m, [video.id]: null }));
                                uploadFile(`/api/studio/videos/${video.id}/thumbnail`, f)
                                  .then(() => toast.success(t('youtube.thumbnailSet')))
                                  .catch((err) => setThumbError((m) => ({ ...m, [video.id]: err })))
                                  .finally(() => setThumbBusy(null));
                              }}
                            />
                          </label>
                        </div>
                        <ResultNotice error={thumbError[video.id]} mode={mode} />
                        {lessonCaptions.length > 0 ? (
                          <div className="row">
                            <Field label={t('youtube.captionFile')}>
                              <Select
                                value={captionChoice[video.id] ?? ''}
                                placeholder={t('youtube.chooseCaption')}
                                onChange={(e) =>
                                  setCaptionChoice((m) => ({ ...m, [video.id]: e.target.value }))
                                }
                                options={lessonCaptions.map((c) => ({
                                  value: c.id,
                                  label: `${c.fileName} (${c.language})`,
                                }))}
                              />
                            </Field>
                            <Button
                              size="sm"
                              disabled={!captionChoice[video.id]}
                              loading={captionBusy === video.id}
                              onClick={() => {
                                setCaptionBusy(video.id);
                                setCaptionError((m) => ({ ...m, [video.id]: null }));
                                api<CaptionPushResult>(`/api/studio/videos/${video.id}/captions`, {
                                  method: 'POST',
                                  body: { resourceFileId: captionChoice[video.id] },
                                })
                                  .then((r) =>
                                    toast.success(t('youtube.captionPushed', { lang: r.language })),
                                  )
                                  .catch((err) =>
                                    setCaptionError((m) => ({ ...m, [video.id]: err })),
                                  )
                                  .finally(() => setCaptionBusy(null));
                              }}
                            >
                              {t('youtube.pushCaption')}
                            </Button>
                          </div>
                        ) : (
                          <p className="small muted">{t('youtube.noCaptions')}</p>
                        )}
                        <ResultNotice error={captionError[video.id]} mode={mode} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        );
      }}
    </QueryState>
  );
}

export function PublicationPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  return (
    <div className="stack">
      <section aria-labelledby="pub-diff">
        <h2 id="pub-diff">{t('diff.title')}</h2>
        <DiffPanel courseId={course.id} />
      </section>
      <section aria-labelledby="pub-prev">
        <h2 id="pub-prev">{t('published.title')}</h2>
        <PublishedPreview courseId={course.id} />
        {course.status === 'Published' || course.status === 'Updating' ? (
          <p className="small">
            <Link to={`/courses/${course.slug}`}>{t('studio.viewPublic')}</Link>
          </p>
        ) : null}
      </section>
      <section aria-labelledby="pub-yt">
        <h2 id="pub-yt">{t('youtube.publishing')}</h2>
        <YouTubePublishing course={course} />
      </section>
    </div>
  );
}
