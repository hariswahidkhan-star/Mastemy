import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Link } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { ASSIST_KINDS, extractGuid, wsKeys } from '../../api/workspace';
import type {
  AdminUsageDto,
  AssistKind,
  AssistResultDto,
  CitationDto,
  ConversationDetailDto,
  ConversationDto,
  McqDraftResultDto,
  PracticeCheckDto,
  PracticeSetDto,
  TutorDone,
  UsageRowDto,
} from '../../api/workspace';
import type { PlayerHandle } from '../../components/YouTubePlayer';
import { Markdown } from '../../components/Markdown';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState, QueryStatus } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { formatTimestamp } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { postSse } from '../../lib/sse';
import { AiGate, fmtDateTime, WsError } from './common';
import { StatTile } from './Charts';

const MAX_MESSAGE = 2000;

// ---------- learner tutor ----------
interface ChatMessage {
  key: string;
  role: string;
  content: string;
  citations: CitationDto[];
  outcome?: string | null;
  streaming?: boolean;
}

/** Folds one tutor SSE event into the in-progress assistant message. `done.content` replaces streamed text. */
export function applyTutorEvent(
  msg: ChatMessage,
  event: string,
  data: string,
): { msg: ChatMessage; error?: string; done?: boolean } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch {
    return { msg };
  }
  if (event === 'delta')
    return { msg: { ...msg, content: msg.content + ((parsed as { text?: string }).text ?? '') } };
  if (event === 'citations') return { msg: { ...msg, citations: parsed as CitationDto[] } };
  if (event === 'done') {
    const d = parsed as TutorDone;
    return {
      msg: {
        ...msg,
        content: d.content,
        citations: d.citations ?? [],
        outcome: d.outcome,
        streaming: false,
      },
      done: true,
    };
  }
  if (event === 'error') {
    const e = parsed as { code?: string; message?: string };
    return { msg: { ...msg, streaming: false }, error: e.code ?? e.message ?? 'error' };
  }
  return { msg };
}

