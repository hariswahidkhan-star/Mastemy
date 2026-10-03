# Genomics and Sequencing Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1980` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Genomics and Sequencing Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe sequencing technologies and their trade-offs
2. Explain read quality control, trimming and preprocessing
3. Perform read alignment and genome assembly at a conceptual level
4. Call and interpret genetic variants
5. Analyse gene expression from RNA-seq at a conceptual level
6. Reason about batch effects, coverage and the limits of interpretation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Sequencing technologies (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose short- versus long-read sequencing for a repeat-rich genome; (2) Estimate the coverage required for a given goal
- Common misconception addressed: Thinking more reads always mean better results regardless of design
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Short-read and long-read sequencing | 120 | 7 |
| M01L02 | Experimental design, coverage and depth | 120 | 7 |

### M02 Read processing and alignment (25% (Mastemy design weight), design weight)

- Worked applications: (1) Interpret a per-base quality plot and decide on trimming; (2) Explain why assembly is harder than alignment to a reference
- Common misconception addressed: Assuming raw reads need no quality control
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Quality control and trimming | 120 | 7 |
| M02L02 | Read alignment and genome assembly | 120 | 7 |

### M03 Variant and expression analysis (25% (Mastemy design weight), design weight)

- Worked applications: (1) Interpret a variant call with its depth and quality fields; (2) Read a volcano plot of differential expression
- Common misconception addressed: Treating a statistically significant fold change as automatically biologically important
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Variant calling and interpretation | 120 | 7 |
| M03L02 | RNA-seq and differential expression | 120 | 7 |

### M04 Interpretation and pitfalls (25% (Mastemy design weight), design weight)

- Worked applications: (1) Spot a likely batch effect in a described design; (2) Rewrite an overstated genomics claim into an honest one
- Common misconception addressed: Ignoring multiple-testing correction across thousands of genes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Batch effects, normalisation and confounders | 120 | 7 |
| M04L02 | Interpretation limits and responsible reporting | 120 | 7 |

## Integrative case

A team sequences research samples across two machines over two weeks: design the analysis from quality control through variant and expression calling, and identify where batch effects or low coverage could mislead the conclusions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1980-final-protected | 40 | 40 | yes |
| MST-1980-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Sequencing technologies | 10 |
| Read processing and alignment | 10 |
| Variant and expression analysis | 10 |
| Interpretation and pitfalls | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1980-Q0001** (single-answer, Select ONE) Why can long-read sequencing resolve repetitive genomic regions better than short reads?

- A. A single read can span the whole repeat, anchoring it uniquely **(key)**  
  _Rationale:_ Correct: a read spanning the repeat removes ambiguity in its placement.
- B. Long reads never contain errors  
  _Rationale:_ Long reads can have higher per-base error rates.
- C. Short reads cannot be aligned at all  
  _Rationale:_ Short reads align well outside repetitive regions.
- D. Long reads never require assembly  
  _Rationale:_ Assembly can still be required with long reads.

**MST-1980-Q0002** (multiple-answer, Select TWO) Which TWO fields help you judge confidence in a called variant? (Select TWO.)

- A. Read depth at the site **(key)**  
  _Rationale:_ Correct: higher depth generally supports a more confident call.
- B. The variant quality score **(key)**  
  _Rationale:_ Correct: the quality score reflects call confidence.
- C. The file's creation date  
  _Rationale:_ File date does not indicate variant confidence.
- D. The length of the sample's name  
  _Rationale:_ Sample-name length is irrelevant to confidence.

**MST-1980-Q0003** (single-answer, Select ONE) Thousands of genes are tested for differential expression. Why must the p-values be corrected?

- A. Many false positives arise by chance across thousands of tests **(key)**  
  _Rationale:_ Correct: multiple testing inflates false positives without correction.
- B. Correction makes all genes significant  
  _Rationale:_ Correction is more conservative, not less.
- C. RNA-seq produces no p-values  
  _Rationale:_ Differential-expression analysis yields p-values.
- D. Only one gene is ever tested  
  _Rationale:_ Many genes are tested at the same time.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
