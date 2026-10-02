import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { keys, useApiMutation, useCategories, useStudioCourse } from '../../api/hooks';
import { COURSE_LEVELS } from '../../api/types';
import type { ReviewCommentDto, StudioCourseDto, ValidationResult } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState, StatusBadge } from '../../components/ui/misc';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { formatTimestamp } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { AssessmentsPanel } from './AssessmentsPanel';
import { courseSchema, toCourseInput } from './courseSchema';
import type { CourseFormValues } from './courseSchema';
import { CurriculumEditor } from './CurriculumEditor';
import { ImportPanel } from './ImportPanel';
import { PackagesPanel } from './PackagesPanel';
import { QuestionBank } from './QuestionBank';
import { EngagementPanel, PublicationPanel, ResourcesManager } from './Wave2Panels';
import { workspaceCourseTabs } from '../workspace/CourseTabs';
import { useAgreementGate } from '../workspace/Authoring';

function DetailsForm({ course }: { course: StudioCourseDto }) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const categories = useCategories();
  const schema = useMemo(() => courseSchema(t, false), [t]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<CourseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      goals: '',
      audience: course.audience,
      categoryId: course.categoryIds?.[0] ? String(course.categoryIds[0]) : '',
      level: course.level,
      language: course.language === 'ar' ? 'ar' : 'en',
      title: course.title,
      subtitle: course.subtitle ?? '',
      description: course.description,
      prerequisites: course.prerequisites,
      outcomes: Array.isArray(course.outcomes) ? course.outcomes.join('\n') : course.outcomes,
    },
  });
  const save = useApiMutation(
    (v: CourseFormValues) =>
      api(`/api/studio/courses/${course.id}`, { method: 'PUT', body: toCourseInput(v) }),
    [keys.studioCourse(course.id), keys.studioCourses],
    (_r, v) => {
      reset(v);
      toast.success(t('common.saved'));
    },
  );
  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate>
      <div className="split">
        <div>
          <Field label={t('studio.courseTitle')} error={errors.title?.message} required>
            <Input {...register('title')} />
          </Field>
          <Field label={t('wizard.subtitleLabel')}>
            <Input {...register('subtitle')} />
          </Field>
          <Field label={t('courses.category')} error={errors.categoryId?.message} required>
            <Select
              {...register('categoryId')}
              placeholder={t('wizard.chooseCategory')}
              options={(categories.data ?? []).map((c) => ({
                value: String(c.id),
                label: (c.parentId ? '— ' : '') + (lang === 'ar' ? c.nameAr : c.nameEn),
              }))}
            />
          </Field>
          <Field label={t('courses.level')}>
            <Select
              {...register('level')}
              options={COURSE_LEVELS.map((l) => ({ value: l, label: t(`level.${l}`) }))}
            />
          </Field>
          <Field label={t('course.language')}>
            <Select
              {...register('language')}
              options={[
                { value: 'en', label: t('language.en') },
                { value: 'ar', label: t('language.ar') },
              ]}
            />
          </Field>
        </div>
        <div>
          <Field label={t('course.audience')} error={errors.audience?.message} required>
            <Textarea {...register('audience')} />
          </Field>
          <Field label={t('wizard.description')} error={errors.description?.message} required>
            <Textarea rows={6} {...register('description')} />
          </Field>
          <Field label={t('course.prerequisites')} hint={t('wizard.linesHint')}>
            <Textarea {...register('prerequisites')} />
          </Field>
          <Field
            label={t('course.outcomes')}
            hint={t('studio.outcomesRule')}
            error={errors.outcomes?.message}
            required
          >
            <Textarea rows={5} {...register('outcomes')} />
          </Field>
        </div>
      </div>
      {save.isError ? <Notice tone="danger">{errorMessage(save.error, t)}</Notice> : null}
      <Button type="submit" loading={save.isPending} disabled={!isDirty}>
        {t('common.save')}
      </Button>
    </form>
  );
}

