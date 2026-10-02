# AI-Assisted Excel Data Cleaning and Reconciliation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0650` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Power Query documentation read via the Microsoft Learn MCP on 2026-10-02: Remove duplicates (case-sensitive; no guaranteed retained instance without Table.Buffer), Table.Distinct, and the Power Query data-cleaning transformation workflow. The AI-assisted framing (Copilot-suggested steps) is reviewed by the learner before applying. |
| Official sources | https://learn.microsoft.com/power-query/working-with-duplicates; https://learn.microsoft.com/powerquery-m/table-distinct; https://learn.microsoft.com/training/modules/automate-data-cleaning-power-query/ |
| Evidence | **vendor-docs-partial** - official Microsoft documentation read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-POWERQUERY-CLEAN |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Excel Data Cleaning and Reconciliation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Profile a messy dataset to find duplicates, blanks and type errors before cleaning
2. Apply Power Query transformations to clean and reshape data reproducibly
3. Use Remove Duplicates and Table.Distinct understanding their case-sensitivity and ordering caveats
4. Reconcile two datasets and explain the residual differences
5. Review AI-suggested cleaning steps before accepting them into a query

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Profiling before cleaning (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Profile a 20-column import and list every quality issue; (2) Decide which issues are safe to auto-fix and which need a human
- Common misconception addressed: Deleting rows before understanding why values look wrong
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Column quality, distribution and profile | 96 | 6 |
| M01L02 | Spotting duplicates, blanks and bad types | 96 | 6 |
### M02 Core cleaning transforms (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build an applied-steps query that another person can rerun; (2) Normalise inconsistent category labels with Replace Values
- Common misconception addressed: Fixing values by hand in the preview instead of recording a step
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Trim, type, split and replace | 96 | 6 |
| M02L02 | Applied-steps and reproducibility | 96 | 6 |
### M03 De-duplication (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Lower-case a key column before removing duplicates and explain why; (2) Remove duplicates on a subset of columns and verify the count
- Common misconception addressed: Assuming Remove Duplicates always keeps the first occurrence
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Remove Duplicates and case sensitivity | 96 | 6 |
| M03L02 | Table.Distinct and retained-row caveats | 96 | 6 |
### M04 Reconciliation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Use an anti-join to list records in file 1 missing from file 2; (2) Reconcile two totals and account for every difference
- Common misconception addressed: Declaring two files matched because totals agree while rows differ
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Merging and anti-joins to compare sets | 96 | 6 |
| M04L02 | Explaining residual differences | 96 | 6 |
### M05 Reviewing AI-suggested steps (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Accept, edit or reject three AI-suggested cleaning steps with reasons; (2) Document the cleaning decisions for a later reviewer
- Common misconception addressed: Accepting an AI-suggested step without checking what it changed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Judging a suggested transformation | 96 | 6 |
| M05L02 | Keeping a trustworthy audit trail | 96 | 6 |

## Integrative case

An analyst receives two overlapping customer exports full of duplicates and inconsistent labels: profile both, clean them with a reproducible Power Query, de-duplicate with the correct case handling, reconcile the two into one master list, and document every AI-suggested step that was accepted or rejected.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0650-final-protected | 30 | 40 | yes |
| MST-0650-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Profiling before cleaning | 6 |
| Core cleaning transforms | 6 |
| De-duplication | 6 |
| Reconciliation | 6 |
| Reviewing AI-suggested steps | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0650-Q0001** (single-answer, Select ONE) You run Remove Duplicates on a Name column, but 'ACME' and 'acme' both remain. Why?

- A. Power Query compares text case-sensitively, so the two values are treated as different **(key)**  
  _Rationale:_ Correct: apply an upper/lower-case transform before removing duplicates when case should not matter.
- B. Remove Duplicates only works on numbers  
  _Rationale:_ It works on text columns too.
- C. The column must be sorted first  
  _Rationale:_ Sorting is not required for Remove Duplicates.
- D. Duplicates can only be removed across all columns  
  _Rationale:_ You can remove duplicates on a subset of columns.
**MST-0650-Q0002** (multiple-answer, Select TWO) Which TWO are true about removing duplicates in Power Query? (Select TWO.)

- A. There is no guarantee which duplicate row is kept **(key)**  
  _Rationale:_ Correct: folding and optimisation mean the retained instance is not guaranteed; buffer first for predictability.
- B. Table.Buffer can make removal behave predictably **(key)**  
  _Rationale:_ Correct: buffering the table first fixes the row order before de-duplication.
- C. Removing duplicates always reduces memory use  
  _Rationale:_ If the step cannot fold to the source it can significantly increase memory use.
- D. Duplicates can only be evaluated on a single column  
  _Rationale:_ Duplication can be tested across any chosen subset of columns.
**MST-0650-Q0003** (single-answer, Select ONE) You fix a few bad values directly in the Power Query data preview instead of adding a transform step. What is the main problem?

- A. The change is not recorded as a step, so the query will not reproduce it on refresh **(key)**  
  _Rationale:_ Correct: reproducibility depends on recorded applied steps, not manual edits.
- B. Power Query does not allow editing values  
  _Rationale:_ It does, but ad-hoc edits still should be steps.
- C. It permanently alters the source file  
  _Rationale:_ Power Query does not write back to the source.
- D. It converts the query to a static table  
  _Rationale:_ The query remains refreshable; the manual fix just is not captured.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
