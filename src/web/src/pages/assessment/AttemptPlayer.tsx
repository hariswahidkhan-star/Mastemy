import { useEffect, useRef, useState } from 'react';
import type { AttemptItemView, AttemptView, PracticeCheck } from '../../api/types';
import type { AttemptCaseDto, AttemptPauseState } from '../../api/exams';
import { RichContent } from '../../components/RichContent';
import { AccommodationNotice, CaseExhibit, PauseControls } from '../exams/AttemptExtras';
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
  /** Pause/resume (only offered when the server's pause state allows it); returns the refreshed view. */
  onPause?: () => Promise<WaveAttempt>;
  onResume?: () => Promise<WaveAttempt>;
}

/** Wave 3 fields of AttemptView (case exhibits, pause state, accommodations). */
export type WaveAttempt = AttemptView & {
  cases?: AttemptCaseDto[] | null;
  pause?: AttemptPauseState | null;
  extraTimePercent?: number | null;
  untimed?: boolean;
  items: (AttemptItemView & { caseGroupId?: string | null })[];
};

/**
 * Renders an in-progress attempt. It never receives or renders correctness for exam items;
 * correctness only appears after the server returns an AttemptResult (or a practice check the learner asked for).
 */
export function AttemptPlayer({
  attempt: initialAttempt,
  onSave,
  onSubmit,
  onCheck,
  submitting,
  onPause,
  onResume,
}: Props & { attempt: WaveAttempt }) {
  const { t } = useI18n();
  const [attempt, setAttempt] = useState<WaveAttempt>(initialAttempt);
  const [items, setItems] = useState<WaveAttempt['items']>(initialAttempt.items);
  const [index, setIndex] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [checks, setChecks] = useState<Record<string, PracticeCheck>>({});
  const remaining = useServerCountdown(attempt.deadlineAt, attempt.serverNow);
  const autoSubmitted = useRef(false);
  const questionRef = useRef<HTMLHeadingElement>(null);

  const paused = !!attempt.pause?.paused;
  const frozen =
    paused && attempt.deadlineAt && attempt.pause?.pausedAt
      ? Math.max(0, Date.parse(attempt.deadlineAt) - Date.parse(attempt.pause.pausedAt))
      : null;
  const shown = frozen ?? remaining;
  const expired = !paused && remaining !== null && remaining <= 0;

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
  const exhibit = item.caseGroupId
    ? (attempt.cases ?? []).find((c) => c.caseGroupId === item.caseGroupId)
    : undefined;

  const question = (
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
          <RichContent source={item.stem} inline />
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
                <RichContent source={o.text} inline />
                {check?.rationales?.[o.id] ? (
                  <span className="small muted" style={{ display: 'block' }}>
                    <RichContent source={check.rationales[o.id]} inline />
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
  );

  return (
    <div className="attempt-layout">
      <div className="stack">
        <AccommodationNotice
          extraTimePercent={attempt.extraTimePercent ?? null}
          untimed={!!attempt.untimed}
        />
        {paused ? (
          <Notice tone="info" title={t('exams.pause.pausedTitle')}>
            {t('exams.pause.pausedBody')}
          </Notice>
        ) : exhibit ? (
          <CaseExhibit exhibit={exhibit}>{question}</CaseExhibit>
        ) : (
          question
        )}
      </div>

      <aside className="card stack" aria-label={t('attempt.navigator')}>
        {shown !== null ? (
          <div>
            <div className="small muted">{t('attempt.timeLeft')}</div>
            <div
              className={shown < 60_000 ? 'timer timer--low' : 'timer'}
              role="timer"
              aria-live={shown < 60_000 && !paused ? 'assertive' : 'off'}
              data-testid="timer"
            >
              {formatCountdown(shown)}
            </div>
          </div>
        ) : (
          <p className="small muted">{t('assessment.untimed')}</p>
        )}
        {attempt.pause?.allowPause && attempt.deadlineAt && (onPause || onResume) ? (
          <PauseControls
            pause={attempt.pause}
            onPause={async () => {
              if (!onPause) return;
              setAttempt(await onPause());
            }}
            onResume={async () => {
              if (!onResume) return;
              setAttempt(await onResume());
            }}
          />
        ) : null}
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
        <Button onClick={() => setConfirmOpen(true)} loading={submitting} disabled={paused}>
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
