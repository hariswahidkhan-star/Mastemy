# Express: Secure REST API Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0884` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Express documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Express: Secure REST API Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build routes and middleware in Express
2. Design RESTful resources and status codes
3. Validate input and handle errors centrally
4. Secure an API with authentication and headers
5. Test and document an Express API

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Routing and middleware (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a resource route; (2) Write a logging middleware
- Common misconception addressed: Forgetting to call next() in middleware
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Routes and route parameters | 120 | 7 |
| M01L02 | The middleware pipeline | 120 | 7 |

### M02 REST design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map CRUD to HTTP methods; (2) Return the right status code for an error
- Common misconception addressed: Returning 200 for every response including errors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Resources and HTTP methods | 120 | 7 |
| M02L02 | Status codes and responses | 120 | 7 |

### M03 Validation and errors (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reject invalid input with a 400; (2) Funnel errors through one handler
- Common misconception addressed: Trusting request bodies without validation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Validating request input | 120 | 7 |
| M03L02 | Centralized error handling | 120 | 7 |

### M04 Security (MASTEMY-DESIGN 20%)

- Worked applications: (1) Protect a route with auth middleware; (2) Add security headers to responses
- Common misconception addressed: Putting secrets or tokens in query strings
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Authentication and authorization | 120 | 7 |
| M04L02 | Security headers and rate limiting | 120 | 7 |

### M05 Testing and docs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a test for an endpoint; (2) Document a resource and its responses
- Common misconception addressed: Shipping an API with no tests or documentation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Testing endpoints | 120 | 7 |
| M05L02 | Documenting the API | 120 | 7 |

## Integrative case

Build a secure Express REST API for a notes service: define resource routes and middleware, map CRUD to correct methods and status codes, validate input with central error handling, protect routes with authentication and security headers, and cover it with tests and documentation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0884-final-protected | 40 | 50 | yes |
| MST-0884-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Routing and middleware | 8 |
| REST design | 8 |
| Validation and errors | 8 |
| Security | 8 |
| Testing and docs | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0884-Q0001** (single-answer, Select ONE) In Express, what must middleware typically call to pass control to the next handler?

- A. next() **(key)**  
  _Rationale:_ Correct: calling next() advances the middleware pipeline.
- B. return true  
  _Rationale:_ Returning a value does not advance the pipeline.
- C. res.end() always  
  _Rationale:_ res.end() ends the response; it does not pass control onward.
- D. throw an error always  
  _Rationale:_ Throwing is for errors, not normal flow control.

**MST-0884-Q0002** (multiple-answer, Select TWO) Which TWO practices improve Express API security? (Select TWO.)

- A. Validate and reject malformed request input **(key)**  
  _Rationale:_ Correct: input validation prevents malformed or malicious data.
- B. Protect sensitive routes with authentication middleware **(key)**  
  _Rationale:_ Correct: auth middleware enforces access control.
- C. Pass access tokens in the URL query string  
  _Rationale:_ Tokens in URLs leak via logs and history.
- D. Return 200 for every error so clients are not alarmed  
  _Rationale:_ Misleading status codes break clients and hide failures.

**MST-0884-Q0003** (single-answer, Select ONE) Which HTTP status code best indicates a client sent invalid input?

- A. 400 Bad Request **(key)**  
  _Rationale:_ Correct: 400 signals the request was malformed or failed validation.
- B. 200 OK  
  _Rationale:_ 200 indicates success, not a validation failure.
- C. 500 Internal Server Error  
  _Rationale:_ 500 indicates a server fault, not bad client input.
- D. 301 Moved Permanently  
  _Rationale:_ 301 is a redirect, unrelated to invalid input.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
