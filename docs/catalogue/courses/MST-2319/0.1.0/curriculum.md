# Processor and Memory Systems Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2319` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Processor and Memory Systems Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the von Neumann model and the roles of the CPU, memory and I/O
2. Describe the instruction cycle and how instructions are fetched, decoded and executed
3. Interpret how data is represented in binary, including integers and floating point
4. Analyse the memory hierarchy and how caching affects performance
5. Explain pipelining and common hazards that limit instruction throughput
6. Reason about performance using clock speed, CPI and Amdahl's law

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Processor organisation and the instruction cycle (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace one instruction through fetch-decode-execute on a simple datapath; (2) Identify which control signals move data between the ALU, registers and memory
- Common misconception addressed: Believing the CPU executes source code directly rather than machine instructions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The von Neumann model and the datapath | 120 | 7 |
| M01L02 | Fetch-decode-execute and the control unit | 120 | 7 |

### M02 Data representation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Convert a decimal value to two's-complement binary and back; (2) Show why 0.1 cannot be represented exactly in IEEE-754 floating point
- Common misconception addressed: Assuming floating-point arithmetic is always exact
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Binary, hexadecimal and integer encodings | 120 | 7 |
| M02L02 | Floating-point representation and rounding | 120 | 7 |

### M03 Memory hierarchy and caching (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute the effective access time for a two-level cache given hit rate and latencies; (2) Explain why a loop over a contiguous array is faster than a strided access
- Common misconception addressed: Thinking a bigger cache always improves performance regardless of locality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Registers, cache, main memory and storage | 120 | 7 |
| M03L02 | Cache mapping, locality and hit rates | 120 | 7 |

### M04 Performance and parallelism (25% (Mastemy design weight), design weight)

- Worked applications: (1) Count stall cycles introduced by a data hazard in a 5-stage pipeline; (2) Apply Amdahl's law to bound the speedup from parallelising 60% of a workload
- Common misconception addressed: Assuming doubling clock speed doubles real program performance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Pipelining and hazards | 120 | 7 |
| M04L02 | Performance equations and Amdahl's law | 120 | 7 |

## Integrative case

A team is choosing a CPU for an embedded analytics appliance: reason about clock speed, cache size, pipelining and the memory hierarchy to predict which design best serves a memory-bound workload and justify the trade-offs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2319-final-protected | 40 | 40 | yes |
| MST-2319-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Processor organisation and the instruction cycle | 10 |
| Data representation | 10 |
| Memory hierarchy and caching | 10 |
| Performance and parallelism | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2319-Q0001** (single-answer, Select ONE) During the instruction cycle, which step places the address of the next instruction onto the memory bus so it can be retrieved?

- A. The fetch step, which uses the program counter to address memory **(key)**  
  _Rationale:_ Correct: fetch uses the program counter to read the next instruction from memory.
- B. The execute step, after the ALU computes a result  
  _Rationale:_ Execute performs the operation; the instruction has already been fetched.
- C. The decode step, which only interprets the opcode  
  _Rationale:_ Decode interprets the fetched instruction; it does not fetch it.
- D. The write-back step, which stores results to registers  
  _Rationale:_ Write-back stores results; it does not fetch instructions.

**MST-2319-Q0002** (multiple-answer, Select TWO) Which TWO properties of a program improve the hit rate of a CPU cache? (Select TWO.)

- A. Temporal locality, where recently used data is reused soon **(key)**  
  _Rationale:_ Correct: reused data stays resident in cache, raising the hit rate.
- B. Spatial locality, where nearby addresses are accessed together **(key)**  
  _Rationale:_ Correct: fetching a cache line serves neighbouring accesses.
- C. A larger working set than the cache capacity  
  _Rationale:_ A working set exceeding capacity causes evictions and lowers the hit rate.
- D. Purely random access across a huge address range  
  _Rationale:_ Random wide access defeats both temporal and spatial locality.

**MST-2319-Q0003** (single-answer, Select ONE) A workload is 75% parallelisable. By Amdahl's law, what is the maximum speedup with unlimited processors?

- A. 4x, because the serial 25% bounds the speedup to 1/0.25 **(key)**  
  _Rationale:_ Correct: the serial fraction 0.25 limits speedup to 1/0.25 = 4x.
- B. Unlimited, because all work can eventually be parallelised  
  _Rationale:_ The serial 25% can never be parallelised, so speedup is bounded.
- C. 1.33x, because only the serial part speeds up  
  _Rationale:_ The parallel part speeds up; the serial part is the bound.
- D. 75x, equal to the parallel percentage  
  _Rationale:_ Amdahl's law bounds speedup by the inverse of the serial fraction.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
