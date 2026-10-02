# ISC2 Systems Security Certified Practitioner: SSCP

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0242` v0.1.0 | Wave 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISC2 (no affiliation or endorsement) |
| Exam code | SSCP |
| Version basis | unresolved |
| Evidence | **unverified-needs-official-check** - issuer site blocked by egress proxy (EGRESS_BLOCKED) on 2026-10-02; verified_on empty. Domain structure below is a DESIGN ASSUMPTION. |
| Legacy IDs | MST-CYB-ISC2-SSCP-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply security operations and administration practices
2. Perform access control and identity management tasks
3. Carry out risk identification, monitoring and analysis
4. Respond to incidents and support recovery
5. Apply cryptography, and network and communications security
6. Secure systems and applications

> Outcomes are DESIGN ASSUMPTIONS derived without a verified official outline; confirm against the issuer's exam page at blueprint review.

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Security Operations and Administration (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Write change-control steps for a firewall rule update; (2) Classify assets and assign handling requirements
- Common misconception addressed: Treating configuration management as optional documentation
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Code of ethics and security concepts | 120 | 6 |
| M01L02 | Asset and configuration management | 120 | 6 |
| M01L03 | Change management and security awareness | 120 | 6 |

### M02 Access Controls (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Design an MFA scheme for remote staff; (2) Apply RBAC to a least-privilege redesign
- Common misconception addressed: Equating single sign-on with multi-factor authentication
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authentication methods | 120 | 6 |
| M02L02 | Identity management lifecycle | 120 | 6 |
| M02L03 | Authorisation models and trust architectures | 120 | 6 |

### M03 Risk Identification, Monitoring and Analysis (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Prioritise three risks using likelihood and impact; (2) Interpret a log excerpt to spot anomalous access
- Common misconception addressed: Believing more alerts always means better monitoring
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Risk management processes | 120 | 6 |
| M03L02 | Security monitoring and logging | 120 | 6 |
| M03L03 | Analysis of monitoring results | 120 | 6 |

### M04 Incident Response and Recovery (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Sequence a response to credential compromise; (2) Choose backup strategy to meet an RPO
- Common misconception addressed: Collecting evidence without preserving chain of custody
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Incident handling lifecycle | 120 | 6 |
| M04L02 | Forensic handling basics | 120 | 6 |
| M04L03 | Business continuity and disaster recovery | 120 | 6 |

### M05 Cryptography (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Select symmetric vs asymmetric crypto for three needs; (2) Diagnose a certificate trust failure
- Common misconception addressed: Thinking encryption alone guarantees message integrity
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cryptographic concepts | 120 | 6 |
| M05L02 | Public key infrastructure | 120 | 6 |
| M05L03 | Secure protocols and key management | 120 | 6 |

### M06 Network and Communications Security (weighting: DESIGN ASSUMPTION)

- Worked applications: (1) Segment a network to contain lateral movement; (2) Harden a wireless deployment
- Common misconception addressed: Assuming a VPN encrypts traffic after it leaves the tunnel
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Network attacks and countermeasures | 120 | 6 |
| M06L02 | Secure network design | 120 | 6 |
| M06L03 | Wireless and remote-access security | 120 | 6 |

## Integrative case

Integrative scenario synthesising the course's domains into a single applied decision task; defended with reasoning. DESIGN ASSUMPTION pending blueprint review.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer site blocked); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0242-practice-form-A | 81 | 81 | yes |
| MST-0242-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0242-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0242-final-protected | 81 | 81 | yes |

(answer review budget: 54 min; required forms 162 min + review = cumulative 216 min)

| Domain | Items per form |
|---|---|
| Security Operations and Administration | 14 |
| Access Controls | 14 |
| Risk Identification, Monitoring and Analysis | 14 |
| Incident Response and Recovery | 13 |
| Cryptography | 13 |
| Network and Communications Security | 13 |

Minimum reviewed item bank: 918 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0242-Q0001** (single-answer, Select ONE) A practitioner must choose a control that prevents a terminated employee from accessing systems the same day. Which control is most effective?

- A. Automated deprovisioning tied to the HR termination event **(key)**  
  _Rationale:_ Correct: event-driven deprovisioning removes access immediately and reliably.
- B. Quarterly access reviews  
  _Rationale:_ Quarterly reviews leave a window of up to three months of access.
- C. Annual security awareness training  
  _Rationale:_ Training does not remove a departed user's access.
- D. Longer password complexity rules  
  _Rationale:_ Password rules do not disable an existing valid account.

**MST-0242-Q0002** (single-answer, Select ONE) Which cryptographic service provides proof that a specific sender created a message?

- A. Digital signature **(key)**  
  _Rationale:_ Correct: a digital signature binds the message to the sender's private key, giving non-repudiation.
- B. Symmetric encryption  
  _Rationale:_ A shared symmetric key cannot prove which party sent the message.
- C. Hashing alone  
  _Rationale:_ A bare hash gives integrity but not sender identity.
- D. Salting  
  _Rationale:_ Salting strengthens stored password hashes; it is unrelated to sender proof.

**MST-0242-Q0003** (multiple-answer, Select TWO) Which TWO actions best preserve forensic evidence during incident response?

- A. Capture a bit-for-bit image of affected storage **(key)**  
  _Rationale:_ Correct: an exact image preserves the original state for analysis.
- B. Document a chain of custody for collected evidence **(key)**  
  _Rationale:_ Correct: chain of custody keeps evidence admissible and trustworthy.
- C. Reboot the affected host to clear the malware  
  _Rationale:_ Rebooting destroys volatile memory and running-state evidence.
- D. Edit logs to highlight the suspicious entries  
  _Rationale:_ Altering logs destroys evidence integrity.
- E. Delete the malicious files immediately  
  _Rationale:_ Deleting removes evidence needed for analysis.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.