import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nProvider';
import { useAuth } from '../../auth/AuthProvider';
import { useConsent, useConsentCookieDecided, useSetConsent } from '../../lib/analytics';
import { WsError } from './common';

// ---------- consent banner ----------
/**
 * Shown until the visitor or user makes a choice. Nothing is tracked before consent (events are only sent by
 * `useTrackEvent` when the server reports analytics=true). A visitor without the consent cookie gets the
 * banner in the server HTML (and the first client render); signed-in users wait for the server's answer,
 * since their choice may be stored on the account.
 */
export function ConsentBanner() {
  const { t } = useI18n();
  const consent = useConsent();
  const setConsent = useSetConsent();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const ref = useRef<HTMLElement>(null);
  const { user } = useAuth();
  const cookieDecided = useConsentCookieDecided();
  const shown = consent.ready ? !consent.decided : !user && !cookieDecided;
  // Reserve the docked banner's height at the bottom of the page (see .ws-consent).
  useEffect(() => {
    const el = ref.current;
    if (!shown || !el) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--consent-h', `${el.offsetHeight}px`);
    update();
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    ro?.observe(el);
    // Keep keyboard focus clear of the docked banner (WCAG 2.4.11): scroll a control it would cover.
    const clear = (target: HTMLElement | null) => {
      if (!target?.getBoundingClientRect) return;
      if (el.contains(target)) {
        el.classList.remove('ws-consent--yield'); // focus is in the banner: it must be fully visible
        return;
      }
      // Keyboard focus only: scrolling under a pointer press would move the target away from the click.
      if (!target.matches(':focus-visible')) return;
      el.classList.remove('ws-consent--yield');
      const limit = window.innerHeight - el.offsetHeight;
      let r = target.getBoundingClientRect();
      if (r.bottom > limit) {
        window.scrollBy({ top: r.bottom - limit + 8, behavior: 'instant' });
        r = target.getBoundingClientRect();
      }
      // Controls inside sticky/fixed containers (course sidebar, mobile menu) cannot be scrolled clear: the
      // banner slides out of the way until focus returns to it, so focus is never obscured (WCAG 2.4.11).
      if (r.bottom > limit && r.top < window.innerHeight) el.classList.add('ws-consent--yield');
    };
    const onFocus = (e: FocusEvent) => clear(e.target as HTMLElement | null);
    // The banner may arrive after the visitor has started tabbing.
    clear(document.activeElement as HTMLElement | null);
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('focusin', onFocus);
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
      {/* Compact by default: a short summary, with the full explanation one click away. */}
      <p className="small">{t('workspace.consent.summary')}</p>
      <details className="small ws-consent__details">
        <summary>{t('workspace.consent.details')}</summary>
        <p>{t('workspace.consent.body')}</p>
      </details>
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
