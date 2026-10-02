# Design for Manufacturing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1810` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-DM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Design for Manufacturing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. DFM foundations
2. Material and process selection
3. Design for assembly
4. Tolerances and variation
5. DFM for specific processes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate redesigning a part in CAD or making a prototype; hands-on practice belongs in a tool or workshop.

## Modules

### M01 DFM foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain why most cost is locked in at design; (2) Identify a feature that raises manufacturing cost
- Common misconception addressed: Believing manufacturing cost is decided on the shop floor, not in design
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why design for manufacturing | 96 | 8 |
| M01L02 | Cost committed in design | 96 | 8 |

### M02 Material and process selection (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Select a process for a given geometry and volume; (2) Match a material to a requirement
- Common misconception addressed: Choosing a process without considering production volume
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Matching material to function | 96 | 8 |
| M02L02 | Choosing a manufacturing process | 96 | 8 |

### M03 Design for assembly (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Reduce part count in an assembly; (2) Add a feature to prevent mis-assembly
- Common misconception addressed: Adding fasteners and parts that could be eliminated
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | DFA principles and part-count reduction | 96 | 8 |
| M03L02 | Error-proofing assembly | 96 | 8 |

### M04 Tolerances and variation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Loosen a tolerance where function allows; (2) Analyse a simple tolerance stack-up
- Common misconception addressed: Specifying tight tolerances everywhere 'to be safe'
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Tolerance and cost trade-off | 96 | 8 |
| M04L02 | Tolerance stack-up | 96 | 8 |

### M05 DFM for specific processes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply draft and uniform walls for moulding; (2) Apply bend and relief rules for sheet metal
- Common misconception addressed: Designing moulded parts with thick, non-uniform walls
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | DFM for machining and moulding | 96 | 8 |
| M05L02 | DFM for sheet metal and additive | 96 | 8 |

## Integrative case

A new product is too expensive and slow to assemble. The learner must show where cost is committed, reselect materials and processes for the volume, cut part count with DFA, relax non-critical tolerances and check a stack-up, and apply process-specific DFM rules, then recommend a redesign that lowers cost without hurting function.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1810-final-protected | 25 | 25 | yes |
| MST-1810-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| DFM foundations | 5 |
| Material and process selection | 5 |
| Design for assembly | 5 |
| Tolerances and variation | 5 |
| DFM for specific processes | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1810-Q0001** (single-answer, Select ONE) Most of a product's lifecycle cost is typically:

- A. Committed during the design phase **(key)**  
  _Rationale:_ Correct: design decisions lock in the majority of eventual cost.
- B. Determined only once production starts  
  _Rationale:_ Production reveals cost, but design commits it.
- C. Set by the marketing budget  
  _Rationale:_ Marketing does not commit manufacturing cost.
- D. Equal to the raw-material price alone  
  _Rationale:_ Material is only part of the committed cost.

**MST-1810-Q0002** (multiple-answer, Select TWO) Which TWO are core DFA strategies? (Select TWO.)

- A. Reduce the total number of parts **(key)**  
  _Rationale:_ Correct: fewer parts cut assembly time and cost.
- B. Design parts so they can only be assembled the correct way **(key)**  
  _Rationale:_ Correct: error-proofing prevents costly mis-assembly.
- C. Add extra fasteners for reassurance  
  _Rationale:_ Extra fasteners increase assembly cost and time.
- D. Require special tools for every joint  
  _Rationale:_ Special tools raise assembly difficulty and cost.

**MST-1810-Q0003** (single-answer, Select ONE) Specifying tighter tolerances than necessary tends to:

- A. Increase manufacturing cost without improving function **(key)**  
  _Rationale:_ Correct: unnecessary tight tolerances raise cost for no functional gain.
- B. Always reduce manufacturing cost  
  _Rationale:_ Tighter tolerances generally cost more, not less.
- C. Have no effect on cost at all  
  _Rationale:_ Tolerances have a strong effect on process cost.
- D. Guarantee the part will never fail  
  _Rationale:_ Tolerance alone does not guarantee against all failure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
