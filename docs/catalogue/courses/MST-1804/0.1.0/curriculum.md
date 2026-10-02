# Engineering Drawing and GD&T

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1804` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-EDGT-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Engineering Drawing and GD&T (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Engineering drawing basics
2. Dimensioning and tolerancing
3. GD&T fundamentals
4. Form, orientation and location
5. Drawing interpretation in practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate producing a drawing in CAD or inspecting a part; hands-on practice belongs in a tool or metrology lab.

## Modules

### M01 Engineering drawing basics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Interpret first- and third-angle views; (2) Identify a feature across multiple views
- Common misconception addressed: Confusing first-angle and third-angle projection symbols
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Lines, views and scales | 96 | 8 |
| M01L02 | Orthographic projection | 96 | 8 |

### M02 Dimensioning and tolerancing (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Read a dimension with a tolerance; (2) Determine a clearance or interference fit
- Common misconception addressed: Over-dimensioning a drawing, creating redundant or conflicting constraints
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Dimensioning practice | 96 | 8 |
| M02L02 | Limits, fits and tolerances | 96 | 8 |

### M03 GD&T fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify the datums in a feature control frame; (2) Read a position tolerance callout
- Common misconception addressed: Treating a datum reference as optional in a control frame
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Why GD&T and datums | 96 | 8 |
| M03L02 | Feature control frames | 96 | 8 |

### M04 Form, orientation and location (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Distinguish flatness from parallelism; (2) Interpret a true-position requirement
- Common misconception addressed: Confusing a form tolerance (no datum) with an orientation tolerance (needs a datum)
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Form and orientation tolerances | 96 | 8 |
| M04L02 | Location and runout | 96 | 8 |

### M05 Drawing interpretation in practice (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Interpret a surface-finish symbol; (2) Explain bonus tolerance under MMC
- Common misconception addressed: Ignoring the material condition modifier when reading a tolerance
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Surface finish and notes | 96 | 8 |
| M05L02 | Bonus tolerance and inspection | 96 | 8 |

## Integrative case

A machined part is being rejected despite 'passing' basic dimensions. The learner must interpret the orthographic views, read the dimensions and fits, decode the GD&T feature control frames and datums, apply form/orientation/location controls, and account for bonus tolerance under MMC, then decide whether the part truly conforms.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1804-final-protected | 25 | 25 | yes |
| MST-1804-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Engineering drawing basics | 5 |
| Dimensioning and tolerancing | 5 |
| GD&T fundamentals | 5 |
| Form, orientation and location | 5 |
| Drawing interpretation in practice | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1804-Q0001** (single-answer, Select ONE) A datum in GD&T provides:

- A. A reference from which other features are located and measured **(key)**  
  _Rationale:_ Correct: datums establish the coordinate reference for tolerances.
- B. The maximum weight of the part  
  _Rationale:_ Datums are geometric references, not weights.
- C. The surface finish requirement  
  _Rationale:_ Finish is specified separately.
- D. The material the part is made from  
  _Rationale:_ Material is noted elsewhere, not by a datum.

**MST-1804-Q0002** (multiple-answer, Select TWO) Which TWO tolerances require a datum reference? (Select TWO.)

- A. Parallelism **(key)**  
  _Rationale:_ Correct: orientation tolerances like parallelism are relative to a datum.
- B. Position **(key)**  
  _Rationale:_ Correct: location tolerances such as position reference datums.
- C. Flatness  
  _Rationale:_ Flatness is a form tolerance and needs no datum.
- D. Straightness  
  _Rationale:_ Straightness is a form tolerance and needs no datum.

**MST-1804-Q0003** (single-answer, Select ONE) Orthographic projection represents a 3-D object using:

- A. Multiple 2-D views projected at right angles **(key)**  
  _Rationale:_ Correct: orthographic views show the object from mutually perpendicular directions.
- B. A single perspective sketch  
  _Rationale:_ Perspective is not orthographic projection.
- C. An isometric drawing only  
  _Rationale:_ Isometric is a pictorial, not orthographic, view.
- D. A colour-coded photograph  
  _Rationale:_ Photographs are not engineering projections.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
