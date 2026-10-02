# Civil 3D: Civil Infrastructure Design Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1154` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Civil 3D object model and dynamic design workflow
2. Build and manage surfaces from survey and design data
3. Design horizontal and vertical road alignments with design criteria
4. Create corridors, assemblies and extract quantities
5. Produce plan-and-profile sheets and manage data references

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Civil 3D foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace how a change to a surface updates dependent objects; (2) Set drawing settings and styles for a new civil project
- Common misconception addressed: Editing linework by hand instead of through the governing design object
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The object model and dynamic design | 96 | 8 |
| M01L02 | Styles, settings and the project environment | 96 | 8 |

### M02 Surfaces (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build an existing-ground surface from survey points and breaklines; (2) Run a slope analysis to find areas exceeding a gradient
- Common misconception addressed: Trusting a surface built from bad data without checking for spikes
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building surfaces from data | 96 | 8 |
| M02L02 | Surface analysis and editing | 96 | 8 |

### M03 Alignments and profiles (MASTEMY-DESIGN 20%)

- Worked applications: (1) Lay out a horizontal alignment that meets a design speed; (2) Design a vertical profile checking sight distance and grades
- Common misconception addressed: Ignoring design-criteria checks and relying on visual judgement alone
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Horizontal alignment design | 96 | 8 |
| M03L02 | Profiles and design criteria | 96 | 8 |

### M04 Corridors and quantities (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a basic road assembly and apply it along an alignment; (2) Extract cut-and-fill earthwork volumes from the corridor
- Common misconception addressed: Assuming corridor volumes are final before the design is stable
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Assemblies and corridor modelling | 96 | 8 |
| M04L02 | Earthwork and material quantities | 96 | 8 |

### M05 Documentation and data references (MASTEMY-DESIGN 20%)

- Worked applications: (1) Produce a set of plan-and-profile sheets from the model; (2) Share a surface between drawings using a data reference
- Common misconception addressed: Copying static geometry between files and breaking the dynamic link
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Plan-and-profile sheets | 96 | 8 |
| M05L02 | Data references and collaboration | 96 | 8 |

## Integrative case

A civil technician designs a short section of road. Build an existing-ground surface, lay out a horizontal alignment and profile to the applicable design criteria, model a corridor with an assembly, extract earthwork quantities, and produce plan-and-profile sheets, keeping the model dynamic throughout.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1154-final-protected | 25 | 25 | yes |
| MST-1154-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Civil 3D foundations | 5 |
| Surfaces | 5 |
| Alignments and profiles | 5 |
| Corridors and quantities | 5 |
| Documentation and data references | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1154-Q0001** (single-answer, Select ONE) After building an existing-ground surface, a designer notices sharp vertical spikes that do not match the terrain. What is the most likely cause and correct response?

- A. Erroneous survey points; identify and exclude or correct the bad data, then rebuild the surface  **(key)**  
  _Rationale:_ Correct: spikes usually come from bad survey points, which should be found and cleaned before relying on the surface.
- B. The surface is correct; terrain naturally has vertical spikes  
  _Rationale:_ Real ground does not produce sharp vertical spikes; these indicate data errors.
- C. Delete the whole surface and never use survey data  
  _Rationale:_ Survey data is the correct basis; the fix is cleaning errant points, not abandoning it.
- D. Increase the drawing scale to hide the spikes  
  _Rationale:_ Changing scale hides the symptom but leaves the faulty surface in use.

**MST-1154-Q0002** (multiple-answer, Select TWO) Which TWO behaviours follow from Civil 3D's dynamic object model? (Select TWO.)

- A. Editing an alignment automatically updates the profiles and corridors that reference it  **(key)**  
  _Rationale:_ Correct: dependent objects update when the governing object changes.
- B. A surface data reference lets several drawings share one surface source  **(key)**  
  _Rationale:_ Correct: data references share model objects dynamically across drawings.
- C. Design objects are static once drawn and must be redrawn to change  
  _Rationale:_ The model is dynamic; objects update rather than being redrawn.
- D. Quantities never change when the design changes  
  _Rationale:_ Quantities extracted from the model update as the design changes.

**MST-1154-Q0003** (single-answer, Select ONE) A designer copies alignment geometry as plain lines into a sheet file to speed up drafting. What design risk does this create?

- A. The copied linework no longer updates when the design changes, so sheets can go stale  **(key)**  
  _Rationale:_ Correct: static copies break the dynamic link and drift out of sync with the model.
- B. Nothing; static copies always stay current  
  _Rationale:_ Static copies do not update with the model.
- C. The alignment is deleted from the source drawing  
  _Rationale:_ Copying does not delete the source alignment.
- D. The corridor volumes become more accurate  
  _Rationale:_ Static linework has no effect on corridor volume accuracy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
