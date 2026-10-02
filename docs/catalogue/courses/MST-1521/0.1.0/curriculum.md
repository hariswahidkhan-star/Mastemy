# Modern JavaScript (ES2015+)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1521` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Open language/standard skill with no vendor issuer or official syllabus; curriculum is Mastemy design informed by the published language specification. Re-confirm feature coverage against the current specification at production. |
| Evidence | **n/a-no-official-syllabus** - sources: MASTEMY-DESIGN (no official syllabus) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Modern JavaScript (ES2015+) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use modern variable declarations, scoping and data types
2. Write functions including arrow functions, defaults and rest/spread
3. Use destructuring, template literals and modern object syntax
4. Work with arrays and iteration using higher-order methods
5. Organize code with ES modules
6. Write asynchronous code with promises and async/await

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Variables and types (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose let vs const for a binding; (2) Predict the result of a type coercion
- Common misconception addressed: Thinking var and let have the same scoping
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | let, const and block scope | 120 | 7 |
| M01L02 | Primitive types and coercion | 120 | 7 |

### M02 Functions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Rewrite a function as an arrow function; (2) Use rest parameters to accept many arguments
- Common misconception addressed: Assuming an arrow function binds its own this
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Arrow functions and this | 120 | 7 |
| M02L02 | Default, rest and spread parameters | 120 | 7 |

### M03 Modern syntax (MASTEMY-DESIGN 17%)

- Worked applications: (1) Destructure values from an object; (2) Build a string with a template literal
- Common misconception addressed: Writing verbose concatenation instead of template literals
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Destructuring and template literals | 120 | 7 |
| M03L02 | Enhanced object literals | 120 | 7 |

### M04 Arrays and iteration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Transform an array with map; (2) Sum values with reduce
- Common misconception addressed: Mutating an array inside map/filter
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | map, filter, reduce | 120 | 7 |
| M04L02 | Iteration and spread on arrays | 120 | 7 |

### M05 Modules (MASTEMY-DESIGN 17%)

- Worked applications: (1) Split code into two ES modules; (2) Choose default vs named exports
- Common misconception addressed: Mixing module systems inconsistently
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | import and export | 120 | 7 |
| M05L02 | Default vs named exports | 120 | 7 |

### M06 Asynchronous JS (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert a callback to a promise; (2) Await a promise and handle errors with try/catch
- Common misconception addressed: Forgetting to await a promise
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Promises | 120 | 7 |
| M06L02 | async/await and error handling | 120 | 7 |

## Integrative case

Refactor a legacy script to modern JavaScript: replace var with let/const, convert callbacks to async/await, split the code into ES modules, and use array methods and destructuring to simplify the data handling.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1521-final-protected | 40 | 50 | yes |
| MST-1521-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Variables and types | 7 |
| Functions | 7 |
| Modern syntax | 7 |
| Arrays and iteration | 7 |
| Modules | 6 |
| Asynchronous JS | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1521-Q0001** (single-answer, Select ONE) Which declaration creates a block-scoped binding that cannot be reassigned?

- A. const **(key)**  
  _Rationale:_ Correct: const is block-scoped and cannot be reassigned.
- B. var  
  _Rationale:_ var is function-scoped and reassignable.
- C. let  
  _Rationale:_ let is block-scoped but can be reassigned.
- D. function  
  _Rationale:_ function declares a function, not a constant binding.

**MST-1521-Q0002** (multiple-answer, Select TWO) Which TWO array methods return a new array without mutating the original? (Select TWO.)

- A. map **(key)**  
  _Rationale:_ Correct: map returns a new array of transformed values.
- B. filter **(key)**  
  _Rationale:_ Correct: filter returns a new array of matching values.
- C. push  
  _Rationale:_ push mutates the original array.
- D. sort  
  _Rationale:_ sort mutates the array in place.

**MST-1521-Q0003** (single-answer, Select ONE) What does the await keyword do inside an async function?

- A. Pauses the function until the awaited promise settles, then resumes with its value **(key)**  
  _Rationale:_ Correct: await suspends the async function until the promise resolves or rejects.
- B. Starts a new operating-system thread  
  _Rationale:_ await does not create threads.
- C. Converts the function to synchronous blocking code  
  _Rationale:_ await is non-blocking; it yields back to the event loop.
- D. Cancels the promise  
  _Rationale:_ await does not cancel promises.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
