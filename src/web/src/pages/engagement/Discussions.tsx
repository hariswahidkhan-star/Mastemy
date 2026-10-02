import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError, qs } from '../../api/client';
import { keys, useApiMutation } from '../../api/hooks';
import { w2keys } from '../../api/wave2';
import type { EngagementPage, ReplyDto, ThreadDetailDto, ThreadSummaryDto } from '../../api/wave2';
import { AUTHOR_ROLES, useAuth } from '../../auth/AuthProvider';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, Pagination, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { HiddenContentNotice, ReportContentButton } from '../workspace/Trust';

const EDIT_WINDOW_MS = 24 * 60 * 60 * 1000;
export const MODERATOR_ROLES = ['Moderator', 'Admin', 'SuperAdmin'] as const;

export function withinEditWindow(createdAt: string, now = Date.now()): boolean {
  const t = new Date(createdAt).getTime();
  return Number.isFinite(t) && now - t <= EDIT_WINDOW_MS;
}

/** True when the signed-in user is listed as an instructor of the course (as the API's IsCourseAuthor). */
export function useIsCourseAuthor(courseId: string | undefined): boolean {
  const { hasRole } = useAuth();
  const authorRole = hasRole(...AUTHOR_ROLES);
  const courses = useQuery({
    queryKey: keys.studioCourses,
    queryFn: () =>
      api<StudioCourseSummary[] | { items: StudioCourseSummary[] }>('/api/studio/courses'),
    select: (d) => (Array.isArray(d) ? d : d.items),
    enabled: authorRole && !!courseId,
  });
  if (!authorRole || !courseId) return false;
  return !!courses.data?.some((c) => c.id === courseId && c.myRole != null);
}

interface StudioCourseSummary {
  id: string;
  myRole?: string | null;
}

export type ResolvedFilter = 'all' | 'unresolved' | 'resolved';

