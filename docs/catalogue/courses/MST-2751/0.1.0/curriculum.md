# Quantum Machine Learning: Encoding, Variational Circuits and Kernels

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2751` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Quantum Machine Learning: Encoding, Variational Circuits and Kernels (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what quantum machine learning does and does not promise
2. Describe how classical data is encoded into quantum states
3. Outline variational quantum circuits and parameterised models
4. Describe quantum kernels and their relationship to classical kernels
5. Identify realistic near-term limitations and the role of hybrid approaches
6. Evaluate QML claims critically against classical baselines

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Framing QML (20% (design weight), design weight)

- Worked applications: (1) Decide between amplitude and basis encoding for a dataset; (2) Explain the data-loading bottleneck for a tabular dataset
- Common misconception addressed: Assuming QML automatically beats deep learning on any dataset
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What QML is and is not | 64 | 4 |
| M01L02 | Where QML might help | 64 | 4 |
| M01L03 | Hype and honest baselines | 64 | 4 |

### M02 Data encoding (22% (design weight), design weight)

- Worked applications: (1) Sketch a feature map encoding two features into a circuit; (2) Explain why encoding choice changes the model
- Common misconception addressed: Thinking more qubits always means a better model
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Basis and amplitude encoding | 70 | 4 |
| M02L02 | Feature maps | 70 | 4 |
| M02L03 | The input/output bottleneck | 71 | 4 |

### M03 Variational models (20% (design weight), design weight)

- Worked applications: (1) Set up a cost function for a variational classifier; (2) Diagnose a barren plateau from a flat gradient
- Common misconception addressed: Believing variational circuits always train smoothly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Parameterised circuits | 64 | 4 |
| M03L02 | Cost functions and training | 64 | 4 |
| M03L03 | Barren plateaus | 64 | 4 |

### M04 Quantum kernels (20% (design weight), design weight)

- Worked applications: (1) Compute a toy quantum kernel entry conceptually; (2) Compare a quantum kernel to an RBF kernel
- Common misconception addressed: Confusing a quantum kernel with guaranteed accuracy gains
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Kernel methods recap | 64 | 4 |
| M04L02 | Quantum kernel estimation | 64 | 4 |
| M04L03 | Comparing to classical kernels | 64 | 4 |

### M05 Hybrid and reality (18% (design weight), design weight)

- Worked applications: (1) Design a hybrid loop with a classical optimiser; (2) Judge a QML result against a strong classical baseline
- Common misconception addressed: Ignoring the classical baseline when claiming quantum advantage
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Hybrid classical-quantum loops | 57 | 4 |
| M05L02 | NISQ-era constraints | 57 | 4 |
| M05L03 | Reading a QML paper critically | 59 | 4 |

## Integrative case

A data science lead is asked whether to fund a quantum machine learning pilot: weigh the data-encoding bottleneck, the lack of a proven near-term advantage, and design an honest experiment that always reports a classical baseline.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2751-final-protected | 40 | 40 | yes |
| MST-2751-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framing QML | 8 |
| Data encoding | 9 |
| Variational models | 8 |
| Quantum kernels | 8 |
| Hybrid and reality | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2751-Q0001** (single-answer, Select ONE) Why is loading large classical datasets into a quantum computer a central challenge for quantum machine learning?

- A. Encoding many data points into quantum states can cost as much as the computation you hoped to speed up **(key)**  
  _Rationale:_ Correct: the data-loading/input bottleneck can erase any theoretical speedup for data-heavy tasks.
- B. Quantum computers cannot represent numbers at all  
  _Rationale:_ They can represent amplitudes; the issue is the cost of loading, not representation.
- C. Classical data must first be deleted to free qubits  
  _Rationale:_ This is not how encoding works; data is mapped into states, not deleted.
- D. Loading data is instantaneous so it is never a concern  
  _Rationale:_ Loading is often the dominant cost, not instantaneous.

**MST-2751-Q0002** (multiple-answer, Select TWO) Which TWO are genuine near-term limitations of variational quantum machine learning? (Select TWO.)

- A. Barren plateaus can make gradients vanish and training stall **(key)**  
  _Rationale:_ Correct: barren plateaus are a well-documented trainability problem.
- B. Noise on NISQ hardware degrades the quality of the learned model **(key)**  
  _Rationale:_ Correct: device noise is a major constraint on today's variational models.
- C. Variational circuits are proven to beat all classical models  
  _Rationale:_ No such general proof exists; advantage is problem-specific and unproven in general.
- D. They require no classical computation at all  
  _Rationale:_ They are hybrid: a classical optimiser updates the circuit parameters.

**MST-2751-Q0003** (single-answer, Select ONE) A pilot reports a quantum classifier reached 82% accuracy. What is the most important follow-up before claiming success?

- A. Compare it against a strong classical baseline on the same data and splits **(key)**  
  _Rationale:_ Correct: without a classical baseline the number says nothing about quantum advantage.
- B. Add more qubits because accuracy always rises with qubit count  
  _Rationale:_ Accuracy does not reliably rise with qubit count; baselines matter more.
- C. Publish immediately since 82% is above random  
  _Rationale:_ Being above random is not evidence of advantage over classical methods.
- D. Remove the classical optimiser to make it 'fully quantum'  
  _Rationale:_ Variational QML needs the classical optimiser; removing it is not a validity check.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
