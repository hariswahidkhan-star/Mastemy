import { expect } from '@playwright/test';
import type { APIRequestContext, Browser, BrowserContext, Page } from '@playwright/test';
import { createHmac } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const API = process.env.E2E_API_URL ?? 'http://localhost:5080';
export const FAKE_STRIPE = process.env.E2E_FAKE_STRIPE_URL ?? 'http://localhost:12111';
export const SMTP_SINK = process.env.E2E_SMTP_SINK_URL ?? 'http://localhost:2580';
export const WEBHOOK_SECRET = process.env.E2E_STRIPE_WEBHOOK_SECRET ?? 'whsec_e2e_secret';
export const ADMIN = { email: 'admin@mastemy.local', password: 'ChangeMe!Dev2026' };
export const PASSWORD = 'E2e-Passw0rd-2026';

export const run = Date.now().toString(36);
export const email = (who: string) => `${who}.${run}@e2e.mastemy.test`;

export interface Actor {
  context: BrowserContext;
  page: Page;
}

export async function newActor(browser: Browser): Promise<Actor> {
  const context = await browser.newContext();
  const page = await context.newPage();
  return { context, page };
}

// ---------------- TOTP (RFC 6238: HMAC-SHA1, 30 s steps, 6 digits) ----------------

function base32Decode(input: string): Buffer {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of input.replace(/[\s=]/g, '').toUpperCase()) {
    const idx = alphabet.indexOf(ch);
    if (idx < 0) throw new Error(`invalid base32 character ${ch}`);
    value = ((value << 5) | idx) & 0xffff;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

/** RFC 4226 HOTP value for a 30-second time step (RFC 6238 TOTP). */
export function totp(secret: string, step = Math.floor(Date.now() / 30_000)): string {
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(step));
  const h = createHmac('sha1', base32Decode(secret)).update(counter).digest();
  const o = h[h.length - 1] & 0x0f;
  const bin = ((h[o] & 0x7f) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3];
  return String(bin % 1_000_000).padStart(6, '0');
}

/**
 * Per-user MFA state shared by every spec of a run. The API rejects a code for an already used time step, so
 * the last used step is remembered and the next code waits for a fresh step. Keyed by API URL + email; a stale
 * entry after a database reset is overwritten by the next enrollment.
 */
interface MfaEntry {
  secret: string;
  lastStep: number;
  recoveryCodes?: string[];
}
const MFA_FILE = join(tmpdir(), `mastemy-e2e-mfa-${encodeURIComponent(API)}.json`);

function readMfa(): Record<string, MfaEntry> {
  try {
    return existsSync(MFA_FILE)
      ? (JSON.parse(readFileSync(MFA_FILE, 'utf8')) as Record<string, MfaEntry>)
      : {};
  } catch {
    return {};
  }
}

function writeMfa(mail: string, entry: MfaEntry | undefined) {
  const all = readMfa();
  if (entry) all[mail.toLowerCase()] = entry;
  else delete all[mail.toLowerCase()];
  writeFileSync(MFA_FILE, JSON.stringify(all));
}

export function mfaEntry(mail: string): MfaEntry | undefined {
  return readMfa()[mail.toLowerCase()];
}

export function rememberMfa(mail: string, secret: string, recoveryCodes?: string[]) {
  const prev = mfaEntry(mail);
  const same = prev?.secret === secret;
  writeMfa(mail, {
    secret,
    lastStep: same ? prev.lastStep : 0,
    recoveryCodes: recoveryCodes ?? (same ? prev.recoveryCodes : undefined),
  });
}

/** Next unused TOTP code for a user (waits for a fresh 30 s step when the current one was already used). */
export async function nextTotp(mail: string, secret?: string): Promise<string> {
  const entry = mfaEntry(mail);
  const key = secret ?? entry?.secret;
  if (!key) throw new Error(`no MFA secret recorded for ${mail}`);
  const same = entry?.secret === key;
  const last = same ? entry.lastStep : 0;
  let step = Math.floor(Date.now() / 30_000);
  if (step <= last) {
    await new Promise((r) => setTimeout(r, (last + 1) * 30_000 - Date.now() + 250));
    step = Math.floor(Date.now() / 30_000);
  }
  writeMfa(mail, {
    secret: key,
    lastStep: step,
    recoveryCodes: same ? entry.recoveryCodes : undefined,
  });
  return totp(key, step);
}

