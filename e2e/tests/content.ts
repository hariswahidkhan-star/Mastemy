import type { APIRequestContext } from '@playwright/test';
import { ADMIN, API, PASSWORD, apiLogin, email, run } from './helpers';

/**
 * Real public content over the API for the page-quality and SSR specs: an instructor and a reviewer, a
 * reviewed + published course (a module with two lessons with notes and a confirmed YouTube video, the
 * first a free preview) and an approved study package. Each call creates a fresh course.
 */
export interface SeededCourse {
  id: string;
  slug: string;
  title: string;
  lessonId: string;
  categorySlug: string;
  instructorEmail: string;
  studentEmail: string;
}

type Json = Record<string, unknown>;

function client(request: APIRequestContext, token = '') {
  const call = async <T = Json>(method: string, path: string, body?: unknown, headers: Record<string, string> = {}) => {
    const res = await request.fetch(`${API}${path}`, {
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      data: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    if (!res.ok()) throw new Error(`${method} ${path} -> ${res.status()}: ${text.slice(0, 400)}`);
    return (text ? JSON.parse(text) : undefined) as T;
  };
  return {
    get: <T = Json>(p: string) => call<T>('GET', p),
    post: <T = Json>(p: string, b: unknown = {}) => call<T>('POST', p, b),
    put: <T = Json>(p: string, b: unknown = {}, h?: Record<string, string>) => call<T>('PUT', p, b, h),
  };
}

export async function seedPublishedCourse(request: APIRequestContext, tag: string): Promise<SeededCourse> {
  const admin = client(request, (await apiLogin(request, ADMIN.email, ADMIN.password)).accessToken);
  const anon = client(request);
  const people = { instructor: email(`${tag}inst`), reviewer: email(`${tag}rev`), student: email(`${tag}stu`) };
  const ids: Record<string, string> = {};
  for (const [k, mail] of Object.entries(people)) {
    const r = await anon.post<{ user: { id: string } }>('/api/auth/register', {
      email: mail,
      password: PASSWORD,
      displayName: `${k[0].toUpperCase()}${k.slice(1)} ${tag}`,
      preferredLanguage: 'en',
    });
    ids[k] = r.user.id;
    await admin.post(`/api/admin/users/${r.user.id}/email-verification/mark-verified`);
  }
  await admin.put(`/api/admin/users/${ids.instructor}/roles`, { roles: ['Student', 'Instructor'] });
  await admin.put(`/api/admin/users/${ids.reviewer}/roles`, { roles: ['Student', 'Reviewer'] });
  const channel = await admin.post<{ id: string }>('/api/admin/youtube/channels', {
    channelId: `UC${`${tag}${run}`.padEnd(22, 'q').slice(0, 22)}`,
    title: `Mastemy ${tag} ${run}`,
    mode: 'MastemyManaged',
  });
  const inst = client(request, (await apiLogin(request, people.instructor)).accessToken);
  const rev = client(request, (await apiLogin(request, people.reviewer)).accessToken);
  const categories = await inst.get<{ id: number; slug: string }[]>('/api/categories');
  const title = `Quality ${tag} Spreadsheets ${run}`;
  const c = await inst.post<{ id: string; slug: string }>('/api/studio/courses', {
    title,
    subtitle: 'Tables, formulas and charts from first principles',
    description: 'A course used by the page-quality end-to-end suite. Every video lesson is free on YouTube.',
    audience: 'Analysts',
    prerequisites: '',
    outcomes: ['Build a table', 'Write a formula'],
    language: 'en',
    level: 'Beginner',
    categoryIds: [categories[0].id],
  });
  const m = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/modules`, { title: 'Tables' });
  const lessonIds: string[] = [];
  for (const [i, lessonTitle] of ['Structured tables', 'Sorting and filtering'].entries()) {
    const l = await inst.post<{ id: string }>(`/api/studio/modules/${m.id}/lessons`, {
      title: lessonTitle,
      objective: `Understand ${lessonTitle.toLowerCase()}.`,
      isPreview: i === 0,
    });
    const { eTag } = await inst.get<{ eTag: string }>(`/api/studio/lessons/${l.id}/notes`);
    await inst.put(
      `/api/studio/lessons/${l.id}/notes`,
      { notesMarkdown: `## ${lessonTitle}\n\nKey ideas.`, premiumNotesMarkdown: 'Worked examples.' },
      { 'If-Match': eTag },
    );
    const video = await inst.post<{ id: string }>(`/api/studio/lessons/${l.id}/video`, {
      url: `https://youtu.be/${`q${tag}${run}${i}`.replace(/[^A-Za-z0-9_-]/g, '').padEnd(11, 'z').slice(0, 11)}`,
      channelId: channel.id,
      rightsDeclared: true,
      rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
      title: `${lessonTitle} video`,
      durationSeconds: 300,
    });
    await rev.post(`/api/admin/youtube/videos/${video.id}/confirm`, { approve: true }).catch((e: Error) => {
      if (!e.message.includes('-> 409')) throw e; // later videos of a confirmed channel may already be Ready
    });
    lessonIds.push(l.id);
  }
  await inst.post(`/api/studio/courses/${c.id}/submit`);
  await rev.post(`/api/review/courses/${c.id}/decision`, { decision: 'Approve' });
  await admin.post(`/api/admin/courses/${c.id}/publish`);
  const pkg = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/packages`, {
    title: 'Study pack',
    contents: 'Premium lesson notes',
    price: 25,
    currency: 'USD',
    accessDays: 365,
  });
  await admin.post(`/api/admin/packages/${pkg.id}/decision`, { decision: 'Approve' });
  return {
    id: c.id,
    slug: c.slug,
    title,
    lessonId: lessonIds[0],
    categorySlug: categories[0].slug,
    instructorEmail: people.instructor,
    studentEmail: people.student,
  };
}

/** Public, indexable routes (each must have a unique title + description, one h1, ordered headings). */
export function publicPages(c: SeededCourse): { name: string; path: string }[] {
  return [
    { name: 'home', path: '/' },
    { name: 'courses', path: '/courses' },
    { name: 'course detail', path: `/courses/${c.slug}` },
    { name: 'category', path: `/categories/${c.categorySlug}` },
    { name: 'categories', path: '/categories' },
    { name: 'free lessons', path: '/free-lessons' },
    { name: 'certifications', path: '/certifications' },
    { name: 'pathways', path: '/pathways' },
    { name: 'instructors', path: '/instructors' },
    { name: 'packages', path: '/packages' },
    { name: 'practice', path: '/practice' },
    { name: 'notes library', path: '/notes-library' },
    { name: 'business', path: '/business' },
    { name: 'bestseller rule', path: '/bestseller-rule' },
    { name: 'articles', path: '/articles' },
    { name: 'article', path: '/articles/how-mcq-certificates-work' },
    { name: 'verify', path: '/verify' },
    { name: 'teach', path: '/teach' },
    { name: 'about', path: '/about' },
    { name: 'help', path: '/help' },
    { name: 'contact', path: '/contact' },
    { name: 'login', path: '/login' },
    { name: 'register', path: '/register' },
  ];
}
