# NestJS: Scalable TypeScript Backend Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0885` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — NestJS: Scalable TypeScript Backend Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure a NestJS application with modules, controllers and providers
2. Use dependency injection and provider scopes correctly
3. Validate requests and shape responses with pipes and DTOs
4. Apply guards, interceptors and filters as cross-cutting concerns
5. Access data and test a NestJS service

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Modules and structure (MASTEMY-DESIGN 20%)

- Worked applications: (1) Split a feature into a module with controller and service; (2) Import and export providers between modules
- Common misconception addressed: Putting everything in one root module
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Modules, controllers and providers | 120 | 7 |
| M01L02 | Module boundaries and exports | 120 | 7 |

### M02 Dependency injection (MASTEMY-DESIGN 20%)

- Worked applications: (1) Inject a service via the constructor; (2) Choose a provider scope and justify it
- Common misconception addressed: Instantiating services manually instead of via DI
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The Nest DI container | 120 | 7 |
| M02L02 | Provider scopes and custom providers | 120 | 7 |

### M03 Validation and DTOs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Validate a request body with a DTO and a pipe; (2) Reject invalid input with a 400
- Common misconception addressed: Trusting request bodies without validation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | DTOs and validation pipes | 120 | 7 |
| M03L02 | Transformation and serialization | 120 | 7 |

### M04 Cross-cutting concerns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Protect a route with a guard; (2) Standardise errors with an exception filter
- Common misconception addressed: Scattering auth checks inside controllers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Guards and interceptors | 120 | 7 |
| M04L02 | Exception filters | 120 | 7 |

### M05 Data and testing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Wire a repository/service to a database; (2) Unit-test a service with a mocked dependency
- Common misconception addressed: Testing only through HTTP and never the service layer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data access in NestJS | 120 | 7 |
| M05L02 | Unit and e2e testing | 120 | 7 |

## Integrative case

Build a NestJS orders service: structure feature modules, inject services via DI, validate request DTOs with a pipe, protect admin routes with a guard and standardise errors with a filter, then test the service with a mocked repository.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0885-final-protected | 40 | 50 | yes |
| MST-0885-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Modules and structure | 8 |
| Dependency injection | 8 |
| Validation and DTOs | 8 |
| Cross-cutting concerns | 8 |
| Data and testing | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0885-Q0001** (single-answer, Select ONE) In NestJS, where should request-body validation rules live?

- A. In a DTO class validated by a validation pipe **(key)**  
  _Rationale:_ Correct: NestJS validates DTOs via pipes, keeping validation declarative and reusable.
- B. Scattered as if-checks inside each controller method  
  _Rationale:_ Ad-hoc checks duplicate logic and are easy to miss.
- C. In the database only  
  _Rationale:_ Relying solely on the database gives poor error messages and late failure.
- D. In the frontend only  
  _Rationale:_ Client-side validation can be bypassed; the server must validate too.

**MST-0885-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of NestJS cross-cutting constructs? (Select TWO.)

- A. A guard to allow or deny a route based on auth **(key)**  
  _Rationale:_ Correct: guards decide access to a route.
- B. An exception filter to standardise error responses **(key)**  
  _Rationale:_ Correct: filters shape error output consistently.
- C. A controller method to hold the DI container  
  _Rationale:_ The framework owns the DI container, not a controller method.
- D. A DTO to open a database connection  
  _Rationale:_ DTOs describe data shape, not connections.

**MST-0885-Q0003** (single-answer, Select ONE) How should a NestJS service obtain its repository dependency?

- A. Via constructor injection managed by the Nest DI container **(key)**  
  _Rationale:_ Correct: NestJS resolves providers through constructor injection.
- B. By calling new Repository() inside each method  
  _Rationale:_ Manual instantiation bypasses DI and hurts testability.
- C. Through a global mutable variable  
  _Rationale:_ Globals undermine isolation and testing.
- D. By importing it as a default export and mutating it  
  _Rationale:_ That bypasses the DI lifecycle.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
