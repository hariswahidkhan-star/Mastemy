# AI-Assisted Debugging Across Application Layers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0573` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Debugging Across Application Layers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply a structured debugging method with AI assistance
2. Interpret errors, logs and traces with AI support
3. Diagnose client-side and rendering faults
4. Diagnose service-layer and integration faults
5. Diagnose data-layer and performance problems
6. Verify fixes and prevent recurrence

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 A disciplined debugging method (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Reproduce and isolate a reported bug; (2) Form a testable hypothesis before changing code
- Common misconception addressed: Changing code before reproducing the bug
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reproduce, isolate, hypothesise | 80 | 8 |
| M01L02 | Using AI without losing the method | 80 | 8 |

### M02 Reading errors, logs and stack traces (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Turn a stack trace into a located cause; (2) Prompt an assistant with the right diagnostic context
- Common misconception addressed: Pasting a trace and trusting the first guess
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Errors, logs and traces | 80 | 8 |
| M02L02 | Giving the assistant useful context | 80 | 8 |

### M03 Frontend and client-side faults (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Trace a state bug in a UI component; (2) Isolate a browser-specific failure
- Common misconception addressed: Blaming the backend for a client bug
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | State and rendering bugs | 80 | 8 |
| M03L02 | Network and client boundaries | 80 | 8 |

### M04 API and service-layer faults (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Localise an intermittent API error; (2) Distinguish a contract bug from a logic bug
- Common misconception addressed: Assuming intermittent means random
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Service logic and contracts | 80 | 8 |
| M04L02 | Timeouts, retries and race conditions | 80 | 8 |

### M05 Data and performance faults (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Find a slow query behind a latency spike; (2) Spot a data-integrity cause of wrong results
- Common misconception addressed: Optimising before measuring
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Query and index problems | 80 | 8 |
| M05L02 | Measuring before optimising | 80 | 8 |

### M06 Verifying fixes and preventing regressions (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Write a test that fails before and passes after; (2) Add a guard that prevents the class of bug
- Common misconception addressed: Declaring a fix without a reproducing test
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Regression tests for fixes | 80 | 8 |
| M06L02 | Prevention and guardrails | 80 | 8 |

## Integrative case

A production incident spans a flaky frontend, an intermittent API error and a slow database query. Use AI assistance to localise each fault across layers, form and test hypotheses, and document a fix and prevention plan without introducing regressions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0573-final-protected | 40 | 40 | yes |
| MST-0573-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| A disciplined debugging method | 7 |
| Reading errors, logs and stack traces | 7 |
| Frontend and client-side faults | 7 |
| API and service-layer faults | 7 |
| Data and performance faults | 6 |
| Verifying fixes and preventing regressions | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0573-Q0001** (single-answer, Select ONE) An AI assistant proposes a fix for an intermittent error on the first try. What should you do before applying it?

- A. Reproduce the failure and confirm the hypothesis explains the intermittency **(key)**  
  _Rationale:_ Correct: a fix is only sound once the cause is confirmed.
- B. Apply it immediately since the assistant is usually right  
  _Rationale:_ Unverified fixes risk masking the real cause.
- C. Delete the failing feature  
  _Rationale:_ That avoids rather than diagnoses the bug.
- D. Increase server memory and hope  
  _Rationale:_ Guessing is not diagnosis.

**MST-0573-Q0002** (multiple-answer, Select TWO) You hand a stack trace to an assistant. Which TWO additional pieces of context most improve its diagnosis? (Select TWO.)

- A. Steps to reproduce and the expected vs actual behaviour **(key)**  
  _Rationale:_ Correct: reproduction and expectations anchor the diagnosis.
- B. Relevant recent changes or the failing input **(key)**  
  _Rationale:_ Correct: recent diffs and inputs localise the cause.
- C. The company's quarterly revenue  
  _Rationale:_ Irrelevant to the bug.
- D. The developer's years of experience  
  _Rationale:_ Not diagnostic context.

**MST-0573-Q0003** (single-answer, Select ONE) A query is blamed for a latency spike. What is the correct first move?

- A. Measure the query and the path to confirm it is the bottleneck **(key)**  
  _Rationale:_ Correct: measure before optimising.
- B. Add indexes to every column  
  _Rationale:_ Blind indexing can harm writes and may miss the cause.
- C. Rewrite the whole data layer  
  _Rationale:_ Disproportionate without evidence.
- D. Assume the ORM is at fault  
  _Rationale:_ Assumption, not measurement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
