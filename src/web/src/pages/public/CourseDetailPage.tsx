import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';
import { keys, useApiMutation, useCourse } from '../../api/hooks';
import type { CourseDetailDto, CourseReviewDto, PackageDto, Paged } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Duration } from '../../components/Duration';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { newIdempotencyKey, splitLines } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { CompareToggle, WishlistButton } from '../../components/Discovery';
import { DiscussionsPanel, EnrollToPost, useIsCourseAuthor } from '../engagement/Discussions';
import { RelatedCourses, useTrackCourseView } from './ComparePage';
import { useLearnCourse } from '../../api/hooks';
import { useEventSender, useTrackEvent } from '../../lib/analytics';
import { ReportContentButton } from '../workspace/Trust';

/** Signed-in only: enrollment decides whether the learner may post. */
function SignedInQa({ course }: { course: CourseDetailDto }) {
  const learn = useLearnCourse(course.slug);
  const isAuthor = useIsCourseAuthor(course.id);
  return (
    <DiscussionsPanel
      courseId={course.id}
      basePath={`/courses/${course.slug}`}
      canPost={!!learn.data?.enrolled || isAuthor}
      notAllowedReason={<EnrollToPost courseId={course.id} slug={course.slug} />}
    />
  );
}

function CourseQa({ course }: { course: CourseDetailDto }) {
  const { t } = useI18n();
  const { user } = useAuth();
  return (
    <section className="section" aria-labelledby="qa-h">
      <div className="section__head">
        <h2 id="qa-h" className="section__title">
          {t('qa.title')}
        </h2>
        {user ? (
          <Link to={`/courses/${course.slug}/announcements`}>{t('announcements.title')}</Link>
        ) : null}
      </div>
      {user ? (
        <SignedInQa course={course} />
      ) : (
        <DiscussionsPanel
          courseId={course.id}
          basePath={`/courses/${course.slug}`}
          canPost={false}
          notAllowedReason={<EnrollToPost courseId={course.id} slug={course.slug} />}
        />
      )}
    </section>
  );
}

export function FreeVideoNotice() {
  const { t } = useI18n();
  return (
    <Notice tone="info" title={t('course.freeNoticeTitle')}>
      <p style={{ margin: 0 }}>{t('course.freeNotice')}</p>
    </Notice>
  );
}

