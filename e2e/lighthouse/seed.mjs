#!/usr/bin/env node
/**
 * Seeds real public content over the API for the Lighthouse / performance runs (scripts/lighthouse.sh):
 * an instructor, a reviewed + published course (two modules, three lessons with notes, a confirmed
 * YouTube video on each lesson, an approved MCQ quiz), an approved study package and a publicly visible
 * certification. Needs the Development admin seed and Security__RequireMfaForPrivileged=false.
 *
 *   API_URL=http://localhost:6400 node e2e/lighthouse/seed.mjs > seed.json
 * Prints {"courseSlug","categorySlug","certificationSlug","lessonId"} on stdout.
 */
const API = (process.env.API_URL ?? 'http://localhost:5080').replace(/\/+$/, '');
const ADMIN = { email: 'admin@mastemy.local', password: 'ChangeMe!Dev2026' };
const PASSWORD = 'Lighthouse-Passw0rd-2026';
const run = Date.now().toString(36);
const log = (...a) => console.error('[seed]', ...a);

async function call(token, method, path, body, headers = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : undefined;
}

async function login(email, password) {
  const r = await call('', 'POST', '/api/auth/login', { email, password });
  if (!r.accessToken) throw new Error(`login ${email}: ${r.status} (disable MFA for privileged roles)`);
  return r.accessToken;
}

const client = (token) => ({
  get: (p) => call(token, 'GET', p),
  post: (p, b = {}) => call(token, 'POST', p, b),
  put: (p, b = {}, h) => call(token, 'PUT', p, b, h),
});

const ytId = (s) => `lh${run}${s}`.replace(/[^A-Za-z0-9_-]/g, '').padEnd(11, 'x').slice(0, 11);

const admin = client(await login(ADMIN.email, ADMIN.password));
const register = async (name, email) =>
  (
    await call('', 'POST', '/api/auth/register', {
      email,
      password: PASSWORD,
      displayName: name,
      preferredLanguage: 'en',
    })
  ).user.id;

const instEmail = `lh-instructor-${run}@mastemy.test`;
const revEmail = `lh-reviewer-${run}@mastemy.test`;
const instructorId = await register('Layla Haddad', instEmail);
const reviewerId = await register('Omar Reviewer', revEmail);
for (const id of [instructorId, reviewerId])
  await admin.post(`/api/admin/users/${id}/email-verification/mark-verified`);
await admin.put(`/api/admin/users/${instructorId}/roles`, { roles: ['Student', 'Instructor'] });
await admin.put(`/api/admin/users/${reviewerId}/roles`, { roles: ['Student', 'Reviewer'] });
const channel = await admin.post('/api/admin/youtube/channels', {
  channelId: `UC${`lh${run}`.padEnd(22, 'q').slice(0, 22)}`,
  title: 'Mastemy Data Skills',
  mode: 'MastemyManaged',
});
const inst = client(await login(instEmail, PASSWORD));
const rev = client(await login(revEmail, PASSWORD));

const categories = await inst.get('/api/categories');
const category = categories[0];
const course = await inst.post('/api/studio/courses', {
  title: `Spreadsheet Foundations ${run}`,
  subtitle: 'Tables, formulas and charts from first principles',
  description:
    'A practical introduction to spreadsheets: structured tables, reliable formulas, lookups and clear charts. ' +
    'Every video lesson is free on YouTube; original study notes and MCQ practice help you check your understanding.',
  audience: 'Analysts, students and anyone who works with data in spreadsheets',
  prerequisites: 'None',
  outcomes: ['Build structured tables', 'Write reliable formulas', 'Chart a time series'],
  language: 'en',
  level: 'Beginner',
  categoryIds: [category.id],
});
log('course', course.slug);

const lessons = [];
for (const [mi, mod] of [
  ['Tables', ['Structured tables', 'Sorting and filtering']],
  ['Formulas', ['Cell references and lookups']],
].entries()) {
  const m = await inst.post(`/api/studio/courses/${course.id}/modules`, { title: mod[0] });
  for (const [li, title] of mod[1].entries()) {
    const l = await inst.post(`/api/studio/modules/${m.id}/lessons`, {
      title,
      objective: `Understand ${title.toLowerCase()}.`,
      isPreview: mi === 0 && li === 0,
    });
    const { eTag } = await inst.get(`/api/studio/lessons/${l.id}/notes`);
    await inst.put(
      `/api/studio/lessons/${l.id}/notes`,
      {
        notesMarkdown: `## ${title}\n\nKey ideas for this lesson, written by the instructor.\n\n- Keep one record per row\n- Name your columns`,
        premiumNotesMarkdown: `## ${title}: worked examples\n\nStep-by-step exercises with answers.`,
      },
      { 'If-Match': eTag },
    );
    const video = await inst.post(`/api/studio/lessons/${l.id}/video`, {
      url: `https://youtu.be/${ytId(`${mi}${li}`)}`,
      channelId: channel.id,
      rightsDeclared: true,
      rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
      title: `${title} (video)`,
      durationSeconds: 420 + 60 * li,
    });
    // Manual path: the reviewer confirms the video (later videos on a confirmed channel may already be Ready).
    await rev.post(`/api/admin/youtube/videos/${video.id}/confirm`, { approve: true }).catch((e) => {
      if (!String(e.message).includes('-> 409')) throw e;
    });
    lessons.push(l.id);
  }
}

