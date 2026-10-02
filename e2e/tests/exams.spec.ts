import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import type { Actor } from './helpers';
import { ADMIN, API, PASSWORD, apiLogin, email, label, login, newActor, run } from './helpers';

/**
 * Wave 3 "exams" area (spec §13–§15, §17) through the real UI against the real API + MySQL:
 * XLSX import with header mapping (and a formula cell refused), case-group exhibits in an exam,
 * accommodations in the timer, practice from mistakes, spaced review grading, question challenges,
 * staff-approved regrading and a certificate name correction. Scaffolding already covered by
 * earlier waves (users, course, video, publication) is done over the API.
 *
 * Runs on the shared production-like stack (scripts/e2e-all.sh): privileged sign-ins answer TOTP through the
 * helpers. The spec needs mysql access to E2E_DB only to simulate elapsed time for spaced-review cards.
 */

interface Json {
  [k: string]: unknown;
}

class Api {
  constructor(
    private request: APIRequestContext,
    public token = '',
  ) {}
  async call<T = Json>(method: string, path: string, body?: unknown, expected = [200, 201, 202, 204]) {
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

// ---------------- a tiny XLSX writer (stored ZIP + inline strings) ----------------

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function zip(files: Record<string, string>): Buffer {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const [name, content] of Object.entries(files)) {
    const data = Buffer.from(content, 'utf8');
    const nameBuf = Buffer.from(name, 'utf8');
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8); // stored
    local.writeUInt32LE(0, 10);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, data);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt32LE(0, 12);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);
    offset += 30 + nameBuf.length + data.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  const count = Object.keys(files).length;
  end.writeUInt16LE(count, 8);
  end.writeUInt16LE(count, 10);
  end.writeUInt32LE(cd.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, end]);
}
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const colName = (i: number) => String.fromCharCode(65 + i);
/** Rows of text cells; a cell value starting with "=" is written as a formula with a cached value. */
function xlsx(rows: string[][]): Buffer {
  const sheetRows = rows
    .map((r, ri) => {
      const cells = r
        .map((v, ci) => {
          const ref = `${colName(ci)}${ri + 1}`;
          if (v.startsWith('=')) return `<c r="${ref}"><f>${esc(v.slice(1))}</f><v>2</v></c>`;
          return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`;
        })
        .join('');
      return `<row r="${ri + 1}">${cells}</row>`;
    })
    .join('');
  const main = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
  const rel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  return zip({
    '[Content_Types].xml':
      '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
    '_rels/.rels':
      '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="${main}" xmlns:r="${rel}"><sheets><sheet name="Questions" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    'xl/_rels/workbook.xml.rels':
      '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
    'xl/worksheets/sheet1.xml': `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="${main}"><sheetData>${sheetRows}</sheetData></worksheet>`,
  });
}

const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const ytId = (suffix: string) =>
  `x${run}${suffix}`.replace(/[^A-Za-z0-9_-]/g, '').padEnd(11, 'z').slice(0, 11);

function sql(statement: string) {
  execFileSync('mysql', [
    `-h${process.env.MYSQL_HOST ?? '127.0.0.1'}`,
    `-u${process.env.MYSQL_USER ?? 'mastemy'}`,
    `-p${process.env.MYSQL_PASSWORD ?? 'mastemy_dev_pw'}`,
    process.env.E2E_DB ?? 'mastemy_e2e',
    '-e',
    statement,
  ]);
}

/** Simulates the passage of time for SM-2 cards (the only way to make tomorrow's cards due today). */
const makeCardsDue = (userId: string) =>
  sql(
    `UPDATE Assessment_ReviewCards SET DueAt = UTC_TIMESTAMP() - INTERVAL 1 MINUTE WHERE UserId = '${userId}';`,
  );

test.describe.serial('wave 3 exams: question bank, delivery, practice, regrading, certificates', () => {
  let admin: Actor;
  let instructor: Actor;
  let reviewerActor: Actor;
  let student: Actor;
  const people = {
    instructor: email('exinstructor'),
    reviewer: email('exreviewer'),
    student: email('exstudent'),
  };
  const title = `Financial Analysis Exams ${run}`;
  const caseTitle = `Quarterly sales case ${run}`;
  let course = { id: '', slug: '', code: '', lessonId: '' };
  let studentId = '';
  let mockExamId = '';
  let finalExamId = '';
  let attemptId = '';
  const ids = { q1: '', q2: '', c1: '', c2: '', caseGroup: '' };

  test.beforeAll(async ({ browser }) => {
    admin = await newActor(browser);
    instructor = await newActor(browser);
    reviewerActor = await newActor(browser);
    student = await newActor(browser);
  });

  test('setup over the API: users, roles, channel and a draft course with a ready video', async ({
    request,
  }) => {
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    const instructorId = await registerApi(request, 'Ines Instructor', people.instructor);
    const reviewerId = await registerApi(request, 'Rafi Reviewer', people.reviewer);
    studentId = await registerApi(request, 'Sami Student', people.student);
    // Privileged roles need a verified email; staff confirm it the same way the admin UI does.
    for (const id of [instructorId, reviewerId])
      await adminApi.post(`/api/admin/users/${id}/email-verification/mark-verified`);
    await adminApi.put(`/api/admin/users/${instructorId}/roles`, { roles: ['Student', 'Instructor'] });
    await adminApi.put(`/api/admin/users/${reviewerId}/roles`, { roles: ['Student', 'Reviewer'] });
    const channel = await adminApi.post<{ id: string }>('/api/admin/youtube/channels', {
      channelId: `UC${`ex${run}`.padEnd(22, 'q').slice(0, 22)}`,
      title: `Mastemy Exams ${run}`,
      mode: 'MastemyManaged',
    });
    const { api: inst } = await signIn(request, people.instructor);
    const { api: reviewer } = await signIn(request, people.reviewer);
    const categories = await inst.get<{ id: number }[]>('/api/categories');
    const c = await inst.post<{ id: string; slug: string }>('/api/studio/courses', {
      title,
      subtitle: 'Wave 3 exams end-to-end course',
      description: 'A course used by the exams end-to-end suite. Videos are free on YouTube.',
      audience: 'Analysts',
      prerequisites: '',
      outcomes: ['Read statements', 'Compute ratios', 'Explain variance'],
      language: 'en',
      level: 'Beginner',
      categoryIds: [categories[0].id],
    });
    const m = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/modules`, {
      title: 'Ratios',
    });
    const l = await inst.post<{ id: string }>(`/api/studio/modules/${m.id}/lessons`, {
      title: 'Margins and growth',
      objective: 'Compute margins.',
      isPreview: true,
    });
    const video = await inst.post<{ id: string }>(`/api/studio/lessons/${l.id}/video`, {
      url: `https://youtu.be/${ytId('A')}`,
      channelId: channel.id,
      rightsDeclared: true,
      rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
      title: `Exams lesson video ${run}`,
      durationSeconds: 300,
    });
    await reviewer.post(`/api/admin/youtube/videos/${video.id}/confirm`, { approve: true });
    const studio = await inst.get<{ code: string }>(`/api/studio/courses/${c.id}`);
    course = { id: c.id, slug: c.slug, code: studio.code, lessonId: l.id };
    expect(course.code).toBeTruthy();
  });

  test('instructor creates a case group with a Markdown exhibit and live preview', async () => {
    const page = instructor.page;
    await login(page, people.instructor);
    await page.goto(`/studio/courses/${course.id}?tab=questions`);
    await page.getByRole('link', { name: /^Exam tools:/ }).click();
    await expect(page).toHaveURL(new RegExp(`/studio/courses/${course.id}/exams`));
    await page.getByRole('tab', { name: 'Case groups' }).click();
    await page.getByRole('button', { name: 'New case group' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByLabel(label('Title')).fill(caseTitle);
    await dialog
      .getByLabel(label('Exhibit'))
      .fill('| Quarter | Sales |\n|---|---|\n| Q1 | 100 |\n| Q2 | 125 |\n\nGrowth is $\\frac{125-100}{100}$.');
    await dialog.getByRole('button', { name: 'Preview' }).click();
    const preview = dialog.getByLabel('Preview of Exhibit');
    await expect(preview.getByRole('table')).toBeVisible();
    await expect(preview.locator('.katex')).toHaveCount(1);
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Case group saved.')).toBeVisible();
    await expect(page.getByRole('heading', { name: caseTitle })).toBeVisible();
  });

  test('XLSX import: a formula cell is refused with the cell named; custom headers are mapped and committed', async () => {
    const page = instructor.page;
    await page.goto(`/studio/courses/${course.id}/exams?tab=import`);
    const headers = [
      'Question ID',
      'Kind',
      'Lang',
      'Course',
      'Question',
      'Choice A',
      'Choice B',
      'Choice C',
      'Answer',
      'Why',
      'Feedback A',
      'Feedback B',
      'Feedback C',
      'Level',
      'Source',
    ];
    const row = (n: number, stem: string) => [
      `EX-${run}-${n}`,
      'SingleChoice',
      'en',
      course.code,
      stem,
      `Right ${n}`,
      `Wrong ${n}b`,
      `Wrong ${n}c`,
      'A',
      'Margins compare profit with revenue.',
      'Correct: this is the definition.',
      'This confuses profit with cost.',
      'This ignores revenue.',
      'Easy',
      'Mastemy original',
    ];
    const good = [
      headers,
      row(1, 'What is $\\frac{1}{2}$ of a **10%** margin?'),
      row(2, 'Which figure grows fastest?'),
    ];
    const withFormula = good.map((r) => [...r]);
    withFormula[1][4] = '=1+1';

    const file = page.getByLabel(label('Spreadsheet (.xlsx or .csv)'));
    await file.setInputFiles({ name: 'formula.xlsx', mimeType: XLSX_MIME, buffer: xlsx(withFormula) });
    await page.getByRole('button', { name: 'Read headers' }).click();
    const refusal = page.getByRole('alert').filter({ hasText: 'The spreadsheet was refused' });
    await expect(refusal).toContainText('E2');
    await expect(refusal).toContainText('formula');

    await file.setInputFiles({ name: 'questions.xlsx', mimeType: XLSX_MIME, buffer: xlsx(good) });
    await page.getByRole('button', { name: 'Read headers' }).click();
    await expect(page.getByRole('heading', { name: 'Map your columns' })).toBeVisible();
    // Suggested mappings are pre-selected; two custom headers need a manual choice.
    await expect(page.getByLabel('Column "Question ID"')).toHaveValue('ExternalId');
    await expect(page.getByLabel('Column "Feedback B"')).toHaveValue('ExplanationB');
    await expect(page.getByText(/Required columns not mapped: .*QuestionType/)).toBeVisible();
    await page.getByLabel('Column "Kind"').selectOption('QuestionType');
    await page.getByLabel('Column "Why"').selectOption('Explanation');
    await page.getByRole('button', { name: 'Preview import' }).click();
    await expect(page.getByText('2 valid rows, 0 rows with errors.')).toBeVisible();
    await page.getByRole('button', { name: 'Import 2 questions' }).click();
    await expect(page.getByText('Import complete')).toBeVisible();
    await expect(page.getByText('2 created, 0 updated.', { exact: false })).toBeVisible();
  });

  test('setup over the API: activate questions, case members, exams, publish and enrol', async ({
    request,
  }) => {
    const { api: inst } = await signIn(request, people.instructor);
    const { api: reviewer } = await signIn(request, people.reviewer);
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    const list = await inst.get<{ items: { id: string; externalId: string }[] }>(
      `/api/studio/courses/${course.id}/questions?pageSize=50`,
    );
    ids.q1 = list.items.find((q) => q.externalId === `EX-${run}-1`)!.id;
    ids.q2 = list.items.find((q) => q.externalId === `EX-${run}-2`)!.id;
    const groups = await inst.get<{ id: string; title: string }[]>(
      `/api/studio/courses/${course.id}/case-groups`,
    );
    ids.caseGroup = groups.find((g) => g.title === caseTitle)!.id;
    for (const [i, stem] of ['By how much did sales grow from Q1 to Q2?', 'Which quarter had higher sales?'].entries()) {
      const q = await inst.post<{ id: string }>(`/api/studio/courses/${course.id}/questions`, {
        externalId: `EX-${run}-C${i + 1}`,
        type: 'SingleChoice',
        language: 'en',
        stem,
        explanation: 'Read the exhibit table.',
        difficulty: 'Medium',
        tags: ['case'],
        allowShuffle: false,
        cognitiveLevel: 'Analyze',
        caseGroupId: ids.caseGroup,
        caseGroupOrder: i,
        options: [
          { text: `Case right ${i + 1}`, isCorrect: true, rationale: 'Matches the table.' },
          { text: `Case wrong ${i + 1}`, isCorrect: false, rationale: 'Does not match.' },
        ],
      });
      if (i === 0) ids.c1 = q.id;
      else ids.c2 = q.id;
    }
    for (const id of [ids.q1, ids.q2, ids.c1, ids.c2]) {
      await adminApi.post(`/api/studio/questions/${id}/state`, { state: 'Reviewed' });
      await reviewer.post(`/api/studio/questions/${id}/state`, { state: 'Approved' });
      await reviewer.post(`/api/studio/questions/${id}/state`, { state: 'Active' });
    }
    const mock = await inst.post<{ id: string }>(`/api/studio/courses/${course.id}/assessments`, {
      title: 'Exams mock exam',
      kind: 'MockExam',
      mode: 'Exam',
      timeLimitMinutes: 10,
      maxAttempts: 5,
      passPercent: 50,
      multiSelectScoring: 'AllOrNothing',
      questionCount: 4,
      isPremium: false,
      countsTowardCertificate: false,
      questionIds: [ids.c1, ids.c2, ids.q1, ids.q2],
      reviewPolicy: 'AfterSubmit',
    });
    mockExamId = mock.id;
    const final = await inst.post<{ id: string }>(`/api/studio/courses/${course.id}/assessments`, {
      title: 'Exams certificate exam',
      kind: 'FinalAssessment',
      mode: 'Exam',
      timeLimitMinutes: 10,
      maxAttempts: 3,
      passPercent: 70,
      multiSelectScoring: 'AllOrNothing',
      questionCount: 3,
      isPremium: false,
      countsTowardCertificate: true,
      questionIds: [ids.c1, ids.c2, ids.q1],
    });
    finalExamId = final.id;
    await inst.post(`/api/studio/courses/${course.id}/submit`);
    await reviewer.post(`/api/review/courses/${course.id}/decision`, { decision: 'Approve' });
    await adminApi.post(`/api/admin/courses/${course.id}/publish`);
    const { api: learner } = await signIn(request, people.student);
    await learner.post(`/api/learn/courses/${course.id}/enroll`);
    await learner.put(`/api/learn/lessons/${course.lessonId}/progress`, {
      positionSeconds: 300,
      completed: true,
    });
  });

  test('staff grants 50% extra time to the learner', async () => {
    const page = admin.page;
    await login(page, ADMIN.email, ADMIN.password);
    await page.goto('/staff/exams/accommodations');
    await page.getByLabel('Find a learner by name or email').fill(people.student);
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.getByRole('button', { name: `Sami Student (${people.student})` }).click();
    await page.getByLabel('Extra time (%)').fill('50');
    await page.getByLabel(label('Reason')).fill('Documented accommodation for timed exams.');
    await page.getByRole('button', { name: 'Grant accommodation' }).click();
    await expect(page.getByText('Accommodation granted.')).toBeVisible();
    await expect(page.getByRole('cell', { name: '+50% time' })).toBeVisible();
  });

  test('the exam shows the accommodation in the timer and the case exhibit beside grouped items', async ({
    request,
  }) => {
    const { api } = await signIn(request, people.student);
    const attempt = await api.post<{
      id: string;
      extraTimePercent: number | null;
      items: { itemId: string; stem: string; caseGroupId: string | null; options: { id: string; text: string }[] }[];
    }>(`/api/assessments/${mockExamId}/attempts`);
    attemptId = attempt.id;
    expect(attempt.extraTimePercent).toBe(50);

    const page = student.page;
    await login(page, people.student);
    await page.goto(`/attempts/${attemptId}`);
    await expect(page.getByText('Your time limit includes 50% extra time.')).toBeVisible();
    // 10 minutes + 50% = 15 minutes.
    await expect(page.getByTestId('timer')).toHaveText(/^1[45]:\d\d$/);
    const exhibit = page.getByRole('region', { name: `Case exhibit: ${caseTitle}` });
    const nav = page.getByRole('complementary', { name: /navigator/i });
    for (let i = 0; i < attempt.items.length; i++) {
      await nav.getByRole('button', { name: new RegExp(`^Question ${i + 1}\\b`) }).click();
      if (attempt.items[i].caseGroupId) {
        await expect(exhibit).toBeVisible();
        await expect(exhibit.getByRole('cell', { name: '125' })).toBeVisible();
      } else {
        await expect(exhibit).toHaveCount(0);
      }
    }
    // Case members are contiguous and in order.
    const caseIdx = attempt.items.map((it, i) => (it.caseGroupId ? i : -1)).filter((i) => i >= 0);
    expect(caseIdx).toHaveLength(2);
    expect(caseIdx[1] - caseIdx[0]).toBe(1);
    // Math in the imported stem is typeset by KaTeX.
    const q1 = attempt.items.findIndex((it) => it.stem.includes('frac'));
    await nav.getByRole('button', { name: new RegExp(`^Question ${q1 + 1}\\b`) }).click();
    await expect(page.locator('.question .katex').first()).toBeVisible();

    // Answer: C1 right, C2 wrong, Q1 right, Q2 wrong (option B).
    const pick = (stemPart: string, textPrefix: string) => {
      const it = attempt.items.find((x) => x.stem.includes(stemPart))!;
      return api.put(`/api/attempts/${attemptId}/items/${it.itemId}`, {
        selectedOptionIds: [it.options.find((o) => o.text.startsWith(textPrefix))!.id],
        flagged: false,
      });
    };
    await pick('grow from Q1', 'Case right 1');
    await pick('higher sales', 'Case wrong 2');
    await pick('frac', 'Right 1');
    await pick('grows fastest', 'Wrong 2b');
    await api.post(`/api/attempts/${attemptId}/submit`);
    await page.reload();
    await expect(page.locator('.score')).toHaveText('50%');
    await expect(page.getByText(/not a prediction or guarantee/).first()).toBeVisible();
  });

  test('practice from previous mistakes; the learner challenges a question after checking it', async () => {
    const page = student.page;
    await page.goto('/practice');
    await page.getByRole('link', { name: 'Revise my mistakes' }).first().click();
    await expect(page.getByLabel('Only my previous mistakes')).toBeChecked();
    await page.getByRole('button', { name: 'Start session' }).click();
    await expect(page).toHaveURL(/\/practice\/sessions\/[0-9a-f-]{36}$/);
    await expect(page.getByText('2 questions', { exact: true })).toBeVisible();
    const card = page.getByRole('article').filter({ hasText: 'Which figure grows fastest?' });
    await expect(card).toBeVisible();
    await expect(page.getByRole('article').filter({ hasText: 'Which quarter had higher sales?' })).toBeVisible();
    await card.getByLabel('Wrong 2b').check();
    await card.getByRole('button', { name: 'Check answer' }).click();
    await expect(card.getByText('Correct: this is the definition.')).toBeVisible();
    await card.getByRole('button', { name: 'Challenge this question' }).click();
    const dialog = page.getByRole('dialog', { name: 'Challenge a question' });
    await dialog
      .getByLabel(label('Reason'))
      .fill('Option B is also defensible: the question does not say which period is compared.');
    await dialog.getByRole('button', { name: 'Send challenge' }).click();
    await expect(page.getByText('Challenge sent. You will be notified of the outcome.')).toBeVisible();
  });

  test('a reviewer resolves the challenge and the learner is notified', async () => {
    const page = reviewerActor.page;
    await login(page, people.reviewer);
    await page.goto('/staff/exams/challenges');
    const item = page.getByRole('listitem').filter({ hasText: `EX-${run}-2` });
    await item.getByRole('button', { name: 'Resolve' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByLabel('No change').check();
    await dialog.getByLabel(label('Reviewer note')).fill('The stem compares the same period; key stands.');
    await dialog.getByRole('button', { name: 'Resolve' }).click();
    await expect(page.getByText('Challenge resolved; the learner was notified.')).toBeVisible();

    const learner = student.page;
    await learner.goto('/me/notifications');
    await expect(learner.getByText(/Your question challenge was/).first()).toBeVisible();
    await learner.goto('/practice');
    await expect(learner.getByText('The stem compares the same period; key stands.')).toBeVisible();
  });

  test('spaced review: due cards are graded by answering', async ({ request }) => {
    makeCardsDue(studentId);
    const { api } = await signIn(request, people.student);
    const before = await api.get<unknown[]>('/api/practice/review/due');
    expect(before.length).toBeGreaterThanOrEqual(4);

    const page = student.page;
    await page.goto('/review');
    await expect(page.getByText(`${before.length} questions are due for review.`)).toBeVisible();
    await page.getByRole('button', { name: 'Start review' }).click();
    await expect(page).toHaveURL(/mode=review$/);
    const first = page.getByRole('article').first();
    await first.getByRole('radio').first().check();
    await first.getByRole('button', { name: 'Check and grade' }).click();
    await expect(first.getByText(/^Graded (Good|Hard|Again)/)).toBeVisible();
    const after = await api.get<unknown[]>('/api/practice/review/due');
    expect(after.length).toBe(before.length - 1);
  });

  test('a reviewer proposes a regrade; staff approves it and the learner score changes', async ({
    request,
  }) => {
    const { api: reviewer } = await signIn(request, people.reviewer);
    const q = await reviewer.get<{ question: { version: { options: { id: string; text: string }[] } } }>(
      `/api/studio/questions/${ids.q2}`,
    );
    const b = q.question.version.options.find((o) => o.text === 'Wrong 2b')!;
    await reviewer.post(`/api/review/questions/${ids.q2}/regrades`, {
      correctOptionIds: [b.id],
      reason: 'Option B is the defensible answer after the source data was rechecked.',
    });

    const page = admin.page;
    await page.goto('/staff/exams/regrades');
    const row = page.getByRole('row').filter({ hasText: 'source data was rechecked' });
    await row.getByRole('button', { name: 'Open' }).click();
    const dialog = page.getByRole('dialog', { name: 'Regrade' });
    await expect(dialog.getByText('Computed when approved')).toBeVisible();
    await dialog.getByLabel(label('Decision note')).fill('Approved after checking the source.');
    await dialog.getByRole('button', { name: 'Approve and apply' }).click();
    await expect(page.getByText('Regrade applied.')).toBeVisible();
    await expect(dialog.getByTestId('regrade-affected')).toContainText(/\d+ attempts re-scored, [1-9]\d* changed/);
    const deltas = dialog.getByRole('table', { name: 'Score changes per attempt' });
    await expect(deltas.getByRole('row').filter({ hasText: attemptId.slice(0, 8) })).toContainText('+25');

    const learner = student.page;
    await learner.goto(`/attempts/${attemptId}`);
    await expect(learner.locator('.score')).toHaveText('75%');
    await expect(learner.getByText('This attempt was regraded after a correction to the answer key.')).toBeVisible();
  });

  test('certificate name correction: requested on the dashboard, approved by staff, re-issued with the same code', async ({
    request,
  }) => {
    const { api } = await signIn(request, people.student);
    const attempt = await api.post<{ id: string; items: { itemId: string; options: { id: string; text: string }[] }[] }>(
      `/api/assessments/${finalExamId}/attempts`,
    );
    for (const it of attempt.items) {
      const right = it.options.find((o) => o.text.startsWith('Right') || o.text.startsWith('Case right'))!;
      await api.put(`/api/attempts/${attempt.id}/items/${it.itemId}`, { selectedOptionIds: [right.id], flagged: false });
    }
    const result = await api.post<{ certificateCode: string | null; passed: boolean }>(
      `/api/attempts/${attempt.id}/submit`,
    );
    expect(result.passed).toBe(true);
    const code = result.certificateCode!;
    expect(code).toBeTruthy();

    const page = student.page;
    await page.goto('/me');
    await page.getByRole('button', { name: `Request a name correction for ${title}` }).click();
    const dialog = page.getByRole('dialog', { name: 'Request a name correction' });
    await dialog.getByLabel(label('Name on the certificate')).fill('Sami Al-Student');
    await dialog.getByLabel(label('Reason')).fill('My legal name includes the family prefix.');
    await dialog.getByRole('button', { name: 'Send request' }).click();
    await expect(page.getByText('Correction requested.')).toBeVisible();
    await expect(page.getByText('Request pending')).toBeVisible();

    const staff = admin.page;
    await staff.goto('/staff/exams/corrections');
    const item = staff.getByRole('listitem').filter({ hasText: code });
    await expect(item).toContainText('"Sami Student" → "Sami Al-Student"');
    await item.getByLabel('Note').fill('Matches the ID document.');
    await item.getByRole('button', { name: 'Approve and re-issue' }).click();
    await expect(staff.getByText('Decision saved.')).toBeVisible();

    await page.goto(`/verify/${encodeURIComponent(code)}`);
    await expect(page.getByText('Sami Al-Student')).toBeVisible();
    const verified = await new Api(request).get<{ code: string; recipientName: string }>(
      `/api/certificates/verify/${encodeURIComponent(code)}`,
    );
    expect(verified).toMatchObject({ code, recipientName: 'Sami Al-Student' });
  });
});
