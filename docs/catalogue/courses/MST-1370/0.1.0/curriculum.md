# Bias Detection and Mitigation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1370` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Understanding bias
2. Detecting bias
3. Mitigation techniques
4. Validation and monitoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Understanding bias (MASTEMY-DESIGN 25%)

- Worked applications: (1) Classify a bias by its source; (2) Find a proxy for a protected attribute
- Common misconception addressed: Assuming bias comes only from the model, not the data or objective
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Types and sources of bias in ML | 72 | 6 |
| M01L02 | Protected attributes and proxies | 72 | 6 |

### M02 Detecting bias (MASTEMY-DESIGN 25%)

- Worked applications: (1) Compute a fairness metric by subgroup; (2) Find an underperforming slice
- Common misconception addressed: Reporting one aggregate score that hides subgroup harm
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Fairness metrics and disaggregated evaluation | 72 | 6 |
| M02L02 | Slicing and subgroup analysis | 72 | 6 |

### M03 Mitigation techniques (MASTEMY-DESIGN 25%)

- Worked applications: (1) Apply a reweighting/pre-processing fix; (2) Adjust thresholds post-hoc by group
- Common misconception addressed: Expecting a mitigation to remove bias with zero accuracy trade-off
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pre-, in- and post-processing methods | 72 | 6 |
| M03L02 | Trade-offs with accuracy | 72 | 6 |

### M04 Validation and monitoring (MASTEMY-DESIGN 25%)

- Worked applications: (1) Verify a mitigation on held-out slices; (2) Set up drift-aware bias monitoring
- Common misconception addressed: Assuming a one-time mitigation holds as data drifts
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Validating a mitigation really helped | 72 | 6 |
| M04L02 | Ongoing bias monitoring | 72 | 6 |

## Integrative case

A hiring model passes overall accuracy but rejects a qualified subgroup at a higher rate. Detect the disparity with disaggregated metrics, trace its source, apply and validate a mitigation, and monitor for recurrence.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1370-final-protected | 20 | 20 | yes |
| MST-1370-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Understanding bias | 5 |
| Detecting bias | 5 |
| Mitigation techniques | 5 |
| Validation and monitoring | 5 |

Minimum reviewed item bank: 232 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1370-Q0001** (single-answer, Select ONE) A model has 92% overall accuracy but 70% recall for one subgroup. What does this show?

- A. Aggregate accuracy can mask serious subgroup harm **(key)**  
  _Rationale:_ Correct: disaggregated evaluation reveals hidden disparities.
- B. The model is fair because overall accuracy is high  
  _Rationale:_ High aggregate accuracy does not imply subgroup fairness.
- C. Recall is irrelevant to fairness  
  _Rationale:_ Subgroup recall is central here.
- D. The dataset must be too small  
  _Rationale:_ Size is not what this result indicates.

**MST-1370-Q0002** (multiple-answer, Select TWO) Which TWO are honest statements about bias mitigation? (Select TWO.)

- A. Mitigations often trade some accuracy for improved fairness **(key)**  
  _Rationale:_ Correct: trade-offs are common and should be stated.
- B. A mitigation must be validated on held-out subgroups to confirm it helped **(key)**  
  _Rationale:_ Correct: you must verify the fix, not assume it.
- C. Mitigation permanently fixes bias with no monitoring needed  
  _Rationale:_ Drift can reintroduce bias.
- D. Removing the protected attribute always removes bias  
  _Rationale:_ Proxies can preserve bias.

**MST-1370-Q0003** (single-answer, Select ONE) Why monitor for bias after deploying a mitigation?

- A. Data and behaviour drift, so a fix can degrade over time **(key)**  
  _Rationale:_ Correct: fairness is not static and must be watched.
- B. Monitoring makes the model more accurate  
  _Rationale:_ Monitoring detects; it does not improve accuracy.
- C. Because mitigations never work  
  _Rationale:_ They can work; monitoring confirms they keep working.
- D. To avoid writing any documentation  
  _Rationale:_ Monitoring and documentation are both good practice.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
