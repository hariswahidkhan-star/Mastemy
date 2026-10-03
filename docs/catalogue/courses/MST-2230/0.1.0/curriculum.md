# Electrical Engineering Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2230` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Engineering standards, tool specifics and formulae must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Electrical Engineering Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply Ohm's law and Kirchhoff's laws to solve DC resistive circuits
2. Analyse AC circuits using phasors, impedance and power concepts
3. Explain the behaviour of capacitors, inductors and basic transients
4. Describe diodes, transistors and op-amps and their core uses
5. Read schematics and apply basic electrical safety and grounding
6. Choose measurement methods and interpret readings for voltage, current and resistance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 DC circuit analysis (25% (Mastemy design weight), design weight)

- Worked applications: (1) Solve a two-loop circuit for all branch currents; (2) Reduce a resistor network to a single equivalent
- Common misconception addressed: Adding resistances in parallel as if they were in series
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Ohm's law, series and parallel resistance | 120 | 7 |
| M01L02 | Kirchhoff's laws and nodal analysis | 120 | 7 |

### M02 AC and reactive components (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute the time constant of an RC charging circuit; (2) Find the impedance of a series RLC branch at a frequency
- Common misconception addressed: Treating capacitor voltage as instantaneous rather than building over time
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Capacitors, inductors and transients | 120 | 7 |
| M02L02 | Phasors, impedance and AC power | 120 | 7 |

### M03 Semiconductors and devices (25% (Mastemy design weight), design weight)

- Worked applications: (1) Design a half-wave rectifier and predict its output; (2) Set the gain of a non-inverting op-amp stage
- Common misconception addressed: Assuming an ideal diode drops no voltage in every analysis
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Diodes and rectification | 120 | 7 |
| M03L02 | Transistors and operational amplifiers | 120 | 7 |

### M04 Signals, measurement and safety (25% (Mastemy design weight), design weight)

- Worked applications: (1) Pick the right meter setting to read a small current safely; (2) Identify a missing protective ground in a wiring diagram
- Common misconception addressed: Measuring current by placing the meter in parallel with the load
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Measuring voltage, current and resistance | 120 | 7 |
| M04L02 | Grounding, protection and electrical safety | 120 | 7 |

## Integrative case

A maker team builds a battery-powered sensor node: size current-limiting resistors, add an RC filter, buffer the signal with an op-amp, and specify fusing and grounding so the board is safe to handle.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2230-final-protected | 40 | 40 | yes |
| MST-2230-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| DC circuit analysis | 10 |
| AC and reactive components | 10 |
| Semiconductors and devices | 10 |
| Signals, measurement and safety | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2230-Q0001** (single-answer, Select ONE) Two 100-ohm resistors are connected in parallel across a 10 V source. What is the current drawn from the source?

- A. 0.2 A **(key)**  
  _Rationale:_ Correct: parallel 100||100 = 50 ohm, so I = 10/50 = 0.2 A.
- B. 0.1 A  
  _Rationale:_ That treats the resistors as 100 ohm, ignoring the parallel combination.
- C. 0.05 A  
  _Rationale:_ That uses 200 ohm, which would be the series value.
- D. 2 A  
  _Rationale:_ That is off by an order of magnitude from Ohm's law here.

**MST-2230-Q0002** (multiple-answer, Select TWO) Which TWO statements about an ideal capacitor in a DC circuit are correct? (Select TWO.)

- A. It blocks steady DC current once fully charged **(key)**  
  _Rationale:_ Correct: at steady state no current flows through an ideal capacitor.
- B. Its voltage cannot change instantaneously **(key)**  
  _Rationale:_ Correct: capacitor voltage is continuous, set by the charge stored.
- C. It dissipates power as heat like a resistor  
  _Rationale:_ An ideal capacitor stores energy and dissipates none.
- D. It has zero impedance at all frequencies  
  _Rationale:_ Its impedance falls with frequency but is infinite at DC.

**MST-2230-Q0003** (single-answer, Select ONE) You need to measure the current through a lamp. How should the ammeter be connected?

- A. In series with the lamp **(key)**  
  _Rationale:_ Correct: an ammeter must carry the branch current, so it goes in series.
- B. In parallel with the lamp  
  _Rationale:_ A parallel ammeter short-circuits the load and can be damaged.
- C. Across the supply terminals  
  _Rationale:_ That measures nothing useful and risks a short.
- D. Between two grounds  
  _Rationale:_ That does not place the meter in the lamp's current path.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
