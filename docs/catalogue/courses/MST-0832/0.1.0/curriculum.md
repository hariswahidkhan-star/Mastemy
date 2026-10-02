# .NET OAuth, OpenID Connect, and Identity Integration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0832` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (ASP.NET Core authentication, OpenID Connect/OAuth 2.0 and ASP.NET Core Identity). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-ASPNET-AUTH (https://learn.microsoft.com/aspnet/core/security/authentication/; https://learn.microsoft.com/aspnet/core/security/authentication/configure-oidc-web-authentication; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — .NET OAuth, OpenID Connect, and Identity Integration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain authentication vs authorization and the role of claims and tokens in ASP.NET Core
2. Configure ASP.NET Core Identity for local user accounts
3. Integrate an external OpenID Connect provider using the code flow with PKCE
4. Request, validate and use access and ID tokens for APIs
5. Apply authorization policies and protect endpoints
6. Handle sign-out, token lifetime and common security pitfalls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Authentication fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map a request through authentication and authorization middleware; (2) Decide cookie vs token auth for a web app and an API
- Common misconception addressed: Believing authentication and authorization are the same thing
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Identity, claims and schemes | 80 | 5 |
| M01L02 | Cookies vs bearer tokens | 80 | 5 |

### M02 ASP.NET Core Identity (MASTEMY-DESIGN 16%)

- Worked applications: (1) Register Identity with an EF Core store; (2) Enable two-factor for an admin account
- Common misconception addressed: Thinking Identity requires an external provider
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Identity setup and user store | 80 | 5 |
| M02L02 | Passwords, lockout and two-factor | 80 | 5 |

### M03 OpenID Connect integration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add AddOpenIdConnect with a code flow client; (2) Store the client secret outside source control
- Common misconception addressed: Using a public client for a server-side web app
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | OIDC confidential client with PKCE | 80 | 5 |
| M03L02 | Configuration and secrets | 80 | 5 |

### M04 Tokens and APIs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Attach an access token to an outbound API call; (2) Explain why cookies are unsuitable for a SPA-to-API call
- Common misconception addressed: Treating the ID token as an API access token
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ID tokens vs access tokens | 80 | 5 |
| M04L02 | Calling a protected API with a bearer token | 80 | 5 |

### M05 Authorization (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a policy that requires a specific claim; (2) Apply a fallback policy and opt public pages out
- Common misconception addressed: Scattering [Authorize] instead of a central policy
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Policy-based authorization | 80 | 5 |
| M05L02 | Roles, claims and fallback policy | 80 | 5 |

### M06 Sessions and security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Implement sign-out for both cookie and OIDC sessions; (2) Choose refresh vs re-authentication for an expiring session
- Common misconception addressed: Forgetting to sign out of the OIDC provider session
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Sign-out and token lifetime | 80 | 5 |
| M06L02 | Common pitfalls and hardening | 80 | 5 |

## Integrative case

Add sign-in to a line-of-business ASP.NET Core web app: enable local Identity accounts, add an OpenID Connect confidential client with PKCE to an external provider, protect the admin area with a policy, and wire up correct sign-out across both the cookie and OIDC sessions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0832-final-protected | 40 | 50 | yes |
| MST-0832-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Authentication fundamentals | 7 |
| ASP.NET Core Identity | 7 |
| OpenID Connect integration | 7 |
| Tokens and APIs | 7 |
| Authorization | 6 |
| Sessions and security | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0832-Q0001** (single-answer, Select ONE) In an ASP.NET Core web app using OpenID Connect, which token is intended to prove the user's identity to the application?

- A. The ID token **(key)**  
  _Rationale:_ Correct: the ID token carries authenticated identity claims about the user.
- B. The access token  
  _Rationale:_ The access token authorizes calls to an API; it is not meant to identify the user to the app.
- C. The refresh token  
  _Rationale:_ The refresh token only obtains new tokens; it carries no identity claims for the app.
- D. The client secret  
  _Rationale:_ The client secret authenticates the application to the provider, not the user.

**MST-0832-Q0002** (multiple-answer, Select TWO) Which TWO practices are recommended for an ASP.NET Core OpenID Connect web client? (Select TWO.)

- A. Use a confidential client with the authorization code flow and PKCE **(key)**  
  _Rationale:_ Correct: this is the recommended flow for server-side web apps.
- B. Store the client secret in Azure Key Vault or user secrets, not in appsettings checked into source control **(key)**  
  _Rationale:_ Correct: secrets must be kept out of source control.
- C. Use an implicit-flow public client for the web app  
  _Rationale:_ Public clients are no longer recommended for web applications.
- D. Disable HTTPS to simplify local token exchange  
  _Rationale:_ TLS is required; disabling HTTPS exposes tokens.

**MST-0832-Q0003** (single-answer, Select ONE) What is the recommended way to require authorization across a whole ASP.NET Core app while still allowing a few public pages?

- A. Set a fallback authorization policy that requires an authenticated user and mark public pages with [AllowAnonymous] **(key)**  
  _Rationale:_ Correct: a fallback policy secures everything by default; [AllowAnonymous] opts specific endpoints out.
- B. Add [Authorize] to every single page individually  
  _Rationale:_ This is error-prone and easy to forget on a new page.
- C. Check the user inside each action method manually  
  _Rationale:_ Manual checks duplicate logic and are easy to miss.
- D. Rely on the OIDC provider to block unauthenticated requests  
  _Rationale:_ The provider authenticates; the app must still enforce authorization.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
