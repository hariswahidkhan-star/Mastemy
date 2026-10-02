# TypeScript: Complete Type-Safe Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0863` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — TypeScript: Complete Type-Safe Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use TypeScript's basic and composite types effectively
2. Model data with interfaces, types and unions
3. Use generics for reusable, type-safe code
4. Narrow types with guards and discriminated unions
5. Configure the compiler and strictness for a project
6. Type asynchronous code and third-party libraries

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Core types (MASTEMY-DESIGN 16%)

- Worked applications: (1) Annotate a function with parameter and return types; (2) Replace an any with a precise type
- Common misconception addressed: Using any to silence the compiler
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Primitive and composite types | 120 | 7 |
| M01L02 | Avoiding any; unknown vs any | 120 | 7 |

### M02 Interfaces and unions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model an API response with an interface; (2) Use a union to represent two shapes
- Common misconception addressed: Confusing interface and type for object shapes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Interfaces vs type aliases | 120 | 7 |
| M02L02 | Union and intersection types | 120 | 7 |

### M03 Generics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a generic identity and a generic container; (2) Constrain a generic with extends
- Common misconception addressed: Over-constraining generics until they are unusable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Generic functions and classes | 120 | 7 |
| M03L02 | Constraints and defaults | 120 | 7 |

### M04 Narrowing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Narrow a union with a typeof guard; (2) Use a discriminated union for exhaustive handling
- Common misconception addressed: Casting with as instead of narrowing properly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Type guards and narrowing | 120 | 7 |
| M04L02 | Discriminated unions and never | 120 | 7 |

### M05 Compiler and config (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable strict and fix the resulting errors; (2) Reason about structural typing
- Common misconception addressed: Turning off strict to make errors disappear
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | tsconfig and strictness | 120 | 7 |
| M05L02 | Structural typing | 120 | 7 |

### M06 Async and libraries (MASTEMY-DESIGN 17%)

- Worked applications: (1) Type a Promise-returning function; (2) Use a declaration file for an untyped library
- Common misconception addressed: Assuming every npm package ships its own types
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Typing async code | 120 | 7 |
| M06L02 | Declaration files and DefinitelyTyped | 120 | 7 |

## Integrative case

Convert a JavaScript module to TypeScript under strict mode: model the API response with interfaces and a discriminated union, make the data layer generic, narrow safely instead of casting, and type the async calls end to end.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0863-final-protected | 40 | 50 | yes |
| MST-0863-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Core types | 7 |
| Interfaces and unions | 7 |
| Generics | 7 |
| Narrowing | 7 |
| Compiler and config | 6 |
| Async and libraries | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0863-Q0001** (single-answer, Select ONE) Why is `unknown` often safer than `any` for an untyped value?

- A. unknown forces you to narrow before use, while any disables type checking **(key)**  
  _Rationale:_ Correct: unknown preserves type safety by requiring a check; any opts out entirely.
- B. unknown is faster at run time  
  _Rationale:_ Types are erased at run time; there is no speed difference.
- C. any cannot be assigned to variables  
  _Rationale:_ any can be assigned freely; that is the problem.
- D. unknown allows any method call directly  
  _Rationale:_ unknown blocks direct member access until narrowed.

**MST-0863-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to use a discriminated union? (Select TWO.)

- A. The compiler can narrow by the discriminant property **(key)**  
  _Rationale:_ Correct: a literal discriminant enables precise narrowing.
- B. It enables exhaustiveness checks with never **(key)**  
  _Rationale:_ Correct: an unhandled case surfaces as a never error.
- C. It removes the need for any types  
  _Rationale:_ Avoiding any is good practice generally, not the purpose of a discriminated union.
- D. It makes casting with as safe  
  _Rationale:_ Discriminated unions reduce the need to cast, not make casts safe.

**MST-0863-Q0003** (single-answer, Select ONE) Enabling strict mode surfaces many 'possibly undefined' errors. What is the appropriate response?

- A. Fix the code to handle the undefined cases **(key)**  
  _Rationale:_ Correct: strict null checks reveal real gaps that should be handled.
- B. Disable strict to remove the errors  
  _Rationale:_ Disabling strict hides real bugs rather than fixing them.
- C. Cast everything with as any  
  _Rationale:_ Casting to any defeats the type system.
- D. Add // @ts-ignore everywhere  
  _Rationale:_ Blanket ignores suppress genuine type errors.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
