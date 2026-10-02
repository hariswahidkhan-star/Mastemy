import { useId, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import qrcode from 'qrcode-generator';
import { useMutation } from '@tanstack/react-query';
import { accountApi, groupSecret, normalizeRecoveryCode } from '../../api/account';
import type { MfaEnrollmentDto } from '../../api/account';
import { ApiError } from '../../api/client';
import type { AuthResponse } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input } from '../../components/ui/Field';
import { Notice } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';

/** Maps account/security problem codes to translated messages; falls back to the generic mapping. */
export function accountError(error: unknown, t: TFunction): string {
  if (error instanceof ApiError) {
    const codes = [
      'invalid_mfa_code',
      'invalid_mfa_challenge',
      'mfa_enrollment_not_started',
      'mfa_already_enabled',
      'mfa_required_for_role',
      'mfa_enrollment_required',
      'mfa_required',
      'email_not_configured',
      'email_already_verified',
      'invalid_token',
      'weak_password',
      'invalid_current_password',
      'password_unchanged',
      'confirmation_required',
      'last_superadmin',
      'invalid_timezone',
      'invalid_url',
      'too_many_links',
      'invalid_language',
      'invalid_headline',
      'invalid_bio',
      'invalid_evidence_type',
      'duplicate_skill',
      'email_not_verified',
    ];
    const hit = codes.find((c) => error.is(c));
    if (hit) return t(`account.error.${hit}`);
    if (error.status === 429) return t('account.error.rate_limited');
  }
  return errorMessage(error, t);
}

