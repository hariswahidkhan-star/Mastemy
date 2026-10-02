# Cursor for SQL and Database Refactoring

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0559` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0559 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor for SQL and Database Refactoring (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Give Cursor the schema and query context it needs for database work
2. Generate, explain and optimise SQL with AI assistance
3. Plan and generate reversible schema migrations with rollback
4. Validate refactors with verification queries and test data
5. Deliver AI-assisted database changes responsibly with review and data care

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Cursor for database work (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Share a schema so Cursor can reason about it; (2) Choose inline edit versus agent for a refactor
- Common misconception addressed: Expecting Cursor to know a schema it was never shown
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Giving Cursor schema and query context | 72 | 5 |
| M01L02 | Surfaces for a quick query versus a migration | 72 | 5 |

### M02 Writing and improving SQL (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Turn a reporting requirement into a correct query; (2) Get an explanation and an index suggestion for a slow query
- Common misconception addressed: Running generated SQL against production without a read-only check
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generating queries from a plain-language requirement | 96 | 5 |
| M02L02 | Explaining and optimising an existing query | 96 | 5 |

### M03 Refactoring schemas safely (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Generate a migration with a matching rollback; (2) Review a destructive change and add a safeguard
- Common misconception addressed: Applying a schema change with no rollback or backup
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Planning a schema change as a reversible migration | 80 | 5 |
| M03L02 | Generating forward and rollback migration scripts | 80 | 5 |
| M03L03 | Reviewing data-affecting changes before running | 80 | 5 |

### M04 Validating correctness (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a verification query that proves a refactor preserved data; (2) Generate edge-case test rows for a constraint
- Common misconception addressed: Assuming a migration worked because it ran without error
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Generating test data and verification queries | 96 | 5 |
| M04L02 | Comparing results before and after a refactor | 96 | 5 |

### M05 Responsible database delivery (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review an AI-generated migration before approval; (2) Decide which production change needs a DBA sign-off
- Common misconception addressed: Pasting a production connection string into a prompt
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping real data and credentials out of prompts | 96 | 5 |
| M05L02 | Review and approval for AI-generated database changes | 96 | 5 |

## Integrative case

An analyst refactors a reporting schema with Cursor: share the schema, generate a forward and rollback migration, add a verification query that proves data was preserved, and route the destructive step through DBA review before it runs on anything but a copy.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0559-final-protected | 30 | 40 | yes |
| MST-0559-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cursor for database work | 5 |
| Writing and improving SQL | 6 |
| Refactoring schemas safely | 7 |
| Validating correctness | 6 |
| Responsible database delivery | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0559-Q0001** (single-answer, Select ONE) What makes an AI-generated schema migration safe to run?

- A. It is reversible, reviewed, and tested on a copy before production **(key)**  
  _Rationale:_ Correct: reversibility, review and a tested dry run are the safeguards.
- B. It ran once without an error message  
  _Rationale:_ Running without error does not prove data was preserved.
- C. It was generated quickly by the agent  
  _Rationale:_ Speed is unrelated to safety.
- D. It drops the old table to keep things clean  
  _Rationale:_ A destructive drop with no rollback is the opposite of safe.

**MST-0559-Q0002** (multiple-answer, Select TWO) Which TWO practices confirm a refactor preserved the data? (Select TWO.)

- A. Run a verification query comparing results before and after **(key)**  
  _Rationale:_ Correct: comparing results proves the data is preserved.
- B. Generate edge-case test rows and check the constraints hold **(key)**  
  _Rationale:_ Correct: edge-case data exposes broken constraints.
- C. Assume success because the migration script ran  
  _Rationale:_ Running is not evidence of correctness.
- D. Delete the backup to save space  
  _Rationale:_ Removing the backup removes your recovery path.

**MST-0559-Q0003** (single-answer, Select ONE) What should never be pasted into a Cursor prompt for a database task?

- A. A production connection string or live credentials **(key)**  
  _Rationale:_ Correct: credentials and connection strings must stay out of prompts.
- B. An anonymised schema definition  
  _Rationale:_ A schema without secrets is appropriate context.
- C. A plain-language description of the report needed  
  _Rationale:_ Requirements are safe and useful context.
- D. A sample of synthetic test rows  
  _Rationale:_ Synthetic data carries no confidentiality risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
