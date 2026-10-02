# Engineering Drawing Interpretation and Technical Documentation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1157` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Read orthographic and isometric views and reconstruct the part they describe
2. Interpret dimensions, tolerances and GD&T callouts on a drawing
3. Apply title-block, revision and drawing-standard conventions correctly
4. Interpret assembly drawings, BOMs and section views
5. Manage drawing documentation, revisions and controlled distribution

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Reading engineering drawings (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reconstruct a 3D part from three orthographic views; (2) Identify a cutting plane and read the resulting section view
- Common misconception addressed: Confusing first-angle and third-angle projection symbols
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Projection systems: first- and third-angle orthographic views | 96 | 8 |
| M01L02 | Isometric, section and detail views | 96 | 8 |

### M02 Dimensions and tolerances (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute the maximum and minimum clearance for a stated hole/shaft fit; (2) Decide whether a measured feature is in or out of tolerance
- Common misconception addressed: Treating a nominal dimension as the only acceptable value
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Dimensioning conventions and datums | 96 | 8 |
| M02L02 | Limits, fits and surface finish | 96 | 8 |

### M03 Geometric dimensioning and tolerancing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a position-tolerance callout and its bonus tolerance at MMC; (2) Read a feature-control frame and name its datum references
- Common misconception addressed: Reading GD&T tolerance zones as if they were plus/minus dimensions
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | GD&T symbols and the feature-control frame | 96 | 8 |
| M03L02 | Datums, position and runout in practice | 96 | 8 |

### M04 Assemblies and bills of materials (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace a fastener from an assembly balloon to its BOM line and part number; (2) Reconcile a BOM quantity against the components shown on the drawing
- Common misconception addressed: Assuming the BOM and the drawing are automatically in sync
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Assembly, exploded and sub-assembly drawings | 96 | 8 |
| M04L02 | Bills of materials and part numbering | 96 | 8 |

### M05 Documentation and revision control (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a revision block to find what changed between two issues; (2) Decide which drawing revision is the controlled, released version
- Common misconception addressed: Working from an uncontrolled or superseded print
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Title blocks, standards and drawing numbering | 96 | 8 |
| M05L02 | Revisions, ECOs and controlled distribution | 96 | 8 |

## Integrative case

A manufacturing engineer receives a revised bracket drawing set for a late design change. Reconstruct the part from its views, check two toleranced features and a GD&T callout, confirm the BOM matches the assembly, identify the controlled revision, and brief the shop on exactly what changed and what to remake.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1157-final-protected | 25 | 25 | yes |
| MST-1157-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Reading engineering drawings | 5 |
| Dimensions and tolerances | 5 |
| Geometric dimensioning and tolerancing | 5 |
| Assemblies and bills of materials | 5 |
| Documentation and revision control | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1157-Q0001** (single-answer, Select ONE) A drawing's title block shows the first-angle projection symbol. In first-angle projection, where is the right-side view placed relative to the front view?

- A. To the left of the front view **(key)**  
  _Rationale:_ Correct: in first-angle, views project through the object onto the far plane, so the right-side view appears on the left.
- B. To the right of the front view  
  _Rationale:_ That placement is the third-angle convention, not first-angle.
- C. Directly above the front view  
  _Rationale:_ Above the front view is where the top view sits, not the side view.
- D. Overlaid on the front view  
  _Rationale:_ Views are drawn separately in their projected positions, never overlaid.

**MST-1157-Q0002** (multiple-answer, Select TWO) A hole is dimensioned 20.0 +0.1/-0.0 mm and the mating shaft 20.0 +0.0/-0.1 mm. Which TWO statements are correct? (Select TWO.)

- A. The maximum clearance is 0.2 mm **(key)**  
  _Rationale:_ Correct: largest hole 20.1 minus smallest shaft 19.9 gives 0.2 mm.
- B. The minimum clearance is 0.0 mm **(key)**  
  _Rationale:_ Correct: smallest hole 20.0 minus largest shaft 20.0 gives 0.0 mm, a line-to-line fit.
- C. The fit can be an interference fit  
  _Rationale:_ The shaft is never larger than the hole, so interference cannot occur.
- D. The maximum clearance is 0.1 mm  
  _Rationale:_ This ignores that both parts vary; the true maximum clearance is 0.2 mm.

**MST-1157-Q0003** (single-answer, Select ONE) A feature-control frame reads a position tolerance of 0.25 mm at maximum material condition (MMC). What does the MMC modifier allow?

- A. Additional bonus tolerance as the feature departs from MMC **(key)**  
  _Rationale:_ Correct: at MMC the stated zone applies, and bonus tolerance is gained as the feature's size moves toward LMC.
- B. A tighter tolerance as the feature departs from MMC  
  _Rationale:_ The effect is the opposite: tolerance grows, it does not tighten.
- C. That the datum may be ignored  
  _Rationale:_ Datums in the frame still apply; MMC does not remove them.
- D. That the feature need not be inspected  
  _Rationale:_ The feature is still inspected against the position requirement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
