# OT and ICS Security Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1679` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-OISF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — OT and ICS Security Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain how OT and ICS environments differ from traditional IT
2. Describe the Purdue model and common industrial protocols
3. Identify threats and the safety-first priorities of OT
4. Apply segmentation and monitoring suited to OT
5. Describe secure change and vendor management in OT

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 OT vs IT (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Contrast an OT and an IT patching decision; (2) Explain why availability often outranks confidentiality in OT
- Common misconception addressed: Applying IT security practices unchanged to OT systems
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How OT and ICS differ from IT | 72 | 6 |
| M01L02 | Availability and safety as top priorities | 72 | 6 |

### M02 Architecture and protocols (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Place devices into Purdue levels; (2) Explain why many industrial protocols lack authentication
- Common misconception addressed: Assuming industrial protocols have built-in security
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The Purdue model and zones | 72 | 6 |
| M02L02 | Industrial protocols and their weaknesses | 72 | 6 |

### M03 Threats and safety (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify a realistic OT attack path; (2) Explain how a cyber incident can become a safety incident
- Common misconception addressed: Treating an OT incident as purely a data problem
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Threats to industrial environments | 72 | 6 |
| M03L02 | Safety implications of OT incidents | 72 | 6 |

### M04 Segmentation and monitoring (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design a boundary between corporate and plant networks; (2) Choose monitoring that will not disrupt a controller
- Common misconception addressed: Running intrusive active scans against live controllers
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Segmenting OT from IT | 72 | 6 |
| M04L02 | Passive monitoring in OT | 72 | 6 |

### M05 Change and vendors (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a controlled change on a running system; (2) Set conditions for a vendor's remote access
- Common misconception addressed: Granting vendors permanent, unmonitored remote access
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Change management in OT | 72 | 6 |
| M05L02 | Secure vendor and remote access | 72 | 6 |

## Integrative case

A manufacturing plant connects its control systems to the corporate network for reporting, creating new exposure. Explain why OT security differs from IT, segment the environment using a layered model, choose monitoring that will not disrupt operations, and set rules for vendor access and change.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1679-final-protected | 25 | 25 | yes |
| MST-1679-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| OT vs IT | 5 |
| Architecture and protocols | 5 |
| Threats and safety | 5 |
| Segmentation and monitoring | 5 |
| Change and vendors | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1679-Q0001** (single-answer, Select ONE) Why does availability often take priority over confidentiality in OT environments?

- A. Interrupting physical processes can cause safety and production harm **(key)**  
  _Rationale:_ Correct: OT controls physical processes where downtime can be dangerous.
- B. Because OT data is never sensitive  
  _Rationale:_ OT can hold sensitive data; the priority reflects physical risk.
- C. Because confidentiality is impossible in OT  
  _Rationale:_ Confidentiality still matters; it is simply often outranked by availability.
- D. Because OT systems have no users  
  _Rationale:_ OT systems have operators; the point is physical-process risk.

**MST-1679-Q0002** (multiple-answer, Select TWO) Which TWO practices suit OT security? (Select TWO.)

- A. Segmenting the plant network from the corporate network **(key)**  
  _Rationale:_ Correct: segmentation limits exposure to the control environment.
- B. Using passive monitoring that does not disrupt controllers **(key)**  
  _Rationale:_ Correct: passive monitoring avoids destabilising sensitive devices.
- C. Running aggressive active scans on live controllers  
  _Rationale:_ Active scans can crash fragile OT devices.
- D. Giving vendors permanent unmonitored access  
  _Rationale:_ Unmonitored standing access is a major OT risk.

**MST-1679-Q0003** (single-answer, Select ONE) Why is unauthenticated industrial protocol traffic a concern?

- A. Commands can be forged or altered because the protocol does not verify the sender **(key)**  
  _Rationale:_ Correct: lack of authentication lets attackers issue or tamper with commands.
- B. Because the protocol encrypts everything by default  
  _Rationale:_ Many industrial protocols lack both authentication and encryption.
- C. Because it makes devices run faster  
  _Rationale:_ Speed is unrelated to the authentication concern.
- D. Because it only affects office email  
  _Rationale:_ The concern is control commands, not email.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
