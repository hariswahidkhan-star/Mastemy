# Endpoint Security

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1681` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-ES-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Endpoint Security (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain endpoint security and the modern endpoint attack surface
2. Apply hardening, patching and configuration baselines
3. Compare antivirus, EDR and application control
4. Describe detection, response and isolation on endpoints
5. Manage endpoints at scale with policy and monitoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Endpoint foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) List the endpoints in a small company; (2) Explain why endpoints are a frequent entry point
- Common misconception addressed: Thinking only servers, not laptops, need protection
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What an endpoint is and why it is targeted | 72 | 6 |
| M01L02 | The endpoint attack surface | 72 | 6 |

### M02 Hardening and patching (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Define a hardening baseline for laptops; (2) Plan a patch cycle that balances risk and disruption
- Common misconception addressed: Leaving users as local administrators by default
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Configuration baselines and least privilege | 72 | 6 |
| M02L02 | Patch management for endpoints | 72 | 6 |

### M03 Protection technologies (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide when EDR adds value over antivirus; (2) Explain how allow-listing stops unknown executables
- Common misconception addressed: Believing signature antivirus alone stops modern attacks
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Antivirus vs EDR | 72 | 6 |
| M03L02 | Application control and allow-listing | 72 | 6 |

### M04 Detection and response (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose signals that indicate endpoint compromise; (2) Decide when to isolate an endpoint from the network
- Common misconception addressed: Pulling the power instead of isolating and investigating
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Detecting malicious behaviour on endpoints | 72 | 6 |
| M04L02 | Isolation and remediation | 72 | 6 |

### M05 Managing at scale (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Push a baseline to many endpoints consistently; (2) Report endpoint health to management
- Common misconception addressed: Configuring each machine by hand and hoping they stay consistent
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Policy and configuration management | 72 | 6 |
| M05L02 | Monitoring and reporting across endpoints | 72 | 6 |

## Integrative case

A company relies on basic antivirus and ad-hoc patching across its laptops. Assess the gaps, define a hardening baseline, choose between antivirus and endpoint detection and response, and plan how a compromised laptop would be detected, isolated and recovered.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1681-final-protected | 25 | 25 | yes |
| MST-1681-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Endpoint foundations | 5 |
| Hardening and patching | 5 |
| Protection technologies | 5 |
| Detection and response | 5 |
| Managing at scale | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1681-Q0001** (single-answer, Select ONE) What capability does EDR add beyond traditional signature antivirus?

- A. Behavioural detection, investigation and response across endpoints **(key)**  
  _Rationale:_ Correct: EDR detects behaviours and supports investigation/response.
- B. It only scans files against a signature list  
  _Rationale:_ That describes traditional antivirus, not EDR's added value.
- C. It removes the need for any patching  
  _Rationale:_ Patching is still essential.
- D. It makes endpoints immune to all attacks  
  _Rationale:_ No control provides immunity.

**MST-1681-Q0002** (multiple-answer, Select TWO) Which TWO hardening measures reduce endpoint risk? (Select TWO.)

- A. Removing local administrator rights from standard users **(key)**  
  _Rationale:_ Correct: least privilege limits what malware can do.
- B. Keeping the operating system and applications patched **(key)**  
  _Rationale:_ Correct: patching closes known vulnerabilities.
- C. Disabling all logging on the endpoint  
  _Rationale:_ Disabling logging removes detection and investigation data.
- D. Giving every user full admin to avoid prompts  
  _Rationale:_ Universal admin greatly increases risk.

**MST-1681-Q0003** (single-answer, Select ONE) A laptop shows signs of active compromise. What is the most appropriate first response?

- A. Isolate it from the network while preserving it for investigation **(key)**  
  _Rationale:_ Correct: isolation contains spread while keeping evidence.
- B. Immediately reformat it to be safe  
  _Rationale:_ Reformatting destroys evidence needed to understand the incident.
- C. Leave it connected to watch what happens  
  _Rationale:_ Leaving it connected risks spread and data loss.
- D. Unplug the power without any process  
  _Rationale:_ Abruptly powering off can destroy volatile evidence.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
