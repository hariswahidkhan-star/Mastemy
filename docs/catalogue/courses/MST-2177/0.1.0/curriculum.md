# AI in Aerospace and Autonomous Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2177` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Educational overview course; concepts versioned by verification date. No official syllabus; conceptual AI and autonomy principles only - NO weaponization or operational military tactics. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI in Aerospace and Autonomous Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how AI and machine learning are applied in aerospace at a concept level
2. Describe autonomy levels and the role of human oversight
3. Explain perception, planning and control in autonomous systems conceptually
4. Describe verification, assurance and safety for AI-enabled systems
5. Explain responsible-AI and ethical considerations for autonomy
6. Communicate the benefits, limits and risks of AI autonomy to stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI foundations for aerospace (25% (Mastemy design weight), design weight)

- Worked applications: (1) Match three aerospace tasks to suitable AI approaches; (2) Explain one limitation of a data-driven model
- Common misconception addressed: Believing AI is always more accurate than people
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What AI and ML do in aerospace contexts | 120 | 7 |
| M01L02 | Data, models and their limitations | 120 | 7 |

### M02 Autonomy and oversight (25% (Mastemy design weight), design weight)

- Worked applications: (1) Place a system on an autonomy-level scale; (2) Decide where a human should remain in the loop
- Common misconception addressed: Thinking full autonomy means no human responsibility
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Levels of autonomy and human-in/on-the-loop | 120 | 7 |
| M02L02 | Where humans stay in control and why | 120 | 7 |

### M03 Perception, planning and control (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace perception-to-action in an autonomous system; (2) Explain why planning must handle uncertainty
- Common misconception addressed: Assuming perfect perception and no sensor error
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sensing and perception conceptually | 120 | 7 |
| M03L02 | Planning and control for autonomous systems | 120 | 7 |

### M04 Assurance and responsibility (25% (Mastemy design weight), design weight)

- Worked applications: (1) Identify an assurance gap for an AI component; (2) Write a plain-language accountability statement
- Common misconception addressed: Treating an AI decision as unquestionable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Verifying and assuring AI-enabled systems | 120 | 7 |
| M04L02 | Responsible-AI, ethics and accountability | 120 | 7 |

## Integrative case

An engineering class evaluates, at concept level only, an AI-enabled autonomous inspection drone for aerospace maintenance: they map AI tasks and limits, set autonomy levels and human oversight, outline perception-planning-control, and plan assurance and responsible-AI safeguards for a design review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2177-final-protected | 40 | 40 | yes |
| MST-2177-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI foundations for aerospace | 10 |
| Autonomy and oversight | 10 |
| Perception, planning and control | 10 |
| Assurance and responsibility | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2177-Q0001** (single-answer, Select ONE) Why must human oversight be designed into many AI-enabled aerospace systems?

- A. AI models can fail in unexpected ways, so humans provide judgment and accountability **(key)**  
  _Rationale:_ Correct: oversight manages model limits and keeps accountability clear.
- B. Because AI never makes mistakes  
  _Rationale:_ AI does make mistakes, which is why oversight matters.
- C. Because humans are always slower and irrelevant  
  _Rationale:_ Oversight exists precisely because human judgment adds value.
- D. Because autonomy removes all responsibility  
  _Rationale:_ Responsibility remains with people and organisations.

**MST-2177-Q0002** (multiple-answer, Select TWO) Which TWO are sound principles for assuring AI-enabled autonomous systems? (Select TWO.)

- A. Verify behaviour against requirements, including edge cases **(key)**  
  _Rationale:_ Correct: assurance tests the system against its requirements.
- B. Keep clear human accountability for outcomes **(key)**  
  _Rationale:_ Correct: accountability must stay with people and organisations.
- C. Assume the model is correct and skip testing  
  _Rationale:_ Skipping testing undermines assurance.
- D. Hide known limitations from decision-makers  
  _Rationale:_ Limitations must be communicated honestly.

**MST-2177-Q0003** (single-answer, Select ONE) What does a higher 'level of autonomy' generally mean for a system?

- A. The system performs more of the task with less direct human control **(key)**  
  _Rationale:_ Correct: higher autonomy shifts more decisions to the system.
- B. The system is guaranteed to be error-free  
  _Rationale:_ Autonomy level does not guarantee correctness.
- C. Humans have no responsibility for it  
  _Rationale:_ Responsibility remains regardless of autonomy level.
- D. It no longer needs any requirements  
  _Rationale:_ Requirements still apply at every autonomy level.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