// ---------------- UI sign-in (answers the MFA challenge or completes forced enrollment) ----------------

/** Completes the MFA enrollment wizard (login page or security settings); returns the recovery codes. */
export async function enrollMfaInUi(page: Page, mail: string): Promise<string[]> {
  await page.getByRole('button', { name: 'Start setup' }).click();
  const key = page.locator('[data-mfa-secret]');
  await expect(key).toBeVisible();
  await expect(page.getByRole('img', { name: 'QR code for your authenticator app' })).toBeVisible();
  const secret = (await key.getAttribute('data-mfa-secret'))!;
  rememberMfa(mail, secret);
  await page.getByLabel(/^Authentication code/).fill(await nextTotp(mail, secret));
  await page.getByRole('button', { name: 'Confirm and turn on' }).click();
  const list = page.locator('[data-recovery-codes] li');
  await expect(list).toHaveCount(10);
  const codes = (await list.allTextContents()).map((c) => c.trim());
  rememberMfa(mail, secret, codes);
  await page.getByLabel('I have saved my recovery codes').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  return codes;
}

/** After "Log in": handles an MFA challenge or forced enrollment when the server asks for it. */
export async function completeMfaIfAsked(page: Page, mail: string) {
  const start = page.getByRole('button', { name: 'Start setup' });
  const code = page.getByLabel(/^Authentication code/);
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (!/\/login$/.test(new URL(page.url()).pathname)) return;
    if (await start.isVisible().catch(() => false)) {
      await enrollMfaInUi(page, mail);
      return;
    }
    if (await code.isVisible().catch(() => false)) {
      await code.fill(await nextTotp(mail));
      await page.getByRole('button', { name: 'Verify' }).click();
      return;
    }
    await page.waitForTimeout(150);
  }
}

export async function login(page: Page, mail: string, password = PASSWORD) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(mail);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await completeMfaIfAsked(page, mail);
  await expect(page).toHaveURL(/\/me$/);
}

export async function registerUser(page: Page, name: string, mail: string) {
  await page.goto('/register');
  await page.getByLabel('Display name').fill(name);
  await page.getByLabel('Email').fill(mail);
  await page.getByLabel(/^Password/).fill(PASSWORD);
  await page.getByLabel('Confirm password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Create account' }).click();
  // Optional onboarding (learning goals) comes first; these flows skip it.
  await expect(page).toHaveURL(/\/welcome$/);
  await page.getByRole('link', { name: 'Skip for now' }).click();
  await expect(page).toHaveURL(/\/me$/);
}

// ---------------- API sign-in (same MFA rules) ----------------

interface AuthJson {
  accessToken: string | null;
  refreshToken: string | null;
  user: { id: string; email: string };
  status?: 'ok' | 'mfa_required' | 'mfa_enrollment_required';
  mfaToken?: string | null;
}

async function postJson<T>(
  request: APIRequestContext,
  path: string,
  body: unknown,
  token?: string,
): Promise<T> {
  const res = await request.post(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    data: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok()) throw new Error(`POST ${path} -> ${res.status()}: ${text.slice(0, 400)}`);
  return (text ? JSON.parse(text) : undefined) as T;
}

/** Signs in over the API, answering the TOTP challenge or enrolling MFA for privileged users. */
export async function apiLogin(request: APIRequestContext, mail: string, password = PASSWORD) {
  const res = await postJson<AuthJson>(request, '/api/auth/login', { email: mail, password });
  if (res.status === 'mfa_required') {
    const ok = await postJson<AuthJson>(request, '/api/auth/mfa/verify', {
      mfaToken: res.mfaToken,
      code: await nextTotp(mail),
    });
    return { accessToken: ok.accessToken!, user: ok.user };
  }
  if (res.status === 'mfa_enrollment_required') {
    const restricted = res.accessToken!;
    const e = await postJson<{ secret: string }>(request, '/api/auth/mfa/enroll', {}, restricted);
    rememberMfa(mail, e.secret);
    const done = await postJson<{ recoveryCodes: string[]; session: AuthJson }>(
      request,
      '/api/auth/mfa/enroll/confirm',
      { code: await nextTotp(mail, e.secret) },
      restricted,
    );
    rememberMfa(mail, e.secret, done.recoveryCodes);
    return { accessToken: done.session.accessToken!, user: done.session.user };
  }
  return { accessToken: res.accessToken!, user: res.user };
}

