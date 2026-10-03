import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { ADMIN, PASSWORD, apiLogin, email, run as runId } from './helpers';

/**
 * Practice lab end-to-end: proves the in-browser WebAssembly SQL engine (sql.js) actually compiles and runs
 * under the production Content-Security-Policy (script-src allows 'wasm-unsafe-eval' only, never 'unsafe-eval').
 * A student opens a published lesson, switches to the Practice lab tab, runs a graded SQL challenge and sees
 * the result grid + a passing verdict. Full-stack: real API + MySQL, same CSP as production (SSR server).
 */

interface Json {
  [k: string]: unknown;
}
class Api {
  constructor(
    private request: APIRequestContext,
    public token = '',
  ) {}
  async call<T = Json>(method: string, path: string, body?: unknown, ok = [200, 201, 204]) {
    const res = await this.request.fetch(`${process.env.E2E_API_URL ?? 'http://localhost:5080'}${path}`, {
      method,
      headers: {
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      data: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    if (!ok.includes(res.status())) throw new Error(`${method} ${path} -> ${res.status()}: ${text.slice(0, 300)}`);
    return (text ? JSON.parse(text) : undefined) as T;
  }
  get = <T = Json>(p: string) => this.call<T>('GET', p);
  post = <T = Json>(p: string, b?: unknown) => this.call<T>('POST', p, b ?? {});
  put = <T = Json>(p: string, b?: unknown) => this.call<T>('PUT', p, b ?? {});
}

const ytId = (s: string) => `y${runId}${s}`.replace(/[^A-Za-z0-9_-]/g, '').padEnd(11, 'z').slice(0, 11);

// Run against the production SSR server so the real Content-Security-Policy (from server/main.ts) is in force —
// that is the whole point of this test. scripts/e2e-all.sh sets E2E_SSR_URL.
const SSR = process.env.E2E_SSR_URL ?? '';
test.skip(!SSR, 'E2E_SSR_URL is not set (the SSR server is started by scripts/e2e-all.sh)');
test.use({ baseURL: SSR || undefined });

test('student runs the in-browser SQL lab on a lesson under the production CSP', async ({ page, request }) => {
  // --- Scaffolding over the API: instructor + student, a published course with one lesson. ---
  const people = { instructor: email('labinstructor'), reviewer: email('labreviewer'), student: email('labstudent') };
  const admin = new Api(request, (await apiLogin(request, ADMIN.email, ADMIN.password)).accessToken);
  const reg = async (name: string, mail: string) =>
    (await new Api(request).post<{ user: { id: string } }>('/api/auth/register', {
      email: mail,
      password: PASSWORD,
      displayName: name,
      preferredLanguage: 'en',
    })).user.id;
  const instructorId = await reg('Lab Instructor', people.instructor);
  const reviewerId = await reg('Lab Reviewer', people.reviewer);
  await reg('Lab Student', people.student);
  for (const id of [instructorId, reviewerId])
    await admin.post(`/api/admin/users/${id}/email-verification/mark-verified`);
  await admin.put(`/api/admin/users/${instructorId}/roles`, { roles: ['Student', 'Instructor'] });
  await admin.put(`/api/admin/users/${reviewerId}/roles`, { roles: ['Student', 'Reviewer'] });
  const channel = await admin.post<{ id: string }>('/api/admin/youtube/channels', {
    channelId: `UC${`lab${runId}`.padEnd(22, 'q').slice(0, 22)}`,
    title: `Lab ${runId}`,
    mode: 'MastemyManaged',
  });
  const inst = new Api(request, (await apiLogin(request, people.instructor)).accessToken);
  const rev = new Api(request, (await apiLogin(request, people.reviewer)).accessToken);
  const categories = await inst.get<{ id: number }[]>('/api/categories');
  const c = await inst.post<{ id: string; slug: string }>('/api/studio/courses', {
    title: `SQL Practice Course ${runId}`,
    subtitle: 'Lab course',
    description: 'A course used by the practice-lab end-to-end suite.',
    audience: 'Analysts',
    prerequisites: '',
    outcomes: ['Query data'],
    language: 'en',
    level: 'Beginner',
    categoryIds: [categories[0].id],
  });
  const m = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/modules`, { title: 'Basics' });
  const l = await inst.post<{ id: string }>(`/api/studio/modules/${m.id}/lessons`, {
    title: 'Querying tables',
    objective: 'Write SELECT statements.',
    isPreview: true,
  });
  const video = await inst.post<{ id: string }>(`/api/studio/lessons/${l.id}/video`, {
    url: `https://youtu.be/${ytId('A')}`,
    channelId: channel.id,
    rightsDeclared: true,
    rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
    title: `Lab video ${runId}`,
    durationSeconds: 300,
  });
  await rev.post(`/api/admin/youtube/videos/${video.id}/confirm`, { approve: true });
  await inst.post(`/api/studio/courses/${c.id}/submit`);
  await rev.post(`/api/review/courses/${c.id}/decision`, { decision: 'Approve' });
  await admin.post(`/api/admin/courses/${c.id}/publish`);

  // --- UI: student logs in, opens the lesson, switches to the Practice lab, runs a graded challenge. ---
  // Hydrate on the home page, then reach /login by CLIENT-SIDE navigation so React stays mounted and intercepts
  // the form (a cold hard-load of /login can submit natively before hydration). Students need no MFA.
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.getByRole('link', { name: 'Log in' }).first().click();
  await expect(page).toHaveURL(/\/login$/);
  await page.getByLabel('Email').fill(people.student);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/\/me$/);

  await page.goto(`/learn/${c.slug}/${l.id}`);
  await page.getByRole('tab', { name: /Practice lab/i }).click();

  // Choose the graded "high earners" challenge and run the correct answer.
  await page.getByRole('combobox').selectOption('sql-filter');
  // Replace the editor contents with a correct query (CodeMirror: focus, select-all, type).
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.type(
    "SELECT name, salary FROM employees WHERE department = 'Engineering' AND salary > 90000 ORDER BY salary DESC;",
  );
  await page.getByRole('button', { name: /^Run$/ }).click();

  // The WASM engine executed under CSP: result grid shows the rows and the verdict is a pass.
  await expect(page.getByRole('status')).toHaveText(/passed/i, { timeout: 30_000 });
  await expect(page.getByRole('cell', { name: 'Mei Chen' })).toBeVisible();
  await expect(page.getByText('✓ Returns the correct high earners')).toBeVisible();
});
