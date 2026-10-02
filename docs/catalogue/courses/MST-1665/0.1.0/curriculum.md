# Threat Intelligence

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1665` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-TI-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Threat Intelligence (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain threat intelligence and its strategic, operational and tactical levels
2. Describe the intelligence lifecycle and common sources
3. Work with indicators, TTPs and frameworks such as the kill chain and ATT&CK
4. Assess source reliability and avoid common analytic biases
5. Produce intelligence that drives a defensive decision

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Threat intelligence foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify three outputs by intelligence level; (2) Explain the difference between data and intelligence
- Common misconception addressed: Equating a feed of indicators with finished intelligence
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What threat intelligence is and is not | 72 | 6 |
| M01L02 | Strategic, operational and tactical levels | 72 | 6 |

### M02 The intelligence lifecycle (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write collection requirements for a stated question; (2) Choose the right format to disseminate a finding
- Common misconception addressed: Skipping the direction phase and collecting everything
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Direction, collection and processing | 72 | 6 |
| M02L02 | Analysis, dissemination and feedback | 72 | 6 |

### M03 Indicators and TTPs (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map an attack narrative onto the kill chain; (2) Translate observed behaviour into ATT&CK techniques
- Common misconception addressed: Relying only on easily-changed indicators like IP addresses
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Indicators of compromise vs behaviours | 72 | 6 |
| M03L02 | The kill chain and MITRE ATT&CK | 72 | 6 |

### M04 Evaluating sources (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rate two sources for reliability and credibility; (2) Spot confirmation bias in a sample assessment
- Common misconception addressed: Treating a vendor blog as equally reliable as corroborated reporting
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Source reliability and confidence | 72 | 6 |
| M04L02 | Cognitive and analytic biases | 72 | 6 |

### M05 Producing intelligence (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Turn findings into three prioritised defensive actions; (2) Write a short assessment with a clear confidence level
- Common misconception addressed: Delivering findings with no recommended action
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Analysis and structured techniques | 72 | 6 |
| M05L02 | Writing actionable intelligence products | 72 | 6 |

## Integrative case

A sector-specific threat group is reportedly targeting companies like yours. Gather and evaluate reporting, map the group's techniques to a framework, judge the reliability of the sources, and deliver an intelligence product that tells defenders exactly what to prioritise.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1665-final-protected | 25 | 25 | yes |
| MST-1665-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Threat intelligence foundations | 5 |
| The intelligence lifecycle | 5 |
| Indicators and TTPs | 5 |
| Evaluating sources | 5 |
| Producing intelligence | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1665-Q0001** (single-answer, Select ONE) Which best distinguishes threat intelligence from raw threat data?

- A. Intelligence is analysed and contextualised to support a decision **(key)**  
  _Rationale:_ Correct: analysis and context turn data into intelligence.
- B. Intelligence is simply a larger list of indicators  
  _Rationale:_ Volume alone does not make data into intelligence.
- C. Intelligence never uses external sources  
  _Rationale:_ Intelligence commonly draws on many sources.
- D. Intelligence must be fully automated  
  _Rationale:_ Automation aids but does not define intelligence.

**MST-1665-Q0002** (multiple-answer, Select TWO) Which TWO are higher-value than a single IP address when tracking an adversary? (Select TWO.)

- A. The group's techniques and procedures (TTPs) **(key)**  
  _Rationale:_ Correct: behaviours are harder for an adversary to change than an IP.
- B. A documented attack pattern mapped to a framework **(key)**  
  _Rationale:_ Correct: mapped patterns persist across infrastructure changes.
- C. A one-off IP that may rotate hourly  
  _Rationale:_ Single IPs are easily changed and low-value alone.
- D. The colour of the attacker's website  
  _Rationale:_ Cosmetic details carry no defensive value.

**MST-1665-Q0003** (single-answer, Select ONE) A single vendor blog claims a new campaign but no other source corroborates it. How should it be treated?

- A. As an uncorroborated lead with lower confidence pending verification **(key)**  
  _Rationale:_ Correct: single-source, uncorroborated reporting warrants lower confidence.
- B. As confirmed fact to act on immediately  
  _Rationale:_ A single uncorroborated source does not justify high confidence.
- C. As certainly false and ignored  
  _Rationale:_ It is a lead worth verifying, not dismissing outright.
- D. As more reliable than government reporting  
  _Rationale:_ Reliability depends on corroboration, not on being a blog.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
