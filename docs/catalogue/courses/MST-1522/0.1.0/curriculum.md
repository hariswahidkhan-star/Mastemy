# TypeScript Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1522` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Open language/standard skill with no vendor issuer or official syllabus; curriculum is Mastemy design informed by the published language specification. Re-confirm feature coverage against the current specification at production. |
| Evidence | **n/a-no-official-syllabus** - sources: MASTEMY-DESIGN (no official syllabus) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — TypeScript Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain TypeScript's role and the type system over JavaScript
2. Annotate variables, functions and objects with types
3. Use interfaces, type aliases and unions
4. Use generics for reusable typed code
5. Apply type narrowing and type guards
6. Configure the compiler and understand strictness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 TypeScript basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Annotate a variable and a function; (2) Explain how TS compiles to JS
- Common misconception addressed: Thinking types exist at runtime
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why TypeScript and how it compiles | 120 | 7 |
| M01L02 | Basic type annotations | 120 | 7 |

### M02 Functions and objects (MASTEMY-DESIGN 16%)

- Worked applications: (1) Type a function's parameters and return; (2) Describe an object's shape with a type
- Common misconception addressed: Using any to silence errors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Typing functions | 120 | 7 |
| M02L02 | Typing object shapes | 120 | 7 |

### M03 Interfaces and unions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model an entity with an interface; (2) Use a union type for a status value
- Common misconception addressed: Confusing interface with class
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Interfaces and type aliases | 120 | 7 |
| M03L02 | Union and literal types | 120 | 7 |

### M04 Generics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a generic identity function; (2) Constrain a generic with extends
- Common misconception addressed: Overusing generics where a concrete type is clearer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Generic functions | 120 | 7 |
| M04L02 | Generic constraints | 120 | 7 |

### M05 Narrowing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Narrow a union with typeof; (2) Use a discriminated union in a switch
- Common misconception addressed: Assuming a union value is one member without narrowing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Type guards | 120 | 7 |
| M05L02 | Discriminated unions | 120 | 7 |

### M06 Compiler and strictness (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable strict in tsconfig; (2) Handle a possibly-null value under strictNullChecks
- Common misconception addressed: Disabling strict to avoid fixing errors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | tsconfig and compiler options | 120 | 7 |
| M06L02 | strict mode and null safety | 120 | 7 |

## Integrative case

Add type safety to a JavaScript module: annotate its functions and data shapes with interfaces, introduce a union type with narrowing for a result value, make a utility generic, and turn on strict compiler options to catch errors.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1522-final-protected | 40 | 50 | yes |
| MST-1522-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| TypeScript basics | 7 |
| Functions and objects | 7 |
| Interfaces and unions | 7 |
| Generics | 7 |
| Narrowing | 6 |
| Compiler and strictness | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1522-Q0001** (single-answer, Select ONE) At what point do TypeScript's type annotations take effect?

- A. At compile time; they are erased and do not exist at runtime **(key)**  
  _Rationale:_ Correct: TypeScript types are checked at compile time and erased in the emitted JavaScript.
- B. At runtime, as enforced objects  
  _Rationale:_ Types do not exist at runtime.
- C. Only in the browser console  
  _Rationale:_ Type checking happens during compilation, not in the console.
- D. Never; they are only comments  
  _Rationale:_ They are checked by the compiler, not ignored like comments.

**MST-1522-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of TypeScript features? (Select TWO.)

- A. Use a union type to represent a value that can be one of several specific types **(key)**  
  _Rationale:_ Correct: unions model alternative types.
- B. Use generics to write reusable code that preserves type information **(key)**  
  _Rationale:_ Correct: generics keep type safety across reusable code.
- C. Use any everywhere to avoid compiler errors  
  _Rationale:_ any discards type safety and defeats the purpose.
- D. Rely on types being enforced at runtime  
  _Rationale:_ Types are erased at runtime.

**MST-1522-Q0003** (single-answer, Select ONE) A value has type string | null under strictNullChecks. What must you do before using string methods on it?

- A. Narrow the type, e.g. check it is not null, so TypeScript knows it is a string **(key)**  
  _Rationale:_ Correct: narrowing removes null from the type before string operations.
- B. Cast it to any and ignore the warning  
  _Rationale:_ Casting to any discards safety and hides real bugs.
- C. Disable strictNullChecks  
  _Rationale:_ Disabling strictness removes the protection rather than handling the case.
- D. Nothing; TypeScript allows calling string methods on null  
  _Rationale:_ Calling string methods on null is an error under strict checks.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
