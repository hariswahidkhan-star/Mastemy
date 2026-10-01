import { useEffect, useRef, useState } from 'react';
import type { AttemptItemView, AttemptView, PracticeCheck } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { Badge, Notice } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { formatCountdown, useServerCountdown } from '../../lib/countdown';

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface Props {
  attempt: AttemptView;
  /** Persist one item's answer/flag. Called on every change (autosave). */
  onSave: (itemId: string, selectedOptionIds: string[], flagged: boolean) => Promise<void>;
  onSubmit: () => Promise<void>;
  /** Practice mode only: ask the server to check one item. */
  onCheck?: (itemId: string) => Promise<PracticeCheck>;
  submitting?: boolean;
}

/**
 * Renders an in-progress attempt. It never receives or renders correctness for exam items;
 * correctness only appears after the server returns an AttemptResult (or a practice check the learner asked for).
 */
export function AttemptPlayer({ attempt, onSave, onSubmit, onCheck, submitting }: Props) {
  const { t } = useI18n();
  const [items, setItems] = useState<AttemptItemView[]>(attempt.items);
  const [index, setIndex] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [checks, setChecks] = useState<Record<string, PracticeCheck>>({});
  const remaining = useServerCountdown(attempt.deadlineAt, attempt.serverNow);
  const autoSubmitted = useRef(false);
  const questionRef = useRef<HTMLHeadingElement>(null);

  const expired = remaining !== null && remaining <= 0;

  useEffect(() => {
    if (expired && !autoSubmitted.current) {
      autoSubmitted.current = true;
      void onSubmit();
    }
  }, [expired, onSubmit]);

  const item = items[index];
  const unanswered = items
    .map((it, i) => ({ it, n: i + 1 }))
    .filter(({ it }) => it.selectedOptionIds.length === 0);

  const persist = async (next: AttemptItemView) => {
    setItems((list) => list.map((i) => (i.itemId === next.itemId ? next : i)));
    setSaveState('saving');
    try {
      await onSave(next.itemId, next.selectedOptionIds, next.flagged);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
  };

  const toggleOption = (optionId: string) => {
    if (!item || expired) return;
    const selected =
      item.type === 'SingleChoice'
        ? [optionId]
        : item.selectedOptionIds.includes(optionId)
          ? item.selectedOptionIds.filter((id) => id !== optionId)
          : [...item.selectedOptionIds, optionId];
    void persist({ ...item, selectedOptionIds: selected });
  };

  const goTo = (i: number) => {
    setIndex(i);
    requestAnimationFrame(() => questionRef.current?.focus());
  };

  if (!item) return <Notice tone="warning">{t('attempt.noItems')}</Notice>;
  const check = checks[item.itemId];
  const multi = item.type === 'MultipleSelect';

  return (
    <div className="attempt-layout">
      <div className="card question">
        <div className="row row--between" style={{ marginBlockEnd: 'var(--space-3)' }}>
          <h2 ref={questionRef} tabIndex={-1} style={{ margin: 0, fontSize: 'var(--text-md)' }}>
            {t('attempt.questionOf', { n: index + 1, total: items.length })}
          </h2>
          <Badge tone={multi ? 'warning' : 'neutral'}>
            {multi ? t('attempt.multiple') : t('attempt.single')}
          </Badge>
        </div>
        <fieldset disabled={expired}>
          <legend>
            <span style={{ whiteSpace: 'pre-wrap' }}>{item.stem}</span>
            {multi ? (
              <span
                className="small"
                style={{ display: 'block', marginBlockStart: 'var(--space-2)', fontWeight: 700 }}
              >
                {t('attempt.selectAll')}
              </span>
            ) : null}
          </legend>
          {item.options.map((o) => {
            const checked = item.selectedOptionIds.includes(o.id);
            const cls = check
              ? check.correctOptionIds.includes(o.id)
                ? 'option option--correct'
                : checked
                  ? 'option option--incorrect'
                  : 'option'
              : 'option';
            return (
              <label key={o.id} className={cls}>
                <input
                  type={multi ? 'checkbox' : 'radio'}
                  name={`q-${item.itemId}`}
                  value={o.id}
                  checked={checked}
                  onChange={() => toggleOption(o.id)}
                />
                <span>
                  <span style={{ whiteSpace: 'pre-wrap' }}>{o.text}</span>
                  {check?.rationales?.[o.id] ? (
                    <span className="small muted" style={{ display: 'block' }}>
                      {check.rationales[o.id]}
                    </span>
                  ) : null}
                </span>
              </label>
            );
          })}
        </fieldset>
        {check ? (
          <Notice tone={check.correct ? 'success' : 'warning'}>
            {check.correct ? t('attempt.checkCorrect') : t('attempt.checkIncorrect')}
          </Notice>
        ) : null}
        <div className="row row--between" style={{ marginBlockStart: 'var(--space-4)' }}>
          <div className="row">
            <Button
              variant="secondary"
              size="sm"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
              {t('common.previous')}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={index === items.length - 1}
              onClick={() => goTo(index + 1)}
            >
              {t('common.next')}
            </Button>
          </div>
          <div className="row">
            <Button
              variant="ghost"
              size="sm"
              aria-pressed={item.flagged}
              disabled={expired}
              onClick={() => void persist({ ...item, flagged: !item.flagged })}
            >
              {item.flagged ? t('attempt.unflag') : t('attempt.flag')}
            </Button>
            {onCheck ? (
              <Button
                variant="secondary"
                size="sm"
                disabled={item.selectedOptionIds.length === 0 || !!check}
                onClick={() => {
                  void onCheck(item.itemId).then((res) =>
                    setChecks((c) => ({ ...c, [item.itemId]: res })),
                  );
                }}
              >
                {t('attempt.check')}
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <aside className="card stack" aria-label={t('attempt.navigator')}>
        {remaining !== null ? (
          <div>
            <div className="small muted">{t('attempt.timeLeft')}</div>
            <div
              className={remaining < 60_000 ? 'timer timer--low' : 'timer'}
              role="timer"
              aria-live={remaining < 60_000 ? 'assertive' : 'off'}
              data-testid="timer"
            >
              {formatCountdown(remaining)}
            </div>
          </div>
        ) : (
          <p className="small muted">{t('assessment.untimed')}</p>
        )}
        <p className="small" aria-live="polite">
          {saveState === 'saving'
            ? t('attempt.saving')
            : saveState === 'saved'
              ? t('attempt.saved')
              : saveState === 'error'
                ? t('attempt.saveError')
                : t('attempt.autosave')}
        </p>
        <ol className="navigator">
          {items.map((it, i) => (
            <li key={it.itemId}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === index ? 'true' : undefined}
                data-answered={it.selectedOptionIds.length > 0}
                data-flagged={it.flagged}
                aria-label={t('attempt.navItem', {
                  n: i + 1,
                  state: [
                    it.selectedOptionIds.length > 0
                      ? t('attempt.answered')
                      : t('attempt.unanswered'),
                    it.flagged ? t('attempt.flagged') : '',
                  ]
                    .filter(Boolean)
                    .join(', '),
                })}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <Button onClick={() => setConfirmOpen(true)} loading={submitting}>
          {t('attempt.submit')}
        </Button>
      </aside>

      <ConfirmDialog
        open={confirmOpen}
        title={t('attempt.confirmTitle')}
        confirmLabel={t('attempt.submit')}
        loading={submitting}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          void onSubmit();
        }}
        body={
          unanswered.length === 0 ? (
            <p>{t('attempt.confirmAllAnswered')}</p>
          ) : (
            <>
              <p>{t('attempt.confirmUnanswered', { n: unanswered.length })}</p>
              <ul
                className="row"
                style={{ listStyle: 'none', padding: 0 }}
                aria-label={t('attempt.unansweredList')}
              >
                {unanswered.map(({ it, n }) => (
                  <li key={it.itemId}>
                    <Badge tone="warning">{t('attempt.qn', { n })}</Badge>
                  </li>
                ))}
              </ul>
            </>
          )
        }
      />
    </div>
  );
}
