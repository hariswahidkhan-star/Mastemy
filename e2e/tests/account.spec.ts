import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import type { Actor } from './helpers';
import {
  ADMIN,
  API,
  PASSWORD,
  apiLogin,
  email,
  enrollMfaInUi,
  grantRoles,
  lastMailId,
  linkPath,
  login,
  mfaEntry,
  newActor,
  nextTotp,
  waitForMail,
} from './helpers';

/**
 * Wave 3 account area through the real UI against the real API + MySQL, with email captured by the local SMTP
 * sink: onboarding, profile, email verification, password reset, forced MFA enrollment for privileged roles,
 * TOTP and recovery-code sign-in, sessions, skill profile, data export, account deletion and the public
 * instructor page.
 */

async function registerApi(request: APIRequestContext, name: string, mail: string) {
  const res = await request.post(`${API}/api/auth/register`, {
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ email: mail, password: PASSWORD, displayName: name, preferredLanguage: 'en' }),
  });
  expect(res.status()).toBe(200);
  return ((await res.json()) as { user: { id: string } }).user.id;
}

async function fillLogin(actor: Actor, mail: string, password = PASSWORD) {
  await actor.page.goto('/login');
  await actor.page.getByLabel('Email').fill(mail);
  await actor.page.getByLabel('Password').fill(password);
  await actor.page.getByRole('button', { name: 'Log in' }).click();
}

