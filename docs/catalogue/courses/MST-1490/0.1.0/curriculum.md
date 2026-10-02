# AWS Step Functions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1490` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://docs.aws.amazon.com/step-functions/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS Step Functions (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain workflow orchestration and when to use Step Functions
2. Build state machines with core state types
3. Choose Standard vs Express workflows
4. Integrate services with task states
5. Handle errors with retry and catch
6. Observe and debug executions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Orchestration (MASTEMY-DESIGN 16%)

- Worked applications: (1) Identify a workflow that needs orchestration; (2) Describe the Amazon States Language
- Common misconception addressed: Hand-coding orchestration where a state machine is clearer
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why orchestration | 48 | 5 |
| M01L02 | Step Functions overview | 48 | 5 |
### M02 State types (MASTEMY-DESIGN 16%)

- Worked applications: (1) Branch with a Choice state; (2) Fan out work with a Map state
- Common misconception addressed: Putting branching logic in code instead of a Choice state
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Task and Choice states | 48 | 5 |
| M02L02 | Parallel and Map states | 48 | 5 |
### M03 Workflow types (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose Standard for long, auditable workflows; (2) Choose Express for high-volume short runs
- Common misconception addressed: Using Standard for very high-volume, short events (cost/latency)
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Standard workflows | 48 | 5 |
| M03L02 | Express workflows | 48 | 5 |
### M04 Service integrations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Invoke a Lambda from a task state; (2) Call another AWS service directly
- Common misconception addressed: Wrapping every integration in Lambda unnecessarily
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Invoking Lambda | 48 | 5 |
| M04L02 | Optimized service integrations | 48 | 5 |
### M05 Error handling (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add exponential backoff retries; (2) Catch an error and run a fallback state
- Common misconception addressed: Assuming failed tasks retry without a retry policy
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Retry policies | 48 | 5 |
| M05L02 | Catch and fallback | 48 | 5 |
### M06 Observability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace a failed execution in the console; (2) Use metrics to find slow states
- Common misconception addressed: Ignoring execution history when debugging
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Execution history | 48 | 5 |
| M06L02 | Debugging and metrics | 48 | 5 |

## Integrative case

A team orchestrates a multi-step workflow: build a Step Functions state machine with task, choice, parallel and retry states, choose Standard vs Express, integrate Lambda and other services, handle errors, and observe executions, then compare to hand-rolled orchestration.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1490-final-protected | 30 | 30 | yes |
| MST-1490-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Orchestration | 5 |
| State types | 5 |
| Workflow types | 5 |
| Service integrations | 5 |
| Error handling | 5 |
| Observability | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1490-Q0001** (single-answer, Select ONE) Which Step Functions state type is used to choose between branches based on input?

- A. Choice state **(key)**  
  _Rationale:_ Correct: a Choice state branches execution based on input conditions.
- B. Task state  
  _Rationale:_ A Task state does work; it does not branch.
- C. Pass state  
  _Rationale:_ A Pass state forwards input without branching.
- D. Succeed state  
  _Rationale:_ A Succeed state ends execution successfully.

**MST-1490-Q0002** (multiple-answer, Select TWO) Which TWO are true when choosing between Standard and Express workflows? (Select TWO.)

- A. Standard suits long-running, auditable workflows with full execution history **(key)**  
  _Rationale:_ Correct: Standard retains full history and supports long durations.
- B. Express suits very high-volume, short-duration workloads **(key)**  
  _Rationale:_ Correct: Express is optimized for high event rates and short runs.
- C. Express keeps unlimited full execution history for a year by default  
  _Rationale:_ Express has limited history retention, unlike Standard.
- D. Standard is always cheaper than Express at any volume  
  _Rationale:_ Cost depends on volume and duration; neither is always cheaper.

**MST-1490-Q0003** (single-answer, Select ONE) How should a task that may fail transiently be made more resilient in a state machine?

- A. Add a Retry policy with backoff, and a Catch for a fallback **(key)**  
  _Rationale:_ Correct: Retry with backoff handles transient failures; Catch routes to a fallback.
- B. Remove all error handling so it fails fast every time  
  _Rationale:_ Removing handling makes transient failures fatal.
- C. Assume transient errors never occur  
  _Rationale:_ Transient errors do occur and must be handled.
- D. Delete the task state  
  _Rationale:_ Deleting the task removes the work, not the error risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
