# Frontier AI: Multimodal, Reasoning and Autonomous Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2693` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. This is a fast-moving, evolving area; specific capabilities, benchmarks and claims must be re-checked against current primary sources at production and are not presented as settled fact. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Frontier AI: Multimodal, Reasoning and Autonomous Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what multimodal AI is and where it helps and fails
2. Describe what current 'reasoning' approaches do and do not achieve
3. Explain how tool use and retrieval extend model capabilities
4. Describe AI agents and the real limits of present autonomy
5. Design appropriate oversight and guardrails for agentic systems
6. Evaluate and adopt frontier AI claims cautiously, treating them as evolving

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Multimodal AI (25% (Mastemy design weight), design weight)

- Worked applications: (1) Classify four tasks by which modalities a system would need to handle them; (2) Identify a case where a multimodal model could plausibly fail and say why
- Common misconception addressed: Assuming a multimodal model truly 'sees' or 'hears' as a human does
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What multimodal models are: text, image, audio and more | 120 | 7 |
| M01L02 | Capabilities and failure modes of multimodal systems | 120 | 7 |

### M02 Reasoning and tool use (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain in plain terms what a 'reasoning' model does differently and its limits; (2) Design a simple tool-use or retrieval setup to reduce a model's errors
- Common misconception addressed: Treating step-by-step output as proof of genuine human-like reasoning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How 'reasoning' approaches work, and what the word hides | 120 | 7 |
| M02L02 | Tool use, retrieval and extending a model's abilities | 120 | 7 |

### M03 Agents and autonomous systems (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draw the line between an assistant that suggests and an agent that acts; (2) Specify the guardrails and human checkpoints for a modest autonomous workflow
- Common misconception addressed: Granting an AI agent broad autonomy without limits, monitoring or a kill switch
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | What AI agents are and how far autonomy really goes | 120 | 7 |
| M03L02 | Designing oversight and guardrails for agentic systems | 120 | 7 |

### M04 Evaluating and adopting frontier AI (25% (Mastemy design weight), design weight)

- Worked applications: (1) Take a vendor frontier claim and list the evidence you would need to trust it; (2) Draft a cautious adoption note that treats frontier capability as evolving
- Common misconception addressed: Assuming today's frontier demos reflect reliable, general, production-ready ability
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Evaluating frontier claims against evidence | 120 | 7 |
| M04L02 | Adopting frontier capabilities responsibly, framed as evolving | 120 | 7 |

## Integrative case

A technology team is briefed on frontier AI: explain multimodal models, reasoning approaches and agents in honest terms, identify where current limits and failure modes lie, and recommend how to evaluate and adopt these fast-changing capabilities with appropriate oversight.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2693-final-protected | 40 | 40 | yes |
| MST-2693-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Multimodal AI | 10 |
| Reasoning and tool use | 10 |
| Agents and autonomous systems | 10 |
| Evaluating and adopting frontier AI | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2693-Q0001** (single-answer, Select ONE) A vendor shows an AI agent completing a multi-step task in a demo and claims it can now run business processes autonomously. Why treat this cautiously?

- A. Demos are curated and current agents remain brittle, so broad autonomous reliability is not shown by a demo **(key)**  
  _Rationale:_ Correct: a successful demo does not establish robust, general, production-ready autonomy.
- B. Because AI agents never complete any task  
  _Rationale:_ Overstated: agents can complete some tasks; the issue is reliability and scope.
- C. Because autonomy is banned by law everywhere  
  _Rationale:_ Inaccurate: the concern is evidence and risk, not blanket illegality.
- D. Because demos always use fake software  
  _Rationale:_ Inaccurate and not the point; the issue is generalisation beyond the demo.

**MST-2693-Q0002** (multiple-answer, Select TWO) Which TWO are sound ways to make an AI agent or reasoning system safer to use? (Select TWO.)

- A. Add human checkpoints before the system takes consequential actions **(key)**  
  _Rationale:_ Correct: human-in-the-loop review limits harm from errors.
- B. Constrain its tools and scope and monitor what it does **(key)**  
  _Rationale:_ Correct: limiting capabilities and observing behaviour are core guardrails.
- C. Give it unlimited permissions so it can work faster  
  _Rationale:_ Unsafe: broad autonomy without limits increases risk.
- D. Assume its step-by-step output proves it cannot be wrong  
  _Rationale:_ Incorrect: visible steps are not a guarantee of correctness.

**MST-2693-Q0003** (single-answer, Select ONE) Why is step-by-step 'reasoning' output not proof that a model reasons like a human?

- A. The visible steps are generated text that can look logical yet still be wrong or post-hoc **(key)**  
  _Rationale:_ Correct: the format resembles reasoning but does not guarantee sound, human-like understanding.
- B. Because models never produce useful intermediate steps  
  _Rationale:_ Overstated: such steps can help; they just are not proof of understanding.
- C. Because only humans can write steps at all  
  _Rationale:_ Inaccurate: models clearly produce stepwise text.
- D. Because reasoning output is always hidden from users  
  _Rationale:_ Inaccurate: it is often shown; visibility is not the issue.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
