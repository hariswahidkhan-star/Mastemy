# Computer Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1544` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Computer Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Digital logic and data representation
2. Instruction set architecture
3. Processor datapath and control
4. Pipelining and hazards
5. Memory hierarchy and caches
6. I/O, storage and parallelism

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Digital logic and data representation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert and add numbers in two's complement; (2) Build a truth table for a small combinational circuit
- Common misconception addressed: Assuming integer overflow behaves like real-number arithmetic
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Binary, two's complement and encodings | 67 | 6 |
| M01L02 | Logic gates and combinational circuits | 67 | 6 |
| M01L03 | Sequential logic and state | 67 | 6 |

### M02 Instruction set architecture (MASTEMY-DESIGN 17%)

- Worked applications: (1) Decode an instruction into its fields; (2) Choose an addressing mode for a given access pattern
- Common misconception addressed: Thinking more instructions always means a faster program
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | ISA fundamentals and the programmer's model | 67 | 6 |
| M02L02 | Instruction formats and addressing modes | 67 | 6 |
| M02L03 | RISC vs CISC trade-offs | 67 | 6 |

### M03 Processor datapath and control (MASTEMY-DESIGN 16%)

- Worked applications: (1) Trace a load instruction through the datapath; (2) Determine the control signals for one instruction
- Common misconception addressed: Believing the clock period can be shorter than the slowest path
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The single-cycle datapath | 67 | 6 |
| M03L02 | Control signals and the ALU | 67 | 6 |
| M03L03 | Exceptions and the control unit | 67 | 6 |

### M04 Pipelining and hazards (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute speedup from pipelining a datapath; (2) Resolve a data hazard with forwarding or a stall
- Common misconception addressed: Assuming pipelining reduces the latency of a single instruction
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Pipelining basics and throughput | 67 | 6 |
| M04L02 | Data hazards, forwarding and stalls | 67 | 6 |
| M04L03 | Control hazards and branch prediction | 67 | 6 |

### M05 Memory hierarchy and caches (MASTEMY-DESIGN 17%)

- Worked applications: (1) Classify a miss as compulsory, capacity or conflict; (2) Compute an average memory access time
- Common misconception addressed: Thinking a bigger cache always lowers the miss rate
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Locality and the memory hierarchy | 66 | 6 |
| M05L02 | Cache organisation and mapping | 66 | 6 |
| M05L03 | Cache performance and misses | 66 | 6 |

### M06 I/O, storage and parallelism (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose interrupts or polling for a device; (2) Apply Amdahl's law to a parallel speedup estimate
- Common misconception addressed: Expecting linear speedup from adding more cores
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Buses, I/O and interrupts vs polling | 66 | 6 |
| M06L02 | Storage and the I/O hierarchy | 66 | 6 |
| M06L03 | Parallelism: ILP, multicore and Amdahl's law | 66 | 6 |

## Integrative case

Reason about a small program's performance end to end: represent its data correctly, read its instructions in a given ISA, follow one instruction through the datapath, estimate the speedup from pipelining it (handling a hazard), analyse how the cache affects its memory access time, then use Amdahl's law to judge how much adding cores would help.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1544-final-protected | 30 | 30 | yes |
| MST-1544-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Digital logic and data representation | 5 |
| Instruction set architecture | 5 |
| Processor datapath and control | 5 |
| Pipelining and hazards | 5 |
| Memory hierarchy and caches | 5 |
| I/O, storage and parallelism | 5 |

Minimum reviewed item bank: 486 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1544-Q0001** (single-answer, Select ONE) On a pipelined processor, what does pipelining primarily improve?

- A. Instruction throughput, by overlapping the execution of multiple instructions **(key)**  
  _Rationale:_ Correct: pipelining raises throughput; the latency of a single instruction does not fall.
- B. The latency of a single instruction  
  _Rationale:_ A single instruction still takes at least as long; only throughput improves.
- C. The total number of transistors required  
  _Rationale:_ Pipelining adds registers; it is about throughput, not transistor count.
- D. The cache hit rate  
  _Rationale:_ Cache behaviour is separate from pipelining.

**MST-1544-Q0002** (multiple-answer, Select ALL that apply) Which two situations create a pipeline hazard that may require stalling or forwarding? (Select TWO)

- A. An instruction needs a result that an earlier, not-yet-finished instruction will produce **(key)**  
  _Rationale:_ Correct: that is a data hazard (read-after-write).
- B. A branch's outcome is not yet known when the next instruction must be fetched **(key)**  
  _Rationale:_ Correct: that is a control hazard.
- C. Two instructions use different registers with no shared data  
  _Rationale:_ Independent instructions do not create a hazard.
- D. An instruction is a no-op  
  _Rationale:_ A no-op introduces no dependency hazard.

**MST-1544-Q0003** (single-answer, Select ONE) A cache miss that occurs the very first time a block is referenced is best classified as which type?

- A. A compulsory (cold) miss **(key)**  
  _Rationale:_ Correct: the first reference to a block is a compulsory miss regardless of cache size.
- B. A conflict miss  
  _Rationale:_ Conflict misses arise from mapping collisions, not first reference.
- C. A capacity miss  
  _Rationale:_ Capacity misses arise when the working set exceeds the cache.
- D. A coherence miss  
  _Rationale:_ Coherence misses relate to multiprocessor sharing, not first reference.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
