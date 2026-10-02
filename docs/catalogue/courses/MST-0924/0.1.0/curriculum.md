# Elixir and Phoenix: Fault-Tolerant Web Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0924` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Elixir and Phoenix: Fault-Tolerant Web Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Elixir and the mix tool
2. Pattern matching, immutability and the pipe operator
3. Modules, functions and recursion
4. Processes, message passing and the actor model
5. OTP: GenServers, supervisors and fault tolerance
6. Phoenix: routing, controllers and views
7. Ecto: schemas, changesets and queries
8. Channels, LiveView and real-time features

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Elixir and the mix tool (MASTEMY-DESIGN 13%)

- Worked applications: (1) Pipe a value through several transformations; (2) Rewrite a nested call chain using the pipe operator
- Common misconception addressed: Trying to reassign a variable and expecting the original binding to change
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing Elixir, iex and mix | 120 | 6 |
| M01L02 | Basic types, the pipe operator and immutability | 120 | 6 |

### M02 Pattern matching, immutability and the pipe operator (MASTEMY-DESIGN 13%)

- Worked applications: (1) Destructure a map in a function head; (2) Use with to chain operations that may fail
- Common misconception addressed: Treating = as assignment rather than a match operator
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pattern matching on tuples and maps | 120 | 6 |
| M02L02 | Guards and the case and with expressions | 120 | 6 |

### M03 Modules, functions and recursion (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a recursive sum over a list; (2) Replace a manual loop with Enum.reduce
- Common misconception addressed: Writing imperative loops instead of recursion or Enum functions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defining modules and named functions | 120 | 6 |
| M03L02 | Recursion and the Enum and Stream modules | 120 | 6 |

### M04 Processes, message passing and the actor model (MASTEMY-DESIGN 12%)

- Worked applications: (1) Spawn a process that echoes messages; (2) Hold counter state in a receive loop
- Common misconception addressed: Assuming processes share memory like threads in other languages
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Spawning processes and sending messages | 120 | 6 |
| M04L02 | receive loops and process state | 120 | 6 |

### M05 OTP: GenServers, supervisors and fault tolerance (MASTEMY-DESIGN 13%)

- Worked applications: (1) Implement a GenServer that stores a key-value map; (2) Add a supervisor that restarts a crashed worker
- Common misconception addressed: Catching every error instead of letting a supervised process crash and restart
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Building a GenServer | 120 | 6 |
| M05L02 | Supervision trees and the let-it-crash philosophy | 120 | 6 |

### M06 Phoenix: routing, controllers and views (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add a route and controller action; (2) Return a JSON response from an action
- Common misconception addressed: Putting business logic in a controller instead of a context module
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Routing requests to controllers | 120 | 6 |
| M06L02 | Rendering responses and templates | 120 | 6 |

### M07 Ecto: schemas, changesets and queries (MASTEMY-DESIGN 12%)

- Worked applications: (1) Create a users schema with a migration; (2) Validate and insert a record with a changeset
- Common misconception addressed: Querying the database directly and skipping changeset validation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Defining an Ecto schema and migration | 120 | 6 |
| M07L02 | Changesets, validation and queries | 120 | 6 |

### M08 Channels, LiveView and real-time features (MASTEMY-DESIGN 12%)

- Worked applications: (1) Broadcast a message to subscribers on a channel; (2) Update a LiveView counter without a page reload
- Common misconception addressed: Keeping heavy work in the LiveView process and blocking updates
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Pushing updates over a Phoenix Channel | 120 | 6 |
| M08L02 | Building an interactive LiveView page | 120 | 6 |

## Integrative case

Build a fault-tolerant chat feature in Phoenix: model rooms and messages with Ecto, run each room as a supervised GenServer, broadcast new messages over channels, and render a LiveView that updates in real time and recovers cleanly when a room process crashes.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0924-final-protected | 40 | 40 | yes |
| MST-0924-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Elixir and the mix tool | 5 |
| Pattern matching, immutability and the pipe operator | 5 |
| Modules, functions and recursion | 5 |
| Processes, message passing and the actor model | 5 |
| OTP: GenServers, supervisors and fault tolerance | 5 |
| Phoenix: routing, controllers and views | 5 |
| Ecto: schemas, changesets and queries | 5 |
| Channels, LiveView and real-time features | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0924-Q0001** (single-answer, Select ONE) In Elixir, what does the match operator = do in the expression {:ok, value} = result?

- A. It matches the right side against the pattern and binds value if the shapes agree, raising otherwise **(key)**  
  _Rationale:_ Correct: = is pattern matching; it binds variables when the pattern fits and raises a MatchError when it does not.
- B. It copies result into a mutable variable that can later be reassigned in place  
  _Rationale:_ Elixir data is immutable; = does not create a mutable cell.
- C. It compares the two sides and returns a boolean  
  _Rationale:_ Comparison returning a boolean uses == , not the match operator.
- D. It sends result as a message to the current process  
  _Rationale:_ Message passing uses send/receive, not =.

**MST-0924-Q0002** (multiple-answer, Select ALL that apply) Which statements about OTP supervision in Elixir are correct? (Select TWO)

- A. A supervisor can restart a child process after it crashes according to a restart strategy **(key)**  
  _Rationale:_ Correct: supervisors monitor children and restart them per the chosen strategy.
- B. The let-it-crash approach favours isolating failures and restarting to a known-good state **(key)**  
  _Rationale:_ Correct: processes are allowed to fail and supervision returns the system to a clean state.
- C. Supervised processes share mutable global memory for speed  
  _Rationale:_ Each process has isolated state; there is no shared mutable memory.
- D. A crashed process can never be restarted automatically  
  _Rationale:_ Automatic restart is exactly what a supervisor provides.

**MST-0924-Q0003** (single-answer, Select ONE) Why is an Ecto changeset used before inserting a record rather than inserting raw attributes?

- A. It casts, filters and validates incoming data so invalid or unexpected fields are rejected before hitting the database **(key)**  
  _Rationale:_ Correct: changesets centralise casting and validation, protecting the database from bad input.
- B. It makes the insert run asynchronously in a separate process  
  _Rationale:_ Changesets are about validation, not concurrency.
- C. It encrypts every field automatically  
  _Rationale:_ Changesets do not encrypt data by default.
- D. It removes the need for a database migration  
  _Rationale:_ Schema structure still requires migrations; changesets validate data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
