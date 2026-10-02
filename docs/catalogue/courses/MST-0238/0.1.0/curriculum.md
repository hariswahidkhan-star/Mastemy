# Tableau Certified Data Analyst

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0238` v0.1.0 | Batch 8 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Tableau (no affiliation or endorsement) |
| Exam code | Tableau Certified Data Analyst (Tableau uses the descriptive title; no short exam code published) |
| Version basis | Tableau Certified Data Analyst Exam Guide (accessed 2026-10-02) |
| Evidence | **verified-official-source** - sources: SRC-TAB-TDA |
| Legacy IDs | MST-DAT-TAB-TDA-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connect to and transform data for analysis in Tableau
2. Explore and analyze data using calculations, LOD expressions and statistics
3. Create effective visualizations, dashboards and stories
4. Publish and manage content on Tableau Server and Tableau Cloud

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Connect to and Transform Data (24%)

- Worked applications: (1) Join and blend two data sources correctly; (2) Use a data-interpreter and pivot to clean a messy extract
- Common misconception addressed: Confusing a join with a data blend
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Connecting to data sources and extracts | 270 | 6 |
| M01L02 | Data modeling, joins, blends and preparation | 270 | 6 |

### M02 Explore and Analyze Data (41%)

- Worked applications: (1) Write an LOD expression to compare to a segment average; (2) Build a parameter-driven what-if analysis
- Common misconception addressed: Using a basic aggregate where an LOD expression is required
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Calculated fields, table calculations and LOD expressions | 270 | 6 |
| M02L02 | Statistical analysis, trends and forecasting | 270 | 6 |
| M02L03 | Parameters, sets and groups | 270 | 6 |

### M03 Create Content (26%)

- Worked applications: (1) Choose the right chart type for three business questions; (2) Build an interactive dashboard with actions
- Common misconception addressed: Adding more chart types instead of answering the question clearly
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Building visualizations and choosing chart types | 270 | 6 |
| M03L02 | Dashboards, stories and interactivity | 270 | 6 |

### M04 Publish and Manage Content (9%)

- Worked applications: (1) Publish a workbook with correct permissions; (2) Schedule an extract refresh
- Common misconception addressed: Publishing with default permissions that expose data too broadly
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Publishing, permissions and refresh on Server and Cloud | 270 | 6 |

## Integrative case

An analyst receives raw sales extracts and must connect and clean the data, build calculated fields and an LOD analysis, assemble an interactive dashboard answering business questions, then publish it with the right permissions and refresh schedule.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - confirm official question count and duration on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0238-practice-form-A | 81 | 81 | yes |
| MST-0238-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0238-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0238-final-protected | 81 | 81 | yes |

| Domain | Items per form |
|---|---|
| Connect to and Transform Data | 21 |
| Explore and Analyze Data | 20 |
| Create Content | 20 |
| Publish and Manage Content | 20 |

Minimum reviewed item bank: 798 (plan; 3 sample items drafted, 0 reviewed).

## Documented official topic weights

| Domain | Weight |
|---|---|
| Connect to and Transform Data | 24% |
| Explore and Analyze Data | 41% |
| Create Content | 26% |
| Publish and Manage Content on Tableau Server and Tableau Cloud | 9% |

## Sample items (original, draft, unreviewed)

**MST-0238-Q0001** (single-answer, Select ONE) You need the regional average sales to appear on every row regardless of the view's level of detail. Which Tableau feature is designed for this?

- A. A basic SUM aggregation  
  _Rationale:_ A basic aggregate follows the view's level of detail and cannot fix the granularity.
- B. A FIXED level-of-detail (LOD) expression **(key)**  
  _Rationale:_ Correct: a FIXED LOD expression computes a value at a specified granularity independent of the view.
- C. A quick filter  
  _Rationale:_ A filter limits data shown, it does not compute a fixed-level value.
- D. A tooltip  
  _Rationale:_ A tooltip displays values; it does not compute them at a fixed level.

**MST-0238-Q0002** (single-answer, Select ONE) What is the key difference between a join and a data blend in Tableau?

- A. A join combines tables at the row level from (usually) the same source; a blend combines aggregated data from separate sources **(key)**  
  _Rationale:_ Correct: joins merge rows typically within one connection, while blends combine aggregated results across different data sources on a linking field.
- B. They are identical  
  _Rationale:_ They behave differently at the row vs aggregate level.
- C. A blend always runs faster than a join  
  _Rationale:_ Performance depends on the data, not a fixed rule.
- D. A join can only use one field ever  
  _Rationale:_ Joins can use multiple key fields.

**MST-0238-Q0003** (multiple-answer, Select TWO) Which TWO are good practices when publishing a workbook to Tableau Cloud? (Select TWO)

- A. Set permissions so only intended audiences can view the data **(key)**  
  _Rationale:_ Correct: scoping permissions protects data.
- B. Configure an appropriate extract refresh schedule **(key)**  
  _Rationale:_ Correct: scheduling refresh keeps published data current.
- C. Publish with full access to all users by default  
  _Rationale:_ Default-open access can expose sensitive data.
- D. Embed your personal password in the workbook  
  _Rationale:_ Embedding personal credentials is insecure.
- E. Delete the underlying data source after publishing  
  _Rationale:_ Removing the source breaks refresh and the workbook.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
