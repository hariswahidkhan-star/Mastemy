# R Programming: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2592` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — R Programming: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manipulate data with the tidyverse (dplyr and tidyr)
2. Reshape data between wide and long formats
3. Apply the split-apply-combine pattern with group_by and summarise
4. Use the apply family and functional programming with purrr
5. Join data frames and handle missing values
6. Create layered visualisations with ggplot2

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 dplyr verbs (20% (design weight), design weight)

- Worked applications: (1) Chain filter, mutate and arrange with a pipe; (2) Add a derived column with mutate
- Common misconception addressed: Breaking a pipe by reassigning midway
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | filter, select, mutate | 64 | 4 |
| M01L02 | arrange and distinct | 64 | 4 |
| M01L03 | The pipe |> and %>% | 64 | 4 |

### M02 Reshaping (20% (design weight), design weight)

- Worked applications: (1) Reshape wide data to long with pivot_longer; (2) Tidy a messy column
- Common misconception addressed: Confusing wide and long when plotting
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | pivot_longer and pivot_wider | 64 | 4 |
| M02L02 | Tidy data principles | 64 | 4 |
| M02L03 | Separating and uniting columns | 64 | 4 |

### M03 Grouped summaries (20% (design weight), design weight)

- Worked applications: (1) Compute group means with summarise; (2) Add a group proportion with grouped mutate
- Common misconception addressed: Forgetting to ungroup and surprising later steps
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | group_by and summarise | 64 | 4 |
| M03L02 | Counting and proportions | 64 | 4 |
| M03L03 | Grouped mutate | 64 | 4 |

### M04 Functional R (20% (design weight), design weight)

- Worked applications: (1) Map a function over a list with map_dbl; (2) Vectorise safely with vapply
- Common misconception addressed: Using sapply and getting an unexpected type
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | apply, sapply, vapply | 64 | 4 |
| M04L02 | purrr map functions | 64 | 4 |
| M04L03 | Anonymous functions | 64 | 4 |

### M05 Joins and ggplot2 (20% (design weight), design weight)

- Worked applications: (1) Join two tables with left_join; (2) Facet a plot by a category
- Common misconception addressed: Dropping rows silently with an inner join
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | left_join and inner_join | 64 | 4 |
| M05L02 | Handling NA | 64 | 4 |
| M05L03 | ggplot2 aes, geoms and facets | 64 | 4 |

## Integrative case

A developer builds an R analysis pipeline: clean and reshape survey data with tidyr, join to a lookup table, summarise responses per group with dplyr, and present results as a faceted ggplot2 chart.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2592-final-protected | 40 | 40 | yes |
| MST-2592-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| dplyr verbs | 8 |
| Reshaping | 8 |
| Grouped summaries | 8 |
| Functional R | 8 |
| Joins and ggplot2 | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2592-Q0001** (single-answer, Select ONE) What does group_by followed by summarise produce in dplyr?

- A. One summary row per group, collapsing the grouped rows **(key)**  
  _Rationale:_ summarise reduces each group to a single aggregated row.
- B. The original rows unchanged  
  _Rationale:_ summarise aggregates; it does not return raw rows.
- C. A plot of the groups  
  _Rationale:_ summarise returns a data frame, not a plot.
- D. A wide-to-long reshape  
  _Rationale:_ Reshaping is pivot_*, not summarise.

**MST-2592-Q0002** (multiple-answer, Select TWO) Select TWO accurate statements about pivot_longer in tidyr.

- A. It gathers multiple columns into key-value pairs, making data longer **(key)**  
  _Rationale:_ pivot_longer stacks columns into name/value pairs.
- B. It increases the number of rows and reduces the number of columns **(key)**  
  _Rationale:_ Reshaping wide to long adds rows and removes spread-out columns.
- C. It computes group means automatically  
  _Rationale:_ Aggregation is summarise's job, not pivot_longer's.
- D. It is the same operation as pivot_wider  
  _Rationale:_ pivot_wider does the opposite transformation.

**MST-2592-Q0003** (single-answer, Select ONE) Why might an inner_join unintentionally drop data compared with a left_join?

- A. inner_join keeps only matching keys, discarding unmatched left-side rows **(key)**  
  _Rationale:_ Unmatched rows are removed by an inner join but kept by a left join.
- B. inner_join reverses the column order  
  _Rationale:_ Column order is not the issue.
- C. left_join cannot match on multiple keys  
  _Rationale:_ Both can join on multiple keys.
- D. inner_join converts numbers to text  
  _Rationale:_ Joins do not coerce types this way.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
