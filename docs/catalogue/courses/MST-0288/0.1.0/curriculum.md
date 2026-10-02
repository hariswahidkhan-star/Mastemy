# GIAC Global Industrial Cyber Security Professional: GICSP

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0288` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GIAC (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Describe industrial control systems (ICS/OT) architecture and components
2. Describe ICS protocols, networks and segmentation
3. Apply ICS security controls, monitoring and risk management
4. Describe ICS incident response and safety considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 ICS/OT architecture and components (not published - design grouping)

- Worked applications: (1) Place devices on the Purdue model levels; (2) Distinguish a PLC from an HMI by function
- Common misconception addressed: Assuming OT systems can be patched as readily as IT systems
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | ICS/OT fundamentals and the Purdue model | 100 | 6 |
| M01L02 | Field devices: PLCs, RTUs and sensors | 100 | 6 |
| M01L03 | Control room: HMIs, SCADA and historians | 100 | 6 |
| M01L04 | IT vs OT priorities (safety and availability) | 100 | 6 |

### M02 ICS protocols, networks and segmentation (not published - design grouping)

- Worked applications: (1) Identify an industrial protocol from its characteristics; (2) Design a segmented IT/OT boundary with a DMZ
- Common misconception addressed: Believing industrial protocols include authentication by default
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Industrial protocols (Modbus, DNP3, others) | 100 | 6 |
| M02L02 | OT network design and segmentation | 100 | 6 |
| M02L03 | Boundary protection and the industrial DMZ | 100 | 6 |
| M02L04 | Remote access to OT environments | 100 | 6 |

### M03 ICS security controls and incident response (not published - design grouping)

- Worked applications: (1) Select controls that protect without harming availability; (2) Plan an OT incident response that preserves safety
- Common misconception addressed: Treating an OT incident response the same as a standard IT response
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | ICS risk management and governance | 100 | 6 |
| M03L02 | Monitoring and detection in OT | 100 | 6 |
| M03L03 | Access control and hardening for ICS | 100 | 6 |
| M03L04 | OT incident response and recovery | 100 | 6 |

## Integrative case

A security engineer protects a plant's operational technology: map the ICS architecture and protocols, segment OT from IT with a secure boundary, add monitoring and controls, and plan incident response that respects safety and availability.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0288-practice-form-A | 45 | 45 | yes |
| MST-0288-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0288-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0288-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| ICS/OT architecture and components | 15 |
| ICS protocols, networks and segmentation | 15 |
| ICS security controls and incident response | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0288-Q0001** (single-answer, Select ONE) In most industrial control environments, which priority is typically ranked HIGHEST?

- A. Safety and availability of the physical process **(key)**  
  _Rationale:_ Correct: in OT, safety and keeping the process running are usually paramount.
- B. Confidentiality of marketing data  
  _Rationale:_ Marketing confidentiality is not the primary OT concern.
- C. Maximising social media engagement  
  _Rationale:_ This is unrelated to ICS priorities.
- D. Frequent unscheduled reboots  
  _Rationale:_ Unscheduled reboots threaten availability and are undesirable.

**MST-0288-Q0002** (single-answer, Select ONE) What is the Purdue model mainly used for in ICS security?

- A. Organising control system components into hierarchical levels and zones **(key)**  
  _Rationale:_ Correct: the Purdue model structures ICS into levels to guide segmentation.
- B. Encrypting all industrial traffic automatically  
  _Rationale:_ The Purdue model is an architectural reference, not an encryption tool.
- C. Scheduling plant maintenance shifts  
  _Rationale:_ It is not a workforce scheduling model.
- D. Measuring electricity billing  
  _Rationale:_ It does not handle billing.

**MST-0288-Q0003** (multiple-answer, Select TWO) Select TWO challenges that make securing OT different from securing typical IT.

- A. Legacy devices may not support modern patching or authentication **(key)**  
  _Rationale:_ Correct: many OT devices are long-lived and cannot be easily patched.
- B. Availability and safety often outweigh taking systems offline for updates **(key)**  
  _Rationale:_ Correct: downtime can be unacceptable, constraining security actions.
- C. OT environments always have the newest hardware  
  _Rationale:_ OT often runs long-lived legacy equipment, not the newest hardware.
- D. Industrial protocols were all designed with strong built-in security  
  _Rationale:_ Many industrial protocols lack built-in authentication or encryption.
- E. Safety is irrelevant in industrial settings  
  _Rationale:_ Safety is a central concern in industrial settings.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