const questionIds = [];
for (const [i, [stem, right, wrong]] of [
  ['Which reference stays fixed when a formula is copied?', '$A$1', 'A1'],
  ['Which chart suits a monthly time series?', 'Line chart', 'Pie chart'],
  ['What should each row of a structured table hold?', 'One record', 'A summary'],
].entries()) {
  const q = await inst.post(`/api/studio/courses/${course.id}/questions`, {
    externalId: `LH-${run}-${i + 1}`,
    type: 'SingleChoice',
    language: 'en',
    stem,
    explanation: 'Spreadsheet basics.',
    difficulty: 'Easy',
    tags: ['basics'],
    allowShuffle: true,
    cognitiveLevel: 'Remember',
    options: [
      { text: right, isCorrect: true, rationale: 'Correct.' },
      { text: wrong, isCorrect: false, rationale: 'Not quite.' },
    ],
  });
  questionIds.push(q.id);
}
for (const id of questionIds) {
  await admin.post(`/api/studio/questions/${id}/state`, { state: 'Reviewed' });
  await rev.post(`/api/studio/questions/${id}/state`, { state: 'Approved' });
  await rev.post(`/api/studio/questions/${id}/state`, { state: 'Active' });
}
await inst.post(`/api/studio/courses/${course.id}/assessments`, {
  title: 'Spreadsheet basics quiz',
  kind: 'MockExam',
  mode: 'Exam',
  timeLimitMinutes: 20,
  maxAttempts: 5,
  passPercent: 70,
  multiSelectScoring: 'AllOrNothing',
  questionCount: 3,
  isPremium: false,
  countsTowardCertificate: true,
  questionIds,
  reviewPolicy: 'AfterSubmit',
});
await inst.post(`/api/studio/courses/${course.id}/submit`);
await rev.post(`/api/review/courses/${course.id}/decision`, { decision: 'Approve' });
await admin.post(`/api/admin/courses/${course.id}/publish`);
const pkg = await inst.post(`/api/studio/courses/${course.id}/packages`, {
  title: 'Spreadsheet study pack',
  contents: 'Premium lesson notes\nPractice question bank',
  price: 25,
  currency: 'USD',
  accessDays: 365,
});
await admin.post(`/api/admin/packages/${pkg.id}/decision`, { decision: 'Approve' });

let certificationSlug = null;
try {
  const issuer = await admin.post('/api/admin/certification-issuers', {
    name: `Data Skills Board ${run}`,
    websiteUrl: 'https://example.org',
    country: 'GB',
  });
  const cert = await admin.post('/api/admin/certifications', {
    issuerId: issuer.id,
    title: 'Spreadsheet Practitioner',
    slug: `spreadsheet-practitioner-${run}`,
    jurisdiction: 'International',
    examCode: 'SP-100',
    levelOrPart: 'Foundation',
    version: '2026',
    prerequisites: 'None',
    officialSourceUrl: 'https://example.org/sp-100',
    lastCheckedAt: new Date().toISOString(),
    evidenceNotes: 'Seeded for performance testing.',
    renewalInfo: 'No renewal required.',
    rightsNotes: 'Independent preparation material.',
    kind: 'Examination',
    hasNonMcqTasks: false,
    nonMcqDisclosure: '',
  });
  await admin.post(`/api/admin/certifications/${cert.id}/objectives`, {
    code: '1',
    title: 'Tables and formulas',
    weightPercent: 100,
  });
  for (const state of ['Verified', 'InformationOnly']) {
    try {
      await rev.post(`/api/admin/certifications/${cert.id}/state`, { state, notes: 'Seed' });
    } catch {
      await admin.post(`/api/admin/certifications/${cert.id}/state`, { state, notes: 'Seed' });
    }
  }
  certificationSlug = cert.slug;
} catch (e) {
  log('certification seed skipped:', e.message);
}

console.log(
  JSON.stringify({
    courseSlug: course.slug,
    courseId: course.id,
    categorySlug: category.slug,
    certificationSlug,
    lessonId: lessons[0],
  }),
);
