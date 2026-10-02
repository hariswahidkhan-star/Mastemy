# Network Security

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1659` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-NS-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Network Security (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain core network security goals and the defence-in-depth model
2. Describe common network attacks and how they are detected
3. Apply segmentation, access control and secure protocols
4. Configure and interpret basic monitoring and logging for a network
5. Recommend controls appropriate to a given network risk

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Network security foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify the attack surface of a small office network; (2) Map three controls to confidentiality, integrity and availability
- Common misconception addressed: Believing a single firewall is enough for network security
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CIA goals and defence in depth | 72 | 6 |
| M01L02 | Trust zones and the attack surface | 72 | 6 |

### M02 Common attacks (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain how ARP spoofing enables a man-in-the-middle; (2) Spot signs of lateral movement in a scenario
- Common misconception addressed: Assuming attacks only come from outside the perimeter
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sniffing, spoofing and man-in-the-middle | 72 | 6 |
| M02L02 | Denial of service and lateral movement | 72 | 6 |

### M03 Segmentation and access control (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design VLANs to separate guests from servers; (2) Write an ACL rule that allows only required traffic
- Common misconception addressed: Treating an internal network as automatically trusted
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VLANs, subnets and segmentation | 72 | 6 |
| M03L02 | ACLs and zero-trust principles | 72 | 6 |

### M04 Secure protocols (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Replace Telnet with SSH for device management; (2) Decide where a VPN is and is not needed
- Common misconception addressed: Thinking a password alone makes a protocol secure
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Encryption in transit: TLS, SSH and VPNs | 72 | 6 |
| M04L02 | Replacing insecure protocols | 72 | 6 |

### M05 Monitoring and response (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose which events to log on a perimeter device; (2) Prioritise three alerts for investigation
- Common misconception addressed: Collecting logs that nobody ever reviews
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Logging and network monitoring | 72 | 6 |
| M05L02 | Detecting and responding to anomalies | 72 | 6 |

## Integrative case

A company's flat network lets any device reach any server, and remote access uses an unencrypted protocol. Propose a segmented design, replace insecure protocols, add access control between zones, and decide what to log so an intrusion would be noticed.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1659-final-protected | 25 | 25 | yes |
| MST-1659-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Network security foundations | 5 |
| Common attacks | 5 |
| Segmentation and access control | 5 |
| Secure protocols | 5 |
| Monitoring and response | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1659-Q0001** (single-answer, Select ONE) What is the main security benefit of network segmentation?

- A. It limits how far an attacker can move after gaining a foothold **(key)**  
  _Rationale:_ Correct: segmentation contains lateral movement between zones.
- B. It makes encryption unnecessary  
  _Rationale:_ Segmentation and encryption address different risks.
- C. It guarantees no attacker can enter  
  _Rationale:_ No control guarantees prevention; segmentation limits impact.
- D. It increases the attack surface  
  _Rationale:_ Segmentation reduces, not increases, exposure between zones.

**MST-1659-Q0002** (multiple-answer, Select TWO) Which TWO protocols provide encryption in transit? (Select TWO.)

- A. SSH **(key)**  
  _Rationale:_ Correct: SSH encrypts remote administration sessions.
- B. TLS **(key)**  
  _Rationale:_ Correct: TLS encrypts data in transit for many services.
- C. Telnet  
  _Rationale:_ Telnet sends data, including credentials, in clear text.
- D. HTTP  
  _Rationale:_ Plain HTTP is unencrypted; HTTPS adds TLS.

**MST-1659-Q0003** (single-answer, Select ONE) Logs are being collected but no one reviews them. What is the primary weakness?

- A. Detection fails because collected logs are never analysed **(key)**  
  _Rationale:_ Correct: logging without review provides no timely detection.
- B. The logs encrypt themselves automatically  
  _Rationale:_ Log review has nothing to do with automatic encryption.
- C. Collecting logs prevents all attacks  
  _Rationale:_ Collection alone does not prevent attacks.
- D. Logs make the network faster  
  _Rationale:_ Logging does not improve performance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
