# Google Cloud Professional Cloud Developer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0220` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified)  - design assumption: PCD|
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-PCD-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design highly scalable, available and reliable cloud-native applications
2. Build and test applications using Google Cloud services
3. Deploy applications and manage APIs and services
4. Integrate, secure and monitor Google Cloud services

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Designing cloud-native applications

- Worked applications: (1) Choose a compute platform for three workload shapes; (2) Design retry and circuit-breaker behaviour for a dependency
- Common misconception addressed: Designing for the happy path and ignoring partial failure
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Application architecture for scale and resilience | 180 | 6 |
| M01L02 | Choosing compute: Cloud Run, GKE, Functions | 180 | 6 |
| M01L03 | Data storage and caching choices | 180 | 6 |
| M01L04 | Designing for failure and graceful degradation | 180 | 6 |

### M02 Building and testing

- Worked applications: (1) Design an event-driven workflow with Pub/Sub; (2) Write a test plan covering integration points
- Common misconception addressed: Mocking everything and never testing real service integration
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Developing with client libraries | 180 | 6 |
| M02L02 | Working with managed databases | 180 | 6 |
| M02L03 | Asynchronous processing with Pub/Sub | 180 | 6 |
| M02L04 | Testing strategies for cloud apps | 180 | 6 |

### M03 Deployment and API management

- Worked applications: (1) Design a canary deployment with rollback criteria; (2) Expose and secure an API with rate limiting
- Common misconception addressed: Storing secrets in code or environment images
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Container builds and artifact management | 180 | 6 |
| M03L02 | Deployment strategies and rollbacks | 180 | 6 |
| M03L03 | API design and management | 180 | 6 |
| M03L04 | Service configuration and secrets | 180 | 6 |

### M04 Integration, security and monitoring

- Worked applications: (1) Configure workload identity for a service; (2) Instrument a request path with tracing and metrics
- Common misconception addressed: Granting service accounts broad roles for convenience
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | IAM and workload identity | 180 | 6 |
| M04L02 | Securing service-to-service calls | 180 | 6 |
| M04L03 | Logging, tracing and metrics | 180 | 6 |
| M04L04 | Debugging and performance tuning | 180 | 6 |

## Integrative case

A developer builds a cloud-native order service on Google Cloud: designing for scale and resilience, implementing it on managed compute, exposing a secured API, and instrumenting it for monitoring and rollout.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0220-practice-form-A | 108 | 108 | yes |
| MST-0220-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0220-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0220-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Designing cloud-native applications | 27 |
| Building and testing | 27 |
| Deployment and API management | 27 |
| Integration, security and monitoring | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
