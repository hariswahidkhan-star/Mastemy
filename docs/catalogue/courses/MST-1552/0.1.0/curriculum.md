# Express.js APIs

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1552` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-EJA-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Express.js APIs (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Express foundations
2. Middleware
3. Building REST endpoints
4. Error handling
5. Data persistence
6. Authentication and security
7. Testing APIs
8. Project structure and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on building HTTP APIs with Express.js; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Express foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a GET route that returns JSON; (2) Read a route parameter and query string
- Common misconception addressed: Forgetting to send a response, leaving the request hanging
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The request/response cycle | 75 | 5 |
| M01L02 | Routing and route parameters | 75 | 5 |

### M02 Middleware (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add a request-logging middleware; (2) Parse JSON bodies with express.json()
- Common misconception addressed: Putting error-handling middleware before the routes
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing and ordering middleware | 75 | 5 |
| M02L02 | Built-in and third-party middleware | 75 | 5 |

### M03 Building REST endpoints (MASTEMY-DESIGN 12%)

- Worked applications: (1) Implement full CRUD for a resource; (2) Validate a request body and return 400 on failure
- Common misconception addressed: Returning 200 for a created resource instead of 201
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CRUD routes and status codes | 75 | 5 |
| M03L02 | Request validation | 75 | 5 |

### M04 Error handling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Forward an async error to the error handler; (2) Return a consistent JSON error shape
- Common misconception addressed: Not catching rejected promises in async handlers
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Centralised error middleware | 75 | 5 |
| M04L02 | Async errors and next() | 75 | 5 |

### M05 Data persistence (MASTEMY-DESIGN 12%)

- Worked applications: (1) Wire a controller to a database query; (2) Isolate data access behind a repository
- Common misconception addressed: Mixing SQL/ORM calls directly inside route handlers
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Connecting to a database | 75 | 5 |
| M05L02 | Repository pattern and queries | 75 | 5 |

### M06 Authentication and security (MASTEMY-DESIGN 13%)

- Worked applications: (1) Protect a route with a token-check middleware; (2) Add security headers and rate limiting
- Common misconception addressed: Storing secrets or tokens in source control
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Tokens and sessions | 75 | 5 |
| M06L02 | Securing routes and headers | 75 | 5 |

### M07 Testing APIs (MASTEMY-DESIGN 12%)

- Worked applications: (1) Test an endpoint with supertest; (2) Mock the data layer in a controller test
- Common misconception addressed: Testing only the happy path and skipping error cases
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Unit vs integration tests | 75 | 5 |
| M07L02 | Testing routes with a test client | 75 | 5 |

### M08 Project structure and deployment (MASTEMY-DESIGN 12%)

- Worked applications: (1) Split routes, controllers and services into layers; (2) Load configuration from environment variables
- Common misconception addressed: Hardcoding ports and config for a single environment
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Layered structure and config | 75 | 5 |
| M08L02 | Logging and deployment basics | 75 | 5 |

## Integrative case

Design a RESTful Express API for a small bookstore: define routes and controllers, add validation and error-handling middleware, secure an endpoint with authentication, and structure the project so it is testable.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1552-final-protected | 40 | 40 | yes |
| MST-1552-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Express foundations | 5 |
| Middleware | 5 |
| Building REST endpoints | 5 |
| Error handling | 5 |
| Data persistence | 5 |
| Authentication and security | 5 |
| Testing APIs | 5 |
| Project structure and deployment | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1552-Q0001** (single-answer, Select ONE) What is the correct order for registering error-handling middleware in Express?

- A. After all routes, as the last middleware with four parameters (err, req, res, next) **(key)**  
  _Rationale:_ Correct: Express identifies error middleware by its four-argument signature and it must come last.
- B. Before any routes so it runs first  
  _Rationale:_ Then it would never catch route errors.
- C. Inside each route handler only  
  _Rationale:_ A centralised handler avoids duplication and catches forwarded errors.
- D. It must have exactly two parameters  
  _Rationale:_ Error middleware is recognised by its four parameters.

**MST-1552-Q0002** (single-answer, Select ONE) Which HTTP status code best indicates a resource was successfully created?

- A. 201 Created **(key)**  
  _Rationale:_ Correct: 201 signals a new resource was created.
- B. 200 OK  
  _Rationale:_ 200 is a generic success, less precise for creation.
- C. 204 No Content  
  _Rationale:_ 204 means success with no body, used for deletes/updates.
- D. 400 Bad Request  
  _Rationale:_ 400 indicates a client error, not success.

**MST-1552-Q0003** (multiple-answer, Select ALL that apply) Which practices improve an async Express route handler? (Select TWO)

- A. Wrap awaited calls so rejected promises are passed to next(err) **(key)**  
  _Rationale:_ Correct: unhandled rejections otherwise crash or hang the request.
- B. Return appropriate status codes for validation failures **(key)**  
  _Rationale:_ Correct: clear status codes communicate outcomes to clients.
- C. Perform all database work synchronously to avoid promises  
  _Rationale:_ False; blocking the event loop harms throughput.
- D. Catch errors and silently return 200  
  _Rationale:_ False; hiding errors as success misleads clients.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
