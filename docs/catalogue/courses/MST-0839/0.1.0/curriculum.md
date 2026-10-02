# .NET Integration Testing and Contract Testing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0839` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-ASPNET-ITEST** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write ASP.NET Core integration tests using WebApplicationFactory and TestServer
2. Replace external dependencies with test stubs and seed test data
3. Test authentication and authorization paths with a mock handler
4. Use contract testing to keep service producers and consumers compatible

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/aspnet/core/test/integration-tests

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 WebApplicationFactory and TestServer

- Purpose: Teach bootstrapping the app in-memory for integration tests.
- Worked applications: (1) Write a test that hits an endpoint and asserts status code and content type; (2) Use WithWebHostBuilder to override configuration for a single test
- Common misconception addressed: Confusing integration tests with pure unit tests of a single class
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | WebApplicationFactory and the test server | 80 | 5 |
| M01L02 | HttpClient from CreateClient and client options | 80 | 5 |
| M01L03 | Choosing a test framework (xUnit, NUnit, MSTest) | 80 | 5 |

### M02 Test data, dependencies and auth

- Purpose: Teach seeding data, replacing services and mocking authentication.
- Worked applications: (1) Swap a real payment gateway for a test double via ConfigureTestServices; (2) Seed a test database so a delete endpoint has a record to remove
- Common misconception addressed: Letting tests depend on shared mutable state left by earlier tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Seeding and resetting test data | 80 | 5 |
| M02L02 | Injecting mock services | 80 | 5 |
| M02L03 | Mocking authentication with a test auth handler | 80 | 5 |

### M03 Contract testing

- Purpose: Teach consumer-driven contracts so producers and consumers stay compatible.
- Worked applications: (1) Define a consumer contract for an API response and verify the producer against it; (2) Catch a breaking change by running the contract test in CI
- Common misconception addressed: Believing end-to-end tests alone remove the need for contracts between services
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Why contract testing | 80 | 5 |
| M03L02 | Consumer-driven contracts | 80 | 5 |
| M03L03 | Running contract checks in CI | 80 | 5 |

## Integrative case

Two teams keep breaking each other when an API changes shape. Add ASP.NET Core integration tests with WebApplicationFactory, replace the external gateway with a stub, and introduce consumer-driven contract tests in CI so breaking changes fail fast.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0839-final-protected | 30 | 30 | yes |
| MST-0839-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| WebApplicationFactory and TestServer | 10 |
| Test data, dependencies and auth | 10 |
| Contract testing | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0839-Q0001** (single-answer, Select ONE) What does WebApplicationFactory<TEntryPoint> provide for ASP.NET Core integration tests?

- A. An in-memory TestServer and an HttpClient that exercises the real request pipeline **(key)**  
  _Rationale:_ Correct: it bootstraps the app in-memory and hands you an HttpClient against the real pipeline.
- B. A mocking library that replaces all classes automatically  
  _Rationale:_ It does not auto-mock classes; it hosts the app for testing.
- C. A production load balancer  
  _Rationale:_ It is a test host, not production infrastructure.
- D. A replacement for the application Program entry point  
  _Rationale:_ TEntryPoint usually IS Program; the factory uses it rather than replacing it.

**MST-0839-Q0002** (multiple-answer, Select TWO) You are writing integration tests that must not call a real external payment provider. Select TWO sound practices.

- A. Register a test double for the provider via ConfigureTestServices **(key)**  
  _Rationale:_ Correct: replacing the service with a test double isolates the test from the external call.
- B. Seed and reset test data so tests do not depend on each other order **(key)**  
  _Rationale:_ Correct: independent, seeded data keeps tests deterministic.
- C. Call the live payment API with production credentials  
  _Rationale:_ Hitting the live provider makes tests slow, flaky and unsafe.
- D. Share one mutable static record across all tests  
  _Rationale:_ Shared mutable state causes order-dependent, brittle tests.
- E. Hard-code a sleep to wait for the external system  
  _Rationale:_ Arbitrary sleeps are flaky and still depend on the external system.

**MST-0839-Q0003** (single-answer, Select ONE) What problem does consumer-driven contract testing primarily address?

- A. Detecting when a producer change would break an existing consumer expectation **(key)**  
  _Rationale:_ Correct: contracts capture consumer expectations so producer changes that break them fail early.
- B. Measuring the CPU performance of a service  
  _Rationale:_ Contract testing is about compatibility, not performance measurement.
- C. Replacing the need for any unit tests  
  _Rationale:_ Contracts complement rather than replace unit tests.
- D. Encrypting traffic between services  
  _Rationale:_ Contracts verify shape and expectations, not transport encryption.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
