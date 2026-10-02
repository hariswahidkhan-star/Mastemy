# Large Language Model Training and Adaptation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0452` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. LLM training foundations
2. Supervised fine-tuning
3. Alignment and preference tuning
4. Evaluation and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 LLM training foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain next-token pretraining on a corpus; (2) Estimate the effect of more data vs more parameters
- Common misconception addressed: Assuming more parameters always beat more data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pretraining objectives and data | 120 | 8 |
| M01L02 | Tokenization and scaling laws | 120 | 8 |

### M02 Supervised fine-tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Format an instruction-tuning example; (2) Judge a dataset for quality issues
- Common misconception addressed: Believing quantity of data outweighs quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Instruction tuning and datasets | 120 | 8 |
| M02L02 | Data quality and formatting | 120 | 8 |

### M03 Alignment and preference tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace an RLHF loop at a high level; (2) Compare RLHF to direct preference optimization
- Common misconception addressed: Thinking alignment removes all harmful outputs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | RLHF and reward models | 120 | 8 |
| M03L02 | Preference optimization (DPO) overview | 120 | 8 |

### M04 Evaluation and deployment (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a held-out eval for an instruction model; (2) Catch a regression after a tuning run
- Common misconception addressed: Reporting a single benchmark as overall capability
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Benchmarks and held-out evaluation | 120 | 8 |
| M04L02 | Regression testing and monitoring | 120 | 8 |

## Integrative case

An organization wants a domain assistant adapted from a base LLM. Decide what pretraining assumptions apply, build an instruction-tuning dataset, choose an alignment method, and design evaluation that detects regressions before release.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0452-final-protected | 20 | 20 | yes |
| MST-0452-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| LLM training foundations | 5 |
| Supervised fine-tuning | 5 |
| Alignment and preference tuning | 5 |
| Evaluation and deployment | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0452-Q0001** (single-answer, Select ONE) What is the usual self-supervised objective used to pretrain a decoder-only language model?

- A. Predicting the next token given previous tokens **(key)**  
  _Rationale:_ Correct: next-token prediction is the standard pretraining objective.
- B. Classifying images into categories  
  _Rationale:_ That is a vision task.
- C. Clustering unlabeled tabular rows  
  _Rationale:_ That is unsupervised tabular learning.
- D. Predicting the file format of the input  
  _Rationale:_ That is not a language-model objective.

**MST-0452-Q0002** (multiple-answer, Select TWO) Which TWO are valid reasons to prefer high-quality over merely large instruction-tuning data? (Select TWO.)

- A. Noisy or wrong examples teach undesirable behaviour **(key)**  
  _Rationale:_ Correct: the model imitates whatever it is shown.
- B. Well-formatted, diverse examples generalize better **(key)**  
  _Rationale:_ Correct: quality and diversity improve generalization.
- C. Larger data always guarantees better alignment  
  _Rationale:_ Scale alone does not guarantee alignment.
- D. Quality never affects the model  
  _Rationale:_ Quality strongly affects the result.

**MST-0452-Q0003** (single-answer, Select ONE) Why is reporting a single benchmark score an incomplete view of an LLM's capability?

- A. One benchmark covers a narrow slice and can be gamed or overfit **(key)**  
  _Rationale:_ Correct: a single score hides weaknesses on other tasks.
- B. Benchmarks cannot be computed for LLMs  
  _Rationale:_ They can be computed.
- C. A single benchmark tests every possible task  
  _Rationale:_ It does not; it is narrow.
- D. Benchmarks are always unrelated to capability  
  _Rationale:_ They are related but partial.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
