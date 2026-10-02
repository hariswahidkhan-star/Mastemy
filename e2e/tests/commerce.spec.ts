import { expect, test } from '@playwright/test';
import type { APIRequestContext, Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { createHmac } from 'node:crypto';
import type { Actor } from './helpers';
import {
  ADMIN,
  API,
  FAKE_STRIPE,
  PASSWORD,
  WEBHOOK_SECRET,
  apiLogin,
  email,
  label,
  login,
  newActor,
  run,
} from './helpers';

/**
 * Commerce (wave 3) through the real UI against the real API + MySQL, with Stripe replaced by
 * e2e/fake-stripe.mjs and every payment/subscription/dispute outcome delivered as a correctly signed webhook.
 *
 * Runs on the shared production-like stack started by scripts/e2e-all.sh, whose single configuration makes the
 * flows observable in one run (Payouts__MinimumAmount=1, Invoice__Seller* for PDF invoices); the refund window keeps
 * its 30-day default, so the payout test ages this instructor's ledger entries in MySQL (E2E_DB) to clear them.
 * Privileged sign-ins answer TOTP through the shared helpers.
 */

interface Json {
  [k: string]: unknown;
}

class Api {
  constructor(
    private request: APIRequestContext,
    public token = '',
  ) {}
  async call<T = Json>(method: string, path: string, body?: unknown, expected = [200, 201, 204]) {
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
  const res = await new Api(request).post<{ user: { id: string } }>('/api/auth/register', {
    email: mail,
    password: PASSWORD,
    displayName: name,
    preferredLanguage: 'en',
  });
  return res.user.id;
}

let evt = 0;
/** Posts a Stripe-signed event (HMAC-SHA256 over "{t}.{raw body}") to the API webhook endpoint. */
async function webhook(request: APIRequestContext, type: string, object: Json) {
  const body = JSON.stringify({
    id: `evt_commerce_${run}_${++evt}`,
    object: 'event',
    type,
    data: { object },
  });
  const t = Math.floor(Date.now() / 1000);
  const sig = createHmac('sha256', WEBHOOK_SECRET).update(`${t}.${body}`).digest('hex');
  const res = await request.post(`${API}/api/webhooks/stripe`, {
    headers: { 'Stripe-Signature': `t=${t},v1=${sig}`, 'Content-Type': 'application/json' },
    data: body,
  });
  expect(res.status(), await res.text()).toBe(200);
  return (await res.json()) as { status: string; detail?: string };
}

interface FakeSession {
  id: string;
  amount_total: number;
  currency: string;
  mode: string;
  client_reference_id: string;
  payment_intent: string;
  customer_email: string;
  metadata: { order_id?: string; subscription_id?: string };
}

async function sessionFromUrl(request: APIRequestContext, page: Page): Promise<FakeSession> {
  await expect(page).toHaveURL(/\/me\?checkout=success&session_id=/);
  // Let the returning page finish restoring the session (refresh-token rotation) before navigating on.
  await expect(page.getByText('Payment submitted')).toBeVisible();
  const id = new URL(page.url()).searchParams.get('session_id');
  const sessions = (await (await request.get(`${FAKE_STRIPE}/__test/sessions`)).json()) as FakeSession[];
  const s = sessions.find((x) => x.id === id);
  expect(s, `fake session ${id}`).toBeTruthy();
  return s!;
}

async function payCheckout(request: APIRequestContext, s: FakeSession) {
  const r = await webhook(request, 'checkout.session.completed', {
    ...s,
    object: 'checkout.session',
    payment_status: 'paid',
    status: 'complete',
  });
  expect(r.status).toBe('paid');
}

const ytId = (suffix: string) =>
  `c${run}${suffix}`.replace(/[^A-Za-z0-9_-]/g, '').padEnd(11, 'x').slice(0, 11);

test.describe.serial('commerce: coupons, scholarships, gifts, subscriptions, refunds, chargebacks, payouts', () => {
  let admin: Actor;
  let instructor: Actor;
  let buyer: Actor;
  const people = {
    instructor: email('cinstructor'),
    buyer: email('cbuyer'),
    scholar: email('cscholar'),
    giftee: email('cgiftee'),
    subscriber: email('csubscriber'),
    disputer: email('cdisputer'),
  };
  const courseTitle = `Commerce Analytics ${run}`;
  const legalName = `Iman Instructor ${run}`;
  let course = { id: '', slug: '' };
  let packageId = '';
  let orgId = '';
  let couponOrderId = '';
  let instructorUserId = '';
  const coupon = `SAVE20${run}`.toUpperCase();
  const scholarship = `SCHOLAR${run}`.toUpperCase();

  test.beforeAll(async ({ browser }) => {
    admin = await newActor(browser);
    instructor = await newActor(browser);
    buyer = await newActor(browser);
  });

  test('setup over the API: users, a published course and an approved $40 study package', async ({
    request,
  }) => {
    const { api: adminApi } = await signIn(request, ADMIN.email, ADMIN.password);
    const instructorId = await registerApi(request, 'Iman Instructor', people.instructor);
    instructorUserId = instructorId;
    for (const who of ['buyer', 'scholar', 'giftee', 'subscriber', 'disputer'] as const)
      await registerApi(request, `E2E ${who}`, people[who]);
    await adminApi.put(`/api/admin/users/${instructorId}/roles`, { roles: ['Student', 'Instructor'] });
    const channel = await adminApi.post<{ id: string }>('/api/admin/youtube/channels', {
      channelId: `UC${`cm${run}`.padEnd(22, 'z').slice(0, 22)}`,
      title: `Mastemy Commerce ${run}`,
      mode: 'MastemyManaged',
    });
    const { api: inst } = await signIn(request, people.instructor);
    // Staff (the seeded SuperAdmin, a different person from the author) review and publish.
    const reviewer = adminApi;
    const categories = await inst.get<{ id: number }[]>('/api/categories');
    const c = await inst.post<{ id: string; slug: string }>('/api/studio/courses', {
      title: courseTitle,
      subtitle: 'Commerce end-to-end course',
      description: 'A course used by the commerce end-to-end suite. Videos are free on YouTube.',
      audience: 'Analysts',
      prerequisites: '',
      outcomes: ['Read a dashboard', 'Explain a metric', 'Report findings'],
      language: 'en',
      level: 'Beginner',
      categoryIds: [categories[0].id],
    });
    course = { id: c.id, slug: c.slug };
    const m = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/modules`, { title: 'Basics' });
    const l = await inst.post<{ id: string }>(`/api/studio/modules/${m.id}/lessons`, {
      title: 'Metrics that matter',
      objective: 'Understand the basics.',
      isPreview: true,
    });
    const video = await inst.post<{ id: string }>(`/api/studio/lessons/${l.id}/video`, {
      url: `https://youtu.be/${ytId('A')}`,
      channelId: channel.id,
      rightsDeclared: true,
      rightsDeclarationText: 'I confirm I own or am licensed to use this video.',
      title: `Commerce video ${run}`,
      durationSeconds: 300,
    });
    await reviewer.post(`/api/admin/youtube/videos/${video.id}/confirm`, { approve: true });
    await inst.post(`/api/studio/courses/${c.id}/submit`);
    await reviewer.post(`/api/review/courses/${c.id}/decision`, { decision: 'Approve' });
    await adminApi.post(`/api/admin/courses/${c.id}/publish`);
    const pkg = await inst.post<{ id: string }>(`/api/studio/courses/${c.id}/packages`, {
      title: 'Analytics study pack',
      contents: 'Premium lesson notes\nPractice question bank\nTimed mock exam',
      price: 40,
      currency: 'USD',
      accessDays: 365,
    });
    await adminApi.post(`/api/admin/packages/${pkg.id}/decision`, { decision: 'Approve' });
    packageId = pkg.id;

    // The scholarship is restricted to members of an organization the scholar has joined.
    const org = await adminApi.post<{ id: string }>('/api/admin/orgs', {
      name: `Scholarship Org ${run}`,
      slug: `scholar-org-${run}`,
      seatLimit: 10,
    });
    orgId = org.id;
    const invite = await adminApi.post<{ token: string }>(`/api/orgs/${org.id}/members`, {
      email: people.scholar,
    });
    const { api: scholarApi } = await signIn(request, people.scholar);
    await scholarApi.post('/api/org-invitations/accept', { token: invite.token });
  });

  test('instructor manages coupons within the policy cap and creates a scholarship that awaits approval', async () => {
    const page = instructor.page;
    await login(page, people.instructor);
    await page.goto('/studio/commerce');
    await expect(page.getByText('Instructor coupons are capped')).toBeVisible();
    const form = page.locator('form').filter({ has: page.getByRole('heading', { name: 'New coupon' }) });

    // Above the policy cap: the server refuses and states the limit.
    await form.getByLabel(label('Code')).fill(`TOOMUCH${run}`);
    await form.getByLabel(label('Percent off')).fill('60');
    await form.getByLabel(label('Course or package')).selectOption({ label: courseTitle });
    await form.getByRole('button', { name: 'Create coupon' }).click();
    await expect(form.getByText(/at most 50% off/)).toBeVisible();

    await form.getByLabel(label('Code')).fill(coupon);
    await form.getByLabel(label('Percent off')).fill('20');
    await form.getByRole('button', { name: 'Create coupon' }).click();
    await expect(page.getByText(`Coupon ${coupon} is active.`)).toBeVisible();

    await form.getByLabel(label('Type')).selectOption('Scholarship');
    await form.getByLabel(label('Code')).fill(scholarship);
    await form.getByLabel(label('Course or package')).selectOption({ label: courseTitle });
    await form.getByLabel('Organization ID').fill(orgId);
    await form.getByRole('button', { name: 'Create coupon' }).click();
    await expect(page.getByText(`Coupon ${scholarship} is waiting for staff approval.`)).toBeVisible();
    await expect(page.getByRole('row').filter({ hasText: scholarship })).toContainText('Pending approval');
  });

  test('instructor creates a referral link; the course page captures ?ref= into checkout', async () => {
    const page = instructor.page;
    await page.goto('/studio/commerce');
    await page.getByRole('tab', { name: 'Referral links' }).click();
    const section = page.getByRole('region', { name: courseTitle });
    await section.getByLabel('Code (optional)').fill(`REF${run}`.toUpperCase());
    await section.getByRole('button', { name: 'Create link' }).click();
    const ref = `REF${run}`.toUpperCase();
    await expect(section.getByRole('textbox', { name: `Referral link ${ref}` })).toHaveValue(
      new RegExp(`/courses/${course.slug}\\?ref=${ref}$`),
    );
  });

  test('coupon applied at checkout changes the server quote and the amount sent to Stripe', async ({
    request,
  }) => {
    const page = buyer.page;
    await login(page, people.buyer);
    await page.goto(`/courses/${course.slug}`);
    await page.getByRole('button', { name: 'Buy package' }).click();
    await expect(page).toHaveURL(new RegExp(`/checkout/package/${packageId}$`));
    await expect(page.getByText('All video lessons are free to watch on YouTube')).toBeVisible();
    const quote = page.getByTestId('quote');
    await expect(quote.getByTestId('price')).toHaveText('$40.00');

    await page.getByLabel('Coupon code').fill('NOT-A-CODE');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText('This coupon code is not valid.')).toBeVisible();

    await page.getByLabel('Coupon code').fill(coupon.toLowerCase());
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByText(`Coupon ${coupon.toLowerCase()} applied.`)).toBeVisible();
    await expect(quote).toContainText('−$8.00');
    await expect(quote.getByTestId('price')).toHaveText('$32.00');

    await page.getByRole('button', { name: 'Continue to payment' }).click();
    const s = await sessionFromUrl(request, page);
    expect(s.amount_total).toBe(3200);
    couponOrderId = s.metadata.order_id!;
    await payCheckout(request, s);

    await page.goto('/me/orders');
    const row = page.locator(`tr[data-order-id="${couponOrderId}"]`);
    await expect(row).toContainText('$32.00');
    await expect(row).toContainText('Paid');
    const inv = page.getByRole('row').filter({ hasText: /INV-\d{4}-\d{6}/ });
    await expect(inv).toHaveCount(1);
    const download = page.waitForEvent('download');
    await inv.getByRole('button', { name: /^Download INV-/ }).click();
    expect((await download).suggestedFilename()).toMatch(/^INV-\d{4}-\d{6}\.pdf$/);
  });

  test('scholarship: a second person approves it, then the eligible learner checks out for free', async () => {
    const page = admin.page;
    await login(page, ADMIN.email, ADMIN.password);
    await page.goto('/admin/commerce');
    await expect(page.getByRole('link', { name: 'Finance console' })).toBeVisible();
    await page.getByRole('tab', { name: 'Coupons & scholarships' }).click();
    await expect(page.getByText('Second-person rule')).toBeVisible();
    await page.getByRole('button', { name: `Approve ${scholarship}` }).click();
    await expect(page.getByText(`Coupon ${scholarship} updated.`)).toBeVisible();
    await expect(page.getByRole('row').filter({ hasText: scholarship })).toContainText('Active');

    const ctx = await page.context().browser()!.newContext();
    const learner = await ctx.newPage();
    await login(learner, people.scholar);
    await learner.goto(`/checkout/package/${packageId}`);
    await learner.getByLabel('Coupon code').fill(scholarship);
    await learner.getByRole('button', { name: 'Apply' }).click();
    await expect(learner.getByTestId('quote').getByTestId('price')).toHaveText('$0.00');
    await expect(learner.getByText('Nothing to pay')).toBeVisible();
    await learner.getByRole('button', { name: 'Confirm order' }).click();
    await expect(learner).toHaveURL(/\/me\/orders\?paid=/);
    await expect(learner.getByText('Order complete')).toBeVisible();
    await expect(learner.getByRole('row').filter({ hasText: 'Analytics study pack' })).toContainText('Paid');
    await ctx.close();
  });

  test('gift: buy as a gift, reveal the code once, and another learner redeems it', async ({
    request,
  }) => {
    const page = buyer.page;
    await page.goto(`/courses/${course.slug}`);
    await page.getByRole('button', { name: 'Give as a gift' }).click();
    await expect(page.getByLabel('Buy this as a gift')).toBeChecked();
    await expect(page.getByTestId('quote').getByTestId('price')).toHaveText('$40.00');
    await page.getByRole('button', { name: 'Continue to payment' }).click();
    const s = await sessionFromUrl(request, page);
    expect(s.amount_total).toBe(4000);
    await payCheckout(request, s);

    await page.goto('/me/orders');
    const row = page.locator(`tr[data-order-id="${s.metadata.order_id}"]`);
    await row.getByRole('button', { name: 'Gift code' }).click();
    await page.getByRole('button', { name: 'Show code now' }).click();
    const code = (await page.getByTestId('gift-code').textContent())!.trim();
    expect(code.length).toBeGreaterThanOrEqual(8);
    await page.keyboard.press('Escape');
    // Shown only once.
    await row.getByRole('button', { name: 'Gift code' }).click();
    await page.getByRole('button', { name: 'Show code now' }).click();
    await expect(page.getByText('The gift code was already shown once')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();

    const ctx = await page.context().browser()!.newContext();
    const giftee = await ctx.newPage();
    await login(giftee, people.giftee);
    await giftee.goto('/gift/redeem');
    await giftee.getByLabel(label('Gift code')).fill(code);
    await giftee.getByRole('button', { name: 'Redeem' }).click();
    await expect(giftee.getByText('Gift redeemed')).toBeVisible();
    await giftee.goto('/gift/redeem');
    await giftee.getByLabel(label('Gift code')).fill(code);
    await giftee.getByRole('button', { name: 'Redeem' }).click();
    await expect(giftee.getByText('This gift has already been redeemed.')).toBeVisible();
    await ctx.close();
  });

  test('subscription: staff create a plan; subscribe → Stripe → entitlement → cancel at period end', async ({
    request,
  }) => {
    const page = admin.page;
    await page.goto('/admin/commerce');
    const form = page.locator('form').filter({ has: page.getByRole('heading', { name: 'New plan' }) });
    await form.getByLabel(label('Code')).fill(`PRO${run}`.toUpperCase());
    await form.getByLabel(label('Name')).fill(`Pro Study ${run}`);
    await form.getByLabel(label('Price')).fill('15');
    await form.getByLabel(label('AI allowance per period')).fill('100');
    await form.getByLabel(label('Included services')).fill('Premium lesson notes\nTimed mock exams');
    await form.getByRole('button', { name: 'Create plan' }).click();
    await expect(page.getByText('Plan created.')).toBeVisible();

    const ctx = await page.context().browser()!.newContext();
    const sub = await ctx.newPage();
    await login(sub, people.subscriber);
    await sub.goto('/plans');
    const card = sub.getByRole('article', { name: `Pro Study ${run}` });
    await expect(card).toContainText('$15.00 / month');
    await expect(card).toContainText('AI allowance: 100 requests per billing period');
    await expect(card).toContainText('Timed mock exams');
    await expect(sub.getByText('All video lessons are free to watch on YouTube')).toBeVisible();
    await card.getByRole('button', { name: 'Subscribe' }).click();
    const s = await sessionFromUrl(request, sub);
    expect(s.mode).toBe('subscription');
    const localId = s.metadata.subscription_id!;
    const providerSub = `sub_e2e_${run}`;
    expect(
      (
        await webhook(request, 'checkout.session.completed', {
          id: s.id,
          object: 'checkout.session',
          mode: 'subscription',
          subscription: providerSub,
          customer: `cus_e2e_${run}`,
          metadata: { subscription_id: localId },
        })
      ).status,
    ).toBe('subscription_linked');
    const now = Math.floor(Date.now() / 1000);
    expect(
      (
        await webhook(request, 'customer.subscription.created', {
          id: providerSub,
          object: 'subscription',
          status: 'active',
          customer: `cus_e2e_${run}`,
          cancel_at_period_end: false,
          current_period_start: now,
          current_period_end: now + 30 * 86400,
          metadata: { subscription_id: localId },
        })
      ).status,
    ).toBe('subscription_active');

    const { api } = await signIn(request, people.subscriber);
    const dash = await api.get<{ entitlements: { course: { id: string }; source: string; isActive: boolean }[] }>(
      '/api/me/dashboard',
    );
    expect(
      dash.entitlements.some((e) => e.course.id === course.id && e.source === 'Subscription' && e.isActive),
    ).toBeTruthy();

    await sub.goto('/me');
    const panel = sub.getByTestId('subscription');
    await expect(panel).toContainText(`Pro Study ${run}`);
    await expect(panel).toContainText('Active');
    await expect(panel).toContainText(/Renews on /);
    await panel.getByRole('button', { name: 'Cancel at period end' }).click();
    await sub.getByRole('alertdialog').getByRole('button', { name: 'Confirm cancellation' }).click();
    await expect(sub.getByText('Your subscription will end at the end of the period.')).toBeVisible();
    await expect(panel).toContainText(/Cancelled — access continues until /);
    const subs = (await (await request.get(`${FAKE_STRIPE}/__test/subscriptions`)).json()) as {
      id: string;
      cancel_at_period_end: boolean;
    }[];
    expect(subs.find((x) => x.id === providerSub)?.cancel_at_period_end).toBe(true);
    // Access continues until the period end.
    const after = await api.get<{ entitlements: { course: { id: string }; source: string; isActive: boolean }[] }>(
      '/api/me/dashboard',
    );
    expect(after.entitlements.some((e) => e.source === 'Subscription' && e.isActive)).toBeTruthy();
    await ctx.close();
  });

  test('finance issues a partial refund; the buyer sees a credit note', async ({ request }) => {
    const page = admin.page;
    await page.goto('/admin/finance');
    await page.getByLabel(label('Order ID')).fill(couponOrderId);
    await page.getByLabel(label('Refund amount')).fill('10');
    await page.getByLabel(label('Reason')).fill('Partial goodwill refund');
    await page.getByRole('button', { name: 'Issue refund' }).click();
    await expect(page.getByText('Refund of $10.00 completed; credit note issued.')).toBeVisible();
    // More than what remains is refused.
    await page.getByLabel(label('Order ID')).fill(couponOrderId);
    await page.getByLabel(label('Refund amount')).fill('30');
    await page.getByLabel(label('Reason')).fill('Too much');
    await page.getByRole('button', { name: 'Issue refund' }).click();
    await expect(page.getByText('The amount is more than what remains refundable on this order.')).toBeVisible();
    const refunds = (await (await request.get(`${FAKE_STRIPE}/__test/refunds`)).json()) as { amount: number }[];
    expect(refunds.some((r) => r.amount === 1000)).toBeTruthy();

    const buyerPage = buyer.page;
    await buyerPage.goto('/me/orders');
    const credit = buyerPage.getByRole('row').filter({ hasText: /CN-\d{4}-\d{6}/ });
    await expect(credit).toContainText('Credit note');
    await expect(credit).toContainText('$10.00');
  });

  test('chargeback lost: a referred full-price purchase is disputed and the entitlement is revoked', async ({
    request,
  }) => {
    const ctx = await admin.page.context().browser()!.newContext();
    const page = await ctx.newPage();
    await login(page, people.disputer);
    const ref = `REF${run}`.toUpperCase();
    await page.goto(`/courses/${course.slug}?ref=${ref}`);
    await page.getByRole('button', { name: 'Buy package' }).click();
    await expect(page.getByText(`Referral code ${ref} will be credited to the instructor.`)).toBeVisible();
    await expect(page.getByTestId('quote').getByTestId('price')).toHaveText('$40.00');
    await page.getByRole('button', { name: 'Continue to payment' }).click();
    const s = await sessionFromUrl(request, page);
    await payCheckout(request, s);

    const { api } = await signIn(request, people.disputer);
    type Dash = { entitlements: { course: { id: string }; source: string }[] };
    expect((await api.get<Dash>('/api/me/dashboard')).entitlements.some((e) => e.course.id === course.id)).toBe(true);

    const dispute = {
      id: `dp_e2e_${run}`,
      object: 'dispute',
      payment_intent: s.payment_intent,
      amount: 4000,
      currency: 'usd',
      reason: 'fraudulent',
    };
    expect((await webhook(request, 'charge.dispute.created', { ...dispute, status: 'needs_response' })).status).toBe(
      'dispute_opened',
    );
    expect((await webhook(request, 'charge.dispute.closed', { ...dispute, status: 'lost' })).status).toBe(
      'dispute_lost',
    );
    expect((await api.get<Dash>('/api/me/dashboard')).entitlements.some((e) => e.course.id === course.id)).toBe(false);

    const adminPage = admin.page;
    await adminPage.goto('/admin/finance');
    await adminPage.getByRole('tab', { name: 'Chargebacks' }).click();
    await expect(adminPage.getByRole('row').filter({ hasText: dispute.id })).toContainText('Lost');
    await adminPage.getByRole('tab', { name: 'Reconciliation' }).click();
    await expect(adminPage.getByRole('columnheader', { name: 'Sales difference' })).toBeVisible();
    await ctx.close();
  });

  test('payouts: masked IBAN profile, verified tax form, payout request, then a finance batch', async () => {
    const page = instructor.page;
    // Earnings clear only after the refund window (production default: 30 days). Age this instructor's ledger
    // entries in the database instead of shortening the window for the whole stack.
    execFileSync('mysql', [
      `-h${process.env.MYSQL_HOST ?? '127.0.0.1'}`,
      `-u${process.env.MYSQL_USER ?? 'mastemy'}`,
      `-p${process.env.MYSQL_PASSWORD ?? 'mastemy_dev_pw'}`,
      process.env.E2E_DB ?? 'mastemy_e2e',
      '-e',
      `UPDATE CommissionLedger SET CreatedAt = CreatedAt - INTERVAL 31 DAY WHERE InstructorId = '${instructorUserId}';`,
    ]);
    await page.goto('/studio/payouts');
    await expect(page.getByText('You have not set up a payout profile.')).toBeVisible();
    await page.getByLabel(label('Legal name')).fill(legalName);
    await page.getByLabel(label('Country')).fill('DE');
    await page.getByLabel(label('IBAN')).fill('DE89 3704 0044 0532 0130 00');
    await page.getByLabel('I have submitted my tax form').check();
    await page.getByRole('button', { name: 'Save profile' }).click();
    await expect(page.getByText('Payout profile saved.')).toBeVisible();
    const masked = page.getByTestId('masked-destination');
    await expect(masked).toContainText('3000');
    await expect(masked).not.toContainText('3704 0044');
    await expect(page.getByText('Submitted', { exact: true })).toBeVisible();

    // Not verified yet: the server refuses the request.
    const usd = page.getByRole('row').filter({ hasText: 'USD' });
    await usd.getByRole('button', { name: 'Request payout' }).click();
    await expect(page.getByText('Complete your payout profile and have your tax form verified first.')).toBeVisible();

    const fin = admin.page;
    await fin.goto('/admin/finance');
    await fin.getByRole('tab', { name: 'Payouts' }).click();
    await fin.getByLabel(`Tax form status for ${legalName}`).selectOption('Verified');
    await expect(fin.getByLabel(`Tax form status for ${legalName}`)).toHaveValue('Verified');

    await page.reload();
    await page.getByRole('row').filter({ hasText: 'USD' }).getByRole('button', { name: 'Request payout' }).click();
    const toast = page.getByText(/^Payout of \$[\d.,]+ requested\.$/);
    await expect(toast).toBeVisible();
    const amount = /\$[\d.,]+/.exec((await toast.textContent())!)![0];
    await expect(page.getByRole('row').filter({ hasText: 'Requested' })).toHaveCount(1);

    // Monthly statement for the current month.
    await page.getByLabel('Month', { exact: true }).selectOption(String(new Date().getUTCMonth() + 1));
    await page.getByLabel('Year', { exact: true }).fill(String(new Date().getUTCFullYear()));
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download CSV' }).click();
    expect((await download).suggestedFilename()).toMatch(/^statement-\d{4}-\d{2}\.csv$/);

    await fin.reload();
    await fin.getByRole('tab', { name: 'Payouts' }).click();
    await fin.getByRole('checkbox', { name: `Select payout request of ${amount}` }).last().check();
    await fin.getByRole('button', { name: 'Create payout batch (1)' }).click();
    await expect(fin.getByText('Draft payout batch created.')).toBeVisible();
    await expect(fin.getByText('In batch').first()).toBeVisible();

    await page.reload();
    await expect(page.getByRole('row').filter({ hasText: 'In batch' })).toHaveCount(1);
  });
});
