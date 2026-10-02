# AI Incident Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1371` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. AI incidents defined
2. Detection and triage
3. Response and containment
4. Learning and prevention

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI incidents defined (MASTEMY-DESIGN 25%)

- Worked applications: (1) Classify an event as an AI incident; (2) Contrast an AI incident with an outage
- Common misconception addressed: Treating a silent accuracy drop as a non-incident because nothing crashed
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What counts as an AI incident | 72 | 6 |
| M01L02 | How AI incidents differ from IT outages | 72 | 6 |

### M02 Detection and triage (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design detection for silent failures; (2) Assign a severity and triage
- Common misconception addressed: Relying on user complaints as the first line of detection
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Monitoring signals and alerts | 72 | 6 |
| M02L02 | Severity classification and triage | 72 | 6 |

### M03 Response and containment (MASTEMY-DESIGN 25%)

- Worked applications: (1) Plan a rollback and kill-switch; (2) Draft a stakeholder comms plan
- Common misconception addressed: Having no safe way to turn a misbehaving model off quickly
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Rollback, kill-switch and mitigation | 72 | 6 |
| M03L02 | Roles and communication | 72 | 6 |

### M04 Learning and prevention (MASTEMY-DESIGN 25%)

- Worked applications: (1) Run a blameless post-incident review; (2) Convert a root cause into a control
- Common misconception addressed: Closing an incident without a root cause or preventive action
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Post-incident review and root cause | 72 | 6 |
| M04L02 | Preventive controls and reporting | 72 | 6 |

## Integrative case

A recommendation model starts quietly promoting harmful content after a data shift. Detect the silent failure, triage severity, contain it with a kill-switch and rollback, communicate, and run a blameless review that yields preventive controls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1371-final-protected | 20 | 20 | yes |
| MST-1371-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI incidents defined | 5 |
| Detection and triage | 5 |
| Response and containment | 5 |
| Learning and prevention | 5 |

Minimum reviewed item bank: 232 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1371-Q0001** (single-answer, Select ONE) Why can an AI incident be harder to detect than a classic IT outage?

- A. The system keeps running while silently producing wrong or harmful outputs **(key)**  
  _Rationale:_ Correct: AI failures are often silent, not crashes.
- B. AI systems always throw clear error codes  
  _Rationale:_ They often fail silently without errors.
- C. AI never fails in production  
  _Rationale:_ It can and does fail.
- D. Outages and AI incidents are identical  
  _Rationale:_ They differ precisely in detectability.

**MST-1371-Q0002** (multiple-answer, Select TWO) Which TWO containment capabilities should exist before an AI incident occurs? (Select TWO.)

- A. A kill-switch to disable the model quickly **(key)**  
  _Rationale:_ Correct: fast disablement limits harm.
- B. A tested rollback to a known-good version **(key)**  
  _Rationale:_ Correct: rollback restores safe behaviour.
- C. A policy of waiting for the next release cycle  
  _Rationale:_ Too slow for an active incident.
- D. Deleting all logs to reduce noise  
  _Rationale:_ Logs are needed for diagnosis.

**MST-1371-Q0003** (single-answer, Select ONE) What is the main purpose of a blameless post-incident review?

- A. To find root causes and preventive controls without punishing individuals **(key)**  
  _Rationale:_ Correct: blameless reviews surface systemic fixes and honest reporting.
- B. To identify who to fire  
  _Rationale:_ Blame discourages honest disclosure.
- C. To close the incident with no follow-up  
  _Rationale:_ The point is follow-up actions.
- D. To avoid changing anything  
  _Rationale:_ Reviews drive preventive change.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
