# Flask and FastAPI

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1554` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-FF-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Flask and FastAPI (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Flask foundations
2. Flask request handling
3. FastAPI foundations
4. Pydantic models
5. Async and concurrency
6. Dependency injection
7. Automatic docs and OpenAPI
8. Testing and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on building APIs with Flask and FastAPI; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Flask foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a route returning JSON in Flask; (2) Split routes into a blueprint
- Common misconception addressed: Using global state that breaks under concurrency
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | App, routes and the request object | 75 | 5 |
| M01L02 | Blueprints and app structure | 75 | 5 |

### M02 Flask request handling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Read JSON body and return a 201; (2) Register a custom error handler
- Common misconception addressed: Returning plain strings where JSON is expected
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Parsing requests and responses | 75 | 5 |
| M02L02 | Error handling and status codes | 75 | 5 |

### M03 FastAPI foundations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Define a typed GET endpoint; (2) Run the app with an ASGI server
- Common misconception addressed: Expecting FastAPI to run on a WSGI server unchanged
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Path operations and type hints | 75 | 5 |
| M03L02 | ASGI and running with Uvicorn | 75 | 5 |

### M04 Pydantic models (MASTEMY-DESIGN 13%)

- Worked applications: (1) Validate a request body with a Pydantic model; (2) Shape a response model to hide fields
- Common misconception addressed: Returning ORM objects without a response model
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Request/response models | 75 | 5 |
| M04L02 | Validation and serialization | 75 | 5 |

### M05 Async and concurrency (MASTEMY-DESIGN 12%)

- Worked applications: (1) Call an async client inside an endpoint; (2) Decide between sync and async for a CPU task
- Common misconception addressed: Using async def for blocking CPU-bound work
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | async def path operations | 75 | 5 |
| M05L02 | When async helps vs hurts | 75 | 5 |

### M06 Dependency injection (MASTEMY-DESIGN 13%)

- Worked applications: (1) Inject a database session as a dependency; (2) Build an auth dependency for protected routes
- Common misconception addressed: Creating a new DB connection per request manually
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | FastAPI dependencies | 75 | 5 |
| M06L02 | Shared resources and auth dependencies | 75 | 5 |

### M07 Automatic docs and OpenAPI (MASTEMY-DESIGN 12%)

- Worked applications: (1) Annotate parameters so docs are accurate; (2) Describe response models in the schema
- Common misconception addressed: Leaving endpoints undocumented and untyped
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Swagger UI and schema | 75 | 5 |
| M07L02 | Documenting parameters and responses | 75 | 5 |

### M08 Testing and deployment (MASTEMY-DESIGN 12%)

- Worked applications: (1) Test an endpoint with the test client; (2) Pick a framework for a given workload
- Common misconception addressed: Assuming one framework is always better regardless of needs
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Testing with the test client | 75 | 5 |
| M08L02 | Choosing Flask vs FastAPI | 75 | 5 |

## Integrative case

Build a small API twice-conceptually in Flask and FastAPI: define routes, validate input, document the endpoints, add async where it helps, and compare how each framework handles serialization and dependency injection.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1554-final-protected | 40 | 40 | yes |
| MST-1554-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Flask foundations | 5 |
| Flask request handling | 5 |
| FastAPI foundations | 5 |
| Pydantic models | 5 |
| Async and concurrency | 5 |
| Dependency injection | 5 |
| Automatic docs and OpenAPI | 5 |
| Testing and deployment | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1554-Q0001** (single-answer, Select ONE) What does a Pydantic model provide to a FastAPI endpoint?

- A. Automatic request validation and typed parsing of the body **(key)**  
  _Rationale:_ Correct: Pydantic validates and coerces input against the declared types.
- B. A production ASGI server  
  _Rationale:_ The server (e.g. Uvicorn) is separate.
- C. Database migrations  
  _Rationale:_ Pydantic does not manage schemas.
- D. HTML template rendering  
  _Rationale:_ That is unrelated to Pydantic models.

**MST-1554-Q0002** (single-answer, Select ONE) When is declaring a FastAPI path operation with async def a poor choice?

- A. When the handler performs blocking CPU-bound work **(key)**  
  _Rationale:_ Correct: blocking work in an async handler stalls the event loop; use a thread/process pool.
- B. When calling an async database client  
  _Rationale:_ That is an ideal use of async.
- C. When awaiting an HTTP request to another service  
  _Rationale:_ I/O awaits are exactly what async is for.
- D. When the endpoint returns JSON  
  _Rationale:_ Return type does not dictate sync vs async.

**MST-1554-Q0003** (multiple-answer, Select ALL that apply) Which statements comparing Flask and FastAPI are correct? (Select TWO)

- A. FastAPI generates OpenAPI docs automatically from type hints and models **(key)**  
  _Rationale:_ Correct: interactive docs come for free from the declarations.
- B. Flask is a WSGI framework while FastAPI is built on ASGI **(key)**  
  _Rationale:_ Correct: this underlies their concurrency models.
- C. Flask validates request bodies automatically from type hints  
  _Rationale:_ False; Flask needs explicit validation or an extension.
- D. FastAPI cannot define synchronous endpoints  
  _Rationale:_ False; plain def path operations are supported.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
