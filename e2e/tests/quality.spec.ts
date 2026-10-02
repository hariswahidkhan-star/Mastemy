import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { login, newActor } from './helpers';
import type { Actor } from './helpers';
import { publicPages, seedPublishedCourse } from './content';
import type { SeededCourse } from './content';

/**
 * Page quality across the public site and the main signed-in pages:
 *  - document outline: exactly one h1, no skipped heading levels, every <img> has an alt attribute;
 *  - unique, non-empty <title> and meta description on every public page;
 *  - responsive: no horizontal scrolling at 360, 768 and 1280 px (scrollWidth <= innerWidth), with
 *    full-page screenshots attached for the key pages;
 *  - keyboard focus (WCAG 2.4.7 / 2.4.11): every Tab stop shows a visible focus indicator and is not
 *    entirely hidden behind sticky/fixed content.
 * Runs on the shared stack from scripts/e2e-all.sh.
 */

interface Outline {
  h1: number;
  skips: string[];
  imgsWithoutAlt: string[];
  title: string;
  description: string;
}

async function waitReady(page: Page) {
  await expect(page.locator('main h1').first()).toBeVisible();
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
  await expect(page.locator('main .spinner')).toHaveCount(0);
}

async function outline(page: Page): Promise<Outline> {
  return page.evaluate(() => {
    const visible = (el: Element) => {
      const s = getComputedStyle(el);
      return !(el.closest('[hidden]') || s.display === 'none' || s.visibility === 'hidden');
    };
    // Headings in document order, ignoring closed menus/dialogs (not exposed to assistive tech).
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible);
    const skips: string[] = [];
    let prev = 0;
    for (const h of hs) {
      const level = Number(h.tagName[1]);
      if (prev && level > prev + 1) skips.push(`h${prev} -> ${h.tagName.toLowerCase()} "${h.textContent?.trim().slice(0, 60)}"`);
      prev = level;
    }
    return {
      h1: hs.filter((h) => h.tagName === 'H1').length,
      skips,
      imgsWithoutAlt: [...document.querySelectorAll('img:not([alt])')].map((i) => (i as HTMLImageElement).src),
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    };
  });
}

