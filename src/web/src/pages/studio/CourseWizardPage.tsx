import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { api } from '../../api/client';
import { keys, useApiMutation, useCategories } from '../../api/hooks';
import { COURSE_LEVELS } from '../../api/types';
import type { StudioCourseDto } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { courseSchema, toCourseInput } from './courseSchema';
import type { CourseFormValues } from './courseSchema';

const STEPS: { key: string; fields: FieldPath<CourseFormValues>[] }[] = [
  { key: 'goals', fields: ['goals', 'audience'] },
  { key: 'placement', fields: ['categoryId', 'level', 'language'] },
  { key: 'pitch', fields: ['title', 'subtitle', 'description'] },
  { key: 'learning', fields: ['prerequisites', 'outcomes'] },
  { key: 'review', fields: [] },
];

export function CourseWizardPage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const categories = useCategories();
  const [step, setStep] = useState(0);
  usePageMeta(t('studio.newCourse'), undefined, { noindex: true });
  const schema = useMemo(() => courseSchema(t), [t]);
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      goals: '',
      audience: '',
      categoryId: '',
      level: 'Beginner',
      language: lang,
      title: '',
      subtitle: '',
      description: '',
      prerequisites: '',
      outcomes: '',
    },
    mode: 'onTouched',
  });
  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = form;

  const create = useApiMutation(
    (v: CourseFormValues) =>
      api<StudioCourseDto>('/api/studio/courses', { method: 'POST', body: toCourseInput(v) }),
    [keys.studioCourses],
    (course) => navigate(`/studio/courses/${course.id}`),
  );

  const next = async () => {
    if (await trigger(STEPS[step].fields)) setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const values = getValues();
  const category = categories.data?.find((c) => String(c.id) === values.categoryId);

  return (
    <>
      <PageHeader title={t('studio.newCourse')} subtitle={t('wizard.subtitle')} />
      <ol className="wizard-steps">
        {STEPS.map((s, i) => (
          <li key={s.key} aria-current={i === step ? 'step' : undefined}>
            {i + 1}. {t(`wizard.step.${s.key}`)}
          </li>
        ))}
      </ol>
      <form
        className="card"
        noValidate
        onSubmit={handleSubmit((v) => {
          if (step === STEPS.length - 1) create.mutate(v);
          else void next();
        })}
      >
        <div hidden={step !== 0}>
          <Field
            label={t('wizard.goals')}
            hint={t('wizard.goalsHint')}
            error={errors.goals?.message}
            required
          >
            <Textarea rows={4} {...register('goals')} />
          </Field>
          <Field
            label={t('course.audience')}
            hint={t('wizard.audienceHint')}
            error={errors.audience?.message}
            required
          >
            <Textarea rows={4} {...register('audience')} />
          </Field>
        </div>
        <div hidden={step !== 1}>
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
          <Field label={t('courses.level')} error={errors.level?.message} required>
            <Select
              {...register('level')}
              options={COURSE_LEVELS.map((l) => ({ value: l, label: t(`level.${l}`) }))}
            />
          </Field>
          <Field label={t('course.language')} hint={t('wizard.languageHint')} required>
            <Select
              {...register('language')}
              options={[
                { value: 'en', label: t('language.en') },
                { value: 'ar', label: t('language.ar') },
              ]}
            />
          </Field>
        </div>
        <div hidden={step !== 2}>
          <Field
            label={t('studio.courseTitle')}
            hint={t('wizard.titleHint')}
            error={errors.title?.message}
            required
          >
            <Input {...register('title')} maxLength={120} />
          </Field>
          <Field label={t('wizard.subtitleLabel')} error={errors.subtitle?.message}>
            <Input {...register('subtitle')} maxLength={200} />
          </Field>
          <Field label={t('wizard.description')} error={errors.description?.message} required>
            <Textarea rows={8} {...register('description')} />
          </Field>
        </div>
        <div hidden={step !== 3}>
          <Field
            label={t('course.prerequisites')}
            hint={t('wizard.linesHint')}
            error={errors.prerequisites?.message}
          >
            <Textarea rows={4} {...register('prerequisites')} />
          </Field>
          <Field
            label={t('course.outcomes')}
            hint={t('studio.outcomesRule')}
            error={errors.outcomes?.message}
            required
          >
            <Textarea rows={6} {...register('outcomes')} />
          </Field>
        </div>
        {step === 4 ? (
          <div>
            <dl className="kv">
              <dt>{t('studio.courseTitle')}</dt>
              <dd>{values.title}</dd>
              <dt>{t('courses.category')}</dt>
              <dd>{category ? (lang === 'ar' ? category.nameAr : category.nameEn) : '—'}</dd>
              <dt>{t('courses.level')}</dt>
              <dd>{t(`level.${values.level}`)}</dd>
              <dt>{t('course.language')}</dt>
              <dd>{t(`language.${values.language}`)}</dd>
              <dt>{t('course.outcomes')}</dt>
              <dd>{values.outcomes.split(/\r?\n/).filter((l) => l.trim()).length}</dd>
            </dl>
            <Notice tone="info">{t('wizard.afterCreate')}</Notice>
          </div>
        ) : null}
        {create.isError ? <Notice tone="danger">{errorMessage(create.error, t)}</Notice> : null}
        <div className="form-actions">
          {step > 0 ? (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              {t('common.back')}
            </Button>
          ) : null}
          {/* Distinct keys: reusing the same <button> node would let the Continue click that reaches the
              last step trigger the form's submit once React has turned it into the submit button. */}
          {step < STEPS.length - 1 ? (
            <Button key="continue" onClick={() => void next()}>
              {t('common.continue')}
            </Button>
          ) : (
            <Button key="create" type="submit" loading={create.isPending}>
              {t('wizard.create')}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
