# Fusion: Product Design and Manufacturing Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1156` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the integrated design-to-manufacture workflow in Fusion
2. Create robust parametric sketches and solid models
3. Build assemblies with joints and check motion and interference
4. Produce manufacturing drawings with dimensions and tolerances
5. Prepare a model for manufacturing output such as CAM or additive

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Fusion foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a design task across modelling, assembly and manufacture workspaces; (2) Set up a parameter table to drive key dimensions
- Common misconception addressed: Modelling fixed numbers instead of parameters and losing design intent
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The integrated workspace and data model | 96 | 8 |
| M01L02 | Design intent and parameters | 96 | 8 |

### M02 Parametric modelling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Create a fully-constrained sketch for a bracket profile; (2) Edit an earlier timeline feature and update the model
- Common misconception addressed: Leaving sketches under-constrained so edits move geometry unpredictably
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sketching for robust models | 96 | 8 |
| M02L02 | Solid features and the timeline | 96 | 8 |

### M03 Assemblies and motion (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assemble parts using appropriate joint types; (2) Run an interference check and a motion study on a mechanism
- Common misconception addressed: Using rigid grounding everywhere and losing the ability to test motion
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Components and joints | 96 | 8 |
| M03L02 | Interference and motion checks | 96 | 8 |

### M04 Manufacturing drawings (MASTEMY-DESIGN 20%)

- Worked applications: (1) Produce a drawing with the views needed to make the part; (2) Apply tolerances to a mating dimension
- Common misconception addressed: Dimensioning a drawing without the tolerances manufacturing needs
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Drawing views and dimensioning | 96 | 8 |
| M04L02 | Tolerances and annotation | 96 | 8 |

### M05 Preparing for manufacture (MASTEMY-DESIGN 20%)

- Worked applications: (1) Adjust a feature for a manufacturing-process constraint; (2) Set up a model for a CAM or additive output
- Common misconception addressed: Treating any model as ready to manufacture without process checks
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Design for the chosen process | 96 | 8 |
| M05L02 | Manufacturing output workflows | 96 | 8 |

## Integrative case

A product designer models a small mechanical bracket assembly in Fusion. Build parametric parts driven by a parameter table, assemble them with joints and check for interference, produce a dimensioned manufacturing drawing, and prepare one part for a manufacturing process, keeping the design editable throughout.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1156-final-protected | 25 | 25 | yes |
| MST-1156-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Fusion foundations | 5 |
| Parametric modelling | 5 |
| Assemblies and motion | 5 |
| Manufacturing drawings | 5 |
| Preparing for manufacture | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1156-Q0001** (single-answer, Select ONE) A sketch for a bracket profile is left under-constrained. When a colleague edits a dimension upstream, the profile geometry shifts in an unexpected way. What is the lesson?

- A. Fully constraining sketches preserves design intent so edits behave predictably  **(key)**  
  _Rationale:_ Correct: a fully constrained sketch locks geometry so parametric edits update as intended.
- B. Sketches should always be left under-constrained for flexibility  
  _Rationale:_ Under-constrained sketches move unpredictably; that is the problem here.
- C. Dimensions should never be edited after sketching  
  _Rationale:_ Editing dimensions is normal; the fix is constraining the sketch.
- D. The part must be remodelled from scratch each time  
  _Rationale:_ Remodelling defeats the purpose of a parametric workflow.

**MST-1156-Q0002** (multiple-answer, Select TWO) Which TWO are advantages of driving a model from a parameter table? (Select TWO.)

- A. Key dimensions can be changed in one place and propagate through the model  **(key)**  
  _Rationale:_ Correct: central parameters make coordinated edits fast and consistent.
- B. Design intent and relationships between dimensions are captured explicitly  **(key)**  
  _Rationale:_ Correct: parameters record the relationships the designer intends.
- C. It prevents the model from ever being edited  
  _Rationale:_ Parameters make editing easier, not impossible.
- D. It removes the need for any sketch constraints  
  _Rationale:_ Sketch constraints are still needed for robust geometry.

**MST-1156-Q0003** (single-answer, Select ONE) A manufacturing drawing dimensions a shaft-and-hole mating pair but shows no tolerances. Why is this a problem for manufacture?

- A. Without tolerances the shop cannot know the allowable variation for a proper fit  **(key)**  
  _Rationale:_ Correct: tolerances define the permitted variation needed to achieve the intended fit.
- B. Tolerances are only decorative and never affect fit  
  _Rationale:_ Tolerances directly control whether mating parts fit.
- C. A drawing should never include tolerances  
  _Rationale:_ Manufacturing drawings require tolerances on controlled dimensions.
- D. The part cannot have mating features  
  _Rationale:_ Mating features are common; they specifically need tolerances.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
