# Java Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1523` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-JF-002 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Java Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Java
2. Types, variables and operators
3. Control flow and methods
4. Classes, objects and collections
5. Exceptions, inheritance and tooling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Java (MASTEMY-DESIGN 16%)

- Worked applications: (1) Compile and run a HelloWorld program from the command line; (2) Read an integer from the user and echo it back
- Common misconception addressed: Confusing the JDK (to compile) with the JRE (to run)
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The JVM, JDK and compiling vs running | 144 | 6 |
| M01L02 | main method, printing and reading input | 144 | 6 |

### M02 Types, variables and operators (MASTEMY-DESIGN 18%)

- Worked applications: (1) Convert a temperature using double arithmetic; (2) Compare two Strings correctly with equals, not ==
- Common misconception addressed: Using == to compare String contents instead of equals
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Primitive types, variables and casting | 144 | 6 |
| M02L02 | Operators, String basics and equality | 144 | 6 |

### M03 Control flow and methods (MASTEMY-DESIGN 22%)

- Worked applications: (1) Write a method that returns the larger of two ints; (2) Use a for loop to sum an array of scores
- Common misconception addressed: Forgetting that method arguments are passed by value for primitives
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditionals, switch and loops | 144 | 6 |
| M03L02 | Methods, parameters, return types and overloading | 144 | 6 |

### M04 Classes, objects and collections (MASTEMY-DESIGN 26%)

- Worked applications: (1) Model a BankAccount class with fields and methods; (2) Store and iterate items in an ArrayList
- Common misconception addressed: Thinking a local object variable holds the object rather than a reference to it
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Classes, objects, constructors and encapsulation | 144 | 6 |
| M04L02 | Arrays, ArrayList and the for-each loop | 144 | 6 |

### M05 Exceptions, inheritance and tooling (MASTEMY-DESIGN 18%)

- Worked applications: (1) Catch and handle a NumberFormatException on bad input; (2) Override toString in a subclass
- Common misconception addressed: Catching Exception broadly and swallowing the error silently
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Exceptions, try/catch and checked vs unchecked | 144 | 6 |
| M05L02 | Inheritance, interfaces and packages | 144 | 6 |

## Integrative case

Build a console-based library catalogue in Java: model a Book with a class, store many books in a collection, loop and branch over user commands, read input, handle invalid commands with exceptions, and organise the code into methods and a package.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1523-final-protected | 25 | 25 | yes |
| MST-1523-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Java | 5 |
| Types, variables and operators | 5 |
| Control flow and methods | 5 |
| Classes, objects and collections | 5 |
| Exceptions, inheritance and tooling | 5 |

Minimum reviewed item bank: 422 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1523-Q0001** (single-answer, Select ONE) Why does comparing two String variables with == sometimes give an unexpected result in Java?

- A. == compares object references, not the character contents **(key)**  
  _Rationale:_ Correct: == tests reference identity; equals compares the character contents.
- B. == is not a valid operator for any type in Java  
  _Rationale:_ == is valid; it compares references for objects and values for primitives.
- C. Strings cannot be compared in Java at all  
  _Rationale:_ Strings can be compared, using equals or compareTo.
- D. == automatically converts both Strings to integers  
  _Rationale:_ No such conversion happens; == does not parse Strings.

**MST-1523-Q0002** (multiple-answer, Select ALL that apply) Which statements about Java methods are correct? (Select TWO)

- A. A method can be overloaded by changing its parameter list **(key)**  
  _Rationale:_ Correct: overloading distinguishes methods by their parameter lists.
- B. Primitive arguments are passed by value, so the method gets a copy **(key)**  
  _Rationale:_ Correct: primitives are copied, so changes inside the method do not affect the caller's variable.
- C. A void method must return a value  
  _Rationale:_ A void method returns nothing by definition.
- D. Two methods with the same name and same parameters are allowed  
  _Rationale:_ Methods must differ in name or parameter list; identical signatures clash.

**MST-1523-Q0003** (single-answer, Select ONE) A checked exception in Java must be either caught or declared. What does this mean for a method that calls code throwing IOException?

- A. The method must catch IOException or declare it with throws **(key)**  
  _Rationale:_ Correct: checked exceptions must be handled or declared in the method signature.
- B. The method will not compile under any circumstances  
  _Rationale:_ It compiles once the exception is caught or declared.
- C. IOException is ignored automatically at runtime  
  _Rationale:_ Checked exceptions are not ignored; the compiler enforces handling.
- D. The method must convert it to a RuntimeException first  
  _Rationale:_ Conversion is optional, not required, to satisfy the compiler.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
