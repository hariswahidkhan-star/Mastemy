# CompTIA Security+

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0250` v0.1.0 | Batch 1 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | CompTIA (no affiliation or endorsement) |
| Exam code | SY0-701 |
| Version basis | SY0-701 objectives (reported English retirement 2027-06-11; SY0-801 in draft) |
| Evidence | **unverified-needs-official-check** - sources: SRC-COMPTIA-SECPLUS |
| Legacy IDs | MST-CYB-CMPT-SY0701-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain fundamental security concepts and controls
2. Analyse threats, vulnerabilities and mitigations
3. Evaluate security architecture across on-premises, cloud and hybrid
4. Apply security operations practices including IR and monitoring
5. Describe security programme management, risk and compliance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 General Security Concepts (12%)

- Worked applications: (1) Map controls to categories and types for a branch office; (2) Apply cryptographic concepts to a file-sharing requirement
- Common misconception addressed: Thinking hashing provides confidentiality
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Security controls | 64 | 4 |
| M01L02 | Fundamental security concepts | 64 | 4 |
| M01L03 | Change management | 64 | 4 |
| M01L04 | Cryptographic solutions | 67 | 4 |

### M02 Threats, Vulnerabilities, and Mitigations (22%)

- Worked applications: (1) Trace a phishing kill chain and select mitigations; (2) Prioritise vulnerabilities with CVSS and context
- Common misconception addressed: Assuming patching alone removes social-engineering risk
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Threat actors and motivations | 95 | 4 |
| M02L02 | Threat vectors and attack surfaces | 95 | 4 |
| M02L03 | Vulnerability types | 95 | 4 |
| M02L04 | Indicators of malicious activity | 95 | 4 |
| M02L05 | Mitigation techniques | 95 | 4 |

### M03 Security Architecture (18%)

- Worked applications: (1) Segment a network for payment systems; (2) Compare on-premises vs cloud security architecture trade-offs
- Common misconception addressed: Believing a firewall makes internal traffic trustworthy
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Architecture models | 97 | 4 |
| M03L02 | Securing enterprise infrastructure | 97 | 4 |
| M03L03 | Data protection | 97 | 4 |
| M03L04 | Resilience and recovery | 98 | 4 |

### M04 Security Operations (28%)

- Worked applications: (1) Triage SIEM alerts and decide escalation; (2) Walk through incident response phases for ransomware
- Common misconception addressed: Restoring from backup before containment and evidence capture
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Applying security techniques to computing resources | 67 | 4 |
| M04L02 | Asset management | 67 | 4 |
| M04L03 | Vulnerability management | 67 | 4 |
| M04L04 | Alerting and monitoring | 67 | 4 |
| M04L05 | Enterprise capability changes | 67 | 4 |
| M04L06 | Identity and access management | 67 | 4 |
| M04L07 | Automation and orchestration | 67 | 4 |
| M04L08 | Incident response | 67 | 4 |
| M04L09 | Using data sources for investigations | 69 | 4 |

### M05 Security Program Management and Oversight (20%)

- Worked applications: (1) Build a risk register entry with likelihood and impact; (2) Assess a third-party vendor against security requirements
- Common misconception addressed: Treating compliance as equivalent to security
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Security governance | 72 | 4 |
| M05L02 | Risk management | 72 | 4 |
| M05L03 | Third-party risk | 72 | 4 |
| M05L04 | Compliance | 72 | 4 |
| M05L05 | Audits and assessments | 72 | 4 |
| M05L06 | Security awareness | 72 | 4 |

## Integrative case

A regional credit union suffers a phishing-led ransomware attempt: classify the threat, choose controls and architecture changes, run the incident response, and update the risk register and policies.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION based on widely reported 'max 90 questions / 90 min' - NOT verified this session. Performance-based items are not reproducible in MCQ-only format.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0250-practice-form-A | 90 | 90 | yes |
| MST-0250-practice-form-B | 90 | 90 | no (optional practice) |
| MST-0250-practice-form-C | 90 | 90 | no (optional practice) |
| MST-0250-final-protected | 90 | 90 | yes |

| Domain | Items per form |
|---|---|
| General Security Concepts | 11 |
| Threats, Vulnerabilities, and Mitigations | 20 |
| Security Architecture | 16 |
| Security Operations | 25 |
| Security Program Management and Oversight | 18 |

Minimum reviewed item bank: 954 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0250-Q0001** (single-answer, Select ONE) Which control type is a security guard checking badges at a building entrance?

- A. Technical  
  _Rationale:_ Technical controls are implemented in technology, such as firewalls.
- B. Physical **(key)**  
  _Rationale:_ Correct: guards, locks and fences are physical controls.
- C. Managerial  
  _Rationale:_ Managerial controls are policies and risk assessments.
- D. Compensating  
  _Rationale:_ Compensating describes the control's function, not its category. A guard could be compensating, but 'physical' is the best category here.

**MST-0250-Q0002** (single-answer, Select ONE) An attacker sends texts pretending to be the bank and asking users to confirm credentials. What is this?

- A. Vishing  
  _Rationale:_ Vishing uses voice calls.
- B. Smishing **(key)**  
  _Rationale:_ Correct: smishing is phishing over SMS.
- C. Whaling  
  _Rationale:_ Whaling targets senior executives, usually by email.
- D. Pharming  
  _Rationale:_ Pharming redirects traffic by poisoning DNS or hosts files.

**MST-0250-Q0003** (single-answer, Select ONE) In incident response, which phase directly follows detection/analysis in the commonly used lifecycle?

- A. Preparation  
  _Rationale:_ Preparation comes before detection.
- B. Containment **(key)**  
  _Rationale:_ Correct: once an incident is confirmed, you contain it before eradication and recovery.
- C. Lessons learned  
  _Rationale:_ Lessons learned comes at the end.
- D. Recovery  
  _Rationale:_ Recovery follows containment and eradication.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
