# ISC2 CISSP-ISSEP Concentration Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1644` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISC2 (no affiliation or endorsement) |
| Exam code | ISSEP |
| Version basis | unresolved (unconfirmed) |
| Evidence | **unverified-needs-official-check** - official outline not fetched (egress blocked); no source IDs |
| Legacy IDs | MST-CYB-ISC2-ISSEP-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Demonstrate knowledge of the 'Systems Security Engineering Foundations' domain to the depth required for independent exam preparation
2. Demonstrate knowledge of the 'Risk Management' domain to the depth required for independent exam preparation
3. Demonstrate knowledge of the 'Security Planning and Design' domain to the depth required for independent exam preparation
4. Demonstrate knowledge of the 'Systems Implementation, Verification and Validation' domain to the depth required for independent exam preparation
5. Demonstrate knowledge of the 'Secure Operations, Change Management and Disposal' domain to the depth required for independent exam preparation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope (design-assumption) outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on, performance-based or other official item formats are not reproduced in this format.

> Domain structure below is a **design assumption** drafted from general knowledge of this credential. It was **not** verified against the issuer's official exam outline (egress blocked). Domain names, weights, question counts and durations must be confirmed before production.

## Modules

### M01 Systems Security Engineering Foundations (weight: design assumption - confirm against official outline)

- Worked applications: (1) Map security engineering activities to each phase of a systems development lifecycle; (2) Select applicable standards and frameworks for a government system procurement
- Common misconception addressed: Treating security engineering as a late-stage review rather than a lifecycle-wide discipline
- Module check: 34 items / 34 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Apply systems security engineering principles and frameworks | 128 | 6 |
| M01L02 | Integrate security into the systems engineering lifecycle | 128 | 6 |
| M01L03 | Apply security within processes and standards | 128 | 6 |

### M02 Risk Management (weight: design assumption - confirm against official outline)

- Worked applications: (1) Categorise a system and derive a control baseline with justified tailoring; (2) Build a risk assessment that ranks findings by likelihood and impact
- Common misconception addressed: Confusing risk acceptance authority with the engineer who recommends the control
- Module check: 34 items / 34 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Apply the risk management framework to a system | 128 | 6 |
| M02L02 | Categorise systems and perform impact analysis | 128 | 6 |
| M02L03 | Select, implement and assess security controls | 128 | 6 |

### M03 Security Planning and Design (weight: design assumption - confirm against official outline)

- Worked applications: (1) Derive verifiable security requirements from a mission need and a threat model; (2) Evaluate two architectures against cost, performance and security trade-offs
- Common misconception addressed: Writing security requirements that cannot be tested or verified
- Module check: 34 items / 34 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Develop system security requirements | 128 | 6 |
| M03L02 | Create security architecture and design | 128 | 6 |
| M03L03 | Perform trade-off and security design analysis | 128 | 6 |

### M04 Systems Implementation, Verification and Validation (weight: design assumption - confirm against official outline)

- Worked applications: (1) Build a verification plan that traces each security requirement to a test; (2) Assemble an authorisation package summarising residual risk for an approving official
- Common misconception addressed: Treating verification (built right) and validation (built the right thing) as the same activity
- Module check: 33 items / 33 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Integrate and implement secure system components | 128 | 6 |
| M04L02 | Plan and conduct verification and validation | 128 | 6 |
| M04L03 | Support certification, accreditation and authorisation | 128 | 6 |

### M05 Secure Operations, Change Management and Disposal (weight: design assumption - confirm against official outline)

- Worked applications: (1) Design a change-control workflow that re-assesses risk before approving a configuration change; (2) Write a media sanitisation and disposal plan matched to data sensitivity
- Common misconception addressed: Assuming reformatting a drive is sufficient sanitisation for highly sensitive data
- Module check: 33 items / 33 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Operate and maintain security of the system | 128 | 6 |
| M05L02 | Manage secure configuration and change | 128 | 6 |
| M05L03 | Perform secure decommissioning and disposal | 128 | 6 |

## Integrative case

A security engineer shepherds a new government system from concept to disposal: categorise it, derive testable requirements, design an architecture with justified trade-offs, plan verification and the authorisation package, and define secure operations, change control and end-of-life sanitisation.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam outline not fetched (egress blocked); question count, duration and domain weights are unconfirmed. Confirm on the issuer's official exam page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1644-practice-form-A | 64 | 64 | yes |
| MST-1644-practice-form-B | 64 | 64 | no (optional practice) |
| MST-1644-practice-form-C | 64 | 64 | no (optional practice) |
| MST-1644-final-protected | 64 | 64 | yes |

| Domain | Items per form |
|---|---|
| Systems Security Engineering Foundations | 13 |
| Risk Management | 13 |
| Security Planning and Design | 13 |
| Systems Implementation, Verification and Validation | 13 |
| Secure Operations, Change Management and Disposal | 12 |

Minimum reviewed item bank: 772 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1644-Q0001** (single-answer, Select ONE) In the risk management framework, which activity directly follows selecting a security control baseline for a categorised system?

- A. Implementing the selected controls **(key)**  
  _Rationale:_ Correct: after selection, controls are implemented before they are assessed.
- B. Disposing of the system  
  _Rationale:_ Disposal is the end of the lifecycle, not the step after selection.
- C. Writing the marketing plan  
  _Rationale:_ That is unrelated to the risk management framework.
- D. Deleting the system categorisation  
  _Rationale:_ Categorisation is retained; it drives the baseline.

**MST-1644-Q0002** (single-answer, Select ONE) What is the key difference between verification and validation of a secure system?

- A. Verification confirms it was built right; validation confirms the right thing was built **(key)**  
  _Rationale:_ Correct: verification checks against requirements; validation checks against mission need.
- B. They are identical activities with different names  
  _Rationale:_ They are distinct: one is against spec, the other against need.
- C. Verification happens only after disposal  
  _Rationale:_ Verification occurs during development, not after disposal.
- D. Validation ignores the requirements entirely  
  _Rationale:_ Validation still relates to stakeholder needs, not nothing.

**MST-1644-Q0003** (multiple-answer, Select TWO) Which TWO are appropriate when securely decommissioning a system holding sensitive data? (Select TWO.)

- A. Sanitise media to a level matched to data sensitivity **(key)**  
  _Rationale:_ Correct: sanitisation must match the sensitivity of the data.
- B. Update and close out the system authorisation and inventory records **(key)**  
  _Rationale:_ Correct: records and authorisation must be formally retired.
- C. Leave drives in place and reassign them without wiping  
  _Rationale:_ That risks data remanence exposure.
- D. Skip documentation to save time  
  _Rationale:_ Decommissioning must be documented for accountability.
- E. Publish the data publicly before disposal  
  _Rationale:_ That would be a serious confidentiality breach.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
