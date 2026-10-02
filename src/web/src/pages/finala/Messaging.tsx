import { useEffect, useId, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../../api/client';
import {
  AUTO_MESSAGE_MAX,
  HIDE_MAX,
  HIDE_MIN,
  MESSAGE_MAX,
  REPORT_MAX,
  REPORT_MIN,
  messagingApi,
  msgKeys,
  validateMessageBody,
} from '../../api/finala';
import type { AutoMessageDto, ConversationDto, MessageDto } from '../../api/finala';
import { useApiMutation, useLearnCourse } from '../../api/hooks';
import type { StudioCourseDto } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Checkbox, Field, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { CompletionAwardClaim, CompletionAwardToggle } from './Credentials';
import { FinalaError, finalaError } from './shared';

const MODERATORS = ['Moderator', 'Admin', 'SuperAdmin'] as const;

// ---------- composer ----------

/** Plain-text composer with a live character count; mirrors the server's 1..max, no-HTML rule. */
export function MessageComposer({
  label,
  max = MESSAGE_MAX,
  pending,
  error,
  submitLabel,
  onSend,
  autoFocus,
}: {
  label: string;
  max?: number;
  pending?: boolean;
  error?: unknown;
  submitLabel?: string;
  onSend: (body: string, reset: () => void) => void;
  autoFocus?: boolean;
}) {
  const { t } = useI18n();
  const [body, setBody] = useState('');
  const [touched, setTouched] = useState(false);
  const counterId = useId();
  const problem = validateMessageBody(body, max);
  const length = body.trim().length;
  const shownProblem = touched && problem && problem !== 'empty' ? problem : null;
  return (
    <form
      className="stack finala-composer"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (!problem)
          onSend(body.trim(), () => {
            setBody('');
            setTouched(false);
          });
      }}
    >
      <Field
        label={label}
        hint={t('finala.msg.plainText')}
        error={shownProblem ? t(`finala.msg.invalid.${shownProblem}`, { max }) : undefined}
      >
        <Textarea
          rows={4}
          value={body}
          autoFocus={autoFocus}
          onChange={(e) => {
            setBody(e.target.value);
            if (e.target.value.trim().length > max) setTouched(true);
          }}
          aria-describedby={counterId}
        />
      </Field>
      <div className="row row--between">
        <span
          id={counterId}
          className={length > max ? 'small finala-counter finala-counter--over' : 'small muted'}
          aria-live="polite"
          data-testid="composer-count"
        >
          {t('finala.msg.count', { n: length, max })}
        </span>
        <Button type="submit" loading={pending} disabled={!!problem}>
          {submitLabel ?? t('finala.msg.send')}
        </Button>
      </div>
      <FinalaError error={error} />
    </form>
  );
}

// ---------- entry points ----------

/** "Message instructor": only rendered for enrolled learners (server re-checks enrollment). */
export function MessageInstructorButton({
  courseId,
  enrolled,
}: {
  courseId: string;
  enrolled: boolean;
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const send = useApiMutation(
    (v: { body: string; reset: () => void }) => messagingApi.toInstructors(courseId, v.body),
    [msgKeys.conversations],
    (r, v) => {
      v.reset();
      setOpen(false);
      navigate(`/messages/${r.conversation.id}`);
    },
  );
  if (!user || !enrolled) return null;
  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        {t('finala.msg.messageInstructor')}
      </Button>
      <Dialog open={open} title={t('finala.msg.messageInstructor')} onClose={() => setOpen(false)}>
        <p className="small muted">{t('finala.msg.instructorHelp')}</p>
        <MessageComposer
          label={t('finala.msg.yourMessage')}
          pending={send.isPending}
          error={send.error}
          autoFocus
          onSend={(body, reset) => send.mutate({ body, reset })}
        />
      </Dialog>
    </>
  );
}

