import type { AuthResponse, ProblemDetails } from './types';

const BASE_URL: string = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
const REFRESH_KEY = 'mastemy.refreshToken';

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

// ---- token storage: access token in memory only, refresh token in localStorage ----
let accessToken: string | null = null;
type Listener = (auth: AuthResponse | null) => void;
const listeners = new Set<Listener>();

export function getAccessToken(): string | null {
  return accessToken;
}
export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
}
function storeRefreshToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(REFRESH_KEY, token);
    else localStorage.removeItem(REFRESH_KEY);
  } catch {
    /* storage unavailable: session lasts for this tab only */
  }
}
export function setSession(auth: AuthResponse | null): void {
  accessToken = auth?.accessToken ?? null;
  storeRefreshToken(auth?.refreshToken ?? null);
  listeners.forEach((l) => l(auth));
}
export function onSessionChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// ---- single-flight refresh ----
let refreshInFlight: Promise<boolean> | null = null;

export function refreshSession(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight;
  const token = getRefreshToken();
  if (!token) return Promise.resolve(false);
  refreshInFlight = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ refreshToken: token }),
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

function buildInit(opts: RequestOptions): RequestInit {
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
  let res = await fetch(url, buildInit(opts));
  if (res.status === 401 && !opts.noRetry && getRefreshToken()) {
    const ok = await refreshSession();
    if (ok) res = await fetch(url, buildInit(opts));
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
