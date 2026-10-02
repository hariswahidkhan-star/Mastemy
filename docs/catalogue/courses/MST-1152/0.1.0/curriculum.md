# Autodesk Revit: Building Information Modeling Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1152` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain core BIM concepts and how a Revit model differs from 2D CAD
2. Navigate the Revit interface and manage levels, grids and views
3. Model basic building elements using walls, floors, roofs, doors and windows
4. Work with families, types and parameters to control element behaviour
5. Produce coordinated sheets, schedules and annotations from the model

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the tools and workflows taught, the quality of live outputs, and professional judgement on the job are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 BIM and the Revit model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Contrast a line in CAD with a wall object in Revit; (2) Set up levels and grids for a two-storey shell
- Common misconception addressed: Thinking of Revit elements as lines rather than data-rich objects
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What BIM is and why it differs from CAD | 96 | 8 |
| M01L02 | The Revit interface, levels and grids | 96 | 8 |
### M02 Modelling the building shell (MASTEMY-DESIGN 20%)

- Worked applications: (1) Model an exterior wall with the correct type and height; (2) Place a window and change its type to update every instance
- Common misconception addressed: Drawing geometry manually instead of using parametric element tools
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Walls, floors and roofs | 96 | 8 |
| M02L02 | Hosting doors and windows | 96 | 8 |
### M03 Families, types and parameters (MASTEMY-DESIGN 20%)

- Worked applications: (1) Change a type parameter and observe model-wide updates; (2) Set an instance parameter on a single door
- Common misconception addressed: Confusing type parameters (affect all) with instance parameters (affect one)
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | System vs loadable families | 96 | 8 |
| M03L02 | Type and instance parameters | 96 | 8 |
### M04 Views and coordination (MASTEMY-DESIGN 20%)

- Worked applications: (1) Fix an element missing from a plan by correcting view range; (2) Create a section that stays live as the model changes
- Common misconception addressed: Editing views thinking you are editing the model geometry
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | View types, visibility and view range | 96 | 8 |
| M04L02 | Managing a coordinated model | 96 | 8 |
### M05 Documentation output (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assemble a sheet set with a door schedule; (2) Add dimensions that update when the model changes
- Common misconception addressed: Treating schedules as static tables rather than live model data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Sheets, title blocks and schedules | 96 | 8 |
| M05L02 | Annotation and dimensions | 96 | 8 |

## Integrative case

A junior modeller must set up a Revit model for a small two-storey office: establish levels and grids, model the shell, place doors and windows from families, then issue a sheet set with a door schedule and explain how a change propagates through the model.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1152-final-protected | 25 | 25 | yes |
| MST-1152-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| BIM and the Revit model | 5 |
| Modelling the building shell | 5 |
| Families, types and parameters | 5 |
| Views and coordination | 5 |
| Documentation output | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1152-Q0001** (single-answer, Select ONE) What best distinguishes a Revit wall from a wall drawn in 2D CAD?

- A. The Revit wall is a data-rich object that reports type, height and area and updates views automatically **(key)**  
  _Rationale:_ Correct: Revit elements carry information and propagate changes, unlike CAD lines.
- B. The Revit wall is simply two parallel lines  
  _Rationale:_ That describes a CAD representation, not a BIM object.
- C. A Revit wall cannot be scheduled  
  _Rationale:_ Revit walls can be scheduled because they carry data.
- D. CAD walls update plans and sections automatically  
  _Rationale:_ CAD lines do not propagate changes across views.

**MST-1152-Q0002** (multiple-answer, Select TWO) You change a parameter on a door and every door of that kind in the model updates. Which TWO statements are correct? (Select TWO.)

- A. You edited a type parameter **(key)**  
  _Rationale:_ Correct: type parameters affect all instances of that type.
- B. Instance parameters would have changed only the selected door **(key)**  
  _Rationale:_ Correct: instance parameters are local to the one element.
- C. You edited an instance parameter  
  _Rationale:_ An instance parameter would not have updated every door.
- D. Type and instance parameters behave identically  
  _Rationale:_ They differ precisely in scope of effect.

**MST-1152-Q0003** (single-answer, Select ONE) An element is present in a 3D view but missing from a floor plan. What should you check first?

- A. The view range of the plan view **(key)**  
  _Rationale:_ Correct: view range commonly hides elements above or below the cut plane.
- B. Whether the element was deleted from the model  
  _Rationale:_ It appears in 3D, so it has not been deleted.
- C. The project's units setting  
  _Rationale:_ Units do not control element visibility in a view.
- D. The title block on the sheet  
  _Rationale:_ Title blocks do not affect what shows in a plan view.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
