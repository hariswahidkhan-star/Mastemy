# Design Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1565` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the purpose and trade-offs of design patterns
2. Apply creational patterns to object construction problems
3. Apply structural patterns to compose objects and interfaces
4. Apply behavioural patterns to responsibilities and communication
5. Recognise anti-patterns and pattern overuse
6. Choose a pattern that fits a concrete design problem

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Pattern fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a smell to a candidate pattern; (2) Describe a pattern's intent in one sentence
- Common misconception addressed: Treating patterns as goals rather than solutions to forces
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why patterns exist and SOLID links | 168 | 8 |
| M01L02 | Reading UML and pattern intent | 168 | 8 |

### M02 Creational patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Replace a constructor sprawl with a builder; (2) Choose factory vs direct construction
- Common misconception addressed: Overusing Singleton as a global variable
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Factory Method and Abstract Factory | 168 | 8 |
| M02L02 | Builder and Singleton | 168 | 8 |

### M03 Structural patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Wrap a legacy API with an adapter; (2) Add behaviour with a decorator
- Common misconception addressed: Confusing Decorator with inheritance
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Adapter, Decorator and Facade | 168 | 8 |
| M03L02 | Composite and Proxy | 168 | 8 |

### M04 Behavioural patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Swap algorithms with Strategy; (2) Model UI updates with Observer
- Common misconception addressed: Hard-coding behaviour that should be a Strategy
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Strategy, Observer and Command | 168 | 8 |
| M04L02 | Template Method and State | 168 | 8 |

### M05 Choosing and misusing patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick a pattern for an extensibility need; (2) Spot over-engineering in a design
- Common misconception addressed: Adding patterns where a plain function suffices
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Pattern selection under constraints | 168 | 8 |
| M05L02 | Anti-patterns and over-engineering | 168 | 8 |

## Integrative case

Refactor a tightly coupled order-processing module: identify where creational, structural and behavioural patterns reduce coupling, and justify each chosen pattern against a simpler alternative.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1565-final-protected | 25 | 25 | yes |
| MST-1565-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Pattern fundamentals | 5 |
| Creational patterns | 5 |
| Structural patterns | 5 |
| Behavioural patterns | 5 |
| Choosing and misusing patterns | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1565-Q0001** (single-answer, Select ONE) What problem does the Strategy pattern primarily address?

- A. Selecting an interchangeable algorithm at runtime **(key)**  
  _Rationale:_ Correct: Strategy encapsulates interchangeable behaviours.
- B. Creating a single shared instance  
  _Rationale:_ That is Singleton.
- C. Giving an incompatible interface a compatible one  
  _Rationale:_ That is Adapter.
- D. Building complex objects step by step  
  _Rationale:_ That is Builder.

**MST-1565-Q0002** (multiple-answer, Select TWO) Which TWO are risks of overusing the Singleton pattern? (Select TWO.)

- A. It introduces hidden global state **(key)**  
  _Rationale:_ Correct: Singletons act like globals and hide dependencies.
- B. It makes unit testing harder **(key)**  
  _Rationale:_ Correct: shared state complicates isolation in tests.
- C. It forces all classes to be abstract  
  _Rationale:_ Singleton does not require abstraction.
- D. It always improves performance  
  _Rationale:_ Performance is not its purpose or guarantee.

**MST-1565-Q0003** (single-answer, Select ONE) The Adapter pattern is best described as doing what?

- A. Converting one interface into another clients expect **(key)**  
  _Rationale:_ Correct: Adapter bridges incompatible interfaces.
- B. Adding responsibilities to an object dynamically  
  _Rationale:_ That is Decorator.
- C. Defining a family of related objects  
  _Rationale:_ That is Abstract Factory.
- D. Notifying dependents of state changes  
  _Rationale:_ That is Observer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
