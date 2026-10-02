import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { accountApi, accountKeys } from '../../api/account';
import type { SessionDto } from '../../api/account';
import { useApiMutation } from '../../api/hooks';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { Field, Input } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { passwordSchema } from './EmailPages';
import { accountError, cleanCode, MfaEnrollmentWizard, RecoveryCodesPanel } from './Mfa';

/** Sub-navigation shared by the account settings pages. */
export function AccountNav() {
  const { t } = useI18n();
  const items = [
    ['/me/profile', t('account.nav.profile')],
    ['/me/security', t('account.nav.security')],
    ['/me/skills', t('account.nav.skills')],
    ['/welcome', t('account.nav.goals')],
    ['/me/settings/notifications', t('account.nav.notifications')],
    ['/me/privacy', t('account.nav.privacy')],
  ] as const;
  return (
    <nav
      aria-label={t('account.nav.label')}
      className="side-nav"
      style={{ marginBlockEnd: 'var(--space-4)' }}
    >
      <ul
        className="row"
        style={{ listStyle: 'none', padding: 0, flexWrap: 'wrap', gap: 'var(--space-2)' }}
      >
        {items.map(([to, label]) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function AccountShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="container page">
      <PageHeader title={title} subtitle={subtitle} />
      <AccountNav />
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card stack" style={{ marginBlockEnd: 'var(--space-5)' }}>
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  );
}

function MfaSection() {
  const { t, fmtDate } = useI18n();
  const { completeLogin } = useAuth();
  const toast = useToast();
  const qc = useQueryClient();
  const status = useQuery({
    queryKey: accountKeys.mfaStatus,
    queryFn: () => accountApi.mfaStatus(),
  });
  const [mode, setMode] = useState<'idle' | 'enroll' | 'regen' | 'disable'>('idle');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [codes, setCodes] = useState<string[] | null>(null);
  const reset = () => {
    setMode('idle');
    setCode('');
    setPassword('');
  };
  const regen = useApiMutation(
    () => accountApi.regenerateCodes(cleanCode(code)),
    [accountKeys.mfaStatus],
    (r) => {
      setCodes(r.recoveryCodes);
      reset();
    },
  );
  const disable = useApiMutation(
    () => accountApi.disableMfa(password, cleanCode(code)),
    [accountKeys.mfaStatus, accountKeys.profile],
    () => {
      reset();
      toast.success(t('account.mfa.disabled'));
    },
  );

  return (
    <Section title={t('account.mfa.title')}>
      <QueryState query={status}>
        {(s) =>
          codes ? (
            <RecoveryCodesPanel codes={codes} onDone={() => setCodes(null)} />
          ) : mode === 'enroll' ? (
            <MfaEnrollmentWizard
              onDone={(session) => {
                completeLogin(session);
                setMode('idle');
                void qc.invalidateQueries({ queryKey: ['account'] });
                toast.success(t('account.mfa.enabledToast'));
              }}
            />
          ) : (
            <div className="stack">
              <p>
                {s.enabled ? (
                  <Badge tone="success">{t('account.mfa.on')}</Badge>
                ) : (
                  <Badge tone="warning">{t('account.mfa.off')}</Badge>
                )}{' '}
                {s.required ? <Badge tone="info">{t('account.mfa.requiredBadge')}</Badge> : null}
              </p>
              {s.enabled ? (
                <p className="small muted">
                  {t('account.mfa.enabledSince', { date: fmtDate(s.enabledAt) })}{' '}
                  {t('account.mfa.remaining', { n: s.remainingRecoveryCodes })}
                </p>
              ) : (
                <p className="small">{t('account.mfa.offHelp')}</p>
              )}
              {s.enabled && s.remainingRecoveryCodes <= 3 ? (
                <Notice tone="warning">{t('account.mfa.lowCodes')}</Notice>
              ) : null}
              {!s.enabled ? (
                <div>
                  <Button onClick={() => setMode('enroll')}>{t('account.mfa.enable')}</Button>
                </div>
              ) : mode === 'idle' ? (
                <div className="row">
                  <Button variant="secondary" onClick={() => setMode('regen')}>
                    {t('account.mfa.regenerate')}
                  </Button>
                  {!s.required ? (
                    <Button variant="danger" onClick={() => setMode('disable')}>
                      {t('account.mfa.disable')}
                    </Button>
                  ) : null}
                </div>
              ) : (
                <form
                  className="stack"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (mode === 'regen') regen.mutate(undefined);
                    else disable.mutate(undefined);
                  }}
                >
                  <p className="small">
                    {mode === 'regen' ? t('account.mfa.regenHelp') : t('account.mfa.disableHelp')}
                  </p>
                  {mode === 'disable' ? (
                    <Field label={t('account.password.current')} required>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Field>
                  ) : null}
                  <Field label={t('account.mfa.codeLabel')} required>
                    <Input
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={7}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/[^0-9 ]/g, ''))}
                    />
                  </Field>
                  {regen.isError || disable.isError ? (
                    <Notice tone="danger">{accountError(regen.error ?? disable.error, t)}</Notice>
                  ) : null}
                  <div className="row">
                    <Button
                      type="submit"
                      variant={mode === 'disable' ? 'danger' : 'primary'}
                      loading={regen.isPending || disable.isPending}
                      disabled={cleanCode(code).length !== 6 || (mode === 'disable' && !password)}
                    >
                      {mode === 'regen' ? t('account.mfa.regenerate') : t('account.mfa.disable')}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        regen.reset();
                        disable.reset();
                        reset();
                      }}
                    >
                      {t('common.cancel')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )
        }
      </QueryState>
    </Section>
  );
}

