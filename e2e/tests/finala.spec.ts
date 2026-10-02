import { expect, test } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";
import type { Actor } from "./helpers";
import {
  ADMIN,
  API,
  PASSWORD,
  apiLogin,
  email,
  enrollMfaInUi,
  label,
  login,
  newActor,
  run,
} from "./helpers";

/**
 * Area "finala" through the real UI against the real API + MySQL (MFA required for privileged roles):
 * cookie-based session persistence, learner ↔ instructor messaging with a report, completion award claim and
 * the LinkedIn add-to-profile URL, self-graded practice review, and a SuperAdmin MFA reset that forces the
 * user to enroll again. Course scaffolding is done over the API.
 */

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
    expected = [200, 201, 202, 204],
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
  const api = new Api(request);
  const res = await apiLogin(request, mail, password);
  api.token = res.accessToken;
  return { api, userId: res.user.id };
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
    .padEnd(11, "k")
    .slice(0, 11);

test.describe
  .serial("finala: messaging, completion awards, self-grade, MFA reset, cookie session", () => {
  let instructor: Actor;
  let student: Actor;
  let admin: Actor;
  const people = {
    instructor: email("fainstructor"),
    reviewer: email("fareviewer"),
    student: email("fastudent"),
  };
  const title = `Finala Messaging Course ${run}`;
  let course = { id: "", slug: "", lessonId: "" };
  let practiceSessionId = "";

  test.beforeAll(async ({ browser }) => {
    instructor = await newActor(browser);
    student = await newActor(browser);
    admin = await newActor(browser);
    // The share button opens LinkedIn; never reach the real site from the test.
    await student.context.route("https://www.linkedin.com/**", (r) =>
      r.abort(),
    );
  });

  test("setup over the API: users, a published course with active questions, an enrolled learner", async ({
    request,
  }) => {
    const { api: adminApi } = await signIn(
      request,
      ADMIN.email,
      ADMIN.password,
    );
    const instructorId = await registerApi(
      request,
      "Iyad Instructor",
      people.instructor,
    );
    const reviewerId = await registerApi(
      request,
      "Rana Reviewer",
      people.reviewer,
    );
    await registerApi(request, "Lina Learner", people.student);
    await adminApi.put(`/api/admin/users/${instructorId}/roles`, {
      roles: ["Student", "Instructor"],
    });
    await adminApi.post(
      `/api/admin/users/${reviewerId}/email-verification/mark-verified`,
    );
    await adminApi.put(`/api/admin/users/${reviewerId}/roles`, {
      roles: ["Student", "Reviewer"],
    });
    const channel = await adminApi.post<{ id: string }>(
      "/api/admin/youtube/channels",
      {
        channelId: `UC${`fa${run}`.padEnd(22, "z").slice(0, 22)}`,
        title: `Mastemy Finala ${run}`,
        mode: "MastemyManaged",
      },
    );
    const { api: inst } = await signIn(request, people.instructor);
    // The reviewer enrolls MFA here (privileged role); the MFA reset test relies on it.
    const { api: reviewer } = await signIn(request, people.reviewer);
    const categories = await inst.get<{ id: number }[]>("/api/categories");
    const c = await inst.post<{ id: string; slug: string }>(
      "/api/studio/courses",
      {
        title,
        subtitle: "Finala end-to-end course",
        description:
          "A course used by the finala end-to-end suite. Videos are free on YouTube.",
        audience: "Analysts",
        prerequisites: "",
        outcomes: [
          "Message instructors",
          "Earn a completion award",
          "Review with SM-2",
        ],
        language: "en",
        level: "Beginner",
        categoryIds: [categories[0].id],
      },
    );
    const m = await inst.post<{ id: string }>(
      `/api/studio/courses/${c.id}/modules`,
      {
        title: "Only module",
      },
    );
    const l = await inst.post<{ id: string }>(
      `/api/studio/modules/${m.id}/lessons`,
      {
        title: "The only lesson",
        objective: "Finish the course.",
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
        title: `Finala lesson video ${run}`,
        durationSeconds: 300,
      },
    );
    await reviewer.post(`/api/admin/youtube/videos/${video.id}/confirm`, {
      approve: true,
    });
    const qIds: string[] = [];
    for (const [i, stem] of [
      'Which recall rating means "right, instantly"?',
      "Spacing helps?",
    ].entries()) {
      const q = await inst.post<{ id: string }>(
        `/api/studio/courses/${c.id}/questions`,
        {
          externalId: `FA-${run}-${i}`,
          type: "SingleChoice",
          language: "en",
          stem,
          explanation: "Covered in the lesson.",
          difficulty: "Easy",
          tags: ["fa"],
          allowShuffle: false,
          options: [
            { text: `Right answer ${i}`, isCorrect: true, rationale: "Right." },
            { text: `Wrong answer ${i}`, isCorrect: false, rationale: "No." },
          ],
        },
      );
      await adminApi.post(`/api/studio/questions/${q.id}/state`, {
        state: "Reviewed",
      });
      await reviewer.post(`/api/studio/questions/${q.id}/state`, {
        state: "Approved",
      });
      await reviewer.post(`/api/studio/questions/${q.id}/state`, {
        state: "Active",
      });
      qIds.push(q.id);
    }
    await inst.post(`/api/studio/courses/${c.id}/assessments`, {
      title: "Finala practice quiz",
      kind: "ModuleTest",
      mode: "Practice",
      timeLimitMinutes: null,
      maxAttempts: null,
      passPercent: 50,
      multiSelectScoring: "AllOrNothing",
      questionCount: 2,
      isPremium: false,
      countsTowardCertificate: false,
      questionIds: qIds,
    });
    await inst.post(`/api/studio/courses/${c.id}/submit`);
    await reviewer.post(`/api/review/courses/${c.id}/decision`, {
      decision: "Approve",
    });
    await adminApi.post(`/api/admin/courses/${c.id}/publish`);
    const { api: learner } = await signIn(request, people.student);
    await learner.post(`/api/learn/courses/${c.id}/enroll`);
    course = { id: c.id, slug: c.slug, lessonId: l.id };
    const session = await learner.post<{ id: string }>(
      "/api/practice/sessions",
      {
        courseIds: [c.id],
        count: 2,
      },
    );
    practiceSessionId = session.id;
  });

  test("cookie-based session: no refresh token in storage and the session survives a reload", async () => {
    const page = student.page;
    await login(page, people.student);
    expect(
      await page.evaluate(() => localStorage.getItem("mastemy.refreshToken")),
    ).toBeNull();
    const cookies = await student.context.cookies();
    const rt = cookies.find((c) => c.name === "mastemy_rt");
    expect(rt?.httpOnly).toBe(true);
    expect(rt?.path).toBe("/api/auth");
    await page.reload();
    await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
    await expect(page.getByText("Lina Learner").first()).toBeVisible();
    // A brand-new tab of the same browser also restores the session from the cookie.
    const second = await student.context.newPage();
    await second.goto("/me");
    await expect(second).toHaveURL(/\/me$/);
    await expect(second.getByRole("button", { name: "Log out" })).toBeVisible();
    await second.close();
  });

  test("instructor switches on completion awards in the studio", async () => {
    const page = instructor.page;
    await login(page, people.instructor);
    await page.goto(`/studio/courses/${course.id}?tab=messaging`);
    const toggle = page.getByLabel("Issue completion awards for this course");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(
      page.getByText("Completion awards switched on."),
    ).toBeVisible();
    await expect(toggle).toBeChecked();
  });

  test("enrolled learner messages the instructor; the instructor replies; the learner reports the reply", async () => {
    const lp = student.page;
    await lp.goto(`/courses/${course.slug}`);
    await lp.getByRole("button", { name: "Message instructor" }).click();
    const dialog = lp.getByRole("dialog");
    const box = dialog.getByLabel(/^Your message/);
    await box.fill("x".repeat(2001));
    await expect(
      dialog.getByText("Messages can be at most 2000 characters."),
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Send", exact: true }),
    ).toBeDisabled();
    await box.fill(`Hello, I have a question about lesson one ${run}`);
    await dialog.getByRole("button", { name: "Send", exact: true }).click();
    await expect(lp).toHaveURL(/\/messages\/[0-9a-f-]{36}$/);
    const conversationUrl = lp.url();
    await expect(
      lp.getByText(`Hello, I have a question about lesson one ${run}`),
    ).toBeVisible();

    const ip = instructor.page;
    await ip.goto("/messages");
    await ip.getByRole("link", { name: /Lina Learner/ }).click();
    await expect(
      ip.getByText(`Hello, I have a question about lesson one ${run}`),
    ).toBeVisible();
    await ip.getByLabel(/^Your reply/).fill(`Thanks for asking ${run}`);
    await ip.getByRole("button", { name: "Send", exact: true }).click();
    await expect(ip.getByText(`Thanks for asking ${run}`)).toBeVisible();

    await lp.goto(conversationUrl);
    const reply = lp.getByRole("listitem", {
      name: "Message from Iyad Instructor",
    });
    await expect(reply.getByText(`Thanks for asking ${run}`)).toBeVisible();
    await reply.getByRole("button", { name: "Report" }).click();
    const rd = lp.getByRole("dialog");
    await rd
      .getByLabel(label("What is wrong with this message?"))
      .fill("This reply is not appropriate for the course.");
    await rd.getByRole("button", { name: "Report" }).click();
    await expect(lp.getByText("Report sent to Trust & Safety.")).toBeVisible();
    // The inbox lists the conversation for the learner too.
    await lp.goto("/messages");
    await expect(
      lp.getByRole("link", { name: /Course instructors/ }),
    ).toBeVisible();
  });

  test("learner completes the course, claims the completion award and gets the LinkedIn URL", async ({
    request,
  }) => {
    const { api: learner } = await signIn(request, people.student);
    await learner.put(`/api/learn/lessons/${course.lessonId}/progress`, {
      positionSeconds: 300,
      completed: true,
    });
    const page = student.page;
    await page.goto(`/courses/${course.slug}`);
    await page.getByRole("button", { name: "Claim completion award" }).click();
    await expect(page.getByText("Completion award issued")).toBeVisible();
    await page.goto("/me");
    const row = page
      .locator(".finala-cert--completion")
      .filter({ hasText: title });
    await expect(row.getByTestId("credential-kind")).toHaveText(
      "Completion — not assessed",
    );
    await expect(
      row.getByText("It does not certify assessed knowledge."),
    ).toBeVisible();
    await row.getByRole("button", { name: "Add to LinkedIn" }).click();
    const link = row.getByTestId("linkedin-url");
    await expect(link).toBeVisible();
    const href = (await link.getAttribute("href"))!;
    const u = new URL(href);
    expect(u.hostname).toBe("www.linkedin.com");
    expect(u.pathname).toBe("/profile/add");
    expect(u.searchParams.get("name")).toContain("Certificate of Completion");
    expect(u.searchParams.get("organizationName")).toBe("Mastemy");
    expect(u.searchParams.get("certUrl")).toMatch(/\/verify/);
  });

  test("self-graded review: after checking, the learner rates recall with a plain-language label", async () => {
    const page = student.page;
    await page.goto(`/practice/sessions/${practiceSessionId}`);
    const first = page.locator("article.question").first();
    await first.getByRole("radio").first().check();
    await first.getByRole("button", { name: "Check answer" }).click();
    const grade = first.getByRole("group", {
      name: "How well did you remember this?",
    });
    await expect(grade).toBeVisible();
    await expect(
      grade.getByRole("button", { name: "0 – No memory at all" }),
    ).toBeVisible();
    await grade
      .getByRole("button", { name: "4 – Right, after a little thought" })
      .click();
    await expect(first.getByTestId("self-graded")).toContainText(
      "Right, after a little thought",
    );
    await expect(first.getByTestId("self-graded")).toContainText("Next review");
    await first.getByRole("button", { name: "Bookmark question" }).click();
    await expect(page.getByText("Question bookmarked.")).toBeVisible();
  });

  test("SuperAdmin resets a user MFA with a reason; the user must enroll again at next sign-in", async ({
    browser,
  }) => {
    const page = admin.page;
    await login(page, ADMIN.email, ADMIN.password);
    await page.goto("/admin/users");
    await page.getByLabel("Search by name or email").fill(people.reviewer);
    await page.getByRole("button", { name: "Search" }).click();
    const row = page.getByRole("row").filter({ hasText: people.reviewer });
    await row.getByRole("button", { name: "Reset MFA" }).click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByText(
        /signed in with two-factor authentication within the last 10 minutes/,
      ),
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Reset MFA" }),
    ).toBeDisabled();
    await dialog
      .getByLabel(/^Reason/)
      .fill("Lost phone, identity verified by video call.");
    await dialog.getByRole("button", { name: "Reset MFA" }).click();
    await expect(
      page.getByText("Two-factor authentication reset for Rana Reviewer."),
    ).toBeVisible();

    const reviewer = await newActor(browser);
    const rp = reviewer.page;
    await rp.goto("/login");
    await rp.getByLabel("Email").fill(people.reviewer);
    await rp.getByLabel("Password").fill(PASSWORD);
    await rp.getByRole("button", { name: "Log in" }).click();
    await expect(rp.getByRole("button", { name: "Start setup" })).toBeVisible();
    await enrollMfaInUi(rp, people.reviewer);
    await expect(rp).toHaveURL(/\/me$/);
    await reviewer.context.close();
  });
});
