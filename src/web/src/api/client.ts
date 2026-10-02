import type { AuthResponse, ProblemDetails } from './types';

const BASE_URL: string = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

/** Error thrown for any non-2xx response; carries the RFC 7807 problem body when available. */
export class ApiError extends Error {
  readonly status: number;
  readonly type: string;
  readonly problem: ProblemDetails | null;
  constructor(status: number, problem: ProblemDetails | null, fallback: string) {
    super(problem?.title ?? fallback);
    this.name = 'ApiError';
    this.status = status;
    this.type = problem?.type ?? '';
    this.problem = problem;
  }
  /** True when the server reported the given problem `type` (matched on the suffix, e.g. "uploads_disabled"). */
  is(code: string): boolean {
    return this.type === code || this.type.endsWith(`/${code}`) || this.title === code;
  }
  get title(): string {
    return this.problem?.title ?? '';
  }
}

// ---- session: access token in memory only; the refresh token lives in an HttpOnly cookie (path /api/auth)
// set by the server. The browser keeps only a non-secret "a session probably exists" hint so anonymous
// visitors do not fire a refresh request on every page load.
const LEGACY_REFRESH_KEY = 'mastemy.refreshToken';
const SESSION_HINT_KEY = 'mastemy.session';
/** Header required by the API for cookie-based refresh/logout (CSRF guard). */
export const CSRF_HEADER = { 'X-Requested-With': 'mastemy' } as const;

let accessToken: string | null = null;
type Listener = (auth: AuthResponse | null) => void;
const listeners = new Set<Listener>();

function storageGet(key: string): string | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(key);
  } catch {
    return null;
  }
}
function storageSet(key: string, value: string | null): void {
  try {
    if (typeof localStorage === 'undefined') return;
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

/** One-time migration: refresh tokens used to be kept in localStorage. Removes the stored value and returns it
 * so the first refresh can exchange it (the server answers by setting the HttpOnly cookie). */
let legacyToken: string | null | undefined;
function takeLegacyRefreshToken(): string | null {
  if (legacyToken === undefined) {
    legacyToken = storageGet(LEGACY_REFRESH_KEY);
    if (legacyToken) storageSet(LEGACY_REFRESH_KEY, null);
  }
  const t = legacyToken;
  legacyToken = null;
  return t;
}
/** Removes any refresh token left in localStorage by older builds (kept in memory for one migration refresh). */
export function purgeLegacyRefreshToken(): void {
  if (legacyToken === undefined) {
    legacyToken = storageGet(LEGACY_REFRESH_KEY);
    if (legacyToken) storageSet(LEGACY_REFRESH_KEY, null);
  }
}

export function getAccessToken(): string | null {
  return accessToken;
}
/** True when a refresh cookie probably exists (a session was established in this browser and not ended). */
export function hasSessionHint(): boolean {
  purgeLegacyRefreshToken();
  return !!legacyToken || storageGet(SESSION_HINT_KEY) === '1';
}
export function setSession(auth: AuthResponse | null): void {
  accessToken = auth?.accessToken ?? null;
  // Only full sessions carry a refresh cookie; MFA-pending/enrollment responses do not.
  storageSet(
    SESSION_HINT_KEY,
    auth?.accessToken && (!auth.status || auth.status === 'ok') ? '1' : null,
  );
  listeners.forEach((l) => l(auth));
}
export function onSessionChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// ---- single-flight refresh (cookie) ----
let refreshInFlight: Promise<boolean> | null = null;

export function refreshSession(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight;
  if (!hasSessionHint()) return Promise.resolve(false);
  refreshInFlight = (async () => {
    try {
      const legacy = takeLegacyRefreshToken();
      const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...CSRF_HEADER },
        body: legacy ? JSON.stringify({ refreshToken: legacy }) : '{}',
      });
      if (!res.ok) {
        setSession(null);
        return false;
      }
      setSession((await res.json()) as AuthResponse);
      return true;
    } catch {
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();
  return refreshInFlight;
}

/** Revokes the refresh cookie server-side (best effort) and clears the local session. */
export async function logoutSession(): Promise<void> {
  try {
    await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...CSRF_HEADER },
      body: '{}',
    });
  } catch {
    /* best effort */
  }
  setSession(null);
}

export interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /** Return the raw Response (for blobs/text). */
  raw?: boolean;
  /** Skip the automatic refresh-and-retry on 401. */
  noRetry?: boolean;
  keepalive?: boolean;
}

function buildInit(path: string, opts: RequestOptions): RequestInit {
  const headers: Record<string, string> = { Accept: 'application/json', ...opts.headers };
  let body: BodyInit | undefined;
  if (opts.body instanceof FormData || opts.body instanceof Blob) {
    body = opts.body;
  } else if (opts.body !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(opts.body);
  }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  return {
    method: opts.method ?? (body ? 'POST' : 'GET'),
    headers,
    body,
    signal: opts.signal,
    keepalive: opts.keepalive,
    // Auth endpoints set/clear the HttpOnly refresh cookie.
    ...(path.startsWith('/api/auth/') ? { credentials: 'include' as const } : {}),
  };
}

async function toError(res: Response): Promise<ApiError> {
  let problem: ProblemDetails | null = null;
  try {
    const text = await res.text();
    if (text) {
      const parsed = JSON.parse(text) as Partial<ProblemDetails>;
      problem = {
        status: parsed.status ?? res.status,
        title: parsed.title ?? res.statusText,
        type: parsed.type ?? '',
        detail: parsed.detail,
        errors: parsed.errors,
      };
    }
  } catch {
    /* non-JSON error body */
  }
  return new ApiError(res.status, problem, res.statusText || `HTTP ${res.status}`);
}

export async function apiFetch(path: string, opts: RequestOptions = {}): Promise<Response> {
  const url = `${BASE_URL}${path}`;
  let res = await fetch(url, buildInit(path, opts));
  if (res.status === 401 && !opts.noRetry && hasSessionHint()) {
    const ok = await refreshSession();
    if (ok) res = await fetch(url, buildInit(path, opts));
  }
  if (!res.ok) throw await toError(res);
  return res;
}

export async function api<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const res = await apiFetch(path, opts);
  if (res.status === 204) return undefined as T;
  const type = res.headers.get('content-type') ?? '';
  if (type.includes('json')) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}

export function apiUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

/** Download an authenticated resource and hand it to the browser as a file. */
export async function downloadFile(path: string, fileName: string): Promise<void> {
  const res = await apiFetch(path, { headers: { Accept: '*/*' } });
  const blob = await res.blob();
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

export function qs(params: Record<string, string | number | boolean | null | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
}
