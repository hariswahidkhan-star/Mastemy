# SQL for Developers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1537` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-SD-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — SQL for Developers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Relational model and SELECT basics
2. Filtering, functions and grouping
3. Joins and set operations
4. Modifying data and transactions
5. Schema, indexes and query design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production query performance on real data; querying is taught through instructor-built walkthroughs on sample databases.

## Modules

### M01 Relational model and SELECT basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Select specific columns and alias them for a report; (2) Filter orders placed in the last 30 days with WHERE
- Common misconception addressed: Thinking SELECT * is always fine regardless of columns needed
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tables, rows, keys and the relational model | 144 | 6 |
| M01L02 | SELECT, WHERE, ORDER BY and LIMIT | 144 | 6 |

### M02 Filtering, functions and grouping (MASTEMY-DESIGN 24%)

- Worked applications: (1) Count orders per customer with GROUP BY; (2) Use HAVING to keep only customers with more than five orders
- Common misconception addressed: Putting an aggregate condition in WHERE instead of HAVING
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Operators, NULL handling and string/date functions | 144 | 6 |
| M02L02 | Aggregates, GROUP BY and HAVING | 144 | 6 |

### M03 Joins and set operations (MASTEMY-DESIGN 24%)

- Worked applications: (1) Join orders to customers to show names with order totals; (2) Find customers with no orders using a LEFT JOIN and IS NULL
- Common misconception addressed: Expecting an INNER JOIN to keep rows with no match
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | INNER and OUTER joins | 144 | 6 |
| M03L02 | Subqueries, UNION and EXISTS | 144 | 6 |

### M04 Modifying data and transactions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Insert a new order and its items in one transaction; (2) Update prices and roll back on an error
- Common misconception addressed: Forgetting a WHERE clause on an UPDATE or DELETE
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | INSERT, UPDATE, DELETE | 144 | 6 |
| M04L02 | Transactions, COMMIT, ROLLBACK and ACID | 144 | 6 |

### M05 Schema, indexes and query design (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add an index to speed up a frequent lookup; (2) Choose primary and foreign keys for a new table
- Common misconception addressed: Assuming more indexes always make a database faster
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | CREATE TABLE, constraints and keys | 144 | 6 |
| M05L02 | Indexes and reading a query plan at a basic level | 144 | 6 |

## Integrative case

Given a small e-commerce schema (customers, orders, order_items, products), write queries that list each customer's total spend, find the top products by revenue, flag customers with no orders using an outer join, and wrap a two-step update in a transaction.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1537-final-protected | 25 | 25 | yes |
| MST-1537-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Relational model and SELECT basics | 5 |
| Filtering, functions and grouping | 5 |
| Joins and set operations | 5 |
| Modifying data and transactions | 5 |
| Schema, indexes and query design | 5 |

Minimum reviewed item bank: 422 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1537-Q0001** (single-answer, Select ONE) Which clause filters rows AFTER aggregation, so you can keep only groups meeting a condition on an aggregate?

- A. HAVING **(key)**  
  _Rationale:_ Correct: HAVING filters grouped results using aggregate conditions.
- B. WHERE  
  _Rationale:_ WHERE filters individual rows before grouping and cannot reference aggregates.
- C. ORDER BY  
  _Rationale:_ ORDER BY sorts results; it does not filter groups.
- D. LIMIT  
  _Rationale:_ LIMIT caps the number of returned rows; it does not filter on aggregates.

**MST-1537-Q0002** (multiple-answer, Select ALL that apply) Which statements about a LEFT OUTER JOIN are correct? (Select TWO)

- A. It returns every row from the left table even when there is no match on the right **(key)**  
  _Rationale:_ Correct: unmatched left rows are kept, with NULLs for the right columns.
- B. Unmatched right-side columns appear as NULL **(key)**  
  _Rationale:_ Correct: columns from the right table are NULL when no match exists.
- C. It returns only rows that match in both tables  
  _Rationale:_ That describes an INNER JOIN, not a LEFT OUTER JOIN.
- D. It automatically removes duplicate rows  
  _Rationale:_ A join does not deduplicate; use DISTINCT or grouping for that.

**MST-1537-Q0003** (single-answer, Select ONE) You run UPDATE products SET price = price * 1.1; with no WHERE clause. What happens?

- A. Every row in the table is updated **(key)**  
  _Rationale:_ Correct: with no WHERE clause the UPDATE applies to all rows.
- B. The statement is rejected because WHERE is required  
  _Rationale:_ WHERE is optional; omitting it is legal and affects all rows.
- C. Only the first row is updated  
  _Rationale:_ UPDATE affects all matching rows, which here is every row.
- D. Nothing changes until an index is added  
  _Rationale:_ Indexes do not gate whether an UPDATE runs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
