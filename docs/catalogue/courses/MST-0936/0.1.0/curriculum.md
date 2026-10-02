# Assembly Language: Computer Architecture and Low-Level Programming

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0936` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-ALB-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Assembly Language: Computer Architecture and Low-Level Programming (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Computer architecture foundations
2. Instruction set and registers
3. Arithmetic, logic and flags
4. Control flow
5. Stack, procedures and calling conventions
6. Memory, I/O and interfacing with C

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Computer architecture foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert between hex, binary and two's-complement decimal; (2) Trace one fetch-decode-execute cycle by hand
- Common misconception addressed: Confusing a value's bit pattern with its signed interpretation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CPU, registers, memory and the fetch-execute cycle | 120 | 6 |
| M01L02 | Number systems, two's complement and binary logic | 120 | 6 |

### M02 Instruction set and registers (MASTEMY-DESIGN 17%)

- Worked applications: (1) Load, move and store values across registers and memory; (2) Use indexed addressing to read an array element
- Common misconception addressed: Assuming all instructions can take two memory operands
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | General-purpose registers and operand types | 120 | 6 |
| M02L02 | Data movement and addressing modes | 120 | 6 |

### M03 Arithmetic, logic and flags (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add two numbers and inspect the carry and zero flags; (2) Mask and test individual bits with AND/OR/XOR
- Common misconception addressed: Reading a flag that the last instruction did not actually set
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Arithmetic and logical instructions | 120 | 6 |
| M03L02 | The flags register and conditional codes | 120 | 6 |

### M04 Control flow (MASTEMY-DESIGN 17%)

- Worked applications: (1) Implement an if/else with CMP and conditional jumps; (2) Write a counted loop that sums an array
- Common misconception addressed: Branching on stale flags because an unrelated instruction ran in between
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Jumps, conditional branches and comparisons | 120 | 6 |
| M04L02 | Loops and building higher-level control structures | 120 | 6 |

### M05 Stack, procedures and calling conventions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Call a subroutine that preserves caller registers; (2) Pass arguments and return a value per the calling convention
- Common misconception addressed: Forgetting to balance the stack and corrupting the return address
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The stack, PUSH/POP and the stack pointer | 120 | 6 |
| M05L02 | CALL/RET, stack frames and calling conventions | 120 | 6 |

### M06 Memory, I/O and interfacing with C (MASTEMY-DESIGN 16%)

- Worked applications: (1) Make a system call to write a string to stdout; (2) Call an assembly routine from a C program
- Common misconception addressed: Ignoring endianness when reading a multi-byte value from memory
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Memory layout, data vs code and endianness | 120 | 6 |
| M06L02 | System calls and mixing assembly with C | 120 | 6 |

## Integrative case

Write and reason about a small assembly routine that a C program calls: it receives an array pointer and length, loops to compute a checksum using registers and flags, respects the calling convention and stack discipline, and returns the result to C.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0936-final-protected | 48 | 48 | yes |
| MST-0936-final-alternate | 48 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Computer architecture foundations | 8 |
| Instruction set and registers | 8 |
| Arithmetic, logic and flags | 8 |
| Control flow | 8 |
| Stack, procedures and calling conventions | 8 |
| Memory, I/O and interfacing with C | 8 |

Minimum reviewed item bank: 492 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0936-Q0001** (single-answer, Select ONE) What does two's complement representation make convenient in hardware?

- A. Subtraction can be performed using the same adder circuitry as addition **(key)**  
  _Rationale:_ Correct: negative numbers are formed so that a single adder handles both add and subtract.
- B. Floating-point division becomes exact  
  _Rationale:_ Two's complement is for integers and does not make float division exact.
- C. It removes the need for a sign bit  
  _Rationale:_ The high-order bit still indicates sign in two's complement.
- D. It doubles the addressable memory  
  _Rationale:_ It is a number encoding, unrelated to address space size.

**MST-0936-Q0002** (multiple-answer, Select ALL that apply) Which statements about the stack in assembly are correct? (Select TWO)

- A. CALL typically pushes a return address onto the stack **(key)**  
  _Rationale:_ Correct: so RET can return to the instruction after the call.
- B. The stack pointer must be balanced across a procedure to avoid corruption **(key)**  
  _Rationale:_ Correct: unbalanced pushes/pops can overwrite the return address.
- C. The stack can only hold one value at a time  
  _Rationale:_ The stack is a LIFO region holding many values.
- D. PUSH and POP operate on the program counter directly  
  _Rationale:_ They operate on the stack via the stack pointer, not the program counter.

**MST-0936-Q0003** (single-answer, Select ONE) Why does endianness matter when reading a multi-byte integer from memory?

- A. It determines whether the most significant byte is stored first or last **(key)**  
  _Rationale:_ Correct: byte order changes how the same bytes are assembled into a value.
- B. It sets the clock speed of the CPU  
  _Rationale:_ Endianness is byte ordering, not clock speed.
- C. It controls how many registers exist  
  _Rationale:_ Register count is independent of endianness.
- D. It encrypts the value in memory  
  _Rationale:_ Endianness is a storage order, not encryption.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
