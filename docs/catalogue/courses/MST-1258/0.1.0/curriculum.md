# ISACA Certified Cybersecurity Operations Analyst: CCOA

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1258` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISACA (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed from an official source (kept out of official_exam_code) |
| Version basis | DESIGN ASSUMPTION - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02) |
| Legacy IDs | MST-CYB-ISACA-CCOA-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain cybersecurity operations concepts, the SOC function and relevant frameworks
2. Apply threat detection, monitoring and log analysis across networks and endpoints
3. Conduct incident detection, triage, response and recovery activities
4. Perform vulnerability assessment and apply security controls and hardening

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> **Module structure, titles and all weightings below are DESIGN ASSUMPTIONS.** The official exam outline could not be fetched (network egress blocked on 2026-10-02) and must be confirmed against the issuer's official source before SME review and publication.

## Modules

### M01 Security Operations Foundations and Monitoring (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Interpret a SIEM alert and the log fields that triggered it; (2) Map a detection to a stage of an attack lifecycle (e.g. MITRE ATT&CK tactic)
- Common misconception addressed: Assuming more alerts always mean better security rather than more noise and alert fatigue
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SOC roles, workflows and cybersecurity frameworks | 120 | 6 |
| M01L02 | Networking and endpoint fundamentals for defenders | 120 | 6 |
| M01L03 | Logging, SIEM and building useful detections | 120 | 6 |

### M02 Threat Detection and Analysis (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Distinguish an indicator of compromise from an indicator of attack; (2) Analyse a suspicious outbound connection to decide if it is beaconing
- Common misconception addressed: Treating a single IoC match as confirmed compromise without corroboration
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Common attack techniques and indicators of compromise | 120 | 6 |
| M02L02 | Network traffic and packet analysis basics | 120 | 6 |
| M02L03 | Endpoint, malware and behavioural detection | 120 | 6 |

### M03 Incident Response, Vulnerabilities and Hardening (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Prioritise two vulnerabilities using severity and exploitability context; (2) Choose a containment action for a compromised host and justify it
- Common misconception addressed: Believing that patching alone (ignoring containment and detection) is a complete incident response
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Incident triage, response lifecycle and containment | 120 | 6 |
| M03L02 | Vulnerability identification, scoring and prioritisation | 120 | 6 |
| M03L03 | Security controls, hardening and recovery | 120 | 6 |

## Integrative case

A SOC analyst sees an alert for repeated failed logins followed by a successful login from an unusual location: triage the alert using logs, determine whether it is an incident, contain it, and recommend hardening to prevent recurrence.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source was not fetched; official question count, duration and domain weightings must be confirmed on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1258-practice-form-A | 45 | 45 | yes |
| MST-1258-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1258-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1258-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Security Operations Foundations and Monitoring | 15 |
| Threat Detection and Analysis | 15 |
| Incident Response, Vulnerabilities and Hardening | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1258-Q0001** (single-answer, Select ONE) What is the primary purpose of a SIEM in a security operations centre?

- A. To aggregate and correlate log/event data from many sources for detection and analysis **(key)**  
  _Rationale:_ Correct: a SIEM centralises and correlates events across sources to support detection and investigation.
- B. To physically patch vulnerable servers automatically  
  _Rationale:_ Patching is a separate function; a SIEM does not apply patches.
- C. To replace the need for any human analysts  
  _Rationale:_ A SIEM supports analysts; it does not remove the need for human triage.
- D. To encrypt all data at rest across the enterprise  
  _Rationale:_ Encryption is a separate control, not the role of a SIEM.

**MST-1258-Q0002** (single-answer, Select ONE) During triage, an analyst confirms malware is actively spreading from one workstation to others. Which immediate action best limits damage?

- A. Isolate/contain the affected host from the network **(key)**  
  _Rationale:_ Correct: containment (network isolation) limits lateral spread while investigation continues.
- B. Immediately wipe and reimage every machine in the company  
  _Rationale:_ That is disproportionate and destroys evidence before scoping the incident.
- C. Wait until the next scheduled patch cycle  
  _Rationale:_ Waiting allows the malware to continue spreading.
- D. Ignore it because antivirus will handle it  
  _Rationale:_ Active spread requires a containment decision, not passive reliance on AV.

**MST-1258-Q0003** (multiple-answer, Select TWO) Select TWO items that are examples of indicators of compromise (IoCs).

- A. A known-malicious file hash found on an endpoint **(key)**  
  _Rationale:_ Correct: a matching malicious hash is a classic IoC.
- B. Outbound traffic to a known command-and-control domain **(key)**  
  _Rationale:_ Correct: communication with a known C2 domain is an IoC.
- C. A documented change-management approval  
  _Rationale:_ An approved change is normal activity, not an indicator of compromise.
- D. A scheduled, authorised vulnerability scan  
  _Rationale:_ An authorised scan is expected activity, not an IoC.
- E. A user successfully using single sign-on during business hours  
  _Rationale:_ Normal authenticated activity is not an indicator of compromise.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
