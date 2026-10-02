import { expect, test } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";
import type { Actor } from "./helpers";
import {
  ADMIN,
  API,
  FAKE_STRIPE,
  PASSWORD,
  apiLogin,
  email,
  label,
  login,
  newActor,
  run,
  signedCheckoutCompleted,
} from "./helpers";

/**
 * Final wave B: staff category admin, the Finance order browser, enterprise seats (request → staff order → paid),
 * org-private materials, assigned pathways and OIDC single sign-on through a local fake identity provider,
 * all through the real UI against the real API + MySQL. Scaffolding (users, course, pathway, org) uses the API.
 *
 * Needs its own stack (privileged logins keep MFA; the TOTP helpers answer it):
 *
 *   FAKE_OIDC_PORT=12592 node e2e/fake-oidc.mjs
 *   FAKE_STRIPE_PORT=12492 node e2e/fake-stripe.mjs
 *   E2E_DB=mastemy_e2e_finalb API_PORT=5492 WEB_PORT=5392 FAKE_STRIPE_PORT=12492 \
 *   SMTP_SINK_PORT=2592 SMTP_SINK_HTTP_PORT=2692 \
 *   Sso__RedirectUri=http://localhost:5492/api/sso/callback Sso__CompletionUrl=http://localhost:5392/sso/complete \
 *   Sso__AllowInsecureHttp=true e2e/start-api.sh
 *   (cd src/web && API_PROXY_TARGET=http://localhost:5492 npx vite --port 5392 --strictPort)
 *   cd e2e && E2E_FINALB_STACK=1 E2E_BASE_URL=http://localhost:5392 E2E_API_URL=http://localhost:5492 \
 *     E2E_FAKE_STRIPE_URL=http://localhost:12492 E2E_SMTP_SINK_URL=http://localhost:2692 \
 *     E2E_FAKE_OIDC_URL=http://localhost:12592 npx playwright test finalb.spec.ts
 */
test.skip(
  !process.env.E2E_FINALB_STACK,
  "needs the finalb API instance with Sso__* (see header comment)",
);

const OIDC = process.env.E2E_FAKE_OIDC_URL ?? "http://localhost:12592";
const OIDC_CLIENT = "mastemy-e2e";
const OIDC_SECRET = "e2e-oidc-secret";
const SSO_DOMAIN = `sso${run}.e2e.test`;

interface Json {
  [k: string]: unknown;
}

