# Looker Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1462` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-LOOKER (https://cloud.google.com/looker/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Looker Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Looker's modeling layer and how it differs from BI tools
2. Read and write basic LookML to model data
3. Build Explores, Looks and dashboards
4. Create measures, dimensions and derived tables
5. Manage access, content and the development workflow
6. Apply performance and governance best practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Looker and the modeling layer (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain why a modeling layer gives consistent metrics; (2) Compare Looker's governed model to ad-hoc BI queries
- Common misconception addressed: Thinking Looker stores its own copy of the warehouse data
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Looker is and the semantic model | 48 | 5 |
| M01L02 | Connections and projects | 48 | 5 |

### M02 LookML basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Define a view with dimensions over a table; (2) Join views into an Explore with the right relationship
- Common misconception addressed: Writing a many-to-one join as one-to-one and double-counting
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Views, dimensions and the LookML project | 48 | 5 |
| M02L02 | Explores and joins | 48 | 5 |

### M03 Explores, Looks and dashboards (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build an Explore and save a Look; (2) Assemble a dashboard with filters from multiple Looks
- Common misconception addressed: Confusing a Look with a dashboard tile's underlying query
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Exploring data and saving Looks | 48 | 5 |
| M03L02 | Dashboards and filters | 48 | 5 |

### M04 Measures and derived tables (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create an aggregate measure such as a distinct count; (2) Build a derived table for a reusable calculation
- Common misconception addressed: Summing a pre-aggregated column and inflating totals
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Measures and aggregations | 48 | 5 |
| M04L02 | Derived and persistent derived tables | 48 | 5 |

### M05 Access and development workflow (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set content and data access with roles and model sets; (2) Use the Git-backed dev workflow to validate and deploy
- Common misconception addressed: Editing production LookML directly without the dev branch
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Roles, permissions and content access | 48 | 5 |
| M05L02 | Git workflow, validation and deploy | 48 | 5 |

### M06 Performance and governance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add aggregate awareness to speed a heavy dashboard; (2) Set a caching policy with datagroups
- Common misconception addressed: Leaving no caching so every tile re-queries the warehouse
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Caching, datagroups and aggregate awareness | 48 | 5 |
| M06L02 | Governance and documentation | 48 | 5 |

## Integrative case

An analytics team standardizes reporting in Looker: model core business entities in LookML, build Explores and a governed dashboard, define reusable measures, manage who can see what, and tune queries so the dashboard loads quickly for executives.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1462-final-protected | 30 | 30 | yes |
| MST-1462-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Looker and the modeling layer | 5 |
| LookML basics | 5 |
| Explores, Looks and dashboards | 5 |
| Measures and derived tables | 5 |
| Access and development workflow | 5 |
| Performance and governance | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1462-Q0001** (single-answer, Select ONE) Why does modeling metrics in LookML help an organization?

- A. It defines metrics once so every report uses a consistent definition **(key)**  
  _Rationale:_ Correct: the modeling layer centralizes metric definitions for consistency.
- B. It copies the warehouse data into Looker for speed  
  _Rationale:_ Looker queries the warehouse; it does not store its own copy.
- C. It removes the need for a data warehouse  
  _Rationale:_ Looker sits on top of a warehouse; it does not replace it.
- D. It makes all dashboards load instantly without tuning  
  _Rationale:_ Performance still requires caching and modeling choices.

**MST-1462-Q0002** (multiple-answer, Select TWO) Which TWO help a slow Looker dashboard perform better? (Select TWO.)

- A. Configure caching with datagroups **(key)**  
  _Rationale:_ Correct: datagroups cache results and reduce repeated warehouse queries.
- B. Use aggregate awareness to query smaller rollup tables **(key)**  
  _Rationale:_ Correct: aggregate awareness routes queries to pre-aggregated tables.
- C. Remove all joins so nothing can be analyzed  
  _Rationale:_ Removing needed joins breaks the analysis, not a valid fix.
- D. Disable caching so data is always refetched  
  _Rationale:_ Disabling caching increases load, worsening performance.

**MST-1462-Q0003** (single-answer, Select ONE) A view is joined to another on a many-to-one relationship but declared as one-to-one. What is the likely result?

- A. Double-counted or inflated measure values **(key)**  
  _Rationale:_ Correct: a wrong join relationship can fan out rows and inflate aggregates.
- B. Faster query performance with no downside  
  _Rationale:_ An incorrect relationship causes wrong numbers, not a safe speedup.
- C. Looker refuses to run any query  
  _Rationale:_ Looker will run it but return incorrect aggregates.
- D. Automatic correction by Looker  
  _Rationale:_ Looker does not silently fix a misdeclared relationship.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
