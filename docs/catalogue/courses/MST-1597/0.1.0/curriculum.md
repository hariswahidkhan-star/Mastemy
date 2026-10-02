# Quantum Computing Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1597` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-QCF-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Quantum Computing Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Quantum foundations
2. Superposition
3. Quantum gates
4. Entanglement
5. Measurement
6. Circuits and algorithms
7. Limits and error
8. Tools and outlook

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on reasoning about quantum computing concepts; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Quantum foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Contrast a bit with a qubit; (2) State a problem class quantum may help
- Common misconception addressed: Believing a qubit is just a faster classical bit
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Classical bits vs qubits | 75 | 5 |
| M01L02 | Why quantum computing | 75 | 5 |

### M02 Superposition (MASTEMY-DESIGN 13%)

- Worked applications: (1) Describe a qubit in superposition; (2) Interpret amplitudes as probabilities
- Common misconception addressed: Thinking superposition means the qubit is 'both values at once' for free output
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The qubit state and amplitudes | 75 | 5 |
| M02L02 | The Bloch sphere intuition | 75 | 5 |

### M03 Quantum gates (MASTEMY-DESIGN 12%)

- Worked applications: (1) Apply an X and H gate; (2) Use CNOT to entangle two qubits
- Common misconception addressed: Treating quantum gates as irreversible like classical AND/OR
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Single-qubit gates | 75 | 5 |
| M03L02 | Multi-qubit gates (CNOT) | 75 | 5 |

### M04 Entanglement (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a Bell state; (2) Explain measurement correlations
- Common misconception addressed: Claiming entanglement enables faster-than-light signalling
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Entangled states | 75 | 5 |
| M04L02 | Correlations and no-signalling | 75 | 5 |

### M05 Measurement (MASTEMY-DESIGN 12%)

- Worked applications: (1) Predict measurement probabilities; (2) Explain why repeated runs are needed
- Common misconception addressed: Expecting a deterministic readout from one measurement
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Measurement and collapse | 75 | 5 |
| M05L02 | Probabilistic outcomes | 75 | 5 |

### M06 Circuits and algorithms (MASTEMY-DESIGN 13%)

- Worked applications: (1) Read a small quantum circuit; (2) Explain Grover's quadratic speedup intuitively
- Common misconception addressed: Assuming quantum speedups apply to all problems
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Building quantum circuits | 75 | 5 |
| M06L02 | Deutsch-Jozsa / Grover intuition | 75 | 5 |

### M07 Limits and error (MASTEMY-DESIGN 12%)

- Worked applications: (1) Explain why qubits decohere; (2) Describe the need for error correction
- Common misconception addressed: Assuming today's machines run large algorithms flawlessly
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Decoherence and noise | 75 | 5 |
| M07L02 | Error correction and NISQ reality | 75 | 5 |

### M08 Tools and outlook (MASTEMY-DESIGN 12%)

- Worked applications: (1) Run a circuit on a simulator; (2) Separate hype from realistic use cases
- Common misconception addressed: Overstating near-term quantum advantage
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Simulators and SDKs | 75 | 5 |
| M08L02 | Realistic applications | 75 | 5 |

## Integrative case

Explain a simple quantum algorithm to a technical audience: describe qubits and superposition, build a small circuit with gates, reason about entanglement and measurement, and state honestly what quantum computers can and cannot speed up.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1597-final-protected | 40 | 40 | yes |
| MST-1597-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Quantum foundations | 5 |
| Superposition | 5 |
| Quantum gates | 5 |
| Entanglement | 5 |
| Measurement | 5 |
| Circuits and algorithms | 5 |
| Limits and error | 5 |
| Tools and outlook | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1597-Q0001** (single-answer, Select ONE) What happens to a qubit in superposition when it is measured?

- A. It collapses to a classical 0 or 1 with a probability given by its amplitudes **(key)**  
  _Rationale:_ Correct: measurement yields a definite classical outcome probabilistically.
- B. It returns both 0 and 1 simultaneously as output  
  _Rationale:_ Measurement gives one classical value.
- C. It remains in superposition unchanged  
  _Rationale:_ Measurement collapses the state.
- D. It always returns 0  
  _Rationale:_ The outcome is probabilistic, not always 0.

**MST-1597-Q0002** (single-answer, Select ONE) Why does entanglement NOT allow faster-than-light communication?

- A. Measurement outcomes are random locally; no information is transmitted without a classical channel **(key)**  
  _Rationale:_ Correct: the no-signalling principle holds despite correlations.
- B. Entanglement is too slow to be useful  
  _Rationale:_ Speed is not the reason; it is no-signalling.
- C. Entangled qubits cannot be measured  
  _Rationale:_ They can be measured.
- D. The qubits must be physically touching  
  _Rationale:_ Entanglement persists over distance.

**MST-1597-Q0003** (multiple-answer, Select ALL that apply) Which statements about quantum computing are correct? (Select TWO)

- A. Quantum gates are reversible, unlike many classical logic gates **(key)**  
  _Rationale:_ Correct: unitary operations are reversible.
- B. Quantum speedups are known for specific problems, not all computation **(key)**  
  _Rationale:_ Correct: e.g. Grover/Shor target particular problem classes.
- C. A qubit measurement reliably returns a deterministic value every run  
  _Rationale:_ False; outcomes are probabilistic.
- D. Current hardware runs large algorithms without error concerns  
  _Rationale:_ False; decoherence and noise are major limits (NISQ era).

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
