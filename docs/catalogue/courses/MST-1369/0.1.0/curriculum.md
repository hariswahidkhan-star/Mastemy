# AI Auditing Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1369` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Audit foundations
2. Planning and evidence
3. Testing and findings
4. Reporting and follow-up

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Audit foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Scope an AI audit; (2) Choose an assurance level
- Common misconception addressed: Confusing a one-off technical test with an audit
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What an AI audit is and is not | 72 | 6 |
| M01L02 | Internal vs external and assurance levels | 72 | 6 |

### M02 Planning and evidence (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define audit criteria for a model; (2) Assemble an evidence pack
- Common misconception addressed: Auditing against vague criteria that cannot be tested
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Audit criteria and scope | 72 | 6 |
| M02L02 | Gathering evidence and documentation | 72 | 6 |

### M03 Testing and findings (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design a fairness test plan; (2) Rate and write up a finding
- Common misconception addressed: Reporting raw metrics without linking them to criteria and risk
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Testing fairness, robustness and controls | 72 | 6 |
| M03L02 | Writing findings and severity | 72 | 6 |

### M04 Reporting and follow-up (MASTEMY-DESIGN 25%)

- Worked applications: (1) Draft an audit report structure; (2) Track remediation to closure
- Common misconception addressed: Treating an audit report as a guarantee the system is risk-free
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reports, management responses and remediation | 72 | 6 |
| M04L02 | Independence and limitations | 72 | 6 |

## Integrative case

An internal auditor must assess a deployed credit model. Scope the audit and criteria, gather evidence, test fairness and controls, rate findings by severity, and report with management responses and tracked remediation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1369-final-protected | 20 | 20 | yes |
| MST-1369-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Audit foundations | 5 |
| Planning and evidence | 5 |
| Testing and findings | 5 |
| Reporting and follow-up | 5 |

Minimum reviewed item bank: 232 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1369-Q0001** (single-answer, Select ONE) Why must audit criteria be defined before testing begins?

- A. Findings are only meaningful when measured against agreed, testable criteria **(key)**  
  _Rationale:_ Correct: criteria give findings an objective reference point.
- B. Criteria slow the audit down needlessly  
  _Rationale:_ They are essential, not needless.
- C. Testing cannot happen with criteria  
  _Rationale:_ The opposite: criteria enable meaningful testing.
- D. Criteria guarantee a clean report  
  _Rationale:_ They structure, not predetermine, the outcome.

**MST-1369-Q0002** (multiple-answer, Select TWO) Which TWO properties strengthen an AI audit's credibility? (Select TWO.)

- A. Independence of the auditor from the system's builders **(key)**  
  _Rationale:_ Correct: independence reduces conflict of interest.
- B. Traceable evidence linking findings to criteria **(key)**  
  _Rationale:_ Correct: evidence makes findings defensible.
- C. Omitting any limitations to look thorough  
  _Rationale:_ Hiding limitations undermines credibility.
- D. Rating every finding as critical  
  _Rationale:_ Inflated severity reduces usefulness.

**MST-1369-Q0003** (single-answer, Select ONE) What should an audit report NOT claim?

- A. That the audited system is free of all risk going forward **(key)**  
  _Rationale:_ Correct: audits give point-in-time assurance, not a risk-free guarantee.
- B. That findings are rated by severity  
  _Rationale:_ Reports should rate severity.
- C. That management has responded to findings  
  _Rationale:_ Responses are appropriate to include.
- D. That remediation will be tracked  
  _Rationale:_ Tracking remediation is good practice.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
