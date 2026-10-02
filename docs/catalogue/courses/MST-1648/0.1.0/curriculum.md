# Cisco Certified Support Technician (CCST) Cybersecurity Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1648` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Cisco (no affiliation or endorsement) |
| Exam code | (not published as a short code; see title) |
| Version basis | unresolved (unconfirmed) |
| Evidence | **unverified-needs-official-check** - official outline not fetched (egress blocked); no source IDs |
| Legacy IDs | MST-CYB-CSCO-CCSTCYB-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Demonstrate knowledge of the 'Essential Security Principles' domain to the depth required for independent exam preparation
2. Demonstrate knowledge of the 'Basic Network Security Concepts' domain to the depth required for independent exam preparation
3. Demonstrate knowledge of the 'Endpoint Security Concepts' domain to the depth required for independent exam preparation
4. Demonstrate knowledge of the 'Vulnerability Assessment and Risk Management' domain to the depth required for independent exam preparation
5. Demonstrate knowledge of the 'Incident Handling' domain to the depth required for independent exam preparation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope (design-assumption) outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on, performance-based or other official item formats are not reproduced in this format.

> Domain structure below is a **design assumption** drafted from general knowledge of this credential. It was **not** verified against the issuer's official exam outline (egress blocked). Domain names, weights, question counts and durations must be confirmed before production.

## Modules

### M01 Essential Security Principles (weight: design assumption - confirm against official outline)

- Worked applications: (1) Classify example controls as administrative, technical or physical; (2) Map three requirements to confidentiality, integrity or availability
- Common misconception addressed: Confusing authentication (who you are) with authorisation (what you may do)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Define the CIA triad and core security concepts | 80 | 6 |
| M01L02 | Describe security policies, standards and controls | 80 | 6 |
| M01L03 | Explain authentication, authorisation and accounting (AAA) | 80 | 6 |

### M02 Basic Network Security Concepts (weight: design assumption - confirm against official outline)

- Worked applications: (1) Choose where to place a firewall and IDS in a simple network diagram; (2) Match three attacks (DDoS, MITM, spoofing) to a mitigating control
- Common misconception addressed: Believing an IDS blocks attacks rather than detecting and alerting on them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Describe common network attacks and threat actors | 80 | 6 |
| M02L02 | Explain firewalls, IDS/IPS and segmentation | 80 | 6 |
| M02L03 | Describe secure protocols and VPNs | 80 | 6 |

### M03 Endpoint Security Concepts (weight: design assumption - confirm against official outline)

- Worked applications: (1) Build a hardening checklist for a new workstation image; (2) Decide which data states (rest, transit, use) three scenarios require encrypting
- Common misconception addressed: Assuming antivirus alone is sufficient endpoint protection without patching
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Harden operating systems and endpoints | 80 | 6 |
| M03L02 | Describe antimalware, EDR and patching | 80 | 6 |
| M03L03 | Explain encryption for data at rest and in transit | 80 | 6 |

### M04 Vulnerability Assessment and Risk Management (weight: design assumption - confirm against official outline)

- Worked applications: (1) Prioritise four scan findings using severity and asset value; (2) Pick a treatment (mitigate, transfer, accept, avoid) for three risks
- Common misconception addressed: Treating a high CVSS score as automatically the top business priority
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Describe vulnerabilities, exploits and CVEs | 80 | 6 |
| M04L02 | Perform basic vulnerability scanning and prioritisation | 80 | 6 |
| M04L03 | Explain risk assessment and treatment options | 80 | 6 |

### M05 Incident Handling (weight: design assumption - confirm against official outline)

- Worked applications: (1) Order a set of actions into the correct incident response phases; (2) Decide what to preserve first when handling evidence for a compromised host
- Common misconception addressed: Wiping a compromised machine before collecting forensic evidence
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Describe the incident response lifecycle | 80 | 6 |
| M05L02 | Explain logging, monitoring and evidence handling | 80 | 6 |
| M05L03 | Describe disaster recovery and business continuity basics | 80 | 6 |

## Integrative case

A junior analyst responds to a suspected compromise at a small firm: apply core security principles, read the network and endpoint defences in place, triage a vulnerability scan, follow the incident response lifecycle while preserving evidence, and recommend recovery and hardening steps.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam outline not fetched (egress blocked); question count, duration and domain weights are unconfirmed. Confirm on the issuer's official exam page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1648-practice-form-A | 40 | 40 | yes |
| MST-1648-practice-form-B | 40 | 40 | no (optional practice) |
| MST-1648-practice-form-C | 40 | 40 | no (optional practice) |
| MST-1648-final-protected | 40 | 40 | yes |

| Domain | Items per form |
|---|---|
| Essential Security Principles | 8 |
| Basic Network Security Concepts | 8 |
| Endpoint Security Concepts | 8 |
| Vulnerability Assessment and Risk Management | 8 |
| Incident Handling | 8 |

Minimum reviewed item bank: 550 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1648-Q0001** (single-answer, Select ONE) A control ensures that data has not been altered in transit. Which element of the CIA triad does it support?

- A. Integrity **(key)**  
  _Rationale:_ Correct: integrity is about data being accurate and unaltered.
- B. Confidentiality  
  _Rationale:_ Confidentiality concerns who can read data, not whether it was altered.
- C. Availability  
  _Rationale:_ Availability concerns access and uptime, not alteration.
- D. Accounting  
  _Rationale:_ Accounting tracks actions; it is not part of the CIA triad.

**MST-1648-Q0002** (single-answer, Select ONE) What does an intrusion detection system (IDS) do when it sees a suspicious packet?

- A. Detects and alerts on it **(key)**  
  _Rationale:_ Correct: an IDS detects and alerts; it does not block by itself (an IPS blocks).
- B. Automatically blocks and drops it  
  _Rationale:_ Blocking is the role of an IPS, not a passive IDS.
- C. Encrypts the whole network  
  _Rationale:_ An IDS does not perform network encryption.
- D. Formats the attacker's disk  
  _Rationale:_ That is not a function of an IDS.

**MST-1648-Q0003** (multiple-answer, Select TWO) Which TWO actions should be taken FIRST when handling a potentially compromised host? (Select TWO.)

- A. Preserve volatile evidence before powering down **(key)**  
  _Rationale:_ Correct: volatile data is lost on shutdown, so preserve it first.
- B. Follow the organisation's incident response plan **(key)**  
  _Rationale:_ Correct: acting within the IR plan keeps the response controlled and lawful.
- C. Immediately reformat the disk  
  _Rationale:_ Reformatting destroys forensic evidence.
- D. Post the incident publicly on social media  
  _Rationale:_ That is inappropriate disclosure and harms the response.
- E. Ignore it until the next maintenance window  
  _Rationale:_ Delay lets the compromise spread and evidence decay.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