export function DiscussionsPanel({
  courseId,
  lessonId,
  canPost,
  notAllowedReason,
  basePath,
  initialResolved = 'all',
  hideForm,
}: {
  initialResolved?: ResolvedFilter;
  /** Inbox use: list only. */
  hideForm?: boolean;
  courseId: string;
  lessonId?: string;
  /** Enrolled learner or course author. */
  canPost: boolean;
  /** Shown instead of the form when posting is not allowed (e.g. "enroll first"). */
  notAllowedReason?: ReactNode;
  /** Prefix for thread links, e.g. /courses/<slug>. */
  basePath: string;
}) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const [resolved, setResolved] = useState<ResolvedFilter>(initialResolved);
  const [lessonOnly, setLessonOnly] = useState(!!lessonId);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const params = {
    lessonId: lessonOnly ? lessonId : undefined,
    q: search || undefined,
    resolved: resolved === 'all' ? undefined : resolved === 'resolved',
    page,
    pageSize: 10,
  };
  const threads = useQuery({
    queryKey: w2keys.discussions(courseId, params),
    queryFn: () =>
      api<EngagementPage<ThreadSummaryDto>>(`/api/courses/${courseId}/discussions${qs(params)}`),
    placeholderData: (prev) => prev,
  });
  const create = useApiMutation(
    () =>
      api<ThreadDetailDto>(`/api/courses/${courseId}/discussions`, {
        method: 'POST',
        body: { lessonId: lessonId ?? null, title: title.trim(), body: body.trim() },
      }),
    [w2keys.discussionsAll(courseId)],
    () => {
      setTitle('');
      setBody('');
      toast.success(t('qa.posted'));
    },
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) return setFormError(t('qa.titleTooShort'));
    if (!body.trim()) return setFormError(t('qa.bodyRequired'));
    setFormError(null);
    create.mutate(undefined);
  };

  return (
    <div className="stack">
      <form
        role="search"
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setSearch(q.trim());
        }}
      >
        <Field label={t('qa.search')} className="grow">
          <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} maxLength={100} />
        </Field>
        <Field label={t('qa.filter')}>
          <Select
            value={resolved}
            onChange={(e) => {
              setPage(1);
              setResolved(e.target.value as ResolvedFilter);
            }}
            options={[
              { value: 'all', label: t('qa.filterAll') },
              { value: 'unresolved', label: t('qa.filterUnresolved') },
              { value: 'resolved', label: t('qa.filterResolved') },
            ]}
          />
        </Field>
        <Button type="submit" variant="secondary">
          {t('courses.searchButton')}
        </Button>
      </form>
      {lessonId ? (
        <Checkbox
          label={t('qa.thisLessonOnly')}
          checked={lessonOnly}
          onChange={(e) => {
            setPage(1);
            setLessonOnly(e.target.checked);
          }}
        />
      ) : null}
      <QueryState query={threads}>
        {(data) =>
          data.items.length === 0 ? (
            <p className="muted">{search ? t('qa.noMatches') : t('qa.none')}</p>
          ) : (
            <>
              <ul className="thread-list">
                {data.items.map((th) => (
                  <li key={th.id} className="card card--flat">
                    <div className="row row--between">
                      <Link to={`${basePath}/discussions/${th.id}`}>
                        <strong>{th.title}</strong>
                      </Link>
                      <div className="row">
                        {th.resolved ? (
                          <Badge tone="success">{t('qa.resolved')}</Badge>
                        ) : (
                          <Badge>{t('qa.open')}</Badge>
                        )}
                        {th.hidden ? <Badge tone="danger">{t('qa.hidden')}</Badge> : null}
                      </div>
                    </div>
                    <p className="small muted" style={{ margin: 0 }}>
                      {t('qa.byline', { name: th.authorName, date: fmtDate(th.createdAt) })} ·{' '}
                      {t('qa.replies', { n: th.replyCount })}
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
      {hideForm ? null : (
        <section className="card card--flat" aria-labelledby="qa-new">
          <h3 id="qa-new">{t('qa.ask')}</h3>
          {canPost ? (
            <form onSubmit={submit} noValidate>
              <Field label={t('qa.threadTitle')} required>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
              </Field>
              <Field label={t('qa.threadBody')} hint={t('qa.plainText')} required>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} />
              </Field>
              {formError ? <Notice tone="danger">{formError}</Notice> : null}
              {create.isError ? (
                <Notice tone="danger">{errorMessage(create.error, t)}</Notice>
              ) : null}
              <Button type="submit" loading={create.isPending}>
                {t('qa.post')}
              </Button>
            </form>
          ) : (
            notAllowedReason
          )}
        </section>
      )}
    </div>
  );
}

function HideDialog({
  open,
  hidden,
  onClose,
  onSubmit,
  pending,
  error,
}: {
  open: boolean;
  hidden: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  pending: boolean;
  error: unknown;
}) {
  const { t } = useI18n();
  const [reason, setReason] = useState('');
  const [missing, setMissing] = useState(false);
  return (
    <Dialog
      open={open}
      alert
      title={hidden ? t('qa.unhideTitle') : t('qa.hideTitle')}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            variant={hidden ? 'primary' : 'danger'}
            loading={pending}
            onClick={() => {
              if (!hidden && !reason.trim()) {
                setMissing(true);
                return;
              }
              onSubmit(reason.trim());
            }}
          >
            {hidden ? t('qa.unhide') : t('qa.hide')}
          </Button>
        </>
      }
    >
      <p className="small">{hidden ? t('qa.unhideBody') : t('qa.hideBody')}</p>
      <Field
        label={t('qa.hideReason')}
        required={!hidden}
        error={missing ? t('qa.hideReasonRequired') : undefined}
      >
        <Textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} />
      </Field>
      {error ? <Notice tone="danger">{errorMessage(error, t)}</Notice> : null}
    </Dialog>
  );
}

