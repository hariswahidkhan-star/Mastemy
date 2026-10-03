# Data Governance and Privacy for AI Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1886` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Data Governance and Privacy for AI Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how data governance underpins trustworthy AI
2. Apply core privacy principles (purpose limitation, data minimisation, lawful basis) to AI data use
3. Assess training-data provenance, consent and licensing considerations
4. Design data quality, lineage and access controls for AI pipelines
5. Apply privacy-enhancing techniques and know their limits
6. Plan data-subject rights handling where AI systems are involved

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Data governance foundations for AI (25% (Mastemy design weight), design weight)

- Worked applications: (1) Classify datasets and assign ownership for an AI pipeline; (2) Decide whether a dataset may be reused to train a new model
- Common misconception addressed: Assuming data governance is only a storage/IT concern
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why data governance drives AI trustworthiness | 120 | 7 |
| M01L02 | Roles, ownership and data classification | 120 | 7 |

### M02 Privacy principles applied to AI (25% (Mastemy design weight), design weight)

- Worked applications: (1) Pick a lawful basis for a model's training data use; (2) Apply data minimisation to a feature list
- Common misconception addressed: Collecting everything 'just in case' for future models
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Purpose limitation, minimisation and lawful basis | 120 | 7 |
| M02L02 | Secondary use and repurposing of data for training | 120 | 7 |

### M03 Provenance, quality and lineage (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace lineage for a feature back to its source and consent; (2) Set access controls so training data is not over-shared
- Common misconception addressed: Treating scraped web data as automatically free to train on
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Training-data provenance, consent and licensing | 120 | 7 |
| M03L02 | Data quality, lineage and access control | 120 | 7 |

### M04 Privacy techniques and rights (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose between pseudonymisation and anonymisation for a case; (2) Design a flow to honour a deletion request affecting a model
- Common misconception addressed: Believing hashing identifiers makes data fully anonymous
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Anonymisation, pseudonymisation and their limits | 120 | 7 |
| M04L02 | Handling data-subject rights with AI in the loop | 120 | 7 |

## Integrative case

An ad-tech firm wants to train a new targeting model on existing customer data: establish data governance, pick a lawful basis, check provenance and consent, apply minimisation, and design access controls and a deletion-request flow that reaches the model.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1886-final-protected | 40 | 40 | yes |
| MST-1886-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data governance foundations for AI | 10 |
| Privacy principles applied to AI | 10 |
| Provenance, quality and lineage | 10 |
| Privacy techniques and rights | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1886-Q0001** (single-answer, Select ONE) A team wants to reuse customer-support transcripts (collected to answer tickets) to train a new product model. What principle does this most directly challenge?

- A. Purpose limitation: data collected for one purpose should not be freely repurposed without a basis **(key)**  
  _Rationale:_ Correct: repurposing engages purpose limitation.
- B. Data portability  
  _Rationale:_ Portability concerns moving data, not reuse for training.
- C. Network security  
  _Rationale:_ The issue is purpose, not security.
- D. Model accuracy  
  _Rationale:_ The challenge is a privacy principle, not accuracy.

**MST-1886-Q0002** (multiple-answer, Select TWO) Which TWO statements about anonymisation for AI training data are correct? (Select TWO.)

- A. Re-identification can sometimes occur by combining an 'anonymised' dataset with other data **(key)**  
  _Rationale:_ Correct: linkage attacks are a known limit of anonymisation.
- B. Pseudonymised data can often still be linked back and is not the same as anonymised **(key)**  
  _Rationale:_ Correct: pseudonymisation is reversible and still personal data in many regimes.
- C. Hashing email addresses always makes data fully anonymous  
  _Rationale:_ Hashing is pseudonymisation, often reversible via guessing.
- D. Anonymised data needs no further governance ever  
  _Rationale:_ Residual re-identification risk still warrants governance.

**MST-1886-Q0003** (single-answer, Select ONE) A user exercises a deletion right over data that was used to train a deployed model. What is the governance-aware response?

- A. Delete the source records and assess and document the effect on the model, following the defined process **(key)**  
  _Rationale:_ Correct: rights handling must consider downstream model use, not just the database row.
- B. Only delete the database row and ignore the model  
  _Rationale:_ Ignoring the model's use of the data is incomplete.
- C. Refuse because the model already learned from it  
  _Rationale:_ The request cannot simply be refused by default.
- D. Retrain on everything with no record  
  _Rationale:_ Undocumented action is not governance-aware.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
