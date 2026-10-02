import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';
import type { CertificateDto } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { ErrorState } from '../../components/ui/ErrorState';
import { Field, Input } from '../../components/ui/Field';
import { Notice, PageHeader } from '../../components/ui/misc';
import { Spinner } from '../../components/ui/Spinner';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { CredentialKindBadge } from '../finala/Credentials';

function VerifyResult({ code }: { code: string }) {
  const { t, fmtDate } = useI18n();
  const q = useQuery({
    queryKey: ['verify', code],
    queryFn: () => api<CertificateDto>(`/api/certificates/verify/${encodeURIComponent(code)}`),
    retry: false,
  });
  if (q.isPending) return <Spinner label={t('verify.checking')} block />;
  if (q.isError) {
    if (q.error instanceof ApiError && q.error.status === 404)
      return (
        <Notice tone="danger" title={t('verify.notFoundTitle')}>
          {t('verify.notFoundBody', { code })}
        </Notice>
      );
    return <ErrorState error={q.error} onRetry={() => void q.refetch()} />;
  }
  const c = q.data;
  const valid = c.status === 'Valid';
  return (
    <div className="card" aria-live="polite">
      <Notice
        tone={valid ? 'success' : 'danger'}
        title={valid ? t('verify.valid') : t('verify.revoked')}
      >
        {valid ? t('verify.validBody') : (c.revocationReason ?? t('verify.revokedBody'))}
      </Notice>
      <p className="row" style={{ marginBlock: 'var(--space-3)' }}>
        <CredentialKindBadge kind={c.kind} />
        {c.title ? <strong>{c.title}</strong> : null}
      </p>
      {c.verificationLabel ? (
        <p className="small" data-testid="verification-label">
          {c.verificationLabel}
        </p>
      ) : null}
      <dl className="kv">
        <dt>{t('verify.code')}</dt>
        <dd className="mono">{c.code}</dd>
        <dt>{t('verify.recipient')}</dt>
        <dd>{c.recipientName}</dd>
        <dt>{t('verify.course')}</dt>
        <dd>{c.courseTitle}</dd>
        <dt>{t('verify.issued')}</dt>
        <dd>{fmtDate(c.issuedAt)}</dd>
        {c.assessmentCriteria ? (
          <>
            <dt>{t('verify.criteria')}</dt>
            <dd>{c.assessmentCriteria}</dd>
          </>
        ) : null}
      </dl>
      <p className="small muted" style={{ marginBlockStart: 'var(--space-4)' }}>
        {t('verify.disclaimer')}
      </p>
    </div>
  );
}

export function VerifyPage() {
  const { code } = useParams();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [input, setInput] = useState(code ?? '');
  usePageMeta(t('verify.title'), t('verify.subtitle'));
  return (
    <div className="container page" style={{ maxInlineSize: 760 }}>
      <PageHeader title={t('verify.title')} subtitle={t('verify.subtitle')} />
      <form
        className="card card--flat"
        onSubmit={(e) => {
          e.preventDefault();
          const v = input.trim();
          if (v) navigate(`/verify/${encodeURIComponent(v)}`);
        }}
      >
        <Field label={t('verify.code')} hint={t('verify.codeHint')}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            required
            maxLength={64}
          />
        </Field>
        <Button type="submit">{t('verify.submit')}</Button>
      </form>
      {code ? (
        <div style={{ marginBlockStart: 'var(--space-5)' }}>
          <VerifyResult code={code} />
        </div>
      ) : null}
    </div>
  );
}
