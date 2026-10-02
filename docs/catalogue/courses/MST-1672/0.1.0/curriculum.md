# Security Governance, Risk and Compliance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1672` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-SGRC-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Security Governance, Risk and Compliance (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain governance, risk and compliance and how they relate
2. Apply a risk-management process to information security
3. Map controls to policies, standards and frameworks
4. Describe compliance obligations and how they are evidenced
5. Communicate risk to support business decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 GRC foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify three activities as governance, risk or compliance; (2) Explain why compliance is not the same as security
- Common misconception addressed: Treating passing an audit as proof of being secure
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Governance, risk and compliance defined | 72 | 6 |
| M01L02 | How the three functions interact | 72 | 6 |

### M02 Risk management (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Score a risk by likelihood and impact; (2) Choose a treatment for a given risk and justify it
- Common misconception addressed: Believing every risk must be eliminated rather than managed
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Identifying and assessing risk | 72 | 6 |
| M02L02 | Treating risk: accept, mitigate, transfer, avoid | 72 | 6 |

### M03 Policies and controls (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a control to the policy it implements; (2) Classify controls as preventive, detective or corrective
- Common misconception addressed: Writing policies that are impossible to follow in practice
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Policies, standards and procedures | 72 | 6 |
| M03L02 | Control types and frameworks | 72 | 6 |

### M04 Compliance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Gather evidence for a sample control; (2) Explain why point-in-time compliance can mislead
- Common misconception addressed: Collecting evidence only in the week before an audit
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Obligations, audits and evidence | 72 | 6 |
| M04L02 | Continuous compliance vs point-in-time | 72 | 6 |

### M05 Risk communication (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Summarise a risk register for an executive; (2) Frame a risk decision as a business trade-off
- Common misconception addressed: Reporting risk in jargon that leaders cannot act on
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Risk registers and reporting | 72 | 6 |
| M05L02 | Talking about risk with leadership | 72 | 6 |

## Integrative case

A company has security policies that no one follows and an upcoming audit. Establish clear governance, run a risk assessment that ranks the real exposures, map existing controls to a recognised framework, and prepare evidence and a risk report leadership can act on.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1672-final-protected | 25 | 25 | yes |
| MST-1672-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GRC foundations | 5 |
| Risk management | 5 |
| Policies and controls | 5 |
| Compliance | 5 |
| Risk communication | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1672-Q0001** (single-answer, Select ONE) Which statement best captures the relationship between compliance and security?

- A. Compliance is a baseline; it does not by itself guarantee security **(key)**  
  _Rationale:_ Correct: meeting requirements is necessary but not sufficient for security.
- B. Compliance and security are identical  
  _Rationale:_ An organisation can be compliant yet still insecure.
- C. Security makes compliance unnecessary  
  _Rationale:_ Compliance obligations remain regardless of security maturity.
- D. Compliance always exceeds security needs  
  _Rationale:_ Compliance is often a floor, not a ceiling.

**MST-1672-Q0002** (multiple-answer, Select TWO) Which TWO are valid ways to treat an identified risk? (Select TWO.)

- A. Mitigate it by applying controls **(key)**  
  _Rationale:_ Correct: mitigation reduces likelihood or impact.
- B. Transfer it, for example through insurance **(key)**  
  _Rationale:_ Correct: transfer shifts financial impact to another party.
- C. Ignore it and hope it does not happen  
  _Rationale:_ Ignoring is not a managed treatment; acceptance must be deliberate and documented.
- D. Hide it from the risk register  
  _Rationale:_ Concealing risk prevents informed decisions.

**MST-1672-Q0003** (single-answer, Select ONE) Why can point-in-time compliance evidence be misleading?

- A. Controls may be met during the audit but neglected the rest of the year **(key)**  
  _Rationale:_ Correct: a snapshot does not prove controls operate continuously.
- B. Point-in-time evidence is always falsified  
  _Rationale:_ The issue is coverage over time, not inherent fraud.
- C. Auditors never look at evidence  
  _Rationale:_ Auditors do review evidence; the concern is its time coverage.
- D. Compliance has no relationship to controls  
  _Rationale:_ Compliance is evidenced precisely through controls.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
