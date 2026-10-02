# Oracle Database SQL: Certification-Track Knowledge Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1238` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Oracle (no affiliation or endorsement) |
| Exam code | 1Z0-071 |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-ORA-1Z0071-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of SQL Foundations (design-assumption grouping)
2. Explain and apply the concepts of Functions, Grouping and Joins (design-assumption grouping)
3. Explain and apply the concepts of DDL, DML and Objects (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 SQL Foundations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming NULL equals an empty string or zero
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Relational model and SQL overview | 240 | 6 |
| M01L02 | SELECT statements and projection | 240 | 6 |
| M01L03 | Restricting and sorting rows | 240 | 6 |

### M02 Functions, Grouping and Joins (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Filtering grouped results with WHERE instead of HAVING
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Single-row functions | 240 | 6 |
| M02L02 | Aggregate functions and GROUP BY | 240 | 6 |
| M02L03 | Joins and subqueries | 240 | 6 |

### M03 DDL, DML and Objects (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Forgetting that DDL causes an implicit commit
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Creating and altering tables | 240 | 6 |
| M03L02 | INSERT, UPDATE, DELETE and transactions | 240 | 6 |
| M03L03 | Views, constraints and privileges | 240 | 6 |

## Integrative case

Given a sample sales schema, write queries that join customers and orders, aggregate revenue by region, filter grouped results, and define the constraints and a view a reporting team would need.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1238-practice-form-A | 81 | 81 | yes |
| MST-1238-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1238-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1238-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| SQL Foundations | 27 |
| Functions, Grouping and Joins | 27 |
| DDL, DML and Objects | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1238-Q0001** (single-answer, Select ONE) Which clause filters rows AFTER aggregation with GROUP BY?

- A. HAVING **(key)**  
  _Rationale:_ Correct: HAVING filters groups after aggregation; WHERE filters before.
- B. WHERE  
  _Rationale:_ WHERE filters individual rows before grouping, not aggregated groups.
- C. ORDER BY  
  _Rationale:_ ORDER BY sorts results; it does not filter.
- D. FETCH FIRST  
  _Rationale:_ FETCH FIRST limits row count; it does not filter groups.

**MST-1238-Q0002** (single-answer, Select ONE) What does comparing a column to NULL with = return?

- A. UNKNOWN (so the row is not returned) **(key)**  
  _Rationale:_ Correct: NULL comparisons with = yield UNKNOWN; use IS NULL instead.
- B. TRUE when the value is NULL  
  _Rationale:_ = NULL does not evaluate to TRUE; IS NULL is required.
- C. An error that stops the query  
  _Rationale:_ It does not error; it yields UNKNOWN.
- D. Zero  
  _Rationale:_ It does not return zero.

**MST-1238-Q0003** (multiple-answer, Select TWO) Which TWO statements about an inner join are correct?

- A. Rows are returned only where the join condition matches in both tables **(key)**  
  _Rationale:_ Correct: an inner join returns only matching rows.
- B. The join condition is usually on related key columns **(key)**  
  _Rationale:_ Correct: joins typically match foreign/primary key columns.
- C. It returns all rows from the left table regardless of match  
  _Rationale:_ That describes a left outer join.
- D. It always produces a Cartesian product  
  _Rationale:_ A missing join condition produces a cross join, not an inner join by design.
- E. It can only join two tables ever  
  _Rationale:_ Multiple tables can be joined in one statement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
