# Claude for Data Cleaning and Analytical Reporting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0525` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-DATA-REPORTING |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude for Data Cleaning and Analytical Reporting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Profile a dataset and judge what questions it can answer
2. Clean data transparently with documented, defensible decisions
3. Compute metrics with explicit, consistent definitions
4. Verify computed results with independent cross-checks
5. Report analytical results honestly with assumptions and limits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Understanding the data (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Profile a dataset for structure, types and obvious issues; (2) Decide which questions the data can and cannot answer
- Common misconception addressed: Analysing a dataset before checking what it actually contains
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Profiling a dataset | 72 | 5 |
| M01L02 | What the data can and cannot answer | 72 | 5 |

### M02 Cleaning transparently (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Document each cleaning decision and its effect; (2) Handle missing values with a stated, defensible rule
- Common misconception addressed: Silently dropping rows so the numbers look better
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Documenting cleaning decisions | 96 | 5 |
| M02L02 | Missing values and outliers | 96 | 5 |

### M03 Computing metrics (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compute a metric and state its exact definition; (2) Catch a metric that is defined inconsistently across the report
- Common misconception addressed: Reporting a metric without defining how it was computed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defining and computing metrics | 80 | 5 |
| M03L02 | Consistent definitions | 80 | 5 |
| M03L03 | Common aggregation errors | 80 | 5 |

### M04 Verifying results (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Cross-check a computed total against a known reference; (2) Build a sanity check that catches a wrong aggregation
- Common misconception addressed: Trusting a Claude-computed figure without an independent check
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cross-checking computed results | 96 | 5 |
| M04L02 | Sanity checks and reconciliation | 96 | 5 |

### M05 Reporting with limits (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a report that states its assumptions and limits; (2) Recommend action proportionate to the evidence
- Common misconception addressed: Presenting results as certain when the data is limited
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Writing a report with stated limits | 96 | 5 |
| M05L02 | Action proportionate to evidence | 96 | 5 |

## Integrative case

A business analyst uses Claude to clean a messy sales export and build a report: profile the data, fix quality issues transparently, compute the right metrics, verify results, and write a report that states its assumptions and limits.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0525-final-protected | 30 | 40 | yes |
| MST-0525-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Understanding the data | 5 |
| Cleaning transparently | 6 |
| Computing metrics | 7 |
| Verifying results | 6 |
| Reporting with limits | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0525-Q0001** (single-answer, Select ONE) Claude suggests dropping rows with missing values to 'clean up' a dataset. What is the professional concern?

- A. Silently dropping rows can bias results and should be documented and justified **(key)**  
  _Rationale:_ Correct: data removal must be transparent and defensible, not silent.
- B. Dropping rows always improves accuracy  
  _Rationale:_ It can introduce bias, not accuracy.
- C. Missing values cannot exist in exports  
  _Rationale:_ Missing values are common in real exports.
- D. Rows cannot be dropped  
  _Rationale:_ They can; the concern is transparency.

**MST-0525-Q0002** (multiple-answer, Select TWO) Which TWO practices make a computed metric trustworthy? (Select TWO.)

- A. Stating the metric's exact definition **(key)**  
  _Rationale:_ Correct: a metric without a definition cannot be trusted or compared.
- B. Cross-checking the result against a known reference **(key)**  
  _Rationale:_ Correct: independent checks catch computation errors.
- C. Changing the definition partway through the report  
  _Rationale:_ Inconsistent definitions mislead readers.
- D. Omitting how it was computed  
  _Rationale:_ Undocumented computation cannot be verified.

**MST-0525-Q0003** (single-answer, Select ONE) The dataset covers only one region, but the report draws a company-wide conclusion. What is wrong?

- A. The conclusion exceeds what the limited data supports **(key)**  
  _Rationale:_ Correct: claims must stay within the data's scope.
- B. The region is too small to name  
  _Rationale:_ Naming is not the issue.
- C. One region is always enough  
  _Rationale:_ It is not sufficient for a company-wide claim.
- D. Nothing is wrong  
  _Rationale:_ There is a real over-reach.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
