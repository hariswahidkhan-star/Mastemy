import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { Markdown } from '../../components/Markdown';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Field';
import { Badge, Notice, QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { postSse } from '../../lib/sse';
import { AiGate, WsError } from './common';

const MAX_MESSAGE = 2000;

// ---------- Types ----------
interface ScenarioTemplateDto {
  id: number;
  courseId: string | null;
  title: string;
  description: string;
  category: string;
  characterName: string;
  characterRole: string;
  situationBrief: string;
  maxTurns: number;
  difficulty: string;
  createdUtc: string;
}

interface ScenarioMessageDto {
  role: string;
  content: string;
  timestamp: string;
}

interface ScenarioDimensionScoreDto {
  dimension: string;
  score: number;
  weight: number;
  feedback: string;
}

interface ScenarioSessionDetailDto {
  id: number;
  templateId: number;
  templateTitle: string;
  characterName: string;
  characterRole: string;
  category: string;
  situationBrief: string;
  turnCount: number;
  maxTurns: number;
  isCompleted: boolean;
  transcript: ScenarioMessageDto[];
  scores: ScenarioDimensionScoreDto[] | null;
  overallScore: number | null;
  summaryFeedback: string | null;
  startedUtc: string;
  completedUtc: string | null;
}

interface ScenarioSessionDto {
  id: number;
  templateId: number;
  templateTitle: string;
  characterName: string;
  category: string;
  turnCount: number;
  maxTurns: number;
  isCompleted: boolean;
  overallScore: number | null;
  startedUtc: string;
  completedUtc: string | null;
}

const scenarioKeys = {
  templates: (courseId?: string) => ['scenario', 'templates', courseId ?? 'all'] as const,
  sessions: (courseId?: string) => ['scenario', 'sessions', courseId ?? 'all'] as const,
  session: (id: number) => ['scenario', 'session', id] as const,
};

const CATEGORY_LABELS: Record<string, string> = {
  ClientMeeting: 'Client Meeting',
  Interview: 'Interview',
  IncidentResponse: 'Incident Response',
  Negotiation: 'Negotiation',
  Presentation: 'Presentation',
  Audit: 'Audit',
  Consultation: 'Consultation',
  Management: 'Management',
  CrisisManagement: 'Crisis Management',
  CustomerService: 'Customer Service',
};

const DIFFICULTY_TONES: Record<string, 'info' | 'warning' | 'danger'> = {
  Beginner: 'info',
  Intermediate: 'warning',
  Advanced: 'danger',
};

// ---------- Main panel ----------
export function ScenarioPanel({ courseId }: { courseId?: string }) {
  return (
    <AiGate>
      <ScenarioInner courseId={courseId} />
    </AiGate>
  );
}

type View =
  | { kind: 'browse' }
  | { kind: 'briefing'; template: ScenarioTemplateDto }
  | { kind: 'active'; sessionId: number }
  | { kind: 'results'; sessionId: number }
  | { kind: 'history' };

function ScenarioInner({ courseId }: { courseId?: string }) {
  const [view, setView] = useState<View>({ kind: 'browse' });

  if (view.kind === 'briefing')
    return (
      <BriefingScreen
        template={view.template}
        onBack={() => setView({ kind: 'browse' })}
        onStart={(sessionId) => setView({ kind: 'active', sessionId })}
      />
    );
  if (view.kind === 'active')
    return (
      <ActiveScenario
        sessionId={view.sessionId}
        onComplete={() => setView({ kind: 'results', sessionId: view.sessionId })}
        onBack={() => setView({ kind: 'browse' })}
      />
    );
  if (view.kind === 'results')
    return (
      <ResultsScreen
        sessionId={view.sessionId}
        onBack={() => setView({ kind: 'browse' })}
      />
    );
  if (view.kind === 'history')
    return (
      <HistoryScreen
        courseId={courseId}
        onBack={() => setView({ kind: 'browse' })}
        onView={(id, completed) =>
          setView(completed ? { kind: 'results', sessionId: id } : { kind: 'active', sessionId: id })
        }
      />
    );
  return (
    <BrowseScreen
      courseId={courseId}
      onSelect={(t) => setView({ kind: 'briefing', template: t })}
      onHistory={() => setView({ kind: 'history' })}
    />
  );
}

// ---------- Browse ----------
function BrowseScreen({
  courseId,
  onSelect,
  onHistory,
}: {
  courseId?: string;
  onSelect: (t: ScenarioTemplateDto) => void;
  onHistory: () => void;
}) {
  const templates = useQuery({
    queryKey: scenarioKeys.templates(courseId),
    queryFn: () =>
      api<ScenarioTemplateDto[]>(
        `/api/scenarios/templates${courseId ? `?courseId=${encodeURIComponent(courseId)}` : ''}`,
      ),
  });

  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Scenario Simulations</h2>
        <Button variant="secondary" size="sm" onClick={onHistory}>
          My History
        </Button>
      </div>
      <Notice tone="info">
        Practice real-world professional scenarios with AI characters. Get scored on your performance across multiple dimensions.
      </Notice>
      <QueryState query={templates}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">No scenarios available yet.</p>
          ) : (
            <div className="grid" style={{ gap: 'var(--space-3)' }}>
              {list.map((t) => (
                <button
                  key={t.id}
                  className="card card--flat"
                  style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid var(--border)' }}
                  onClick={() => onSelect(t)}
                >
                  <div className="row" style={{ gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
                    <Badge tone={DIFFICULTY_TONES[t.difficulty] ?? 'info'}>{t.difficulty}</Badge>
                    <Badge tone="info">{CATEGORY_LABELS[t.category] ?? t.category}</Badge>
                  </div>
                  <strong>{t.title}</strong>
                  <p className="small muted" style={{ margin: 'var(--space-1) 0 var(--space-2)' }}>
                    {t.description}
                  </p>
                  <div className="small muted">
                    <strong>{t.characterName}</strong> &middot; {t.characterRole} &middot; {t.maxTurns} turns
                  </div>
                </button>
              ))}
            </div>
          )
        }
      </QueryState>
    </div>
  );
}

