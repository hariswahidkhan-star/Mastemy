import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api, downloadFile, qs } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { QUESTION_STATES } from '../../api/types';
import { toQuestionBody, toQuestionList } from '../../api/questions';
import type { RawQuestionDto } from '../../api/questions';
import type { QuestionDto, QuestionInput, QuestionState, StudioCourseDto } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, QueryState, StatusBadge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../auth/AuthProvider';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';

function questionSchema(t: TFunction) {
  return z
    .object({
      externalId: z.string().trim().min(1, t('validation.required')).max(64),
      type: z.enum(['SingleChoice', 'MultipleSelect']),
      language: z.enum(['en', 'ar']),
      stem: z
        .string()
        .trim()
        .min(10, t('validation.minChars', { n: 10 })),
      explanation: z
        .string()
        .trim()
        .min(10, t('validation.minChars', { n: 10 })),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']),
      skillCode: z.string().trim().max(64),
      certificationObjective: z.string().trim().max(200),
      tags: z.string().trim().max(300),
      sourceReference: z.string().trim().min(3, t('question.sourceRequired')).max(500),
      allowShuffle: z.boolean(),
      moduleId: z.string().optional(),
      lessonId: z.string().optional(),
      options: z
        .array(
          z.object({
            id: z.string().optional(),
            text: z.string().trim().min(1, t('validation.required')),
            isCorrect: z.boolean(),
            rationale: z.string().trim().min(10, t('question.rationaleRule')),
          }),
        )
        .min(2, t('question.minOptions'))
        .max(6, t('question.maxOptions')),
    })
    .superRefine((v, ctx) => {
      const correct = v.options.filter((o) => o.isCorrect).length;
      if (v.type === 'SingleChoice' && correct !== 1)
        ctx.addIssue({ code: 'custom', path: ['options'], message: t('question.singleRule') });
      if (v.type === 'MultipleSelect' && correct < 2)
        ctx.addIssue({ code: 'custom', path: ['options'], message: t('question.multiRule') });
      const texts = v.options.map((o) => o.text.trim().toLowerCase());
      if (new Set(texts).size !== texts.length)
        ctx.addIssue({
          code: 'custom',
          path: ['options'],
          message: t('question.duplicateOptions'),
        });
    });
}
type QForm = z.infer<ReturnType<typeof questionSchema>>;

const emptyOption = () => ({ text: '', isCorrect: false, rationale: '' });

function QuestionForm({
  course,
  initial,
  onDone,
}: {
  course: StudioCourseDto;
  initial: QuestionDto | null;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const toast = useToast();
  const schema = useMemo(() => questionSchema(t), [t]);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QForm>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? {
          ...initial,
          language: initial.language === 'ar' ? 'ar' : 'en',
          moduleId: initial.moduleId ?? '',
          lessonId: initial.lessonId ?? '',
        }
      : {
          externalId: '',
          type: 'SingleChoice',
          language: course.language === 'ar' ? 'ar' : 'en',
          stem: '',
          explanation: '',
          difficulty: 'Medium',
          skillCode: '',
          certificationObjective: '',
          tags: '',
          sourceReference: '',
          allowShuffle: true,
          moduleId: '',
          lessonId: '',
          options: [emptyOption(), emptyOption(), emptyOption(), emptyOption()],
        },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'options' });
  const moduleId = watch('moduleId');
  const lessons = course.modules.find((m) => m.id === moduleId)?.lessons ?? [];
  const save = useApiMutation(
    (v: QForm) => {
      const body: QuestionInput = {
        ...v,
        moduleId: v.moduleId || null,
        lessonId: v.lessonId || null,
      };
      const payload = toQuestionBody(body);
      return initial
        ? api(`/api/studio/questions/${initial.id}`, { method: 'PUT', body: payload })
        : api(`/api/studio/courses/${course.id}/questions`, { method: 'POST', body: payload });
    },
    [['studio', 'questions', course.id]],
    () => {
      toast.success(initial ? t('question.versionSaved') : t('question.created'));
      onDone();
    },
  );
  const optionsError = errors.options as
    { message?: string; root?: { message?: string } } | undefined;

  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate>
      {initial ? (
        <Notice tone="info">{t('question.versionNote', { v: initial.currentVersion + 1 })}</Notice>
      ) : null}
      <div className="split">
        <Field label={t('question.externalId')} error={errors.externalId?.message} required>
          <Input {...register('externalId')} />
        </Field>
        <Field label={t('question.type')}>
          <Select
            {...register('type')}
            options={[
              { value: 'SingleChoice', label: t('question.SingleChoice') },
              { value: 'MultipleSelect', label: t('question.MultipleSelect') },
            ]}
          />
        </Field>
        <Field label={t('question.difficulty')}>
          <Select
            {...register('difficulty')}
            options={(['Easy', 'Medium', 'Hard'] as const).map((d) => ({
              value: d,
              label: t(`question.${d}`),
            }))}
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
      <Field label={t('question.stem')} error={errors.stem?.message} required>
        <Textarea rows={4} {...register('stem')} />
      </Field>
      <fieldset className="stack" style={{ border: 'none', padding: 0 }}>
        <legend className="field__label">{t('question.options')}</legend>
        {fields.map((f, i) => (
          <div key={f.id} className="option-editor">
            <div className="row row--between">
              <strong>{t('question.optionN', { n: i + 1 })}</strong>
              <Button
                size="sm"
                variant="ghost"
                disabled={fields.length <= 2}
                onClick={() => remove(i)}
              >
                {t('common.remove')}
              </Button>
            </div>
            <Field
              label={t('question.optionText')}
              error={errors.options?.[i]?.text?.message}
              required
            >
              <Input {...register(`options.${i}.text`)} />
            </Field>
            <Checkbox label={t('question.isCorrect')} {...register(`options.${i}.isCorrect`)} />
            <Field
              label={t('question.rationale')}
              hint={t('question.rationaleHint')}
              error={errors.options?.[i]?.rationale?.message}
              required
            >
              <Textarea rows={2} {...register(`options.${i}.rationale`)} />
            </Field>
          </div>
        ))}
        {optionsError?.message || optionsError?.root?.message ? (
          <p className="field__error" role="alert">
            {optionsError.message ?? optionsError.root?.message}
          </p>
        ) : null}
        <div>
          <Button
            size="sm"
            variant="secondary"
            disabled={fields.length >= 6}
            onClick={() => append(emptyOption())}
          >
            {t('question.addOption')}
          </Button>
        </div>
      </fieldset>
      <Field label={t('question.explanation')} error={errors.explanation?.message} required>
        <Textarea rows={3} {...register('explanation')} />
      </Field>
      <div className="split">
        <Field label={t('question.skillCode')}>
          <Input {...register('skillCode')} />
        </Field>
        <Field label={t('question.certObjective')}>
          <Input {...register('certificationObjective')} />
        </Field>
        <Field label={t('notes.tags')} hint={t('notes.tagsHint')}>
          <Input {...register('tags')} />
        </Field>
        <Field
          label={t('question.source')}
          hint={t('question.sourceHint')}
          error={errors.sourceReference?.message}
          required
        >
          <Input {...register('sourceReference')} />
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
        label={t('question.allowShuffle')}
        hint={t('question.allowShuffleHint')}
        {...register('allowShuffle')}
      />
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

