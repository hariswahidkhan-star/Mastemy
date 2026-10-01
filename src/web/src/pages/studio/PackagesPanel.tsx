import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import { Button } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';

const VIDEO_WORDS = /\b(video access|watch videos|unlock videos?|video lessons?)\b/i;

export function PackagesPanel({ courseId }: { courseId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const s = useMemo(
    () =>
      z.object({
        title: z
          .string()
          .trim()
          .min(3, t('validation.minChars', { n: 3 }))
          .max(120),
        contents: z
          .string()
          .trim()
          .refine(
            (v) => v.split(/\r?\n/).filter((l) => l.trim()).length >= 1,
            t('packages.contentsRule'),
          )
          .refine((v) => !VIDEO_WORDS.test(v), t('packages.noVideoRule')),
        price: z.coerce.number().positive(t('validation.positive')).max(100000),
        currency: z.enum(['USD', 'EUR', 'GBP', 'SAR', 'AED', 'EGP']),
        accessDays: z.coerce.number().int().min(1, t('validation.positiveInt')).max(3650),
      }),
    [t],
  );
  type In = z.input<typeof s>;
  type Out = z.output<typeof s>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(s),
    defaultValues: { title: '', contents: '', price: '', currency: 'USD', accessDays: 365 },
  });
  const propose = useApiMutation(
    (v: Out) => api(`/api/studio/courses/${courseId}/packages`, { method: 'POST', body: v }),
    [],
    () => {
      reset();
      toast.success(t('packages.proposed'));
    },
  );
  return (
    <div>
      <Notice tone="info" title={t('packages.policyTitle')}>
        {t('packages.policy')}
      </Notice>
      <form
        className="card card--flat"
        onSubmit={handleSubmit((v) => propose.mutate(v))}
        noValidate
      >
        <h2>{t('packages.propose')}</h2>
        <Field label={t('packages.title')} error={errors.title?.message} required>
          <Input {...register('title')} />
        </Field>
        <Field
          label={t('packages.contents')}
          hint={t('packages.contentsHint')}
          error={errors.contents?.message}
          required
        >
          <Textarea rows={5} {...register('contents')} />
        </Field>
        <div className="split">
          <Field label={t('packages.price')} error={errors.price?.message} required>
            <Input type="number" step="0.01" min="0" inputMode="decimal" {...register('price')} />
          </Field>
          <Field label={t('packages.currency')}>
            <Select
              {...register('currency')}
              options={['USD', 'EUR', 'GBP', 'SAR', 'AED', 'EGP'].map((c) => ({
                value: c,
                label: c,
              }))}
            />
          </Field>
          <Field label={t('packages.accessDays')} error={errors.accessDays?.message} required>
            <Input type="number" min={1} {...register('accessDays')} />
          </Field>
        </div>
        {propose.isError ? <Notice tone="danger">{errorMessage(propose.error, t)}</Notice> : null}
        <Button type="submit" loading={propose.isPending}>
          {t('packages.submit')}
        </Button>
      </form>
    </div>
  );
}
