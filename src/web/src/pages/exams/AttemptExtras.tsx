import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { examKeys } from '../../api/exams';
import type {
  AttemptCaseDto,
  AttemptPauseState,
  MyChallengeDto,
  RecommendationsDto,
} from '../../api/exams';
import { RichContent } from '../../components/RichContent';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Textarea } from '../../components/ui/Field';
import { Badge, Notice } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import '../../styles/exams.css';

/** Accommodation applied by the server at attempt start (extra time or untimed). */
export function AccommodationNotice({
  extraTimePercent,
  untimed,
}: {
  extraTimePercent: number | null;
  untimed: boolean;
}) {
  const { t } = useI18n();
  if (untimed) {
    return (
      <Notice tone="info" title={t('exams.acc.title')}>
        {t('exams.acc.untimed')}
      </Notice>
    );
  }
  if (extraTimePercent && extraTimePercent > 0) {
    return (
      <Notice tone="info" title={t('exams.acc.title')}>
        {t('exams.acc.extra', { n: extraTimePercent })}
      </Notice>
    );
  }
  return null;
}

/**
 * Case exhibit next to the grouped question: side by side and sticky on wide screens, a collapsible
 * disclosure above the question on narrow ones.
 */
export function CaseExhibit({
  exhibit,
  children,
}: {
  exhibit: Pick<AttemptCaseDto, 'title' | 'exhibitMarkdown'>;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div className="exam-case">
      <details className="card exam-case__exhibit" open>
        <summary>
          <span className="small muted">{t('exams.case.exhibit')}</span>{' '}
          <strong>{exhibit.title}</strong>
        </summary>
        <section aria-label={t('exams.case.exhibitNamed', { title: exhibit.title })}>
          <RichContent source={exhibit.exhibitMarkdown} />
        </section>
      </details>
      <div className="exam-case__question">{children}</div>
    </div>
  );
}

export function PauseControls({
  pause,
  onPause,
  onResume,
}: {
  pause: AttemptPauseState | null | undefined;
  onPause: () => Promise<void>;
  onResume: () => Promise<void>;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  if (!pause?.allowPause) return null;
  const minutes = Math.floor(pause.pauseSecondsRemaining / 60);
  const seconds = pause.pauseSecondsRemaining % 60;
  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      toast.error(errorMessage(e, t));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="stack" style={{ gap: 'var(--space-2)' }}>
      <p className="small" data-testid="pause-budget">
        {t('exams.pause.budget', { m: minutes, s: String(seconds).padStart(2, '0') })}
      </p>
      {pause.paused ? (
        <Button size="sm" loading={busy} onClick={() => void run(onResume)}>
          {t('exams.pause.resume')}
        </Button>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          loading={busy}
          disabled={pause.pauseSecondsRemaining <= 0}
          onClick={() => void run(onPause)}
        >
          {t('exams.pause.pause')}
        </Button>
      )}
    </div>
  );
}

/** "Challenge this question" for reviewed items (attempt review or practice). */
export function ChallengeButton({ path }: { path: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const tooShort = reason.trim().length < 10;
  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      await api<MyChallengeDto>(path, { method: 'POST', body: { reason: reason.trim() } });
      setSent(true);
      setOpen(false);
      toast.success(t('exams.challenge.sent'));
      void qc.invalidateQueries({ queryKey: examKeys.myChallenges });
    } catch (e) {
      setError(errorMessage(e, t));
    } finally {
      setBusy(false);
    }
  };
  if (sent) return <Badge tone="info">{t('exams.challenge.pending')}</Badge>;
  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
        {t('exams.challenge.button')}
      </Button>
      <Dialog
        open={open}
        title={t('exams.challenge.title')}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button loading={busy} disabled={tooShort} onClick={() => void submit()}>
              {t('exams.challenge.submit')}
            </Button>
          </>
        }
      >
        <p className="small">{t('exams.challenge.body')}</p>
        <Field label={t('exams.challenge.reason')} hint={t('exams.challenge.reasonHint')} required>
          <Textarea
            rows={4}
            maxLength={2000}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Field>
        {error ? <Notice tone="danger">{error}</Notice> : null}
      </Dialog>
    </>
  );
}

/** Per-skill accuracy and lesson recommendations for a finished attempt (diagnostics in particular). */
export function RecommendationsPanel({ attemptId, slug }: { attemptId: string; slug?: string }) {
  const { t, fmtNumber } = useI18n();
  const rec = useQuery({
    queryKey: examKeys.recommendations(attemptId),
    queryFn: () => api<RecommendationsDto>(`/api/attempts/${attemptId}/recommendations`),
  });
  if (rec.isPending) return null;
  if (rec.isError) return null;
  const d = rec.data;
  if (d.skills.length === 0 && d.lessons.length === 0) return null;
  return (
    <section className="card" aria-labelledby="rec-h">
      <h2 id="rec-h">
        {d.kind === 'Diagnostic' ? t('exams.rec.diagnosticTitle') : t('exams.rec.title')}
      </h2>
      {d.skills.length > 0 ? (
        <div className="table-wrap">
          <table className="table">
            <caption className="visually-hidden">{t('exams.rec.skills')}</caption>
            <thead>
              <tr>
                <th scope="col">{t('exams.rec.skill')}</th>
                <th scope="col">{t('exams.rec.accuracy')}</th>
                <th scope="col">{t('exams.rec.questions')}</th>
              </tr>
            </thead>
            <tbody>
              {d.skills.map((s) => (
                <tr key={s.skill}>
                  <td>
                    {s.skill || t('exams.rec.noSkill')}{' '}
                    {s.weak ? <Badge tone="warning">{t('exams.rec.weak')}</Badge> : null}
                  </td>
                  <td>{fmtNumber(Math.round(s.accuracyPercent * 10) / 10)}%</td>
                  <td>{s.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <h3>{t('exams.rec.lessons')}</h3>
      {d.lessons.length === 0 ? (
        <p className="muted small">{t('exams.rec.noLessons')}</p>
      ) : (
        <ol className="stack">
          {d.lessons.map((l) => (
            <li key={l.lessonId}>
              {slug ? (
                <Link to={`/learn/${slug}/${l.lessonId}`}>{l.lessonTitle}</Link>
              ) : (
                <strong>{l.lessonTitle}</strong>
              )}{' '}
              <span className="small muted">
                {l.moduleTitle} · {t('exams.rec.misses', { n: l.misses })} ·{' '}
                {l.weakSkills.join(', ')}
              </span>
            </li>
          ))}
        </ol>
      )}
      <Notice tone="warning" title={t('exams.rec.notGuarantee')}>
        {d.readinessDisclaimer}
      </Notice>
    </section>
  );
}
