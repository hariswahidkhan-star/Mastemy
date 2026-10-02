import { defineConfig, devices } from '@playwright/test';
import { existsSync, readdirSync } from 'node:fs';

/**
 * The suite runs against an already running stack (see README / CI):
 *   API on :5080 (fresh database, Stripe pointed at fake-stripe.mjs), Vite on :5173, fake Stripe on :12111.
 * Locally a preinstalled Chromium under /opt/pw-browsers is used when present; CI installs one with
 * `npx playwright install chromium`.
 */
function localChromium(): string | undefined {
  if (process.env.CI) return undefined;
  const root = '/opt/pw-browsers';
  if (!existsSync(root)) return undefined;
  const dir = readdirSync(root).find((d) => /^chromium-\d+$/.test(d));
  const exe = dir ? `${root}/${dir}/chrome-linux/chrome` : undefined;
  return exe && existsSync(exe) ? exe : undefined;
}

/**
 * Chromium runs the full suite (it owns all the stateful full-stack journeys, which register users and
 * write to the shared database and are not safe to replay on a second engine in the same run). Firefox,
 * WebKit and a mobile viewport run only the read-only, anonymous cross-browser smoke spec
 * (tests/xbrowser.spec.ts) so the public site, keyboard focus, RTL and axe are verified on every engine
 * without 4x the full suite or cross-engine state collisions. The extra engines run in CI (and locally with
 * E2E_CROSS_BROWSER=1, once their browsers are installed); the default local run stays Chromium-only.
 */
const CROSS_BROWSER = process.env.CI === 'true' || process.env.E2E_CROSS_BROWSER === '1';
const SMOKE = /xbrowser\.spec\.ts$/;

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:5173',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { executablePath: localChromium() },
      },
    },
    ...(CROSS_BROWSER
      ? [
          { name: 'firefox', testMatch: SMOKE, use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', testMatch: SMOKE, use: { ...devices['Desktop Safari'] } },
          {
            name: 'mobile-chrome',
            testMatch: SMOKE,
            // Pixel 5 runs on the Chromium engine, so the preinstalled local binary serves it too
            // (CI installs its own and localChromium() returns undefined there).
            use: { ...devices['Pixel 5'], launchOptions: { executablePath: localChromium() } },
          },
        ]
      : []),
  ],
});
