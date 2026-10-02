# Google Cloud FinOps, Monitoring, and Reliability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0750` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Google Cloud) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-OPS (https://cloud.google.com/billing/docs; https://cloud.google.com/monitoring/docs; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud FinOps, Monitoring, and Reliability (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Read billing data and attribute cost with labels and projects
2. Build budgets, alerts and cost reports
3. Apply FinOps practices to optimize committed and on-demand spend
4. Instrument services with metrics, logs and traces in Cloud Operations
5. Define SLIs, SLOs and error budgets and alert on them
6. Run incident response and reliability reviews

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Cost visibility (MASTEMY-DESIGN 25%)

- Worked applications: (1) Attribute cost to teams with labels; (2) Build a cost report from billing export data
- Common misconception addressed: Attributing cost by project only when labels give finer granularity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Billing data, labels and attribution | 120 | 5 |
| M01L02 | Cost reports and exports | 120 | 5 |

### M02 Budgets and optimization (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a budget with threshold alerts; (2) Decide between on-demand and committed use for a workload
- Common misconception addressed: Committing to discounts before understanding steady-state usage
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Budgets, alerts and anomaly detection | 120 | 5 |
| M02L02 | Right-sizing, commitments and discounts | 120 | 5 |

### M03 Monitoring and tracing (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a dashboard for a service's golden signals; (2) Trace a slow request across services
- Common misconception addressed: Alerting on raw resource metrics instead of user-facing symptoms
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metrics, dashboards and logs | 120 | 5 |
| M03L02 | Tracing and uptime checks | 120 | 5 |

### M04 Reliability and SLOs (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define an SLO and error budget for an API; (2) Run a blameless incident review
- Common misconception addressed: Chasing 100% availability instead of an agreed error budget
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SLIs, SLOs and error budgets | 120 | 5 |
| M04L02 | Incident response and reviews | 120 | 5 |

## Integrative case

A platform team must bring a growing Google Cloud bill under control while improving reliability: attribute spend with labels, set budgets and anomaly alerts, right-size and commit where sensible, define SLOs with error budgets for a key service, and establish an incident and review process.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0750-final-protected | 40 | 50 | yes |
| MST-0750-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cost visibility | 10 |
| Budgets and optimization | 10 |
| Monitoring and tracing | 10 |
| Reliability and SLOs | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0750-Q0001** (single-answer, Select ONE) A team wants alerts that reflect what users actually experience rather than internal machine state. Which signal is the best basis for the alert?

- A. A service-level indicator such as request success rate or latency **(key)**  
  _Rationale:_ Correct: SLIs describe user-facing behaviour, the right basis for SLO alerts.
- B. Raw CPU utilization of one VM  
  _Rationale:_ CPU can be high or low without reflecting user impact.
- C. The number of log lines written  
  _Rationale:_ Log volume does not map to user experience.
- D. The count of deployed revisions  
  _Rationale:_ Deployment count is unrelated to live user experience.

**MST-0750-Q0002** (multiple-answer, Select TWO) Which TWO practices improve cost attribution on Google Cloud? (Select TWO.)

- A. Apply consistent labels to resources for team and environment **(key)**  
  _Rationale:_ Correct: labels enable fine-grained attribution.
- B. Export billing data for detailed analysis **(key)**  
  _Rationale:_ Correct: billing export supports custom cost reporting.
- C. Put every workload in a single project  
  _Rationale:_ One project collapses the boundaries useful for attribution.
- D. Disable billing reports to save overhead  
  _Rationale:_ Disabling reports removes the visibility you need.

**MST-0750-Q0003** (single-answer, Select ONE) A workload runs continuously at a predictable level all year. Which pricing approach is most likely to lower cost appropriately?

- A. Use committed use discounts for the steady baseline **(key)**  
  _Rationale:_ Correct: commitments suit predictable, steady usage.
- B. Keep everything on-demand regardless of usage  
  _Rationale:_ On-demand is costlier for steady baseline load.
- C. Commit to the peak capacity you ever briefly hit  
  _Rationale:_ Committing to peak over-commits for steady load.
- D. Turn the workload off during business hours  
  _Rationale:_ That breaks a workload that must run continuously.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
