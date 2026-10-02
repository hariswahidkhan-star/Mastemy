# Salesforce Certified JavaScript Developer I Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1519` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | (not published / to be resolved at blueprint review) |
| Version basis | official blueprint not retrieved; exam code and domain weights are DESIGN ASSUMPTION |
| Evidence | **unverified-needs-official-check** - sources: SRC-SALESFORCE-1519 (vendor site EGRESS_BLOCKED this session) |
| Legacy IDs | MST-PRG-SF-JSD1-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Design-assumption note: no official exam code, domain names/weights, length or question count were available (vendor site EGRESS_BLOCKED). Module structure, weights and form lengths are DESIGN ASSUMPTIONS to be replaced at blueprint review.

## Learning outcomes

1. Apply core JavaScript language features, types, coercion and scope correctly
2. Work with objects, arrays, JSON and the DOM/browser and server runtime APIs
3. Use asynchronous patterns (callbacks, promises, async/await) and handle errors
4. Debug, test and apply secure, modular JavaScript coding practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only. Any official item formats that are not reproducible as MCQ/MR (for example hands-on software tasks or performance-based items) are out of scope for the certificate and are listed in the exam-version record.

## Modules

### M01 Variables, Types and Collections (30%, DESIGN ASSUMPTION)

- Worked applications: (1) Predict the result of a set of coercion and scope expressions; (2) Transform a nested JSON payload into a flattened array of records
- Common misconception addressed: Believing == and === behave the same, or that var and let scope identically.
- Module check: 44 items / 44 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Types, coercion and equality | 140 | 8 |
| M01L02 | Scope, hoisting, closures and this | 140 | 8 |
| M01L03 | Objects, arrays and destructuring | 140 | 8 |
| M01L04 | JSON parsing, serialisation and Map/Set | 140 | 8 |

### M02 Functions, Runtime and Browser/Server APIs (35%, DESIGN ASSUMPTION)

- Worked applications: (1) Wire a DOM event handler that updates state without memory leaks; (2) Choose the right array higher-order function for a data task
- Common misconception addressed: Thinking the event loop runs timer callbacks exactly on the requested delay.
- Module check: 51 items / 51 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Functions, arrow functions and higher-order functions | 140 | 8 |
| M02L02 | The event loop, timers and event handling | 140 | 8 |
| M02L03 | DOM, browser and server runtime APIs | 140 | 8 |
| M02L04 | Modules, imports and packaging | 140 | 8 |

### M03 Asynchronous, Errors, Testing and Debugging (35%, DESIGN ASSUMPTION)

- Worked applications: (1) Convert a callback chain to async/await with try/catch; (2) Diagnose an unhandled promise rejection from a stack trace
- Common misconception addressed: Assuming a try/catch around a non-awaited promise will catch its rejection.
- Module check: 52 items / 52 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Callbacks, promises and async/await | 140 | 8 |
| M03L02 | Error handling and exceptions | 140 | 8 |
| M03L03 | Debugging and developer tooling | 140 | 8 |
| M03L04 | Unit testing and secure coding practices | 140 | 8 |

## Integrative case

A single-page order tool mis-handles async inventory calls and silently swallows errors: trace the bug, refactor to async/await with proper error handling, and add tests.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam length/question count NOT retrieved (vendor site EGRESS_BLOCKED). Form set to 79 items / 79 min to fit the cumulative budget; replace when confirmed.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1519-practice-form-A | 79 | 79 | yes |
| MST-1519-practice-form-B | 79 | 79 | no (optional practice) |
| MST-1519-practice-form-C | 79 | 79 | no (optional practice) |
| MST-1519-final-protected | 79 | 79 | yes |

| Domain (DESIGN ASSUMPTION) | Items per form |
|---|---|
| Variables, Types and Collections | 24 |
| Functions, Runtime and Browser/Server APIs | 28 |
| Asynchronous, Errors, Testing and Debugging | 27 |

Minimum reviewed item bank: 802 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1519-Q0001** (single-answer, Select ONE) What does `typeof null` evaluate to in JavaScript?

- A. "object" **(key)**  
  _Rationale:_ Correct: a long-standing language quirk - typeof null returns "object".
- B. "null"  
  _Rationale:_ There is no "null" string result from typeof; null is not its own typeof tag.
- C. "undefined"  
  _Rationale:_ typeof undefined is "undefined"; null is a distinct value.
- D. "boolean"  
  _Rationale:_ null is not a boolean; it is the intentional absence of an object value.

**MST-1519-Q0002** (multiple-answer, Select TWO) Which TWO statements about Promises are correct?

- A. A promise can settle (resolve or reject) only once **(key)**  
  _Rationale:_ Correct: once settled a promise's state is immutable.
- B. async/await is built on top of promises **(key)**  
  _Rationale:_ Correct: await pauses on a promise and resumes with its settled value.
- C. A rejected promise without a handler is always caught by a surrounding try/catch  
  _Rationale:_ Only an awaited (or .catch-chained) promise is caught; a bare rejected promise is not.
- D. Promise.all resolves as soon as the first input promise resolves  
  _Rationale:_ That describes Promise.race; Promise.all waits for all to resolve (or any to reject).

**MST-1519-Q0003** (single-answer, Select ONE) A loop uses `var i` and registers a callback referencing `i`. All callbacks log the same final value. What is the BEST fix?

- A. Declare the loop counter with let instead of var **(key)**  
  _Rationale:_ Correct: let creates a fresh binding per iteration, so each callback captures its own value.
- B. Move the callback outside the loop  
  _Rationale:_ That changes behaviour and does not give per-iteration values.
- C. Use == instead of === in the comparison  
  _Rationale:_ Equality operators are unrelated to closure binding.
- D. Add 'use strict' at the top of the file  
  _Rationale:_ Strict mode does not change var's function-level scoping here.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
