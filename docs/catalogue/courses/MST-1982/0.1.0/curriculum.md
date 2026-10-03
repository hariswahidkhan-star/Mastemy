# AI in Genomics and Proteomics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1982` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — AI in Genomics and Proteomics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe genomic and proteomic data and their scale
2. Explain machine-learning models for sequence and expression data
3. Describe protein structure and function prediction with AI
4. Explain variant effect prediction and its uses
5. Evaluate models with biology-aware validation
6. Reason about interpretability, bias and honest reporting in omics AI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Omics data and representations (25% (Mastemy design weight), design weight)

- Worked applications: (1) One-hot encode a short DNA sequence for a model; (2) Choose a representation for variable-length proteins
- Common misconception addressed: Assuming omics data are small and tidy like a textbook example
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Genomic, transcriptomic and proteomic data | 120 | 7 |
| M01L02 | Encoding sequences and expression for models | 120 | 7 |

### M02 Models for sequence and expression (25% (Mastemy design weight), design weight)

- Worked applications: (1) Pick a model type for a sequence-classification task; (2) Cluster samples by expression and interpret the groups
- Common misconception addressed: Treating cluster labels as ground-truth biology
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Machine learning and deep learning on sequences | 120 | 7 |
| M02L02 | Expression-based prediction and clustering | 120 | 7 |

### M03 Structure and variant prediction (25% (Mastemy design weight), design weight)

- Worked applications: (1) Interpret a predicted structure's confidence score; (2) Explain what a variant-effect predictor does and does not tell you
- Common misconception addressed: Reading a confident structure prediction as experimentally proven
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI protein structure and function prediction | 120 | 7 |
| M03L02 | Variant effect prediction | 120 | 7 |

### M04 Validation and responsible use (25% (Mastemy design weight), design weight)

- Worked applications: (1) Design a split that respects gene families to avoid leakage; (2) Rewrite an over-claimed omics-AI result honestly
- Common misconception addressed: Using random splits that leak homologous sequences across folds
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Biology-aware evaluation and leakage | 120 | 7 |
| M04L02 | Interpretability, bias and honest reporting | 120 | 7 |

## Integrative case

A lab wants to predict the functional impact of variants in a gene family using a sequence model: design the representations, a leakage-safe evaluation and an interpretation that distinguishes prediction from experimental proof.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1982-final-protected | 40 | 40 | yes |
| MST-1982-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Omics data and representations | 10 |
| Models for sequence and expression | 10 |
| Structure and variant prediction | 10 |
| Validation and responsible use | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1982-Q0001** (single-answer, Select ONE) A protein-structure predictor returns a high per-residue confidence score. What does this mean?

- A. The model is confident in that region's predicted geometry, not that it is experimentally verified **(key)**  
  _Rationale:_ Correct: confidence is a model estimate, not experimental validation.
- B. The structure has been confirmed in the laboratory  
  _Rationale:_ No experimental confirmation is implied.
- C. The protein's function is now known  
  _Rationale:_ Structural confidence does not establish function.
- D. The prediction cannot be wrong  
  _Rationale:_ High-confidence predictions can still be incorrect.

**MST-1982-Q0002** (multiple-answer, Select TWO) Which TWO precautions reduce data leakage in omics model evaluation? (Select TWO.)

- A. Splitting the data by gene or protein family **(key)**  
  _Rationale:_ Correct: family-aware splits prevent homologues leaking across folds.
- B. Keeping near-identical sequences out of both train and test **(key)**  
  _Rationale:_ Correct: removing duplicates prevents inflated scores.
- C. Choosing the split that gives the best test score  
  _Rationale:_ Optimising the split for score invites leakage.
- D. Testing on the training data  
  _Rationale:_ Testing on training data directly causes leakage.

**MST-1982-Q0003** (single-answer, Select ONE) What is a variant-effect predictor primarily designed to output?

- A. An estimate of how likely a variant is to alter function **(key)**  
  _Rationale:_ Correct: it predicts functional impact as a hypothesis for testing.
- B. A definitive medical diagnosis  
  _Rationale:_ It is not a diagnosis or medical advice.
- C. The exact three-dimensional structure of DNA  
  _Rationale:_ That is not its purpose.
- D. A guarantee of the variant's real-world effect  
  _Rationale:_ Predictions are not guarantees.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
