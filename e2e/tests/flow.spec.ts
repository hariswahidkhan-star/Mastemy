import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Actor } from './helpers';
import {
  ADMIN,
  API,
  FAKE_STRIPE,
  email,
  grantRoles,
  label,
  login,
  newActor,
  registerUser,
  run,
  signedCheckoutCompleted,
} from './helpers';

/**
 * Spec §22 required end-to-end flow, driven through the real UI against the real API + MySQL.
 * Steps share state and run in order; each actor has its own browser context.
 */
test.describe.serial('author → publish → learn → assess → refund → statement', () => {
  let admin: Actor;
  let instructor: Actor;
  let reviewer1: Actor;
  let reviewer2: Actor;
  let finance: Actor;
  let student: Actor;
  let certificateCode = '';
  let inviteCode = '';
  let courseUrl = '';
  let courseSlug = '';
  let courseTitle = '';
  let lessonUrl = '';
  const channelId = `UC${run.padEnd(22, 'x').slice(0, 22)}`;
  const people = {
    instructor: email('instructor'),
    reviewer1: email('reviewer1'),
    reviewer2: email('reviewer2'),
    finance: email('finance'),
    student: email('student'),
  };

  /** Lesson page path; the lesson id comes from the studio URL captured while authoring. */
  const lessonUrlFor = (slug: string) => `/learn/${slug}/${lessonUrl.split('/').pop()}`;

  test.beforeAll(async ({ browser }) => {
    admin = await newActor(browser);
    instructor = await newActor(browser);
    reviewer1 = await newActor(browser);
    reviewer2 = await newActor(browser);
    finance = await newActor(browser);
    student = await newActor(browser);
  });

  test('admin registers a YouTube channel and invites an instructor', async () => {
    const page = admin.page;
    await login(page, ADMIN.email, ADMIN.password);

    // Platform settings are visible and editable by the SuperAdmin; defaults keep onboarding invite-only.
    await page.goto('/admin/settings');
    await expect(
      page.getByRole('heading', { name: 'InstructorApplicationsInviteOnly' }),
    ).toBeVisible();

    await page.goto('/admin/videos');
    await page.getByLabel('YouTube channel id').fill(channelId);
    await page.getByLabel('Channel name').fill(`Mastemy Academy ${run}`);
    await page.getByRole('button', { name: 'Add channel' }).click();
    await expect(page.getByText('Channel registered')).toBeVisible();
    await expect(page.getByText(channelId)).toBeVisible();

    await page.goto('/admin/applications');
    await page.getByLabel('Email').fill(people.instructor);
    await page.getByRole('button', { name: 'Create invitation' }).click();
    const code = page
      .locator('.mono')
      .filter({ hasText: /\S{10,}/ })
      .first();
    await expect(code).toBeVisible();
    inviteCode = (await code.textContent())!.trim();
    expect(inviteCode.length).toBeGreaterThan(10);
  });

  test('staff accounts get roles through the admin UI', async () => {
    await registerUser(reviewer1.page, 'Rania Reviewer', people.reviewer1);
    await registerUser(reviewer2.page, 'Omar Reviewer', people.reviewer2);
    await registerUser(finance.page, 'Fatima Finance', people.finance);
    await grantRoles(admin.page, people.reviewer1, ['Reviewer']);
    await grantRoles(admin.page, people.reviewer2, ['Reviewer']);
    await grantRoles(admin.page, people.finance, ['Finance']);
    // Roles are read from the server on next sign-in.
    await login(reviewer1.page, people.reviewer1);
    await login(reviewer2.page, people.reviewer2);
    await login(finance.page, people.finance);
  });

  test('instructor applies with the invitation and a reviewer approves', async () => {
    const page = instructor.page;
    await registerUser(page, 'Ibrahim Instructor', people.instructor);
    await page.goto('/teach');
    await expect(page.getByText('Invitation required')).toBeVisible();
    await page
      .getByLabel('Professional headline')
      .fill('Data protection lead with 12 years of practice');
    await page
      .getByLabel('Biography')
      .fill(
        'I have led privacy and AI governance programmes for banks and hospitals and teach practitioners how to apply policy safely.',
      );
    await page
      .getByLabel('Expertise evidence')
      .fill(
        'CIPP/E certified; published guidance for regional regulators; 40 workshops delivered.',
      );
    await page.getByLabel('Test video link').fill('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    await page.getByLabel('Invitation code').fill(inviteCode);
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Submit application' }).click();
    await expect(page.getByRole('heading', { name: 'Your application' })).toBeVisible();

    const r = reviewer1.page;
    await r.goto('/admin/applications');
    const item = r.getByRole('listitem').filter({ hasText: 'Ibrahim Instructor' });
    await item.getByRole('button', { name: 'Open' }).click();
    await r.getByRole('dialog').getByRole('button', { name: 'Record decision' }).click();
    await expect(r.getByText('Decision recorded.')).toBeVisible();
    await expect(item).toHaveCount(0);

    // New role is picked up on next sign-in.
    await login(page, people.instructor);
    await page.goto('/teach');
    await expect(page.getByRole('link', { name: 'Instructor studio' }).first()).toBeVisible();
  });

  test('instructor drafts a course with a module, lesson, free + premium notes and a manually linked video', async () => {
    const page = instructor.page;
    courseTitle = `Responsible AI at Work ${run}`;
    await page.goto('/studio/new');
    await page
      .getByLabel('Course goals')
      .fill('Help office workers use AI assistants without leaking data or publishing errors.');
    await page
      .getByLabel('Who this course is for')
      .fill('Analysts, managers and assistants who use AI chat tools in their daily work.');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Category').selectOption({ label: 'Technology & Programming' });
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel(label('Course')).fill(courseTitle);
    await page.getByLabel('Subtitle').fill('Privacy, verification and policy for everyday AI use');
    await page
      .getByLabel('Description')
      .fill(
        'A practical course on using AI assistants responsibly: what data may be shared, how to verify output and how to follow policy. Videos are free on YouTube.',
      );
    await page.getByRole('button', { name: 'Continue' }).click();
    await page
      .getByLabel('What you will learn')
      .fill(
        'Classify data before sharing it\nVerify AI output against sources\nApply your AI usage policy',
      );
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Create draft course' }).click();
    await expect(page).toHaveURL(/\/studio\/courses\/[0-9a-f-]{36}$/);
    courseUrl = page.url();
    await expect(page.getByRole('heading', { name: courseTitle })).toBeVisible();

    await page.getByRole('tab', { name: 'Curriculum' }).click();
    await page.getByLabel('New module title').fill('Data and privacy');
    await page.getByRole('button', { name: 'Add module' }).click();
    await expect(page.getByRole('heading', { name: '1. Data and privacy' })).toBeVisible();
    await page.getByRole('button', { name: 'Add lesson' }).click();
    const dlg = page.getByRole('dialog');
    await dlg.getByLabel('Lesson title').fill('What you may paste into a chatbot');
    await dlg
      .getByLabel('Lesson objective')
      .fill('Decide whether data may be shared with an AI tool.');
    await dlg.getByRole('button', { name: 'Add lesson' }).click();
    await page.getByRole('link', { name: 'What you may paste into a chatbot' }).click();
    await expect(page).toHaveURL(/\/lessons\/[0-9a-f-]{36}$/);
    lessonUrl = page.url();

    await page.getByRole('tab', { name: 'Notes' }).click();
    await page
      .getByRole('textbox', { name: 'Study notes' })
      .fill('## Free notes\nCheck the **data class** before pasting anything.');
    await page
      .getByRole('textbox', { name: 'Premium notes' })
      .fill('## Premium checklist\nPREMIUM-SECRET: the five-question data sharing checklist.');
    await page.getByRole('button', { name: 'Save notes' }).click();
    await expect(page.getByText('Notes saved.')).toBeVisible();

    // No YouTube Data API key and no route to youtube.com: the manual metadata path must work offline.
    await page.getByRole('tab', { name: 'YouTube link' }).click();
    await page.getByLabel('YouTube link or video ID').fill('https://youtu.be/dQw4w9WgXcQ');
    await page
      .getByLabel('YouTube channel')
      .selectOption({ label: `Mastemy Academy ${run} (Mastemy channel)` });
    await page.getByRole('checkbox', { name: /I confirm I own/ }).check();
    // Without metadata the API explains that title and duration must be entered manually.
    await page.getByRole('button', { name: 'Link video' }).click();
    await expect(page.getByText(/title and duration manually/)).toBeVisible();
    await page.getByText('Enter title and duration manually').click();
    await page.getByLabel(label('Title')).fill(`Chatbot data rules ${run}`);
    await page.getByLabel('Duration (minutes)').fill('6.5');
    await page.getByRole('button', { name: 'Link video' }).click();
    await expect(page.getByText(/Video linked\. Status: /)).toBeVisible();
    await expect(page.getByText(/Metadata entered manually/)).toBeVisible();
  });

  test('a reviewer confirms the manually linked video (no API key available)', async () => {
    const r = reviewer1.page;
    await r.goto('/admin/videos');
    await r.getByLabel('Status').selectOption({ label: 'In content review' });
    const row = r.getByRole('row').filter({ hasText: `Chatbot data rules ${run}` });
    await row.getByRole('button', { name: /^Confirm .* is public or unlisted/ }).click();
    await expect(r.getByText('Video linked. Status: Ready.')).toBeVisible();

    await instructor.page.goto(lessonUrl);
    await instructor.page.getByRole('tab', { name: 'YouTube link' }).click();
    await expect(instructor.page.getByText('Ready', { exact: true }).first()).toBeVisible();
  });

  test('instructor bulk-imports MCQs from the CSV template', async () => {
    const page = instructor.page;
    await page.goto(courseUrl + '?tab=import');
    const codeBox = page.getByText(/^CourseCode: /);
    await expect(codeBox).toBeVisible();
    const courseCode = (await codeBox.locator('.mono').textContent())!.trim();
    const csv = readFileSync(
      path.resolve(import.meta.dirname, '..', 'fixtures', 'mcq-import.csv'),
      'utf8',
    ).replaceAll('__COURSE_CODE__', courseCode);
    await page
      .getByLabel('Import file')
      .setInputFiles({ name: 'mcq.csv', mimeType: 'text/csv', buffer: Buffer.from(csv) });
    await page.getByRole('button', { name: 'Upload and preview' }).click();
    await expect(page.getByText('4 valid')).toBeVisible();
    await page.getByRole('button', { name: 'Import 4 questions' }).click();
    await expect(page.getByText('4 questions imported as drafts.')).toBeVisible();

    await page.getByRole('tab', { name: 'Question bank' }).click();
    await expect(page.getByRole('row')).toHaveCount(5);
    // Authors cannot review their own questions: no reviewer actions are offered.
    await expect(page.getByRole('button', { name: 'Mark reviewed' })).toHaveCount(0);
  });

  test('two different reviewers promote every question to Active', async () => {
    const openCourse = async (p: typeof reviewer1.page) => {
      await p.goto('/admin');
      await p.getByLabel('Status').selectOption({ label: 'Draft' });
      await p
        .getByRole('row')
        .filter({ hasText: courseTitle })
        .getByRole('button', { name: 'Open' })
        .click();
    };
    const advanceAll = async (p: typeof reviewer1.page, button: string) => {
      for (let i = 0; i < 4; i++) {
        await p.getByRole('button', { name: button }).first().click();
        await expect(p.getByRole('button', { name: button })).toHaveCount(3 - i);
      }
    };
    await openCourse(reviewer1.page);
    await advanceAll(reviewer1.page, 'Mark reviewed');
    // The same reviewer may not approve what they reviewed.
    await reviewer1.page.getByRole('button', { name: 'Approve' }).first().click();
    await expect(reviewer1.page.getByText(/different person than the reviewer/)).toBeVisible();

    await openCourse(reviewer2.page);
    await advanceAll(reviewer2.page, 'Approve');
    await advanceAll(reviewer2.page, 'Activate');
    await expect(reviewer2.page.getByText('Active', { exact: true })).toHaveCount(4);
  });

  test('instructor creates a timed exam that counts toward the certificate and proposes a package', async () => {
    const page = instructor.page;
    await page.goto(courseUrl + '?tab=assessments');
    await page.getByRole('button', { name: 'New assessment' }).click();
    const d = page.getByRole('dialog');
    await d.getByLabel(label('Title')).fill('Responsible AI certificate exam');
    await d.getByLabel('Kind').selectOption({ label: 'Final assessment' });
    await d.getByLabel('Mode').selectOption({ label: 'Exam' });
    await d.getByLabel('Time limit (minutes)').fill('10');
    await d.getByLabel('Maximum attempts').fill('3');
    await d.getByLabel('Pass mark (%)').fill('75');
    await d.getByLabel('Questions per attempt').fill('4');
    await d.getByLabel('Part of a study package').check();
    await d.getByLabel('Counts toward the course certificate').check();
    for (const id of ['E2E-0001', 'E2E-0002', 'E2E-0003', 'E2E-0004'])
      await d.getByRole('checkbox', { name: new RegExp(id) }).check();
    await d.getByRole('button', { name: 'Save' }).click();
    await expect(
      page.getByRole('row').filter({ hasText: 'Responsible AI certificate exam' }),
    ).toBeVisible();

    await page.getByRole('tab', { name: 'Packages' }).click();
    await page.getByLabel('Package name').fill('Exam prep pack');
    await page
      .getByLabel('Included services')
      .fill('Premium lesson notes and checklists\nTimed certificate exam with explanations');
    await page.getByLabel(label('Price')).fill('49.00');
    await page.getByLabel('Access period (days)').fill('180');
    await page.getByRole('button', { name: 'Submit proposal' }).click();
    await expect(
      page.getByText('Package proposed. An administrator will review it.'),
    ).toBeVisible();
  });

  test('instructor submits, a reviewer approves, admin publishes and approves the package', async () => {
    const page = instructor.page;
    await page.goto(courseUrl + '?tab=review');
    await expect(page.getByText('All publication checks pass.')).toBeVisible();
    await page.getByRole('button', { name: 'Submit for review' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Course submitted for review.')).toBeVisible();

    const r = reviewer1.page;
    await r.goto('/admin');
    await r
      .getByRole('row')
      .filter({ hasText: courseTitle })
      .getByRole('button', { name: 'Open' })
      .click();
    await r.getByRole('button', { name: 'Approve', exact: true }).click();
    await r.getByRole('dialog').getByRole('button', { name: 'Record decision' }).click();
    await expect(r.getByText('Decision recorded.')).toBeVisible();

    const a = admin.page;
    await a.goto('/admin');
    await a.getByLabel('Status').selectOption({ label: 'Approved' });
    await a
      .getByRole('row')
      .filter({ hasText: courseTitle })
      .getByRole('button', { name: 'Open' })
      .click();
    await a.getByRole('button', { name: 'Publish' }).click();
    await a.getByRole('dialog').getByRole('button', { name: 'Publish' }).click();
    await expect(a.getByText('Course published.')).toBeVisible();

    await a.goto('/admin/packages');
    const pkg = a
      .getByRole('listitem')
      .filter({ hasText: 'Exam prep pack' })
      .filter({ hasText: courseTitle });
    await pkg.getByRole('button', { name: 'Approve' }).click();
    await a.getByRole('dialog').getByRole('button', { name: 'Record decision' }).click();
    await expect(a.getByText('Decision recorded.')).toBeVisible();

    await page.goto(courseUrl);
    await expect(page.getByText('Published', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'View public page' })).toBeVisible();
    courseSlug = (await page.getByRole('link', { name: 'View public page' }).getAttribute('href'))!
      .split('/')
      .pop()!;
  });

  test('anonymous visitor sees the published course, the free-video notice and the YouTube player', async ({
    browser,
  }) => {
    const { page, context } = await newActor(browser);
    await page.goto('/courses');
    const card = page.getByRole('link').filter({ hasText: courseTitle }).first();
    await expect(card).toContainText('Ibrahim Instructor');
    await page.goto(`/courses/${courseSlug}`);
    await expect(page.getByRole('heading', { name: courseTitle, level: 1 })).toBeVisible();
    await expect(
      page
        .getByText(
          'All video lessons are free to watch on YouTube; paid packages cover Mastemy study services only.',
        )
        .first(),
    ).toBeVisible();
    await expect(page.getByText('Exam prep pack')).toBeVisible();

    await page.getByRole('link', { name: 'What you may paste into a chatbot' }).first().click();
    await expect(page).toHaveURL(new RegExp(`/learn/${courseSlug}/[0-9a-f-]{36}$`));
    // The player is the official YouTube embed. youtube.com may be unreachable from the test machine,
    // so assert the iframe and its host rather than playback.
    const frame = page.locator('iframe[src*="youtube"]');
    await expect(frame).toHaveCount(1);
    const src = new URL((await frame.getAttribute('src'))!);
    expect(['www.youtube-nocookie.com', 'www.youtube.com']).toContain(src.host);
    expect(src.pathname).toBe('/embed/dQw4w9WgXcQ');
    // Free notes are public; premium notes are locked for visitors.
    await page.getByRole('tab', { name: 'Study notes' }).click();
    await expect(page.getByText('Check the data class before pasting anything.')).toBeVisible();
    await page.getByRole('tab', { name: 'Premium notes' }).click();
    await expect(page.getByText('Premium notes are part of a study package')).toBeVisible();
    await expect(page.getByText('PREMIUM-SECRET')).toHaveCount(0);
    await context.close();
  });

  test('negative checks: draft course is 404 publicly, /admin is guarded, Arabic switches to RTL', async ({
    browser,
  }) => {
    // A second, never-submitted draft.
    const page = instructor.page;
    await page.goto('/studio/new');
    await page
      .getByLabel('Course goals')
      .fill('A draft that must never be visible to the public catalogue.');
    await page
      .getByLabel('Who this course is for')
      .fill('Nobody yet: this draft exists only for a negative test.');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Category').selectOption({ label: 'Technology & Programming' });
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel(label('Course')).fill(`Hidden Draft ${run}`);
    await page
      .getByLabel('Description')
      .fill(
        'This draft course is used to prove that unpublished courses return not found on public pages and APIs.',
      );
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('What you will learn').fill('One\nTwo\nThree');
    await page.getByRole('button', { name: 'Continue' }).click();
    const created = page.waitForResponse(
      (r) => r.url().endsWith('/api/studio/courses') && r.request().method() === 'POST',
    );
    await page.getByRole('button', { name: 'Create draft course' }).click();
    const draft = (await (await created).json()) as { slug: string };

    const { page: anon, context } = await newActor(browser);
    const api = await anon.request.get(`/api/courses/${draft.slug}`);
    expect(api.status()).toBe(404);
    await anon.goto(`/courses/${draft.slug}`);
    await expect(anon.getByText('Course not found')).toBeVisible();
    expect((await anon.request.get(`/api/learn/courses/${draft.slug}`)).status()).toBe(404);

    await anon.goto('/admin');
    await expect(anon).toHaveURL(/\/login\?next=%2Fadmin$/);
    // A signed-in non-staff user is refused (and the API refuses too).
    await instructor.page.goto('/admin/refunds');
    await expect(instructor.page.getByText('Access restricted')).toBeVisible();

    await anon.goto('/');
    await expect(anon.locator('html')).toHaveAttribute('dir', 'ltr');
    await anon.getByRole('button', { name: 'Switch language to Arabic' }).click();
    await expect(anon.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(anon.locator('html')).toHaveAttribute('lang', 'ar');
    await context.close();
  });

  test('student buys the package through Stripe Checkout and a signed webhook unlocks premium notes', async ({
    request,
  }) => {
    const page = student.page;
    await registerUser(page, 'Sara Student', people.student);
    await page.goto(`/courses/${courseSlug}`);
    await page.getByRole('button', { name: 'Buy package' }).click();
    // The checkout page shows the server quote (coupon/region/gift options) before handing over to Stripe.
    await expect(page.getByTestId('quote')).toContainText('$49.00');
    await page.getByRole('button', { name: 'Continue to payment' }).click();
    // Fake Stripe hands back a Checkout URL that returns to the success page; nothing is paid yet.
    await expect(page).toHaveURL(/\/me\?checkout=success/);
    await expect(page.getByText('Payment submitted')).toBeVisible();

    await page.goto(lessonUrlFor(courseSlug));
    await page.getByRole('tab', { name: 'Premium notes' }).click();
    await expect(page.getByText('Premium notes are part of a study package')).toBeVisible();

    const sessions = (await (
      await request.get(`${FAKE_STRIPE}/__test/sessions`)
    ).json()) as Parameters<typeof signedCheckoutCompleted>[0][] & { customer_email: string }[];
    const session = sessions.filter((x) => x.customer_email === people.student).pop()!;
    expect(session.amount_total).toBe(4900);

    // A forged signature is rejected and changes nothing.
    const forged = await request.post(`${API}/api/webhooks/stripe`, {
      headers: { 'Stripe-Signature': 't=1,v1=deadbeef', 'Content-Type': 'application/json' },
      data: signedCheckoutCompleted(session).body,
    });
    expect(forged.ok()).toBeFalsy();

    const { body, header } = signedCheckoutCompleted(session);
    const res = await request.post(`${API}/api/webhooks/stripe`, {
      headers: { 'Stripe-Signature': header, 'Content-Type': 'application/json' },
      data: body,
    });
    expect(res.status()).toBe(200);
    expect(((await res.json()) as { status: string }).status).toBe('paid');
    // Replaying the same event is idempotent.
    const again = await request.post(`${API}/api/webhooks/stripe`, {
      headers: { 'Stripe-Signature': header, 'Content-Type': 'application/json' },
      data: body,
    });
    expect(((await again.json()) as { status: string }).status).toBe('duplicate');

    await page.goto('/me');
    await expect(page.getByText('Exam prep pack').first()).toBeVisible();
    await page.goto(lessonUrlFor(courseSlug));
    await page.getByRole('tab', { name: 'Premium notes' }).click();
    await expect(
      page.getByText('PREMIUM-SECRET: the five-question data sharing checklist.'),
    ).toBeVisible();
  });

  test('student takes the timed exam, passes and receives a verifiable certificate', async ({
    browser,
  }) => {
    const page = student.page;
    await page.goto(lessonUrlFor(courseSlug));
    await page.getByRole('tab', { name: 'Practice' }).click();
    const card = page.getByRole('listitem').filter({ hasText: 'Responsible AI certificate exam' });
    await expect(card).toContainText('Time limit: 10 minutes.');
    await card.getByRole('button', { name: 'Start' }).click();
    await expect(page).toHaveURL(/\/attempts\/[0-9a-f-]{36}$/);
    await expect(page.getByText('Time remaining')).toBeVisible();

    const key: [RegExp, string[]][] = [
      [
        /A colleague wants to paste/,
        ["Check the organization's AI usage policy and use an approved tool or anonymized data"],
      ],
      [
        /Which TWO actions/,
        [
          'Trace the figure to a primary source',
          'Cross-check against an independent reputable source',
        ],
      ],
      [
        /Which data class may normally/,
        ['Public information already published by the organization'],
      ],
      [
        /An AI assistant cites a regulation/,
        ['Treat the citation as unverified and check the official text'],
      ],
    ];
    for (let i = 0; i < 4; i++) {
      await expect(page.getByRole('heading', { name: `Question ${i + 1} of 4` })).toBeVisible();
      const stem = (await page.locator('fieldset legend').innerText()).trim();
      const answers = key.find(([re]) => re.test(stem))?.[1];
      expect(answers, `answer key for: ${stem}`).toBeTruthy();
      for (const a of answers!) await page.getByLabel(a, { exact: true }).check();
      await expect(page.getByText('All answers saved.')).toBeVisible();
      if (i < 3) await page.getByRole('button', { name: 'Next' }).click();
    }
    await page.getByRole('button', { name: 'Submit assessment' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Submit assessment' }).click();
    await expect(page.locator('.score')).toHaveText('100%');
    await expect(page.getByText('Passed', { exact: true })).toBeVisible();
    await expect(page.getByText('Certificate issued')).toBeVisible();
    const link = page.getByRole('link', { name: 'View and verify your certificate' });
    certificateCode = decodeURIComponent((await link.getAttribute('href'))!.split('/').pop()!);

    // Anyone can verify it on the public page.
    const { page: anon, context } = await newActor(browser);
    await anon.goto('/verify');
    await anon.getByLabel('Certificate code').fill(certificateCode);
    await anon.getByRole('button', { name: 'Verify' }).click();
    await expect(anon.getByText('Valid certificate')).toBeVisible();
    await expect(anon.getByText('Sara Student')).toBeVisible();
    await expect(anon.getByText(courseTitle)).toBeVisible();
    await context.close();
  });

  test('student requests a refund, finance approves, premium notes lock again but the video stays', async () => {
    const page = student.page;
    await page.goto('/me');
    const order = page.getByRole('row').filter({ hasText: 'Exam prep pack' });
    await order.getByRole('button', { name: 'Request refund' }).click();
    await page
      .getByRole('dialog')
      .getByLabel('Reason')
      .fill('Bought the wrong package for my team.');
    await page.getByRole('dialog').getByRole('button', { name: 'Send request' }).click();
    await expect(page.getByText('Refund requested. Finance will review it.')).toBeVisible();

    const f = finance.page;
    await f.goto('/admin/refunds');
    const row = f.getByRole('row').filter({ hasText: 'Bought the wrong package for my team.' });
    await row.getByRole('button', { name: 'Approve' }).click();
    await f.getByRole('alertdialog').getByRole('button', { name: 'Record decision' }).click();
    await expect(f.getByText('Decision recorded.')).toBeVisible();
    await expect(row).toContainText('Completed');

    await page.goto(lessonUrlFor(courseSlug));
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(1);
    await page.getByRole('tab', { name: 'Premium notes' }).click();
    await expect(page.getByText('Premium notes are part of a study package')).toBeVisible();
    await expect(page.getByText('PREMIUM-SECRET')).toHaveCount(0);
    await page.getByRole('tab', { name: 'Study notes' }).click();
    await expect(page.getByText('Check the data class before pasting anything.')).toBeVisible();

    // The certificate depended on the refunded premium exam, so it is revoked.
    await page.goto(`/verify/${encodeURIComponent(certificateCode)}`);
    await expect(page.getByText('Revoked certificate')).toBeVisible();
  });

  test('instructor earnings show the sale and the refund reversal in the ledger', async () => {
    const page = instructor.page;
    await page.goto('/studio/earnings');
    const rows = page.getByRole('row').filter({ hasText: courseTitle });
    await expect(rows).toHaveCount(2);
    await expect(rows.filter({ hasText: 'Sale' })).toContainText('$49.00');
    await expect(rows.filter({ hasText: 'Refund reversal' })).toHaveCount(1);
  });
});