// ---------- Briefing ----------
function BriefingScreen({
  template,
  onBack,
  onStart,
}: {
  template: ScenarioTemplateDto;
  onBack: () => void;
  onStart: (sessionId: number) => void;
}) {
  const start = useApiMutation(
    () =>
      api<ScenarioSessionDetailDto>('/api/scenarios/sessions', {
        method: 'POST',
        body: { templateId: template.id },
      }),
    [],
    (session) => onStart(session.id),
  );

  return (
    <div className="stack">
      <Button variant="ghost" size="sm" onClick={onBack}>
        &larr; Back to scenarios
      </Button>
      <h2>{template.title}</h2>
      <div className="row" style={{ gap: 'var(--space-2)' }}>
        <Badge tone={DIFFICULTY_TONES[template.difficulty] ?? 'info'}>{template.difficulty}</Badge>
        <Badge tone="info">{CATEGORY_LABELS[template.category] ?? template.category}</Badge>
        <span className="small muted">{template.maxTurns} turns max</span>
      </div>

      <div className="card card--flat" style={{ background: 'var(--surface-raised)' }}>
        <h3 style={{ margin: '0 0 var(--space-2)' }}>Your Briefing</h3>
        <div style={{ whiteSpace: 'pre-wrap' }}>{template.situationBrief}</div>
      </div>

      <div className="card card--flat">
        <h3 style={{ margin: '0 0 var(--space-1)' }}>You will be speaking with</h3>
        <p style={{ margin: 0 }}>
          <strong>{template.characterName}</strong> &mdash; {template.characterRole}
        </p>
      </div>

      <Button loading={start.isPending} onClick={() => start.mutate(undefined)}>
        Begin Scenario
      </Button>
      <WsError error={start.error} />
    </div>
  );
}

