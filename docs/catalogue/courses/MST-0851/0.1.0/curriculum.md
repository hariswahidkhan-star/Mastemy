# Spring Boot: Production REST API Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0851` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Legacy IDs | MST-PRG-SK-SB-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Spring Boot auto-configuration and dependency injection
2. Build REST controllers with validation and consistent error handling
3. Access data and manage configuration across environments
4. Apply production concerns: health, metrics, and testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **n/a-no-official-syllabus**. Source(s) consulted:
- none (no external source; Mastemy skills course)

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Spring Boot fundamentals

- Purpose: Teach the Spring container, DI and auto-configuration.
- Worked applications: (1) Register a service bean and inject it into a controller; (2) Explain how a starter dependency triggers auto-configuration
- Common misconception addressed: Thinking auto-configuration means Spring guesses business logic
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Spring container and beans | 80 | 5 |
| M01L02 | Dependency injection | 80 | 5 |
| M01L03 | Starters and auto-configuration | 80 | 5 |

### M02 Building the REST API

- Purpose: Teach REST controllers, validation and error handling.
- Worked applications: (1) Expose CRUD endpoints for a resource with proper status codes; (2) Validate a request body and return a structured error response
- Common misconception addressed: Returning 200 OK for every response regardless of outcome
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | REST controllers and mapping | 80 | 5 |
| M02L02 | Request validation | 80 | 5 |
| M02L03 | Consistent error handling | 80 | 5 |

### M03 Data, config and production

- Purpose: Teach data access, configuration and production readiness.
- Worked applications: (1) Load different settings per environment with profiles; (2) Expose health and metrics endpoints and add a slice test
- Common misconception addressed: Hard-coding environment-specific values into the code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data access basics | 80 | 5 |
| M03L02 | Externalized configuration and profiles | 80 | 5 |
| M03L03 | Health, metrics and testing | 80 | 5 |

## Integrative case

Turn a prototype controller into a production REST API: add request validation and structured errors, externalize configuration per environment, and expose health and metrics with a test that covers the web layer.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0851-final-protected | 30 | 30 | yes |
| MST-0851-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Spring Boot fundamentals | 10 |
| Building the REST API | 10 |
| Data, config and production | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0851-Q0001** (single-answer, Select ONE) What does Spring Boot auto-configuration actually do?

- A. It configures beans automatically based on the classpath and properties, which you can override **(key)**  
  _Rationale:_ Correct: auto-configuration wires sensible defaults from the classpath/properties and is overridable.
- B. It writes your business logic for you  
  _Rationale:_ Auto-configuration wires infrastructure, not business logic.
- C. It prevents you from defining your own beans  
  _Rationale:_ Your explicit beans override auto-configured ones.
- D. It only works without any dependencies on the classpath  
  _Rationale:_ It reacts to what is on the classpath; dependencies are what trigger it.

**MST-0851-Q0002** (multiple-answer, Select TWO) Select TWO practices for a well-behaved Spring Boot REST endpoint.

- A. Validate the request body and return 400 for invalid input **(key)**  
  _Rationale:_ Correct: validating input and returning 400 communicates client errors clearly.
- B. Return status codes that reflect the outcome (e.g. 201 on create, 404 when missing) **(key)**  
  _Rationale:_ Correct: meaningful status codes are part of a correct REST API.
- C. Return 200 OK for every response including errors  
  _Rationale:_ Masking errors as 200 misleads clients.
- D. Put database credentials directly in the controller code  
  _Rationale:_ Secrets belong in externalized configuration, not source.
- E. Swallow all exceptions and return an empty body  
  _Rationale:_ Silently swallowing errors hides failures from clients.

**MST-0851-Q0003** (single-answer, Select ONE) How should environment-specific settings (like a database URL) be handled in Spring Boot?

- A. Externalize them via configuration and profiles per environment **(key)**  
  _Rationale:_ Correct: externalized config with profiles keeps environment values out of code.
- B. Hard-code them in the Java source  
  _Rationale:_ Hard-coding couples the build to one environment and leaks values.
- C. Store them in the compiled class names  
  _Rationale:_ Class names are not a configuration mechanism.
- D. Ask the user to type them on every request  
  _Rationale:_ Infrastructure settings are not per-request user input.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
