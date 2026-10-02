# Snowflake: Data Platform Engineering and Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0955` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Snowflake: Data Platform Engineering and Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Snowflake architecture and core concepts
2. Virtual warehouses, scaling and cost
3. Databases, schemas and table types
4. Loading data: stages, COPY and Snowpipe
5. Querying, semi-structured data and views
6. Time Travel, cloning and continuous data pipelines
7. Security: roles, access control and masking
8. Governance, data sharing and cost monitoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on query authoring, schema design and live platform operation are not assessed in this format.

## Modules

### M01 Snowflake architecture and core concepts (MASTEMY-DESIGN 13%)

- Worked applications: (1) Explain why compute can scale without moving storage; (2) Resize a warehouse and observe the effect on a query
- Common misconception addressed: Assuming storage and compute scale together as on a traditional database
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Separation of storage and compute | 120 | 6 |
| M01L02 | Editions, regions and the web interface | 120 | 6 |

### M02 Virtual warehouses, scaling and cost (MASTEMY-DESIGN 13%)

- Worked applications: (1) Configure auto-suspend to control cost; (2) Add a second cluster for a spiky concurrent workload
- Common misconception addressed: Leaving a warehouse running instead of using auto-suspend
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating and sizing a virtual warehouse | 120 | 6 |
| M02L02 | Auto-suspend, auto-resume and multi-cluster scaling | 120 | 6 |

### M03 Databases, schemas and table types (MASTEMY-DESIGN 12%)

- Worked applications: (1) Create a schema and grant usage on it; (2) Choose a transient table for scratch data
- Common misconception addressed: Using permanent tables for throwaway staging data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Organising databases and schemas | 120 | 6 |
| M03L02 | Permanent, transient and temporary tables | 120 | 6 |

### M04 Loading data: stages, COPY and Snowpipe (MASTEMY-DESIGN 12%)

- Worked applications: (1) Stage files and load them with COPY INTO; (2) Set up Snowpipe to auto-ingest new files
- Common misconception addressed: Loading row by row instead of using bulk COPY
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Internal and external stages | 120 | 6 |
| M04L02 | Loading with COPY INTO and Snowpipe | 120 | 6 |

### M05 Querying, semi-structured data and views (MASTEMY-DESIGN 13%)

- Worked applications: (1) Flatten a JSON column into rows; (2) Create a view over semi-structured data
- Common misconception addressed: Parsing semi-structured data in a client instead of querying VARIANT directly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Writing analytical queries | 120 | 6 |
| M05L02 | Querying VARIANT and JSON with views | 120 | 6 |

### M06 Time Travel, cloning and continuous data pipelines (MASTEMY-DESIGN 13%)

- Worked applications: (1) Recover a dropped table with Time Travel; (2) Clone a database for a test environment at no storage cost
- Common misconception addressed: Thinking a clone duplicates storage immediately
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Time Travel and zero-copy cloning | 120 | 6 |
| M06L02 | Streams and tasks for incremental pipelines | 120 | 6 |

### M07 Security: roles, access control and masking (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a role hierarchy and grant privileges; (2) Apply a masking policy to a sensitive column
- Common misconception addressed: Granting privileges to users directly instead of through roles
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Role-based access control model | 120 | 6 |
| M07L02 | Dynamic data masking and row access policies | 120 | 6 |

### M08 Governance, data sharing and cost monitoring (MASTEMY-DESIGN 12%)

- Worked applications: (1) Tag columns holding personal data; (2) Create a resource monitor with a spend alert
- Common misconception addressed: Running without resource monitors and being surprised by the bill
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Object tagging and data classification | 120 | 6 |
| M08L02 | Secure data sharing and resource monitors | 120 | 6 |

## Integrative case

Stand up a governed analytics platform on Snowflake: load raw JSON into staged tables with Snowpipe, build cleaned views over the semi-structured data, design a role hierarchy with masking on sensitive columns, enable Time Travel for recovery, and add resource monitors to keep compute spend in check.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0955-final-protected | 40 | 40 | yes |
| MST-0955-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Snowflake architecture and core concepts | 5 |
| Virtual warehouses, scaling and cost | 5 |
| Databases, schemas and table types | 5 |
| Loading data: stages, COPY and Snowpipe | 5 |
| Querying, semi-structured data and views | 5 |
| Time Travel, cloning and continuous data pipelines | 5 |
| Security: roles, access control and masking | 5 |
| Governance, data sharing and cost monitoring | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0955-Q0001** (single-answer, Select ONE) Why can Snowflake scale query compute up and down without affecting stored data?

- A. Storage and compute are separate layers, so virtual warehouses can resize independently of the data they read **(key)**  
  _Rationale:_ Correct: Snowflake decouples storage from compute, letting warehouses scale on their own.
- B. Every warehouse keeps its own private copy of all the data  
  _Rationale:_ Warehouses read from shared storage; they do not each copy all data.
- C. Scaling compute automatically deletes unused tables  
  _Rationale:_ Resizing compute does not alter stored data.
- D. Compute scaling only works if the tables are temporary  
  _Rationale:_ Scaling is independent of table type.

**MST-0955-Q0002** (multiple-answer, Select ALL that apply) Which statements about Snowflake access control and governance are correct? (Select TWO)

- A. Privileges are typically granted to roles, which are then granted to users **(key)**  
  _Rationale:_ Correct: Snowflake uses role-based access control with a role hierarchy.
- B. A masking policy can hide a column's value from users who lack the required role **(key)**  
  _Rationale:_ Correct: dynamic data masking returns masked values based on the querying role.
- C. Resource monitors change the schema of governed tables  
  _Rationale:_ Resource monitors track and cap credit usage; they do not alter schemas.
- D. Granting privileges directly to each user is the recommended default  
  _Rationale:_ The recommended model grants through roles, not directly to users.

**MST-0955-Q0003** (single-answer, Select ONE) A table was dropped by mistake an hour ago. What Snowflake feature recovers it most directly?

- A. Time Travel, which can restore the table to a point within its retention window with UNDROP **(key)**  
  _Rationale:_ Correct: Time Travel lets you UNDROP or query a table as of an earlier time within retention.
- B. Auto-suspend on the virtual warehouse  
  _Rationale:_ Auto-suspend manages compute cost, not data recovery.
- C. A resource monitor  
  _Rationale:_ Resource monitors track spend, not data history.
- D. A masking policy  
  _Rationale:_ Masking controls visibility of values, not recovery of dropped objects.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
