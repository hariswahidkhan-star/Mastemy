# Human-in-the-Loop AI System Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0463` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain when and why human oversight belongs in an AI system
2. Choose the right human-in-the-loop pattern for a task and risk level
3. Design review interfaces and escalation thresholds
4. Combine model confidence with routing to humans effectively
5. Measure and improve the human-AI workflow over time

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why humans in the loop (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify three workflows by required oversight level; (2) Map a decision's harm potential to an oversight pattern
- Common misconception addressed: Assuming more automation is always better
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Automation risk and the case for oversight | 96 | 8 |
| M01L02 | Oversight patterns: human in, on and over the loop | 96 | 8 |

### M02 Routing and confidence (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set a confidence threshold that sends uncertain cases to review; (2) Decide the human review rate for a target error budget
- Common misconception addressed: Trusting raw confidence scores as if they were calibrated probabilities
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Using model confidence to route cases | 96 | 8 |
| M02L02 | Selective prediction and abstention | 96 | 8 |

### M03 Designing the review experience (MASTEMY-DESIGN 20%)

- Worked applications: (1) Redesign a review screen to surface the right context; (2) Define an escalation rule for reviewer disagreement
- Common misconception addressed: Overloading reviewers so they rubber-stamp outputs
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Review interfaces that reduce reviewer error | 96 | 8 |
| M03L02 | Escalation, second review and disagreement handling | 96 | 8 |

### M04 Feedback and learning loops (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design label capture from a review queue without bias; (2) Spot an automation-bias risk in a review workflow
- Common misconception addressed: Assuming human corrections are always ground truth
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Capturing human decisions as labels | 96 | 8 |
| M04L02 | Avoiding feedback loops and automation bias | 96 | 8 |

### M05 Measuring and governing the loop (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose metrics for a content-moderation HITL system; (2) Define the audit trail a regulator would expect
- Common misconception addressed: Measuring only model accuracy and ignoring the joint human-AI system
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Metrics for human-AI performance and throughput | 96 | 8 |
| M05L02 | Accountability, audit trails and policy | 96 | 8 |

## Integrative case

A platform must moderate user content with an AI classifier and human reviewers. Pick the oversight pattern, set confidence-based routing, design the review interface and escalation, and define the metrics and audit trail for a trust-and-safety review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0463-final-protected | 25 | 25 | yes |
| MST-0463-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why humans in the loop | 5 |
| Routing and confidence | 5 |
| Designing the review experience | 5 |
| Feedback and learning loops | 5 |
| Measuring and governing the loop | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0463-Q0001** (single-answer, Select ONE) A task has high harm potential and low model reliability. Which oversight pattern fits best?

- A. Human-in-the-loop reviewing each consequential decision **(key)**  
  _Rationale:_ Correct: high harm and low reliability demand per-decision human review.
- B. Full automation with no review  
  _Rationale:_ Unsafe given high harm and low reliability.
- C. No monitoring at all  
  _Rationale:_ This abandons oversight entirely.
- D. Human review once per quarter only  
  _Rationale:_ Too infrequent for high-harm decisions.

**MST-0463-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce automation bias among reviewers? (Select TWO.)

- A. Show model uncertainty and any dissenting evidence **(key)**  
  _Rationale:_ Correct: surfacing uncertainty prompts genuine review.
- B. Rotate reviewers and cap their load **(key)**  
  _Rationale:_ Correct: limiting load reduces fatigue-driven rubber-stamping.
- C. Always hide confidence and force agreement with the model  
  _Rationale:_ This increases, not reduces, automation bias.
- D. Reward the fastest approvals  
  _Rationale:_ Speed incentives encourage rubber-stamping.

**MST-0463-Q0003** (single-answer, Select ONE) Selective prediction means the model should…

- A. Abstain and defer low-confidence cases to humans **(key)**  
  _Rationale:_ Correct: selective prediction routes uncertain cases to review.
- B. Always produce an answer  
  _Rationale:_ That defeats the purpose of abstention.
- C. Never produce any answer  
  _Rationale:_ The model still answers confident cases.
- D. Delete uncertain data  
  _Rationale:_ Abstaining is not deleting data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
