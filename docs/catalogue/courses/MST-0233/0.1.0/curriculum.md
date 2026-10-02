# Snowflake SnowPro Core Certification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0233` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Snowflake (no affiliation or endorsement) |
| Exam code | COF-C02 |
| Version basis | DESIGN ASSUMPTION - official outline not retrieved (network egress blocked on issuer site) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked on 2026-10-02; structure is a DESIGN ASSUMPTION pending official confirmation |
| Legacy IDs | MST-DAT-SNOW-CORE-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the Snowflake AI Data Cloud architecture and core features (design-assumption scope, pending official confirmation)
2. Explain account access, security and role-based access control
3. Apply performance and cost-optimization concepts, and data loading, transformation and protection

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Snowflake AI Data Cloud features and architecture (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Snowflake AI Data Cloud features and architecture' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Snowflake AI Data Cloud features and architecture'
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Platform overview and multi-cluster architecture | 180 | 6 |
| M01L02 | Storage, compute (virtual warehouses) and services layers | 180 | 6 |

### M02 Account access and security (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Account access and security' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Account access and security'
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authentication, roles and access control | 180 | 6 |
| M02L02 | Data governance and protection features | 180 | 6 |

### M03 Performance and cost-optimization concepts (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Performance and cost-optimization concepts' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Performance and cost-optimization concepts'
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Virtual-warehouse sizing and scaling | 180 | 6 |
| M03L02 | Caching, clustering and cost monitoring | 180 | 6 |

### M04 Data loading and unloading (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Data loading and unloading' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Data loading and unloading'
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bulk and continuous loading | 180 | 6 |
| M04L02 | Stages, file formats and unloading | 180 | 6 |

### M05 Data transformations (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Data transformations' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Data transformations'
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | SQL transformations and semi-structured data | 180 | 6 |
| M05L02 | Functions, views and procedures | 180 | 6 |

### M06 Data protection and data sharing (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Data protection and data sharing' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Data protection and data sharing'
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Time Travel, Fail-safe and cloning | 180 | 6 |
| M06L02 | Secure data sharing and the marketplace | 180 | 6 |

## Integrative case

A data engineer stands up a Snowflake environment: sizes virtual warehouses for a nightly load, configures role-based access, loads and transforms semi-structured data, and sets up secure data sharing with a partner using Time Travel for recovery.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0233-practice-form-A | 81 | 81 | yes |
| MST-0233-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0233-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0233-final-protected | 81 | 81 | yes |

| Domain | Items per form |
|---|---|
| Snowflake AI Data Cloud features and architecture | 14 |
| Account access and security | 14 |
| Performance and cost-optimization concepts | 14 |
| Data loading and unloading | 13 |
| Data transformations | 13 |
| Data protection and data sharing | 13 |

Minimum reviewed item bank: 846 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0233-Q0001** (single-answer, Select ONE) A nightly batch load runs slowly on a small virtual warehouse. Which Snowflake action most directly improves the load's compute throughput?

- A. Resizing the virtual warehouse to a larger size for the load **(key)**  
  _Rationale:_ Correct: a larger virtual warehouse provides more compute for a heavy load, improving throughput.
- B. Dropping all roles in the account  
  _Rationale:_ Removing roles harms security and does not improve load performance.
- C. Disabling result caching permanently  
  _Rationale:_ Caching mainly affects repeated query reads, not batch-load compute.
- D. Deleting the target table  
  _Rationale:_ Deleting the target defeats the purpose of loading data.

**MST-0233-Q0002** (single-answer, Select ONE) In Snowflake, which feature lets you query or restore data as it existed at an earlier point within a retention window?

- A. Time Travel **(key)**  
  _Rationale:_ Correct: Time Travel lets you access or restore historical data within the retention window.
- B. Virtual warehouse auto-suspend  
  _Rationale:_ Auto-suspend pauses idle compute; it does not restore historical data.
- C. External stages  
  _Rationale:_ Stages reference files for load/unload, not historical restore.
- D. Clustering keys  
  _Rationale:_ Clustering keys organize data for pruning, not point-in-time restore.

**MST-0233-Q0003** (multiple-answer, Select TWO) Select TWO layers of Snowflake's architecture. (Select TWO.)

- A. Storage layer **(key)**  
  _Rationale:_ Correct: storage is one of Snowflake's architectural layers.
- B. Compute layer (virtual warehouses) **(key)**  
  _Rationale:_ Correct: compute via virtual warehouses is an architectural layer.
- C. The on-premises tape-backup layer  
  _Rationale:_ Snowflake is cloud-native and has no such tape layer.
- D. A mandatory desktop-client layer  
  _Rationale:_ No mandatory desktop-client layer exists in the architecture.
- E. A per-row licensing layer  
  _Rationale:_ This is not a Snowflake architectural layer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
