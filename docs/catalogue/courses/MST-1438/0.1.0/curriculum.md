# KQL (Kusto Query Language) Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1438` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Kusto Query Language documentation read via the Microsoft Learn MCP on 2026-10-02. Operator availability can vary by service (Azure Data Explorer, Sentinel, Fabric) and must be confirmed against the current documentation before production. |
| Official sources | https://learn.microsoft.com/kusto/query/best-practices |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-KQL |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — KQL (Kusto Query Language) Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the KQL tabular data model and its read-only nature
2. Filter, project, and aggregate data with core operators
3. Combine and shape data with join and union following best practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 KQL basics (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Filter a table with the where operator; (2) Select columns with the project operator
- Common misconception addressed: Thinking KQL can modify data rather than being read-only
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tabular data model and the pipe | 84 | 4 |
| M01L02 | Filtering and projecting | 84 | 4 |

### M02 Aggregation and grouping (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Aggregate counts with summarize by a column; (2) Use bin() to group time into buckets
- Common misconception addressed: Forgetting that summarize drops columns not listed in the statement
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | summarize and aggregation functions | 84 | 4 |
| M02L02 | Grouping, binning, and sorting | 84 | 4 |

### M03 Combining and shaping data (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Join two tables with the join operator; (2) Combine tables with the union operator
- Common misconception addressed: Putting the larger table first in a join instead of the smaller one
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Joins and unions | 72 | 4 |
| M03L02 | Best practices and query limits | 72 | 4 |

## Integrative case

An analyst queries a logs dataset, filters with where, aggregates counts by category with summarize, and joins a second table to enrich the results while following KQL best practices.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1438-final-protected | 24 | 32 | yes |
| MST-1438-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| KQL basics | 8 |
| Aggregation and grouping | 8 |
| Combining and shaping data | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1438-Q0001** (single-answer, Select ONE) Which statement about Kusto Query Language (KQL) is true?

- A. It is a read-only language that processes data and returns results **(key)**  
  _Rationale:_ Correct: KQL is a read-only request that returns results.
- B. It modifies rows in place in the source table  
  _Rationale:_ Incorrect: KQL does not modify the underlying data.
- C. It is identical to Transact-SQL  
  _Rationale:_ Incorrect: KQL differs from T-SQL.
- D. It cannot aggregate data  
  _Rationale:_ Incorrect: KQL aggregates with summarize and related operators.

**MST-1438-Q0002** (multiple-answer, Select TWO) Which TWO are recommended KQL best practices? (Select TWO.)

- A. Select the table with the fewest rows first in a join **(key)**  
  _Rationale:_ Correct: placing the smaller table first improves join performance.
- B. Use limit or count at the end of new queries **(key)**  
  _Rationale:_ Correct: this avoids returning unexpectedly large result sets.
- C. Convert billions of records before filtering  
  _Rationale:_ Incorrect: reduce data before conversion to avoid heavy processing.
- D. Always use tolower() for case-insensitive comparisons  
  _Rationale:_ Incorrect: prefer the =~ operator over tolower() for comparisons.

**MST-1438-Q0003** (single-answer, Select ONE) Which KQL operator merges the rows of two tables by matching values of specified columns?

- A. join **(key)**  
  _Rationale:_ Correct: join merges rows of two tables on matching column values.
- B. summarize  
  _Rationale:_ summarize aggregates one table; it does not merge two.
- C. project  
  _Rationale:_ project selects columns within one table.
- D. where  
  _Rationale:_ where filters rows within one table.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
