# SolidWorks: Mechanical Design Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1155` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Dassault Systemes (no affiliation or endorsement) |
| Exam code | CSWA |
| Version basis | exam code CSWA reported; domain weights DESIGN ASSUMPTION (official blueprint not retrieved) |
| Evidence | **unverified-needs-official-check** - sources: SRC-DASSAULT-1155 (vendor site EGRESS_BLOCKED this session) |
| Legacy IDs | MST-ENG-DS-CSWA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Design-assumption note: no official exam code, domain names/weights, length or question count were available (vendor site EGRESS_BLOCKED). Module structure, weights and form lengths are DESIGN ASSUMPTIONS to be replaced at blueprint review.

## Learning outcomes

1. Create sketches with geometry and dimensional/geometric relations
2. Build parts with extrude, revolve and other features
3. Assemble parts with mates and manage assembly structure
4. Produce drawings with views, dimensions and a bill of materials

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only. Any official item formats that are not reproducible as MCQ/MR (for example hands-on software tasks or performance-based items) are out of scope for the certificate and are listed in the exam-version record.

## Modules

### M01 Sketching and Relations (30%, DESIGN ASSUMPTION)

- Worked applications: (1) Fully define a sketch with relations and dimensions; (2) Fix an under-defined sketch (shown blue)
- Common misconception addressed: Leaving sketches under-defined and relying on dragging geometry.
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sketch entities and planes | 120 | 8 |
| M01L02 | Geometric relations | 120 | 8 |
| M01L03 | Dimensioning and defining sketches | 120 | 8 |
| M01L04 | Sketch tools and patterns | 120 | 8 |

### M02 Part Features (35%, DESIGN ASSUMPTION)

- Worked applications: (1) Model a part using extrude and fillet features; (2) Reorder/edit a feature to change a design
- Common misconception addressed: Treating the feature tree order as unimportant to the result.
- Module check: 44 items / 44 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Extrude, revolve and cut features | 120 | 8 |
| M02L02 | Fillets, chamfers and holes | 120 | 8 |
| M02L03 | Patterns and mirrors | 120 | 8 |
| M02L04 | Editing the feature tree | 120 | 8 |

### M03 Assemblies and Drawings (35%, DESIGN ASSUMPTION)

- Worked applications: (1) Mate two parts with concentric and coincident mates; (2) Create a drawing with views, dimensions and a BOM
- Common misconception addressed: Over-constraining an assembly so it cannot move as intended.
- Module check: 44 items / 44 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Inserting components and mates | 120 | 8 |
| M03L02 | Assembly structure and motion | 120 | 8 |
| M03L03 | Drawing views and sections | 120 | 8 |
| M03L04 | Dimensions, annotations and BOM | 120 | 8 |

## Integrative case

A simple bracket-and-pin assembly must be modelled from sketches, mated into an assembly, and documented in a drawing with views and a BOM.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam length/question count NOT retrieved (vendor site EGRESS_BLOCKED). Form set to 67 items / 67 min to fit the cumulative budget; replace when confirmed.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1155-practice-form-A | 67 | 67 | yes |
| MST-1155-practice-form-B | 67 | 67 | no (optional practice) |
| MST-1155-practice-form-C | 67 | 67 | no (optional practice) |
| MST-1155-final-protected | 67 | 67 | yes |

| Domain (DESIGN ASSUMPTION) | Items per form |
|---|---|
| Sketching and Relations | 20 |
| Part Features | 23 |
| Assemblies and Drawings | 24 |

Minimum reviewed item bank: 712 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1155-Q0001** (single-answer, Select ONE) A sketch shows blue entities that move when dragged. What does this indicate?

- A. The sketch is under-defined **(key)**  
  _Rationale:_ Correct: blue, draggable geometry means the sketch lacks relations/dimensions to fully define it.
- B. The sketch is fully defined  
  _Rationale:_ A fully defined sketch is typically black and does not drag.
- C. The sketch is over-defined  
  _Rationale:_ Over-defined sketches report conflicts, usually in a different colour.
- D. The part has failed to rebuild  
  _Rationale:_ Rebuild failures are reported separately, not by blue sketch colour.

**MST-1155-Q0002** (single-answer, Select ONE) Which mate makes two cylindrical faces share the same axis?

- A. Concentric mate **(key)**  
  _Rationale:_ Correct: a concentric mate aligns cylindrical faces to a common axis.
- B. Coincident mate  
  _Rationale:_ Coincident aligns points/faces to be touching/coplanar, not axis-sharing.
- C. Parallel mate  
  _Rationale:_ Parallel keeps entities parallel but not coaxial.
- D. Distance mate  
  _Rationale:_ Distance sets an offset, not a shared axis.

**MST-1155-Q0003** (multiple-answer, Select TWO) Which TWO belong in a production drawing of a part?

- A. Orthographic and section views **(key)**  
  _Rationale:_ Correct: standard views communicate geometry.
- B. Dimensions and tolerances **(key)**  
  _Rationale:_ Correct: dimensions/tolerances define the part for manufacture.
- C. The sketch's under-defined relations list  
  _Rationale:_ That is a modelling detail, not drawing content.
- D. The assembly mate error log  
  _Rationale:_ Mate logs are not part of a part drawing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
