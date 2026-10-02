# ISACA CRISC: Certified in Risk and Information Systems Control

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0096` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISACA (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: CRISC (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official ISACA exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | MST-CYB-ISACA-CRISC-001 |
| Planned time | T = 4800 min; instruction I = 3840 min (80%); assessment A = 960 min (20%) |
| Assessment split | lesson checks 240 / module checks 336 / cumulative 384 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Establish IT risk governance aligned to enterprise objectives
2. Perform IT risk assessment and analysis
3. Design risk response, monitoring and reporting
4. Apply information technology and security controls to risk

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Governance (design assumption - weight not verified)

- Worked applications: (1) Map a business objective to its IT risk and owner; (2) Set a risk appetite statement and tolerance band
- Common misconception addressed: Confusing risk appetite with risk tolerance
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Organisational and risk governance | 480 | 6 |
| M01L02 | Risk appetite, tolerance and frameworks | 480 | 6 |

### M02 IT Risk Assessment (design assumption - weight not verified)

- Worked applications: (1) Build a risk scenario with threat, event and impact; (2) Rank risks on a likelihood/impact heat map
- Common misconception addressed: Treating a vulnerability as a risk in itself
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Risk identification and analysis | 480 | 6 |
| M02L02 | Risk scenarios and assessment techniques | 480 | 6 |

### M03 Risk Response and Reporting (design assumption - weight not verified)

- Worked applications: (1) Choose accept/mitigate/transfer/avoid for four risks; (2) Design a KRI with a threshold and trigger
- Common misconception addressed: Assuming transferring risk removes all accountability
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Risk response options and prioritisation | 480 | 6 |
| M03L02 | KRIs, KPIs and risk reporting | 480 | 6 |

### M04 Information Technology and Security (design assumption - weight not verified)

- Worked applications: (1) Map a control to the risk it treats and test its design; (2) Assess residual risk after a control is applied
- Common misconception addressed: Confusing a control's existence with its effectiveness
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Enterprise architecture and controls | 480 | 6 |
| M04L02 | Data, resilience and emerging technology risk | 480 | 6 |

## Integrative case

An enterprise adopts a new cloud platform; the candidate builds a risk register, aligns it to governance, selects responses within appetite, and defines KRIs for ongoing monitoring.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0096-practice-form-A | 144 | 144 | yes |
| MST-0096-practice-form-B | 144 | 144 | no (optional practice) |
| MST-0096-practice-form-C | 144 | 144 | no (optional practice) |
| MST-0096-final-protected | 144 | 144 | yes |

| Domain | Items (practice form A) |
|---|---|
| Governance | 36 |
| IT Risk Assessment | 36 |
| Risk Response and Reporting | 36 |
| Information Technology and Security | 36 |

Minimum reviewed item bank: 1344 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0096-Q0001** (single-answer, Select ONE) How do risk appetite and risk tolerance differ?

- A. Appetite is the broad level of risk an entity will accept; tolerance is the acceptable variation around a specific objective **(key)**  
  _Rationale:_ Correct: appetite is strategic and broad; tolerance is the acceptable deviation for a given objective.
- B. They are identical terms  
  _Rationale:_ They are related but distinct concepts.
- C. Tolerance is always higher than appetite  
  _Rationale:_ No fixed ordering applies.
- D. Appetite applies only to financial risk  
  _Rationale:_ Appetite spans all risk categories.

**MST-0096-Q0002** (single-answer, Select ONE) A newly discovered unpatched server is a:

- A. Risk  
  _Rationale:_ By itself it is not yet a risk; a risk needs a threat, event and impact.
- B. Vulnerability that could be exploited by a threat to create risk **(key)**  
  _Rationale:_ Correct: the unpatched server is a vulnerability, not a risk in itself.
- C. Control  
  _Rationale:_ It is a weakness, not a control.
- D. Key risk indicator  
  _Rationale:_ A KRI is a metric, not the server condition.

**MST-0096-Q0003** (multiple-answer, Select TWO) Select TWO valid risk responses for a risk that exceeds the organisation's appetite.

- A. Mitigate the risk by implementing additional controls **(key)**  
  _Rationale:_ Correct: mitigation reduces likelihood or impact.
- B. Ignore the risk because it is documented  
  _Rationale:_ Documenting is not a response.
- C. Transfer part of the risk via insurance or contract **(key)**  
  _Rationale:_ Correct: transfer shares the risk with a third party.
- D. Increase the risk deliberately  
  _Rationale:_ That is not a recognised response to an over-appetite risk.
- E. Delete the risk register entry  
  _Rationale:_ Removing the record does not treat the risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
