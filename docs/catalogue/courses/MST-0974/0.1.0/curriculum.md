# Alteryx: Analytical Automation and Workflow Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0974` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | - |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Alteryx: Analytical Automation and Workflow Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Workflow basics
2. Preparation tools
3. Join and blend
4. Transform tools
5. Parsing and spatial
6. Automation and sharing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Workflow basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a workflow reading an Excel file; (2) Profile a dataset with the Browse tool
- Common misconception addressed: Running a workflow without inspecting data types first
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Alteryx canvas and tools | 80 | 6 |
| M01L02 | Input and output tools | 80 | 6 |
| M01L03 | Browse and data profiling | 80 | 6 |

### M02 Preparation tools (MASTEMY-DESIGN 17%)

- Worked applications: (1) Filter records with a condition; (2) Create a calculated column with Formula
- Common misconception addressed: Using Unique expecting it to aggregate rather than dedupe
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Select, filter and sort | 80 | 6 |
| M02L02 | Formula and multi-field tools | 80 | 6 |
| M02L03 | Sample and unique | 80 | 6 |

### M03 Join and blend (MASTEMY-DESIGN 17%)

- Worked applications: (1) Join customers to orders on an ID; (2) Append a small lookup to every row
- Common misconception addressed: Treating a Join's unmatched outputs as errors to ignore
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Join and union | 80 | 6 |
| M03L02 | Find Replace and Append Fields | 80 | 6 |
| M03L03 | Fuzzy matching | 80 | 6 |

### M04 Transform tools (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pivot wide data with Transpose; (2) Summarize sales by region
- Common misconception addressed: Confusing Transpose with Cross Tab direction
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Transpose and Cross Tab | 80 | 6 |
| M04L02 | Summarize | 80 | 6 |
| M04L03 | Running total and tile | 80 | 6 |

### M05 Parsing and spatial (MASTEMY-DESIGN 16%)

- Worked applications: (1) Split a full name with Text to Columns; (2) Parse a messy date string to a date
- Common misconception addressed: Assuming RegEx parse keeps the original column automatically
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Text to Columns and RegEx | 80 | 6 |
| M05L02 | Date-time parsing | 80 | 6 |
| M05L03 | Spatial tools overview | 80 | 6 |

### M06 Automation and sharing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a drop-down interface tool to a workflow; (2) Build a simple batch macro
- Common misconception addressed: Hard-coding file paths that break when scheduled
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Analytic apps and interface tools | 80 | 6 |
| M06L02 | Macros | 80 | 6 |
| M06L03 | Scheduling and publishing to Server | 80 | 6 |

## Integrative case

Automate a reporting pipeline in Alteryx: input and profile raw files, prepare and join datasets, transform and summarize, then package it as an analytic app and schedule it to run.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0974-final-protected | 30 | 30 | yes |
| MST-0974-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Workflow basics | 5 |
| Preparation tools | 5 |
| Join and blend | 5 |
| Transform tools | 5 |
| Parsing and spatial | 5 |
| Automation and sharing | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0974-Q0001** (single-answer, Select ONE) You need to combine a customer table and an orders table on a shared CustomerID, keeping only matching rows. Which tool fits?

- A. The Join tool **(key)**  
  _Rationale:_ Correct: the Join tool matches rows on a key and outputs matched records from its J anchor.
- B. The Formula tool  
  _Rationale:_ The Formula tool creates or edits columns; it does not join tables.
- C. The Summarize tool  
  _Rationale:_ Summarize aggregates; it does not join on a key.
- D. The Sample tool  
  _Rationale:_ Sample returns a subset of rows; it does not combine tables.

**MST-0974-Q0002** (single-answer, Select ONE) Which tool reshapes data from a wide layout into a tall key-value layout?

- A. Transpose **(key)**  
  _Rationale:_ Correct: Transpose pivots columns into rows (wide to tall).
- B. Cross Tab  
  _Rationale:_ Cross Tab does the reverse, turning rows into columns.
- C. Select  
  _Rationale:_ Select renames or reorders fields; it does not reshape.
- D. Browse  
  _Rationale:_ Browse only displays data.

**MST-0974-Q0003** (multiple-answer, Select TWO) Which TWO help an Alteryx workflow run reliably when scheduled on Server? (Select TWO)

- A. Use relative or configurable paths rather than hard-coded local paths **(key)**  
  _Rationale:_ Correct: configurable paths keep the workflow working after deployment.
- B. Parameterize inputs with interface tools where needed **(key)**  
  _Rationale:_ Correct: interface tools let inputs be supplied at run time.
- C. Delete all output tools  
  _Rationale:_ Removing output tools means the workflow produces nothing.
- D. Rely on files that exist only on the developer's laptop  
  _Rationale:_ Local-only files are unavailable to the Server and will fail.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
