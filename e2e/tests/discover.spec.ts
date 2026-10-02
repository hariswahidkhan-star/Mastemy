import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import type { Actor } from './helpers';
import { ADMIN, API, PASSWORD, email, label, login, newActor, run } from './helpers';

/**
 * Wave 3 discovery: skills, the certification directory (two-person verification), career paths,
 * collections, the rebuilt home page, search suggestions + didYouMean and the extended catalogue filters,
 * through the real UI against the real API + MySQL. Course scaffolding is done over the API (wave 1 covers
 * authoring through the UI).
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
  const api = new Api(request);
  const res = await api.post<{ accessToken: string; user: { id: string } }>('/api/auth/login', {
    email: mail,
    password,
  });
  api.token = res.accessToken;
  return { api, userId: res.user.id };
}

async function registerApi(request: APIRequestContext, name: string, mail: string) {
  const api = new Api(request);
  const res = await api.post<{ accessToken: string; user: { id: string } }>('/api/auth/register', {
    email: mail,
    password: PASSWORD,
    displayName: name,
    preferredLanguage: 'en',
  });
  return res.user.id;
}

const ytId = (suffix: string) =>
  `d${run}${suffix}`.replace(/[^A-Za-z0-9_-]/g, '').padEnd(11, 'z').slice(0, 11);
const today = () => new Date().toISOString().slice(0, 10);

test.describe.serial('wave 3 discovery: taxonomy, certification directory, pathways, search', () => {
  let admin: Actor;
  let instructor: Actor;
  let reviewer: Actor;
  const people = {
    instructor: email('d3instructor'),
    reviewer: email('d3reviewer'),
  };
  // A distinctive word so the spelling correction has exactly one candidate.
  const titleA = `Hydroponics Fundamentals ${run}`;
  const titleB = `Greenhouse Irrigation ${run}`;
  const skillCode = `hydro-${run}`;
  const skillName = `Nutrient Film ${run}`;
  const certTitle = `Certified Hydroponic Grower ${run}`;
  const examCode = `CHG-${run}`.toUpperCase();
  const pathwaySlug = `grow-path-${run}`;
  const pathwayTitle = `Grow Path ${run}`;
  const collectionSlug = `grow-picks-${run}`;
  const collectionTitle = `Grow Picks ${run}`;
  let courseA = { id: '', slug: '' };
  let courseB = { id: '', slug: '' };
  let certId = '';
  let certSlug = '';

  test.beforeAll(async ({ browser }) => {
    admin = await newActor(browser);
    instructor = await newActor(browser);
    reviewer = await newActor(browser);
  });

  test('setup over the API: users, roles, channel and two draft courses with ready videos', async ({
    request,
  }) => {
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    const instructorId = await registerApi(request, 'Hana Grower', people.instructor);
    const reviewerId = await registerApi(request, 'Rafi Reviewer', people.reviewer);
    // Privileged roles need a verified email (wave 3 identity rules); no mail is sent in e2e.
    for (const id of [instructorId, reviewerId])
      await adminApi.post(`/api/admin/users/${id}/email-verification/mark-verified`);
    await adminApi.put(`/api/admin/users/${instructorId}/roles`, { roles: ['Student', 'Instructor'] });
    await adminApi.put(`/api/admin/users/${reviewerId}/roles`, { roles: ['Student', 'Reviewer'] });
    const channel = await adminApi.post<{ id: string }>('/api/admin/youtube/channels', {
      channelId: `UC${`d3${run}`.padEnd(22, 'q').slice(0, 22)}`,
      title: `Mastemy Discover ${run}`,
      mode: 'MastemyManaged',
    });
    const { api: inst } = await signIn(request, people.instructor);
    const { api: rev } = await signIn(request, people.reviewer);
    const categories = await inst.get<{ id: number }[]>('/api/categories');

    const draft = async (title: string, level: string, suffix: string) => {
      const c = await inst.post<{ id: string; slug: string }>('/api/studio/courses', {
        title,
        subtitle: 'Wave 3 discovery end-to-end course',
        description: 'A course used by the discovery end-to-end suite. Videos are free on YouTube.',
        audience: 'Growers',
        prerequisites: '',
        outcomes: ['Explain the system', 'Set up a bed', 'Monitor nutrients'],
        language: 'en',
        level,
        categoryIds: [categories[0].id],
      });
      const m = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/modules`, {
        title: 'Basics',
      });
      const l = await inst.post<{ id: string }>(`/api/studio/modules/${m.id}/lessons`, {
        title: `Getting started ${suffix}`,
        objective: 'Understand the basics.',
        isPreview: true,
      });
      const video = await inst.post<{ id: string }>(`/api/studio/lessons/${l.id}/video`, {
        url: `https://youtu.be/${ytId(suffix)}`,
        channelId: channel.id,
        rightsDeclared: true,
        rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
        title: `Discover video ${suffix} ${run}`,
        durationSeconds: 300,
      });
      await rev.post(`/api/admin/youtube/videos/${video.id}/confirm`, { approve: true });
      return { id: c.id, slug: c.slug };
    };
    courseA = await draft(titleA, 'Beginner', 'A');
    courseB = await draft(titleB, 'Intermediate', 'B');
  });

  test('staff create a skill in the admin UI', async () => {
    const page = admin.page;
    await login(page, ADMIN.email, ADMIN.password);
    await page.goto('/admin/skills');
    await expect(page.getByRole('heading', { name: 'Skills catalogue', level: 1 })).toBeVisible();
    await page.getByRole('button', { name: 'New skill' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByLabel(label('Code')).fill(skillCode);
    await dialog.getByLabel(label('Name (English)')).fill(skillName);
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByRole('row').filter({ hasText: skillCode })).toContainText(skillName);
  });

  test('the instructor tags course A with the skill in the studio; both courses are published', async ({
    request,
  }) => {
    const page = instructor.page;
    await login(page, people.instructor);
    await page.goto(`/studio/courses/${courseA.id}?tab=taxonomy`);
    await expect(page.getByRole('heading', { name: 'Course skills' })).toBeVisible();
    await page.getByLabel('Filter skills').fill(run);
    await page.getByLabel(`${skillName} (${skillCode})`).check();
    await page.getByRole('button', { name: 'Save skills' }).click();
    await expect(page.getByText('Skills saved. They appear publicly after the next publish.')).toBeVisible();

    const { api: inst } = await signIn(request, people.instructor);
    const { api: rev } = await signIn(request, people.reviewer);
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    for (const c of [courseA, courseB]) {
      await inst.post(`/api/studio/courses/${c.id}/submit`);
      await rev.post(`/api/review/courses/${c.id}/decision`, { decision: 'Approve' });
      await adminApi.post(`/api/admin/courses/${c.id}/publish`);
    }
  });

  test('staff create an issuer and a certification; the second reviewer verifies it', async () => {
    const page = admin.page;
    await page.goto('/admin/certifications');
    await expect(page.getByRole('heading', { name: 'Certification directory', level: 1 })).toBeVisible();
    // Issuer
    await page.getByRole('button', { name: 'New issuer' }).click();
    let dialog = page.getByRole('dialog');
    await dialog.getByLabel(label('Issuer name')).fill(`Hydro Board ${run}`);
    await dialog.getByLabel('Website').fill('https://hydro-board.example');
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog).toBeHidden();
    // Certification
    await page.getByRole('button', { name: 'New certification' }).click();
    dialog = page.getByRole('dialog');
    await dialog.getByLabel(label('Issuer')).selectOption({ label: `Hydro Board ${run}` });
    await dialog.getByLabel(label('Title')).fill(certTitle);
    await dialog.getByLabel('Exam code').fill(examCode);
    await dialog.getByLabel('Version').fill('2026');
    await dialog.getByLabel('Official source').fill('https://hydro-board.example/chg');
    await dialog.getByLabel('Last checked').fill(today());
    await dialog.getByLabel('The exam includes non-multiple-choice tasks').check();
    await dialog
      .getByLabel(label('This exam includes tasks that are not multiple-choice'))
      .fill('The official exam includes a practical greenhouse assessment.');
    await dialog.getByRole('button', { name: 'Create' }).click();
    await expect(page).toHaveURL(/\/admin\/certifications\/[0-9a-f-]{36}$/);
    certId = page.url().split('/').pop() ?? '';

    // Blueprint objective.
    await page.getByRole('button', { name: 'Add objective' }).click();
    dialog = page.getByRole('dialog');
    await dialog.getByLabel(label('Code')).fill('D1');
    await dialog.getByLabel(label('Objective')).fill('Nutrient solution management');
    await dialog.getByLabel('Weight').fill('40');
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('cell', { name: 'Nutrient solution management' }).first()).toBeVisible();

    // Link course A.
    await page.getByLabel('Find a live course').fill(titleA);
    await page.getByRole('button', { name: `Choose ${titleA}` }).click();
    await page.getByRole('button', { name: 'Link course' }).click();
    await expect(page.getByText('Course linked.')).toBeVisible();

    // The editor cannot verify their own entry: the rule is surfaced before and after the attempt.
    await page.getByLabel('Move to state').selectOption('PublishedPreparation');
    await expect(
      page.getByRole('listitem').filter({ hasText: 'You are not the last editor' }),
    ).toContainText('✗');
    await page.getByRole('button', { name: 'Change state' }).click();
    await expect(
      page.getByText('The reviewer must be a different person from the last editor.'),
    ).toBeVisible();

    // A second person (Reviewer role) verifies it.
    const rp = reviewer.page;
    await login(rp, people.reviewer);
    await rp.goto(`/admin/certifications/${certId}`);
    await expect(rp.getByRole('heading', { name: certTitle, level: 1 })).toBeVisible();
    await rp.getByLabel('Move to state').selectOption('PublishedPreparation');
    await rp.getByLabel('Notes (audited)').fill('Checked against the official page today.');
    await rp.getByRole('button', { name: 'Change state' }).click();
    await expect(rp.getByText('State updated.')).toBeVisible();
    await expect(rp.getByText(/^Verified on /)).toBeVisible();
    await expect(rp.getByRole('link', { name: 'View public page' })).toBeVisible();
    certSlug = (await rp.getByRole('link', { name: 'View public page' }).getAttribute('href'))!
      .split('/')
      .pop()!;
  });

  test('staff build a career path and an editorial collection with ordered course pickers', async () => {
    const page = admin.page;
    await page.goto('/admin/pathways');
    await page.getByRole('button', { name: 'New career path' }).click();
    let dialog = page.getByRole('dialog');
    await dialog.getByLabel(label('Slug')).fill(pathwaySlug);
    await dialog.getByLabel(label('Title (English)')).fill(pathwayTitle);
    await dialog.getByLabel('Description (English)').fill('From first bed to irrigation.');
    await dialog.getByLabel('Published').check();
    await dialog.getByLabel('Find a live course').fill(run);
    await dialog.getByRole('button', { name: `Add ${titleB}` }).click();
    await dialog.getByRole('button', { name: `Add ${titleA}` }).click();
    // Put A first.
    await dialog.getByRole('button', { name: `Move ${titleA} up` }).click();
    await expect(dialog.getByRole('listitem').filter({ hasText: titleA }).first()).toContainText(
      `1. ${titleA}`,
    );
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText(`/${pathwaySlug}`)).toBeVisible();

    await page.goto('/admin/collections');
    await page.getByRole('button', { name: 'New collection' }).click();
    dialog = page.getByRole('dialog');
    await dialog.getByLabel(label('Slug')).fill(collectionSlug);
    await dialog.getByLabel(label('Title (English)')).fill(collectionTitle);
    await dialog.getByLabel('Find a live course').fill(run);
    await dialog.getByRole('button', { name: `Add ${titleA}` }).click();
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText(`/${collectionSlug}`)).toBeVisible();
  });

  test('public pages show the certification, path and collection', async ({ browser }) => {
    const { page, context } = await newActor(browser);
    await page.goto('/certifications');
    await expect(page.getByText(/is not affiliated with|not the exam provider/).first()).toBeVisible();
    await page.getByRole('link', { name: new RegExp(certTitle) }).click();
    await expect(page.getByRole('heading', { name: certTitle, level: 1 })).toBeVisible();
    await expect(page.getByText(examCode)).toBeVisible();
    await expect(page.getByRole('link', { name: 'https://hydro-board.example/chg' })).toBeVisible();
    await expect(page.getByText('The official exam includes a practical greenhouse assessment.')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Nutrient solution management' })).toBeVisible();
    await expect(page.getByRole('heading', { name: titleA })).toBeVisible();
    await expect(page.getByText(/Mastemy is not affiliated with/)).toBeVisible();

    await page.goto(`/pathways/${pathwaySlug}`);
    await expect(page.getByRole('heading', { name: pathwayTitle, level: 1 })).toBeVisible();
    const items = page.getByRole('list').filter({ hasText: titleB }).getByRole('heading', { level: 3 });
    await expect(items.nth(0)).toHaveText(titleA);
    await expect(items.nth(1)).toHaveText(titleB);
    // Anonymous visitors are asked to log in before enrolling.
    await expect(page.getByRole('link', { name: 'Log in to enroll in this path' })).toBeVisible();

    await page.goto(`/collections/${collectionSlug}`);
    await expect(page.getByRole('heading', { name: collectionTitle, level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: titleA })).toBeVisible();

    // Home: the featured editorial collection is a row with a link to the collection page.
    await page.goto('/');
    await expect(page.getByRole('heading', { name: collectionTitle })).toBeVisible();

    // Mega-menu: keyboard disclosure lists the path.
    const explore = page.getByRole('button', { name: /Explore/ });
    await explore.focus();
    await page.keyboard.press('Enter');
    await expect(explore).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: pathwayTitle, exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(explore).toHaveAttribute('aria-expanded', 'false');
    await context.close();
  });

  test('a signed-in learner enrolls in every course of the path at once', async () => {
    const page = instructor.page;
    await page.goto(`/pathways/${pathwaySlug}`);
    await page.getByRole('button', { name: 'Enroll in all 2 courses' }).click();
    await expect(
      page.getByRole('status').filter({ hasText: /Enrolled in \d+ new courses/ }).first(),
    ).toBeVisible();
  });

  test('search suggestions and didYouMean', async ({ browser }) => {
    const { page, context } = await newActor(browser);
    await page.goto('/');
    const box = page.getByRole('combobox', { name: 'Search' });
    await box.fill(titleA.slice(0, -1));
    const option = page.getByRole('option', { name: new RegExp(titleA) });
    await expect(option).toBeVisible();
    await box.press('ArrowDown');
    await expect(box).toHaveAttribute('aria-activedescendant', /.+/);
    await box.press('Enter');
    await expect(page).toHaveURL(new RegExp(`/courses/${courseA.slug}$`));

    // A misspelled query is corrected and the corrected results are shown.
    await page.goto(`/courses?q=${encodeURIComponent(`Hydroponcs ${run}`)}`);
    await expect(page.getByText('Did you mean')).toBeVisible();
    await expect(page.getByRole('heading', { name: titleA })).toBeVisible();
    await context.close();
  });

  test('extended filters narrow the catalogue and stay in the URL', async ({ browser }) => {
    const { page, context } = await newActor(browser);
    await page.goto(`/courses?q=${encodeURIComponent(run)}`);
    await expect(page.getByRole('heading', { name: titleA })).toBeVisible();
    await expect(page.getByRole('heading', { name: titleB })).toBeVisible();

    await page.getByLabel('Skill', { exact: true }).selectOption({ label: skillName });
    await expect(page).toHaveURL(new RegExp(`skill=${skillCode}`));
    await expect(page.getByRole('heading', { name: titleA })).toBeVisible();
    await expect(page.getByRole('heading', { name: titleB })).toHaveCount(0);

    await page.getByRole('button', { name: /Clear filters/ }).click();
    await expect(page.getByRole('heading', { name: titleB })).toBeVisible();

    await page.getByLabel('Certification', { exact: true }).selectOption({ value: certSlug });
    await expect(page).toHaveURL(new RegExp(`certification=${certSlug}`));
    await expect(page.getByRole('heading', { name: titleA })).toBeVisible();
    await expect(page.getByRole('heading', { name: titleB })).toHaveCount(0);

    // Reloading keeps the filter (URL is the source of truth).
    await page.reload();
    await expect(page.getByLabel('Certification', { exact: true })).toHaveValue(certSlug);
    await expect(page.getByRole('heading', { name: titleB })).toHaveCount(0);

    await page.goto(`/courses?q=${encodeURIComponent(run)}&level=Intermediate&duration=short`);
    await expect(page.getByRole('heading', { name: titleB })).toBeVisible();
    await expect(page.getByRole('heading', { name: titleA })).toHaveCount(0);
    await context.close();
  });
});
