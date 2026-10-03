# Kotlin Programming: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2573` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint; compiler, runtime, standard-library and tooling versions to be pinned at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Kotlin Programming: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up a Kotlin project and run code on the JVM
2. Use val/var, basic types and string templates correctly
3. Write functions with default and named arguments
4. Apply null safety with nullable types and safe calls
5. Use control flow including when expressions and ranges
6. Model data with classes, data classes and collections

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started (20% (design weight), design weight)

- Worked applications: (1) Compile and run a Kotlin file; (2) Use the REPL to test an expression
- Common misconception addressed: Thinking Kotlin cannot call Java libraries
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Kotlin, the JVM and tooling | 64 | 4 |
| M01L02 | main, println and the REPL | 64 | 4 |
| M01L03 | Running and packaging a program | 64 | 4 |

### M02 Values and types (20% (design weight), design weight)

- Worked applications: (1) Interpolate variables in a string template; (2) Infer a type and reassign a var
- Common misconception addressed: Reassigning a val
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | val vs var and type inference | 64 | 4 |
| M02L02 | Numbers, booleans and strings | 64 | 4 |
| M02L03 | String templates | 64 | 4 |

### M03 Functions (20% (design weight), design weight)

- Worked applications: (1) Call a function with named arguments; (2) Write a single-expression function
- Common misconception addressed: Assuming argument order is required when names are used
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Declaring functions and returns | 64 | 4 |
| M03L02 | Default and named arguments | 64 | 4 |
| M03L03 | Single-expression functions | 64 | 4 |

### M04 Null safety (20% (design weight), design weight)

- Worked applications: (1) Use ?. with ?: to supply a default; (2) Guard a nullable with a smart cast
- Common misconception addressed: Overusing !! and crashing on null
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Nullable types and ? | 64 | 4 |
| M04L02 | Safe calls and the Elvis operator | 64 | 4 |
| M04L03 | Avoiding the not-null assertion | 64 | 4 |

### M05 Classes and collections (20% (design weight), design weight)

- Worked applications: (1) Create a data class and copy it; (2) Transform a list with map
- Common misconception addressed: Expecting structural equality from a normal class
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Classes, properties and constructors | 64 | 4 |
| M05L02 | Data classes and equality | 64 | 4 |
| M05L03 | Lists, maps and sets | 64 | 4 |

## Integrative case

A beginner writes a Kotlin contact-book console app: model a Contact as a data class, store entries in a list and map, handle optional fields with null safety, and format output with string templates.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2573-final-protected | 40 | 40 | yes |
| MST-2573-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started | 8 |
| Values and types | 8 |
| Functions | 8 |
| Null safety | 8 |
| Classes and collections | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2573-Q0001** (single-answer, Select ONE) What is the difference between val and var in Kotlin?

- A. val declares a read-only reference; var declares a reassignable one **(key)**  
  _Rationale:_ val cannot be reassigned after initialisation; var can.
- B. val is for numbers and var is for strings  
  _Rationale:_ Both work with any type; the difference is reassignability.
- C. val values are always compile-time constants  
  _Rationale:_ const val is a compile-time constant; plain val need not be.
- D. var is immutable and val is mutable  
  _Rationale:_ It is the reverse: val is read-only.

**MST-2573-Q0002** (multiple-answer, Select TWO) Select TWO expressions that safely handle a nullable String? named s in Kotlin.

- A. s?.length **(key)**  
  _Rationale:_ The safe call returns null instead of throwing when s is null.
- B. s?.length ?: 0 **(key)**  
  _Rationale:_ The Elvis operator supplies a default when the safe call yields null.
- C. s.length  
  _Rationale:_ Calling a member directly on a nullable type is a compile error.
- D. s!!.length  
  _Rationale:_ The not-null assertion throws if s is null, so it is not safe.

**MST-2573-Q0003** (single-answer, Select ONE) Why use a data class rather than a normal class for a simple value holder in Kotlin?

- A. It auto-generates equals, hashCode, toString and copy from the properties **(key)**  
  _Rationale:_ Data classes synthesise these members based on the primary-constructor properties.
- B. It makes all properties mutable automatically  
  _Rationale:_ Mutability depends on val/var, not on being a data class.
- C. It prevents the class from being used in collections  
  _Rationale:_ Data classes work well in collections.
- D. It disables null safety  
  _Rationale:_ Null safety is unaffected by data classes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