async function noHorizontalScroll(page: Page) {
  return page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    offenders: [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${(el as HTMLElement).className}`.slice(0, 80)),
  }));
}

/** Tabs through the page; returns problems with focus visibility (2.4.7) and obscured focus (2.4.11). */
async function focusAudit(page: Page, stops = 30): Promise<string[]> {
  const problems: string[] = [];
  await page.locator('body').focus();
  const seen = new Set<string>();
  for (let i = 0; i < stops; i++) {
    await page.keyboard.press('Tab');
    const r = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      // Focus inside a third-party frame (the YouTube player) is drawn by that frame's own document.
      if (!el || el === document.body || el.tagName === 'IFRAME') return null;
      // The ring may be drawn by the element or by a wrapper via :focus-within (e.g. the video frame).
      const ring = (n: Element | null) => {
        if (!n) return false;
        const s = getComputedStyle(n);
        return (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (!!s.boxShadow && s.boxShadow !== 'none');
      };
      let indicator = false;
      for (let n: Element | null = el, i = 0; n && i < 4 && !indicator; n = n.parentElement, i++) indicator = ring(n);
      const rect = el.getBoundingClientRect();
      const pts = [
        [rect.left + rect.width / 2, rect.top + rect.height / 2],
        [rect.left + 2, rect.top + 2],
        [rect.right - 2, rect.bottom - 2],
      ];
      const reachable = pts.some(([x, y]) => {
        const hit = document.elementFromPoint(x, y);
        return !!hit && (hit === el || el.contains(hit) || hit.contains(el));
      });
      const name = `${el.tagName.toLowerCase()} "${(el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 40)}"`;
      return { name, indicator, reachable, inView: rect.bottom > 0 && rect.top < innerHeight };
    });
    if (!r) continue;
    if (seen.has(r.name)) continue;
    seen.add(r.name);
    if (!r.indicator) problems.push(`no visible focus indicator: ${r.name}`);
    if (r.inView && !r.reachable) problems.push(`focus obscured: ${r.name}`);
  }
  return problems;
}

test.describe.serial('page quality: outline, metadata, responsive layout, focus', () => {
  let course: SeededCourse;
  let student: Actor;

  test('setup: a published course with lessons and a package', async ({ request }) => {
    course = await seedPublishedCourse(request, 'qa');
  });

  test('public pages: one h1, ordered headings, alt text, unique title and description', async ({ page }) => {
    const problems: string[] = [];
    const titles = new Map<string, string>();
    const descriptions = new Map<string, string>();
    for (const p of publicPages(course)) {
      await page.goto(p.path);
      await waitReady(page);
      // Client-side metadata is applied in an effect after render.
      await expect.poll(() => page.title()).not.toBe('Mastemy');
      const o = await outline(page);
      if (o.h1 !== 1) problems.push(`${p.name}: ${o.h1} h1 elements`);
      for (const s of o.skips) problems.push(`${p.name}: skipped heading level ${s}`);
      for (const src of o.imgsWithoutAlt) problems.push(`${p.name}: <img> without alt ${src}`);
      if (!o.description) problems.push(`${p.name}: no meta description`);
      if (titles.has(o.title)) problems.push(`${p.name}: title "${o.title}" also used by ${titles.get(o.title)}`);
      if (o.description && descriptions.has(o.description))
        problems.push(`${p.name}: description also used by ${descriptions.get(o.description)}`);
      titles.set(o.title, p.name);
      if (o.description) descriptions.set(o.description, p.name);
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });

  test('responsive: no horizontal scroll at 360, 768 and 1280 px', async ({ browser }, info) => {
    student = await newActor(browser);
    await login(student.page, course.studentEmail);
    const pages = [
      ...publicPages(course).map((p) => ({ ...p, page: null as Page | null })),
      { name: 'dashboard', path: '/me', page: student.page },
      { name: 'lesson', path: `/learn/${course.slug}/${course.lessonId}`, page: student.page },
      { name: 'profile', path: '/me/profile', page: student.page },
    ];
    const key = new Set(['home', 'courses', 'course detail', 'login', 'dashboard', 'lesson']);
    const ctx = await browser.newContext();
    const anon = await ctx.newPage();
    const problems: string[] = [];
    for (const width of [360, 768, 1280]) {
      for (const p of pages) {
        const page = p.page ?? anon;
        await page.setViewportSize({ width, height: 800 });
        await page.goto(p.path);
        await waitReady(page);
        const r = await noHorizontalScroll(page);
        if (r.scrollWidth > r.innerWidth)
          problems.push(`${p.name} @${width}: scrollWidth ${r.scrollWidth} > ${r.innerWidth} (${r.offenders.join(', ')})`);
        if (key.has(p.name))
          await info.attach(`${p.name}-${width}.png`, {
            body: await page.screenshot({ fullPage: true }),
            contentType: 'image/png',
          });
      }
    }
    await ctx.close();
    expect(problems, problems.join('\n')).toEqual([]);
  });

  test('keyboard focus is always visible and never hidden (WCAG 2.4.7, 2.4.11)', async ({ browser }) => {
    const ctx = await browser.newContext();
    const anon = await ctx.newPage();
    const problems: string[] = [];
    for (const width of [1280, 360]) {
      for (const [page, path] of [
        [anon, '/'],
        [anon, '/courses'],
        [anon, `/courses/${course.slug}`],
        [anon, '/login'],
        [student.page, '/me'],
        [student.page, `/learn/${course.slug}/${course.lessonId}`],
      ] as const) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        await waitReady(page);
        for (const p of await focusAudit(page)) problems.push(`${path} @${width}: ${p}`);
      }
    }
    await ctx.close();
    await student.context.close();
    expect(problems, problems.join('\n')).toEqual([]);
  });
});
