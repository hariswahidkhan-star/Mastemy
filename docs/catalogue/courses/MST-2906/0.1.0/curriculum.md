# Creative Coding and Generative Art (Ages 14-17)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2906` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal blueprint (no external syllabus) |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Creative Coding and Generative Art (Ages 14-17) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use code to draw shapes, colours and patterns on a canvas
2. Use loops and variables to create repeating visual patterns
3. Use randomness and noise to add variation to art
4. Use simple animation by updating a drawing over time
5. Combine math (coordinates, angles) with code to create designs
6. Iterate on a creative piece and reflect on design choices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Drawing with code (25% (design weight), design weight)

- Worked applications: (1) Draw a grid of circles using nested loops; (2) Change the grid spacing with a variable
- Common misconception addressed: Thinking screen coordinates start at the centre by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The coordinate system and a canvas | 120 | 7 |
| M01L02 | Shapes, colour and simple composition | 120 | 7 |

### M02 Patterns with loops (25% (design weight), design weight)

- Worked applications: (1) Create a repeating pattern then vary its colour; (2) Use a variable to control how many shapes appear
- Common misconception addressed: Thinking a loop can only repeat identical shapes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Repeating shapes with loops | 120 | 7 |
| M02L02 | Using variables to vary a pattern | 120 | 7 |

### M03 Randomness and variation (25% (design weight), design weight)

- Worked applications: (1) Add random positions so no two runs look the same; (2) Constrain randomness so the art stays balanced
- Common misconception addressed: Thinking randomness means the result must look messy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Controlled randomness in art | 120 | 7 |
| M03L02 | Noise and organic variation | 120 | 7 |

### M04 Animation and iteration (25% (design weight), design weight)

- Worked applications: (1) Animate a shape moving across the canvas; (2) Refine a piece after feedback and explain the change
- Common misconception addressed: Thinking the first version is automatically the best version
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Animating by redrawing each frame | 120 | 7 |
| M04L02 | Iterating and reflecting on design | 120 | 7 |

## Integrative case

Learners create an animated generative-art piece: a loop-based pattern of shapes whose size and colour vary with variables, controlled randomness so each run differs, a shape animated across the canvas, and they iterate on the composition and explain their design choices.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2906-final-protected | 40 | 40 | yes |
| MST-2906-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Drawing with code | 10 |
| Patterns with loops | 10 |
| Randomness and variation | 10 |
| Animation and iteration | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2906-Q0001** (single-answer, Select ONE) Why are loops so useful in generative art?

- A. They let you repeat and vary many shapes with a small amount of code **(key)**  
  _Rationale:_ Correct: loops efficiently create repeated, varied visual elements.
- B. They make the screen brighter  
  _Rationale:_ Loops repeat drawing code; they do not change brightness.
- C. They stop the program from drawing  
  _Rationale:_ Loops are used to draw repeatedly, not to stop drawing.
- D. They can only draw a single shape once  
  _Rationale:_ Loops are specifically for repeating many shapes.

**MST-2906-Q0002** (multiple-answer, Select TWO) Which TWO techniques add variation so each run of a generative piece looks different? (Select TWO.)

- A. Using randomness for positions or colours **(key)**  
  _Rationale:_ Correct: randomness changes the output each run.
- B. Using noise to vary values smoothly **(key)**  
  _Rationale:_ Correct: noise adds organic variation.
- C. Drawing exactly the same fixed picture every time  
  _Rationale:_ A fixed picture produces no variation.
- D. Turning the monitor off  
  _Rationale:_ Turning off the screen does not create artistic variation.

**MST-2906-Q0003** (single-answer, Select ONE) You want a pattern to feel random but still look balanced, not messy. What should you do?

- A. Use randomness within sensible limits (constrain the range of values) **(key)**  
  _Rationale:_ Correct: controlled/constrained randomness keeps variety while staying balanced.
- B. Remove all randomness so it is identical each time  
  _Rationale:_ That removes variation entirely.
- C. Let every value be fully random with no limits  
  _Rationale:_ Unconstrained randomness often looks messy.
- D. Use no loops or variables at all  
  _Rationale:_ Loops and variables help structure the composition.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
