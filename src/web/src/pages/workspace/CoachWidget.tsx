import { useState } from 'react';
import { api } from '../../api/client';
import type { CoachHintDto } from '../../api/workspace';
import { Button } from '../../components/ui/Button';
import { Notice } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { AiGate, WsError } from './common';

export function CoachWidget({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  return (
    <AiGate>
      <CoachInner courseId={courseId} lessonId={lessonId} />
    </AiGate>
  );
}

function CoachInner({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const toast = useToast();
  const [context, setContext] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [hint, setHint] = useState<CoachHintDto | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const requestHint = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const result = await api<CoachHintDto>('/api/ai/coach/hint', {
        method: 'POST',
        body: {
          courseId,
          lessonId,
          context: context || 'I am working on the lab exercise and could use a nudge.',
          currentCode: currentCode || null,
        },
      });
      setHint(result);
      setTimeout(() => setHint(null), 15000);
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };

  const requestEncouragement = async (action: string) => {
    try {
      const result = await api<CoachHintDto>('/api/ai/coach/encourage', {
        method: 'POST',
        body: { courseId, action },
      });
      toast.success(result.hintText);
    } catch {
      // best effort
    }
  };

  const hintTone = (type: string): 'info' | 'warning' | 'success' => {
    switch (type) {
      case 'Warning': return 'warning';
      case 'Encouragement': return 'success';
      default: return 'info';
    }
  };

  return (
    <div className="stack">
      <Notice tone="info">
        Your AI Coach watches your progress and offers contextual hints when you need them.
        Describe what you are working on, optionally paste your code, and ask for a nudge.
      </Notice>

      <div>
        <label className="small" htmlFor="coach-context">
          <strong>What are you working on?</strong>
        </label>
        <textarea
          id="coach-context"
          className="field__input"
          rows={2}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g., Trying to implement a binary search but my loop never terminates..."
          maxLength={1000}
        />
      </div>

      <div>
        <label className="small" htmlFor="coach-code">
          <strong>Current code (optional)</strong>
        </label>
        <textarea
          id="coach-code"
          className="field__input"
          rows={4}
          value={currentCode}
          onChange={(e) => setCurrentCode(e.target.value)}
          placeholder="Paste your current code here..."
          maxLength={3000}
          style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)' }}
        />
      </div>

      <div className="row">
        <Button loading={busy} onClick={() => void requestHint()}>
          Need a Hint?
        </Button>
        <Button
          variant="secondary"
          onClick={() => void requestEncouragement('completed a practice exercise')}
        >
          Celebrate Progress
        </Button>
      </div>

      <WsError error={error} />

      {hint ? (
        <Notice tone={hintTone(hint.hintType)} title={hint.hintType}>
          {hint.hintText}
        </Notice>
      ) : null}
    </div>
  );
}
