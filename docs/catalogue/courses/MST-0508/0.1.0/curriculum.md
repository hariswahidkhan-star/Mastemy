# Codex for Repository Understanding and Feature Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0508` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Codex for Repository Understanding and Feature Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Codex to explore and explain an unfamiliar repository
2. Plan a feature change across multiple files
3. Implement a feature with Codex and verify the result
4. Work safely with Codex in a real codebase

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Exploring a repository, planning and implementing a feature with Codex are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Understanding a repository (25%)

- Worked applications: (1) Ask Codex to map a module's responsibilities; (2) Trace where a value is used across files
- Common misconception addressed: Trusting an explanation without checking it against the code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Exploring structure and conventions | 120 | 6 |
| M01L02 | Explaining code and dependencies | 120 | 6 |

### M02 Planning a feature (25%)

- Worked applications: (1) Turn a feature request into a file-by-file plan; (2) Identify the tests that must change
- Common misconception addressed: Starting to edit before understanding the affected surface
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Framing the change | 120 | 6 |
| M02L02 | Decomposing across files | 120 | 6 |

### M03 Implementing with Codex (25%)

- Worked applications: (1) Implement a small feature and run the tests; (2) Review a diff that Codex produced
- Common misconception addressed: Accepting generated code without reading the diff
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Guided implementation | 120 | 6 |
| M03L02 | Verifying the change | 120 | 6 |

### M04 Working safely (25%)

- Worked applications: (1) Keep a change on a branch with review; (2) Decide when to stop and edit by hand
- Common misconception addressed: Letting an agent change code with no review or version control
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Scope, review and version control | 120 | 6 |
| M04L02 | Limits and when to take over | 120 | 6 |

## Integrative case

A developer joins an unfamiliar service and uses Codex to map the codebase, plans a new endpoint file by file, implements it on a branch, reads every diff, runs the tests, and keeps the work under review and version control before merging.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0508-final-protected | 72 | 72 | yes |
| MST-0508-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Understanding a repository | 18 |
| Planning a feature | 18 |
| Implementing with Codex | 18 |
| Working safely | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0508-Q0001** (single-answer, Select ONE) What should you do with an explanation Codex gives about unfamiliar code?

- A. Check it against the actual code before relying on it **(key)**  
  _Rationale:_ Correct: verify explanations against the source.
- B. Accept it as always correct  
  _Rationale:_ Explanations can be wrong and need checking.
- C. Delete the code it describes  
  _Rationale:_ Understanding code does not require deleting it.
- D. Ignore the code and trust the summary only  
  _Rationale:_ The code is the source of truth, not the summary.

**MST-0508-Q0002** (single-answer, Select ONE) Why plan a feature file-by-file before letting Codex implement it?

- A. It clarifies the affected surface and the tests that must change **(key)**  
  _Rationale:_ Correct: a plan maps scope and the tests involved.
- B. It makes the repository smaller  
  _Rationale:_ Planning does not reduce repo size.
- C. It removes the need to read any diffs  
  _Rationale:_ Diffs must still be read after implementation.
- D. It guarantees no bugs  
  _Rationale:_ Planning reduces risk but does not guarantee bug-free code.

**MST-0508-Q0003** (multiple-answer, Select TWO) Which TWO practices keep Codex-assisted development safe in a real codebase? (Select TWO)

- A. Read every diff before accepting it **(key)**  
  _Rationale:_ Correct: reviewing diffs catches unwanted changes.
- B. Keep changes on a branch under review and version control **(key)**  
  _Rationale:_ Correct: branches and review contain risk.
- C. Let the agent edit and merge with no review  
  _Rationale:_ Unreviewed merges are unsafe.
- D. Skip running the tests to save time  
  _Rationale:_ Tests verify the change and should be run.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
