import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import type { Actor } from './helpers';
import { ADMIN, API, PASSWORD, email, label, login, newActor, run } from './helpers';

/**
 * Wave 2: discovery, Q&A, announcements, notifications, resources, certificate PDF and enterprise
 * workspaces, through the real UI against the real API + MySQL. Course scaffolding that wave 1 already
 * covers through the UI (authoring, video confirmation, question review, publication) is done over the API
 * here so this spec stays focused on the new screens.
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
    expected = [200, 201, 204],
    extraHeaders: Record<string, string> = {},
  ) {
    const res = await this.request.fetch(`${API}${path}`, {
      method,
      headers: {
        ...extraHeaders,
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

const ytId = (suffix: string) => `w${run}${suffix}`.replace(/[^A-Za-z0-9_-]/g, '').padEnd(11, 'x').slice(0, 11);

test.describe.serial('wave 2: discovery, engagement, resources, certificates, enterprise', () => {
  let admin: Actor;
  let instructor: Actor;
  let student: Actor;
  const people = {
    instructor: email('w2instructor'),
    reviewer: email('w2reviewer'),
    student: email('w2student'),
  };
  const titleA = `Data Ethics Essentials ${run}`;
  const titleB = `Privacy Engineering Basics ${run}`;
  let courseA = { id: '', slug: '', lessonId: '' };
  let courseB = { id: '', slug: '' };
  let studentId = '';
  let certificateCode = '';
  let orgId = '';

  test.beforeAll(async ({ browser }) => {
    admin = await newActor(browser);
    instructor = await newActor(browser);
    student = await newActor(browser);
  });

  test('setup over the API: users, roles, channel and two draft courses with ready videos', async ({
    request,
  }) => {
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    const instructorId = await registerApi(request, 'Iman Instructor', people.instructor);
    const reviewerId = await registerApi(request, 'Rami Reviewer', people.reviewer);
    studentId = await registerApi(request, 'Salma Student', people.student);
    await adminApi.put(`/api/admin/users/${instructorId}/roles`, { roles: ['Student', 'Instructor'] });
    await adminApi.put(`/api/admin/users/${reviewerId}/roles`, { roles: ['Student', 'Reviewer'] });
    const channel = await adminApi.post<{ id: string }>('/api/admin/youtube/channels', {
      channelId: `UC${`w2${run}`.padEnd(22, 'y').slice(0, 22)}`,
      title: `Mastemy Wave2 ${run}`,
      mode: 'MastemyManaged',
    });
    const { api: inst } = await signIn(request, people.instructor);
    const { api: reviewer } = await signIn(request, people.reviewer);
    const categories = await inst.get<{ id: number; slug: string }[]>('/api/categories');
    const categoryId = categories[0].id;

    const draft = async (title: string, suffix: string) => {
      const c = await inst.post<{ id: string; slug: string }>('/api/studio/courses', {
        title,
        subtitle: 'Wave 2 end-to-end course',
        description: 'A course used by the wave 2 end-to-end suite. Videos are free on YouTube.',
        audience: 'Analysts and managers',
        prerequisites: '',
        outcomes: ['Explain the principles', 'Apply the checklist', 'Report issues'],
        language: 'en',
        level: 'Beginner',
        categoryIds: [categoryId],
      });
      const m = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/modules`, {
        title: 'Foundations',
      });
      const l = await inst.post<{ id: string }>(`/api/studio/modules/${m.id}/lessons`, {
        title: `Why it matters ${suffix}`,
        objective: 'Understand the basics.',
        isPreview: true,
      });
      // Notes saves need the current notes ETag (optimistic concurrency, wave 3).
      const { eTag } = await inst.get<{ eTag: string }>(`/api/studio/lessons/${l.id}/notes`);
      await inst.call(
        'PUT',
        `/api/studio/lessons/${l.id}/notes`,
        {
          notesMarkdown: 'FREE-NOTES: start with the basics.',
          premiumNotesMarkdown: `PREMIUM-W2-${suffix}: the full checklist.`,
        },
        [200],
        { 'If-Match': eTag },
      );
      const video = await inst.post<{ id: string }>(`/api/studio/lessons/${l.id}/video`, {
        url: `https://youtu.be/${ytId(suffix)}`,
        channelId: channel.id,
        rightsDeclared: true,
        rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
        title: `Lesson video ${suffix} ${run}`,
        durationSeconds: 300,
      });
      await reviewer.post(`/api/admin/youtube/videos/${video.id}/confirm`, { approve: true });
      return { id: c.id, slug: c.slug, lessonId: l.id };
    };
    courseA = await draft(titleA, 'A');
    const b = await draft(titleB, 'B');
    courseB = { id: b.id, slug: b.slug };

    // Course A gets two active questions and a premium final exam that counts toward the certificate.
    const qIds: string[] = [];
    for (const [i, stem] of ['Which data may be shared freely?', 'Who owns a data decision?'].entries()) {
      const q = await inst.post<{ id: string }>(`/api/studio/courses/${courseA.id}/questions`, {
        externalId: `W2-${run}-${i}`,
        type: 'SingleChoice',
        language: 'en',
        stem,
        explanation: 'Covered in the lesson.',
        difficulty: 'Easy',
        tags: ['w2'],
        allowShuffle: true,
        options: [
          { text: `Correct answer ${i}`, isCorrect: true, rationale: 'Right.' },
          { text: `Wrong answer ${i}a`, isCorrect: false, rationale: 'No.' },
          { text: `Wrong answer ${i}b`, isCorrect: false, rationale: 'No.' },
        ],
      });
      await adminApi.post(`/api/studio/questions/${q.id}/state`, { state: 'Reviewed' });
      await reviewer.post(`/api/studio/questions/${q.id}/state`, { state: 'Approved' });
      await reviewer.post(`/api/studio/questions/${q.id}/state`, { state: 'Active' });
      qIds.push(q.id);
    }
    await inst.post(`/api/studio/courses/${courseA.id}/assessments`, {
      title: 'Wave 2 final exam',
      kind: 'FinalAssessment',
      mode: 'Exam',
      timeLimitMinutes: 10,
      maxAttempts: 3,
      passPercent: 75,
      multiSelectScoring: 'AllOrNothing',
      questionCount: 2,
      isPremium: true,
      countsTowardCertificate: true,
      questionIds: qIds,
    });

    // Course B is published straight away (it only needs to be comparable and related).
    await inst.post(`/api/studio/courses/${courseB.id}/submit`);
    await reviewer.post(`/api/review/courses/${courseB.id}/decision`, { decision: 'Approve' });
    await adminApi.post(`/api/admin/courses/${courseB.id}/publish`);
  });

  test('instructor uploads a premium PDF with progress; a video file is rejected with a YouTube hint', async () => {
    const page = instructor.page;
    await login(page, people.instructor);
    await page.goto(`/studio/courses/${courseA.id}?tab=resources`);
    await expect(page.getByRole('progressbar', { name: 'Storage used by this course' })).toBeVisible();
    await page.getByLabel('Lesson', { exact: true }).selectOption({ label: 'Foundations › Why it matters A' });
    const pdf = Buffer.from(
      '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n',
    );
    await page.getByLabel('File', { exact: true }).setInputFiles({
      name: 'premium-checklist.pdf',
      mimeType: 'application/pdf',
      buffer: pdf,
    });
    await page.getByLabel('Premium (study package holders only)').check();
    await page.getByRole('button', { name: 'Upload', exact: true }).click();
    await expect(page.getByText('premium-checklist.pdf uploaded.')).toBeVisible();
    const row = page.getByRole('row').filter({ hasText: 'premium-checklist.pdf' });
    await expect(row.getByRole('checkbox', { name: 'Premium' })).toBeChecked();

    // A free text resource for the same lesson.
    await page.getByLabel('File', { exact: true }).setInputFiles({
      name: 'free-glossary.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Glossary: data subject, controller, processor.\n'),
    });
    await page.getByLabel('Premium (study package holders only)').uncheck();
    await page.getByRole('button', { name: 'Upload', exact: true }).click();
    await expect(page.getByText('free-glossary.txt uploaded.')).toBeVisible();

    // Video content is refused by the API (415 video_not_allowed) and the UI points to YouTube.
    const mp4 = Buffer.concat([
      Buffer.from([0x00, 0x00, 0x00, 0x18]),
      Buffer.from('ftypmp42'),
      Buffer.alloc(32, 0),
    ]);
    await page.getByLabel('File', { exact: true }).setInputFiles({
      name: 'lecture.mp4',
      mimeType: 'video/mp4',
      buffer: mp4,
    });
    await page.getByRole('button', { name: 'Upload', exact: true }).click();
    await expect(page.getByText('Upload failed')).toBeVisible();
    await expect(
      page.getByText(/Video and audio files cannot be uploaded to Mastemy\. Upload the video to YouTube/),
    ).toBeVisible();
    await expect(page.getByRole('row').filter({ hasText: 'lecture.mp4' })).toHaveCount(0);
  });

  test('course A is submitted, approved and published; the reviewer diff and published preview render', async ({
    request,
  }) => {
    const { api: inst } = await signIn(request, people.instructor);
    const { api: reviewer } = await signIn(request, people.reviewer);
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    // Before the first publish the diff says everything is new.
    const page = instructor.page;
    await page.goto(`/studio/courses/${courseA.id}?tab=publication`);
    await expect(page.getByText('Never published: everything is new.')).toBeVisible();
    await expect(page.getByText('This course has not been published yet.')).toBeVisible();

    await inst.post(`/api/studio/courses/${courseA.id}/submit`);
    await reviewer.post(`/api/review/courses/${courseA.id}/decision`, { decision: 'Approve' });
    await adminApi.post(`/api/admin/courses/${courseA.id}/publish`);

    await page.reload();
    await expect(page.getByText(/^Version 1, published /)).toBeVisible();
    await expect(page.getByText('No changes compared with the published version.')).toBeVisible();
  });

  test('wishlist and compare: save a course, then compare two courses side by side', async () => {
    const page = student.page;
    await login(page, people.student);
    await page.goto(`/courses?q=${encodeURIComponent(run)}`);
    await page.getByRole('button', { name: `Save ${titleA} to your wishlist` }).click();
    await expect(page.getByText('Added to your wishlist.')).toBeVisible();
    await expect(
      page.getByRole('button', { name: `Remove ${titleA} from your wishlist` }),
    ).toHaveAttribute('aria-pressed', 'true');
    await page.goto('/me/wishlist');
    await expect(page.getByRole('heading', { name: titleA })).toBeVisible();

    await page.goto(`/courses?q=${encodeURIComponent(run)}`);
    await page.getByRole('button', { name: `Add ${titleA} to comparison` }).click();
    const tray = page.getByRole('complementary', { name: 'Courses selected for comparison' });
    await expect(tray.getByRole('button', { name: 'Compare now' })).toBeDisabled();
    await page.getByRole('button', { name: `Add ${titleB} to comparison` }).click();
    await tray.getByRole('button', { name: 'Compare now' }).click();
    await expect(page).toHaveURL(/\/compare\?ids=/);
    const table = page.getByRole('table');
    await expect(table.getByRole('columnheader', { name: titleA })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: titleB })).toBeVisible();
    await expect(table.getByRole('row', { name: 'Lessons 1 1', exact: true })).toBeVisible();

    // Course detail: related courses (shared category) and a recorded view for the home rail.
    await page.goto(`/courses/${courseA.slug}`);
    await expect(page.getByRole('heading', { name: 'Related courses' })).toBeVisible();
    await expect(page.getByRole('heading', { name: titleB })).toBeVisible();
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Recently viewed' })).toBeVisible();
  });

  test('enrolled student asks a question, the instructor replies, the student is notified', async () => {
    const page = student.page;
    const q = `How strict is the sharing rule ${run}?`;
    await page.goto(`/learn/${courseA.slug}/${courseA.lessonId}`);
    await page.getByRole('tab', { name: 'Q&A' }).click();
    // Not enrolled yet: posting is explained, not offered.
    await expect(page.getByText(/Enroll in this course \(free\) to ask questions/)).toBeVisible();
    await page.getByRole('tabpanel').getByRole('button', { name: 'Enroll for free' }).click();
    await page.getByLabel(label('Title')).fill(q);
    await page.getByLabel(label('Details')).fill('Does it apply to anonymised exports too?');
    await page.getByRole('button', { name: 'Post question' }).click();
    await expect(page.getByText('Question posted.')).toBeVisible();
    await expect(page.getByRole('link', { name: q })).toBeVisible();

    const ip = instructor.page;
    await ip.goto(`/studio/courses/${courseA.id}?tab=engagement`);
    await expect(ip.getByRole('heading', { name: 'Q&A inbox' })).toBeVisible();
    await ip.getByRole('link', { name: q }).click();
    await expect(ip.getByRole('heading', { name: q, level: 1 })).toBeVisible();
    await ip.getByLabel('Your reply').fill('Yes: anonymised exports follow the same rule.');
    await ip.getByRole('button', { name: 'Post reply' }).click();
    await expect(ip.getByText('Reply posted.')).toBeVisible();
    await expect(ip.locator('.reply--instructor')).toContainText('Instructor');
    await ip.getByRole('button', { name: 'Mark resolved' }).click();
    await expect(ip.getByText('Marked as resolved.')).toBeVisible();

    await page.goto('/me');
    const bell = page.getByRole('button', { name: /^Notifications, \d+ unread$/ });
    await expect(bell).toBeVisible();
    await bell.click();
    await page.getByRole('button', { name: new RegExp(`The instructor replied to: ${q}`) }).click();
    await expect(page.getByRole('heading', { name: q, level: 1 })).toBeVisible();
    await expect(page.getByText('Yes: anonymised exports follow the same rule.')).toBeVisible();
    await expect(page.getByText('Resolved', { exact: true }).first()).toBeVisible();
  });

  test('an announcement reaches enrolled learners as a notification', async () => {
    const ip = instructor.page;
    const title = `Live Q&A session ${run}`;
    await ip.goto(`/studio/courses/${courseA.id}?tab=engagement`);
    await ip.getByLabel(label('Title')).first().fill(title);
    await ip.getByLabel(label('Message')).fill('Join us on Thursday for a live session.');
    await ip.getByRole('button', { name: 'Send announcement' }).click();
    await expect(ip.getByText('Announcement sent to 1 learners.')).toBeVisible();

    const page = student.page;
    await page.goto('/me/notifications');
    const link = page.getByRole('link', { name: `${titleA}: ${title}` });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/courses/${courseA.slug}/announcements$`));
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
  });

  test('premium resource and notes are locked for the student without a study package', async () => {
    const page = student.page;
    await page.goto(`/learn/${courseA.slug}/${courseA.lessonId}`);
    await page.getByRole('tab', { name: 'Resources' }).click();
    const premium = page.getByRole('listitem').filter({ hasText: 'premium-checklist.pdf' });
    await expect(premium).toContainText('Part of a study package');
    await expect(premium.getByRole('button', { name: /Download/ })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'See study packages' })).toBeVisible();
    const free = page.getByRole('listitem').filter({ hasText: 'free-glossary.txt' });
    const download = page.waitForEvent('download');
    await free.getByRole('button', { name: 'Download free-glossary.txt' }).click();
    expect((await download).suggestedFilename()).toBe('free-glossary.txt');
    await page.getByRole('tab', { name: 'Premium notes' }).click();
    await expect(page.getByText('Premium notes are part of a study package')).toBeVisible();
  });

  test('staff create an organization; the student is added and assigned course A with premium', async () => {
    const page = admin.page;
    await login(page, ADMIN.email, ADMIN.password);
    await page.goto('/admin/orgs');
    await page.getByLabel(label('Name')).fill(`Acme Health ${run}`);
    await page.getByLabel(label('Slug')).fill(`acme-${run}`);
    await page.getByLabel(label('Seats')).fill('5');
    await page.getByRole('button', { name: 'Create organization' }).click();
    await expect(page.getByText(`Acme Health ${run} created.`)).toBeVisible();
    await page.getByRole('link', { name: `Acme Health ${run}` }).click();
    await expect(page).toHaveURL(/\/orgs\/[0-9a-f-]{36}$/);
    orgId = page.url().split('/').pop()!;

    // Membership is by invitation: without SMTP the link is shown for sharing.
    await page.getByLabel(label('Email')).fill(people.student);
    await page.getByLabel('Department', { exact: true }).first().fill('Compliance');
    await page.getByRole('button', { name: 'Create invitation' }).click();
    await expect(page.getByText('Invitation created.')).toBeVisible();
    const linkBox = page.getByLabel(`Invitation link for ${people.student}`);
    await expect(linkBox).toBeVisible();
    const link = new URL(await linkBox.inputValue());
    expect(link.pathname).toBe('/org-invitations/accept');
    await expect(
      page.getByRole('listitem').filter({ hasText: people.student }).getByRole('button', {
        name: `Revoke the invitation for ${people.student}`,
      }),
    ).toBeVisible();

    const sp = student.page;
    await sp.goto(link.pathname + link.search);
    await sp.getByRole('button', { name: 'Accept invitation' }).click();
    await expect(sp.getByText(`You joined Acme Health ${run}.`)).toBeVisible();

    await page.reload();
    const memberRow = page.getByRole('row').filter({ hasText: people.student });
    await expect(memberRow).toBeVisible();
    await expect(memberRow.getByLabel('Department for Salma Student')).toHaveValue('Compliance');

    // Bulk preview: an invalid address blocks the commit.
    await page.getByLabel('Emails').fill(`email\nnot-an-email\nok.${run}@e2e.mastemy.test\n`);
    await page.getByRole('button', { name: 'Preview' }).click();
    await expect(page.getByText('1 with errors')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Invite \d+ people$/ })).toBeDisabled();

    await page.getByRole('tab', { name: 'Assignments' }).click();
    await page.getByLabel('Find a published course').fill(titleA);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByLabel(label('Course')).selectOption({ label: titleA });
    await page.getByLabel('Assign to').selectOption({ label: 'One member' });
    await page.getByLabel(label('Member')).selectOption({ label: `Salma Student (${people.student})` });
    const due = new Date(Date.now() + 14 * 86400_000).toISOString().slice(0, 10);
    await page.getByLabel('Due date').fill(due);
    await page.getByLabel(/Include the study package/).check();
    await page.getByRole('button', { name: 'Assign course' }).click();
    await expect(page.getByText('Course assigned.')).toBeVisible();
    await expect(page.getByRole('row').filter({ hasText: titleA })).toContainText('Yes');
  });

  test('the assignment unlocks premium notes and resources for the member', async () => {
    const page = student.page;
    await page.goto('/me');
    const assigned = page.getByRole('region', { name: 'Assigned by your organization' });
    await expect(assigned).toContainText(titleA);
    await expect(assigned).toContainText('Study package included');
    await page.goto(`/learn/${courseA.slug}/${courseA.lessonId}`);
    await page.getByRole('tab', { name: 'Premium notes' }).click();
    await expect(page.getByText('PREMIUM-W2-A: the full checklist.')).toBeVisible();
    await page.getByRole('tab', { name: 'Resources' }).click();
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download premium-checklist.pdf' }).click();
    const file = await download;
    expect(file.suggestedFilename()).toBe('premium-checklist.pdf');
    const bytes = await readFile((await file.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
  });

  test('the student passes the premium exam; the certificate PDF downloads and visibility toggles', async ({
    request,
  }) => {
    const { api } = await signIn(request, people.student);
    await api.put(`/api/learn/lessons/${courseA.lessonId}/progress`, {
      positionSeconds: 300,
      completed: true,
    });
    const lesson = await api.get<{ assessments: { id: string; title: string }[] }>(
      `/api/learn/lessons/${courseA.lessonId}`,
    );
    const exam = lesson.assessments.find((a) => a.title === 'Wave 2 final exam')!;
    const attempt = await api.post<{
      id: string;
      items: { itemId: string; options: { id: string; text: string }[] }[];
    }>(`/api/assessments/${exam.id}/attempts`);
    for (const item of attempt.items) {
      const right = item.options.find((o) => o.text.startsWith('Correct answer'))!;
      await api.put(`/api/attempts/${attempt.id}/items/${item.itemId}`, {
        selectedOptionIds: [right.id],
        flagged: false,
      });
    }
    await api.post(`/api/attempts/${attempt.id}/submit`);

    const page = student.page;
    await page.goto('/me');
    const certs = page.locator('section.card').filter({ has: page.getByRole('heading', { name: 'Certificates' }) });
    const item = certs.getByRole('listitem').filter({ hasText: titleA });
    await expect(item).toBeVisible();
    certificateCode = (await item.getByRole('link').first().textContent())!.trim();
    const download = page.waitForEvent('download');
    await item.getByRole('button', { name: 'Download PDF' }).click();
    const file = await download;
    expect(file.suggestedFilename()).toBe(`mastemy-certificate-${certificateCode}.pdf`);
    const bytes = await readFile((await file.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');

    // Publicly visible by default: anyone gets application/pdf.
    const anon = await request.get(`${API}/api/certificates/${certificateCode}/pdf`);
    expect(anon.status()).toBe(200);
    expect(anon.headers()['content-type']).toContain('application/pdf');

    // Private: hidden from others, still available to the owner.
    await item.getByLabel('Publicly verifiable').uncheck();
    await expect(page.getByText('Certificate is now private.')).toBeVisible();
    expect((await request.get(`${API}/api/certificates/${certificateCode}/pdf`)).status()).toBe(404);
    const own = await request.get(`${API}/api/certificates/${certificateCode}/pdf`, {
      headers: { Authorization: `Bearer ${api.token}` },
    });
    expect(own.headers()['content-type']).toContain('application/pdf');
    await item.getByLabel('Publicly verifiable').check();
    await expect(page.getByText('Certificate is now publicly verifiable.')).toBeVisible();
  });

  test('the organization progress report shows the member progress and offers a CSV', async () => {
    const page = admin.page;
    await page.goto(`/orgs/${orgId}?tab=report`);
    const row = page.getByRole('row').filter({ hasText: people.student });
    await expect(row).toContainText(titleA);
    await expect(row).toContainText('1/1 lessons (100%)');
    await expect(row).toContainText('100%');
    await expect(row).toContainText('Passed');
    await expect(row).toContainText('Compliance');
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download CSV' }).click();
    const file = await download;
    expect(file.suggestedFilename()).toBe(`acme-${run}-progress.csv`);
    const csv = await readFile((await file.path())!, 'utf8');
    expect(csv).toContain(people.student);
  });
});

