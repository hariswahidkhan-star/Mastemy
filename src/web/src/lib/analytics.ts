import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { wsKeys } from '../api/workspace';
import type { AnalyticsEventType, ConsentDto } from '../api/workspace';
import { useAuth } from '../auth/AuthProvider';

export const CONSENT_COOKIE = 'mastemy_consent';

/** Reads the first-party consent cookie set by the API (`analytics` | `necessary`), or null when absent. */
export function readConsentCookie(cookie: string): 'analytics' | 'necessary' | null {
  for (const part of cookie.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === CONSENT_COOKIE) {
      const val = decodeURIComponent(v.join('='));
      return val.includes('analytics') ? 'analytics' : 'necessary';
    }
  }
  return null;
}

/**
 * Server render only: whether the request carried the consent cookie (the SSR server reads the Cookie
 * header). Lets the banner be part of the server HTML for first-time visitors, so it is painted with the
 * page instead of appearing late (it would otherwise become the page's Largest Contentful Paint).
 */
export const ConsentCookieContext = createContext<boolean | null>(null);

/** Whether a consent choice is recorded in the cookie: from the request on the server, else document.cookie. */
export function useConsentCookieDecided(): boolean {
  const server = useContext(ConsentCookieContext);
  if (typeof document === 'undefined') return server ?? true;
  return readConsentCookie(document.cookie) !== null;
}

export interface ConsentState {
  /** False until mounted in a browser and the server answered (SSR and first paint never track). */
  ready: boolean;
  /** The visitor/user has made a choice (stored on the account or in the cookie). */
  decided: boolean;
  analytics: boolean;
}

/** Consent as the server sees it. Nothing is tracked until `ready && analytics`. */
export function useConsent(): ConsentState {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const q = useQuery({
    queryKey: [...wsKeys.consent, user?.id ?? 'anon'],
    queryFn: () => api<ConsentDto>('/api/analytics/consent'),
    enabled: mounted,
    staleTime: 10 * 60_000,
    retry: false,
  });
  if (!mounted || !q.data) return { ready: false, decided: true, analytics: false };
  const cookie = typeof document !== 'undefined' ? readConsentCookie(document.cookie) : null;
  return {
    ready: true,
    decided: q.data.source === 'account' || cookie !== null,
    analytics: q.data.analytics,
  };
}

export function useSetConsent() {
  const qc = useQueryClient();
  return async (analytics: boolean) => {
    const dto = await api<ConsentDto>('/api/analytics/consent', {
      method: 'PUT',
      body: { analytics },
    });
    await qc.invalidateQueries({ queryKey: wsKeys.consent });
    return dto;
  };
}

/** Sends one event; never throws (telemetry must not affect the page). Callers check consent first. */
export function sendEvent(type: AnalyticsEventType, courseId?: string, lessonId?: string): void {
  api('/api/analytics/events', {
    method: 'POST',
    body: { events: [{ type, courseId, lessonId, ts: new Date().toISOString() }] },
    keepalive: true,
  }).catch(() => undefined);
}

/** Records `type` once per (course, lesson) mount, only after the user consented to analytics. */
export function useTrackEvent(
  type: AnalyticsEventType,
  courseId: string | undefined,
  lessonId?: string,
): void {
  const consent = useConsent();
  const allowed = consent.ready && consent.analytics;
  useEffect(() => {
    if (!allowed || !courseId) return;
    sendEvent(type, courseId, lessonId);
  }, [allowed, type, courseId, lessonId]);
}

/** Returns a function that records an event only when consented (e.g. checkout_start on click). */
export function useEventSender(): (
  type: AnalyticsEventType,
  courseId?: string,
  lessonId?: string,
) => void {
  const consent = useConsent();
  return (type, courseId, lessonId) => {
    if (consent.ready && consent.analytics) sendEvent(type, courseId, lessonId);
  };
}
