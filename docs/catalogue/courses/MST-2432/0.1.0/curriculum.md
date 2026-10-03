# 3D Modeling and Animation Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2432` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal curriculum blueprint (no issuer syllabus). Outcomes are Mastemy internal IDs derived from the course blueprint; tool/technique specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — 3D Modeling and Animation Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate a 3D viewport and work with the core transform tools
2. Build models with polygon modelling and clean topology
3. Apply materials, textures and UV coordinates to a model
4. Set up lighting and render a scene with correct settings
5. Rig and keyframe a simple object or character for animation
6. Apply timing and spacing principles to produce believable motion

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 3D space and modelling (25% (design weight), design weight)

- Worked applications: (1) Model a mug from a cylinder primitive; (2) Fix an n-gon into clean quad topology
- Common misconception addressed: Assuming topology does not matter if the model 'looks right'
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Viewport, transforms and primitives | 120 | 7 |
| M01L02 | Polygon modelling and clean topology | 120 | 7 |

### M02 Materials and texturing (25% (design weight), design weight)

- Worked applications: (1) Unwrap a box without stretched UVs; (2) Assign a textured material to a model
- Common misconception addressed: Painting texture before unwrapping and getting distortion
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | UV unwrapping basics | 120 | 7 |
| M02L02 | Materials, shaders and textures | 120 | 7 |

### M03 Lighting and rendering (25% (design weight), design weight)

- Worked applications: (1) Light a scene with a three-point setup; (2) Lower noise without huge render times
- Common misconception addressed: Thinking more lights always make a better render
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Lighting a scene | 120 | 7 |
| M03L02 | Render settings and output | 120 | 7 |

### M04 Rigging and animation (25% (design weight), design weight)

- Worked applications: (1) Keyframe a bouncing ball with squash and stretch; (2) Adjust spacing to change perceived weight
- Common misconception addressed: Spacing keyframes evenly and getting robotic motion
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Rigging and keyframes | 120 | 7 |
| M04L02 | Timing, spacing and the principles of motion | 120 | 7 |

## Integrative case

A learner models a simple prop with clean topology, unwraps and textures it, lights a small scene, then rigs and keyframes a short animated move applying timing and spacing, and renders a brief clip.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); design assumption.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2432-final-protected | 40 | 40 | yes |
| MST-2432-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| 3D space and modelling | 10 |
| Materials and texturing | 10 |
| Lighting and rendering | 10 |
| Rigging and animation | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2432-Q0001** (single-answer, Select ONE) 'Clean topology' in polygon modelling generally favours:

- A. Evenly distributed quads that deform and subdivide predictably **(key)**  
  _Rationale:_ Correct: quad-based topology deforms and subdivides cleanly.
- B. As many n-gons as possible  
  _Rationale:_ N-gons cause shading and deformation problems.
- C. Triangles everywhere for deforming surfaces  
  _Rationale:_ Triangles can pinch on deforming surfaces.
- D. Ignoring edge flow entirely  
  _Rationale:_ Edge flow is central to clean topology.

**MST-2432-Q0002** (multiple-answer, Select TWO) Which TWO of the classic animation principles most directly control an object's sense of weight? (Select TWO.)

- A. Timing (how many frames an action takes) **(key)**  
  _Rationale:_ Correct: timing conveys mass and force.
- B. Spacing / slow-in and slow-out (how the frames are distributed) **(key)**  
  _Rationale:_ Correct: spacing shapes acceleration and perceived weight.
- C. Choosing a brighter material colour  
  _Rationale:_ Colour does not convey weight.
- D. Increasing render resolution  
  _Rationale:_ Resolution is unrelated to motion weight.

**MST-2432-Q0003** (single-answer, Select ONE) UV unwrapping is the process of:

- A. Flattening a 3D model's surface into 2D coordinates so textures map correctly **(key)**  
  _Rationale:_ Correct: UVs map 2D texture space onto the 3D surface.
- B. Adding more polygons to a model  
  _Rationale:_ That is subdivision, not unwrapping.
- C. Rigging a skeleton  
  _Rationale:_ That is rigging, not UVs.
- D. Setting the render camera  
  _Rationale:_ That is unrelated to UVs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
