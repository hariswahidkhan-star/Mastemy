# GIAC Certified Incident Handler (GCIH)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0284` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GIAC (Global Information Assurance Certification) (no affiliation or endorsement) |
| Exam code | (none published / not resolved) |
| Version basis | unresolved - official syllabus not verified (issuer egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - official domains, weightings, objective IDs, item counts and durations NOT verified; modules are Mastemy design groupings |
| Legacy IDs | (none) |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the incident handling process and the handler's role across its phases
2. Identify common attack techniques against hosts, networks and applications
3. Explain detection, containment, eradication and recovery actions for common incidents
4. Describe post-incident activity, reporting and lessons-learned practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance, speaking, essay, hands-on or simulation tasks) are not reproduced here; see the exam-version record.

## Modules

> Module groupings are Mastemy design decisions. The official blueprint domains and weightings were not verified (issuer site egress blocked); no percentage weights are claimed.

### M01 Incident handling process and preparation (weight not published - design grouping)

- Worked applications: (1) Order the phases of an incident for a reported malware alert and state the handler's goal in each; (2) Draft an initial scoping checklist for a suspected account compromise
- Common misconception addressed: Treating identification as a one-time step rather than continuous scoping
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Incident handling phases and roles | 180 | 6 |
| M01L02 | Preparation: policy, tooling and readiness | 180 | 6 |
| M01L03 | Identification and scoping an incident | 180 | 6 |
| M01L04 | Communication and documentation | 180 | 6 |

### M02 Attack techniques and detection (weight not published - design grouping)

- Worked applications: (1) Classify a set of observed events as reconnaissance, exploitation or lateral movement; (2) Read an excerpt of logs and identify the indicator that reveals the attack technique
- Common misconception addressed: Assuming all attacks leave obvious signatures in a single log source
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reconnaissance and scanning | 180 | 6 |
| M02L02 | Host and network attack techniques | 180 | 6 |
| M02L03 | Web and application attacks | 180 | 6 |
| M02L04 | Detecting malicious activity in logs and traffic | 180 | 6 |

### M03 Containment, eradication and recovery (weight not published - design grouping)

- Worked applications: (1) Choose short-term vs long-term containment for a worm spreading on a LAN and justify it; (2) Write the structure of a lessons-learned report for a resolved phishing incident
- Common misconception addressed: Rebuilding systems before the root cause is understood, risking reinfection
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Containment strategies | 180 | 6 |
| M03L02 | Eradication and system restoration | 180 | 6 |
| M03L03 | Recovery and monitoring | 180 | 6 |
| M03L04 | Post-incident review and reporting | 180 | 6 |

## Integrative case

A mid-sized company detects suspicious outbound traffic from a finance workstation: lead the incident from identification through recovery, decide containment under business pressure, and write the executive summary and lessons learned.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0284-practice-form-A | 81 | 81 | yes |
| MST-0284-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0284-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0284-final-protected | 81 | 81 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Incident handling process and preparation | 27 |
| Attack techniques and detection | 27 |
| Containment, eradication and recovery | 27 |

Minimum reviewed item bank: 846 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0284-Q0001** (single-answer, Select ONE) In the incident handling process, what is the primary goal of the containment phase?

- A. Limit the scope and spread of the incident while preserving evidence **(key)**  
  _Rationale:_ Correct: containment keeps damage from expanding and keeps evidence intact for analysis.
- B. Permanently remove the attacker's tools from all systems  
  _Rationale:_ That is eradication, which follows containment.
- C. Return affected systems to normal operation  
  _Rationale:_ That is recovery, a later phase.
- D. Identify which systems were affected  
  _Rationale:_ Identification/scoping precedes containment.

**MST-0284-Q0002** (single-answer, Select ONE) Logs show repeated connection attempts to many sequential TCP ports on one host from a single source. Which activity does this most likely indicate?

- A. A port scan during reconnaissance **(key)**  
  _Rationale:_ Correct: sequential probing of many ports from one source is a classic port scan.
- B. Data exfiltration  
  _Rationale:_ Exfiltration typically involves large outbound transfers to few destinations, not port probing.
- C. A successful privilege escalation  
  _Rationale:_ Privilege escalation would not appear as sequential port connection attempts.
- D. Normal patch management traffic  
  _Rationale:_ Patching does not sweep many sequential ports on a host.

**MST-0284-Q0003** (multiple-answer, Select TWO) Select TWO activities that belong to the post-incident (lessons-learned) phase.

- A. Documenting what happened and the timeline of events **(key)**  
  _Rationale:_ Correct: a factual record and timeline are core lessons-learned outputs.
- B. Recommending improvements to prevent recurrence **(key)**  
  _Rationale:_ Correct: identifying and recommending preventive improvements is a key post-incident outcome.
- C. Isolating the infected host from the network  
  _Rationale:_ That is containment, performed during the incident, not post-incident.
- D. Running the initial triage to confirm an incident  
  _Rationale:_ That is identification, an early phase.
- E. Deploying the attacker's payload in a lab to test it  
  _Rationale:_ Analysis may occur, but deploying payloads is not a lessons-learned phase activity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
