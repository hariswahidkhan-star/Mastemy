import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ApiError } from '../../api/client';
import { awardsApi, isLinkedInAddUrl, msgKeys } from '../../api/finala';
import type { CompletionAwardDto, CredentialKind } from '../../api/finala';
import { useApiMutation } from '../../api/hooks';
import { w2keys } from '../../api/wave2';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Field';
import { Notice, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { FinalaError, finalaError } from './shared';

/** Visually and verbally distinct label for the two credential kinds. */
export function CredentialKindBadge({ kind }: { kind?: string | null }) {
  const { t } = useI18n();
  const k: CredentialKind = kind === 'Completion' ? 'Completion' : 'AssessedKnowledge';
  return (
    <span className={`finala-kind finala-kind--${k}`} data-testid="credential-kind">
      {t(`finala.cred.kind.${k}`)}
    </span>
  );
}

/** One-line explanation of what the credential attests (completion never claims assessed knowledge). */
export function CredentialKindNote({ kind }: { kind?: string | null }) {
  const { t } = useI18n();
  return (
    <p className="small muted" style={{ margin: 0 }}>
      {kind === 'Completion' ? t('finala.cred.completionNote') : t('finala.cred.assessedNote')}
    </p>
  );
}

/** Fetches the share payload and opens LinkedIn's add-to-profile flow. */
export function LinkedInShareButton({ certificateId }: { certificateId: string }) {
  const { t } = useI18n();
  const [error, setError] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const share = async () => {
    setBusy(true);
    setError(null);
    try {
      const s = await awardsApi.share(certificateId);
      if (!isLinkedInAddUrl(s.linkedInAddToProfileUrl)) throw new Error('unexpected share url');
      setUrl(s.linkedInAddToProfileUrl);
      window.open(s.linkedInAddToProfileUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };
  return (
    <span className="stack" style={{ gap: 'var(--space-1)' }}>
      <Button size="sm" variant="secondary" loading={busy} onClick={() => void share()}>
        {t('finala.cred.linkedin')}
      </Button>
      {url ? (
        <a
          className="small"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="linkedin-url"
        >
          {t('finala.cred.linkedinOpen')}
        </a>
      ) : null}
      {error ? (
        <span className="small finala-error" role="alert">
          {error instanceof ApiError && error.status === 409
            ? t('finala.errors.certificate_not_public')
            : error instanceof ApiError && error.status === 503
              ? t('finala.errors.verify_url_not_configured')
              : finalaError(error, t)}
        </span>
      ) : null}
    </span>
  );
}

/** Learner claim of a completion award (idempotent server-side). Rendered for enrolled learners only. */
export function CompletionAwardClaim({
  courseId,
  enrolled,
}: {
  courseId: string;
  enrolled: boolean;
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [award, setAward] = useState<CompletionAwardDto | null>(null);
  const claim = useApiMutation(
    () => awardsApi.claim(courseId),
    [w2keys.myCertificates],
    (a) => setAward(a),
  );
  if (!user || !enrolled) return null;
  return (
    <div className="stack finala-award-claim" style={{ gap: 'var(--space-2)' }}>
      {award ? (
        <Notice tone="success" title={t('finala.cred.claimed')}>
          <CredentialKindBadge kind="Completion" />{' '}
          <Link to={`/verify/${encodeURIComponent(award.code)}`}>{award.code}</Link>
          <CredentialKindNote kind="Completion" />
        </Notice>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          loading={claim.isPending}
          onClick={() => claim.mutate(undefined)}
        >
          {t('finala.cred.claim')}
        </Button>
      )}
      <FinalaError error={claim.error} />
    </div>
  );
}

/** Studio switch: issue completion awards for this course. */
export function CompletionAwardToggle({ courseId }: { courseId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const setting = useQuery({
    queryKey: msgKeys.completionAward(courseId),
    queryFn: () => awardsApi.setting(courseId),
  });
  const save = useApiMutation(
    (enabled: boolean) => awardsApi.setSetting(courseId, enabled),
    [msgKeys.completionAward(courseId)],
    (r) => toast.success(r.enabled ? t('finala.cred.awardsOn') : t('finala.cred.awardsOff')),
  );
  return (
    <section className="card stack" aria-labelledby="award-h">
      <h2 id="award-h">{t('finala.cred.studioTitle')}</h2>
      <p className="small muted">{t('finala.cred.studioHelp')}</p>
      <QueryState query={setting}>
        {(s) => (
          <Checkbox
            label={t('finala.cred.studioToggle')}
            checked={save.isPending ? !!save.variables : s.enabled}
            disabled={save.isPending}
            onChange={(e) => save.mutate(e.target.checked)}
          />
        )}
      </QueryState>
      <FinalaError error={save.error} />
    </section>
  );
}
