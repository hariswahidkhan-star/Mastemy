# Systems Engineering Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2238` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Engineering standards, tool specifics and formulae must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Systems Engineering Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the systems engineering lifecycle and the V-model
2. Elicit, write and manage requirements and ensure traceability
3. Define system architecture and allocate functions to components
4. Plan verification and validation activities across the lifecycle
5. Manage interfaces, configuration and change across a system
6. Apply risk management and trade studies to system decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Lifecycle and process (25% (Mastemy design weight), design weight)

- Worked applications: (1) Place four activities on the correct arm of the V-model; (2) Draft a concept of operations from stakeholder needs
- Common misconception addressed: Confusing verification ('built it right') with validation ('built the right thing')
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The systems engineering lifecycle and the V-model | 120 | 7 |
| M01L02 | Stakeholders, needs and concept of operations | 120 | 7 |

### M02 Requirements and architecture (25% (Mastemy design weight), design weight)

- Worked applications: (1) Write a traceable requirement and link it to a need; (2) Allocate a function to the right subsystem
- Common misconception addressed: Writing requirements with no link to a stakeholder need
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Eliciting and writing requirements with traceability | 120 | 7 |
| M02L02 | Functional analysis and architecture allocation | 120 | 7 |

### M03 Verification and integration (25% (Mastemy design weight), design weight)

- Worked applications: (1) Match each requirement to a verification method; (2) Define an interface and the agreement that controls it
- Common misconception addressed: Integrating subsystems before their interfaces are agreed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Verification and validation planning | 120 | 7 |
| M03L02 | Integration, interfaces and configuration management | 120 | 7 |

### M04 Risk and decisions (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a simple risk register with likelihood and impact; (2) Run a weighted trade study between two architectures
- Common misconception addressed: Making a major decision without comparing alternatives
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Risk management across the lifecycle | 120 | 7 |
| M04L02 | Trade studies and decision analysis | 120 | 7 |

## Integrative case

A team develops a weather-balloon payload: capture stakeholder needs and a ConOps, write traceable requirements, define subsystem interfaces, plan verification, and run a trade study on the power source.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2238-final-protected | 40 | 40 | yes |
| MST-2238-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Lifecycle and process | 10 |
| Requirements and architecture | 10 |
| Verification and integration | 10 |
| Risk and decisions | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2238-Q0001** (single-answer, Select ONE) In the V-model, what is the relationship between the left and right arms?

- A. Each definition activity on the left has a matching verification/validation activity on the right **(key)**  
  _Rationale:_ Correct: the V pairs decomposition with the test that confirms it.
- B. The two arms are unrelated phases  
  _Rationale:_ The arms are deliberately linked by level.
- C. The right arm happens before the left  
  _Rationale:_ Definition precedes the matching verification.
- D. Only the left arm matters  
  _Rationale:_ Verification and validation on the right are essential.

**MST-2238-Q0002** (multiple-answer, Select TWO) Which TWO characteristics describe a good system requirement? (Select TWO.)

- A. It is verifiable **(key)**  
  _Rationale:_ Correct: you must be able to confirm it is met.
- B. It is traceable to a stakeholder need **(key)**  
  _Rationale:_ Correct: traceability shows why the requirement exists.
- C. It describes the detailed circuit design  
  _Rationale:_ That is design detail, not a system requirement.
- D. It is written so loosely it cannot be tested  
  _Rationale:_ Untestable requirements are a defect, not a feature.

**MST-2238-Q0003** (single-answer, Select ONE) A subsystem passes all its tests but the assembled system fails to meet the users' actual need. What has most likely gone wrong?

- A. Verification succeeded but validation revealed the wrong thing was built **(key)**  
  _Rationale:_ Correct: passing component tests is verification; meeting the real need is validation.
- B. The requirements were perfect and nothing is wrong  
  _Rationale:_ A failed user need signals a validation gap.
- C. The problem is purely cosmetic  
  _Rationale:_ Missing the user's need is a substantive failure.
- D. No further action is required  
  _Rationale:_ A validation failure demands rework and re-examination of needs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
