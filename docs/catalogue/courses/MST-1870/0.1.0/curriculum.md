# 3D Modelling with Blender

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1870` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course design (vendor-neutral). No third-party exam code, weighting or syllabus is claimed; content to be verified against current sources at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none (original Mastemy design) |
| Legacy IDs | MST-CRE-SK-3MB-001 |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — 3D Modelling with Blender (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate Blender and model basic 3D objects
2. Apply materials, lighting and shading
3. Render and export 3D scenes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Blender and modelling (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Model a simple object from primitives; (2) Use modifiers non-destructively
- Common misconception addressed: Applying destructive edits too early instead of using modifiers
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Interface, navigation and objects | 96 | 6 |
| M01L02 | Mesh modelling and modifiers | 96 | 6 |

### M02 Materials and lighting (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Create a basic material and UV map; (2) Light a scene with a three-point setup
- Common misconception addressed: Lighting a scene flatly from one direction only
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Materials, shaders and UVs | 96 | 6 |
| M02L02 | Lighting a scene | 96 | 6 |

### M03 Rendering and output (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Set up a camera and render a still; (2) Export a model or render for use
- Common misconception addressed: Rendering at excessive samples with no noticeable quality gain
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cameras, render engines and settings | 96 | 6 |
| M03L02 | Rendering and exporting | 96 | 6 |

## Integrative case

A 3D beginner must model, light and render a simple product visual in Blender. They must build the mesh with modifiers, apply materials and lighting, and render and export the result, defending non-destructive modelling and lighting choices for a clean render.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1870-final-protected | 30 | 30 | yes |
| MST-1870-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Blender and modelling | 10 |
| Materials and lighting | 10 |
| Rendering and output | 10 |

Minimum reviewed item bank: 232 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1870-Q0001** (single-answer, Select ONE) Blender modifiers are valuable because they:

- A. Apply changes non-destructively and can be adjusted later **(key)**  
  _Rationale:_ Correct: modifiers keep the workflow flexible.
- B. Permanently delete the base mesh  
  _Rationale:_ Modifiers are non-destructive by default.
- C. Render the final video  
  _Rationale:_ Modifiers do not render.
- D. Write the material shaders for you  
  _Rationale:_ Shaders are set separately.

**MST-1870-Q0002** (multiple-answer, Select TWO) Which TWO improve a basic 3D render? (Select TWO.)

- A. A considered lighting setup such as three-point lighting **(key)**  
  _Rationale:_ Correct: good lighting defines form and depth.
- B. Appropriate materials with correct UVs **(key)**  
  _Rationale:_ Correct: materials and UVs make surfaces believable.
- C. Flat lighting from a single front light only  
  _Rationale:_ Flat lighting looks lifeless.
- D. Ignoring the camera entirely  
  _Rationale:_ The camera frames the render.

**MST-1870-Q0003** (single-answer, Select ONE) Increasing render samples far beyond the point of visible improvement mainly:

- A. Wastes render time for no perceptible quality gain **(key)**  
  _Rationale:_ Correct: diminishing returns make extra samples wasteful.
- B. Always doubles the final resolution  
  _Rationale:_ Samples do not change resolution.
- C. Changes the model topology  
  _Rationale:_ Samples do not edit the mesh.
- D. Fixes bad UV maps  
  _Rationale:_ Samples do not correct UVs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
