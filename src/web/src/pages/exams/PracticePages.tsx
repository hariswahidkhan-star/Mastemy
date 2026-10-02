import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { useApiMutation, useDashboard } from '../../api/hooks';
import {
  examKeys,
  useBookmarks,
  useDueReviews,
  useMyChallenges,
  usePracticeSessions,
} from '../../api/exams';
import type {
  CheckResultDto,
  PracticeItemView,
  PracticeResult,
  PracticeSessionInput,
  PracticeSessionView,
} from '../../api/exams';
import type { Difficulty } from '../../api/types';
import { RichContent } from '../../components/RichContent';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Checkbox, Field, Input } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState, QueryStatus } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { CaseExhibit, ChallengeButton } from './AttemptExtras';
import { examError, isPremiumError } from './examErrors';
import { BookmarkItemButton, SelfGradePanel, WorkedSolutionPanel } from '../finala/Learning';

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const splitList = (s: string) =>
  s
    .split(/[,;\n]/)
    .map((x) => x.trim())
    .filter(Boolean);

/** /practice: entry points (builder, mistakes, bookmarks, review), recent sessions, my challenges. */
export function PracticeHubPage() {
  const { t, fmtDate } = useI18n();
  usePageMeta(t('exams.practice.title'), undefined, { noindex: true });
  const sessions = usePracticeSessions();
  const bookmarks = useBookmarks();
  const challenges = useMyChallenges();
  const due = useDueReviews();
  const toast = useToast();
  const removeBookmark = useApiMutation(
    (questionId: string) => api(`/api/me/question-bookmarks/${questionId}`, { method: 'DELETE' }),
    [examKeys.bookmarks],
    () => toast.success(t('exams.bookmarks.removed')),
  );
  return (
    <div className="container page stack">
      <PageHeader
        title={t('exams.practice.title')}
        subtitle={t('exams.practice.subtitle')}
        actions={
          <div className="row">
            <ButtonLink to="/practice/session/new">{t('exams.practice.new')}</ButtonLink>
            <ButtonLink to="/practice/session/new?preset=mistakes" variant="secondary">
              {t('exams.practice.mistakes')}
            </ButtonLink>
            <ButtonLink to="/review" variant="secondary">
              {t('exams.review.link', { n: due.data?.length ?? 0 })}
            </ButtonLink>
          </div>
        }
      />
      <section className="card" aria-labelledby="ps-h">
        <h2 id="ps-h">{t('exams.practice.recent')}</h2>
        <QueryState query={sessions}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('exams.practice.noSessions')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {list.map((s) => (
                  <li key={s.id} className="row row--between">
                    <span>
                      <Link to={`/practice/sessions/${s.id}`}>
                        {t('exams.practice.sessionOf', { date: fmtDate(s.createdAt) })}
                      </Link>{' '}
                      <span className="small muted">
                        {t('exams.practice.answered', { a: s.answered, n: s.items })}
                      </span>
                    </span>
                    {s.finishedAt ? (
                      <Badge tone="success">{t('exams.practice.finished')}</Badge>
                    ) : (
                      <Badge tone="info">{t('exams.practice.open')}</Badge>
                    )}
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
      <section className="card" aria-labelledby="bm-h">
        <div className="row row--between">
          <h2 id="bm-h">{t('exams.bookmarks.title')}</h2>
          {bookmarks.data && bookmarks.data.length > 0 ? (
            <ButtonLink size="sm" variant="secondary" to="/practice/session/new?preset=bookmarked">
              {t('exams.bookmarks.practise')}
            </ButtonLink>
          ) : null}
        </div>
        <QueryState query={bookmarks}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('exams.bookmarks.none')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {list.map((b) => (
                  <li key={b.questionId} className="row row--between">
                    <RichContent source={b.stem} className="small" />
                    <Button
                      size="sm"
                      variant="ghost"
                      loading={
                        removeBookmark.isPending && removeBookmark.variables === b.questionId
                      }
                      onClick={() =>
                        removeBookmark.mutate(b.questionId, {
                          onError: (e) => toast.error(examError(e, t)),
                        })
                      }
                    >
                      {t('exams.bookmarks.remove')}
                    </Button>
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
        <p className="small muted">{t('exams.bookmarks.how')}</p>
      </section>
      <section className="card" aria-labelledby="ch-h">
        <h2 id="ch-h">{t('exams.challenge.mine')}</h2>
        <QueryState query={challenges}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('exams.challenge.noneMine')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {list.map((c) => (
                  <li key={c.id}>
                    <Badge tone={c.status === 'Open' ? 'info' : 'success'}>
                      {t(`exams.challenge.status.${c.status}`)}
                    </Badge>{' '}
                    {c.resolution ? (
                      <Badge>{t(`exams.challenge.resolution.${c.resolution}`)}</Badge>
                    ) : null}{' '}
                    <span className="small">{c.reason}</span>
                    {c.resolutionNote ? (
                      <div className="small muted">
                        {t('exams.challenge.note')}: {c.resolutionNote}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
    </div>
  );
}

/** /practice/session/new: filters → POST /api/practice/sessions. */
export function PracticeBuilderPage() {
  const { t } = useI18n();
  usePageMeta(t('exams.builder.title'), undefined, { noindex: true });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preset = params.get('preset');
  const dashboard = useDashboard();
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [topics, setTopics] = useState('');
  const [skills, setSkills] = useState('');
  const [objectives, setObjectives] = useState('');
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [unseenOnly, setUnseen] = useState(false);
  const [previousMistakes, setMistakes] = useState(preset === 'mistakes');
  const [bookmarkedOnly, setBookmarked] = useState(preset === 'bookmarked');
  const [dueForReview, setDue] = useState(preset === 'due');
  const [count, setCount] = useState(20);
  const create = useApiMutation(
    (body: PracticeSessionInput) =>
      api<PracticeSessionView>('/api/practice/sessions', { method: 'POST', body }),
    [examKeys.practiceSessions],
    (s) => navigate(`/practice/sessions/${s.id}`),
  );
  const courses = dashboard.data?.enrollments.map((e) => e.course) ?? [];
  const countValid = Number.isInteger(count) && count >= 1 && count <= 100;
  return (
    <div className="container page stack">
      <PageHeader title={t('exams.builder.title')} subtitle={t('exams.builder.subtitle')} />
      <QueryStatus query={dashboard} />
      <form
        className="card stack"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!countValid) return;
          create.mutate({
            courseIds: courseIds.length ? courseIds : undefined,
            topics: splitList(topics),
            skills: splitList(skills),
            objectives: splitList(objectives),
            difficulties,
            unseenOnly,
            previousMistakes,
            bookmarkedOnly,
            dueForReview,
            count,
          });
        }}
      >
        <fieldset className="stack" style={{ border: 'none', padding: 0 }}>
          <legend className="field__label">{t('exams.builder.courses')}</legend>
          {courses.length === 0 ? (
            <p className="small muted">{t('exams.builder.allCourses')}</p>
          ) : (
            courses.map((c) => (
              <Checkbox
                key={c.id}
                label={c.title}
                checked={courseIds.includes(c.id)}
                onChange={(e) =>
                  setCourseIds((ids) =>
                    e.target.checked ? [...ids, c.id] : ids.filter((x) => x !== c.id),
                  )
                }
              />
            ))
          )}
          <p className="small muted">{t('exams.builder.coursesHint')}</p>
        </fieldset>
        <div className="split">
          <Field label={t('exams.builder.topics')} hint={t('exams.builder.listHint')}>
            <Input value={topics} onChange={(e) => setTopics(e.target.value)} />
          </Field>
          <Field label={t('exams.builder.skills')} hint={t('exams.builder.listHint')}>
            <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
          </Field>
          <Field label={t('exams.builder.objectives')} hint={t('exams.builder.listHint')}>
            <Input value={objectives} onChange={(e) => setObjectives(e.target.value)} />
          </Field>
          <Field
            label={t('exams.builder.count')}
            error={countValid ? undefined : t('exams.builder.countRule')}
          >
            <Input
              type="number"
              min={1}
              max={100}
              value={Number.isNaN(count) ? '' : count}
              onChange={(e) => setCount(e.target.valueAsNumber)}
            />
          </Field>
        </div>
        <fieldset className="row" style={{ border: 'none', padding: 0 }}>
          <legend className="field__label">{t('exams.builder.difficulty')}</legend>
          {DIFFICULTIES.map((d) => (
            <Checkbox
              key={d}
              label={t(`question.${d}`)}
              checked={difficulties.includes(d)}
              onChange={(e) =>
                setDifficulties((ds) => (e.target.checked ? [...ds, d] : ds.filter((x) => x !== d)))
              }
            />
          ))}
        </fieldset>
        <fieldset className="stack" style={{ border: 'none', padding: 0 }}>
          <legend className="field__label">{t('exams.builder.focus')}</legend>
          <Checkbox
            label={t('exams.builder.unseen')}
            checked={unseenOnly}
            onChange={(e) => setUnseen(e.target.checked)}
          />
          <Checkbox
            label={t('exams.builder.mistakes')}
            checked={previousMistakes}
            onChange={(e) => setMistakes(e.target.checked)}
          />
          <Checkbox
            label={t('exams.builder.bookmarked')}
            checked={bookmarkedOnly}
            onChange={(e) => setBookmarked(e.target.checked)}
          />
          <Checkbox
            label={t('exams.builder.due')}
            checked={dueForReview}
            onChange={(e) => setDue(e.target.checked)}
          />
        </fieldset>
        <Notice tone="info" title={t('exams.builder.premiumTitle')}>
          {t('exams.builder.premiumBody')}
        </Notice>
        {create.isError ? (
          <Notice tone={isPremiumError(create.error) ? 'warning' : 'danger'}>
            {examError(create.error, t)}
          </Notice>
        ) : null}
        <div className="form-actions">
          <Button type="submit" loading={create.isPending} disabled={!countValid}>
            {t('exams.builder.start')}
          </Button>
          <ButtonLink to="/practice" variant="secondary">
            {t('common.cancel')}
          </ButtonLink>
        </div>
      </form>
    </div>
  );
}

function PracticeItemCard({
  sessionId,
  item,
  n,
  total,
  finished,
  reviewMode,
}: {
  sessionId: string;
  item: PracticeItemView;
  n: number;
  total: number;
  finished: boolean;
  reviewMode: boolean;
}) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<string[]>(item.selectedOptionIds);
  const [check, setCheck] = useState<CheckResultDto | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);
  const locked = finished || item.checked || !!check;
  const multi = item.type === 'MultipleSelect';

  const choose = async (optionId: string) => {
    if (locked) return;
    const next = multi
      ? selected.includes(optionId)
        ? selected.filter((x) => x !== optionId)
        : [...selected, optionId]
      : [optionId];
    setSelected(next);
    setError(null);
    try {
      await api(`/api/practice/sessions/${sessionId}/items/${item.itemId}`, {
        method: 'PUT',
        body: { selectedOptionIds: next },
      });
    } catch (e) {
      setError(e);
    }
  };
  const doCheck = async () => {
    setBusy(true);
    setError(null);
    try {
      setCheck(
        await api<CheckResultDto>(
          `/api/practice/sessions/${sessionId}/items/${item.itemId}/check`,
          {
            method: 'POST',
          },
        ),
      );
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };
  const rationale = (id: string) => check?.rationales.find((r) => r.optionId === id)?.rationale;
  const quality = check
    ? check.correct
      ? 4
      : selected.some((s) => check.correctOptionIds.includes(s))
        ? 3
        : 1
    : null;

  const body = (
    <article className="card question" aria-labelledby={`pq-${item.itemId}`}>
      <div className="row row--between">
        <h2 id={`pq-${item.itemId}`} style={{ margin: 0, fontSize: 'var(--text-md)' }}>
          {t('attempt.questionOf', { n, total })}
        </h2>
        <Badge tone={multi ? 'warning' : 'neutral'}>
          {multi ? t('attempt.multiple') : t('attempt.single')}
        </Badge>
      </div>
      <fieldset disabled={locked}>
        <legend>
          <RichContent source={item.stem} inline />
        </legend>
        {item.options.map((o) => {
          const isRight = check?.correctOptionIds.includes(o.id);
          const chosen = selected.includes(o.id);
          const cls = check
            ? isRight
              ? 'option option--correct'
              : chosen
                ? 'option option--incorrect'
                : 'option'
            : 'option';
          return (
            <label key={o.id} className={cls}>
              <input
                type={multi ? 'checkbox' : 'radio'}
                name={`p-${item.itemId}`}
                checked={chosen}
                onChange={() => void choose(o.id)}
              />
              <span>
                <RichContent source={o.text} inline />
                {rationale(o.id) ? (
                  <span className="small muted" style={{ display: 'block' }}>
                    <RichContent source={rationale(o.id) ?? ''} inline />
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </fieldset>
      {check ? (
        <>
          <Notice tone={check.correct ? 'success' : 'warning'}>
            {check.correct ? t('attempt.checkCorrect') : t('attempt.checkIncorrect')}
            {reviewMode && quality !== null ? (
              <span style={{ display: 'block' }} className="small">
                {t(`exams.review.graded${quality}`)}
              </span>
            ) : null}
          </Notice>
          {check.explanation ? <RichContent source={check.explanation} className="small" /> : null}
          <WorkedSolutionPanel source={check.workedSolution} />
          {!finished ? (
            <SelfGradePanel sessionId={sessionId} itemId={item.itemId} initial={item.selfGrade} />
          ) : null}
          <div className="row">
            <BookmarkItemButton source="practice" ownerId={sessionId} itemId={item.itemId} />
            <ChallengeButton
              path={`/api/practice/sessions/${sessionId}/items/${item.itemId}/challenge`}
            />
          </div>
        </>
      ) : item.checked ? (
        <>
          <p className="small muted">{t('exams.practice.alreadyChecked')}</p>
          {!finished ? (
            <SelfGradePanel sessionId={sessionId} itemId={item.itemId} initial={item.selfGrade} />
          ) : null}
          <BookmarkItemButton source="practice" ownerId={sessionId} itemId={item.itemId} />
        </>
      ) : null}
      {error ? (
        <Notice tone={isPremiumError(error) ? 'warning' : 'danger'}>{examError(error, t)}</Notice>
      ) : null}
      {!locked ? (
        <div className="row">
          {reviewMode ? (
            <Button
              size="sm"
              loading={busy}
              disabled={selected.length === 0}
              onClick={() => void doCheck()}
            >
              {t('exams.review.grade')}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              loading={busy}
              disabled={selected.length === 0}
              onClick={() => void doCheck()}
            >
              {t('attempt.check')}
            </Button>
          )}
        </div>
      ) : null}
    </article>
  );
  if (item.caseGroupId && item.caseExhibitMarkdown) {
    return (
      <CaseExhibit
        exhibit={{ title: item.caseTitle ?? '', exhibitMarkdown: item.caseExhibitMarkdown }}
      >
        {body}
      </CaseExhibit>
    );
  }
  return body;
}

/** /practice/sessions/:id — answer, check (locks the item), finish for a full review. */
export function PracticeSessionPage() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  usePageMeta(t('exams.practice.session'), undefined, { noindex: true });
  const [params] = useSearchParams();
  const reviewMode = params.get('mode') === 'review';
  const qc = useQueryClient();
  const session = useQuery({
    queryKey: examKeys.practiceSession(id),
    queryFn: () => api<PracticeSessionView>(`/api/practice/sessions/${id}`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const [result, setResult] = useState<PracticeResult | null>(null);
  const finish = useApiMutation(
    () => api<PracticeResult>(`/api/practice/sessions/${id}/finish`, { method: 'POST' }),
    [examKeys.practiceSessions, examKeys.due],
    (r) => {
      setResult(r);
      void qc.invalidateQueries({ queryKey: examKeys.practiceSession(id) });
    },
  );
  return (
    <div className="container page stack">
      <QueryState query={session}>
        {(s) => (
          <>
            <PageHeader
              title={reviewMode ? t('exams.review.title') : t('exams.practice.session')}
              subtitle={t('exams.practice.sessionSubtitle', { n: s.items.length })}
            />
            {result ? (
              <PracticeResultView result={result} sessionId={s.id} />
            ) : (
              <>
                {s.items.map((it, i) => (
                  <PracticeItemCard
                    key={it.itemId}
                    sessionId={s.id}
                    item={it}
                    n={i + 1}
                    total={s.items.length}
                    finished={!!s.finishedAt}
                    reviewMode={reviewMode}
                  />
                ))}
                {finish.isError ? (
                  <Notice tone="danger">{examError(finish.error, t)}</Notice>
                ) : null}
                <div className="row">
                  <Button loading={finish.isPending} onClick={() => finish.mutate(undefined)}>
                    {s.finishedAt ? t('exams.practice.showReview') : t('exams.practice.finish')}
                  </Button>
                  <ButtonLink to="/practice" variant="secondary">
                    {t('exams.practice.back')}
                  </ButtonLink>
                </div>
              </>
            )}
          </>
        )}
      </QueryState>
    </div>
  );
}

function PracticeResultView({ result, sessionId }: { result: PracticeResult; sessionId: string }) {
  const { t } = useI18n();
  return (
    <div className="stack">
      <section className="card">
        <h2>{t('exams.practice.resultTitle')}</h2>
        <dl className="facts">
          <div>
            <dt>{t('result.correct')}</dt>
            <dd data-testid="practice-correct">
              {result.correct} / {result.total}
            </dd>
          </div>
          <div>
            <dt>{t('exams.practice.answeredLabel')}</dt>
            <dd>{result.answered}</dd>
          </div>
        </dl>
        <Notice tone="warning" title={t('exams.rec.notGuarantee')}>
          {result.readinessDisclaimer}
        </Notice>
      </section>
      <section className="card">
        <h2>{t('result.review')}</h2>
        <ol className="stack">
          {result.review.map((r) => (
            <li key={r.itemId}>
              <div style={{ fontWeight: 600 }}>
                <RichContent source={r.stem} />{' '}
                <Badge tone={r.correct ? 'success' : 'danger'}>
                  {r.correct ? t('result.itemCorrect') : t('result.itemIncorrect')}
                </Badge>
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {r.options.map((o) => (
                  <li
                    key={o.id}
                    className={
                      o.isCorrect
                        ? 'option option--correct'
                        : o.selected
                          ? 'option option--incorrect'
                          : 'option'
                    }
                  >
                    <span>
                      <RichContent source={o.text} inline />{' '}
                      {o.selected ? <Badge>{t('result.yourAnswer')}</Badge> : null}{' '}
                      {o.isCorrect ? (
                        <Badge tone="success">{t('result.correctAnswer')}</Badge>
                      ) : null}
                      {o.rationale ? (
                        <span className="small muted" style={{ display: 'block' }}>
                          <RichContent source={o.rationale} inline />
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              {r.explanation ? <RichContent source={r.explanation} className="small" /> : null}
              <WorkedSolutionPanel source={r.workedSolution} />
              <div className="row">
                <BookmarkItemButton source="practice" ownerId={sessionId} itemId={r.itemId} />
                <ChallengeButton
                  path={`/api/practice/sessions/${sessionId}/items/${r.itemId}/challenge`}
                />
              </div>
            </li>
          ))}
        </ol>
      </section>
      <div className="row">
        <ButtonLink to="/practice/session/new?preset=mistakes" variant="secondary">
          {t('exams.practice.mistakes')}
        </ButtonLink>
        <ButtonLink to="/practice" variant="secondary">
          {t('exams.practice.back')}
        </ButtonLink>
      </div>
    </div>
  );
}

/** /review — SM-2 due queue. Grading happens by answering: the server maps correct/partial/wrong to quality 4/3/1. */
export function ReviewDuePage() {
  const { t, fmtDate } = useI18n();
  usePageMeta(t('exams.review.title'), undefined, { noindex: true });
  const navigate = useNavigate();
  const due = useDueReviews();
  const toast = useToast();
  const start = useApiMutation(
    (count: number) =>
      api<PracticeSessionView>('/api/practice/sessions', {
        method: 'POST',
        body: { dueForReview: true, count: Math.min(100, Math.max(1, count)) },
      }),
    [examKeys.practiceSessions],
    (s) => navigate(`/practice/sessions/${s.id}?mode=review`),
  );
  const bookmark = useApiMutation(
    (questionId: string) => api(`/api/me/question-bookmarks/${questionId}`, { method: 'PUT' }),
    [examKeys.bookmarks],
    () => toast.success(t('exams.bookmarks.added')),
  );
  return (
    <div className="container page stack">
      <PageHeader title={t('exams.review.title')} subtitle={t('exams.review.subtitle')} />
      <QueryState query={due}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('exams.review.none')} description={t('exams.review.noneBody')} />
          ) : (
            <section className="card stack">
              <p>{t('exams.review.dueCount', { n: list.length })}</p>
              <p className="small muted">{t('exams.review.how')}</p>
              {start.isError ? <Notice tone="danger">{examError(start.error, t)}</Notice> : null}
              <div>
                <Button loading={start.isPending} onClick={() => start.mutate(list.length)}>
                  {t('exams.review.start')}
                </Button>
              </div>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('exams.review.dueAt')}</th>
                      <th scope="col">{t('exams.review.interval')}</th>
                      <th scope="col">{t('exams.review.reps')}</th>
                      <th scope="col">{t('exams.review.ease')}</th>
                      <th scope="col">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d) => (
                      <tr key={d.questionId}>
                        <td>{fmtDate(d.dueAt)}</td>
                        <td>{t('exams.review.days', { n: d.intervalDays })}</td>
                        <td>{d.repetitions}</td>
                        <td>{d.easeFactor.toFixed(2)}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              bookmark.mutate(d.questionId, {
                                onError: (e) => toast.error(examError(e, t)),
                              })
                            }
                          >
                            {t('exams.bookmarks.add')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        }
      </QueryState>
    </div>
  );
}
