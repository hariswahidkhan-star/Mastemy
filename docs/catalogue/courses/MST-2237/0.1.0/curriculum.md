# Generative and AI-Assisted Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2237` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Engineering standards, tool specifics and formulae must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Generative and AI-Assisted Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain generative design and topology optimisation and when they help
2. Set design goals, loads and constraints that drive a generative study
3. Interpret and down-select among generated design candidates
4. Use AI assistants responsibly within a CAD and engineering workflow
5. Validate AI-generated geometry for manufacturability and performance
6. Describe the limits, data and accountability issues of AI-assisted design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations of generative design (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide whether a bracket problem suits generative design; (2) Explain topology optimisation to a non-expert stakeholder
- Common misconception addressed: Treating generative design as magic that needs no engineering input
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Generative design and topology optimisation | 120 | 7 |
| M01L02 | Where AI-assisted design helps and where it does not | 120 | 7 |

### M02 Framing the study (25% (Mastemy design weight), design weight)

- Worked applications: (1) Translate a load case into constraints for a study; (2) Choose a manufacturing constraint and see how it reshapes results
- Common misconception addressed: Omitting the manufacturing method and getting unmakeable shapes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Objectives, loads, constraints and keep-out regions | 120 | 7 |
| M02L02 | Manufacturing method as an input to generation | 120 | 7 |

### M03 Exploring and choosing outcomes (25% (Mastemy design weight), design weight)

- Worked applications: (1) Rank three generated candidates against weighted criteria; (2) Explain why the lightest option may not be the best choice
- Common misconception addressed: Picking the most organic-looking result without checking performance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Comparing and down-selecting candidates | 120 | 7 |
| M03L02 | Trade-offs: mass, stiffness, cost and makeability | 120 | 7 |

### M04 Responsible AI-assisted workflow (25% (Mastemy design weight), design weight)

- Worked applications: (1) Use an AI assistant to draft geometry then verify it; (2) Decide what an engineer must sign off before release
- Common misconception addressed: Shipping AI-generated geometry without independent validation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Using AI assistants in the design loop | 120 | 7 |
| M04L02 | Validation, limits and engineer accountability | 120 | 7 |

## Integrative case

A team uses generative design for a lightweight drone arm: set the loads and keep-out zones, add a printing constraint, generate and down-select candidates, then validate the chosen arm and record who signs it off.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2237-final-protected | 40 | 40 | yes |
| MST-2237-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of generative design | 10 |
| Framing the study | 10 |
| Exploring and choosing outcomes | 10 |
| Responsible AI-assisted workflow | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2237-Q0001** (single-answer, Select ONE) What does topology optimisation primarily do in a generative design study?

- A. Removes material from low-stress regions to meet goals like minimum mass **(key)**  
  _Rationale:_ Correct: it redistributes material to where it carries load, cutting the rest.
- B. Chooses the part's colour automatically  
  _Rationale:_ Appearance is not the aim of topology optimisation.
- C. Writes the manufacturing purchase order  
  _Rationale:_ That is a procurement task, not optimisation.
- D. Guarantees the part needs no validation  
  _Rationale:_ Optimised geometry still requires engineering validation.

**MST-2237-Q0002** (multiple-answer, Select TWO) Which TWO inputs most directly shape the outcome of a generative design study? (Select TWO.)

- A. The applied loads and boundary constraints **(key)**  
  _Rationale:_ Correct: loads and constraints define what the geometry must resist.
- B. The chosen manufacturing method **(key)**  
  _Rationale:_ Correct: the process constrains achievable shapes and must be set as an input.
- C. The designer's favourite font  
  _Rationale:_ Typography has no role in the study.
- D. The time of day the study is run  
  _Rationale:_ Run time does not affect the generated geometry.

**MST-2237-Q0003** (single-answer, Select ONE) An AI assistant produces a sleek bracket geometry. Before it is released for production, what must happen?

- A. An engineer validates it for strength and manufacturability and takes accountability **(key)**  
  _Rationale:_ Correct: AI-assisted output still requires engineering validation and human sign-off.
- B. It ships immediately because the AI is reliable  
  _Rationale:_ AI output is a starting point, not a verified design.
- C. The validation step is skipped to save time  
  _Rationale:_ Skipping validation abandons engineering accountability.
- D. Only the colour is checked  
  _Rationale:_ Strength and makeability, not colour, govern release.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
