# API Testing and Contract Validation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1007` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — API Testing and Contract Validation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. API testing fundamentals
2. Functional testing of REST APIs
3. Status codes, schemas and response validation
4. Authentication, authorization and negative testing
5. Contract testing and consumer-driven contracts
6. Automation, CI integration and test data

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 API testing fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Classify tests across the pyramid for an API; (2) Send a request and inspect the full response
- Common misconception addressed: Testing only through the UI and ignoring the API layer
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What to test in an API and the testing pyramid | 80 | 6 |
| M01L02 | Tools and the request/response cycle | 80 | 6 |

### M02 Functional testing of REST APIs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Verify a POST then GET round-trip; (2) Assert that a PUT is idempotent
- Common misconception addressed: Assuming a 200 status means the response body is also correct
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | HTTP methods and idempotency | 80 | 6 |
| M02L02 | CRUD flows and verifying side effects | 80 | 6 |

### M03 Status codes, schemas and response validation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Assert the correct status for a created resource; (2) Validate a payload against a JSON schema
- Common misconception addressed: Checking only the status code and not the response shape
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Status-code semantics | 80 | 6 |
| M03L02 | Validating a response against a JSON schema | 80 | 6 |

### M04 Authentication, authorization and negative testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Assert a 401 for a missing token and 403 for insufficient scope; (2) Send malformed input and assert a 400
- Common misconception addressed: Only testing the happy path and missing error handling
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Testing auth: tokens, scopes and expiry | 80 | 6 |
| M04L02 | Negative and boundary tests | 80 | 6 |

### M05 Contract testing and consumer-driven contracts (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a consumer contract for a required field; (2) Verify a provider against the consumer contract
- Common misconception addressed: Confusing contract tests with full end-to-end integration tests
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | What a contract test verifies | 80 | 6 |
| M05L02 | Consumer-driven contracts and provider verification | 80 | 6 |

### M06 Automation, CI integration and test data (MASTEMY-DESIGN 18%)

- Worked applications: (1) Fail the CI build when an API test fails; (2) Isolate test data so runs do not interfere
- Common misconception addressed: Relying on shared mutable data that makes tests flaky
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Running API tests in CI | 80 | 6 |
| M06L02 | Managing test data and environments | 80 | 6 |

## Integrative case

Build an API test suite for an orders service: cover CRUD flows with status and schema assertions, add auth tests for 401 and 403 and negative tests for 400, create a consumer-driven contract for the fields the client depends on and verify the provider against it, then run the whole suite in CI with isolated test data.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1007-final-protected | 30 | 30 | yes |
| MST-1007-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| API testing fundamentals | 5 |
| Functional testing of REST APIs | 5 |
| Status codes, schemas and response validation | 5 |
| Authentication, authorization and negative testing | 5 |
| Contract testing and consumer-driven contracts | 5 |
| Automation, CI integration and test data | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1007-Q0001** (single-answer, Select ONE) Why is checking only the HTTP status code insufficient when testing an API response?

- A. A correct status can still accompany a wrong or malformed response body **(key)**  
  _Rationale:_ Correct: status and payload are independent; both must be validated.
- B. Status codes are always 200 regardless of outcome  
  _Rationale:_ Status codes vary and carry real meaning.
- C. The body is never part of an API response  
  _Rationale:_ Most responses include a body that must be checked.
- D. Schema validation replaces the need for any assertions  
  _Rationale:_ Schema validation complements, not replaces, other assertions.

**MST-1007-Q0002** (multiple-answer, Select ALL that apply) Which responses should an authorization test assert? (Select TWO)

- A. 401 Unauthorized when no valid credentials are supplied **(key)**  
  _Rationale:_ Correct: 401 signals missing or invalid authentication.
- B. 403 Forbidden when the caller is authenticated but lacks the required scope **(key)**  
  _Rationale:_ Correct: 403 signals authenticated-but-not-permitted.
- C. 200 OK for every request regardless of credentials  
  _Rationale:_ Returning 200 for unauthorised calls is a security defect.
- D. 500 Internal Server Error for a missing token  
  _Rationale:_ A missing token should yield 401, not a server error.

**MST-1007-Q0003** (single-answer, Select ONE) What does a consumer-driven contract test verify?

- A. That the provider meets the expectations the consumer actually depends on **(key)**  
  _Rationale:_ Correct: the consumer's needs define the contract the provider must satisfy.
- B. That the entire system passes an end-to-end scenario  
  _Rationale:_ That is end-to-end testing, broader than a contract test.
- C. That the database schema is normalised  
  _Rationale:_ Contract tests are about API expectations, not DB normalisation.
- D. That the UI renders correctly  
  _Rationale:_ UI rendering is outside an API contract test.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
