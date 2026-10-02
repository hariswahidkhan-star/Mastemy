import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import type { Actor } from './helpers';
import { ADMIN, API, PASSWORD, apiLogin, email, label, login, newActor, run } from './helpers';

/**
 * Wave 3 workspace: authoring concurrency and revisions, consent-gated analytics, study plan + ICS, trust & safety
 * (complaint → hide → appeal, takedown hold → 451), the broken-video queue and AI availability, through the real UI
 * against the real API + MySQL. Course scaffolding is done over the API.
 *
 * AI: when the API runs without Ai:ApiKey the "AI assistant isn't enabled" path is checked. When it runs with
 * Ai:ApiKey and Ai:BaseUrl pointing at e2e/fake-anthropic.mjs, one grounded tutor answer with a citation is checked.
 */

interface Json {
  [k: string]: unknown;
}

class Api {
  constructor(
    private request: APIRequestContext,
    public token = '',
  ) {}
  async call<T = Json>(
    method: string,
    path: string,
    body?: unknown,
    expected = [200, 201, 202, 204],
    headers: Record<string, string> = {},
  ) {
    const res = await this.request.fetch(`${API}${path}`, {
      method,
      headers: {
        ...headers,
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
  async saveNotes(lessonId: string, notesMarkdown: string, premiumNotesMarkdown = '') {
    const { eTag: etag } = await this.get<{ eTag: string }>(
      `/api/studio/lessons/${lessonId}/notes`,
    );
    return this.call(
      'PUT',
      `/api/studio/lessons/${lessonId}/notes`,
      { notesMarkdown, premiumNotesMarkdown },
      [200],
      {
        'If-Match': etag,
      },
    );
  }
}

/** Signs in over the API; privileged users answer the TOTP challenge (or enroll) inside apiLogin. */
async function signIn(request: APIRequestContext, mail: string, password = PASSWORD) {
  const res = await apiLogin(request, mail, password);
  return { api: new Api(request, res.accessToken), userId: res.user.id };
}

async function registerApi(request: APIRequestContext, name: string, mail: string) {
  const api = new Api(request);
  const res = await api.post<{ user: { id: string } }>('/api/auth/register', {
    email: mail,
    password: PASSWORD,
    displayName: name,
    preferredLanguage: 'en',
  });
  return res.user.id;
}

const ytId = (suffix: string) =>
  `k${run}${suffix}`
    .replace(/[^A-Za-z0-9_-]/g, '')
    .padEnd(11, 'z')
    .slice(0, 11);
const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);

const SETUP_NOTES = `SETUP-${run}: Retention reviews happen every quarter for each dataset in the register.`;
const THEIR_NOTES = `THEIRS-${run}: a co-author edited these notes meanwhile.`;
const MY_NOTES = `MINE-${run}: my rewrite of the lesson notes.`;

test.describe
  .serial('wave 3 workspace: authoring, analytics, study tools, trust, operations, AI', () => {
  let instructor: Actor;
  let student: Actor;
  let admin: Actor;
  let visitor: Actor;
  const people = {
    instructor: email('wsinstructor'),
    student: email('wsstudent'),
  };
  const courseTitle = `Records Retention Practice ${run}`;
  const course = {
    id: '',
    slug: '',
    lesson1: '',
    lesson2: '',
    video1: '',
    video1Title: '',
  };
  let threadId = '';
  const threadTitle = `Is quarterly review enough ${run}?`;

  test.beforeAll(async ({ browser }) => {
    instructor = await newActor(browser);
    student = await newActor(browser);
    admin = await newActor(browser);
    visitor = await newActor(browser);
  });

  test('setup over the API: users, channel and a draft course with two ready videos', async ({
    request,
  }) => {
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    const instructorId = await registerApi(request, 'Wafa Workspace', people.instructor);
    await registerApi(request, 'Sami Student', people.student);
    await adminApi.put(`/api/admin/users/${instructorId}/roles`, {
      roles: ['Student', 'Instructor'],
    });
    const channel = await adminApi.post<{ id: string }>('/api/admin/youtube/channels', {
      channelId: `UC${`ws${run}`.padEnd(22, 'q').slice(0, 22)}`,
      title: `Mastemy Workspace ${run}`,
      mode: 'MastemyManaged',
    });
    const { api: inst } = await signIn(request, people.instructor);
    // Staff review here (granting Reviewer to a fresh account needs a verified email).
    const reviewer = adminApi;
    const categories = await inst.get<{ id: number }[]>('/api/categories');
    const c = await inst.post<{ id: string; slug: string }>('/api/studio/courses', {
      title: courseTitle,
      subtitle: 'Wave 3 workspace end-to-end course',
      description: 'A course used by the workspace end-to-end suite. Videos are free on YouTube.',
      audience: 'Records managers',
      prerequisites: '',
      outcomes: ['Plan reviews', 'Keep a register', 'Handle complaints'],
      language: 'en',
      level: 'Beginner',
      categoryIds: [categories[0].id],
    });
    course.id = c.id;
    course.slug = c.slug;
    const m = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/modules`, {
      title: 'Basics',
    });
    const lessons: string[] = [];
    for (const [i, title] of ['Review cadence', 'Disposal rules'].entries()) {
      const l = await inst.post<{ id: string }>(`/api/studio/modules/${m.id}/lessons`, {
        title,
        objective: 'Know the rule.',
        isPreview: true,
      });
      lessons.push(l.id);
      await inst.saveNotes(l.id, i === 0 ? SETUP_NOTES : `Disposal notes ${run}.`);
      const videoTitle = `Workspace video ${i} ${run}`;
      const v = await inst.post<{ id: string }>(`/api/studio/lessons/${l.id}/video`, {
        url: `https://youtu.be/${ytId(String(i))}`,
        channelId: channel.id,
        rightsDeclared: true,
        rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
        title: videoTitle,
        durationSeconds: 600,
      });
      await reviewer.post(`/api/admin/youtube/videos/${v.id}/confirm`, {
        approve: true,
      });
      if (i === 0) {
        course.video1 = v.id;
        course.video1Title = videoTitle;
      }
    }
    course.lesson1 = lessons[0];
    course.lesson2 = lessons[1];
  });

  test('notes editor: a stale save gets 412 and the conflict dialog; overwriting re-applies on the latest version', async ({
    request,
  }) => {
    const page = instructor.page;
    await login(page, people.instructor);
    await page.goto(`/studio/courses/${course.id}/lessons/${course.lesson1}`);
    await page.getByRole('tab', { name: 'Notes' }).click();
    const box = page.getByRole('textbox', { name: 'Study notes' });
    await expect(box).toHaveValue(SETUP_NOTES);
    await expect(page.getByText('All changes saved')).toBeVisible();

    // A co-author saves over the API while this editor still holds the old ETag.
    const { api: inst } = await signIn(request, people.instructor);
    await inst.saveNotes(course.lesson1, THEIR_NOTES);

    await box.fill(MY_NOTES);
    const dialog = page.getByRole('alertdialog', {
      name: 'These notes were changed by someone else',
    });
    // Autosave (20 s) may have hit the conflict first; otherwise save explicitly.
    if (!(await dialog.isVisible())) await page.getByRole('button', { name: 'Save notes' }).click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(THEIR_NOTES);
    await expect(dialog).toContainText(MY_NOTES);
    await dialog.getByRole('button', { name: 'Overwrite with my version' }).click();
    await expect(page.getByText('Notes saved.')).toBeVisible();
    await expect(dialog).toBeHidden();
    const saved = await inst.get<{ notesMarkdown: string }>(
      `/api/studio/lessons/${course.lesson1}/notes`,
    );
    expect(saved.notesMarkdown).toBe(MY_NOTES);
  });

  test('revision history drawer: view an older revision and restore it', async ({ request }) => {
    const page = instructor.page;
    const { api: inst } = await signIn(request, people.instructor);
    const revisions = await inst.get<
      { revision: number; notesLength: number; isCurrent: boolean }[]
    >(`/api/studio/lessons/${course.lesson1}/revisions`);
    const setupRev = revisions.find((r) => !r.isCurrent && r.notesLength === SETUP_NOTES.length);
    expect(setupRev).toBeTruthy();
    const n = setupRev!.revision;

    await page.getByRole('button', { name: 'Revision history' }).click();
    const drawer = page.getByRole('dialog', { name: 'Notes revisions' });
    await drawer.getByRole('button', { name: `View revision ${n}`, exact: true }).click();
    await expect(drawer).toContainText(SETUP_NOTES);
    await drawer.getByRole('button', { name: `Restore revision ${n}` }).click();
    await expect(page.getByText('Revision restored as a new revision.')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('textbox', { name: 'Study notes' })).toHaveValue(SETUP_NOTES);
    const after = await inst.get<
      {
        revision: number;
        restoredFromRevision: number | null;
        isCurrent: boolean;
      }[]
    >(`/api/studio/lessons/${course.lesson1}/revisions`);
    expect(after.find((r) => r.isCurrent)?.restoredFromRevision).toBe(n);
  });

  test('course is published; the editor shows history and the analytics tab', async ({
    request,
  }) => {
    const { api: inst } = await signIn(request, people.instructor);
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    await inst.post(`/api/studio/courses/${course.id}/submit`);
    await adminApi.post(`/api/review/courses/${course.id}/decision`, {
      decision: 'Approve',
    });
    await adminApi.post(`/api/admin/courses/${course.id}/publish`);

    const page = instructor.page;
    await page.goto(`/studio/courses/${course.id}?tab=history`);
    await expect(page.getByRole('list', { name: 'Course history' })).toContainText(
      'Notes revision',
    );
    await page.getByRole('tab', { name: 'Analytics' }).click();
    await expect(page.getByText('Enrolments over time')).toBeVisible();
  });

  test('consent banner gates analytics: no events before consent, one course view after', async ({
    request,
  }) => {
    const { api: inst } = await signIn(request, people.instructor);
    // Each read uses a distinct range so the 5-minute report cache never answers.
    const views = async (fromDays: number) =>
      (
        await inst.get<{ conversion: { courseViewVisitors: number } }>(
          `/api/studio/courses/${course.id}/analytics?from=${daysAgo(fromDays)}`,
        )
      ).conversion.courseViewVisitors;

    const page = visitor.page;
    let eventCalls = 0;
    page.on('request', (r) => {
      if (r.url().includes('/api/analytics/events')) eventCalls++;
    });
    await page.goto(`/courses/${course.slug}`);
    const banner = page.getByRole('region', { name: 'Analytics cookies' });
    await expect(banner).toBeVisible();
    await expect(page.getByRole('heading', { name: courseTitle })).toBeVisible();
    await page.waitForTimeout(1500);
    expect(eventCalls).toBe(0);
    expect(await views(20)).toBe(0);

    const sent = page.waitForResponse((r) => r.url().includes('/api/analytics/events'));
    await banner.getByRole('button', { name: 'Accept analytics' }).click();
    expect((await sent).status()).toBe(202);
    await expect(banner).toBeHidden();
    await expect.poll(() => views(21)).toBe(1);

    // The choice persists (cookie): no banner on the next page.
    await page.reload();
    await expect(page.getByRole('heading', { name: courseTitle })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Analytics cookies' })).toHaveCount(0);

    // Staff platform dashboard renders from the same module.
    await login(admin.page, ADMIN.email, ADMIN.password);
    await admin.page.goto('/admin/analytics');
    await expect(admin.page.getByRole('heading', { name: 'Platform dashboard' })).toBeVisible();
    await expect(admin.page.getByTestId('admin-stats')).toContainText('Published courses');
  });

  test('study plan: build a plan, see the weekly schedule and download the ICS file', async ({
    request,
  }) => {
    const { api: stu } = await signIn(request, people.student);
    await stu.post(`/api/learn/courses/${course.id}/enroll`);
    const page = student.page;
    await login(page, people.student);
    await expect(page.getByRole('heading', { name: 'Pick up where you left off' })).toBeVisible();
    await expect(page.getByRole('link', { name: `Resume ${courseTitle}` })).toBeVisible();
    await page.goto('/me/study-plan');
    await page.getByLabel(courseTitle).check();
    await page.getByLabel(label('Minutes per week')).fill('120');
    await page.getByRole('button', { name: 'Save plan' }).click();
    await expect(page.getByText('Study plan saved.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Weekly schedule' })).toBeVisible();
    await expect(page.getByText(`${courseTitle} › Review cadence`)).toBeVisible();
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download calendar (.ics)' }).click();
    const file = await download;
    expect(file.suggestedFilename()).toMatch(/\.ics$/);
    const ics = await readFile((await file.path())!, 'utf8');
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics.replace(/\r\n /g, '')).toContain('Review cadence');
  });

