# Snowflake SnowPro Advanced Administrator Certification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0237` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Snowflake (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-SNOW-ADVADM-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Administer Snowflake accounts, users and roles
2. Manage performance, warehouses and cost
3. Implement security, governance and compliance
4. Operate data protection, recovery and account monitoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Account and access administration

- Worked applications: (1) Design a role hierarchy for multiple teams; (2) Configure SSO and key-pair authentication
- Common misconception addressed: Over-granting the ACCOUNTADMIN role
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Account structure and organisations | 180 | 6 |
| M01L02 | Role-based access control design | 180 | 6 |
| M01L03 | User and authentication management | 180 | 6 |
| M01L04 | Managing databases and schemas | 180 | 6 |

### M02 Performance and cost management

- Worked applications: (1) Create resource monitors to cap spend; (2) Design warehouse scaling for mixed workloads
- Common misconception addressed: Leaving warehouses running with no auto-suspend
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Warehouse management and scaling policies | 180 | 6 |
| M02L02 | Resource monitors and quotas | 180 | 6 |
| M02L03 | Query performance governance | 180 | 6 |
| M02L04 | Cost attribution and chargeback | 180 | 6 |

### M03 Security, governance and compliance

- Worked applications: (1) Apply tag-based masking across a schema; (2) Build an access-history review for sensitive data
- Common misconception addressed: Assuming encryption alone satisfies governance requirements
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Network policies and access controls | 180 | 6 |
| M03L02 | Data governance with policies and tags | 180 | 6 |
| M03L03 | Auditing and access history | 180 | 6 |
| M03L04 | Compliance considerations | 180 | 6 |

### M04 Data protection and operations

- Worked applications: (1) Design a recovery plan using time travel and cloning; (2) Configure replication for business continuity
- Common misconception addressed: Relying on fail-safe as a user-managed backup
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Time travel and fail-safe | 180 | 6 |
| M04L02 | Cloning and backup strategy | 180 | 6 |
| M04L03 | Replication and failover | 180 | 6 |
| M04L04 | Account monitoring and alerting | 180 | 6 |

## Integrative case

An administrator runs a growing Snowflake account: managing roles and resources, controlling performance and cost, enforcing security and governance, and operating backup and monitoring.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0237-practice-form-A | 108 | 108 | yes |
| MST-0237-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0237-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0237-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Account and access administration | 27 |
| Performance and cost management | 27 |
| Security, governance and compliance | 27 |
| Data protection and operations | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
