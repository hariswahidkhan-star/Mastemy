# EU AI Act Overview for Practitioners

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1367` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope and purpose
2. Risk-based tiers
3. Obligations for high-risk AI
4. Compliance and limits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Scope and purpose (MASTEMY-DESIGN 25%)

- Worked applications: (1) Decide if a system is in scope; (2) Identify provider vs deployer duties
- Common misconception addressed: Assuming the Act applies only to EU-based companies
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What the EU AI Act covers | 72 | 6 |
| M01L02 | Who it applies to: providers and deployers | 72 | 6 |

### M02 Risk-based tiers (MASTEMY-DESIGN 25%)

- Worked applications: (1) Classify a system by risk tier; (2) List duties for a high-risk system
- Common misconception addressed: Treating every AI system as equally regulated regardless of risk
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prohibited and high-risk systems | 72 | 6 |
| M02L02 | Limited and minimal risk, transparency duties | 72 | 6 |

### M03 Obligations for high-risk AI (MASTEMY-DESIGN 25%)

- Worked applications: (1) Outline high-risk obligations; (2) Design human-oversight for a use case
- Common misconception addressed: Believing a disclaimer alone satisfies high-risk obligations
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Risk management, data and documentation | 72 | 6 |
| M03L02 | Human oversight and logging | 72 | 6 |

### M04 Compliance and limits (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a compliance checklist; (2) State the limits of this overview
- Common misconception addressed: Mistaking a practitioner overview for qualified legal advice
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Timelines, enforcement and penalties | 72 | 6 |
| M04L02 | What this overview is not: legal advice | 72 | 6 |

## Integrative case

A product team ships an AI CV-screening tool into the EU market. Determine scope and role, classify the risk tier, outline the high-risk obligations including human oversight and documentation, and note where qualified legal advice is required.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1367-final-protected | 20 | 20 | yes |
| MST-1367-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scope and purpose | 5 |
| Risk-based tiers | 5 |
| Obligations for high-risk AI | 5 |
| Compliance and limits | 5 |

Minimum reviewed item bank: 232 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1367-Q0001** (single-answer, Select ONE) Under the EU AI Act, a CV-screening tool used for hiring is generally treated as:

- A. A high-risk AI system with specific obligations **(key)**  
  _Rationale:_ Correct: employment-related screening is in the high-risk category.
- B. Prohibited in all cases  
  _Rationale:_ It is high-risk and regulated, not outright banned.
- C. Minimal risk with no duties  
  _Rationale:_ Hiring use is not minimal risk.
- D. Out of scope because it uses a spreadsheet  
  _Rationale:_ Tooling format does not remove it from scope.

**MST-1367-Q0002** (multiple-answer, Select TWO) Which TWO obligations typically apply to high-risk AI systems? (Select TWO.)

- A. Human oversight of the system's use **(key)**  
  _Rationale:_ Correct: high-risk systems require meaningful human oversight.
- B. Technical documentation and record-keeping/logging **(key)**  
  _Rationale:_ Correct: documentation and logs are required.
- C. A guarantee of 100% accuracy  
  _Rationale:_ No such guarantee is required or possible.
- D. Permanent exemption from any audit  
  _Rationale:_ The opposite: high-risk systems face scrutiny.

**MST-1367-Q0003** (single-answer, Select ONE) Why does the Act's extraterritorial reach matter to a US-only company?

- A. It can apply when the system's output is used in the EU market **(key)**  
  _Rationale:_ Correct: placing a system or its output on the EU market brings it in scope.
- B. It never applies outside the EU  
  _Rationale:_ It can apply based on EU market use.
- C. It only applies to hardware  
  _Rationale:_ It applies to AI systems broadly.
- D. It applies only to open-source code  
  _Rationale:_ Scope is not limited to open source.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