/** Instructor → enrolled learner. The API answers 404 when the person is not enrolled. */
export function MessageLearnerButton({
  courseId,
  learnerId,
  learnerName,
}: {
  courseId: string;
  learnerId: string;
  learnerName: string;
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const send = useApiMutation(
    (v: { body: string; reset: () => void }) => messagingApi.toLearner(courseId, learnerId, v.body),
    [msgKeys.conversations],
    (r, v) => {
      v.reset();
      setOpen(false);
      navigate(`/messages/${r.conversation.id}`);
    },
  );
  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
        {t('finala.msg.messageLearner')}
      </Button>
      <Dialog
        open={open}
        title={t('finala.msg.messageLearnerTitle', { name: learnerName })}
        onClose={() => setOpen(false)}
      >
        <MessageComposer
          label={t('finala.msg.yourMessage')}
          pending={send.isPending}
          error={
            send.error instanceof ApiError && send.error.status === 404 ? undefined : send.error
          }
          autoFocus
          onSend={(body, reset) => send.mutate({ body, reset })}
        />
        {send.error instanceof ApiError && send.error.status === 404 ? (
          <Notice tone="danger">{t('finala.msg.notEnrolled')}</Notice>
        ) : null}
      </Dialog>
    </>
  );
}

/** Course page actions for enrolled learners: message the instructors, claim a completion award. */
export function CourseLearnerActions({ courseId, slug }: { courseId: string; slug: string }) {
  const { user } = useAuth();
  return user ? <SignedInCourseActions courseId={courseId} slug={slug} /> : null;
}

function SignedInCourseActions({ courseId, slug }: { courseId: string; slug: string }) {
  const learn = useLearnCourse(slug);
  const enrolled = !!learn.data?.enrolled;
  if (!enrolled) return null;
  return (
    <div className="row" style={{ marginBlockEnd: 'var(--space-3)', alignItems: 'flex-start' }}>
      <MessageInstructorButton courseId={courseId} enrolled={enrolled} />
      <CompletionAwardClaim courseId={courseId} enrolled={enrolled} />
    </div>
  );
}

// ---------- inbox ----------

function ConversationRow({ c }: { c: ConversationDto }) {
  const { t, fmtDate } = useI18n();
  const other = c.myRole === 'Learner' ? t('finala.msg.instructors') : c.learnerName;
  return (
    <li className="card card--flat finala-conv">
      <Link to={`/messages/${c.id}`} className="finala-conv__link">
        <strong>{other}</strong>
        {c.unread > 0 ? <Badge tone="info">{t('finala.msg.unread', { n: c.unread })}</Badge> : null}
      </Link>
      <div className="small muted">
        {c.courseTitle} · {fmtDate(c.lastMessageAt)}
      </div>
    </li>
  );
}

function BlockedUsers() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const blocks = useQuery({ queryKey: msgKeys.blocks, queryFn: messagingApi.blocks });
  const unblock = useApiMutation(
    (id: string) => messagingApi.unblock(id),
    [msgKeys.blocks],
    () => toast.success(t('finala.msg.unblocked')),
  );
  return (
    <section className="card" aria-labelledby="blocked-h">
      <h2 id="blocked-h">{t('finala.msg.blockedTitle')}</h2>
      <QueryState query={blocks}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted small">{t('finala.msg.noBlocked')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((b) => (
                <li key={b.userId} className="row row--between">
                  <span>
                    {b.displayName} <span className="small muted">{fmtDate(b.createdAt)}</span>
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    loading={unblock.isPending && unblock.variables === b.userId}
                    onClick={() => unblock.mutate(b.userId)}
                  >
                    {t('finala.msg.unblock')}
                  </Button>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <FinalaError error={unblock.error} />
    </section>
  );
}

export function InboxPage() {
  const { t } = useI18n();
  const { hasRole } = useAuth();
  usePageMeta(t('finala.msg.inbox'), undefined, { noindex: true });
  const list = useQuery({ queryKey: msgKeys.conversations, queryFn: messagingApi.conversations });
  return (
    <div className="container page stack">
      <PageHeader
        title={t('finala.msg.inbox')}
        subtitle={t('finala.msg.inboxSubtitle')}
        actions={
          hasRole(...MODERATORS) ? (
            <Link className="btn btn--secondary btn--sm" to="/moderation/messages">
              {t('finala.mod.title')}
            </Link>
          ) : null
        }
      />
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('finala.msg.empty')} description={t('finala.msg.emptyBody')} />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {items.map((c) => (
                <ConversationRow key={c.id} c={c} />
              ))}
            </ul>
          )
        }
      </QueryState>
      <BlockedUsers />
    </div>
  );
}

