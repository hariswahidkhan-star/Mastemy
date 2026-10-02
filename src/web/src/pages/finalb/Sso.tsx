import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { apiUrl, ApiError, getAccessToken } from '../../api/client';
import type { ProblemDetails } from '../../api/types';
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

/** Codes added with domain verification, explicit account linking and browser binding. */
const MORE_SSO_ERROR_CODES = [
  'sso_link_required',
  'sso_session_mismatch',
  'sso_link_email_mismatch',
  'sso_identity_in_use',
  'sso_already_linked',
  'sso_account_suspended',
  'sso_conflict',
] as const;

export function ssoErrorMessage(code: string, t: TFunction): string {
  return (SSO_ERROR_CODES as readonly string[]).includes(code) ||
    (MORE_SSO_ERROR_CODES as readonly string[]).includes(code)
    ? t(`finalb.sso.err.${code}`)
    : t('finalb.sso.err.generic');
}

/**
 * POST to an /api/sso endpoint with cookies included: the SSO browser-binding cookie (HttpOnly, path /api/sso) must
 * travel with link-start and exchange, also when the API is on another origin.
 */
async function ssoPost<T>(path: string, body: unknown): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    let problem: ProblemDetails | null = null;
    try {
      const p = JSON.parse(text) as Partial<ProblemDetails>;
      problem = {
        status: p.status ?? res.status,
        title: p.title ?? '',
        type: p.type ?? '',
        detail: p.detail,
      };
    } catch {
      /* not JSON */
    }
    throw new ApiError(res.status, problem, res.statusText || `HTTP ${res.status}`);
  }
  return JSON.parse(text) as T;
}

function ssoFailure(e: unknown, t: TFunction): string {
  const code = problemCode(e);
  if (code) return ssoErrorMessage(code, t);
  if (e instanceof ApiError && e.status === 429) return t('errors.rateLimited');
  if (e instanceof ApiError && e.status === 401) return t('finalb.sso.linkSignIn');
  return e instanceof TypeError ? t('errors.network') : t('finalb.sso.err.generic');
}

/**
 * Security settings: "Link organization SSO". Only a signed-in user (password + MFA when enrolled) can bind an
 * organization identity to their account; the identity provider's email must match this account's verified email.
 */
export function OrgSsoLinkSection() {
  const { t } = useI18n();
  const [slug, setSlug] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clean = slug.trim().toLowerCase();
  const valid = ORG_SLUG.test(clean);
  return (
    <section
      className="card stack"
      aria-labelledby="sso-link-h"
      style={{ marginBlockEnd: 'var(--space-5)' }}
    >
      <h2 id="sso-link-h">{t('finalb.sso.linkTitle')}</h2>
      <p className="small muted">{t('finalb.sso.linkNote')}</p>
      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid || busy) return;
          setBusy(true);
          setError(null);
          ssoPost<{ authorizationUrl: string }>(
            `/api/sso/${encodeURIComponent(clean)}/link/start`,
            { returnTo: '/me/security' },
          )
            .then((r) => window.location.assign(r.authorizationUrl))
            .catch((err: unknown) => {
              setBusy(false);
              setError(ssoFailure(err, t));
            });
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
            onChange={(e) => setSlug(e.target.value)}
          />
        </Field>
        {error ? (
          <Notice tone="danger">
            <span data-testid="sso-link-error">{error}</span>
          </Notice>
        ) : null}
        <div>
          <Button type="submit" disabled={!valid} loading={busy}>
            {t('finalb.sso.linkButton')}
          </Button>
        </div>
      </form>
    </section>
  );
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
  const [errorCode] = useState(() => params.get('error') ?? '');
  const [linked] = useState(() => params.get('linked'));
  const [linkedReturn] = useState(() => safeReturnTo(params.get('returnTo') ?? '/me/security'));
  const [error, setError] = useState<string | null>(() => {
    const e = params.get('error');
    if (e) return ssoErrorMessage(e, t);
    if (params.get('linked')) return null;
    return params.get('handoff') ? null : ssoErrorMessage('invalid_handoff', t);
  });
  const ran = useRef(false);
  useEffect(() => {
    const handoff = params.get('handoff');
    if (ran.current || !handoff || params.get('error') || params.get('linked')) return;
    ran.current = true; // the handoff code is single use
    const returnTo = safeReturnTo(params.get('returnTo'));
    setParams({}, { replace: true }); // never leave the code in history
    // The exchange must carry the HttpOnly browser-binding cookie set by the callback.
    ssoPost<AuthResponse>('/api/sso/exchange', { handoff })
      .then((res) => {
        completeLogin(res);
        navigate(returnTo, { replace: true });
      })
      .catch((e: unknown) => setError(ssoFailure(e, t)));
  }, [params, setParams, completeLogin, navigate, t]);
  return (
    <div className="container page narrow">
      <PageHeader title={t('finalb.sso.completeTitle')} />
      {error ? (
        <>
          <Notice tone="danger">
            <span data-testid="sso-error">{error}</span>
          </Notice>
          {errorCode === 'sso_link_required' ? (
            <section className="card card--flat" aria-labelledby="sso-link-help-h">
              <h2 id="sso-link-help-h" className="h4">
                {t('finalb.sso.linkHelpTitle')}
              </h2>
              <p>{t('finalb.sso.linkHelp')}</p>
              <p>
                <Link
                  className="btn btn--primary"
                  to={`/login?next=${encodeURIComponent('/me/security')}`}
                >
                  {t('finalb.sso.signInWithPassword')}
                </Link>
              </p>
            </section>
          ) : (
            <p>
              <Link to="/login">{t('finalb.sso.backToLogin')}</Link>
            </p>
          )}
        </>
      ) : linked ? (
        <>
          <Notice tone="success">
            <span data-testid="sso-linked">{t('finalb.sso.linked', { org: linked })}</span>
          </Notice>
          <p>
            <Link to={linkedReturn}>{t('finalb.sso.linkedContinue')}</Link>
          </p>
        </>
      ) : (
        <Spinner label={t('finalb.sso.signingIn')} block />
      )}
    </div>
  );
}
