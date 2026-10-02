# Cisco CyberOps Associate (CBROPS 200-201) Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1649` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Cisco (no affiliation or endorsement) |
| Exam code | 200-201 |
| Version basis | unresolved - official syllabus not verified (issuer egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - official domains, weightings, objective IDs, item counts and durations NOT verified; modules are Mastemy design groupings |
| Legacy IDs | MST-CYB-CSCO-CBROPS-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain security concepts used in a security operations centre
2. Describe security monitoring, data types and analysis methods
3. Analyse host-based and network intrusion data for indicators
4. Describe security policies, procedures and incident response handling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance, speaking, essay, hands-on or simulation tasks) are not reproduced here; see the exam-version record.

## Modules

> Module groupings are Mastemy design decisions. The official blueprint domains and weightings were not verified (issuer site egress blocked); no percentage weights are claimed.

### M01 Security concepts and monitoring (weight not published - design grouping)

- Worked applications: (1) Map an observed event to a breach of confidentiality, integrity or availability; (2) Choose the monitoring data type that best answers a given investigation question
- Common misconception addressed: Treating an IDS alert as proof of compromise without corroborating data
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core security concepts and the CIA triad | 180 | 6 |
| M01L02 | Security deployment and access control models | 180 | 6 |
| M01L03 | Security monitoring data types | 180 | 6 |
| M01L04 | Evasion and anti-forensic techniques | 180 | 6 |

### M02 Host and network analysis (weight not published - design grouping)

- Worked applications: (1) Examine host artefacts to decide whether a process is benign or suspicious; (2) Correlate network flow records with an alert to confirm an indicator of compromise
- Common misconception addressed: Confusing full packet capture with flow data when deciding what evidence is available
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Endpoint and host-based analysis | 180 | 6 |
| M02L02 | Network protocols and traffic analysis | 180 | 6 |
| M02L03 | Identifying indicators of compromise | 180 | 6 |
| M02L04 | Working with logs and packet data | 180 | 6 |

### M03 Policies, procedures and incident response (weight not published - design grouping)

- Worked applications: (1) Place a reported event into the correct incident-response phase and next action; (2) Draft a short playbook step for triaging a phishing report in the SOC
- Common misconception addressed: Assuming incident response ends once the threat is contained
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Security policies and procedures | 180 | 6 |
| M03L02 | Incident response handling and NIST phases | 180 | 6 |
| M03L03 | Classifying and scoring events | 180 | 6 |
| M03L04 | Playbooks and SOC workflows | 180 | 6 |

## Integrative case

A SOC analyst receives an alert for suspicious PowerShell on a workstation: decide what monitoring data to pull, analyse host and network artefacts to confirm compromise, classify the event, and follow the playbook to the correct response phase.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1649-practice-form-A | 81 | 81 | yes |
| MST-1649-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1649-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1649-final-protected | 81 | 81 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Security concepts and monitoring | 27 |
| Host and network analysis | 27 |
| Policies, procedures and incident response | 27 |

Minimum reviewed item bank: 846 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1649-Q0001** (single-answer, Select ONE) Which security principle is violated when an attacker alters records in a database without authorisation?

- A. Integrity **(key)**  
  _Rationale:_ Correct: unauthorised alteration of data is a loss of integrity.
- B. Availability  
  _Rationale:_ Availability concerns whether data/services are accessible, not whether they were altered.
- C. Confidentiality  
  _Rationale:_ Confidentiality concerns unauthorised disclosure, not alteration.
- D. Non-repudiation  
  _Rationale:_ Non-repudiation concerns proving who performed an action, not the alteration itself.

**MST-1649-Q0002** (single-answer, Select ONE) An analyst needs to know exactly which bytes were sent in a suspicious session. Which data source is most appropriate?

- A. Full packet capture **(key)**  
  _Rationale:_ Correct: full packet capture preserves complete payloads, allowing byte-level inspection.
- B. NetFlow records  
  _Rationale:_ NetFlow summarises conversations (addresses, ports, volume) but not payload contents.
- C. Firewall allow/deny counts  
  _Rationale:_ Counts show policy hits, not session contents.
- D. DNS query logs  
  _Rationale:_ DNS logs show name lookups, not the bytes of an arbitrary session.

**MST-1649-Q0003** (multiple-answer, Select TWO) Select TWO items that are classic indicators of compromise (IOCs).

- A. A known-malicious file hash observed on an endpoint **(key)**  
  _Rationale:_ Correct: a malicious file hash is a well-established IOC.
- B. Beaconing network traffic to a known command-and-control domain **(key)**  
  _Rationale:_ Correct: periodic callbacks to a known C2 domain are a recognised IOC.
- C. A scheduled, approved software update  
  _Rationale:_ Approved maintenance activity is expected and is not an IOC.
- D. A user logging in during their normal shift from their usual device  
  _Rationale:_ Normal, expected behaviour is a baseline, not an indicator of compromise.
- E. Successful completion of a routine backup job  
  _Rationale:_ A routine backup success is normal operations, not an IOC.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
