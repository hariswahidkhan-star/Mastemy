# Snowflake SnowPro Advanced Architect Certification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0234` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Snowflake (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: SnowPro Advanced Architect (assumed designation) (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official Snowflake exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | MST-DAT-SNOW-ADVARCH-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design secure Snowflake accounts and access
2. Architect data models, sharing and engineering pipelines
3. Optimise performance and design data protection and recovery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Accounts and Security (design assumption - weight not verified)

- Worked applications: (1) Design a role hierarchy with functional and access roles; (2) Configure a network policy and SSO for an org
- Common misconception addressed: Granting privileges directly to users instead of roles
- Module check: 51 items / 51 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Account architecture and organisations | 320 | 6 |
| M01L02 | Role-based access and network policy | 320 | 6 |

### M02 Snowflake Architecture and Data Modelling (design assumption - weight not verified)

- Worked applications: (1) Model a schema for JSON event data with VARIANT; (2) Explain how micro-partitions drive pruning
- Common misconception addressed: Treating virtual warehouses as the storage layer
- Module check: 51 items / 51 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Storage, compute and services layers | 320 | 6 |
| M02L02 | Data modelling and semi-structured data | 320 | 6 |

### M03 Data Sharing and Collaboration (design assumption - weight not verified)

- Worked applications: (1) Set up a secure share to an external account; (2) Design a reader account for a non-Snowflake consumer
- Common misconception addressed: Copying data to share it instead of using secure sharing
- Module check: 50 items / 50 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Secure data sharing and the Marketplace | 320 | 6 |

### M04 Performance Optimisation (design assumption - weight not verified)

- Worked applications: (1) Read a query profile to find a spilling join; (2) Choose a clustering key for a large table
- Common misconception addressed: Scaling up a warehouse to fix a poorly written query
- Module check: 50 items / 50 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Clustering, caching and warehouse sizing | 320 | 6 |
| M04L02 | Query profiling and cost control | 320 | 6 |

### M05 Data Protection and Recovery (design assumption - weight not verified)

- Worked applications: (1) Recover a dropped table with Time Travel; (2) Design cross-region replication for DR
- Common misconception addressed: Relying on fail-safe as a user-recoverable backup
- Module check: 50 items / 50 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Time Travel, cloning and fail-safe | 320 | 6 |
| M05L02 | Replication and disaster recovery | 320 | 6 |

## Integrative case

An enterprise consolidates analytics on Snowflake; the candidate designs the account and role model, a secure data-sharing arrangement, warehouses sized for cost, and a recovery strategy.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0234-practice-form-A | 108 | 108 | yes |
| MST-0234-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0234-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0234-final-protected | 108 | 108 | yes |

| Domain | Items (practice form A) |
|---|---|
| Accounts and Security | 22 |
| Snowflake Architecture and Data Modelling | 22 |
| Data Sharing and Collaboration | 22 |
| Performance Optimisation | 21 |
| Data Protection and Recovery | 21 |

Minimum reviewed item bank: 1044 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0234-Q0001** (single-answer, Select ONE) In Snowflake, which best describes how micro-partitions improve query performance?

- A. They store the entire table in memory permanently  
  _Rationale:_ Micro-partitions are columnar storage units, not an in-memory cache of the whole table.
- B. They let the engine prune partitions whose metadata cannot match the filter **(key)**  
  _Rationale:_ Correct: micro-partition metadata enables pruning of non-matching partitions.
- C. They disable the use of virtual warehouses  
  _Rationale:_ Warehouses still provide compute.
- D. They require manual indexing by the user  
  _Rationale:_ Snowflake does not use user-managed indexes.

**MST-0234-Q0002** (single-answer, Select ONE) A user accidentally dropped a table 10 minutes ago. What recovers it fastest?

- A. UNDROP TABLE using Time Travel **(key)**  
  _Rationale:_ Correct: Time Travel's UNDROP restores the recently dropped table.
- B. Wait for fail-safe to self-restore  
  _Rationale:_ Fail-safe is Snowflake-managed recovery, not a user self-service option.
- C. Rebuild the table manually from source  
  _Rationale:_ That is slower and unnecessary within the Time Travel window.
- D. Nothing can recover it  
  _Rationale:_ Time Travel can recover it within the retention window.

**MST-0234-Q0003** (multiple-answer, Select TWO) Select TWO practices consistent with least-privilege access design in Snowflake.

- A. Grant privileges to roles and assign roles to users **(key)**  
  _Rationale:_ Correct: role-based grants support least privilege.
- B. Grant ACCOUNTADMIN to every analyst  
  _Rationale:_ That over-privileges users.
- C. Separate functional roles from access roles **(key)**  
  _Rationale:_ Correct: separating functional and access roles is a recommended pattern.
- D. Grant privileges directly to each user  
  _Rationale:_ Direct user grants are harder to govern.
- E. Share one login across the team  
  _Rationale:_ Shared logins break accountability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
