import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { accountApi } from '../../api/account';
import { ApiError } from '../../api/client';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Field, Input } from '../../components/ui/Field';
import { Notice } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { accountError } from './Mfa';

/** Server password rule (IdentityValidation.RequirePassword): ≥10 chars, a letter and a digit. */
export function passwordSchema(t: TFunction) {
  return z
    .string()
    .min(10, t('account.password.rule'))
    .max(256, t('account.password.rule'))
    .regex(/[A-Za-z]/, t('account.password.rule'))
    .regex(/[0-9]/, t('account.password.rule'));
}

/** Banner for signed-in users whose address is not verified yet, with a resend action. */
export function EmailVerificationBanner() {
  const { t } = useI18n();
  const { user, refreshUser } = useAuth();
  const resend = useMutation({
    mutationFn: () => accountApi.resendEmail(),
    onError: (e) => {
      if (e instanceof ApiError && e.is('email_already_verified')) void refreshUser();
    },
  });
  if (!user || user.emailVerified !== false) return null;
  return (
    <div className="container" style={{ paddingBlockStart: 'var(--space-3)' }}>
      <Notice tone="warning" title={t('account.verify.bannerTitle')}>
        <div className="row row--between" style={{ flexWrap: 'wrap' }}>
          <span>{t('account.verify.bannerText', { email: user.email })}</span>
          <Button
            size="sm"
            variant="secondary"
            loading={resend.isPending}
            onClick={() => resend.mutate()}
          >
            {t('account.verify.resend')}
          </Button>
        </div>
        <p aria-live="polite" className="small" style={{ margin: 0 }}>
          {resend.isSuccess ? t('account.verify.resent') : null}
          {resend.isError ? accountError(resend.error, t) : null}
        </p>
      </Notice>
    </div>
  );
}

/** `/verify-email?token=` — explicit confirmation so link scanners cannot consume the single-use token. */
export function VerifyEmailPage() {
  const { t } = useI18n();
  const { user, refreshUser } = useAuth();
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  usePageMeta(t('account.verify.title'), undefined, { noindex: true });
  const m = useMutation({
    mutationFn: () => accountApi.verifyEmail(token),
    onSuccess: () => {
      if (user) void refreshUser();
    },
  });
  return (
    <div className="container page" style={{ maxInlineSize: 520 }}>
      <div className="card stack">
        <h1 className="page-title">{t('account.verify.title')}</h1>
        {!token ? (
          <Notice tone="danger">{t('account.verify.missingToken')}</Notice>
        ) : m.isSuccess ? (
          <>
            <Notice tone="success">{t('account.verify.done')}</Notice>
            <p>
              {user ? (
                <Link to="/me">{t('account.common.toDashboard')}</Link>
              ) : (
                <Link to="/login">{t('nav.login')}</Link>
              )}
            </p>
          </>
        ) : (
          <>
            <p>{t('account.verify.intro')}</p>
            {m.isError ? <Notice tone="danger">{accountError(m.error, t)}</Notice> : null}
            {m.isError && user && user.emailVerified === false ? (
              <p className="small">{t('account.verify.requestNew')}</p>
            ) : null}
            <div>
              <Button loading={m.isPending} onClick={() => m.mutate()}>
                {t('account.verify.confirm')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  const { t } = useI18n();
  usePageMeta(t('account.password.forgotTitle'), undefined, { noindex: true });
  const schema = useMemo(
    () => z.object({ email: z.string().trim().email(t('validation.email')) }),
    [t],
  );
  type V = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<V>({ resolver: zodResolver(schema) });
  const m = useMutation({ mutationFn: (v: V) => accountApi.forgot(v.email) });
  const notConfigured = m.error instanceof ApiError && m.error.is('email_not_configured');
  return (
    <div className="container page" style={{ maxInlineSize: 480 }}>
      <form className="card stack" onSubmit={handleSubmit((v) => m.mutate(v))} noValidate>
        <h1 className="page-title">{t('account.password.forgotTitle')}</h1>
        {m.isSuccess ? (
          <Notice tone="success">{t('account.password.forgotSent')}</Notice>
        ) : (
          <>
            <p className="muted">{t('account.password.forgotIntro')}</p>
            <Field label={t('auth.email')} error={errors.email?.message} required>
              <Input type="email" autoComplete="email" {...register('email')} />
            </Field>
            {notConfigured ? (
              <Notice tone="warning">{t('account.error.email_not_configured')}</Notice>
            ) : m.isError ? (
              <Notice tone="danger">{accountError(m.error, t)}</Notice>
            ) : null}
            <Button type="submit" loading={m.isPending} style={{ inlineSize: '100%' }}>
              {t('account.password.sendLink')}
            </Button>
          </>
        )}
        <p className="small">
          <Link to="/login">{t('account.password.backToLogin')}</Link>
        </p>
      </form>
    </div>
  );
}

export function ResetPasswordPage() {
  const { t } = useI18n();
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const [done, setDone] = useState(false);
  usePageMeta(t('account.password.resetTitle'), undefined, { noindex: true });
  const schema = useMemo(
    () =>
      z
        .object({ password: passwordSchema(t), confirm: z.string() })
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
  } = useForm<V>({ resolver: zodResolver(schema) });
  const m = useMutation({
    mutationFn: (v: V) => accountApi.reset(token, v.password),
    onSuccess: () => setDone(true),
  });
  const invalid = m.error instanceof ApiError && m.error.is('invalid_token');
  return (
    <div className="container page" style={{ maxInlineSize: 480 }}>
      <form className="card stack" onSubmit={handleSubmit((v) => m.mutate(v))} noValidate>
        <h1 className="page-title">{t('account.password.resetTitle')}</h1>
        {!token ? (
          <Notice tone="danger">{t('account.password.missingToken')}</Notice>
        ) : done ? (
          <>
            <Notice tone="success">{t('account.password.resetDone')}</Notice>
            <p>
              <Link to="/login">{t('nav.login')}</Link>
            </p>
          </>
        ) : (
          <>
            <Field
              label={t('account.password.new')}
              hint={t('account.password.rule')}
              error={errors.password?.message}
              required
            >
              <Input type="password" autoComplete="new-password" {...register('password')} />
            </Field>
            <Field label={t('auth.confirmPassword')} error={errors.confirm?.message} required>
              <Input type="password" autoComplete="new-password" {...register('confirm')} />
            </Field>
            {m.isError ? <Notice tone="danger">{accountError(m.error, t)}</Notice> : null}
            {invalid ? (
              <p className="small">
                <Link to="/forgot-password">{t('account.password.requestNew')}</Link>
              </p>
            ) : null}
            <Button type="submit" loading={m.isPending} style={{ inlineSize: '100%' }}>
              {t('account.password.resetButton')}
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
