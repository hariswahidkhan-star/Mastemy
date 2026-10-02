# Electrical Circuits Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1801` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-ECF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Electrical Circuits Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Circuit basics
2. DC circuit analysis
3. Network theorems
4. Capacitance, inductance and transients
5. AC circuits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate building or probing a live circuit; hands-on practice belongs in a lab.

## Modules

### M01 Circuit basics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute power dissipated in a resistor; (2) Apply Ohm's law to find an unknown
- Common misconception addressed: Confusing voltage (across) with current (through) a component
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Charge, current, voltage and power | 96 | 8 |
| M01L02 | Ohm's law and resistance | 96 | 8 |

### M02 DC circuit analysis (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Reduce a series-parallel network; (2) Apply KVL and KCL to solve a circuit
- Common misconception addressed: Adding parallel resistances as if they were in series
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Series and parallel networks | 96 | 8 |
| M02L02 | Kirchhoff's laws | 96 | 8 |

### M03 Network theorems (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Find the Thevenin equivalent of a network; (2) Apply superposition with two sources
- Common misconception addressed: Forgetting to deactivate other sources when applying superposition
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Thevenin and Norton equivalents | 96 | 8 |
| M03L02 | Superposition and maximum power | 96 | 8 |

### M04 Capacitance, inductance and transients (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute the time constant of an RC circuit; (2) Sketch a first-order charging response
- Common misconception addressed: Treating a capacitor as an open circuit immediately after switching
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Capacitors and inductors | 96 | 8 |
| M04L02 | First-order RC and RL transients | 96 | 8 |

### M05 AC circuits (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute impedance of an RL or RC branch; (2) Find real power and power factor
- Common misconception addressed: Adding AC voltages as magnitudes instead of as phasors
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Sinusoids, phasors and impedance | 96 | 8 |
| M05L02 | AC power and power factor | 96 | 8 |

## Integrative case

A sensor board draws too much current and runs hot. The learner must apply Ohm's and Kirchhoff's laws to the DC supply network, reduce it with Thevenin's theorem, analyse an RC filter's transient, and check the AC power factor of a driven load, then recommend component changes to bring current and heat within limits.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1801-final-protected | 25 | 25 | yes |
| MST-1801-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Circuit basics | 5 |
| DC circuit analysis | 5 |
| Network theorems | 5 |
| Capacitance, inductance and transients | 5 |
| AC circuits | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1801-Q0001** (single-answer, Select ONE) Kirchhoff's current law states that:

- A. The sum of currents entering a node equals the sum leaving it **(key)**  
  _Rationale:_ Correct: KCL expresses conservation of charge at a node.
- B. The sum of voltages around a loop is non-zero  
  _Rationale:_ KVL says loop voltages sum to zero, not KCL.
- C. Current always flows from low to high voltage  
  _Rationale:_ Conventional current flows high to low potential through a resistor.
- D. Resistance equals voltage times current  
  _Rationale:_ Resistance is voltage divided by current.

**MST-1801-Q0002** (multiple-answer, Select TWO) Which TWO statements about power factor are correct? (Select TWO.)

- A. It is the cosine of the phase angle between voltage and current **(key)**  
  _Rationale:_ Correct: PF = cos(phi) for sinusoidal AC.
- B. A low power factor means more current for the same real power **(key)**  
  _Rationale:_ Correct: poor PF raises current and losses.
- C. A power factor greater than 1 is desirable  
  _Rationale:_ Power factor cannot exceed 1.
- D. Power factor applies only to DC circuits  
  _Rationale:_ Power factor is an AC concept.

**MST-1801-Q0003** (single-answer, Select ONE) The time constant of an RC circuit is:

- A. The product of resistance and capacitance **(key)**  
  _Rationale:_ Correct: tau = RC sets how quickly the circuit charges or discharges.
- B. Resistance divided by capacitance  
  _Rationale:_ The time constant is the product RC, not a ratio.
- C. The supply voltage times the capacitance  
  _Rationale:_ That gives charge, not the time constant.
- D. Independent of the resistance  
  _Rationale:_ Resistance directly affects the time constant.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
