import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { wsKeys } from '../../api/workspace';
import type {
  LearningStreakDto,
  DailyChallengeDto,
  StudyPathRecommendationDto,
} from '../../api/workspace';
import { Button } from '../../components/ui/Button';
import { Notice } from '../../components/ui/misc';
import { Spinner } from '../../components/ui/Spinner';
import { useToast } from '../../components/ui/Toast';
import { AiGate, WsError } from './common';

export function StudyPathPanel({ courseId }: { courseId: string }) {
  return (
    <AiGate>
      <StudyPathInner courseId={courseId} />
    </AiGate>
  );
}

function StudyPathInner({ courseId }: { courseId: string }) {
  const qc = useQueryClient();
  const toast = useToast();
  const [error, setError] = useState<unknown>(null);
  const [optimizing, setOptimizing] = useState(false);
  const [recommendation, setRecommendation] = useState<StudyPathRecommendationDto | null>(null);
  const [generatingChallenge, setGeneratingChallenge] = useState(false);
  const [challenge, setChallenge] = useState<DailyChallengeDto | null>(null);
  const [completing, setCompleting] = useState(false);

  const streak = useQuery({
    queryKey: wsKeys.studyPathStreak,
    queryFn: () => api<LearningStreakDto>('/api/studypath/streak'),
  });

  const optimizePath = async () => {
    if (optimizing) return;
    setOptimizing(true);
    setError(null);
    try {
      const result = await api<StudyPathRecommendationDto>(
        `/api/studypath/${encodeURIComponent(courseId)}/optimal`,
      );
      setRecommendation(result);
    } catch (e) {
      setError(e);
    } finally {
      setOptimizing(false);
    }
  };

  const generateChallenge = async () => {
    if (generatingChallenge) return;
    setGeneratingChallenge(true);
    setError(null);
    try {
      const result = await api<DailyChallengeDto>(
        `/api/studypath/${encodeURIComponent(courseId)}/daily-challenge`,
        { method: 'POST' },
      );
      setChallenge(result);
    } catch (e) {
      setError(e);
    } finally {
      setGeneratingChallenge(false);
    }
  };

  const completeChallenge = async () => {
    if (!challenge || completing) return;
    setCompleting(true);
    try {
      await api(`/api/studypath/challenges/${challenge.id}/complete`, { method: 'POST' });
      setChallenge({ ...challenge, completed: true });
      // Record 5 minutes of activity for completing a challenge
      await api<LearningStreakDto>('/api/studypath/activity', {
        method: 'POST',
        body: { minutes: 5 },
      });
      void qc.invalidateQueries({ queryKey: wsKeys.studyPathStreak });
      toast.success('Challenge completed!');
    } catch (e) {
      setError(e);
    } finally {
      setCompleting(false);
    }
  };

  const streakData = streak.data;
  const weeklyPct = streakData
    ? Math.min(100, Math.round((streakData.totalMinutesThisWeek / streakData.weeklyGoalMinutes) * 100))
    : 0;

  return (
    <div className="stack">
      {/* Streak Display */}
      <div className="card card--flat">
        <div className="row row--between">
          <div>
            <h3 style={{ margin: 0 }}>Learning Streak</h3>
            {streak.isLoading ? (
              <Spinner label="Loading streak..." />
            ) : streakData ? (
              <div style={{ marginBlockStart: 'var(--space-2)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                  {streakData.currentStreak} day{streakData.currentStreak !== 1 ? 's' : ''} {'🔥'}
                </div>
                <p className="small muted" style={{ margin: 0 }}>
                  Longest streak: {streakData.longestStreak} day{streakData.longestStreak !== 1 ? 's' : ''}
                </p>
              </div>
            ) : (
              <p className="muted">Start learning to build your streak!</p>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Goal */}
      {streakData ? (
        <div className="card card--flat">
          <h3 style={{ margin: 0 }}>Weekly Goal</h3>
          <p className="small muted" style={{ marginBlock: 'var(--space-1)' }}>
            {streakData.totalMinutesThisWeek} / {streakData.weeklyGoalMinutes} minutes
          </p>
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
                width: `${weeklyPct}%`,
                height: '100%',
                background: weeklyPct >= 100 ? 'var(--color-success)' : 'var(--color-accent)',
                borderRadius: 'var(--radius-sm)',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <p className="small" style={{ marginBlockStart: 'var(--space-1)', margin: 0 }}>
            {weeklyPct >= 100 ? 'Goal reached!' : `${weeklyPct}% complete`}
          </p>
        </div>
      ) : null}

      {/* Daily Challenge */}
      <div className="card card--flat stack">
        <h3 style={{ margin: 0 }}>Daily Challenge</h3>
        {challenge ? (
          <div>
            <div
              style={{
                padding: 'var(--space-3)',
                background: 'var(--surface-2)',
                borderRadius: 'var(--radius)',
              }}
            >
              <span className="badge" style={{ marginBlockEnd: 'var(--space-2)', display: 'inline-block' }}>
                {challenge.challenge.type}
              </span>
              <p style={{ margin: 0, fontWeight: 600 }}>{challenge.challenge.question}</p>
              {challenge.challenge.hint ? (
                <p className="small muted" style={{ marginBlockStart: 'var(--space-2)', margin: 0 }}>
                  Hint: {challenge.challenge.hint}
                </p>
              ) : null}
            </div>
            {challenge.completed ? (
              <Notice tone="success">Challenge completed!</Notice>
            ) : (
              <Button
                size="sm"
                loading={completing}
                onClick={() => void completeChallenge()}
                style={{ marginBlockStart: 'var(--space-2)' }}
              >
                Mark Complete
              </Button>
            )}
          </div>
        ) : (
          <Button
            variant="secondary"
            loading={generatingChallenge}
            onClick={() => void generateChallenge()}
          >
            Generate Today's Challenge
          </Button>
        )}
      </div>

      {/* Optimize Path */}
      <div className="card card--flat stack">
        <h3 style={{ margin: 0 }}>AI Path Optimizer</h3>
        <p className="small muted" style={{ margin: 0 }}>
          Let AI analyze your progress and recommend the best lesson order.
        </p>
        <Button loading={optimizing} onClick={() => void optimizePath()}>
          Optimize My Path
        </Button>
        {recommendation ? (
          <div style={{ marginBlockStart: 'var(--space-3)' }}>
            <Notice tone="info">
              Estimated time: {recommendation.estimatedMinutes} minutes
            </Notice>
            <div style={{ marginBlockStart: 'var(--space-2)' }}>
              <h4 style={{ margin: 0 }}>Reasoning</h4>
              <p className="small" style={{ marginBlock: 'var(--space-1)' }}>
                {recommendation.reasoning}
              </p>
            </div>
            {recommendation.optimalOrder.length > 0 ? (
              <div style={{ marginBlockStart: 'var(--space-2)' }}>
                <h4 style={{ margin: 0 }}>Recommended Order</h4>
                <ol className="small" style={{ paddingInlineStart: 'var(--space-4)', marginBlockStart: 'var(--space-1)' }}>
                  {recommendation.optimalOrder.map((item, i) => (
                    <li key={item.lessonId || i} style={{ marginBlockEnd: 'var(--space-1)' }}>
                      <strong>{item.title}</strong>
                      {item.reason ? <span className="muted"> &mdash; {item.reason}</span> : null}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <WsError error={error} />
    </div>
  );
}