  test('complaint → staff hides the thread → the author appeals → staff reinstates', async ({
    request,
  }) => {
    const { api: stu } = await signIn(request, people.student);
    const t = await stu.post<{ thread: { id: string } }>(`/api/courses/${course.id}/discussions`, {
      lessonId: course.lesson1,
      title: threadTitle,
      body: 'Is a quarterly review really enough for every dataset?',
    });
    threadId = t.thread.id;

    // An anonymous visitor reports it.
    const page = visitor.page;
    await page.goto(`/courses/${course.slug}/discussions/${threadId}`);
    await expect(page.getByRole('heading', { name: threadTitle })).toBeVisible();
    await page.getByRole('button', { name: 'Report content' }).click();
    const dialog = page.getByRole('dialog', { name: 'Report content' });
    await dialog.getByLabel('Reason').selectOption('Abuse');
    await dialog
      .getByLabel(label('Details and evidence'))
      .fill('This thread copies a paid newsletter word for word.');
    await dialog.getByLabel(label('Your email')).fill(`reporter.${run}@e2e.mastemy.test`);
    await dialog.getByRole('button', { name: 'Send report' }).click();
    await expect(dialog.getByText('Thank you. Your report was received')).toBeVisible();
    await dialog.getByRole('button', { name: 'Close' }).first().click();

    // Staff hide it from the trust console.
    const ap = admin.page;
    await ap.goto('/admin/trust');
    const card = ap.getByRole('listitem').filter({ hasText: threadId });
    await card.getByRole('button', { name: 'Hide' }).click();
    const hide = ap.getByRole('alertdialog', {
      name: 'Hide the reported content',
    });
    await hide.getByLabel(label('Note')).fill('Copied content confirmed.');
    await hide.getByRole('button', { name: 'Hide', exact: true }).click();
    await expect(ap.getByText('Complaint resolved.')).toBeVisible();

    // The author no longer sees it and appeals.
    const sp = student.page;
    await sp.goto(`/courses/${course.slug}/discussions/${threadId}`);
    await expect(sp.getByText('This content is not available')).toBeVisible();
    await sp.getByRole('button', { name: 'Appeal' }).click();
    const appeal = sp.getByRole('dialog', {
      name: 'Appeal a moderation decision',
    });
    await appeal
      .getByLabel(label('Reason'))
      .fill('I wrote this question myself; nothing was copied.');
    await appeal.getByRole('button', { name: 'Send appeal' }).click();
    await expect(sp.getByText('Appeal sent.')).toBeVisible();
    await sp.goto('/me/appeals');
    await expect(sp.getByText('Pending')).toBeVisible();

    // Staff reinstate.
    await ap.goto('/admin/trust?tab=appeals');
    const appealCard = ap.getByRole('listitem').filter({ hasText: threadId });
    await appealCard.getByRole('button', { name: 'Reinstate content' }).click();
    const decide = ap.getByRole('dialog', { name: 'Reinstate content' });
    await decide.getByLabel(label('Note')).fill('Original question, not copied.');
    await decide.getByRole('button', { name: 'Reinstate content' }).click();
    await expect(ap.getByText('Appeal decided.')).toBeVisible();
    await sp.goto(`/courses/${course.slug}/discussions/${threadId}`);
    await expect(sp.getByRole('heading', { name: threadTitle })).toBeVisible();
  });

