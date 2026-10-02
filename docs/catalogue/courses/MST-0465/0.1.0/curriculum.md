# Federated Learning and Privacy-Preserving Machine Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0465` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-PPML-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain privacy risks in standard ML and the goals of privacy-preserving ML
2. Describe how federated learning trains without centralising raw data
3. Apply differential privacy concepts to data and models
4. Compare secure aggregation, encryption and anonymisation approaches
5. Choose a privacy approach that fits a use case and its regulations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Privacy risks in ML (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify the leakage risk in a model that memorised rare records; (2) Map a use case to a threat model
- Common misconception addressed: Believing aggregate models cannot expose individuals
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How models can leak training data | 96 | 8 |
| M01L02 | Threat models and privacy goals | 96 | 8 |

### M02 Federated learning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide whether federated learning fits a hospital consortium; (2) Explain why client data heterogeneity hurts convergence
- Common misconception addressed: Assuming federated learning alone guarantees privacy
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How federated training works | 96 | 8 |
| M02L02 | Non-IID data, communication and system challenges | 96 | 8 |

### M03 Differential privacy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reason about an epsilon choice's utility/privacy trade-off; (2) Decide where to add DP noise in a training pipeline
- Common misconception addressed: Treating simple anonymisation as equivalent to differential privacy
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The DP guarantee and the privacy budget | 96 | 8 |
| M03L02 | Adding noise: where and how much | 96 | 8 |

### M04 Cryptographic and anonymisation methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose secure aggregation versus plain averaging for a federated job; (2) Show why k-anonymity can still permit re-identification via linkage
- Common misconception addressed: Believing that removing names makes data anonymous
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Secure aggregation and homomorphic encryption | 96 | 8 |
| M04L02 | k-anonymity, pseudonymisation and their limits | 96 | 8 |

### M05 Choosing an approach under regulation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Select a privacy stack for cross-border health data; (2) Document the privacy guarantee for an auditor
- Common misconception addressed: Assuming one technique satisfies every regulation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Matching methods to GDPR/HIPAA-style requirements | 96 | 8 |
| M05L02 | Combining methods and documenting guarantees | 96 | 8 |

## Integrative case

Three hospitals want a shared diagnostic model without sharing patient records. Pick federated learning with the right privacy additions, justify a differential-privacy budget, choose an aggregation method, and document the guarantees for a compliance review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0465-final-protected | 25 | 25 | yes |
| MST-0465-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Privacy risks in ML | 5 |
| Federated learning | 5 |
| Differential privacy | 5 |
| Cryptographic and anonymisation methods | 5 |
| Choosing an approach under regulation | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0465-Q0001** (single-answer, Select ONE) Federated learning primarily avoids…

- A. Centralising raw training data in one place **(key)**  
  _Rationale:_ Correct: clients train locally and share only model updates.
- B. Using any model at all  
  _Rationale:_ A model is still trained; only data stays local.
- C. All privacy risk automatically  
  _Rationale:_ Updates can still leak; extra measures are needed.
- D. The need for data entirely  
  _Rationale:_ Data is still used, just kept local.

**MST-0465-Q0002** (multiple-answer, Select TWO) Which TWO statements about differential privacy are correct? (Select TWO.)

- A. It bounds how much any single record can affect the output **(key)**  
  _Rationale:_ Correct: that bound is the core DP guarantee.
- B. A smaller epsilon means stronger privacy **(key)**  
  _Rationale:_ Correct: lower epsilon means tighter privacy, usually at some utility cost.
- C. It requires sharing raw data centrally  
  _Rationale:_ DP does not require centralising raw data.
- D. It guarantees zero utility loss  
  _Rationale:_ Adding noise trades some utility for privacy.

**MST-0465-Q0003** (single-answer, Select ONE) Why is removing names not sufficient for anonymisation?

- A. Records can be re-identified by linking other attributes **(key)**  
  _Rationale:_ Correct: quasi-identifiers enable linkage attacks.
- B. Names are the only possible identifier  
  _Rationale:_ Many attributes can identify a person.
- C. It fully anonymises the data  
  _Rationale:_ It does not; linkage remains possible.
- D. Encryption is never needed afterwards  
  _Rationale:_ This does not follow and is false.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
