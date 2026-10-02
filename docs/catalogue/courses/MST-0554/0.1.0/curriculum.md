# Cursor Context Engineering for Large Codebases

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0554` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation. The egress proxy blocked the vendor docs site this session and Cursor is not covered by the Microsoft Learn MCP, so no official page was read. Feature names, context-window behaviour, indexing and rules mechanisms are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read this session) |
| Evidence | **unverified-needs-official-check** - no official syllabus/source read this session; sources: SRC-CURSOR-CONTEXT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Context Engineering for Large Codebases (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why context selection matters for AI assistance on large codebases
2. Curate relevant files and symbols into the model's working context
3. Use project rules/conventions to steer suggestions
4. Verify AI-generated changes before accepting them
5. Apply a disciplined review workflow for AI-assisted edits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Why context matters (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Explain why irrelevant files hurt suggestions; (2) Pick the minimal context for a change
- Common misconception addressed: Believing adding more files always improves suggestions
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Context and the limits of a model's window | 88 | 5 |
| M01L02 | What good context selection looks like | 88 | 5 |

### M02 Curating context (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Curate context for a cross-module change; (2) Trim noisy context down to essentials
- Common misconception addressed: Dumping the whole repo into context indiscriminately
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Selecting files and symbols into context | 88 | 5 |
| M02L02 | Referencing the right parts of a codebase | 87 | 5 |

### M03 Rules and conventions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a rule that enforces a naming convention; (2) Steer a suggestion toward the project's patterns
- Common misconception addressed: Expecting the tool to infer conventions without being told
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Project rules and conventions | 87 | 5 |
| M03L02 | Keeping suggestions on-style | 87 | 5 |
| M03L03 | Documenting rules for a team | 87 | 5 |

### M04 Verifying generated changes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a generated change for a subtle bug; (2) Run the test suite on an AI edit
- Common misconception addressed: Accepting generated changes without reading the diff
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reviewing a diff before accepting | 87 | 5 |
| M04L02 | Running tests against generated changes | 87 | 5 |

### M05 A disciplined AI-assisted workflow (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a review workflow for a feature; (2) Write an AI-assistance note for a pull request
- Common misconception addressed: Letting generation speed replace human review responsibility
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | A curate-generate-review loop | 87 | 5 |
| M05L02 | Recording AI assistance and accountability | 87 | 5 |

## Integrative case

A developer working in a large monorepo uses Cursor to implement a feature: curate the right context, apply project rules, review each generated change against tests, and record what was AI-assisted (feature facts pending official verification).

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0554-final-protected | 30 | 40 | yes |
| MST-0554-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why context matters | 5 |
| Curating context | 6 |
| Rules and conventions | 7 |
| Verifying generated changes | 6 |
| A disciplined AI-assisted workflow | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0554-Q0001** (single-answer, Select ONE) On a large codebase, why can adding many unrelated files to the AI's context reduce suggestion quality?

- A. Irrelevant context dilutes the signal the model uses to answer **(key)**  
  _Rationale:_ Correct: noisy, irrelevant context makes it harder for the model to focus on the task.
- B. It is impossible to add more than one file  
  _Rationale:_ Multiple files can be added; the issue is relevance.
- C. Extra files are always encrypted  
  _Rationale:_ Encryption is not the issue here.
- D. More files always guarantee a better answer  
  _Rationale:_ More is not always better; relevance matters.

**MST-0554-Q0002** (multiple-answer, Select TWO) Which TWO practices belong in a disciplined AI-assisted editing workflow? (Select TWO.)

- A. Read the generated diff before accepting it **(key)**  
  _Rationale:_ Correct: reviewing the diff catches subtle or unwanted changes.
- B. Run tests against the generated change **(key)**  
  _Rationale:_ Correct: tests validate that the change behaves correctly.
- C. Accept all suggestions automatically to save time  
  _Rationale:_ Blind acceptance risks introducing bugs.
- D. Skip review because the AI wrote it  
  _Rationale:_ AI authorship is a reason to review, not to skip review.

**MST-0554-Q0003** (single-answer, Select ONE) How are project conventions best communicated to an AI coding assistant?

- A. By defining explicit project rules/conventions it can follow **(key)**  
  _Rationale:_ Correct: explicit rules steer suggestions toward the project's patterns (exact mechanism pending official docs).
- B. By assuming it infers them with no guidance  
  _Rationale:_ Conventions should be stated, not assumed.
- C. By deleting the test suite  
  _Rationale:_ Deleting tests harms quality and does not communicate conventions.
- D. By hiding the codebase from the tool  
  _Rationale:_ Hiding context does not communicate conventions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
