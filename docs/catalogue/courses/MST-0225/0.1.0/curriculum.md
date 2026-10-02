# Google Cloud Professional Cloud Database Engineer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0225` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-PCDBE-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design scalable and reliable database solutions on Google Cloud
2. Manage relational and non-relational databases
3. Migrate databases to Google Cloud
4. Secure, monitor and optimise database workloads

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Database design and selection

- Worked applications: (1) Select a database service for three workload patterns; (2) Design a schema for a globally distributed workload
- Common misconception addressed: Choosing a single database engine for every workload
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Relational vs non-relational choices | 180 | 6 |
| M01L02 | Cloud SQL, Spanner and AlloyDB | 180 | 6 |
| M01L03 | Firestore and Bigtable use cases | 180 | 6 |
| M01L04 | Designing for scale and consistency | 180 | 6 |

### M02 Managing databases

- Worked applications: (1) Design an HA and backup plan meeting an RPO/RTO; (2) Diagnose a connection-exhaustion issue
- Common misconception addressed: Confusing high availability with having a backup
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | High availability and replication | 180 | 6 |
| M02L02 | Backup, restore and point-in-time recovery | 180 | 6 |
| M02L03 | Performance and connection management | 180 | 6 |
| M02L04 | Maintenance and upgrades | 180 | 6 |

### M03 Migration

- Worked applications: (1) Plan a low-downtime migration with change data capture; (2) Design a validation step before cutover
- Common misconception addressed: Planning a cutover without a rollback path
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Migration assessment and strategy | 180 | 6 |
| M03L02 | Schema and data migration tools | 180 | 6 |
| M03L03 | Minimising downtime | 180 | 6 |
| M03L04 | Validation and cutover | 180 | 6 |

### M04 Security, monitoring and optimisation

- Worked applications: (1) Configure least-privilege access and audit logging; (2) Optimise a slow query and its cost
- Common misconception addressed: Scaling up instance size instead of fixing a query plan
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | IAM, encryption and auditing | 180 | 6 |
| M04L02 | Monitoring and alerting | 180 | 6 |
| M04L03 | Query and cost optimisation | 180 | 6 |
| M04L04 | Capacity planning | 180 | 6 |

## Integrative case

A database engineer migrates a monolithic relational database to Google Cloud: choosing managed services, planning the migration, and securing, monitoring and tuning the result.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0225-practice-form-A | 108 | 108 | yes |
| MST-0225-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0225-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0225-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Database design and selection | 27 |
| Managing databases | 27 |
| Migration | 27 |
| Security, monitoring and optimisation | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
