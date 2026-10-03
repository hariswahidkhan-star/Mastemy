# Analytical Chemistry: Measurement, Spectroscopy and AI for Data Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2008` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Analytical Chemistry: Measurement, Spectroscopy and AI for Data Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply sampling, calibration and quality-control principles
2. Quantify error, precision and measurement uncertainty
3. Select and interpret chromatographic separations
4. Interpret common spectroscopic and spectrometric methods
5. Design a fit-for-purpose analytical method
6. Use AI and chemometrics for analytical data interpretation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Analytical foundations (17% (design weight), design weight)

- Worked applications: (1) Build a calibration curve and report the analyte concentration; (2) Design a QC scheme for a routine assay
- Common misconception addressed: Reporting a result with more significant figures than justified
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sampling, calibration and standards | 81 | 5 |
| M01L02 | Quality control and method validation | 82 | 5 |

### M02 Error and statistics (17% (design weight), design weight)

- Worked applications: (1) Compute a confidence interval for replicate measurements; (2) Combine uncertainties from two measurement steps
- Common misconception addressed: Confusing precision with accuracy when judging a method
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Precision, accuracy and significant figures | 81 | 5 |
| M02L02 | Uncertainty and confidence intervals | 82 | 5 |

### M03 Separation science (17% (design weight), design weight)

- Worked applications: (1) Choose GC or HPLC for a given analyte and matrix; (2) Interpret a chromatogram for resolution and tailing
- Common misconception addressed: Assuming a sharp peak always means good quantitation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Principles of chromatography | 81 | 5 |
| M03L02 | GC and HPLC method selection | 82 | 5 |

### M04 Spectroscopic methods (17% (design weight), design weight)

- Worked applications: (1) Match an IR spectrum to functional groups present; (2) Deduce composition from a mass spectrum
- Common misconception addressed: Reading an isotope pattern as separate compounds
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | UV-visible and IR spectroscopy | 81 | 5 |
| M04L02 | Atomic and mass spectrometry | 82 | 5 |

### M05 Method design (16% (design weight), design weight)

- Worked applications: (1) Estimate the limit of detection from blank data; (2) Specify validation parameters for a new method
- Common misconception addressed: Treating the lowest standard as the limit of detection
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Selecting a method for an analyte | 77 | 5 |
| M05L02 | Limits of detection and quantification | 77 | 5 |

### M06 AI and chemometrics (16% (design weight), design weight)

- Worked applications: (1) Fit a multivariate calibration and test it on held-out data; (2) Detect overfitting in a chemometric model
- Common misconception addressed: Judging a chemometric model only on its training-set fit
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Multivariate calibration and classification | 77 | 5 |
| M06L02 | Model validation and overfitting risks | 77 | 5 |

## Integrative case

A pharmaceutical QC lab validates an impurity assay: analysts must build calibration curves and report uncertainty by hand, choose and interpret a chromatographic separation, then apply a chemometric model and show it is validated rather than overfit.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2008-final-protected | 40 | 40 | yes |
| MST-2008-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Analytical foundations | 7 |
| Error and statistics | 7 |
| Separation science | 7 |
| Spectroscopic methods | 7 |
| Method design | 6 |
| AI and chemometrics | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2008-Q0001** (single-answer, Select ONE) A method is very precise but consistently reads 5% high. How is it best described?

- A. Precise but biased, so it is inaccurate until the systematic error is corrected **(key)**  
  _Rationale:_ Correct: precision without accuracy indicates systematic bias.
- B. Both precise and accurate  
  _Rationale:_ A consistent 5% offset means it is not accurate.
- C. Imprecise and inaccurate  
  _Rationale:_ Consistent readings indicate good precision.
- D. Accurate but imprecise  
  _Rationale:_ A fixed offset is a bias, not random scatter.

**MST-2008-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce the risk of an overfit chemometric model? (Select TWO.)

- A. Validating on an independent held-out data set **(key)**  
  _Rationale:_ Correct: held-out validation reveals poor generalisation.
- B. Limiting model complexity relative to the number of samples **(key)**  
  _Rationale:_ Correct: fewer free parameters reduce overfitting.
- C. Maximising the training-set fit at all costs  
  _Rationale:_ Chasing training fit increases overfitting.
- D. Using every available wavelength without selection  
  _Rationale:_ Unselected high-dimensional inputs worsen overfitting.

**MST-2008-Q0003** (single-answer, Select ONE) Why report a measurement with its uncertainty rather than a single number?

- A. It communicates the range within which the true value plausibly lies **(key)**  
  _Rationale:_ Correct: uncertainty conveys confidence in the result.
- B. Uncertainty makes the result look less reliable for no reason  
  _Rationale:_ Stating uncertainty is good practice, not a weakness.
- C. A single number is always sufficient  
  _Rationale:_ Without uncertainty the result cannot be judged fit for purpose.
- D. Uncertainty only matters in theory  
  _Rationale:_ It is essential for real decisions on data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