function Citations({
  citations,
  courseSlug,
  lessonId,
  player,
}: {
  citations: CitationDto[];
  courseSlug: string;
  lessonId: string;
  player?: RefObject<PlayerHandle | null>;
}) {
  const { t } = useI18n();
  if (citations.length === 0) return null;
  return (
    <ol className="ws-cites" aria-label={t('workspace.tutor.sources')}>
      {citations.map((c, i) => {
        const time = c.startSeconds != null ? ` · ${formatTimestamp(c.startSeconds)}` : '';
        const text = `[${i + 1}] ${c.lessonTitle}${c.section ? ` · ${c.section}` : ''}${time}`;
        if (c.lessonId === lessonId && c.startSeconds != null && player)
          return (
            <li key={c.chunkId}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => player.current?.seekTo(c.startSeconds ?? 0)}
              >
                {text}
              </Button>
            </li>
          );
        const href = `/learn/${courseSlug}/${c.lessonId}${c.startSeconds != null ? `?t=${c.startSeconds}` : ''}`;
        return (
          <li key={c.chunkId}>
            <Link className="btn btn--secondary btn--sm" to={href}>
              {text}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export function TutorPanel({
  courseId,
  courseSlug,
  lessonId,
  player,
}: {
  courseId: string;
  courseSlug: string;
  lessonId: string;
  player?: RefObject<PlayerHandle | null>;
}) {
  return (
    <AiGate>
      <TutorInner courseId={courseId} courseSlug={courseSlug} lessonId={lessonId} player={player} />
    </AiGate>
  );
}

function TutorInner({
  courseId,
  courseSlug,
  lessonId,
  player,
}: {
  courseId: string;
  courseSlug: string;
  lessonId: string;
  player?: RefObject<PlayerHandle | null>;
}) {
  const { t, lang } = useI18n();
  const qc = useQueryClient();
  const toast = useToast();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [live, setLive] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<ConversationDto | null>(null);
  const abort = useRef<AbortController | null>(null);
  const [baseIds, setBaseIds] = useState<Set<string> | null>(null);

  const convs = useQuery({
    queryKey: wsKeys.conversations(courseId),
    queryFn: () =>
      api<ConversationDto[]>(
        `/api/ai/tutor/conversations?courseId=${encodeURIComponent(courseId)}`,
      ),
  });
  const detail = useQuery({
    queryKey: wsKeys.conversation(activeId ?? ''),
    queryFn: () => api<ConversationDetailDto>(`/api/ai/tutor/conversations/${activeId}`),
    enabled: !!activeId,
  });
  const del = useApiMutation(
    (id: string) => api(`/api/ai/tutor/conversations/${id}`, { method: 'DELETE' }),
    [wsKeys.conversations(courseId)],
    (_r, id) => {
      if (id === activeId) {
        setActiveId(null);
        setLive([]);
      }
      setToDelete(null);
      toast.success(t('workspace.tutor.deleted'));
    },
  );

  const send = async () => {
    const content = draft.trim();
    if (!content || busy) return;
    setBusy(true);
    setError(null);
    setStreamError(null);
    try {
      let id = activeId;
      if (!id) {
        const c = await api<ConversationDto>('/api/ai/tutor/conversations', {
          method: 'POST',
          body: { courseId, title: content.slice(0, 80) },
        });
        id = c.id;
        setActiveId(id);
        void qc.invalidateQueries({ queryKey: wsKeys.conversations(courseId) });
      }
      setBaseIds(new Set((detail.data?.messages ?? []).map((m) => m.id)));
      const stamp = Date.now();
      let reply: ChatMessage = {
        key: `a${stamp}`,
        role: 'assistant',
        content: '',
        citations: [],
        streaming: true,
      };
      setLive([{ key: `u${stamp}`, role: 'user', content, citations: [] }, reply]);
      setDraft('');
      abort.current = new AbortController();
      await postSse(
        `/api/ai/tutor/conversations/${id}/messages`,
        { content },
        (m) => {
          const r = applyTutorEvent(reply, m.event, m.data);
          reply = r.msg;
          if (r.error) setStreamError(r.error);
          setLive((prev) => [prev[0], reply]);
        },
        abort.current.signal,
      );
      await qc.invalidateQueries({ queryKey: wsKeys.conversation(id) });
      void qc.invalidateQueries({ queryKey: wsKeys.conversations(courseId) });
      setLive([]);
    } catch (e) {
      setError(e);
      setLive((prev) => prev.filter((m) => m.role === 'user'));
    } finally {
      setBusy(false);
    }
  };

  const persisted: ChatMessage[] = (detail.data?.messages ?? [])
    .filter((m) => live.length === 0 || !baseIds || baseIds.has(m.id))
    .map((m) => ({
      key: m.id,
      role: m.role,
      content: m.content,
      citations: m.citations,
      outcome: m.outcome,
    }));
  // While a turn streams, the persisted copy may already contain the user message; show live ones last.
  const messages = [...persisted, ...live];

  return (
    <div className="stack">
      <Notice tone="info">{t('workspace.tutor.intro')}</Notice>
      <QueryStatus query={detail} />
      <div className="row">
        <QueryStatus query={convs} />
        <Field label={t('workspace.tutor.conversation')}>
          <Select
            value={activeId ?? ''}
            onChange={(e) => {
              setActiveId(e.target.value || null);
              setLive([]);
            }}
            placeholder={t('workspace.tutor.newConversation')}
            options={(convs.data ?? []).map((c) => ({
              value: c.id,
              label: `${c.title} · ${fmtDateTime(c.lastMessageAt, lang)}`,
            }))}
          />
        </Field>
        {activeId ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setToDelete(convs.data?.find((c) => c.id === activeId) ?? null)}
          >
            {t('workspace.tutor.delete')}
          </Button>
        ) : null}
      </div>
      <div className="ws-chat" aria-live="polite" aria-busy={busy}>
        {messages.length === 0 ? (
          <p className="muted">{t('workspace.tutor.empty')}</p>
        ) : (
          messages.map((m) => (
            <div
              key={m.key}
              className={m.role === 'user' ? 'ws-msg ws-msg--user' : 'ws-msg'}
              data-testid={m.role === 'user' ? 'tutor-user' : 'tutor-reply'}
            >
              <div className="small muted">
                {m.role === 'user' ? t('workspace.tutor.you') : t('workspace.tutor.assistant')}
                {m.outcome === 'not_covered' ? (
                  <>
                    {' '}
                    <Badge tone="warning">{t('workspace.tutor.notCovered')}</Badge>
                  </>
                ) : null}
              </div>
              {m.role === 'user' ? (
                <p className="pre-wrap" style={{ margin: 0 }}>
                  {m.content}
                </p>
              ) : m.streaming && !m.content ? (
                <p className="muted" style={{ margin: 0 }}>
                  {t('workspace.tutor.thinking')}
                </p>
              ) : (
                <Markdown source={m.content} />
              )}
              <Citations
                citations={m.citations}
                courseSlug={courseSlug}
                lessonId={lessonId}
                player={player}
              />
            </div>
          ))
        )}
      </div>
      {streamError ? (
        <Notice tone="danger">
          {t(`workspace.errors.${streamError}`) === `workspace.errors.${streamError}`
            ? t('workspace.tutor.streamFailed')
            : t(`workspace.errors.${streamError}`)}
        </Notice>
      ) : null}
      <WsError error={error} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <Field
          label={t('workspace.tutor.ask')}
          hint={t('workspace.tutor.askHint', { n: MAX_MESSAGE - draft.length })}
        >
          <Textarea
            rows={3}
            value={draft}
            maxLength={MAX_MESSAGE}
            onChange={(e) => setDraft(e.target.value)}
          />
        </Field>
        <Button type="submit" loading={busy} disabled={!draft.trim()}>
          {t('workspace.tutor.send')}
        </Button>
      </form>
      <ConfirmDialog
        open={!!toDelete}
        danger
        title={t('workspace.tutor.delete')}
        body={t('workspace.tutor.deleteBody', { title: toDelete?.title ?? '' })}
        confirmLabel={t('common.delete')}
        loading={del.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() => toDelete && del.mutate(toDelete.id)}
      />
    </div>
  );
}

// ---------- AI practice ----------
export function AiPracticePanel({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  return (
    <AiGate>
      <AiPracticeInner courseId={courseId} lessonId={lessonId} />
    </AiGate>
  );
}

function AiPracticeInner({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { t } = useI18n();
  const [count, setCount] = useState('3');
  const [set, setSet] = useState<PracticeSetDto | null>(null);
  const gen = useApiMutation(
    () =>
      api<PracticeSetDto>('/api/ai/practice', {
        method: 'POST',
        body: { courseId, lessonId, count: Number(count) },
      }),
    [],
    (r) => setSet(r),
  );
  return (
    <div className="stack">
      <Notice tone="warning" title={t('workspace.practice.label')}>
        {t('workspace.practice.disclaimer')}
      </Notice>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          gen.mutate(undefined);
        }}
      >
        <Field label={t('workspace.practice.count')}>
          <Select
            value={count}
            onChange={(e) => setCount(e.target.value)}
            options={['1', '2', '3', '4', '5'].map((v) => ({ value: v, label: v }))}
          />
        </Field>
        <Button type="submit" loading={gen.isPending}>
          {t('workspace.practice.generate')}
        </Button>
      </form>
      <WsError error={gen.error} />
      {set ? (
        <div className="stack">
          <Badge tone="warning">{t('workspace.practice.label')}</Badge>
          {set.questions.map((q) => (
            <PracticeQuestion key={`${set.id}-${q.index}`} setId={set.id} q={q} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PracticeQuestion({ setId, q }: { setId: string; q: PracticeSetDto['questions'][number] }) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<number[]>([]);
  const check = useApiMutation(() =>
    api<PracticeCheckDto>(`/api/ai/practice/${setId}/check`, {
      method: 'POST',
      body: { questionIndex: q.index, selected },
    }),
  );
  const r = check.data;
  return (
    <fieldset className="card card--flat">
      <legend>
        {q.index + 1}. {q.stem}
      </legend>
      {q.options.map((o) => (
        <label key={o.index} className="row small" style={{ display: 'flex' }}>
          <input
            type={q.multipleSelect ? 'checkbox' : 'radio'}
            name={`p-${setId}-${q.index}`}
            checked={selected.includes(o.index)}
            onChange={(e) =>
              setSelected((s) =>
                q.multipleSelect
                  ? e.target.checked
                    ? [...s, o.index]
                    : s.filter((x) => x !== o.index)
                  : [o.index],
              )
            }
          />
          <span>
            {o.text}
            {r ? (
              <span className="muted">
                {r.correctIndexes.includes(o.index)
                  ? ` ✓ ${t('workspace.practice.correctOption')}`
                  : ''}
                {r.rationales[o.index] ? ` — ${r.rationales[o.index]}` : ''}
              </span>
            ) : null}
          </span>
        </label>
      ))}
      <Button
        size="sm"
        variant="secondary"
        disabled={selected.length === 0}
        loading={check.isPending}
        onClick={() => check.mutate(undefined)}
      >
        {t('workspace.practice.check')}
      </Button>
      {r ? (
        <Notice tone={r.correct ? 'success' : 'warning'}>
          <strong>
            {r.correct ? t('workspace.practice.right') : t('workspace.practice.wrong')}
          </strong>{' '}
          {r.explanation}
        </Notice>
      ) : null}
      <WsError error={check.error} />
    </fieldset>
  );
}

// ---------- instructor assist ----------
export function AiAssistPanel({
  courseId,
  lessonId,
  onInsert,
}: {
  courseId: string;
  lessonId?: string;
  onInsert: (text: string) => void;
}) {
  const { t } = useI18n();
  return (
    <details className="card card--flat">
      <summary>
        <strong>{t('workspace.assist.title')}</strong>
      </summary>
      <AiGate>
        <AssistInner courseId={courseId} lessonId={lessonId} onInsert={onInsert} />
        <McqDraftPanel courseId={courseId} lessonId={lessonId} />
      </AiGate>
    </details>
  );
}

function AssistInner({
  courseId,
  lessonId,
  onInsert,
}: {
  courseId: string;
  lessonId?: string;
  onInsert: (text: string) => void;
}) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const [kind, setKind] = useState<AssistKind>('LessonNotes');
  const [input, setInput] = useState('');
  const run = useApiMutation(() =>
    api<AssistResultDto>(`/api/ai/studio/courses/${courseId}/assist`, {
      method: 'POST',
      body: { kind, lessonId, input: input.trim() || null, language: lang },
    }),
  );
  return (
    <div className="stack" style={{ marginBlockStart: 'var(--space-3)' }}>
      <p className="small muted">{t('workspace.assist.help')}</p>
      <Field label={t('workspace.assist.kind')}>
        <Select
          value={kind}
          onChange={(e) => setKind(e.target.value as AssistKind)}
          options={ASSIST_KINDS.map((k) => ({ value: k, label: t(`workspace.assist.kinds.${k}`) }))}
        />
      </Field>
      <Field label={t('workspace.assist.input')} hint={t('workspace.assist.inputHint')}>
        <Textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} />
      </Field>
      <div>
        <Button variant="secondary" loading={run.isPending} onClick={() => run.mutate(undefined)}>
          {t('workspace.assist.generate')}
        </Button>
      </div>
      <WsError error={run.error} />
      {run.data ? (
        <div className="stack">
          <Badge tone="warning">{t('workspace.assist.review')}</Badge>
          <pre className="ws-pre" aria-label={t('workspace.assist.draft')}>
            {run.data.draft}
          </pre>
          <div className="row">
            <Button
              onClick={() => {
                onInsert(run.data.draft);
                toast.success(t('workspace.assist.inserted'));
              }}
            >
              {t('workspace.assist.insert')}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function McqDraftPanel({ courseId, lessonId }: { courseId: string; lessonId?: string }) {
  const { t, lang } = useI18n();
  const [count, setCount] = useState('3');
  const [source, setSource] = useState('');
  const run = useApiMutation(() =>
    api<McqDraftResultDto>(`/api/ai/studio/courses/${courseId}/mcq-drafts`, {
      method: 'POST',
      body: { lessonId, count: Number(count), sourceText: source.trim() || null, language: lang },
    }),
  );
  return (
    <div className="stack" style={{ marginBlockStart: 'var(--space-4)' }}>
      <h3>{t('workspace.mcq.title')}</h3>
      <p className="small muted">{t('workspace.mcq.help')}</p>
      <Field label={t('workspace.mcq.count')}>
        <Select
          value={count}
          onChange={(e) => setCount(e.target.value)}
          options={Array.from({ length: 10 }, (_, i) => String(i + 1)).map((v) => ({
            value: v,
            label: v,
          }))}
        />
      </Field>
      <Field label={t('workspace.mcq.source')}>
        <Textarea rows={3} value={source} onChange={(e) => setSource(e.target.value)} />
      </Field>
      <div>
        <Button variant="secondary" loading={run.isPending} onClick={() => run.mutate(undefined)}>
          {t('workspace.mcq.generate')}
        </Button>
      </div>
      <WsError error={run.error} />
      {run.data ? (
        <Notice
          tone="success"
          title={t('workspace.mcq.created', { n: run.data.createdQuestionIds.length })}
        >
          <p style={{ marginBlockStart: 0 }}>
            <Link to={`/studio/courses/${courseId}?tab=questions`}>
              {t('workspace.mcq.openBank')}
            </Link>
          </p>
          <ul className="small">
            {run.data.createdQuestionIds.map((id) => (
              <li key={id} className="mono">
                {id}
              </li>
            ))}
          </ul>
          {run.data.rejected.length > 0 ? (
            <>
              <p>{t('workspace.mcq.rejected', { n: run.data.rejected.length })}</p>
              <ul className="small">
                {run.data.rejected.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          ) : null}
        </Notice>
      ) : null}
    </div>
  );
}

// ---------- staff: AI usage ----------
function thisMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function AdminAiUsagePage() {
  const { t, fmtNumber, fmtMoney } = useI18n();
  usePageMeta(t('workspace.aiAdmin.title'), undefined, { noindex: true });
  const [period, setPeriod] = useState(thisMonth());
  const [course, setCourse] = useState('');
  const toast = useToast();
  const usage = useQuery({
    queryKey: wsKeys.aiAdminUsage(period),
    queryFn: () => api<AdminUsageDto>(`/api/admin/ai/usage?period=${encodeURIComponent(period)}`),
    enabled: /^\d{4}-\d{2}$/.test(period),
  });
  const reindex = useApiMutation(
    (id: string) => api(`/api/admin/ai/courses/${id}/reindex`, { method: 'POST' }),
    [],
    () => toast.success(t('workspace.aiAdmin.reindexed')),
  );
  const table = (title: string, rows: UsageRowDto[]) => (
    <section>
      <h2>{title}</h2>
      {rows.length === 0 ? (
        <p className="muted">{t('workspace.charts.noData')}</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">{t('workspace.aiAdmin.key')}</th>
                <th scope="col">{t('workspace.aiAdmin.input')}</th>
                <th scope="col">{t('workspace.aiAdmin.output')}</th>
                <th scope="col">{t('workspace.aiAdmin.calls')}</th>
                <th scope="col">{t('workspace.aiAdmin.cost')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key}>
                  <td className="mono">{r.key}</td>
                  <td>{fmtNumber(r.inputTokens)}</td>
                  <td>{fmtNumber(r.outputTokens)}</td>
                  <td>{fmtNumber(r.calls)}</td>
                  <td>{fmtMoney(r.costEstimate, 'USD')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
  return (
    <>
      <PageHeader title={t('workspace.aiAdmin.title')} />
      <AiStatusNote />
      <Field label={t('workspace.aiAdmin.period')} hint="yyyy-MM">
        <Input type="month" value={period} onChange={(e) => setPeriod(e.target.value)} />
      </Field>
      <QueryState query={usage}>
        {(u) => (
          <div className="stack">
            <div className="ws-stats">
              <StatTile
                label={t('workspace.aiAdmin.totalTokens')}
                value={fmtNumber(u.totalTokens)}
              />
              <StatTile
                label={t('workspace.aiAdmin.totalCost')}
                value={fmtMoney(u.totalCost, 'USD')}
              />
              <StatTile
                label={t('workspace.aiAdmin.globalLimit')}
                value={fmtNumber(u.globalLimit)}
                hint={
                  u.globalLimit > 0
                    ? t('workspace.aiAdmin.usedPct', {
                        n: Math.round((u.totalTokens / u.globalLimit) * 100),
                      })
                    : undefined
                }
              />
            </div>
            {table(t('workspace.aiAdmin.byFeature'), u.byFeature)}
            {table(t('workspace.aiAdmin.byModel'), u.byModel)}
            {table(t('workspace.aiAdmin.topUsers'), u.topUsers)}
            {table(t('workspace.aiAdmin.byOrg'), u.byOrganization)}
          </div>
        )}
      </QueryState>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          const id = extractGuid(course);
          if (id) reindex.mutate(id);
        }}
      >
        <Field
          label={t('workspace.aiAdmin.reindexCourse')}
          hint={t('workspace.aiAdmin.reindexHint')}
        >
          <Input value={course} onChange={(e) => setCourse(e.target.value)} />
        </Field>
        <Button
          type="submit"
          variant="secondary"
          disabled={!extractGuid(course)}
          loading={reindex.isPending}
        >
          {t('workspace.aiAdmin.reindex')}
        </Button>
      </form>
      <WsError error={reindex.error} />
    </>
  );
}

function AiStatusNote() {
  const { t } = useI18n();
  return (
    <AiGate>
      <Notice tone="success">{t('workspace.aiAdmin.enabled')}</Notice>
    </AiGate>
  );
}