  test('a lesson takedown hold shows the 451 notice in the workspace until staff release it', async ({
    request,
  }) => {
    const anon = new Api(request);
    const filed = await anon.post<{ id: string }>('/api/complaints', {
      type: 'Copyright',
      targetType: 'Lesson',
      targetId: course.lesson2,
      evidence: 'The disposal lesson reproduces our training video script.',
      email: `rights.${run}@e2e.mastemy.test`,
      name: 'Rights Holder',
    });
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    await adminApi.post(`/api/admin/trust/complaints/${filed.id}/resolve`, {
      action: 'Hide',
      note: 'Takedown pending counter-notice.',
    });
    const sp = student.page;
    await sp.goto(`/learn/${course.slug}/${course.lesson2}`);
    await expect(sp.getByText('Lesson temporarily unavailable')).toBeVisible();

    const ap = admin.page;
    await ap.goto('/admin/trust?tab=holds');
    const hold = ap.getByRole('listitem').filter({ hasText: course.lesson2 });
    await hold.getByRole('button', { name: 'Release hold' }).click();
    const dlg = ap.getByRole('dialog', { name: 'Release hold' });
    await dlg.getByLabel(label('Note')).fill('Counter-notice accepted.');
    await dlg.getByRole('button', { name: 'Release hold' }).click();
    await expect(ap.getByText('Hold released.')).toBeVisible();
    await sp.reload();
    await expect(sp.getByRole('heading', { name: 'Disposal rules' })).toBeVisible();
  });