function EditableText({
  initialTitle,
  initialBody,
  onSave,
  onCancel,
  pending,
  error,
}: {
  initialTitle?: string;
  initialBody: string;
  onSave: (v: { title?: string; body: string }) => void;
  onCancel: () => void;
  pending: boolean;
  error: unknown;
}) {
  const { t } = useI18n();
  const [title, setTitle] = useState(initialTitle ?? '');
  const [body, setBody] = useState(initialBody);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title: initialTitle !== undefined ? title.trim() : undefined, body: body.trim() });
      }}
    >
      {initialTitle !== undefined ? (
        <Field label={t('qa.threadTitle')}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
        </Field>
      ) : null}
      <Field label={t('qa.threadBody')}>
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} />
      </Field>
      {error ? <Notice tone="danger">{errorMessage(error, t)}</Notice> : null}
      <div className="row">
        <Button type="submit" size="sm" loading={pending}>
          {t('common.save')}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}

function ReplyItem({
  reply,
  moderator,
  invalidate,
}: {
  reply: ReplyDto;
  moderator: boolean;
  invalidate: () => Promise<unknown>;
}) {
  const { t, fmtDate } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [hiding, setHiding] = useState(false);
  const edit = useApiMutation(
    (body: string) =>
      api<ReplyDto>(`/api/discussion-replies/${reply.id}`, { method: 'PUT', body: { body } }),
    [],
    () => {
      setEditing(false);
      void invalidate();
      toast.success(t('common.saved'));
    },
  );
  const hide = useApiMutation(
    (reason: string) =>
      api(`/api/moderation/discussion-replies/${reply.id}/hide`, {
        method: 'POST',
        body: { hidden: !reply.hidden, reason },
      }),
    [],
    () => {
      setHiding(false);
      void invalidate();
      toast.success(reply.hidden ? t('qa.unhidden') : t('qa.hiddenDone'));
    },
  );
  const mine = user?.id === reply.authorId;
  return (
    <li className={reply.isInstructorReply ? 'reply reply--instructor' : 'reply'}>
      <div className="row row--between">
        <span className="small">
          <strong>{reply.authorName}</strong>{' '}
          {reply.isInstructorReply ? <Badge tone="accent">{t('qa.instructor')}</Badge> : null}{' '}
          {reply.hidden ? <Badge tone="danger">{t('qa.hidden')}</Badge> : null}
          <span className="muted"> · {fmtDate(reply.createdAt)}</span>
        </span>
        <div className="row">
          {mine && !reply.hidden && withinEditWindow(reply.createdAt) && !editing ? (
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
              {t('common.edit')}
            </Button>
          ) : null}
          {moderator ? (
            <Button size="sm" variant="ghost" onClick={() => setHiding(true)}>
              {reply.hidden ? t('qa.unhide') : t('qa.hide')}
            </Button>
          ) : null}
          {!mine ? <ReportContentButton targetType="DiscussionReply" targetId={reply.id} /> : null}
        </div>
      </div>
      {editing ? (
        <EditableText
          initialBody={reply.body}
          pending={edit.isPending}
          error={edit.error}
          onCancel={() => setEditing(false)}
          onSave={(v) => edit.mutate(v.body)}
        />
      ) : (
        <p className="pre-wrap">{reply.body}</p>
      )}
      <HideDialog
        open={hiding}
        hidden={reply.hidden}
        onClose={() => setHiding(false)}
        onSubmit={(reason) => hide.mutate(reason)}
        pending={hide.isPending}
        error={hide.error}
      />
    </li>
  );
}

