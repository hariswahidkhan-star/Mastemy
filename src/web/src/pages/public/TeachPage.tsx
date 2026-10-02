import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from '../../lib/zod';
import { api } from '../../api/client';
import { keys, useApiMutation, useOnboardingStatus } from '../../api/hooks';
import type { OnboardingStatus } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Button, ButtonLink } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState, StatusBadge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

const YT_RE = /^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\//i;

function makeSchema(t: TFunction, inviteOnly: boolean) {
  return z.object({
    headline: z
      .string()
      .trim()
      .min(10, t('validation.minChars', { n: 10 }))
      .max(160),
    bio: z
      .string()
      .trim()
      .min(80, t('validation.minChars', { n: 80 }))
      .max(4000),
    expertiseEvidence: z
      .string()
      .trim()
      .min(40, t('validation.minChars', { n: 40 }))
      .max(4000),
    testVideoUrl: z.string().trim().regex(YT_RE, t('validation.youtubeUrl')),
    agreementAccepted: z.boolean().refine((v) => v, t('teach.agreementRequired')),
    invitationCode: inviteOnly
      ? z.string().trim().min(4, t('teach.invitationRequired'))
      : z.string().trim().optional(),
  });
}
type FormValues = z.infer<ReturnType<typeof makeSchema>>;

function ApplicationForm({ status }: { status: OnboardingStatus }) {
  const { t } = useI18n();
  const toast = useToast();
  const schema = useMemo(() => makeSchema(t, status.inviteOnly), [t, status.inviteOnly]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { agreementAccepted: false, invitationCode: '' },
  });
  const submit = useApiMutation(
    (v: FormValues) =>
      api('/api/instructor-applications', {
        method: 'POST',
        body: { ...v, invitationCode: v.invitationCode || undefined },
      }),
    [keys.onboarding],
    () => toast.success(t('teach.submitted')),
  );
  return (
    <form className="card" onSubmit={handleSubmit((v) => submit.mutate(v))} noValidate>
      <h2>{t('teach.formTitle')}</h2>
      <Field label={t('teach.headline')} error={errors.headline?.message} required>
        <Input {...register('headline')} />
      </Field>
      <Field label={t('teach.bio')} hint={t('teach.bioHint')} error={errors.bio?.message} required>
        <Textarea rows={6} {...register('bio')} />
      </Field>
      <Field
        label={t('teach.evidence')}
        hint={t('teach.evidenceHint')}
        error={errors.expertiseEvidence?.message}
        required
      >
        <Textarea rows={5} {...register('expertiseEvidence')} />
      </Field>
      <Field
        label={t('teach.testVideo')}
        hint={t('teach.testVideoHint')}
        error={errors.testVideoUrl?.message}
        required
      >
        <Input type="url" inputMode="url" {...register('testVideoUrl')} />
      </Field>
      {status.inviteOnly ? (
        <Field label={t('teach.invitationCode')} error={errors.invitationCode?.message} required>
          <Input autoComplete="off" {...register('invitationCode')} />
        </Field>
      ) : null}
      <Checkbox
        label={t('teach.agreement')}
        error={errors.agreementAccepted?.message}
        {...register('agreementAccepted')}
      />
      {submit.isError ? <Notice tone="danger">{errorMessage(submit.error, t)}</Notice> : null}
      <Button type="submit" loading={submit.isPending}>
        {t('teach.submit')}
      </Button>
    </form>
  );
}

export function TeachPage() {
  const { t, fmtDate } = useI18n();
  const { user } = useAuth();
  const status = useOnboardingStatus();
  usePageMeta(t('teach.title'), t('teach.subtitle'));

  return (
    <div className="container page" style={{ maxInlineSize: 860 }}>
      <PageHeader title={t('teach.title')} subtitle={t('teach.subtitle')} />
      <h2 className="visually-hidden">{t('teach.pointsHeading')}</h2>
      <div className="grid-2" style={{ marginBlockEnd: 'var(--space-5)' }}>
        {(['model', 'channel', 'review', 'earn'] as const).map((k) => (
          <div key={k} className="card card--flat">
            <h3>{t(`teach.point.${k}.title`)}</h3>
            <p className="small muted">{t(`teach.point.${k}.body`)}</p>
          </div>
        ))}
      </div>
      <QueryState query={status}>
        {(s) => {
          if (s.myApplication) {
            const a = s.myApplication;
            return (
              <div className="card">
                <h2>{t('teach.yourApplication')}</h2>
                <p>
                  <StatusBadge status={a.status} />{' '}
                  {a.createdAt ? <span className="small muted">{fmtDate(a.createdAt)}</span> : null}
                </p>
                <p>{t(`teach.appStatus.${a.status}`)}</p>
                {a.reviewerNotes ? (
                  <Notice tone="info" title={t('teach.reviewerNotes')}>
                    <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{a.reviewerNotes}</p>
                  </Notice>
                ) : null}
                {a.status === 'Approved' ? (
                  <ButtonLink to="/studio">{t('nav.studio')}</ButtonLink>
                ) : null}
              </div>
            );
          }
          if (s.paused)
            return (
              <Notice tone="warning" title={t('teach.pausedTitle')}>
                {t('teach.pausedBody')}
              </Notice>
            );
          if (!s.registrationOpen && !s.inviteOnly)
            return (
              <Notice tone="info" title={t('teach.closedTitle')}>
                {t('teach.closedBody')}
              </Notice>
            );
          return (
            <>
              {s.inviteOnly ? (
                <Notice tone="info" title={t('teach.inviteTitle')}>
                  {t('teach.inviteBody')}
                </Notice>
              ) : (
                <Notice tone="success" title={t('teach.openTitle')}>
                  {t('teach.openBody')}
                </Notice>
              )}
              {user ? (
                <ApplicationForm status={s} />
              ) : (
                <div className="card">
                  <p>{t('teach.loginToApply')}</p>
                  <div className="row">
                    <ButtonLink to="/login?next=/teach">{t('nav.login')}</ButtonLink>
                    <ButtonLink to="/register" variant="secondary">
                      {t('nav.register')}
                    </ButtonLink>
                  </div>
                </div>
              )}
            </>
          );
        }}
      </QueryState>
    </div>
  );
}
