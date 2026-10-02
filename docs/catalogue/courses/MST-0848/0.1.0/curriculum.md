# Java Programming: Complete Language Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0848` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Java syntax, primitive and reference types, and control flow correctly
2. Apply object-oriented design with classes, inheritance and interfaces
3. Work with collections, generics and exceptions
4. Read and write data with basic I/O and understand the JVM execution model

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **n/a-no-official-syllabus**. Source(s) consulted:
- none (no external source; Mastemy skills course)

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Syntax and types

- Purpose: Teach Java syntax, types and control flow.
- Worked applications: (1) Convert a problem statement into typed variables and control flow; (2) Explain why == compares references for objects but values for primitives
- Common misconception addressed: Using == to compare String contents instead of equals
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Variables, primitives and references | 80 | 5 |
| M01L02 | Operators and control flow | 80 | 5 |
| M01L03 | Methods and parameters | 80 | 5 |

### M02 Object-oriented Java

- Purpose: Teach classes, inheritance, interfaces and encapsulation.
- Worked applications: (1) Model a shape hierarchy with an interface and overriding; (2) Encapsulate fields and expose behavior through methods
- Common misconception addressed: Confusing overloading (same name, different params) with overriding
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classes, objects and encapsulation | 80 | 5 |
| M02L02 | Inheritance and polymorphism | 80 | 5 |
| M02L03 | Interfaces and abstract classes | 80 | 5 |

### M03 Collections, generics and I/O

- Purpose: Teach collections, generics, exceptions and basic I/O.
- Worked applications: (1) Choose between List, Set and Map for three scenarios; (2) Write a method with a generic type parameter and handle a checked exception
- Common misconception addressed: Catching Exception broadly and swallowing the error silently
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Collections (List, Set, Map) | 80 | 5 |
| M03L02 | Generics basics | 80 | 5 |
| M03L03 | Exceptions and basic I/O | 80 | 5 |

## Integrative case

Build a small library-catalog console program: model books with classes and an interface, store them in the right collections, validate input with exceptions, and explain one reference-vs-value pitfall you avoided.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0848-final-protected | 30 | 30 | yes |
| MST-0848-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Syntax and types | 10 |
| Object-oriented Java | 10 |
| Collections, generics and I/O | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0848-Q0001** (single-answer, Select ONE) Why can comparing two String objects with == give a surprising result in Java?

- A. == compares object references, so two Strings with equal content may still be different objects **(key)**  
  _Rationale:_ Correct: == checks reference identity for objects; equals() compares content.
- B. == always compares String content  
  _Rationale:_ == compares references for objects, not content.
- C. Strings cannot be compared at all  
  _Rationale:_ Strings can be compared with equals() (and compareTo()).
- D. == converts both Strings to numbers first  
  _Rationale:_ No numeric conversion happens when comparing Strings.

**MST-0848-Q0002** (multiple-answer, Select TWO) Select TWO statements that correctly distinguish method overriding from overloading in Java.

- A. Overriding redefines an inherited method with the same signature in a subclass **(key)**  
  _Rationale:_ Correct: overriding keeps the signature and changes behavior in a subclass.
- B. Overloading declares multiple methods with the same name but different parameter lists **(key)**  
  _Rationale:_ Correct: overloading varies the parameter list within the same scope.
- C. Overloading requires an inheritance relationship  
  _Rationale:_ Overloading does not require inheritance.
- D. Overriding must change the method name  
  _Rationale:_ Overriding keeps the same name and signature.
- E. Overloading and overriding are the same thing  
  _Rationale:_ They are distinct mechanisms.

**MST-0848-Q0003** (single-answer, Select ONE) You need a collection that stores unique elements with no duplicates. Which Java collection type fits best?

- A. Set **(key)**  
  _Rationale:_ Correct: a Set stores unique elements and rejects duplicates.
- B. List  
  _Rationale:_ A List allows duplicates and preserves insertion order.
- C. Map  
  _Rationale:_ A Map stores key-value pairs, not a plain set of unique values.
- D. Array of fixed size with manual checks  
  _Rationale:_ A raw array does not enforce uniqueness without extra manual code; Set does it directly.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
