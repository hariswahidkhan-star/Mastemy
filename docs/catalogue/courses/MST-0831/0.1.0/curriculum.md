# .NET Authentication and Authorization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0831` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Overview of ASP.NET Core authentication and introduction to authorization: schemes and handlers, middleware order, role/claim/policy-based authorization). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-ASPNETCORE-AUTH (https://learn.microsoft.com/aspnet/core/security/authentication/; https://learn.microsoft.com/aspnet/core/security/authorization/introduction; accessed 2026-10-02) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — .NET Authentication and Authorization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish authentication from authorization in ASP.NET Core
2. Configure cookie and JWT bearer authentication schemes
3. Order authentication/authorization middleware and set fallback policy
4. Apply role-based, claim-based and policy-based authorization
5. Apply [Authorize] with schemes and test protected endpoints

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Authentication vs authorization (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain the difference between authentication and authorization; (2) Describe what an authentication scheme and handler do
- Common misconception addressed: Confusing authentication (who) with authorization (what they may do)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Identity vs access decisions | 120 | 7 |
| M01L02 | Schemes, handlers and middleware | 120 | 7 |

### M02 Authentication schemes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Configure cookie authentication with AddAuthentication/AddCookie; (2) Configure JWT bearer authentication for an API
- Common misconception addressed: Assuming cookies work for a token-based API client
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cookie and JWT bearer authentication | 120 | 7 |
| M02L02 | Configuring and selecting schemes | 120 | 7 |

### M03 Middleware and pipeline order (MASTEMY-DESIGN 20%)

- Worked applications: (1) Place UseAuthentication before middleware that needs the user; (2) Add a fallback policy to require authenticated users by default
- Common misconception addressed: Expecting configured authentication to restrict access on its own
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | UseAuthentication and UseAuthorization | 120 | 7 |
| M03L02 | Fallback authorization policy | 120 | 7 |

### M04 Authorization models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Protect an action with a role requirement; (2) Write a policy that checks a claim
- Common misconception addressed: Hard-coding role checks in many places instead of a policy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Role-based and claim-based authorization | 120 | 7 |
| M04L02 | Policy-based authorization | 120 | 7 |

### M05 Applying and testing auth (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply [Authorize] with a specific scheme to an endpoint; (2) Test that an unauthenticated request receives 401 and an unauthorized one 403
- Common misconception addressed: Returning 200 to unauthenticated callers on a protected route
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | [Authorize]/[AllowAnonymous] and schemes | 120 | 7 |
| M05L02 | Testing protected endpoints | 120 | 7 |

## Integrative case

Secure an ASP.NET Core app: configure JWT bearer for the API and cookies for the web UI, order UseAuthentication before UseAuthorization, add a fallback policy requiring authenticated users, protect endpoints with a claim-based policy, and test that anonymous requests get 401 and forbidden ones get 403.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0831-final-protected | 40 | 50 | yes |
| MST-0831-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Authentication vs authorization | 8 |
| Authentication schemes | 8 |
| Middleware and pipeline order | 8 |
| Authorization models | 8 |
| Applying and testing auth | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0831-Q0001** (single-answer, Select ONE) What is the difference between authentication and authorization?

- A. Authentication determines who the user is; authorization determines what they may do **(key)**  
  _Rationale:_ Correct: identity vs access decision is the standard distinction.
- B. They are two names for the same process  
  _Rationale:_ They are distinct, though authorization relies on authentication.
- C. Authorization happens before authentication  
  _Rationale:_ Authorization depends on an established identity.
- D. Authentication decides access to resources  
  _Rationale:_ Deciding access is authorization, not authentication.

**MST-0831-Q0002** (multiple-answer, Select TWO) Which TWO are true about ASP.NET Core auth middleware? (Select TWO.)

- A. UseAuthentication must run before middleware that depends on the user **(key)**  
  _Rationale:_ Correct: the user must be established before it is used.
- B. Configuring authentication alone does not restrict endpoint access **(key)**  
  _Rationale:_ Correct: a fallback policy or [Authorize] is needed to restrict access.
- C. UseAuthorization can be omitted if authentication is configured  
  _Rationale:_ Authorization middleware is needed to enforce access rules.
- D. Middleware order does not matter for auth  
  _Rationale:_ Order is significant for authentication and authorization.

**MST-0831-Q0003** (single-answer, Select ONE) An authenticated user without the required permission calls a protected endpoint. What status is appropriate?

- A. 403 Forbidden **(key)**  
  _Rationale:_ Correct: the user is authenticated but not authorized, which is 403.
- B. 401 Unauthorized  
  _Rationale:_ 401 is for unauthenticated requests, not authenticated-but-forbidden.
- C. 200 OK  
  _Rationale:_ Returning 200 would wrongly grant access.
- D. 500 Internal Server Error  
  _Rationale:_ A permission failure is not a server error.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
