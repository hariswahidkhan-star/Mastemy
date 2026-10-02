import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, qs } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { asList } from '../../api/list';
import { toQuestionList } from '../../api/questions';
import type { RawQuestionDto } from '../../api/questions';
import type {
  CourseStatus,
  Paged,
  QuestionState,
  ReviewCommentDto,
  StudioCourseDto,
} from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState, StatusBadge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { formatTimestamp } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { DiffPanel } from '../studio/Wave2Panels';

type ReviewCourse = Pick<StudioCourseDto, 'id' | 'title' | 'slug' | 'status' | 'updatedAt'> & {
  ownerName?: string;
  instructors?: string[];
  isMyCourse?: boolean;
  modules?: StudioCourseDto['modules'];
};

function parseTimestamp(v: string): number | null {
  const s = v.trim();
  if (!s) return null;
  const parts = s.split(':').map(Number);
  if (parts.some((p) => !Number.isFinite(p) || p < 0)) return NaN;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

/** Reviewer transitions only: authors draft and retire questions in the studio. */
const REVIEW_NEXT: Partial<Record<QuestionState, QuestionState>> = {
  Draft: 'Reviewed',
  Reviewed: 'Approved',
  Approved: 'Active',
};

function QuestionReview({ courseId }: { courseId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const key = ['review', 'questions', courseId];
  const questions = useQuery({
    queryKey: key,
    queryFn: () =>
      api<RawQuestionDto[] | { items: RawQuestionDto[] }>(
        `/api/studio/courses/${courseId}/questions?pageSize=200`,
      ),
    select: toQuestionList,
  });
  const change = useApiMutation(
    ({ id, next }: { id: string; next: QuestionState }) =>
      api(`/api/studio/questions/${id}/state`, { method: 'POST', body: { state: next } }),
    [key],
    () => toast.success(t('question.stateChanged')),
  );
  return (
    <section>
      <h3>{t('review.questions')}</h3>
      <p className="small muted">{t('review.questionsHelp')}</p>
      <QueryState query={questions}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('question.none')}</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('question.externalId')}</th>
                    <th scope="col">{t('question.stem')}</th>
                    <th scope="col">{t('question.state')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((q) => {
                    const next = REVIEW_NEXT[q.state];
                    return (
                      <tr key={q.id}>
                        <td className="mono">{q.externalId}</td>
                        <td>
                          {q.stem}
                          <ul className="small" style={{ margin: 0 }}>
                            {q.options.map((o) => (
                              <li key={o.id ?? o.text}>
                                {o.isCorrect ? '✓ ' : ''}
                                {o.text}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <StatusBadge status={q.state} />
                        </td>
                        <td>
                          {next ? (
                            <Button
                              size="sm"
                              variant="secondary"
                              loading={change.isPending && change.variables?.id === q.id}
                              onClick={() =>
                                change.mutate(
                                  { id: q.id, next },
                                  { onError: (e) => toast.error(errorMessage(e, t)) },
                                )
                              }
                            >
                              {t(`question.to.${next}`)}
                            </Button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
    </section>
  );
}

function CourseReview({ course, onChanged }: { course: ReviewCourse; onChanged: () => void }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const { hasRole } = useAuth();
  const isAdmin = hasRole('Admin', 'SuperAdmin');
  const commentsKey = ['review', 'comments', course.id];
  const comments = useQuery({
    queryKey: commentsKey,
    queryFn: () => api<ReviewCommentDto[]>(`/api/review/courses/${course.id}/comments`),
  });
  const lessons = (course.modules ?? []).flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title })),
  );
  const [comment, setComment] = useState({ body: '', lessonId: '', ts: '' });
  const [decision, setDecision] = useState<{
    value: 'Approve' | 'RequestChanges';
    notes: string;
  } | null>(null);
  const [adminAction, setAdminAction] = useState<'publish' | 'archive' | null>(null);
  const tsValue = parseTimestamp(comment.ts);
  const tsInvalid = tsValue !== null && Number.isNaN(tsValue);

  const addComment = useApiMutation(
    () =>
      api(`/api/review/courses/${course.id}/comments`, {
        method: 'POST',
        body: {
          body: comment.body.trim(),
          lessonId: comment.lessonId || undefined,
          videoTimestampSeconds: tsValue ?? undefined,
        },
      }),
    [commentsKey],
    () => setComment({ body: '', lessonId: comment.lessonId, ts: '' }),
  );
  const decide = useApiMutation(
    (d: { value: string; notes: string }) =>
      api(`/api/review/courses/${course.id}/decision`, {
        method: 'POST',
        body: { decision: d.value, notes: d.notes },
      }),
    [['review', 'courses']],
    () => {
      setDecision(null);
      toast.success(t('review.decided'));
      onChanged();
    },
  );
  const admin = useApiMutation(
    (a: 'publish' | 'archive') => api(`/api/admin/courses/${course.id}/${a}`, { method: 'POST' }),
    [['review', 'courses']],
    (_r, a) => {
      setAdminAction(null);
      toast.success(a === 'publish' ? t('review.published') : t('review.archived'));
      onChanged();
    },
  );

  return (
    <div className="card stack">
      <div className="row row--between">
        <h2 style={{ margin: 0 }}>{course.title}</h2>
        <StatusBadge status={course.status} />
      </div>
      <p className="small muted">{t('review.independence')}</p>
      <div className="row">
        {course.status === 'InReview' ? (
          <>
            <Button onClick={() => setDecision({ value: 'Approve', notes: '' })}>
              {t('review.approve')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setDecision({ value: 'RequestChanges', notes: '' })}
            >
              {t('review.requestChanges')}
            </Button>
          </>
        ) : null}
        {isAdmin && course.status === 'Approved' ? (
          <Button onClick={() => setAdminAction('publish')}>{t('review.publish')}</Button>
        ) : null}
        {isAdmin && (course.status === 'Published' || course.status === 'Updating') ? (
          <Button variant="danger" onClick={() => setAdminAction('archive')}>
            {t('review.archive')}
          </Button>
        ) : null}
        {course.slug && (course.status === 'Published' || course.status === 'Updating') ? (
          <Link className="btn btn--ghost btn--md" to={`/courses/${course.slug}`}>
            {t('studio.viewPublic')}
          </Link>
        ) : null}
      </div>
      {admin.isError ? <Notice tone="danger">{errorMessage(admin.error, t)}</Notice> : null}
      <details className="card card--flat">
        <summary>
          <strong>{t('diff.title')}</strong>
        </summary>
        <DiffPanel courseId={course.id} />
      </details>
      {course.isMyCourse ? null : <QuestionReview courseId={course.id} />}
      <section>
        <h3>{t('review.comments')}</h3>
        <QueryState query={comments}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('review.noComments')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {list.map((c) => (
                  <li key={c.id} className="card card--flat">
                    <div className="small muted">
                      {c.authorName ?? t('review.reviewer')} · {fmtDate(c.createdAt)}
                      {c.lessonId
                        ? ` · ${lessons.find((l) => l.id === c.lessonId)?.title ?? t('question.lesson')}`
                        : ''}
                      {c.videoTimestampSeconds != null
                        ? ` · ${formatTimestamp(c.videoTimestampSeconds)}`
                        : ''}
                    </div>
                    <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{c.body}</p>
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
        <form
          style={{ marginBlockStart: 'var(--space-3)' }}
          onSubmit={(e) => {
            e.preventDefault();
            if (comment.body.trim() && !tsInvalid) addComment.mutate(undefined);
          }}
        >
          <div className="split">
            <Field label={t('question.lesson')}>
              <Select
                value={comment.lessonId}
                onChange={(e) => setComment({ ...comment, lessonId: e.target.value })}
                placeholder={t('review.wholeCourse')}
                options={lessons.map((l) => ({
                  value: l.id,
                  label: `${l.moduleTitle} — ${l.title}`,
                }))}
              />
            </Field>
            <Field
              label={t('review.timestamp')}
              hint={t('review.timestampHint')}
              error={tsInvalid ? t('review.timestampInvalid') : undefined}
            >
              <Input
                value={comment.ts}
                onChange={(e) => setComment({ ...comment, ts: e.target.value })}
                placeholder="12:34"
              />
            </Field>
          </div>
          <Field label={t('review.comment')} required>
            <Textarea
              value={comment.body}
              onChange={(e) => setComment({ ...comment, body: e.target.value })}
            />
          </Field>
          {addComment.isError ? (
            <Notice tone="danger">{errorMessage(addComment.error, t)}</Notice>
          ) : null}
          <Button
            type="submit"
            variant="secondary"
            loading={addComment.isPending}
            disabled={!comment.body.trim() || tsInvalid}
          >
            {t('review.addComment')}
          </Button>
        </form>
      </section>
      <ConfirmDialog
        open={!!decision}
        title={decision?.value === 'Approve' ? t('review.approve') : t('review.requestChanges')}
        confirmLabel={t('review.recordDecision')}
        loading={decide.isPending}
        onCancel={() => setDecision(null)}
        onConfirm={() => {
          if (decision && (decision.value === 'Approve' || decision.notes.trim()))
            decide.mutate(decision);
        }}
        body={
          decision ? (
            <>
              <Field
                label={t('review.notes')}
                hint={decision.value === 'RequestChanges' ? t('review.notesRequired') : undefined}
              >
                <Textarea
                  value={decision.notes}
                  onChange={(e) => setDecision({ ...decision, notes: e.target.value })}
                />
              </Field>
              {decide.isError ? (
                <Notice tone="danger">{errorMessage(decide.error, t)}</Notice>
              ) : null}
            </>
          ) : null
        }
      />
      <ConfirmDialog
        open={!!adminAction}
        danger={adminAction === 'archive'}
        title={adminAction === 'publish' ? t('review.publish') : t('review.archive')}
        body={adminAction === 'publish' ? t('review.publishBody') : t('review.archiveBody')}
        confirmLabel={adminAction === 'publish' ? t('review.publish') : t('review.archive')}
        loading={admin.isPending}
        onCancel={() => setAdminAction(null)}
        onConfirm={() => adminAction && admin.mutate(adminAction)}
      />
    </div>
  );
}

const QUEUE_STATUSES: CourseStatus[] = [
  'InReview',
  'Draft',
  'Approved',
  'ChangesRequested',
  'Published',
  'Updating',
];

export function ReviewQueuePage() {
  const { t, fmtDate } = useI18n();
  const [status, setStatus] = useState<CourseStatus>('InReview');
  const [selected, setSelected] = useState<string | null>(null);
  usePageMeta(t('admin.section.review'), undefined, { noindex: true });
  const list = useQuery({
    queryKey: ['review', 'courses', status],
    queryFn: () =>
      api<ReviewCourse[] | Paged<ReviewCourse>>(`/api/review/courses${qs({ status })}`),
    select: asList,
  });
  const current = list.data?.find((c) => c.id === selected);
  return (
    <>
      <PageHeader title={t('admin.section.review')} subtitle={t('review.subtitle')} />
      <Field label={t('dashboard.status')}>
        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as CourseStatus);
            setSelected(null);
          }}
          options={QUEUE_STATUSES.map((s) => ({ value: s, label: t(`status.${s}`) }))}
        />
      </Field>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('review.empty')} />
          ) : (
            <div className="stack">
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('studio.courseTitle')}</th>
                      <th scope="col">{t('review.owner')}</th>
                      <th scope="col">{t('studio.updated')}</th>
                      <th scope="col">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((c) => (
                      <tr key={c.id}>
                        <td>{c.title}</td>
                        <td>{c.ownerName ?? (c.instructors?.join(', ') || '—')}</td>
                        <td>{fmtDate(c.updatedAt)}</td>
                        <td>
                          <Button
                            size="sm"
                            variant={selected === c.id ? 'primary' : 'secondary'}
                            onClick={() => setSelected(c.id)}
                            aria-pressed={selected === c.id}
                          >
                            {t('review.open')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {current ? (
                <CourseReview
                  key={current.id}
                  course={current}
                  onChanged={() => setSelected(null)}
                />
              ) : null}
            </div>
          )
        }
      </QueryState>
    </>
  );
}