function PasswordSection() {
  const { t } = useI18n();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const schema = useMemo(
    () =>
      z
        .object({
          current: z.string().min(1, t('validation.required')),
          password: passwordSchema(t),
          confirm: z.string(),
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
  } = useForm<V>({ resolver: zodResolver(schema) });
  const change = useApiMutation(
    (v: V) => accountApi.changePassword(v.current, v.password),
    [],
    () => {
      // Every refresh token was revoked by the server: sign in again with the new password.
      toast.success(t('account.password.changed'));
      navigate('/login', { replace: true });
      void logout();
    },
  );
  return (
    <Section title={t('account.password.changeTitle')}>
      <form className="stack" noValidate onSubmit={handleSubmit((v) => change.mutate(v))}>
        <Field label={t('account.password.current')} error={errors.current?.message} required>
          <Input type="password" autoComplete="current-password" {...register('current')} />
        </Field>
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
        <p className="small muted">{t('account.password.changeNote')}</p>
        {change.isError ? <Notice tone="danger">{accountError(change.error, t)}</Notice> : null}
        <div>
          <Button type="submit" loading={change.isPending}>
            {t('account.password.changeButton')}
          </Button>
        </div>
      </form>
    </Section>
  );
}

/** Short, human description of a user agent string (no fingerprinting, just the obvious parts). */
export function describeAgent(ua: string): string {
  if (!ua) return '';
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /Firefox\//.test(ua)
      ? 'Firefox'
      : /Chrome\//.test(ua)
        ? 'Chrome'
        : /Safari\//.test(ua)
          ? 'Safari'
          : '';
  const os = /Windows/.test(ua)
    ? 'Windows'
    : /Android/.test(ua)
      ? 'Android'
      : /iPhone|iPad/.test(ua)
        ? 'iOS'
        : /Mac OS X/.test(ua)
          ? 'macOS'
          : /Linux/.test(ua)
            ? 'Linux'
            : '';
  const both = [browser, os].filter(Boolean).join(' · ');
  return both || ua.slice(0, 60);
}

function SessionsSection() {
  const { t, fmtDate } = useI18n();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const sessions = useQuery({ queryKey: accountKeys.sessions, queryFn: accountApi.sessions });
  const [confirmAll, setConfirmAll] = useState(false);
  const signOut = () => {
    navigate('/login', { replace: true });
    void logout();
  };
  const revoke = useApiMutation(
    (s: SessionDto) => accountApi.revokeSession(s.id),
    [accountKeys.sessions],
    (_r, s) => {
      if (s.current) signOut();
      else toast.success(t('account.sessions.revoked'));
    },
  );
  const revokeAll = useApiMutation(
    () => accountApi.revokeAll(),
    [],
    () => {
      setConfirmAll(false);
      signOut();
    },
  );
  const when = (iso: string) => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '' : `${fmtDate(iso)} ${d.toLocaleTimeString()}`;
  };
  return (
    <Section title={t('account.sessions.title')}>
      <p className="small muted">{t('account.sessions.note')}</p>
      <QueryState query={sessions}>
        {(list) =>
          list.length === 0 ? (
            <p>{t('account.sessions.none')}</p>
          ) : (
            <>
              <div className="table-wrap">
                <table className="table">
                  <caption className="visually-hidden">{t('account.sessions.title')}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t('account.sessions.device')}</th>
                      <th scope="col">{t('account.sessions.ip')}</th>
                      <th scope="col">{t('account.sessions.lastUsed')}</th>
                      <th scope="col">{t('account.sessions.started')}</th>
                      <th scope="col">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((s) => (
                      <tr key={s.id} data-session-id={s.id}>
                        <td>
                          <span title={s.userAgent}>
                            {describeAgent(s.userAgent) || t('account.sessions.unknownDevice')}
                          </span>{' '}
                          {s.current ? (
                            <Badge tone="accent">{t('account.sessions.current')}</Badge>
                          ) : null}{' '}
                          {s.mfaAuthenticated ? (
                            <Badge tone="success">{t('account.sessions.mfa')}</Badge>
                          ) : null}
                        </td>
                        <td dir="ltr">{s.lastIpAddress || s.ipAddress || '—'}</td>
                        <td>{when(s.lastUsedAt)}</td>
                        <td>{when(s.createdAt)}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="secondary"
                            loading={revoke.isPending && revoke.variables?.id === s.id}
                            onClick={() => revoke.mutate(s)}
                          >
                            {s.current
                              ? t('account.sessions.signOutHere')
                              : t('account.sessions.revoke')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {revoke.isError ? (
                <Notice tone="danger">{accountError(revoke.error, t)}</Notice>
              ) : null}
              <div>
                <Button variant="danger" onClick={() => setConfirmAll(true)}>
                  {t('account.sessions.revokeAll')}
                </Button>
              </div>
            </>
          )
        }
      </QueryState>
      <ConfirmDialog
        open={confirmAll}
        title={t('account.sessions.revokeAllTitle')}
        body={t('account.sessions.revokeAllBody')}
        confirmLabel={t('account.sessions.revokeAll')}
        danger
        loading={revokeAll.isPending}
        onConfirm={() => revokeAll.mutate(undefined)}
        onCancel={() => setConfirmAll(false)}
      />
    </Section>
  );
}

export function SecurityPage() {
  const { t } = useI18n();
  usePageMeta(t('account.security.title'), undefined, { noindex: true });
  return (
    <AccountShell title={t('account.security.title')} subtitle={t('account.security.subtitle')}>
      <MfaSection />
      <PasswordSection />
      <SessionsSection />
    </AccountShell>
  );
}
