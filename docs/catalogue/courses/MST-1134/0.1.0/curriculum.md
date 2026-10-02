# Figma: Interface Design and Collaborative Prototyping

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1134` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course design (vendor-neutral). No third-party exam code, weighting or syllabus is claimed; content to be verified against current sources at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none (original Mastemy design) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Figma: Interface Design and Collaborative Prototyping (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate Figma and set up design files and frames
2. Build reusable components, styles and variants
3. Create interactive prototypes
4. Collaborate, hand off and manage design systems in Figma

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Figma foundations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Set up responsive frames with a layout grid; (2) Build a card with auto layout
- Common misconception addressed: Using fixed sizes instead of auto layout and constraints
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Interface, frames and layout grids | 120 | 8 |
| M01L02 | Auto layout and constraints | 120 | 8 |

### M02 Components and styles (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a button component with variants; (2) Define a shared text and colour style set
- Common misconception addressed: Detaching instances instead of using component properties
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Components, instances and variants | 120 | 8 |
| M02L02 | Colour, text and effect styles | 120 | 8 |

### M03 Prototyping (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a clickable multi-screen flow; (2) Add an overlay and a smart-animate transition
- Common misconception addressed: Prototyping every edge case before validating the main flow
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Interactions, flows and overlays | 120 | 8 |
| M03L02 | Animations, smart animate and conditions | 120 | 8 |

### M04 Collaboration and handoff (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Publish a component to a shared library; (2) Prepare a frame for developer inspection
- Common misconception addressed: Treating a design system as a static file no one maintains
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Comments, libraries and dev handoff | 120 | 8 |
| M04L02 | Managing a shared design system | 120 | 8 |

## Integrative case

A product designer must build a small design system and a prototype for usability testing. They must structure files with auto layout, create components and shared styles, build an interactive prototype, and set up a shared library and developer handoff, defending the component structure against ad-hoc one-off screens.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1134-final-protected | 40 | 40 | yes |
| MST-1134-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Figma foundations | 10 |
| Components and styles | 10 |
| Prototyping | 10 |
| Collaboration and handoff | 10 |

Minimum reviewed item bank: 376 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1134-Q0001** (single-answer, Select ONE) Auto layout in Figma is primarily used to:

- A. Create frames that resize and reflow as content changes **(key)**  
  _Rationale:_ Correct: auto layout drives responsive, content-aware frames.
- B. Export the file to PDF  
  _Rationale:_ Not what auto layout does.
- C. Grade colour in a video  
  _Rationale:_ Unrelated to Figma.
- D. Write production code automatically  
  _Rationale:_ Auto layout does not generate code.

**MST-1134-Q0002** (multiple-answer, Select TWO) Which TWO are benefits of using components with variants? (Select TWO.)

- A. One source of truth that updates all instances **(key)**  
  _Rationale:_ Correct: editing the main component propagates changes.
- B. Consistent states (default, hover, disabled) in one component **(key)**  
  _Rationale:_ Correct: variants group related states.
- C. They prevent all collaboration on the file  
  _Rationale:_ Components support, not block, collaboration.
- D. They remove the need for any layout grid  
  _Rationale:_ Grids and components serve different purposes.

**MST-1134-Q0003** (single-answer, Select ONE) A shared Figma library is most valuable because it:

- A. Lets teams reuse and update components across many files **(key)**  
  _Rationale:_ Correct: libraries distribute and update shared assets.
- B. Automatically tests the product for bugs  
  _Rationale:_ Libraries do not run tests.
- C. Replaces the need for developer handoff  
  _Rationale:_ Handoff still occurs.
- D. Hosts the production database  
  _Rationale:_ Unrelated to a design library.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