// ---------- conversation ----------

function ReportDialog({ message, onClose }: { message: MessageDto; onClose: () => void }) {
  const { t } = useI18n();
  const toast = useToast();
  const [reason, setReason] = useState('');
  const ok = reason.trim().length >= REPORT_MIN && reason.trim().length <= REPORT_MAX;
  const report = useApiMutation(
    () => messagingApi.report(message.id, reason.trim()),
    [],
    () => {
      toast.success(t('finala.msg.reported'));
      onClose();
    },
  );
  return (
    <Dialog
      open
      title={t('finala.msg.reportTitle')}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            variant="danger"
            disabled={!ok}
            loading={report.isPending}
            onClick={() => report.mutate(undefined)}
          >
            {t('finala.msg.report')}
          </Button>
        </>
      }
    >
      <p className="small muted">{t('finala.msg.reportHelp')}</p>
      <Field
        label={t('finala.msg.reportReason')}
        hint={t('finala.msg.reportReasonHint', { min: REPORT_MIN, max: REPORT_MAX })}
        required
      >
        <Textarea
          rows={4}
          maxLength={REPORT_MAX}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Field>
      <FinalaError error={report.error} />
    </Dialog>
  );
}

function HideDialog({
  message,
  onClose,
  onDone,
}: {
  message: MessageDto;
  onClose: () => void;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const [reason, setReason] = useState('');
  const ok = reason.trim().length >= HIDE_MIN && reason.trim().length <= HIDE_MAX;
  const hide = useApiMutation(() => messagingApi.hide(message.id, reason.trim()), [], onDone);
  return (
    <Dialog
      open
      title={t('finala.mod.hideTitle')}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            variant="danger"
            disabled={!ok}
            loading={hide.isPending}
            onClick={() => hide.mutate(undefined)}
          >
            {t('finala.mod.hide')}
          </Button>
        </>
      }
    >
      <Field
        label={t('finala.mod.hideReason')}
        hint={t('finala.mod.hideReasonHint', { min: HIDE_MIN, max: HIDE_MAX })}
        required
      >
        <Textarea
          rows={3}
          maxLength={HIDE_MAX}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Field>
      <FinalaError error={hide.error} />
    </Dialog>
  );
}

function MessageItem({
  m,
  mine,
  moderator,
  onReport,
  onBlock,
  onHide,
  onUnhide,
}: {
  m: MessageDto;
  mine: boolean;
  moderator: boolean;
  onReport: () => void;
  onBlock: () => void;
  onHide: () => void;
  onUnhide: () => void;
}) {
  const { t, fmtDate } = useI18n();
  return (
    <li
      className={mine ? 'finala-msg finala-msg--mine' : 'finala-msg'}
      aria-label={t('finala.msg.from', { name: m.senderName })}
    >
      <div className="row row--between small">
        <span>
          <strong>{m.senderName}</strong>{' '}
          <span className="muted">
            {t(`finala.msg.role.${m.senderRole}`)} · {fmtDate(m.createdAt)}
          </span>{' '}
          {m.kind !== 'Text' ? <Badge tone="info">{t(`finala.msg.kind.${m.kind}`)}</Badge> : null}
        </span>
      </div>
      {m.hidden ? (
        <Notice tone="warning" title={t('finala.msg.hiddenTitle')}>
          {m.hiddenReason
            ? t('finala.msg.hiddenReason', { reason: m.hiddenReason })
            : t('finala.msg.hiddenBody')}
        </Notice>
      ) : null}
      {m.body !== null ? <p className="pre-wrap finala-msg__body">{m.body}</p> : null}
      <div className="row">
        {!mine && !m.hidden ? (
          <Button size="sm" variant="ghost" onClick={onReport}>
            {t('finala.msg.report')}
          </Button>
        ) : null}
        {!mine ? (
          <Button size="sm" variant="ghost" onClick={onBlock}>
            {t('finala.msg.block', { name: m.senderName })}
          </Button>
        ) : null}
        {moderator ? (
          m.hidden ? (
            <Button size="sm" variant="ghost" onClick={onUnhide}>
              {t('finala.mod.unhide')}
            </Button>
          ) : (
            <Button size="sm" variant="ghost" onClick={onHide}>
              {t('finala.mod.hide')}
            </Button>
          )
        ) : null}
      </div>
    </li>
  );
}

