# Data Labeling and Annotation Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0464` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-DLAO-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how labeled data quality drives model performance
2. Write clear annotation guidelines and label schemas
3. Set up labeling workflows, tooling and workforce models
4. Measure and improve inter-annotator agreement and label quality
5. Manage cost, throughput and ethics in annotation operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why labels matter (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a label schema for a support-ticket classifier; (2) Decide span versus document labels for an extraction task
- Common misconception addressed: Believing more data always beats better labels
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Garbage-in: labels and model quality | 96 | 8 |
| M01L02 | Label types and schemas | 96 | 8 |

### M02 Writing guidelines (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rewrite an ambiguous labeling instruction; (2) Add edge-case rules from a batch of reviewer questions
- Common misconception addressed: Assuming annotators share your intuition without written rules
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Annotation guidelines that reduce ambiguity | 96 | 8 |
| M02L02 | Edge cases, examples and decision rules | 96 | 8 |

### M03 Workflows and workforce (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a workforce model for sensitive medical data; (2) Place gold-standard checks in a labeling pipeline
- Common misconception addressed: Treating labeling as a one-off project rather than an operation
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | In-house, crowd and vendor workforce models | 96 | 8 |
| M03L02 | Tooling, pipelines and gold tasks | 96 | 8 |

### M04 Measuring label quality (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a low Cohen's kappa and decide the next step; (2) Diagnose a class with consistent mislabeling
- Common misconception addressed: Assuming high agreement means the labels are correct
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Inter-annotator agreement and adjudication | 96 | 8 |
| M04L02 | Finding and fixing systematic label error | 96 | 8 |

### M05 Cost, throughput and ethics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Prioritise items with active learning under a fixed budget; (2) Define safeguards for annotators handling distressing content
- Common misconception addressed: Optimising only cost while ignoring annotator welfare
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Budget, throughput and active learning | 96 | 8 |
| M05L02 | Worker welfare and sensitive content | 96 | 8 |

## Integrative case

A startup needs 50,000 labeled support tickets quickly, cheaply and accurately. Design the schema and guidelines, pick the workforce and tooling, set quality checks and agreement targets, and balance budget against welfare in an operations plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0464-final-protected | 25 | 25 | yes |
| MST-0464-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why labels matter | 5 |
| Writing guidelines | 5 |
| Workflows and workforce | 5 |
| Measuring label quality | 5 |
| Cost, throughput and ethics | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0464-Q0001** (single-answer, Select ONE) Two annotators disagree often on one class. What is the most likely first fix?

- A. Clarify the annotation guidelines and edge-case rules **(key)**  
  _Rationale:_ Correct: ambiguity in guidelines is the usual cause of disagreement.
- B. Hire more annotators  
  _Rationale:_ More people repeating an ambiguous rule will not help.
- C. Increase the model size  
  _Rationale:_ The problem is in labeling, not the model.
- D. Delete the class entirely  
  _Rationale:_ Removing the class discards needed signal.

**MST-0464-Q0002** (multiple-answer, Select TWO) Which TWO practices improve label quality in an operation? (Select TWO.)

- A. Insert gold-standard check tasks **(key)**  
  _Rationale:_ Correct: known-answer tasks catch drifting annotators.
- B. Provide clear guidelines with worked examples **(key)**  
  _Rationale:_ Correct: explicit rules and examples reduce ambiguity.
- C. Pay per item with no review  
  _Rationale:_ This incentivises speed over accuracy.
- D. Hide the schema from annotators  
  _Rationale:_ Annotators cannot label consistently without the schema.

**MST-0464-Q0003** (single-answer, Select ONE) Cohen's kappa is used to measure…

- A. Inter-annotator agreement beyond chance **(key)**  
  _Rationale:_ Correct: kappa corrects raw agreement for chance.
- B. Model accuracy  
  _Rationale:_ Kappa is about annotator agreement, not model accuracy here.
- C. Dataset size  
  _Rationale:_ Kappa is not a size measure.
- D. Labeling cost  
  _Rationale:_ Kappa does not measure cost.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
