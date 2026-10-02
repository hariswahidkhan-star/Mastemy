# Synthetic Data Generation and Quality Assurance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0456` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-SDG-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Why synthetic data
2. Generation methods
3. Quality assurance
4. Governance and use

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why synthetic data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide if synthetic data fits a problem; (2) Identify a privacy use case
- Common misconception addressed: Treating synthetic data as free of all privacy risk
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Use cases: scarcity, privacy, balance | 120 | 8 |
| M01L02 | Risks and when not to use it | 120 | 8 |

### M02 Generation methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a rule-based generator for forms; (2) Use a generative model for tabular data
- Common misconception addressed: Assuming a generative model captures rare edge cases automatically
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Rule-based and simulation | 120 | 8 |
| M02L02 | Generative models for synthetic data | 120 | 8 |

### M03 Quality assurance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare real vs synthetic distributions; (2) Test synthetic data for memorized records
- Common misconception addressed: Judging synthetic data only on how real it looks
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Fidelity, diversity and utility metrics | 120 | 8 |
| M03L02 | Detecting leakage and memorization | 120 | 8 |

### M04 Governance and use (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check synthetic data for amplified bias; (2) Write a provenance note for a dataset
- Common misconception addressed: Shipping synthetic data without documenting its origin
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bias amplification and fairness | 120 | 8 |
| M04L02 | Documentation and provenance | 120 | 8 |

## Integrative case

A bank cannot share customer records but needs data to test a fraud model. Decide where synthetic data is appropriate, choose a generation method, measure fidelity and utility, and check for leakage, bias amplification and proper documentation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0456-final-protected | 20 | 20 | yes |
| MST-0456-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why synthetic data | 5 |
| Generation methods | 5 |
| Quality assurance | 5 |
| Governance and use | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0456-Q0001** (single-answer, Select ONE) Which is a primary legitimate motivation for using synthetic data?

- A. Sharing data-like examples without exposing real personal records **(key)**  
  _Rationale:_ Correct: privacy preservation is a core synthetic-data use case.
- B. Guaranteeing the model will never be wrong  
  _Rationale:_ Synthetic data does not guarantee correctness.
- C. Removing the need to evaluate the model  
  _Rationale:_ Evaluation is still required.
- D. Eliminating all bias automatically  
  _Rationale:_ Synthetic data can amplify bias, not remove it.

**MST-0456-Q0002** (multiple-answer, Select TWO) Which TWO checks belong in synthetic-data quality assurance? (Select TWO.)

- A. Comparing real and synthetic distributions for fidelity **(key)**  
  _Rationale:_ Correct: fidelity checks that synthetic data resembles real patterns.
- B. Testing whether real records were memorized and reproduced **(key)**  
  _Rationale:_ Correct: leakage/memorization testing protects privacy.
- C. Confirming the data file is larger than the original  
  _Rationale:_ File size is not a quality measure.
- D. Checking that it looks realistic and ignoring utility  
  _Rationale:_ Utility for the downstream task also matters.

**MST-0456-Q0003** (single-answer, Select ONE) Why can synthetic data amplify bias present in the source data?

- A. Generators learn and can exaggerate patterns, including biased ones, in the source **(key)**  
  _Rationale:_ Correct: models reproduce and may intensify source biases.
- B. Synthetic data is always unbiased  
  _Rationale:_ It can carry and amplify bias.
- C. Bias only exists in images  
  _Rationale:_ Bias affects many data types.
- D. Documentation causes bias  
  _Rationale:_ Documentation records provenance; it does not cause bias.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
