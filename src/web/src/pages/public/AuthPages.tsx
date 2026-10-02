import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from '../../lib/zod';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Select } from '../../components/ui/Field';
import { Notice } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { OrgSignIn } from '../finalb/Sso';
import type { AuthResponse } from '../../api/types';
import { MfaChallenge, MfaEnrollmentWizard } from '../account/Mfa';

function safeNext(next: string | null): string {
  // Only same-origin relative paths are allowed as post-login redirects.
  return next && next.startsWith('/') && !next.startsWith('//') ? next : '/me';
}

export function LoginPage() {
  const { t } = useI18n();
  const { login, completeLogin } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [pending, setPending] = useState<AuthResponse | null>(null);
  usePageMeta(t('auth.loginTitle'), t('auth.loginDescription'));
  const schema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email(t('validation.email')),
        password: z.string().min(1, t('validation.required')),
      }),
    [t],
  );
  type V = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<V>({ resolver: zodResolver(schema) });
  const m = useMutation({
    mutationFn: (v: V) => login(v.email, v.password),
    onSuccess: (res) => {
      if (!res.status || res.status === 'ok')
        navigate(safeNext(params.get('next')), { replace: true });
      else setPending(res);
    },
  });
  const finish = (session: AuthResponse) => {
    completeLogin(session);
    navigate(safeNext(params.get('next')), { replace: true });
  };

  if (pending?.status === 'mfa_required' && pending.mfaToken)
    return (
      <div className="container page" style={{ maxInlineSize: 480 }}>
        <div className="card">
          <h1 className="page-title" style={{ marginBlockEnd: 'var(--space-4)' }}>
            {t('account.mfa.challengeTitle')}
          </h1>
          <MfaChallenge
            mfaToken={pending.mfaToken}
            onDone={finish}
            onRestart={() => {
              setPending(null);
              m.reset();
            }}
          />
        </div>
      </div>
    );
  if (pending?.status === 'mfa_enrollment_required' && pending.accessToken)
    return (
      <div className="container page" style={{ maxInlineSize: 640 }}>
        <div className="card">
          <h1 className="page-title" style={{ marginBlockEnd: 'var(--space-4)' }}>
            {t('account.mfa.enrollTitle')}
          </h1>
          <MfaEnrollmentWizard
            token={pending.accessToken}
            intro={t('account.mfa.requiredIntro')}
            onDone={finish}
          />
        </div>
      </div>
    );

  return (
    <div className="container page" style={{ maxInlineSize: 480 }}>
      <form className="card" onSubmit={handleSubmit((v) => m.mutate(v))} noValidate>
        <h1 className="page-title" style={{ marginBlockEnd: 'var(--space-4)' }}>
          {t('auth.loginTitle')}
        </h1>
        <Field label={t('auth.email')} error={errors.email?.message} required>
          <Input type="email" autoComplete="email" {...register('email')} />
        </Field>
        <Field label={t('auth.password')} error={errors.password?.message} required>
          <Input type="password" autoComplete="current-password" {...register('password')} />
        </Field>
        {m.isError ? <Notice tone="danger">{errorMessage(m.error, t)}</Notice> : null}
        <Button type="submit" loading={m.isPending} style={{ inlineSize: '100%' }}>
          {t('auth.loginButton')}
        </Button>
        <p className="small" style={{ marginBlockStart: 'var(--space-4)' }}>
          <Link to="/forgot-password">{t('account.password.forgotLink')}</Link>
        </p>
        <p className="small" style={{ marginBlockStart: 'var(--space-4)' }}>
          {t('auth.noAccount')} <Link to="/register">{t('nav.register')}</Link>
        </p>
      </form>
      <OrgSignIn />
    </div>
  );
}

export function RegisterPage() {
  const { t, lang } = useI18n();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  usePageMeta(t('auth.registerTitle'), t('auth.registerDescription'));
  const schema = useMemo(
    () =>
      z
        .object({
          displayName: z
            .string()
            .trim()
            .min(2, t('validation.minChars', { n: 2 }))
            .max(80),
          email: z.string().trim().email(t('validation.email')),
          password: z
            .string()
            .min(12, t('auth.passwordRule'))
            .regex(/[A-Za-z]/, t('auth.passwordRule'))
            .regex(/[0-9]/, t('auth.passwordRule')),
          confirm: z.string(),
          preferredLanguage: z.enum(['en', 'ar']),
        })
        .refine((v) => v.password === v.confirm, {
          message: t('auth.passwordMismatch'),
          path: ['confirm'],
        }),
    [t],
  );
  type V = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<V>({ resolver: zodResolver(schema), defaultValues: { preferredLanguage: lang } });
  const m = useMutation({
    mutationFn: (v: V) =>
      registerUser({
        email: v.email,
        password: v.password,
        displayName: v.displayName,
        preferredLanguage: v.preferredLanguage,
      }),
    // Optional onboarding: learning goals (skippable) before the dashboard.
    onSuccess: () => navigate('/welcome', { replace: true }),
  });

  return (
    <div className="container page" style={{ maxInlineSize: 520 }}>
      <form className="card" onSubmit={handleSubmit((v) => m.mutate(v))} noValidate>
        <h1 className="page-title" style={{ marginBlockEnd: 'var(--space-2)' }}>
          {t('auth.registerTitle')}
        </h1>
        <p className="muted small">{t('auth.registerNote')}</p>
        <Field label={t('auth.displayName')} error={errors.displayName?.message} required>
          <Input autoComplete="name" {...register('displayName')} />
        </Field>
        <Field label={t('auth.email')} error={errors.email?.message} required>
          <Input type="email" autoComplete="email" {...register('email')} />
        </Field>
        <Field
          label={t('auth.password')}
          hint={t('auth.passwordRule')}
          error={errors.password?.message}
          required
        >
          <Input type="password" autoComplete="new-password" {...register('password')} />
        </Field>
        <Field label={t('auth.confirmPassword')} error={errors.confirm?.message} required>
          <Input type="password" autoComplete="new-password" {...register('confirm')} />
        </Field>
        <Field label={t('auth.preferredLanguage')}>
          <Select
            {...register('preferredLanguage')}
            options={[
              { value: 'en', label: t('language.en') },
              { value: 'ar', label: t('language.ar') },
            ]}
          />
        </Field>
        {m.isError ? <Notice tone="danger">{errorMessage(m.error, t)}</Notice> : null}
        <Button type="submit" loading={m.isPending} style={{ inlineSize: '100%' }}>
          {t('auth.registerButton')}
        </Button>
        <p className="small" style={{ marginBlockStart: 'var(--space-4)' }}>
          {t('auth.haveAccount')} <Link to="/login">{t('nav.login')}</Link>
        </p>
      </form>
    </div>
  );
}
