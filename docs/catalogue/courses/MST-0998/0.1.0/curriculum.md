# API Design, Versioning, and Developer Experience

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0998` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-RAD-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — API Design, Versioning, and Developer Experience (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. API design principles and resource modelling
2. HTTP semantics, status codes and methods
3. Request and response design and pagination
4. Error handling and consistency
5. Authentication, authorization and rate limiting
6. Versioning and backward compatibility
7. Documentation, SDKs and developer experience
8. Evolution, deprecation and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; live tooling, real incident response and system operation are not assessed in this format.

## Modules

### M01 API design principles and resource modelling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Model a payments API around resources; (2) Decide between REST and RPC for an operation
- Common misconception addressed: Designing endpoints around database tables instead of client use cases
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Designing around resources and use cases | 120 | 6 |
| M01L02 | REST, RPC and when each fits | 120 | 6 |

### M02 HTTP semantics, status codes and methods (MASTEMY-DESIGN 13%)

- Worked applications: (1) Pick the right method for an action; (2) Return the correct status for a failed request
- Common misconception addressed: Using 200 OK for errors and burying the real status in the body
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Choosing correct HTTP methods | 120 | 6 |
| M02L02 | Using status codes meaningfully | 120 | 6 |

### M03 Request and response design and pagination (MASTEMY-DESIGN 12%)

- Worked applications: (1) Design a paginated list response; (2) Add filtering and sorting parameters
- Common misconception addressed: Returning unbounded lists with no pagination
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Shaping request and response payloads | 120 | 6 |
| M03L02 | Pagination, filtering and sorting | 120 | 6 |

### M04 Error handling and consistency (MASTEMY-DESIGN 12%)

- Worked applications: (1) Define a consistent error envelope; (2) Make a POST safely retryable with an idempotency key
- Common misconception addressed: Inventing a different error shape for every endpoint
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Designing a consistent error format | 120 | 6 |
| M04L02 | Idempotency and safe retries | 120 | 6 |

### M05 Authentication, authorization and rate limiting (MASTEMY-DESIGN 13%)

- Worked applications: (1) Choose an auth scheme for a public API; (2) Add rate limits with informative headers
- Common misconception addressed: Putting API keys in query strings and logging them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Auth schemes: keys, tokens and OAuth | 120 | 6 |
| M05L02 | Rate limiting and quotas | 120 | 6 |

### M06 Versioning and backward compatibility (MASTEMY-DESIGN 13%)

- Worked applications: (1) Introduce a new version without breaking clients; (2) Add a field without breaking existing consumers
- Common misconception addressed: Making a breaking change in place instead of versioning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Versioning strategies and trade-offs | 120 | 6 |
| M06L02 | Keeping changes backward compatible | 120 | 6 |

### M07 Documentation, SDKs and developer experience (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a usable endpoint reference; (2) Improve first-call success with a quickstart
- Common misconception addressed: Shipping an API with no documentation or examples
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Writing clear reference documentation | 120 | 6 |
| M07L02 | Generating SDKs and improving onboarding | 120 | 6 |

### M08 Evolution, deprecation and governance (MASTEMY-DESIGN 12%)

- Worked applications: (1) Publish a deprecation notice with a timeline; (2) Run an API design review against guidelines
- Common misconception addressed: Removing a field with no deprecation window
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Deprecation policy and timelines | 120 | 6 |
| M08L02 | API governance and review | 120 | 6 |

## Integrative case

Design a public payments API: model resources and choose HTTP semantics, define consistent pagination and a single error format, add token auth with rate limiting and idempotency keys, plan a versioning and deprecation strategy that never breaks existing clients, and write a quickstart that gets developers to a first successful call quickly.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0998-final-protected | 40 | 40 | yes |
| MST-0998-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| API design principles and resource modelling | 5 |
| HTTP semantics, status codes and methods | 5 |
| Request and response design and pagination | 5 |
| Error handling and consistency | 5 |
| Authentication, authorization and rate limiting | 5 |
| Versioning and backward compatibility | 5 |
| Documentation, SDKs and developer experience | 5 |
| Evolution, deprecation and governance | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0998-Q0001** (single-answer, Select ONE) A client sends the same POST to create a charge twice because of a network retry. What API design prevents a duplicate charge?

- A. Accepting an idempotency key so the server returns the original result instead of creating a second charge **(key)**  
  _Rationale:_ Correct: idempotency keys let the server de-duplicate retried create requests.
- B. Returning 200 OK for every request regardless of outcome  
  _Rationale:_ Masking outcomes with 200 does not prevent duplicates.
- C. Removing authentication from the endpoint  
  _Rationale:_ Auth is unrelated to duplicate prevention.
- D. Disabling pagination on list endpoints  
  _Rationale:_ Pagination has nothing to do with retry safety.

**MST-0998-Q0002** (multiple-answer, Select ALL that apply) Which changes to a JSON REST API are generally backward compatible? (Select TWO)

- A. Adding a new optional field to a response **(key)**  
  _Rationale:_ Correct: adding an optional field does not break existing clients that ignore unknown fields.
- B. Adding a new optional query parameter with a sensible default **(key)**  
  _Rationale:_ Correct: a new optional parameter with a default does not affect existing callers.
- C. Renaming an existing response field  
  _Rationale:_ Renaming a field breaks clients that read the old name.
- D. Changing a field's type from string to object  
  _Rationale:_ Changing an existing field's type is a breaking change.

**MST-0998-Q0003** (single-answer, Select ONE) Which status code best indicates the client sent a syntactically invalid request body?

- A. 400 Bad Request **(key)**  
  _Rationale:_ Correct: 400 signals a client-side error such as a malformed request.
- B. 500 Internal Server Error  
  _Rationale:_ 500 indicates a server fault, not a client input error.
- C. 200 OK  
  _Rationale:_ 200 implies success, which is misleading for an invalid request.
- D. 301 Moved Permanently  
  _Rationale:_ 301 is a redirect, unrelated to request validity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
