# Structural Engineering Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2200` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Structural Engineering Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how loads flow through a structure from application to the foundation
2. Distinguish dead, live, wind, seismic and other load types and how they combine
3. Describe the behaviour of beams, columns, trusses and frames under load
4. Interpret basic stress, strain and material strength concepts for steel and concrete
5. Identify common structural systems and when each is used
6. Recognise the limits of hand reasoning and when a licensed engineer and analysis are required

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Loads and load paths (25% (design weight), design weight)

- Worked applications: (1) Classify the loads acting on a pedestrian bridge; (2) Combine dead and live loads for a floor beam
- Common misconception addressed: Thinking wind only matters for very tall buildings
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Load types and combinations | 120 | 7 |
| M01L02 | Tracing the load path to the foundation | 120 | 7 |

### M02 Statics and member behaviour (25% (design weight), design weight)

- Worked applications: (1) Draw a free-body diagram for a simply supported beam; (2) Identify where bending is greatest in a cantilever
- Common misconception addressed: Assuming a longer beam of the same size always deflects less
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Equilibrium, reactions and free-body diagrams | 120 | 7 |
| M02L02 | Bending, shear and axial behaviour of members | 120 | 7 |

### M03 Materials and stress (25% (design weight), design weight)

- Worked applications: (1) Compare steel and concrete in tension; (2) Explain why concrete needs reinforcement where it bends
- Common misconception addressed: Believing concrete is strong in tension
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Stress, strain and the properties of steel | 120 | 7 |
| M03L02 | Reinforced concrete behaviour basics | 120 | 7 |

### M04 Structural systems (25% (design weight), design weight)

- Worked applications: (1) Select a system for a long-span roof; (2) Identify the lateral system resisting wind in a frame
- Common misconception addressed: Assuming gravity design alone makes a building safe in an earthquake
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Beams, columns, trusses and frames | 120 | 7 |
| M04L02 | Lateral systems: braced frames, shear walls and diaphragms | 120 | 7 |

## Integrative case

A small two-storey steel-framed office is being planned: trace the gravity and lateral load paths, identify the members and systems carrying each load, and mark the points where a licensed structural engineer must perform the analysis before anything is built.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2200-final-protected | 40 | 40 | yes |
| MST-2200-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Loads and load paths | 10 |
| Statics and member behaviour | 10 |
| Materials and stress | 10 |
| Structural systems | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2200-Q0001** (single-answer, Select ONE) Concrete is strong in compression but weak in tension. Why is steel reinforcement placed in the bottom of a simply supported beam?

- A. Because the bottom fibres are in tension under downward load and steel carries that tension **(key)**  
  _Rationale:_ Correct: reinforcement is placed where tension develops.
- B. Because the bottom is colder and steel prefers cold  
  _Rationale:_ Temperature is not the reason for reinforcement placement.
- C. Because steel is cheaper at the bottom  
  _Rationale:_ Cost does not determine structural placement.
- D. Because the top of the beam carries no load  
  _Rationale:_ The top is in compression; reinforcement location follows tension.

**MST-2200-Q0002** (multiple-answer, Select TWO) Which TWO are examples of lateral load-resisting systems? (Select TWO.)

- A. Shear walls **(key)**  
  _Rationale:_ Correct: shear walls resist lateral loads.
- B. Braced frames **(key)**  
  _Rationale:_ Correct: braced frames resist lateral loads.
- C. Simply supported floor joists  
  _Rationale:_ Floor joists carry gravity loads, not primarily lateral loads.
- D. A spread footing under a column  
  _Rationale:_ A footing transfers load to the ground; it is not a lateral system.

**MST-2200-Q0003** (single-answer, Select ONE) Following the load path for a typical floor, in what order does gravity load travel to the ground?

- A. Slab to beams to columns to foundations to soil **(key)**  
  _Rationale:_ Correct: this is the typical downward gravity load path.
- B. Soil to foundations to slab to occupants  
  _Rationale:_ That reverses the actual direction of load flow.
- C. Columns to slab to wind to roof  
  _Rationale:_ This mixes unrelated elements and directions.
- D. Foundations to beams to slab to columns  
  _Rationale:_ This is not a coherent load path order.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
