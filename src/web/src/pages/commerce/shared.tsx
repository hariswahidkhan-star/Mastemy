import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { api } from '../../api/client';
import type { AffiliateClickDto } from '../../api/commerce';
import { problemCode } from '../../api/commerce';
import { errorMessage } from '../../components/ui/ErrorState';
import { Badge, Notice } from '../../components/ui/misc';
import type { BadgeTone } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { parseAttributionParams, readAttribution, writeAttribution } from '../../lib/attribution';

/** Translated message for a commerce problem code, falling back to the generic error text. */
export function commerceError(e: unknown, t: TFunction): string {
  const code = problemCode(e);
  if (code) {
    const key = `commerce.errors.${code}`;
    const msg = t(key);
    if (msg !== key) return msg;
  }
  return errorMessage(e, t);
}

const TONES: Record<string, BadgeTone> = {
  Active: 'success',
  Paid: 'success',
  Approved: 'success',
  Completed: 'success',
  Verified: 'success',
  Won: 'success',
  ok: 'success',
  Scheduled: 'info',
  Proposed: 'warning',
  PendingApproval: 'warning',
  Pending: 'warning',
  Requested: 'warning',
  Submitted: 'warning',
  Open: 'warning',
  PastDue: 'warning',
  Draft: 'neutral',
  Lost: 'danger',
  Rejected: 'danger',
  Failed: 'danger',
  mismatch: 'danger',
  Disabled: 'neutral',
  Canceled: 'neutral',
  Cancelled: 'neutral',
  Ended: 'neutral',
  Retired: 'neutral',
  Inactive: 'neutral',
};

/** Status badge for commerce enums; unknown values are shown verbatim rather than as a missing key. */
export function CStatus({ status }: { status: string }) {
  const { t } = useI18n();
  const key = `commerce.status.${status}`;
  const label = t(key);
  return <Badge tone={TONES[status] ?? 'neutral'}>{label === key ? status : label}</Badge>;
}

/** Spec §2: shown on every purchase surface. */
export function StudyServicesNotice() {
  const { t } = useI18n();
  return (
    <Notice tone="info" title={t('commerce.notice.title')}>
      <p style={{ margin: 0 }}>{t('commerce.notice.body')}</p>
    </Notice>
  );
}

/** Scheduled offer badge with its real end time; deliberately no countdown. */
export function OfferBadge({ name, endsAt }: { name?: string; endsAt: string }) {
  const { t, lang } = useI18n();
  const d = new Date(endsAt);
  const when = Number.isNaN(d.getTime())
    ? endsAt
    : new Intl.DateTimeFormat(lang === 'ar' ? 'ar' : 'en', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'UTC',
      }).format(d);
  return (
    <Badge tone="accent">
      {name ? t('commerce.offer.named', { name, when }) : t('commerce.offer.endsAt', { when })}
    </Badge>
  );
}

/** Regular / compare-at / sale price. Compare-at only when the server says it is honest (non-null). */
export function PriceLine({
  amount,
  currency,
  compareAt,
}: {
  amount: number;
  currency: string;
  compareAt?: number | null;
}) {
  const { t, fmtMoney } = useI18n();
  return (
    <p className="package__price" data-testid="price">
      {compareAt != null && compareAt > amount ? (
        <>
          <s aria-label={t('commerce.price.compareAt', { amount: fmtMoney(compareAt, currency) })}>
            {fmtMoney(compareAt, currency)}
          </s>{' '}
        </>
      ) : null}
      <span>{fmtMoney(amount, currency)}</span>
    </p>
  );
}

/** Captures `?ref=` / `?aff=` once per value into sessionStorage (affiliate codes become a server click id). */
export function AttributionCapture() {
  const { search } = useLocation();
  const seen = useRef<string>('');
  useEffect(() => {
    const { ref, aff } = parseAttributionParams(search);
    if (!ref && !aff) return;
    const sig = `${ref ?? ''}|${aff ?? ''}`;
    if (seen.current === sig) return;
    seen.current = sig;
    const current = readAttribution();
    if (ref) writeAttribution({ ...current, referralCode: ref });
    if (aff && aff !== current.affiliateCode) {
      api<AffiliateClickDto>('/api/affiliates/clicks', { method: 'POST', body: { code: aff } })
        .then((click) =>
          writeAttribution({
            ...readAttribution(),
            affiliateCode: aff,
            affiliateClickId: click.clickId,
            affiliateExpiresAt: click.attributionExpiresAt,
          }),
        )
        .catch(() => {
          /* unknown or inactive affiliate code: no attribution */
        });
    }
  }, [search]);
  return null;
}
