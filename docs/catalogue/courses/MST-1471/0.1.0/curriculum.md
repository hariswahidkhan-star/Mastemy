# Google Cloud Operations Suite

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1471` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Operations Suite (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Collect and explore metrics, logs and traces with Cloud Monitoring, Logging and Trace
2. Build dashboards and alerting policies for service health
3. Investigate incidents using logs-based metrics and error reporting
4. Apply SLO-based reliability and uptime monitoring practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Monitoring foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a dashboard for a service's latency and error rate; (2) Create an uptime check for a public endpoint
- Common misconception addressed: Assuming every metric is stored forever at full resolution
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Metrics, resources and Metrics Explorer | 72 | 7 |
| M01L02 | Dashboards and uptime checks | 72 | 7 |

### M02 Logging and observability (MASTEMY-DESIGN 25%)

- Worked applications: (1) Route audit logs to a dedicated log bucket; (2) Create a logs-based metric counting 5xx responses
- Common misconception addressed: Thinking all logs are retained by default with no routing or exclusion
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cloud Logging and log routing | 72 | 7 |
| M02L02 | Logs-based metrics and Error Reporting | 72 | 7 |

### M03 Alerting and incident response (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define an alerting policy on an error-rate threshold; (2) Add an email and webhook notification channel
- Common misconception addressed: Setting alert thresholds so tight they page on normal variation
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Alerting policies and notification channels | 72 | 7 |
| M03L02 | Error Reporting and incident triage | 72 | 7 |

### M04 Reliability and SLOs (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define a 99.9% availability SLO and its error budget; (2) Use Trace to find the slowest span in a request
- Common misconception addressed: Treating an SLO as a 100% uptime guarantee rather than a target with an error budget
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SLIs, SLOs and error budgets | 72 | 7 |
| M04L02 | Cloud Trace and performance analysis | 72 | 7 |

## Integrative case

A SaaS team's checkout service is intermittently slow. Instrument it with Cloud Operations: define latency and error SLIs, build a dashboard, set alerting policies and an uptime check, then use logs-based metrics and Trace to find and justify the fix.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1471-final-protected | 28 | 35 | yes |
| MST-1471-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Monitoring foundations | 7 |
| Logging and observability | 7 |
| Alerting and incident response | 7 |
| Reliability and SLOs | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1471-Q0001** (single-answer, Select ONE) Which Cloud Operations tool is used to explore and chart time-series metrics ad hoc?

- A. Metrics Explorer **(key)**  
  _Rationale:_ Correct: Metrics Explorer builds ad-hoc charts from time-series metrics.
- B. Cloud Logging  
  _Rationale:_ Logging stores and queries log entries, not metric time series.
- C. Error Reporting  
  _Rationale:_ Error Reporting aggregates application errors, not arbitrary metrics.
- D. Cloud Trace  
  _Rationale:_ Trace analyzes request latency spans, not general metrics.

**MST-1471-Q0002** (multiple-answer, Select TWO) Which TWO are needed to make an alerting policy actually notify a human? (Select TWO.)

- A. A condition that defines when the policy is triggered **(key)**  
  _Rationale:_ Correct: a condition defines the triggering state.
- B. At least one notification channel attached to the policy **(key)**  
  _Rationale:_ Correct: without a channel no notification is delivered.
- C. A paid support plan  
  _Rationale:_ Alerting does not require a specific support plan.
- D. Deleting all logs-based metrics  
  _Rationale:_ Deleting metrics is unrelated and harmful.

**MST-1471-Q0003** (single-answer, Select ONE) A service has a 99.9% monthly availability SLO. What does the error budget represent?

- A. The allowed amount of unavailability (~0.1%) before the SLO is breached **(key)**  
  _Rationale:_ Correct: the error budget is the permitted shortfall from 100%.
- B. A guarantee of zero downtime  
  _Rationale:_ An SLO is a target, not a zero-downtime guarantee.
- C. The monthly billing credit for outages  
  _Rationale:_ Error budget is a reliability concept, not a billing credit.
- D. The number of alerting policies allowed  
  _Rationale:_ It has nothing to do with alerting policy count.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
