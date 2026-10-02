# Cursor for Python Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0557` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0557 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor for Python Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up Cursor for a Python project and choose the right editing surface
2. Generate and refactor Python code with inline and chat assistance
3. Run multi-file changes with the Cursor agent and review diffs safely
4. Generate, run and judge Python tests inside the Cursor loop
5. Deliver AI-assisted Python responsibly with review, attribution and data care

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Setting up Cursor for Python work (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Open a Python repo and index it for Cursor context; (2) Pick the right surface for a quick edit versus a multi-file change
- Common misconception addressed: Expecting Cursor to know project context it was never given
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Cursor's editor surfaces: chat, inline edit and agent | 72 | 5 |
| M01L02 | Configuring a Python project, interpreter and context | 72 | 5 |

### M02 Writing and editing Python with AI assistance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Turn a docstring-level spec into a working function; (2) Refactor a long function into smaller tested units
- Common misconception addressed: Accepting generated code without reading what it changed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generating functions and modules from a clear instruction | 96 | 5 |
| M02L02 | Inline edits and refactors across a Python file | 96 | 5 |

### M03 Multi-file changes with the agent (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add a feature that touches models, views and tests in one task; (2) Reject and re-scope an agent change that overreached
- Common misconception addressed: Letting the agent apply sweeping changes without a review step
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Planning an agent task across several Python modules | 80 | 5 |
| M03L02 | Reviewing and accepting agent diffs safely | 80 | 5 |
| M03L03 | Recovering when an agent change goes wrong | 80 | 5 |

### M04 Testing and quality in the loop (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Generate tests for an untested module and run them; (2) Feed a failing test's output back to get a targeted fix
- Common misconception addressed: Trusting generated tests without checking they assert the right thing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Generating and running pytest tests with Cursor | 96 | 5 |
| M04L02 | Using errors and test output as context for fixes | 96 | 5 |

### M05 Responsible Python delivery with Cursor (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review an AI-written change before committing it; (2) Decide which parts of a task should not be delegated
- Common misconception addressed: Treating AI-written Python as correct because it runs once
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping secrets and sensitive code out of prompts | 96 | 5 |
| M05L02 | Human review, attribution and limits of AI-written Python | 96 | 5 |

## Integrative case

A developer adds a feature to a Python web service using Cursor: index the repo, scope an agent task across models, views and tests, review every diff, run generated pytest tests, and commit only after a human review with clear attribution of AI assistance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0557-final-protected | 30 | 40 | yes |
| MST-0557-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Setting up Cursor for Python work | 5 |
| Writing and editing Python with AI assistance | 6 |
| Multi-file changes with the agent | 7 |
| Testing and quality in the loop | 6 |
| Responsible Python delivery with Cursor | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0557-Q0001** (single-answer, Select ONE) A change spans several Python modules and their tests. Which Cursor surface fits best?

- A. The agent, scoped to the task with a review of its diffs **(key)**  
  _Rationale:_ Correct: the agent handles multi-file tasks; diffs are then reviewed.
- B. A single inline edit on one line  
  _Rationale:_ Inline edit targets small local changes, not multi-file work.
- C. Copying code out to a separate chat tool  
  _Rationale:_ That discards project context Cursor already has.
- D. Renaming the files manually first  
  _Rationale:_ Renaming does not address making the multi-file change.

**MST-0557-Q0002** (multiple-answer, Select TWO) Which TWO habits keep AI-assisted Python changes safe to ship? (Select TWO.)

- A. Read and review every diff before accepting it **(key)**  
  _Rationale:_ Correct: human review catches unintended or wrong changes.
- B. Run the tests and check they assert the intended behaviour **(key)**  
  _Rationale:_ Correct: passing tests only help if they assert the right thing.
- C. Accept all agent changes to save time  
  _Rationale:_ Unreviewed sweeping changes are how defects slip in.
- D. Paste production secrets into the prompt for context  
  _Rationale:_ Secrets must be kept out of prompts.

**MST-0557-Q0003** (single-answer, Select ONE) A pytest run fails. What is the most effective next step in Cursor?

- A. Give the failing test output to Cursor as context for a targeted fix **(key)**  
  _Rationale:_ Correct: error output is strong context for a focused correction.
- B. Delete the failing test so the suite passes  
  _Rationale:_ Deleting the test hides the defect instead of fixing it.
- C. Ask the agent to rewrite the whole module blind  
  _Rationale:_ A blind rewrite ignores the specific failure.
- D. Commit anyway and fix it later  
  _Rationale:_ Committing a known failure breaks the build.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
