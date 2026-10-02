# ISACA CISA: Certified Information Systems Auditor

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0094` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISACA (no affiliation or endorsement) |
| Exam code | CISA |
| Version basis | DESIGN ASSUMPTION - official ISACA CISA job-practice domain weights not retrieved (issuer site egress-blocked 2026-10-02); confirm on the ISACA website. |
| Evidence | **unverified-needs-official-check** - official study guide not retrieved (egress-blocked); weights/objectives are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-CYB-ISACA-CISA-001 |
| Planned time | T = 4800 min; instruction I = 3840 min (80%); assessment A = 960 min (20%) |
| Assessment split | lesson checks 240 / module checks 336 / cumulative 384 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan and perform a risk-based IS audit
2. Evaluate IT governance and management
3. Assess information systems acquisition, development and implementation
4. Evaluate IS operations, resilience and protection of information assets

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Information Systems Auditing Process (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Build a risk-based IS audit plan; (2) Select evidence-gathering and sampling techniques
- Common misconception addressed: Testing controls without first assessing risk
- Module check: 50 items / 68 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Planning and execution of IS audits | 768 | 6 |

### M02 Governance and Management of IT (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Evaluate an IT strategy/governance scenario; (2) Assess IT risk and policy management
- Common misconception addressed: Confusing IT governance with day-to-day IT management
- Module check: 50 items / 67 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IT governance and management frameworks | 768 | 6 |

### M03 IS Acquisition, Development and Implementation (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Assess controls across an SDLC phase; (2) Evaluate a change/release management case
- Common misconception addressed: Assuming UAT sign-off replaces independent control testing
- Module check: 50 items / 67 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SDLC, project and change controls | 768 | 6 |

### M04 IS Operations and Business Resilience (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Evaluate incident and problem management; (2) Test a BCP/DR arrangement against RTO/RPO
- Common misconception addressed: Treating a documented BCP as a tested one
- Module check: 50 items / 67 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Operations, BCP and DR | 768 | 6 |

### M05 Protection of Information Assets (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Assess identity and access management; (2) Evaluate network and data-protection controls
- Common misconception addressed: Equating encryption at rest with full data protection
- Module check: 50 items / 67 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Security controls and data protection | 768 | 6 |

## Integrative case

Audit a bank core-system upgrade: plan the engagement, review IT governance, assess the SDLC and change controls, and test operations resilience and information-asset protection.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0094-practice-form-A | 90 | 90 | yes |
| MST-0094-practice-form-B | 90 | 90 | no (optional practice) |
| MST-0094-practice-form-C | 90 | 90 | no (optional practice) |
| MST-0094-final-protected | 90 | 90 | yes |

| Domain | Items per form |
|---|---|
| Information Systems Auditing Process | 18 |
| Governance and Management of IT | 18 |
| IS Acquisition, Development and Implementation | 18 |
| IS Operations and Business Resilience | 18 |
| Protection of Information Assets | 18 |

Minimum reviewed item bank: 920 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0094-Q0001** (single-answer, Select ONE) An IS auditor begins an engagement by deciding which controls to test. What should drive that decision first?

- A. A risk assessment of the area under audit **(key)**  
  _Rationale:_ Correct: a risk-based IS audit plans testing according to assessed risk.
- B. The order controls appear in the system manual  
  _Rationale:_ Manual order does not reflect risk.
- C. Alphabetical order of control names  
  _Rationale:_ Arbitrary ordering ignores risk.
- D. Whichever controls are easiest to test  
  _Rationale:_ Convenience is not a basis for a risk-based audit.

**MST-0094-Q0002** (single-answer, Select ONE) Which best distinguishes IT governance from IT management?

- A. Governance sets direction and oversight; management executes day-to-day **(key)**  
  _Rationale:_ Correct: governance directs/oversees while management runs operations.
- B. They are identical functions  
  _Rationale:_ They are distinct, not identical.
- C. Management sets strategy and governance writes code  
  _Rationale:_ This reverses and misstates the roles.
- D. Governance is only about buying hardware  
  _Rationale:_ Governance is broader than procurement.

**MST-0094-Q0003** (multiple-answer, Select TWO) Which TWO controls most directly protect the confidentiality of information assets? (Select TWO)

- A. Encryption of data in transit and at rest **(key)**  
  _Rationale:_ Correct: encryption protects confidentiality.
- B. Role-based access control on sensitive data **(key)**  
  _Rationale:_ Correct: least-privilege access protects confidentiality.
- C. Increasing the monitor brightness  
  _Rationale:_ Irrelevant to confidentiality controls.
- D. Scheduling more status meetings  
  _Rationale:_ Meetings are not a confidentiality control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