export function ThreadView({ threadId }: { threadId: string }) {
  const { t, fmtDate } = useI18n();
  const { user, hasRole } = useAuth();
  const toast = useToast();
  const location = useLocation();
  const thread = useQuery({
    queryKey: w2keys.thread(threadId),
    queryFn: () => api<ThreadDetailDto>(`/api/discussions/${threadId}`),
  });
  const moderator = hasRole(...MODERATOR_ROLES);
  const courseId = thread.data?.thread.courseId;
  const isAuthor = useIsCourseAuthor(courseId);
  const [reply, setReply] = useState('');
  const [editing, setEditing] = useState(false);
  const [hiding, setHiding] = useState(false);
  const invalidate = () => thread.refetch();
  const allThreads = courseId ? [w2keys.discussionsAll(courseId)] : [];
  const post = useApiMutation(
    () =>
      api<ReplyDto>(`/api/discussions/${threadId}/replies`, {
        method: 'POST',
        body: { body: reply.trim() },
      }),
    [w2keys.thread(threadId), ...allThreads],
    () => {
      setReply('');
      toast.success(t('qa.replyPosted'));
    },
  );
  const edit = useApiMutation(
    (v: { title?: string; body: string }) =>
      api(`/api/discussions/${threadId}`, { method: 'PUT', body: v }),
    [w2keys.thread(threadId), ...allThreads],
    () => {
      setEditing(false);
      toast.success(t('common.saved'));
    },
  );
  const resolve = useApiMutation(
    (resolved: boolean) =>
      api(`/api/discussions/${threadId}/resolve`, { method: 'POST', body: { resolved } }),
    [w2keys.thread(threadId), ...allThreads],
    (_r, resolved) => toast.success(resolved ? t('qa.markedResolved') : t('qa.markedOpen')),
  );
  const hide = useApiMutation(
    (v: { hidden: boolean; reason: string }) =>
      api(`/api/moderation/discussions/${threadId}/hide`, { method: 'POST', body: v }),
    [w2keys.thread(threadId), ...allThreads],
    (_r, v) => {
      setHiding(false);
      toast.success(v.hidden ? t('qa.hiddenDone') : t('qa.unhidden'));
    },
  );

  if (thread.isError && thread.error instanceof ApiError && thread.error.status === 404)
    return <EmptyState title={t('qa.notFound')} />;

  return (
    <QueryState query={thread}>
      {({ thread: th, replies }) => {
        const mine = user?.id === th.authorId;
        return (
          <article className="stack">
            <header>
              <h1 className="page-title" style={{ fontSize: 'var(--text-xl)' }}>
                {th.title}
              </h1>
              <div className="row">
                {th.resolved ? (
                  <Badge tone="success">{t('qa.resolved')}</Badge>
                ) : (
                  <Badge>{t('qa.open')}</Badge>
                )}
                {th.hidden ? <Badge tone="danger">{t('qa.hidden')}</Badge> : null}
                <span className="small muted">
                  {t('qa.byline', { name: th.authorName, date: fmtDate(th.createdAt) })}
                </span>
              </div>
            </header>
            {editing ? (
              <EditableText
                initialTitle={th.title}
                initialBody={th.body}
                pending={edit.isPending}
                error={edit.error}
                onCancel={() => setEditing(false)}
                onSave={(v) => edit.mutate(v)}
              />
            ) : (
              <p className="pre-wrap">{th.body}</p>
            )}
            <div className="row">
              {mine && !th.hidden && withinEditWindow(th.createdAt) && !editing ? (
                <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>
                  {t('common.edit')}
                </Button>
              ) : null}
              {isAuthor ? (
                <Button
                  size="sm"
                  variant="secondary"
                  loading={resolve.isPending}
                  onClick={() => resolve.mutate(!th.resolved)}
                >
                  {th.resolved ? t('qa.reopen') : t('qa.markResolved')}
                </Button>
              ) : null}
              {moderator ? (
                <Button size="sm" variant="ghost" onClick={() => setHiding(true)}>
                  {th.hidden ? t('qa.unhide') : t('qa.hide')}
                </Button>
              ) : null}
              {!mine ? <ReportContentButton targetType="Discussion" targetId={th.id} /> : null}
            </div>
            {resolve.isError ? (
              <Notice tone="danger">{errorMessage(resolve.error, t)}</Notice>
            ) : null}
            <section aria-labelledby="replies-h">
              <h2 id="replies-h">{t('qa.replies', { n: replies.length })}</h2>
              {replies.length === 0 ? (
                <p className="muted">{t('qa.noReplies')}</p>
              ) : (
                <ul className="reply-list">
                  {replies.map((r) => (
                    <ReplyItem key={r.id} reply={r} moderator={moderator} invalidate={invalidate} />
                  ))}
                </ul>
              )}
            </section>
            {user ? (
              <form
                className="card card--flat"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (reply.trim()) post.mutate(undefined);
                }}
              >
                <Field label={t('qa.yourReply')} hint={t('qa.plainText')}>
                  <Textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    maxLength={5000}
                  />
                </Field>
                {post.isError ? <Notice tone="danger">{errorMessage(post.error, t)}</Notice> : null}
                <Button type="submit" loading={post.isPending} disabled={!reply.trim()}>
                  {t('qa.reply')}
                </Button>
              </form>
            ) : (
              <p>
                <Link to={`/login?next=${encodeURIComponent(location.pathname)}`}>
                  {t('qa.loginToReply')}
                </Link>
              </p>
            )}
            <HideDialog
              open={hiding}
              hidden={th.hidden}
              onClose={() => setHiding(false)}
              onSubmit={(reason) => hide.mutate({ hidden: !th.hidden, reason })}
              pending={hide.isPending}
              error={hide.error}
            />
          </article>
        );
      }}
    </QueryState>
  );
}

