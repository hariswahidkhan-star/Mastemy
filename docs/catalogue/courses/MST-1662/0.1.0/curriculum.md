# SIEM and Log Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1662` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-SLA-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — SIEM and Log Analysis (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain the purpose of SIEM and log management in security operations
2. Describe log sources, collection and normalisation
3. Build and interpret correlation rules and alerts
4. Investigate an alert using searches and dashboards
5. Tune detections to reduce false positives responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 SIEM foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) List the log sources needed to detect account misuse; (2) Explain the value of a single search across many systems
- Common misconception addressed: Believing a SIEM detects threats without configured rules
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a SIEM does and why centralise logs | 72 | 6 |
| M01L02 | Use cases and the role in a SOC | 72 | 6 |

### M02 Log collection and normalisation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide how to collect logs from a device without an agent; (2) Explain why accurate timestamps matter for correlation
- Common misconception addressed: Assuming logs from different systems already share one format and clock
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Agents, syslog and forwarding | 72 | 6 |
| M02L02 | Parsing, normalisation and time synchronisation | 72 | 6 |

### M03 Correlation and alerting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a rule for brute force followed by a successful login; (2) Assign severity to three sample alerts
- Common misconception addressed: Treating every alert as equally urgent
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Correlation rules and thresholds | 72 | 6 |
| M03L02 | Alert severity and prioritisation | 72 | 6 |

### M04 Investigation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Pivot from one alert to the related events; (2) Build a timeline for a suspicious login sequence
- Common misconception addressed: Closing an alert without checking related activity
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Searching and pivoting across events | 72 | 6 |
| M04L02 | Dashboards and timelines | 72 | 6 |

### M05 Tuning and maintenance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Tune a noisy rule without losing true detections; (2) Identify a coverage gap from a missed event
- Common misconception addressed: Silencing a noisy rule so completely that real attacks are hidden
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reducing false positives | 72 | 6 |
| M05L02 | Content review and coverage gaps | 72 | 6 |

## Integrative case

A security team is drowning in alerts and missing real incidents. Decide which log sources matter, write a correlation rule for repeated failed logins followed by a success, build a triage dashboard, and tune a noisy rule without hiding genuine threats.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1662-final-protected | 25 | 25 | yes |
| MST-1662-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| SIEM foundations | 5 |
| Log collection and normalisation | 5 |
| Correlation and alerting | 5 |
| Investigation | 5 |
| Tuning and maintenance | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1662-Q0001** (single-answer, Select ONE) Why is accurate, synchronised time across log sources important for a SIEM?

- A. Correlating events in the right order depends on consistent timestamps **(key)**  
  _Rationale:_ Correct: skewed clocks break the sequencing that correlation relies on.
- B. It makes log files smaller  
  _Rationale:_ Time synchronisation does not reduce file size.
- C. It encrypts the logs  
  _Rationale:_ Clock sync is unrelated to encryption.
- D. It removes the need for parsing  
  _Rationale:_ Parsing is still required regardless of time sync.

**MST-1662-Q0002** (multiple-answer, Select TWO) Which TWO are good ways to reduce false positives without hiding real threats? (Select TWO.)

- A. Refine the rule logic to match the true attack pattern more precisely **(key)**  
  _Rationale:_ Correct: tighter logic cuts noise while keeping real detections.
- B. Exclude a specific, verified benign source with documentation **(key)**  
  _Rationale:_ Correct: a documented, scoped exclusion reduces noise safely.
- C. Disable the rule entirely  
  _Rationale:_ Disabling removes detection along with the noise.
- D. Raise the threshold so high nothing ever alerts  
  _Rationale:_ An unreachable threshold hides genuine attacks.

**MST-1662-Q0003** (single-answer, Select ONE) A correlation rule fires on many failed logins followed by a success from the same source. What does this most likely indicate?

- A. A possible successful brute-force or password-guessing attack **(key)**  
  _Rationale:_ Correct: repeated failures then success is a classic brute-force signature.
- B. A printer running out of toner  
  _Rationale:_ Printing status is unrelated to login patterns.
- C. A normal, expected login with no concern  
  _Rationale:_ The burst of failures makes this worth investigating.
- D. A software update completing  
  _Rationale:_ Updates do not produce failed-then-successful logins.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
