# Erlang: Concurrent and Distributed Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0925` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Erlang: Concurrent and Distributed Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Erlang and the BEAM runtime
2. Functional foundations
3. Processes and message passing
4. Concurrency patterns
5. OTP behaviours
6. Distribution and releases

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Erlang and the BEAM runtime (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compile and run a module from the erl shell; (2) Trace how the BEAM schedules a short recursive function
- Common misconception addressed: Thinking Erlang variables can be reassigned like in imperative languages
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing Erlang, the shell and compiling modules | 80 | 5 |
| M01L02 | Values, pattern matching and the BEAM execution model | 80 | 5 |

### M02 Functional foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Sum a list with tail recursion and an accumulator; (2) Filter a list of orders with a guard-protected clause
- Common misconception addressed: Writing body recursion that grows the stack instead of tail recursion
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Immutable data, tuples, lists and maps | 80 | 5 |
| M02L02 | Recursion, guards and higher-order functions | 80 | 5 |

### M03 Processes and message passing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a counter process that holds state in a receive loop; (2) Route two message types with selective receive
- Common misconception addressed: Assuming processes share memory rather than communicating only by messages
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Spawning processes and the actor model | 80 | 5 |
| M03L02 | send, receive and selective message matching | 80 | 5 |

### M04 Concurrency patterns (MASTEMY-DESIGN 17%)

- Worked applications: (1) Detect a crashed worker with a monitor; (2) Add a receive timeout to avoid a stuck process
- Common misconception addressed: Trapping and defensively coding every error instead of letting processes crash and restart
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Links, monitors and the let-it-crash philosophy | 80 | 5 |
| M04L02 | Timeouts, registered names and process state | 80 | 5 |

### M05 OTP behaviours (MASTEMY-DESIGN 16%)

- Worked applications: (1) Convert the counter into a gen_server; (2) Place the server under a one-for-one supervisor
- Common misconception addressed: Putting business logic in the supervisor instead of in the worker
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | gen_server callbacks and the client/server split | 80 | 5 |
| M05L02 | Supervisors and supervision trees | 80 | 5 |

### M06 Distribution and releases (MASTEMY-DESIGN 16%)

- Worked applications: (1) Connect two nodes and call a function remotely; (2) Cache lookup data in an ETS table
- Common misconception addressed: Expecting distributed message delivery to be guaranteed and ordered across a network partition
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Distributed Erlang nodes and global naming | 80 | 5 |
| M06L02 | ETS, releases and basic observability | 80 | 5 |

## Integrative case

Build a small concurrent chat room in Erlang/OTP: a gen_server holds room state, each client is a process, a supervisor restarts the room on failure, and two nodes can host rooms that find each other by global name.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0925-final-protected | 42 | 42 | yes |
| MST-0925-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Erlang and the BEAM runtime | 7 |
| Functional foundations | 7 |
| Processes and message passing | 7 |
| Concurrency patterns | 7 |
| OTP behaviours | 7 |
| Distribution and releases | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0925-Q0001** (single-answer, Select ONE) In Erlang, what happens when you match 1 = X where X is already bound to 2?

- A. A pattern-match exception is raised because the values differ **(key)**  
  _Rationale:_ Correct: = is a match operator, not assignment; an already-bound variable must match or it fails.
- B. X is reassigned to 1  
  _Rationale:_ Erlang variables are single-assignment; they are never reassigned.
- C. The expression silently returns false  
  _Rationale:_ A failed match raises an exception rather than returning a boolean.
- D. The code will not compile  
  _Rationale:_ It compiles; the failure happens at run time when the match is evaluated.

**MST-0925-Q0002** (multiple-answer, Select ALL that apply) Which statements about Erlang processes are correct? (Select TWO)

- A. Processes communicate only by sending asynchronous messages **(key)**  
  _Rationale:_ Correct: processes share no memory and exchange immutable messages.
- B. Spawning a process is lightweight compared with an OS thread **(key)**  
  _Rationale:_ Correct: BEAM processes are cheap, so systems commonly run many thousands.
- C. Processes share a common mutable heap for speed  
  _Rationale:_ Each process has its own heap; there is no shared mutable memory.
- D. A receive block can read another process's mailbox directly  
  _Rationale:_ A process can only read its own mailbox.

**MST-0925-Q0003** (single-answer, Select ONE) What is the main idea behind the 'let it crash' philosophy with OTP supervisors?

- A. Let a faulty process fail fast and have a supervisor restart it into a known-good state **(key)**  
  _Rationale:_ Correct: isolation plus supervised restart keeps the system healthy without defensive error handling everywhere.
- B. Disable error logging so crashes are invisible  
  _Rationale:_ Crashes are logged; the point is recovery, not hiding faults.
- C. Catch every possible exception inside the worker  
  _Rationale:_ That is the opposite of the philosophy, which avoids defensive over-handling.
- D. Restart the entire node on any error  
  _Rationale:_ Supervisors restart the failed child, not usually the whole node.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
