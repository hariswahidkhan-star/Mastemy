# Looker and LookML: Governed Business Intelligence

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0744` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google Looker docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-LOOKER (https://cloud.google.com/looker/docs; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Looker and LookML: Governed Business Intelligence (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Looker's modelling architecture
2. Model data with LookML views and explores
3. Define measures, dimensions and joins
4. Build explores, dashboards and Looks
5. Govern access with model and content controls
6. Manage development with projects and version control

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Looker architecture (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe the path from database to dashboard; (2) Map a business question to an explore
- Common misconception addressed: Thinking Looker copies the warehouse rather than querying it live
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How Looker models data | 80 | 7 |
| M01L02 | Projects, models and explores | 80 | 7 |

### M02 LookML views (MASTEMY-DESIGN 16%)

- Worked applications: (1) Define a view with typed dimensions; (2) Create a derived table for a subset
- Common misconception addressed: Confusing a LookML view with a database table
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Views and dimensions | 80 | 7 |
| M02L02 | Derived tables | 80 | 7 |

### M03 Measures and joins (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a sum measure for revenue; (2) Join orders to customers in an explore
- Common misconception addressed: Setting the wrong join relationship and double-counting
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Measures and aggregates | 80 | 7 |
| M03L02 | Joins and relationships | 80 | 7 |

### M04 Explores and dashboards (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build an explore for the sales team; (2) Assemble a revenue dashboard from Looks
- Common misconception addressed: Expecting a saved Look to update its own underlying model
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building explores | 80 | 7 |
| M04L02 | Dashboards and Looks | 80 | 7 |

### M05 Governance and access (MASTEMY-DESIGN 17%)

- Worked applications: (1) Restrict an explore to a user group; (2) Add an access_filter for row-level security
- Common misconception addressed: Using folder permissions as a substitute for row-level security
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Model and content access | 80 | 7 |
| M05L02 | Row-level access filters | 80 | 7 |

### M06 Development lifecycle (MASTEMY-DESIGN 17%)

- Worked applications: (1) Commit a LookML change on a branch; (2) Validate and deploy to production
- Common misconception addressed: Editing production LookML directly without a branch
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Git-backed projects | 80 | 7 |
| M06L02 | Validation and deployment | 80 | 7 |

## Integrative case

Model a sales dataset in Looker: build LookML views with dimensions and measures, join orders to customers in an explore, create a revenue dashboard, add row-level access filters, and promote the change through a Git-backed project.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0744-final-protected | 40 | 50 | yes |
| MST-0744-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Looker architecture | 6 |
| LookML views | 6 |
| Measures and joins | 7 |
| Explores and dashboards | 7 |
| Governance and access | 7 |
| Development lifecycle | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0744-Q0001** (single-answer, Select ONE) What is LookML used for in Looker?

- A. Defining a reusable semantic model of dimensions, measures and joins **(key)**  
  _Rationale:_ Correct: LookML describes the governed semantic model.
- B. Storing the raw data instead of the warehouse  
  _Rationale:_ Looker queries the warehouse; it does not store the raw data.
- C. Replacing SQL entirely with no database  
  _Rationale:_ Looker generates SQL against a database.
- D. Rendering pixel-perfect print layouts only  
  _Rationale:_ That is not LookML's purpose.

**MST-0744-Q0002** (single-answer, Select ONE) An incorrect join relationship in an explore most commonly causes:

- A. Double-counted or inflated measure values **(key)**  
  _Rationale:_ Correct: wrong relationships fan out rows and inflate aggregates.
- B. A change to the database schema  
  _Rationale:_ Explores do not alter the database schema.
- C. Loss of the LookML project history  
  _Rationale:_ Joins do not affect version history.
- D. Automatic row-level security  
  _Rationale:_ Joins do not provide security.

**MST-0744-Q0003** (multiple-answer, Select TWO) Which TWO support governed BI in Looker? (Select TWO.)

- A. Row-level access filters in the model **(key)**  
  _Rationale:_ Correct: access filters enforce row-level security.
- B. Git-backed LookML development with validation **(key)**  
  _Rationale:_ Correct: version control and validation govern changes.
- C. Editing production LookML directly for speed  
  _Rationale:_ Direct production edits bypass governance.
- D. Relying only on dashboard colours for control  
  _Rationale:_ Colours do not govern access.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
