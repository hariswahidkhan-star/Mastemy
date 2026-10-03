# Figma Design Foundations: Interfaces and Prototypes

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2277` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint and teach durable, transferable platform concepts. Platform features, pricing and user interfaces change frequently; product specifics must be verified at production and on-screen steps may differ from any shown. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Figma Design Foundations: Interfaces and Prototypes (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate Figma's canvas, frames, layers and core tools confidently
2. Build layouts with constraints and auto layout that adapt to content
3. Create reusable components, variants and styles for consistency
4. Apply type, colour, spacing and basic accessibility principles to a UI
5. Build interactive prototypes to communicate and test a flow
6. Collaborate, hand off to developers and organise files for a team

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Canvas and layout (25% (design weight), design weight)

- Worked applications: (1) Rebuild a card that resizes cleanly with auto layout; (2) Set constraints so a button pins correctly on resize
- Common misconception addressed: Nudging pixels by hand instead of using auto layout
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Frames, layers, tools and the canvas | 120 | 7 |
| M01L02 | Constraints and auto layout | 120 | 7 |

### M02 Reusable systems (25% (design weight), design weight)

- Worked applications: (1) Turn three one-off buttons into one component with variants; (2) Fix a design that drifted because styles were not used
- Common misconception addressed: Detaching instances whenever a small change is needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Components, variants and instances | 120 | 7 |
| M02L02 | Colour, text and effect styles | 120 | 7 |

### M03 Visual and accessible UI (25% (design weight), design weight)

- Worked applications: (1) Check a colour pair against contrast guidance and fix it; (2) Establish a spacing scale and apply it to a screen
- Common misconception addressed: Treating contrast and legibility as optional polish
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Type, colour, spacing and hierarchy | 120 | 7 |
| M03L02 | Accessibility and contrast basics | 120 | 7 |

### M04 Prototyping and collaboration (25% (design weight), design weight)

- Worked applications: (1) Wire a three-screen prototype with a back action; (2) Prepare a frame for developer handoff with clear specs
- Common misconception addressed: Assuming a static mockup communicates an interaction fully
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Interactive prototypes and flows | 120 | 7 |
| M04L02 | Collaboration, handoff and file organisation | 120 | 7 |

## Integrative case

A product team needs a consistent sign-up flow: build the screens with auto layout and constraints, extract buttons and inputs into components with variants and shared styles, check colour contrast and spacing, wire an interactive prototype to test the flow with users, and prepare clean frames for developer handoff.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2277-final-protected | 40 | 40 | yes |
| MST-2277-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Canvas and layout | 10 |
| Reusable systems | 10 |
| Visual and accessible UI | 10 |
| Prototyping and collaboration | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2277-Q0001** (single-answer, Select ONE) A designer changes the corner radius on one button and must repeat it on 20 others across the file. What should they have set up?

- A. A single component used as instances, so one edit to the component updates every instance **(key)**  
  _Rationale:_ Correct: components propagate changes to all their instances, avoiding repetitive manual edits.
- B. Twenty separate rectangles grouped together  
  _Rationale:_ Groups do not share a definition, so each must be edited individually.
- C. A locked layer  
  _Rationale:_ Locking prevents edits but does not share a definition.
- D. A larger canvas  
  _Rationale:_ Canvas size is irrelevant to component reuse.

**MST-2277-Q0002** (multiple-answer, Select TWO) Which TWO practices directly support accessible, legible UI design? (Select TWO.)

- A. Ensuring sufficient colour contrast between text and its background **(key)**  
  _Rationale:_ Correct: adequate contrast is a core accessibility requirement for readable text.
- B. Using a consistent spacing and type scale for clear hierarchy **(key)**  
  _Rationale:_ Correct: consistent spacing and type hierarchy aid readability and scanning.
- C. Using the smallest readable font to fit more content  
  _Rationale:_ Shrinking type to cram content harms legibility and accessibility.
- D. Removing all labels to reduce clutter  
  _Rationale:_ Removing labels hurts comprehension and accessibility.

**MST-2277-Q0003** (single-answer, Select ONE) A component built without auto layout breaks when its label text gets longer. What is the fix?

- A. Apply auto layout so the component resizes to fit its content with consistent padding **(key)**  
  _Rationale:_ Correct: auto layout makes a component adapt to content length while keeping spacing.
- B. Set a fixed width large enough for any text  
  _Rationale:_ A fixed width wastes space or still clips longer text.
- C. Rasterise the component to an image  
  _Rationale:_ Flattening to an image removes editability entirely.
- D. Delete the text layer  
  _Rationale:_ Removing the label defeats the component's purpose.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
