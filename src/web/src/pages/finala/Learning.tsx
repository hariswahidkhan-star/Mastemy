import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, downloadFile } from '../../api/client';
import { practiceApi, SELF_GRADES } from '../../api/finala';
import type { AssessmentNegativeMarking, RegradePreviewDto, ReviewCardDto } from '../../api/finala';
import { Button } from '../../components/ui/Button';
import { Notice, QueryState } from '../../components/ui/misc';
import { RichContent } from '../../components/RichContent';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { FinalaError, finalaError } from './shared';

// ---------- self-graded spaced review ----------

/**
 * After an item is checked the learner may rate their own recall (SM-2 quality 0–5). The choice replaces
 * the automatic step for that item; the server allows one self-grade per item.
 */
export function SelfGradePanel({
  sessionId,
  itemId,
  initial,
}: {
  sessionId: string;
  itemId: string;
  initial?: number | null;
}) {
  const { t, fmtDate } = useI18n();
  const [graded, setGraded] = useState<number | null>(initial ?? null);
  const [card, setCard] = useState<ReviewCardDto | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState<unknown>(null);
  const grade = async (q: number) => {
    setBusy(q);
    setError(null);
    try {
      const c = await practiceApi.selfGrade(sessionId, itemId, q);
      setCard(c);
      setGraded(q);
    } catch (e) {
      setError(e);
    } finally {
      setBusy(null);
    }
  };
  if (graded !== null)
    return (
      <p className="small muted" aria-live="polite" data-testid="self-graded">
        {t('finala.sg.done', { label: t(`finala.sg.q${graded}`) })}
        {card ? ` ${t('finala.sg.nextDue', { date: fmtDate(card.dueAt) })}` : ''}
      </p>
    );
  return (
    <fieldset className="finala-selfgrade">
      <legend className="small">{t('finala.sg.legend')}</legend>
      <p className="small muted" style={{ marginBlockStart: 0 }}>
        {t('finala.sg.help')}
      </p>
      <div className="finala-selfgrade__grid">
        {SELF_GRADES.map((q) => (
          <Button
            key={q}
            size="sm"
            variant={q >= 3 ? 'secondary' : 'ghost'}
            loading={busy === q}
            disabled={busy !== null}
            onClick={() => void grade(q)}
            aria-label={`${q} – ${t(`finala.sg.q${q}`)}`}
          >
            <span aria-hidden="true" className="finala-selfgrade__n">
              {q}
            </span>{' '}
            {t(`finala.sg.q${q}`)}
          </Button>
        ))}
      </div>
      <FinalaError error={error} />
    </fieldset>
  );
}

// ---------- bookmarks ----------

/** Bookmarks a practice item or a submitted exam item; the server resolves the question (ids stay hidden). */
export function BookmarkItemButton({
  source,
  ownerId,
  itemId,
}: {
  source: 'practice' | 'attempt';
  ownerId: string;
  itemId: string;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const run = async () => {
    setBusy(true);
    try {
      if (source === 'practice') await practiceApi.bookmarkPracticeItem(ownerId, itemId);
      else await practiceApi.bookmarkAttemptItem(ownerId, itemId);
      setDone(true);
      toast.success(t('finala.bm.added'));
    } catch (e) {
      toast.error(finalaError(e, t));
    } finally {
      setBusy(false);
    }
  };
  return (
    <Button
      size="sm"
      variant="ghost"
      loading={busy}
      disabled={done}
      aria-pressed={done}
      onClick={() => void run()}
    >
      {done ? t('finala.bm.saved') : t('finala.bm.add')}
    </Button>
  );
}

// ---------- worked solution ----------

export function WorkedSolutionPanel({ source }: { source?: string | null }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  if (!source) return null;
  return (
    <div className="finala-worked">
      <Button size="sm" variant="ghost" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? t('finala.worked.hide') : t('finala.worked.show')}
      </Button>
      {open ? (
        <section className="finala-worked__body" aria-label={t('finala.worked.title')}>
          <RichContent source={source} />
        </section>
      ) : null}
    </div>
  );
}

// ---------- negative marking ----------

function useAssessmentSummary(assessmentId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['finala', 'assessment', assessmentId],
    queryFn: () => api<AssessmentNegativeMarking>(`/api/assessments/${assessmentId}`),
    enabled,
    staleTime: 60_000,
  });
}

export function negativeMarkingText(
  t: (k: string, v?: Record<string, string | number>) => string,
  rate: number,
  rules?: string | null,
): string {
  return rules?.trim() ? rules : t('finala.neg.rule', { rate });
}

/**
 * Disclosed before an attempt: wrong answers deduct `rate` × points; unanswered items never lose marks.
 * `rate` comes from the published assessment list; the authoritative wording from GET /api/assessments/{id}.
 */