export function ConversationPage() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  const { user, hasRole } = useAuth();
  const toast = useToast();
  const qc = useQueryClient();
  usePageMeta(t('finala.msg.conversation'), undefined, { noindex: true });
  const page = useQuery({
    queryKey: msgKeys.conversation(id),
    queryFn: () => messagingApi.conversation(id),
  });
  // Older pages are prepended locally; the server stays the source of the latest page.
  const [older, setOlder] = useState<MessageDto[]>([]);
  const [olderHasMore, setOlderHasMore] = useState<boolean | null>(null);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [reporting, setReporting] = useState<MessageDto | null>(null);
  const [hiding, setHiding] = useState<MessageDto | null>(null);
  const [blocking, setBlocking] = useState<MessageDto | null>(null);
  useEffect(() => {
    setOlder([]);
    setOlderHasMore(null);
  }, [id]);
  useEffect(() => {
    // Opening a thread marks it read on the server; refresh unread counts.
    if (page.isSuccess) void qc.invalidateQueries({ queryKey: msgKeys.conversations });
  }, [page.isSuccess, qc]);
  const refresh = () => qc.invalidateQueries({ queryKey: msgKeys.conversation(id) });
  const reply = useApiMutation(
    (v: { body: string; reset: () => void }) => messagingApi.reply(id, v.body),
    [msgKeys.conversation(id), msgKeys.conversations],
    (_r, v) => v.reset(),
  );
  const block = useApiMutation(
    (userId: string) => messagingApi.block(userId),
    [msgKeys.blocks],
    () => {
      setBlocking(null);
      toast.success(t('finala.msg.blocked'));
    },
  );
  const unhide = useApiMutation(
    (messageId: string) => messagingApi.unhide(messageId),
    [msgKeys.conversation(id)],
    () => toast.success(t('finala.mod.unhidden')),
  );
  const moderator = hasRole(...MODERATORS);

  if (page.isError && page.error instanceof ApiError && page.error.status === 404)
    return (
      <div className="container page">
        <EmptyState
          title={t('finala.msg.notFound')}
          action={{ label: t('finala.msg.inbox'), to: '/messages' }}
        />
      </div>
    );

  return (
    <div className="container page stack">
      <nav aria-label={t('common.breadcrumb')} className="small muted">
        <Link to="/messages">{t('finala.msg.inbox')}</Link>
      </nav>
      <QueryState query={page}>
        {(p) => {
          const c = p.conversation;
          const messages = [...older, ...p.messages];
          const hasMore = olderHasMore ?? p.hasMore;
          const participant = c.myRole === 'Learner' || c.myRole === 'Instructor';
          const loadOlder = async () => {
            if (messages.length === 0) return;
            setLoadingOlder(true);
            try {
              const prev = await messagingApi.conversation(id, messages[0].createdAt);
              setOlder((o) => [...prev.messages, ...o]);
              setOlderHasMore(prev.hasMore);
            } catch (e) {
              toast.error(finalaError(e, t));
            } finally {
              setLoadingOlder(false);
            }
          };
          return (
            <>
              <PageHeader
                title={
                  c.myRole === 'Learner'
                    ? t('finala.msg.withInstructors', { course: c.courseTitle })
                    : t('finala.msg.withLearner', { name: c.learnerName, course: c.courseTitle })
                }
                subtitle={t('finala.msg.privacy')}
              />
              {hasMore ? (
                <Button
                  variant="secondary"
                  size="sm"
                  loading={loadingOlder}
                  onClick={() => void loadOlder()}
                >
                  {t('finala.msg.older')}
                </Button>
              ) : null}
              {messages.length === 0 ? (
                <p className="muted">{t('finala.msg.noMessages')}</p>
              ) : (
                <ol className="finala-thread" aria-label={t('finala.msg.conversation')}>
                  {messages.map((m) => (
                    <MessageItem
                      key={m.id}
                      m={m}
                      mine={m.senderId === user?.id}
                      moderator={moderator}
                      onReport={() => setReporting(m)}
                      onBlock={() => setBlocking(m)}
                      onHide={() => setHiding(m)}
                      onUnhide={() => unhide.mutate(m.id)}
                    />
                  ))}
                </ol>
              )}
              <FinalaError error={unhide.error} />
              {participant ? (
                <MessageComposer
                  label={t('finala.msg.reply')}
                  pending={reply.isPending}
                  error={reply.error}
                  onSend={(body, reset) => reply.mutate({ body, reset })}
                />
              ) : null}
            </>
          );
        }}
      </QueryState>
      {reporting ? <ReportDialog message={reporting} onClose={() => setReporting(null)} /> : null}
      {hiding ? (
        <HideDialog
          message={hiding}
          onClose={() => setHiding(null)}
          onDone={() => {
            setHiding(null);
            void refresh();
            toast.success(t('finala.mod.hidden'));
          }}
        />
      ) : null}
      <ConfirmDialog
        open={!!blocking}
        danger
        title={t('finala.msg.blockTitle', { name: blocking?.senderName ?? '' })}
        body={
          <>
            <p>{t('finala.msg.blockBody')}</p>
            <FinalaError error={block.error} />
          </>
        }
        confirmLabel={t('finala.msg.blockConfirm')}
        loading={block.isPending}
        onCancel={() => setBlocking(null)}
        onConfirm={() => blocking && block.mutate(blocking.senderId)}
      />
    </div>
  );
}

