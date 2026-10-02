# Thermodynamics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1799` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-T-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Thermodynamics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Concepts and properties
2. First law of thermodynamics
3. Second law and entropy
4. Power and refrigeration cycles
5. Efficiency and applications

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate multi-step cycle calculations; practice problems and worked solutions are provided separately.

## Modules

### M01 Concepts and properties (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify a system as open, closed or isolated; (2) Find a property from steam or gas data
- Common misconception addressed: Mixing up intensive and extensive properties
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Systems, states and properties | 96 | 8 |
| M01L02 | Ideal gas and property tables | 96 | 8 |

### M02 First law of thermodynamics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply the first law to a closed system; (2) Write an energy balance for a steady-flow device
- Common misconception addressed: Getting the sign convention for heat and work wrong
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Energy, heat and work | 96 | 8 |
| M02L02 | First law for closed and open systems | 96 | 8 |

### M03 Second law and entropy (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain why a process is irreversible; (2) Compute an entropy change
- Common misconception addressed: Thinking the second law forbids any decrease in a system's entropy
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The second law and reversibility | 96 | 8 |
| M03L02 | Entropy and its changes | 96 | 8 |

### M04 Power and refrigeration cycles (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trace energy through a Rankine cycle; (2) Compute a coefficient of performance
- Common misconception addressed: Confusing thermal efficiency with coefficient of performance
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Rankine and Brayton cycles | 96 | 8 |
| M04L02 | Refrigeration and heat pumps | 96 | 8 |

### M05 Efficiency and applications (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute the Carnot limit for a cycle; (2) Identify a realistic efficiency improvement
- Common misconception addressed: Expecting a real engine to reach Carnot efficiency
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Carnot efficiency limits | 96 | 8 |
| M05L02 | Improving real-cycle efficiency | 96 | 8 |

## Integrative case

A plant runs a steam power cycle with disappointing efficiency. The learner must apply the first law to each component, use the second law and entropy to find the losses, compute the Carnot benchmark, and recommend realistic improvements to the Rankine cycle, then estimate the efficiency gain.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1799-final-protected | 25 | 25 | yes |
| MST-1799-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Concepts and properties | 5 |
| First law of thermodynamics | 5 |
| Second law and entropy | 5 |
| Power and refrigeration cycles | 5 |
| Efficiency and applications | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1799-Q0001** (single-answer, Select ONE) The second law of thermodynamics implies that:

- A. The total entropy of an isolated system never decreases **(key)**  
  _Rationale:_ Correct: entropy of an isolated system stays the same (reversible) or increases (irreversible).
- B. Energy is destroyed in every real process  
  _Rationale:_ Energy is conserved; the first law forbids its destruction.
- C. Heat flows spontaneously from cold to hot  
  _Rationale:_ Spontaneous heat flow is from hot to cold.
- D. All processes are perfectly reversible  
  _Rationale:_ Real processes are irreversible.

**MST-1799-Q0002** (multiple-answer, Select TWO) Which TWO statements about a refrigerator's COP are correct? (Select TWO.)

- A. It can exceed 1 **(key)**  
  _Rationale:_ Correct: COP is heat moved per work input and is often greater than 1.
- B. It is the ratio of heat removed to work input **(key)**  
  _Rationale:_ Correct: COP(cooling) = Q_cold / W.
- C. It is the same quantity as thermal efficiency  
  _Rationale:_ COP and thermal efficiency are different measures.
- D. It must always be less than 1 like an engine's efficiency  
  _Rationale:_ COP is not bounded by 1.

**MST-1799-Q0003** (single-answer, Select ONE) The first law of thermodynamics is a statement of:

- A. Conservation of energy **(key)**  
  _Rationale:_ Correct: energy is conserved; it changes form but is neither created nor destroyed.
- B. Conservation of mass  
  _Rationale:_ That is a separate principle.
- C. Conservation of entropy  
  _Rationale:_ Entropy is not conserved in general.
- D. Conservation of momentum  
  _Rationale:_ Momentum conservation is a mechanics principle.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