function ReviewPanel({ course }: { course: StudioCourseDto }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const validation = useQuery({
    queryKey: ['studio', 'validation', course.id],
    queryFn: () => api<ValidationResult>(`/api/studio/courses/${course.id}/validation`),
  });
  const comments = useQuery({
    queryKey: ['review', 'comments', course.id],
    queryFn: () => api<ReviewCommentDto[]>(`/api/review/courses/${course.id}/comments`),
    retry: false,
  });
  const [confirm, setConfirm] = useState(false);
  const agreement = useAgreementGate();
  const submit = useApiMutation(
    () => api(`/api/studio/courses/${course.id}/submit`, { method: 'POST' }),
    [keys.studioCourse(course.id), keys.studioCourses, ['studio', 'validation', course.id]],
    () => {
      setConfirm(false);
      toast.success(t('studio.submitted'));
    },
  );
  const startUpdate = useApiMutation(
    () => api(`/api/studio/courses/${course.id}/start-update`, { method: 'POST' }),
    [keys.studioCourse(course.id), keys.studioCourses],
    () => toast.success(t('studio.updateStarted')),
  );
  const canSubmit =
    course.status === 'Draft' ||
    course.status === 'ChangesRequested' ||
    course.status === 'Updating';

  return (
    <div className="stack">
      <section>
        <h2>{t('studio.checklist')}</h2>
        <QueryState query={validation}>
          {(v) =>
            v.ok ? (
              <Notice tone="success">{t('studio.checklistOk')}</Notice>
            ) : (
              <Notice tone="warning" title={t('studio.checklistIssues', { n: v.issues.length })}>
                <ul style={{ margin: 0 }}>
                  {v.issues.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </Notice>
            )
          }
        </QueryState>
        <p className="small muted">{t('studio.checklistNote')}</p>
        {canSubmit ? (
          <Button
            onClick={() => agreement.run(() => setConfirm(true))}
            disabled={!validation.data?.ok}
          >
            {t('studio.submitForReview')}
          </Button>
        ) : course.status === 'Published' ? (
          <Button
            variant="secondary"
            onClick={() => startUpdate.mutate(undefined)}
            loading={startUpdate.isPending}
          >
            {t('studio.startUpdate')}
          </Button>
        ) : (
          <p>{t(`studio.statusHelp.${course.status}`)}</p>
        )}
        {submit.isError ? <Notice tone="danger">{errorMessage(submit.error, t)}</Notice> : null}
        {startUpdate.isError ? (
          <Notice tone="danger">{errorMessage(startUpdate.error, t)}</Notice>
        ) : null}
      </section>
      <section>
        <h2>{t('review.comments')}</h2>
        {comments.isError ? (
          <p className="muted small">{t('review.commentsUnavailable')}</p>
        ) : (
          <QueryState query={comments}>
            {(list) =>
              list.length === 0 ? (
                <p className="muted">{t('review.noComments')}</p>
              ) : (
                <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                  {list.map((c) => (
                    <li key={c.id} className="card card--flat">
                      <div className="small muted">
                        {c.authorName ?? t('review.reviewer')} · {fmtDate(c.createdAt)}
                        {c.videoTimestampSeconds != null
                          ? ` · ${formatTimestamp(c.videoTimestampSeconds)}`
                          : ''}
                      </div>
                      <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{c.body}</p>
                    </li>
                  ))}
                </ul>
              )
            }
          </QueryState>
        )}
      </section>
      <ConfirmDialog
        open={confirm}
        title={t('studio.submitForReview')}
        body={t('studio.submitConfirm')}
        confirmLabel={t('studio.submit')}
        loading={submit.isPending}
        onCancel={() => setConfirm(false)}
        onConfirm={() =>
          submit.mutate(undefined, {
            onError: (e) => {
              if (agreement.handleError(e, () => submit.mutate(undefined))) setConfirm(false);
            },
          })
        }
      />
      {agreement.dialog}
    </div>
  );
}

export function CourseEditorPage() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const course = useStudioCourse(id);
  usePageMeta(course.data?.title ?? t('studio.courses'), undefined, { noindex: true });
  const tab = params.get('tab') ?? 'details';
  return (
    <QueryState query={course}>
      {(c) => (
        <>
          <nav className="small muted" aria-label={t('common.breadcrumb')}>
            <Link to="/studio">{t('studio.courses')}</Link> / {c.title}
          </nav>
          <PageHeader
            title={c.title}
            subtitle={<StatusBadge status={c.status} />}
            actions={
              c.status === 'Published' || c.status === 'Updating' ? (
                <Link className="btn btn--secondary btn--sm" to={`/courses/${c.slug}`}>
                  {t('studio.viewPublic')}
                </Link>
              ) : null
            }
          />
          <Tabs
            label={t('studio.editorTabs')}
            value={tab}
            onChange={(v) => setParams({ tab: v }, { replace: true })}
            tabs={[
              {
                id: 'details',
                label: t('studio.tab.details'),
                content: <DetailsForm course={c} />,
              },
              {
                id: 'curriculum',
                label: t('studio.tab.curriculum'),
                content: <CurriculumEditor course={c} />,
              },
              {
                id: 'questions',
                label: t('studio.tab.questions'),
                content: <QuestionBank course={c} />,
              },
              {
                id: 'import',
                label: t('studio.tab.import'),
                content: <ImportPanel courseId={c.id} course={c} />,
              },
              {
                id: 'assessments',
                label: t('studio.tab.assessments'),
                content: <AssessmentsPanel course={c} />,
              },
              {
                id: 'packages',
                label: t('studio.tab.packages'),
                content: <PackagesPanel courseId={c.id} />,
              },
              {
                id: 'resources',
                label: t('studio.tab.resources'),
                content: <ResourcesManager course={c} />,
              },
              {
                id: 'engagement',
                label: t('studio.tab.engagement'),
                content: <EngagementPanel course={c} />,
              },
              {
                id: 'publication',
                label: t('studio.tab.publication'),
                content: <PublicationPanel course={c} />,
              },
              { id: 'review', label: t('studio.tab.review'), content: <ReviewPanel course={c} /> },
              ...workspaceCourseTabs(c, t),
            ]}
          />
        </>
      )}
    </QueryState>
  );
}