export function NegativeMarkingDisclosure({
  assessmentId,
  rate,
}: {
  assessmentId: string;
  rate?: number | null;
}) {
  const { t } = useI18n();
  const has = (rate ?? 0) > 0;
  const summary = useAssessmentSummary(assessmentId, has);
  if (!has) return null;
  const r = summary.data?.negativeMarkingPerWrong ?? rate ?? 0;
  return (
    <Notice tone="warning" title={t('finala.neg.title')}>
      <span data-testid="negative-marking">
        {negativeMarkingText(t, r, summary.data?.negativeMarkingRules)}
      </span>{' '}
      <span className="small">{t('finala.neg.unanswered')}</span>
    </Notice>
  );
}

/** Shown with results: reminds how the score was computed when negative marking applied. */
export function NegativeMarkingResultNotice({
  assessmentId,
  incorrect,
}: {
  assessmentId: string;
  incorrect: number;
}) {
  const { t } = useI18n();
  const summary = useAssessmentSummary(assessmentId, !!assessmentId);
  const rate = summary.data?.negativeMarkingPerWrong ?? 0;
  if (!summary.data || rate <= 0) return null;
  return (
    <Notice tone="info" title={t('finala.neg.resultTitle')}>
      <span data-testid="negative-marking-result">
        {negativeMarkingText(t, rate, summary.data.negativeMarkingRules)}{' '}
        {t('finala.neg.resultDeduction', {
          n: incorrect,
          points: Math.round(rate * incorrect * 10000) / 10000,
        })}
      </span>
    </Notice>
  );
}

// ---------- staff: regrade preview / template preview ----------

/** Dry run of a proposed regrade (nothing is written) shown before approval. */
export function RegradePreviewPanel({ regradeId }: { regradeId: string }) {
  const { t, fmtNumber } = useI18n();
  const preview = useQuery({
    queryKey: ['finala', 'regrade-preview', regradeId],
    queryFn: () => api<RegradePreviewDto>(`/api/review/regrades/${regradeId}/preview`),
  });
  return (
    <section className="card card--flat stack" aria-labelledby={`rp-${regradeId}`}>
      <h3 id={`rp-${regradeId}`} style={{ margin: 0 }}>
        {t('finala.regrade.title')}
      </h3>
      <p className="small muted">{t('finala.regrade.help')}</p>
      {preview.isError ? <FinalaError error={preview.error} /> : null}
      <QueryState query={preview}>
        {(p) => (
          <>
            <dl className="facts" data-testid="regrade-preview">
              <div>
                <dt>{t('finala.regrade.affected')}</dt>
                <dd>{fmtNumber(p.affectedAttempts)}</dd>
              </div>
              <div>
                <dt>{t('finala.regrade.changed')}</dt>
                <dd>{fmtNumber(p.changedAttempts)}</dd>
              </div>
              <div>
                <dt>{t('finala.regrade.newlyPassing')}</dt>
                <dd>{fmtNumber(p.newlyPassing)}</dd>
              </div>
              <div>
                <dt>{t('finala.regrade.newlyFailing')}</dt>
                <dd>{fmtNumber(p.newlyFailing)}</dd>
              </div>
              <div>
                <dt>{t('finala.regrade.certsToFlag')}</dt>
                <dd>{fmtNumber(p.certificatesToFlag)}</dd>
              </div>
            </dl>
            {p.results.length > 0 ? (
              <div className="table-wrap">
                <table className="table small">
                  <caption>{t('finala.regrade.rows')}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t('finala.regrade.attempt')}</th>
                      <th scope="col">{t('finala.regrade.old')}</th>
                      <th scope="col">{t('finala.regrade.new')}</th>
                      <th scope="col">{t('finala.regrade.pass')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.results.map((r) => (
                      <tr key={r.attemptId}>
                        <td className="mono">{r.attemptId.slice(0, 8)}</td>
                        <td>{fmtNumber(r.oldScorePercent)}%</td>
                        <td>{fmtNumber(r.newScorePercent)}%</td>
                        <td>
                          {t(r.oldPassed ? 'result.passed' : 'result.notPassed')}
                          {r.oldPassed !== r.newPassed
                            ? ` → ${t(r.newPassed ? 'result.passed' : 'result.notPassed')}`
                            : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="small muted">{t('finala.regrade.noRows')}</p>
            )}
          </>
        )}
      </QueryState>
    </section>
  );
}

export function TemplatePreviewButton({ templateId }: { templateId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  return (
    <Button
      size="sm"
      variant="secondary"
      loading={busy}
      onClick={() => {
        setBusy(true);
        downloadFile(
          `/api/admin/certificate-templates/${templateId}/preview.pdf`,
          `certificate-template-preview-${templateId.slice(0, 8)}.pdf`,
        )
          .catch((e) => toast.error(finalaError(e, t)))
          .finally(() => setBusy(false));
      }}
    >
      {t('finala.template.preview')}
    </Button>
  );
}