  test('AI: entry points reflect /api/ai/status (not enabled note, or a grounded tutor answer with a citation)', async ({
    request,
  }) => {
    const { api: stu } = await signIn(request, people.student);
    const status = await stu.get<{ configured: boolean }>('/api/ai/status');
    const sp = student.page;
    await sp.goto(`/learn/${course.slug}/${course.lesson1}`);
    await sp.getByRole('tab', { name: 'AI tutor' }).click();
    if (!status.configured) {
      await expect(sp.getByText("AI assistant isn't enabled")).toBeVisible();
      await expect(sp.getByRole('button', { name: 'Ask' })).toHaveCount(0);
      await sp.getByRole('tab', { name: 'AI quiz' }).click();
      await expect(sp.getByText("AI assistant isn't enabled")).toBeVisible();
      await expect(sp.getByRole('button', { name: 'Generate questions' })).toHaveCount(0);
      return;
    }
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    await adminApi.post(`/api/admin/ai/courses/${course.id}/reindex`);
    await sp
      .getByLabel('Your question')
      .fill('How often do retention reviews happen for each dataset?');
    await sp.getByRole('button', { name: 'Ask' }).click();
    const reply = sp.getByTestId('tutor-reply').last();
    await expect(reply).toContainText('retention reviews happen every quarter');
    await expect(reply).toContainText('[1]');
    await expect(reply.locator('.ws-cites')).toContainText('[1] Review cadence');
    // The conversation is listed and can be deleted.
    await sp.getByRole('button', { name: 'Delete conversation' }).click();
    await sp.getByRole('alertdialog').getByRole('button', { name: 'Delete' }).click();
    await expect(sp.getByText('Conversation deleted.')).toBeVisible();
  });

