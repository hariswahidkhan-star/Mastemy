import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { api, apiUrl, ApiError } from '../../api/client';
import { problemCode } from '../../api/commerce';
import { ORG_SLUG, safeReturnTo, SSO_ERROR_CODES } from '../../api/finalb';
import type { AuthResponse } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Field, Input } from '../../components/ui/Field';
import { Notice, PageHeader } from '../../components/ui/misc';
import { Spinner } from '../../components/ui/Spinner';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

export function ssoErrorMessage(code: string, t: TFunction): string {
  return (SSO_ERROR_CODES as readonly string[]).includes(code)
    ? t(`finalb.sso.err.${code}`)
    : t('finalb.sso.err.generic');
}

/** Login-page entry: "Sign in with your organization" + organization slug. */
export function OrgSignIn({ returnTo }: { returnTo?: string }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const clean = slug.trim().toLowerCase();
  const valid = ORG_SLUG.test(clean);
  if (!open)
    return (
      <p>
        <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
          {t('finalb.sso.signInOrg')}
        </Button>
      </p>
    );
  return (
    <form
      className="card card--flat"
      aria-label={t('finalb.sso.signInOrg')}
      onSubmit={(e) => {
        e.preventDefault();
        if (valid)
          navigate(
            `/sso/${encodeURIComponent(clean)}${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`,
          );
      }}
    >
      <Field
        label={t('finalb.sso.orgSlug')}
        hint={t('finalb.sso.orgSlugHint')}
        error={slug && !valid ? t('finalb.sso.orgSlugInvalid') : undefined}
      >
        <Input
          value={slug}
          autoComplete="organization"
          autoFocus
          onChange={(e) => setSlug(e.target.value)}
        />
      </Field>
      <Button type="submit" disabled={!valid}>
        {t('finalb.sso.continue')}
      </Button>
    </form>
  );
}

/**
 * `/sso/:slug`: checks that the organization offers SSO, then sends the browser to the API start endpoint
 * (which redirects to the identity provider). Errors (no SSO, server not configured) are explained here
 * instead of showing a raw API response.
 */
export function SsoStartPage() {
  const { slug = '' } = useParams();
  const [params] = useSearchParams();
  const { t } = useI18n();
  usePageMeta(t('finalb.sso.startTitle'), undefined, { noindex: true });
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);
  const target = apiUrl(
    `/api/sso/${encodeURIComponent(slug)}/start?returnTo=${encodeURIComponent(safeReturnTo(params.get('returnTo')))}`,
  );
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (!ORG_SLUG.test(slug)) {
      setError(t('finalb.sso.orgSlugInvalid'));
      return;
    }
    // A manual-redirect probe: a 302 means SSO is ready; a problem body explains why not.
    fetch(target, { redirect: 'manual', credentials: 'omit' })
      .then(async (res) => {
        if (res.type === 'opaqueredirect' || (res.status >= 300 && res.status < 400)) {
          window.location.assign(target);
          return;
        }
        let code = '';
        try {
          const body = (await res.json()) as { type?: string };
          code = (body.type ?? '').split('/').pop() ?? '';
        } catch {
          /* not JSON */
        }
        setError(ssoErrorMessage(code, t));
      })
      .catch(() => setError(t('errors.network')));
  }, [slug, target, t]);
  return (
    <div className="container page narrow">
      <PageHeader title={t('finalb.sso.startTitle')} />
      {error ? (
        <>
          <Notice tone="danger">{error}</Notice>
          <p>
            <Link to="/login">{t('finalb.sso.backToLogin')}</Link>
          </p>
        </>
      ) : (
        <Spinner label={t('finalb.sso.redirecting')} block />
      )}
    </div>
  );
}

/** `/sso/complete?handoff=…&returnTo=…` (or `?error=code`): exchanges the one-time handoff for a session. */
export function SsoCompletePage() {
  const [params, setParams] = useSearchParams();
  const { t } = useI18n();
  const { completeLogin } = useAuth();
  const navigate = useNavigate();
  usePageMeta(t('finalb.sso.completeTitle'), undefined, { noindex: true });
  const [error, setError] = useState<string | null>(() => {
    const e = params.get('error');
    if (e) return ssoErrorMessage(e, t);
    return params.get('handoff') ? null : ssoErrorMessage('invalid_handoff', t);
  });
  const ran = useRef(false);
  useEffect(() => {
    const handoff = params.get('handoff');
    if (ran.current || !handoff || params.get('error')) return;
    ran.current = true; // the handoff code is single use
    const returnTo = safeReturnTo(params.get('returnTo'));
    setParams({}, { replace: true }); // never leave the code in history
    api<AuthResponse>('/api/sso/exchange', {
      method: 'POST',
      body: { handoff },
      noRetry: true,
    })
      .then((res) => {
        completeLogin(res);
        navigate(returnTo, { replace: true });
      })
      .catch((e: unknown) => {
        const code = problemCode(e);
        setError(
          code
            ? ssoErrorMessage(code, t)
            : e instanceof ApiError && e.status === 429
              ? t('errors.rateLimited')
              : t('finalb.sso.err.generic'),
        );
      });
  }, [params, setParams, completeLogin, navigate, t]);
  return (
    <div className="container page narrow">
      <PageHeader title={t('finalb.sso.completeTitle')} />
      {error ? (
        <>
          <Notice tone="danger">
            <span data-testid="sso-error">{error}</span>
          </Notice>
          <p>
            <Link to="/login">{t('finalb.sso.backToLogin')}</Link>
          </p>
        </>
      ) : (
        <Spinner label={t('finalb.sso.signingIn')} block />
      )}
    </div>
  );
}
