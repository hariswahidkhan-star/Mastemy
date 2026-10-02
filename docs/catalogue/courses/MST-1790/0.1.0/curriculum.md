# Lean Manufacturing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1790` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-LM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Lean Manufacturing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Lean manufacturing foundations
2. Workplace organisation
3. Flow and pull systems
4. Quality at the source
5. Lean improvement and TPM

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate running a line or a SMED event; hands-on practice belongs on the shop floor.

## Modules

### M01 Lean manufacturing foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify value-adding vs non-value-adding steps; (2) Spot the dominant waste on a line
- Common misconception addressed: Thinking Lean is only cost-cutting and headcount reduction
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Origins and the Toyota Production System | 96 | 8 |
| M01L02 | Value and the eight wastes | 96 | 8 |

### M02 Workplace organisation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply 5S to a described workstation; (2) Write standard work for a task
- Common misconception addressed: Doing a 5S blitz once and letting the area slide back
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | 5S and visual management | 96 | 8 |
| M02L02 | Standard work | 96 | 8 |

### M03 Flow and pull systems (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design a cell for one-piece flow; (2) Size a kanban loop
- Common misconception addressed: Running large batches and calling it flow
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | One-piece flow and cells | 96 | 8 |
| M03L02 | Kanban and pull | 96 | 8 |

### M04 Quality at the source (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design a poka-yoke to prevent a defect; (2) Decide when to stop the line (andon)
- Common misconception addressed: Passing defects downstream to keep the line moving
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Jidoka and poka-yoke | 96 | 8 |
| M04L02 | Built-in quality and andon | 96 | 8 |

### M05 Lean improvement and TPM (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply SMED thinking to cut changeover time; (2) Compute OEE from availability, performance, quality
- Common misconception addressed: Treating Lean as a toolkit of events rather than a daily habit
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Kaizen and SMED | 96 | 8 |
| M05L02 | Introduction to TPM and OEE | 96 | 8 |

## Integrative case

A plant has long changeovers, high WIP and recurring defects. The learner must identify waste, apply 5S and standard work, redesign for one-piece flow with kanban, add poka-yoke and andon for quality at the source, and use SMED and OEE to target improvement, then present a Lean transformation plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1790-final-protected | 25 | 25 | yes |
| MST-1790-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Lean manufacturing foundations | 5 |
| Workplace organisation | 5 |
| Flow and pull systems | 5 |
| Quality at the source | 5 |
| Lean improvement and TPM | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1790-Q0001** (single-answer, Select ONE) A poka-yoke device is designed to:

- A. Prevent or immediately detect an error so defects are not made **(key)**  
  _Rationale:_ Correct: poka-yoke is mistake-proofing at the point of work.
- B. Increase the speed of the slowest machine  
  _Rationale:_ Poka-yoke targets errors, not machine speed.
- C. Replace the need for any standard work  
  _Rationale:_ Poka-yoke complements standard work.
- D. Store extra inventory just in case  
  _Rationale:_ Buffer stock is unrelated to mistake-proofing.

**MST-1790-Q0002** (multiple-answer, Select TWO) Which TWO are components of OEE? (Select TWO.)

- A. Availability (uptime) **(key)**  
  _Rationale:_ Correct: OEE = Availability x Performance x Quality.
- B. Quality (good-parts rate) **(key)**  
  _Rationale:_ Correct: the quality rate is one of the three OEE factors.
- C. The number of employees on shift  
  _Rationale:_ Headcount is not an OEE factor.
- D. The floor area of the plant  
  _Rationale:_ Area is not part of OEE.

**MST-1790-Q0003** (single-answer, Select ONE) In a pull system, production is triggered by:

- A. Actual downstream demand signalled upstream **(key)**  
  _Rationale:_ Correct: pull replenishes only what the next step consumes.
- B. A forecast pushed from the top down  
  _Rationale:_ That is a push system, not pull.
- C. Running every machine at full speed  
  _Rationale:_ Running flat out is overproduction, not pull.
- D. The size of the raw-material warehouse  
  _Rationale:_ Storage does not trigger pull production.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
