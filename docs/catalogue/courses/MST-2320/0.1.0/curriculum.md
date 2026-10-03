# Digital Logic And Electronics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2320` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Digital Logic And Electronics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply Boolean algebra to simplify logic expressions
2. Design combinational circuits from truth tables using logic gates
3. Use Karnaugh maps to minimise two- to four-variable functions
4. Explain sequential elements such as latches, flip-flops and registers
5. Describe number systems and binary arithmetic in hardware
6. Analyse timing, propagation delay and basic electronic signal behaviour

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Boolean algebra and gates (25% (Mastemy design weight), design weight)

- Worked applications: (1) Prove De Morgan's theorem using a truth table; (2) Rewrite a NAND-only expression into AND/OR/NOT form
- Common misconception addressed: Confusing bitwise logical operators with arithmetic operators
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Logic gates and truth tables | 120 | 7 |
| M01L02 | Boolean laws and expression simplification | 120 | 7 |

### M02 Combinational design (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a one-bit full adder from a truth table; (2) Select the right multiplexer width for a 4-to-1 data selector
- Common misconception addressed: Assuming any combinational function needs a custom gate for every row
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | From truth table to gate network | 120 | 7 |
| M02L02 | Multiplexers, decoders and adders | 120 | 7 |

### M03 Minimisation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Minimise a 4-variable function with a Karnaugh map; (2) Use don't-care cells to further reduce gate count
- Common misconception addressed: Grouping K-map cells in sizes that are not powers of two
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Karnaugh maps and prime implicants | 120 | 7 |
| M03L02 | Don't-care conditions and hazards | 120 | 7 |

### M04 Sequential logic and timing (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute whether a flip-flop meets a setup-time constraint at a given clock period; (2) Distinguish a level-sensitive latch from an edge-triggered flip-flop
- Common misconception addressed: Treating propagation delay as zero when reasoning about clock speed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Latches, flip-flops and registers | 120 | 7 |
| M04L02 | Clocking, setup/hold and propagation delay | 120 | 7 |

## Integrative case

A junior engineer must design the control logic for a vending machine: derive the state behaviour, minimise the combinational logic, choose flip-flops and verify the timing closes at the target clock frequency.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2320-final-protected | 40 | 40 | yes |
| MST-2320-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Boolean algebra and gates | 10 |
| Combinational design | 10 |
| Minimisation | 10 |
| Sequential logic and timing | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2320-Q0001** (single-answer, Select ONE) Applying De Morgan's law, the expression NOT(A AND B) is equivalent to which of the following?

- A. (NOT A) OR (NOT B) **(key)**  
  _Rationale:_ Correct: De Morgan's law turns a negated AND into an OR of negations.
- B. (NOT A) AND (NOT B)  
  _Rationale:_ That is the negation of (A OR B), not of (A AND B).
- C. A OR B  
  _Rationale:_ This drops the negations entirely and is not equivalent.
- D. A AND B  
  _Rationale:_ This is the un-negated original term.

**MST-2320-Q0002** (multiple-answer, Select TWO) Which TWO components are purely combinational, producing outputs that depend only on current inputs? (Select TWO.)

- A. A 4-to-1 multiplexer **(key)**  
  _Rationale:_ Correct: a multiplexer's output depends only on its current inputs and select lines.
- B. A full adder **(key)**  
  _Rationale:_ Correct: a full adder's sum and carry depend only on the present inputs.
- C. A D flip-flop  
  _Rationale:_ A flip-flop stores state, so its output depends on past inputs.
- D. A shift register  
  _Rationale:_ A shift register is sequential and holds state across clock edges.

**MST-2320-Q0003** (single-answer, Select ONE) A D flip-flop has a setup time of 2 ns and the data arrives 1.5 ns before the clock edge. What happens?

- A. A setup-time violation, because data must be stable at least 2 ns before the edge **(key)**  
  _Rationale:_ Correct: 1.5 ns < 2 ns, so the setup requirement is not met.
- B. Nothing, because 1.5 ns is enough margin  
  _Rationale:_ 1.5 ns is less than the required 2 ns setup time.
- C. A hold-time violation only  
  _Rationale:_ Hold time concerns stability after the edge, not before.
- D. The clock frequency automatically increases  
  _Rationale:_ A violation does not change the clock; it risks metastability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
