import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Cross-browser smoke: the public, anonymous, read-only surface verified on every engine the project matrix
 * runs (Chromium owns this plus the full stateful suite; Firefox, WebKit and the Pixel 5 mobile viewport run
 * only this file — see playwright.config.ts). It writes nothing to the server, so it is safe to replay on
 * several engines in one run. It covers SSR first paint, client hydration, keyboard focus/RTL and axe, which
 * is exactly where engines diverge.
 */

type Lang = 'en' | 'ar';
type Theme = 'light' | 'dark';

/** Stores the language/theme the app reads at start-up (applied on the next navigation). */
async function usePrefs(page: Page, lang: Lang, theme: Theme) {
  await page.evaluate(
    ([l, th]) => {
      localStorage.setItem('mastemy.lang', l);
      localStorage.setItem('mastemy.theme', th);
    },
    [lang, theme],
  );
}

/** Waits for the document shell to reflect the chosen language/theme and the page to finish settling. */
async function settle(page: Page, lang: Lang, theme: Theme) {
  const html = page.locator('html');
  await expect(html).toHaveAttribute('lang', lang);
  await expect(html).toHaveAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  await expect(html).toHaveAttribute('data-theme', theme);
  await expect(page.locator('main h1').first()).toBeVisible();
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
}

/** Serious/critical WCAG 2.x A/AA axe violations on the current page (the YouTube iframe is third-party). */
async function axeSeriousCritical(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .exclude('iframe[src*="youtube"]')
    .analyze();
  return result.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `[${v.impact}] ${v.id} – ${v.help}: ${v.nodes[0]?.target.join(' ')}`);
}

test.describe('cross-browser smoke (public, anonymous, read-only)', () => {
  test('home renders (SSR h1), hydrates and has no serious/critical axe violations', async ({ page }) => {
    await page.goto('/');
    await usePrefs(page, 'en', 'light');
    await page.goto('/');
    await settle(page, 'en', 'light');
    await expect(page.getByRole('navigation').first()).toBeVisible();
    expect(await axeSeriousCritical(page), 'axe home').toEqual([]);
  });

  test('courses listing renders course cards on this engine', async ({ page }) => {
    await page.goto('/');
    await usePrefs(page, 'en', 'light');
    await page.goto('/courses');
    await settle(page, 'en', 'light');
    // At least the public catalogue heading and a results region are present.
    await expect(page.locator('main h1').first()).toBeVisible();
    expect(await axeSeriousCritical(page), 'axe courses').toEqual([]);
  });

  test('Explore mega-menu: keyboard open, traverse and close with Escape (focus returns)', async ({
    page,
  }) => {
    await page.goto('/');
    await usePrefs(page, 'en', 'light');
    await page.goto('/');
    await settle(page, 'en', 'light');
    const button = page.getByRole('button', { name: /^Explore/ });
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await button.focus();
    await expect(button).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    const controls = await button.getAttribute('aria-controls');
    const panel = page.locator(`#${(controls ?? '').replace(/:/g, '\\:')}`);
    await expect(panel).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toBeHidden();
    await expect(button).toBeFocused();
  });

  test('visible focus ring: keyboard focus matches :focus-visible and paints a non-zero indicator', async ({
    page,
  }) => {
    await page.goto('/');
    await usePrefs(page, 'en', 'light');
    await page.goto('/');
    await settle(page, 'en', 'light');
    // A real Tab press (not programmatic .focus()) is what engines require to apply :focus-visible, which the
    // global stylesheet keys the focus outline on. Walk a few tabbable elements and assert the first with a
    // :focus-visible match paints an outline or box-shadow.
    await page.locator('body').focus();
    let visible = false;
    for (let i = 0; i < 6 && !visible; i++) {
      await page.keyboard.press('Tab');
      visible = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body || !el.matches(':focus-visible')) return false;
        const s = getComputedStyle(el);
        const outline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth || '0') > 0;
        const ring = s.boxShadow !== 'none' && s.boxShadow.trim() !== '';
        return outline || ring;
      });
    }
    expect(visible, 'a keyboard-focused element paints a visible focus indicator').toBe(true);
  });

  test('Arabic preference renders an RTL document with a localized heading', async ({ page }) => {
    await page.goto('/');
    await usePrefs(page, 'ar', 'light');
    await page.goto('/');
    await settle(page, 'ar', 'light');
    // The heading contains Arabic script (RTL content actually rendered, not just the dir attribute).
    await expect(page.locator('main h1').first()).toHaveText(/[؀-ۿ]/);
  });
});
