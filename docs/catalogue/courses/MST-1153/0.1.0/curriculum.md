# AutoCAD: Technical Drawing and Documentation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1153` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Autodesk (no affiliation or endorsement) |
| Exam code | (not published / to be resolved at blueprint review) |
| Version basis | official blueprint not retrieved; exam code and domain weights are DESIGN ASSUMPTION |
| Evidence | **unverified-needs-official-check** - sources: SRC-AUTODESK-1153 (vendor site EGRESS_BLOCKED this session) |
| Legacy IDs | MST-ENG-ADSK-ACUCAD-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Design-assumption note: no official exam code, domain names/weights, length or question count were available (vendor site EGRESS_BLOCKED). Module structure, weights and form lengths are DESIGN ASSUMPTIONS to be replaced at blueprint review.

## Learning outcomes

1. Set up drawings, units and workspace for technical documentation
2. Create and edit 2D geometry precisely with drawing and modify tools
3. Apply layers, dimensions, annotations and standards
4. Prepare layouts and plot/print to drawing standards

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only. Any official item formats that are not reproducible as MCQ/MR (for example hands-on software tasks or performance-based items) are out of scope for the certificate and are listed in the exam-version record.

## Modules

### M01 Setup and Precision Drawing (30%, DESIGN ASSUMPTION)

- Worked applications: (1) Set units and draw a wall outline to exact coordinates; (2) Use object snaps to connect geometry precisely
- Common misconception addressed: Drawing by eye instead of using coordinate entry and object snaps.
- Module check: 57 items / 57 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Workspace, units and templates | 180 | 8 |
| M01L02 | Coordinate entry and drawing tools | 180 | 8 |
| M01L03 | Object snaps and precision | 180 | 8 |
| M01L04 | Selection and basic editing | 180 | 8 |

### M02 Editing, Layers and Blocks (35%, DESIGN ASSUMPTION)

- Worked applications: (1) Organise a drawing with a layer standard; (2) Create and insert a reusable block
- Common misconception addressed: Putting everything on layer 0 instead of a structured layer scheme.
- Module check: 66 items / 66 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Modify tools (trim, extend, offset, array) | 180 | 8 |
| M02L02 | Layers, properties and standards | 180 | 8 |
| M02L03 | Blocks and reuse | 180 | 8 |
| M02L04 | Hatching and fills | 180 | 8 |

### M03 Annotation, Layout and Plotting (35%, DESIGN ASSUMPTION)

- Worked applications: (1) Dimension a plan to a drafting standard; (2) Set up a layout with a titleblock and plot to PDF
- Common misconception addressed: Confusing model space and paper space when setting plot scale.
- Module check: 66 items / 66 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Dimensioning and tolerances | 180 | 8 |
| M03L02 | Text, annotation and tables | 180 | 8 |
| M03L03 | Layouts, viewports and scale | 180 | 8 |
| M03L04 | Plotting, publishing and standards | 180 | 8 |

## Integrative case

A floor-plan drawing must be built to scale with layers, accurate dimensions and annotations, then laid out and plotted to a titleblock standard.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam length/question count NOT retrieved (vendor site EGRESS_BLOCKED). Form set to 103 items / 103 min to fit the cumulative budget; replace when confirmed.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1153-practice-form-A | 103 | 103 | yes |
| MST-1153-practice-form-B | 103 | 103 | no (optional practice) |
| MST-1153-practice-form-C | 103 | 103 | no (optional practice) |
| MST-1153-final-protected | 103 | 103 | yes |

| Domain (DESIGN ASSUMPTION) | Items per form |
|---|---|
| Setup and Precision Drawing | 31 |
| Editing, Layers and Blocks | 36 |
| Annotation, Layout and Plotting | 36 |

Minimum reviewed item bank: 982 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1153-Q0001** (single-answer, Select ONE) You must place a line endpoint exactly on an existing circle's centre. Which feature ensures precision?

- A. Object snap (centre snap) **(key)**  
  _Rationale:_ Correct: object snaps lock onto exact geometric points such as a circle centre.
- B. Zooming in and clicking by eye  
  _Rationale:_ Clicking by eye is imprecise even when zoomed.
- C. Changing the current layer  
  _Rationale:_ Layers organise objects; they do not snap geometry.
- D. Increasing the drawing units  
  _Rationale:_ Units do not place points precisely on existing geometry.

**MST-1153-Q0002** (single-answer, Select ONE) In which space do you typically set a plot scale and place a titleblock for printing?

- A. Paper space (layout) **(key)**  
  _Rationale:_ Correct: layouts/paper space hold titleblocks and set plot scale via viewports.
- B. Model space only  
  _Rationale:_ Model space holds the real-scale geometry; plotting setup lives in layouts.
- C. The command line  
  _Rationale:_ The command line issues commands; it is not a drawing space.
- D. The properties palette  
  _Rationale:_ Properties edits object attributes, not plot layout.

**MST-1153-Q0003** (multiple-answer, Select TWO) Which TWO are good reasons to use layers in a drawing?

- A. Control visibility and plotting of groups of objects **(key)**  
  _Rationale:_ Correct: layers let you show/hide and control plotting by group.
- B. Assign consistent colour, linetype and lineweight by discipline **(key)**  
  _Rationale:_ Correct: layer properties standardise appearance by category.
- C. Increase drawing precision  
  _Rationale:_ Layers organise objects; they do not add geometric precision.
- D. Replace the need for object snaps  
  _Rationale:_ Layers and object snaps serve different purposes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
