# .NET Application Security and Threat Mitigation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0840` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-ASPNET-SECURITY** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish authentication from authorization and apply each in ASP.NET Core
2. Mitigate common web vulnerabilities (XSS, CSRF, SQL injection, open redirect)
3. Protect sensitive data with the ASP.NET Core Data Protection APIs
4. Store secrets safely and apply least privilege

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/aspnet/core/security/

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Authentication and authorization

- Purpose: Teach the difference between authN and authZ and ASP.NET Core mechanisms.
- Worked applications: (1) Protect an endpoint so only users in a given role can call it; (2) Choose cookie vs token authentication for a SPA and justify it
- Common misconception addressed: Using authentication (who you are) to mean authorization (what you can do)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Authentication fundamentals | 80 | 5 |
| M01L02 | Authorization: roles, policies and claims | 80 | 5 |
| M01L03 | Cookie vs token-based auth | 80 | 5 |

### M02 Common web vulnerabilities

- Purpose: Teach mitigation of XSS, CSRF, SQL injection and open redirect.
- Worked applications: (1) Add antiforgery protection to a form POST and a minimal API; (2) Rewrite a string-concatenated query as a parameterized query
- Common misconception addressed: Trusting that output is safe without encoding user-supplied input
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | XSS and output encoding | 80 | 5 |
| M02L02 | CSRF and antiforgery tokens | 80 | 5 |
| M02L03 | SQL injection and open redirect | 80 | 5 |

### M03 Data protection and secrets

- Purpose: Teach the Data Protection stack, secret storage and least privilege.
- Worked applications: (1) Protect a round-tripped token with the Data Protection API using a purpose string; (2) Move a hard-coded connection string into user-secrets, then Key Vault
- Common misconception addressed: Placing app secrets or keys in client-side Blazor WebAssembly code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | ASP.NET Core Data Protection | 80 | 5 |
| M03L02 | Safe secret storage (user-secrets, Key Vault) | 80 | 5 |
| M03L03 | Least privilege and defense in depth | 80 | 5 |

## Integrative case

A review of an ASP.NET Core app finds a concatenated SQL query, a form with no antiforgery token, and a connection string in source. Prioritize and fix each issue, and protect an auth token correctly, explaining the threat each change mitigates.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0840-final-protected | 30 | 30 | yes |
| MST-0840-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Authentication and authorization | 10 |
| Common web vulnerabilities | 10 |
| Data protection and secrets | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0840-Q0001** (single-answer, Select ONE) Which statement correctly separates authentication from authorization?

- A. Authentication establishes who the user is; authorization decides what they may do **(key)**  
  _Rationale:_ Correct: authN proves identity; authZ governs permitted actions.
- B. Authentication decides permissions; authorization verifies identity  
  _Rationale:_ This reverses the two concepts.
- C. They are two names for the same check  
  _Rationale:_ They are distinct stages: identity first, then permission.
- D. Authorization always happens before authentication  
  _Rationale:_ You generally establish identity before deciding permissions.

**MST-0840-Q0002** (multiple-answer, Select TWO) Select TWO correct mitigations for common ASP.NET Core web vulnerabilities.

- A. Use antiforgery tokens to defend state-changing form posts against CSRF **(key)**  
  _Rationale:_ Correct: antiforgery tokens are the standard CSRF defense for form posts.
- B. Use parameterized queries to prevent SQL injection **(key)**  
  _Rationale:_ Correct: parameterization stops user input from altering query structure.
- C. Disable output encoding to render user input faster  
  _Rationale:_ Disabling encoding invites XSS; encoding should stay on.
- D. Store bearer tokens in a globally readable variable  
  _Rationale:_ Exposing tokens broadly increases theft risk, especially under XSS.
- E. Redirect to any URL supplied in a query string  
  _Rationale:_ Unvalidated redirects enable open-redirect attacks.

**MST-0840-Q0003** (single-answer, Select ONE) Where should application secrets such as connection strings NOT be placed?

- A. Inside client-side Blazor WebAssembly code shipped to the browser **(key)**  
  _Rationale:_ Correct: WebAssembly code reaches the client and can be inspected, so secrets must not live there.
- B. In user-secrets during local development  
  _Rationale:_ User-secrets is an appropriate development-time store.
- C. In Azure Key Vault for staging and production  
  _Rationale:_ Key Vault is a recommended secret store.
- D. In environment-specific configuration kept off the client  
  _Rationale:_ Server-side configuration kept off the client is acceptable.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
