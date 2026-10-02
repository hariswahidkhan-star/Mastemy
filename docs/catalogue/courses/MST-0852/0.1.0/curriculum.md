# Spring Security: Identity, Authorization, and OAuth

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0852` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Spring Security filter chain and architecture
2. Configure authentication with users, passwords and providers
3. Authorize requests and methods by role and authority
4. Secure REST APIs with stateless tokens
5. Integrate OAuth2 and OpenID Connect login and resource servers
6. Apply security hardening and test security configuration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Architecture (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Trace a request through the filter chain; (2) Identify where authentication is stored
- Common misconception addressed: Thinking Spring Security is a single filter
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The security filter chain | 80 | 5 |
| M01L02 | Core abstractions | 80 | 5 |

### M02 Authentication (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Configure a password encoder; (2) Add a custom UserDetailsService
- Common misconception addressed: Storing passwords without a strong encoder
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Users, passwords and encoders | 80 | 5 |
| M02L02 | Authentication providers | 80 | 5 |

### M03 Authorization (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Restrict an endpoint to ROLE_ADMIN; (2) Annotate a service method with @PreAuthorize
- Common misconception addressed: Confusing authentication with authorization
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | URL-based authorization | 80 | 5 |
| M03L02 | Method security | 80 | 5 |

### M04 Stateless APIs (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Disable server sessions for the API; (2) Validate a JWT on each request
- Common misconception addressed: Keeping CSRF protection the same for a stateless token API without understanding why
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Stateless sessions | 80 | 5 |
| M04L02 | JWT bearer tokens | 80 | 5 |

### M05 OAuth2 and OIDC (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Add OIDC login with an external provider; (2) Protect resources by OAuth2 scope
- Common misconception addressed: Treating the ID token as an API access token
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | OAuth2/OIDC login | 80 | 5 |
| M05L02 | Resource server and scopes | 80 | 5 |

### M06 Hardening and testing (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Add security headers and CSRF where appropriate; (2) Write a test asserting a 401/403
- Common misconception addressed: Assuming the default config needs no review for production
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Common attacks and defences | 80 | 5 |
| M06L02 | Testing security config | 80 | 5 |

## Integrative case

Secure a REST API and its admin UI: configure authentication and a password encoder, authorize endpoints by role, make the API stateless with JWT, add OAuth2/OIDC login for the UI, harden against common attacks, and write tests that prove unauthorised requests are rejected.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0852-final-protected | 40 | 50 | yes |
| MST-0852-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture | 7 |
| Authentication | 7 |
| Authorization | 7 |
| Stateless APIs | 7 |
| OAuth2 and OIDC | 6 |
| Hardening and testing | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0852-Q0001** (single-answer, Select ONE) In Spring Security, what is the difference between authentication and authorization?

- A. Authentication verifies identity; authorization decides what that identity may do **(key)**  
  _Rationale:_ Correct: authentication is 'who are you', authorization is 'what are you allowed to do'.
- B. They are two names for the same check  
  _Rationale:_ They are distinct concerns handled at different points.
- C. Authorization always runs before authentication  
  _Rationale:_ Identity must be established before access decisions.
- D. Authentication only applies to admin users  
  _Rationale:_ Authentication applies to any principal, not just admins.

**MST-0852-Q0002** (single-answer, Select ONE) Why should stored user passwords use a strong encoder such as BCrypt?

- A. To store a slow, salted one-way hash instead of recoverable passwords **(key)**  
  _Rationale:_ Correct: a slow salted hash resists brute force and prevents storing plaintext.
- B. To encrypt passwords so they can be decrypted at login  
  _Rationale:_ Password verification should hash and compare, not decrypt.
- C. To make passwords shorter in the database  
  _Rationale:_ Hashing is about security, not size reduction.
- D. Because plaintext is fine behind a firewall  
  _Rationale:_ Storing plaintext is unsafe regardless of network controls.

**MST-0852-Q0003** (multiple-answer, Select TWO) Which TWO are appropriate when securing a stateless JWT REST API? (Select TWO.)

- A. Validate the token's signature and expiry on each request **(key)**  
  _Rationale:_ Correct: every request must prove the token is authentic and current.
- B. Configure the API to not create server-side sessions **(key)**  
  _Rationale:_ Correct: statelessness means no reliance on HTTP sessions.
- C. Store the user's password inside the JWT  
  _Rationale:_ Never put secrets like passwords in a token payload.
- D. Trust any token without checking its signature  
  _Rationale:_ Unverified tokens can be forged.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
