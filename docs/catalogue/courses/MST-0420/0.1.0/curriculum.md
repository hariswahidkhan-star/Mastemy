# AP Computer Science A: Full-Syllabus Teaching

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0420` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | licensing-examination-knowledge-prep |
| Issuer | College Board (no affiliation or endorsement) |
| Exam code | (not published as a code by the issuer / unresolved) |
| Version basis | unresolved (official outline not verified) |
| Evidence | **unverified-needs-official-check** - issuer outline not fetched in this pass; module/domain structure is a DESIGN ASSUMPTION |
| Legacy IDs | (none) |
| Planned time | T = 7200 min; instruction I = 5760 min (80%); assessment A = 1440 min (20%) |
| Assessment split | lesson checks 360 / module checks 504 / cumulative 576 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-CERTPREP-02 |

> **DESIGN ASSUMPTION:** The official domain names, weightings, learning objectives and item counts were NOT verified against the issuer's published outline in this spec-writing pass. Every module, weighting, objective and item count below is a planning assumption and must be confirmed against the official exam page before authoring.

## Learning outcomes

1. Demonstrate knowledge and applied reasoning for the design-assumption domain: Primitive Types and Control Flow (confirm against official outline at blueprint review)
2. Demonstrate knowledge and applied reasoning for the design-assumption domain: Objects, Classes and Methods (confirm against official outline at blueprint review)
3. Demonstrate knowledge and applied reasoning for the design-assumption domain: Arrays, ArrayLists and 2D Arrays (confirm against official outline at blueprint review)
4. Demonstrate knowledge and applied reasoning for the design-assumption domain: Inheritance, Recursion and Algorithms (confirm against official outline at blueprint review)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.
- Does not assess: Free-response, performance-task and constructed-response sections of the official exam are NOT reproduced or scored; only knowledge and applied reasoning are assessed via MCQ/MR.

## Modules

### M01 Primitive Types and Control Flow (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Trace the output of a nested-loop fragment; (2) Predict the result of a compound Boolean expression
- Common misconception addressed: Confusing assignment with equality comparison
- Module check: 126 items / 126 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Variables, types and expressions | 480 | 6 |
| M01L02 | Boolean logic and conditionals | 480 | 6 |
| M01L03 | Iteration and loops | 480 | 6 |

### M02 Objects, Classes and Methods (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Reason about aliasing when two references share an object; (2) Design a class from a described responsibility
- Common misconception addressed: Assuming objects are copied when a reference is assigned
- Module check: 126 items / 126 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Objects and references | 480 | 6 |
| M02L02 | Writing classes and methods | 480 | 6 |
| M02L03 | Encapsulation and scope | 480 | 6 |

### M03 Arrays, ArrayLists and 2D Arrays (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Trace an array-traversal algorithm; (2) Choose between an array and an ArrayList
- Common misconception addressed: Going out of bounds by off-by-one index errors
- Module check: 126 items / 126 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Arrays and traversal | 480 | 6 |
| M03L02 | ArrayLists and dynamic data | 480 | 6 |
| M03L03 | Two-dimensional arrays | 480 | 6 |

### M04 Inheritance, Recursion and Algorithms (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Predict which overridden method runs at runtime; (2) Trace a recursive call stack
- Common misconception addressed: Writing recursion without a terminating base case
- Module check: 126 items / 126 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Inheritance and polymorphism | 480 | 6 |
| M04L02 | Recursion | 480 | 6 |
| M04L03 | Searching and sorting concepts | 480 | 6 |

## Integrative case

Design, implement and reason about a small object-oriented program: choose appropriate data structures and control flow, trace execution, and justify the design. DESIGN ASSUMPTION pending official outline.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified; 216 items/216 min per form is a planning figure.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0420-practice-form-A | 216 | 216 | yes |
| MST-0420-practice-form-B | 216 | 216 | no (optional practice) |
| MST-0420-practice-form-C | 216 | 216 | no (optional practice) |
| MST-0420-final-protected | 216 | 216 | yes |

| Domain | Items per form |
|---|---|
| Primitive Types and Control Flow | 54 |
| Objects, Classes and Methods | 54 |
| Arrays, ArrayLists and 2D Arrays | 54 |
| Inheritance, Recursion and Algorithms | 54 |

Minimum reviewed item bank: 2016 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0420-Q0001** (single-answer-mcq, Select ONE) In Java, the expression (5 / 2) using int operands evaluates to:

- A. 2 **(key)**  
  _Rationale:_ Correct: integer division truncates toward zero, giving 2.
- B. 2.5  
  _Rationale:_ Integer division does not keep the fractional part.
- C. 3  
  _Rationale:_ Integer division truncates rather than rounding up.
- D. A compile error  
  _Rationale:_ Integer division is legal and compiles.

**MST-0420-Q0002** (single-answer-mcq, Select ONE) Two object references a and b refer to the same object. After b.setX(9), calling a.getX() returns 9 because:

- A. a and b are aliases to one object **(key)**  
  _Rationale:_ Correct: assigning a reference copies the reference, not the object, so both point to the same instance.
- B. a copied the object's fields when assigned  
  _Rationale:_ Reference assignment does not copy the object.
- C. getX returns a default value  
  _Rationale:_ getX returns the current field value, which was changed.
- D. Java passes objects by value of the object  
  _Rationale:_ Java copies the reference value, so both still share one object.

**MST-0420-Q0003** (multiple-answer-selection, Select TWO) Which TWO will cause an ArrayIndexOutOfBoundsException for an int[] arr of length 5?

- A. Accessing arr[5] **(key)**  
  _Rationale:_ Correct: valid indices are 0..4, so 5 is out of bounds.
- B. Accessing arr[-1] **(key)**  
  _Rationale:_ Correct: negative indices are out of bounds.
- C. Accessing arr[4]  
  _Rationale:_ Index 4 is the last valid index for length 5.
- D. Accessing arr[0]  
  _Rationale:_ Index 0 is valid.
- E. Reading arr.length  
  _Rationale:_ Reading length is always legal.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