const NEXT_STATES: Record<QuestionState, QuestionState[]> = {
  Draft: ['Reviewed'],
  Reviewed: ['Approved', 'Draft'],
  Approved: ['Active', 'Draft'],
  Active: ['Retired'],
  Retired: [],
};

export function QuestionBank({ course }: { course: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const { hasRole } = useAuth();
  const [state, setState] = useState('');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<QuestionDto | 'new' | null>(null);
  const [exporting, setExporting] = useState(false);
  const listKey = ['studio', 'questions', course.id, { state, q }];
  const questions = useQuery({
    queryKey: listKey,
    queryFn: () =>
      api<RawQuestionDto[] | { items: RawQuestionDto[] }>(
        `/api/studio/courses/${course.id}/questions${qs({ state, q })}`,
      ),
    select: toQuestionList,
  });
  const changeState = useApiMutation(
    ({ id, next }: { id: string; next: QuestionState }) =>
      api(`/api/studio/questions/${id}/state`, { method: 'POST', body: { state: next } }),
    [['studio', 'questions', course.id]],
    () => toast.success(t('question.stateChanged')),
  );
  const isReviewer = hasRole('Reviewer', 'Admin', 'SuperAdmin');

  return (
    <div className="stack">
      <div className="row row--between">
        <form className="row" role="search" onSubmit={(e) => e.preventDefault()}>
          <Field label={t('courses.search')}>
            <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} />
          </Field>
          <Field label={t('question.state')}>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder={t('question.allStates')}
              options={QUESTION_STATES.map((s) => ({ value: s, label: t(`status.${s}`) }))}
            />
          </Field>
        </form>
        <div className="row">
          <Button
            variant="secondary"
            loading={exporting}
            onClick={() => {
              setExporting(true);
              downloadFile(
                `/api/studio/courses/${course.id}/questions/export.csv`,
                `questions-${course.slug}.csv`,
              )
                .catch((e) => toast.error(errorMessage(e, t)))
                .finally(() => setExporting(false));
            }}
          >
            {t('question.export')}
          </Button>
          <Button onClick={() => setEditing('new')}>{t('question.new')}</Button>
        </div>
      </div>
      <QueryState query={questions}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('question.none')} description={t('question.noneBody')} />
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('question.externalId')}</th>
                    <th scope="col">{t('question.stem')}</th>
                    <th scope="col">{t('question.type')}</th>
                    <th scope="col">{t('question.state')}</th>
                    <th scope="col">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((qq) => (
                    <tr key={qq.id}>
                      <td className="mono">{qq.externalId}</td>
                      <td>{qq.stem.length > 120 ? `${qq.stem.slice(0, 120)}…` : qq.stem}</td>
                      <td>
                        <Badge>{t(`question.${qq.type}`)}</Badge>
                      </td>
                      <td>
                        <StatusBadge status={qq.state} />{' '}
                        <span className="small muted">v{qq.currentVersion}</span>
                      </td>
                      <td>
                        <div className="row">
                          <Button size="sm" variant="ghost" onClick={() => setEditing(qq)}>
                            {t('common.edit')}
                          </Button>
                          {NEXT_STATES[qq.state]
                            .filter(
                              (s) =>
                                // Reviewed/Approved/Active need a reviewer who is not a course author.
                                isReviewer || s === 'Draft' || s === 'Retired',
                            )
                            .map((s) => (
                              <Button
                                key={s}
                                size="sm"
                                variant="secondary"
                                loading={
                                  changeState.isPending && changeState.variables?.id === qq.id
                                }
                                onClick={() =>
                                  changeState.mutate(
                                    { id: qq.id, next: s },
                                    { onError: (e) => toast.error(errorMessage(e, t)) },
                                  )
                                }
                              >
                                {t(`question.to.${s}`)}
                              </Button>
                            ))}
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
        title={editing === 'new' ? t('question.new') : t('question.edit')}
        wide
        onClose={() => setEditing(null)}
      >
        {editing !== null ? (
          <QuestionForm
            course={course}
            initial={editing === 'new' ? null : editing}
            onDone={() => setEditing(null)}
          />
        ) : null}
      </Dialog>
    </div>
  );
}
