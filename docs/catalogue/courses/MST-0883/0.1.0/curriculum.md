# Node.js: Backend Application Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0883` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Node.js documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Node.js: Backend Application Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Node.js runtime and event loop
2. Use modules and manage dependencies
3. Work with asynchronous patterns and promises
4. Build an HTTP server and handle requests
5. Handle errors, configuration and environment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Runtime and event loop (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace an async operation through the loop; (2) Explain non-blocking I/O
- Common misconception addressed: Assuming Node.js runs code in parallel threads by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Node.js runtime | 120 | 7 |
| M01L02 | The event loop and non-blocking I/O | 120 | 7 |

### M02 Modules and packages (MASTEMY-DESIGN 20%)

- Worked applications: (1) Export and import a module; (2) Add and pin a dependency
- Common misconception addressed: Committing node_modules instead of a lockfile
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Modules (CommonJS and ESM) | 120 | 7 |
| M02L02 | npm and dependency management | 120 | 7 |

### M03 Async patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Convert a callback to async/await; (2) Catch an error from an awaited call
- Common misconception addressed: Forgetting to await a promise and losing errors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Callbacks, promises and async/await | 120 | 7 |
| M03L02 | Error handling in async code | 120 | 7 |

### M04 HTTP servers (MASTEMY-DESIGN 20%)

- Worked applications: (1) Serve a response for a route; (2) Read a request body
- Common misconception addressed: Blocking the event loop with heavy synchronous work in a handler
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Creating an HTTP server | 120 | 7 |
| M04L02 | Routing and request handling | 120 | 7 |

### M05 Errors and config (MASTEMY-DESIGN 20%)

- Worked applications: (1) Centralize error handling; (2) Load configuration from the environment
- Common misconception addressed: Hardcoding secrets in source code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Error handling and logging | 120 | 7 |
| M05L02 | Environment and configuration | 120 | 7 |

## Integrative case

Build a small Node.js backend: structure it with modules and a lockfile, use async/await with proper error handling, serve HTTP routes without blocking the event loop, and load configuration and secrets from the environment.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0883-final-protected | 40 | 50 | yes |
| MST-0883-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Runtime and event loop | 8 |
| Modules and packages | 8 |
| Async patterns | 8 |
| HTTP servers | 8 |
| Errors and config | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0883-Q0001** (single-answer, Select ONE) The Node.js event loop enables what?

- A. Handling many concurrent operations with non-blocking I/O on a single thread **(key)**  
  _Rationale:_ Correct: the event loop schedules non-blocking I/O without one thread per request.
- B. Running all JavaScript in parallel OS threads automatically  
  _Rationale:_ Node.js JS runs on a single main thread by default.
- C. Blocking until each request fully completes  
  _Rationale:_ Blocking defeats the non-blocking model.
- D. Replacing the need for asynchronous code  
  _Rationale:_ Async patterns are how you use the event loop effectively.

**MST-0883-Q0002** (multiple-answer, Select TWO) Which TWO are good Node.js dependency practices? (Select TWO.)

- A. Commit the lockfile to pin dependency versions **(key)**  
  _Rationale:_ Correct: a lockfile makes installs reproducible.
- B. Load secrets from environment variables, not source code **(key)**  
  _Rationale:_ Correct: secrets belong in the environment, not the repo.
- C. Commit the node_modules folder to the repository  
  _Rationale:_ node_modules is regenerated from the lockfile and should be ignored.
- D. Hardcode API keys in a committed file  
  _Rationale:_ Committing secrets is a security risk.

**MST-0883-Q0003** (single-answer, Select ONE) What happens if you forget to await a promise in an async handler?

- A. The code may continue before the work finishes and errors can be missed **(key)**  
  _Rationale:_ Correct: an un-awaited promise runs detached and its rejection can be lost.
- B. Node.js automatically awaits it for you  
  _Rationale:_ Node does not auto-await promises.
- C. The server always crashes immediately  
  _Rationale:_ It often fails silently rather than crashing.
- D. The promise never executes  
  _Rationale:_ It executes, just not awaited.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
