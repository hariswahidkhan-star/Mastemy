# Data Quality Engineering and Observability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0964` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Data Quality Engineering and Observability (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define data quality dimensions and distinguish quality from observability
2. Design validation tests and reconciliation checks for datasets
3. Implement freshness, volume and schema observability with lineage-aware impact analysis
4. Run data-quality incident response and prevention using contracts and metrics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Data quality foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Classify five defects by quality dimension; (2) Assign an owner and SLA to a critical dataset
- Common misconception addressed: Treating data quality as a one-off cleanup project rather than an ongoing practice
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Dimensions of quality: accuracy, completeness, timeliness | 120 | 6 |
| M01L02 | Data quality versus data observability | 120 | 6 |
| M01L03 | Cost of poor quality | 120 | 6 |
| M01L04 | Roles, ownership and SLAs | 120 | 6 |

### M02 Validation and testing (25%, MASTEMY-DESIGN)

- Worked applications: (1) Write assertions for not-null, uniqueness and referential integrity; (2) Reconcile source and target counts and explain a mismatch
- Common misconception addressed: Checking only schema while ignoring value-level and distribution defects
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Declarative data tests and assertions | 120 | 6 |
| M02L02 | Schema and constraint checks | 120 | 6 |
| M02L03 | Statistical and distribution checks | 120 | 6 |
| M02L04 | Reconciliation and row-count checks | 120 | 6 |

### M03 Observability and monitoring (25%, MASTEMY-DESIGN)

- Worked applications: (1) Set a freshness monitor and a volume anomaly threshold; (2) Use lineage to find every downstream report affected by a bad column
- Common misconception addressed: Alerting on every minor fluctuation and training people to ignore alerts
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Freshness, volume and schema monitors | 120 | 6 |
| M03L02 | Anomaly detection basics | 120 | 6 |
| M03L03 | Lineage for impact analysis | 120 | 6 |
| M03L04 | Alerting without alert fatigue | 120 | 6 |

### M04 Incident response and improvement (25%, MASTEMY-DESIGN)

- Worked applications: (1) Triage a quality incident and assign a severity with justification; (2) Propose a data contract that prevents a recurring upstream break
- Common misconception addressed: Fixing symptoms repeatedly instead of the upstream root cause
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Triage and severity | 120 | 6 |
| M04L02 | Root-cause analysis | 120 | 6 |
| M04L03 | Data contracts and prevention | 120 | 6 |
| M04L04 | Metrics, scorecards and continuous improvement | 120 | 6 |

## Integrative case

A revenue dashboard quietly showed wrong numbers for a week before anyone noticed. Stand up quality tests, observability monitors and a data contract so the next break is caught in minutes, and defend the alerting thresholds against fatigue.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0964-final-protected | 144 | 144 | yes |
| MST-0964-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Data quality foundations | 36 |
| Validation and testing | 36 |
| Observability and monitoring | 36 |
| Incident response and improvement | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0964-Q0001** (single-answer, Select ONE) A dataset is accurate but arrives six hours late every day, breaking morning reports. Which data quality dimension is failing?

- A. Timeliness **(key)**  
  _Rationale:_ Correct: the data is correct but not available when needed, which is a timeliness failure.
- B. Accuracy  
  _Rationale:_ The values are correct, so accuracy is not the failing dimension.
- C. Uniqueness  
  _Rationale:_ Nothing indicates duplicate records.
- D. Completeness  
  _Rationale:_ No rows or fields are described as missing.

**MST-0964-Q0002** (single-answer, Select ONE) What does data lineage most directly enable during a quality incident?

- A. Impact analysis of which downstream assets are affected by a bad source **(key)**  
  _Rationale:_ Correct: lineage maps dependencies so you can trace a defect to every affected downstream asset.
- B. Automatic correction of the bad values  
  _Rationale:_ Lineage shows relationships; it does not fix values.
- C. Faster hardware for the warehouse  
  _Rationale:_ Lineage is metadata, unrelated to compute capacity.
- D. Encryption of sensitive columns  
  _Rationale:_ Encryption is a security control, not lineage.

**MST-0964-Q0003** (multiple-answer, Select TWO) Which TWO checks are value-level data quality tests rather than schema-only checks? (Select TWO)

- A. A not-null assertion on a required column **(key)**  
  _Rationale:_ Correct: not-null validates actual values, catching missing data the schema may still allow.
- B. A distribution check that flags an unexpected spike in nulls or outliers **(key)**  
  _Rationale:_ Correct: distribution checks examine the data's statistical shape, a value-level concern.
- C. Confirming the column exists with the declared data type  
  _Rationale:_ That is a schema check, not a value-level test.
- D. Verifying the table name matches the catalog  
  _Rationale:_ That is metadata/schema validation, not a value-level check.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
