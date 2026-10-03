# AI in Clinical Decision Support (Educational Foundations)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2137` v0.1.0 | Batch wave17-cat41 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design specification (general medical education; no official issuer syllabus); content versioned by verification date |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI in Clinical Decision Support (Educational Foundations) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define clinical decision support (CDS) and its goals as an educational concept
2. Describe rule-based and model-based CDS approaches and alerts
3. Explain how CDS integrates with clinical workflow and electronic records
4. Explain why CDS augments and does not replace clinician judgement, requiring confirmation
5. Identify risks such as alert fatigue, automation bias and inequity
6. Summarise evaluation, governance and safety principles for CDS systems

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 CDS foundations (25% (design weight), design weight)

- Worked applications: (1) Classify a CDS example as rule-based or model-based; (2) Match a CDS goal to the right-information concept
- Common misconception addressed: Thinking CDS makes the decision instead of supporting it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What clinical decision support is | 80 | 5 |
| M01L02 | Rule-based vs model-based CDS | 80 | 5 |
| M01L03 | Alerts, reminders and order sets concepts | 80 | 5 |

### M02 Workflow integration (25% (design weight), design weight)

- Worked applications: (1) Place a CDS prompt at the right workflow moment; (2) Apply the 'five rights' idea to a scenario
- Common misconception addressed: Assuming more alerts always improve safety
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | CDS within the electronic record | 80 | 5 |
| M02L02 | Timing, context and the five rights of CDS | 80 | 5 |
| M02L03 | Human factors and usability | 80 | 5 |

### M03 Risks and pitfalls (25% (design weight), design weight)

- Worked applications: (1) Spot alert fatigue in a described system; (2) Recognise automation bias in a scenario
- Common misconception addressed: Believing clinicians always override wrong suggestions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Alert fatigue and over-alerting | 80 | 5 |
| M03L02 | Automation bias and over-reliance | 80 | 5 |
| M03L03 | Equity and access considerations | 80 | 5 |

### M04 Governance and evaluation (25% (design weight), design weight)

- Worked applications: (1) Choose an appropriate outcome measure for a CDS tool; (2) Explain why a clinician must confirm CDS output
- Common misconception addressed: Treating a CDS recommendation as an order that needs no review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Measuring CDS impact | 80 | 5 |
| M04L02 | Safety monitoring and change control | 80 | 5 |
| M04L03 | Accountability and clinician confirmation | 80 | 5 |

## Integrative case

A clinical-informatics student reviews, as an educational case, a decision-support alert that fires too often; they explain how alert fatigue and automation bias arise, propose how to measure the tool's impact, and state that final decisions remain with the confirming clinician.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - general medical-education course; no official exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2137-final-protected | 40 | 40 | yes |
| MST-2137-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| CDS foundations | 10 |
| Workflow integration | 10 |
| Risks and pitfalls | 10 |
| Governance and evaluation | 10 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2137-Q0001** (single-answer, Select ONE) Clinical decision support is best described as a tool that:

- A. Provides timely information to support, not replace, clinician decisions **(key)**  
  _Rationale:_ Correct: CDS augments clinician judgement with relevant information.
- B. Automatically issues treatment without clinician involvement  
  _Rationale:_ CDS supports clinicians; it does not act autonomously in patient care.
- C. Replaces the electronic health record entirely  
  _Rationale:_ CDS works with, not instead of, the record.
- D. Guarantees error-free decisions  
  _Rationale:_ No tool guarantees error-free decisions.

**MST-2137-Q0002** (multiple-answer, Select TWO) Which TWO risks are commonly associated with poorly designed clinical decision support? (Select TWO.)

- A. Alert fatigue from too many low-value alerts **(key)**  
  _Rationale:_ Correct: excessive alerts lead clinicians to ignore them.
- B. Automation bias where users over-trust the suggestion **(key)**  
  _Rationale:_ Correct: over-reliance on automated advice is a recognised risk.
- C. Guaranteed elimination of all diagnostic error  
  _Rationale:_ CDS does not eliminate error; it is itself a source of risk if misused.
- D. Making clinician confirmation unnecessary  
  _Rationale:_ Confirmation remains necessary regardless of CDS quality.
- E. Removing the need to monitor outcomes  
  _Rationale:_ Ongoing safety monitoring is still required.

**MST-2137-Q0003** (single-answer, Select ONE) The 'five rights' of clinical decision support emphasise delivering the right information to the right person in the right format through the right channel at the right:

- A. Time in the workflow **(key)**  
  _Rationale:_ Correct: timing within the workflow is the fifth 'right'.
- B. Font size  
  _Rationale:_ Font size is not one of the five rights.
- C. Billing code  
  _Rationale:_ Billing is unrelated to the five rights of CDS.
- D. Server location  
  _Rationale:_ Server location is not part of the five rights.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
