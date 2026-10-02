# Cisco CCNP Security: SCOR Core Exam

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0262` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Cisco (no affiliation or endorsement) |
| Exam code | 350-701 |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-CYB-CSCO-SCOR-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain security concepts, common threats and cryptography fundamentals
2. Configure network security including firewalls, VPNs and segmentation
3. Describe cloud security, email/web content security and endpoint protection
4. Implement secure network access, visibility and enforcement with identity services

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Security Concepts (weight: design assumption, unverified)

- Worked applications: (1) Map a phishing-to-ransomware kill chain to the controls that break each stage; (2) Choose symmetric vs asymmetric crypto for three data-protection scenarios
- Common misconception addressed: Treating encryption as a substitute for authentication and integrity controls
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Common threats, vulnerabilities and attack surfaces | 120 | 6 |
| M01L02 | Cryptography and PKI fundamentals | 120 | 6 |
| M01L03 | Security intelligence and the shared security model | 120 | 6 |

### M02 Network Security (weight: design assumption, unverified)

- Worked applications: (1) Place a next-gen firewall and segment a flat network into trust zones; (2) Select an IPsec vs SSL VPN design for a mixed remote-worker population
- Common misconception addressed: Assuming a perimeter firewall removes the need for east-west segmentation
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Firewall deployment modes and policy | 120 | 6 |
| M02L02 | Site-to-site and remote-access VPNs | 120 | 6 |
| M02L03 | Network segmentation and intrusion prevention | 120 | 6 |

### M03 Securing the Cloud (weight: design assumption, unverified)

- Worked applications: (1) Assign shared-responsibility security duties across IaaS, PaaS and SaaS workloads; (2) Design API security controls for a public-facing cloud service
- Common misconception addressed: Believing the cloud provider secures customer data and identities by default
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cloud service and deployment models and responsibilities | 120 | 6 |
| M03L02 | Securing cloud workloads and APIs | 120 | 6 |
| M03L03 | Cloud logging, posture and compliance | 120 | 6 |

### M04 Content Security (weight: design assumption, unverified)

- Worked applications: (1) Tune an email security policy to cut phishing without blocking legitimate mail; (2) Design layered web and DNS controls for a guest network
- Common misconception addressed: Relying on a single content filter rather than layered controls
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Email security and anti-phishing controls | 120 | 6 |
| M04L02 | Web security and URL filtering | 120 | 6 |
| M04L03 | DNS-layer security | 120 | 6 |

### M05 Endpoint Protection and Detection (weight: design assumption, unverified)

- Worked applications: (1) Build an EDR triage workflow from alert to containment; (2) Define posture-assessment rules that quarantine non-compliant endpoints
- Common misconception addressed: Confusing signature antivirus with behaviour-based EDR detection
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Endpoint protection platforms and EDR | 120 | 6 |
| M05L02 | Endpoint posture and patching | 120 | 6 |
| M05L03 | Threat hunting on endpoints | 120 | 6 |

### M06 Secure Network Access, Visibility and Enforcement (weight: design assumption, unverified)

- Worked applications: (1) Design an 802.1X deployment with a monitor-mode-to-enforcement rollout; (2) Correlate flow telemetry and identity data to scope a compromised host
- Common misconception addressed: Enabling enforcement before profiling, locking out legitimate devices
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Identity and 802.1X network access control | 120 | 6 |
| M06L02 | Device profiling and posture enforcement | 120 | 6 |
| M06L03 | Telemetry, NetFlow and visibility | 120 | 6 |

## Integrative case

A mid-size company adopting a hybrid-cloud model must build a defence-in-depth architecture: segment the network, secure cloud workloads and email, deploy EDR, and enforce identity-based access; justify each control against a stated threat model.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0262-practice-form-A | 93 | 93 | yes |
| MST-0262-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0262-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0262-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Security Concepts | 16 |
| Network Security | 16 |
| Securing the Cloud | 16 |
| Content Security | 15 |
| Endpoint Protection and Detection | 15 |
| Secure Network Access, Visibility and Enforcement | 15 |

Minimum reviewed item bank: 966 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0262-Q0001** (single-answer, Select ONE) A design must protect data confidentiality at rest and allow fast bulk encryption. Which approach fits best?

- A. Symmetric encryption with a protected key **(key)**  
  _Rationale:_ Correct: symmetric ciphers are efficient for bulk data; the key must be protected.
- B. Asymmetric encryption of all stored data  
  _Rationale:_ Asymmetric encryption is slow and impractical for bulk data at rest.
- C. Hashing the data  
  _Rationale:_ Hashing provides integrity, not confidentiality or recoverability.
- D. Base64 encoding  
  _Rationale:_ Encoding is reversible by anyone and provides no confidentiality.

**MST-0262-Q0002** (single-answer, Select ONE) In a flat network, which control most directly limits east-west lateral movement after a host is compromised?

- A. Network segmentation **(key)**  
  _Rationale:_ Correct: segmentation restricts lateral movement between zones.
- B. A stronger perimeter firewall  
  _Rationale:_ A perimeter firewall governs north-south traffic, not lateral movement inside.
- C. Longer passwords  
  _Rationale:_ Password strength does not constrain lateral network reachability.
- D. More log storage  
  _Rationale:_ More logging aids detection but does not limit movement.

**MST-0262-Q0003** (multiple-answer, Select TWO) Which TWO are shared-responsibility duties that remain with the customer across IaaS, PaaS and SaaS? (Select TWO)

- A. Managing user identities and access **(key)**  
  _Rationale:_ Correct: identity and access management stays with the customer in all models.
- B. Classifying and protecting their own data **(key)**  
  _Rationale:_ Correct: data ownership and classification always stay with the customer.
- C. Securing the physical datacenter  
  _Rationale:_ Physical security is always the provider's responsibility.
- D. Patching the hypervisor  
  _Rationale:_ The hypervisor is the provider's responsibility in all three models.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
