# NCEES FE Electrical and Computer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0373` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | licensing-examination-knowledge-prep |
| Issuer | NCEES (no affiliation or endorsement) |
| Exam code | FE Electrical and Computer |
| Version basis | unresolved (official outline not verified) |
| Evidence | **unverified-needs-official-check** - issuer outline not fetched in this pass; module/domain structure is a DESIGN ASSUMPTION |
| Legacy IDs | MST-ENG-NCEES-FEELE-001 |
| Planned time | T = 9000 min; instruction I = 7200 min (80%); assessment A = 1800 min (20%) |
| Assessment split | lesson checks 450 / module checks 630 / cumulative 720 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-CERTPREP-02 |

> **DESIGN ASSUMPTION:** The official domain names, weightings, learning objectives and item counts were NOT verified against the issuer's published outline in this spec-writing pass. Every module, weighting, objective and item count below is a planning assumption and must be confirmed against the official exam page before authoring.

## Learning outcomes

1. Demonstrate knowledge and applied reasoning for the design-assumption domain: Mathematics and Engineering Fundamentals (confirm against official outline at blueprint review)
2. Demonstrate knowledge and applied reasoning for the design-assumption domain: Circuits and Electronics (confirm against official outline at blueprint review)
3. Demonstrate knowledge and applied reasoning for the design-assumption domain: Signals, Systems and Communications (confirm against official outline at blueprint review)
4. Demonstrate knowledge and applied reasoning for the design-assumption domain: Digital Systems and Computing (confirm against official outline at blueprint review)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Mathematics and Engineering Fundamentals (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Solve a linear system arising from a circuit; (2) Compute a reliability or expected-value figure
- Common misconception addressed: Misapplying matrix operations that are not commutative
- Module check: 158 items / 158 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Linear algebra and calculus | 600 | 6 |
| M01L02 | Probability and statistics | 600 | 6 |
| M01L03 | Engineering economics and ethics | 600 | 6 |

### M02 Circuits and Electronics (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Analyse an AC circuit using phasors; (2) Reason about a diode or transistor operating region
- Common misconception addressed: Forgetting that impedance is frequency dependent
- Module check: 158 items / 158 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | DC and AC circuit analysis | 600 | 6 |
| M02L02 | Electronics and semiconductor devices | 600 | 6 |
| M02L03 | Power and energy | 600 | 6 |

### M03 Signals, Systems and Communications (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Classify a system as linear and time-invariant; (2) Relate bandwidth to a communications requirement
- Common misconception addressed: Confusing time-domain and frequency-domain representations
- Module check: 157 items / 157 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Signals and systems | 600 | 6 |
| M03L02 | Communications concepts | 600 | 6 |
| M03L03 | Electromagnetics | 600 | 6 |

### M04 Digital Systems and Computing (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Simplify a Boolean expression for a logic design; (2) Trace a simple algorithm's complexity
- Common misconception addressed: Assuming more logic gates always means a faster circuit
- Module check: 157 items / 157 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Digital logic | 600 | 6 |
| M04L02 | Computer systems and architecture | 600 | 6 |
| M04L03 | Software and algorithms concepts | 600 | 6 |

## Integrative case

Work through multi-topic FE-style problems in electrical and computer engineering: identify the governing principle, set up the relationships, and reason to a quantitative answer. DESIGN ASSUMPTION pending official outline.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified; 270 items/270 min per form is a planning figure.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0373-practice-form-A | 270 | 270 | yes |
| MST-0373-practice-form-B | 270 | 270 | no (optional practice) |
| MST-0373-practice-form-C | 270 | 270 | no (optional practice) |
| MST-0373-final-protected | 270 | 270 | yes |

| Domain | Items per form |
|---|---|
| Mathematics and Engineering Fundamentals | 68 |
| Circuits and Electronics | 68 |
| Signals, Systems and Communications | 67 |
| Digital Systems and Computing | 67 |

Minimum reviewed item bank: 2484 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0373-Q0001** (single-answer-mcq, Select ONE) In a sinusoidal AC circuit, the impedance of an ideal inductor:

- A. Increases as frequency increases **(key)**  
  _Rationale:_ Correct: inductive reactance X_L = 2*pi*f*L rises with frequency.
- B. Decreases as frequency increases  
  _Rationale:_ That describes a capacitor, not an inductor.
- C. Is independent of frequency  
  _Rationale:_ Inductive reactance is frequency dependent.
- D. Is always zero  
  _Rationale:_ An ideal inductor has non-zero reactance at non-zero frequency.

**MST-0373-Q0002** (single-answer-mcq, Select ONE) A system's output at any time depends only on present and past inputs, and a time-shifted input produces the same output shifted in time. The system is:

- A. Causal and time-invariant **(key)**  
  _Rationale:_ Correct: dependence on present/past inputs is causality; shift-invariance is time-invariance.
- B. Non-causal  
  _Rationale:_ It does not depend on future inputs, so it is causal.
- C. Time-varying  
  _Rationale:_ A shifted input giving a shifted output indicates time-invariance.
- D. Necessarily nonlinear  
  _Rationale:_ The description says nothing that forces nonlinearity.

**MST-0373-Q0003** (multiple-answer-selection, Select TWO) Which TWO are valid simplifications in Boolean algebra?

- A. A + A = A (idempotent law) **(key)**  
  _Rationale:_ Correct: the idempotent law holds for OR.
- B. A * 1 = A (identity law) **(key)**  
  _Rationale:_ Correct: ANDing with 1 leaves A unchanged.
- C. A + 1 = A  
  _Rationale:_ A + 1 equals 1, not A.
- D. A * 0 = A  
  _Rationale:_ A AND 0 equals 0, not A.
- E. A + A' = 0  
  _Rationale:_ A OR NOT-A equals 1, not 0.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
