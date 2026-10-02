# Codex for Testing, Code Review, and Controlled Refactoring

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0509` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Codex for Testing, Code Review, and Controlled Refactoring (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Codex to write and improve tests
2. Use Codex to assist code review
3. Refactor code safely with Codex
4. Keep tests, reviews and refactors under human control

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Writing tests, assisting code review and refactoring with Codex are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Testing with Codex (25%)

- Worked applications: (1) Add tests for an untested function; (2) Find a missing edge-case test
- Common misconception addressed: Assuming generated tests are correct and meaningful without reading them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Generating useful tests | 120 | 6 |
| M01L02 | Improving coverage and edge cases | 120 | 6 |

### M02 Code review assistance (25%)

- Worked applications: (1) Summarise the risks in a pull request; (2) Flag a change that lacks a test
- Common misconception addressed: Letting Codex approve a pull request instead of informing a human reviewer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reviewing a diff with Codex | 120 | 6 |
| M02L02 | Spotting risks and style issues | 120 | 6 |

### M03 Controlled refactoring (25%)

- Worked applications: (1) Plan a refactor backed by tests; (2) Verify behaviour is unchanged after a refactor
- Common misconception addressed: Refactoring without tests to confirm behaviour is preserved
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Planning a refactor | 120 | 6 |
| M03L02 | Refactoring without changing behaviour | 120 | 6 |

### M04 Human control (25%)

- Worked applications: (1) Keep a refactor small and reviewable; (2) Revert a change that broke a test
- Common misconception addressed: Running a large automated refactor with no way to revert safely
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Review gates and scope | 120 | 6 |
| M04L02 | Reverting and limiting blast radius | 120 | 6 |

## Integrative case

A team adopts Codex for quality work: it generates and reviews tests for an undertested module, uses Codex to summarise pull-request risks for human reviewers, plans a behaviour-preserving refactor backed by tests, and keeps every change small, reviewable and revertible.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0509-final-protected | 72 | 72 | yes |
| MST-0509-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Testing with Codex | 18 |
| Code review assistance | 18 |
| Controlled refactoring | 18 |
| Human control | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0509-Q0001** (single-answer, Select ONE) What should a developer do with tests that Codex generates?

- A. Read them to confirm they are correct and meaningful **(key)**  
  _Rationale:_ Correct: generated tests must be reviewed for value and correctness.
- B. Assume they are always correct  
  _Rationale:_ Generated tests can be wrong or trivial.
- C. Delete them immediately  
  _Rationale:_ Useful generated tests should be kept, not deleted.
- D. Merge them without running them  
  _Rationale:_ Tests should be run and reviewed before merging.

**MST-0509-Q0002** (single-answer, Select ONE) Why must a refactor be backed by tests?

- A. Tests confirm behaviour is preserved while the code changes **(key)**  
  _Rationale:_ Correct: tests guard against behaviour changes during refactoring.
- B. Tests make the refactor larger  
  _Rationale:_ Tests do not increase refactor size.
- C. Tests remove the need for review  
  _Rationale:_ Human review is still needed.
- D. Tests guarantee faster code  
  _Rationale:_ Tests verify behaviour, not performance.

**MST-0509-Q0003** (multiple-answer, Select TWO) Which TWO practices keep Codex-assisted refactoring under human control? (Select TWO)

- A. Keep each change small and reviewable **(key)**  
  _Rationale:_ Correct: small changes are easier to review and revert.
- B. Be able to revert a change that breaks a test **(key)**  
  _Rationale:_ Correct: a revert path limits blast radius.
- C. Run one large automated refactor with no revert path  
  _Rationale:_ Large irreversible refactors are risky.
- D. Let Codex approve its own pull request  
  _Rationale:_ A human reviewer, not the agent, should approve.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
