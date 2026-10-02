# Google Cloud Professional Cloud DevOps Engineer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0221` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-PCDOE-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply site reliability engineering principles to services
2. Build CI/CD pipelines and manage infrastructure as code
3. Implement service monitoring, logging and SLOs
4. Optimise service performance, reliability and incident response

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 SRE principles and practices

- Worked applications: (1) Define SLIs and an SLO for a request path; (2) Use an error budget to decide whether to ship
- Common misconception addressed: Setting a 100% availability target and burning out the team
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SLIs, SLOs and error budgets | 180 | 6 |
| M01L02 | Reliability and toil reduction | 180 | 6 |
| M01L03 | On-call and operational maturity | 180 | 6 |
| M01L04 | Capacity and change management | 180 | 6 |

### M02 CI/CD and infrastructure as code

- Worked applications: (1) Design a pipeline with automated gates; (2) Write an IaC change with a safe rollout
- Common misconception addressed: Manual hotfixes that bypass the pipeline and drift config
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building CI/CD pipelines | 180 | 6 |
| M02L02 | Artifact and release management | 180 | 6 |
| M02L03 | Infrastructure as code patterns | 180 | 6 |
| M02L04 | Progressive delivery | 180 | 6 |

### M03 Monitoring, logging and SLOs

- Worked applications: (1) Design symptom-based alerts for an SLO; (2) Build a dashboard that answers 'is the service healthy'
- Common misconception addressed: Alerting on every metric and causing alert fatigue
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metrics and dashboards | 180 | 6 |
| M03L02 | Logging and log-based metrics | 180 | 6 |
| M03L03 | Alerting on symptoms not causes | 180 | 6 |
| M03L04 | Tracing distributed requests | 180 | 6 |

### M04 Performance and incident response

- Worked applications: (1) Run an incident timeline and assign action items; (2) Write a blameless postmortem for an outage
- Common misconception addressed: Treating postmortems as a search for someone to blame
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Performance analysis and optimisation | 180 | 6 |
| M04L02 | Incident command and communication | 180 | 6 |
| M04L03 | Blameless postmortems | 180 | 6 |
| M04L04 | Continuous improvement | 180 | 6 |

## Integrative case

A DevOps engineer takes over an unstable service: they define SLOs and error budgets, build a CI/CD pipeline with infrastructure as code, add observability, and establish an incident-response and postmortem practice.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0221-practice-form-A | 108 | 108 | yes |
| MST-0221-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0221-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0221-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| SRE principles and practices | 27 |
| CI/CD and infrastructure as code | 27 |
| Monitoring, logging and SLOs | 27 |
| Performance and incident response | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
