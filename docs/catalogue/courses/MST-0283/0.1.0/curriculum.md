# GIAC Security Essentials: GSEC

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0283` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GIAC (no affiliation or endorsement) |
| Exam code | GSEC |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-CYB-GIAC-GSEC-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain defence-in-depth, access control and security policy fundamentals
2. Apply cryptography and network security concepts
3. Describe Linux and Windows security essentials
4. Explain incident handling, security operations and monitoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Security Foundations and Access Control (weight: design assumption, unverified)

- Worked applications: (1) Map layered controls to the CIA triad for a sample data flow; (2) Choose an access-control model for a role-based business scenario
- Common misconception addressed: Treating authentication and authorisation as the same control
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defence in depth and risk concepts | 120 | 6 |
| M01L02 | Access control models and authentication | 120 | 6 |
| M01L03 | Security policy and awareness | 120 | 6 |

### M02 Cryptography and Network Security (weight: design assumption, unverified)

- Worked applications: (1) Select symmetric vs asymmetric cryptography for a confidentiality scenario; (2) Design a segmented network that limits lateral movement
- Common misconception addressed: Assuming TLS alone protects data at rest as well as in transit
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cryptography fundamentals and PKI | 120 | 6 |
| M02L02 | Network protocols and attacks | 120 | 6 |
| M02L03 | Network defence: firewalls, segmentation and VPNs | 120 | 6 |

### M03 Linux and Windows Security (weight: design assumption, unverified)

- Worked applications: (1) Harden a Linux host with least-privilege accounts and service minimisation; (2) Interpret Windows security event logs to spot a failed-logon pattern
- Common misconception addressed: Hardening the OS but leaving default service accounts and shares
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Linux security essentials | 120 | 6 |
| M03L02 | Windows security essentials | 120 | 6 |
| M03L03 | Endpoint hardening and logging | 120 | 6 |

### M04 Incident Handling and Security Operations (weight: design assumption, unverified)

- Worked applications: (1) Walk an alert through the incident-handling phases to containment; (2) Prioritise vulnerabilities using exposure and exploitability
- Common misconception addressed: Jumping to eradication before containment, destroying evidence
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Incident handling process | 120 | 6 |
| M04L02 | Security monitoring and log analysis | 120 | 6 |
| M04L03 | Vulnerability management and defensive operations | 120 | 6 |

## Integrative case

A security analyst builds a defensible posture for a small enterprise: apply defence-in-depth and access control, segment and encrypt the network, harden Linux and Windows hosts, and stand up monitoring and an incident-handling runbook; defend each control choice.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0283-practice-form-A | 57 | 57 | yes |
| MST-0283-practice-form-B | 57 | 57 | no (optional practice) |
| MST-0283-practice-form-C | 57 | 57 | no (optional practice) |
| MST-0283-final-protected | 57 | 57 | yes |

| Domain | Items per form |
|---|---|
| Security Foundations and Access Control | 15 |
| Cryptography and Network Security | 14 |
| Linux and Windows Security | 14 |
| Incident Handling and Security Operations | 14 |

Minimum reviewed item bank: 624 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0283-Q0001** (single-answer, Select ONE) Which control most directly supports the 'confidentiality' element of the CIA triad for data in transit?

- A. Encryption of the traffic **(key)**  
  _Rationale:_ Correct: encryption keeps data in transit confidential.
- B. A load balancer  
  _Rationale:_ Load balancing distributes traffic; it does not protect confidentiality.
- C. A RAID array  
  _Rationale:_ RAID supports availability/durability, not confidentiality.
- D. A faster CPU  
  _Rationale:_ Compute speed does not provide confidentiality.

**MST-0283-Q0002** (single-answer, Select ONE) During incident handling, why must containment generally precede eradication?

- A. To stop the spread and preserve evidence before removing the threat **(key)**  
  _Rationale:_ Correct: containment limits damage and preserves evidence for analysis.
- B. Because eradication is optional  
  _Rationale:_ Eradication is a required later phase, not optional.
- C. Because containment restores normal operations  
  _Rationale:_ Restoration is the recovery phase, not containment.
- D. Because it assigns blame  
  _Rationale:_ Incident handling focuses on response, not blame.

**MST-0283-Q0003** (multiple-answer, Select TWO) Which TWO are sound defence-in-depth practices? (Select TWO)

- A. Combine network, host and application controls **(key)**  
  _Rationale:_ Correct: layered controls mean one failure does not expose everything.
- B. Apply least privilege to accounts **(key)**  
  _Rationale:_ Correct: least privilege limits the blast radius of a compromise.
- C. Rely on a single perimeter firewall alone  
  _Rationale:_ A single control is a single point of failure.
- D. Give all users administrator rights  
  _Rationale:_ Universal admin rights violate least privilege.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
