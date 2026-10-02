# Claude Code Test-Driven Development and Regression Repair

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0537` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-TDD |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code Test-Driven Development and Regression Repair (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply a test-driven workflow with Claude Code
2. Write a failing test that captures a requirement before implementing it
3. Implement the minimum change to make a test pass without over-building
4. Reproduce a reported bug as a failing regression test before fixing it
5. Keep the suite trustworthy by avoiding tests that pass for the wrong reason

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 The test-driven loop with Claude Code (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Run a red-green-refactor cycle for one small requirement; (2) Decide what the first failing test should assert
- Common misconception addressed: Writing the implementation first and back-filling a test that merely confirms it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Red-green-refactor with Claude Code | 72 | 5 |
| M01L02 | Letting the test define the requirement | 72 | 5 |

### M02 Writing a good failing test (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a failing test that pins down the exact expected behaviour; (2) Confirm the test fails for the right reason before implementing
- Common misconception addressed: Writing a test so loose that it passes even when the behaviour is wrong
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Expressing a requirement as a precise test | 96 | 5 |
| M02L02 | Confirming a test fails for the right reason | 96 | 5 |

### M03 Implementing to pass without over-building (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Make a failing test pass with the minimum change; (2) Resist scope creep while implementing
- Common misconception addressed: Adding speculative features the current test does not require
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Minimum change to green | 80 | 5 |
| M03L02 | Refactoring safely once green | 80 | 5 |
| M03L03 | Avoiding speculative over-engineering | 80 | 5 |

### M04 Regression repair from a bug report (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Reproduce a reported bug as a failing test; (2) Fix the defect and lock it with the regression test
- Common misconception addressed: Fixing a bug without a test, so it can silently return later
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reproducing a bug as a failing test | 96 | 5 |
| M04L02 | Fixing and locking in the regression | 96 | 5 |

### M05 Keeping the suite trustworthy (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Spot a test that passes for the wrong reason; (2) Decide when to delete versus repair a weak test
- Common misconception addressed: Tolerating flaky or tautological tests that pass regardless of behaviour
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Detecting tautological and flaky tests | 96 | 5 |
| M05L02 | Maintaining a suite you can trust | 96 | 5 |

## Integrative case

A developer receives a bug report about a rounding error in an invoice total: they reproduce it as a failing test with Claude Code, fix the calculation, and confirm the new test and the existing suite both pass.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0537-final-protected | 30 | 40 | yes |
| MST-0537-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The test-driven loop with Claude Code | 5 |
| Writing a good failing test | 6 |
| Implementing to pass without over-building | 7 |
| Regression repair from a bug report | 6 |
| Keeping the suite trustworthy | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0537-Q0001** (single-answer, Select ONE) In a test-driven workflow, why confirm the new test fails before writing the implementation?

- A. A test that does not fail first may be asserting nothing or already satisfied, giving false confidence **(key)**
  _Rationale:_ Correct: a failing-first test proves it actually exercises the new behaviour.
- B. Failing tests run faster than passing ones
  _Rationale:_ Execution speed is not the reason.
- C. A test must fail at least once to be committed
  _Rationale:_ There is no such mechanical rule; the point is validity.
- D. Claude Code refuses to implement until a test fails
  _Rationale:_ This is a discipline, not a tool restriction.

**MST-0537-Q0002** (multiple-answer, Select TWO) Which TWO describe correct regression repair from a bug report? (Select TWO.)

- A. Reproduce the bug as a failing test before fixing it **(key)**
  _Rationale:_ Correct: a reproduction test proves the bug and guards against regression.
- B. Confirm the whole suite still passes after the fix **(key)**
  _Rationale:_ Correct: the fix must not break other behaviour.
- C. Fix the code and skip adding a test to save time
  _Rationale:_ Without a test the bug can silently return.
- D. Delete the failing scenario from the backlog
  _Rationale:_ Removing the report does not fix or guard the defect.

**MST-0537-Q0003** (single-answer, Select ONE) A test passes whether or not the function under test is called. This test is:

- A. Tautological and untrustworthy; it should be repaired or removed **(key)**
  _Rationale:_ Correct: a test that cannot fail provides no protection.
- B. Ideal because it never breaks the build
  _Rationale:_ A test that never fails gives false confidence.
- C. Fine as long as coverage numbers rise
  _Rationale:_ Coverage from a meaningless test is misleading.
- D. A good smoke test by design
  _Rationale:_ A smoke test still asserts something meaningful.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
