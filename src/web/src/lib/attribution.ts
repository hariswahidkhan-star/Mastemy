/**
 * Referral / affiliate attribution captured from `?ref=` and `?aff=` and handed to checkout. Stored in
 * sessionStorage only (cookie-less; ends with the tab). Every storage access is guarded: private modes and
 * blocked storage must never break the page, and SSR has no `window`.
 */
const KEY = 'mastemy.attribution';
const CODE = /^[A-Za-z0-9_-]{2,64}$/;

export interface Attribution {
  referralCode?: string;
  affiliateCode?: string;
  affiliateClickId?: string;
  affiliateExpiresAt?: string;
}

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

export function readAttribution(now: Date = new Date()): Attribution {
  const s = storage();
  if (!s) return {};
  try {
    const raw = s.getItem(KEY);
    if (!raw) return {};
    const a = JSON.parse(raw) as Attribution | null;
    if (typeof a !== 'object' || a === null) return {};
    if (a.affiliateExpiresAt && new Date(a.affiliateExpiresAt).getTime() <= now.getTime()) {
      delete a.affiliateClickId;
      delete a.affiliateExpiresAt;
      delete a.affiliateCode;
    }
    return a;
  } catch {
    return {};
  }
}

export function writeAttribution(a: Attribution): void {
  const s = storage();
  if (!s) return;
  try {
    if (Object.keys(a).length === 0) s.removeItem(KEY);
    else s.setItem(KEY, JSON.stringify(a));
  } catch {
    /* storage full or blocked: attribution is best-effort */
  }
}

/** Drops one part of the attribution (e.g. after the server rejected a referral code for this purchase). */
export function forgetAttribution(part: 'referral' | 'affiliate'): void {
  const a = readAttribution();
  if (part === 'referral') delete a.referralCode;
  else {
    delete a.affiliateClickId;
    delete a.affiliateExpiresAt;
    delete a.affiliateCode;
  }
  writeAttribution(a);
}

/** Parses `?ref=` / `?aff=` from a query string; invalid codes are ignored. */
export function parseAttributionParams(search: string): { ref?: string; aff?: string } {
  const p = new URLSearchParams(search);
  const ref = p.get('ref')?.trim();
  const aff = p.get('aff')?.trim();
  return {
    ref: ref && CODE.test(ref) ? ref : undefined,
    aff: aff && CODE.test(aff) ? aff : undefined,
  };
}

/** Builds the shareable course link carrying a referral code. */
export function referralLink(origin: string, slug: string, code: string): string {
  return `${origin.replace(/\/$/, '')}/courses/${encodeURIComponent(slug)}?ref=${encodeURIComponent(code)}`;
}
