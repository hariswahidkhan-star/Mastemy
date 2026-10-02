# Objective-C Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1536` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-OCE-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Objective-C Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Objective-C
2. Classes, objects and messaging
3. Properties and memory
4. Foundation value types
5. Protocols, categories and blocks
6. Error handling and nil
7. Cocoa patterns and interop
8. Tooling, testing and good practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; Objective-C code and Cocoa usage are taught through instructor-built walkthroughs.

## Modules

### M01 Getting started with Objective-C (MASTEMY-DESIGN 12%)

- Worked applications: (1) Create and run a command-line Objective-C project; (2) Split an interface (.h) from its implementation (.m)
- Common misconception addressed: Forgetting that Objective-C is a strict superset of C
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | C heritage, Xcode and compiling a first program | 90 | 6 |
| M01L02 | Headers, implementation files and the build | 90 | 6 |

### M02 Classes, objects and messaging (MASTEMY-DESIGN 15%)

- Worked applications: (1) Define a class and send it a message; (2) Add an initialiser and override description
- Common misconception addressed: Reading [obj method] as a function call rather than a message send
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | @interface, @implementation and instance variables | 90 | 6 |
| M02L02 | Message sending syntax and method dispatch | 90 | 6 |

### M03 Properties and memory (MASTEMY-DESIGN 14%)

- Worked applications: (1) Declare properties with correct ownership attributes; (2) Break a retain cycle with a weak reference
- Common misconception addressed: Creating a retain cycle between two strongly referencing objects
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Declared properties, @property attributes and dot syntax | 90 | 6 |
| M03L02 | ARC, strong/weak and retain cycles | 90 | 6 |

### M04 Foundation value types (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build and query an NSDictionary of records; (2) Choose between immutable and mutable collections
- Common misconception addressed: Mutating an NSArray and expecting it to change (it is immutable)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | NSString, NSNumber and NSValue | 90 | 6 |
| M04L02 | NSArray, NSDictionary and mutability | 90 | 6 |

### M05 Protocols, categories and blocks (MASTEMY-DESIGN 14%)

- Worked applications: (1) Define a protocol and implement a delegate; (2) Add a method to an existing class with a category
- Common misconception addressed: Confusing a category with subclassing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Protocols and the delegate pattern | 90 | 6 |
| M05L02 | Categories, extensions and blocks | 90 | 6 |

### M06 Error handling and nil (MASTEMY-DESIGN 11%)

- Worked applications: (1) Return success/failure with an NSError out-parameter; (2) Handle a nil result from a failed lookup
- Common misconception addressed: Expecting a message to nil to crash rather than return nil/zero
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | NSError and the by-reference error pattern | 90 | 6 |
| M06L02 | Messaging nil and defensive patterns | 90 | 6 |

### M07 Cocoa patterns and interop (MASTEMY-DESIGN 12%)

- Worked applications: (1) Observe a change with NSNotificationCenter; (2) Expose an Objective-C class to Swift
- Common misconception addressed: Assuming Objective-C and Swift objects cannot interoperate
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Key-Value Coding, notifications and target-action | 90 | 6 |
| M07L02 | Objective-C and Swift interoperability | 90 | 6 |

### M08 Tooling, testing and good practice (MASTEMY-DESIGN 10%)

- Worked applications: (1) Find a leak with the static analyzer; (2) Write XCTest cases for a model class
- Common misconception addressed: Ignoring static-analyzer warnings about ownership
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Debugging, instruments and the static analyzer | 90 | 6 |
| M08L02 | XCTest and modern Objective-C style | 90 | 6 |

## Integrative case

Build a contacts-manager core in Objective-C: model a Contact class with ARC-managed properties, store records in Foundation collections, expose updates through a delegate protocol and notifications, report failures with NSError, keep it interoperable with Swift, and cover the model with XCTest.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1536-final-protected | 40 | 40 | yes |
| MST-1536-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Objective-C | 5 |
| Classes, objects and messaging | 5 |
| Properties and memory | 5 |
| Foundation value types | 5 |
| Protocols, categories and blocks | 5 |
| Error handling and nil | 5 |
| Cocoa patterns and interop | 5 |
| Tooling, testing and good practice | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1536-Q0001** (single-answer, Select ONE) What happens when you send a message to nil in Objective-C, for example [nilObject doSomething]?

- A. Nothing happens and the expression returns nil/zero, with no crash **(key)**  
  _Rationale:_ Correct: messaging nil is a no-op that yields nil or zero, a defining Objective-C behaviour.
- B. The program always crashes with a null-pointer error  
  _Rationale:_ Unlike a C null dereference, messaging nil is safe in Objective-C.
- C. The message is queued until the object becomes non-nil  
  _Rationale:_ There is no queuing; the message is simply ignored.
- D. The compiler rejects it  
  _Rationale:_ It compiles and runs; the runtime handles nil.

**MST-1536-Q0002** (multiple-answer, Select TWO) Which statements about memory management under ARC are correct? (Select TWO)

- A. A weak reference does not keep its target alive and is set to nil when the target is deallocated **(key)**  
  _Rationale:_ Correct: weak avoids ownership and is zeroed automatically on deallocation.
- B. Two objects holding strong references to each other can form a retain cycle **(key)**  
  _Rationale:_ Correct: mutual strong references prevent deallocation, leaking memory.
- C. Under ARC you must still call retain and release manually  
  _Rationale:_ ARC inserts retain/release automatically; manual calls are disallowed.
- D. strong and weak behave identically  
  _Rationale:_ strong keeps the target alive; weak does not.

**MST-1536-Q0003** (single-answer, Select ONE) What does a category add to an existing Objective-C class?

- A. Additional methods to the class without subclassing it **(key)**  
  _Rationale:_ Correct: a category extends an existing class with new methods at runtime.
- B. New instance variables guaranteed to be stored  
  _Rationale:_ Categories cannot add stored instance variables safely; they add methods.
- C. A separate copy of the class hierarchy  
  _Rationale:_ A category modifies the existing class, not a copy.
- D. Compile-time constants only  
  _Rationale:_ Categories add methods, not just constants.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
