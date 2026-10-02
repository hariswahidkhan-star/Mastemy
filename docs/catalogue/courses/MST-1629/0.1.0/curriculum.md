# Geospatial Data Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1629` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-GDA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe geospatial data types, formats and coordinate systems
2. Perform spatial joins, buffers and overlays conceptually
3. Analyse spatial patterns, clustering and autocorrelation
4. Design clear, honest thematic maps
5. Recognise geospatial pitfalls such as projection and aggregation effects

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Geospatial foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose vector or raster for three described datasets; (2) Explain why mixing two coordinate systems misaligns layers
- Common misconception addressed: Assuming all latitude/longitude data shares one coordinate system
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Vector, raster and common formats | 96 | 8 |
| M01L02 | Coordinate reference systems and projections | 96 | 8 |

### M02 Spatial operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe a spatial join to count points within each polygon; (2) Use a buffer to find assets within 500 metres of a site
- Common misconception addressed: Computing distance in degrees instead of a projected metric unit
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Spatial joins and relationships | 96 | 8 |
| M02L02 | Buffers, overlays and distance | 96 | 8 |

### M03 Spatial analysis (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a kernel-density map of incident locations; (2) Explain what positive spatial autocorrelation implies for a map
- Common misconception addressed: Treating nearby observations as independent samples
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Point patterns, density and clustering | 96 | 8 |
| M03L02 | Spatial autocorrelation and hot-spot analysis | 96 | 8 |

### M04 Thematic mapping (MASTEMY-DESIGN 20%)

- Worked applications: (1) Normalise counts to a rate before mapping and explain why; (2) Pick a classification scheme and defend the number of classes
- Common misconception addressed: Mapping raw counts that just mirror population size
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Choropleths, classification and normalisation | 96 | 8 |
| M04L02 | Colour, legends and honest map design | 96 | 8 |

### M05 Pitfalls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Show how changing boundaries changes an aggregated result; (2) Spot an ecological-fallacy claim in a regional statistic
- Common misconception addressed: Inferring individual behaviour from area-level averages
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The modifiable areal unit problem | 96 | 8 |
| M05L02 | Ecological fallacy and projection distortion | 96 | 8 |

## Integrative case

A city analyst must recommend where to place new service points. Align all layers to one projection, use spatial joins and buffers to assess coverage gaps, map demand as a normalised rate rather than raw counts, check for clustering, and flag how the chosen area boundaries (MAUP) could change the recommendation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1629-final-protected | 25 | 25 | yes |
| MST-1629-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Geospatial foundations | 5 |
| Spatial operations | 5 |
| Spatial analysis | 5 |
| Thematic mapping | 5 |
| Pitfalls | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1629-Q0001** (single-answer, Select ONE) Why should a choropleth usually map a rate rather than a raw count?

- A. Raw counts largely track population size and can mislead; rates normalise for it **(key)**  
  _Rationale:_ Correct: normalising to a rate removes the population-size artefact.
- B. Rates are always smaller numbers  
  _Rationale:_ Magnitude is not the reason; comparability is.
- C. Counts cannot be mapped at all  
  _Rationale:_ Counts can be mapped but often mislead on a choropleth.
- D. Colour only works with rates  
  _Rationale:_ Colour works for either; the issue is interpretation.

**MST-1629-Q0002** (multiple-answer, Select TWO) Which TWO statements about coordinate reference systems are correct? (Select TWO.)

- A. Layers must share a coordinate system to align correctly **(key)**  
  _Rationale:_ Correct: mismatched systems misregister the layers.
- B. Distances should be measured in a projected metric system, not raw degrees **(key)**  
  _Rationale:_ Correct: degrees are not a constant distance unit.
- C. All projections preserve area, shape and distance at once  
  _Rationale:_ No single projection preserves all properties simultaneously.
- D. Projection choice never affects analysis  
  _Rationale:_ Projection affects measurement and appearance.

**MST-1629-Q0003** (single-answer, Select ONE) A report concludes individuals in high-income regions all buy a product, from region-level averages. What error is this?

- A. The ecological fallacy: inferring individual behaviour from area averages **(key)**  
  _Rationale:_ Correct: area-level patterns need not hold for individuals.
- B. Spatial autocorrelation  
  _Rationale:_ Autocorrelation describes similarity of nearby values, not this inference error.
- C. A projection error  
  _Rationale:_ The error is about aggregation, not projection.
- D. A valid individual-level conclusion  
  _Rationale:_ It is not valid; it commits the ecological fallacy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