// ---------------- Email captured by the local SMTP sink (e2e/smtp-sink.mjs) ----------------

export interface SinkMessage {
  id: number;
  to: string[];
  subject: string;
  body: string;
  receivedAt: string;
}

async function mailFor(request: APIRequestContext, to: string): Promise<SinkMessage[]> {
  const res = await request.get(`${SMTP_SINK}/messages?to=${encodeURIComponent(to)}`);
  return res.ok() ? ((await res.json()) as SinkMessage[]) : [];
}

/** Highest message id currently stored for an address (0 when none). */
export async function lastMailId(request: APIRequestContext, to: string): Promise<number> {
  return (await mailFor(request, to)).reduce((m, x) => Math.max(m, x.id), 0);
}

/** Waits for a message to `to` whose subject matches and whose id is greater than `afterId`. */
export async function waitForMail(
  request: APIRequestContext,
  to: string,
  subject: RegExp,
  afterId = 0,
  timeoutMs = 30_000,
): Promise<SinkMessage> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const hit = (await mailFor(request, to))
      .filter((m) => m.id > afterId && subject.test(m.subject))
      .pop();
    if (hit) return hit;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`no email matching ${subject} for ${to} within ${timeoutMs} ms`);
}

/** App path of the verification / reset link in an email body, e.g. "/reset-password?token=…". */
export function linkPath(body: string): string {
  const m = /https?:\/\/\S+?(\/(?:verify-email|reset-password)\?token=\S+)/.exec(body);
  if (!m) throw new Error(`no link in: ${body}`);
  return m[1];
}

/** Admin UI: give a user extra roles via Users & roles. */
export async function grantRoles(admin: Page, mail: string, roles: string[]) {
  await admin.goto('/admin/users');
  await admin.getByLabel('Search by name or email').fill(mail);
  await admin.getByRole('button', { name: 'Search' }).click();
  const row = admin.getByRole('row').filter({ hasText: mail });
  // Privileged roles need a verified email address; staff can confirm it from the same row. Wait for the
  // search result to render first (a non-waiting visibility check would race the request and skip it).
  const markVerified = row.getByRole('button', { name: 'Mark verified' });
  const verified = row.getByText('Email verified');
  await expect(markVerified.or(verified).first()).toBeVisible();
  if (await markVerified.isVisible()) {
    await markVerified.click();
    await expect(verified).toBeVisible();
  }
  await row.getByRole('button', { name: 'Edit roles' }).click();
  const dialog = admin.getByRole('dialog');
  for (const r of roles) await dialog.getByLabel(r, { exact: true }).check();
  await dialog.getByRole('button', { name: 'Save' }).click();
  await expect(admin.getByText('Roles updated.')).toBeVisible();
  await expect(row).toContainText(roles[0]);
}

/** Builds a Stripe-signed `checkout.session.completed` event for a fake-Stripe session. */
export function signedCheckoutCompleted(session: {
  id: string;
  amount_total: number;
  currency: string;
  metadata: { order_id: string };
  client_reference_id: string;
  payment_intent: string;
}) {
  const body = JSON.stringify({
    id: `evt_e2e_${Date.now()}`,
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        ...session,
        object: 'checkout.session',
        payment_status: 'paid',
        status: 'complete',
      },
    },
  });
  const t = Math.floor(Date.now() / 1000);
  const sig = createHmac('sha256', WEBHOOK_SECRET).update(`${t}.${body}`).digest('hex');
  return { body, header: `t=${t},v1=${sig}` };
}

/** Exact field label, tolerating the visual required-marker (" *") that follows required labels. */
export function label(text: string): RegExp {
  return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}( \\*)?$`);
}
