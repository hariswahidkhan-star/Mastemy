# ASP.NET Core Minimal APIs and Endpoint Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0827` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Minimal APIs quick reference and route handlers in ASP.NET Core: WebApplication, Map{Verb}, routing, constraints, route groups, parameter binding and typed results). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-ASPNETCORE-MINAPI (https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis; https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/route-handlers; accessed 2026-10-02) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — ASP.NET Core Minimal APIs and Endpoint Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build minimal API endpoints with WebApplication and Map{Verb}
2. Define routing, parameters, constraints and route groups
3. Bind parameters and return correct typed results
4. Apply endpoint filters, validation and problem details
5. Add cross-cutting concerns and organise endpoints

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Minimal API fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Create a minimal app with a GET and a POST endpoint; (2) Decide between minimal APIs and controllers for a service
- Common misconception addressed: Assuming minimal APIs cannot scale to real applications
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | WebApplication and Map{Verb} handlers | 120 | 7 |
| M01L02 | When to choose minimal APIs | 120 | 7 |

### M02 Routing and parameters (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a route with an int constraint and bind the parameter; (2) Group related endpoints under a common prefix with MapGroup
- Common misconception addressed: Hard-coding paths instead of using named endpoints and link generation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Route templates, parameters and constraints | 120 | 7 |
| M02L02 | Route groups with MapGroup | 120 | 7 |

### M03 Parameter binding and results (MASTEMY-DESIGN 20%)

- Worked applications: (1) Bind a model from the request body and return Created; (2) Return the correct typed result for success and not-found
- Common misconception addressed: Returning a 200 for everything regardless of outcome
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Binding from route, query and body | 120 | 7 |
| M03L02 | TypedResults and status codes | 120 | 7 |

### M04 Filters and validation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add an endpoint filter that logs or validates a request; (2) Return RFC-7807 problem details for invalid input
- Common misconception addressed: Skipping validation because the handler is short
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Endpoint filters | 120 | 7 |
| M04L02 | Validating input and problem details | 120 | 7 |

### M05 Cross-cutting concerns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Require authorization on a route group; (2) Expose OpenAPI metadata via WithName and grouping
- Common misconception addressed: Putting every endpoint inline in Program.cs with no structure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Auth, OpenAPI and grouping | 120 | 7 |
| M05L02 | Organising endpoints across files | 120 | 7 |

## Integrative case

Build a minimal API for a todo service: map CRUD endpoints, apply route constraints and a MapGroup prefix, bind request bodies and return the correct typed results, validate input with problem details, require authorization on the group, and expose OpenAPI metadata.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0827-final-protected | 40 | 50 | yes |
| MST-0827-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Minimal API fundamentals | 8 |
| Routing and parameters | 8 |
| Parameter binding and results | 8 |
| Filters and validation | 8 |
| Cross-cutting concerns | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0827-Q0001** (single-answer, Select ONE) Why give an endpoint a name with WithName and use link generation instead of hard-coding paths?

- A. Named endpoints let you generate URLs without hard-coding, so paths can change safely **(key)**  
  _Rationale:_ Correct: link generation from names avoids brittle hard-coded paths.
- B. Because names encrypt the route  
  _Rationale:_ Names do not encrypt anything.
- C. Because unnamed endpoints cannot be called  
  _Rationale:_ Unnamed endpoints are still routable.
- D. Because names remove the need for route parameters  
  _Rationale:_ Parameters are separate from endpoint names.

**MST-0827-Q0002** (multiple-answer, Select TWO) Which TWO are good practices for minimal API results? (Select TWO.)

- A. Return TypedResults.Created with a location for a successful create **(key)**  
  _Rationale:_ Correct: a 201 with a location is the correct created response.
- B. Return a not-found result when the resource does not exist **(key)**  
  _Rationale:_ Correct: status codes should reflect the actual outcome.
- C. Return 200 OK for every response including errors  
  _Rationale:_ Uniform 200s hide real outcomes from clients.
- D. Never set a status code  
  _Rationale:_ Correct status codes are part of a usable API.

**MST-0827-Q0003** (single-answer, Select ONE) What does the route template /todos/{id:int} do?

- A. Matches only when the id segment parses as an integer **(key)**  
  _Rationale:_ Correct: the :int constraint restricts matching to integer values.
- B. Matches any value for id including text  
  _Rationale:_ The :int constraint excludes non-integer values.
- C. Rejects all requests  
  _Rationale:_ It matches integer ids.
- D. Binds id as a string always  
  _Rationale:_ The constraint binds and validates it as an int.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
