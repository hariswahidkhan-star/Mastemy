import { useCallback, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { keys } from '../../api/hooks';
import type {
  AttemptItemView,
  AttemptResult,
  AttemptView,
  PracticeCheck,
  ReviewItem,
} from '../../api/types';
import { ButtonLink } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { AttemptPlayer } from './AttemptPlayer';

function rationaleFor(review: ReviewItem, optionId: string): string | undefined {
  const r = review.rationales;
  if (!r) return undefined;
  if (Array.isArray(r)) return r.find((x) => x.optionId === optionId)?.text;
  return r[optionId];
}

export function AttemptResultView({
  result,
  items,
}: {
  result: AttemptResult;
  items: AttemptItemView[];
}) {
  const { t } = useI18n();
  const byId = new Map(items.map((i) => [i.itemId, i]));
  return (
    <div className="stack">
      <div className="card">
        <div className="row row--between">
          <div>
            <div className="small muted">{t('result.score')}</div>
            <div className="score">{Math.round(result.scorePercent * 10) / 10}%</div>
          </div>
          <Badge tone={result.passed ? 'success' : 'danger'}>
            {result.passed ? t('result.passed') : t('result.notPassed')}
          </Badge>
        </div>
        <div
          className="meter"
          role="img"
          aria-label={t('result.meter', { score: result.scorePercent, pass: result.passPercent })}
        >
          <span style={{ inlineSize: `${Math.min(100, Math.max(0, result.scorePercent))}%` }} />
        </div>
        <p className="small muted" style={{ marginBlockStart: 'var(--space-2)' }}>
          {t('result.passThreshold', { pass: result.passPercent })}
        </p>
        <dl className="facts">
          <div>
            <dt>{t('result.correct')}</dt>
            <dd>{result.correct}</dd>
          </div>
          <div>
            <dt>{t('result.incorrect')}</dt>
            <dd>{result.incorrect}</dd>
          </div>
          <div>
            <dt>{t('result.unanswered')}</dt>
            <dd>{result.unanswered}</dd>
          </div>
        </dl>
        {result.certificateCode ? (
          <Notice tone="success" title={t('result.certificateTitle')}>
            <Link to={`/verify/${encodeURIComponent(result.certificateCode)}`}>
              {t('result.viewCertificate')}
            </Link>
          </Notice>
        ) : null}
        <p className="small muted">{t('result.disclaimer')}</p>
      </div>
      {result.topics.length > 0 ? (
        <div className="card">
          <h2>{t('result.topics')}</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">{t('result.topic')}</th>
                  <th scope="col">{t('result.correct')}</th>
                  <th scope="col">{t('result.percent')}</th>
                </tr>
              </thead>
              <tbody>
                {result.topics.map((tp) => (
                  <tr key={tp.tag}>
                    <td>{tp.tag}</td>
                    <td>
                      {tp.correct} / {tp.total}
                    </td>
                    <td>{tp.total ? Math.round((tp.correct / tp.total) * 100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {result.review && result.review.length > 0 ? (
        <div className="card">
          <h2>{t('result.review')}</h2>
          <ol className="stack">
            {result.review.map((r) => {
              const item = byId.get(r.itemId);
              const selected = r.selectedOptionIds ?? item?.selectedOptionIds ?? [];
              return (
                <li key={r.itemId}>
                  <p style={{ fontWeight: 600, whiteSpace: 'pre-wrap' }}>
                    {r.stem ?? item?.stem}{' '}
                    <Badge tone={r.correct ? 'success' : 'danger'}>
                      {r.correct ? t('result.itemCorrect') : t('result.itemIncorrect')}
                    </Badge>
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {(item?.options ?? []).map((o) => {
                      const isCorrect = r.correctOptionIds.includes(o.id);
                      const chosen = selected.includes(o.id);
                      return (
                        <li
                          key={o.id}
                          className={
                            isCorrect
                              ? 'option option--correct'
                              : chosen
                                ? 'option option--incorrect'
                                : 'option'
                          }
                        >
                          <span>
                            <span>
                              {o.text} {chosen ? <Badge>{t('result.yourAnswer')}</Badge> : null}{' '}
                              {isCorrect ? (
                                <Badge tone="success">{t('result.correctAnswer')}</Badge>
                              ) : null}
                            </span>
                            {rationaleFor(r, o.id) ? (
                              <span className="small muted" style={{ display: 'block' }}>
                                {rationaleFor(r, o.id)}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {r.explanation ? <p className="small">{r.explanation}</p> : null}
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <p className="muted small">{t('result.reviewWithheld')}</p>
      )}
      <div className="row">
        <ButtonLink to="/me" variant="secondary">
          {t('nav.dashboard')}
        </ButtonLink>
      </div>
    </div>
  );
}

export function AttemptPage() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  const toast = useToast();
  const qc = useQueryClient();
  usePageMeta(t('attempt.title'), undefined, { noindex: true });
  const attempt = useQuery({
    queryKey: ['attempt', id],
    queryFn: () => api<AttemptView>(`/api/attempts/${id}`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const chain = useRef<Promise<unknown>>(Promise.resolve());

  const onSave = useCallback(
    (itemId: string, selectedOptionIds: string[], flagged: boolean) => {
      // Serialize writes so a slower earlier save can never overwrite a newer answer.
      const next = chain.current.then(() =>
        api(`/api/attempts/${id}/items/${itemId}`, {
          method: 'PUT',
          body: { selectedOptionIds, flagged },
        }),
      );
      chain.current = next.catch(() => undefined);
      return next.then(() => undefined);
    },
    [id],
  );

  const onSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      await chain.current;
      const res = await api<AttemptResult>(`/api/attempts/${id}/submit`, { method: 'POST' });
      setResult(res);
      void qc.invalidateQueries({ queryKey: keys.dashboard });
      window.scrollTo({ top: 0 });
    } catch (e) {
      toast.error(errorMessage(e, t));
    } finally {
      setSubmitting(false);
    }
  }, [id, qc, toast, t]);

  const onCheck = useCallback(
    (itemId: string) =>
      api<PracticeCheck>(`/api/attempts/${id}/items/${itemId}/check`, { method: 'POST' }),
    [id],
  );

  return (
    <div className="container page">
      <QueryState query={attempt}>
        {(a) => {
          const finalResult = result ?? a.result ?? null;
          return (
            <>
              <PageHeader
                title={a.assessmentTitle ?? t('attempt.title')}
                subtitle={
                  finalResult
                    ? t('result.title')
                    : a.mode
                      ? t(`assessment.mode.${a.mode}`)
                      : undefined
                }
              />
              {finalResult ? (
                <AttemptResultView result={finalResult} items={a.items} />
              ) : a.status !== 'InProgress' ? (
                <Notice tone="info">{t('attempt.closed')}</Notice>
              ) : (
                <AttemptPlayer
                  attempt={a}
                  onSave={onSave}
                  onSubmit={onSubmit}
                  onCheck={a.mode === 'Practice' ? onCheck : undefined}
                  submitting={submitting}
                />
              )}
            </>
          );
        }}
      </QueryState>
    </div>
  );
}