// ---------- moderation ----------

export function ModerationMessagesPage() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  usePageMeta(t('finala.mod.title'), undefined, { noindex: true });
  const [includeHidden, setIncludeHidden] = useState(false);
  const [hiding, setHiding] = useState<MessageDto | null>(null);
  const reports = useQuery({
    queryKey: msgKeys.reports(includeHidden),
    queryFn: () => messagingApi.reports(includeHidden),
  });
  const qc = useQueryClient();
  const unhide = useApiMutation(
    (messageId: string) => messagingApi.unhide(messageId),
    [['finala', 'msg-reports']],
    () => toast.success(t('finala.mod.unhidden')),
  );
  return (
    <div className="container page stack">
      <PageHeader title={t('finala.mod.title')} subtitle={t('finala.mod.subtitle')} />
      <Checkbox
        label={t('finala.mod.includeHidden')}
        checked={includeHidden}
        onChange={(e) => setIncludeHidden(e.target.checked)}
      />
      <QueryState query={reports}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('finala.mod.none')} />
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((r) => (
                <li key={r.reportId} className="card card--flat stack">
                  <div className="row row--between small">
                    <span>
                      <strong>{r.senderName}</strong> · {fmtDate(r.createdAt)}{' '}
                      {r.hidden ? <Badge tone="danger">{t('finala.mod.hiddenBadge')}</Badge> : null}
                    </span>
                    <Link to={`/messages/${r.conversationId}`}>{t('finala.mod.openThread')}</Link>
                  </div>
                  <blockquote className="pre-wrap finala-quote">{r.body}</blockquote>
                  <p className="small">
                    <strong>{t('finala.mod.reportReason')}</strong> {r.reason}
                  </p>
                  <div className="row">
                    {r.hidden ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        loading={unhide.isPending && unhide.variables === r.messageId}
                        onClick={() => unhide.mutate(r.messageId)}
                      >
                        {t('finala.mod.unhide')}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          setHiding({
                            id: r.messageId,
                            conversationId: r.conversationId,
                            senderId: r.senderId,
                            senderName: r.senderName,
                            senderRole: 'Learner',
                            kind: 'Text',
                            body: r.body,
                            hidden: false,
                            hiddenReason: null,
                            createdAt: r.createdAt,
                          })
                        }
                      >
                        {t('finala.mod.hide')}
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      <FinalaError error={unhide.error} />
      {hiding ? (
        <HideDialog
          message={hiding}
          onClose={() => setHiding(null)}
          onDone={() => {
            setHiding(null);
            void qc.invalidateQueries({ queryKey: ['finala', 'msg-reports'] });
            toast.success(t('finala.mod.hidden'));
          }}
        />
      ) : null}
    </div>
  );
}

