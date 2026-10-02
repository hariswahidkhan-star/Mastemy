# Business Intelligence Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1622` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-BIF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what business intelligence is and the value it delivers
2. Describe the BI stack from source systems to reporting
3. Distinguish metrics, dimensions, KPIs and semantic models
4. Design reports and dashboards that answer business questions
5. Recognise BI governance, data quality and adoption factors

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What BI is (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify four business questions by analytics type; (2) Map a reporting request to the decision it is meant to support
- Common misconception addressed: Treating BI as report production rather than decision support
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | BI, analytics and the decision-support value chain | 96 | 8 |
| M01L02 | Descriptive, diagnostic, predictive and prescriptive analytics | 96 | 8 |

### M02 The BI stack (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draw the path a sales figure takes from a source system to a dashboard tile; (2) Decide where a shared business definition should live in the stack
- Common misconception addressed: Assuming every report should query production transactional systems directly
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Source systems, ETL/ELT and the data warehouse | 96 | 8 |
| M02L02 | OLAP, semantic layers and reporting tools | 96 | 8 |

### M03 Metrics and models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a KPI with its formula, grain and owner; (2) Spot two reports that compute 'revenue' differently and reconcile them
- Common misconception addressed: Confusing a metric with a KPI tied to a target
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metrics, dimensions, grain and KPIs | 96 | 8 |
| M03L02 | Semantic models and a single source of truth | 96 | 8 |

### M04 Reports and dashboards (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose report vs dashboard vs alert for three stakeholder needs; (2) Redesign a cluttered dashboard around one primary question
- Common misconception addressed: Adding every metric to one dashboard instead of designing for a question
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Report types and the audience's question | 96 | 8 |
| M04L02 | Dashboard design and visual hierarchy | 96 | 8 |

### M05 Governance and adoption (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a governance rule for who can publish a certified dashboard; (2) Diagnose why a well-built dashboard is not being used
- Common misconception addressed: Believing a technically correct dashboard will be adopted automatically
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data quality, definitions and governance | 96 | 8 |
| M05L02 | Self-service, trust and driving adoption | 96 | 8 |

## Integrative case

A retail operations director asks for 'a dashboard to run the business'. Clarify the decisions it must support, define three KPIs with agreed formulas and owners, choose report versus dashboard versus alert for each audience, and propose governance so numbers are trusted and the tool is actually adopted.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1622-final-protected | 25 | 25 | yes |
| MST-1622-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What BI is | 5 |
| The BI stack | 5 |
| Metrics and models | 5 |
| Reports and dashboards | 5 |
| Governance and adoption | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1622-Q0001** (single-answer, Select ONE) A manager asks 'why did margin fall last quarter?'. Which analytics type does this request call for?

- A. Diagnostic analytics **(key)**  
  _Rationale:_ Correct: explaining why something happened is diagnostic.
- B. Descriptive analytics  
  _Rationale:_ Descriptive reports what happened, not why.
- C. Predictive analytics  
  _Rationale:_ Predictive forecasts the future, not past causes.
- D. Prescriptive analytics  
  _Rationale:_ Prescriptive recommends actions, not root causes.

**MST-1622-Q0002** (multiple-answer, Select TWO) Which TWO practices help ensure a trusted single source of truth for metrics? (Select TWO.)

- A. Define each metric once in a shared semantic layer **(key)**  
  _Rationale:_ Correct: a central definition prevents divergent calculations.
- B. Assign each KPI a named business owner **(key)**  
  _Rationale:_ Correct: clear ownership keeps definitions maintained and accountable.
- C. Let each report author define revenue their own way  
  _Rationale:_ Divergent definitions break trust in the numbers.
- D. Avoid documenting metric formulas so they stay flexible  
  _Rationale:_ Undocumented formulas cause inconsistency and disputes.

**MST-1622-Q0003** (single-answer, Select ONE) Why is querying production transactional systems directly for reports usually discouraged?

- A. It can degrade operational performance and lacks a modelled, consistent reporting structure **(key)**  
  _Rationale:_ Correct: reporting load and unmodelled schemas make direct queries risky.
- B. Transactional systems contain no useful data  
  _Rationale:_ They contain the source data; the issue is how it is accessed.
- C. Reports can only read from spreadsheets  
  _Rationale:_ Reports can read from many modelled sources.
- D. It is always faster than a warehouse  
  _Rationale:_ Direct queries are typically slower and riskier for reporting.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
