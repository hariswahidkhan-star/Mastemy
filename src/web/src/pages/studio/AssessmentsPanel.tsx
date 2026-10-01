import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { ASSESSMENT_KINDS } from '../../api/types';
import type {
  AssessmentInput,
  QuestionDto,
  StudioAssessmentDto,
  StudioCourseDto,
} from '../../api/types';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select } from '../../components/ui/Field';
import { Badge, Notice, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';

const optionalInt = z
  .union([z.string(), z.number()])
  .transform((v) => (v === '' || v === null ? null : Number(v)))
  .refine((v) => v === null || (Number.isInteger(v) && v > 0));

function schema(t: TFunction) {
  return z
    .object({
      title: z
        .string()
        .trim()
        .min(3, t('validation.minChars', { n: 3 }))
        .max(200),
      kind: z.enum(ASSESSMENT_KINDS),
      mode: z.enum(['Practice', 'Exam']),
      timeLimitMinutes: optionalInt,
      maxAttempts: optionalInt,
      passPercent: z.coerce.number().min(1).max(100),
      multiSelectScoring: z.enum(['AllOrNothing', 'PartialCredit']),
      questionCount: z.coerce.number().int().min(1, t('assessmentForm.countRule')),
      isPremium: z.boolean(),
      countsTowardCertificate: z.boolean(),
      moduleId: z.string().optional(),
      lessonId: z.string().optional(),
      questionIds: z.array(z.string()).min(1, t('assessmentForm.pickQuestions')),
    })
    .refine((v) => v.questionCount <= v.questionIds.length, {
      message: t('assessmentForm.countTooHigh'),
      path: ['questionCount'],
    });
}
type FormIn = z.input<ReturnType<typeof schema>>;
type FormOut = z.output<ReturnType<typeof schema>>;

function AssessmentForm({
  course,
  initial,
  onDone,
}: {
  course: StudioCourseDto;
  initial: StudioAssessmentDto | null;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const s = useMemo(() => schema(t), [t]);
  const questions = useQuery({
    queryKey: ['studio', 'questions', course.id, { state: '', q: '' }],
    queryFn: () =>
      api<QuestionDto[] | { items: QuestionDto[] }>(`/api/studio/courses/${course.id}/questions`),
    select: (d) => (Array.isArray(d) ? d : d.items),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormIn, unknown, FormOut>({
    resolver: zodResolver(s),
    defaultValues: initial
      ? {
          ...initial,
          timeLimitMinutes: initial.timeLimitMinutes ?? '',
          maxAttempts: initial.maxAttempts ?? '',
          moduleId: initial.moduleId ?? '',
          lessonId: initial.lessonId ?? '',
        }
      : {
          title: '',
          kind: 'LessonPractice',
          mode: 'Practice',
          timeLimitMinutes: '',
          maxAttempts: '',
          passPercent: 70,
          multiSelectScoring: 'AllOrNothing',
          questionCount: 10,
          isPremium: false,
          countsTowardCertificate: false,
          moduleId: '',
          lessonId: '',
          questionIds: [],
        },
  });
  const moduleId = watch('moduleId');
  const lessons = course.modules.find((m) => m.id === moduleId)?.lessons ?? [];
  const save = useApiMutation(
    (v: FormOut) => {
      const body: AssessmentInput = {
        ...v,
        moduleId: v.moduleId || null,
        lessonId: v.lessonId || null,
      };
      return initial
        ? api(`/api/studio/assessments/${initial.id}`, { method: 'PUT', body })
        : api(`/api/studio/courses/${course.id}/assessments`, { method: 'POST', body });
    },
    [['studio', 'assessments', course.id]],
    () => {
      toast.success(t('common.saved'));
      onDone();
    },
  );
  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate>
      <Field label={t('assessmentForm.title')} error={errors.title?.message} required>
        <Input {...register('title')} />
      </Field>
      <div className="split">
        <Field label={t('assessmentForm.kind')}>
          <Select
            {...register('kind')}
            options={ASSESSMENT_KINDS.map((k) => ({ value: k, label: t(`assessment.kind.${k}`) }))}
          />
        </Field>
        <Field label={t('assessmentForm.mode')} hint={t('assessmentForm.modeHint')}>
          <Select
            {...register('mode')}
            options={[
              { value: 'Practice', label: t('assessment.mode.Practice') },
              { value: 'Exam', label: t('assessment.mode.Exam') },
            ]}
          />
        </Field>
        <Field
          label={t('assessmentForm.timeLimit')}
          hint={t('assessmentForm.blankUnlimited')}
          error={errors.timeLimitMinutes ? t('validation.positiveInt') : undefined}
        >
          <Input type="number" min={1} inputMode="numeric" {...register('timeLimitMinutes')} />
        </Field>
        <Field
          label={t('assessmentForm.maxAttempts')}
          hint={t('assessmentForm.blankUnlimited')}
          error={errors.maxAttempts ? t('validation.positiveInt') : undefined}
        >
          <Input type="number" min={1} inputMode="numeric" {...register('maxAttempts')} />
        </Field>
        <Field
          label={t('assessmentForm.passPercent')}
          error={errors.passPercent ? t('validation.percent') : undefined}
        >
          <Input type="number" min={1} max={100} {...register('passPercent')} />
        </Field>
        <Field label={t('assessmentForm.questionCount')} error={errors.questionCount?.message}>
          <Input type="number" min={1} {...register('questionCount')} />
        </Field>
        <Field label={t('assessmentForm.scoring')}>
          <Select
            {...register('multiSelectScoring')}
            options={[
              { value: 'AllOrNothing', label: t('assessment.scoring.AllOrNothing') },
              { value: 'PartialCredit', label: t('assessment.scoring.PartialCredit') },
            ]}
          />
        </Field>
        <Field label={t('question.module')}>
          <Select
            {...register('moduleId')}
            placeholder={t('question.anyModule')}
            options={course.modules.map((m) => ({ value: m.id, label: m.title }))}
          />
        </Field>
        <Field label={t('question.lesson')}>
          <Select
            {...register('lessonId')}
            placeholder={t('question.anyLesson')}
            options={lessons.map((l) => ({ value: l.id, label: l.title }))}
          />
        </Field>
      </div>
      <Checkbox
        label={t('assessmentForm.premium')}
        hint={t('assessmentForm.premiumHint')}
        {...register('isPremium')}
      />
      <Checkbox label={t('assessmentForm.certificate')} {...register('countsTowardCertificate')} />
      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend className="field__label">{t('assessmentForm.questions')}</legend>
        <p className="small muted">{t('assessmentForm.questionsHint')}</p>
        <QueryState query={questions}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('question.none')}</p>
            ) : (
              <div style={{ maxBlockSize: 280, overflow: 'auto' }}>
                {list.map((q) => (
                  <Checkbox
                    key={q.id}
                    value={q.id}
                    label={
                      <>
                        <span className="mono small">{q.externalId}</span> {q.stem.slice(0, 100)}{' '}
                        <Badge>{t(`status.${q.state}`)}</Badge>
                      </>
                    }
                    {...register('questionIds')}
                  />
                ))}
              </div>
            )
          }
        </QueryState>
        {errors.questionIds?.message ? (
          <p className="field__error" role="alert">
            {errors.questionIds.message}
          </p>
        ) : null}
      </fieldset>
      {save.isError ? <Notice tone="danger">{errorMessage(save.error, t)}</Notice> : null}
      <div className="form-actions">
        <Button type="submit" loading={save.isPending}>
          {t('common.save')}
        </Button>
        <Button variant="secondary" onClick={onDone}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}

export function AssessmentsPanel({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const key = ['studio', 'assessments', course.id];
  const list = useQuery({
    queryKey: key,
    queryFn: () =>
      api<StudioAssessmentDto[] | { items: StudioAssessmentDto[] }>(
        `/api/studio/courses/${course.id}/assessments`,
      ),
    select: (d) => (Array.isArray(d) ? d : d.items),
  });
  const [editing, setEditing] = useState<StudioAssessmentDto | 'new' | null>(null);
  const [toDelete, setToDelete] = useState<StudioAssessmentDto | null>(null);
  const remove = useApiMutation(
    (id: string) => api(`/api/studio/assessments/${id}`, { method: 'DELETE' }),
    [key],
    () => setToDelete(null),
  );
  return (
    <div className="stack">
      <div className="row row--between">
        <p className="small muted" style={{ margin: 0 }}>
          {t('assessmentForm.help')}
        </p>
        <Button onClick={() => setEditing('new')}>{t('assessmentForm.new')}</Button>
      </div>
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState title={t('assessmentForm.none')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('assessmentForm.title')}</th>
                    <th scope="col">{t('assessmentForm.kind')}</th>
                    <th scope="col">{t('assessmentForm.mode')}</th>
                    <th scope="col">{t('assessmentForm.questionCount')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>
                        {a.title}{' '}
                        {a.isPremium ? (
                          <Badge tone="accent">{t('assessment.premium')}</Badge>
                        ) : null}
                      </td>
                      <td>{t(`assessment.kind.${a.kind}`)}</td>
                      <td>{t(`assessment.mode.${a.mode}`)}</td>
                      <td>{a.questionCount}</td>
                      <td>
                        <div className="row">
                          <Button size="sm" variant="ghost" onClick={() => setEditing(a)}>
                            {t('common.edit')}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setToDelete(a)}>
                            {t('common.delete')}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
      <Dialog
        open={editing !== null}
        wide
        title={editing === 'new' ? t('assessmentForm.new') : t('assessmentForm.edit')}
        onClose={() => setEditing(null)}
      >
        {editing !== null ? (
          <AssessmentForm
            course={course}
            initial={editing === 'new' ? null : editing}
            onDone={() => setEditing(null)}
          />
        ) : null}
      </Dialog>
      <ConfirmDialog
        open={!!toDelete}
        danger
        title={t('assessmentForm.deleteTitle')}
        body={
          <>
            <p>{t('assessmentForm.deleteBody', { title: toDelete?.title ?? '' })}</p>
            {remove.isError ? <Notice tone="danger">{errorMessage(remove.error, t)}</Notice> : null}
          </>
        }
        confirmLabel={t('common.delete')}
        loading={remove.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() => toDelete && remove.mutate(toDelete.id)}
      />
    </div>
  );
}
