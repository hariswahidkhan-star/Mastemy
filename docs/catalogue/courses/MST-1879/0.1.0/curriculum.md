# Responsible AI Foundations: Principles, Risks and Controls

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1879` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Responsible AI Foundations: Principles, Risks and Controls (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the core responsible-AI principles (fairness, reliability and safety, privacy and security, inclusiveness, transparency, accountability) and why each matters
2. Identify categories of AI risk across a system's lifecycle and map them to affected stakeholders
3. Select proportionate technical and organisational controls for a given AI use case and risk level
4. Distinguish governance, assurance and compliance activities and where each applies
5. Apply a structured responsible-AI review to a proposed AI feature
6. Communicate residual risk and limitations honestly to decision-makers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Responsible-AI principles and motivation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Classify five AI uses by potential harm and affected groups; (2) Map a chatbot's failure modes to principles it would breach
- Common misconception addressed: Believing a model with high accuracy is automatically responsible
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why responsible AI: harms, incidents and stakeholder trust | 120 | 7 |
| M01L02 | The core principles and how they trade off | 120 | 7 |

### M02 AI risk across the lifecycle (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a lifecycle risk register for a hiring-screening model; (2) Rank three risks by likelihood and impact and justify the order
- Common misconception addressed: Treating a one-off risk assessment as sufficient for a changing system
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Risk categories: data, model, deployment, misuse and societal | 120 | 7 |
| M02L02 | Mapping risks to stakeholders and severity | 120 | 7 |

### M03 Controls and mitigations (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose human-in-the-loop vs human-on-the-loop for two scenarios; (2) Specify monitoring signals that would reveal drift or harm
- Common misconception addressed: Assuming a disclaimer removes accountability for an automated decision
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Technical controls: testing, monitoring, human oversight, guardrails | 120 | 7 |
| M03L02 | Organisational controls: policy, roles, documentation, training | 120 | 7 |

### M04 Operating responsible AI (25% (Mastemy design weight), design weight)

- Worked applications: (1) Design a responsible-AI review gate for a feature launch; (2) Write a residual-risk statement for a go/no-go meeting
- Common misconception addressed: Reporting only benefits and omitting known limitations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Review gates and sign-off in the delivery lifecycle | 120 | 7 |
| M04L02 | Measuring and reporting residual risk | 120 | 7 |

## Integrative case

A mid-size insurer plans an AI assistant that drafts claim-decision letters: identify the risks to claimants and the business, choose controls and oversight, run a responsible-AI review, and present residual risk for a launch decision.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1879-final-protected | 40 | 40 | yes |
| MST-1879-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Responsible-AI principles and motivation | 10 |
| AI risk across the lifecycle | 10 |
| Controls and mitigations | 10 |
| Operating responsible AI | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1879-Q0001** (single-answer, Select ONE) A team reports their claims model is '94% accurate' and concludes it is responsible to deploy. Why is that conclusion unsound?

- A. Accuracy says nothing about who the errors fall on, or about privacy, transparency and oversight **(key)**  
  _Rationale:_ Correct: responsible AI spans fairness, privacy, transparency and accountability, not a single accuracy number.
- B. Because 94% is too low for any deployment  
  _Rationale:_ There is no universal accuracy threshold; the issue is the other principles are unexamined.
- C. Because accuracy cannot be measured for text models  
  _Rationale:_ Accuracy can be measured; the point is it is insufficient.
- D. Because responsible AI forbids automated decisions  
  _Rationale:_ Responsible AI permits automation with appropriate controls.

**MST-1879-Q0002** (multiple-answer, Select TWO) Which TWO are organisational (rather than technical) controls for responsible AI? (Select TWO.)

- A. A documented accountability owner for each deployed model **(key)**  
  _Rationale:_ Correct: assigning accountability is an organisational control.
- B. An approval policy with a responsible-AI review gate before launch **(key)**  
  _Rationale:_ Correct: policy and review gates are organisational controls.
- C. A guardrail classifier that blocks unsafe generations  
  _Rationale:_ That is a technical control.
- D. Automated drift monitoring on input distributions  
  _Rationale:_ That is a technical control.

**MST-1879-Q0003** (single-answer, Select ONE) A product manager wants to add 'the AI is always right' to the UI to build trust. What is the responsible-AI problem?

- A. It misrepresents reliability and discourages the user oversight the system depends on **(key)**  
  _Rationale:_ Correct: transparency requires honest communication of limitations.
- B. Nothing, confident messaging improves adoption  
  _Rationale:_ Overstating reliability undermines oversight and transparency.
- C. It violates copyright  
  _Rationale:_ The issue is transparency, not copyright.
- D. It only matters if the model is open source  
  _Rationale:_ It applies regardless of model provenance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
