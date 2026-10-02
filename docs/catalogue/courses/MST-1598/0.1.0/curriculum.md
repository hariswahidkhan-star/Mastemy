# WebAssembly

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1598` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-W-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — WebAssembly (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what WebAssembly is and the problems it addresses
2. Describe the module format, linear memory and the stack machine
3. Explain how JavaScript and WebAssembly call each other and share data
4. Describe compiling languages like Rust and C to WebAssembly
5. Explain Wasm's performance profile, sandbox and ecosystem such as WASI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 WebAssembly fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide whether a task is a good fit for Wasm; (2) Explain Wasm to a JavaScript developer
- Common misconception addressed: Believing WebAssembly replaces JavaScript entirely
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Wasm is and how it runs | 120 | 8 |
| M01L02 | Wasm vs JavaScript and typical use cases | 120 | 8 |

### M02 The Wasm module and execution (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reason about how a function uses linear memory; (2) Map simple source types to Wasm value types
- Common misconception addressed: Assuming Wasm has direct access to arbitrary system memory
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Modules, instances and linear memory | 120 | 8 |
| M02L02 | The stack machine and value types | 120 | 8 |

### M03 JavaScript and Wasm interop (MASTEMY-DESIGN 20%)

- Worked applications: (1) Call a Wasm export from JavaScript and read the result; (2) Pass a string across the boundary via linear memory
- Common misconception addressed: Expecting to pass rich objects across the boundary as if by reference for free
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Loading modules and calling exports | 120 | 8 |
| M03L02 | Sharing memory and passing complex data | 120 | 8 |

### M04 Toolchains and languages (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a toolchain for a given source language; (2) Plan how a Wasm module is bundled with a web app
- Common misconception addressed: Thinking any program compiles to Wasm unchanged with no toolchain
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Compiling Rust/C to Wasm and bindings tools | 120 | 8 |
| M04L02 | Bundling and shipping Wasm to the browser | 120 | 8 |

### M05 Performance, security and the wider ecosystem (MASTEMY-DESIGN 20%)

- Worked applications: (1) Predict whether Wasm will speed up a given workload; (2) Explain what the sandbox does and does not allow
- Common misconception addressed: Assuming Wasm is always faster than JavaScript for every task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Performance characteristics and when it helps | 120 | 8 |
| M05L02 | The sandbox, WASI and beyond the browser | 120 | 8 |

## Integrative case

A web app has a CPU-heavy image-processing routine that is slow in JavaScript. Decide whether WebAssembly fits, choose a source language and toolchain, design the JavaScript/Wasm interop including passing image data through linear memory, and set realistic performance and security expectations for stakeholders.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1598-final-protected | 40 | 40 | yes |
| MST-1598-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| WebAssembly fundamentals | 8 |
| The Wasm module and execution | 8 |
| JavaScript and Wasm interop | 8 |
| Toolchains and languages | 8 |
| Performance, security and the wider ecosystem | 8 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1598-Q0001** (single-answer, Select ONE) Which workload is the best candidate to move from JavaScript to WebAssembly?

- A. A CPU-intensive, compute-bound routine such as image or signal processing **(key)**  
  _Rationale:_ Correct: compute-bound hot paths are where Wasm's predictable, near-native execution helps most.
- B. A few DOM updates that run once on page load  
  _Rationale:_ Light, occasional DOM work gains little and Wasm cannot touch the DOM directly anyway.
- C. Reading a cookie  
  _Rationale:_ Trivial I/O work does not benefit from Wasm.
- D. Changing a CSS class  
  _Rationale:_ Styling changes are not compute-bound and gain nothing from Wasm.

**MST-1598-Q0002** (multiple-answer, Select TWO) Which TWO statements about WebAssembly are correct? (Select TWO.)

- A. Wasm runs in a sandbox and cannot directly access arbitrary system memory or the DOM **(key)**  
  _Rationale:_ Correct: Wasm is sandboxed and reaches the DOM and system only through JavaScript or host APIs.
- B. JavaScript and Wasm can share data through linear memory **(key)**  
  _Rationale:_ Correct: linear memory is the shared buffer used to pass data across the boundary.
- C. Wasm fully replaces JavaScript in the browser  
  _Rationale:_ Wasm complements JavaScript; JavaScript still orchestrates and reaches the DOM.
- D. Wasm is always faster than JavaScript for every task  
  _Rationale:_ Wasm helps compute-bound work but is not universally faster, especially with boundary overhead.

**MST-1598-Q0003** (single-answer, Select ONE) How is a string typically passed from JavaScript into a WebAssembly function?

- A. By writing its bytes into the module's linear memory and passing a pointer and length **(key)**  
  _Rationale:_ Correct: complex data crosses the boundary through linear memory using a pointer and length, often via binding tools.
- B. By passing the JavaScript string object directly by reference for free  
  _Rationale:_ Rich objects do not cross the boundary by reference without serialization into memory.
- C. Strings cannot be used with WebAssembly at all  
  _Rationale:_ Strings are routinely passed via linear memory.
- D. By rendering the string to the DOM first  
  _Rationale:_ The DOM is unrelated to passing data into a Wasm function.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
