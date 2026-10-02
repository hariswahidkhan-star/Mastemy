import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { APIRequestContext, Locator, Page } from '@playwright/test';
import type { Actor } from './helpers';
import {
  ADMIN,
  API,
  PASSWORD,
  apiLogin,
  email,
  login,
  newActor,
  run,
} from './helpers';

/**
 * Accessibility: axe-core (WCAG 2.x A/AA rules) on the key pages in English and Arabic (RTL), light and dark
 * theme, failing on serious or critical violations; plus keyboard-only checks for the attempt player and the
 * "Explore" mega-menu. Scaffolding (users, a published course with a lesson, a quiz and a study package) is
 * done over the API. Runs on the shared stack from scripts/e2e-all.sh.
 */

interface Json {
  [k: string]: unknown;
}

class Api {
  constructor(
    private request: APIRequestContext,
    public token = '',
  ) {}
  async call<T = Json>(method: string, path: string, body?: unknown, expected = [200, 201, 204]) {
    const res = await this.request.fetch(`${API}${path}`, {
      method,
      headers: {
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      data: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    if (!expected.includes(res.status()))
      throw new Error(`${method} ${path} -> ${res.status()}: ${text.slice(0, 400)}`);
    return (text ? JSON.parse(text) : undefined) as T;
  }
  get = <T = Json>(p: string) => this.call<T>('GET', p);
  post = <T = Json>(p: string, b?: unknown) => this.call<T>('POST', p, b ?? {});
  put = <T = Json>(p: string, b?: unknown) => this.call<T>('PUT', p, b ?? {});
}

async function signIn(request: APIRequestContext, mail: string, password = PASSWORD) {
  const res = await apiLogin(request, mail, password);
  return { api: new Api(request, res.accessToken), userId: res.user.id };
}

async function registerApi(request: APIRequestContext, name: string, mail: string) {
  const res = await new Api(request).post<{ user: { id: string } }>('/api/auth/register', {
    email: mail,
    password: PASSWORD,
    displayName: name,
    preferredLanguage: 'en',
  });
  return res.user.id;
}

const ytId = (suffix: string) =>
  `y${run}${suffix}`.replace(/[^A-Za-z0-9_-]/g, '').padEnd(11, 'z').slice(0, 11);

// ---------------- axe ----------------

type Lang = 'en' | 'ar';
type Theme = 'light' | 'dark';

/** Stores the language/theme preference the app reads at start-up (applies on the next navigation). */
async function usePrefs(page: Page, lang: Lang, theme: Theme) {
  await page.evaluate(
    ([l, th]) => {
      localStorage.setItem('mastemy.lang', l);
      localStorage.setItem('mastemy.theme', th);
    },
    [lang, theme],
  );
}

async function settle(page: Page, lang: Lang, theme: Theme, ready: Locator) {
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(page.locator('html')).toHaveAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
  try {
    await expect(ready).toBeVisible();
  } catch (e) {
    const text = (await page.locator('main').innerText().catch(() => '')).slice(0, 600);
    throw new Error(`${page.url()} did not become ready: ${(e as Error).message}\nmain: ${text}`);
  }
  // No pending skeletons / spinners left from lazy routes or queries.
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
}

interface Finding {
  page: string;
  id: string;
  impact: string;
  help: string;
  targets: string[];
}

async function scan(page: Page, name: string): Promise<Finding[]> {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    // The YouTube player is a third-party iframe outside our control.
    .exclude('iframe[src*="youtube"]')
    .analyze();
  return result.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => ({
      page: name,
      id: v.id,
      impact: v.impact ?? '',
      help: v.help,
      targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
    }));
}

function report(findings: Finding[]) {
  return findings
    .map((f) => `[${f.impact}] ${f.page}: ${f.id} – ${f.help}\n    ${f.targets.join('\n    ')}`)
    .join('\n');
}

// ---------------- keyboard ----------------

/** Presses Tab (or Shift+Tab) until `target` has focus; fails after `max` presses. */
async function tabTo(page: Page, target: Locator, { max = 80, back = false } = {}) {
  for (let i = 0; i < max; i++) {
    // count() does not wait, so a missing target fails fast at the final assertion instead of per press.
    if ((await target.count()) === 1 && (await target.evaluate((el) => el === document.activeElement))) return;
    await page.keyboard.press(back ? 'Shift+Tab' : 'Tab');
  }
  await expect(target).toBeFocused();
}

test.describe.serial('accessibility: axe on key pages (en/ar, light/dark) and keyboard-only flows', () => {
  let anon: Actor;
  let student: Actor;
  let instructor: Actor;
  let admin: Actor;
  const people = {
    instructor: email('a11yinstructor'),
    reviewer: email('a11yreviewer'),
    student: email('a11ystudent'),
  };
  const courseTitle = `Accessible Spreadsheets ${run}`;
  let course = { id: '', slug: '', lessonId: '' };
  let quizId = '';
  let packageId = '';
  let attemptId = '';

  test.beforeAll(async ({ browser }) => {
    anon = await newActor(browser);
    student = await newActor(browser);
    instructor = await newActor(browser);
    admin = await newActor(browser);
  });

  test.afterAll(async () => {
    for (const a of [anon, student, instructor, admin]) await a?.context.close();
  });

  test('setup over the API: users, a published course with a quiz and an approved package', async ({
    request,
  }) => {
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    const instructorId = await registerApi(request, 'Amal Instructor', people.instructor);
    const reviewerId = await registerApi(request, 'Rami Reviewer', people.reviewer);
    await registerApi(request, 'Sara Student', people.student);
    for (const id of [instructorId, reviewerId])
      await adminApi.post(`/api/admin/users/${id}/email-verification/mark-verified`);
    await adminApi.put(`/api/admin/users/${instructorId}/roles`, { roles: ['Student', 'Instructor'] });
    await adminApi.put(`/api/admin/users/${reviewerId}/roles`, { roles: ['Student', 'Reviewer'] });
    const channel = await adminApi.post<{ id: string }>('/api/admin/youtube/channels', {
      channelId: `UC${`a11y${run}`.padEnd(22, 'q').slice(0, 22)}`,
      title: `Mastemy A11y ${run}`,
      mode: 'MastemyManaged',
    });
    const { api: inst } = await signIn(request, people.instructor);
    const { api: rev } = await signIn(request, people.reviewer);
    const categories = await inst.get<{ id: number }[]>('/api/categories');
    const c = await inst.post<{ id: string; slug: string }>('/api/studio/courses', {
      title: courseTitle,
      subtitle: 'Accessibility end-to-end course',
      description: 'A course used by the accessibility end-to-end suite. Videos are free on YouTube.',
      audience: 'Analysts',
      prerequisites: '',
      outcomes: ['Build a table', 'Write a formula', 'Chart a series'],
      language: 'en',
      level: 'Beginner',
      categoryIds: [categories[0].id],
    });
    const m = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/modules`, { title: 'Tables' });
    const l = await inst.post<{ id: string }>(`/api/studio/modules/${m.id}/lessons`, {
      title: 'Structured tables',
      objective: 'Build a structured table.',
      isPreview: true,
    });
    const video = await inst.post<{ id: string }>(`/api/studio/lessons/${l.id}/video`, {
      url: `https://youtu.be/${ytId('A')}`,
      channelId: channel.id,
      rightsDeclared: true,
      rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
      title: `A11y video ${run}`,
      durationSeconds: 300,
    });
    await rev.post(`/api/admin/youtube/videos/${video.id}/confirm`, { approve: true });
    const questionIds: string[] = [];
    for (const [i, stem] of ['Which key moves focus forward?', 'Which key closes a dialog?'].entries()) {
      const q = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/questions`, {
        externalId: `A11Y-${run}-${i + 1}`,
        type: 'SingleChoice',
        language: 'en',
        stem,
        explanation: 'Keyboard basics.',
        difficulty: 'Easy',
        tags: ['keyboard'],
        allowShuffle: false,
        cognitiveLevel: 'Remember',
        options: [
          { text: i === 0 ? 'Tab' : 'Escape', isCorrect: true, rationale: 'Standard key.' },
          { text: 'F12', isCorrect: false, rationale: 'Opens developer tools.' },
        ],
      });
      questionIds.push(q.id);
    }
    for (const id of questionIds) {
      await adminApi.post(`/api/studio/questions/${id}/state`, { state: 'Reviewed' });
      await rev.post(`/api/studio/questions/${id}/state`, { state: 'Approved' });
      await rev.post(`/api/studio/questions/${id}/state`, { state: 'Active' });
    }
    const quiz = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/assessments`, {
      title: 'Keyboard quiz',
      kind: 'MockExam',
      mode: 'Exam',
      timeLimitMinutes: 30,
      maxAttempts: 5,
      passPercent: 50,
      multiSelectScoring: 'AllOrNothing',
      questionCount: 2,
      isPremium: false,
      countsTowardCertificate: false,
      questionIds,
      reviewPolicy: 'AfterSubmit',
    });
    quizId = quiz.id;
    await inst.post(`/api/studio/courses/${c.id}/submit`);
    await rev.post(`/api/review/courses/${c.id}/decision`, { decision: 'Approve' });
    await adminApi.post(`/api/admin/courses/${c.id}/publish`);
    const pkg = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/packages`, {
      title: 'Spreadsheet study pack',
      contents: 'Premium lesson notes\nPractice question bank',
      price: 25,
      currency: 'USD',
      accessDays: 365,
    });
    await adminApi.post(`/api/admin/packages/${pkg.id}/decision`, { decision: 'Approve' });
    packageId = pkg.id;
    course = { id: c.id, slug: c.slug, lessonId: l.id };

    const { api: learner } = await signIn(request, people.student);
    await learner.post(`/api/learn/courses/${c.id}/enroll`);
    attemptId = (await learner.post<{ id: string }>(`/api/assessments/${quizId}/attempts`)).id;
  });

  test('sign in the student, instructor and admin (MFA answered by the helpers)', async () => {
    await login(student.page, people.student);
    await login(instructor.page, people.instructor);
    await login(admin.page, ADMIN.email, ADMIN.password);
  });

  for (const lang of ['en', 'ar'] as const) {
    for (const theme of ['light', 'dark'] as const) {
      test(`axe: no serious/critical violations (${lang}, ${theme})`, async ({ browser }) => {
        const h1 = (p: Page) => p.locator('main h1').first();
        const pages: { name: string; actor: () => Actor; path: string; ready: (p: Page) => Locator }[] = [
          { name: 'home', actor: () => anon, path: '/', ready: h1 },
          { name: 'courses', actor: () => anon, path: '/courses', ready: h1 },
          { name: 'course detail', actor: () => anon, path: `/courses/${course.slug}`, ready: h1 },
          { name: 'login', actor: () => anon, path: '/login', ready: h1 },
          { name: 'certificate verify', actor: () => anon, path: '/verify', ready: h1 },
          // The rest of the public site.
          ...[
            ['categories', '/categories'],
            ['free lessons', '/free-lessons'],
            ['certifications', '/certifications'],
            ['pathways', '/pathways'],
            ['instructors', '/instructors'],
            ['packages', '/packages'],
            ['notes library', '/notes-library'],
            ['business', '/business'],
            ['articles', '/articles'],
            ['article', '/articles/how-mcq-certificates-work'],
            ['teach', '/teach'],
            ['about', '/about'],
            ['help', '/help'],
            ['contact', '/contact'],
            ['register', '/register'],
            ['plans', '/plans'],
          ].map(([name, path]) => ({ name, actor: () => anon, path, ready: h1 })),
          { name: 'dashboard', actor: () => student, path: '/me', ready: h1 },
          // Main signed-in areas.
          ...[
            ['profile', '/me/profile'],
            ['security', '/me/security'],
            ['my notes', '/me/notes'],
            ['notifications', '/me/notifications'],
            ['study plan', '/me/study-plan'],
            ['bookmarks', '/me/bookmarks'],
            ['practice hub', '/practice'],
            ['messages', '/messages'],
          ].map(([name, path]) => ({ name, actor: () => student, path, ready: h1 })),
          { name: 'studio', actor: () => instructor, path: '/studio', ready: h1 },
          { name: 'admin', actor: () => admin, path: '/admin', ready: h1 },
          {
            name: 'lesson workspace',
            actor: () => student,
            path: `/learn/${course.slug}/${course.lessonId}`,
            ready: h1,
          },
          {
            name: 'attempt player',
            actor: () => student,
            path: `/attempts/${attemptId}`,
            ready: (p) => p.getByTestId('timer'),
          },
          { name: 'checkout', actor: () => student, path: `/checkout/package/${packageId}`, ready: (p) => p.getByTestId('quote') },
          { name: 'studio course editor', actor: () => instructor, path: `/studio/courses/${course.id}`, ready: h1 },
          { name: 'admin users', actor: () => admin, path: '/admin/users', ready: h1 },
        ];
        const findings: Finding[] = [];
        for (const def of pages) {
          const page = def.actor().page;
          // Preferences are stored before navigating (one navigation per page): reloading right after a
          // navigation can abort the in-flight cookie refresh, and the rotated token is then lost.
          if (page.url() === 'about:blank') await page.goto('/');
          await usePrefs(page, lang, theme);
          await page.goto(def.path);
          await settle(page, lang, theme, def.ready(page));
          findings.push(...(await scan(page, def.name)));
        }

        // The MFA challenge step, in a fresh context (the challenge is shown, never answered here).
        const fresh = await browser.newContext();
        try {
          const p = await fresh.newPage();
          await p.goto('/');
          await usePrefs(p, lang, theme);
          await p.goto('/login');
          await p.locator('input[type="email"]').fill(ADMIN.email);
          await p.locator('input[type="password"]').fill(ADMIN.password);
          await p.locator('form button[type="submit"]').first().click();
          await settle(p, lang, theme, p.locator('input[autocomplete="one-time-code"]'));
          findings.push(...(await scan(p, 'login MFA challenge')));
        } finally {
          await fresh.close();
        }
        expect(findings, report(findings)).toEqual([]);
      });
    }
  }

  test('keyboard only: the Explore mega-menu opens, is traversable and closes with Escape', async () => {
    const page = anon.page;
    await usePrefs(page, 'en', 'light');
    await page.goto('/');
    await settle(page, 'en', 'light', page.locator('main h1').first());
    const button = page.getByRole('button', { name: /^Explore/ });
    await page.locator('body').focus();
    await tabTo(page, button);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    const panel = page.locator(`#${await button.getAttribute('aria-controls')}`.replace(/:/g, '\\:'));
    await expect(panel).toBeVisible();
    const allCategories = panel.getByRole('link', { name: 'All categories' });
    await tabTo(page, allCategories);
    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toBeHidden();
    await expect(button).toBeFocused();
    // Re-open and follow a link with Enter.
    await page.keyboard.press('Space');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await tabTo(page, allCategories);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/categories$/);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('keyboard only: answer, flag, navigate and submit an attempt', async () => {
    const page = student.page;
    await usePrefs(page, 'en', 'light');
    await page.goto(`/attempts/${attemptId}`);
    await settle(page, 'en', 'light', page.getByTestId('timer'));
    const main = page.locator('main');
    await expect(main.getByRole('heading', { name: 'Question 1 of 2' })).toBeVisible();

    // Question order may be randomised; the options of each question are not (allowShuffle: false).
    // Question 1: Tab into the radio group (focus lands on the first option), select it with Space, flag it, go Next.
    const firstOption = main.getByRole('radio').first();
    await page.locator('body').focus();
    await tabTo(page, firstOption);
    await page.keyboard.press('Space');
    await expect(firstOption).toBeChecked();
    const flag = main.getByRole('button', { name: 'Flag for review' });
    await tabTo(page, flag);
    await page.keyboard.press('Enter');
    await expect(main.getByRole('button', { name: 'Remove flag' })).toHaveAttribute('aria-pressed', 'true');
    const next = main.getByRole('button', { name: 'Next', exact: true });
    await tabTo(page, next, { back: true });
    await page.keyboard.press('Enter');
    // Focus moves to the new question heading.
    await expect(main.getByRole('heading', { name: 'Question 2 of 2' })).toBeFocused();

    // Question 2: arrow keys move the selection within the radio group.
    const right = main.getByRole('radio').nth(0);
    const wrong = main.getByRole('radio', { name: 'F12' });
    await tabTo(page, right);
    await page.keyboard.press('Space');
    await expect(right).toBeChecked();
    await page.keyboard.press('ArrowDown');
    await expect(wrong).toBeChecked();
    await expect(wrong).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(right).toBeChecked();

    // The navigator reflects answered/flagged state and is reachable by keyboard.
    const nav = page.getByRole('complementary', { name: /navigator/i });
    await expect(nav.getByRole('button', { name: /^Question 1\b/ })).toHaveAccessibleName(/answered.*flagged/);
    await expect(nav.getByText('Saved')).toBeVisible();

    // Submit through the confirmation dialog without the mouse.
    const submit = page.getByRole('button', { name: 'Submit assessment' });
    await tabTo(page, submit);
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('alertdialog').or(page.getByRole('dialog'));
    await expect(dialog).toBeVisible();
    // Escape cancels and returns focus to the trigger.
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(submit).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();
    await tabTo(page, dialog.getByRole('button', { name: 'Submit assessment' }));
    await page.keyboard.press('Enter');
    await expect(page.getByText('Score', { exact: true })).toBeVisible();
    await expect(page.getByText('Passed', { exact: true })).toBeVisible();
  });
});
