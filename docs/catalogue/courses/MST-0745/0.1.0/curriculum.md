# Looker Studio: Marketing and Operations Dashboards

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0745` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google Looker Studio Help; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-LOOKERSTUDIO (https://support.google.com/looker-studio; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Looker Studio: Marketing and Operations Dashboards (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connect data sources to Looker Studio
2. Build reports with charts and tables
3. Create calculated fields and metrics
4. Add filters, controls and date ranges
5. Design clear, shareable dashboards
6. Manage sharing, refresh and performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Data sources (MASTEMY-DESIGN 16%)

- Worked applications: (1) Connect an analytics data source; (2) Blend ads and analytics on a common key
- Common misconception addressed: Blending on a mismatched key and losing rows
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Connecting sources | 80 | 7 |
| M01L02 | Blending data | 80 | 7 |

### M02 Charts and tables (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a time-series chart for sessions; (2) Build a scorecard for total conversions
- Common misconception addressed: Choosing a chart type that hides the trend
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chart types | 80 | 7 |
| M02L02 | Tables and scorecards | 80 | 7 |

### M03 Calculated fields (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a conversion-rate calculated field; (2) Fix an aggregation on a ratio metric
- Common misconception addressed: Averaging a ratio instead of recomputing it from totals
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Creating calculated fields | 80 | 7 |
| M03L02 | Aggregations and ratios | 80 | 7 |

### M04 Filters and controls (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a campaign filter control; (2) Add a date-range control to the report
- Common misconception addressed: Expecting a page filter to apply to every page automatically
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Filters and filter controls | 80 | 7 |
| M04L02 | Date range and parameters | 80 | 7 |

### M05 Dashboard design (MASTEMY-DESIGN 17%)

- Worked applications: (1) Arrange a scorecard-and-trend layout; (2) Improve colour contrast for readability
- Common misconception addressed: Cramming too many charts onto one page
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Layout and hierarchy | 80 | 7 |
| M05L02 | Accessibility and clarity | 80 | 7 |

### M06 Sharing and performance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Share the report and schedule email delivery; (2) Reduce load time by limiting data range
- Common misconception addressed: Assuming data refreshes instantly regardless of source caching
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Sharing and scheduling | 80 | 7 |
| M06L02 | Refresh and performance | 80 | 7 |

## Integrative case

Build a marketing performance dashboard in Looker Studio: connect an analytics and an ads source, blend them, create calculated conversion metrics, add date and campaign controls, design a scorecard-and-trend layout, and share it with the team on a schedule.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0745-final-protected | 40 | 50 | yes |
| MST-0745-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data sources | 6 |
| Charts and tables | 6 |
| Calculated fields | 7 |
| Filters and controls | 7 |
| Dashboard design | 7 |
| Sharing and performance | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0745-Q0001** (single-answer, Select ONE) What does blending data in Looker Studio let you do?

- A. Combine fields from multiple sources on a common join key **(key)**  
  _Rationale:_ Correct: blending joins sources on shared keys.
- B. Permanently merge the underlying databases  
  _Rationale:_ Blending is in-report, not a database merge.
- C. Delete rows from the source system  
  _Rationale:_ Blending does not modify sources.
- D. Disable all filters automatically  
  _Rationale:_ Blending does not affect filters that way.

**MST-0745-Q0002** (single-answer, Select ONE) Why can averaging a per-row conversion rate give a wrong total rate?

- A. The correct total rate must be recomputed from summed numerator and denominator **(key)**  
  _Rationale:_ Correct: ratios should be aggregated from totals, not averaged.
- B. Looker Studio cannot display ratios at all  
  _Rationale:_ It can display ratios; the issue is how they aggregate.
- C. Calculated fields are never allowed  
  _Rationale:_ Calculated fields are allowed.
- D. Averages are always disabled  
  _Rationale:_ Averages are available but wrong for ratios here.

**MST-0745-Q0003** (multiple-answer, Select TWO) Which TWO improve a Looker Studio dashboard's usability? (Select TWO.)

- A. Provide date-range and relevant filter controls **(key)**  
  _Rationale:_ Correct: controls let viewers focus the data.
- B. Use clear layout with sufficient colour contrast **(key)**  
  _Rationale:_ Correct: clarity and contrast aid readability.
- C. Place as many charts as possible on one page  
  _Rationale:_ Overcrowding reduces usability.
- D. Rely on default colours regardless of contrast  
  _Rationale:_ Poor contrast harms accessibility.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