function PackageCard({ pkg, courseId }: { pkg: PackageDto; courseId?: string }) {
  const { t, fmtMoney } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const track = useEventSender();

  const buy = async () => {
    if (!user) {
      navigate(`/login?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setBusy(true);
    setProblem(null);
    track('checkout_start', courseId);
    try {
      const res = await api<{ checkoutUrl: string }>('/api/checkout', {
        method: 'POST',
        body: { packageId: pkg.id, idempotencyKey: newIdempotencyKey() },
      });
      window.location.assign(res.checkoutUrl);
    } catch (e) {
      if (e instanceof ApiError && e.is('payments_not_configured'))
        setProblem(t('course.paymentsUnavailable'));
      else toast.error(errorMessage(e, t));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="package">
      <h3 style={{ marginBlockEnd: 'var(--space-2)' }}>{pkg.title}</h3>
      <p className="package__price">{fmtMoney(pkg.price, pkg.currency)}</p>
      <p className="small muted">{t('course.accessTerm', { days: pkg.accessDays })}</p>
      <p className="small" style={{ fontWeight: 600, marginBlockEnd: 'var(--space-1)' }}>
        {t('course.packageIncludes')}
      </p>
      <ul className="check-list small">
        {splitLines(pkg.contents).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="small muted">{t('course.packageNotVideo')}</p>
      {problem ? <Notice tone="warning">{problem}</Notice> : null}
      <Button onClick={() => void buy()} loading={busy} style={{ inlineSize: '100%' }}>
        {t('course.buyPackage')}
      </Button>
    </div>
  );
}

function Reviews({ course }: { course: CourseDetailDto }) {
  const { t, fmtDate } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  const reviews = useQuery({
    queryKey: ['reviews', course.id],
    queryFn: () =>
      api<CourseReviewDto[] | Paged<CourseReviewDto>>(`/api/courses/${course.id}/reviews`),
    select: (d) => (Array.isArray(d) ? d : d.items),
  });
  const [rating, setRating] = useState('5');
  const [body, setBody] = useState('');
  const submit = useApiMutation(
    () =>
      api(`/api/courses/${course.id}/reviews`, {
        method: 'POST',
        body: { rating: Number(rating), body },
      }),
    [['reviews', course.id], keys.course(course.slug)],
    () => {
      toast.success(t('reviews.saved'));
      setBody('');
    },
  );

  return (
    <section className="section" aria-labelledby="reviews-h">
      <h2 id="reviews-h" className="section__title">
        {t('reviews.title')}
      </h2>
      <QueryState query={reviews}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('reviews.none')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((r) => (
                <li key={r.id} className="card card--flat">
                  <div className="row row--between">
                    <strong>
                      {t('reviews.stars', { n: r.rating })} · {r.authorName ?? t('reviews.learner')}
                    </strong>
                    <span className="small muted">{fmtDate(r.createdAt)}</span>
                  </div>
                  {r.verifiedPurchase ? (
                    <Badge tone="success">{t('reviews.verified')}</Badge>
                  ) : null}
                  <p style={{ whiteSpace: 'pre-wrap' }}>{r.body}</p>
                  {r.instructorReply ? (
                    <blockquote className="small muted">
                      <strong>{t('reviews.instructorReply')}</strong> {r.instructorReply}
                    </blockquote>
                  ) : null}
                  <ReportContentButton targetType="Review" targetId={r.id} />
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
      {user ? (
        <form
          className="card card--flat"
          style={{ marginBlockStart: 'var(--space-4)' }}
          onSubmit={(e) => {
            e.preventDefault();
            if (body.trim().length < 10) {
              toast.error(t('reviews.tooShort'));
              return;
            }
            submit.mutate(undefined);
          }}
        >
          <h3>{t('reviews.write')}</h3>
          <p className="small muted">{t('reviews.eligibility')}</p>
          <Field label={t('reviews.rating')}>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              options={[5, 4, 3, 2, 1].map((n) => ({
                value: String(n),
                label: t('reviews.stars', { n }),
              }))}
            />
          </Field>
          <Field label={t('reviews.body')}>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={4000} />
          </Field>
          {submit.isError ? <Notice tone="danger">{errorMessage(submit.error, t)}</Notice> : null}
          <Button type="submit" loading={submit.isPending}>
            {t('reviews.submit')}
          </Button>
        </form>
      ) : null}
    </section>
  );
}

export function CourseDetailView({ course }: { course: CourseDetailDto }) {
  const { t, fmtDate, fmtNumber } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  const firstLesson = course.modules.flatMap((m) => m.lessons).find((l) => l.hasVideo);
  const previews = course.modules.flatMap((m) => m.lessons).filter((l) => l.isPreview);
  useTrackCourseView(course.id);
  useTrackEvent('course_view', course.id);
  const enroll = useApiMutation(
    () => api(`/api/learn/courses/${course.id}/enroll`, { method: 'POST' }),
    [keys.dashboard, keys.learnCourse(course.slug)],
    () => toast.success(t('course.enrolled')),
  );

  return (
    <div className="container page">
      <nav
        aria-label={t('common.breadcrumb')}
        className="small muted"
        style={{ marginBlockEnd: 'var(--space-3)' }}
      >
        <Link to="/courses">{t('courses.title')}</Link> / <span>{course.title}</span>
      </nav>
      <div className="detail-layout">
        <div>
          <h1 className="page-title">{course.title}</h1>
          {course.subtitle ? <p className="page-subtitle">{course.subtitle}</p> : null}
          <div className="row" style={{ marginBlock: 'var(--space-3)' }}>
            <Badge>{t(`level.${course.level}`)}</Badge>
            <Badge>{t(`language.${course.language}`)}</Badge>
            {course.status === 'Updating' ? (
              <Badge tone="info">{t('status.Updating')}</Badge>
            ) : null}
          </div>
          <div className="row" style={{ marginBlockEnd: 'var(--space-3)' }}>
            <WishlistButton courseId={course.id} title={course.title} />
            <CompareToggle item={{ id: course.id, slug: course.slug, title: course.title }} />
            <ReportContentButton targetType="Course" targetId={course.id} />
          </div>
          <FreeVideoNotice />
          <dl className="facts">
            <div>
              <dt>{t('course.videos')}</dt>
              <dd>{fmtNumber(course.videoCount)}</dd>
            </div>
            <div>
              <dt>{t('course.mcqs')}</dt>
              <dd>{fmtNumber(course.questionCount)}</dd>
            </div>
            <div>
              <dt>{t('course.duration')}</dt>
              <dd>
                <Duration seconds={course.totalDurationSeconds} />
              </dd>
            </div>
            <div>
              <dt>{t('course.language')}</dt>
              <dd>{t(`language.${course.language}`)}</dd>
            </div>
            <div>
              <dt>{t('course.reviewed')}</dt>
              <dd>{course.reviewedAt ? fmtDate(course.reviewedAt) : t('course.notReviewed')}</dd>
            </div>
            <div>
              <dt>{t('course.credential')}</dt>
              <dd>{course.credentialType ?? t('course.defaultCredential')}</dd>
            </div>
          </dl>

          <section className="section">
            <h2 className="section__title">{t('course.about')}</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{course.description}</p>
          </section>
          <div className="grid-2">
            <section>
              <h2 className="section__title">{t('course.audience')}</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {course.audience || t('course.notSpecified')}
              </p>
            </section>
            <section>
              <h2 className="section__title">{t('course.prerequisites')}</h2>
              {splitLines(course.prerequisites).length > 0 ? (
                <ul>
                  {splitLines(course.prerequisites).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              ) : (
                <p>{t('course.noPrerequisites')}</p>
              )}
            </section>
          </div>
          <section className="section">
            <h2 className="section__title">{t('course.outcomes')}</h2>
            {course.outcomes.length > 0 ? (
              <ul className="check-list">
                {course.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            ) : (
              <p className="muted">{t('course.notSpecified')}</p>
            )}
          </section>

          <section className="section">
            <div className="section__head">
              <h2 className="section__title">{t('course.curriculum')}</h2>
              <span className="small muted">
                {t('course.curriculumSummary', {
                  modules: course.modules.length,
                  lessons: course.modules.reduce((n, m) => n + m.lessons.length, 0),
                })}
              </span>
            </div>
            {course.modules.length === 0 ? (
              <p className="muted">{t('course.noCurriculum')}</p>
            ) : (
              <div className="curriculum">
                {course.modules.map((m, i) => (
                  <details key={m.id} open={i === 0}>
                    <summary>
                      <span>{m.title}</span>
                      <span className="small muted">
                        {t('course.lessonCount', { n: m.lessons.length })}
                      </span>
                    </summary>
                    <ol>
                      {m.lessons.map((l) => (
                        <li key={l.id}>
                          <span>
                            {l.hasVideo ? (
                              <Link to={`/learn/${course.slug}/${l.id}`}>{l.title}</Link>
                            ) : (
                              l.title
                            )}{' '}
                            {l.isPreview ? (
                              <Badge tone="accent">{t('course.preview')}</Badge>
                            ) : null}
                          </span>
                          <span className="muted">
                            <Duration seconds={l.durationSeconds} />
                          </span>
                        </li>
                      ))}
                    </ol>
                  </details>
                ))}
              </div>
            )}
          </section>

          {previews.length > 0 ? (
            <section className="section">
              <h2 className="section__title">{t('course.previewLessons')}</h2>
              <ul>
                {previews.map((l) => (
                  <li key={l.id}>
                    <Link to={`/learn/${course.slug}/${l.id}`}>{l.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="section">
            <h2 className="section__title">{t('course.instructors')}</h2>
            {course.instructors.length === 0 ? (
              <p className="muted">{t('course.notSpecified')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {course.instructors.map((i) => (
                  <li key={i.userId ?? i.id ?? i.displayName}>
                    <strong>{i.displayName}</strong>
                    {i.headline ? <span className="muted"> — {i.headline}</span> : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <Reviews course={course} />
          <CourseQa course={course} />
          <RelatedCourses courseId={course.id} />
        </div>

        <aside className="sticky-aside stack" aria-label={t('course.studyOptions')}>
          <div className="card">
            <h2>{t('course.watchFree')}</h2>
            <p className="small muted">{t('course.watchFreeBody')}</p>
            {firstLesson ? (
              <ButtonLink to={`/learn/${course.slug}/${firstLesson.id}`}>
                {t('course.startWatching')}
              </ButtonLink>
            ) : (
              <p className="small">{t('course.noVideosYet')}</p>
            )}
            {user ? (
              <Button
                variant="secondary"
                style={{ marginBlockStart: 'var(--space-2)' }}
                onClick={() => enroll.mutate(undefined)}
                loading={enroll.isPending}
              >
                {t('course.enrollFree')}
              </Button>
            ) : null}
            {enroll.isError ? <Notice tone="danger">{errorMessage(enroll.error, t)}</Notice> : null}
          </div>
          <div className="card" id="packages">
            <h2>{t('course.packages')}</h2>
            {course.packages.length === 0 ? (
              <p className="small muted">{t('course.noPackages')}</p>
            ) : (
              <div className="stack">
                {course.packages.map((p) => (
                  <PackageCard key={p.id} pkg={p} courseId={course.id} />
                ))}
              </div>
            )}
            <h3 style={{ marginBlockStart: 'var(--space-4)' }}>{t('course.refundTerms')}</h3>
            <p className="small">{course.refundTerms || t('course.defaultRefundTerms')}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function CourseDetailPage() {
  const { slug = '' } = useParams();
  const course = useCourse(slug);
  const { t } = useI18n();
  usePageMeta(
    course.data?.title ?? t('courses.title'),
    course.data?.subtitle || course.data?.description?.slice(0, 160),
  );
  if (course.isError && course.error instanceof ApiError && course.error.status === 404) {
    return (
      <div className="container page">
        <EmptyState
          title={t('course.notFound')}
          action={{ label: t('courses.title'), to: '/courses' }}
        />
      </div>
    );
  }
  return <QueryState query={course}>{(data) => <CourseDetailView course={data} />}</QueryState>;
}
