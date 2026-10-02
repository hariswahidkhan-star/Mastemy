# R: Statistical Programming and Reproducible Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0920` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-RP-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — R: Statistical Programming and Reproducible Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. R foundations and the environment
2. Data structures
3. Data wrangling with the tidyverse
4. Importing and cleaning data
5. Visualisation with ggplot2
6. Reproducible reporting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 R foundations and the environment (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create and inspect atomic vectors and their types; (2) Use the assignment operator and inspect objects in the environment
- Common misconception addressed: Thinking R indexes vectors starting at zero
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing R, RStudio and packages | 80 | 6 |
| M01L02 | Vectors, types and basic operations | 80 | 6 |

### M02 Data structures (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build and subset a list that holds mixed types; (2) Select rows and columns of a data frame by name and position
- Common misconception addressed: Confusing a data frame with a matrix
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lists, factors and data frames | 80 | 6 |
| M02L02 | Indexing and subsetting | 80 | 6 |

### M03 Data wrangling with the tidyverse (MASTEMY-DESIGN 17%)

- Worked applications: (1) Chain filter, mutate and summarise with the pipe; (2) Reshape wide data to long with pivot_longer
- Common misconception addressed: Expecting dplyr verbs to modify data in place
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | dplyr verbs and the pipe | 80 | 6 |
| M03L02 | Tidy data and reshaping with tidyr | 80 | 6 |

### M04 Importing and cleaning data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Import a messy CSV and fix column types; (2) Handle missing values explicitly before summarising
- Common misconception addressed: Assuming read functions always infer column types correctly
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading and writing data | 80 | 6 |
| M04L02 | Cleaning, types and missing values | 80 | 6 |

### M05 Visualisation with ggplot2 (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a layered scatter plot with mapped aesthetics; (2) Facet a chart to compare groups
- Common misconception addressed: Believing ggplot2 draws immediately without a geom layer
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The grammar of graphics | 80 | 6 |
| M05L02 | Geoms, aesthetics and facets | 80 | 6 |

### M06 Reproducible reporting (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write an R Markdown report that knits to HTML; (2) Parameterise a report so it regenerates for any month
- Common misconception addressed: Treating a saved workspace image as a reproducible analysis
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Functions and iteration with purrr | 80 | 6 |
| M06L02 | R Markdown and reproducibility | 80 | 6 |

## Integrative case

Produce a reproducible monthly sales report in R: import raw CSV exports, clean and reshape the data with the tidyverse, compute summary statistics by region, visualise trends, and render the whole analysis to an R Markdown document that regenerates from scratch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0920-final-protected | 30 | 30 | yes |
| MST-0920-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0920-Q0001** (single-answer, Select ONE) In R, what does `x[1]` return when `x <- c(10, 20, 30)`?

- A. 10 **(key)**  
  _Rationale:_ Correct: R vectors are 1-indexed, so position 1 is the first element.
- B. 20  
  _Rationale:_ 20 is at index 2; R does not use zero-based indexing.
- C. 0  
  _Rationale:_ R has no element at index 0 for this vector.
- D. An error  
  _Rationale:_ Index 1 is valid and returns the first element.

**MST-0920-Q0002** (multiple-answer, Select TWO) Which TWO tidyverse functions reshape or transform columns of a data frame? (Select TWO)

- A. mutate() **(key)**  
  _Rationale:_ Correct: mutate() adds or changes columns.
- B. pivot_longer() **(key)**  
  _Rationale:_ Correct: pivot_longer() reshapes wide columns into key-value rows.
- C. install.packages()  
  _Rationale:_ This installs packages; it does not transform data.
- D. library()  
  _Rationale:_ This loads a package; it does not transform data.

**MST-0920-Q0003** (single-answer, Select ONE) Why is knitting an R Markdown document more reproducible than saving a workspace image?

- A. It re-runs the code from the source each time, so results match the code **(key)**  
  _Rationale:_ Correct: knitting executes the analysis fresh, keeping outputs consistent with the code.
- B. It compresses the data more efficiently  
  _Rationale:_ Reproducibility is about re-executing code, not compression.
- C. It prevents anyone from editing the code  
  _Rationale:_ The source remains editable; that is not the point.
- D. It stores results without the code  
  _Rationale:_ A workspace image stores results without code, which is the less reproducible option.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
