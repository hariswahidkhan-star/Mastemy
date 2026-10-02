# ISC2 Certified in Cybersecurity: CC

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0241` v0.1.0 | Wave 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISC2 (no affiliation or endorsement) |
| Exam code | CC |
| Version basis | unresolved |
| Evidence | **unverified-needs-official-check** - issuer site blocked by egress proxy (EGRESS_BLOCKED) on 2026-10-02; verified_on empty. Domain structure below is a DESIGN ASSUMPTION. |
| Legacy IDs | MST-CYB-ISC2-CC-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain core security principles: confidentiality, integrity, availability, authentication and non-repudiation
2. Describe business continuity, disaster recovery and incident response concepts
3. Describe physical and logical access controls
4. Explain network security fundamentals and common threats
5. Describe security operations: data handling, awareness training and basic policies

> Outcomes are DESIGN ASSUMPTIONS derived without a verified official outline; confirm against the issuer's exam page at blueprint review.

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Security Principles (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Classify five scenarios against the CIA triad and name the property most at risk; (2) Map three controls to the risk they reduce and label each as administrative, technical or physical
- Common misconception addressed: Believing availability and integrity are the same concern
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Confidentiality, integrity and availability | 135 | 6 |
| M01L02 | Authentication, authorisation and non-repudiation | 135 | 6 |
| M01L03 | Risk management concepts | 135 | 6 |
| M01L04 | Security controls and governance basics | 135 | 6 |

### M02 Business Continuity, DR and Incident Response (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Order the incident response phases for a ransomware event; (2) Decide RTO vs RPO targets for two systems and justify
- Common misconception addressed: Confusing a disaster recovery plan with a business continuity plan
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Business continuity planning | 135 | 6 |
| M02L02 | Disaster recovery concepts | 135 | 6 |
| M02L03 | Incident response phases | 135 | 6 |

### M03 Access Control Concepts (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Choose access-control model (DAC/MAC/RBAC) for three organisations; (2) Apply least privilege to a role with excessive permissions
- Common misconception addressed: Assuming authentication and authorisation are a single step
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Physical access controls | 135 | 6 |
| M03L02 | Logical access controls | 135 | 6 |
| M03L03 | Identity and privileged access basics | 135 | 6 |

### M04 Network Security (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Match four attacks to the defence that mitigates them; (2) Segment a flat network into security zones for a small office
- Common misconception addressed: Thinking a firewall alone removes the need for segmentation
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Networking basics and the OSI/TCP-IP models | 135 | 6 |
| M04L02 | Common threats and attacks | 135 | 6 |
| M04L03 | Network defences: firewalls, segmentation, VPNs | 135 | 6 |

### M05 Security Operations (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Assign handling rules to four data classes; (2) Spot policy gaps in a sample acceptable-use policy
- Common misconception addressed: Treating data classification as a one-time task
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data handling and classification | 135 | 6 |
| M05L02 | Security awareness training | 135 | 6 |
| M05L03 | Policies and the security lifecycle | 135 | 6 |

## Integrative case

Integrative scenario synthesising the course's domains into a single applied decision task; defended with reasoning. DESIGN ASSUMPTION pending blueprint review.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer site blocked); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0241-practice-form-A | 81 | 81 | yes |
| MST-0241-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0241-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0241-final-protected | 81 | 81 | yes |

(answer review budget: 54 min; required forms 162 min + review = cumulative 216 min)

| Domain | Items per form |
|---|---|
| Security Principles | 17 |
| Business Continuity, DR and Incident Response | 16 |
| Access Control Concepts | 16 |
| Network Security | 16 |
| Security Operations | 16 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0241-Q0001** (single-answer, Select ONE) A hospital must ensure patient records are not altered by unauthorised staff. Which security property is the primary concern?

- A. Integrity **(key)**  
  _Rationale:_ Correct: integrity protects data from unauthorised or accidental modification.
- B. Availability  
  _Rationale:_ Availability concerns timely access, not whether data is altered.
- C. Confidentiality  
  _Rationale:_ Confidentiality concerns who can read data, not whether it is changed.
- D. Non-repudiation  
  _Rationale:_ Non-repudiation proves who performed an action; it does not itself prevent alteration.

**MST-0241-Q0002** (single-answer, Select ONE) During which incident response phase is the threat isolated to stop further damage?

- A. Containment **(key)**  
  _Rationale:_ Correct: containment limits the spread and impact of an incident.
- B. Detection  
  _Rationale:_ Detection identifies that an incident is occurring, before containment.
- C. Recovery  
  _Rationale:_ Recovery restores systems after the threat is removed.
- D. Lessons learned  
  _Rationale:_ Lessons learned is the post-incident review, after recovery.

**MST-0241-Q0003** (multiple-answer, Select TWO) Which TWO practices directly enforce the principle of least privilege?

- A. Granting users only the permissions their role requires **(key)**  
  _Rationale:_ Correct: role-scoped permissions are least privilege in action.
- B. Removing access promptly when a role changes **(key)**  
  _Rationale:_ Correct: timely deprovisioning keeps privileges minimal over time.
- C. Giving all staff local administrator rights for convenience  
  _Rationale:_ This grants excess privilege, the opposite of least privilege.
- D. Sharing one admin account across the team  
  _Rationale:_ Shared high-privilege accounts break accountability and over-grant access.
- E. Disabling all logging to reduce noise  
  _Rationale:_ Logging is unrelated to privilege scope and should not be disabled.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.