import { useEffect, useRef, useState } from 'react';
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
  const ref = useRef<HTMLElement>(null);
  const shown = consent.ready && !consent.decided;
  // Reserve the docked banner's height at the bottom of the page (see .ws-consent).
  useEffect(() => {
    const el = ref.current;
    if (!shown || !el) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--consent-h', `${el.offsetHeight}px`);
    update();
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      root.style.removeProperty('--consent-h');
    };
  }, [shown]);
  if (!shown) return null;
  const choose = (analytics: boolean) => {
    setBusy(true);
    setError(null);
    setConsent(analytics)
      .catch((e: unknown) => setError(e))
      .finally(() => setBusy(false));
  };
  return (
    <section ref={ref} className="ws-consent" role="region" aria-labelledby="ws-consent-h">
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
