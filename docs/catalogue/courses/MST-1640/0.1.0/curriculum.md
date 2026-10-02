# SAS Programming Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1640` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-SPF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the SAS programming model: DATA step and procedures
2. Read, create and manipulate SAS data sets
3. Transform data with DATA step logic and functions
4. Summarise and report with core SAS procedures
5. Combine data sets and debug common SAS errors

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The SAS model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify DATA vs PROC steps in a sample program; (2) Read a SAS log to confirm a step ran as intended
- Common misconception addressed: Ignoring the SAS log and missing warnings that changed results
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | DATA steps, PROC steps and the log | 96 | 8 |
| M01L02 | Libraries, data sets and the program flow | 96 | 8 |

### M02 Reading and creating data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose the right method to read a delimited file; (2) Create a data set with computed variables
- Common misconception addressed: Assuming a successful import means the variables typed correctly
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Importing and the INPUT statement | 96 | 8 |
| M02L02 | Creating and structuring SAS data sets | 96 | 8 |

### M03 DATA step transformation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write conditional logic to categorise a numeric variable; (2) Explain how the implicit DATA step loop processes rows
- Common misconception addressed: Forgetting that the DATA step iterates automatically over observations
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Assignment, conditional logic and iteration | 96 | 8 |
| M03L02 | Functions and the automatic loop | 96 | 8 |

### M04 Summarising and reporting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Produce a grouped summary with PROC MEANS and a BY variable; (2) Sort then print a subset for a report
- Common misconception addressed: Using a BY statement without sorting the data first
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | PROC MEANS, FREQ and SUMMARY | 96 | 8 |
| M04L02 | PROC PRINT, SORT and reporting | 96 | 8 |

### M05 Combining and debugging (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose SET vs MERGE for two described tasks; (2) Diagnose a merge that silently dropped rows
- Common misconception addressed: Merging unsorted data sets and getting incorrect matches
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Concatenating and merging data sets | 96 | 8 |
| M05L02 | Reading the log and fixing common errors | 96 | 8 |

## Integrative case

An analyst receives two SAS data sets of transactions and customers and must produce a monthly summary report. Import and type the data correctly, categorise values with DATA step logic, sort and merge the sets properly, summarise with the right procedure, and use the log to confirm the result rather than trusting it ran.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1640-final-protected | 25 | 25 | yes |
| MST-1640-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The SAS model | 5 |
| Reading and creating data | 5 |
| DATA step transformation | 5 |
| Summarising and reporting | 5 |
| Combining and debugging | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1640-Q0001** (single-answer, Select ONE) Before using a BY statement in a procedure, what must usually be true of the data?

- A. The data must be sorted by the BY variable(s) **(key)**  
  _Rationale:_ Correct: BY-group processing generally requires sorted data.
- B. The data must have no numeric variables  
  _Rationale:_ Numeric variables are fine with a BY statement.
- C. The data must be fewer than 100 rows  
  _Rationale:_ Row count is irrelevant to the BY requirement.
- D. The log must be turned off  
  _Rationale:_ The log should stay on to catch errors.

**MST-1640-Q0002** (multiple-answer, Select TWO) Which TWO statements about the SAS DATA step are correct? (Select TWO.)

- A. It iterates automatically over observations in the input **(key)**  
  _Rationale:_ Correct: the implicit loop processes each observation.
- B. It can create new variables with assignment statements **(key)**  
  _Rationale:_ Correct: assignment statements compute new variables.
- C. It cannot contain conditional logic  
  _Rationale:_ IF/THEN logic is a core DATA step feature.
- D. It only reads data and never writes it  
  _Rationale:_ The DATA step both reads and writes data sets.

**MST-1640-Q0003** (single-answer, Select ONE) A MERGE produced fewer matched rows than expected. What is the most likely cause?

- A. The data sets were not sorted by the BY variables before merging **(key)**  
  _Rationale:_ Correct: unsorted input causes incorrect or dropped matches in a BY merge.
- B. The log was left on  
  _Rationale:_ The log does not affect merge results.
- C. PROC PRINT was used  
  _Rationale:_ PRINT only displays data; it does not merge.
- D. There were too few variables  
  _Rationale:_ Variable count does not cause match loss.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
