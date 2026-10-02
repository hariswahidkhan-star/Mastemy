# Security Operations Center: Detection and Triage

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1015` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Security Operations Center: Detection and Triage (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. SOC fundamentals and roles
2. Log sources and telemetry
3. Detection engineering and use cases
4. Alert triage and prioritisation
5. Investigation and escalation
6. Metrics, tuning and shift handover

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 SOC fundamentals and roles (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map an alert to the correct SOC tier for handling; (2) Trace one alert through detect, triage and escalate
- Common misconception addressed: Thinking the SOC's job is to block everything rather than detect and respond
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a SOC does and its tiers | 80 | 6 |
| M01L02 | The detect-triage-respond workflow | 80 | 6 |

### M02 Log sources and telemetry (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose the log source that would reveal a specific attack step; (2) Enrich a raw alert with asset and user context
- Common misconception addressed: Assuming more log volume always means better detection
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Core telemetry: endpoint, network, identity, cloud | 80 | 6 |
| M02L02 | Normalisation and the value of context | 80 | 6 |

### M03 Detection engineering and use cases (MASTEMY-DESIGN 16%)

- Worked applications: (1) Convert an attacker technique into a detection rule outline; (2) Decide when a behavioural detection beats a signature
- Common misconception addressed: Believing a single signature can cover a whole technique
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Signatures, rules and behavioural detections | 80 | 6 |
| M03L02 | Writing a detection use case | 80 | 6 |

### M04 Alert triage and prioritisation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Rank three alerts by impact and confidence; (2) Tune a noisy rule to cut false positives without losing coverage
- Common misconception addressed: Prioritising purely on the tool's severity label
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Triaging alerts: severity, confidence and impact | 80 | 6 |
| M04L02 | Reducing false positives and alert fatigue | 80 | 6 |

### M05 Investigation and escalation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a short timeline from three correlated events; (2) Decide whether an alert meets the escalation bar
- Common misconception addressed: Escalating before scoping, or closing without scoping
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Scoping an incident and building a timeline | 80 | 6 |
| M05L02 | Escalation criteria and handover | 80 | 6 |

### M06 Metrics, tuning and shift handover (MASTEMY-DESIGN 18%)

- Worked applications: (1) Interpret an MTTD/MTTR trend and propose one fix; (2) Write a concise shift-handover note for an open case
- Common misconception addressed: Treating MTTR as the only metric that matters
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | SOC metrics: MTTD, MTTR and coverage | 80 | 6 |
| M06L02 | Continuous tuning and shift handover | 80 | 6 |

## Integrative case

Work a suspicious-login alert through the SOC workflow: pick the telemetry that confirms it, enrich it with user and asset context, triage it by impact and confidence, build a short timeline, decide whether it meets the escalation bar, then record the metrics and a shift-handover note.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1015-final-protected | 30 | 30 | yes |
| MST-1015-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| SOC fundamentals and roles | 5 |
| Log sources and telemetry | 5 |
| Detection engineering and use cases | 5 |
| Alert triage and prioritisation | 5 |
| Investigation and escalation | 5 |
| Metrics, tuning and shift handover | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1015-Q0001** (single-answer, Select ONE) A SOC analyst receives an alert for impossible-travel logins. Which telemetry best confirms whether the account was actually compromised?

- A. Identity provider sign-in logs showing locations, devices and MFA results **(key)**  
  _Rationale:_ Correct: sign-in logs directly show the authentication context needed to judge the alert.
- B. The firewall's total bytes-transferred counter  
  _Rationale:_ Byte counts do not reveal who signed in or from where.
- C. A list of installed applications on the server  
  _Rationale:_ Installed apps do not confirm an authentication event.
- D. The data-centre temperature logs  
  _Rationale:_ Irrelevant to a login investigation.

**MST-1015-Q0002** (multiple-answer, Select ALL that apply) Which two factors should drive the priority of an alert during triage? (Select TWO)

- A. The business impact if the alert is a true positive **(key)**  
  _Rationale:_ Correct: impact is a core triage dimension.
- B. The confidence that the alert is a true positive **(key)**  
  _Rationale:_ Correct: confidence (fidelity) is a core triage dimension.
- C. The alphabetical order of the alert name  
  _Rationale:_ Ordering by name is arbitrary and not risk-based.
- D. How recently the SIEM licence was renewed  
  _Rationale:_ Licensing is unrelated to alert priority.

**MST-1015-Q0003** (single-answer, Select ONE) What does mean time to detect (MTTD) measure?

- A. The average time from when an incident begins to when the SOC detects it **(key)**  
  _Rationale:_ Correct: MTTD is the gap between occurrence and detection.
- B. The average time to fully recover a system after an incident  
  _Rationale:_ That describes recovery time, not detection.
- C. The number of alerts generated per day  
  _Rationale:_ That is alert volume, not a time metric.
- D. The cost of the SIEM per analyst  
  _Rationale:_ That is a cost metric, unrelated to detection time.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
