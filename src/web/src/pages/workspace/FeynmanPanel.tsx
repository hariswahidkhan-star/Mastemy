import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { wsKeys } from '../../api/workspace';
import type {
  FeynmanDone,
  FeynmanRubricDto,
  FeynmanSessionDto,
  FeynmanStartResult,
} from '../../api/workspace';
import { Markdown } from '../../components/Markdown';
import { Button } from '../../components/ui/Button';
import { Field, Input, Select } from '../../components/ui/Field';
import { Notice } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { postSse } from '../../lib/sse';
import { AiGate, WsError } from './common';

const MAX_MESSAGE = 3000;

interface ChatMsg {
  key: string;
  role: string;
  content: string;
  streaming?: boolean;
}

export function FeynmanPanel({ courseId }: { courseId: string }) {
  return (
    <AiGate>
      <FeynmanInner courseId={courseId} />
    </AiGate>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  const tone = pct >= 80 ? 'var(--color-success)' : pct >= 60 ? 'var(--color-warning)' : 'var(--color-danger)';
  return (
    <div style={{ marginBlock: 'var(--space-2)' }}>
      <div className="row row--between small" style={{ marginBlockEnd: 'var(--space-1)' }}>
        <span>{label}</span>
        <strong>{value}/100</strong>
      </div>
      <div
        style={{
          background: 'var(--surface-2)',
          borderRadius: 'var(--radius-sm)',
          height: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: tone,
            borderRadius: 'var(--radius-sm)',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  );
}

function FeynmanInner({ courseId }: { courseId: string }) {
  const { t } = useI18n();
  const qc = useQueryClient();
  const toast = useToast();
  const [topic, setTopic] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [maxExchanges] = useState(5);
  const [canEvaluate, setCanEvaluate] = useState(false);
  const [rubric, setRubric] = useState<FeynmanRubricDto | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const abort = useRef<AbortController | null>(null);

  const sessions = useQuery({
    queryKey: wsKeys.feynmanSessions(courseId),
    queryFn: () =>
      api<FeynmanSessionDto[]>(
        `/api/ai/feynman/sessions?courseId=${encodeURIComponent(courseId)}`,
      ),
  });

  const startSession = async () => {
    const t2 = topic.trim();
    if (!t2 || busy) return;
    setBusy(true);
    setError(null);
    setRubric(null);
    try {
      const result = await api<FeynmanStartResult>('/api/ai/feynman/start', {
        method: 'POST',
        body: { courseId, topic: t2 },
      });
      setSessionId(result.session.id);
      setExchangeCount(0);
      setCanEvaluate(false);
      setMessages([
        { key: 'a0', role: 'assistant', content: result.aiMessage },
      ]);
      void qc.invalidateQueries({ queryKey: wsKeys.feynmanSessions(courseId) });
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };

  const sendExplanation = async () => {
    const content = draft.trim();
    if (!content || busy || !sessionId) return;
    setBusy(true);
    setError(null);
    setStreamError(null);
    try {
      const stamp = Date.now();
      let reply: ChatMsg = { key: `a${stamp}`, role: 'assistant', content: '', streaming: true };
      setMessages((prev) => [
        ...prev,
        { key: `u${stamp}`, role: 'user', content, streaming: false },
        reply,
      ]);
      setDraft('');
      abort.current = new AbortController();
      await postSse(
        `/api/ai/feynman/${sessionId}/explain`,
        { message: content },
        (m) => {
          let parsed: unknown;
          try { parsed = JSON.parse(m.data); } catch { return; }
          if (m.event === 'delta') {
            reply = { ...reply, content: reply.content + ((parsed as { text?: string }).text ?? '') };
            setMessages((prev) => [...prev.slice(0, -1), reply]);
          } else if (m.event === 'done') {
            const d = parsed as FeynmanDone;
            reply = { ...reply, content: d.content, streaming: false };
            setMessages((prev) => [...prev.slice(0, -1), reply]);
            setExchangeCount(d.exchangeCount);
            setCanEvaluate(d.canEvaluate);
          } else if (m.event === 'error') {
            const e = parsed as { code?: string; message?: string };
            setStreamError(e.code ?? e.message ?? 'error');
          }
        },
        abort.current.signal,
      );
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };

  const evaluate = async () => {
    if (!sessionId || evaluating) return;
    setEvaluating(true);
    setError(null);
    try {
      const result = await api<FeynmanRubricDto>(`/api/ai/feynman/${sessionId}/evaluate`, {
        method: 'POST',
      });
      setRubric(result);
      void qc.invalidateQueries({ queryKey: wsKeys.feynmanSessions(courseId) });
    } catch (e) {
      setError(e);
    } finally {
      setEvaluating(false);
    }
  };

  const resetSession = () => {
    setSessionId(null);
    setMessages([]);
    setDraft('');
    setExchangeCount(0);
    setCanEvaluate(false);
    setRubric(null);
    setTopic('');
  };

  // No active session: show start UI
  if (!sessionId) {
    return (
      <div className="stack">
        <Notice tone="info">
          Prove your mastery by explaining a concept. You will teach it to a curious AI student who will ask you probing questions. After a few exchanges, you will get a detailed rubric score.
        </Notice>
        {sessions.data && sessions.data.length > 0 ? (
          <details className="card card--flat">
            <summary className="small"><strong>Previous sessions ({sessions.data.length})</strong></summary>
            <ul className="small" style={{ listStyle: 'none', padding: 0, marginBlockStart: 'var(--space-2)' }}>
              {sessions.data.map((s) => (
                <li key={s.id} style={{ paddingBlock: 'var(--space-1)' }}>
                  <strong>{s.topic}</strong>
                  <span className="muted"> &middot; {s.exchangeCount} exchanges</span>
                  {s.evaluated ? <span style={{ color: 'var(--color-success)' }}> &middot; Evaluated</span> : null}
                </li>
              ))}
            </ul>
          </details>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void startSession();
          }}
        >
          <Field
            label="What concept will you explain?"
            hint="Enter a topic from your course (e.g., 'Binary Search Trees', 'HTTP Status Codes', 'Supply and Demand')"
          >
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={500}
              placeholder="Enter a topic..."
            />
          </Field>
          <Button type="submit" loading={busy} disabled={!topic.trim()}>
            Start Explaining
          </Button>
        </form>
        <WsError error={error} />
      </div>
    );
  }

  // Active session
  return (
    <div className="stack">
      <div className="row row--between">
        <div>
          <strong>Topic:</strong> {messages.length > 0 ? topic || 'Explanation Session' : 'Loading...'}
        </div>
        <div className="row">
          <span className="small muted">
            Exchange {exchangeCount} of {maxExchanges}
          </span>
          <Button variant="ghost" size="sm" onClick={resetSession}>
            New Topic
          </Button>
        </div>
      </div>

      <div className="ws-chat" aria-live="polite" aria-busy={busy}>
        {messages.map((m) => (
          <div
            key={m.key}
            className={m.role === 'user' ? 'ws-msg ws-msg--user' : 'ws-msg'}
          >
            <div className="small muted">
              {m.role === 'user' ? 'You (Teacher)' : 'Student (AI)'}
            </div>
            {m.streaming && !m.content ? (
              <p className="muted" style={{ margin: 0 }}>Thinking...</p>
            ) : m.role === 'user' ? (
              <p className="pre-wrap" style={{ margin: 0 }}>{m.content}</p>
            ) : (
              <Markdown source={m.content} />
            )}
          </div>
        ))}
      </div>

      {streamError ? (
        <Notice tone="danger">
          An error occurred during the conversation. Please try again.
        </Notice>
      ) : null}
      <WsError error={error} />

      {rubric ? (
        <div className="card card--flat stack">
          <h3 style={{ margin: 0 }}>Your Mastery Score</h3>
          <div
            style={{
              textAlign: 'center',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: rubric.overallMastery >= 70 ? 'var(--color-success)' : rubric.overallMastery >= 50 ? 'var(--color-warning)' : 'var(--color-danger)',
              paddingBlock: 'var(--space-2)',
            }}
          >
            {rubric.overallMastery}%
          </div>
          <ScoreBar label="Accuracy" value={rubric.accuracy} />
          <ScoreBar label="Completeness" value={rubric.completeness} />
          <ScoreBar label="Depth" value={rubric.depth} />
          <ScoreBar label="Clarity" value={rubric.clarity} />

          {rubric.misconceptions.length > 0 ? (
            <Notice tone="warning" title="Misconceptions Detected">
              <ul style={{ margin: 0, paddingInlineStart: 'var(--space-4)' }}>
                {rubric.misconceptions.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </Notice>
          ) : null}

          {rubric.feedback.wellExplained.length > 0 ? (
            <div>
              <h4 style={{ margin: 0, marginBlockEnd: 'var(--space-1)' }}>Well Explained</h4>
              <ul className="small" style={{ margin: 0, paddingInlineStart: 'var(--space-4)' }}>
                {rubric.feedback.wellExplained.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          ) : null}

          {rubric.feedback.needsWork.length > 0 ? (
            <div>
              <h4 style={{ margin: 0, marginBlockEnd: 'var(--space-1)' }}>Needs Work</h4>
              <ul className="small" style={{ margin: 0, paddingInlineStart: 'var(--space-4)' }}>
                {rubric.feedback.needsWork.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </div>
          ) : null}

          {rubric.feedback.summary ? (
            <p className="small" style={{ margin: 0, fontStyle: 'italic' }}>{rubric.feedback.summary}</p>
          ) : null}

          <Button variant="secondary" onClick={resetSession}>Try Another Topic</Button>
        </div>
      ) : (
        <>
          {canEvaluate && !rubric ? (
            <Button variant="secondary" loading={evaluating} onClick={() => void evaluate()}>
              Get My Score
            </Button>
          ) : null}
          {exchangeCount < maxExchanges ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void sendExplanation();
              }}
            >
              <Field
                label="Your explanation"
                hint={`${MAX_MESSAGE - draft.length} characters remaining`}
              >
                <textarea
                  className="field__input"
                  rows={4}
                  value={draft}
                  maxLength={MAX_MESSAGE}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Explain the concept..."
                />
              </Field>
              <Button type="submit" loading={busy} disabled={!draft.trim()}>
                Send Explanation
              </Button>
            </form>
          ) : !canEvaluate ? (
            <Notice tone="info">Maximum exchanges reached.</Notice>
          ) : null}
        </>
      )}
    </div>
  );
}
