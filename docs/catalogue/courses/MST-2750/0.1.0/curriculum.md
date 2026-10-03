# Quantum Algorithms: Grover, Shor and Quantum Speedups

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2750` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Quantum Algorithms: Grover, Shor and Quantum Speedups (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the structure common to quantum algorithms: prepare, interfere, measure
2. Describe Grover's search and its quadratic speedup intuitively
3. Describe the role of the quantum Fourier transform in period finding
4. Summarise Shor's algorithm at a conceptual level and its significance
5. Identify where quantum algorithms do and do not help versus classical methods
6. Reason about resource costs such as qubit count and circuit depth

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Algorithm anatomy (20% (design weight), design weight)

- Worked applications: (1) Trace the prepare-interfere-measure steps on a toy oracle; (2) Explain why interference, not parallelism alone, gives the answer
- Common misconception addressed: Believing a quantum computer tries all answers and simply picks the right one
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Prepare-interfere-measure pattern | 64 | 4 |
| M01L02 | Oracles and query models | 64 | 4 |
| M01L03 | Amplitude amplification idea | 64 | 4 |

### M02 Grover search (22% (design weight), design weight)

- Worked applications: (1) Estimate Grover iterations for a database of size N; (2) Compare Grover's N^0.5 to a classical N scan
- Common misconception addressed: Thinking Grover gives an exponential, not quadratic, speedup
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The unstructured search problem | 70 | 4 |
| M02L02 | How Grover amplifies the answer | 70 | 4 |
| M02L03 | Quadratic speedup and its limits | 71 | 4 |

### M03 Fourier and period finding (20% (design weight), design weight)

- Worked applications: (1) Describe what phase estimation extracts from a unitary; (2) Relate period finding to the QFT
- Common misconception addressed: Confusing the quantum Fourier transform with a classical FFT of data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Quantum Fourier transform intuition | 64 | 4 |
| M03L02 | Phase estimation overview | 64 | 4 |
| M03L03 | Finding periods | 64 | 4 |

### M04 Shor and factoring (20% (design weight), design weight)

- Worked applications: (1) Explain why factoring reduces to period finding; (2) Connect Shor's speedup to post-quantum cryptography urgency
- Common misconception addressed: Assuming Shor's algorithm runs on today's noisy devices
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Factoring as period finding | 64 | 4 |
| M04L02 | Shor's algorithm conceptually | 64 | 4 |
| M04L03 | Why it matters for cryptography | 64 | 4 |

### M05 Resources and reality (18% (design weight), design weight)

- Worked applications: (1) Estimate logical qubits needed for a toy Shor instance; (2) Judge a problem as better suited to classical solving
- Common misconception addressed: Assuming every problem has a quantum speedup
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Counting qubits and depth | 57 | 4 |
| M05L02 | Error correction overhead | 57 | 4 |
| M05L03 | When classical wins | 59 | 4 |

## Integrative case

A security architect must brief leadership on quantum risk: explain in plain terms why Shor's algorithm threatens RSA, how far away fault-tolerant hardware is, and which problems quantum methods will not accelerate.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2750-final-protected | 40 | 40 | yes |
| MST-2750-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Algorithm anatomy | 8 |
| Grover search | 9 |
| Fourier and period finding | 8 |
| Shor and factoring | 8 |
| Resources and reality | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2750-Q0001** (single-answer, Select ONE) For unstructured search over N items, roughly how many evaluations does Grover's algorithm need compared with a classical search?

- A. About sqrt(N) versus about N classically - a quadratic speedup **(key)**  
  _Rationale:_ Correct: Grover gives a quadratic speedup, needing on the order of sqrt(N) iterations.
- B. About log(N) versus N - an exponential speedup  
  _Rationale:_ Grover is quadratic, not exponential; log(N) overstates the advantage.
- C. About N versus N - no speedup at all  
  _Rationale:_ Grover does provide a quadratic advantage over classical search.
- D. About N^2 - it is slower than classical search  
  _Rationale:_ Grover is faster, not slower, scaling as sqrt(N).

**MST-2750-Q0002** (multiple-answer, Select TWO) Which TWO statements about Shor's algorithm are correct? (Select TWO.)

- A. It can factor large integers efficiently, threatening RSA **(key)**  
  _Rationale:_ Correct: Shor's algorithm factors integers in polynomial time, undermining RSA.
- B. It relies on quantum period finding via the quantum Fourier transform **(key)**  
  _Rationale:_ Correct: Shor reduces factoring to period finding, solved with the QFT and phase estimation.
- C. It already runs on commercial noisy devices to break real keys  
  _Rationale:_ Fault-tolerant hardware at the needed scale does not yet exist.
- D. It speeds up every optimisation problem exponentially  
  _Rationale:_ Shor targets factoring/discrete-log structure, not arbitrary optimisation.

**MST-2750-Q0003** (single-answer, Select ONE) Why is interference essential to quantum algorithms rather than simply 'trying all inputs at once'?

- A. Interference is engineered so wrong answers cancel and the right answer's amplitude grows before measurement **(key)**  
  _Rationale:_ Correct: algorithms arrange constructive/destructive interference so measurement is likely to yield the answer.
- B. Because measurement returns all superposed answers simultaneously  
  _Rationale:_ Measurement returns one outcome; you cannot read all branches.
- C. Because qubits store exponentially many classical results you can print out  
  _Rationale:_ You cannot extract all amplitudes; only measurement statistics are accessible.
- D. Because interference copies the correct answer to every qubit  
  _Rationale:_ No-cloning forbids copying; interference reshapes amplitudes, it does not copy results.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
