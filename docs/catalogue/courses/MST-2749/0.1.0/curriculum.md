# Quantum Computing Foundations: Qubits, Gates, Circuits and Measurement

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2749` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal curriculum design (no official syllabus); emerging-technology scope as of 2026-10, speculative topics treated conceptually and safely. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Quantum Computing Foundations: Qubits, Gates, Circuits and Measurement (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain qubits, superposition and entanglement and how they differ from classical bits
2. Describe how quantum gates and circuits transform qubit states
3. Interpret measurement and probability amplitudes in a simple quantum circuit
4. Distinguish problems where quantum computing may offer an advantage from those where it does not
5. Identify the main hardware approaches and current limitations such as noise and decoherence
6. Summarise realistic near-term uses and the hype-versus-reality gap honestly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Classical to quantum intuition (20% (design weight), design weight)

- Worked applications: (1) Draw the Bloch-sphere state for |+> and explain it; (2) Contrast a classical bit register with a 2-qubit state
- Common misconception addressed: Thinking a qubit 'is' both 0 and 1 at once rather than a probability amplitude
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From bits to qubits | 64 | 4 |
| M01L02 | Superposition and the Bloch sphere | 64 | 4 |
| M01L03 | Entanglement explained | 64 | 4 |

### M02 Gates and circuits (22% (design weight), design weight)

- Worked applications: (1) Apply an X and an H gate and track the state; (2) Build a 2-qubit entangling circuit with H+CNOT
- Common misconception addressed: Believing gates copy qubits (no-cloning is ignored)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Single-qubit gates | 70 | 4 |
| M02L02 | Multi-qubit gates and circuits | 70 | 4 |
| M02L03 | Reading a circuit diagram | 71 | 4 |

### M03 Measurement and probability (20% (design weight), design weight)

- Worked applications: (1) Compute outcome probabilities for a given amplitude vector; (2) Explain why repeated measurement is needed
- Common misconception addressed: Assuming you can read a qubit without disturbing it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Amplitudes and probabilities | 64 | 4 |
| M03L02 | Measurement collapse | 64 | 4 |
| M03L03 | Interference | 64 | 4 |

### M04 Algorithms at a glance (20% (design weight), design weight)

- Worked applications: (1) Judge whether a sorting task would benefit from a quantum computer; (2) Walk through Deutsch-Jozsa's single-query idea
- Common misconception addressed: Believing quantum computers are just faster classical computers for everything
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Why some problems speed up | 64 | 4 |
| M04L02 | Deutsch-Jozsa intuition | 64 | 4 |
| M04L03 | Limits of quantum advantage | 64 | 4 |

### M05 Hardware and reality (18% (design weight), design weight)

- Worked applications: (1) Match a vendor's qubit count claim to practical capability; (2) Explain why error rates cap today's circuit depth
- Common misconception addressed: Assuming current machines already break modern encryption
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Hardware approaches overview | 57 | 4 |
| M05L02 | Noise, decoherence and NISQ | 57 | 4 |
| M05L03 | Hype versus reality | 59 | 4 |

## Integrative case

A research-curious product team is pitched a 'quantum-ready' vendor tool: assess which claims are plausible, which problems in their roadmap might ever benefit, and what today's noise limits mean for a realistic three-year plan.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2749-final-protected | 40 | 40 | yes |
| MST-2749-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Classical to quantum intuition | 8 |
| Gates and circuits | 9 |
| Measurement and probability | 8 |
| Algorithms at a glance | 8 |
| Hardware and reality | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2749-Q0001** (single-answer, Select ONE) A qubit is measured many times and returns 0 about 25% of the time and 1 about 75% of the time. What does this tell you about its state before measurement?

- A. It was in a superposition whose amplitudes gave probabilities of about 0.25 and 0.75 **(key)**  
  _Rationale:_ Correct: measurement probabilities are the squared magnitudes of the amplitudes of the pre-measurement superposition.
- B. It was definitely 1 and the 0 results are hardware errors  
  _Rationale:_ A stable 75/25 split reflects the state's amplitudes, not random hardware error.
- C. It was both 0 and 1 simultaneously in a classical sense  
  _Rationale:_ Superposition is a probability amplitude description, not a classical 'both values' object.
- D. The qubit had no defined state until the vendor assigned one  
  _Rationale:_ The state is defined by its amplitudes; measurement reveals an outcome probabilistically.

**MST-2749-Q0002** (multiple-answer, Select TWO) Which TWO statements about entanglement are accurate? (Select TWO.)

- A. Measuring one entangled qubit is correlated with the outcome of its partner **(key)**  
  _Rationale:_ Correct: entangled qubits show correlated measurement outcomes.
- B. Entanglement is a genuinely non-classical resource used by many quantum algorithms **(key)**  
  _Rationale:_ Correct: entanglement has no classical analogue and underlies quantum advantage in several algorithms.
- C. Entanglement lets you send information faster than light  
  _Rationale:_ No usable signal travels faster than light; correlations cannot carry a message on their own.
- D. Entangled qubits can be freely copied to back them up  
  _Rationale:_ The no-cloning theorem forbids copying an unknown quantum state.

**MST-2749-Q0003** (single-answer, Select ONE) A vendor claims their 50-qubit noisy device already runs deep algorithms that break RSA. What is the most accurate response?

- A. Current noisy intermediate-scale devices cannot run the deep, error-corrected circuits RSA-breaking requires **(key)**  
  _Rationale:_ Correct: breaking RSA needs far more logical, error-corrected qubits than today's noisy hardware provides.
- B. Any 50-qubit device can break RSA because 50 qubits exceed RSA key sizes  
  _Rationale:_ Qubit count does not map onto key bits that way; error correction and depth dominate.
- C. RSA is already broken by classical computers so the claim is routine  
  _Rationale:_ RSA is not broken classically; this misstates the baseline.
- D. The claim is plausible because noise improves algorithm accuracy  
  _Rationale:_ Noise degrades, not improves, circuit results.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
