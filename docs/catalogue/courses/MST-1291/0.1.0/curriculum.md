# ASIS Physical Security Professional: PSP

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1291` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ASIS (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed from an official source (kept out of official_exam_code) |
| Version basis | DESIGN ASSUMPTION - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02) |
| Legacy IDs | - |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply physical security assessment, threat and risk analysis principles
2. Design integrated physical protection systems and security measures
3. Apply implementation of physical security measures and project considerations
4. Evaluate system effectiveness, testing, and ongoing operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> **Module structure, titles and all weightings below are DESIGN ASSUMPTIONS.** The official exam outline could not be fetched (network egress blocked on 2026-10-02) and must be confirmed against the issuer's official source before SME review and publication.

## Modules

### M01 Physical Security Assessment (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Rate the risk to three assets using threat, vulnerability and consequence; (2) Conduct a gap analysis from a security survey
- Common misconception addressed: Equating a threat with a risk, ignoring vulnerability and consequence
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Threat, vulnerability and risk assessment fundamentals | 120 | 6 |
| M01L02 | Asset identification, criticality and consequence analysis | 120 | 6 |
| M01L03 | Security surveys and defining protection requirements | 120 | 6 |

### M02 Application and Design of Integrated Physical Protection (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Design a layered detect-delay-respond scheme for a perimeter; (2) Balance delay time against guard-force response time
- Common misconception addressed: Adding cameras (detection) without any delay element, so intruders reach the asset before response arrives
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deter, detect, delay and respond and defence in depth | 120 | 6 |
| M02L02 | Barriers, lighting, access control and intrusion detection | 120 | 6 |
| M02L03 | Video surveillance, integration and security personnel | 120 | 6 |

### M03 Implementation, Evaluation and Operations (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Define performance tests to validate an intrusion-detection system; (2) Plan commissioning acceptance criteria for an access-control install
- Common misconception addressed: Assuming an installed system works without performance testing and maintenance
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Project implementation, procurement and commissioning | 120 | 6 |
| M03L02 | Testing, performance measures and system effectiveness | 120 | 6 |
| M03L03 | Operations, maintenance and continuous improvement | 120 | 6 |

## Integrative case

A security professional must protect a new data-centre campus: conduct a threat and risk assessment, design layered physical protection (deter, detect, delay, respond), specify and implement measures within budget, and plan testing to verify effectiveness.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source was not fetched; official question count, duration and domain weightings must be confirmed on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1291-practice-form-A | 45 | 45 | yes |
| MST-1291-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1291-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1291-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Physical Security Assessment | 15 |
| Application and Design of Integrated Physical Protection | 15 |
| Implementation, Evaluation and Operations | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1291-Q0001** (single-answer, Select ONE) In physical security risk analysis, risk is best understood as a function of:

- A. Threat, vulnerability and consequence/impact **(key)**  
  _Rationale:_ Correct: risk combines the threat, the vulnerability to it, and the consequence if it is realised.
- B. Threat alone  
  _Rationale:_ Threat by itself does not define risk without vulnerability and consequence.
- C. The number of cameras installed  
  _Rationale:_ Camera count is a control, not a definition of risk.
- D. The security budget  
  _Rationale:_ Budget is a constraint, not the definition of risk.

**MST-1291-Q0002** (single-answer, Select ONE) A perimeter has excellent intrusion detection but almost no physical barriers. Why is this a design weakness?

- A. Without delay, an intruder can reach the asset before responders arrive **(key)**  
  _Rationale:_ Correct: detection must be paired with sufficient delay so response can interrupt before the asset is compromised.
- B. Detection systems always cause false alarms  
  _Rationale:_ False alarms are a tuning issue, not the core weakness described here.
- C. Barriers are only decorative  
  _Rationale:_ Barriers provide delay, a functional protection element.
- D. Response time is irrelevant to design  
  _Rationale:_ Response time is central; delay must exceed response time to be effective.

**MST-1291-Q0003** (multiple-answer, Select TWO) Select TWO activities that verify a physical protection system actually works as intended.

- A. Performance testing of detection and delay elements **(key)**  
  _Rationale:_ Correct: performance tests verify that detection and delay meet requirements.
- B. Commissioning with defined acceptance criteria **(key)**  
  _Rationale:_ Correct: commissioning against acceptance criteria confirms the system performs as specified.
- C. Assuming vendor marketing claims are accurate  
  _Rationale:_ Marketing claims are not verification of real-world performance.
- D. Skipping maintenance after installation  
  _Rationale:_ Skipping maintenance lets performance degrade, it does not verify it.
- E. Counting the number of devices purchased  
  _Rationale:_ Device count does not demonstrate effectiveness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
