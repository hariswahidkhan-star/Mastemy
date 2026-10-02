# Elixir Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1532` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-EF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Elixir Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Elixir
2. Pattern matching and the match operator
3. Functions and modules
4. Collections and the pipe operator
5. Control flow and recursion
6. Processes and concurrency
7. OTP: GenServer and supervision
8. Tooling, testing and docs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; Elixir code and OTP behaviours are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Elixir (MASTEMY-DESIGN 12%)

- Worked applications: (1) Explore expressions in IEx and reload a module; (2) Create a mix project and run it
- Common misconception addressed: Trying to mutate a variable's underlying value instead of rebinding
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The BEAM, IEx and mix | 90 | 6 |
| M01L02 | Values, immutability and basic types | 90 | 6 |

### M02 Pattern matching and the match operator (MASTEMY-DESIGN 14%)

- Worked applications: (1) Destructure an {:ok, value} tuple; (2) Pin a variable to match against its existing value
- Common misconception addressed: Reading = as assignment rather than a match
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The match operator and destructuring | 90 | 6 |
| M02L02 | Matching tuples, lists and maps; the pin operator | 90 | 6 |

### M03 Functions and modules (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a multi-clause function dispatched by pattern; (2) Add a guard to restrict a clause to integers
- Common misconception addressed: Thinking functions of different arity are the same function
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Named and anonymous functions, arity and the capture operator | 90 | 6 |
| M03L02 | Multiple clauses, guards and default arguments | 90 | 6 |

### M04 Collections and the pipe operator (MASTEMY-DESIGN 13%)

- Worked applications: (1) Transform a list through a pipeline of Enum calls; (2) Use Stream for lazy evaluation over a large range
- Common misconception addressed: Using a list where a map's key lookup is needed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lists, tuples, keyword lists and maps | 90 | 6 |
| M04L02 | Enum, Stream and the |> pipe | 90 | 6 |

### M05 Control flow and recursion (MASTEMY-DESIGN 12%)

- Worked applications: (1) Chain fallible steps with with; (2) Sum a list recursively with an accumulator
- Common misconception addressed: Reaching for loops; Elixir has no mutable loop, recursion replaces it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | case, cond, if and with | 90 | 6 |
| M05L02 | Recursion and tail-call patterns | 90 | 6 |

### M06 Processes and concurrency (MASTEMY-DESIGN 14%)

- Worked applications: (1) Spawn a process and exchange messages with it; (2) Link two processes and observe a crash propagate
- Common misconception addressed: Confusing BEAM processes with OS threads
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Spawning processes, send/receive and message passing | 90 | 6 |
| M06L02 | Process links, monitors and the actor model | 90 | 6 |

### M07 OTP: GenServer and supervision (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a counter GenServer with call and cast; (2) Place the GenServer under a supervisor
- Common misconception addressed: Defending against every error instead of letting a supervisor restart
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | GenServer: state, call and cast | 90 | 6 |
| M07L02 | Supervisors and let-it-crash | 90 | 6 |

### M08 Tooling, testing and docs (MASTEMY-DESIGN 10%)

- Worked applications: (1) Add a Hex dependency and configure it; (2) Write ExUnit tests and a doctest
- Common misconception addressed: Skipping doctests and assuming documentation examples still run
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Mix tasks, deps (Hex) and configuration | 90 | 6 |
| M08L02 | ExUnit testing, doctests and typespecs | 90 | 6 |

## Integrative case

Build a concurrent URL health-checker in Elixir: parse a list of URLs with pattern matching, transform them through Enum pipelines, check each in its own process, aggregate results in a GenServer under a supervisor, and cover the pure logic with ExUnit tests and a doctest.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1532-final-protected | 40 | 40 | yes |
| MST-1532-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Elixir | 5 |
| Pattern matching and the match operator | 5 |
| Functions and modules | 5 |
| Collections and the pipe operator | 5 |
| Control flow and recursion | 5 |
| Processes and concurrency | 5 |
| OTP: GenServer and supervision | 5 |
| Tooling, testing and docs | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1532-Q0001** (single-answer, Select ONE) In Elixir, what does the expression {:ok, value} = {:ok, 42} do?

- A. It pattern-matches, binding value to 42 because both sides share the {:ok, _} shape **(key)**  
  _Rationale:_ Correct: = is the match operator; the shapes agree so value is bound to 42.
- B. It compares the two tuples and returns a boolean  
  _Rationale:_ = matches and binds; it does not return a boolean comparison.
- C. It mutates the tuple on the right  
  _Rationale:_ Elixir data is immutable; nothing is mutated.
- D. It raises because :ok is not a variable  
  _Rationale:_ :ok is a literal atom that matches the literal on the right, so no error is raised.

**MST-1532-Q0002** (multiple-answer, Select TWO) Which statements about processes on the BEAM are correct? (Select TWO)

- A. Processes are lightweight and isolated, communicating only by message passing **(key)**  
  _Rationale:_ Correct: BEAM processes share no memory and coordinate through messages.
- B. A crash in one process does not corrupt another's memory **(key)**  
  _Rationale:_ Correct: isolation means one process crashing cannot corrupt another; supervisors handle restart.
- C. Processes share mutable global memory for speed  
  _Rationale:_ BEAM processes share nothing; there is no shared mutable memory.
- D. Each process maps one-to-one to an OS thread  
  _Rationale:_ The scheduler multiplexes many lightweight processes onto a few OS threads.

**MST-1532-Q0003** (single-answer, Select ONE) What is the role of a supervisor in OTP?

- A. To monitor child processes and restart them according to a strategy when they crash **(key)**  
  _Rationale:_ Correct: supervisors apply a restart strategy to keep the system healthy under the let-it-crash model.
- B. To prevent any child process from ever crashing  
  _Rationale:_ Supervisors do not prevent crashes; they react to them.
- C. To store the application's user data  
  _Rationale:_ Supervisors manage lifecycles, not data storage.
- D. To compile the project faster  
  _Rationale:_ Supervision is a runtime concern, unrelated to compilation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
