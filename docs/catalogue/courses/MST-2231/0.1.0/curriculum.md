# CAD and 3D Modeling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2231` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Engineering standards, tool specifics and formulae must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — CAD and 3D Modeling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain parametric, feature-based modelling and design intent
2. Create robust sketches with constraints and dimensions
3. Build solid parts with extrude, revolve, sweep and loft features
4. Assemble parts with mates and detect interference
5. Produce drawings and model-based definition with tolerances
6. Prepare models for manufacturing and 3D printing, managing file formats

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Modelling fundamentals and design intent (25% (Mastemy design weight), design weight)

- Worked applications: (1) Rebuild a part to survive a dimension change without breaking; (2) Capture design intent so a bolt hole follows a moved edge
- Common misconception addressed: Modelling fixed numbers instead of relationships, so edits break the part
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Parametric, feature-based modelling | 120 | 7 |
| M01L02 | Sketching with constraints and dimensions | 120 | 7 |

### M02 Building solid parts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Model a bracket with an extrude and a mirrored pattern; (2) Add fillets in the right order to avoid rebuild errors
- Common misconception addressed: Applying fillets too early so later features fail
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Extrude, revolve and primitive features | 120 | 7 |
| M02L02 | Sweep, loft, fillets and patterns | 120 | 7 |

### M03 Assemblies and relationships (25% (Mastemy design weight), design weight)

- Worked applications: (1) Mate three parts and remove all unwanted degrees of freedom; (2) Run an interference check and fix an overlap
- Common misconception addressed: Over-constraining an assembly so it cannot update
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mates, degrees of freedom and interference | 120 | 7 |
| M03L02 | Managing large assemblies and references | 120 | 7 |

### M04 Documentation and output (25% (Mastemy design weight), design weight)

- Worked applications: (1) Create a dimensioned drawing with a section view; (2) Export a watertight STL at a suitable resolution for printing
- Common misconception addressed: Exporting a low-resolution mesh that loses critical features
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Drawings, views and tolerancing | 120 | 7 |
| M04L02 | Export, mesh prep and 3D printing | 120 | 7 |

## Integrative case

A product team models a two-part enclosure for a circuit board: build parametric parts, assemble them with snap-fit mates, check for interference, and export both a toleranced drawing and a print-ready STL.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2231-final-protected | 40 | 40 | yes |
| MST-2231-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Modelling fundamentals and design intent | 10 |
| Building solid parts | 10 |
| Assemblies and relationships | 10 |
| Documentation and output | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2231-Q0001** (single-answer, Select ONE) Why is capturing design intent important in parametric CAD?

- A. So the model updates predictably when dimensions or references change **(key)**  
  _Rationale:_ Correct: good design intent makes edits propagate the way the designer expects.
- B. So the file renders in more colours  
  _Rationale:_ Rendering colour is unrelated to design intent.
- C. So the model uses less disk space  
  _Rationale:_ Design intent is about editability, not file size.
- D. So the part cannot be edited at all  
  _Rationale:_ The point is controlled editability, not locking the model.

**MST-2231-Q0002** (multiple-answer, Select TWO) Which TWO practices make a sketch robust and fully defined? (Select TWO.)

- A. Add geometric constraints such as coincident and parallel **(key)**  
  _Rationale:_ Correct: constraints remove unwanted degrees of freedom.
- B. Dimension the sketch so nothing is left under-defined **(key)**  
  _Rationale:_ Correct: a fully dimensioned sketch resolves to a single geometry.
- C. Leave entities unconstrained for flexibility  
  _Rationale:_ Under-defined sketches shift unpredictably on edits.
- D. Delete all reference geometry  
  _Rationale:_ Removing references does not make a sketch robust; it often breaks it.

**MST-2231-Q0003** (single-answer, Select ONE) An assembly fails to update after you add a mate. What is the most likely cause?

- A. The assembly is over-constrained with conflicting mates **(key)**  
  _Rationale:_ Correct: conflicting mates leave the solver no valid position.
- B. The parts are too colourful  
  _Rationale:_ Appearance does not affect mate solving.
- C. The drawing sheet is the wrong size  
  _Rationale:_ Sheet size is a documentation setting, not a mate constraint.
- D. The STL export resolution is too high  
  _Rationale:_ Export settings do not drive assembly mates.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
