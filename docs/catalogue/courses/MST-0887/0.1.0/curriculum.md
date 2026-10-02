# JavaScript Authentication and Session Security

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0887` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compare session-cookie and token-based authentication and when to use each
2. Implement OAuth 2.0 / OpenID Connect authorization-code flow correctly
3. Store and transmit credentials and tokens securely in the browser
4. Mitigate session-related threats (XSS token theft, CSRF, fixation)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **n/a-no-official-syllabus**. Source(s) consulted:
- none (no external source; Mastemy skills course)

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Authentication models

- Purpose: Teach session-cookie vs token authentication and their trade-offs.
- Worked applications: (1) Choose cookie vs token auth for a traditional server-rendered app vs a SPA; (2) Diagram the request flow for a cookie session and for a bearer token
- Common misconception addressed: Believing JWTs are always more secure than session cookies
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Session cookies vs tokens | 80 | 5 |
| M01L02 | Stateful vs stateless sessions | 80 | 5 |
| M01L03 | Choosing an auth model | 80 | 5 |

### M02 OAuth 2.0 and OIDC

- Purpose: Teach the authorization-code flow and OpenID Connect basics.
- Worked applications: (1) Walk through the authorization-code-with-PKCE flow for a SPA; (2) Distinguish an ID token from an access token and their purposes
- Common misconception addressed: Using the implicit flow for new SPAs instead of auth-code with PKCE
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | OAuth 2.0 roles and grants | 80 | 5 |
| M02L02 | Authorization-code flow with PKCE | 80 | 5 |
| M02L03 | OpenID Connect and ID tokens | 80 | 5 |

### M03 Securing sessions

- Purpose: Teach secure token storage and mitigation of session threats.
- Worked applications: (1) Decide where to keep a token (httpOnly cookie vs localStorage) and justify it; (2) Add CSRF protection and set secure cookie attributes
- Common misconception addressed: Storing long-lived tokens in localStorage reachable by any injected script
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Secure cookie attributes (httpOnly, Secure, SameSite) | 80 | 5 |
| M03L02 | XSS and token theft | 80 | 5 |
| M03L03 | CSRF and session fixation | 80 | 5 |

## Integrative case

A SPA plus API currently keeps a long-lived token in localStorage and has no CSRF defense. Recommend an auth model, implement the OIDC auth-code-with-PKCE flow, choose a safe token storage strategy, and close the XSS/CSRF gaps.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0887-final-protected | 30 | 30 | yes |
| MST-0887-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Authentication models | 10 |
| OAuth 2.0 and OIDC | 10 |
| Securing sessions | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0887-Q0001** (single-answer, Select ONE) Which statement about session cookies versus JWT bearer tokens is accurate?

- A. Neither is universally more secure; each has different trade-offs and threat exposure **(key)**  
  _Rationale:_ Correct: security depends on how each is stored, transmitted and validated, not the format alone.
- B. JWTs are always more secure than session cookies  
  _Rationale:_ A token in localStorage can be stolen via XSS; format alone does not guarantee security.
- C. Session cookies cannot be protected against CSRF at all  
  _Rationale:_ SameSite and antiforgery tokens mitigate CSRF for cookies.
- D. Bearer tokens are immune to theft  
  _Rationale:_ Bearer tokens can be stolen and replayed if exposed.

**MST-0887-Q0002** (multiple-answer, Select TWO) Select TWO measures that reduce the risk of session/token theft in a browser app.

- A. Store the session token in an httpOnly, Secure cookie **(key)**  
  _Rationale:_ Correct: httpOnly keeps the token out of reach of injected scripts, and Secure limits it to HTTPS.
- B. Set SameSite on cookies and add antiforgery tokens for state-changing requests **(key)**  
  _Rationale:_ Correct: SameSite plus antiforgery tokens mitigate CSRF.
- C. Keep a long-lived token in localStorage for convenience  
  _Rationale:_ localStorage is readable by any injected script, so XSS can steal the token.
- D. Disable HTTPS to simplify local testing in production  
  _Rationale:_ Disabling HTTPS exposes tokens in transit.
- E. Embed the token in every URL query string  
  _Rationale:_ Tokens in URLs leak via logs, history and referrers.

**MST-0887-Q0003** (single-answer, Select ONE) Which OAuth 2.0 flow is recommended for a browser-based SPA today?

- A. Authorization-code flow with PKCE **(key)**  
  _Rationale:_ Correct: auth-code with PKCE is the recommended flow for public SPA clients.
- B. Implicit flow  
  _Rationale:_ The implicit flow is discouraged for new SPAs because it exposes tokens in the URL fragment.
- C. Resource-owner password credentials  
  _Rationale:_ ROPC requires handling raw credentials and is discouraged.
- D. Client-credentials flow for the end user  
  _Rationale:_ Client-credentials is for machine-to-machine, not an end-user SPA login.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