// ---------- studio ----------

function AutoMessageEditor({
  courseId,
  kind,
  current,
}: {
  courseId: string;
  kind: 'welcome' | 'completion';
  current: AutoMessageDto | undefined;
}) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [body, setBody] = useState(current?.body ?? '');
  const [enabled, setEnabled] = useState(current?.enabled ?? false);
  const problem = validateMessageBody(body, AUTO_MESSAGE_MAX);
  const save = useApiMutation(
    () => messagingApi.setAutoMessage(courseId, kind, body.trim(), enabled),
    [msgKeys.autoMessages(courseId)],
    () => toast.success(t('finala.auto.saved')),
  );
  return (
    <form
      className="card card--flat stack"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!problem) save.mutate(undefined);
      }}
    >
      <h3 style={{ margin: 0 }}>{t(`finala.auto.${kind}`)}</h3>
      <p className="small muted">{t(`finala.auto.${kind}Help`)}</p>
      <Field
        label={t('finala.auto.body')}
        hint={t('finala.auto.bodyHint', { n: body.trim().length, max: AUTO_MESSAGE_MAX })}
        error={
          problem && problem !== 'empty'
            ? t(`finala.msg.invalid.${problem}`, { max: AUTO_MESSAGE_MAX })
            : undefined
        }
      >
        <Textarea rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
      </Field>
      <Checkbox
        label={t('finala.auto.enabled')}
        hint={t('finala.auto.enabledHint')}
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      {current?.enabledSince ? (
        <p className="small muted">
          {t('finala.auto.enabledSince', { date: fmtDate(current.enabledSince) })}
        </p>
      ) : null}
      <FinalaError error={save.error} />
      <div className="row">
        <Button type="submit" disabled={!!problem} loading={save.isPending}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}

function CourseConversations({ courseId }: { courseId: string }) {
  const { t } = useI18n();
  const list = useQuery({ queryKey: msgKeys.conversations, queryFn: messagingApi.conversations });
  return (
    <section className="stack" aria-labelledby="course-conv-h">
      <h3 id="course-conv-h">{t('finala.studio.conversations')}</h3>
      <QueryState query={list}>
        {(items) => {
          const mine = items.filter((c) => c.courseId === courseId);
          return mine.length === 0 ? (
            <p className="muted small">{t('finala.studio.noConversations')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {mine.map((c) => (
                <ConversationRow key={c.id} c={c} />
              ))}
            </ul>
          );
        }}
      </QueryState>
    </section>
  );
}

/** Studio tab: welcome/completion auto-messages, completion award switch and this course's threads. */
export function StudioMessagingPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const auto = useQuery({
    queryKey: msgKeys.autoMessages(course.id),
    queryFn: () => messagingApi.autoMessages(course.id),
  });
  return (
    <div className="stack">
      <CompletionAwardToggle courseId={course.id} />
      <section className="card stack" aria-labelledby="auto-h">
        <h2 id="auto-h">{t('finala.auto.title')}</h2>
        <QueryState query={auto}>
          {(list) => (
            <div className="stack">
              {(['welcome', 'completion'] as const).map((k) => (
                <AutoMessageEditor
                  key={k}
                  courseId={course.id}
                  kind={k}
                  current={list.find((a) => a.kind.toLowerCase() === k)}
                />
              ))}
            </div>
          )}
        </QueryState>
      </section>
      <section className="card">
        <CourseConversations courseId={course.id} />
        <p className="small muted">{t('finala.studio.messageLearnerHow')}</p>
      </section>
    </div>
  );
}
