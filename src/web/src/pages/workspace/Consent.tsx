import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nProvider';
import { useConsent, useSetConsent } from '../../lib/analytics';
import { WsError } from './common';

// ---------- consent banner ----------
/**
 * Shown until the visitor or user makes a choice. Nothing is tracked before consent (events are only sent by
 * `useTrackEvent` when the server reports analytics=true). Renders nothing during SSR / first paint.
 */
export function ConsentBanner() {
  const { t } = useI18n();
  const consent = useConsent();
  const setConsent = useSetConsent();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  if (!consent.ready || consent.decided) return null;
  const choose = (analytics: boolean) => {
    setBusy(true);
    setError(null);
    setConsent(analytics)
      .catch((e: unknown) => setError(e))
      .finally(() => setBusy(false));
  };
  return (
    <section className="ws-consent" role="region" aria-labelledby="ws-consent-h">
      <h2 id="ws-consent-h">{t('workspace.consent.title')}</h2>
      <p className="small">{t('workspace.consent.body')}</p>
      <div className="row">
        <Button size="sm" loading={busy} onClick={() => choose(true)}>
          {t('workspace.consent.accept')}
        </Button>
        <Button size="sm" variant="secondary" disabled={busy} onClick={() => choose(false)}>
          {t('workspace.consent.decline')}
        </Button>
      </div>
      <WsError error={error} />
    </section>
  );
}

/** Footer control to change the choice later. */
export function ConsentSettingsButton() {
  const { t } = useI18n();
  const consent = useConsent();
  const setConsent = useSetConsent();
  if (!consent.ready) return null;
  return (
    <button
      type="button"
      className="btn btn--ghost btn--sm"
      onClick={() => void setConsent(!consent.analytics).catch(() => undefined)}
    >
      {consent.analytics ? t('workspace.consent.withdraw') : t('workspace.consent.allow')}
    </button>
  );
}
