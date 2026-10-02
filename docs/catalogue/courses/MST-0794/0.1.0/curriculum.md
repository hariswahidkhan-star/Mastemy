# Codex + GitHub + Playwright: End-to-End Defect Resolution

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0794` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official OpenAI Codex / GitHub / Playwright documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Codex + GitHub + Playwright: End-to-End Defect Resolution (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Triage a defect from report to reproducible case
2. Use an AI coding assistant to propose a fix responsibly
3. Manage the change through a GitHub pull request
4. Write a Playwright test that reproduces and guards the bug
5. Verify, review and close the loop with evidence

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Triage (MASTEMY-DESIGN 20%)

- Worked applications: (1) Turn a vague report into reproduction steps; (2) Write a failing-case summary
- Common misconception addressed: Starting to code before the bug is reproducible
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From bug report to reproduction | 120 | 7 |
| M01L02 | Scoping and root-cause framing | 120 | 7 |

### M02 AI-assisted fix (MASTEMY-DESIGN 20%)

- Worked applications: (1) Ask the assistant to propose a minimal fix; (2) Reject an AI change that fails the test
- Common misconception addressed: Merging AI-generated code without understanding it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting an assistant for a fix | 120 | 7 |
| M02L02 | Reviewing and validating AI suggestions | 120 | 7 |

### M03 GitHub workflow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Open a PR with a clear description; (2) Respond to review feedback
- Common misconception addressed: Pushing a fix directly to the main branch
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Branches and pull requests | 120 | 7 |
| M03L02 | Code review and checks | 120 | 7 |

### M04 Playwright test (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a Playwright test that fails on the bug; (2) Confirm the test passes after the fix
- Common misconception addressed: Writing a test that passes regardless of the fix
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Writing an end-to-end test | 120 | 7 |
| M04L02 | Reproducing the bug as a test | 120 | 7 |

### M05 Verification (MASTEMY-DESIGN 20%)

- Worked applications: (1) Show the test going red then green; (2) Link evidence in the PR before merge
- Common misconception addressed: Closing a defect without a regression test
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Running checks in CI | 120 | 7 |
| M05L02 | Closing the loop with evidence | 120 | 7 |

## Integrative case

Resolve a reported defect end to end: reproduce it, use an AI assistant to propose a minimal fix you review, open a GitHub pull request, add a Playwright test that fails before and passes after the fix, and merge only after CI and review confirm the evidence.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0794-final-protected | 40 | 50 | yes |
| MST-0794-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Triage | 8 |
| AI-assisted fix | 8 |
| GitHub workflow | 8 |
| Playwright test | 8 |
| Verification | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0794-Q0001** (single-answer, Select ONE) What should you establish before writing a fix for a reported defect?

- A. A reliable reproduction of the bug **(key)**  
  _Rationale:_ Correct: a reproducible case anchors the fix and the regression test.
- B. A merged pull request  
  _Rationale:_ Merging comes after the verified fix, not before.
- C. A production deployment  
  _Rationale:_ Deploying before a fix exists is premature.
- D. A new feature branch with no changes  
  _Rationale:_ An empty branch does not establish reproduction.

**MST-0794-Q0002** (multiple-answer, Select TWO) Which TWO practices keep an AI-assisted fix safe to merge? (Select TWO.)

- A. Review and understand the AI-proposed change before accepting it **(key)**  
  _Rationale:_ Correct: human review prevents merging code you cannot explain.
- B. Add a Playwright test that fails before the fix and passes after **(key)**  
  _Rationale:_ Correct: a regression test proves the fix and guards against recurrence.
- C. Push the AI change straight to the main branch  
  _Rationale:_ Bypassing PR review removes a safety gate.
- D. Skip CI to merge faster  
  _Rationale:_ Skipping checks defeats verification.

**MST-0794-Q0003** (single-answer, Select ONE) A good regression test for a fixed bug should do what?

- A. Fail on the buggy code and pass once the fix is applied **(key)**  
  _Rationale:_ Correct: a red-then-green test proves it actually guards the bug.
- B. Pass whether or not the bug is fixed  
  _Rationale:_ Such a test does not guard anything.
- C. Only run in production  
  _Rationale:_ Regression tests belong in CI, run before merge.
- D. Delete the failing code path  
  _Rationale:_ Removing code is not the same as testing the fix.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
