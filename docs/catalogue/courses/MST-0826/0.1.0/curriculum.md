# ASP.NET Core Web API Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0826` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (ASP.NET Core APIs overview (Minimal APIs recommended for new projects), minimal API routing/parameter binding, middleware order, DI in endpoints). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-ASPNETCORE-APIS (https://learn.microsoft.com/aspnet/core/fundamentals/apis; https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis; accessed 2026-10-02) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — ASP.NET Core Web API Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build HTTP API endpoints with routing and parameter binding
2. Validate input and return correct status codes and problem details
3. Order middleware correctly in the request pipeline
4. Use dependency injection inside endpoints and services
5. Secure an API with authentication and authorization
6. Document, version and test the API

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Endpoints and routing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map a GET and a POST endpoint with route parameters; (2) Bind a value from route, query and body correctly
- Common misconception addressed: Believing controllers are required for a new API
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Minimal APIs vs controllers | 120 | 7 |
| M01L02 | Routing and parameter binding | 120 | 7 |

### M02 Validation and responses (MASTEMY-DESIGN 16%)

- Worked applications: (1) Return 400 with ProblemDetails for invalid input; (2) Map a not-found case to 404 rather than 200
- Common misconception addressed: Returning 200 for every outcome
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Model validation | 120 | 7 |
| M02L02 | Status codes and ProblemDetails | 120 | 7 |

### M03 The middleware pipeline (MASTEMY-DESIGN 17%)

- Worked applications: (1) Place UseAuthentication/UseAuthorization in the right order; (2) Add a custom middleware and reason about ordering
- Common misconception addressed: Putting authorization before routing in the pipeline
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Request pipeline and middleware order | 120 | 7 |
| M03L02 | Writing custom middleware | 120 | 7 |

### M04 DI in the API (MASTEMY-DESIGN 17%)

- Worked applications: (1) Inject a service into a minimal API endpoint lambda; (2) Resolve a scoped service per request correctly
- Common misconception addressed: Newing up services inside endpoints
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Injecting services into endpoints | 120 | 7 |
| M04L02 | Service lifetimes in request handling | 120 | 7 |

### M05 Security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Protect an endpoint with an authorization policy; (2) Reject an unauthenticated request with 401 vs 403
- Common misconception addressed: Confusing authentication (401) with authorization (403)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Authentication schemes | 120 | 7 |
| M05L02 | Authorization policies | 120 | 7 |

### M06 Docs, versioning and tests (MASTEMY-DESIGN 17%)

- Worked applications: (1) Expose an OpenAPI description for the API; (2) Write an integration test for an endpoint
- Common misconception addressed: Shipping an API with no contract or tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | OpenAPI and versioning | 120 | 7 |
| M06L02 | Integration testing endpoints | 120 | 7 |

## Integrative case

Build a tasks API: define minimal-API endpoints with validation and correct status codes, order the middleware so authentication and authorization run correctly, inject services per request, protect an admin endpoint with a policy, and prove it with an integration test and an OpenAPI description.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0826-final-protected | 40 | 50 | yes |
| MST-0826-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Endpoints and routing | 7 |
| Validation and responses | 7 |
| The middleware pipeline | 7 |
| DI in the API | 7 |
| Security | 6 |
| Docs, versioning and tests | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0826-Q0001** (single-answer, Select ONE) For a new ASP.NET Core HTTP API, which approach does Microsoft currently recommend as the default?

- A. Minimal APIs **(key)**  
  _Rationale:_ Correct: the ASP.NET Core APIs overview recommends Minimal APIs for new projects.
- B. Web Forms  
  _Rationale:_ Web Forms is not part of ASP.NET Core.
- C. WCF services  
  _Rationale:_ WCF is not the recommended ASP.NET Core API approach.
- D. Raw HttpListener  
  _Rationale:_ HttpListener is a low-level primitive, not the recommended approach.

**MST-0826-Q0002** (multiple-answer, Select TWO) Which TWO responses are appropriate for a request that fails model validation and one that targets a missing resource? (Select TWO.)

- A. 400 Bad Request with ProblemDetails for invalid input **(key)**  
  _Rationale:_ Correct: invalid input is a 4xx client error.
- B. 404 Not Found for a missing resource **(key)**  
  _Rationale:_ Correct: a missing resource maps to 404.
- C. 200 OK for invalid input  
  _Rationale:_ 200 wrongly signals success.
- D. 500 for any validation failure  
  _Rationale:_ Validation failures are client errors, not server errors.

**MST-0826-Q0003** (single-answer, Select ONE) In the ASP.NET Core pipeline, where must UseAuthentication and UseAuthorization run relative to routing?

- A. After UseRouting, with authentication before authorization **(key)**  
  _Rationale:_ Correct: authentication and authorization run after routing, authentication first.
- B. Before UseRouting  
  _Rationale:_ Authorization needs routing metadata, so it runs after UseRouting.
- C. Authorization before authentication  
  _Rationale:_ Authentication must establish identity before authorization decides access.
- D. Order does not matter  
  _Rationale:_ Middleware order is significant in ASP.NET Core.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
