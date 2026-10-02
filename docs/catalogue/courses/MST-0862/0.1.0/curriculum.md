# Advanced JavaScript: Closures, Prototypes, and Asynchronous Code

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0862` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Advanced JavaScript: Closures, Prototypes, and Asynchronous Code (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Reason precisely about closures and memory implications
2. Master the prototype chain and property descriptors
3. Control this binding across call patterns
4. Model concurrency with the event loop, microtasks and macrotasks
5. Build robust asynchronous patterns and cancellation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Closures in depth (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a counter factory using closures; (2) Diagnose a memory leak from a retained closure
- Common misconception addressed: Assuming closures have no memory cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Lexical environments and closures | 120 | 7 |
| M01L02 | Closures, memory and leaks | 120 | 7 |

### M02 Prototypes and descriptors (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a non-enumerable property with defineProperty; (2) Compare class syntax to its prototype underpinnings
- Common misconception addressed: Thinking class creates something other than prototypes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prototype chain internals | 120 | 7 |
| M02L02 | Property descriptors and class sugar | 120 | 7 |

### M03 this and call patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Fix a lost this with bind or an arrow function; (2) Use call/apply to borrow a method
- Common misconception addressed: Expecting arrow functions to have their own this
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | this across call/apply/bind | 120 | 7 |
| M03L02 | Arrow functions and lexical this | 120 | 7 |

### M04 Event loop and tasks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Order output of setTimeout vs Promise microtasks; (2) Explain why a long sync loop blocks rendering
- Common misconception addressed: Treating microtasks and macrotasks as the same queue
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Call stack, microtasks and macrotasks | 120 | 7 |
| M04L02 | Starvation and blocking the loop | 120 | 7 |

### M05 Robust async patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Cancel a fetch with AbortController; (2) Run tasks concurrently with Promise.all and handle one rejection
- Common misconception addressed: Using Promise.all when one failure should not cancel the rest
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | AbortController and cancellation | 120 | 7 |
| M05L02 | Promise.all/allSettled/race patterns | 120 | 7 |

## Integrative case

Harden a dashboard: fix a memory leak from a retained closure, resolve a lost-this bug in event handlers, order async updates correctly across microtasks, and make data fetches cancellable with AbortController.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0862-final-protected | 40 | 50 | yes |
| MST-0862-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Closures in depth | 8 |
| Prototypes and descriptors | 8 |
| this and call patterns | 8 |
| Event loop and tasks | 8 |
| Robust async patterns | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0862-Q0001** (single-answer, Select ONE) What logs first: a `Promise.resolve().then(...)` callback or a `setTimeout(..., 0)` callback scheduled just before it?

- A. The promise callback, because microtasks run before the next macrotask **(key)**  
  _Rationale:_ Correct: the microtask queue drains before the next macrotask (timer) callback.
- B. The setTimeout callback, because 0ms means immediate  
  _Rationale:_ Timer callbacks are macrotasks and run after microtasks.
- C. They always log in source order  
  _Rationale:_ Queue type, not source order, decides timing here.
- D. Neither logs  
  _Rationale:_ Both callbacks run.

**MST-0862-Q0002** (multiple-answer, Select TWO) Which TWO are correct about arrow functions and this? (Select TWO.)

- A. An arrow function uses this from its enclosing lexical scope **(key)**  
  _Rationale:_ Correct: arrow functions do not bind their own this.
- B. bind has no effect on an arrow function's this **(key)**  
  _Rationale:_ Correct: you cannot rebind an arrow function's this.
- C. Arrow functions get a fresh this per call  
  _Rationale:_ They do not have their own this.
- D. new works on arrow functions  
  _Rationale:_ Arrow functions cannot be used as constructors.

**MST-0862-Q0003** (single-answer, Select ONE) You need to cancel an in-flight fetch when the user navigates away. Which tool fits?

- A. An AbortController whose signal is passed to fetch **(key)**  
  _Rationale:_ Correct: AbortController cancels the fetch via its signal.
- B. clearTimeout on the fetch  
  _Rationale:_ fetch is not a timer; clearTimeout does not cancel it.
- C. Setting the promise to null  
  _Rationale:_ Nulling the reference does not abort the request.
- D. try/catch around fetch  
  _Rationale:_ try/catch handles errors but does not cancel the request.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
