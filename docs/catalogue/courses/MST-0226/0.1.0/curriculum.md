# Google Cloud Professional Security Operations Engineer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0226` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-SECOPS-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Operate a security operations capability on Google Cloud
2. Detect threats using SIEM and analytics
3. Investigate and respond to incidents
4. Automate detection and response and measure SOC effectiveness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Security operations foundations

- Worked applications: (1) Map telemetry sources to detection needs; (2) Design an enrichment step for alert context
- Common misconception addressed: Collecting everything without a detection goal
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SOC roles and workflow | 180 | 6 |
| M01L02 | Telemetry sources and log ingestion | 180 | 6 |
| M01L03 | Normalisation and enrichment | 180 | 6 |
| M01L04 | Threat intelligence basics | 180 | 6 |

### M02 Threat detection

- Worked applications: (1) Write a detection rule for suspicious access; (2) Tune a noisy rule using thresholds
- Common misconception addressed: Measuring detection success by alert volume
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Detection engineering | 180 | 6 |
| M02L02 | SIEM analytics and rules | 180 | 6 |
| M02L03 | Behavioural and anomaly detection | 180 | 6 |
| M02L04 | Tuning to reduce false positives | 180 | 6 |

### M03 Investigation and response

- Worked applications: (1) Triage and investigate a credential-theft alert; (2) Draft a containment playbook for a compromised account
- Common misconception addressed: Containing before understanding scope and losing evidence
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Triage and prioritisation | 180 | 6 |
| M03L02 | Investigation techniques | 180 | 6 |
| M03L03 | Incident response playbooks | 180 | 6 |
| M03L04 | Containment and recovery | 180 | 6 |

### M04 Automation and measurement

- Worked applications: (1) Automate enrichment and ticketing for an alert type; (2) Define SOC metrics and an improvement target
- Common misconception addressed: Automating a broken process and scaling the errors
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SOAR and response automation | 180 | 6 |
| M04L02 | Case management and metrics | 180 | 6 |
| M04L03 | Mean-time-to-detect and respond | 180 | 6 |
| M04L04 | Continuous improvement of the SOC | 180 | 6 |

## Integrative case

A SOC engineer stands up security operations for a cloud-first company: ingesting telemetry into a SIEM, building detections, running investigations, and automating response while measuring effectiveness.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0226-practice-form-A | 108 | 108 | yes |
| MST-0226-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0226-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0226-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Security operations foundations | 27 |
| Threat detection | 27 |
| Investigation and response | 27 |
| Automation and measurement | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
