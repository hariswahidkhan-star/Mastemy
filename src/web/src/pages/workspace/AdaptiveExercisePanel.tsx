import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { wsKeys } from '../../api/workspace';
import type { GeneratedExerciseDto } from '../../api/workspace';
import { Markdown } from '../../components/Markdown';
import { Button } from '../../components/ui/Button';
import { Notice } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { AiGate, WsError } from './common';

const WEAK_AREA_OPTIONS = [
  'Algorithms',
  'Data Structures',
  'Debugging',
  'Error Handling',
  'Performance',
  'Testing',
  'Design Patterns',
  'SQL',
  'APIs',
  'Security',
];

export function AdaptiveExercisePanel({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  return (
    <AiGate>
      <ExerciseInner courseId={courseId} lessonId={lessonId} />
    </AiGate>
  );
}

function ExerciseInner({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const toast = useToast();
  const qc = useQueryClient();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [current, setCurrent] = useState<GeneratedExerciseDto | null>(null);
  const [generating, setGenerating] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [revealedHints, setRevealedHints] = useState(0);

  const history = useQuery({
    queryKey: wsKeys.exerciseHistory(courseId),
    queryFn: () =>
      api<GeneratedExerciseDto[]>(`/api/ai/exercises?courseId=${encodeURIComponent(courseId)}`),
  });

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  const generate = async () => {
    if (generating) return;
    setGenerating(true);
    setError(null);
    setRevealedHints(0);
    try {
      const result = await api<GeneratedExerciseDto>('/api/ai/exercises/generate', {
        method: 'POST',
        body: {
          courseId,
          lessonId,
          weakAreas: selectedAreas.length > 0 ? selectedAreas : null,
        },
      });
      setCurrent(result);
      void qc.invalidateQueries({ queryKey: wsKeys.exerciseHistory(courseId) });
    } catch (e) {
      setError(e);
    } finally {
      setGenerating(false);
    }
  };

  const recordAttempt = async (passed: boolean) => {
    if (!current || recording) return;
    setRecording(true);
    try {
      await api(`/api/ai/exercises/${current.id}/attempt`, {
        method: 'POST',
        body: { passed },
      });
      setCurrent({ ...current, attemptedAt: new Date().toISOString(), passed });
      toast.success(passed ? 'Great job! Exercise marked as completed.' : 'Keep practicing! You will get it next time.');
      void qc.invalidateQueries({ queryKey: wsKeys.exerciseHistory(courseId) });
    } catch (e) {
      setError(e);
    } finally {
      setRecording(false);
    }
  };

  return (
    <div className="stack">
      <Notice tone="info">
        Generate unique practice exercises tailored to your weak areas.
        No two students get the same problems.
      </Notice>

      {!current ? (
        <>
          <div>
            <strong className="small">Focus areas (optional):</strong>
            <div className="row" style={{ flexWrap: 'wrap', gap: 'var(--space-2)', marginBlockStart: 'var(--space-2)' }}>
              {WEAK_AREA_OPTIONS.map((area) => (
                <button
                  key={area}
                  type="button"
                  className={`badge ${selectedAreas.includes(area) ? 'badge--accent' : 'badge--muted'}`}
                  onClick={() => toggleArea(area)}
                  style={{ cursor: 'pointer' }}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <Button loading={generating} onClick={() => void generate()}>
            Generate Practice Exercise
          </Button>

          <WsError error={error} />

          {history.data && history.data.length > 0 ? (
            <details className="card card--flat">
              <summary className="small">
                <strong>Exercise History ({history.data.length})</strong>
              </summary>
              <ul className="small" style={{ listStyle: 'none', padding: 0, marginBlockStart: 'var(--space-2)' }}>
                {history.data.map((ex) => (
                  <li key={ex.id} style={{ paddingBlock: 'var(--space-1)' }}>
                    <strong>{ex.exercise.title}</strong>
                    <span className="muted"> &middot; {ex.skillArea}</span>
                    {ex.passed === true ? (
                      <span style={{ color: 'var(--color-success)' }}> &middot; Passed</span>
                    ) : ex.passed === false ? (
                      <span style={{ color: 'var(--color-danger)' }}> &middot; Failed</span>
                    ) : (
                      <span className="muted"> &middot; Not attempted</span>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </>
      ) : (
        <div className="stack">
          <div className="card card--flat stack">
            <h3 style={{ margin: 0 }}>{current.exercise.title}</h3>
            <div className="small muted">
              Skill area: {current.skillArea} &middot; Difficulty: {current.difficulty}
            </div>

            <div>
              <h4 style={{ margin: 0, marginBlockEnd: 'var(--space-1)' }}>Instructions</h4>
              <Markdown source={current.exercise.instructions} />
            </div>

            {current.exercise.starterCode ? (
              <div>
                <h4 style={{ margin: 0, marginBlockEnd: 'var(--space-1)' }}>Starter Code</h4>
                <pre
                  style={{
                    background: 'var(--surface-2)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'auto',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <code>{current.exercise.starterCode}</code>
                </pre>
              </div>
            ) : null}

            <div>
              <h4 style={{ margin: 0, marginBlockEnd: 'var(--space-1)' }}>Expected Behavior</h4>
              <p className="small">{current.exercise.expectedBehavior}</p>
            </div>

            {current.exercise.hints.length > 0 ? (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRevealedHints((prev) => Math.min(prev + 1, current.exercise.hints.length))}
                  disabled={revealedHints >= current.exercise.hints.length}
                >
                  {revealedHints >= current.exercise.hints.length
                    ? 'All hints revealed'
                    : `Reveal Hint (${revealedHints}/${current.exercise.hints.length})`}
                </Button>
                {revealedHints > 0 ? (
                  <ul className="small" style={{ marginBlockStart: 'var(--space-2)' }}>
                    {current.exercise.hints.slice(0, revealedHints).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>

          <WsError error={error} />

          {current.attemptedAt ? (
            <Notice tone={current.passed ? 'success' : 'warning'}>
              {current.passed ? 'You completed this exercise!' : 'Keep practicing. Try generating another exercise.'}
            </Notice>
          ) : (
            <div className="row">
              <Button loading={recording} onClick={() => void recordAttempt(true)}>
                Mark as Complete
              </Button>
              <Button variant="secondary" loading={recording} onClick={() => void recordAttempt(false)}>
                Mark as Failed
              </Button>
            </div>
          )}

          <Button variant="ghost" onClick={() => setCurrent(null)}>
            Back to Generator
          </Button>
        </div>
      )}
    </div>
  );
}