class Api {
  constructor(
    private request: APIRequestContext,
    public token = "",
  ) {}
  async call<T = Json>(
    method: string,
    path: string,
    body?: unknown,
    expected = [200, 201, 204],
  ) {
    const res = await this.request.fetch(`${API}${path}`, {
      method,
      headers: {
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      data: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    if (!expected.includes(res.status()))
      throw new Error(
        `${method} ${path} -> ${res.status()}: ${text.slice(0, 400)}`,
      );
    return (text ? JSON.parse(text) : undefined) as T;
  }
  get = <T = Json>(p: string) => this.call<T>("GET", p);
  post = <T = Json>(p: string, b?: unknown) => this.call<T>("POST", p, b ?? {});
  put = <T = Json>(p: string, b?: unknown) => this.call<T>("PUT", p, b ?? {});
}

async function signIn(
  request: APIRequestContext,
  mail: string,
  password = PASSWORD,
) {
  const res = await apiLogin(request, mail, password);
  return { api: new Api(request, res.accessToken), userId: res.user.id };
}

async function registerApi(
  request: APIRequestContext,
  name: string,
  mail: string,
) {
  const res = await new Api(request).post<{ user: { id: string } }>(
    "/api/auth/register",
    {
      email: mail,
      password: PASSWORD,
      displayName: name,
      preferredLanguage: "en",
    },
  );
  return res.user.id;
}

const ytId = (suffix: string) =>
  `f${run}${suffix}`
    .replace(/[^A-Za-z0-9_-]/g, "")
    .padEnd(11, "x")
    .slice(0, 11);

// A minimal valid PDF (the upload pipeline checks magic bytes).
const PDF = Buffer.from(
  "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n" +
    "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n",
);

test.describe
  .serial("final wave B: categories, orders, enterprise seats, materials, pathways, SSO", () => {
  let admin: Actor;
  let orgAdmin: Actor;
  let member: Actor;
  const people = {
    instructor: email("fbinstructor"),
    buyer: email("fbbuyer"),
    orgAdmin: email("fborgadmin"),
    member: email("fbmember"),
    outsider: email("fboutsider"),
  };
  const courseTitle = `FinalB Course ${run}`;
  const pathwayTitle = `FinalB Pathway ${run}`;
  const orgName = `FinalB Org ${run}`;
  const orgSlug = `finalb-${run}`;
  let course = { id: "", slug: "" };
  let courseCategory = { id: 0, nameEn: "" };
  let packageId = "";
  let orgId = "";
  let paidOrderId = "";

  test.beforeAll(async ({ browser }) => {
    admin = await newActor(browser);
    orgAdmin = await newActor(browser);
    member = await newActor(browser);
  });

  test("setup over the API: course + package, published pathway, organization with an admin and a member", async ({
    request,
  }) => {
    const { api: adminApi } = await signIn(
      request,
      ADMIN.email,
      ADMIN.password,
    );
    const instructorId = await registerApi(
      request,
      "Fatima Instructor",
      people.instructor,
    );
    await registerApi(request, "FinalB Buyer", people.buyer);
    await registerApi(request, "FinalB OrgAdmin", people.orgAdmin);
    await registerApi(request, "FinalB Member", people.member);
    await registerApi(request, "FinalB Outsider", people.outsider);
    await adminApi.put(`/api/admin/users/${instructorId}/roles`, {
      roles: ["Student", "Instructor"],
    });
    const channel = await adminApi.post<{ id: string }>(
      "/api/admin/youtube/channels",
      {
        channelId: `UC${`fb${run}`.padEnd(22, "q").slice(0, 22)}`,
        title: `Mastemy FinalB ${run}`,
        mode: "MastemyManaged",
      },
    );
    const { api: inst } = await signIn(request, people.instructor);
    const categories =
      await inst.get<
        { id: number; nameEn: string; parentId: number | null; slug: string }[]
      >("/api/categories");
    // A seeded top-level category (earlier runs may have left test subcategories behind).
    courseCategory = categories.find(
      (x) => x.parentId === null && !x.slug.startsWith("finalb-"),
    )!;
    const c = await inst.post<{ id: string; slug: string }>(
      "/api/studio/courses",
      {
        title: courseTitle,
        subtitle: "Final wave B course",
        description:
          "A course used by the final wave B end-to-end suite. Videos are free on YouTube.",
        audience: "Teams",
        prerequisites: "",
        outcomes: ["Learn one", "Learn two", "Learn three"],
        language: "en",
        level: "Beginner",
        categoryIds: [courseCategory.id],
      },
    );
    course = { id: c.id, slug: c.slug };
    const m = await inst.post<{ id: string }>(
      `/api/studio/courses/${c.id}/modules`,
      { title: "Basics" },
    );
    const l = await inst.post<{ id: string }>(
      `/api/studio/modules/${m.id}/lessons`,
      {
        title: "First lesson",
        objective: "Understand the basics.",
        isPreview: true,
      },
    );
    const video = await inst.post<{ id: string }>(
      `/api/studio/lessons/${l.id}/video`,
      {
        url: `https://youtu.be/${ytId("A")}`,
        channelId: channel.id,
        rightsDeclared: true,
        rightsDeclarationText:
          "I confirm I own or am licensed to use this video.",
        title: `FinalB video ${run}`,
        durationSeconds: 300,
      },
    );
    await adminApi.post(`/api/admin/youtube/videos/${video.id}/confirm`, {
      approve: true,
    });
    await inst.post(`/api/studio/courses/${c.id}/submit`);
    await adminApi.post(`/api/review/courses/${c.id}/decision`, {
      decision: "Approve",
    });
    await adminApi.post(`/api/admin/courses/${c.id}/publish`);
    const pkg = await inst.post<{ id: string }>(
      `/api/studio/courses/${c.id}/packages`,
      {
        title: "FinalB study pack",
        contents: "Premium lesson notes\nPractice question bank",
        price: 30,
        currency: "USD",
        accessDays: 365,
      },
    );
    await adminApi.post(`/api/admin/packages/${pkg.id}/decision`, {
      decision: "Approve",
    });
    packageId = pkg.id;

    await adminApi.post("/api/admin/pathways", {
      slug: `finalb-path-${run}`,
      titleEn: pathwayTitle,
      titleAr: pathwayTitle,
      descriptionEn: "Pathway for the final wave B suite.",
      descriptionAr: "",
      level: "Beginner",
      categoryId: null,
      isPublished: true,
      sortOrder: 0,
      courseIds: [c.id],
      skillCodes: [],
    });

    const org = await adminApi.post<{ id: string }>("/api/admin/orgs", {
      name: orgName,
      slug: orgSlug,
      seatLimit: 3,
    });
    orgId = org.id;
    for (const [who, role, department] of [
      ["orgAdmin", "Admin", ""],
      ["member", "Member", "Sales"],
    ] as const) {
      const invite = await adminApi.post<{ token: string }>(
        `/api/orgs/${org.id}/members`,
        {
          email: people[who],
          role,
          department,
        },
      );
      const { api } = await signIn(request, people[who]);
      await api.post("/api/org-invitations/accept", { token: invite.token });
    }
  });

  test("staff create a category in the tree editor; deleting one that has courses explains the 409", async () => {
    const page = admin.page;
    await login(page, ADMIN.email, ADMIN.password);
    await page.goto("/admin/categories");
    await expect(
      page.getByRole("heading", { name: "Categories", level: 1 }),
    ).toBeVisible();
    await page.getByRole("button", { name: "New category" }).click();
    const dialog = page.getByRole("dialog");
    // Client-side check mirrors the server's slug rule before anything is sent.
    await dialog.getByLabel(label("Slug")).fill("Bad Slug");
    await dialog.getByLabel(label("Name (English)")).fill(`FinalB Cat ${run}`);
    await dialog.getByLabel(label("Name (Arabic)")).fill(`تصنيف ${run}`);
    await dialog.getByRole("button", { name: "Save" }).click();
    await expect(dialog.getByText(/Use 1–100 lowercase letters/)).toBeVisible();
    await dialog.getByLabel(label("Slug")).fill(`finalb-cat-${run}`);
    await dialog
      .getByLabel("Parent")
      .selectOption({ label: courseCategory.nameEn });
    await dialog.getByLabel("Academy").check();
    await dialog.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Category saved")).toBeVisible();
    const created = page.locator(`[data-category-slug="finalb-cat-${run}"]`);
    await expect(created).toContainText(`FinalB Cat ${run}`);
    await expect(created).toContainText("Academy");

    // The course's category still has courses (and now a subcategory): 409 with an explanation.
    const used = page
      .locator("li[data-category-slug]")
      .filter({ hasText: courseCategory.nameEn })
      .first();
    await used.getByRole("button", { name: "Delete" }).click();
    const confirm = page.getByRole("alertdialog");
    await confirm.getByRole("button", { name: "Delete" }).click();
    await expect(
      confirm.getByText("This category cannot be deleted"),
    ).toBeVisible();
    await expect(confirm).toContainText(/still has courses|has subcategories/);
    await confirm.getByRole("button", { name: "Cancel" }).click();

    // The new, empty category can be deleted.
    await created.getByRole("button", { name: "Delete" }).click();
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "Delete" })
      .click();
    await expect(page.getByText("Category deleted")).toBeVisible();
    await expect(created).toHaveCount(0);
  });

  test("the order browser finds a paid order and shows its payment and items", async ({
    request,
  }) => {
    const { api: buyer } = await signIn(request, people.buyer);
    const co = await buyer.post<{ orderId: string; checkoutUrl: string }>(
      "/api/checkout",
      {
        packageId,
        idempotencyKey: `fb-${run}-1`,
      },
    );
    paidOrderId = co.orderId;
    const sessions = (await (
      await request.get(`${FAKE_STRIPE}/__test/sessions`)
    ).json()) as {
      id: string;
      amount_total: number;
      currency: string;
      client_reference_id: string;
      payment_intent: string;
      metadata: { order_id: string };
    }[];
    const s = sessions.find((x) => x.metadata.order_id === co.orderId);
    expect(s, "fake Stripe session").toBeTruthy();
    const { body, header } = signedCheckoutCompleted(s!);
    const hook = await request.post(`${API}/api/webhooks/stripe`, {
      headers: {
        "Stripe-Signature": header,
        "Content-Type": "application/json",
      },
      data: body,
    });
    expect(hook.status(), await hook.text()).toBe(200);

    const page = admin.page;
    await page.goto("/admin/orders");
    await page.getByLabel("Status").selectOption("Paid");
    await page
      .getByLabel("Buyer email (exact)")
      .fill(people.buyer.toUpperCase());
    await page.getByRole("button", { name: "Search" }).click();
    const row = page.locator(`tr[data-order-id="${paidOrderId}"]`);
    await expect(row).toContainText("$30.00");
    await expect(row).toContainText("Paid");
    await expect(
      page.getByTestId("order-table").locator("tbody tr"),
    ).toHaveCount(1);
    await row.getByRole("button", { name: "Details" }).click();
    const detail = page.getByTestId("order-detail");
    await expect(detail).toContainText(courseTitle);
    await expect(detail).toContainText(s!.payment_intent);
    await expect(detail).toContainText(/INV-\d{4}-\d{6}/);
    await page.keyboard.press("Escape");
  });

  test("seat request → staff enterprise order → mark paid raises the seat limit", async ({
    request,
  }) => {
    const page = orgAdmin.page;
    await login(page, people.orgAdmin);
    await page.goto(`/orgs/${orgId}?tab=seats`);
    await expect(page.getByText("2 of 3 seats used")).toBeVisible();
    await page.getByLabel(label("Seats")).fill("5");
    await page
      .getByLabel("Note (optional)")
      .fill("Five more for the sales team");
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByText("Seat request sent")).toBeVisible();
    await expect(page.getByText(/5 seats · Requested/)).toBeVisible();

    const staff = admin.page;
    await staff.goto("/admin/enterprise");
    const req = staff
      .getByTestId("staff-seat-requests")
      .locator(`li[data-org="${orgName}"]`);
    await expect(req).toContainText("5 seats");
    await req.getByRole("button", { name: "Create order" }).click();
    const dialog = staff.getByRole("dialog");
    await dialog.getByLabel(label("Unit price per seat")).fill("12");
    await dialog.getByRole("button", { name: "Create and invoice" }).click();
    await expect(staff.getByText(/Order created, invoice INV-/)).toBeVisible();
    const order = staff
      .getByTestId("staff-ent-orders")
      .locator("li")
      .filter({ hasText: orgName });
    await expect(order).toContainText("$60.00");
    await expect(order).toContainText("Awaiting");

    // Not paid yet: the seat limit is unchanged.
    const { api: adminApi } = await signIn(request, people.orgAdmin);
    expect(
      (await adminApi.get<{ seatLimit: number }>(`/api/orgs/${orgId}`))
        .seatLimit,
    ).toBe(3);

    const download = staff.waitForEvent("download");
    await order
      .getByRole("button", { name: /^Invoice INV-.*\(PDF\)$/ })
      .click();
    const pdf = await download.catch(() => null);
    // The PDF needs Invoice:Seller* configuration; without it the API answers 503 and the UI says so.
    if (!pdf) await expect(order.getByRole("alert")).toBeVisible();

    await order.getByRole("button", { name: "Mark paid" }).click();
    await staff
      .getByRole("dialog")
      .getByLabel("Payment reference")
      .fill(`BANK-${run}`);
    await staff
      .getByRole("dialog")
      .getByRole("button", { name: "Mark paid" })
      .click();
    await expect(
      staff.getByText("Marked paid. Seat limit 3 → 8"),
    ).toBeVisible();
    await expect(order).toContainText(`ref BANK-${run}`);
    expect(
      (await adminApi.get<{ seatLimit: number }>(`/api/orgs/${orgId}`))
        .seatLimit,
    ).toBe(8);

    await page.reload();
    await expect(page.getByText(/of 8/)).toBeVisible();
  });

  test("org-private material: admin uploads, a member downloads it from /me, a non-member gets 404", async ({
    request,
  }) => {
    const page = orgAdmin.page;
    await page.goto(`/orgs/${orgId}?tab=materials`);
    await page.getByLabel(label("File")).setInputFiles({
      name: "handbook.pdf",
      mimeType: "application/pdf",
      buffer: PDF,
    });
    await page.getByLabel("Title").fill(`Sales handbook ${run}`);
    await page.getByRole("button", { name: "Upload", exact: true }).click();
    await expect(page.getByText("Material uploaded")).toBeVisible();
    const row = page.locator(`li[data-material-title="Sales handbook ${run}"]`);
    await expect(row).toContainText("handbook.pdf");
    await expect(row).toContainText(/Scan: (Clean|NotScanned)/);
    await expect(page.getByTestId("materials-usage")).toContainText(
      "in 1 files",
    );

    const mp = member.page;
    await login(mp, people.member);
    const list = mp.getByTestId("member-materials");
    await expect(list).toContainText(`Sales handbook ${run}`);
    const download = mp.waitForEvent("download");
    await list.getByRole("button", { name: "Download" }).click();
    expect((await download).suggestedFilename()).toBe("handbook.pdf");

    const { api: orgApi } = await signIn(request, people.orgAdmin);
    const materials = await orgApi.get<{ id: string; downloadUrl: string }[]>(
      `/api/orgs/${orgId}/materials`,
    );
    const { api: outsider } = await signIn(request, people.outsider);
    await outsider.call("GET", materials[0].downloadUrl, undefined, [404]);
    await new Api(request).call(
      "GET",
      materials[0].downloadUrl,
      undefined,
      [401],
    );
  });

  test("an assigned pathway expands into course assignments", async () => {
    const page = orgAdmin.page;
    await page.goto(`/orgs/${orgId}?tab=pathways`);
    await page
      .getByLabel(label("Pathway"))
      .selectOption({ label: `${pathwayTitle} · 1 courses` });
    await page.getByLabel("Assign to").selectOption("Department");
    await page.getByLabel(label("Department")).fill("Sales");
    await page.getByRole("button", { name: "Assign pathway" }).click();
    await expect(
      page.getByText("Pathway assigned: 1 courses added, 0 skipped"),
    ).toBeVisible();
    const item = page
      .getByTestId("pathway-assignments")
      .locator("li")
      .filter({ hasText: pathwayTitle });
    await expect(item).toContainText("Department: Sales");
    await expect(item).toContainText("Expanded into 1 course assignments");
    await expect(item).toContainText(courseTitle);

    // The member sees the course on their dashboard.
    await member.page.goto("/me");
    await expect(
      member.page.getByRole("link", { name: courseTitle }).first(),
    ).toBeVisible();
  });

  test("SSO: org admin configures OIDC; a new person signs in through the organization", async ({
    browser,
    request,
  }) => {
    const page = orgAdmin.page;
    await page.goto(`/orgs/${orgId}?tab=sso`);
    await expect(
      page.getByText("SSO is not configured for this organization yet."),
    ).toBeVisible();
    await page.getByLabel(label("Issuer URL")).fill(OIDC);
    await page.getByLabel(label("Client ID")).fill(OIDC_CLIENT);
    await page.getByLabel(label("Client secret")).fill(OIDC_SECRET);
    await page.getByLabel(label("Allowed email domains")).fill(SSO_DOMAIN);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("SSO settings saved")).toBeVisible();
    await expect(page.getByLabel(label("Client secret"))).toHaveValue("");
    await expect(
      page.getByText("A secret is stored and never shown.", { exact: false }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: new RegExp(`/sso/${orgSlug}$`) }),
    ).toBeVisible();
    // The new domain is pending verification, with the DNS TXT instructions.
    const domainRow = page
      .getByTestId("sso-domains")
      .locator(`li[data-domain="${SSO_DOMAIN}"]`);
    await expect(domainRow).toContainText("Pending verification");
    await expect(domainRow).toContainText(`_mastemy-sso.${SSO_DOMAIN}`);
    await expect(domainRow).toContainText("mastemy-sso-verify=");
    // A public mailbox provider can never be added.
    await page
      .getByLabel(label("Allowed email domains"))
      .fill(`${SSO_DOMAIN}\ngmail.com`);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(
      page.getByText(
        "Public email providers (such as gmail.com or outlook.com)",
      ),
    ).toBeVisible();
    await page.getByLabel(label("Allowed email domains")).fill(SSO_DOMAIN);

    // Until the domain is verified, even a person on it is refused.
    const visitor = await newActor(browser);
    const ssoMail = `pat${run}@${SSO_DOMAIN}`;
    await request.post(`${OIDC}/__test/user`, {
      data: {
        sub: `pat-${run}`,
        email: ssoMail,
        email_verified: true,
        name: "Pat Sso",
      },
    });
    await visitor.page.goto(`/sso/${orgSlug}`);
    await expect(visitor.page.getByTestId("sso-error")).toHaveText(
      "Your email domain is not allowed for this organization.",
    );

    // Staff approve the domain from /admin/enterprise.
    await admin.page.goto("/admin/enterprise");
    const pendingRow = admin.page
      .getByTestId("staff-sso-domains")
      .locator(`li[data-domain="${SSO_DOMAIN}"]`);
    await expect(pendingRow).toContainText(orgSlug);
    await pendingRow.getByRole("button", { name: "Approve" }).click();
    await expect(admin.page.getByText(`${SSO_DOMAIN} approved`)).toBeVisible();
    await page.reload();
    await expect(domainRow).toContainText("Verified");
    await expect(domainRow).toContainText("Approved by Mastemy staff");

    // A person outside the allowed domains is refused with an explanation.
    await request.post(`${OIDC}/__test/user`, {
      data: {
        sub: `other-${run}`,
        email: `x${run}@not-allowed.test`,
        email_verified: true,
        name: "Other",
      },
    });
    await visitor.page.goto("/login");
    await visitor.page
      .getByRole("button", { name: "Sign in with your organization" })
      .click();
    await visitor.page.getByLabel("Organization ID").fill(orgSlug);
    await visitor.page.getByRole("button", { name: "Continue" }).click();
    await expect(visitor.page).toHaveURL(/\/sso\/complete/);
    await expect(visitor.page.getByTestId("sso-error")).toHaveText(
      "Your email domain is not allowed for this organization.",
    );

    // An allowed person is provisioned just in time and lands signed in.
    await request.post(`${OIDC}/__test/user`, {
      data: {
        sub: `pat-${run}`,
        email: ssoMail,
        email_verified: true,
        name: "Pat Sso",
      },
    });
    await visitor.page.goto("/login");
    await visitor.page
      .getByRole("button", { name: "Sign in with your organization" })
      .click();
    await visitor.page.getByLabel("Organization ID").fill(orgSlug);
    await visitor.page.getByRole("button", { name: "Continue" }).click();
    await expect(visitor.page).toHaveURL(/\/me$/);
    await expect(visitor.page.getByText(orgName).first()).toBeVisible();
    // The handoff code is single use and never left in the address bar.
    expect(visitor.page.url()).not.toContain("handoff=");

    // An unknown organization is explained on the start page.
    await visitor.page.goto("/sso/no-such-org-x");
    await expect(
      visitor.page.getByText(
        "Single sign-on is not available for this organization.",
      ),
    ).toBeVisible();
    await visitor.context.close();

    const { api: orgApi } = await signIn(request, people.orgAdmin);
    const members = await orgApi.get<{ email: string | null }[]>(
      `/api/orgs/${orgId}/members`,
    );
    expect(members.some((m) => m.email === ssoMail)).toBe(true);
  });

  test("SSO never adopts an existing account; its owner links it from security settings", async ({
    browser,
    request,
  }) => {
    // An existing Mastemy account on the verified domain (email verified by staff).
    const kimMail = `kim${run}@${SSO_DOMAIN}`;
    await registerApi(request, "Kim Existing", kimMail);
    await admin.page.goto("/admin/users");
    await admin.page.getByLabel("Search by name or email").fill(kimMail);
    await admin.page.getByRole("button", { name: "Search" }).click();
    const row = admin.page.getByRole("row").filter({ hasText: kimMail });
    await row.getByRole("button", { name: "Mark verified" }).click();
    await expect(row.getByText("Email verified")).toBeVisible();

    // The org IdP asserting that email does not sign anyone into the account.
    await request.post(`${OIDC}/__test/user`, {
      data: {
        sub: `kim-${run}`,
        email: kimMail,
        email_verified: true,
        name: "Kim Idp",
      },
    });
    const kim = await newActor(browser);
    await kim.page.goto(`/sso/${orgSlug}`);
    await expect(kim.page.getByTestId("sso-error")).toContainText(
      "not linked automatically",
    );
    await expect(
      kim.page.getByText(
        "Sign in with password, then link SSO from your profile",
        { exact: false },
      ),
    ).toBeVisible();

    // Password sign-in lands on security settings, where the owner links the organization identity.
    await kim.page.getByRole("link", { name: "Sign in with password" }).click();
    await kim.page.getByLabel("Email").fill(kimMail);
    await kim.page.getByLabel("Password").fill(PASSWORD);
    await kim.page.getByRole("button", { name: "Log in" }).click();
    await expect(kim.page).toHaveURL(/\/me\/security$/);
    const linkSection = kim.page.getByRole("region", {
      name: "Link organization SSO",
    });
    await linkSection.getByLabel("Organization ID").fill(orgSlug);
    await linkSection
      .getByRole("button", { name: "Link organization SSO" })
      .click();
    await expect(kim.page.getByTestId("sso-linked")).toContainText(
      "is now linked to your account",
    );
    await kim.context.close();

    // From now on organization sign-in opens Kim's own account.
    const again = await newActor(browser);
    await again.page.goto(`/sso/${orgSlug}`);
    await expect(again.page).toHaveURL(/\/me$/);
    const { api: orgApi } = await signIn(request, people.orgAdmin);
    const members = await orgApi.get<{ email: string | null }[]>(
      `/api/orgs/${orgId}/members`,
    );
    expect(members.filter((m) => m.email === kimMail)).toHaveLength(1);
    await again.context.close();
  });
});