test.describe.serial('account: security, verification, profile and data rights', () => {
  let admin: Actor;
  let learner: Actor;
  const people = {
    learner: email('acclearner'),
    reviewer: email('accreviewer'),
    leaver: email('accleaver'),
    teacher: email('accteacher'),
  };
  const NEW_PASSWORD = 'Reset-Passw0rd-2026';
  let recoveryCodes: string[] = [];
  let teacherId = '';

  test.beforeAll(async ({ browser }) => {
    admin = await newActor(browser);
    learner = await newActor(browser);
  });

  test('registration leads to optional learning-goals onboarding, then profile settings', async () => {
    const page = learner.page;
    await page.goto('/register');
    await page.getByLabel('Display name').fill('Lina Learner');
    await page.getByLabel('Email').fill(people.learner);
    await page.getByLabel(/^Password/).fill(PASSWORD);
    await page.getByLabel('Confirm password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page).toHaveURL(/\/welcome$/);
    await expect(page.getByRole('heading', { name: 'Welcome to Mastemy' })).toBeVisible();
    await page.getByLabel('Your goals').fill('Move into a data-protection role within a year.');
    await page.getByLabel('Skills of interest').fill('GDPR, risk assessment, gdpr');
    await page.getByRole('button', { name: 'Save goals' }).click();
    await expect(page).toHaveURL(/\/me$/);

    // Goals are stored (duplicates removed by the server/client).
    await page.goto('/welcome');
    await expect(page.getByLabel('Skills of interest')).toHaveValue('GDPR, risk assessment');

    await page.goto('/me/profile');
    await expect(page.getByText('Not verified')).toBeVisible();
    await page.getByRole('textbox', { name: 'Headline' }).fill('Privacy analyst in training');
    await page.getByLabel('Time zone').selectOption('Europe/London');
    await page.getByRole('button', { name: 'Add link' }).click();
    await page.getByLabel('Link 1 label').fill('Portfolio');
    await page.getByLabel('Link 1 address').fill('http://insecure.example.com');
    await expect(page.getByText('Use an https address without a username or password.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();
    await page.getByLabel('Link 1 address').fill('https://portfolio.example.com/lina');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Profile saved.')).toBeVisible();
    await page.reload();
    await expect(page.getByRole('textbox', { name: 'Headline' })).toHaveValue('Privacy analyst in training');
    await expect(page.getByLabel('Time zone')).toHaveValue('Europe/London');
    await expect(page.getByLabel('Link 1 address')).toHaveValue('https://portfolio.example.com/lina');
  });

  test('email verification: banner, link from the captured email, banner disappears', async ({ request }) => {
    const page = learner.page;
    await page.goto('/me');
    await expect(page.getByText('Please verify your email address')).toBeVisible();
    const mail = await waitForMail(request, people.learner, /Confirm your Mastemy email/);
    await page.goto(linkPath(mail.body));
    await expect(page.getByRole('heading', { name: 'Confirm your email address' })).toBeVisible();
    await page.getByRole('button', { name: 'Confirm email address' }).click();
    await expect(page.getByText('Your email address is verified.')).toBeVisible();
    // The token is single use.
    await page.reload();
    await page.getByRole('button', { name: 'Confirm email address' }).click();
    await expect(page.getByText('This link is invalid or has expired.')).toBeVisible();
    await page.goto('/me');
    await expect(page.getByText('Please verify your email address')).toHaveCount(0);
  });

  test('skill profile shows evidence types and never claims verification', async () => {
    const page = learner.page;
    await page.goto('/me/skills');
    await expect(page.getByText('Mastemy does not verify skills')).toBeVisible();
    await expect(page.getByText('No skills yet')).toBeVisible();
    await page.getByLabel(/^Skill/).fill('Data mapping');
    await page.getByRole('button', { name: 'Add skill' }).click();
    await expect(page.getByText('Skill added.')).toBeVisible();
    await page.getByLabel(/^Skill/).fill('CIPP/E');
    await page.getByLabel('Evidence').selectOption('external_credential');
    await page.getByLabel(/^Issuer/).fill('IAPP');
    await page.getByLabel(/^Credential link/).fill('https://credentials.example.org/abc');
    await page.getByRole('button', { name: 'Add skill' }).click();
    const list = page.getByRole('list', { name: 'Your skills' });
    await expect(list.getByRole('listitem')).toHaveCount(2);
    await expect(list.getByText('Self-declared by the learner')).toBeVisible();
    await expect(
      list.getByText('External credential reported by the learner — not verified by Mastemy'),
    ).toBeVisible();
    const text = (await list.textContent()) ?? '';
    expect(text.replace(/not verified|unverified/gi, '')).not.toMatch(/verified/i);
    await page.getByRole('button', { name: 'Remove Data mapping' }).click();
    await expect(list.getByRole('listitem')).toHaveCount(1);
  });

  test('forgot / reset password: uniform message, emailed link, new password works once', async ({
    browser,
    request,
  }) => {
    const anon = await newActor(browser);
    const page = anon.page;
    await page.goto('/login');
    await page.getByRole('link', { name: 'Forgot your password?' }).click();
    await expect(page).toHaveURL(/\/forgot-password$/);
    // The URL changes before the lazily loaded reset page renders; until then 'Email' still resolves to the
    // sign-in form, so wait for the reset page itself before filling (CI race: the address went into the login field).
    await expect(page.getByRole('heading', { level: 1, name: 'Reset your password' })).toBeVisible();
    const uniform = 'If an account exists for that email address, a password reset link has been sent.';
    await page.getByLabel('Email').fill(email('nobody'));
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await expect(page.getByText(uniform)).toBeVisible();

    const before = await lastMailId(request, people.learner);
    await page.goto('/forgot-password');
    await expect(page.getByRole('heading', { level: 1, name: 'Reset your password' })).toBeVisible();
    await page.getByLabel('Email').fill(people.learner);
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await expect(page.getByText(uniform)).toBeVisible();
    const mail = await waitForMail(request, people.learner, /Reset your Mastemy password/, before);
    const path = linkPath(mail.body);
    await page.goto(path);
    await page.getByLabel(/^New password/).fill('short1');
    await page.getByLabel(/^Confirm password/).fill('short1');
    await page.getByRole('button', { name: 'Set new password' }).click();
    await expect(page.getByText('At least 10 characters, with a letter and a digit.').first()).toBeVisible();
    await page.getByLabel(/^New password/).fill(NEW_PASSWORD);
    await page.getByLabel(/^Confirm password/).fill(NEW_PASSWORD);
    await page.getByRole('button', { name: 'Set new password' }).click();
    await expect(page.getByText('Your password was changed')).toBeVisible();

    // The link is single use.
    await page.goto(path);
    await page.getByLabel(/^New password/).fill(NEW_PASSWORD + 'x1');
    await page.getByLabel(/^Confirm password/).fill(NEW_PASSWORD + 'x1');
    await page.getByRole('button', { name: 'Set new password' }).click();
    await expect(page.getByText('This link is invalid or has expired.')).toBeVisible();

    // Old password no longer works; the new one does.
    await fillLogin(anon, people.learner, PASSWORD);
    await expect(page.getByRole('alert').first()).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
    await login(page, people.learner, NEW_PASSWORD);
    await anon.context.close();
  });

  test('privileged role forces MFA enrollment in the UI: QR, key, code, recovery codes', async ({
    browser,
    request,
  }) => {
    await login(admin.page, ADMIN.email, ADMIN.password);
    await registerApi(request, 'Rafi Reviewer', people.reviewer);
    // Users & roles shows verification + MFA state; staff can resend or mark verified.
    await admin.page.goto('/admin/users');
    await admin.page.getByLabel('Search by name or email').fill(people.reviewer);
    await admin.page.getByRole('button', { name: 'Search' }).click();
    const row = admin.page.getByRole('row').filter({ hasText: people.reviewer });
    await expect(row.getByText('Email unverified')).toBeVisible();
    await expect(row.getByText('2FA off')).toBeVisible();
    await row.getByRole('button', { name: 'Resend verification' }).click();
    await expect(admin.page.getByText('Verification email queued.')).toBeVisible();
    await waitForMail(request, people.reviewer, /Confirm your Mastemy email/);
    await grantRoles(admin.page, people.reviewer, ['Reviewer']);

    const r = await newActor(browser);
    await fillLogin(r, people.reviewer);
    await expect(r.page.getByRole('heading', { name: 'Set up two-factor authentication' })).toBeVisible();
    await expect(r.page.getByText('Your role requires two-factor authentication.')).toBeVisible();
    recoveryCodes = await enrollMfaInUi(r.page, people.reviewer);
    expect(recoveryCodes).toHaveLength(10);
    expect(recoveryCodes[0]).toMatch(/^[A-Z0-9]{5}-[A-Z0-9]{5}$/);
    await expect(r.page).toHaveURL(/\/me$/);
    await r.page.goto('/admin/applications');
    await expect(r.page.getByRole('heading', { name: /applications/i }).first()).toBeVisible();

    await r.page.goto('/me/security');
    await expect(r.page.getByText('Required for your role')).toBeVisible();
    await expect(r.page.getByText('10 recovery codes left.')).toBeVisible();
    await expect(r.page.getByRole('button', { name: 'Turn off two-factor authentication' })).toHaveCount(0);
    await r.context.close();

    await admin.page.goto('/admin/users');
    await admin.page.getByLabel('Search by name or email').fill(people.reviewer);
    await admin.page.getByRole('button', { name: 'Search' }).click();
    await expect(row.getByText('2FA on')).toBeVisible();
    await expect(row.getByText('Email verified')).toBeVisible();
  });

  test('login with a TOTP code, then with a single-use recovery code', async ({ browser }) => {
    const a = await newActor(browser);
    await fillLogin(a, people.reviewer);
    await expect(a.page.getByRole('heading', { name: 'Two-factor verification' })).toBeVisible();
    await a.page.getByLabel(/^Authentication code/).fill('000000');
    await a.page.getByRole('button', { name: 'Verify' }).click();
    await expect(a.page.getByText('That code is not valid.')).toBeVisible();
    await a.page.getByLabel(/^Authentication code/).fill(await nextTotp(people.reviewer));
    await a.page.getByRole('button', { name: 'Verify' }).click();
    await expect(a.page).toHaveURL(/\/me$/);
    await a.context.close();

    const b = await newActor(browser);
    await fillLogin(b, people.reviewer);
    await b.page.getByRole('button', { name: 'Use a recovery code instead' }).click();
    await b.page.getByLabel(/^Recovery code/).fill(recoveryCodes[0].toLowerCase());
    await b.page.getByRole('button', { name: 'Verify' }).click();
    await expect(b.page).toHaveURL(/\/me$/);
    await b.page.goto('/me/security');
    await expect(b.page.getByText('9 recovery codes left.')).toBeVisible();
    await b.context.close();

    const c = await newActor(browser);
    await fillLogin(c, people.reviewer);
    await c.page.getByRole('button', { name: 'Use a recovery code instead' }).click();
    await c.page.getByLabel(/^Recovery code/).fill(recoveryCodes[0]);
    await c.page.getByRole('button', { name: 'Verify' }).click();
    await expect(c.page.getByText('That code is not valid.')).toBeVisible();
    await c.context.close();
  });

  test('sessions: list, revoke another device, sign out everywhere', async ({ browser }) => {
    const other = await newActor(browser);
    await login(other.page, people.reviewer);
    const here = await newActor(browser);
    await login(here.page, people.reviewer);
    await here.page.goto('/me/security');
    const table = here.page.getByRole('table', { name: 'Active sessions' });
    const rows = table.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(2);
    await expect(table.getByText('This device')).toHaveCount(1);
    await rows.filter({ hasNotText: 'This device' }).first().getByRole('button', { name: 'Revoke' }).click();
    await expect(here.page.getByText('Session revoked.')).toBeVisible();
    await expect(rows).toHaveCount(count - 1);

    await here.page.getByRole('button', { name: 'Sign out of all sessions' }).click();
    await here.page.getByRole('alertdialog').getByRole('button', { name: 'Sign out of all sessions' }).click();
    await expect(here.page).toHaveURL(/\/login$/);
    // The other device can no longer renew its session.
    await other.page.reload();
    await other.page.goto('/me/security');
    await expect(other.page).toHaveURL(/\/login/);
    await other.context.close();
    await here.context.close();
  });

  test('data export downloads a JSON file with the account sections', async () => {
    const page = learner.page;
    await login(page, people.learner, NEW_PASSWORD);
    await page.goto('/me/privacy');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download my data' }).click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/^mastemy-export-\d{8}\.json$/);
    const data = JSON.parse(await readFile((await download.path())!, 'utf8')) as Record<string, unknown>;
    expect(data.format).toBe('mastemy-account-export/v1');
    for (const k of ['account', 'profile', 'learningGoals', 'skills', 'orders', 'sessions'])
      expect(data).toHaveProperty(k);
    expect(JSON.stringify(data.account)).toContain(people.learner);
  });

  test('optional MFA from settings, then account deletion with DELETE, password and code', async ({
    browser,
    request,
  }) => {
    await registerApi(request, 'Leo Leaver', people.leaver);
    const l = await newActor(browser);
    await login(l.page, people.leaver);
    await l.page.goto('/me/security');
    await expect(l.page.getByText('Two-factor authentication is optional')).toBeVisible();
    await l.page.getByRole('button', { name: 'Turn on two-factor authentication' }).click();
    await enrollMfaInUi(l.page, people.leaver);
    await expect(l.page.getByText('Two-factor authentication is on.').first()).toBeVisible();
    expect(mfaEntry(people.leaver)?.secret).toBeTruthy();

    await l.page.goto('/me/privacy');
    await expect(l.page.getByText('Deletion is immediate and cannot be undone')).toBeVisible();
    await expect(l.page.getByText(/Retained for legal and financial obligations/)).toBeVisible();
    const del = l.page.getByRole('button', { name: 'Delete my account permanently' });
    await l.page.getByLabel(/^Type DELETE to confirm/).fill('delete');
    await l.page.getByLabel(/^Current password/).fill(PASSWORD);
    await l.page.getByLabel(/^Authentication code/).fill(await nextTotp(people.leaver));
    await expect(del).toBeDisabled();
    await l.page.getByLabel(/^Type DELETE to confirm/).fill('DELETE');
    await l.page.getByLabel(/^Current password/).fill('wrong-password-1');
    await del.click();
    await expect(l.page.getByText('The current password is incorrect.')).toBeVisible();
    await l.page.getByLabel(/^Current password/).fill(PASSWORD);
    await l.page.getByLabel(/^Authentication code/).fill(await nextTotp(people.leaver));
    await del.click();
    await expect(l.page.getByText('Your account was deleted.')).toBeVisible();
    await expect(l.page).toHaveURL(/\/$/);
    await l.context.close();

    // The account can no longer sign in.
    const res = await request.post(`${API}/api/auth/login`, {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ email: people.leaver, password: PASSWORD }),
    });
    expect(res.status()).toBe(401);
  });

  test('instructor publishes a profile; the public page merges directory and profile', async ({
    browser,
    request,
  }) => {
    teacherId = await registerApi(request, 'Tariq Teacher', people.teacher);
    const adminApi = await apiLogin(request, ADMIN.email, ADMIN.password);
    const put = await request.put(`${API}/api/admin/users/${teacherId}/roles`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminApi.accessToken}` },
      data: JSON.stringify({ roles: ['Student', 'Instructor'] }),
    });
    expect(put.status()).toBe(200);

    const anon = await newActor(browser);
    await anon.page.goto(`/instructors/${teacherId}`);
    await expect(anon.page.getByText('Instructor not found')).toBeVisible();

    const tch = await newActor(browser);
    await login(tch.page, people.teacher);
    await tch.page.goto('/me/profile');
    await tch.page.getByRole('textbox', { name: 'Headline' }).fill('Security engineer and educator');
    await tch.page.getByRole('textbox', { name: 'Biography' }).fill('Ten years of incident response.');
    await tch.page.getByLabel('Publish my instructor profile').check();
    await tch.page.getByRole('button', { name: 'Save' }).click();
    await expect(tch.page.getByText('Profile saved.')).toBeVisible();
    await tch.page.getByRole('link', { name: 'View public profile' }).click();
    await expect(tch.page.getByRole('heading', { name: 'Tariq Teacher' })).toBeVisible();
    await tch.context.close();

    await anon.page.reload();
    await expect(anon.page.getByRole('heading', { name: 'Tariq Teacher' })).toBeVisible();
    await expect(anon.page.getByText('Security engineer and educator')).toBeVisible();
    await expect(anon.page.getByText('Ten years of incident response.')).toBeVisible();
    await expect(anon.page.getByText('No live courses yet.')).toBeVisible();
    await anon.context.close();
  });
});
