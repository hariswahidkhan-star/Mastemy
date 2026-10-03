# Energy Storage and Batteries: Technologies and Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2362` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (general professional skills course; no external standard claimed). Outcomes are Mastemy internal IDs derived from the course blueprint; scope versioned by verification date, not an issuer syllabus edition. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Energy Storage and Batteries: Technologies and Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compare energy-storage technologies by energy, power, duration and round-trip efficiency
2. Explain how lithium-ion and other battery chemistries work and degrade
3. Distinguish energy and power applications and match storage to each
4. Interpret key battery metrics: C-rate, depth of discharge, cycle life and state of charge
5. Describe battery management, safety and thermal considerations
6. Evaluate where grid, behind-the-meter and long-duration storage add value

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Storage landscape (25% (design weight), design weight)

- Worked applications: (1) Pick a storage technology for a 4-hour grid shifting need vs a frequency-response need; (2) Rank three technologies by round-trip efficiency
- Common misconception addressed: Treating all storage as interchangeable regardless of duration
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Mechanical, electrochemical, thermal and chemical storage | 120 | 7 |
| M01L02 | Energy vs power, duration and round-trip efficiency | 120 | 7 |

### M02 Battery chemistries (25% (design weight), design weight)

- Worked applications: (1) Explain why a battery loses capacity after many cycles; (2) Compare two chemistries for a home system on safety and cost
- Common misconception addressed: Believing a battery's capacity never fades with use
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How lithium-ion cells store and release charge | 120 | 7 |
| M02L02 | Chemistries, trade-offs and degradation mechanisms | 120 | 7 |

### M03 Metrics and management (25% (design weight), design weight)

- Worked applications: (1) Compute usable energy from nameplate, DoD and efficiency; (2) Choose a C-rate for a fast-response vs long-shift application
- Common misconception addressed: Assuming 100% depth of discharge is fine for every chemistry
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | C-rate, DoD, cycle life and state of charge | 120 | 7 |
| M03L02 | Battery management systems, safety and thermal control | 120 | 7 |

### M04 Applications (25% (design weight), design weight)

- Worked applications: (1) Justify a behind-the-meter battery from a time-of-use tariff; (2) Identify when long-duration storage beats more lithium-ion
- Common misconception addressed: Thinking adding more short-duration batteries solves a multi-day shortfall
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Grid-scale and behind-the-meter use cases | 120 | 7 |
| M04L02 | Long-duration and seasonal storage options | 120 | 7 |

## Integrative case

A factory with a time-of-use tariff and a solar array wants to add storage: choose the right technology and size, set a safe depth-of-discharge and C-rate, estimate usable energy and round-trip losses, and decide whether a long-duration option is justified.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; 40 items / 40 minutes is a Mastemy design choice for a focused skills final.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2362-final-protected | 40 | 40 | yes |
| MST-2362-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Storage landscape | 10 |
| Battery chemistries | 10 |
| Metrics and management | 10 |
| Applications | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2362-Q0001** (single-answer, Select ONE) A battery is rated 100 kWh but is operated at 80% depth of discharge with 90% round-trip efficiency. Roughly how much energy can be discharged per cycle after losses?

- A. About 72 kWh **(key)**  
  _Rationale:_ 100 kWh x 0.8 DoD x 0.9 efficiency = 72 kWh usable out.
- B. 100 kWh  
  _Rationale:_ That ignores both depth-of-discharge and efficiency losses.
- C. 80 kWh  
  _Rationale:_ That applies DoD but ignores round-trip losses.
- D. 90 kWh  
  _Rationale:_ That applies efficiency but ignores depth of discharge.

**MST-2362-Q0002** (multiple-answer, Select TWO) Which TWO metrics most directly describe how fast a battery can deliver its energy and how deeply it is used? (Select TWO.)

- A. C-rate **(key)**  
  _Rationale:_ C-rate expresses charge/discharge power relative to capacity.
- B. Depth of discharge **(key)**  
  _Rationale:_ Depth of discharge is the fraction of capacity actually used per cycle.
- C. Nameplate colour coding  
  _Rationale:_ Labelling colour has no bearing on performance.
- D. The manufacturer's brand reputation  
  _Rationale:_ Reputation is not a performance metric.

**MST-2362-Q0003** (single-answer, Select ONE) Why is lithium-ion often a poor fit for balancing a multi-day wind lull?

- A. Its cost per kWh of energy makes very long durations expensive compared with long-duration options **(key)**  
  _Rationale:_ Short-duration batteries scale poorly in energy terms for multi-day needs.
- B. It cannot discharge electricity at all  
  _Rationale:_ Lithium-ion discharges electricity readily.
- C. It has zero round-trip efficiency  
  _Rationale:_ Its round-trip efficiency is relatively high.
- D. It only works offshore  
  _Rationale:_ Location is not the constraint here.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
