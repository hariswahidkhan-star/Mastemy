# JavaScript: Complete Language Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0861` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — JavaScript: Complete Language Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use JavaScript types, coercion and equality correctly
2. Work with functions, scope and closures
3. Manipulate objects, arrays and iteration
4. Understand prototypes and the this binding
5. Handle asynchronous code with promises and async/await
6. Handle errors and write modular code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Types and equality (MASTEMY-DESIGN 16%)

- Worked applications: (1) Predict the result of several == vs === comparisons; (2) Avoid a bug caused by implicit coercion
- Common misconception addressed: Believing == and === behave the same
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Primitive types and coercion | 120 | 7 |
| M01L02 | Equality, truthiness and NaN | 120 | 7 |

### M02 Functions and scope (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain a closure capturing a loop variable; (2) Fix a var-in-loop bug with let
- Common misconception addressed: Thinking var is block-scoped like let
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Functions, parameters and scope | 120 | 7 |
| M02L02 | Closures and the module pattern | 120 | 7 |

### M03 Objects and arrays (MASTEMY-DESIGN 17%)

- Worked applications: (1) Transform an array with map/filter/reduce; (2) Copy an object shallowly vs deeply and see the difference
- Common misconception addressed: Expecting spread to deep-clone nested objects
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Objects, properties and destructuring | 120 | 7 |
| M03L02 | Array methods and iteration | 120 | 7 |

### M04 Prototypes and this (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace a property lookup up the prototype chain; (2) Predict this in a method vs a detached callback
- Common misconception addressed: Assuming this is always the surrounding object
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Prototypes and inheritance | 120 | 7 |
| M04L02 | this binding and arrow functions | 120 | 7 |

### M05 Asynchronous JavaScript (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert a callback to a promise and await it; (2) Handle a rejected promise with try/catch around await
- Common misconception addressed: Believing async code runs truly in parallel on one thread
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The event loop and promises | 120 | 7 |
| M05L02 | async/await and error handling | 120 | 7 |

### M06 Errors and modules (MASTEMY-DESIGN 17%)

- Worked applications: (1) Throw and catch a specific error type; (2) Split code into ES modules with import/export
- Common misconception addressed: Swallowing errors with an empty catch
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Errors and exception handling | 120 | 7 |
| M06L02 | ES modules and code organisation | 120 | 7 |

## Integrative case

Build a small browser to-do module: model items as objects, transform them with array methods, load saved data from an async source with promise error handling, and organise the code into ES modules without this/scope bugs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0861-final-protected | 40 | 50 | yes |
| MST-0861-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Types and equality | 7 |
| Functions and scope | 7 |
| Objects and arrays | 7 |
| Prototypes and this | 7 |
| Asynchronous JavaScript | 6 |
| Errors and modules | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0861-Q0001** (single-answer, Select ONE) What does `0 == ''` evaluate to in JavaScript, and why does `0 === ''` differ?

- A. true for ==, false for ===, because == coerces types while === does not **(key)**  
  _Rationale:_ Correct: == performs type coercion; === compares type and value without coercion.
- B. Both are true  
  _Rationale:_ === is false because the types differ.
- C. Both are false  
  _Rationale:_ == coerces '' to 0, giving true.
- D. Both throw a TypeError  
  _Rationale:_ Neither comparison throws.

**MST-0861-Q0002** (multiple-answer, Select TWO) Which TWO statements about closures are correct? (Select TWO.)

- A. A closure keeps access to variables from its defining scope **(key)**  
  _Rationale:_ Correct: closures capture their lexical environment.
- B. let in a loop creates a fresh binding per iteration **(key)**  
  _Rationale:_ Correct: this fixes the classic var-in-loop capture bug.
- C. Closures copy values at definition and never see updates  
  _Rationale:_ Closures reference variables, so they see later updates.
- D. var is block-scoped  
  _Rationale:_ var is function-scoped, not block-scoped.

**MST-0861-Q0003** (single-answer, Select ONE) An awaited promise rejects. How do you handle the error idiomatically?

- A. Wrap the await in try/catch **(key)**  
  _Rationale:_ Correct: try/catch around await captures a rejected promise.
- B. Ignore it; rejections resolve themselves  
  _Rationale:_ Unhandled rejections do not resolve themselves.
- C. Use a synchronous try/catch without await  
  _Rationale:_ Without await the rejection is not caught synchronously.
- D. Call the promise twice  
  _Rationale:_ Re-calling does not handle the rejection.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
