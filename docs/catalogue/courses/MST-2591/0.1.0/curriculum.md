# R Programming: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2591` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint; compiler, runtime, standard-library and tooling versions to be pinned at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — R Programming: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Run R code and use the console and scripts
2. Use R's vectors, atomic types and vectorised operations
3. Index and subset vectors, lists and data frames
4. Write functions and use control flow in R
5. Read data into a data frame and inspect it
6. Produce basic summaries and a simple plot

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started (20% (design weight), design weight)

- Worked applications: (1) Assign a value and inspect it; (2) Install and load a package
- Common misconception addressed: Confusing <- assignment with == comparison
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | R, RStudio and the console | 64 | 4 |
| M01L02 | Assignment and basic arithmetic | 64 | 4 |
| M01L03 | Packages and library() | 64 | 4 |

### M02 Vectors and types (20% (design weight), design weight)

- Worked applications: (1) Apply an operation across a vector; (2) Coerce a vector's type
- Common misconception addressed: Expecting a loop where vectorisation is idiomatic
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Atomic vectors and c() | 64 | 4 |
| M02L02 | Numeric, character, logical | 64 | 4 |
| M02L03 | Vectorised arithmetic and recycling | 64 | 4 |

### M03 Subsetting (20% (design weight), design weight)

- Worked applications: (1) Filter a vector with a logical mask; (2) Select rows of a data frame by condition
- Common misconception addressed: Dropping to a vector unexpectedly with [ , ]
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Positional and logical indexing | 64 | 4 |
| M03L02 | Named access and lists | 64 | 4 |
| M03L03 | Data frame row/column selection | 64 | 4 |

### M04 Functions and control flow (20% (design weight), design weight)

- Worked applications: (1) Write a function with a default argument; (2) Branch on a condition
- Common misconception addressed: Relying on a loop where apply is clearer
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Defining functions and defaults | 64 | 4 |
| M04L02 | if/else and for | 64 | 4 |
| M04L03 | Return values and scoping | 64 | 4 |

### M05 Data frames and plots (20% (design weight), design weight)

- Worked applications: (1) Summarise a data frame with summary(); (2) Plot one variable against another
- Common misconception addressed: Treating a factor as if it were plain text
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reading CSV into a data frame | 64 | 4 |
| M05L02 | str, summary and head | 64 | 4 |
| M05L03 | A basic plot | 64 | 4 |

## Integrative case

A beginner analyses a small dataset in R: read a CSV into a data frame, subset rows with a logical condition, summarise a numeric column, write a helper function, and draw a simple scatter plot.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2591-final-protected | 40 | 40 | yes |
| MST-2591-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started | 8 |
| Vectors and types | 8 |
| Subsetting | 8 |
| Functions and control flow | 8 |
| Data frames and plots | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2591-Q0001** (single-answer, Select ONE) What does vectorised arithmetic in R mean for x + y when x and y are numeric vectors?

- A. The operation is applied element-wise across the vectors **(key)**  
  _Rationale:_ R applies + to each aligned pair, a core idiom avoiding explicit loops.
- B. Only the first elements are added  
  _Rationale:_ All aligned elements are combined, not just the first.
- C. It concatenates the two vectors  
  _Rationale:_ Concatenation is c(), not +.
- D. It raises an error unless lengths are equal  
  _Rationale:_ R recycles shorter vectors (with a warning if not a multiple), rather than always erroring.

**MST-2591-Q0002** (multiple-answer, Select TWO) Select TWO correct statements about subsetting in R.

- A. A logical vector can select elements where it is TRUE **(key)**  
  _Rationale:_ Logical indexing keeps positions that are TRUE.
- B. Negative indices drop the elements at those positions **(key)**  
  _Rationale:_ Negative subscripts exclude elements in R.
- C. Indexing in R starts at 0  
  _Rationale:_ R indexing is 1-based.
- D. df[df$x > 0] on a data frame filters rows like df[df$x > 0, ]  
  _Rationale:_ Single-bracket without a comma selects columns, not rows.

**MST-2591-Q0003** (single-answer, Select ONE) Why distinguish a factor from a character vector in R?

- A. A factor stores a fixed set of levels and is treated as categorical in models and plots **(key)**  
  _Rationale:_ Factors encode categories with levels, affecting modelling and plotting.
- B. A factor can only hold numbers  
  _Rationale:_ Factors represent categories, often from text.
- C. Characters cannot be stored in a data frame  
  _Rationale:_ Character vectors are perfectly valid columns.
- D. Factors are always faster for arithmetic  
  _Rationale:_ Arithmetic on factors is generally inappropriate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
