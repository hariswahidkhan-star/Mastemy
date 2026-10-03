# FPGA And Hardware Design Intro

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2325` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — FPGA And Hardware Design Intro (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain FPGA architecture including logic blocks, routing and I/O
2. Describe the HDL design flow from code to bitstream
3. Write basic combinational and sequential logic in an HDL
4. Reason about synthesis, timing constraints and resource usage
5. Explain simulation and testbench-based verification
6. Compare FPGAs with ASICs and microcontrollers for a given problem

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 FPGA architecture (25% (Mastemy design weight), design weight)

- Worked applications: (1) Map a small logic function onto look-up tables and flip-flops; (2) Identify when to use block RAM instead of distributed logic
- Common misconception addressed: Thinking an FPGA executes HDL sequentially like a program
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Look-up tables, flip-flops and routing | 120 | 7 |
| M01L02 | Block RAM, DSP slices and I/O banks | 120 | 7 |

### M02 HDL and the design flow (25% (Mastemy design weight), design weight)

- Worked applications: (1) Follow a design from RTL through synthesis to a bitstream; (2) Add a timing constraint so the tool targets the right clock
- Common misconception addressed: Believing synthesis guarantees timing closure without constraints
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | RTL concepts in an HDL | 120 | 7 |
| M02L02 | Synthesis, place-and-route and bitstream | 120 | 7 |

### M03 Describing logic (25% (Mastemy design weight), design weight)

- Worked applications: (1) Describe a counter using a clocked process in HDL; (2) Separate combinational next-state logic from registered state
- Common misconception addressed: Mixing blocking and non-blocking assignment semantics
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Combinational logic in HDL | 120 | 7 |
| M03L02 | Sequential logic and clocked processes | 120 | 7 |

### M04 Verification and trade-offs (25% (Mastemy design weight), design weight)

- Worked applications: (1) Write a testbench that drives inputs and checks expected outputs; (2) Decide between an FPGA and a microcontroller for a parallel DSP task
- Common misconception addressed: Assuming an FPGA is always faster and cheaper than an ASIC at volume
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Simulation and testbenches | 120 | 7 |
| M04L02 | FPGA vs ASIC vs microcontroller | 120 | 7 |

## Integrative case

A startup must accelerate a real-time image filter: decide whether an FPGA, an ASIC or a microcontroller fits the volume and latency targets, sketch the HDL design flow, and plan simulation-based verification before committing to hardware.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2325-final-protected | 40 | 40 | yes |
| MST-2325-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| FPGA architecture | 10 |
| HDL and the design flow | 10 |
| Describing logic | 10 |
| Verification and trade-offs | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2325-Q0001** (single-answer, Select ONE) Why can an FPGA implement many independent operations that all run at the same time?

- A. Its logic is spatial hardware, so separate circuits operate concurrently **(key)**  
  _Rationale:_ Correct: FPGA logic is parallel hardware, not sequential instructions.
- B. It has an extremely high clock speed  
  _Rationale:_ Concurrency comes from spatial parallelism, not just clock speed.
- C. It runs a multithreaded operating system  
  _Rationale:_ An FPGA fabric is not running an operating system.
- D. It compiles HDL into fast machine code  
  _Rationale:_ HDL is synthesised into hardware, not into machine code.

**MST-2325-Q0002** (multiple-answer, Select TWO) Which TWO steps in the FPGA design flow convert HDL into a configuration the device can load? (Select TWO.)

- A. Synthesis, which maps HDL to logic primitives **(key)**  
  _Rationale:_ Correct: synthesis translates RTL into gates and LUT/flip-flop primitives.
- B. Place-and-route, which assigns and connects those primitives on the fabric **(key)**  
  _Rationale:_ Correct: place-and-route produces the physical implementation leading to the bitstream.
- C. Running the HDL on the host CPU  
  _Rationale:_ HDL is not executed on the CPU to program the device.
- D. Flashing a C firmware image  
  _Rationale:_ FPGAs load a bitstream, not a C firmware image.

**MST-2325-Q0003** (single-answer, Select ONE) A design fails to meet its 100 MHz timing target after place-and-route. What is the most appropriate first response?

- A. Examine the critical path and apply or tighten timing constraints and pipelining **(key)**  
  _Rationale:_ Correct: analysing the critical path and adding constraints/pipelining addresses timing.
- B. Increase the supply voltage until it passes  
  _Rationale:_ Raising voltage is not a sound or safe first design response.
- C. Remove the testbench to speed up the tool  
  _Rationale:_ Removing verification does not fix timing and is risky.
- D. Switch the HDL file extension  
  _Rationale:_ The file extension has no effect on timing closure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