/** QR code rendered client-side as SVG; the secret never leaves the browser for rendering. */
export function QrCode({
  value,
  label,
  size = 196,
}: {
  value: string;
  label: string;
  size?: number;
}) {
  const path = useMemo(() => {
    const qr = qrcode(0, 'M');
    qr.addData(value);
    qr.make();
    const n = qr.getModuleCount();
    let d = '';
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + 4} ${r + 4}h1v1h-1z`;
    return { d, n: n + 8 };
  }, [value]);
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${path.n} ${path.n}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      style={{ display: 'block', background: '#fff', borderRadius: 8 }}
    >
      <rect width={path.n} height={path.n} fill="#fff" />
      <path d={path.d} fill="#000" />
    </svg>
  );
}

function CodeInput({
  value,
  onChange,
  label,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  error?: string;
}) {
  return (
    <Field label={label} error={error} required>
      <Input
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9 ]*"
        maxLength={7}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9 ]/g, ''))}
      />
    </Field>
  );
}

export const cleanCode = (v: string) => v.replace(/\s/g, '');

/** Shows freshly issued recovery codes once, with copy / download and an explicit acknowledgement. */
export function RecoveryCodesPanel({
  codes,
  onDone,
  doneLabel,
}: {
  codes: string[];
  onDone: () => void;
  doneLabel?: string;
}) {
  const { t } = useI18n();
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');
  const text = codes.join('\n');
  const headingId = useId();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied('ok');
    } catch {
      setCopied('fail');
    }
  };
  const download = () => {
    const blob = new Blob([`${t('account.mfa.codesFileHeader')}\n\n${text}\n`], {
      type: 'text/plain',
    });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = 'mastemy-recovery-codes.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  };
  return (
    <section aria-labelledby={headingId} className="stack">
      <h2 id={headingId} className="section__title">
        {t('account.mfa.codesTitle')}
      </h2>
      <Notice tone="warning">{t('account.mfa.codesOnce')}</Notice>
      <ul
        className="mono"
        aria-label={t('account.mfa.codesTitle')}
        data-recovery-codes
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
          gap: 'var(--space-2)',
        }}
      >
        {codes.map((c) => (
          <li key={c} dir="ltr">
            {c}
          </li>
        ))}
      </ul>
      <div className="row">
        <Button variant="secondary" size="sm" onClick={() => void copy()}>
          {t('account.mfa.copy')}
        </Button>
        <Button variant="secondary" size="sm" onClick={download}>
          {t('account.mfa.download')}
        </Button>
        <span aria-live="polite" className="small muted">
          {copied === 'ok'
            ? t('account.mfa.copied')
            : copied === 'fail'
              ? t('account.mfa.copyFailed')
              : ''}
        </span>
      </div>
      <Checkbox
        label={t('account.mfa.savedCodes')}
        checked={saved}
        onChange={(e) => setSaved(e.target.checked)}
      />
      <div>
        <Button disabled={!saved} onClick={onDone}>
          {doneLabel ?? t('account.mfa.continue')}
        </Button>
      </div>
    </section>
  );
}

/**
 * TOTP enrollment: start → scan QR (or type the key) → confirm a code → recovery codes. With `token` it uses the
 * restricted enrollment token from login; without, the normal session. `onDone` receives the new full session.
 */
export function MfaEnrollmentWizard({
  token,
  onDone,
  intro,
}: {
  token?: string;
  onDone: (session: AuthResponse) => void;
  intro?: string;
}) {
  const { t } = useI18n();
  const [enrollment, setEnrollment] = useState<MfaEnrollmentDto | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ codes: string[]; session: AuthResponse } | null>(null);
  const start = useMutation({
    mutationFn: () => accountApi.enroll(token),
    onSuccess: (e) => {
      setEnrollment(e);
      setCode('');
    },
  });
  const confirm = useMutation({
    mutationFn: (c: string) => accountApi.confirmEnroll(c, token),
    onSuccess: (r) => setResult({ codes: r.recoveryCodes, session: r.session }),
  });

  if (result)
    return (
      <RecoveryCodesPanel
        codes={result.codes}
        onDone={() => onDone(result.session)}
        doneLabel={t('account.mfa.finish')}
      />
    );

  if (!enrollment)
    return (
      <div className="stack">
        <p>{intro ?? t('account.mfa.enrollIntro')}</p>
        <ol className="small">
          <li>{t('account.mfa.step1')}</li>
          <li>{t('account.mfa.step2')}</li>
          <li>{t('account.mfa.step3')}</li>
        </ol>
        {start.isError ? <Notice tone="danger">{accountError(start.error, t)}</Notice> : null}
        <div>
          <Button loading={start.isPending} onClick={() => start.mutate()}>
            {t('account.mfa.begin')}
          </Button>
        </div>
      </div>
    );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (cleanCode(code).length === enrollment.digits) confirm.mutate(cleanCode(code));
  };
  const notStarted =
    confirm.error instanceof ApiError && confirm.error.is('mfa_enrollment_not_started');
  return (
    <form className="stack" onSubmit={submit} noValidate>
      <p>{t('account.mfa.scan')}</p>
      <div className="row" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <QrCode value={enrollment.otpAuthUri} label={t('account.mfa.qrLabel')} />
        <div className="stack" style={{ minInlineSize: 0, flex: '1 1 14rem' }}>
          <p className="small">{t('account.mfa.manual')}</p>
          <p>
            <span className="small muted">{t('account.mfa.setupKey')}</span>
            <br />
            <code
              className="mono"
              dir="ltr"
              data-mfa-secret={enrollment.secret}
              style={{ wordBreak: 'break-all' }}
            >
              {groupSecret(enrollment.secret)}
            </code>
          </p>
          <p className="small muted">
            {t('account.mfa.params', {
              digits: enrollment.digits,
              period: enrollment.periodSeconds,
              algorithm: enrollment.algorithm,
            })}
          </p>
        </div>
      </div>
      <CodeInput
        label={t('account.mfa.codeLabel')}
        value={code}
        onChange={setCode}
        error={
          code && cleanCode(code).length !== enrollment.digits
            ? t('account.mfa.codeLength', { n: enrollment.digits })
            : undefined
        }
      />
      {confirm.isError ? <Notice tone="danger">{accountError(confirm.error, t)}</Notice> : null}
      <div className="row">
        <Button
          type="submit"
          loading={confirm.isPending}
          disabled={cleanCode(code).length !== enrollment.digits}
        >
          {t('account.mfa.confirm')}
        </Button>
        {notStarted ? (
          <Button variant="secondary" onClick={() => start.mutate()} loading={start.isPending}>
            {t('account.mfa.restart')}
          </Button>
        ) : null}
      </div>
    </form>
  );
}

/** Second login step for users with MFA: a TOTP code or a one-time recovery code. */
export function MfaChallenge({
  mfaToken,
  onDone,
  onRestart,
}: {
  mfaToken: string;
  onDone: (session: AuthResponse) => void;
  onRestart: () => void;
}) {
  const { t } = useI18n();
  const [mode, setMode] = useState<'code' | 'recovery'>('code');
  const [code, setCode] = useState('');
  const [recovery, setRecovery] = useState('');
  const m = useMutation({
    mutationFn: () =>
      accountApi.verifyMfa(
        mfaToken,
        mode === 'code'
          ? { code: cleanCode(code) }
          : { recoveryCode: normalizeRecoveryCode(recovery) },
      ),
    onSuccess: onDone,
  });
  const expired = m.error instanceof ApiError && m.error.is('invalid_mfa_challenge');
  const ready =
    mode === 'code' ? cleanCode(code).length === 6 : normalizeRecoveryCode(recovery).length === 10;
  return (
    <form
      className="stack"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) m.mutate();
      }}
    >
      <p>{mode === 'code' ? t('account.mfa.challengeIntro') : t('account.mfa.recoveryIntro')}</p>
      {mode === 'code' ? (
        <CodeInput label={t('account.mfa.codeLabel')} value={code} onChange={setCode} />
      ) : (
        <Field label={t('account.mfa.recoveryLabel')} hint={t('account.mfa.recoveryHint')} required>
          <Input
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            dir="ltr"
            value={recovery}
            onChange={(e) => setRecovery(e.target.value)}
          />
        </Field>
      )}
      {m.isError ? <Notice tone="danger">{accountError(m.error, t)}</Notice> : null}
      {expired ? (
        <Button variant="secondary" onClick={onRestart}>
          {t('account.mfa.startOver')}
        </Button>
      ) : (
        <Button
          type="submit"
          loading={m.isPending}
          disabled={!ready}
          style={{ inlineSize: '100%' }}
        >
          {t('account.mfa.verify')}
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          m.reset();
          setMode(mode === 'code' ? 'recovery' : 'code');
        }}
      >
        {mode === 'code' ? t('account.mfa.useRecovery') : t('account.mfa.useCode')}
      </Button>
    </form>
  );
}
