import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { publicPages, seedPublishedCourse } from './content';
import type { SeededCourse } from './content';

/**
 * Field-style Core Web Vitals in a real browser against the production build (the SSR server when
 * E2E_SSR_URL is set, else the e2e web server): INP from Event Timing entries (the web-vitals method:
 * the slowest interaction, by interactionId, for fewer than 50 interactions), plus LCP and CLS from
 * PerformanceObserver. Mobile-like conditions: 360x780 viewport and 4x CPU throttling. Budgets:
 * INP < 200 ms, LCP < 2.5 s, CLS < 0.1. Measurements are written to test-results/web-vitals.json.
 */
const BASE = process.env.E2E_SSR_URL || undefined;

async function observe(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __vitals: { lcp: number; cls: number; inp: Map<number, number> } };
    w.__vitals = { lcp: 0, cls: 0, inp: new Map() };
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) w.__vitals.lcp = Math.max(w.__vitals.lcp, e.startTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[])
        if (!e.hadRecentInput) w.__vitals.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries() as (PerformanceEntry & { interactionId: number })[]) {
        if (!e.interactionId) continue;
        w.__vitals.inp.set(e.interactionId, Math.max(w.__vitals.inp.get(e.interactionId) ?? 0, e.duration));
      }
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
  });
}

async function vitals(page: Page) {
  // Let the observers flush (event entries are reported after the next paint).
  await page.waitForTimeout(500);
  return page.evaluate(() => {
    const v = (window as unknown as { __vitals: { lcp: number; cls: number; inp: Map<number, number> } }).__vitals;
    const durations = [...v.inp.values()];
    return {
      lcpMs: Math.round(v.lcp),
      cls: Number(v.cls.toFixed(3)),
      inpMs: durations.length ? Math.max(...durations) : 0,
      interactions: durations.length,
    };
  });
}

test.describe.serial('web vitals in the browser (INP, LCP, CLS)', () => {
  let course: SeededCourse;
  const results: Record<string, unknown>[] = [];

  test('setup: a published course', async ({ request }) => {
    course = await seedPublishedCourse(request, 'perf');
  });

  test('interactions stay under the INP budget on throttled mobile', async ({ browser }) => {
    const flows: { name: string; path: string; act: (p: Page) => Promise<void> }[] = [
      {
        name: 'home: open the menu and the Explore mega-menu',
        path: '/',
        act: async (p) => {
          await p.locator('.menu-toggle').click();
          await p.getByRole('button', { name: /^Explore/ }).click();
          await p.keyboard.press('Escape');
          await p.locator('.menu-toggle').click();
        },
      },
      {
        name: 'courses: type a search and toggle compare',
        path: '/courses',
        act: async (p) => {
          const search = p.getByRole('combobox').first();
          await search.click();
          await search.pressSequentially('spread', { delay: 60 });
          await p.keyboard.press('Escape');
          await p.getByRole('button', { name: `Compare ${course.title}` }).first().click();
        },
      },
      {
        name: 'course detail: switch theme and language',
        path: `/courses/${course.slug}`,
        act: async (p) => {
          await p.locator('.menu-toggle').click();
          await p.getByRole('button', { name: /dark|light|theme/i }).first().click();
          const lang = p.getByRole('button', { name: /switch language to arabic/i });
          await lang.hover();
          await p.waitForTimeout(300);
          await lang.click();
          await expect(p.locator('html')).toHaveAttribute('lang', 'ar');
        },
      },
      {
        name: 'login: fill the form',
        path: '/login',
        act: async (p) => {
          await p.getByLabel('Email').click();
          await p.getByLabel('Email').pressSequentially('someone@example.com', { delay: 40 });
          await p.getByLabel('Password').click();
          await p.getByLabel('Password').pressSequentially('not-a-password', { delay: 40 });
        },
      },
    ];
    const problems: string[] = [];
    for (const f of flows) {
      // A fresh visitor per flow (no stored language/theme preference).
      const ctx = await browser.newContext({ baseURL: BASE, viewport: { width: 360, height: 780 } });
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await observe(page);
      await page.goto(f.path);
      await expect(page.locator('main h1').first()).toBeVisible();
      await page.waitForLoadState('networkidle');
      await f.act(page);
      const v = await vitals(page);
      results.push({ flow: f.name, ...v });
      console.log(`${f.name}: INP ${v.inpMs} ms (${v.interactions} interactions), LCP ${v.lcpMs} ms, CLS ${v.cls}`);
      if (v.inpMs >= 200) problems.push(`${f.name}: INP ${v.inpMs} ms`);
      if (v.lcpMs >= 2500) problems.push(`${f.name}: LCP ${v.lcpMs} ms`);
      if (v.cls >= 0.1) problems.push(`${f.name}: CLS ${v.cls}`);
      await ctx.close();
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });

  test('page loads: LCP and CLS on every public page (throttled mobile)', async ({ browser }) => {
    const ctx = await browser.newContext({ baseURL: BASE, viewport: { width: 360, height: 780 } });
    const problems: string[] = [];
    for (const p of publicPages(course)) {
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await observe(page);
      await page.goto(p.path);
      await expect(page.locator('main h1').first()).toBeVisible();
      await page.waitForLoadState('networkidle');
      const v = await vitals(page);
      results.push({ page: p.name, lcpMs: v.lcpMs, cls: v.cls });
      if (v.lcpMs >= 2500) problems.push(`${p.name}: LCP ${v.lcpMs} ms`);
      if (v.cls >= 0.1) problems.push(`${p.name}: CLS ${v.cls}`);
      await page.close();
    }
    await ctx.close();
    mkdirSync('test-results', { recursive: true });
    writeFileSync('test-results/web-vitals.json', JSON.stringify(results, null, 2));
    expect(problems, problems.join('\n')).toEqual([]);
  });
});