  test('broken links: a Restricted video in a live course is queued and instructors can be notified', async () => {
    // No API sets a Ready video to Restricted without YouTube (the background checker does it in production),
    // so the status is changed in the database, exactly as the checker would.
    const db = process.env.E2E_DB ?? 'mastemy_e2e';
    execFileSync('mysql', [
      `-h${process.env.MYSQL_HOST ?? '127.0.0.1'}`,
      `-u${process.env.MYSQL_USER ?? 'mastemy'}`,
      `-p${process.env.MYSQL_PASSWORD ?? 'mastemy_dev_pw'}`,
      db,
      '-e',
      `UPDATE VideoAssets SET Status = 7, StatusReason = 'Video made private on YouTube (e2e).' WHERE Id = '${course.video1}';`,
    ]);
    const ap = admin.page;
    await ap.goto('/admin/operations');
    const item = ap.getByRole('listitem', { name: course.video1Title });
    await expect(item).toContainText('Restricted');
    await expect(item).toContainText(courseTitle);
    await expect(item).toContainText('Instructors not notified yet');
    await item.getByRole('button', { name: 'Notify instructors' }).click();
    await expect(ap.getByText(/Notified \d+ people about 1 courses\./)).toBeVisible();
    await expect(item).toContainText('Last notified');
    await ap.getByRole('tab', { name: 'System health' }).click();
    await expect(ap.getByText('Overall status')).toBeVisible();
    await expect(ap.getByText('mysql', { exact: true })).toBeVisible();
  });
});
