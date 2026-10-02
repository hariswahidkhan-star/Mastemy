# AI-Assisted Database Migration Planning and Validation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0578` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Database Migration Planning and Validation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Inventory an existing schema and sequence a safe migration plan
2. Use AI tools to draft and refine migration scripts
3. Design backward-compatible changes, backfills and transformations
4. Validate migrated data and prepare rollback plans

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Planning a migration (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) List tables, constraints and dependents affected by a column change; (2) Sequence a rename as expand-migrate-contract steps
- Common misconception addressed: Assuming a single ALTER statement is safe on a large live table
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inventorying schema and data | 80 | 5 |
| M01L02 | Sequencing changes and dependencies | 80 | 5 |
| M01L03 | Using AI to draft a migration plan | 80 | 5 |

### M02 Writing and generating migrations (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Generate and review an additive migration that adds a nullable column; (2) Write a batched backfill that does not lock the table
- Common misconception addressed: Trusting an AI-generated migration without reviewing locks and data volume
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generating migration scripts with AI | 80 | 5 |
| M02L02 | Backward-compatible schema changes | 80 | 5 |
| M02L03 | Data backfills and transformations | 80 | 5 |

### M03 Validation and rollback (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Write row-count and checksum validations comparing old and new columns; (2) Document a rollback that leaves the system in a known good state
- Common misconception addressed: Believing a migration that runs without error has necessarily preserved the data correctly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Validating data after migration | 80 | 5 |
| M03L02 | Testing in staging with production-like data | 80 | 5 |
| M03L03 | Rollback and recovery plans | 80 | 5 |

## Integrative case

A service needs a schema change that cannot take downtime. Inventory the schema and dependencies, use AI tools to draft migration scripts, design a backward-compatible rollout with backfills, validate the data in staging, and prepare a rollback plan before production.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0578-final-protected | 30 | 30 | yes |
| MST-0578-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Planning a migration | 10 |
| Writing and generating migrations | 10 |
| Validation and rollback | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0578-Q0001** (single-answer, Select ONE) You must rename a heavily used column without downtime. What approach is safest?

- A. Expand (add the new column), migrate (backfill and dual-write), then contract (drop the old column) **(key)**  
  _Rationale:_ Correct: the expand-migrate-contract pattern keeps old and new readers working throughout.
- B. Run a single ALTER TABLE RENAME during peak traffic  
  _Rationale:_ A direct rename can break current readers and may lock the table.
- C. Drop the old column first, then add the new one  
  _Rationale:_ Dropping first loses data and breaks existing queries immediately.
- D. Ask the AI tool to rename it and deploy without review  
  _Rationale:_ Unreviewed migrations on live tables are high-risk.

**MST-0578-Q0002** (multiple-answer, Select TWO) An AI tool drafted a backfill migration. Which TWO things must you verify before running it in production? (Select TWO.) (Select TWO.)

- A. That it runs in batches and avoids long-held locks on large tables **(key)**  
  _Rationale:_ Correct: unbatched backfills can lock tables and cause outages.
- B. That it is backward-compatible with code still reading the old shape **(key)**  
  _Rationale:_ Correct: readers on the old schema must keep working during rollout.
- C. That the script is written in the newest SQL dialect  
  _Rationale:_ Dialect novelty is irrelevant to safety.
- D. That the AI used the most tokens available  
  _Rationale:_ Token usage says nothing about migration correctness or safety.

**MST-0578-Q0003** (single-answer, Select ONE) A migration completed with no errors. Why is that not sufficient evidence of success?

- A. No error does not prove the data was transformed and preserved correctly; validation is still required **(key)**  
  _Rationale:_ Correct: correctness must be verified with counts, checksums and spot checks.
- B. Migrations that run without errors are always correct  
  _Rationale:_ Absence of errors does not guarantee correct data transformation.
- C. Error-free means rollback is never needed  
  _Rationale:_ A silent data error can still require rollback.
- D. It means the schema no longer needs backups  
  _Rationale:_ Backups remain essential regardless of migration outcome.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
