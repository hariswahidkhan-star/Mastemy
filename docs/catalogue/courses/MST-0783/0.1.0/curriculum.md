# Gemini + Google Sheets + Looker Studio: Business Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0783` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Gemini, Google Sheets, Looker Studio) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-ANALYTICS-WF (https://support.google.com/looker-studio/; https://support.google.com/docs/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Gemini + Google Sheets + Looker Studio: Business Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan an end-to-end analytics workflow across Gemini, Sheets and Looker Studio
2. Prepare and clean data in Google Sheets
3. Use Gemini to assist analysis and verify its output
4. Connect Sheets data to Looker Studio
5. Build a Looker Studio dashboard with the right charts
6. Share results responsibly and keep the pipeline maintainable

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Workflow overview (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map the stages of the analytics pipeline; (2) Decide which tool does which job
- Common misconception addressed: Expecting one tool to do the whole job
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Gemini + Sheets + Looker pipeline | 80 | 5 |
| M01L02 | Roles of each tool | 80 | 5 |

### M02 Data preparation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Clean a messy export into a tidy table; (2) Add calculated columns for analysis
- Common misconception addressed: Feeding unclean data straight into a dashboard
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cleaning data in Sheets | 80 | 5 |
| M02L02 | Structuring data for analysis | 80 | 5 |

### M03 Gemini-assisted analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Ask Gemini to summarize a trend; (2) Verify a Gemini claim against the source numbers
- Common misconception addressed: Trusting an AI summary without checking the numbers
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prompting Gemini for insights | 80 | 5 |
| M03L02 | Verifying AI output against the data | 80 | 5 |

### M04 Connecting to Looker Studio (MASTEMY-DESIGN 17%)

- Worked applications: (1) Connect a Sheet as a Looker Studio source; (2) Set field types correctly
- Common misconception addressed: Ignoring stale data because refresh was not configured
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Connecting a Sheets data source | 80 | 5 |
| M04L02 | Fields, types and refresh | 80 | 5 |

### M05 Building the dashboard (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pick a chart that answers a specific question; (2) Add a date-range filter
- Common misconception addressed: Using a pie chart where a trend line is needed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Choosing charts for the question | 80 | 5 |
| M05L02 | Layout and filters | 80 | 5 |

### M06 Sharing and maintenance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Share a dashboard at the right access level; (2) Document the pipeline so it can be rerun
- Common misconception addressed: Over-sharing a dashboard containing sensitive figures
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Sharing responsibly | 80 | 5 |
| M06L02 | Keeping the pipeline maintainable | 80 | 5 |

## Integrative case

Build a monthly business-analytics pipeline: clean sales data in Sheets, use Gemini to draft summary insights and then verify them against the numbers, connect the Sheet to Looker Studio, build a dashboard with trend and breakdown charts, and share it with the leadership team at the right access level.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0783-final-protected | 40 | 50 | yes |
| MST-0783-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Workflow overview | 7 |
| Data preparation | 7 |
| Gemini-assisted analysis | 7 |
| Connecting to Looker Studio | 7 |
| Building the dashboard | 6 |
| Sharing and maintenance | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0783-Q0001** (single-answer, Select ONE) In the Gemini + Sheets + Looker Studio workflow, what is the correct handling of an insight Gemini generates?

- A. Verify the insight against the underlying data before relying on it **(key)**  
  _Rationale:_ Correct: AI-generated insights must be checked against the source numbers.
- B. Publish it immediately without checking  
  _Rationale:_ Unverified AI output can be wrong and misleading.
- C. Assume it is correct because it sounds confident  
  _Rationale:_ Confidence is not accuracy; verification is required.
- D. Delete the source data once Gemini has summarized it  
  _Rationale:_ The source data is needed for verification and refresh.

**MST-0783-Q0002** (multiple-answer, Select TWO) Which TWO steps make the analytics pipeline more reliable? (Select TWO.)

- A. Clean and structure the data in Sheets before building the dashboard **(key)**  
  _Rationale:_ Correct: clean input prevents misleading dashboards.
- B. Configure the Looker Studio data source to refresh so figures stay current **(key)**  
  _Rationale:_ Correct: refresh keeps the dashboard current.
- C. Build the dashboard directly on an unclean export  
  _Rationale:_ Unclean data produces unreliable charts.
- D. Share the dashboard publicly to simplify access  
  _Rationale:_ Public sharing can expose sensitive figures.

**MST-0783-Q0003** (single-answer, Select ONE) You need to show how monthly revenue has changed over the past year. Which chart type is most appropriate?

- A. A line (time-series) chart **(key)**  
  _Rationale:_ Correct: a line chart shows change over time clearly.
- B. A pie chart  
  _Rationale:_ A pie chart shows composition at one point, not a trend.
- C. A single scorecard number  
  _Rationale:_ A scorecard shows one value, not the trend.
- D. A table of raw rows  
  _Rationale:_ Raw rows do not make the trend visible at a glance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
