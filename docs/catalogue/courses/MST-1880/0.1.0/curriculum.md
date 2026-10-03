# NIST AI Risk Management Framework (AI RMF) in Practice

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1880` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Design assumption only: aligned to the named framework/standard from secondary knowledge; the official document was not retrieved this session (issuer site egress-blocked). No official weightings, learning objectives, codes or partnership are claimed. Design assumption references the publicly known Govern/Map/Measure/Manage structure of the NIST AI RMF; exact wording and any companion profiles must be confirmed against the official NIST publication at production. |
| Evidence | **unverified-needs-official-check** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — NIST AI Risk Management Framework (AI RMF) in Practice (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the purpose and audience of the NIST AI Risk Management Framework and its voluntary nature
2. Explain the four functions commonly associated with the framework (Govern, Map, Measure, Manage) at a working level
3. Apply a Map activity to establish context and identify risks for an AI use case
4. Select measurement approaches for identified AI risks and their limitations
5. Plan Manage activities that prioritise, respond to and monitor AI risks
6. Position the framework alongside an organisation's existing risk governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Framework purpose and trustworthiness characteristics (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draft a Govern RACI for an AI product team; (2) Run a Map workshop to list context, actors and risks for a credit model
- Common misconception addressed: Treating the framework as a certification you can pass or fail
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Purpose, scope and voluntary use of the framework | 120 | 7 |
| M01L02 | Characteristics of trustworthy AI as design goals | 120 | 7 |

### M02 Govern and Map (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose measurement methods for a fairness concern and note their limits; (2) Separate what can be measured from what must be judged
- Common misconception addressed: Assuming a single fairness metric settles a fairness question
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Govern: culture, roles, policies and accountability | 120 | 7 |
| M02L02 | Map: establishing context and identifying risks | 120 | 7 |

### M03 Measure (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a Manage plan that prioritises risks and assigns responses; (2) Define monitoring triggers that reopen the Map/Measure loop
- Common misconception addressed: Believing Manage is a one-time sign-off rather than continuous
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Selecting metrics and test methods for AI risks | 120 | 7 |
| M03L02 | Limits of measurement and documenting assumptions | 120 | 7 |

### M04 Manage and integration (25% (Mastemy design weight), design weight)

- Worked applications: (1) Place framework activities onto an existing risk-committee calendar; (2) Reconcile framework language with the firm's current risk taxonomy
- Common misconception addressed: Running the framework in parallel with, and disconnected from, enterprise risk
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Prioritising and responding to risks; monitoring | 120 | 7 |
| M04L02 | Integrating with enterprise risk management | 120 | 7 |

## Integrative case

A bank wants to adopt the NIST AI RMF for a new fraud-detection model: stand up governance, run Map to set context and risks, choose measurements with honest limits, and build a Manage and monitoring plan that fits the existing risk committee.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1880-final-protected | 40 | 40 | yes |
| MST-1880-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framework purpose and trustworthiness characteristics | 10 |
| Govern and Map | 10 |
| Measure | 10 |
| Manage and integration | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1880-Q0001** (single-answer, Select ONE) A manager says 'we passed the NIST AI RMF audit, so we are compliant.' What is the misunderstanding?

- A. The framework is a voluntary, outcome-oriented framework, not a pass/fail compliance certification **(key)**  
  _Rationale:_ Correct: it is designed for voluntary adoption and continuous risk management, not certification.
- B. The audit should have been annual  
  _Rationale:_ The deeper error is treating it as a certifiable compliance regime at all.
- C. Only government agencies may use it  
  _Rationale:_ It is intended for broad voluntary use.
- D. It replaces the firm's enterprise risk management  
  _Rationale:_ It is meant to integrate with existing risk management, not replace it.

**MST-1880-Q0002** (multiple-answer, Select TWO) Which TWO activities belong to the Map function (establishing context and identifying risks)? (Select TWO.)

- A. Documenting the intended purpose, users and deployment setting of the AI system **(key)**  
  _Rationale:_ Correct: establishing context is central to Map.
- B. Identifying who could be harmed and the plausible failure modes **(key)**  
  _Rationale:_ Correct: risk identification is a Map activity.
- C. Defining the organisation's AI accountability roles and policies  
  _Rationale:_ That is a Govern activity.
- D. Selecting and running test metrics on the model  
  _Rationale:_ That is a Measure activity.

**MST-1880-Q0003** (single-answer, Select ONE) Your team can measure latency and overall accuracy but cannot quantify a subtle dignity harm from automated rejections. What does the framework expect you to do?

- A. Document the limitation and manage the residual risk through judgement and oversight rather than ignore it **(key)**  
  _Rationale:_ Correct: the framework acknowledges not all risks are quantifiable and expects them to be documented and managed.
- B. Drop the risk because it cannot be measured  
  _Rationale:_ Unmeasurable does not mean unmanaged under the framework.
- C. Replace it with accuracy as a proxy  
  _Rationale:_ An unrelated proxy misrepresents the risk.
- D. Wait until a metric exists before deploying  
  _Rationale:_ The framework expects documented management of residual risk, not indefinite delay by default.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
