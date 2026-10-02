# Serverless Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1587` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Serverless Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Serverless fundamentals and FaaS
2. Event-driven design and triggers
3. Functions, cold starts and performance
4. State, storage and integration
5. Observability, cost and limits
6. Security and deployment patterns

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Serverless fundamentals and FaaS (MASTEMY-DESIGN 16%)

- Worked applications: (1) Decide if a workload suits serverless; (2) List what the provider manages in FaaS
- Common misconception addressed: Thinking 'serverless' means there are no servers at all
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What serverless and FaaS mean | 80 | 6 |
| M01L02 | When serverless fits and when it does not | 80 | 6 |

### M02 Event-driven design and triggers (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pick the right trigger for a use case; (2) Design an event flow for an image upload
- Common misconception addressed: Forcing a request/response shape onto an event-driven problem
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Events, triggers and sources | 80 | 6 |
| M02L02 | Designing event-driven flows | 80 | 6 |

### M03 Functions, cold starts and performance (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain what causes a cold start; (2) Choose a technique to reduce cold-start latency
- Common misconception addressed: Assuming a function is always warm and instant
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Function lifecycle and cold starts | 80 | 6 |
| M03L02 | Reducing cold-start and improving performance | 80 | 6 |

### M04 State, storage and integration (MASTEMY-DESIGN 16%)

- Worked applications: (1) Move state out of a function into a store; (2) Connect a function to a queue for buffering
- Common misconception addressed: Keeping state in a function's local memory between invocations
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Statelessness and external state | 80 | 6 |
| M04L02 | Integrating with queues, stores and APIs | 80 | 6 |

### M05 Observability, cost and limits (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace a request across functions and services; (2) Estimate cost from invocations and duration
- Common misconception addressed: Ignoring concurrency limits and per-invocation timeouts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Monitoring and tracing serverless | 80 | 6 |
| M05L02 | Cost model, concurrency and limits | 80 | 6 |

### M06 Security and deployment patterns (MASTEMY-DESIGN 18%)

- Worked applications: (1) Scope a function's permissions to least privilege; (2) Roll out a new function version safely
- Common misconception addressed: Giving every function broad admin permissions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Least-privilege function permissions | 80 | 6 |
| M06L02 | Deploying and versioning functions safely | 80 | 6 |

## Integrative case

Design a serverless image-processing pipeline: trigger a function on upload, keep it stateless by writing results to a store and buffering work through a queue, reduce cold-start impact, add tracing and a cost estimate under concurrency limits, and deploy new versions safely with least-privilege permissions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1587-final-protected | 30 | 30 | yes |
| MST-1587-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Serverless fundamentals and FaaS | 5 |
| Event-driven design and triggers | 5 |
| Functions, cold starts and performance | 5 |
| State, storage and integration | 5 |
| Observability, cost and limits | 5 |
| Security and deployment patterns | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1587-Q0001** (single-answer, Select ONE) What does 'serverless' actually mean for a function-as-a-service workload?

- A. Servers still exist but the provider manages provisioning and scaling for you **(key)**  
  _Rationale:_ Correct: serverless abstracts server management; it does not eliminate servers.
- B. The code runs without any servers anywhere  
  _Rationale:_ Servers still run the code; they are just managed by the provider.
- C. The function keeps all state in local memory permanently  
  _Rationale:_ Functions are ephemeral and should be stateless.
- D. There is no cost for any invocations  
  _Rationale:_ Invocations and duration are billed.

**MST-1587-Q0002** (multiple-answer, Select ALL that apply) Which two design choices suit an event-driven serverless pipeline? (Select TWO)

- A. Triggering functions from events such as a file upload or a queue message **(key)**  
  _Rationale:_ Correct: event triggers are the natural fit for serverless.
- B. Keeping functions stateless and storing data in an external store **(key)**  
  _Rationale:_ Correct: statelessness lets functions scale and recover independently.
- C. Relying on in-memory state persisting across separate invocations  
  _Rationale:_ Function instances are ephemeral; local state is not reliable between invocations.
- D. Assuming a single function instance handles all traffic sequentially  
  _Rationale:_ Serverless scales out concurrently; it is not a single sequential worker.

**MST-1587-Q0003** (single-answer, Select ONE) What causes a 'cold start' for a serverless function?

- A. The platform must initialise a new execution environment before the function can run **(key)**  
  _Rationale:_ Correct: a cold start is the setup time when no warm instance is available.
- B. The function's code contains a syntax error  
  _Rationale:_ A syntax error is a failure, not a cold start.
- C. The user's internet connection is slow  
  _Rationale:_ Cold start is about environment initialisation, not the client link.
- D. The function has too few lines of code  
  _Rationale:_ Code length does not define a cold start.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
