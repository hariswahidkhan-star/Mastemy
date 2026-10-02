# Advanced TypeScript: Generics and Type-Level Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0864` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Advanced TypeScript: Generics and Type-Level Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design advanced generic abstractions with constraints and inference
2. Use conditional and mapped types
3. Apply template literal types and key remapping
4. Build type-safe APIs with inference and utility types
5. Debug complex type errors and manage type performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Advanced generics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Infer a return type from an argument with infer; (2) Constrain a generic to object keys with keyof
- Common misconception addressed: Reaching for any when inference gets hard
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inference, keyof and indexed access | 120 | 7 |
| M01L02 | Generic constraints and defaults | 120 | 7 |

### M02 Conditional types (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a conditional type that unwraps a Promise; (2) Use distributive conditional types over a union
- Common misconception addressed: Forgetting conditional types distribute over unions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Conditional types and infer | 120 | 7 |
| M02L02 | Distribution and never | 120 | 7 |

### M03 Mapped and template types (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a Readonly-like mapped type; (2) Remap keys with a template literal type
- Common misconception addressed: Hand-writing types a mapped type could derive
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mapped types and modifiers | 120 | 7 |
| M03L02 | Template literal types and key remapping | 120 | 7 |

### M04 Type-safe APIs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Type a builder so misuse is a compile error; (2) Use utility types to derive a DTO from a model
- Common misconception addressed: Duplicating types instead of deriving them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Inference-driven API design | 120 | 7 |
| M04L02 | Utility types in practice | 120 | 7 |

### M05 Debugging and performance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read and reduce a deeply nested type error; (2) Simplify a type that slows the compiler
- Common misconception addressed: Assuming complex types are always free at compile time
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reading complex type errors | 120 | 7 |
| M05L02 | Type performance and simplification | 120 | 7 |

## Integrative case

Design a type-safe query builder: infer result types from the selected fields with conditional and mapped types, remap keys with template literals, derive DTOs with utility types, and keep compile times reasonable.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0864-final-protected | 40 | 50 | yes |
| MST-0864-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Advanced generics | 8 |
| Conditional types | 8 |
| Mapped and template types | 8 |
| Type-safe APIs | 8 |
| Debugging and performance | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0864-Q0001** (single-answer, Select ONE) A conditional type `T extends (infer U)[] ? U : T` applied to `string[]` yields what?

- A. string **(key)**  
  _Rationale:_ Correct: infer U captures the array element type, so string[] yields string.
- B. string[]  
  _Rationale:_ The true branch unwraps the array to its element type.
- C. never  
  _Rationale:_ The condition matches, so it does not resolve to never.
- D. any  
  _Rationale:_ The element type is string, not any.

**MST-0864-Q0002** (multiple-answer, Select TWO) Which TWO are correct about mapped types? (Select TWO.)

- A. They can add or remove readonly and optional modifiers **(key)**  
  _Rationale:_ Correct: mapped types support + and - modifiers.
- B. They iterate over keys with [K in keyof T] **(key)**  
  _Rationale:_ Correct: that is the mapped-type syntax.
- C. They run at run time  
  _Rationale:_ Types are erased; mapped types are compile-time only.
- D. They require a class  
  _Rationale:_ Mapped types are independent of classes.

**MST-0864-Q0003** (single-answer, Select ONE) A DTO must always mirror a model's fields. What is the maintainable approach in TypeScript?

- A. Derive the DTO from the model with utility types like Pick/Omit **(key)**  
  _Rationale:_ Correct: deriving keeps the DTO in sync with the model automatically.
- B. Hand-copy the fields into a separate interface  
  _Rationale:_ A hand copy drifts out of sync when the model changes.
- C. Type the DTO as any  
  _Rationale:_ any discards all type safety.
- D. Use a run-time clone  
  _Rationale:_ A run-time clone does not produce a compile-time type.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