/** /courses/:slug/discussions/:threadId — the slug segment may also be a course id (notification links). */
export function ThreadPage() {
  const { slug = '', threadId = '' } = useParams();
  const { t } = useI18n();
  usePageMeta(t('qa.title'), undefined, { noindex: true });
  const isId = /^[0-9a-f-]{36}$/i.test(slug);
  return (
    <div className="container page">
      <nav aria-label={t('common.breadcrumb')} className="small muted">
        {isId ? (
          <Link to="/me">{t('nav.dashboard')}</Link>
        ) : (
          <Link to={`/courses/${slug}`}>{t('qa.backToCourse')}</Link>
        )}{' '}
        / {t('qa.title')}
      </nav>
      <ThreadView threadId={threadId} />
      <ThreadUnavailable threadId={threadId} />
    </div>
  );
}

/** A hidden thread reads as 404 for its author; offer the appeal route alongside the error. */
function ThreadUnavailable({ threadId }: { threadId: string }) {
  const thread = useQuery({
    queryKey: w2keys.thread(threadId),
    queryFn: () => api<ThreadDetailDto>(`/api/discussions/${threadId}`),
  });
  if (!(thread.error instanceof ApiError) || thread.error.status !== 404) return null;
  return <HiddenContentNotice targetType="Discussion" targetId={threadId} />;
}

/** Enrollment prompt for learners who may read but not yet post. */
export function EnrollToPost({ courseId, slug }: { courseId: string; slug: string }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  const location = useLocation();
  const enroll = useApiMutation(
    () => api(`/api/learn/courses/${courseId}/enroll`, { method: 'POST' }),
    [keys.dashboard, keys.learnCourse(slug)],
    () => toast.success(t('course.enrolled')),
  );
  if (!user)
    return (
      <div>
        <p className="small">{t('qa.loginToAsk')}</p>
        <ButtonLink size="sm" to={`/login?next=${encodeURIComponent(location.pathname)}`}>
          {t('nav.login')}
        </ButtonLink>
      </div>
    );
  return (
    <div>
      <p className="small">{t('qa.enrollToAsk')}</p>
      <Button size="sm" loading={enroll.isPending} onClick={() => enroll.mutate(undefined)}>
        {t('course.enrollFree')}
      </Button>
      {enroll.isError ? <Notice tone="danger">{errorMessage(enroll.error, t)}</Notice> : null}
    </div>
  );
}