// ---------- Active scenario ----------
function ActiveScenario({
  sessionId,
  onComplete,
  onBack,
}: {
  sessionId: number;
  onComplete: () => void;
  onBack: () => void;
}) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [liveReply, setLiveReply] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const chatEnd = useRef<HTMLDivElement | null>(null);

  const session = useQuery({
    queryKey: scenarioKeys.session(sessionId),
    queryFn: () => api<ScenarioSessionDetailDto>(`/api/scenarios/sessions/${sessionId}`),
  });

  const data = session.data;
  const turnCount = data?.turnCount ?? 0;
  const maxTurns = data?.maxTurns ?? 10;

  const send = async () => {
    const content = draft.trim();
    if (!content || busy) return;
    setBusy(true);
    setError(null);
    setStreamError(null);
    setLiveReply('');
    setDraft('');
    abort.current = new AbortController();
    try {
      await postSse(
        `/api/scenarios/sessions/${sessionId}/respond`,
        { message: content },
        (m) => {
          let parsed: unknown;
          try { parsed = JSON.parse(m.data); } catch { return; }
          if (m.event === 'delta') {
            setLiveReply((prev) => (prev ?? '') + ((parsed as { text?: string }).text ?? ''));
          } else if (m.event === 'done') {
            setLiveReply(null);
            const d = parsed as { maxReached?: boolean };
            if (d.maxReached) {
              // Auto-complete after max turns
            }
          } else if (m.event === 'error') {
            const e = parsed as { code?: string; message?: string };
            setStreamError(e.message ?? e.code ?? 'error');
          }
        },
        abort.current.signal,
      );
      await qc.invalidateQueries({ queryKey: scenarioKeys.session(sessionId) });
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
      setLiveReply(null);
    }
  };

  const complete = async () => {
    setCompleting(true);
    setError(null);
    try {
      await api(`/api/scenarios/sessions/${sessionId}/complete`, { method: 'POST' });
      onComplete();
    } catch (e) {
      setError(e);
    } finally {
      setCompleting(false);
    }
  };

  const transcript = data?.transcript ?? [];
  const characterName = data?.characterName ?? 'Character';

  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="ghost" size="sm" onClick={onBack}>
          &larr; Exit
        </Button>
        <div className="row" style={{ gap: 'var(--space-2)', alignItems: 'center' }}>
          <span className="small" style={{ fontWeight: 600 }}>
            Turn {turnCount} of {maxTurns}
          </span>
          <div
            style={{
              width: 120,
              height: 6,
              borderRadius: 3,
              background: 'var(--border)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.min(100, (turnCount / maxTurns) * 100)}%`,
                height: '100%',
                background: turnCount >= maxTurns ? 'var(--danger)' : 'var(--primary)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      {data && (
        <div className="small muted" style={{ textAlign: 'center' }}>
          <strong>{data.templateTitle}</strong> &mdash; Speaking with {characterName} ({data.characterRole})
        </div>
      )}

      <div className="ws-chat" aria-live="polite" aria-busy={busy} style={{ minHeight: 200 }}>
        {transcript.map((m, i) => (
          <div
            key={i}
            className={m.role === 'user' ? 'ws-msg ws-msg--user' : 'ws-msg'}
          >
            <div className="small muted" style={{ fontWeight: 600 }}>
              {m.role === 'user' ? 'You' : characterName}
            </div>
            {m.role === 'user' ? (
              <p className="pre-wrap" style={{ margin: 0 }}>{m.content}</p>
            ) : (
              <Markdown source={m.content} />
            )}
          </div>
        ))}
        {liveReply !== null && (
          <div className="ws-msg">
            <div className="small muted" style={{ fontWeight: 600 }}>{characterName}</div>
            {liveReply ? <Markdown source={liveReply} /> : (
              <p className="muted" style={{ margin: 0 }}>Thinking...</p>
            )}
          </div>
        )}
        <div ref={chatEnd} />
      </div>

      {streamError && <Notice tone="danger">{streamError}</Notice>}
      <WsError error={error} />

      {data?.isCompleted ? (
        <Notice tone="info">This scenario has been completed.</Notice>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <Textarea
              rows={3}
              value={draft}
              maxLength={MAX_MESSAGE}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your response..."
            />
            <div className="row" style={{ marginTop: 'var(--space-2)', gap: 'var(--space-2)' }}>
              <Button type="submit" loading={busy} disabled={!draft.trim()}>
                Send
              </Button>
              <Button
                variant="secondary"
                loading={completing}
                disabled={busy || turnCount === 0}
                onClick={complete}
              >
                End Scenario
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

// ---------- Results ----------
function ResultsScreen({
  sessionId,
  onBack,
}: {
  sessionId: number;
  onBack: () => void;
}) {
  const session = useQuery({
    queryKey: scenarioKeys.session(sessionId),
    queryFn: () => api<ScenarioSessionDetailDto>(`/api/scenarios/sessions/${sessionId}`),
  });

  return (
    <div className="stack">
      <Button variant="ghost" size="sm" onClick={onBack}>
        &larr; Back to scenarios
      </Button>
      <QueryState query={session}>
        {(data) => (
          <div className="stack">
            <h2>{data.templateTitle} &mdash; Results</h2>
            <div className="row" style={{ gap: 'var(--space-2)' }}>
              <Badge tone="info">{CATEGORY_LABELS[data.category] ?? data.category}</Badge>
              <span className="small muted">
                {data.turnCount} turns &middot; Completed{' '}
                {data.completedUtc ? new Date(data.completedUtc).toLocaleDateString() : ''}
              </span>
            </div>

            {/* Overall score */}
            {data.overallScore != null && (
              <div
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-4)',
                  background: 'var(--surface-raised)',
                  borderRadius: 'var(--radius)',
                }}
              >
                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: scoreColor(data.overallScore),
                    lineHeight: 1,
                  }}
                >
                  {Math.round(data.overallScore)}
                </div>
                <div className="small muted" style={{ marginTop: 'var(--space-1)' }}>
                  Overall Score
                </div>
              </div>
            )}

            {/* Dimension scores */}
            {data.scores && data.scores.length > 0 && (
              <div className="stack" style={{ gap: 'var(--space-3)' }}>
                <h3>Performance Breakdown</h3>
                {data.scores.map((s) => (
                  <div key={s.dimension} className="card card--flat">
                    <div
                      className="row"
                      style={{ justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}
                    >
                      <strong>{s.dimension}</strong>
                      <span style={{ fontWeight: 600, color: scoreColor(s.score) }}>
                        {Math.round(s.score)}/100
                      </span>
                    </div>
                    {/* Bar */}
                    <div
                      style={{
                        width: '100%',
                        height: 8,
                        borderRadius: 4,
                        background: 'var(--border)',
                        overflow: 'hidden',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      <div
                        style={{
                          width: `${s.score}%`,
                          height: '100%',
                          background: scoreColor(s.score),
                          borderRadius: 4,
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                    <p className="small" style={{ margin: 0 }}>
                      {s.feedback}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Summary feedback */}
            {data.summaryFeedback && (
              <div className="card card--flat">
                <h3 style={{ margin: '0 0 var(--space-2)' }}>Overall Assessment</h3>
                <Markdown source={data.summaryFeedback} />
              </div>
            )}

            {/* Transcript */}
            {data.transcript.length > 0 && (
              <details className="card card--flat">
                <summary>
                  <strong>Full Transcript</strong> ({data.transcript.length} messages)
                </summary>
                <div className="ws-chat" style={{ marginTop: 'var(--space-2)' }}>
                  {data.transcript.map((m, i) => (
                    <div
                      key={i}
                      className={m.role === 'user' ? 'ws-msg ws-msg--user' : 'ws-msg'}
                    >
                      <div className="small muted" style={{ fontWeight: 600 }}>
                        {m.role === 'user' ? 'You' : data.characterName}
                      </div>
                      {m.role === 'user' ? (
                        <p className="pre-wrap" style={{ margin: 0 }}>{m.content}</p>
                      ) : (
                        <Markdown source={m.content} />
                      )}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </QueryState>
    </div>
  );
}

// ---------- History ----------
function HistoryScreen({
  courseId,
  onBack,
  onView,
}: {
  courseId?: string;
  onBack: () => void;
  onView: (id: number, completed: boolean) => void;
}) {
  const sessions = useQuery({
    queryKey: scenarioKeys.sessions(courseId),
    queryFn: () =>
      api<ScenarioSessionDto[]>(
        `/api/scenarios/sessions${courseId ? `?courseId=${encodeURIComponent(courseId)}` : ''}`,
      ),
  });

  return (
    <div className="stack">
      <Button variant="ghost" size="sm" onClick={onBack}>
        &larr; Back to scenarios
      </Button>
      <h2>My Scenario History</h2>
      <QueryState query={sessions}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">No completed scenarios yet.</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Scenario</th>
                    <th scope="col">Character</th>
                    <th scope="col">Turns</th>
                    <th scope="col">Score</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => (
                    <tr key={s.id}>
                      <td>{s.templateTitle}</td>
                      <td className="small">{s.characterName}</td>
                      <td>
                        {s.turnCount}/{s.maxTurns}
                      </td>
                      <td>
                        {s.overallScore != null ? (
                          <span style={{ fontWeight: 600, color: scoreColor(s.overallScore) }}>
                            {Math.round(s.overallScore)}
                          </span>
                        ) : (
                          <span className="muted">&mdash;</span>
                        )}
                      </td>
                      <td>
                        <Badge tone={s.isCompleted ? 'success' : 'warning'}>
                          {s.isCompleted ? 'Completed' : 'In Progress'}
                        </Badge>
                      </td>
                      <td className="small">{new Date(s.startedUtc).toLocaleDateString()}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onView(s.id, s.isCompleted)}
                        >
                          {s.isCompleted ? 'View Results' : 'Continue'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
    </div>
  );
}

// ---------- Helpers ----------
function scoreColor(score: number): string {
  if (score >= 80) return 'var(--success)';
  if (score >= 60) return 'var(--warning)';
  return 'var(--danger)';
}
