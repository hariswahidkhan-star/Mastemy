# Responsible AI Governance and Model Documentation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0470` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-RAP-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the goals and components of responsible AI governance
2. Identify AI risks across fairness, safety, privacy and transparency
3. Produce model documentation such as model cards and datasheets
4. Map governance to regulations and internal policy
5. Operationalise oversight across an AI model's lifecycle

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations of AI governance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map an AI incident to the principle it violated; (2) Place a governance activity on the model lifecycle
- Common misconception addressed: Treating governance as a one-time compliance checkbox
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why governance: harms, trust and accountability | 96 | 8 |
| M01L02 | The principles and frameworks landscape | 96 | 8 |

### M02 Identifying AI risks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify the fairness risk in a hiring model; (2) Classify the risks of a generative chatbot
- Common misconception addressed: Assuming a technically accurate model is automatically fair
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Fairness and bias risks | 96 | 8 |
| M02L02 | Safety, privacy and transparency risks | 96 | 8 |

### M03 Documenting models and data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft a model-card section for a credit model; (2) Write an intended-use and out-of-scope statement
- Common misconception addressed: Documenting only performance and omitting limitations and intended use
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Model cards | 96 | 8 |
| M03L02 | Datasheets and intended-use statements | 96 | 8 |

### M04 Regulation and policy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify a use case under a risk-based regime; (2) Map one requirement to a concrete control
- Common misconception addressed: Assuming voluntary principles satisfy legal obligations
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The regulatory landscape and risk-based regimes | 96 | 8 |
| M04L02 | Mapping requirements to internal policy and controls | 96 | 8 |

### M05 Operationalising oversight (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define review gates across a model lifecycle; (2) Design a model-inventory entry and incident process
- Common misconception addressed: Leaving governance to one team instead of embedding it in the lifecycle
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Roles, review gates and audit trails | 96 | 8 |
| M05L02 | Monitoring, incident response and model inventory | 96 | 8 |

## Integrative case

An insurer is deploying an AI claims-triage model. Identify the fairness, privacy and transparency risks, produce a model card and intended-use statement, map the use case to a risk-based regulation, and define lifecycle review gates for an AI governance board.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0470-final-protected | 25 | 25 | yes |
| MST-0470-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of AI governance | 5 |
| Identifying AI risks | 5 |
| Documenting models and data | 5 |
| Regulation and policy | 5 |
| Operationalising oversight | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0470-Q0001** (single-answer, Select ONE) A model card primarily documents…

- A. A model's intended use, performance and limitations **(key)**  
  _Rationale:_ Correct: model cards communicate intended use, performance and limits.
- B. Only its headline accuracy  
  _Rationale:_ A card covers far more than one number.
- C. The source-code license  
  _Rationale:_ That is not the purpose of a model card.
- D. The monthly server cost  
  _Rationale:_ Cost is not a model-card concern.

**MST-0470-Q0002** (multiple-answer, Select TWO) Which TWO are responsible-AI governance activities? (Select TWO.)

- A. Documenting intended use and limitations **(key)**  
  _Rationale:_ Correct: documentation is a core governance activity.
- B. Monitoring deployed models for fairness drift **(key)**  
  _Rationale:_ Correct: ongoing monitoring is part of lifecycle oversight.
- C. Deleting all logs to save storage  
  _Rationale:_ This destroys the audit trail governance needs.
- D. Hiding the model from auditors  
  _Rationale:_ Concealment is the opposite of governance.

**MST-0470-Q0003** (single-answer, Select ONE) A model is accurate overall but much worse for one subgroup. This is primarily a…

- A. Fairness and bias risk **(key)**  
  _Rationale:_ Correct: unequal performance across groups is a fairness risk.
- B. Latency problem  
  _Rationale:_ Speed is unrelated to subgroup accuracy.
- C. Licensing issue  
  _Rationale:_ Licensing is unrelated.
- D. Storage issue  
  _Rationale:_ Storage is unrelated.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
