# Oracle Java SE Developer Professional: Current-Version Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1240` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Oracle (no affiliation or endorsement) |
| Exam code | 1Z0-830 |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-ORA-1Z0830-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of Java Language Core (design-assumption grouping)
2. Explain and apply the concepts of Object-Oriented Java (design-assumption grouping)
3. Explain and apply the concepts of Core APIs, Generics and Functional Style (design-assumption grouping)
4. Explain and apply the concepts of Modern Java and the Platform (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 Java Language Core (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Comparing object references with == instead of equals()
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data types, variables and operators | 240 | 6 |
| M01L02 | Control flow and loops | 240 | 6 |
| M01L03 | Arrays and strings | 240 | 6 |

### M02 Object-Oriented Java (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming a record's fields can be mutated after construction
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classes, objects and encapsulation | 240 | 6 |
| M02L02 | Inheritance, interfaces and polymorphism | 240 | 6 |
| M02L03 | Enums, records and sealed classes | 240 | 6 |

### M03 Core APIs, Generics and Functional Style (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Expecting a stream to be reusable after a terminal operation
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Generics and the collections framework | 240 | 6 |
| M03L02 | Functional interfaces and lambdas | 240 | 6 |
| M03L03 | The Streams API | 240 | 6 |

### M04 Modern Java and the Platform (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Catching Exception broadly and swallowing the cause
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Exceptions and error handling | 240 | 6 |
| M04L02 | Concurrency basics | 240 | 6 |
| M04L03 | Modules and I/O | 240 | 6 |

## Integrative case

Refactor a small Java service: model data with records and sealed types, process a collection with streams, handle errors with appropriate exceptions, and make one section thread-safe, explaining each choice.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1240-practice-form-A | 108 | 108 | yes |
| MST-1240-practice-form-B | 108 | 108 | no (optional practice) |
| MST-1240-practice-form-C | 108 | 108 | no (optional practice) |
| MST-1240-final-protected | 108 | 108 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| Java Language Core | 27 |
| Object-Oriented Java | 27 |
| Core APIs, Generics and Functional Style | 27 |
| Modern Java and the Platform | 27 |

Minimum reviewed item bank: 1080 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1240-Q0001** (single-answer, Select ONE) How should two String objects' contents be compared for equality in Java?

- A. Using the equals() method **(key)**  
  _Rationale:_ Correct: equals() compares contents; == compares references.
- B. Using ==  
  _Rationale:_ == compares references, not content, and can give wrong results.
- C. Using the > operator  
  _Rationale:_ > is not valid for comparing String contents for equality.
- D. Using assignment =  
  _Rationale:_ = assigns; it does not compare.

**MST-1240-Q0002** (single-answer, Select ONE) What characterises a Java record?

- A. An immutable data carrier with auto-generated accessors, equals, hashCode and toString **(key)**  
  _Rationale:_ Correct: records are concise immutable carriers with generated members.
- B. A mutable class whose fields change freely  
  _Rationale:_ Record components are final/immutable.
- C. An interface with default methods only  
  _Rationale:_ A record is a class, not an interface.
- D. A thread-synchronisation primitive  
  _Rationale:_ Records are data carriers, not concurrency tools.

**MST-1240-Q0003** (multiple-answer, Select TWO) Which TWO are true of the Java Streams API?

- A. A stream pipeline is not executed until a terminal operation runs **(key)**  
  _Rationale:_ Correct: intermediate operations are lazy; terminal operations trigger execution.
- B. A stream cannot be reused after a terminal operation **(key)**  
  _Rationale:_ Correct: streams are single-use; a new stream is needed to re-process.
- C. Streams always mutate the source collection  
  _Rationale:_ Streams generally do not mutate the source.
- D. filter() is a terminal operation  
  _Rationale:_ filter() is intermediate, not terminal.
- E. Streams guarantee multithreading automatically  
  _Rationale:_ Parallelism is opt-in via parallelStream(), not automatic.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
