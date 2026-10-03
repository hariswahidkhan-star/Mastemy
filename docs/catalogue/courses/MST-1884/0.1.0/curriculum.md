# AI Risk Assessment and Impact Assessment Methods

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1884` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI Risk Assessment and Impact Assessment Methods (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish risk assessment from impact assessment and know when each is used
2. Scope an assessment: define the system, context, stakeholders and boundaries
3. Identify and categorise AI harms to individuals, groups and society
4. Estimate likelihood and severity and prioritise risks defensibly
5. Design mitigations and determine acceptable residual risk with sign-off
6. Document an assessment so it is auditable and repeatable

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Assessment types and scoping (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide whether a use case needs an impact assessment and why; (2) Write a scoping statement for a benefits-eligibility model
- Common misconception addressed: Starting an assessment without defining the system boundary
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Risk vs impact assessment and their triggers | 120 | 7 |
| M01L02 | Scoping the system, context and stakeholders | 120 | 7 |

### M02 Harm identification (25% (Mastemy design weight), design weight)

- Worked applications: (1) Run a structured harm-identification workshop for a chatbot; (2) Build stakeholder personas to surface group-specific harms
- Common misconception addressed: Only considering the primary user and ignoring affected non-users
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Taxonomies of AI harm | 120 | 7 |
| M02L02 | Techniques to surface harms (workshops, red-flags, personas) | 120 | 7 |

### M03 Analysis and prioritisation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Score three risks on a likelihood/severity matrix and defend it; (2) Compare two risks that score equally and break the tie
- Common misconception addressed: Treating a colour on a heat map as an objective fact
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Estimating likelihood and severity | 120 | 7 |
| M03L02 | Prioritising and comparing risks | 120 | 7 |

### M04 Mitigation, residual risk and documentation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Design mitigations and state the acceptable residual risk; (2) Write an auditable assessment record for a sign-off meeting
- Common misconception addressed: Accepting residual risk informally with no named owner
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Designing mitigations and oversight | 120 | 7 |
| M04L02 | Residual-risk acceptance and auditable records | 120 | 7 |

## Integrative case

A government agency plans an AI tool to prioritise benefit-fraud reviews: decide the assessment type, scope it, identify harms to claimants and groups, prioritise risks, design mitigations and oversight, and document an auditable residual-risk decision.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1884-final-protected | 40 | 40 | yes |
| MST-1884-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Assessment types and scoping | 10 |
| Harm identification | 10 |
| Analysis and prioritisation | 10 |
| Mitigation, residual risk and documentation | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1884-Q0001** (single-answer, Select ONE) Why can an AI risk assessment be inadequate without a separate impact assessment for a public-sector decision tool?

- A. Risk assessment often centres on the organisation's risk, while impact assessment centres on harms to affected people and groups **(key)**  
  _Rationale:_ Correct: impact assessment foregrounds effects on individuals and society.
- B. They are identical, so one is redundant  
  _Rationale:_ They have different focuses and are not interchangeable.
- C. Impact assessments are only for cybersecurity  
  _Rationale:_ Impact assessment covers harms broadly, not only security.
- D. Risk assessment is only for hardware  
  _Rationale:_ Risk assessment applies to AI systems generally.

**MST-1884-Q0002** (multiple-answer, Select TWO) Which TWO inputs most improve the quality of an AI harm identification? (Select TWO.)

- A. Input from people representative of the affected groups **(key)**  
  _Rationale:_ Correct: affected-group perspectives surface harms designers miss.
- B. A structured taxonomy of known AI harms to prompt the team **(key)**  
  _Rationale:_ Correct: a taxonomy helps surface categories that would be overlooked.
- C. Only the engineering team's intuition  
  _Rationale:_ A single-perspective team misses many harms.
- D. The model's own self-reported confidence  
  _Rationale:_ Self-reported confidence does not identify harms.

**MST-1884-Q0003** (single-answer, Select ONE) Two risks both score 'high'. What is the best way to prioritise between them?

- A. Examine severity, reversibility and who is affected, and record the rationale **(key)**  
  _Rationale:_ Correct: structured tie-breaking on severity and affected parties is defensible.
- B. Pick whichever is cheaper to fix  
  _Rationale:_ Cost alone is not a defensible harm priority.
- C. Address neither until a metric separates them  
  _Rationale:_ Judgement with documented rationale is expected.
- D. Let the heat-map colour decide  
  _Rationale:_ The colour is the output, not a tie-breaker.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
