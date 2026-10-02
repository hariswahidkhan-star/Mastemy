# Threat Hunting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1666` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-TH-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Threat Hunting (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain threat hunting and how it differs from alert-driven monitoring
2. Form and test hypotheses from adversary behaviours
3. Query endpoint and network data to find suspicious activity
4. Use frameworks and baselines to focus a hunt
5. Document findings and turn them into lasting detections

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Threat hunting foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide whether a task is hunting or alert triage; (2) Describe the steps of one hunt loop
- Common misconception addressed: Believing threat hunting is just reviewing existing alerts
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Proactive hunting vs reactive alerting | 72 | 6 |
| M01L02 | The hunting maturity and loop | 72 | 6 |

### M02 Hypotheses (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Turn an ATT&CK technique into a hunt hypothesis; (2) Scope a hypothesis so it can actually be tested
- Common misconception addressed: Starting a hunt with no hypothesis and no scope
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building hypotheses from TTPs | 72 | 6 |
| M02L02 | Scoping a testable hunt | 72 | 6 |

### M03 Data and queries (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a query for unusual parent-child process pairs; (2) Find logons at unusual times for a service account
- Common misconception addressed: Assuming absence of alerts means absence of the behaviour
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Endpoint, process and command-line data | 72 | 6 |
| M03L02 | Network and authentication data | 72 | 6 |

### M04 Baselines and frameworks (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Define a baseline for normal admin-tool use; (2) Pick techniques to hunt based on coverage gaps
- Common misconception addressed: Flagging all activity as suspicious without a baseline
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Establishing what normal looks like | 72 | 6 |
| M04L02 | Using ATT&CK to focus coverage | 72 | 6 |

### M05 Findings to detections (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Document a confirmed finding for responders; (2) Write a detection rule from a validated hunt result
- Common misconception addressed: Finding malicious activity but never operationalising the detection
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Validating and documenting findings | 72 | 6 |
| M05L02 | Converting a hunt into a detection | 72 | 6 |

## Integrative case

Intelligence suggests adversaries are abusing a legitimate administration tool for lateral movement. Form a hypothesis, decide what data to query, hunt across endpoints for the behaviour, and convert a confirmed finding into a detection rule so it is caught automatically next time.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1666-final-protected | 25 | 25 | yes |
| MST-1666-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Threat hunting foundations | 5 |
| Hypotheses | 5 |
| Data and queries | 5 |
| Baselines and frameworks | 5 |
| Findings to detections | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1666-Q0001** (single-answer, Select ONE) What most clearly distinguishes threat hunting from standard alert monitoring?

- A. Hunting proactively searches for threats that no alert has flagged **(key)**  
  _Rationale:_ Correct: hunting is hypothesis-driven and proactive, not alert-driven.
- B. Hunting only reviews alerts the SIEM already produced  
  _Rationale:_ Reviewing existing alerts is monitoring, not hunting.
- C. Hunting requires no data at all  
  _Rationale:_ Hunting is data-intensive by nature.
- D. Hunting can only be done by automated tools  
  _Rationale:_ Hunting is analyst-led, though tools assist.

**MST-1666-Q0002** (multiple-answer, Select TWO) Which TWO make a threat-hunting hypothesis effective? (Select TWO.)

- A. It is grounded in a specific adversary technique **(key)**  
  _Rationale:_ Correct: a technique-based hypothesis is concrete and testable.
- B. It is scoped to data you can actually query **(key)**  
  _Rationale:_ Correct: a testable scope keeps the hunt achievable.
- C. It is as broad as 'find all bad things'  
  _Rationale:_ An unbounded hypothesis cannot be tested or concluded.
- D. It avoids referencing any data source  
  _Rationale:_ A hypothesis you cannot query against cannot be tested.

**MST-1666-Q0003** (single-answer, Select ONE) A hunt confirms malicious use of an admin tool. What is the most valuable next step?

- A. Create a detection so the behaviour is caught automatically in future **(key)**  
  _Rationale:_ Correct: operationalising the finding gives lasting value.
- B. Delete the logs that revealed it  
  _Rationale:_ Deleting evidence undermines response and future detection.
- C. Stop hunting because the job is done  
  _Rationale:_ Hunts should feed continuous improvement, not end coverage.
- D. Keep the finding secret from responders  
  _Rationale:_ Responders need the finding to act.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
