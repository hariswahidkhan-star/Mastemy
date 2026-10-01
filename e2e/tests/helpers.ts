import { expect } from '@playwright/test';
import type { Browser, BrowserContext, Page } from '@playwright/test';
import { createHmac } from 'node:crypto';

export const API = process.env.E2E_API_URL ?? 'http://localhost:5080';
export const FAKE_STRIPE = process.env.E2E_FAKE_STRIPE_URL ?? 'http://localhost:12111';
export const WEBHOOK_SECRET = process.env.E2E_STRIPE_WEBHOOK_SECRET ?? 'whsec_e2e_secret';
export const ADMIN = { email: 'admin@mastemy.local', password: 'ChangeMe!Dev2026' };
export const PASSWORD = 'E2e-Passw0rd-2026';

export const run = Date.now().toString(36);
export const email = (who: string) => `${who}.${run}@e2e.mastemy.test`;

export interface Actor {
  context: BrowserContext;
  page: Page;
}

export async function newActor(browser: Browser): Promise<Actor> {
  const context = await browser.newContext();
  const page = await context.newPage();
  return { context, page };
}

export async function login(page: Page, mail: string, password = PASSWORD) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(mail);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/\/me$/);
}

export async function registerUser(page: Page, name: string, mail: string) {
  await page.goto('/register');
  await page.getByLabel('Display name').fill(name);
  await page.getByLabel('Email').fill(mail);
  await page.getByLabel(/^Password/).fill(PASSWORD);
  await page.getByLabel('Confirm password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page).toHaveURL(/\/me$/);
}

/** Admin UI: give a user extra roles via Users & roles. */
export async function grantRoles(admin: Page, mail: string, roles: string[]) {
  await admin.goto('/admin/users');
  await admin.getByLabel('Search by name or email').fill(mail);
  await admin.getByRole('button', { name: 'Search' }).click();
  const row = admin.getByRole('row').filter({ hasText: mail });
  await row.getByRole('button', { name: 'Edit roles' }).click();
  const dialog = admin.getByRole('dialog');
  for (const r of roles) await dialog.getByLabel(r, { exact: true }).check();
  await dialog.getByRole('button', { name: 'Save' }).click();
  await expect(admin.getByText('Roles updated.')).toBeVisible();
  await expect(row).toContainText(roles[0]);
}

/** Builds a Stripe-signed `checkout.session.completed` event for a fake-Stripe session. */
export function signedCheckoutCompleted(session: {
  id: string;
  amount_total: number;
  currency: string;
  metadata: { order_id: string };
  client_reference_id: string;
  payment_intent: string;
}) {
  const body = JSON.stringify({
    id: `evt_e2e_${Date.now()}`,
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        ...session,
        object: 'checkout.session',
        payment_status: 'paid',
        status: 'complete',
      },
    },
  });
  const t = Math.floor(Date.now() / 1000);
  const sig = createHmac('sha256', WEBHOOK_SECRET).update(`${t}.${body}`).digest('hex');
  return { body, header: `t=${t},v1=${sig}` };
}

/** Exact field label, tolerating the visual required-marker (" *") that follows required labels. */
export function label(text: string): RegExp {
  return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}( \\*)?$`);
}
